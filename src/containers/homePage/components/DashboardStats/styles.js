import styled from 'styled-components';
import * as colors from 'constants/colors';

export const StatsBar = styled.div`
width: 100%;
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: stretch;
`;

export const StatCard = styled.div`
  flex: 1;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  background: #EBF0FB;
  -webkit-box-shadow: inset 5px 5px 5px 0px rgba(119, 119, 119, 0.12); 
box-shadow: inset 5px 5px 5px 0px rgba(119, 119, 119, 0.12);
  gap: 3px;
  min-width: 0;
`;

export const StatIcon = styled.div`
  font-size: 1.5rem;
  background: ${colors.PRIMARY};
  -webkit-box-shadow: 5px 5px 5px 0px rgba(73, 73, 73, 0.12); 
  box-shadow: 5px 5px 5px 0px rgba(87, 87, 87, 0.12);
  border-radius: 6px;
  color: #EBF0FB;
  padding: 8px 16px;
`;
export const StatInfo = styled.div`
flex: 1;
display: flex;
flex-direction: column;
gap: 4px;

`;
export const StatValue = styled.span`
  font-size: 1.65rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
`;

export const StatLabel = styled.span`
  font-size: 0.63rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

