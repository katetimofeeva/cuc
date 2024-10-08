import Button from "@/app/ui/Button";
import NavItem from "@/app/ui/NavItem";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const menu = [
  {
    href: "/services/sofa",
    label: "Cleaning the sofa",
    className: "text-gray-700 hover:text-accent",
  },
  {
    href: "/blog",
    label: "Blog",
    className: "text-gray-700 hover:text-accent",
  },
  {
    href: "/contact",
    label: "Contact",
    className: "text-gray-700 hover:text-accent",
  },
];

export default function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
  return (
    <>
      <Button
        toggleMenu={toggleSidebar}
        className={"absolute right-0 hover:text-accent"}
      >
        {isOpen ? (
          <svg
            className="h-6 w-6 group-hover:text-accent right"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          "Open"
        )}
      </Button>
      <nav className="mt-5">
        <ul>
          {menu.map(({ href, label }) => (
            <NavItem
              key={href}
              href={href}
              label={label}
              className={"mb-2 flex items-center p-4 hover:text-white"}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}
