import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Head from 'next/head';
import { handleOAuthCallback } from '../../src/utils/auth';

const OAuthCallback = () => {
  const router = useRouter();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      const { code, state, error } = router.query;

      if (error) {
        setStatus('error');
        setMessage('Authentication was cancelled or failed');
        return;
      }

      if (!code || !state) {
        setStatus('error');
        setMessage('Invalid callback parameters');
        return;
      }

      try {
        const user = await handleOAuthCallback(code, state);
        setStatus('success');
        setMessage('Authentication successful! Redirecting...');
        
        // Redirect after a short delay
        setTimeout(() => {
          const redirectTo = router.query.redirect || '/';
          router.push(redirectTo);
        }, 2000);
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage(error.message || 'Authentication failed');
      }
    };

    if (router.isReady) {
      processCallback();
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Authentication - VillageStay</title>
        <meta name="description" content="Processing your authentication..." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
        >
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6">
                <Loader2 className="w-full h-full text-primary-500 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Processing Authentication
              </h2>
              <p className="text-gray-600">
                Please wait while we complete your sign-in...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6">
                <CheckCircle className="w-full h-full text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome to VillageStay!
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <div className="w-8 h-8 mx-auto">
                <Loader2 className="w-full h-full text-primary-500 animate-spin" />
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6">
                <XCircle className="w-full h-full text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Authentication Failed
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              <button
                onClick={() => router.push('/login')}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Try Again
              </button>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default OAuthCallback; 
