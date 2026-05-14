import styled from 'styled-components';

export const FilterBar = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button`
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
  border: 1.5px solid ${({ $active, $color }) => $active ? $color : '#e5e7eb'};
  background: ${({ $active, $bg }) => $active ? $bg : 'white'};
  color: ${({ $active, $color }) => $active ? $color : '#9ca3af'};
  transition: all 0.15s;
  &:hover { border-color: ${({ $color }) => $color}; color: ${({ $color }) => $color}; }
`;

export const TableWrapper = styled.div`
  overflow: auto;
  max-height: 260px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.74rem;
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Th = styled.th`
  padding: 8px 10px;
  text-align: left;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  font-size: 0.62rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  &:hover { color: #374151; }
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  &:last-child { border-bottom: none; }
  &:hover { background: #fafafa; }
`;

export const Td = styled.td`
  padding: 7px 10px;
  color: #374151;
  vertical-align: top;
  line-height: 1.4;
  max-width: 180px;
`;

export const ImpactBadge = styled.span`
  background: ${({ $impact }) =>
    ({ critical: '#dc2626', serious: '#ea580c', moderate: '#ca8a04', minor: '#9ca3af' }[$impact] ?? '#9ca3af')};
  color: white;
  font-size: 0.58rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
`;

export const TruncatedText = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.72rem;
`;

export const EmptyCell = styled.td`
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 0.78rem;
`;

export const SortIcon = styled.span`
  margin-left: 3px;
  font-size: 0.6rem;
  opacity: 0.6;
`;
