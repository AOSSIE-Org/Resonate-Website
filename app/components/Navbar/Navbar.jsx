import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../public/resonate_logo_white.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-white py-4 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Resonate Logo" width={30} height={30} className="mr-2" />
          <span className="font-bold text-lg dark:text-white">Resonate</span>
        </Link>

        <div className="flex items-center">
          <Link href="/about" className="px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">About</Link>
          <Link href="/features" className="px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Features</Link>
          <Link href="/download" className="px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Download</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
