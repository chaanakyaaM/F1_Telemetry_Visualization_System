import { useEffect, useRef, useState } from "react";
import path from "./track_path";
import Racer from "./Racer";

export default function Track() {
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);
  const [show, setShow] = useState(false);

  const [raceTime, setRaceTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

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

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [playing, playbackSpeed]);

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
        <button onClick={() => setShow(!show)}>
          {show ? "Hide Names" : "Show Names"}
        </button>
      </div>

      {/* Track */}
      <svg
        viewBox="-700 -4000 11000 13000"
        width="100%"
        height="100%"
        style={{ background: "#111" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={path}
          fill="none"
          stroke="white"
          strokeWidth="120"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d={path}
          fill="none"
          stroke="black"
          strokeWidth="80"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <Racer driver_id="VER" raceTime={raceTime} color="#ef4444" show_names={show} />
        <Racer driver_id="HAM" raceTime={raceTime} color="#22c55e" show_names={show} />
        <Racer driver_id="PER" raceTime={raceTime} color="#facc15" show_names={show} />
        <Racer driver_id="LEC" raceTime={raceTime} color="#f87171" show_names={show} />
        <Racer driver_id="RUS" raceTime={raceTime} color="#8b5cf6" show_names={show} />
        <Racer driver_id="SAI" raceTime={raceTime} color="#f97316" show_names={show} />
        <Racer driver_id="NOR" raceTime={raceTime} color="#a78bfa" show_names={show} />
        <Racer driver_id="ALO" raceTime={raceTime} color="#14b8a6" show_names={show} />
        <Racer driver_id="OCO" raceTime={raceTime} color="#f43f5e" show_names={show} />
        <Racer driver_id="ZHO" raceTime={raceTime} color="#ff0000" show_names={show} />
        <Racer driver_id="PIA" raceTime={raceTime} color="#075cf6" show_names={show} />
      </svg>
    </div>
  );
}
