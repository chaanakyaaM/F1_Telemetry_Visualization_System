import { useEffect, useState } from "react";

export function useTrack({ year, event_name }) {
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    if (!year || !event_name) return;

    let cancelled = false;

    async function fetchTrack() {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`${backendUrl}/track/${year}/${event_name}`);
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
  }, [year, event_name, backendUrl]);

  return { path, loading, error };
}
