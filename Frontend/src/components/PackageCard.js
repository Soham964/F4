import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  Camera,
  TrendingUp
} from 'lucide-react';
import { formatPrice } from '../utils/helpers';

const PackageCard = ({ packageData, className = '' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === packageData.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === 0 ? packageData.gallery.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-md overflow-hidden card-hover ${className}`}
    >
      <Link href={`/package/${packageData.id}`}>
        <div className="relative h-64 overflow-hidden">
          {/* Image Gallery */}
          <div className="relative w-full h-full">
            <img
              src={packageData.gallery[currentImageIndex]}
              alt={packageData.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            
            {/* Image Navigation */}
            {packageData.gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Image Count */}
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Camera className="w-3 h-3" />
                  <span>{packageData.gallery.length}</span>
                </div>
              </>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          {/* Popular Badge */}
          {packageData.reviewCount > 150 && (
            <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Popular</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {packageData.category}
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{packageData.duration}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Location and Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{packageData.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{packageData.rating}</span>
              <span className="text-sm text-gray-500">({packageData.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
            {packageData.title}
          </h3>

          {/* Package Details */}
          <div className="flex items-center space-x-4 mb-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{packageData.minGroupSize}-{packageData.maxGroupSize} people</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{packageData.difficulty}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {packageData.highlights.slice(0, 3).map((highlight, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {highlight}
                </span>
              ))}
              {packageData.highlights.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{packageData.highlights.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Best Time to Visit */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <strong>Best Time:</strong> {packageData.bestTime}
            </p>
          </div>

          {/* Price and Availability */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(packageData.price)}
              </span>
              <span className="text-gray-500 ml-1">/{packageData.priceUnit}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
            >
              View Package
            </motion.button>
          </div>

          {/* Guide Info */}
          <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
            <img
              src={packageData.guide.avatar}
              alt={packageData.guide.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{packageData.guide.name}</p>
              <p className="text-xs text-gray-500">{packageData.guide.experience} experience</p>
            </div>
          </div>

          {/* Available Dates */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Next available dates:</p>
            <div className="flex flex-wrap gap-2">
              {packageData.availableDates.slice(0, 3).map((date, index) => (
                <span 
                  key={index} 
                  className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs"
                >
                  {new Date(date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              ))}
              {packageData.availableDates.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{packageData.availableDates.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PackageCard;