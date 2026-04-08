"use client";
import React from 'react';

const mediaItems = [
  {
    tag: 'AI for social media playbook',
    title: 'A practical guide for using AI to create, streamline, and scale your listing and personal brand content—without losing your voice.',
    cta: 'Download now',
    image: '/imgs/bossing6.jpg',
    href: '#contact',
  },
  {
    tag: 'Leuterio media / podcast',
    title: 'Conversations on burnout, recruiting, and listing velocity—short episodes you can run between appointments.',
    cta: 'Listen to the episode',
    image: '/imgs/bossing5.jpg',
    href: '#contact',
  },
  {
    tag: 'Lead generation channels',
    title: 'Which channels actually move the needle for Filipino agents right now—and how to stack them with coaching accountability.',
    cta: 'Read more',
    image: '/imgs/bossing1.jpg',
    href: '#contact',
  },
  {
    tag: 'Network expansion brief',
    title: 'How the Filipino Homes footprint compounds when you pair events with weekly execution systems.',
    cta: 'Learn more',
    image: '/imgs/bossing2.jpg',
    href: '#pathways',
  },
  {
    tag: 'Team scaling memo',
    title: 'From solo top producer to team lead: the three hires that protect your GCI and your calendar.',
    cta: 'Get the memo',
    image: '/imgs/bossing3.jpg',
    href: '#coaching',
  },
];

export function ModernNews() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="tf-ecosystem tf-media-section" id="media">
      <div className="tf-shell">
        <div className="tf-slider-header">
          <div>
            <h2 className="tf-ecosystem-heading reveal" style={{ textTransform: 'uppercase' }}>Anthony leuterio media</h2>
            <p className="tf-partners-intro reveal">Learn the industry’s best real estate strategies from Anthony and the ecosystem’s visionary leaders. Updated weekly.</p>
          </div>
          <div className="tf-slider-controls reveal">
            <button className="tf-slider-btn" onClick={() => scroll('left')} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="tf-slider-btn" onClick={() => scroll('right')} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="tf-media-slider-container">
          <div className="tf-media-slider" ref={scrollRef}>
            {mediaItems.map((item, i) => (
              <a key={i} href={item.href} className="tf-media-card reveal">
                <img src={item.image} alt={item.tag} loading="lazy" />
                <div className="tf-media-card-overlay"></div>
                <div className="tf-media-card-content">
                  <span className="tf-media-card-tag">{item.tag}:</span>
                  <p className="tf-media-card-title">{item.title}</p>
                  <div className="tf-media-card-cta">
                    {item.cta} <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
