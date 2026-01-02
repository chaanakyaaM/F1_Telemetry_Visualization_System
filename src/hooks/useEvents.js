import { useEffect, useState } from "react";

export function useEvents(year) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  

  useEffect(() => {
    if (!year) return;

    setLoading(true);
    setError(null);

    fetch(`${backendUrl}/events/${year}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        const countries = Array.isArray(data?.Countries)
          ? data.Countries
          : [];

        setEvents(countries);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setEvents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year, backendUrl]);

  return { events, loading, error };
}
