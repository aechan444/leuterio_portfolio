"use client";

const ventures = [
  {
    index: "01 / REALTY",
    title: "Leuterio Realty",
    text: "The nationwide flagship brokerage powerhouse. Scaled through elite management and high-fidelity sales performance on a global stage.",
    logo: "/imgs/LR White 1.png",
  },
  {
    index: "02 / PORTAL",
    title: "Filipino Homes",
    text: "PropTech innovation. A massive digital ecosystem connecting millions of Filipinos to property opportunities across the global stage.",
    logo: "/imgs/Filipinohomeslogo-2 1.png",
  },
  {
    index: "03 / RENTAL",
    title: "Rent.ph",
    text: "The significant rental marketplace infrastructure in the Philippines. Bridging housing inventory for the modern workforce.",
    logo: "/imgs/RentPh new white logo 1.png",
  },
  {
    index: "04 / GLOBAL",
    title: "globalrealty.ae",
    text: "A strategic expansion of the Leuterio ecosystem. Pioneering new infrastructure and empowering professionals across the global real estate landscape.",
    logo: "/imgs/image 2161.png",
  },
  {
    index: "05 / PARTNERS",
    title: "FH Global Partners",
    text: "Continuing the legacy of excellence. A new frontier in strategic real estate and lifestyle infrastructure is currently under development.",
    logo: "/imgs/image 2307.png",
  },
  {
    index: "06 / COMMUNITY",
    title: "BAYANIHAN",
    text: "Built by the people, for the people. A community-centric ecosystem empowering localized real estate growth and collaborative infrastructure.",
    logo: "/imgs/bayanihanwhite 2.png",
  },
];

export function VenturesSection() {
  return (
    <section className="chapter" id="ventures">
      <h2 className="chapter-heading reveal">
        STRATEGIC
        <br />
        <span>VENTURES</span>
      </h2>

      <div className="ventures-track" id="ventures-track">
        {ventures.map((v, i) => (
          <div key={i} className="monolith-wrapper">
            <div className="monolith" data-index={v.index}>
              <div className="monolith-main">
                <span className="monolith-index font-mono">{v.index}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
              <div className="mini-logo-card">
                <img src={v.logo} className="mini-logo-decor" alt={v.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
