export default function Dashboard(){
     const drivers = [
    { id: "VER", name: "Max Verstappen", color: "#ef4444" },
    { id: "HAM", name: "Lewis Hamilton", color: "#22c55e" },
    { id: "PER", name: "Sergio Perez", color: "#facc15" },
    { id: "LEC", name: "Charles Leclerc", color: "#f87171" },
    { id: "RUS", name: "George Russell", color: "#60a5fa" },
    { id: "SAI", name: "Carlos Sainz", color: "#f97316" },
    { id: "NOR", name: "Lando Norris", color: "#a78bfa" },
    { id: "ALO", name: "Fernando Alonso", color: "#14b8a6" },
    { id: "OCO", name: "Esteban Ocon", color: "#f43f5e" },
    { id: "ZHO", name: "Zhou Guanyu", color: "#8b5cf6" },
  ];
    return(
        <div className="absolute top-0 right-0 m-4 mt-10">
            <h1>Dashboard</h1>
            {drivers.map(driver => ( 
                <div key={driver.id} className="flex items-center gap-1">
                    <div key={driver.id} className="h-3 w-3 rounded"
        style={{ backgroundColor: driver.color }}></div>
                    <div >{driver.name}</div>
                </div>
            ))}
        </div>
    )
}