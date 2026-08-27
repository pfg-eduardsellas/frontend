
import styled from 'styled-components';

export const GraphContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #d2d8dd;
  border-radius: 10px;
  background: #fff;

  &:fullscreen {
    border: none;
    border-radius: 0;
  }

  ${({ $fullscreen }) =>
    $fullscreen &&
    `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    border: none;
    border-radius: 0;
  `}
`;
