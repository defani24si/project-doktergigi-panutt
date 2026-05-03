import React, { useState, useMemo } from 'react';
import cafesData from './cafes.json';
import CafeCard from './CafeCard';
import CafeTable from './CafeTable';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';

const CafeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [viewMode, setViewMode] = useState('guest'); // 'guest' or 'admin'

  // Get unique categories and cities for filters
  const categories = useMemo(() => {
    const allCategories = cafesData.map((cafe) => cafe.category);
    return [...new Set(allCategories)].sort();
  }, []);

  const cities = useMemo(() => {
    const allCities = cafesData.map((cafe) => cafe.location.city);
    // Sort cities alphabetically
    return [...new Set(allCities)].sort();
  }, []);

  // Filter cafes based on search, category, and city
  const filteredCafes = useMemo(() => {
    return cafesData.filter((cafe) => {
      const matchSearch = cafe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory ? cafe.category === selectedCategory : true;
      const matchCity = selectedCity ? cafe.location.city === selectedCity : true;
      
      return matchSearch && matchCategory && matchCity;
    });
  }, [searchTerm, selectedCategory, selectedCity]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Koleksi Cafe</h1>
            <p className="mt-1 text-sm text-gray-500">Temukan cafe favoritmu dari koleksi terbaik kami.</p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('guest')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'guest' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Guest (Cards)
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'admin' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Admin (Table)
            </button>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-auto flex-1">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="w-full md:w-auto">
            <FilterBar 
              categories={categories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              cities={cities}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>

        {/* Content Section */}
        {viewMode === 'guest' ? (
          <div>
            {filteredCafes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-lg">Tidak ada cafe yang cocok dengan pencarian Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredCafes.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>
            )}
          </div>
        ) : (
            
          <CafeTable cafes={filteredCafes} />
        )}
      </div>
    </div>
  );
};

export default CafeList;