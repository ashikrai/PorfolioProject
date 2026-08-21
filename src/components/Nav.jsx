import { useEffect, useState } from 'react';

export default function Nav({ config }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    console.log("toggle")
    document.body.classList.toggle('nav-open', navOpen);
  }, [navOpen]);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a className="nav-mark" href="#top">{config.profile.initials}</a>
      <nav className="nav-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#stack">Stack</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="nav-cta" href="#contact">
        <span>Let's talk</span><i>→</i>
      </a>
      <button
        className="nav-burger"
        aria-label="Menu"
        onClick={() => setNavOpen((v) => !v)}
      >
        <span></span><span></span>
      </button>
    </header>
  );
}
