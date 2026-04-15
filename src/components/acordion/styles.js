import styled from 'styled-components';
import { BADGE_COLORS } from '../badge/constant';

export const Container = styled.div`
border: 1px solid #e2e8f0; 
  border-radius: 0.75rem; 
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #ffffffad;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: stretch;
  width: 100%;
  padding: 8px;
  gap:8px;
`;
export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f5f9fc ;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #f5f9fc ;
`;

export const StyledButton = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  text - align: left;
  background-color: ${({ $type }) => BADGE_COLORS[$type]?.background || '#ffff'};
  ${({ $canOpen, $checkDisabled }) => `cursor: ${$checkDisabled ? 'not-allowed' : $canOpen ? 'pointer' : 'default'};`}
  transition: background-color 0.2s;
  &:hover {
  background-color: ${({ $type }) => BADGE_COLORS[$type]?.hover || '#f0f0f0'};
  }
`
export const ColorDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  background-color: ${({ $type }) => BADGE_COLORS[$type]?.primary || 'transparent'};
`;
