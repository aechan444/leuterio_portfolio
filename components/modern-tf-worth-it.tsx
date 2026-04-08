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
        <h2 className="tf-worth-heading">IS ANTHONY LEUTERIO REAL ESTATE COACHING WORTH IT?</h2>
        
        <div className="tf-worth-pill-container">
          <div className="tf-worth-google-pill">
            <span className="tf-pill-score">4.9</span>
            <div className="tf-pill-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#ff4a12">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="tf-pill-reviews">1,000+ Google Reviews</span>
          </div>
        </div>

        <p className="tf-worth-lead">
          Thousands of transformational success stories say YES! With a 4.9 star Google rating, 
          and over 1,000 reviews, it&rsquo;s clear why Anthony Leuterio is the No. 1 name in real estate coaching.
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
