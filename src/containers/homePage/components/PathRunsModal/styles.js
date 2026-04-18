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

export const RunsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
`;

export const RunsTableHead = styled.thead`
  background: #f1f5f9;

  th {
    padding: 7px 12px;
    text-align: left;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    border-bottom: 1px solid #e5e7eb;

    &:first-child { border-radius: 8px 0 0 0; }
    &:last-child  { border-radius: 0 8px 0 0; }
  }
`;

export const RunsTableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #f1f5f9;
    &:last-child { border-bottom: none; }
    &:hover { background: #f8fafc; }
  }

  td {
    padding: 8px 12px;
    vertical-align: middle;
    color: #374151;
  }
`;

export const RunStatus = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${({ $status }) => ({
    passed: '#d1fae5',
    failed: '#fee2e2',
    running: '#dbeafe',
    error: '#fee2e2',
  }[$status] ?? '#f3f4f6')};
  color: ${({ $status }) => ({
    passed: '#065f46',
    failed: '#991b1b',
    running: '#1e40af',
    error: '#991b1b',
  }[$status] ?? '#374151')};
`;

export const RunTime = styled.span`
  font-size: 0.72rem;
  color: #9ca3af;
  white-space: nowrap;
`;

export const ResultCell = styled.code`
  font-size: 0.68rem;
  font-family: 'Courier New', Courier, monospace;
  color: #374151;
  background: #f1f5f9;
  border-radius: 4px;
  padding: 2px 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RunsTableWrapper = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  max-height: 240px;
  overflow-y: auto;
`;

export const EmptyRuns = styled.p`
  font-size: 0.8rem;
  color: #9ca3af;
  margin: 0;
  text-align: center;
  padding: 20px 0;
`;
