import { useState } from "react";
import Track from "./Track";
import Racer from "./Racer";
import MainContainer from "./MainContainer";
import Dashboard from "./Dashboard";
import RaceDetailsContainer from "./RaceDetailsContainer";
import colors from "../constants/Colors";

import { useDrivers } from "../hooks/UseDrivers";
import { useRacersDashboard } from "../hooks/useRacerDashboard";

export default function CoreContainer({ year, event_name, session_name }) {
  const [raceTime, setRaceTime] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const {
    driverCodes,
    driverNames,
    loading
  } = useDrivers({ year, event_name, session_name });

  const {
    dashboardData,
    racersDataRef,
    updateRacersData
  } = useRacersDashboard(100);

  return (
    <MainContainer>
      <Dashboard
        racersData={dashboardData}
        driverNames={driverNames}
        onClick={setSelectedDriver}
      />

      <RaceDetailsContainer
        event={event_name}
        year={year}
        session={session_name}
        SelectedDriver={selectedDriver}
        driverData={
          selectedDriver ? racersDataRef.current[selectedDriver] : null
        }
      />

      <Track
        set_show={setShow}
        set_raceTime={setRaceTime}
        show={show}
        year={year}
        event_name={event_name}
      >
        {loading ? (
          <p>Loading Drivers...</p>
        ) : (
          driverCodes.map((driver_id, ind) => (
            <Racer
              key={driver_id}
              driver_id={driver_id}
              raceTime={raceTime}
              driverNames={driverNames}
              color={colors[ind % colors.length]}
              show_names={show}
              year={year}
              event_name={event_name}
              updateRacersData={updateRacersData}
              onClick={() => setSelectedDriver(driver_id)}
            />
          ))
        )}
      </Track>
    </MainContainer>
  );
}
