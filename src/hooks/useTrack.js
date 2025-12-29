import { useEffect, useState } from "react";

export function useTrack({ year, event_name }) {
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!year || !event_name) return;

    let cancelled = false;

    async function fetchTrack() {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`http://127.0.0.1:8000/track/${year}/${event_name}`);
        if (!res.ok) throw new Error();

        const data = await res.json();
        if (!cancelled) setPath(data.path);
      } catch (e) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTrack();

    return () => {
      cancelled = true;
    };
  }, [year, event_name]);

  return { path, loading, error };
}
