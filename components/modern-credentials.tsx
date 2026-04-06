"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const credentials = [
  { title: 'Creating Brand Value', body: 'Harvard Business School Online — 2025', cta: 'Learn more', href: '#contact' },
  { title: 'AI Essentials for Business', body: 'Harvard Business School Online — 2025', cta: 'Learn more', href: '#contact' },
  { title: 'Digital Marketing Strategy', body: 'Harvard Business School Online — 2024', cta: 'Learn more', href: '#contact' },
  { title: 'Sustainable Business Strategy', body: 'Harvard Business School Online — 2022', cta: 'Learn more', href: '#contact' },
  { title: 'Disruptive Strategy', body: 'Harvard Business School Online — 2021', cta: 'Learn more', href: '#contact' },
  { title: 'Strategy Execution', body: 'Harvard Business School Online — 2021', cta: 'Learn more', href: '#contact' },
  { title: 'Digital Business Strategy', body: 'MIT Sloan School of Management — 2019', cta: 'Learn more', href: '#contact' },
  { title: 'Digital Marketing', body: 'University of Oxford — 2019', cta: 'Learn more', href: '#contact' },
  { title: 'Licensed Real Estate Broker', body: 'Professional Regulation Commission', cta: 'Learn more', href: '#contact' },
  { title: "Bachelor's Degree", body: 'University of San Jose-Recoletos — 1992', cta: 'Learn more', href: '#contact' },
];

export function ModernCredentials() {
  return (
    <section className="tf-ecosystem tf-credentials-section" id="credentials">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">
          Elite <span className="tf-inline-accent">authority</span>
        </h2>
        <p className="tf-partners-intro reveal">Formal training and licensing that sit underneath the coaching work in the field.</p>
        <div className="tf-eco-grid">
          {credentials.map((c, i) => (
            <TfUnifiedCard key={c.title} {...c} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
