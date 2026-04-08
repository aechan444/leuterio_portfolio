"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const partners = [
  { 
    title: 'Leuterio Realty', 
    body: 'Premier brokerage footprint across major cities in the Philippines.', 
    logo: '/imgs/LR_White_1.png', 
    href: 'https://leuteriorealty.com' 
  },
  { 
    title: 'Filipino Homes', 
    body: 'Largest real estate network in the country—tech, training, and distribution.', 
    logo: '/imgs/Filipinohomeslogo_2_1.png', 
    href: 'https://filipinohomes.com' 
  },
  { 
    title: 'Cebu Landmasters', 
    body: 'Trusted developer partner for Visayas growth and project velocity.', 
    logo: '/imgs/Cebu_Landmaster_Inc..webp', 
    href: 'https://www.cebulandmasters.com/' 
  },
  { 
    title: 'Grand Land Inc.', 
    body: 'Strategic land and development collaborations for long-term pipeline.', 
    logo: '/imgs/Grand_Land_Incorporated.webp', 
    href: 'https://grandlandinc.com/' 
  },
  { 
    title: 'Primeworld Land', 
    body: 'Residential and commercial projects aligned with network demand.', 
    logo: '/imgs/Primeworld_Land_Holdings_Inc..webp', 
    href: 'https://www.primeworldland.com/' 
  },
  { 
    title: 'Priland Development', 
    body: 'Quality developments supporting agent inventory and buyer trust.', 
    logo: '/imgs/Priland_Development_Corporation.webp', 
    href: 'https://www.priland.com.ph/' 
  },
  { 
    title: 'Be Residences', 
    body: 'Lifestyle-focused product lines for urban and resort markets.', 
    logo: '/imgs/Be_Residences.webp', 
    href: 'https://beresidences.com/' 
  },
  { 
    title: 'Wee Community', 
    body: 'Community-forward developments with strong referral loops.', 
    logo: '/imgs/Wee_Comm_Developers_Inc..webp', 
    href: 'https://weecomm.ph/' 
  },
];

export function ModernPartners() {
  return (
    <section className="tf-ecosystem tf-partners-section" id="ecosystem-partners">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading">Ecosystem &amp; developer partners</h2>
        <p className="tf-partners-intro">Brokerage, network, and developer relationships that keep your pipeline stocked with credible inventory.</p>
        
        <div className="tf-partners-wall">
          {partners.map((p, i) => (
            <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="tf-partner-tile">
              <div className="tf-partner-logo-wrap">
                <img src={p.logo} alt={p.title} loading="lazy" />
              </div>
              <div className="tf-partner-info">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
