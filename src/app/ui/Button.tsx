// /app/ui/Button.tsx
import React, { ReactNode } from "react";

interface ButtonProps {
  toggleMenu: () => void;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  toggleMenu,
  className = "",
  children,
}) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center p-2 rounded-md  hover:text-accent focus:outline-none ${className}`}
      onClick={toggleMenu}
    >
      {children}
    </button>
  );
};

export default Button;
