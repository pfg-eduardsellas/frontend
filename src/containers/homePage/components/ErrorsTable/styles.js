import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow: auto;
  max-height: 240px;
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
`;

export const TypeBadge = styled.span`
  background: ${({ $type }) => ({ URL: '#dbeafe', BUTTON: '#d8fad1', LINK: '#ffedd5', FORM: '#e3defb' }[$type] ?? '#f3f4f6')};
  color: ${({ $type }) => ({ URL: '#1e40af', BUTTON: '#065f46', LINK: '#9a3412', FORM: '#5b21b6' }[$type] ?? '#374151')};
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  white-space: nowrap;
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
