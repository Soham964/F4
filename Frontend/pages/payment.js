import React, { useState } from 'react';
import { CreditCard, Banknote, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Payment = () => {
  const [method, setMethod] = useState('card');
  const [details, setDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upi: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = 50000; // in paise (₹500)

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
      amount: amount,
      currency: 'INR',
      name: 'VillageStay',
      description: 'Booking Payment',
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: details.cardName,
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#22c55e',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <div className="relative min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-accent-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-primary-100 rounded-full opacity-20"></div>
        </div>
        <div className="relative max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 z-10">
          <div className="flex items-center mb-8 space-x-3">
            <Home className="w-8 h-8 text-primary-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Payment</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${method === 'card' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setMethod('card')}
                >
                  <CreditCard className="w-5 h-5 mr-2" /> Card
                </button>
                <button
                  type="button"
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${method === 'upi' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setMethod('upi')}
                >
                  <Banknote className="w-5 h-5 mr-2" /> UPI
                </button>
              </div>
            </div>
            {method === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={details.cardNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={details.cardName}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      value={details.expiry}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="MM/YY"
                      required
                      maxLength={5}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={details.cvv}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="123"
                      required
                      maxLength={4}
                    />
                  </div>
                </div>
              </>
            )}
            {method === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                <input
                  type="text"
                  name="upi"
                  value={details.upi}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="yourname@bank"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Pay Now
            </button>
          </form>
          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-primary-600 rounded-lg transition-colors font-medium"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
