import { useEffect, useState } from "react";

export function useDriversData({ year, event_name, session_name }) {
  const [driverCodes, setDriverCodes] = useState([]);
  const [driverNames, setDriverNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    if (!year || !event_name || !session_name) return;

    let cancelled = false;

    async function fetchDrivers() {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(
          `${backendUrl}/getdrivers/${year}/${event_name}/${session_name}`
        );

        if (!res.ok) throw new Error();

        const data = await res.json();

        if (cancelled) return;

        const namesMap = {};
        data.DriverCodes.forEach((code, i) => {
          namesMap[code] = data.FullNames[i];
        });

        setDriverCodes(data.DriverCodes);
        setDriverNames(namesMap);
      } catch (e) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDrivers();

    return () => {
      cancelled = true;
    };
  }, [year, event_name, session_name]);

  return { driverCodes, driverNames, loading, error };
}
