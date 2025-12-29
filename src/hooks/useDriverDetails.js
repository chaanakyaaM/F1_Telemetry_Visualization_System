import { useEffect, useState } from "react";

export function useDriverDetails({ year, event, session, driverId }) {
  const [driverDetails, setDriverDetails] = useState(null);

  useEffect(() => {
    if (!driverId) {
      setDriverDetails(null);
      return;
    }

    let cancelled = false;

    async function fetchDriverData() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/racerDetails/${year}/${event}/${session}/${driverId}`
        );
        const data = await res.json();
        if (!cancelled) setDriverDetails(data);
      } catch (err) {
        console.error("Error fetching driver details:", err);
      }
    }

    fetchDriverData();

    return () => {
      cancelled = true;
    };
  }, [year, event, session, driverId]);

  return driverDetails;
}
