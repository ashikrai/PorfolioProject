import Reveal from './Reveal.jsx';
import { useGithubRepos } from '../hooks/useGithubRepos.js';

export default function Work({ config }) {
  const { repos, status } = useGithubRepos(config);
  const gh = config.integrations.github;

  return (
    <section className="section work" id="work">
      <div className="section-head">
        <span className="tag mono">/ work</span>
        <h2>Featured projects</h2>
        {gh?.username && (
          <a
            className="section-link"
            href={`https://github.com/${gh.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View GitHub</span><i>→</i>
          </a>
        )}
      </div>

      <div className="work-grid">
        {status === 'disabled' && (
          <div className="work-skeleton mono">
            GitHub integration disabled — set integrations.github.enabled in config.json
          </div>
        )}
        {status === 'loading' && (
          <div className="work-skeleton mono">Fetching repositories…</div>
        )}
        {status === 'error' && (
          <div className="work-skeleton mono">
            Couldn't reach the GitHub API right now (rate limit or network). Check
            integrations.github.username in config.json, or try again shortly.
          </div>
        )}
        {status === 'ready' && repos.length === 0 && (
          <div className="work-skeleton mono">
            No public repositories found for "{gh.username}"
          </div>
        )}
        {status === 'ready' &&
          repos.map((repo) => (
            <Reveal
              as="a"
              className="work-card"
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="work-card-top">
                <h3>{repo.name}</h3>
                <span className="work-card-arrow">↗</span>
              </div>
              <p className="desc">{repo.description || 'No description provided.'}</p>
              <div className="work-card-meta">
                {repo.language && (
                  <span><span className="work-lang-dot"></span>{repo.language}</span>
                )}
                <span>★ {repo.stars}</span>
                <span>⑂ {repo.forks}</span>
                <span>Updated {repo.updated}</span>
              </div>
              {repo.topics.length > 0 && (
                <div className="work-tags">
                  {repo.topics.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
                </div>
              )}
            </Reveal>
          ))}
      </div>
    </section>
  );
}
