"use client";

import { ThemeToggle } from "./theme-toggle";

export function FloatingNav() {
  return (
    <div className="floating-nav">
      <a href="#hero" className="nav-item" aria-label="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span className="nav-tooltip">START</span>
      </a>
      <a href="#story" className="nav-item" aria-label="About">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
        <span className="nav-tooltip">ABOUT</span>
      </a>
      <a href="#programs" className="nav-item" aria-label="Programs">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <span className="nav-tooltip">PROGRAMS</span>
      </a>
      <a href="#ventures" className="nav-item" aria-label="Ventures">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
        <span className="nav-tooltip">ECOSYSTEM</span>
      </a>
      <a href="#scale" className="nav-item" aria-label="Awards">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 15l-2 5h4l-2-5zm0 0l2-10-2 10zm0 0l-2-10 2 10zM12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"></path>
        </svg>
        <span className="nav-tooltip">AWARDS</span>
      </a>
      <a href="#contact" className="nav-item" aria-label="Contact">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
        <span className="nav-tooltip">CONNECT</span>
      </a>
      <ThemeToggle />
    </div>
  );
}
