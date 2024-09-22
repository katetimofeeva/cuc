"use client";
import SideBar from "../../components/SideBar";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  console.log(isOpen, "open");
  const toggleSidebar = () => {
    console.log(5);
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-grow">
      <div
        className={`flex-none  ${
          isOpen ? "w-64" : "w-20"
        } bg-primary text-text transition-width duration-300 min-h-full relative`}
      >
        <SideBar
          toggleSidebar={toggleSidebar}
          isOpen={isOpen}
        />
      </div>
      <div className="flex-grow p-6 md:p-12 overflow-y-auto">{children}</div>
    </div>
  );
};

export default Layout;
