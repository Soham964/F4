import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ProviderLogin = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleSendOtp = (e) => {
    e.preventDefault();
    // TODO: Integrate OTP sending logic here
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // TODO: Integrate OTP verification logic here
    router.push('/provider/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-600">Service Provider Login</h2>
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <label className="block mb-2 font-medium">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Enter your phone number"
              required
            />
            <button type="submit" className="btn-primary w-full">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <label className="block mb-2 font-medium">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              placeholder="Enter OTP"
              required
            />
            <button type="submit" className="btn-primary w-full">Verify & Continue</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProviderLogin;
