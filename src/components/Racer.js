import { useEffect, useMemo } from "react";
import images from "../constants/Images";
import { useDriverTelemetry } from "../hooks/useDriverTelemetry";

export default function Racer({
  driver_id,
  raceTime,
  color = "#ef4444",
  show_names = false,
  updateRacersData,
  onClick,
  year,
  driverNames,
  event_name
}) {
  const { telemetry, loading, error } = useDriverTelemetry({
    driver_id,
    year,
    event_name
  });

  const point = useMemo(() => {
    if (!telemetry.length || telemetry.length < 2) return null;

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
          ngear: telemetry[i].nGear || 0
        };
      }
    }

    const last = telemetry[telemetry.length - 1];
    return {
      x: last.X,
      y: last.Y,
      speed: last.Speed,
      ngear: last.nGear || 0
    };
  }, [telemetry, raceTime]);

  useEffect(() => {
    if (!updateRacersData || !point) return;

    updateRacersData(
      driver_id,
      Math.round(point.speed),
      color,
      images[driver_id],
      driverNames?.[driver_id],
      point.ngear
    );
  }, [driver_id, point, color, updateRacersData, driverNames]);

  if (loading || error || !point) return null;

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
        style={{ cursor: "pointer" }}
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
            height={250}
          >
            <div
              style={{
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "5px solid #333",
                borderRadius: "100px",
                background: "white",
                padding: "10px",
                fontSize: "800%",
                fontWeight: "bold"
              }}
            >
              {driverNames?.[driver_id] || driver_id}
            </div>
          </foreignObject>
        </>
      )}
    </>
  );
}
