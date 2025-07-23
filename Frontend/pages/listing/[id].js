import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Bed, Bath, Wifi, Car, Twitch as Kitchen, Heart, Share2, ChevronLeft, ChevronRight, Calendar, Clock, Shield, Award, MessageCircle, Phone, Mail, CheckCircle, X, Camera, Expand } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import BookingForm from '../../src/components/BookingForm';
import AIChatWidget from '../../src/components/AIChatWidget';
import { 
  fetchListingById, 
  fetchReviews, 
  fetchReviewStats,
  createBooking,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from '../../src/utils/api';
import { formatPrice, formatDate, generateStars } from '../../src/utils/helpers';

const ListingDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      loadListingData();
      checkWishlistStatus();
    }
  }, [id]);

  const loadListingData = async () => {
    try {
      setLoading(true);
      const [listingData, reviewsData, statsData] = await Promise.all([
        fetchListingById(id),
        fetchReviews(id),
        fetchReviewStats(id),
      ]);
      
      setListing(listingData);
      setReviews(reviewsData);
      setReviewStats(statsData);
    } catch (error) {
      console.error('Error loading listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = () => {
    const wishlist = getWishlist();
    setIsLiked(wishlist.includes(parseInt(id)));
  };

  const handleWishlistToggle = async () => {
    try {
      if (isLiked) {
        await removeFromWishlist(parseInt(id));
      } else {
        await addToWishlist(parseInt(id));
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      const booking = await createBooking({
        listingId: listing.id,
        ...bookingData,
      });
      
      // Redirect to booking confirmation
      router.push(`/booking-confirmation/${booking.id}`);
    } catch (error) {
      console.error('Booking error:', error);
      throw error;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const openImageGallery = () => {
    setShowImageGallery(true);
  };

  const closeImageGallery = () => {
    setShowImageGallery(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="loading-skeleton w-16 h-16 rounded-full mx-auto mb-4" />
            <div className="loading-text w-32 h-4 mx-auto" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Property Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/listings">
              <button className="btn-primary">
                Browse All Properties
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
    { id: 'policies', label: 'Policies' },
  ];

  return (
    <>
      <Head>
        <title>{listing.title} - VillageStay</title>
        <meta name="description" content={listing.description} />
        <meta property="og:title" content={listing.title} />
        <meta property="og:description" content={listing.description} />
        <meta property="og:image" content={listing.images[0]} />
      </Head>

      <Navbar />
      
      <main className="pt-20">
        {/* Image Gallery */}
        <section className="relative">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              {/* Main Image */}
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onClick={openImageGallery}
                />
                
                {/* Navigation Arrows */}
                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Expand Button */}
                <button
                  onClick={openImageGallery}
                  className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <Expand className="w-5 h-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {listing.images.length}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 gap-4">
                {listing.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-44 lg:h-60 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setCurrentImageIndex(index + 1)}
                  >
                    <img
                      src={image}
                      alt={`${listing.title} ${index + 2}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
                
                {listing.images.length > 5 && (
                  <div
                    className="relative h-44 lg:h-60 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={openImageGallery}
                  >
                    <img
                      src={listing.images[5]}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Camera className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-lg font-semibold">
                          +{listing.images.length - 5} more
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div className="flex-1 mb-4 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {listing.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{listing.rating}</span>
                    <span>({listing.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleWishlistToggle}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    isLiked
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? 'Saved' : 'Save'}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Tabs */}
                <div className="flex space-x-6 border-b border-gray-200 mb-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 px-1 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-primary-500 border-b-2 border-primary-500'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-8">
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      {/* Property Details */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Property Details
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{listing.maxGuests} guests</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Bed className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{listing.bedrooms} bedrooms</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Bath className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{listing.bathrooms} bathrooms</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{listing.type}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          About This Place
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {listing.description}
                        </p>
                      </div>

                      {/* Host Information */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          Meet Your Host
                        </h3>
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={listing.host.avatar}
                            alt={listing.host.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="text-lg font-medium text-gray-800">
                              {listing.host.name}
                            </h4>
                            {listing.host.verified && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm">Verified Host</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Languages</h5>
                            <p className="text-sm text-gray-600">
                              {listing.languages.join(', ')}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Response Time</h5>
                            <p className="text-sm text-gray-600">Within an hour</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>Message Host</span>
                          </button>
                          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>Call Host</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'amenities' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-800">
                        What This Place Offers
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {listing.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">
                          Activities & Experiences
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {listing.activities.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-gray-700">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Reviews ({reviewStats?.totalReviews || 0})
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-lg font-medium">
                            {reviewStats?.averageRating || 0}
                          </span>
                        </div>
                      </div>

                      {reviewStats && (
                        <div className="bg-gray-50 rounded-2xl p-6">
                          <h4 className="font-semibold text-gray-800 mb-4">
                            Rating Breakdown
                          </h4>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600 w-8">
                                  {rating}★
                                </span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-yellow-400 h-2 rounded-full"
                                    style={{
                                      width: `${
                                        reviewStats.totalReviews > 0
                                          ? (reviewStats.ratingDistribution[rating] / reviewStats.totalReviews) * 100
                                          : 0
                                      }%`,
                                    }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600 w-8">
                                  {reviewStats.ratingDistribution[rating] || 0}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-200 pb-6">
                            <div className="flex items-center space-x-4 mb-3">
                              <img
                                src={review.userAvatar}
                                alt={review.userName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <h5 className="font-medium text-gray-800">
                                  {review.userName}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {formatDate(review.date)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 mb-2">
                              {generateStars(review.rating).map((star, index) => (
                                <Star
                                  key={index}
                                  className={`w-4 h-4 ${
                                    star === 'full'
                                      ? 'text-yellow-400 fill-current'
                                      : star === 'half'
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <h6 className="font-medium text-gray-800 mb-2">
                              {review.title}
                            </h6>
                            <p className="text-gray-600 leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'location' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Location & Nearby Attractions
                      </h3>
                      
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">
                          Nearby Attractions
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {listing.nearbyAttractions.map((attraction, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <MapPin className="w-4 h-4 text-primary-500" />
                              <span className="text-gray-700">{attraction}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-2xl p-6 text-center">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Interactive map will be available soon
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'policies' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-800">
                        House Rules & Policies
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Check-in & Check-out
                          </h4>
                          <div className="space-y-2 text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>Check-in: {listing.checkIn}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>Check-out: {listing.checkOut}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">
                            Cancellation Policy
                          </h4>
                          <p className="text-gray-600">
                            {listing.cancellation === 'flexible' && 'Flexible cancellation policy'}
                            {listing.cancellation === 'moderate' && 'Moderate cancellation policy'}
                            {listing.cancellation === 'strict' && 'Strict cancellation policy'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">
                          Property Rules
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            {listing.policies.smoking ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                            <span className="text-gray-700">Smoking allowed</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {listing.policies.pets ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                            <span className="text-gray-700">Pets allowed</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {listing.policies.parties ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                            <span className="text-gray-700">Parties allowed</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            {listing.policies.children ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                            <span className="text-gray-700">Children welcome</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">
                          Safety Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {listing.safety.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Shield className="w-4 h-4 text-blue-500" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold text-gray-800">
                          {formatPrice(listing.price)}
                        </span>
                        <span className="text-gray-600 ml-1">/{listing.priceUnit}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{listing.rating}</span>
                        <span className="text-gray-600">({listing.reviewCount})</span>
                      </div>
                    </div>

                    {listing.instantBook && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-green-800 font-medium">Instant Book</span>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                          Book instantly without waiting for host approval
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full btn-primary mb-4"
                    >
                      Reserve Now
                    </button>

                    <p className="text-center text-gray-600 text-sm mb-6">
                      You won't be charged yet
                    </p>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4" />
                        <span>Verified property</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Secure booking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>24/7 support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery Modal */}
        {showImageGallery && (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <button
              onClick={closeImageGallery}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={listing.images[currentImageIndex]}
                alt={listing.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
                {currentImageIndex + 1} / {listing.images.length}
              </div>
            </div>
          </div>
        )}

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Book {listing.title}
                </h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <BookingForm 
                  listing={listing} 
                  onBookingSubmit={handleBookingSubmit}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <AIChatWidget />
    </>
  );
};

export default ListingDetail;