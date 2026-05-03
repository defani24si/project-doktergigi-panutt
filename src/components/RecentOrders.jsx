import React from "react";

export default function RecentOrders() {
  const orders = [
    {
      id: "#ORD-001",
      name: "Budi Santoso",
      menu: "Nasi Goreng Spesial",
      time: "5 menit lalu",
      status: "Dikirim",
    },
    {
      id: "#ORD-002",
      name: "Siti Rahayu",
      menu: "Ayam Bakar Kecap",
      time: "12 menit lalu",
      status: "Diproses",
    },
    {
      id: "#ORD-003",
      name: "Andi Wijaya",
      menu: "Mie Goreng Seafood",
      time: "20 menit lalu",
      status: "Dikirim",
    },
    {
      id: "#ORD-004",
      name: "Dewi Pertiwi",
      menu: "Sate Ayam + Lontong",
      time: "35 menit lalu",
      status: "Dibatalkan",
    },
    {
      id: "#ORD-005",
      name: "Rizky Pratama",
      menu: "Gado-gado Jumbo",
      time: "50 menit lalu",
      status: "Diproses",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Dikirim":
        return "bg-green-100 text-green-700";
      case "Diproses":
        return "bg-blue-100 text-blue-700";
      case "Dibatalkan":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Pesanan Terkini
          </h2>
          <p className="text-sm text-gray-400">
            Aktivitas pesanan hari ini
          </p>
        </div>

        <button className="text-sm px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
          Lihat Semua
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-400 text-left">
              <th className="px-3">ID</th>
              <th className="px-3">Pelanggan</th>
              <th className="px-3">Menu</th>
              <th className="px-3">Waktu</th>
              <th className="px-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, index) => (
              <tr
                key={index}
                className="bg-gray-50 hover:bg-gray-100 transition rounded-xl"
              >
                <td className="px-3 py-3 font-medium">{item.id}</td>
                <td className="px-3">{item.name}</td>
                <td className="px-3">{item.menu}</td>
                <td className="px-3 text-gray-500">{item.time}</td>
                <td className="px-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>–
      </div>
    </div>
  );
}