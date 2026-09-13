import { useConfig } from './hooks/useConfig.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Stack from './components/Stack.jsx';
import Work from './components/Work.jsx';
import Experience from './components/Experience.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CursorDot from './components/CursorDot.jsx';
import { ThemeProvider } from "./components/theme-provider"


export default function App() {
  const { config, error } = useConfig();

  if (error) {
    return (
      <div style={{ padding: 80, fontFamily: 'monospace', color: '#F2726E' }}>
        Couldn't load public/data/config.json. Make sure it exists in public/data/config.json
        and that the dev server / build is serving it. ({error.message})
      </div>
    );
  }

  if (!config) {
    return (
      <div style={{ padding: 80, fontFamily: 'monospace', color: '#8A8A93' }}>
        Loading…
      </div>
    );
  }

  // Apply theme accent + document title once config is ready
  document.title = config.meta.siteTitle;
  document.documentElement.style.setProperty('--accent', config.meta.lightThemeAccent || '#6EF2AE');

  return (
    <ThemeProvider config={config} defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grain"></div>
      <CursorDot />
      <Nav config={config} />
      <main id="top">
        <Hero config={config} />
        <About config={config} />
        <Services config={config} />
        <Stack config={config} />
        <Work config={config} />
        <Experience config={config} />
        <Testimonials config={config} />
        <Contact config={config} />
      </main>
      <Footer config={config} />
    </ThemeProvider>
  );
}
