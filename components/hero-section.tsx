"use client";

const credibilityLogos = [
  "/imgs/LR White 1.png",
  "/imgs/Filipinohomeslogo-2 1.png",
  "/imgs/RentPh new white logo 1.png",
  "/imgs/image 2161.png",
  "/imgs/image 2307.png",
  "/imgs/bayanihanwhite 2.png",
];

export function HeroSection() {
  return (
    <section id="hero">
      <img
        src="/imgs/upscalemedia-transformed (1).jpeg"
        alt="Anthony Leuterio"
        className="hero-img-bg"
      />
      <span className="hero-sub reveal font-mono">International Principal / 2024</span>
      <h1 className="hero-name reveal">
        ANTHONY
        <br />
        LEUTERIO
      </h1>
      <p className="hero-name reveal" style={{ fontSize: "1.2rem", fontWeight: "400", background: "none", color: "var(--white-ghost)", webkitTextFillColor: "var(--white-ghost)", filter: "none", marginTop: "-1rem", marginBottom: "2rem", textTransform: "none", letterSpacing: "normal", maxWidth: "600px" }}>
        Helping agents, team leaders, and founders build high-performance systems and ecosystems. 
        Leveraging 2 decades of leadership as the founder of Filipino Homes & Leuterio Realty.
      </p>

      <div className="chosen-by-section">
        <h2 className="chosen-title font-mono">Chosen by</h2>
        <div className="marquee-track">
          <div className="marquee-content">
            {credibilityLogos.map((logo, i) => (
              <img key={i} src={logo} alt="Partner Logo" />
            ))}
            {/* Duplicate for seamless loop */}
            {credibilityLogos.map((logo, i) => (
              <img key={`dup-${i}`} src={logo} alt="Partner Logo" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
