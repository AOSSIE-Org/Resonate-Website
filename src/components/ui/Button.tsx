"use client";

import React from "react";
import { Link } from "@/i18n/navigation";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "type1" | "type2";
  right_arrow?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({ 
  children, 
  onClick, 
  className = "", 
  variant = "type1",
  right_arrow = false,
  href,
  target,
  rel
}: ButtonProps) {
  
  // Base classes (including ingrained sizing and spacing)
  const baseClasses = "inline-flex items-center justify-center rounded-full font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer border-[1.5px] h-9 xl:h-10 px-4 xl:px-6 text-sm xl:text-md gap-2 group";
  
  // Variant 1: Exact same as Navbar (Transparent/Filled based on theme variables)
  const variant1Classes = "bg-(--button-primary-bg) text-(--button-primary-text) border-(--button-primary-border) hover:bg-(--button-primary-hover-bg) hover:border-(--button-primary-hover-border)";
  
  // Variant 2: Opposite (Outlined in dark mode, Filled in light mode)
  // Light Mode: Filled (Background black, Text white)
  // Dark Mode: Outlined (Background transparent, Text white, Border white)
  const variant2Classes = "bg-(--button-tertiary-bg) text-white border-(--button-secondary-text) hover:opacity-90";

  const combinedClasses = `${baseClasses} ${variant === "type1" ? variant1Classes : variant2Classes} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {right_arrow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target} rel={rel}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}
