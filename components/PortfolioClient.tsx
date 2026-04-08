"use client";
import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { handleInPageAnchorClick } from '../lib/lenis-anchor';
import { ModernAnnouncementBar } from './modern-announcement-bar';
import { ModernHero } from './modern-hero';
import { ModernTfEvent } from './modern-tf-event';
import { ModernTfGoals } from './modern-tf-goals';

import { ModernTfUnlock } from './modern-tf-unlock';
import { ModernPathways } from './modern-pathways';
import { ModernTfBio } from './modern-tf-bio';
import { ModernTfWorthIt } from './modern-tf-worth-it';
import { ModernPartners } from './modern-partners';
import { ModernNews } from './modern-news';
import { ModernCoachingPillars } from './modern-coaching-pillars';
import { ModernAwards } from './modern-awards';
import { ModernCredentials } from './modern-credentials';
import { ModernContact } from './modern-contact';
import { ModernNav } from './modern-nav';
import { ModernFooter } from './modern-footer';

export default function PortfolioClient() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    const handleLoad = () => setTimeout(() => setPreloaderDone(true), 600);
    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);
    const preloaderCap = window.setTimeout(() => setPreloaderDone(true), 1600);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!reducedMotion) {
      lenis = new Lenis({
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.09,
        touchMultiplier: 1,
        wheelMultiplier: 0.88,
        lerp: 0.09,
        touchInertiaMultiplier: 28,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    }

    const onDocClick = (e: MouseEvent) => handleInPageAnchorClick(e, lenis, reducedMotion);
    document.addEventListener('click', onDocClick, true);

    const revealEls = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('vis');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -5%' }
    );
    revealEls.forEach((el) => obs.observe(el));

    return () => {
      window.clearTimeout(preloaderCap);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('click', onDocClick, true);
      window.cancelAnimationFrame(rafId);
      obs.disconnect();
      lenis?.destroy();
    };
  }, []);

  return (
    <>
      <div className={`preloader${preloaderDone ? ' done' : ''}`} id="preloader">
        <div className="preloader-inner">
          <span className="preloader-text">ANTHONY LEUTERIO</span>
        </div>
      </div>

      <ModernAnnouncementBar />
      <ModernNav />

      <main>
        <ModernHero />
        <ModernTfEvent />
        <ModernTfGoals />

        <ModernPathways />
        <ModernTfUnlock />
        <ModernTfBio />
        <ModernTfWorthIt />
        <ModernPartners />
        <ModernNews />
        <ModernCoachingPillars />
        <ModernAwards />
        <ModernCredentials />
        <ModernContact />
      </main>

      <ModernFooter />
    </>
  );
}
