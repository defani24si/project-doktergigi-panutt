import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
export default function MainLayout() {
  return (
    <div id="app-container" className="flex min-h-screen bg-gray-50">
      {" "}
      <Sidebar />{" "}
      <div id="main-content" className="flex-1 flex flex-col overflow-hidden">
        {" "}
        <Header />{" "}
        <div className="flex-1 p-6 overflow-auto">
          {" "}
          <Outlet />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
