import { useEffect } from "react";

export default function DetailsContainer({ SelectedDriver, driverData }) {
  if (!SelectedDriver || !driverData) return null;

  return (
    <div className="absolute left-0 bottom-0 m-3 p-4 border-white border-2 bg-black text-white rounded-[20px] shadow flex items-center gap-4">
      <img 
        src={`../assets/${driverData.image_path}`} 
        alt={driverData.name} 
        // style={{ height: "52px", width: "52px" }}
        className="h-[120px] w-[120px] border-2 border-white rounded-[10px]"
      />
      <div>
        <h2>{driverData.name}</h2>
        <p>Speed: {driverData.speed} km/h</p>
        <p>Gear: {driverData.ngear || "N/A"}</p>
        <p>Team: {driverData.team || "N/A"}</p>
        <p>Driver Number: {driverData.driver_id}</p>
      </div>
    </div>
  );
}
