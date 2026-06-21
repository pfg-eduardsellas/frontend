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

