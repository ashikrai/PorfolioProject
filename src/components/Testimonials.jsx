import Reveal from './Reveal.jsx';

export default function Testimonials({ config }) {
  const testimonials = config.testimonials || [];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="section-head">
        <span className="tag mono">/ testimonials</span>
        <h2>What people say</h2>
      </div>
      <div className="testi-track">
        {testimonials.map((t, i) => (
          <Reveal as="div" className="testi-card" key={i}>
            <p className="testi-quote">"{t.quote}"</p>
            <p className="testi-name">{t.name}</p>
            <p className="testi-title">{t.title}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
