import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../button";
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "./styles";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showClose = true,
  bodyPadding,
  footerAlign,
}) {
  // Prevent body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={closeOnOverlay ? onClose : undefined}>
      <ModalContainer $size={size} onClick={(e) => e.stopPropagation()}>
        {(title != null || showClose) && (
          <ModalHeader>
            {title != null && <ModalTitle>{title}</ModalTitle>}
            {showClose && (
              <Button
                variant="icon"
                size="sm"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </Button>
            )}
          </ModalHeader>
        )}

        <ModalBody $padding={bodyPadding}>{children}</ModalBody>

        {footer && <ModalFooter $align={footerAlign}>{footer}</ModalFooter>}
      </ModalContainer>
    </Overlay>,
    document.body,
  );
}

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
