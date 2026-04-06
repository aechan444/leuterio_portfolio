"use client";
import React from "react";
import { PROMO_EXCLUSIVE_THUMB, PROMO_WEBINAR_THUMB } from "../lib/site-assets";

/** Edit copy, href, dates, and thumb URLs in site-assets when you post. */
const PROMO_CARDS = [
  {
    kicker: "Leuterio · Live session",
    badge: "Webinar",
    title: "[Your main headline — e.g. become the obvious choice]",
    sub: "[Supporting line: what they’ll learn or why it matters. Replace before publish.]",
    cta: "Register for free",
    href: "#contact",
    meta: "[Date & time TBA · link calendar when ready]",
    thumb: PROMO_WEBINAR_THUMB,
    thumbAlt: "Webinar preview",
    videoBadge: true,
  },
  {
    kicker: "Leuterio · Member spotlight",
    badge: "Exclusive",
    title: "[Second promo title — program, cohort, or partner feature]",
    sub: "[Short description for this card. Swap for real copy when you go live.]",
    cta: "Learn more",
    href: "#contact",
    meta: "[Presenter or format TBA]",
    thumb: PROMO_EXCLUSIVE_THUMB,
    thumbAlt: "Member feature preview",
    videoBadge: false,
  },
] as const;

function PlayGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

/**
 * Post-hero event / promo stack (Tom Ferry pattern).
 * Summit strip: “Event coming soon” copy until the live event is announced.
 */
export function ModernTfEvent() {
  return (
    <section className="tf-events-placeholder" id="event" aria-label="Events and promotions">
      <div className="tf-promo-pair">
        <div className="tf-shell tf-promo-pair-inner">
          {PROMO_CARDS.map((card, i) => (
            <article key={i} className="tf-promo-pair-card reveal">
              <div className="tf-promo-card-inner">
                <div className="tf-promo-card-copy">
                  <div className="tf-promo-card-top">
                    <span className="tf-promo-card-brand">Leuterio</span>
                    <span className="tf-promo-card-badge">{card.badge}</span>
                  </div>
                  <p className="tf-promo-card-kicker">{card.kicker}</p>
                  <h3 className="tf-promo-card-title">{card.title}</h3>
                  <p className="tf-promo-card-sub">{card.sub}</p>
                  <a href={card.href} className="tf-promo-card-cta">
                    {card.cta}
                  </a>
                  <p className="tf-promo-card-meta">{card.meta}</p>
                </div>
                <a href={card.href} className="tf-promo-card-visual" aria-label={`${card.cta} — ${card.title}`}>
                  <img
                    className="tf-promo-card-thumb"
                    src={card.thumb}
                    alt={card.thumbAlt}
                    loading="lazy"
                    decoding="async"
                  />
                  {card.videoBadge ? (
                    <span className="tf-promo-card-live-badge">
                      <PlayGlyph />
                      Live webinar
                    </span>
                  ) : null}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="tf-summit-strip">
        <div className="tf-summit-strip-bg" aria-hidden />
        <div className="tf-shell tf-summit-inner">
          <header className="tf-summit-head reveal">
            <h2 className="tf-summit-title">Event coming soon</h2>
            <p className="tf-summit-sub">
              We&apos;re lining up the next major experience for the network. Venue, dates, and registration will be posted here.
            </p>
          </header>
          <div className="tf-summit-actions reveal" aria-label="Event actions — not yet available">
            <span className="tf-summit-ghost">Tickets — coming soon</span>
            <span className="tf-summit-ghost">More info — coming soon</span>
            <span className="tf-summit-ghost">Updates — coming soon</span>
          </div>
          <p className="tf-summit-foot reveal">Philippines · dates announced to members first</p>
        </div>
      </div>
    </section>
  );
}
