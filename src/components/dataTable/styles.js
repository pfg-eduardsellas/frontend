import styled from 'styled-components';
import * as colors from 'constants/colors';

const SIZE = {
  sm: {
    wrapper: 'max-height: 260px; border-radius: 8px;',
    table: 'font-size: 0.74rem;',
    th: 'padding: 8px 10px; font-size: 0.62rem;',
    td: 'padding: 7px 10px; vertical-align: top;',
    empty: 'padding: 20px;',
  },
  md: {
    wrapper: 'border-radius: 12px; box-shadow: 0 1px 6px rgba(0,0,0,0.06);',
    table: 'font-size: 0.82rem;',
    th: 'padding: 12px 16px; font-size: 0.65rem;',
    td: 'padding: 12px 16px; vertical-align: middle;',
    empty: 'padding: 48px 16px;',
  },
};

export const Wrapper = styled.div`
  overflow: auto;
  border: 1px solid #e5e7eb;
  background: white;
  ${({ $size = 'md' }) => SIZE[$size].wrapper}

  &::-webkit-scrollbar { width: 6px; height: 6px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
  &::-webkit-scrollbar-corner { background: transparent; }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  ${({ $size = 'md' }) => SIZE[$size].table}
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
`;

export const Th = styled.th`
  text-align: left;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  background: ${colors.PRIMARY_TABLE};
  white-space: nowrap;
  user-select: none;
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  &:hover { color: ${({ $sortable }) => ($sortable ? '#eaeaea' : '#eaeaea')}; }
  ${({ $size = 'md' }) => SIZE[$size].th}
`;

export const ThContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  &:last-child { border-bottom: none; }
  &:hover { background: #fafbff; }
`;

export const Td = styled.td`
  color: #374151;
  line-height: 1.4;
  ${({ $size = 'md' }) => SIZE[$size].td}
`;

export const EmptyCell = styled.td`
  text-align: center;
  color: #9ca3af;
  font-size: 0.82rem;
  ${({ $size = 'md' }) => SIZE[$size].empty}
`;
