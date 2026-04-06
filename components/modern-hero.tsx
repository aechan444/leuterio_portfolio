"use client";
import React, { useState } from "react";
import {
  HERO_BG_IMAGE,
  HERO_BG_POSITION,
  HERO_BG_POSITION_MOBILE,
  HERO_SEAL_IMAGE,
} from "../lib/site-assets";

function VideoCameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroSealFallback() {
  return (
    <div className="tf-hero-badge-scallop">
      <div className="tf-hero-badge">
        <span className="tf-hero-badge-num">#1</span>
        <span className="tf-hero-badge-text">Real estate coaching &amp; training company</span>
      </div>
    </div>
  );
}

export function ModernHero() {
  const [sealUseFallback, setSealUseFallback] = useState(false);

  return (
    <section
      id="hero"
      className="tf-hero tf-hero--ferry"
      style={
        {
          "--hero-bg-pos": HERO_BG_POSITION,
          "--hero-bg-pos-mobile": HERO_BG_POSITION_MOBILE,
        } as React.CSSProperties
      }
    >
      <div className="tf-hero-ferry-bg" aria-hidden>
        <div
          className="tf-hero-ferry-bg-photo"
          style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}
        />
        <div className="tf-hero-ferry-bg-shade" />
        <div className="tf-hero-ferry-bg-bluewash" />
        <div className="tf-hero-ferry-bg-radial" />
        <div className="tf-hero-ferry-halftone" />
        <div className="tf-hero-ferry-wedge" />
      </div>

      <a
        href="#contact"
        className="tf-hero-a11y-pill"
        aria-label="Accessibility and help"
        title="Accessibility"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a2 2 0 110 4 2 2 0 010-4zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
        </svg>
      </a>

      <div className="tf-hero-ferry-inner tf-shell">
        <div className="tf-hero-ferry-left reveal">
          <h1 className="tf-hero-ferry-headline">
            <span className="tf-hero-ferry-line tf-hero-ferry-line--white tf-hero-ferry-line--sm">
              Serious agents
            </span>
            <span className="tf-hero-ferry-line tf-hero-ferry-line--orange tf-hero-ferry-line--trust">Trust</span>
            <span className="tf-hero-ferry-line tf-hero-ferry-line--white tf-hero-ferry-line--sm">
              Leuterio coaching
            </span>
          </h1>

          <div className="tf-hero-floating-card">
            <p className="tf-hero-card-kicker">Behind the scenes of success</p>
            <p className="tf-hero-card-sub">
              How Agents Are Earning More, Working Less, &amp; Scaling Smarter
            </p>
            <a href="#contact" className="tf-hero-card-cta">
              <VideoCameraIcon />
              <span className="tf-hero-card-cta-label">Attend a coaching demo</span>
            </a>
          </div>
        </div>
      </div>

      <div className="tf-hero-ferry-badge-wrap" aria-hidden>
        {!sealUseFallback ? (
          <img
            src={HERO_SEAL_IMAGE}
            alt=""
            className="tf-hero-seal-img"
            onError={() => setSealUseFallback(true)}
            fetchPriority="high"
          />
        ) : (
          <HeroSealFallback />
        )}
      </div>
    </section>
  );
}
