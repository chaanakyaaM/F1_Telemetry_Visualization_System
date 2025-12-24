import { useEffect, useRef, useState } from "react";
import Path from "./Path";

export default function Track({children, set_show, set_raceTime, show}) {
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const animate = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (playing) {
        set_raceTime((t) => t + delta * playbackSpeed);
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
      <div style={{ padding: 10, display: "flex", gap: 10 }}>
        <button onClick={() => setPlaying(p => !p)}>
          {playing ? "Pause" : "Play"}
        </button>

        <label>
          Speed {playbackSpeed}x 
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(+e.target.value)}
          />
        </label>

        <button onClick={() => set_raceTime(0)}>Reset</button>
        <button onClick={() => set_show(!show)}>
          {show ? "Hide Names" : "Show Names"}
        </button>
      </div>

      <Path>
          {children}
      </Path>
    </div>
  );
}
