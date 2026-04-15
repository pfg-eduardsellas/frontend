import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.96) translateY(-10px); }
  to   { opacity: 1; transform: scale(1)    translateY(0); }
`;

const SIZES = {
  sm:   '400px',
  md:   '560px',
  lg:   '720px',
  xl:   '900px',
  full: '95vw',
};

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: ${fadeIn} 180ms ease;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(0, 0, 0, 0.06);
  width: ${({ $size }) => SIZES[$size] ?? $size};
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${scaleIn} 200ms ease;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  flex-shrink: 0;
  gap: 12px;
`;

export const ModalTitle = styled.h2`
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  flex: 1;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  font-size: 1rem;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.15s, background 0.15s;
  &:hover { color: #475569; background: #f1f5f9; }
`;

export const ModalBody = styled.div`
  padding: ${({ $padding }) => $padding ?? '20px'};
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => $align ?? 'flex-end'};
  gap: 8px;
  padding: 12px 20px;
  border-top: 1px solid #f1f5f9;
  flex-shrink: 0;
`;
