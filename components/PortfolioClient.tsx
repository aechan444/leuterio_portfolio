"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function PortfolioClient({
  initialCoaching,
  initialEcosystem,
  initialDevelopers,
  initialCredentials,
  initialAwards,
  initialNews
}: any) {

  const [preloaderDone, setPreloaderDone] = useState(false);
  const lenisRef = useRef<any>(null);

  // ── Scroll helper ──────────────────────────────────────────────
  const scrollTo = (target: string | number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.5,
        offset: typeof target === 'string' && target.startsWith('#') ? -80 : 0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const el = document.querySelector(target);
        if (el) window.scrollTo({ top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    }
  };

  // ── Coaching item toggle ───────────────────────────────────────
  const handleCoachingClick = (e: React.MouseEvent<HTMLDivElement>) => {
    document.querySelectorAll('.coaching-item').forEach(el => el.classList.remove('active'));
    e.currentTarget.classList.add('active');
  };

  // ── Theme toggle ──────────────────────────────────────────────
  const toggleTheme = () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('al-theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  };

  // ── Aura effects ──────────────────────────────────────────────
  const addAura = (cls: string) => { document.body.classList.add(cls); };
  const removeAura = (cls: string) => { document.body.classList.remove(cls); };

  useEffect(() => {
    // ── Preloader dismiss ─────────────────────────────────────────
    const handleLoad = () => {
      setTimeout(() => setPreloaderDone(true), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Failsafe: hide after 2.5s no matter what
    const failsafe = setTimeout(() => setPreloaderDone(true), 2500);

    // Theme restore
    if (localStorage.getItem('al-theme') === 'light') document.body.classList.add('light-mode');

    // Lenis smooth scroll
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      lenisRef.current = lenis;
      const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    });

    // GSAP ScrollTrigger counter
    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        setTimeout(() => ScrollTrigger.refresh(), 500);
      });
    });

    // Intersection observer reveals
    const revealEls = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const siblings = el.parentElement?.querySelectorAll('.reveal') ?? [];
          const idx = Array.from(siblings).indexOf(el);
          setTimeout(() => el.classList.add('vis'), idx * 80);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));

    // Nav scroll progress
    const progressBar = document.getElementById('v-progress');
    const venturesTrack = document.getElementById('ventures-track');
    if (venturesTrack && progressBar) {
      venturesTrack.addEventListener('scroll', () => {
        const { scrollLeft, scrollWidth, clientWidth } = venturesTrack;
        progressBar.style.width = `${(scrollLeft / (scrollWidth - clientWidth)) * 100}%`;
      });
    }

    return () => { obs.disconnect(); };
  }, []);

  return (
    <>
      {/* ── PRELOADER ───────────────────────────────────────── */}
      <div className={`preloader${preloaderDone ? ' done' : ''}`} id="preloader">
        <div className="preloader-inner">
          <span className="preloader-text">ANTHONY LEUTERIO</span>
        </div>
      </div>

      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <div className="top-bar">
        <a href="#hero" className="brand-logo-container" onClick={e => { e.preventDefault(); scrollTo(0); }}>
          <img src="imgs/al_brokerage_gold_logo.png" alt="Leuterio Logo" className="brand-main-logo" />
        </a>
        <div className="brand-id" style={{ opacity: 0.5 }}>CEBU / PH</div>
      </div>

      {/* ── FLOATING NAV ────────────────────────────────────── */}
      <div className="floating-nav">
        <a href="#hero" className="nav-item" aria-label="Home" onClick={e => { e.preventDefault(); scrollTo(0); }}>
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="nav-tooltip">START</span>
        </a>
        <a href="#ventures" className="nav-item" aria-label="Ventures" onClick={e => { e.preventDefault(); scrollTo('#ventures'); }}>
          <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          <span className="nav-tooltip">ECOSYSTEM</span>
        </a>
        <a href="#scale" className="nav-item" aria-label="Awards" onClick={e => { e.preventDefault(); scrollTo('#scale'); }}>
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path></svg>
          <span className="nav-tooltip">AWARDS</span>
        </a>
        <a href="#credentials" className="nav-item" aria-label="Proof" onClick={e => { e.preventDefault(); scrollTo('#credentials'); }}>
          <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span className="nav-tooltip">PROOF</span>
        </a>
        <a href="#contact" className="nav-item" aria-label="Contact" onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
          <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          <span className="nav-tooltip">CONNECT</span>
        </a>
        <button className="nav-item theme-toggle" aria-label="Toggle Theme" onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg className="sun" viewBox="0 0 24 24" style={{ width: 20, height: 20, stroke: 'currentColor', strokeWidth: 2, fill: 'none' }}>
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span className="nav-tooltip">THEME</span>
        </button>
      </div>

      <main>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section id="hero">
          <img src="imgs/upscalemedia-transformed (1).jpeg" alt="Anthony Leuterio" className="hero-img-bg" />
          <span className="hero-sub reveal">International Principal / 2024</span>
          <h1 className="hero-name reveal">ANTHONY<br />LEUTERIO</h1>
          <p className="reveal" style={{ maxWidth: 500, color: 'var(--white-stark)', fontSize: '1.5rem', fontWeight: 400, textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
            Building the nation's most significant real estate ecosystem. Founder of Filipino Homes &amp; Leuterio Realty.
          </p>

          {/* Marquee */}
          <div className="chosen-by-section">
            <h2 className="chosen-title">We're chosen by</h2>
            <div className="marquee-track">
              <div className="marquee-content">
                <img src="imgs/LR White 1.png" alt="Leuterio Realty" />
                <img src="imgs/Filipinohomeslogo-2 1.png" alt="Filipino Homes" />
                <img src="imgs/RentPh new white logo 1.png" alt="Rent.ph" />
                <img src="imgs/image 2161.png" alt="GlobalRealty.ae" />
                <img src="imgs/image 2307.png" alt="FH Global Partners" />
                <img src="imgs/bayanihanwhite 2.png" alt="Bayanihan" />
                {/* Duplicate for loop */}
                <img src="imgs/LR White 1.png" alt="Leuterio Realty" />
                <img src="imgs/Filipinohomeslogo-2 1.png" alt="Filipino Homes" />
                <img src="imgs/RentPh new white logo 1.png" alt="Rent.ph" />
                <img src="imgs/image 2161.png" alt="GlobalRealty.ae" />
                <img src="imgs/image 2307.png" alt="FH Global Partners" />
                <img src="imgs/bayanihanwhite 2.png" alt="Bayanihan" />
              </div>
            </div>
          </div>
        </section>

        {/* ── IMPACT NUMBERS ──────────────────────────────────── */}
        <section className="numbers-section" id="numbers">
          <div className="numbers-grid">
            <div className="number-cell">
              <div className="big-number reveal" data-count="133">133</div>
              <div className="number-caption">Offices <span>Nationwide</span></div>
            </div>
            <div className="number-cell">
              <div className="big-number reveal" data-count="50">50</div>
              <div className="number-caption">Industry <span>Awards</span></div>
            </div>
            <div className="number-cell">
              <div className="big-number reveal" data-count="20">20</div>
              <div className="number-caption">Years of <span>Excellence</span></div>
            </div>
            <div className="number-cell">
              <div className="big-number-text reveal">Top 1</div>
              <div className="number-caption"><span>PropTech</span> Leader</div>
            </div>
          </div>
        </section>

        {/* ── MISSION ─────────────────────────────────────────── */}
        <section id="about-mission" className="chapter mission-section">
          <div className="mission-container">
            <div className="mission-content">
              <div className="pill-badge reveal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Who we are?
              </div>
              <h2 className="reveal">Over 2 decades of Excellence in Real Estate Ecosystem</h2>
              <p className="reveal">Pioneering the industry since 2004. Managing 7+ strategic ventures and reaching millions across the globe through a localized, data-driven real estate network.</p>
              <a href="#ventures" className="cta-dive-deeper reveal" onClick={e => { e.preventDefault(); scrollTo('#ventures'); }}>
                Dive deeper
                <div className="cta-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </a>
            </div>

            <div className="mission-visuals">
              <div className="mission-column-wrapper">
                <div className="mission-column loop-down">
                  <div className="visual-card"><img src="imgs/bossing-blended.jpg" alt="Mission 01" /></div>
                  <div className="visual-card"><img src="imgs/bossing1.jpg" alt="Mission 02" /></div>
                  <div className="visual-card"><img src="imgs/bossing2.jpg" alt="Mission 03" /></div>
                  <div className="visual-card"><img src="imgs/bossing-blended.jpg" alt="Mission 01" /></div>
                  <div className="visual-card"><img src="imgs/bossing1.jpg" alt="Mission 02" /></div>
                  <div className="visual-card"><img src="imgs/bossing2.jpg" alt="Mission 03" /></div>
                </div>
              </div>
              <div className="mission-column-wrapper">
                <div className="mission-column loop-up">
                  <div className="visual-card"><img src="imgs/bossing3.jpg" alt="Mission 04" /></div>
                  <div className="visual-card"><img src="imgs/bossing4.jpg" alt="Mission 05" /></div>
                  <div className="visual-card"><img src="imgs/bossing5.jpg" alt="Mission 06" /></div>
                  <div className="visual-card"><img src="imgs/bossing3.jpg" alt="Mission 04" /></div>
                  <div className="visual-card"><img src="imgs/bossing4.jpg" alt="Mission 05" /></div>
                  <div className="visual-card"><img src="imgs/bossing5.jpg" alt="Mission 06" /></div>
                </div>
              </div>
              <div className="mission-column-wrapper">
                <div className="mission-column loop-down-fast">
                  <div className="visual-card"><img src="imgs/bossing6.jpg" alt="Mission 07" /></div>
                  <div className="visual-card"><img src="imgs/bossing-blended.jpg" alt="Mission 08" /></div>
                  <div className="visual-card"><img src="imgs/bossing1.jpg" alt="Mission 09" /></div>
                  <div className="visual-card"><img src="imgs/bossing6.jpg" alt="Mission 07" /></div>
                  <div className="visual-card"><img src="imgs/bossing-blended.jpg" alt="Mission 08" /></div>
                  <div className="visual-card"><img src="imgs/bossing1.jpg" alt="Mission 09" /></div>
                </div>
              </div>
            </div>

            <div className="floating-mission-badge reveal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 13c-2.761 0-5 2.239-5 5v1h10v-1c0-2.761-2.239-5-5-5z"></path>
              </svg>
              <span>Real Estate</span>
            </div>
          </div>
        </section>

        {/* ── SPLIT ABOUT ─────────────────────────────────────── */}
        <section className="split-section" id="about">
          <div className="split-left">
            <div className="split-img-wrapper">
              <img src="imgs/bossing-blended.jpg" alt="Anthony Leuterio" loading="lazy" />
            </div>
          </div>
          <div className="split-right">
            <span className="overline">Legacy &amp; Vision</span>
            <h2 className="reveal">Redefining <em>Real Estate</em><br />Through Innovation</h2>
            <p className="lead reveal">Anthony Leuterio is more than just a real estate mogul — he is a visionary leader who has transformed the industry in the Philippines and beyond.</p>
            <p className="reveal">As the founder of Filipino Homes and Leuterio Realty, he has established an unparalleled ecosystem of over 133 franchise offices, empowering thousands of agents and property owners.</p>
            <blockquote className="reveal">
              "Innovation is not just about technology; it's about creating a future where everyone has a place to call home."
            </blockquote>
            <a href="#contact" className="text-link" onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>Get in Touch →</a>
          </div>
        </section>

        {/* ── COACHING ────────────────────────────────────────── */}
        <section className="chapter coaching-section" id="coaching">
          <div className="coaching-spotlight"></div>
          <div className="coaching-container">
            <div className="coaching-visual-side">
              <div className="pill-badge reveal" style={{ background: 'rgba(74, 222, 128, 0.1)', borderColor: 'rgba(74, 222, 128, 0.3)', color: '#4ADE80', boxShadow: '0 0 15px rgba(74, 222, 128, 0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                Mentorship
              </div>
              <h2 className="reveal">Data-Driven<br />Coaching Approach</h2>
              <p className="reveal">We align strategies with target growth metrics, helping you identify the most effective markets for career acceleration.</p>
              <a href="#contact" className="cta-dive-deeper reveal" style={{ marginTop: '2rem' }} onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
                Start Scaling
                <div className="cta-circle" style={{ borderColor: '#4ADE80', color: '#4ADE80' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </a>
              <div className="coaching-gfx reveal">
                <div className="gfx-glow-text">ROI</div>
                <div className="gfx-floating-card">
                  <div className="gfx-header">
                    <div className="live-dot"></div>
                    <span>SYSTEM LIVE</span>
                  </div>
                  <div className="gfx-stat">+100M</div>
                  <div className="gfx-sub">Gross Sales Generated</div>
                  <div className="gfx-progress"><div className="gfx-bar"></div></div>
                </div>
                <div className="gfx-floating-icon icon-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                </div>
                <div className="gfx-floating-icon icon-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                </div>
              </div>
            </div>

            <div className="coaching-list-side">
              {initialCoaching?.slice(0, 3).map((item: any, index: number) => (
                <div key={item.id || index} className={`coaching-item${index === 0 ? ' active' : ''} reveal`} onClick={handleCoachingClick}>
                  <div className="ci-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="ci-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="ci-progress-line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEVELOPERS GRID ─────────────────────────────────── */}
        <section className="developers-section" id="developers">
          <div className="section-container">
            <span className="overline">Featured Partners</span>
            <h2>Trusted <em>Developers</em></h2>
            <div className="dev-grid">
              {initialDevelopers?.map((dev: any) => (
                <div key={dev.id} className="dev-card reveal">
                  <div className="dev-logo"><img src={dev.logo_url} alt={dev.name} loading="lazy" /></div>
                  <h4>{dev.name}</h4>
                  <a href={dev.website_url} target="_blank" rel="noopener" className="text-link">Explore →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STRATEGIC VENTURES (MONOLITHS) ──────────────────── */}
        <section className="chapter" id="ventures">
          <h2 className="chapter-heading reveal">
            STRATEGIC<br /><span>VENTURES</span>
          </h2>
          <div className="discovery-progress">
            <div className="progress-bar" id="v-progress"></div>
          </div>
          <div className="ventures-track" id="ventures-track">
            {/* Monolith 01 – Leuterio Realty */}
            <div className="monolith-wrapper">
              <div className="monolith reveal" data-index="01"
                onMouseEnter={() => addAura('aura-realty')} onMouseLeave={() => removeAura('aura-realty')}>
                <div className="monolith-main">
                  <span className="monolith-index">01 / REALTY</span>
                  <h3>{initialEcosystem?.[0]?.name ?? 'Leuterio Realty'}</h3>
                  <p>{initialEcosystem?.[0]?.description ?? 'The nationwide flagship brokerage powerhouse. Scaled through elite management and high-fidelity sales performance on a global stage.'}</p>
                </div>
                <div className="mini-logo-card">
                  <img src="imgs/LR White 1.png" className="mini-logo-decor logo-dark" alt="Leuterio Realty Logo" />
                </div>
              </div>
            </div>

            {/* Monolith 02 – Filipino Homes */}
            <div className="monolith-wrapper">
              <div className="monolith reveal" data-index="02"
                onMouseEnter={() => addAura('aura-gold')} onMouseLeave={() => removeAura('aura-gold')}>
                <div className="monolith-main">
                  <span className="monolith-index">02 / PORTAL</span>
                  <h3>{initialEcosystem?.[1]?.name ?? 'Filipino Homes'}</h3>
                  <p>{initialEcosystem?.[1]?.description ?? 'PropTech innovation. A massive digital ecosystem connecting millions of Filipinos to property opportunities across the globe.'}</p>
                </div>
                <div className="mini-logo-card">
                  <img src="imgs/Filipinohomeslogo-2 1.png" className="mini-logo-decor logo-dark" alt="Filipino Homes Logo" />
                </div>
              </div>
            </div>

            {/* Monolith 03 – Rent.ph */}
            <div className="monolith-wrapper">
              <div className="monolith reveal" data-index="03"
                onMouseEnter={() => addAura('aura-rent')} onMouseLeave={() => removeAura('aura-rent')}>
                <div className="monolith-main">
                  <span className="monolith-index">03 / RENTAL</span>
                  <h3>{initialEcosystem?.[2]?.name ?? 'Rent.ph'}</h3>
                  <p>{initialEcosystem?.[2]?.description ?? 'The significant rental marketplace infrastructure in the Philippines. Bridging housing inventory for the modern workforce.'}</p>
                </div>
                <div className="mini-logo-card">
                  <img src="imgs/image 2172.png" className="mini-logo-decor logo-dark" alt="Rent.ph Logo" />
                </div>
              </div>
            </div>

            {/* Monolith 04 */}
            <div className="monolith-wrapper"
              onMouseEnter={() => addAura('aura-dubai')} onMouseLeave={() => removeAura('aura-dubai')}>
              <div className="monolith reveal" data-index="04">
                <div className="monolith-main">
                  <span className="monolith-index">04 / GLOBAL</span>
                  <h3>globalrealty.ae</h3>
                  <p>A strategic expansion of the Leuterio ecosystem. Pioneering new infrastructure and empowering professionals across the global real estate landscape.</p>
                </div>
                <div className="mini-logo-card">
                  <img src="imgs/image 2161.png" className="mini-logo-decor logo-dark" alt="GlobalRealty Logo" />
                </div>
              </div>
            </div>

            {/* Monolith 05 */}
            <div className="monolith-wrapper"
              onMouseEnter={() => addAura('aura-venture5')} onMouseLeave={() => removeAura('aura-venture5')}>
              <div className="monolith reveal" data-index="05">
                <div className="monolith-main">
                  <span className="monolith-index">05 / PARTNERS</span>
                  <h3>FH<br />GLOBAL<br />PARTNERS</h3>
                  <p>Continuing the legacy of excellence. A new frontier in strategic real estate and lifestyle infrastructure is currently under development.</p>
                </div>
                <div className="mini-logo-card">
                  <img src="imgs/image 2307.png" className="mini-logo-decor logo-dark" alt="FH Global Partners Logo" />
                </div>
              </div>
            </div>

            {/* Monolith 06 – Bayanihan */}
            <div className="monolith-wrapper">
              <div className="monolith reveal" data-index="06"
                onMouseEnter={() => addAura('aura-bayanihan')} onMouseLeave={() => removeAura('aura-bayanihan')}>
                <div className="monolith-main">
                  <span className="monolith-index">06 / COMMUNITY</span>
                  <h3>BAYANIHAN</h3>
                  <p>Built by the people, for the people. A community-centric ecosystem empowering localized real estate growth and collaborative infrastructure.</p>
                </div>
                <div className="mini-logo-card">
                  <img src="imgs/bayanihanwhite 2.png" className="mini-logo-decor logo-dark" alt="Bayanihan Logo" />
                </div>
              </div>
            </div>

            {/* Monolith 07 */}
            <div className="monolith-wrapper">
              <div className="monolith reveal" data-index="07">
                <div className="monolith-main">
                  <span className="monolith-index">07 / UPCOMING</span>
                  <h3>Next Chapter</h3>
                  <p>A new venture is taking shape. The next bold move in the Leuterio strategic ecosystem is currently in development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWS GRID ───────────────────────────────────────── */}
        <section className="news-section" id="news">
          <div className="section-container">
            <span className="overline">Media &amp; Insights</span>
            <h2>Latest <em>Updates</em></h2>
            <div className="news-grid">
              {initialNews?.map((news: any) => (
                <div key={news.id} className="news-card reveal">
                  <div className="news-img">
                    <img src={news.image_url} alt={news.title} loading="lazy" />
                    <span className="news-tag">{news.tag}</span>
                  </div>
                  <div className="news-body">
                    <span className="news-date">{news.published_date}</span>
                    <h4>{news.title}</h4>
                    <p>{news.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AWARDS / RECOGNITION ────────────────────────────── */}
        <section className="chapter" id="scale">
          <h2 className="chapter-heading">
            VERIFIED<br /><span>LEGACY &amp; RECOGNITION</span>
          </h2>
          <div className="awards-container">
            <div className="awards-timeline">
              {initialAwards?.length > 0 ? initialAwards.map((award: any, i: number) => (
                <div key={award.id || i} className="award-item reveal">
                  <div className="award-visual">
                    <div className="award-year-overlay">{award.year}</div>
                    <div className="award-img-container">
                      <img src={award.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'} alt={award.title} />
                    </div>
                  </div>
                  <div className="award-content">
                    <h3>{award.title}</h3>
                    <p>{award.organization}</p>
                  </div>
                </div>
              )) : (
                <>
                  <div className="award-item reveal">
                    <div className="award-visual">
                      <div className="award-year-overlay">2025</div>
                      <div className="award-img-container"><img src="imgs/Grand Realty award 2025.jpg" alt="Grand Realty Award 2025" /></div>
                    </div>
                    <div className="award-content"><h3>Grand Realty Award</h3><p>Global Leadership Distinction — 2025 Excellence Summit</p></div>
                  </div>
                  <div className="award-item reveal">
                    <div className="award-visual">
                      <div className="award-year-overlay">2024</div>
                      <div className="award-img-container"><img src="imgs/upscalemedia-transformed (1).jpeg" alt="International Realtor of the Year" /></div>
                    </div>
                    <div className="award-content"><h3>International Realtor of the Year</h3><p>National Association of Realtors (NAR) USA — First Filipino Honoree in History</p></div>
                  </div>
                  <div className="award-item reveal">
                    <div className="award-visual">
                      <div className="award-year-overlay">2025</div>
                      <div className="award-img-container"><img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200" alt="Dubai" /></div>
                    </div>
                    <div className="award-content"><h3>Elite Partner Award — Dubai</h3><p>Dugasta Properties UAE — First Filipino Marketing Firm Recognized in Dubai</p></div>
                  </div>
                  <div className="award-item reveal">
                    <div className="award-visual">
                      <div className="award-year-overlay">2025</div>
                      <div className="award-img-container"><img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200" alt="Taxpayer" /></div>
                    </div>
                    <div className="award-content"><h3>Top 1 Individual Taxpayer</h3><p>Bureau of Internal Revenue (BIR) — RDO 82 Cebu City South</p></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── CREDENTIALS ─────────────────────────────────────── */}
        <section className="chapter" id="credentials">
          <h2 className="chapter-heading">
            ARCHIVE<br /><span>OF AUTHORITY</span>
          </h2>
          <div className="credentials-vault">
            {initialCredentials?.length > 0 ? initialCredentials.map((cred: any, i: number) => (
              <div key={cred.id || i} className="credential-monolith reveal">
                <div className="cred-visual-portal">
                  <img src={cred.image_url || 'https://images.unsplash.com/photo-1454165833767-027ff33026b4?auto=format&fit=crop&q=80&w=800'} alt={cred.title} />
                </div>
                <div className="cred-seal"></div>
                <div className="cred-info">
                  <span className="cred-category">{cred.category?.toUpperCase()} / {cred.institution?.toUpperCase()}</span>
                  <h3>{cred.title}</h3>
                  <p className="cred-body">{cred.organization}</p>
                  <div className="cred-meta">
                    <span className="cred-badge">{cred.institution} CERTIFIED</span>
                    {cred.year && <span className="cred-date">{cred.year}</span>}
                  </div>
                </div>
              </div>
            )) : (
              <>
                {[
                  { cat: 'LICENSE / PRC', title: 'Licensed Real Estate Broker', org: 'Professional Regulation Commission', badge: 'PRC CERTIFIED', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800' },
                  { cat: 'CERT / GOOGLE', title: 'Digital Marketing Specialist', org: 'Google Digital Garage', badge: 'CERTIFIED', year: '2021', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
                  { cat: 'CERT / ASEAN', title: 'PropTech Innovation Certificate', org: 'ASEAN PropTech Forum', badge: 'CERTIFIED', year: '2023', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800' },
                  { cat: 'PROGRAM / AIM', title: 'Entrepreneurship Leadership Program', org: 'Asian Institute of Management', badge: 'GRADUATE', year: '2019', img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800' },
                ].map((c, i) => (
                  <div key={i} className="credential-monolith reveal">
                    <div className="cred-visual-portal"><img src={c.img} alt={c.title} /></div>
                    <div className="cred-seal"></div>
                    <div className="cred-info">
                      <span className="cred-category">{c.cat}</span>
                      <h3>{c.title}</h3>
                      <p className="cred-body">{c.org}</p>
                      <div className="cred-meta">
                        <span className="cred-badge">{c.badge}</span>
                        {c.year && <span className="cred-date">{c.year}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </section>

        {/* ── CONTACT FORM ─────────────────────────────────────── */}
        <section className="connect-section" id="contact">
          <div className="connect-blob"></div>
          <div className="connect-inner">
            <h2 className="connect-headline reveal">Let's Build<br /><em>Something</em><br />Extraordinary</h2>
            <p className="connect-sub reveal">Ready to revolutionize your real estate journey?</p>
            <form className="connect-form" id="contactForm" onSubmit={async (e) => {
              e.preventDefault();
              const status = document.getElementById('contactStatus');
              if (status) status.textContent = 'Sending...';
              const form = e.currentTarget;
              const name = (form.querySelector('#contactName') as HTMLInputElement)?.value;
              const email = (form.querySelector('#contactEmail') as HTMLInputElement)?.value;
              const message = (form.querySelector('#contactMessage') as HTMLTextAreaElement)?.value;
              try {
                const { createClient } = await import('@supabase/supabase-js');
                const supabase = createClient(
                  process.env.NEXT_PUBLIC_SUPABASE_URL!,
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );
                await supabase.from('contact_messages').insert([{ name, email, message }]);
                if (status) status.textContent = '✓ Message sent!';
                form.reset();
              } catch {
                if (status) status.textContent = '✗ Something went wrong. Please try again.';
              }
            }}>
              <div className="form-row">
                <input type="text" id="contactName" placeholder="Your Name" required />
                <input type="email" id="contactEmail" placeholder="Your Email" required />
              </div>
              <textarea id="contactMessage" placeholder="How can we build together?" required></textarea>
              <div className="form-footer">
                <div className="connect-meta">
                  <span>📍 Cebu City, Philippines</span>
                  <span>🌐 filipinohomes.com</span>
                </div>
                <button type="submit" className="big-btn" id="contactSubmit">Send Message</button>
              </div>
              <div id="contactStatus" className="form-status"></div>
            </form>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer>
        <div className="footer-inner">
          <span>© 2025 Anthony Leuterio</span>
          <div className="footer-links">
            <a href="https://www.facebook.com/TonLeuterioOfficial" target="_blank" rel="noopener">Facebook</a>
            <a href="https://www.instagram.com/tonleuterio/" target="_blank" rel="noopener">Instagram</a>
            <a href="https://www.linkedin.com/in/tonleuterio/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="/admin">Admin</a>
          </div>
        </div>
      </footer>
    </>
  );
}
