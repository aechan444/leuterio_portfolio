"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const offers = [
  {
    title: 'Coaching',
    body: 'The foundation of top achievers. Set up guardrails so you hit your targets every time. Discover which program fits you best.',
    cta: 'Learn More',
    href: '#coaching',
    image: '/imgs/bossing2.jpg',
  },
  {
    title: 'Events',
    body: 'Meet Anthony and leading industry experts, gain cutting-edge strategies, and forge essential business connections.',
    cta: 'Get Tickets',
    href: '#contact',
    image: '/imgs/bossing1.jpg',
  },
  {
    title: 'Training',
    body: 'From self-guided systems to masterminds with top producers—you will find what you need in the style that works for you.',
    cta: 'Find Programs',
    href: '#coaching',
    image: '/imgs/bossing3.jpg',
  },
  {
    title: 'Agent tools',
    body: 'Resources, scripts, marketing ideas, and playbooks from the Filipino Homes and Leuterio ecosystem—built for execution.',
    cta: 'Agent Tools',
    href: '#ecosystem-partners',
    image: '/imgs/bossing4.jpg',
  },
];

export function ModernPathways() {
  return (
    <section className="tf-ecosystem" id="pathways">
      <div className="tf-shell">
        <div className="tf-ecosystem-panel reveal">
          <h2 className="tf-ecosystem-heading">EXPLORE ALL THE TOM FERRY ECOSYSTEM OFFERS</h2>
          <div className="tf-eco-grid">
            {offers.map((o, i) => (
              <TfUnifiedCard key={o.title} {...o} featured={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
