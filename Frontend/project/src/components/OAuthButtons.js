import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Chrome, 
  Facebook, 
  Github, 
  Mail, 
  Loader2 
} from 'lucide-react';
import { 
  loginWithGoogle, 
  loginWithFacebook, 
  loginWithGitHub,
  initializeOAuth 
} from '../utils/auth';

const OAuthButtons = ({ onSuccess, onError, className = '' }) => {
  const [loading, setLoading] = useState({
    google: false,
    facebook: false,
    github: false,
  });

  useEffect(() => {
    initializeOAuth();
  }, []);

  const handleOAuthLogin = async (provider, loginFunction) => {
    setLoading(prev => ({ ...prev, [provider]: true }));
    
    try {
      const user = await loginFunction();
      onSuccess?.(user);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      onError?.(error.message || `${provider} login failed`);
    } finally {
      setLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Google OAuth Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => handleOAuthLogin('google', loginWithGoogle)}
        disabled={loading.google}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading.google ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Chrome className="w-5 h-5 mr-2 text-red-500" />
        )}
        {loading.google ? 'Signing in...' : 'Continue with Google'}
      </motion.button>

      {/* Facebook OAuth Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => handleOAuthLogin('facebook', loginWithFacebook)}
        disabled={loading.facebook}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading.facebook ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Facebook className="w-5 h-5 mr-2 text-blue-600" />
        )}
        {loading.facebook ? 'Signing in...' : 'Continue with Facebook'}
      </motion.button>

      {/* GitHub OAuth Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => handleOAuthLogin('github', loginWithGitHub)}
        disabled={loading.github}
        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {loading.github ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Github className="w-5 h-5 mr-2 text-gray-900" />
        )}
        {loading.github ? 'Signing in...' : 'Continue with GitHub'}
      </motion.button>
    </div>
  );
};

// Individual OAuth Button Components
export const GoogleOAuthButton = ({ onSuccess, onError, className = '' }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      onSuccess?.(user);
    } catch (error) {
      onError?.(error.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Chrome className="w-5 h-5 mr-2 text-red-500" />
      )}
      {loading ? 'Signing in...' : 'Continue with Google'}
    </motion.button>
  );
};

export const FacebookOAuthButton = ({ onSuccess, onError, className = '' }) => {
  const [loading, setLoading] = useState(false);

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const user = await loginWithFacebook();
      onSuccess?.(user);
    } catch (error) {
      onError?.(error.message || 'Facebook login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleFacebookLogin}
      disabled={loading}
      className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Facebook className="w-5 h-5 mr-2 text-blue-600" />
      )}
      {loading ? 'Signing in...' : 'Continue with Facebook'}
    </motion.button>
  );
};

export const GitHubOAuthButton = ({ onSuccess, onError, className = '' }) => {
  const [loading, setLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setLoading(true);
    try {
      await loginWithGitHub();
      // GitHub uses redirect flow, so we don't get user data immediately
      onSuccess?.();
    } catch (error) {
      onError?.(error.message || 'GitHub login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGitHubLogin}
      disabled={loading}
      className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Github className="w-5 h-5 mr-2 text-gray-900" />
      )}
      {loading ? 'Redirecting...' : 'Continue with GitHub'}
    </motion.button>
  );
};

export default OAuthButtons; 