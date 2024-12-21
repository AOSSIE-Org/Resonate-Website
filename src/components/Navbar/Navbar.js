import React from "react";
import "./Navbar.css";
import Resonate_Logo from "../../public/Resonate_Logo.png";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Resonate_Logo} alt="Resonate_Logo" className="icon" />
        <span className="app-name">Resonate</span>
      </div>

      {/* Hamburger Menu */}
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Links */}
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <a href="https://aossie.org/" className="icon-link">
          AOSSIE
          <FaExternalLinkAlt color="white" style={{ marginLeft: "5px" }} />
        </a>
        <a
          href="https://github.com/AOSSIE-Org"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiGithub color="white" className="icon" />
        </a>
        <button className="download-button">Download Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
