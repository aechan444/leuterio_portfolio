"use client";
import React from 'react';

export function ModernTfBio() {
  return (
    <section className="tf-bio-ferry" id="bio">
      <div className="tf-bio-ferry-inner">
        <div className="tf-bio-ferry-visual">
          <img src="/imgs/ton1.jpg" alt="Anthony Leuterio" />
          <div className="tf-bio-road-pill">
             <span className="tf-play-dot">▶</span>
             <span>Anthony Leuterio On The Road</span>
          </div>
        </div>
        <div className="tf-bio-ferry-divider"></div>
        <div className="tf-bio-ferry-content">
          <h2 className="tf-bio-ferry-title">Who is Anthony Leuterio?</h2>
          <div className="tf-bio-ferry-text">
            <p>
              <strong>Anthony Leuterio</strong> is the founder and CEO of <strong>Filipino Homes</strong>, 
              the <strong>Philippines&rsquo; leader in real estate coaching, training, and technology</strong>. 
              The <strong>Grand Realty Award 2025</strong> has recognized him as the <strong>industry&rsquo;s most influential visionary</strong>.
            </p>
            <p>
              A best-selling author and ecosystem builder, he equips agents, teams, and industry professionals with <strong>cutting-edge strategies for success</strong>. His revolutionary platform, <strong>Rent.ph</strong>, is the most comprehensive property ecosystem in the country, and his events are among the most popular in the entire Southeast Asia region.
            </p>
          </div>
          <a href="#credentials" className="tf-bio-ferry-btn">
            Learn More About Anthony
          </a>
        </div>
      </div>
    </section>
  );
}
