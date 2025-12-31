import { useRaceDetails } from "../hooks/useRaceDetails";
import { useDriverDetails } from "../hooks/useDriverDetails";

export default function RaceDetailsContainer({
  event,
  year,
  session,
  SelectedDriver,
  driverData,
}) {
  const { raceDetails } = useRaceDetails({ year, event, session });
  const driverDetails = useDriverDetails({
    year,
    event,
    session,
    driverId: SelectedDriver,
  });

  return (
    <div className="pointer-events-auto absolute left-4 top-[10%] flex flex-col gap-4 w-[320px] max-h-[100vh] overflow-y-auto no-scrollbar">
      
      {raceDetails && (
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl text-white">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">
            Session Info
          </h2>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-bold">{raceDetails.Event_name}</span>
              <span className="text-slate-400 text-sm">{year}</span>
            </div>
            <p className="text-sm text-slate-300">{raceDetails.Official_name}</p>
            
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
               <div>
                 <span className="block text-slate-500">Location</span>
                 {raceDetails.Location}, {raceDetails.Country}
               </div>
               <div>
                 <span className="block text-slate-500">Format</span>
                 {raceDetails.Event_format}
               </div>
            </div>
          </div>
        </div>
      )}

      {SelectedDriver && driverData && driverDetails && (
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl text-white transition-all duration-300">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">
            Live Telemetry
          </h2>
          
          <div className="flex gap-4">
            <div className="relative shrink-0">
              <img
                src={`../assets/${driverData.image_path}`}
                alt={driverData.name}
                className="h-24 w-24 object-cover rounded-lg border border-slate-600 bg-slate-800"
              />
              <div className="absolute -bottom-2 -right-2 bg-white text-black font-bold text-xs h-6 w-6 flex items-center justify-center rounded-full border-2 border-slate-900">
                {driverDetails.DriverNumber || "#"}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-bold leading-tight">
                {driverDetails.FullName || "Unknown"}
              </h2>
              <p className="text-sm text-slate-400 mb-1">
                {driverDetails.Team || "Team N/A"}
              </p>
              <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded w-fit">
                {driverData.driver_id}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">

            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
              <span className="block text-[10px] uppercase text-slate-400 font-bold">Speed</span>
              <span className="text-xl font-mono text-white">
                {driverData.speed} <span className="text-xs text-slate-500">km/h</span>
              </span>
            </div>

            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
              <span className="block text-[10px] uppercase text-slate-400 font-bold">Gear</span>
              <span className="text-xl font-mono text-red-500">{driverData.ngear || "-"}</span>
            </div>

            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
              <span className="block text-[10px] uppercase text-slate-400 font-bold">RPM</span>
              <span className="text-xl font-mono text-white">{driverData.rpm || 0}</span>
            </div>

            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
              <span className="block text-[10px] uppercase text-slate-400 font-bold">Distance</span>
              <span className="text-xl font-mono text-white">
                {driverData.distance?.toFixed(2) || "0.00"} <span className="text-xs text-slate-500">M</span>
              </span>
            </div>

            <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50 col-span-2">
              <div className="flex justify-between items-center mb-1">
                <span className="block text-[10px] uppercase text-slate-400 font-bold">Throttle</span>
                <span className="text-xs font-mono text-green-400">{driverData.throttle || 0}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="bg-green-500 h-full transition-all duration-500" 
                  style={{ width: `${driverData.throttle}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}