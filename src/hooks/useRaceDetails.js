import { useEffect, useState } from "react";

export function useRaceDetails({ year, event, session }) {
  const [raceDetails, setRaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    if (!year || !event || !session) return;

    let cancelled = false;

    async function fetchRaceData() {
      setLoading(true);
      try {
        const res = await fetch(
          `${backendUrl}/data/${year}/${event}/${session}`
        );
        const data = await res.json();
        if (!cancelled) setRaceDetails(data);
      } catch (err) {
        console.error("Error fetching race details:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRaceData();

    return () => {
      cancelled = true;
    };
  }, [year, event, session, backendUrl]);

  return { raceDetails, loading };
}
