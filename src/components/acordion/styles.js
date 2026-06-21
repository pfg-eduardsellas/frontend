import styled from 'styled-components';
import { BADGE_COLORS } from '../badge/constant';

export const Container = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${({ $plain }) => $plain ? '0 1px 6px rgba(0,0,0,0.08)' : '0 4px 30px rgba(0,0,0,0.1)'};
  background-color: ${({ $plain }) => $plain ? '#ffffff' : '#ffffffad'};
  backdrop-filter: ${({ $plain }) => $plain ? 'none' : 'blur(5px)'};
  -webkit-backdrop-filter: ${({ $plain }) => $plain ? 'none' : 'blur(5px)'};
`;

export const ColorDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  background-color: ${({ $type }) => BADGE_COLORS[$type]?.primary || 'transparent'};
`;
