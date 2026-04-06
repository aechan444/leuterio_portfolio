"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const awards = [
  { title: '2024 · International REALTOR® of the Year', body: 'Global Real Estate Excellence Board — recognition for cross-border impact and network leadership.', cta: 'See more', href: '#contact' },
  { title: '2023 · Most Outstanding Real Estate Broker', body: 'National Property Awards PH — brokerage execution and market share growth.', cta: 'See more', href: '#contact' },
  { title: '2021 · Best Real Estate Brand', body: 'Property Excellence Awards — brand consistency and agent advocacy.', cta: 'See more', href: '#contact' },
  { title: '2020 · Entrepreneur of the Year', body: 'Asia CEO Awards — building scalable organizations beyond single-market wins.', cta: 'See more', href: '#contact' },
  { title: '2019 · Top Motivational Speaker', body: 'Real Estate Motivators PH — stages, rooms, and repeatable frameworks.', cta: 'See more', href: '#contact' },
  { title: '2018 · Most Influential Personality', body: 'Property Report PH — voice and visibility that moved the industry conversation.', cta: 'See more', href: '#contact' },
];

export function ModernAwards() {
  return (
    <section className="tf-ecosystem tf-awards-section" id="scale">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">
          Proven <span className="tf-inline-accent">track record</span>
        </h2>
        <p className="tf-partners-intro reveal">Recognition from industry bodies and communities that track execution—not slogans.</p>
        <div className="tf-eco-grid">
          {awards.map((a, i) => (
            <TfUnifiedCard key={a.title} {...a} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
