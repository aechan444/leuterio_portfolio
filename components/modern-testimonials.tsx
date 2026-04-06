"use client";
import React from 'react';
import { TfUnifiedCard } from './tf-unified-card';

const quotes = [
  {
    title: 'Sharmane Fernandez Medaris',
    body: 'When I signed up for a mastermind, I knew it was an investment—one I felt at peace making because I knew it would shift something in my career. What I didn’t realize was how much it would impact my life beyond real estate.',
    cta: 'Start your story',
    href: '#contact',
  },
  {
    title: 'Shannon Gillette',
    body: 'Coaching hasn’t just transformed my business; it’s completely changed my life.',
    cta: 'Book a call',
    href: '#contact',
  },
  {
    title: 'Dan Winters',
    body: 'I have been a coaching client for years. I can confidently say this coaching has played a fundamental role in how I run my business.',
    cta: 'Talk to us',
    href: '#contact',
  },
  {
    title: 'Tracey Duggan',
    body: 'Being part of a community committed to growth ensures continual learning and consistent improvement through collaboration.',
    cta: 'Join the network',
    href: '#pathways',
  },
];

export function ModernTestimonials() {
  return (
    <section className="tf-ecosystem tf-testimonials-section" id="stories">
      <div className="tf-shell">
        <h2 className="tf-ecosystem-heading reveal">What leaders are saying</h2>
        <p className="tf-partners-intro reveal">Leaders describe what shifts when coaching meets real distribution and accountability.</p>
        <div className="tf-eco-grid">
          {quotes.map((q, i) => (
            <TfUnifiedCard key={q.title} {...q} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
