import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Star, 
  Search,
  SlidersHorizontal,
  X,
  Wifi,
  Signal
} from 'lucide-react';
import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import ListingCard from '../src/components/ListingCard';
import SearchBar from '../src/components/SearchBar';
import AIChatWidget from '../src/components/AIChatWidget';
import { useRealTimeData, useRealTimeConnection } from '../src/hooks/useRealTimeData';
import { fetchProperties } from '../src/utils/api';
import { formatPrice } from '../src/utils/helpers';

const Listings = () => {
  const router = useRouter();
  const [filteredListings, setFilteredListings] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  
  // Real-time data connection
  const isConnected = useRealTimeConnection();
  
  // Real-time properties data
  const { data: listings, loading, error } = useRealTimeData('properties', {
    city: router.query.location || '',
    min_price: router.query.priceMin || '',
    max_price: router.query.priceMax || '',
  });
  
  const [filters, setFilters] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    type: '',
    guests: '',
    amenities: [],
    rating: '',
    instantBook: false,
  });

  useEffect(() => {
    // Apply URL query params to filters
    const query = router.query;
    if (query.location) {
      setFilters(prev => ({ ...prev, location: query.location }));
    }
    if (query.guests) {
      setFilters(prev => ({ ...prev, guests: query.guests }));
    }
    if (query.checkin) {
      // Handle check-in date if needed
    }
    if (query.checkout) {
      // Handle check-out date if needed
    }
  }, [router.query]);

  useEffect(() => {
    applyFilters();
  }, [listings, filters, sortBy]);

  // Fallback to REST API if WebSocket is not connected
  const loadListingsFallback = async () => {
    try {
      const data = await fetchProperties({
        city: router.query.location || '',
        min_price: router.query.priceMin || '',
        max_price: router.query.priceMax || '',
      });
      return data.results || data;
    } catch (error) {
      console.error('Error loading listings:', error);
      return [];
    }
  };

  const applyFilters = () => {
    let filtered = [...listings];

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(listing => 
        listing.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        listing.title.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.priceMin) {
      filtered = filtered.filter(listing => listing.price >= parseInt(filters.priceMin));
    }

    if (filters.priceMax) {
      filtered = filtered.filter(listing => listing.price <= parseInt(filters.priceMax));
    }

    if (filters.type) {
      filtered = filtered.filter(listing => 
        listing.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.guests) {
      filtered = filtered.filter(listing => 
        listing.maxGuests >= parseInt(filters.guests)
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(listing => 
        listing.rating >= parseFloat(filters.rating)
      );
    }

    if (filters.instantBook) {
      filtered = filtered.filter(listing => listing.instantBook);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(listing => {
        return filters.amenities.every(amenity => {
          switch (amenity) {
            case 'wifi':
              return listing.features.wifi;
            case 'parking':
              return listing.features.parking;
            case 'kitchen':
              return listing.features.kitchen;
            case 'petFriendly':
              return listing.features.petFriendly;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order (recommended)
        break;
    }

    setFilteredListings(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      priceMin: '',
      priceMax: '',
      type: '',
      guests: '',
      amenities: [],
      rating: '',
      instantBook: false,
    });
  };

  const handleSearch = (searchData) => {
    setFilters(prev => ({
      ...prev,
      location: searchData.location || '',
      guests: searchData.guests || '',
    }));
  };

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'cabin', label: 'Mountain Cabin' },
    { value: 'cottage', label: 'Beach Cottage' },
    { value: 'camp', label: 'Desert Camp' },
    { value: 'lodge', label: 'Eco Lodge' },
    { value: 'houseboat', label: 'Houseboat' },
    { value: 'bungalow', label: 'Heritage Bungalow' },
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'newest', label: 'Newest' },
  ];

  const amenityOptions = [
    { value: 'wifi', label: 'WiFi' },
    { value: 'parking', label: 'Parking' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'petFriendly', label: 'Pet Friendly' },
  ];

  return (
    <>
      <Head>
        <title>VillageStay | Listings</title>
        <meta name="description" content="Browse authentic rural accommodations across India. Mountain cabins, beach cottages, desert camps, and more." />
      </Head>

      <Navbar className="navbar-fixed" />
      
      <main className="page-content bg-gray-50 min-h-screen">
        {/* Search Section */}
        <section className="bg-gray-50 py-8">
          <div className="container-custom">
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>

        {/* Results Section */}
        <section className="section-padding">
          <div className="container-custom">
            {/* Real-time Connection Status */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Live updates enabled' : 'Loading...'}
                </span>
                {isConnected && <Signal className="w-4 h-4 text-green-500" />}
              </div>
              {error && (
                <div className="text-sm text-red-500">
                  Error: {error.message}
                </div>
              )}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-primary-500 hover:text-primary-600 text-sm"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Location Filter */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        placeholder="Search locations..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range (per night)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                        placeholder="Min"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                      <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                        placeholder="Max"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      {propertyTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guests */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <select
                      value={filters.guests}
                      onChange={(e) => handleFilterChange('guests', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5, 3.0].map(rating => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={filters.rating === rating.toString()}
                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                            className="mr-2"
                          />
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{rating}+</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities
                    </label>
                    <div className="space-y-2">
                      {amenityOptions.map(amenity => (
                        <label key={amenity.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity.value)}
                            onChange={() => handleAmenityToggle(amenity.value)}
                            className="mr-2"
                          />
                          <span className="text-sm">{amenity.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Instant Book */}
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.instantBook}
                        onChange={(e) => handleFilterChange('instantBook', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Instant Book Only</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {filteredListings.length} properties found
                    </h2>
                    {filters.location && (
                      <p className="text-gray-600 mt-1">
                        in {filters.location}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Mobile Filter Toggle */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Filters</span>
                    </button>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* View Mode */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg ${
                          viewMode === 'grid' 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg ${
                          viewMode === 'list' 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {(filters.location || filters.type || filters.priceMin || filters.priceMax || filters.guests || filters.amenities.length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filters.location && (
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                        Location: {filters.location}
                        <button
                          onClick={() => handleFilterChange('location', '')}
                          className="ml-2 hover:text-primary-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.type && (
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                        Type: {propertyTypes.find(t => t.value === filters.type)?.label}
                        <button
                          onClick={() => handleFilterChange('type', '')}
                          className="ml-2 hover:text-primary-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {(filters.priceMin || filters.priceMax) && (
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                        Price: {filters.priceMin || '0'} - {filters.priceMax || '∞'}
                        <button
                          onClick={() => {
                            handleFilterChange('priceMin', '');
                            handleFilterChange('priceMax', '');
                          }}
                          className="ml-2 hover:text-primary-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.guests && (
                      <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                        Guests: {filters.guests}
                        <button
                          onClick={() => handleFilterChange('guests', '')}
                          className="ml-2 hover:text-primary-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filters.amenities.map(amenity => (
                      <span key={amenity} className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
                        {amenityOptions.find(a => a.value === amenity)?.label}
                        <button
                          onClick={() => handleAmenityToggle(amenity)}
                          className="ml-2 hover:text-primary-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Results Grid/List */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="loading-skeleton h-96 rounded-2xl" />
                    ))}
                  </div>
                ) : filteredListings.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No properties found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <button
                      onClick={clearFilters}
                      className="btn-primary"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredListings.map((listing, index) => (
                      <motion.div
                        key={listing.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <ListingCard 
                          listing={listing} 
                          className={viewMode === 'list' ? 'flex-row' : ''}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Load More */}
                {filteredListings.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12"
                  >
                    <button className="btn-primary">
                      Load More Properties
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatWidget />
    </>
  );
};

export default Listings;
