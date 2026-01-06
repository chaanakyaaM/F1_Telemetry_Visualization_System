import { useEffect, useMemo } from "react";
import images from "../constants/Images";
import { useDriverTelemetry } from "../hooks/useDriverTelemetry";
import { useFullRace } from "../hooks/useFullRace";

export default function Racer({
  driver_id,
  raceTime,
  color = "#ef4444",
  show_names = false,
  updateRacersData,
  onClick,
  year,
  driverNames,
  option,
  event_name
}) {

  // Logic to determine which data source to use
  const shouldFetchFastest = option === 'fastestLap';
  const shouldFetchFull = option === 'fullRace';
  const session = "R";

  // Hook for single fastest lap telemetry
  const fastestLapData = useDriverTelemetry({
    driver_id: shouldFetchFastest ? driver_id : null,
    year,
    event_name
  });

  // Hook for telemetry across the entire race
  const fullRaceData = useFullRace({
    driver_id: shouldFetchFull ? driver_id : null,
    year,
    event_name,
    session
  });

  // Select the active dataset based on the user's choice (Fastest Lap vs Full Race)
  const { telemetry, loading, error } = useMemo(() => {
    return shouldFetchFastest ? fastestLapData : fullRaceData;
  }, [option, fastestLapData, fullRaceData, shouldFetchFastest]);

  /**
   * Main Calculation: Finds the driver's exact position (x, y) and stats
   * at the current 'raceTime' by interpolating between two known data points.
   */
  const point = useMemo(() => {
  if (!telemetry || telemetry.length < 2) return null;

  for (let i = 0; i < telemetry.length - 1; i++) {
    const t1 = telemetry[i].Time_sec * 1000;
    const t2 = telemetry[i + 1].Time_sec * 1000;

    // Check if current raceTime falls between these two telemetry timestamps
    if (raceTime >= t1 && raceTime <= t2) {
      const r = (raceTime - t1) / (t2 - t1); // The "ratio" or percentage between point A and B
      const lerp = (start, end, ratio) => start + ratio * (end - start);
      
      return {
        // Calculate smooth X/Y coordinates for the SVG circle
        x: telemetry[i].X + r * (telemetry[i + 1].X - telemetry[i].X),
        y: telemetry[i].Y + r * (telemetry[i + 1].Y - telemetry[i].Y),
        speed: telemetry[i].Speed + r * (telemetry[i + 1].Speed - telemetry[i].Speed),
        ngear: telemetry[i].nGear || 0,
        throttle: lerp(telemetry[i].Throttle || 0, telemetry[i + 1].Throttle || 0, r),
        distance: lerp(telemetry[i].Distance || 0, telemetry[i + 1].Distance || 0, r),
        rpm: telemetry[i].RPM || 0 
      };
    }
  }

  // Fallback to the last known point if raceTime exceeds telemetry range
  const last = telemetry[telemetry.length - 1];
  return { 
    x: last.X, y: last.Y, speed: last.Speed, 
    ngear: last.nGear || 0, throttle: last.Throttle || 0, 
    distance: last.Distance || 0, rpm: last.RPM || 0 
  };
}, [telemetry, raceTime]);

  // Sync the calculated real-time data back up to the parent component (e.g., for a leaderboard)
  useEffect(() => {
    if (!updateRacersData || !point) return;
    updateRacersData(
      driver_id,
      Math.round(point.speed),
      color,
      images[driver_id],
      driverNames?.[driver_id],
      point.ngear,
      Math.round(point.throttle),
      Math.round(point.rpm),
      point.distance
    );
  }, [driver_id, point, color, updateRacersData, driverNames]);

  if (loading || error || !point) return null;

  return (
    <g className="transition-all duration-300 ease-linear">
      {/* The Car "Dot" on the map */}
      <circle
        cx={point.x}
        cy={point.y}
        r={85}
        fill={color}
        stroke="#ffffff"
        strokeWidth={10}
        onClick={onClick}
        style={{ cursor: "pointer", filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
      />

      {/* Driver Name Label - Only visible if 'show_names' is true */}
      {show_names && (
        <g>
          {/* Connector line from car to name tag */}
          <line
            x1={point.x}
            y1={point.y}
            x2={point.x + 500}
            y2={point.y}
            stroke="white"
            strokeWidth={10}
          />
          {/* HTML-based label inside the SVG using foreignObject */}
          <foreignObject
            x={point.x + 490}
            y={point.y - 90}
            width={2000}
            height={500}
          >
            <div
              className="flex items-center"
              style={{
                fontFamily: "sans-serif",
                filter: "drop-shadow(5px 5px 15px rgba(0,0,0,0.5))"
              }}
            >
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.9)",
                  minWidth: 1000,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px 50px",
                  fontSize: "120px",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "-2px",
                  border: "5px solid white",
                  borderRadius: "50px",
                }}
              >
                {driverNames?.[driver_id] || driver_id}
              </div>
            </div>
          </foreignObject>
        </g>
      )}
    </g>
  );
}