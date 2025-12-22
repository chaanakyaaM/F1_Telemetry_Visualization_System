import { useEffect, useRef, useState } from "react";
import path from "./track_path";
import Racer from "./Racer";

export default function Track(){
    const requestRef = useRef(null);
      const lastTimeRef = useRef(null);
    
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
    return () => cancelAnimationFrame(requestRef.current);
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
      </div>

      {/* Track */}
      <svg
        viewBox="-700 -4000 10000 15000"
        width="100%"
        height="100%"
        style={{ background: "#111" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={path}
          fill="none"
          stroke="white"
          strokeWidth="10"
        />

        {/* Max Verstappen
        <Racer
          driver_id="VER"
          raceTime={raceTime}
          color="#ef4444"
        />

        Lewis Hamilton
        <Racer
          driver_id="HAM"
          raceTime={raceTime}
          color="#22c55e"
        />

        Sergio Perez
        <Racer
          driver_id="PER"
          raceTime={raceTime}
          color="yellow"
        /> */}
        {/* Max Verstappen */}
        <Racer driver_id="VER" raceTime={raceTime} color="#ef4444" />
        {/* Lewis Hamilton */}
        <Racer driver_id="HAM" raceTime={raceTime} color="#22c55e" />
        {/* Sergio Perez */}
        <Racer driver_id="PER" raceTime={raceTime} color="#facc15" />
        {/* Charles Leclerc */}
        <Racer driver_id="LEC" raceTime={raceTime} color="#f87171" />
        {/* George Russell */}
        <Racer driver_id="RUS" raceTime={raceTime} color="#60a5fa" />
        {/* Carlos Sainz */}
        <Racer driver_id="SAI" raceTime={raceTime} color="#f97316" />
        {/* Lando Norris */}
        <Racer driver_id="NOR" raceTime={raceTime} color="#a78bfa" />
        {/* Fernando Alonso */}
        <Racer driver_id="ALO" raceTime={raceTime} color="#14b8a6" />
        {/* Esteban Ocon */}
        <Racer driver_id="OCO" raceTime={raceTime} color="#f43f5e" />
        {/* Zhou Guanyu */}
        <Racer driver_id="ZHO" raceTime={raceTime} color="#8b5cf6" />

       
      </svg>
    </div>
  );
}