import React from "react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  className,
  label,
  onClick,
}) => {
  return (
    <li className={className}>
      <Link
        href={href}
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
