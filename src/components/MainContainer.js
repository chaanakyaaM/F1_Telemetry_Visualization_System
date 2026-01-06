export default function MainContainer({ children }) {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-slate-950 text-white overflow-hidden rounded-xl border border-slate-800 shadow-inner">
      {/* Main container that holds all the components together */}
      {children}
    </div>
  );
}