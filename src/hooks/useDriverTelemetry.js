import { useEffect, useState } from "react";

export function useDriverTelemetry({ driver_id, year, event_name }) {
  const [telemetry, setTelemetry] = useState([]);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setError(false);

    fetch(`${backendUrl}/driver/${year}/${event_name}/${driver_id}`)
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
  }, [driver_id, year, event_name, backendUrl]);

  return { telemetry, error, loaded };
}
