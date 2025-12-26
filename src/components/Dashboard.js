export default function Dashboard({ racersData, onClick }) {
  return (
    <div className="absolute mt-9 bg-transparent p-4 right-0">
      {Object.values(racersData).map(racer => (
        <div 
          key={racer.driver_id} 
          onClick={() => onClick(racer.driver_id)} 
          className="flex items-center gap-2 mb-2 bg-black border-[1px] border-white rounded-[10px] p-2 pl-3 pr-3  cursor-pointer"
        >
          <div
            className="h-5 w-5 rounded-[20px]"
            style={{ backgroundColor: racer.color }}
          />
          <div className="flex flex-col gap-1">
            <div style={{ color: "white", fontSize: "13px" }}>
              {racer.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
