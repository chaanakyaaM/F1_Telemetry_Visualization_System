
//       viewBox="-700 -4000 11000 13000"
//       width="100%"
//       height="100%"
//       style={{ background: "#111" }}
//       preserveAspectRatio="xMidYMid meet"

import { useEffect, useRef, useState } from "react";

export default function Path({ children,year, event_name, padding = 500 }) {
  const pathRef = useRef(null);
  const [viewBox, setViewBox] = useState(null);
  const [path, setPath] = useState(null);

  useEffect(() => {
    setViewBox(null);
    setPath(null);

    fetch(`http://127.0.0.1:8000/track/${year}/${event_name}`)
      .then(res => res.json())
      .then(data => setPath(data.path));
  }, [year, event_name]);

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
        d={path && path}
        fill="none"
        stroke="white"
        strokeWidth={120}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d={path && path}
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