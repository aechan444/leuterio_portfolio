"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const pillars = [
  { title: 'Vision & strategy', body: 'Ten-year thinking with ninety-day execution—goals, guardrails, and the scoreboard your team actually uses.', cta: 'Go deeper', href: '#contact' },
  { title: 'Networking & sales', body: 'Integrity-first selling, referral systems, and the follow-up rhythm top producers protect on the calendar.', cta: 'Go deeper', href: '#contact' },
  { title: 'Team & leadership', body: 'Structure that scales: roles, meetings, and accountability without you in every decision.', cta: 'Go deeper', href: '#contact' },
  { title: 'Global expansion', body: 'OFW and cross-border channels—positioning inventory and trust for buyers outside the Philippines.', cta: 'Go deeper', href: '#contact' },
  { title: 'Digital mastery', body: 'Listings, data, and client psychology—closing with clarity in a noisy feed.', cta: 'Go deeper', href: '#contact' },
  { title: 'Personal branding', body: 'Authority that converts: content, social proof, and a brand your farm recognizes instantly.', cta: 'Go deeper', href: '#contact' },
];

export function ModernCoachingPillars() {
  return (
    <section className="tf-ecosystem" id="coaching">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">
          Coaching <span className="tf-inline-accent">framework</span>
        </h2>
        <p className="tf-partners-intro reveal">The six areas we tighten when you are ready to scale without burning out.</p>
        <div className="tf-eco-grid">
          {pillars.map((p, i) => (
            <TfUnifiedCard key={p.title} {...p} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
