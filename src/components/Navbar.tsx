// src/components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import NavItem from "../app/ui/NavItem";
import Image from "next/image";
import Button from "@/app/ui/Button";

const menu = [
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-background  border-b-2 border-transparent shadow-border-shadow  fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src={"/logo.svg"}
                alt="Pro carpet and upholstery cleaning is your reliable partner. Forward to home page"
                width={132}
                height={47}
                priority
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div>
              {/* link to phone number */}
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2  group relative"
              >
                <svg
                  className=" group-focus:text-accent absolute right-[2%] opacity-100 md:group-hover:opacity-0 transition-all duration-500 ease-in-out "
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.65387 1.32849C3.40343 1.00649 2.92745 0.976861 2.639 1.26531L1.60508 2.29923C1.1216 2.78271 0.94387 3.46766 1.1551 4.06847C2.00338 6.48124 3.39215 8.74671 5.32272 10.6773C7.25329 12.6078 9.51876 13.9966 11.9315 14.8449C12.5323 15.0561 13.2173 14.8784 13.7008 14.3949L14.7347 13.361C15.0231 13.0726 14.9935 12.5966 14.6715 12.3461L12.3653 10.5524C12.2008 10.4245 11.9866 10.3793 11.7845 10.4298L9.59541 10.9771C9.00082 11.1257 8.37183 10.9515 7.93845 10.5181L5.48187 8.06155C5.04849 7.62817 4.87427 6.99919 5.02292 6.40459L5.57019 4.21553C5.62073 4.01336 5.57552 3.79918 5.44758 3.63468L3.65387 1.32849ZM1.88477 0.511076C2.62689 -0.231039 3.8515 -0.154797 4.49583 0.673634L6.28954 2.97983C6.6187 3.40304 6.73502 3.95409 6.60498 4.47423L6.05772 6.66329C5.99994 6.8944 6.06766 7.13888 6.2361 7.30732L8.69268 9.7639C8.86113 9.93235 9.1056 10.0001 9.33671 9.94229L11.5258 9.39502C12.0459 9.26499 12.597 9.3813 13.0202 9.71047L15.3264 11.5042C16.1548 12.1485 16.231 13.3731 15.4889 14.1152L14.455 15.1492C13.7153 15.8889 12.6089 16.2137 11.5778 15.8512C9.01754 14.9511 6.61438 13.4774 4.56849 11.4315C2.5226 9.38562 1.04895 6.98246 0.148838 4.42225C-0.213682 3.39112 0.11113 2.28472 0.85085 1.545L1.88477 0.511076Z"
                    fill="currentColor"
                  />
                </svg>
                <p className="opacity-0 group-hover:opacity-100 hidden md:flex  transition-all duration-500 ease-in-out text-accent font-bold">
                  +1 (707) 570-9711
                </p>
              </a>
            </div>
            {/* Мenu for big  screen */}
            <ul className="hidden md:flex items-center space-x-8 ">
              {menu.map(({ href, label }) => {
                return (
                  <NavItem
                    key={href}
                    href={href}
                    label={label}
                    className={"hover:text-accent"}
                  />
                );
              })}
            </ul>

            {/* burger menu for mobile device */}
            <div className="flex items-center md:hidden group">
              <Button
                toggleMenu={toggleMenu}
                className={"text-text hover:text-accent"}
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
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
                  <svg
                    className="h-6 w-6 "
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
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="px-4 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-end">
            {menu.map(({ href, label }) => {
              return (
                <NavItem
                  key={href}
                  href={href}
                  label={label}
                  className={`block hover:text-accent`}
                />
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
