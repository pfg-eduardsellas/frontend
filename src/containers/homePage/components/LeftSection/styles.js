import styled from 'styled-components';

export const Wrapper = styled.div`
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
