import styled from 'styled-components';


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
