import Track from "./components/Track";
import Dashboard from "./components/Dashboard";

export default function App() {

  return (
    <div style={{ background: "#0f172a", height: "100vh", color: "white" }}>
      <Dashboard />
      <Track />
    </div>
  );
}
