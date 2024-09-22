// /app/ui/Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
  toggleMenu?: () => void;
  className?: string;
  children: ReactNode;
  type?: "button" | "reset" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  toggleMenu,
  className = "",
  children,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center p-2   focus:outline-none ${className}`}
      onClick={toggleMenu}
    >
      {children}
    </button>
  );
};

export default Button;
