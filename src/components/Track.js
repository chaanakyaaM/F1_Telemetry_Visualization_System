// // import { useEffect, useRef, useState } from "react";
// // import Path from "./Path";

// // export default function Track({children, set_show, set_raceTime, show}) {
// //   const requestRef = useRef(null);
// //   const lastTimeRef = useRef(null);

// //   const [playing, setPlaying] = useState(true);
// //   const [playbackSpeed, setPlaybackSpeed] = useState(1);

// //   useEffect(() => {
// //     const animate = (time) => {
// //       if (!lastTimeRef.current) lastTimeRef.current = time;

// //       const delta = time - lastTimeRef.current;
// //       lastTimeRef.current = time;

// //       if (playing) {
// //         set_raceTime((t) => t + delta * playbackSpeed);
// //       }

// //       requestRef.current = requestAnimationFrame(animate);
// //     };

// //     requestRef.current = requestAnimationFrame(animate);

// //     return () => {
// //       if (requestRef.current) {
// //         cancelAnimationFrame(requestRef.current);
// //       }
// //     };
// //   }, [playing, playbackSpeed]);

// //   return (
// //     <div style={{ background: "#0f172a", height: "100vh", color: "white" }}>
// //       <div style={{ padding: 10, display: "flex", gap: 10 }}>
// //         <button onClick={() => setPlaying(p => !p)}>
// //           {playing ? "Pause" : "Play"}
// //         </button>

// //         <label>
// //           Speed {playbackSpeed}x 
// //           <input
// //             type="range"
// //             min="0"
// //             max="5"
// //             step="1"
// //             value={playbackSpeed}
// //             onChange={(e) => setPlaybackSpeed(+e.target.value)}
// //           />
// //         </label>

// //         <button onClick={() => set_raceTime(0)}>Reset</button>
// //         <button onClick={() => set_show(!show)}>
// //           {show ? "Hide Names" : "Show Names"}
// //         </button>
// //       </div>

// //       <Path>
// //           {children}
// //       </Path>
// //     </div>
// //   );
// // }


// import { useEffect, useRef, useState } from "react";
// import Path from "./Path";

// export default function Track({ children, set_show, set_raceTime, show }) {
//   const requestRef = useRef(null);
//   const lastTimeRef = useRef(null);

//   const playingRef = useRef(true);
//   const speedRef = useRef(1);

//   const [playing, setPlaying] = useState(true);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);

//   // keep refs in sync with state
//   useEffect(() => {
//     playingRef.current = playing;
//   }, [playing]);

//   useEffect(() => {
//     speedRef.current = playbackSpeed;
//   }, [playbackSpeed]);

//   // useEffect(() => {
//   //   const animate = (time) => {
//   //     if (!lastTimeRef.current) lastTimeRef.current = time;

//   //     const delta = time - lastTimeRef.current;
//   //     lastTimeRef.current = time;

//   //     if (playingRef.current) {
//   //       set_raceTime((t) => t + delta * speedRef.current);
//   //     }

//   //     requestRef.current = requestAnimationFrame(animate);
//   //   };

//   //   requestRef.current = requestAnimationFrame(animate);

//   //   return () => cancelAnimationFrame(requestRef.current);
//   // }, [set_raceTime]); // 👈 run ONCE only
//   useEffect(() => {
//   let mounted = true;

//   const animate = (time) => {
//     if (!mounted) return;

//     if (!lastTimeRef.current) lastTimeRef.current = time;

//     const delta = time - lastTimeRef.current;
//     lastTimeRef.current = time;

//     if (playingRef.current) {
//       set_raceTime(t => t + delta * speedRef.current);
//     }

//     requestRef.current = requestAnimationFrame(animate);
//   };

//   requestRef.current = requestAnimationFrame(animate);

//   return () => {
//     mounted = false;
//     cancelAnimationFrame(requestRef.current);
//   };

// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

//   return (
//     <div style={{ background: "#0f172a", height: "100vh", color: "white" }}>
//       <div style={{ padding: 10, display: "flex", gap: 10 }}>
//         <button onClick={() => setPlaying(p => !p)}>
//           {playing ? "Pause" : "Play"}
//         </button>

//         <label>
//           Speed {playbackSpeed}x
//           <input
//             type="range"
//             min="0"
//             max="5"
//             step="1"
//             value={playbackSpeed}
//             onChange={(e) => setPlaybackSpeed(+e.target.value)}
//           />
//         </label>

//         <button onClick={() => {lastTimeRef.current = null;set_raceTime(0)}}>Reset</button>
//         <button onClick={() => set_show(!show)}>
//           {show ? "Hide Names" : "Show Names"}
//         </button>
//       </div>

//       <Path>{children}</Path>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import Path from "./Path";

export default function Track({ children, set_show, set_raceTime, show }) {
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);
  const speedRef = useRef(1);

  const [playing, setPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Sync speed state to ref so the loop can read it without adding it to dependencies
  useEffect(() => {
    speedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    // 1. If paused, stop here. This breaks the loop cleanly.
    if (!playing) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      // 2. Initialize lastTimeRef on the first frame of a sequence
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      // Calculate time passed since last frame
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // 3. Safe update using the ref for speed
      set_raceTime((t) => t + delta * speedRef.current);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [playing, set_raceTime]); // Only restart the effect if Play/Pause is toggled

  // Helper to handle Reset cleanly
  const handleReset = () => {
    lastTimeRef.current = null; 
    set_raceTime(0);
  };

  return (
    <div style={{ background: "#0f172a", height: "100vh", color: "white" }}>
      <div style={{ padding: 10, display: "flex", gap: 10 }}>
        <button onClick={() => setPlaying((p) => !p)}>
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

        <button onClick={handleReset}>Reset</button>
        <button onClick={() => set_show(!show)}>
          {show ? "Hide Names" : "Show Names"}
        </button>
      </div>

      <Path>{children}</Path>
    </div>
  );
}