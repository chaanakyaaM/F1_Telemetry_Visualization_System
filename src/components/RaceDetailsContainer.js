import { useEffect, useState } from "react";

export default function RaceDetailsContainer({ event, year, session }) {
  const [raceName, setRaceName] = useState("");
  const [raceLocation, setRaceLocation] = useState("");
  const [raceCountry, setRaceCountry] = useState("");
  const [raceFormat, setRaceFormat] = useState("");
  const [officialName, setOfficialName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/data/${year}/${event}/${session}`
        );
        const data = await res.json();
        setRaceName(data.Event_name);
        setRaceLocation(data.Location);
        setRaceCountry(data.Country);
        setRaceFormat(data.Event_format);
        setOfficialName(data.Official_name);
      } catch (err) {
        console.error("Error fetching race details:", err);
      }
    };

    fetchData();
  }, [year, event, session]);

  return (
    <div className="absolute left-0 top-0 m-2 mt-12 border-white border-2 p-2 rounded-[20px] flex-wrap w-[250px] bg-black">
      Race: {raceName}
      <br />
      Year: {year}
      <br />
      Session: {session}
      <br />
      Location: {raceLocation}
      <br />
      Country: {raceCountry}
      <br />
      Format: {raceFormat}
      <br />
      Official Name: {officialName}
    </div>
  );
}
