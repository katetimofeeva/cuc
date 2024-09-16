import React from "react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, className, label }) => {
  return (
    <li className={className}>
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default NavItem;
