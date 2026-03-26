"use client";

export function TopBar() {
  return (
    <div className="top-bar">
      <a href="#hero" className="brand-logo-container">
        <img
          src="/imgs/al_brokerage_gold_logo.png"
          alt="Leuterio Logo"
          className="brand-main-logo"
        />
      </a>
      <div className="brand-id font-mono">CEBU / PH</div>
    </div>
  );
}
