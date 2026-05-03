import React from 'react';

const CafeTable = ({ cafes }) => {
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    return new URL(`../assets/${imagePath}`, import.meta.url).href;
  };

  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (cafes.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-blue-200">
        <p className="text-blue-500">Tidak ada data cafe yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-blue-200">
      <table className="min-w-full divide-y divide-blue-100">
        <thead className="bg-gradient-to-r from-blue-50 to-cyan-50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Nama Cafe</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Kategori</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Kota</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Rating</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Pemilik</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Jam Operasional</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Menu Terlaris</th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Pendapatan/Bulan</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-100">
          {cafes.map((cafe) => (
            <tr key={cafe.id} className="hover:bg-blue-50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded object-cover shadow-sm border border-blue-200" src={getImageUrl(cafe.image)} alt={cafe.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-blue-900">{cafe.name}</div>
                    <div className="text-xs text-gray-500">{cafe.location.address}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-700">
                  {cafe.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-700">
                  {cafe.location.city}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900 font-medium">
                  <span className="text-blue-500 mr-1">★</span> 
                  <span className="text-blue-600">{cafe.rating}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {cafe.owner}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {cafe.hours}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-700">
                  {cafe.menu.bestSeller}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                {formatCurrency(cafe.business.monthlyRevenue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default CafeTable;