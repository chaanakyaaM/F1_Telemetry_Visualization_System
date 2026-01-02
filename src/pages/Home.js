import { useState, useEffect } from "react";
import CoreContainer from "../components/CoreContainer";
import { useEvents } from "../hooks/useEvents";

export default function Home() {
  const [tempYear, setTempYear] = useState(2023);
  const [tempEvent, setTempEvent] = useState("");
  const [tempSession, setTempSession] = useState("R");

  const { events, loading, error } = useEvents(tempYear);

  const [appliedConfig, setAppliedConfig] = useState({
    year: 2023,
    eventName: "",
    sessionName: "R",
  });

  const options = {
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
    sessions: [
      { id: "Q", label: "Qualifying" },
      { id: "R", label: "Race" },
    ],
  };

  useEffect(() => {
    if (events.length > 0) {
      setTempEvent(events[0]);
    }
  }, [events]);

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
              F1{" "}
              <span className="text-red-600">
                Telemetry Visualization System
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-semibold">
              Formula One Session Telemetry
            </p>
          </div>

          <div className="text-right hidden md:block bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            <p className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">
              Active Stream
            </p>
            <p className="text-lg font-mono text-red-500 leading-tight">
              {appliedConfig.year} {appliedConfig.eventName}
              <span className="text-slate-600 mx-2">|</span>
              {appliedConfig.sessionName}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Season
                </label>
                <select
                  value={tempYear}
                  onChange={(e) => setTempYear(Number(e.target.value))}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-700 px-3 py-2"
                >
                  {options.years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Grand Prix
                </label>
                <select
                  value={tempEvent}
                  onChange={(e) => setTempEvent(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-700 px-3 py-2"
                >
                  {loading && <option>Loading…</option>}
                  {!loading && !error &&
                    events.map((e) => (
                      <option key={`${e}`} value={e}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Session
                </label>
                <select
                  value={tempSession}
                  onChange={(e) => setTempSession(e.target.value)}
                  className="w-full bg-slate-950 text-white rounded-lg border border-slate-700 px-3 py-2"
                >
                  {options.sessions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full md:w-48 bg-red-600 hover:bg-red-700 text-white font-bold h-[42px] rounded-lg"
            >
              APPLY
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden h-[110vh]">
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
