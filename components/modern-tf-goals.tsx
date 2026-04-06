"use client";
import React from "react";
import { AGENT_IMG_HONOR, AGENT_IMG_MONECILLO, AGENT_IMG_SARMAGO } from "../lib/site-assets";

const AGENT_CARDS = [
  {
    name: "George Ryan Sarmago",
    org: "Filipino Homes network",
    image: AGENT_IMG_SARMAGO,
    href: "#contact",
  },
  {
    name: "Gilbert Generale Monecillo",
    org: "Filipino Homes network",
    image: AGENT_IMG_MONECILLO,
    href: "#contact",
  },
  {
    name: "Azela Honor",
    org: "Filipino Homes network",
    image: AGENT_IMG_HONOR,
    href: "#contact",
  },
] as const;

function PlayIcon() {
  return (
    <span className="tf-goals-play" aria-hidden>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <path d="M10 8l6 4-6 4V8z" fill="#fff" />
      </svg>
    </span>
  );
}

export function ModernTfGoals() {
  return (
    <section className="tf-goals-section" id="goals">
      <div className="tf-shell tf-goals-shell reveal">
        <header className="tf-goals-header">
          <h2 className="tf-goals-title">
            Real estate coaching for <em>your</em> goals
          </h2>
          <p className="tf-goals-lead">
            Do you want to earn more, win back time, build structure, or grow your team faster? You don&apos;t have to choose—with
            Leuterio Coaching and the Filipino Homes ecosystem, you can move on all of it, at any level you&apos;re at today.
          </p>
        </header>

        <div className="tf-goals-grid">
          <article className="tf-goals-agent tf-goals-agent--1">
            <a href={AGENT_CARDS[0].href} className="tf-goals-agent-card">
              <div className="tf-goals-agent-visual">
                <img src={AGENT_CARDS[0].image} alt={AGENT_CARDS[0].name} loading="lazy" decoding="async" />
                <PlayIcon />
                <div className="tf-goals-agent-label">
                  <strong>{AGENT_CARDS[0].name}</strong>
                  <span>{AGENT_CARDS[0].org}</span>
                </div>
              </div>
            </a>
          </article>

          <article className="tf-goals-agent tf-goals-agent--2">
            <a href={AGENT_CARDS[1].href} className="tf-goals-agent-card">
              <div className="tf-goals-agent-visual">
                <img src={AGENT_CARDS[1].image} alt="" loading="lazy" decoding="async" />
                <PlayIcon />
                <div className="tf-goals-agent-label">
                  <strong>{AGENT_CARDS[1].name}</strong>
                  <span>{AGENT_CARDS[1].org}</span>
                </div>
              </div>
            </a>
          </article>

          <blockquote className="tf-goals-quote tf-goals-quote--accent-left tf-goals-quote--1">
            <p>
              &ldquo;AS FAR AS I&apos;M<br />
              CONCERNED,<br /><br />
              THERE IS<br />
              NO OTHER COACH.&rdquo;
            </p>
          </blockquote>

          <blockquote className="tf-goals-quote tf-goals-quote--accent-right tf-goals-quote--2">
            <p>
              Unlock Opportunities &amp; Support<br />
              Beyond Limits
            </p>
          </blockquote>

          <article className="tf-goals-agent tf-goals-agent--3">
            <a href={AGENT_CARDS[2].href} className="tf-goals-agent-card">
              <div className="tf-goals-agent-visual">
                <img src={AGENT_CARDS[2].image} alt={AGENT_CARDS[2].name} loading="lazy" decoding="async" />
                <PlayIcon />
                <div className="tf-goals-agent-label">
                  <strong>{AGENT_CARDS[2].name}</strong>
                  <span>{AGENT_CARDS[2].org}</span>
                </div>
              </div>
            </a>
          </article>

          <article className="tf-goals-agent tf-goals-agent--placeholder tf-goals-agent--4" aria-label="More agents coming soon">
            <div className="tf-goals-agent-card tf-goals-agent-card--static">
              <div className="tf-goals-agent-visual tf-goals-agent-visual--placeholder">
                <span className="tf-goals-placeholder-mark" aria-hidden>
                  ?
                </span>
                <div className="tf-goals-agent-label">
                  <strong>Agent coming soon</strong>
                  <span>More leaders from the network</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
