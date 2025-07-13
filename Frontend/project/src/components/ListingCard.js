import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Star, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Car,
  CheckCircle,
  Camera
} from 'lucide-react';
import { formatPrice } from '../utils/helpers';

const ListingCard = ({ listing, className = '' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-md overflow-hidden card-hover ${className}`}
    >
      <Link href={`/listing/${listing.id}`}>
        <div className="relative h-64 overflow-hidden">
          {/* Image Gallery */}
          <div className="relative w-full h-full">
            <img
              src={listing.images[currentImageIndex]}
              alt={listing.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            
            {/* Image Navigation */}
            {listing.images.length > 1 && (
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
                  <span>{listing.images.length}</span>
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

          {/* Instant Book Badge */}
          {listing.instantBook && (
            <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <CheckCircle className="w-3 h-3" />
              <span>Instant Book</span>
            </div>
          )}

          {/* Host Badge */}
          {listing.host.verified && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Verified Host</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Location and Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{listing.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{listing.rating}</span>
              <span className="text-sm text-gray-500">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
            {listing.title}
          </h3>

          {/* Property Details */}
          <div className="flex items-center space-x-4 mb-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{listing.maxGuests} guests</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{listing.bedrooms} bed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{listing.bathrooms} bath</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex items-center space-x-4 mb-4">
            {listing.features.wifi && (
              <div className="flex items-center space-x-1 text-gray-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">WiFi</span>
              </div>
            )}
            {listing.features.parking && (
              <div className="flex items-center space-x-1 text-gray-600">
                <Car className="w-4 h-4" />
                <span className="text-sm">Parking</span>
              </div>
            )}
          </div>

          {/* Price and Availability */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(listing.price)}
              </span>
              <span className="text-gray-500 ml-1">/{listing.priceUnit}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
            >
              View Details
            </motion.button>
          </div>

          {/* Host Info */}
          <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-100">
            <img
              src={listing.host.avatar}
              alt={listing.host.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{listing.host.name}</p>
              <p className="text-xs text-gray-500">Host</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;