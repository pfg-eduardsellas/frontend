import { useState } from 'react';

const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];

const IMPACT_STYLE = {
  critical: { bg: '#fee2e2', text: '#991b1b', badge: '#dc2626' },
  serious:  { bg: '#ffedd5', text: '#9a3412', badge: '#ea580c' },
  moderate: { bg: '#fefce8', text: '#854d0e', badge: '#ca8a04' },
  minor:    { bg: '#f3f4f6', text: '#4b5563', badge: '#9ca3af' },
};

function NodeDetail({ node }) {
  const target = Array.isArray(node.target) ? node.target.join(' > ') : node.target;
  const summary = node.failure_summary
    ?.replace(/^Fix (any|all) of the following:\s*/i, '')
    ?.trim();

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: 5,
      padding: '6px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}>
      <code style={{ fontSize: '0.65rem', color: '#6366f1', wordBreak: 'break-all', lineHeight: 1.3 }}>
        {target}
      </code>
      {summary && (
        <p style={{ fontSize: '0.68rem', color: '#6b7280', margin: 0, lineHeight: 1.35 }}>
          {summary}
        </p>
      )}
    </div>
  );
}

function ViolationItem({ violation }) {
  const [expanded, setExpanded] = useState(false);
  const style = IMPACT_STYLE[violation.impact] ?? IMPACT_STYLE.minor;
  const nodes = violation.nodes ?? [];

  return (
    <div style={{
      background: style.bg,
      border: `1px solid ${style.badge}44`,
      borderRadius: 7,
      padding: '8px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
    }}>
      {/* Impact badge + rule */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          background: style.badge,
          color: 'white',
          fontSize: '0.6rem',
          fontWeight: 700,
          padding: '2px 6px',
          borderRadius: 4,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          flexShrink: 0,
        }}>
          {violation.impact ?? 'unknown'}
        </span>
        <span style={{
          fontSize: '0.73rem',
          fontWeight: 700,
          color: style.text,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {violation.rule_id}
        </span>
      </div>

      {/* Origin action */}
      <span style={{ fontSize: '0.67rem', color: '#9ca3af', fontStyle: 'italic' }}>
        {violation.actionType} #{violation.action_id}
      </span>

      {/* Description */}
      {violation.description && (
        <p style={{ fontSize: '0.72rem', color: style.text, margin: 0, lineHeight: 1.4 }}>
          {violation.description}
        </p>
      )}

      {/* Affected nodes toggle */}
      {nodes.length > 0 && (
        <>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontSize: '0.68rem',
              color: style.badge,
              fontWeight: 600,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span style={{ fontSize: '0.55rem' }}>{expanded ? '▲' : '▼'}</span>
            {nodes.length} element{nodes.length !== 1 ? 's' : ''} affected
          </button>

          {expanded && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {nodes.map((node, i) => (
                <NodeDetail key={i} node={node} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Help link */}
      {violation.help_url && (
        <a
          href={violation.help_url}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: '0.68rem', color: style.badge, textDecoration: 'none', alignSelf: 'flex-start' }}
        >
          Learn more →
        </a>
      )}
    </div>
  );
}

function AccessibilityPanel({ graphActions, selectedScan }) {
  // Flatten all violations from all actions, attaching the action type for display
  const violations = graphActions.flatMap(action =>
    (action.accessibility_violations ?? []).map(v => ({
      ...v,
      actionType: action.type,
    }))
  );

  const counts = IMPACT_ORDER.reduce((acc, impact) => {
    acc[impact] = violations.filter(v => v.impact === impact).length;
    return acc;
  }, {});

  const sorted = [...violations].sort((a, b) =>
    IMPACT_ORDER.indexOf(a.impact ?? 'minor') - IMPACT_ORDER.indexOf(b.impact ?? 'minor')
  );

  if (!selectedScan) {
    return (
      <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>
        Select a scan to see accessibility issues.
      </p>
    );
  }

  if (violations.length === 0) {
    return (
      <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: 0 }}>
        No accessibility violations recorded.
      </p>
    );
  }

  return (
    <>
      {/* Summary counters */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {IMPACT_ORDER.map(impact => {
          const s = IMPACT_STYLE[impact];
          const n = counts[impact];
          return (
            <span key={impact} style={{
              background: s.bg,
              color: s.text,
              border: `1px solid ${s.badge}55`,
              borderRadius: 6,
              padding: '3px 8px',
              fontSize: '0.67rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <span style={{
                background: s.badge,
                borderRadius: '50%',
                width: 7,
                height: 7,
                display: 'inline-block',
                flexShrink: 0,
              }} />
              {n} {impact}
            </span>
          );
        })}
      </div>

      {/* Violations list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, overflowY: 'auto', flex: 1 }}>
        {sorted.map((v, i) => (
          <ViolationItem key={i} violation={v} />
        ))}
      </div>
    </>
  );
}

export default AccessibilityPanel;
