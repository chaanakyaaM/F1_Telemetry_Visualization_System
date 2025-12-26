// // import Track from "./components/Track";
// // import { useState, useCallback, useRef, useEffect } from "react";
// // import Racer from "./components/Racer";
// // import MainContainer from "./components/MainContainer";
// // import Dashboard from "./components/Dashboard";
// // import DetailsContainer from "./components/DetailsContainer";
// // import RaceDetailsContainer from "./components/RaceDetailsContainer";


// // export default function App() {
// //   const [raceTime, setRaceTime] = useState(0);
// //   const [show, setShow] = useState(false);
// //   // const [driver, setDriver] = useState({})
  
// //   // 1. UI State (For the Dashboard display - updates slowly)
// //   const [dashboardData, setDashboardData] = useState({});

// //   // 2. Mutable Ref (For high-frequency data - updates instantly without re-rendering)
// //   const racersDataRef = useRef({});

// //   // 3. Optimized Updater: Writes to Ref (Instant, No Re-render)
// //   const updateRacersData = useCallback(
// //     (driver_id, speed, color, image_path, name) => {
// //       // Just update the Ref. This is virtually free and won't crash React.
// //       racersDataRef.current[driver_id] = { speed, color, driver_id, image_path, name };
// //     },
// //     []
// //   );

// //   // 4. Polling Loop: Syncs the Ref to the UI State periodically
// //   useEffect(() => {
// //     // Update the Dashboard 10 times a second (every 100ms)
// //     // This looks smooth to the human eye but saves 90% of CPU resources.
// //     const interval = setInterval(() => {
// //       setDashboardData({ ...racersDataRef.current });
// //     }, 100);

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <>
// //       <MainContainer>

// //         <Dashboard racersData={dashboardData} />
        
// //         <RaceDetailsContainer
// //           event={"Bahrain"}
// //           year={2023}
// //           session={"R"}
// //         />
        
// //         <DetailsContainer SelectedDriver={driver} driverData={racersDataRef[selectedDriver]}></DetailsContainer>
        
// //         <Track set_show={setShow} set_raceTime={setRaceTime} show={show}>
// //           <Racer
// //             driver_id="VER"
// //             raceTime={raceTime}
// //             color="#ef4444"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="HAM"
// //             raceTime={raceTime}
// //             color="#22c55e"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="PER"
// //             raceTime={raceTime}
// //             color="#facc15"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="LEC"
// //             raceTime={raceTime}
// //             color="#f87171"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="RUS"
// //             raceTime={raceTime}
// //             color="#8b5cf6"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="SAI"
// //             raceTime={raceTime}
// //             color="#f97316"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="NOR"
// //             raceTime={raceTime}
// //             color="#a78bfa"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="ALO"
// //             raceTime={raceTime}
// //             color="#14b8a6"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="OCO"
// //             raceTime={raceTime}
// //             color="#f43f5e"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="ZHO"
// //             raceTime={raceTime}
// //             color="#ff0000"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //           <Racer
// //             driver_id="PIA"
// //             raceTime={raceTime}
// //             color="#075cf6"
// //             show_names={show}
// //             updateRacersData={updateRacersData}
// //           />
// //         </Track>
// //       </MainContainer>
// //     </>
// //   );
// // }


// import Track from "./components/Track";
// import { useState, useCallback, useRef, useEffect } from "react";
// import Racer from "./components/Racer";
// import MainContainer from "./components/MainContainer";
// import Dashboard from "./components/Dashboard";
// import DetailsContainer from "./components/DetailsContainer";
// import RaceDetailsContainer from "./components/RaceDetailsContainer";
// import colors from "./components/Colors";

// export default function App() {
//   const [raceTime, setRaceTime] = useState(0);
//   const [show, setShow] = useState(false);
//   const [selectedDriver, setSelectedDriver] = useState(null);



//   // 1. UI State (For dashboard)
//   const [dashboardData, setDashboardData] = useState({});

//   // 2. Mutable Ref (High-frequency updates)
//   const racersDataRef = useRef({});

//   // 3. Optimized updater
//   const updateRacersData = useCallback(
//     (driver_id, speed, color, image_path, name) => {
//       racersDataRef.current[driver_id] = { speed, color, driver_id, image_path, name };
//     },
//     []
//   );

//   // 4. Sync ref to UI state
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDashboardData({ ...racersDataRef.current });
//     }, 100); // update 10 times/sec
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <MainContainer>
//       <Dashboard racersData={dashboardData} onClick={() => setSelectedDriver(dashboardData.driver_id)} />

//       <RaceDetailsContainer
//         event={"Bahrain"}
//         year={2023}
//         session={"R"}
//       />

//       {/* Details for selected driver */}
//       <DetailsContainer
//         SelectedDriver={selectedDriver}
//         driverData={selectedDriver ? racersDataRef.current[selectedDriver] : null}
//       />

//       <Track set_show={setShow} set_raceTime={setRaceTime} show={show}>
//         {["VER","HAM","PER","LEC","RUS","SAI","NOR","ALO","OCO","ZHO","PIA"].map((driver_id,ind) => (
//           <Racer
//             key={driver_id}
//             driver_id={driver_id}
//             raceTime={raceTime}
//             color={colors[ind]} // optional, set per driver
//             show_names={show}
//             updateRacersData={updateRacersData}
//             onClick={() => setSelectedDriver(driver_id)} // select driver on click
//           />
//         ))}
//       </Track>
//     </MainContainer>
//   );
// }

import Track from "./components/Track";
import { useState, useCallback, useRef, useEffect } from "react";
import Racer from "./components/Racer";
import MainContainer from "./components/MainContainer";
import Dashboard from "./components/Dashboard";
import RaceDetailsContainer from "./components/RaceDetailsContainer";
import colors from "./components/Colors";

export default function App() {
  const [raceTime, setRaceTime] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

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

  // const driverList = ["VER","HAM","PER","LEC","RUS","SAI","NOR","ALO","OCO","ZHO","PIA"];
  const driverList = ["VER","HAM"];
  const year = 2023;
  const event = "Bahrain";
  const session = "R";
  const event2 = "Austria"

  const year2= 2021

  return (
    <MainContainer>
      <Dashboard 
        racersData={dashboardData} 
        onClick={(driver_id) => setSelectedDriver(driver_id)} 
      />

      <RaceDetailsContainer event={event} year={year} session={session} SelectedDriver={selectedDriver}
        driverData={selectedDriver ? racersDataRef.current[selectedDriver] : null} />

      {/* <DetailsContainer
        SelectedDriver={selectedDriver}
        driverData={selectedDriver ? racersDataRef.current[selectedDriver] : null}
      /> */}

      <Track set_show={setShow} set_raceTime={setRaceTime} show={show} year={year2} event_name={event2}>
        {driverList && driverList.map((driver_id, ind) => (
          <Racer
            key={driver_id}
            driver_id={driver_id}
            raceTime={raceTime}
            color={colors[ind]}
            show_names={show}
            year={year2}
            event_name={event2}
            updateRacersData={updateRacersData}
            onClick={() => setSelectedDriver(driver_id)}
          />
        ))}
      </Track>
    </MainContainer>
  );
}
