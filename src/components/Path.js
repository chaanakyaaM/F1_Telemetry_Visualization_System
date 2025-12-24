
//       viewBox="-700 -4000 11000 13000"
//       width="100%"
//       height="100%"
//       style={{ background: "#111" }}
//       preserveAspectRatio="xMidYMid meet"

import { useEffect, useRef, useState } from "react";
import path from "./Bahrain International Circuit";


export default function Path({ children, padding = 500 }) {
  const pathRef = useRef(null);
  const [viewBox, setViewBox] = useState(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const { x, y, width, height } = pathRef.current.getBBox();

    setViewBox(
      `${x - padding} ${y - padding} ${width + padding * 2} ${height + padding * 2}`
    );
  }, [padding]);

  return (
    <svg
      viewBox={viewBox || "0 0 1000 1000"} // fallback
      width="100%"
      height="100%"
      style={{ background: "#111" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="white"
        strokeWidth={120}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d={path}
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
