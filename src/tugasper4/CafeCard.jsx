import React from 'react';

const CafeCard = ({ cafe }) => {
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    return new URL(`../assets/${imagePath}`, import.meta.url).href;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col border-t-4 border-blue-500">
      <div className="relative pb-[120%] sm:pb-[150%]">
        <img 
          src={getImageUrl(cafe.image)} 
          alt={`Interior of ${cafe.name}`} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white font-bold px-2 py-1 rounded-md text-sm flex items-center shadow-md">
          <svg className="w-4 h-4 mr-1 text-white fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          {cafe.rating}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-blue-900 mb-1 line-clamp-2">{cafe.name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium tracking-wide">
              {cafe.category}
            </span>
            <span className="inline-block bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full font-medium tracking-wide">
              {cafe.location.city}
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {cafe.hours}
            </span>
          </div>
          
          {/* Tambahan informasi business (opsional) */}
          <div className="mt-3 pt-2 border-t border-blue-100">
            <div className="flex justify-between text-xs">
              <span className="text-blue-600 font-medium">Investasi</span>
              <span className="text-gray-700">Rp {(cafe.business.investment / 1000000).toFixed(0)} Jt</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-blue-600 font-medium">Revenue/bln</span>
              <span className="text-gray-700">Rp {(cafe.business.monthlyRevenue / 1000000).toFixed(0)} Jt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeCard; 

