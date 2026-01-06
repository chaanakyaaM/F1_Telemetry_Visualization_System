import { useState } from "react";
import Track from "./Track";
import Racer from "./Racer";
import MainContainer from "./MainContainer";
import Dashboard from "./Dashboard";
import RaceDetailsContainer from "./RaceDetailsContainer";
import colors from "../constants/Colors";
import { useDriversData } from "../hooks/useDriversData";
import { useRacersDashboard } from "../hooks/useRacerDashboard";

export default function CoreContainer({ year, event_name, session_name }) {
  // Global animation state: raceTime is the current "frame" of the playback
  const [raceTime, setRaceTime] = useState(0);
  const [show, setShow] = useState(false); // Toggles name labels on the track
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [raceOption, setRaceOption] = useState('fastestLap'); // 'fastestLap' vs 'fullRace'

  // Fetch the list of participating drivers for the specific event
  const { driverCodes, driverNames, loading } = useDriversData({
    year,
    event_name,
    session_name,
  });

  // Custom hook to manage real-time dashboard updates and refs for performance
  const { dashboardData, racersDataRef, updateRacersData } = useRacersDashboard(100);

  return (
    <MainContainer>
      {/* The Map Component: Handles the timeline slider and background track image */}
      <Track
        set_show={setShow}
        set_raceTime={setRaceTime}
        show={show}
        year={year}
        setOption={setRaceOption}
        option={raceOption}
        event_name={event_name}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <p className="animate-pulse font-mono">Loading Drivers...</p>
          </div>
        ) : (
          // Map through every driver to render their "dot" (Racer) on the track
          driverCodes.map((driver_id, ind) => (
            <Racer
              key={driver_id}
              driver_id={driver_id}
              raceTime={raceTime}
              driverNames={driverNames}
              color={colors[ind % colors.length]} // Cycles through the F1 team colors
              show_names={show}
              year={year}
              event_name={event_name}
              option={raceOption}
              updateRacersData={updateRacersData} // Callback to send telemetry up to dashboard
              onClick={() => setSelectedDriver(driver_id)}
            />
          ))
        )}
      </Track>

      {/* UI Overlay Layer: Using pointer-events-none allows clicks to pass through to the map */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Specific details and live telemetry for the clicked driver */}
        <RaceDetailsContainer
          event={event_name}
          year={year}
          session={session_name}
          SelectedDriver={selectedDriver}
          driverData={selectedDriver ? dashboardData[selectedDriver] : null}
        />

        {/*General leaderboard/dashboard of all drivers */}
        <Dashboard
          racersData={dashboardData}
          driverNames={driverNames}
          onClick={setSelectedDriver}
        />
      </div>
    </MainContainer>
  );
}