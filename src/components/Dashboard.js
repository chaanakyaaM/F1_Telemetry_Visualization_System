export default function Dashboard({ racersData, driverNames, onClick }) {
  // Convert the telemetry data object into an array for mapping
  const racersList = Object.values(racersData);

  return (
    // Floating panel container
    <div className="pointer-events-auto absolute top-[10%] right-4 w-64 h-full flex flex-col gap-1">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Panel Header */}
        <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/50">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Live Timing
          </h3>
        </div>

        {/* Scrollable list of drivers */}
        <div className="overflow-y-auto p-2 space-y-1 scrollbar-hide h-full max-h-[600px]">
          {racersList.map((racer) => (
            <div
              key={racer.driver_id}
              onClick={() => onClick(racer.driver_id)} // Updates 'SelectedDriver' in CoreContainer
              className="group flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors border border-transparent hover:border-slate-600"
            >
              {/* Team Color Indicator Dot */}
              <div
                className="h-3 w-3 rounded-full shadow-sm shrink-0"
                style={{ backgroundColor: racer.color, boxShadow: `0 0 8px ${racer.color}40` }}
              />
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-200 group-hover:text-white truncate">
                  {driverNames[racer.driver_id] || racer.driver_id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}