import { useEffect, useState } from 'react';

const CONFIG_URL = `${import.meta.env.BASE_URL}data/config.json`;
const LINKEDIN_URL = `${import.meta.env.BASE_URL}data/linkedin.json`;

/**
 * Loads the site config from /public/data/config.json at runtime.
 * This is the single file a user forking this template needs to edit —
 * no rebuild required in dev, and it's copied as-is into dist/ on build.
 */
export function useConfig() {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(CONFIG_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load ${CONFIG_URL}`);
        return res.json();
      })
      .then((data) => { if (!cancelled) setConfig(data); })
      .catch((err) => { if (!cancelled) setError(err); });
    return () => { cancelled = true; };
  }, []);

  return { config, error };
}

/**
 * Optionally loads /public/data/linkedin.json when
 * integrations.linkedin.enabled is true in config.json. Falls back to
 * null (callers then use the manual config.json experience/education/
 * certifications fields) if the file isn't present.
 */
export function useLinkedin(config) {
  const [linkedin, setLinkedin] = useState(null);

  useEffect(() => {
    if (!config?.integrations?.linkedin?.enabled) return;
    let cancelled = false;
    fetch(LINKEDIN_URL)
      .then((res) => {
        if (!res.ok) throw new Error('linkedin.json not found');
        return res.json();
      })
      .then((data) => { if (!cancelled) setLinkedin(data); })
      .catch(() => {
        // linkedin.json not present — silently keep using manual config fields.
      });
    return () => { cancelled = true; };
  }, [config]);

  return linkedin;
}
