import styled from 'styled-components';

const SIZE = {
  sm: 'padding: 5px 10px; font-size: 0.75rem; border-radius: 6px; gap: 4px;',
  md: 'padding: 9px 16px; font-size: 0.875rem; border-radius: 8px; gap: 6px;',
  lg: 'padding: 12px 22px; font-size: 1rem; border-radius: 8px; gap: 8px;',
};

export const Wrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-weight: 600;
  transition: background 0.15s, color 0.15s, border-color 0.15s, opacity 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1;
  ${({ $size = 'md' }) => SIZE[$size]}
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
  ${({ $variantCss }) => $variantCss}
`;
