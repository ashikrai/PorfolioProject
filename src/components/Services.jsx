import Reveal from './Reveal.jsx';

export default function Services({ config }) {
  const services = config.services || [];

  return (
    <section className="section services" id="services">
      <div className="section-head">
        <span className="tag mono">/ services</span>
        <h2>What I do</h2>
      </div>
      <div className="services-grid">
        {services.map((s, i) => (
          <Reveal as="div" className="service-card" key={i}>
            <h3>{s.title}</h3>
            <ul>
              {s.tags.map((t, j) => <li key={j}>{t}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
