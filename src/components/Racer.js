import { useState, useEffect, useMemo } from "react";

export default function Racer({
  driver_id,
  raceTime,
  color = "#ef4444",
  show_names = false,
  updateRacersData 
}) {
  const [random] = useState(() => Math.random() * 100 + 200);
  const [telemetry, setTelemetry] = useState([]);
  const names = {
  VER: "Max Verstappen",
  PER: "Sergio Pérez",
  HAM: "Lewis Hamilton",
  RUS: "George Russell",
  LEC: "Charles Leclerc",
  SAI: "Carlos Sainz",
  NOR: "Lando Norris",
  PIA: "Oscar Piastri",
  ALO: "Fernando Alonso",
  STR: "Lance Stroll",
  OCO: "Esteban Ocon",
  GAS: "Pierre Gasly",
  ALB: "Alexander Albon",
  SAR: "Logan Sargeant",
  TSU: "Yuki Tsunoda",
  BOT: "Valtteri Bottas",
  ZHO: "Zhou Guanyu",
  MAG: "Kevin Magnussen",
  HUL: "Nico Hülkenberg",
  DEV: "Nyck de Vries",
  RIC: "Daniel Ricciardo",
  LAW: "Liam Lawson",
  MSC: "Mick Schumacher",
  LAT: "Nicholas Latifi",
    };
  
  const images = {
    VER: "Max Verstappen.png",
    PER: "Sergio Pérez.png",
    HAM: "Lewis Hamilton.png",
    RUS: "George Russell.png",
    LEC: "Carlos Sainz.png",
    SAI: "Carlos Sainz.png",
    NOR: "Lando Norris.png",
    PIA: "Carlos Sainz.png",
    ALO: "Fernando Alonso.png",
    STR: "Carlos Sainz.png",
    OCO: "Carlos Sainz.png",
    GAS: "Sergio Pérez.png",
    ALB: "Lewis Hamilton.png",
    SAR: "Carlos Sainz.png",
    TSU: "Carlos Sainz.png",
    BOT: "Lewis Hamilton.png",
    ZHO: "Sergio Pérez.png",
    MAG: "Carlos Sainz.png",
    HUL: "Max Verstappen.png",
    DEV: "Carlos Sainz.png",
    RIC: "Max Verstappen.png",
    LAW: "Lewis Hamilton.png",
    MSC: "Sergio Pérez.png",
    LAT: "Max Verstappen.png",
  }


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
      return { x: 0, y: 0, speed: 0 };
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
        };
      }
    }

    const last = telemetry[telemetry.length - 1];
    return { x: last.X, y: last.Y, speed: last.Speed };
  }, [telemetry, raceTime]);

  useEffect(() => {
  if (!updateRacersData) return;

  updateRacersData(
    driver_id,                 // ✅ KEEP ID
    Math.round(point.speed),
    color,
    images[driver_id],
    names[driver_id],

  );
}, [
  driver_id,
  point.speed,
  color,
  updateRacersData,
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
          width={1000}
          height={180}
        >
          <div
            style={{
              color: "black",
              border: "5px solid #333",
              borderRadius: "100px",
              background: "white",
              padding: "10px",
              paddingLeft: "100px",
              fontFamily: "Arial",
              fontSize: "100px",
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
