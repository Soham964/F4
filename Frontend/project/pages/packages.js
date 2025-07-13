import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import PackageCard from '../src/components/PackageCard';
import { fetchFeaturedPackages } from '../src/utils/api';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error loading packages:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  return (
    <>
      <Head>
        <title>VillageStay | Packages</title>
        <meta name="description" content="Explore curated adventure and rural experience packages across India." />
      </Head>
      <Navbar className="navbar-fixed" />
      <main className="page-content bg-gray-50 min-h-screen">
        <section className="max-w-5xl mx-auto py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold mb-6">
              Holiday Packages
            </h1>
            <p className="mb-8 text-gray-700">
              Choose from our curated rural holiday packages.
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
              {packages.map((packageData, index) => (
                <PackageCard
                  key={packageData.id}
                  packageData={packageData}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Link href={`/packages/${packageData.id}`}>
                    <button className="btn-primary w-full mt-4">View Package</button>
                  </Link>
                </PackageCard>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Packages;
