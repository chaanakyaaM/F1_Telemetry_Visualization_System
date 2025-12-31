import { useEffect, useState } from "react";

export function useFullRace({ driver_id, year, event_name,session }) {
  const [telemetry, setTelemetry] = useState([]);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setError(false);

    fetch(`http://127.0.0.1:8000/fullrace/${year}/${event_name}/${session}/${driver_id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const t = data?.data ?? [];
        if (t.length===1) setError(true);
        setTelemetry(t);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) {
          setTelemetry([]);
          setError(true);
          setLoaded(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [driver_id, year, event_name]);

  return { telemetry, error, loaded };
}
