import Accordion from "../../../../acordion";
import { Handle, Position } from "@xyflow/react";

export function ActionNode({ data }) {
  const { action, testPathMode, isSelected, isSelectable, onToggle } = data ?? {};

  return (
    <>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <Accordion
        title={action?.value || action?.selector || 'No detail'}
        type={action?.type}
        checkable={testPathMode}
        checked={isSelected}
        checkDisabled={!isSelected && !isSelectable}
        onCheck={onToggle}
      >
        {action?.errors?.map((error, index) => (
          <Accordion.Item key={index} title={`Error: ${error}`} />
        ))}
      </Accordion>
    </>
  );
}

export default ActionNode;
