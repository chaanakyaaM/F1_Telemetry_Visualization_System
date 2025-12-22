import { useState, useEffect } from "react";

// components/Racer.jsx
export default function Racer({
  driver_id,
  raceTime,
  color = "#ef4444",
}) {
  const [telemetry, setTelemetry] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/driver/${driver_id}`)
      .then((res) => res.json())
      .then((data) => {
        // Extract the data array from the response
        setTelemetry(data.data || []);
      })
      .catch((err) => console.error("Error fetching telemetry:", err));
  }, [driver_id]);


  function getPointAtTime(data, t) {
    if (!data.length) {
      // Return a default position while data is loading
      return { x: 0, y: 0, speed: 0 };
    }

    for (let i = 0; i < data.length - 1; i++) {
      const t1 = data[i].Time_sec * 1000;
      const t2 = data[i + 1].Time_sec * 1000;

      if (t >= t1 && t <= t2) {
        const r = (t - t1) / (t2 - t1);

        return {
          x: data[i].X + r * (data[i + 1].X - data[i].X),
          y: data[i].Y + r * (data[i + 1].Y - data[i].Y),
          speed:
            data[i].Speed +
            r * (data[i + 1].Speed - data[i].Speed),
        };
      }
    }

    const last = data[data.length - 1];
    return { x: last.X, y: last.Y, speed: last.Speed };
  }

  const point = getPointAtTime(telemetry, raceTime);

  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={80}
      fill={color}
      opacity={0.8}
    />
  );
}
