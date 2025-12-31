import { useEffect, useRef, useState } from "react";
import { useTrack } from "../hooks/useTrack";

export default function Path({ children, year, event_name, padding = 500, setLoading }) {
  const pathRef = useRef(null);
  const { path, loading } = useTrack({ year, event_name });
  const [viewBox, setViewBox] = useState(null);

  useEffect(() => {
    setLoading && setLoading(loading);
  }, [loading, setLoading]);

  useEffect(() => {
    if (!pathRef.current) return;
    requestAnimationFrame(() => {
      const { x, y, width, height } = pathRef.current.getBBox();
      setViewBox(
        `${x - padding} ${y - padding} ${width + padding * 2} ${height + padding * 2}`
      );
    });
  }, [path, padding]);

  return (
    <svg
      key={`${year}-${event_name}`}
      viewBox={viewBox || "0 0 1000 1000"} // fallback
      width="100%"
      height="100%"
      style={{ background: "#111" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        ref={pathRef}
        d={path || ""}
        fill="none"
        stroke="white"
        strokeWidth={120}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={path || ""}
        fill="none"
        stroke="black"
        strokeWidth={80}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {children}
    </svg>
  );
}
