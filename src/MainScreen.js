import Track from "./components/Track";
import {useState} from "react";
import Racer from "./components/Racer";
import MainContainer from "./components/MainContainer";
import Dashboard from "./components/Dashboard";
import DetailsContainer from "./components/DetailsContainer";
import RaceDetailsContainer from "./components/RaceDetailsContainer";

export default function MainScreen() {
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
    <MainContainer>
      <Dashboard racersData={racersData} />
      <RaceDetailsContainer raceName={"Monaco Grand Prix"} year={2023} session={"Qualifying Round"} />
      <DetailsContainer>
        checking
      </DetailsContainer>
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
    </MainContainer>
  );
}
