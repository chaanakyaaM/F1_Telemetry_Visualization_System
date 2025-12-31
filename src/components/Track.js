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
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);
  const speedRef = useRef(1);

  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  // 1. Added state for padding
  const [trackPadding, setTrackPadding] = useState(1500);

  useEffect(() => {
    speedRef.current = playbackSpeed;
  }, [playbackSpeed]);

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
      
      <div className="flex-1 w-full h-full relative py-1 px-1 transition-all duration-500">
        <Path year={year} event_name={event_name} setLoading={setLoading} padding={trackPadding}>
          {children}
        </Path>
      </div>

      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-6 px-5 py-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl z-50 transition-all hover:border-slate-500">
        
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

        <div className="flex flex-col min-w-[120px]">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Speed</span>
            <span className="text-xs font-mono text-red-500 font-bold">{playbackSpeed}x</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(+e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600 border border-slate-700"
          />
        </div>

        <div className="flex flex-col min-w-[120px]">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Padding</span>
            <span className="text-xs font-mono text-blue-500 font-bold">{trackPadding}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={trackPadding}
            onChange={(e) => setTrackPadding(+e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 border border-slate-700"
          />
        </div>

        <div className="h-10 w-[1px] bg-slate-800 mx-1" />

        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-700"
          >
            Reset
          </button>
          
          <button 
            onClick={() => set_show(!show)}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all border shadow-sm ${
              show 
                ? "bg-white text-black border-white" 
                : "text-slate-400 border-slate-800 hover:border-slate-600"
            }`}
          >
            {show ? "Hide Labels" : "Show Labels"}
          </button>

          <button 
            onClick={() => setOption("fastestLap")}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all border shadow-sm ${
              option === "fastestLap" 
                ? "bg-red-600 text-white border-red-600" 
                : "text-slate-400 border-slate-800 hover:border-slate-600"
            }`}
          >
            Fastest
          </button>

          <button 
            onClick={() => setOption("fullRace")}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all border shadow-sm ${
              option === "fullRace" 
                ? "bg-red-600 text-white border-red-600" 
                : "text-slate-400 border-slate-800 hover:border-slate-600"
            }`}
          >
            Race
          </button>
        </div>
      </div>

      <div className="absolute top-6 left-8 pointer-events-none z-40">
        <div className="flex items-center gap-3">
          {loading ? (
            <>
              <div className="w-1 h-6 bg-red-600 animate-pulse" />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">{'// System.loading'}</span>
            </>
          ) : (
            <>
              <div className="w-1 h-6 bg-green-600 animate-pulse" />
              <span className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">{'// System.Ready'}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}