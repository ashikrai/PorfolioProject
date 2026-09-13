import { useEffect, useState } from 'react';
import userImage  from "../assets/images/profile.PNG"

import { useTheme } from "@/components/theme-provider"

// Unititled UI Imports
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";

// Kibo-UI Imports
import { ThemeSwitcher } from "@/components/kibo-ui/theme-switcher";

export default function Nav({ config }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { theme, setTheme } = useTheme()


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
      <div className="flex items-end flex-row gap-2">
        <AvatarLabelGroup
            verified
            size="md"
            src={userImage}
            alt={config.profile.name}
            // title={config.profile.name}
            // subtitle={config.profile.email}
          />
          <a className="nav-mark" href="#top">{config.profile.initials}</a>
      </div>
      <div className="flex flex-row gap-5 items-end">
        <ThemeSwitcher defaultValue="system" onChange={setTheme} value={theme} />
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
      </div>
    </header>
  );
}
