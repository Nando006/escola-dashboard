import { Outlet } from "react-router-dom";

export default function Public() {
  return (
    <div className="w-screen h-screen bg-slate-100 text-neutral-700 relative font-afacad">
      <Outlet />
    </div>
  )
}