"use client";
import React, { useState } from 'react';
import { SITE_LOGO } from '../lib/site-assets';

const links = [
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
    <header className="header-container">
      {/* Restructured Main Bar */}
      <div className="header-tier-two">
        <a href="#hero" className="brand-logo-container" onClick={() => setOpen(false)}>
          <img src={SITE_LOGO} alt="Leuterio" style={{ height: '32px', width: 'auto' }} />
        </a>

        <div className="header-nav">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="header-nav-item" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="#contact" className="header-main-cta" onClick={() => setOpen(false)}>
            Take the first step
          </a>
          
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
            style={{ display: 'none' }} // Controlled by CSS media queries
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay — simplified for restructure */}
      {open && (
        <div className="mobile-overlay-menu" style={{ 
          position: 'fixed', top: '4rem', left: '0', width: '100vw', height: '100vh',
          background: '#fff', padding: '2rem', zIndex: 4999, display: 'flex',
          flexDirection: 'column', gap: '1.5rem'
        }}>
          {links.map(({ href, label }) => (
            <a key={href} href={href} style={{ textDecoration: 'none', color: '#051225', fontWeight: 700, fontSize: '1.25rem', textTransform: 'uppercase' }} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#contact" className="header-main-cta" style={{ textAlign: 'center', marginTop: '1rem' }} onClick={() => setOpen(false)}>
            Take the first step
          </a>
        </div>
      )}
    </header>
  );
}
