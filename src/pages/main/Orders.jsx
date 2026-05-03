import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/orders.json";

const STATUS_COLOR = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

const EMPTY_FORM = { customerName: "", status: "Pending", totalPrice: "", orderDate: "" };

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      ...form,
      totalPrice: Number(form.totalPrice),
    };
    setOrders([newOrder, ...orders]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Orders" breadcrumb="Order List">
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Add New Order
        </button>
      </PageHeader>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Customer Name</label>
                <input required value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau">
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Total Price (Rp)</label>
                <input required type="number" value={form.totalPrice} onChange={e => setForm({ ...form, totalPrice: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Order Date</label>
                <input required type="date" value={form.orderDate} onChange={e => setForm({ ...form, orderDate: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau" />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 rounded-xl bg-hijau text-white text-sm font-semibold hover:opacity-90">
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">All Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Total Price</th>
                <th className="px-6 py-3 text-left">Order Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-700">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">Rp {order.totalPrice.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4 text-gray-400">{order.orderDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
