import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IModal {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, open, onClose, className = "" }: IModal) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  const modalElement = document.getElementById("modal");

  useEffect(() => {
    const dialogElement = dialog.current;

    if (modalElement && dialogElement) {
      open ? dialogElement.showModal() : dialogElement.close();
    }

    return () => dialogElement?.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal") || document.body
  );
};

export default Modal;
