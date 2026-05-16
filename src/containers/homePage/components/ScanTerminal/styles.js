import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(0);    opacity: 1; }
  to   { transform: translateY(100%); opacity: 0; }
`;


export const Container = styled.div`
  position: absolute;
  bottom: 8px;
  width: 100%;
  padding: 0px 4px;
  max-height: 350px;
  animation: ${({ $closing }) => $closing ? slideDown : slideUp} 220ms ease forwards;
`;

export const Wrapper = styled.div`
  position: relative;
  z-index: 10;
  border: 1px solid #e5e5e5;
  backdrop-filter: blur(24px);
  background:rgba(255, 255, 255, 0.80);
  border-radius: 14px;
  overflow: hidden;
  width: 100%;
  max-height: inherit;
  display: flex;
  flex-direction: column;
  flex:1;
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  background: #e7e7e7cc;
  flex-shrink: 0;
`;

export const Title = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  color:rgba(0, 0, 0, 0.51), 0);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  
`;

export const Count = styled.span`
  font-size: 0.62rem;
  color:rgb(0, 0, 0);
  margin-left: auto;
`;


export const LogsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  line-height: 1.6;
  max-height: 100%;
`;

export const LogLine = styled.div`
  color: #525252;
  &::before {
    content: '>  ';
    color: #096;
  }
`;
