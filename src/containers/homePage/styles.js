import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  background-color: #EBF0FB;
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
  background-color: #f5f9fc;
  border-radius: 10px;
  overflow: hidden;
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

