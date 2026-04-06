"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const offers = [
  {
    title: 'Coaching',
    body: 'The foundation of top achievers. Set up guardrails so you hit your targets every time. Discover which program fits you best.',
    cta: 'Learn more',
    href: '#coaching',
  },
  {
    title: 'Events',
    body: 'Meet Anthony and leading industry experts, gain cutting-edge strategies, and forge essential business connections.',
    cta: 'Get tickets',
    href: '#contact',
  },
  {
    title: 'Training',
    body: 'From self-guided systems to masterminds with top producers—you will find what you need in the style that works for you.',
    cta: 'Find programs',
    href: '#coaching',
  },
  {
    title: 'Agent tools',
    body: 'Resources, scripts, marketing ideas, and playbooks from the Filipino Homes and Leuterio ecosystem—built for execution.',
    cta: 'Agent tools',
    href: '#ecosystem-partners',
  },
];

export function ModernPathways() {
  return (
    <section className="tf-ecosystem" id="pathways">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">Explore all the Leuterio ecosystem offers</h2>
        <div className="tf-eco-grid">
          {offers.map((o, i) => (
            <TfUnifiedCard key={o.title} {...o} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
