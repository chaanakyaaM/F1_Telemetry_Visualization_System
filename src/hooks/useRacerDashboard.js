import { useCallback, useEffect, useRef, useState } from "react";

export function useRacersDashboard(intervalMs = 100) {
  const racersDataRef = useRef({});
  const [dashboardData, setDashboardData] = useState({});

  const updateRacersData = useCallback(
    (driver_id, speed, color, image_path, name, ngear, throttle, rpm, distance) => {
      racersDataRef.current[driver_id] = {
        driver_id,
        speed,
        color,
        image_path,
        name,
        ngear,
        throttle,
        rpm,
        distance
      };
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData({ ...racersDataRef.current });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return { dashboardData, racersDataRef, updateRacersData };
}
