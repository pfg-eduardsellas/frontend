import styled from 'styled-components';

export const ModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const GraphPanel = styled.div`
  width: 100%;
  height: 220px;
  flex-shrink: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #f8fafc;
`;

export const RunsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RunsPanelTitle = styled.p`
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7280;
  margin: 0;
  flex-shrink: 0;
`;

const STATUS_BG = {
  pass: '#d1fae5',
  passed: '#d1fae5',
  fail: '#fee2e2',
  failed: '#fee2e2',
  error: '#fee2e2',
  running: '#dbeafe',
  pending: '#fef3c7',
};
const STATUS_FG = {
  pass: '#065f46',
  passed: '#065f46',
  fail: '#991b1b',
  failed: '#991b1b',
  error: '#991b1b',
  running: '#1e40af',
  pending: '#92400e',
};

export const RunStatus = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${({ $status }) => STATUS_BG[$status] ?? '#f3f4f6'};
  color: ${({ $status }) => STATUS_FG[$status] ?? '#374151'};
`;

export const RunTime = styled.span`
  font-size: 0.72rem;
  color: #9ca3af;
  white-space: nowrap;
`;

export const EmptyRuns = styled.p`
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0;
  text-align: center;
  padding: 20px 0;
`;


export const RunList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RunCard = styled.div`
  border: 1px solid ${({ $failed }) => ($failed ? '#fecaca' : '#e5e7eb')};
  border-left: 3px solid
    ${({ $status }) =>
    $status === 'pass' || $status === 'passed'
      ? '#10b981'
      : $status === 'fail' || $status === 'failed' || $status === 'error'
        ? '#ef4444'
        : $status === 'running'
          ? '#3b82f6'
          : '#f59e0b'};
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
`;

export const RunCardHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #f9fafb;
  }
`;

export const RunIndex = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: #9ca3af;
  min-width: 18px;
`;

export const RunSummary = styled.span`
  font-size: 0.74rem;
  font-weight: 600;
  color: ${({ $allPassed }) => ($allPassed ? '#065f46' : '#991b1b')};
  margin-left: auto;
  white-space: nowrap;
`;

export const Chevron = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  color: #9ca3af;
  transition: transform 0.15s ease;
  transform: rotate(${({ $open }) => ($open ? '90deg' : '0deg')});
`;

export const RunDetail = styled.div`
  border-top: 1px solid #f1f5f9;
  padding: 8px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StepItem = styled.div`
  border: 1px solid #f1f5f9;
  border-radius: 6px;
  padding: 8px 10px;
`;

export const StepHead = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.74rem;
  font-weight: 600;
  color: #374151;
`;

export const StepBadge = styled.span`
  font-size: 0.6rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  background: ${({ $ok }) => ($ok ? '#d1fae5' : '#fee2e2')};
  color: ${({ $ok }) => ($ok ? '#065f46' : '#991b1b')};
`;

export const StepError = styled.p`
  margin: 6px 0 0;
  font-size: 0.7rem;
  color: #b91c1c;
  font-family: 'Courier New', Courier, monospace;
`;

export const AssertItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 0 0 4px;
  font-size: 0.72rem;
`;

export const AssertIcon = styled.span`
  font-size: 0.8rem;
  line-height: 1.2;
  color: ${({ $ok }) => ($ok ? '#10b981' : '#ef4444')};
  flex-shrink: 0;
`;

export const AssertBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const AssertTitle = styled.span`
  color: #374151;
  font-weight: 600;
`;

export const AssertMeta = styled.span`
  color: #6b7280;
  font-family: 'Courier New', Courier, monospace;
  word-break: break-word;
`;

export const AssertErrorText = styled.span`
  color: #b91c1c;
  font-family: 'Courier New', Courier, monospace;
  word-break: break-word;
`;

export const NoAsserts = styled.p`
  margin: 4px 0 0;
  font-size: 0.7rem;
  color: #9ca3af;
  font-style: italic;
`;
