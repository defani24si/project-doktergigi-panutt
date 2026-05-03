import React from 'react';

const FilterBar = ({ categories, selectedCategory, setSelectedCategory, cities, selectedCity, setSelectedCity }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm border bg-white cursor-pointer"
        >
            
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm border bg-white cursor-pointer"
        >
          <option value="">Semua Kota</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;