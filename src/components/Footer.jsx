export default function Footer({ config }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h3>Let's build the next thing.</h3>
      </div>
      <div className="footer-grid">
        <div className="footer-col">
          <p className="mono tag">/ quick links</p>
          <a href="#top">Home</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-col">
          <p className="mono tag">/ contact</p>
          <a href={`mailto:${config.profile.email}`}>{config.profile.email}</a>
          <span>{config.profile.location}</span>
        </div>
        <div className="footer-col footer-mark">
          <span>{config.profile.initials}</span>
        </div>
      </div>
      <div className="footer-bottom mono">
        <span>© {new Date().getFullYear()} {config.profile.name}</span>
        <span>Built with a JSON template — fork it.</span>
      </div>
    </footer>
  );
}
