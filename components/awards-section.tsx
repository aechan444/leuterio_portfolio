"use client";

const awards = [
  {
    year: "2025",
    title: "Grand Realty Award",
    text: "Global Leadership Distinction — 2025 Excellence Summit",
    img: "/imgs/Grand Realty award 2025.jpg",
  },
  {
    year: "2024",
    title: "International Realtor of the Year",
    text: "National Association of Realtors (NAR) USA — First Filipino Honoree in History",
    img: "/imgs/upscalemedia-transformed (1).jpeg",
  },
  {
    year: "2025",
    title: "Elite Partner Award — Dubai",
    text: "Dugasta Properties UAE — First Filipino Marketing Firm Recognized in Dubai",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    year: "2025",
    title: "Top 1 Individual Taxpayer",
    text: "Bureau of Internal Revenue (BIR) — RDO 82 Cebu City South",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
  },
];

export function AwardsSection() {
  return (
    <section className="chapter" id="scale">
      <h2 className="chapter-heading reveal">
        VERIFIED
        <br />
        <span>LEGACY & RECOGNITION</span>
      </h2>

      <div className="awards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {awards.map((award, i) => (
          <div key={i} className="award-item reveal">
            <div className="award-visual" style={{ position: "relative", marginBottom: "1.5rem" }}>
              <img src={award.img} alt={award.title} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "12px" }} />
              <div className="award-year-overlay font-mono" style={{ position: "absolute", top: "1rem", left: "1rem", background: "var(--ruby-crystal)", padding: "4px 12px", borderRadius: "4px", fontSize: "0.8rem" }}>{award.year}</div>
            </div>
            <h3>{award.title}</h3>
            <p style={{ color: "var(--white-ghost)" }}>{award.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
