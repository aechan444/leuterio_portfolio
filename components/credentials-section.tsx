"use client";

const credentials = [
  {
    category: "LICENSE / PRC",
    title: "Licensed Real Estate Broker",
    body: "Professional Regulation Commission",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "CERT / PAREB",
    title: "Certified Real Estate Salesperson",
    body: "PAREB",
    img: "https://images.unsplash.com/photo-1554230505-919a13968970?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "CERT / GOOGLE",
    title: "Digital Marketing Specialist",
    body: "Google Digital Garage",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

export function CredentialsSection() {
  return (
    <section className="chapter" id="credentials">
      <h2 className="chapter-heading reveal">
        ARCHIVE
        <br />
        <span>OF AUTHORITY</span>
      </h2>

      <div className="credentials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2rem" }}>
        {credentials.map((cred, i) => (
          <div key={i} className="credential-monolith reveal">
            <div className="cred-visual-portal" style={{ marginBottom: "1.5rem" }}>
              <img src={cred.img} alt={cred.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }} />
            </div>
            <div className="cred-info">
              <span className="cred-category font-mono" style={{ fontSize: "0.7rem", color: "var(--gold-majestic)", letterSpacing: "0.2em" }}>{cred.category}</span>
              <h3 style={{ margin: "0.5rem 0" }}>{cred.title}</h3>
              <p style={{ color: "var(--white-ghost)" }}>{cred.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
