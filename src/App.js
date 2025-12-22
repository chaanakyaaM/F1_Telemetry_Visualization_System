import { useEffect, useRef, useState } from "react";
import telemetryData from "./data";
import path from "./track2"

export default function App() {
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [raceTime, setRaceTime] = useState(0); // ms
  const [playing, setPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // ---------- ANIMATION LOOP (TIME ONLY) ----------
  useEffect(() => {
    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (playing) {
        setRaceTime((t) => t + delta * playbackSpeed);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [playing, playbackSpeed]);

  // ---------- TIME → TELEMETRY POINT ----------
  function getPointAtTime(data, t) {
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

    // fallback → last point
    const last = data[data.length - 1];
    return { x: last.X, y: last.Y, speed: last.Speed };
  }

  const point = getPointAtTime(telemetryData, raceTime);

  // ---------- UI ----------
  return (
    <div style={{ background: "#0f172a", height: "100vh", color: "white" }}>
      {/* Controls */}
      <div style={{ padding: 10, display: "flex", gap: 10 }}>
        <button onClick={() => setPlaying(p => !p)}>
          {playing ? "Pause" : "Play"}
        </button>

        <label>
          Speed {playbackSpeed}x
          <input
            type="range"
            min="0.25"
            max="5"
            step="0.25"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(+e.target.value)}
          />
        </label>

        <button onClick={() => setRaceTime(0)}>Reset</button>
      </div>

      {/* SVG */}
      <svg
        viewBox="-700 -4000 10000 15000"
        width="100%"
        height="100%"
        style={{ background: "#111" }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Track */}
        <path
          d={path}
          fill="none"
          stroke="white"
          strokeWidth="10"
        />

        {/* Driver dot */}
        <circle
          cx={point.x}
          cy={point.y}
          r={80 + point.speed *0.1}
          fill="#ef4444"
        />
      </svg>
    </div>
  );
}
