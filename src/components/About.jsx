import Reveal from './Reveal.jsx';

export default function About({ config }) {
  const lines = [
    { prompt: true, text: 'whoami' },
    { prompt: false, text: `${config.profile.name} — ${config.profile.role}` },
    { prompt: true, text: 'cat status.txt' },
    {
      prompt: false,
      text: config.profile.availableForWork
        ? 'Open to new opportunities'
        : 'Not currently available',
    },
    { prompt: true, text: 'uptime' },
    { prompt: false, text: `Building since ${config.profile.yearsActive}` },
  ];

  return (
    <section className="section about" id="about">
      <div className="section-head">
        <span className="tag mono">/ about</span>
        <h2>Hey!</h2>
      </div>
      <div className="about-grid">
        <Reveal as="p" className="about-text">{config.profile.bioLong}</Reveal>
        <Reveal className="about-card">
          <div className="terminal">
            <div className="terminal-bar"><span></span><span></span><span></span></div>
            <div className="terminal-body mono">
              {lines.map((l, i) =>
                l.prompt ? (
                  <p key={i}><span className="prompt">$</span> {l.text}</p>
                ) : (
                  <p key={i} className="out">{l.text}</p>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
