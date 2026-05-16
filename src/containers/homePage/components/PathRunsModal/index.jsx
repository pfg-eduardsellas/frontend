import { useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
} from "@xyflow/react";
import Modal from "../../../../components/modal";
import { useGetPathRunsQuery, useGetScanActionsQuery } from "../../../../api";
import { getLayoutedElements } from "../../../../components/graph/graphViewer/adapters";
import { NODE_TYPES } from "../../../../components/graph/graphViewer/constants";
import {
  ModalLayout,
  GraphPanel,
  RunsPanel,
  RunsPanelTitle,
  RunsTable,
  RunsTableHead,
  RunsTableBody,
  RunsTableWrapper,
  RunStatus,
  RunTime,
  ResultCell,
  EmptyRuns,
} from "./styles";

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

        {/* ── Runs table ── */}
        <RunsPanel>
          <RunsPanelTitle>Runs ({runsData.length})</RunsPanelTitle>

          {runsData.length === 0 ? (
            <EmptyRuns>No runs recorded yet.</EmptyRuns>
          ) : (
            <RunsTableWrapper>
              <RunsTable>
                <RunsTableHead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Result</th>
                  </tr>
                </RunsTableHead>
                <RunsTableBody>
                  {runsData.map((run, i) => (
                    <tr key={run.id}>
                      <td style={{ color: "#9ca3af", width: 36 }}>{i + 1}</td>
                      <td style={{ width: 90 }}>
                        <RunStatus $status={run.status}>{run.status}</RunStatus>
                      </td>
                      <td style={{ width: 140 }}>
                        <RunTime>{formatRunTime(run.created_at)}</RunTime>
                      </td>
                      <td>
                        {run.result ? (
                          <ResultCell>
                            {typeof run.result === "string"
                              ? run.result
                              : JSON.stringify(run.result)}
                          </ResultCell>
                        ) : (
                          <span style={{ color: "#d1d5db" }}>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </RunsTableBody>
              </RunsTable>
            </RunsTableWrapper>
          )}
        </RunsPanel>
      </ModalLayout>
    </Modal>
  );
}

export default PathRunsModal;
