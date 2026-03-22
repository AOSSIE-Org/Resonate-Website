"use client";
import React, { useState } from "react";
import "./Navbar.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Logo from "@/assets/resonate_logo_white.svg";
import { NAV_LINKS } from "@/constants/links";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={scrollToTop}>
          <img src={Logo.src} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          ☰
        </button>

        {/* Links */}
        <div className={`navbar-links ${open ? "open" : ""}`}>
          {NAV_LINKS.map((link, index) => {
            if (link.type === "button") {
              return (
                <a
                  key={index}
                  href={link.url}
                  className="download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              );
            }

            return (
              <a
                key={index}
                href={link.url}
                className="nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
                {link.external && <FaExternalLinkAlt size={12} />}
                {link.icon === "github" && <FaGithub size={20} />}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;