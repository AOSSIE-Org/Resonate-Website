"use client";
import React, { useMemo, useEffect } from "react";
import "./Footer.css";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.SocialShareButton) {
        new window.SocialShareButton({
          container: "#share-button",
          url: "https://aossie.org", 
          title: "Check out AOSSIE!"
        });
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="copyright">&copy; {currentYear}</div>

        <div className="footer-socials">
          <a
            href="https://github.com/AOSSIE-Org"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/aossie_org"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Twitter/X"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.linkedin.com/company/aossie"
            rel="noopener noreferrer"
            target="_blank"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* 🔥 Share Button */}
        <div id="share-button" style={{ marginTop: "1rem" }}></div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);