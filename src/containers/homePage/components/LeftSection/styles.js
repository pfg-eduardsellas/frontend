import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  position: relative;
  background-color: #f5f9fc;
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
