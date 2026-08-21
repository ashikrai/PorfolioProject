import { useState } from 'react';

const SOCIAL_LABELS = { github: 'GH', linkedin: 'IN', twitter: 'X', youtube: 'YT', instagram: 'IG', medium: 'MDM' };

export default function Contact({ config }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ text: '', success: false });

  const endpoint = config.contact?.formEndpoint;

  const socials = {
    github: config.social.github ? `https://github.com/${config.social.github}` : '',
    medium: config.social.medium ? `https://medium.com/${config.social.medium}` : '',
    linkedin:
      config.integrations.linkedin.profileUrl ||
      (config.social.linkedin ? `https://www.linkedin.com/in/${config.social.linkedin}` : ''),
    twitter: config.social.twitter,
    youtube: config.social.youtube,
    instagram: config.social.instagram,
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!endpoint) {
      setStatus({
        text: 'Demo mode: wire contact.formEndpoint in config.json to receive messages.',
        success: false,
      });
      return;
    }
    setStatus({ text: 'Sending…', success: false });
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      const res = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('bad response');
      setStatus({ text: 'Message sent — thanks!', success: true });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus({ text: 'Something went wrong. Try emailing directly instead.', success: false });
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="contact-inner">
        <div>
          <span className="tag mono">/ contact</span>
          <h2 className="contact-title">Let's build<br />something.</h2>
          <p className="contact-sub">
            Have a project or a role in mind? Send a note — I read every one.
          </p>
          <div className="contact-links">
            <a href={`mailto:${config.profile.email}`} className="contact-link mono">
              — <span>{config.profile.email}</span>
            </a>
            <a href={`tel:${config.profile.phone.replace(/[^+\d]/g, '')}`} className="contact-link mono">
              — <span>{config.profile.phone}</span>
            </a>
          </div>
          <div className="social-row">
            {Object.entries(socials).map(([key, url]) =>
              url ? (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="mono">
                  {SOCIAL_LABELS[key]}
                </a>
              ) : null
            )}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea name="message" rows="4" value={form.message} onChange={handleChange} required />
          </label>
          <button type="submit" className="btn btn-primary full">
            <span>Send message</span><i>→</i>
          </button>
          <p className={`form-note mono ${status.success ? 'success' : ''}`}>{status.text}</p>
        </form>
      </div>
    </section>
  );
}
