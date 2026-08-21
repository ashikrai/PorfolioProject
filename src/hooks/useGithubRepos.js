import { useEffect, useState } from 'react';

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const days = Math.floor((Date.now() - d) / 86400000);
  if (days < 1) return 'today';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

/**
 * Fetches public repos from the GitHub REST API for config.integrations.github
 * and returns a normalized, ready-to-render list. No auth/token required for
 * public data (subject to GitHub's unauthenticated rate limit, ~60 req/hr/IP).
 */
export function useGithubRepos(config) {
  const [repos, setRepos] = useState(null); // null = loading
  const [status, setStatus] = useState('idle'); // idle | loading | ready | disabled | error

  useEffect(() => {
    const gh = config?.integrations?.github;
    if (!config) return;
    if (!gh?.enabled || !gh?.username) {
      setStatus('disabled');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    fetch(`https://api.github.com/users/${gh.username}/repos?per_page=100&sort=updated`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        let list = Array.isArray(data) ? data : [];
        if (gh.excludeForks) list = list.filter((r) => !r.fork);

        let selected;
        if (gh.pinnedRepos?.length) {
          selected = gh.pinnedRepos
            .map((name) => list.find((r) => r.name === name))
            .filter(Boolean);
        } else {
          selected = [...list]
            .sort(
              (a, b) =>
                b.stargazers_count - a.stargazers_count ||
                new Date(b.pushed_at) - new Date(a.pushed_at)
            )
            .slice(0, gh.maxRepos || 6);
        }

        const normalized = selected.map((r) => ({
          name: r.name,
          url: r.html_url,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count,
          forks: r.forks_count,
          updated: timeAgo(r.pushed_at),
          topics: r.topics || [],
        }));

        setRepos(normalized);
        setStatus('ready');
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('GitHub fetch failed:', err);
        setRepos([]);
        setStatus('error');
      });

    return () => { cancelled = true; };
  }, [config]);

  return { repos, status };
}
