import Track from "./components/Track";
import {useState} from "react";
import Racer from "./components/Racer";

export default function App() {
    const [raceTime, setRaceTime] = useState(0);
      const [show, setShow] = useState(false);
      const [racersData, setRacersData] = useState({});

      const updateRacersData = (driver_id, speed, color, image_path, name) => {
        setRacersData(prevData => ({
          ...prevData,
          [driver_id]: {speed, color, driver_id, image_path, name}
        }));
      };


  return (
    <div style={{ background: "#0f172a", height: "100vh", color: "white" }}>
      <div style={{ padding: "10px" }} className="absolute mt-9 bg-transparent p-4 right-0">
        {Object.values(racersData).map(racer => (
          <div key={racer.driver_id} className="flex items-center gap-2 mb-2 bg-black border-[1px] border-white rounded-[10px] p-1 ">
            
            <div
              className="h-5 w-5 rounded-full"
              style={{ backgroundColor: racer.color }}
            />
            <img src={`../assets/${racer.image_path}`} className="h-12 w-12"/>
            <div className="flex flex-col gap-1">
              <div
              style={{
                color: "white",
                fontSize: "12px"
              }}
            >
                {racer.name}
            </div>

            <div
              style={{
                color: "white",
                fontSize: "10px"
              }}
            >
                - {racer.speed} km/h
            </div>
            </div>

          </div>
        ))}
      </div>

      <Track set_show={setShow} set_raceTime={setRaceTime} show={show}>
        <Racer driver_id="VER" raceTime={raceTime} color="#ef4444" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="HAM" raceTime={raceTime} color="#22c55e" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="PER" raceTime={raceTime} color="#facc15" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="LEC" raceTime={raceTime} color="#f87171" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="RUS" raceTime={raceTime} color="#8b5cf6" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="SAI" raceTime={raceTime} color="#f97316" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="NOR" raceTime={raceTime} color="#a78bfa" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="ALO" raceTime={raceTime} color="#14b8a6" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="OCO" raceTime={raceTime} color="#f43f5e" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="ZHO" raceTime={raceTime} color="#ff0000" show_names={show} updateRacersData={updateRacersData}/>
        <Racer driver_id="PIA" raceTime={raceTime} color="#075cf6" show_names={show} updateRacersData={updateRacersData}/>
      </Track>
    </div>
  );
}
