import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  Star, 
  Users, 
  TrendingUp,
  Heart,
  Compass,
  Award,
  Shield,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import HeroSection from '../src/components/HeroSection';
import SearchBar from '../src/components/SearchBar';
import ListingCard from '../src/components/ListingCard';
import PackageCard from '../src/components/PackageCard';
import AIChatWidget from '../src/components/AIChatWidget';
import { 
  fetchFeaturedListings, 
  fetchFeaturedPackages, 
  fetchTrendingDestinations 
} from '../src/utils/api';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [listings, packages, destinations] = await Promise.all([
        fetchFeaturedListings(),
        fetchFeaturedPackages(),
        fetchTrendingDestinations(),
      ]);
      
      setFeaturedListings(listings);
      setFeaturedPackages(packages);
      setTrendingDestinations(destinations);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Verified Hosts',
      description: 'All our hosts are verified and background checked for your safety.',
    },
    {
      icon: Award,
      title: 'Authentic Experiences',
      description: 'Genuine rural experiences with local families and communities.',
    },
    {
      icon: Heart,
      title: 'Local Support',
      description: '24/7 support from our local team in your preferred language.',
    },
    {
      icon: Clock,
      title: 'Flexible Booking',
      description: 'Easy cancellation and flexible date changes for your convenience.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Mumbai',
      rating: 5,
      comment: 'The mountain retreat was absolutely perfect! The host was incredibly welcoming and the views were breathtaking. This is authentic rural tourism at its best.',
      image: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Amit Patel',
      location: 'Delhi',
      rating: 5,
      comment: 'Our family loved the Kerala houseboat experience. The kids had so much fun, and we learned so much about local culture. Highly recommended!',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      name: 'Emma Wilson',
      location: 'Bangalore',
      rating: 5,
      comment: 'The desert camp was a once-in-a-lifetime experience. The folk performances, camel rides, and stargazing were magical. VillageStay made it all seamless.',
      image: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <>
      <Head>
        <title>VillageStay - Authentic Rural Tourism Experiences in India</title>
        <meta name="description" content="Discover authentic rural experiences across India. From mountain retreats to desert camps, stay with local families and immerse yourself in genuine rural culture." />
        <meta name="keywords" content="rural tourism, village stays, authentic experiences, India travel, mountain retreats, desert camps, eco lodges" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="page-content bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Trending Destinations */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Trending Destinations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the most popular rural destinations loved by travelers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingDestinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-hover"
                >
                  <Link href={`/listings?location=${encodeURIComponent(destination.location)}`}>
                    <div className="relative h-64 rounded-2xl overflow-hidden group">
                      <img
                        src={destination.image}
                        alt={destination.location}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{destination.location}</h3>
                        <p className="text-sm text-gray-200">{destination.count} properties</p>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        Trending
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Featured Accommodations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked stays that offer the best rural experiences
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="loading-skeleton h-96 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredListings.map((listing, index) => (
                  <ListingCard 
                    key={listing.id} 
                    listing={listing}
                    className={`opacity-0 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/listings">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>View All Properties</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Featured Packages */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Adventure Packages
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Curated multi-day experiences combining accommodation, activities, and local culture
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="loading-skeleton h-96 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPackages.map((packageData, index) => (
                  <PackageCard 
                    key={packageData.id} 
                    packageData={packageData}
                    className={`opacity-0 animate-fade-in`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/packages">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Explore All Packages</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Why Choose VillageStay */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose VillageStay?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing authentic, safe, and memorable rural experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-primary-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                What Our Travelers Say
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real stories from real travelers who discovered authentic rural India
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">"{testimonial.comment}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding hero-gradient">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready for Your Rural Adventure?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who have discovered the authentic beauty of rural India
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/listings">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary inline-flex items-center space-x-2"
                  >
                    <Compass className="w-5 h-5" />
                    <span>Explore Properties</span>
                  </motion.button>
                </Link>
                <Link href="/packages">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>View Packages</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Provider CTA */}
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">
                Be a Service Provider
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                List your property or offer local services like food and cabs to travelers. Join our network and grow your business!
              </p>
              <Link href="/provider/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatWidget />
    </>
  );
};

export default Home;
