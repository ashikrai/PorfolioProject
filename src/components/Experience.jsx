import Reveal from './Reveal.jsx';
import { useLinkedin } from '../hooks/useConfig.js';

export default function Experience({ config }) {
  const linkedin = useLinkedin(config);

  const experience = linkedin?.experience?.length ? linkedin.experience : (config.experience || []);
  const education = linkedin?.education?.length ? linkedin.education : (config.education || []);
  const certifications = linkedin?.certifications?.length
    ? linkedin.certifications
    : (config.certifications || []);

  return (
    <section className="section experience" id="experience">
      <div className="section-head">
        <span className="tag mono">/ experience</span>
        <h2>Where I've worked</h2>
      </div>
      <div className="timeline">
        {experience.length === 0 && (
          <p className="mono" style={{ color: 'var(--ink-dim)' }}>
            No experience entries yet — add to config.json.
          </p>
        )}
        {experience.map((e, i) => (
          <Reveal as="div" className="timeline-item" key={i}>
            <div className="timeline-date mono">{e.start} — {e.end}</div>
            <div>
              <div className="timeline-role">{e.role}</div>
              <div className="timeline-company">{e.company}</div>
              <ol>
                {
                  e.description.map((data, index) => (
                    <li key={index} className="timeline-desc">{data || ''}</li>
                  ))
                }
              </ol>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="section-head sub">
        <span className="tag mono">/ education</span>
      </div>
      <div className="timeline">
        {education.length === 0 && (
          <p className="mono" style={{ color: 'var(--ink-dim)' }}>No education entries yet.</p>
        )}
        {education.map((e, i) => (
          <Reveal as="div" className="timeline-item" key={i}>
            <div className="timeline-date mono">{e.start} — {e.end}</div>
            <div>
              <div className="timeline-role">{e.degree}</div>
              <div className="timeline-company">{e.school}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="section-head sub">
        <span className="tag mono">/ certifications</span>
      </div>
      <div className="cert-grid">
        {certifications.length === 0 && (
          <p className="mono" style={{ color: 'var(--ink-dim)' }}>No certifications yet.</p>
        )}
        {certifications.map((c, i) => (
          <Reveal as="div" className="cert-card" key={i}>
            <h4>{c.name}</h4>
            <p>{c.issuer} · {c.year}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
