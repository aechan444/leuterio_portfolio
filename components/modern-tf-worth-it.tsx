"use client";
import React from 'react';
import { TRUST_NAMES } from '../lib/site-assets';
import { TfUnifiedCard } from './tf-unified-card';

const stats = [
  { title: '20+', body: 'Years in market building brokerages, networks, and training systems that compound.', cta: 'See proof', href: '#scale' },
  { title: '133+', body: 'Offices nationwide under the Filipino Homes and partner footprint.', cta: 'Explore network', href: '#ecosystem-partners' },
  { title: '10K+', body: 'Agents touched by ecosystem tools, events, and coaching touchpoints.', cta: 'Join ecosystem', href: '#pathways' },
  { title: '#1', body: 'Ecosystem reach goal: dominate mindshare in your city with distribution + coaching.', cta: 'Talk to us', href: '#contact' },
];

export function ModernTfWorthIt() {
  return (
    <section className="tf-worth" id="proof">
      <div className="tf-shell reveal">
        <h2 className="tf-worth-heading">Is Leuterio coaching worth it?</h2>
        <div className="tf-worth-rating-row">
          <div className="tf-worth-score">4.9</div>
          <div className="tf-worth-reviews">
            <span className="tf-worth-reviews-label">Network &amp; community proof</span>
            <span className="tf-worth-reviews-sub">Leaders across the Philippines describe measurable shifts in pipeline, team clarity, and life margin.</span>
          </div>
        </div>
        <p className="tf-worth-lead">
          Thousands of transformational stories across the ecosystem say yes. When coaching is paired with real tools and distribution,
          results compound faster than motivation alone.
        </p>
        <div className="tf-eco-grid tf-worth-card-grid">
          {stats.map((s, i) => (
            <TfUnifiedCard key={s.title} title={s.title} body={s.body} cta={s.cta} href={s.href} featured={i === 0} />
          ))}
        </div>
        <div className="tf-worth-logos">
          <p className="tf-worth-logos-label">Trusted by industry leaders</p>
          <div className="tf-worth-logo-row tf-trust-chips" role="list">
            {TRUST_NAMES.map((name) => (
              <span key={name} className="tf-trust-chip" role="listitem">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
