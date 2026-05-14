import styled from 'styled-components';

export const StatsBar = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: stretch;
`;

export const StatCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  gap: 3px;
  min-width: 0;
`;

export const StatIcon = styled.div`
  font-size: 1.5rem;
  background: #6366f1;
  border-radius: 6px;
  color: white;
  padding: 8px 16px;
`;
export const StatInfo = styled.div`
flex: 1;
display: flex;
flex-direction: column;
gap: 4px;

`;
export const StatValue = styled.span`
  font-size: 1.65rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
`;

export const StatLabel = styled.span`
  font-size: 0.63rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

export const ScanStatusPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3px;
  padding: 10px 16px;
  border-radius: 10px;
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 1px solid;
  background: ${({ $status }) =>
    ({ running: '#dbeafe', pending: '#fef3c7', done: '#d1fae5', error: '#fee2e2' }[$status] ?? '#f3f4f6')};
  color: ${({ $status }) =>
    ({ running: '#1e40af', pending: '#92400e', done: '#065f46', error: '#991b1b' }[$status] ?? '#374151')};
  border-color: ${({ $status }) =>
    ({ running: '#bfdbfe', pending: '#fde68a', done: '#a7f3d0', error: '#fecaca' }[$status] ?? '#e5e7eb')};
`;

export const PulsingDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: ${({ $animate }) => $animate ? 'pulse 1.4s ease-in-out infinite' : 'none'};

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }
`;

