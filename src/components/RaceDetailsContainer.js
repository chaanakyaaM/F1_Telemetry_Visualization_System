// // import { useEffect, useState } from "react";

// // export default function RaceDetailsContainer({ event, year, session, SelectedDriver, driverData}) {
// //   const [raceName, setRaceName] = useState("");
// //   const [raceLocation, setRaceLocation] = useState("");
// //   const [raceCountry, setRaceCountry] = useState("");
// //   const [raceFormat, setRaceFormat] = useState("");
// //   const [officialName, setOfficialName] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await fetch(
// //           `http://127.0.0.1:8000/data/${year}/${event}/${session}`
// //         );
// //         const data = await res.json();
// //         setRaceName(data.Event_name);
// //         setRaceLocation(data.Location);
// //         setRaceCountry(data.Country);
// //         setRaceFormat(data.Event_format);
// //         setOfficialName(data.Official_name);
// //       } catch (err) {
// //         console.error("Error fetching race details:", err);
// //       }
// //     };

// //     fetchData();
// //   }, [year, event, session]);

// //   return (
// //     <div className="absolute left-0 top-0 m-2 mt-12 border-white border-2 p-2 rounded-[20px] flex-wrap w-[250px] bg-black">
// //       <div>
// //         Race: {raceName}
// //         <br />
// //         Year: {year}
// //         <br />
// //         Session: {session}
// //         <br />
// //         Location: {raceLocation}
// //         <br />
// //         Country: {raceCountry}
// //         <br />
// //         Format: {raceFormat}
// //         <br />
// //         Official Name: {officialName}
// //       </div>
// //       <div>
// //         <img 
// //         src={`../assets/${driverData.image_path}`} 
// //         alt={driverData.name} 
// //         // style={{ height: "52px", width: "52px" }}
// //         className="h-[120px] w-[120px] border-2 border-white rounded-[10px]"
// //       />
// //         {SelectedDriver && 
// //       <div>
// //         <h2>{driverData.name}</h2>
// //         <p>Speed: {driverData.speed} km/h</p>
// //         <p>Gear: {driverData.ngear || "N/A"}</p>
// //         <p>Team: {driverData.team || "N/A"}</p>
// //         <p>Driver Number: {driverData.driver_id}</p>
// //       </div>
// //         }
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";

// export default function RaceDetailsContainer({ event, year, session, SelectedDriver, driverData }) {
//   const [raceName, setRaceName] = useState("");
//   const [raceLocation, setRaceLocation] = useState("");
//   const [raceCountry, setRaceCountry] = useState("");
//   const [raceFormat, setRaceFormat] = useState("");
//   const [officialName, setOfficialName] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           `http://127.0.0.1:8000/data/${year}/${event}/${session}`
//         );
//         const data = await res.json();
//         setRaceName(data.Event_name);
//         setRaceLocation(data.Location);
//         setRaceCountry(data.Country);
//         setRaceFormat(data.Event_format);
//         setOfficialName(data.Official_name);
//       } catch (err) {
//         console.error("Error fetching race details:", err);
//       }
//     };

//     fetchData();
//   }, [year, event, session]);

//   if (!driverData) return null;

//   return (
//     <div className="absolute left-0 top-0 m-2 mt-12   flex flex-col gap-4 w-[300px]  text-white">
//       <div className="border-white border-2 p-2 rounded-[20px] bg-black">
//         <strong>Race Details:</strong>
//         <p>Race: {raceName}</p>
//         <p>Year: {year}</p>
//         <p>Session: {session}</p>
//         <p>Location: {raceLocation}</p>
//         <p>Country: {raceCountry}</p>
//         <p>Format: {raceFormat}</p>
//         <p>Official Name: {officialName}</p>
//       </div>

//       {SelectedDriver && <div className="flex items-center gap-4 pt-2 border-white border-2 p-2 rounded-[20px] bg-black">
//         <img 
//           src={`../assets/${driverData.image_path}`} 
//           alt={driverData.name} 
//           className="h-[120px] w-[120px] border-2 border-white rounded-[10px]"
//         />
//         <div>
//           <h2>{driverData.name}</h2>
//           <p>Speed: {driverData.speed} km/h</p>
//           <p>Gear: {driverData.ngear || "N/A"}</p>
//           <p>Team: {driverData.team || "N/A"}</p>
//           <p>Driver Number: {driverData.driver_id}</p>
//         </div>
//       </div>
//       }
//     </div>
//   );
// }

// import { useEffect, useState } from "react";

// export default function RaceDetailsContainer({ event, year, session, SelectedDriver, driverData }) {
//   const [raceName, setRaceName] = useState("");
//   const [raceLocation, setRaceLocation] = useState("");
//   const [raceCountry, setRaceCountry] = useState("");
//   const [raceFormat, setRaceFormat] = useState("");
//   const [officialName, setOfficialName] = useState("");
//   const [team,setTeam] = useState("");
//   const [number, setNumber] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           `http://127.0.0.1:8000/data/${year}/${event}/${session}`
//         );
//         const data = await res.json();
//         setRaceName(data.Event_name);
//         setRaceLocation(data.Location);
//         setRaceCountry(data.Country);
//         setRaceFormat(data.Event_format);
//         setOfficialName(data.Official_name);
//       } catch (err) {
//         console.error("Error fetching race details:", err);
//       }
//     };

//     fetchData();
//   }, [year, event, session]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           `http://127.0.0.1:8000/racerDetails/${year}/${event}/${session}/${driverData.driver_id}`
//         );
//         const data = await res.json();
//         setTeam(data.Team);
//         setNumber(data.DriverNumber);
//       } catch (err) {
//         console.error("Error fetching race details:", err);
//       }
//     };

//     fetchData();
//   }, [year, event, session]);

//   return (
//     <div className="absolute left-0 top-0 m-2 mt-12 flex flex-col gap-4 w-[300px] text-white">
      
//       <div className="border-white border-2 p-2 rounded-[20px] bg-black">
//         <strong>Race Details:</strong>
//         <p>Race: {raceName}</p>
//         <p>Year: {year}</p>
//         <p>Session: {session}</p>
//         <p>Location: {raceLocation}</p>
//         <p>Country: {raceCountry}</p>
//         <p>Format: {raceFormat}</p>
//         <p>Official Name: {officialName}</p>
//       </div>

//       {SelectedDriver && driverData && (
//         <div className="flex items-center gap-4 pt-2 border-white border-2 p-2 rounded-[20px] bg-black">
//           <img 
//             src={`../assets/${driverData.image_path}`} 
//             alt={driverData.name} 
//             className="h-[120px] w-[120px] border-2 border-white rounded-[10px]"
//           />
//           <div>
//             <h2>{driverData.name}</h2>
//             <p>Speed: {driverData.speed} km/h</p>
//             <p>Gear: {driverData.ngear || "N/A"}</p>
//             <p>Team: {team || "N/A"}</p>
//             <p>Driver Number: {number}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function RaceDetailsContainer({ event, year, session, SelectedDriver, driverData }) {
  const [raceName, setRaceName] = useState("");
  const [raceLocation, setRaceLocation] = useState("");
  const [raceCountry, setRaceCountry] = useState("");
  const [raceFormat, setRaceFormat] = useState("");
  const [officialName, setOfficialName] = useState("");
  const [team, setTeam] = useState("");
  const [number, setNumber] = useState("");

  // Fetch race info once
  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/data/${year}/${event}/${session}`);
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
    fetchRaceData();
  }, [year, event, session]);

  // Fetch driver info **only when a driver is selected**
  useEffect(() => {
    if (!SelectedDriver) {
      setTeam("");
      setNumber("");
      return;
    }

    const fetchDriverData = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/racerDetails/${year}/${event}/${session}/${SelectedDriver}`
        ).then((res)=>res.json()).then((data)=>{setNumber(data.DriverNumber);setTeam(data.Team)});
        console.log(`http://127.0.0.1:8000/racerDetails/${year}/${event}/${session}/${SelectedDriver}`)
        // const data = await res.json();
        
        // setTeam(data.Driver_codes?.[SelectedDriver]?.Team || "N/A");
        // setNumber(data.Driver_codes?.[SelectedDriver]?.DriverNumber || "N/A");
      } catch (err) {
        console.error("Error fetching driver details:", err);
      }
    };

    fetchDriverData();
  }, [SelectedDriver, year, event, session]);

  return (
    <div className="absolute left-0 top-0 m-2 mt-12 flex flex-col gap-4 w-[350px] text-white">
      <div className="border-white border-2 p-2 rounded-[20px] bg-black">
        <strong>Race Details:</strong>
        <p>Race: {raceName}</p>
        <p>Year: {year}</p>
        <p>Session: {session}</p>
        <p>Location: {raceLocation}</p>
        <p>Country: {raceCountry}</p>
        <p>Format: {raceFormat}</p>
        <p>Official Name: {officialName}</p>
      </div>

      {SelectedDriver && driverData && (
        <div className="flex items-center gap-4 pt-2 border-white border-2 p-2 rounded-[20px] bg-black">
          <img 
            src={`../assets/${driverData.image_path}`} 
            alt={driverData.name} 
            className="h-[130px] w-[130px] border-2 border-white rounded-[10px]"
          />
          <div>
            <h2>{driverData.name}</h2>
            <p>Speed: {driverData.speed} km/h</p>
            <p>Gear: {driverData.ngear || "N/A"}</p>
            <p>Team: {team || "N/A"}</p>
            <p>Driver Code: {driverData.driver_id}</p>
            <p>Driver Number: {number || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
