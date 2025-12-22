import { useState } from "react";

export default function Api() {
  const [data, setData] = useState(null);

  const call_api = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/");
      const json = await res.json();
      setData(JSON.stringify(json)); // stringify if it's an object
    } catch (error) {
      console.error("Error fetching API:", error);
      setData("Error fetching data");
    }
  };

  return (
    <>
    <div>
      <button type="button" className="bg-white" onClick={call_api}>
        Click Me
      </button>
      <div className="bg-white">{data || "No data"}</div>
    </div>
    </>
  );
}
