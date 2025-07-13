import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Home, Smartphone, Key } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { loginUser } from '../src/utils/auth';
import OAuthButtons from '../src/components/OAuthButtons';

const Login = () => {
  const router = useRouter();
  // Add loginType state
  const [loginType, setLoginType] = useState('user'); // 'user' or 'provider'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Phone login state
  const [showPhone, setShowPhone] = useState(false);
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await loginUser(formData);
      const redirectTo = router.query.redirect || '/';
      router.push(redirectTo);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Phone login handlers
  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setPhoneError('');
    if (!phone.match(/^[0-9]{10}$/)) {
      setPhoneError('Enter a valid 10-digit phone number');
      return;
    }
    setPhoneLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setOtpSent(true);
      setPhoneLoading(false);
    }, 800);
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setPhoneError('');
    if (!otp || otp.length < 4) {
      setPhoneError('Enter the OTP sent to your phone');
      return;
    }
    setPhoneLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      // On success, redirect
      router.push('/');
    }, 1000);
  };

  // For service provider OTP login, redirect to provider dashboard after OTP
  const handleProviderOtpVerify = async (e) => {
    e.preventDefault();
    setPhoneError('');
    if (!otp || otp.length < 4) {
      setPhoneError('Enter the OTP sent to your phone');
      return;
    }
    setPhoneLoading(true);
    setTimeout(() => {
      router.push('/provider/dashboard');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Login - VillageStay</title>
        <meta name="description" content="Login to your VillageStay account to book authentic rural experiences." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-500 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent-500 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-24 h-24 bg-primary-300 rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                Village<span className="text-primary-500">Stay</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your rural adventure
            </p>
          </div>

          {/* Toggle for User/Service Provider */}
          <div className="flex justify-center mb-8 space-x-2">
            <button
              className={`px-4 py-2 rounded-l-lg font-medium border ${loginType === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setLoginType('user')}
              type="button"
            >
              User
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg font-medium border ${loginType === 'provider' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setLoginType('provider')}
              type="button"
            >
              Service Provider
            </button>
          </div>

          {/* Error Message */}
          {error && loginType === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* USER LOGIN FORM */}
          {loginType === 'user' && (
            <>
              {/* Login Form */}
              {!showPhone && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link href="/forgot-password">
                      <span className="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                        Forgot password?
                      </span>
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}

              {/* Phone Login Option */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {!showPhone ? (
                <button
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                  onClick={() => setShowPhone(true)}
                  type="button"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Login with Phone Number (Optional)</span>
                </button>
              ) : (
                <form onSubmit={otpSent ? handleOtpVerify : handlePhoneLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  {otpSent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter OTP
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={otp}
                          onChange={e => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
                          required
                          maxLength={6}
                        />
                      </div>
                    </div>
                  )}
                  {phoneError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                    >
                      {phoneError}
                    </motion.div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={phoneLoading}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {phoneLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>{otpSent ? 'Verify OTP' : 'Send OTP'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                  <button
                    type="button"
                    className="w-full mt-2 text-sm text-gray-500 hover:text-primary-500 underline"
                    onClick={() => {
                      setShowPhone(false);
                      setOtpSent(false);
                      setPhone('');
                      setOtp('');
                      setPhoneError('');
                    }}
                  >
                    Back to Email Login
                  </button>
                </form>
              )}

              {/* OAuth Login - Only show for user login */}
              {loginType === 'user' && (
                <OAuthButtons 
                  onSuccess={(user) => {
                    const redirectTo = router.query.redirect || '/';
                    router.push(redirectTo);
                  }}
                  onError={(error) => {
                    setError(error);
                  }}
                />
              )}

              {/* Sign Up Link and Demo Credentials - Only for user */}
              {loginType === 'user' && (
                <>
                  <div className="text-center mt-8">
                    <p className="text-gray-600">
                      Don't have an account?{' '}
                      <Link href="/signup">
                        <span className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                          Sign up here
                        </span>
                      </Link>
                    </p>
                  </div>
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Email: demo@villagestay.com</p>
                      <p>Password: demo123</p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* SERVICE PROVIDER LOGIN FORM */}
          {loginType === 'provider' && (
            <form onSubmit={otpSent ? handleProviderOtpVerify : handlePhoneLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>
              </div>
              {otpSent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300"
                      required
                      maxLength={6}
                    />
                  </div>
                </div>
              )}
              {phoneError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                >
                  {phoneError}
                </motion.div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={phoneLoading}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {phoneLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{otpSent ? 'Verify OTP' : 'Send OTP'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Login;