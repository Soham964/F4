import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import { fetchPackageById } from '../src/utils/api';
import {
  MapPin, Clock, CheckCircle, Users, Car, Utensils, Fire, Wifi, ArrowLeft, DollarSign
} from 'lucide-react';

const PackageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadPackage = async () => {
      setLoading(true);
      const data = await fetchPackageById(id);
      setPackageData(data);
      setLoading(false);
    };
    loadPackage();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="loading-skeleton h-96 w-full max-w-2xl rounded-2xl" />
        </main>
        <Footer />
      </>
    );
  }

  if (!packageData) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
            <button onClick={() => router.back()} className="btn-secondary">Go Back</button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{packageData.title} | Package Details</title>
        <meta name="description" content={packageData.description} />
      </Head>
      <Navbar />
      <main>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="flex items-center mb-6 space-x-3">
              <Users className="w-8 h-8 text-primary-500" />
              <h1 className="text-3xl font-bold text-gray-800">{packageData.title}</h1>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg mb-8">
              <img
                src={packageData.image || '/default-package.jpg'}
                alt={packageData.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">{packageData.description}</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary-500" />
                    <span className="font-semibold text-gray-700">Duration:</span>
                    <span className="text-gray-600">{packageData.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="text-gray-600">{packageData.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary-500" />
                    <span className="font-semibold text-gray-700">Price:</span>
                    <span className="text-gray-600">₹{packageData.price}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-primary-50 rounded-xl p-6 shadow-inner">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-gray-700">Inclusions:</span>
                  </div>
                  <ul className="list-disc ml-8 space-y-1">
                    {packageData.inclusions?.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-primary-600 rounded-lg transition-colors font-medium mb-2 md:mb-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                className="btn-primary px-8 py-3 text-lg"
                type="button"
                onClick={() => router.push('/payment')}
              >
                Book Now
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PackageDetails;