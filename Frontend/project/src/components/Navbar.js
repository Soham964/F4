import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Menu, X, User, Heart, Search, Home, MapPin, Calendar, Phone, Train, Bus, Car } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../utils/api';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Listings', href: '/listings', icon: MapPin },
    { name: 'Packages', href: '/packages', icon: Calendar },
    { name: 'Trains', href: '/trains', icon: Train },
    { name: 'Buses', href: '/buses', icon: Bus },
    { name: 'Cabs', href: '/cabs', icon: Car },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Village<span className="text-primary-500">Stay</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    router.pathname === item.href
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/listings">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300"
            >
              <Heart className="w-5 h-5" />
            </motion.button>

            {user ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Link href="/profile">
                    <div className="px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      Profile
                    </div>
                  </Link>
                  <Link href="/bookings">
                    <div className="px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      My Bookings
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-gray-700 hover:text-primary-500 font-medium transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 border border-gray-200"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 mx-2 rounded-lg transition-all duration-300 ${
                    router.pathname === item.href
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-4 mt-4">
              {user ? (
                <div className="px-4 space-y-2">
                  <div className="flex items-center space-x-3 py-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">{user.name}</span>
                  </div>
                  <Link href="/profile">
                    <div className="px-8 py-2 text-gray-600 hover:text-primary-500 transition-colors">
                      Profile
                    </div>
                  </Link>
                  <Link href="/bookings">
                    <div className="px-8 py-2 text-gray-600 hover:text-primary-500 transition-colors">
                      My Bookings
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-8 py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-4 space-y-2">
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:text-primary-500 font-medium transition-colors"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full btn-primary"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;