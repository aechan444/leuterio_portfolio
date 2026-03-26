"use client";

const col1 = ["/imgs/bossing-blended.jpg", "/imgs/bossing1.jpg", "/imgs/bossing2.jpg"];
const col2 = ["/imgs/bossing3.jpg", "/imgs/bossing4.jpg", "/imgs/bossing5.jpg"];
const col3 = ["/imgs/bossing6.jpg", "/imgs/bossing-blended.jpg", "/imgs/bossing1.jpg"];

export function MissionSection() {
  return (
    <section className="chapter" id="story">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4vw", alignItems: "center" }}>
        <div className="mission-copy">
          <div className="pill-badge reveal font-mono" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "var(--glass)", padding: "0.5rem 1rem", borderRadius: "999px", marginBottom: "2rem", border: "1px solid var(--border)", fontSize: "0.75rem", color: "var(--gold-majestic)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Who we are?
          </div>
          <h2 className="reveal" style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: "1.1", marginBottom: "2rem" }}>Over 2 decades of Excellence in Real Estate Ecosystem</h2>
          <p className="reveal" style={{ fontSize: "1.1rem", color: "var(--white-ghost)", lineHeight: "1.7", marginBottom: "2rem" }}>
            Pioneering the industry since 2004. Managing 7+ strategic ventures and reaching millions across the globe through a localized, data-driven real estate network.
          </p>
          <a href="#ventures" className="button button-secondary reveal">
            Dive deeper
          </a>
        </div>

        <div className="mission-visuals reveal">
          <div className="mission-column loop-down">
            {[...col1, ...col1].map((src, i) => (
              <div key={i} className="visual-card"><img src={src} alt="Mission" /></div>
            ))}
          </div>
          <div className="mission-column loop-up">
            {[...col2, ...col2].map((src, i) => (
              <div key={i} className="visual-card"><img src={src} alt="Mission" /></div>
            ))}
          </div>
          <div className="mission-column loop-down-fast">
            {[...col3, ...col3].map((src, i) => (
              <div key={i} className="visual-card"><img src={src} alt="Mission" /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
