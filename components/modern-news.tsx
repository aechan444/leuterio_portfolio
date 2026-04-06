"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const items = [
  {
    title: 'AI for social media playbook',
    body: 'A practical guide for using AI to create, streamline, and scale your listing and personal brand content—without losing your voice.',
    cta: 'Download now',
    href: '#contact',
  },
  {
    title: 'Leuterio media / podcast',
    body: 'Conversations on burnout, recruiting, and listing velocity—short episodes you can run between appointments.',
    cta: 'Listen to the episode',
    href: '#contact',
  },
  {
    title: 'Lead generation channels',
    body: 'Which channels actually move the needle for Filipino agents right now—and how to stack them with coaching accountability.',
    cta: 'Read more',
    href: '#contact',
  },
  {
    title: 'Network expansion brief',
    body: 'How the Filipino Homes footprint compounds when you pair events with weekly execution systems.',
    cta: 'Learn more',
    href: '#pathways',
  },
  {
    title: 'Team scaling memo',
    body: 'From solo top producer to team lead: the three hires that protect your GCI and your calendar.',
    cta: 'Get the memo',
    href: '#coaching',
  },
  {
    title: 'Developer pipeline map',
    body: 'Why ecosystem developer relationships shorten your sales cycle when inventory is tight.',
    cta: 'See partners',
    href: '#ecosystem-partners',
  },
];

export function ModernNews() {
  return (
    <section className="tf-ecosystem tf-media-section" id="media">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">Leuterio media</h2>
        <p className="tf-partners-intro reveal">Playbooks, shows, and articles you can run between showings and listing appointments.</p>
        <div className="tf-eco-grid">
          {items.map((item, i) => (
            <TfUnifiedCard key={item.title} {...item} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
