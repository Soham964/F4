import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Filter } from 'lucide-react';

const SearchBar = ({ onSearch, className = '' }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchData);
    } else {
      // Navigate to listings page with search params
      const params = new URLSearchParams();
      if (searchData.location) params.append('location', searchData.location);
      if (searchData.checkIn) params.append('checkin', searchData.checkIn);
      if (searchData.checkOut) params.append('checkout', searchData.checkOut);
      if (searchData.guests > 1) params.append('guests', searchData.guests);
      
      router.push(`/listings?${params.toString()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Location Input */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Where to?
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={searchData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guests
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={searchData.guests}
                onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Actions */}
        <div className="flex items-center justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-primary-500 transition-colors"
          >
            <Filter className="w-5 h-5" />
            <span>More Filters</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </motion.button>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300">
                  <option value="">All Types</option>
                  <option value="cabin">Mountain Cabin</option>
                  <option value="cottage">Beach Cottage</option>
                  <option value="camp">Desert Camp</option>
                  <option value="lodge">Eco Lodge</option>
                  <option value="houseboat">Houseboat</option>
                  <option value="bungalow">Heritage Bungalow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300">
                  <option value="">Any Price</option>
                  <option value="0-2000">Under ₹2,000</option>
                  <option value="2000-4000">₹2,000 - ₹4,000</option>
                  <option value="4000-6000">₹4,000 - ₹6,000</option>
                  <option value="6000+">Above ₹6,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-500" />
                    <span className="text-sm text-gray-700">WiFi</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-500" />
                    <span className="text-sm text-gray-700">Parking</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 text-primary-500" />
                    <span className="text-sm text-gray-700">Pet Friendly</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchBar;