import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Mountain Retreats', href: '/listings?type=cabin' },
      { name: 'Beach Cottages', href: '/listings?type=beach' },
      { name: 'Desert Camps', href: '/listings?type=desert' },
      { name: 'Eco Lodges', href: '/listings?type=eco' },
      { name: 'Heritage Stays', href: '/listings?type=heritage' },
    ],
    packages: [
      { name: 'Adventure Tours', href: '/packages?category=adventure' },
      { name: 'Cultural Experiences', href: '/packages?category=cultural' },
      { name: 'Wellness Retreats', href: '/packages?category=wellness' },
      { name: 'Family Holidays', href: '/packages?category=family' },
      { name: 'Romantic Getaways', href: '/packages?category=romantic' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Booking Support', href: '/support' },
      { name: 'Cancellation Policy', href: '/cancellation' },
      { name: 'Travel Insurance', href: '/insurance' },
    ],
    company: [
      { name: 'About VillageStay', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partnerships', href: '/partnerships' },
      { name: 'Sustainability', href: '/sustainability' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-earth-900 text-white mt-16">
      {/* Newsletter Section */}
      <div className="bg-primary-500 py-12">
        <div className="container-custom">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with Rural Adventures
              </h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for exclusive deals, hidden gems, and authentic rural experiences.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-primary-500 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">
                    Village<span className="text-primary-400">Stay</span>
                  </span>
                </Link>
                <p className="text-gray-300 mb-6 max-w-md">
                  Discover authentic rural experiences across India. From mountain retreats to desert camps, 
                  we connect you with the heart of rural tourism.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-300">Mumbai, Maharashtra, India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-300">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-300">hello@villagestay.com</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">Explore</h4>
                <ul className="space-y-2">
                  {footerLinks.explore.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">Packages</h4>
                <ul className="space-y-2">
                  {footerLinks.packages.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href}>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-300 hover:text-primary-400 transition-colors"
                        >
                          {link.name}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-earth-800 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-4 md:mb-0"
            >
              <p className="flex items-center">
                © {currentYear} VillageStay. Made with{' '}
                <Heart className="w-4 h-4 text-red-500 mx-1" /> for rural tourism.
              </p>
            </motion.div>

            <div className="flex items-center space-x-6">
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-4 text-sm">
                <Link href="/privacy">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    Privacy Policy
                  </motion.span>
                </Link>
                <Link href="/terms">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    Terms of Service
                  </motion.span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;