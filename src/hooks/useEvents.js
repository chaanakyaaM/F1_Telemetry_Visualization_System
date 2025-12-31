import { useEffect, useState } from "react";

export function useEvents(year) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!year) return;

    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/events/${year}`)
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
  }, [year]);

  return { events, loading, error };
}
