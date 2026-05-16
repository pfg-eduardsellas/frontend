import { css } from 'styled-components';
import { Wrapper } from './styles';
import { PRIMARY, PRIMARY_HOVER, PRIMARY_DISABLED } from 'constants/colors';

const ICON_SIZE = { sm: 26, md: 34, lg: 40 };

const VARIANTS = {
  primary: css`
    background: ${PRIMARY};
    color: white;
    &:hover:not(:disabled) { background: ${PRIMARY_HOVER}; }
    &:disabled { background: ${PRIMARY_DISABLED}; cursor: not-allowed; }
  `,
  secondary: css`
    background: none;
    color: #6b7280;
    border: 1px solid #d1d5db;
    &:hover:not(:disabled) { border-color: #9ca3af; color: #374151; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `,
  ghost: css`
    background: none;
    color: #6b7280;
    padding: 0 2px;
    &:hover:not(:disabled) { color: ${PRIMARY}; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `,
  danger: css`
    background: none;
    color: #ef4444;
    &:hover:not(:disabled) { background: #fef2f2; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `,
  dark: css`
    background: #1e293b;
    color: #94a3b8;
    border: 1px solid #334155;
    &:hover:not(:disabled) { background: #334155; color: #e2e8f0; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `,
  select: css`
    background: #f8fafc;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 0.5rem 0.875rem;
    font-size: 0.875rem;
    font-weight: 400;
    justify-content: space-between;
    min-width: 170px;
    gap: 0.75rem;
    &:hover:not(:disabled) { background: #f1f5f9; }
    svg { width: 16px; height: 16px; color: #64748b; }
  `,
  oauth: css`
    background: white;
    color: #374151;
    border: 1.5px solid #e5e7eb;
    font-weight: 600;
    gap: 0.6rem;
    &:hover:not(:disabled) { background: #f9fafb; border-color: #d1d5db; }
    &:disabled { opacity: 0.6; cursor: not-allowed; }
  `,
  'terminal-tab': css`
    position: fixed;
    bottom: 0;
    right: 24px;
    z-index: 100;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(58, 58, 58, 0.85);
    backdrop-filter: blur(8px);
    border-radius: 6px 6px 0 0;
    color: #e2e8f0;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
    &:hover:not(:disabled) { background: rgba(80, 80, 80, 0.9); }
  `,
  minimize: css`
    background: none;
    color: rgba(0, 0, 0, 0.45);
    padding: 0 2px;
    font-size: 0.75rem;
    &:hover:not(:disabled) { color: rgba(0, 0, 0, 0.8); }
  `,
};

function getDynamicVariantCss(variant, { size, active, danger, divider, canOpen, checkDisabled, bgColor, bgHoverColor }) {
  if (variant === 'icon') return css`
    background: #f8fafc;
    color: #0f172a;
    border: 1px solid #e2e8f0;
    padding: 0;
    width: ${ICON_SIZE[size] ?? 34}px;
    height: ${ICON_SIZE[size] ?? 34}px;
    border-radius: 6px;
    gap: 0;
    &:hover:not(:disabled) { background: #f1f5f9; }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  `;

  if (variant === 'tab') return css`
    background: none;
    color: ${active ? PRIMARY : '#64748b'};
    border-bottom: 2px solid ${active ? PRIMARY : 'transparent'};
    border-radius: 0;
    padding: 6px 14px;
    font-weight: 500;
    font-size: 0.875rem;
    &:hover:not(:disabled) { color: ${PRIMARY}; }
  `;

  if (variant === 'menu-item') return css`
    background: none;
    color: ${danger ? '#dc2626' : '#0f172a'};
    justify-content: flex-start;
    width: 100%;
    padding: 10px 14px;
    font-weight: 500;
    font-size: 0.85rem;
    border-bottom: ${divider ? '1px solid #f1f5f9' : 'none'};
    border-radius: 0;
    gap: 10px;
    &:hover:not(:disabled) { background: ${danger ? '#fef2f2' : '#f8fafc'}; }
    svg { width: 15px; height: 15px; flex-shrink: 0; color: ${danger ? '#dc2626' : '#64748b'}; }
  `;

  if (variant === 'accordion') return css`
    flex: 1;
    justify-content: space-between;
    padding: 12px 8px;
    text-align: left;
    background-color: ${bgColor || '#ffffff'};
    cursor: ${checkDisabled ? 'not-allowed' : canOpen ? 'pointer' : 'default'};
    transition: background-color 0.2s;
    &:hover { background-color: ${bgHoverColor || '#f0f0f0'}; }
  `;

  return VARIANTS[variant];
}

function Button({
  variant = 'primary',
  size = 'md',
  text,
  icon,
  iconRight,
  children,
  disabled,
  onClick,
  fullWidth,
  className,
  title,
  type = 'button',
  active,
  danger,
  divider,
  canOpen,
  checkDisabled,
  bgColor,
  bgHoverColor,
  ...rest
}) {
  const variantCss = getDynamicVariantCss(variant, { size, active, danger, divider, canOpen, checkDisabled, bgColor, bgHoverColor });

  return (
    <Wrapper
      $variantCss={variantCss}
      $size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      className={className}
      title={title}
      type={type}
      {...rest}
    >
      {icon}
      {text != null && <span>{text}</span>}
      {children}
      {iconRight}
    </Wrapper>
  );
}

export default Button;
