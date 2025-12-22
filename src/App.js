import { useEffect, useRef, useState } from "react";
import Api from "./components/Api";
import track_path from "./track_path";

export default function App() {

  const pathRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [speed, setSpeed] = useState(10);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const animate = (time) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const deltaTime = (time - lastTimeRef.current)/1000;
      lastTimeRef.current = time;

      setDistance((prev) => prev + speed * deltaTime);
      requestRef.current = requestAnimationFrame(animate);
      
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);

  },[speed]);

  const pathLength = pathRef.current?.getTotalLength() || 0;
  const point = pathRef.current?.getPointAtLength(distance % pathLength) || {x:0, y:0};

  return (
    <div style={{ background: "#0f172a", height: "100vh" }}>
      <Api />
      <input type="range" min="0" max="500" name="slider" onChange={(e) => setSpeed(e.target.value)}/>
        <svg
  viewBox="0 0 800 450"
  style={{
    width: "100vw",
    height: "100vh",
    background: "#111",
  }}
  preserveAspectRatio="xMidYMid meet"
>

        <path d={track_path}
        ref={pathRef}
          fill="none"
            stroke="white"
            strokeWidth="6"/>

        <circle
          cx={point.x}
          cy={point.y}
          r="8"
          fill="#ef4444"
        />
        <circle
          cx={point.x}
          cy={point.y}
          r="8"
          fill="blue"
        />
      </svg>
    </div>
  );
}
