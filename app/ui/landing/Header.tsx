"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav
      className={
        !navbarOpen
          ? "fixed mx-auto top-[2rem] left-0 right-0 z-10 bg-blue-500 w-[95%] rounded-full"
          : "fixed mx-auto top-[2rem] left-0 right-0 z-10 bg-blue-500 w-[95%]"
      }
    >
      <div className="flex container flex-wrap items-center justify-between mx-auto py-2 px-4 lg:py-3 max-[280px]:px-2">
        <Link href={"/"} className="text-xl font-semibold flex">
          <Image
            src="/logo.svg"
            alt="company logo"
            width={30}
            height={30}
          />
          <p className="text-white text-2xl ml-2 max-md:hidden">Trankeep</p>
        </Link>
        <div className="mobile-menu block lg:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 text-gray-900"
            >
              <Bars3Icon className="h-5 w-5 text-white" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2"
            >
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>
          )}
        </div>
        <div className="hidden lg:block">
          <Link href="/login">
            <button className="bg-white text-gray-900 border border-gray-400 px-2 py-2 rounded-full">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-white bg-blue-700 px-2 py-2 rounded-full ml-2">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay /> : null}
    </nav>
  );
};

export default Header;
