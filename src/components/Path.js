import { useEffect, useRef, useState } from "react";
import { useTrack } from "../hooks/useTrack";

export default function Path({ children, year, event_name, padding = 500, setLoading }) {
  const pathRef = useRef(null);
  // Fetch the SVG path data for the specific track
  const { path, loading } = useTrack({ year, event_name });
  const [viewBox, setViewBox] = useState(null);

  // Pass the loading status back up to the parent (CoreContainer)
  useEffect(() => {
    setLoading && setLoading(loading);
  }, [loading, setLoading]);

  /**
   * Auto-Zoom Logic: 
   * Uses getBBox() to calculate the boundaries of the track path and
   * updates the SVG viewBox so the track is always centered and scaled.
   */
  useEffect(() => {
    if (!pathRef.current) return;
    requestAnimationFrame(() => {
      // Calculate the X, Y, Width, and Height of the track path
      const { x, y, width, height } = pathRef.current.getBBox();
      setViewBox(
        `${x - padding} ${y - padding} ${width + padding * 2} ${height + padding * 2}`
      );
    });
  }, [path, padding]); // Runs whenever the track changes or user adjusts zoom slider

  return (
    <svg
      key={`${year}-${event_name}`}
      viewBox={viewBox || "0 0 1000 1000"} // Initial fallback
      width="100%"
      height="100%"
      style={{ background: "#111" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outer Path (White): Acts as the "Curb" or border of the track */}
      <path
        ref={pathRef}
        d={path || ""}
        fill="none"
        stroke="white"
        strokeWidth={120}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Path (Black): Acts as the "Asphalt" racing surface */}
      <path
        d={path || ""}
        fill="none"
        stroke="black"
        strokeWidth={80}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Driver 'dots' are injected here as children */}
      {children}
    </svg>
  );
}