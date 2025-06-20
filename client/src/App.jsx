import React from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 ">
      <AppRoutes />
    </div>
  );
}
