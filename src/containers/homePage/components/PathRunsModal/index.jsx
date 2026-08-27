import { useMemo, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
} from "@xyflow/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../components/modal";
import { useGetPathRunsQuery, useGetScanActionsQuery } from "../../../../api";
import { getLayoutedElements } from "../../../../components/graph/graphViewer/adapters";
import { NODE_TYPES } from "../../../../components/graph/graphViewer/constants";
import {
  ModalLayout,
  GraphPanel,
  RunsPanel,
  RunsPanelTitle,
  RunStatus,
  RunTime,
  EmptyRuns,
  RunList,
  RunCard,
  RunCardHeader,
  RunIndex,
  RunSummary,
  Chevron,
  RunDetail,
  StepItem,
  StepHead,
  StepBadge,
  StepError,
  AssertItem,
  AssertIcon,
  AssertBody,
  AssertTitle,
  AssertMeta,
  AssertErrorText,
  NoAsserts,
} from "./styles";

const ASSERTION_LABELS = {
  url_equals: "URL equals",
  url_contains: "URL contains",
  visible: "Element visible",
  not_visible: "Element not visible",
  text_equals: "Text equals",
  text_contains: "Text contains",
  value_equals: "Input value equals",
  count_equals: "Element count equals",
};

function formatRunTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function summarizeRun(result) {
  if (!result || !Array.isArray(result.steps)) return null;
  let total = 0;
  let passed = 0;
  for (const step of result.steps) {
    for (const a of step.assertions || []) {
      total += 1;
      if (a.passed) passed += 1;
    }
  }
  return { total, passed };
}

function AssertionRowView({ assertion }) {
  const label = ASSERTION_LABELS[assertion.type] || assertion.type;
  const meta = [
    assertion.selector ? `selector: ${assertion.selector}` : null,
    assertion.expected != null ? `expected: ${assertion.expected}` : null,
    assertion.actual != null ? `got: ${assertion.actual}` : null,
  ]
    .filter(Boolean)
    .join("  •  ");

  return (
    <AssertItem>
      <AssertIcon $ok={assertion.passed}>
        <FontAwesomeIcon icon={assertion.passed ? faCheck : faXmark} />
      </AssertIcon>
      <AssertBody>
        <AssertTitle>{label}</AssertTitle>
        {meta && <AssertMeta>{meta}</AssertMeta>}
        {!assertion.passed && assertion.error && (
          <AssertErrorText>{assertion.error}</AssertErrorText>
        )}
      </AssertBody>
    </AssertItem>
  );
}

function StepView({ step, index }) {
  const ok = step.status === "pass";
  const assertions = step.assertions || [];
  return (
    <StepItem>
      <StepHead>
        <span>
          {index + 1}. {step.type} #{step.action_id}
        </span>
        <StepBadge $ok={ok}>{step.status}</StepBadge>
      </StepHead>
      {step.error && <StepError>{step.error}</StepError>}
      {assertions.length > 0 ? (
        assertions.map((a, i) => <AssertionRowView key={i} assertion={a} />)
      ) : (
        <NoAsserts>No checks on this step</NoAsserts>
      )}
    </StepItem>
  );
}

function RunRow({ run, index }) {
  const [open, setOpen] = useState(false);
  const summary = summarizeRun(run.result);
  const steps = run.result?.steps || [];
  const allPassed = summary
    ? summary.passed === summary.total
    : run.status === "pass";

  return (
    <RunCard
      $status={run.status}
      $failed={run.status === "fail" || run.status === "error"}
    >
      <RunCardHeader onClick={() => setOpen((o) => !o)}>
        <Chevron $open={open}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Chevron>
        <RunIndex>#{index + 1}</RunIndex>
        <RunStatus $status={run.status}>{run.status}</RunStatus>
        <RunTime>{formatRunTime(run.finished_at || run.triggered_at)}</RunTime>
        {summary && summary.total > 0 && (
          <RunSummary $allPassed={allPassed}>
            {summary.passed}/{summary.total} checks passed
          </RunSummary>
        )}
      </RunCardHeader>

      {open && (
        <RunDetail>
          {steps.length === 0 ? (
            <NoAsserts>
              {run.result
                ? "No steps recorded."
                : "Run not finished — no result yet."}
            </NoAsserts>
          ) : (
            steps.map((step, i) => <StepView key={i} step={step} index={i} />)
          )}
        </RunDetail>
      )}
    </RunCard>
  );
}

function PathGraph({ pathNodeIds, actionsData }) {
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(() => {
    if (!actionsData?.actions || pathNodeIds.length === 0) {
      return { nodes: [], edges: [] };
    }

    const idSet = new Set(pathNodeIds.map(String));
    const filteredActions = actionsData.actions.filter((a) =>
      idSet.has(String(a.id)),
    );

    const orderedActions = pathNodeIds
      .map((id) => filteredActions.find((a) => String(a.id) === String(id)))
      .filter(Boolean);

    const nodes = orderedActions.map((action) => ({
      id: String(action.id),
      type: action.type,
      data: {
        label:
          `${action.type} ${action.id}: ${action.value || action.selector || ""}`.substring(
            0,
            30,
          ),
        action,
      },
      position: { x: 0, y: 0 },
    }));

    const edges = orderedActions.slice(0, -1).map((action, i) => ({
      id: `pe-${action.id}-${orderedActions[i + 1].id}`,
      source: String(action.id),
      target: String(orderedActions[i + 1].id),
      animated: false,
    }));

    return getLayoutedElements(nodes, edges, "LR");
  }, [pathNodeIds, actionsData]);

  return (
    <ReactFlow
      nodes={layoutedNodes}
      edges={layoutedEdges}
      nodeTypes={NODE_TYPES}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      proOptions={{ hideAttribution: true }}
    >
      <Background gap={16} color="#e2e8f0" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

function PathRunsModal({ isOpen, onClose, scanId, path }) {
  const pathId = path?.id ?? null;
  const pathNodeIds = useMemo(
    () =>
      path?.path
        ? path.path
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    [path?.path],
  );

  const { data: runsData = [] } = useGetPathRunsQuery(
    { scanId, pathId },
    { skip: !isOpen || !scanId || !pathId },
  );

  const { data: actionsData } = useGetScanActionsQuery(scanId, {
    skip: !isOpen || !scanId,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Test path history"
      size="1100px"
      bodyPadding="20px"
    >
      <ModalLayout>
        {/* ── Path graph ── */}
        <GraphPanel>
          <ReactFlowProvider>
            <PathGraph pathNodeIds={pathNodeIds} actionsData={actionsData} />
          </ReactFlowProvider>
        </GraphPanel>

        <RunsPanel>
          <RunsPanelTitle>Runs ({runsData.length})</RunsPanelTitle>

          {runsData.length === 0 ? (
            <EmptyRuns>No runs recorded yet.</EmptyRuns>
          ) : (
            <RunList>
              {runsData.map((run, i) => (
                <RunRow key={run.id} run={run} index={i} />
              ))}
            </RunList>
          )}
        </RunsPanel>
      </ModalLayout>
    </Modal>
  );
}

export default PathRunsModal;
