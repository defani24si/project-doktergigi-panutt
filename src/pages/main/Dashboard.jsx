import { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUtensils } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";


export default function Dashboard() {
  // Filter state
  const [filter, setFilter] = useState("Weekly");

  // Data dummy
  const recentOrders = [
    { id: "#00121", menu: "Chicken Teriyaki", customer: "Ahmad", status: "Completed", color: "text-green-500" },
    { id: "#00122", menu: "Beef Burger", customer: "Siti", status: "Pending", color: "text-yellow-500" },
    { id: "#00123", menu: "Fresh Salad", customer: "Budi", status: "Canceled", color: "text-red-500" },
  ];

  return (
    <div id="dashboard-container" className="p-2">
      
      {/* Header + Filter */}
      <div className="flex justify-between items-center pr-5">
        <PageHeader />

        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 h-fit">
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === item
                  ? "bg-hijau text-white shadow-md"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* CARD GRID */}
      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-6">

        <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
          <div className="bg-hijau rounded-full p-4 text-3xl text-white">
            <FaShoppingCart />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">75</p>
            <p className="text-gray-400 text-sm">Total Orders</p>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
          <div className="bg-biru rounded-full p-4 text-3xl text-white">
            <FaTruck />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">175</p>
            <p className="text-gray-400 text-sm">Total Delivered</p>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
          <div className="bg-merah rounded-full p-4 text-3xl text-white opacity-80">
            <FaBan />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">40</p>
            <p className="text-gray-400 text-sm">Total Canceled</p>
          </div>
        </div>

        <div className="flex items-center space-x-5 bg-white rounded-2xl shadow-sm p-6">
          <div className="bg-kuning rounded-full p-4 text-3xl text-white">
            <FaDollarSign />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">Rp.128</p>
            <p className="text-gray-400 text-sm">Total Revenue</p>
          </div>
        </div>

      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="mx-5 mt-2 p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
          <button className="text-hijau font-bold text-sm hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-50">
                <th className="pb-4 font-medium">Order ID</th>
                <th className="pb-4 font-medium">Menu</th>
                <th className="pb-4 font-medium">Customer</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {recentOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 font-bold text-gray-700">{order.id}</td>

                  <td className="py-4 flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-hijau rounded-lg">
                      <FaUtensils />
                    </div>
                    {order.menu}
                  </td>

                  <td className="py-4 text-gray-600">{order.customer}</td>

                  {/* FIX ERROR DI SINI */}
                  <td className={`py-4 font-bold ${order.color}`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}