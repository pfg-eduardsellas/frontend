import Accordion from "../../../../acordion";
import { Handle, Position } from "@xyflow/react";
import { ErrorCountBadge } from "../ErrorCountBadge";

const IMPACT_BADGE_COLOR = {
  critical: '#dc2626',
  serious:  '#ea580c',
  moderate: '#ca8a04',
  minor:    '#9ca3af',
};

function A11yCountBadge({ count }) {
  if (!count || count <= 0) return null;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 20,
      height: 20,
      padding: '0 5px',
      borderRadius: 9999,
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      fontSize: 11,
      fontWeight: 700,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {count}
    </span>
  );
}

export function ActionNode({ data }) {
  const { action, testPathMode, isSelected, isSelectable, onToggle } = data ?? {};
  const errorCount = action?.errors?.length ?? 0;
  const a11yViolations = action?.accessibility_violations ?? [];
  const a11yCount = a11yViolations.length;

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
        headerRight={
          <span style={{ display: 'flex', gap: 4 }}>
            <ErrorCountBadge count={errorCount} />
            <A11yCountBadge count={a11yCount} />
          </span>
        }
      >
        {action?.errors?.map((error, index) => (
          <Accordion.Item key={`err-${index}`} title={`Error: ${error}`} />
        ))}

        {a11yViolations.map((v, index) => (
          <div
            key={`a11y-${index}`}
            style={{
              padding: '8px 10px',
              background: '#faf5ff',
              border: '1px solid #ddd6fe',
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{
                background: IMPACT_BADGE_COLOR[v.impact] ?? '#9ca3af',
                color: 'white',
                fontSize: '0.6rem',
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: 4,
                textTransform: 'uppercase',
                flexShrink: 0,
              }}>
                {v.impact ?? '—'}
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#5b21b6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {v.rule_id}
              </span>
            </div>
            {v.description && (
              <p style={{ fontSize: '0.68rem', color: '#6d28d9', margin: 0, lineHeight: 1.35 }}>
                {v.description}
              </p>
            )}
            {v.nodes?.length > 0 && (
              <span style={{ fontSize: '0.65rem', color: '#a78bfa' }}>
                {v.nodes.length} element{v.nodes.length !== 1 ? 's' : ''} affected
              </span>
            )}
          </div>
        ))}
      </Accordion>
    </>
  );
}

export default ActionNode;
