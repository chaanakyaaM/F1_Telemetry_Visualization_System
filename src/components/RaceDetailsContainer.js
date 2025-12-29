import { useRaceDetails } from "../hooks/useRaceDetails";
import { useDriverDetails } from "../hooks/useDriverDetails";

export default function RaceDetailsContainer({
  event,
  year,
  session,
  SelectedDriver,
  driverData
}) {
  const { raceDetails } = useRaceDetails({ year, event, session });
  const driverDetails = useDriverDetails({
    year,
    event,
    session,
    driverId: SelectedDriver
  });

  return (
    <div className="absolute left-0 top-0 m-2 mt-12 flex flex-col gap-4 w-[350px] text-white">
      {raceDetails && (
        <div className="border-white border-2 p-2 rounded-[20px] bg-black">
          <strong>Race Details:</strong>
          <p>Race: {raceDetails.Event_name}</p>
          <p>Year: {year}</p>
          <p>Session: {session}</p>
          <p>Location: {raceDetails.Location}</p>
          <p>Country: {raceDetails.Country}</p>
          <p>Format: {raceDetails.Event_format}</p>
          <p>Official Name: {raceDetails.Official_name}</p>
        </div>
      )}

      {SelectedDriver && driverData && driverDetails && (
        <div className="flex items-center gap-4 pt-2 border-white border-2 p-2 rounded-[20px] bg-black">
          <img
            src={`../assets/${driverData.image_path}`}
            alt={driverData.name}
            className="h-[130px] w-[130px] border-2 border-white rounded-[10px]"
          />
          <div>
            <h2>{driverDetails.FullName || "N/A"}</h2>
            <p>Speed: {driverData.speed} km/h</p>
            <p>Gear: {driverData.ngear || "N/A"}</p>
            <p>Team: {driverDetails.Team || "N/A"}</p>
            <p>Driver Code: {driverData.driver_id}</p>
            <p>Driver Number: {driverDetails.DriverNumber || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
