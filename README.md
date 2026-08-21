# Developer Portfolio — Vite + React

A dark, interactive, single-page developer portfolio built with React (Vite).
Fully data-driven — fork it, edit one JSON file, and it's yours.

## Quick start

```bash
npm install
npm run dev
```

Open the printed localhost URL. Edit `public/data/config.json` — the page
hot-reloads (or rather, refetches config on next render) without a rebuild.

## Production build

```bash
npm run build
npm run preview   # sanity-check the dist/ output locally
```

`public/` is copied as-is into `dist/`, so `dist/data/config.json` stays
editable even after building — you can re-point a deployed instance at a new
JSON file without rebuilding.

## Project structure

```
public/
  data/config.json          <- single source of truth: name, contact, bio,
                                skills, services, experience, education,
                                certifications, testimonials, social links,
                                integrations
  data/linkedin.sample.json <- shape reference for the optional LinkedIn file
  assets/                   <- favicon, avatar, resume — replace with your own
src/
  main.jsx                  <- React root
  App.jsx                   <- loads config, renders all sections
  hooks/
    useConfig.js             <- fetches config.json / optional linkedin.json
    useGithubRepos.js         <- fetches public repos from GitHub REST API
    useReveal.js              <- IntersectionObserver scroll-reveal hook
  components/
    Reveal.jsx    Nav.jsx     Hero.jsx        About.jsx
    Services.jsx  Stack.jsx   Work.jsx        Experience.jsx
    Testimonials.jsx  Contact.jsx  Footer.jsx  CursorDot.jsx
  styles/style.css           <- design system (CSS variables, layout, motion)
```

## GitHub integration

Set `integrations.github.username` in `config.json`. `useGithubRepos.js` calls
the public GitHub REST API (`https://api.github.com/users/<username>/repos`)
directly from the browser — no token needed for public data (subject to
GitHub's ~60 req/hr unauthenticated rate limit per IP). Your top or pinned
repos populate the "Work" section automatically.

## About the LinkedIn integration

LinkedIn does not provide a public API for reading someone else's profile data
(experience, education, certifications) — their official API is scoped to the
authenticated member only and requires a partner-approved OAuth app. There is
no legitimate client-side call this app can make to pull your LinkedIn data
live.

Two supported paths, both handled by `useLinkedin()` in `src/hooks/useConfig.js`:

- **Manual (default):** fill in `experience`, `education`, and `certifications`
  directly in `config.json`. This is what renders out of the box.
- **Semi-automated:** export your data from LinkedIn (Settings & Privacy →
  Data Privacy → Get a copy of your data), reshape it to match
  `public/data/linkedin.sample.json`, save it as `public/data/linkedin.json`
  (gitignored by default), and set `integrations.linkedin.enabled: true` in
  `config.json`. The app will then prefer that file's contents over the
  manual fields. For a live OAuth integration you'd need a small backend
  using LinkedIn's official "Sign in with LinkedIn" + Profile API and cache
  the result into that same JSON shape — LinkedIn's terms don't allow calling
  it directly from browser JS.

## Customizing the look

Change `meta.themeAccent` in config.json for a one-line accent color swap, or
edit the `:root` tokens at the top of `src/styles/style.css` for a deeper
restyle.

## Contact form

`contact.formEndpoint` is empty by default (demo mode). Point it at a
Formspree, Netlify Forms, or your own API endpoint to receive real
submissions.
