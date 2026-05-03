import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./assets/pertemuan-5/layouts/Sidebar";
import App from "./App.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-[#f3f4f6] min-h-screen flex font-poppins text-gray-800">
        <Sidebar />
        <div className="flex-1 p-8 overflow-y-auto">
          <App />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);