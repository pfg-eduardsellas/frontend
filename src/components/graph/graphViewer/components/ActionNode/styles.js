import styled from 'styled-components';

export const BadgesRow = styled.span`
  display: flex;
  gap: 4px;
`;

export const A11yItem = styled.div`
  padding: 8px 10px;
  background: #faf5ff;
  border: 1px solid #ddd6fe;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const A11yHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const ImpactBadge = styled.span`
  background: ${({ $impact }) => ({
    critical: '#dc2626',
    serious: '#ea580c',
    moderate: '#ca8a04',
    minor: '#9ca3af',
  })[$impact] ?? '#9ca3af'};
  color: white;
  font-size: 0.6rem;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 4px;
  text-transform: uppercase;
  flex-shrink: 0;
`;

export const A11yDescription = styled.p`
  font-size: 0.68rem;
  margin: 0;
  line-height: 1.35;
`;

export const AffectedCount = styled.span`
  font-size: 0.65rem;
`;
