"use client";
import React from 'react';
import { SITE_LOGO } from '../lib/site-assets';

const footerLinks = [
  { href: '#event', label: 'Events' },
  { href: '#goals', label: 'Goals' },
  { href: '#pathways', label: 'Ecosystem' },
  { href: '#bio', label: 'Bio' },
  { href: '#proof', label: 'Worth it' },
  { href: '#stories', label: 'Stories' },
  { href: '#media', label: 'Media' },
  { href: '#coaching', label: 'Coaching' },
  { href: '#scale', label: 'Results' },
  { href: '#credentials', label: 'Authority' },
  { href: '#contact', label: 'Consultation' },
];

export function ModernFooter() {
  return (
    <footer className="tf-site-footer">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
        <div style={{ maxWidth: '320px' }}>
          <img
            src={SITE_LOGO}
            alt="Leuterio"
            style={{ height: '32px', width: 'auto', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
          />
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
            Coaching, training, and ecosystem access for real estate professionals who want scalable growth—not another motivational sprint.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1.5rem' }}>SITE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {footerLinks.map(({ href, label }) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1.5rem' }}>CONNECT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <a href="https://www.facebook.com/TonLeuterioOfficial" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://www.instagram.com/tonleuterio/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://www.linkedin.com/in/tonleuterio/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
        <span>© {new Date().getFullYear()} Anthony Leuterio. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
