import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
} from './styles';

/**
 * Modal component.
 *
 * Props:
 *  isOpen         — boolean, controls visibility
 *  onClose        — called on overlay click, Escape key or close button
 *  title          — string shown in the header (optional)
 *  children       — body content
 *  footer         — node rendered inside ModalFooter (optional)
 *  size           — 'sm' | 'md' | 'lg' | 'xl' | 'full' | any CSS width  (default 'md')
 *  closeOnOverlay — close when clicking the backdrop (default true)
 *  showClose      — show the × button in the header (default true)
 *  bodyPadding    — override body padding, e.g. '0' for flush content
 *  footerAlign    — 'flex-start' | 'center' | 'flex-end' | 'space-between' (default 'flex-end')
 */
function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  showClose = true,
  bodyPadding,
  footerAlign,
}) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={closeOnOverlay ? onClose : undefined}>
      <ModalContainer $size={size} onClick={(e) => e.stopPropagation()}>

        {(title != null || showClose) && (
          <ModalHeader>
            {title != null && <ModalTitle>{title}</ModalTitle>}
            {showClose && (
              <CloseButton onClick={onClose} aria-label="Close">✕</CloseButton>
            )}
          </ModalHeader>
        )}

        <ModalBody $padding={bodyPadding}>{children}</ModalBody>

        {footer && <ModalFooter $align={footerAlign}>{footer}</ModalFooter>}

      </ModalContainer>
    </Overlay>,
    document.body
  );
}

/* ── Sub-components for compound usage ────────────────────────────────────
 *
 * <Modal.Header>  — custom header (replaces title + close button)
 * <Modal.Body>    — content wrapper with padding
 * <Modal.Footer>  — footer wrapper
 *
 * Usage:
 *   <Modal isOpen={open} onClose={close} showClose={false}>
 *     <Modal.Header>
 *       <h2>Custom header</h2>
 *       <button onClick={close}>✕</button>
 *     </Modal.Header>
 *     <Modal.Body>content</Modal.Body>
 *     <Modal.Footer>
 *       <button onClick={close}>Cancel</button>
 *     </Modal.Footer>
 *   </Modal>
 */
Modal.Header = function ModalHeaderSlot({ children }) {
  return <ModalHeader>{children}</ModalHeader>;
};
Modal.Body = function ModalBodySlot({ children, padding }) {
  return <ModalBody $padding={padding}>{children}</ModalBody>;
};
Modal.Footer = function ModalFooterSlot({ children, align }) {
  return <ModalFooter $align={align}>{children}</ModalFooter>;
};

export default Modal;
