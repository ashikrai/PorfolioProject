import { useEffect, useState } from 'react';

export default function Hero({ config }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const skills = Object.values(config.skills || {}).flat();
  const marqueeItems = skills.length ? skills : ['Add skills to config.json'];
  const looped = [...marqueeItems, ...marqueeItems];

  return (
    <section className="hero" id="hero">
      <div className="hero-bg"><div className="scan"></div></div>
      <div className="hero-inner">
        <h1 className="hero-title">
          <span className="line reveal is-visible">{config.profile.name}</span>
          <span className="line reveal is-visible accent">{config.profile.role}</span>
          <p className="eyebrow mono reveal is-visible">
            <span className="dot-live"></span>
            <span>{config.profile.location}</span> · <span>{time}</span>
          </p>
        </h1>
        <p className="hero-sub reveal is-visible">{config.profile.bioShort}</p>
        <div className="hero-actions reveal is-visible">
          <a href="#work" className="btn btn-primary"><span>View Work</span><i>→</i></a>
          <a href={config.profile.resumeUrl || '#'} className="btn btn-ghost" download>
            <span>Résumé</span><i>↓</i>
          </a>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {looped.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>
    </section>
  );
}
