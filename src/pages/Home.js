import { useState } from "react";
import CoreContainer from "../components/CoreContainer";

export default function Home() {
  const [tempYear, setTempYear] = useState(2023);
  const [tempEvent, setTempEvent] = useState("Bahrain");
  const [tempSession, setTempSession] = useState("R");

  const [appliedConfig, setAppliedConfig] = useState({
    year: 2023,
    eventName: "Bahrain",
    sessionName: "R",
  });

  const options = {
    years: [2022, 2023, 2024],
    events: ["Bahrain", "Saudi Arabia", "Australia"],
    sessions: [
      { id: "FP1", label: "Free Practice 1" },
      { id: "FP2", label: "Free Practice 2" },
      { id: "Q", label: "Qualifying" },
      { id: "R", label: "Race" },
    ],
  };

  const handleSubmit = () => {
    setAppliedConfig({
      year: tempYear,
      eventName: tempEvent,
      sessionName: tempSession,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 font-sans">
      <div className="w-[90%] mx-auto space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 w-full">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              F1 <span className="text-red-600">Telemetry Visualization System</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-semibold">Formula one Session Telemetry</p>
          </div>
          
          <div className="text-right hidden md:block bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Active Stream</p>
            <p className="text-lg font-mono text-red-500 leading-tight">
              {appliedConfig.year} {appliedConfig.eventName} <span className="text-slate-600 mx-2">|</span> {appliedConfig.sessionName}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Season</label>
                <select
                  value={tempYear}
                  onChange={(e) => setTempYear(Number(e.target.value))}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-700 px-3 py-2 focus:ring-1 focus:ring-red-600 outline-none cursor-pointer"
                >
                  {options.years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Grand Prix</label>
                <select
                  value={tempEvent}
                  onChange={(e) => setTempEvent(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-700 px-3 py-2 focus:ring-1 focus:ring-red-600 outline-none cursor-pointer"
                >
                  {options.events.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Session</label>
                <select
                  value={tempSession}
                  onChange={(e) => setTempSession(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-700 px-3 py-2 focus:ring-1 focus:ring-red-600 outline-none cursor-pointer"
                >
                  {options.sessions.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full md:w-48 bg-red-600 hover:bg-red-700 text-white font-bold h-[42px] rounded-lg transition-all active:scale-95 shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 shrink-0"
            >
              <span>APPLY</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden h-[110vh] relative w-[100%]">
          <CoreContainer
            year={appliedConfig.year}
            event_name={appliedConfig.eventName}
            session_name={appliedConfig.sessionName}
          />
        </div>
      </div>
    </div>
  );
}