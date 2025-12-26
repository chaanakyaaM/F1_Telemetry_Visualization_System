import { useState, useEffect, useMemo } from "react";
import names from "./Names";
import images from "./Images";

export default function Racer({
  driver_id,
  raceTime,
  color = "#ef4444",
  show_names = false,
  updateRacersData,
  onClick
}) {
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetch(`http://127.0.0.1:8000/driver/${driver_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setTelemetry(data?.data ?? []);
        }
      })
      .catch((err) =>
        console.error("Error fetching telemetry:", err)
      );

    return () => {
      cancelled = true;
    };
  }, [driver_id]);

  const point = useMemo(() => {
    if (!telemetry.length) {
      return { x: 0, y: 0, speed: 0, ngear: 0};
    }

    for (let i = 0; i < telemetry.length - 1; i++) {
      const t1 = telemetry[i].Time_sec * 1000;
      const t2 = telemetry[i + 1].Time_sec * 1000;

      if (raceTime >= t1 && raceTime <= t2) {
        const r = (raceTime - t1) / (t2 - t1);

        return {
          x: telemetry[i].X + r * (telemetry[i + 1].X - telemetry[i].X),
          y: telemetry[i].Y + r * (telemetry[i + 1].Y - telemetry[i].Y),
          speed:
            telemetry[i].Speed +
            r * (telemetry[i + 1].Speed - telemetry[i].Speed),
          ngear: telemetry[i].nGear
        };
      }
    }

    const last = telemetry[telemetry.length - 1];
    return { x: last.X, y: last.Y, speed: last.Speed, ngear:last.ngear || 0 };
  }, [telemetry, raceTime]);

  useEffect(() => {
  if (!updateRacersData) return;

  updateRacersData(
    driver_id,                 
    Math.round(point.speed),
    color,
    images[driver_id],
    names[driver_id],
    point.ngear
  );
}, [
  driver_id,
  point.speed,
  color,
  updateRacersData,
  point.ngear
]);

  return (
    <>
      <circle
        cx={point.x}
        cy={point.y}
        r={80}
        fill={color}
        opacity={0.9}
        stroke="white"
        strokeWidth={5}
        onClick={onClick}
      />

      {show_names && (
        <>
        <line
          x1={point.x}
          y1={point.y}
          x2={point.x + 500}
          y2={point.y}
          stroke="white"
          strokeWidth={10}
        />

        <foreignObject
          x={point.x + 490}
          y={point.y - 90}
          width={1200}
          height={200}
        >
          <div
            style={{
              color: "black",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              border: "5px solid #333",
              borderRadius: "100px",
              background: "white",
              padding: "10px",
              fontFamily: "Arial",
              fontSize: "700%",
            }}
          >
            <strong>{names[driver_id]}</strong>
          </div>
        </foreignObject>
      </>
      )}
    </>
  );
}
