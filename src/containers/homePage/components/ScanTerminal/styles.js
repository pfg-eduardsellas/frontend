import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(0);    opacity: 1; }
  to   { transform: translateY(100%); opacity: 0; }
`;

const tabRise = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
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

export const MinimizeButton = styled.button`
  background: none;
  border: none;
  padding: 0 2px;
  margin-left: 8px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.45);
  font-size: 0.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
  &:hover { color: rgba(0, 0, 0, 0.8); }
`;

export const MinimizedTab = styled.button`
  position: fixed;
  bottom: 0;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: rgba(58, 58, 58, 0.85);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  color: #e2e8f0;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.2);
  &:hover { background: rgba(80, 80, 80, 0.9); }
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
