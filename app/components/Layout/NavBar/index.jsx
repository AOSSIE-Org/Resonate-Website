"use client";
import React, { useState } from "react";
import "./Navbar.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Logo from "@/assets/resonate_logo_white.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Scroll to top and close mobile menu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  // Close menu when a link is clicked
  const handleLinkClick = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={scrollToTop}
          style={{ cursor: "pointer" }}
        >
          <img src={Logo.src} alt="Resonate Logo" className="logo-icon" />
          <span className="logo-text">Resonate</span>
        </div>

        {/* Hamburger button for mobile */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          ☰
        </button>

        {/* Navigation links */}
        <div className={`navbar-links ${open ? "open" : ""}`}>
          <a
            href="https://aossie.org"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={handleLinkClick}
          >
            AOSSIE <FaExternalLinkAlt size={12} />
          </a>

          <a
            href="https://github.com/AOSSIE-Org/Resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={handleLinkClick}
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.resonate.resonate"
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
            onClick={handleLinkClick}
          >
            Download Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
