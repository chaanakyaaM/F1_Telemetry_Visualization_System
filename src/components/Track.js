import { useEffect, useRef, useState } from "react";
import Path from "./Path";

export default function Track({ 
  children,
  set_show,
  set_raceTime, 
  show, 
  year, 
  setOption,
  option, 
  event_name 
}) {
  // Refs to maintain values across renders without triggering re-renders
  const requestRef = useRef(null);      // Stores the animation frame ID
  const lastTimeRef = useRef(null);     // Stores the timestamp of the previous frame
  const speedRef = useRef(1);           // Mutable reference to playback speed for the loop

  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [trackPadding, setTrackPadding] = useState(1500); // Visual "Zoom" level

  // Keep the speedRef in sync with the state used by the UI slider
  useEffect(() => {
    speedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  /**
   * Main Animation Loop
   * Calculates the 'delta' (time between frames) to ensure smooth playback
   * regardless of the computer's monitor refresh rate.
   */
  useEffect(() => {
    if (!playing) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (time) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Increment race time based on elapsed real time multiplied by speed (e.g., 2x, 5x)
      set_raceTime((t) => t + delta * speedRef.current);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [playing, set_raceTime]);

  const handleReset = () => {
    lastTimeRef.current = null;
    set_raceTime(0);
  };

  return (
    <div className="relative w-full h-full bg-slate-950 flex flex-col overflow-hidden">
      
      {/* Background Track Path: Renders the SVG circuit layout */}
      <div className="flex-1 w-full h-full relative py-1 px-1 transition-all duration-500">
        <Path year={year} event_name={event_name} setLoading={setLoading} padding={trackPadding}>
          {children} {/* This is where the Racer dots are rendered */}
        </Path>
      </div>

      {/* Floating Control Bar */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-6 px-5 py-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl z-50 transition-all hover:border-slate-500">
        
        {/* Play/Pause Toggle */}
        <button 
          onClick={() => setPlaying((p) => !p)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-all active:scale-90 shadow-lg shadow-red-900/40"
        >
          {playing ? (
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-6 h-6 fill-white translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        {/* Playback Speed Slider (0x to 5x) */}
        <div className="flex flex-col min-w-[120px]">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Speed</span>
            <span className="text-xs font-mono text-red-500 font-bold">{playbackSpeed}x</span>
          </div>
          <input
            type="range"
            min="0" max="5" step="1"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(+e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600 border border-slate-700"
          />
        </div>

        {/* Zoom (Padding) Slider: Adjusts the SVG viewBox scale */}
        <div className="flex flex-col min-w-[120px]">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Zoom</span>
            <span className="text-xs font-mono text-blue-500 font-bold">{trackPadding}</span>
          </div>
          <input
            type="range"
            min="500" max="10000" step="100"
            value={trackPadding}
            onChange={(e) => setTrackPadding(+e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 border border-slate-700"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-800 mx-1" />

        {/* View Options: Labels and Data Source toggles */}
        <div className="flex gap-3">
          <button onClick={handleReset} className="...">Reset</button>
          
          <button 
            onClick={() => set_show(!show)}
            className={`... ${show ? "bg-white text-black" : "text-slate-400"}`}
          >
            {show ? "Hide Labels" : "Show Labels"}
          </button>

          {/* Toggle between viewing the single fastest lap vs. the entire race duration */}
          <button 
            onClick={() => setOption("fastestLap")}
            className={`... ${option === "fastestLap" ? "bg-red-600 text-white" : "text-slate-400"}`}
          >
            Fastest
          </button>

          <button 
            onClick={() => setOption("fullRace")}
            className={`... ${option === "fullRace" ? "bg-red-600 text-white" : "text-slate-400"}`}
          >
            Full Race
          </button>
        </div>
      </div>

      {/* System Status Indicator (Top Left) */}
      <div className="absolute top-6 left-8 pointer-events-none z-40">
        <div className="flex items-center gap-3">
          {loading ? (
            <><div className="w-1 h-6 bg-red-600 animate-pulse" /><span>// System.loading</span></>
          ) : (
            <><div className="w-1 h-6 bg-green-600 animate-pulse" /><span>// System.Ready</span></>
          )}
        </div>
      </div>
    </div>
  );
}