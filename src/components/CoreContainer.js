import Track from "./Track";
import { useState, useCallback, useRef, useEffect } from "react";
import Racer from "./Racer";
import MainContainer from "./MainContainer";
import Dashboard from "./Dashboard";
import RaceDetailsContainer from "./RaceDetailsContainer";
import colors from "../constants/Colors";

export default function CoreContainer({ year, event_name, session_name }) {
  const [raceTime, setRaceTime] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [driverCodes, setDriverCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] = useState({});
  const racersDataRef = useRef({});

  const updateRacersData = useCallback(
    (driver_id, speed, color, image_path, name, ngear) => {
      racersDataRef.current[driver_id] = { speed, color, driver_id, image_path, name, ngear };
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData({ ...racersDataRef.current });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!year || !event_name || !session_name) return;

    const fetchDriverCodes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/getdrivers/${year}/${event_name}/${session_name}`
        );
        const data = await res.json();
        
        setDriverCodes(data.DriverCodes);
      } catch (err) {
        console.error("Failed to fetch driver codes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverCodes();
  }, [year, event_name, session_name]);

  return (
    <MainContainer>
      <Dashboard
        racersData={dashboardData}
        onClick={(driver_id) => setSelectedDriver(driver_id)}
      />

      <RaceDetailsContainer
        event={event_name}
        year={year}
        session={session_name}
        SelectedDriver={selectedDriver}
        driverData={selectedDriver ? racersDataRef.current[selectedDriver] : null}
      />

      <Track set_show={setShow} set_raceTime={setRaceTime} show={show} year={year} event_name={event_name}>
        {loading ? (
          <p>Loading Drivers...</p>
        ) : (
          driverCodes.map((driver_id, ind) => (
            <Racer
              key={driver_id}
              driver_id={driver_id}
              raceTime={raceTime}
              // Using modulo to repeat colors if driver count exceeds colors array length
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