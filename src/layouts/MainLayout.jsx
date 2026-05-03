import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div>
      <div id="app-container" className="flex min-h-screen bg-gray-50">
        <Sidebar/>
        <div id="main-content" className="flex-1 p-4">
          <Header />
          
          <Outlet />
        </div>
      </div>
    </div>
  );
}