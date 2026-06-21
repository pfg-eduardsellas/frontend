import styled from 'styled-components';

export const ScanHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
    -webkit-box-shadow: 5px 5px 5px 0px rgba(119, 119, 119, 0.12); 
box-shadow: 5px 5px 5px 0px rgba(119, 119, 119, 0.12);
`;
export const Row = styled.div`
  display: flex;
  width: 100%;
    justify-content: space-between;
  `;
export const ScanHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ScanHeaderUrl = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusBadge = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
  background: ${({ $status }) => ({ pending: '#fef3c7', running: '#dbeafe', done: '#d1fae5', error: '#fee2e2' })[$status] ?? '#f3f4f6'};
  color: ${({ $status }) => ({ pending: '#92400e', running: '#1e40af', done: '#065f46', error: '#991b1b' })[$status] ?? '#374151'};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  background-color: #EBF0FB;
  position: relative;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 8px;
  gap: 8px;
  overflow-y: auto;
`;

export const GraphSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 480px;
  flex-shrink: 0;
  min-width: 0;
  position: relative;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
    -webkit-box-shadow: 5px 5px 5px 0px rgba(119, 119, 119, 0.12); 
box-shadow: 5px 5px 5px 0px rgba(119, 119, 119, 0.12);
`;

export const GraphHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
  padding: 8px;
  position: absolute;
  z-index: 10;
`;

export const BottomPanels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
`;

