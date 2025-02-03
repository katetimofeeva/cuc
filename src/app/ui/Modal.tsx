"use client";
import { useEffect } from "react";
import { IPropsModal } from "../../../type";

const Modal = ({
  isOpen,
  onClose,
  children,
  ariaLabelledby,
  className,
}: IPropsModal) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Автофокус на первом инпуте при открытии
      const firstInput = document.querySelector(
        "input, textarea, button"
      ) as HTMLElement;
      firstInput?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledby}
      onClick={handleClose}
    >
      <div className={`relative bg-white   max-w-md w-full mx-2 ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-text hover:text-accentText z-40"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"></path>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
