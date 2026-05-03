import { FaBell, FaSearch, FaClock } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useState, useEffect } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="header-container" className="flex justify-between items-center p-4">
      
      {/* Search Bar */}
      <div id="search-bar" className="relative w-full max-w-lg">
        <input
          id="search-input"
          type="text"
          placeholder="Search Here..."
          className="border border-gray-100 p-2 pr-10 bg-white w-full rounded-md outline-none shadow-sm"
        />
        <FaSearch
          id="search-icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300"
        />
      </div>

      {/* Icon & Profile Section */}
      <div id="icons-container" className="flex items-center space-x-4">
        
        {/* ⏰ JAM */}
        <div
          id="clock-container"
          className="flex items-center space-x-2 text-sm text-gray-500"
        >
          <FaClock />
          <span id="clock-text">{time.toLocaleTimeString()}</span>
        </div>

        {/* 🔔 Notification */}
        <div
          id="notification-icon"
          className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer"
        >
          <FaBell />
          <span
            id="notification-badge"
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full px-1.5 py-0.5 text-[10px] border-2 border-white"
          >
            50
          </span>
        </div>

        {/* 📊 Chart */}
        <div
          id="chart-icon"
          className="p-3 bg-blue-100 rounded-2xl cursor-pointer"
        >
          <FcAreaChart />
        </div>

        {/* ⚙️ Settings */}
        <div
          id="settings-icon"
          className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer"
        >
          <SlSettings />
        </div>

        {/* Profile Section */}
        <div
          id="profile-container"
          className="flex items-center space-x-4 border-l pl-4 border-gray-300"
        >
          <span id="profile-text" className="text-gray-700">
            Hello, <b className="font-bold">Fikri Muhaffizh</b>
          </span>
          <img
            id="profile-avatar"
            src="https://avatar.iran.liara.run/public/28"
            className="w-10 h-10 rounded-full"
            alt="profile"
          />
        </div>
      </div>
    </div>
  );
}