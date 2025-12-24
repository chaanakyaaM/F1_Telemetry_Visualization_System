export default function Dashboard({racersData}){
    return (
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
    );
}