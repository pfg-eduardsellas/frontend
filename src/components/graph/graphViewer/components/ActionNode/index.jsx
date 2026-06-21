import Accordion from "../../../../acordion";
import CounterBadge from "../../../../counterBadge";
import { Handle, Position } from "@xyflow/react";
import {
  BadgesRow,
  A11yItem,
  A11yHeader,
  ImpactBadge,
  A11yDescription,
  AffectedCount,
} from "./styles";

export function ActionNode({ data }) {
  const { action, testPathMode, isSelected, isSelectable, onToggle } =
    data ?? {};
  const errorCount = action?.errors?.length ?? 0;
  const a11yViolations = action?.accessibility_violations ?? [];
  const a11yCount = a11yViolations.length;

  return (
    <>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <Accordion
        title={action?.value || action?.selector || "No detail"}
        type={action?.type}
        checkable={testPathMode}
        checked={isSelected}
        checkDisabled={!isSelected && !isSelectable}
        onCheck={onToggle}
        headerRight={
          <BadgesRow>
            <CounterBadge type="error" count={errorCount} />
            <CounterBadge type="others" count={a11yCount} />
          </BadgesRow>
        }
      >
        {action?.errors?.map((error, index) => (
          <Accordion.Item key={`err-${index}`} title={`Error: ${error}`} />
        ))}

        {a11yViolations.map((v, index) => (
          <A11yItem key={`a11y-${index}`}>
            <A11yHeader>
              <ImpactBadge $impact={v.impact}>{v.impact ?? "—"}</ImpactBadge>
              <span>{v.rule_id}</span>
            </A11yHeader>
            {v.description && (
              <A11yDescription>{v.description}</A11yDescription>
            )}
            {v.nodes?.length > 0 && (
              <AffectedCount>
                {v.nodes.length} element{v.nodes.length !== 1 ? "s" : ""}{" "}
                affected
              </AffectedCount>
            )}
          </A11yItem>
        ))}
      </Accordion>
    </>
  );
}

export default ActionNode;
