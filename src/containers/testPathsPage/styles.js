import styled from 'styled-components';
import * as colors from 'constants/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  background-color: #EBF0FB;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 32px;
  gap: 20px;
  overflow-y: auto;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const PageTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px;
`;

export const ScanContext = styled.p`
  font-size: 0.8rem;
  color: #64748b;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 500px;
`;


export const EmptyState = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
  text-align: center;
  margin: 60px auto;
`;

export const DisabledNotice = styled.div`
  background: #fef9c3;
  border: 1px solid #fde047;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 0.82rem;
  color: #713f12;
`;

export const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  white-space: nowrap;
  cursor: ${({ $sortable }) => $sortable ? 'pointer' : 'default'};
  user-select: none;
  &:hover { color: ${({ $sortable }) => $sortable ? '#374151' : '#6b7280'}; }
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  &:last-child { border-bottom: none; }
  &:hover { background: #fafbff; }
`;

export const Td = styled.td`
  padding: 12px 16px;
  color: #374151;
  vertical-align: middle;
  line-height: 1.4;
`;

export const EmptyCell = styled.td`
  padding: 48px 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.82rem;
`;

export const ScheduleTag = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  color: ${colors.SECONDARY_TEXT};
  background: ${colors.SECONDARY_BG};
  border-radius: 4px;
  padding: 2px 8px;
  white-space: nowrap;
`;

export const NodesBadge = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  color: ${colors.SECONDARY_TEXT};
  background: ${colors.SECONDARY_BG};
  border-radius: 999px;
  padding: 1px 7px;
  align-self: flex-start;
`;

export const NodesPath = styled.span`
  font-size: 0.7rem;
  font-family: 'Courier New', Courier, monospace;
  color: #94a3b8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
  display: block;
`;

export const ActionCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;

