import { useState } from "react";
import PageHeader from "../components/PageHeader";
import customersData from "../data/customers.json";

const LOYALTY_COLOR = {
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-gray-100 text-gray-600",
  Bronze: "bg-orange-100 text-orange-600",
};

const EMPTY_FORM = { name: "", email: "", phone: "", loyalty: "Bronze" };

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: `CUS-${String(customers.length + 1).padStart(3, "0")}`,
      ...form,
    };
    setCustomers([newCustomer, ...customers]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Customer" breadcrumb="Customer List">
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Add New Customer
        </button>
      </PageHeader>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Customer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Customer Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Loyalty</label>
                <select value={form.loyalty} onChange={e => setForm({ ...form, loyalty: e.target.value })}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-hijau">
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium">
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 rounded-xl bg-hijau text-white text-sm font-semibold hover:opacity-90">
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">All Customers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Customer ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Loyalty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-700">{c.id}</td>
                  <td className="px-6 py-4 text-gray-600">{c.name}</td>
                  <td className="px-6 py-4 text-gray-400">{c.email}</td>
                  <td className="px-6 py-4 text-gray-400">{c.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${LOYALTY_COLOR[c.loyalty]}`}>
                      {c.loyalty}
                    </span>
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
