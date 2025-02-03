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
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 7.5L7.5 22.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 7.5L22.5 22.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
