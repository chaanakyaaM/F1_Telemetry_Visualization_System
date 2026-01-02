import { useEffect, useState } from "react";

export function useDriverDetails({ year, event, session, driverId }) {
  const [driverDetails, setDriverDetails] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  useEffect(() => {
    if (!driverId) {
      setDriverDetails(null);
      return;
    }

    let cancelled = false;

    async function fetchDriverData() {
      try {
        const res = await fetch(
          `${backendUrl}/racerDetails/${year}/${event}/${session}/${driverId}`
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
  }, [year, event, session, driverId, backendUrl]);

  return driverDetails;
}
