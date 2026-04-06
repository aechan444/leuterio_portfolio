"use client";
import React, { useState } from 'react';
import { SITE_LOGO } from '../lib/site-assets';

const links: { href: string; label: string }[] = [
  { href: '#goals', label: 'Goals' },
  { href: '#pathways', label: 'Ecosystem' },
  { href: '#bio', label: 'Bio' },
  { href: '#proof', label: 'Worth it' },
  { href: '#stories', label: 'Stories' },
  { href: '#media', label: 'Media' },
  { href: '#coaching', label: 'Coaching' },
  { href: '#credentials', label: 'Authority' },
];

export function ModernNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="top-bar">
      <a href="#hero" className="brand-logo-container" onClick={() => setOpen(false)}>
        <img src={SITE_LOGO} alt="Leuterio" style={{ height: '35px', width: 'auto' }} />
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
      </button>
      <div className={`nav-panel${open ? ' open' : ''}`} id="primary-nav">
        <nav className="brand-id" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {links.map(({ href, label }) => (
            <a key={href} href={href} style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="header-cta" onClick={() => setOpen(false)}>
          Take the first step
        </a>
      </div>
    </div>
  );
}
