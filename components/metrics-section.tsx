"use client";

type Metrics = {
  statusLabel: string;
  description: string;
  eventsCount: number | null;
  inquiriesCount: number | null;
};

export function MetricsSection({ metrics }: { metrics: Metrics }) {
  return (
    <section className="chapter" id="metrics">
      <h2 className="chapter-heading reveal">
        TRUST
        <br />
        <span>LAYER</span>
      </h2>

      <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
        <article className="award-item reveal">
          <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--gold-majestic)", letterSpacing: "0.2em" }}>SYSTEM STATUS</span>
          <strong style={{ display: "block", fontSize: "2rem", margin: "1rem 0" }}>{metrics.statusLabel}</strong>
          <p style={{ color: "var(--white-ghost)" }}>{metrics.description}</p>
        </article>
        <article className="award-item reveal">
          <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--gold-majestic)", letterSpacing: "0.2em" }}>TRACKED VISITS</span>
          <strong style={{ display: "block", fontSize: "2rem", margin: "1rem 0" }}>{metrics.eventsCount ?? "0"}</strong>
          <p style={{ color: "var(--white-ghost)" }}>Visitor activity is recorded through the integrated portfolio event flow.</p>
        </article>
        <article className="award-item reveal">
          <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--gold-majestic)", letterSpacing: "0.2em" }}>CLIENT INQUIRIES</span>
          <strong style={{ display: "block", fontSize: "2rem", margin: "1rem 0" }}>{metrics.inquiriesCount ?? "0"}</strong>
          <p style={{ color: "var(--white-ghost)" }}>Consultation requests are stored through the live inquiry pipeline.</p>
        </article>
      </div>
    </section>
  );
}
