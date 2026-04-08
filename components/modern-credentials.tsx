"use client";
import React from 'react';

const credentials = [
  { 
    title: 'Creating Brand Value', 
    inst: 'Harvard Business School Online', 
    year: '2025', 
    logo: '/imgs/harvard-logo.png',
    href: '#contact' 
  },
  { 
    title: 'AI Essentials for Business', 
    inst: 'Harvard Business School Online', 
    year: '2025',
    logo: '/imgs/harvard-logo.png',
    href: '#contact' 
  },
  { 
    title: 'Digital Marketing Strategy', 
    inst: 'Harvard Business School Online', 
    year: '2024',
    logo: '/imgs/harvard-logo.png',
    href: '#contact' 
  },
  { 
    title: 'Sustainable Business Strategy', 
    inst: 'Harvard Business School Online', 
    year: '2022',
    logo: '/imgs/harvard-logo.png',
    href: '#contact' 
  },
  { 
    title: 'Disruptive Strategy', 
    inst: 'Harvard Business School Online', 
    year: '2021',
    logo: '/imgs/harvard-logo.png',
    href: '#contact' 
  },
  { 
    title: 'Strategy Execution', 
    inst: 'Harvard Business School Online', 
    year: '2021',
    logo: '/imgs/harvard-logo.png',
    href: '#contact' 
  },
  { 
    title: 'Digital Business Strategy', 
    inst: 'MIT Sloan School of Management', 
    year: '2019',
    logo: '/imgs/mit-logo.png',
    href: '#contact' 
  },
  { 
    title: 'Digital Marketing', 
    inst: 'University of Oxford', 
    year: '2019',
    logo: '/imgs/oxford-logo.png',
    href: '#contact' 
  },
  { 
    title: 'Licensed Real Estate Broker', 
    inst: 'Professional Regulation Commission', 
    year: 'Philippines',
    logo: '/imgs/prc-logo.png',
    href: '#contact' 
  },
  { 
    title: "Bachelor's Degree", 
    inst: 'University of San Jose-Recoletos', 
    year: '1992',
    logo: '/imgs/usjr-logo.png',
    href: '#contact' 
  },
];

export function ModernCredentials() {
  return (
    <section className="tf-credentials-section" id="credentials">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">
          Elite <span className="tf-inline-accent">authority</span>
        </h2>
        <p className="tf-partners-intro reveal">Formal training and licensing that sit underneath the coaching work in the field.</p>
        
        <div className="tf-cred-grid">
          {credentials.map((c, i) => (
            <article key={i} className="tf-cred-card reveal">
              <img src={c.logo} alt={c.inst} className="tf-cred-logo" loading="lazy" />
              <div className="tf-cred-info">
                <h3 className="tf-cred-title">{c.title}</h3>
                <span className="tf-cred-inst">{c.inst}</span>
                <span className="tf-cred-year">{c.year}</span>
              </div>
              <a href={c.href} className="tf-cred-link">
                Learn more <span>&rarr;</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
