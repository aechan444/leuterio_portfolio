"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const partners = [
  { title: 'Leuterio Realty', body: 'Premier brokerage footprint across major cities in the Philippines.', cta: 'Learn more', href: 'https://leuteriorealty.com', external: true },
  { title: 'Filipino Homes', body: 'Largest real estate network in the country—tech, training, and distribution.', cta: 'Learn more', href: 'https://filipinohomes.com', external: true },
  { title: 'Cebu Landmasters', body: 'Trusted developer partner for Visayas growth and project velocity.', cta: 'Visit site', href: 'https://www.cebulandmasters.com/', external: true },
  { title: 'Grand Land Inc.', body: 'Strategic land and development collaborations for long-term pipeline.', cta: 'Visit site', href: 'https://grandlandinc.com/', external: true },
  { title: 'Primeworld Land', body: 'Residential and commercial projects aligned with network demand.', cta: 'Visit site', href: 'https://www.primeworldland.com/', external: true },
  { title: 'Priland Development', body: 'Quality developments supporting agent inventory and buyer trust.', cta: 'Visit site', href: 'https://www.priland.com.ph/', external: true },
  { title: 'Be Residences', body: 'Lifestyle-focused product lines for urban and resort markets.', cta: 'Visit site', href: 'https://beresidences.com/', external: true },
  { title: 'Wee Community', body: 'Community-forward developments with strong referral loops.', cta: 'Visit site', href: 'https://weecomm.ph/', external: true },
];

export function ModernPartners() {
  return (
    <section className="tf-ecosystem tf-partners-section" id="ecosystem-partners">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">Ecosystem &amp; developer partners</h2>
        <p className="tf-partners-intro reveal">Brokerage, network, and developer relationships that keep your pipeline stocked with credible inventory.</p>
        <div className="tf-eco-grid">
          {partners.map((p, i) => (
            <TfUnifiedCard key={p.title} {...p} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
