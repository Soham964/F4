import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

// OAuth Configuration
export const OAUTH_CONFIG = {
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id',
    scope: 'email profile',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '',
  },
  facebook: {
    clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || 'your-facebook-client-id',
    scope: 'email public_profile',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '',
  },
  github: {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'your-github-client-id',
    scope: 'user:email',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '',
  },
};

// OAuth URLs
const OAUTH_URLS = {
  google: 'https://accounts.google.com/o/oauth2/v2/auth',
  facebook: 'https://www.facebook.com/v12.0/dialog/oauth',
  github: 'https://github.com/login/oauth/authorize',
};

// Initialize OAuth providers
export const initializeOAuth = () => {
  // Load Google OAuth script
  if (typeof window !== 'undefined' && !window.gapi) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  // Load Facebook SDK
  if (typeof window !== 'undefined' && !window.FB) {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
};

// Traditional Email/Password Authentication
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login/`, credentials);
    const { user, token } = response.data;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Set default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register/`, userData);
    const { user, token } = response.data;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Set default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// OAuth Authentication Functions
export const initiateOAuthLogin = (provider) => {
  const config = OAUTH_CONFIG[provider];
  const url = OAUTH_URLS[provider];
  
  if (!config || !url) {
    throw new Error(`Unsupported OAuth provider: ${provider}`);
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    response_type: 'code',
    state: generateState(), // CSRF protection
  });

  // Store state for verification
  localStorage.setItem('oauthState', params.get('state'));
  localStorage.setItem('oauthProvider', provider);

  // Redirect to OAuth provider
  window.location.href = `${url}?${params.toString()}`;
};

// Handle OAuth callback
export const handleOAuthCallback = async (code, state) => {
  const storedState = localStorage.getItem('oauthState');
  const provider = localStorage.getItem('oauthProvider');

  if (state !== storedState) {
    throw new Error('Invalid OAuth state');
  }

  try {
    const response = await axios.post(`${BASE_URL}/auth/oauth/callback/`, {
      code,
      provider,
      redirect_uri: OAUTH_CONFIG[provider].redirectUri,
    });

    const { user, token } = response.data;
    
    // Store token and user data
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    // Set default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Clean up OAuth state
    localStorage.removeItem('oauthState');
    localStorage.removeItem('oauthProvider');
    
    return user;
  } catch (error) {
    console.error('OAuth callback error:', error);
    throw new Error(error.response?.data?.message || 'OAuth authentication failed');
  }
};

// Google OAuth with Google Identity Services
export const loginWithGoogle = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.google) {
      reject(new Error('Google OAuth not available'));
      return;
    }

    window.google.accounts.id.initialize({
      client_id: OAUTH_CONFIG.google.clientId,
      callback: async (response) => {
        try {
          const result = await axios.post(`${BASE_URL}/auth/google/`, {
            credential: response.credential,
          });
          
          const { user, token } = result.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          resolve(user);
        } catch (error) {
          reject(error);
        }
      },
    });

    window.google.accounts.id.prompt();
  });
};

// Facebook OAuth
export const loginWithFacebook = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.FB) {
      reject(new Error('Facebook SDK not available'));
      return;
    }

    window.FB.init({
      appId: OAUTH_CONFIG.facebook.clientId,
      cookie: true,
      xfbml: true,
      version: 'v12.0',
    });

    window.FB.login(async (response) => {
      if (response.authResponse) {
        try {
          const result = await axios.post(`${BASE_URL}/auth/facebook/`, {
            access_token: response.authResponse.accessToken,
          });
          
          const { user, token } = result.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          resolve(user);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Facebook login failed'));
      }
    }, { scope: OAUTH_CONFIG.facebook.scope });
  });
};

// GitHub OAuth
export const loginWithGitHub = () => {
  initiateOAuthLogin('github');
};

// Logout
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('oauthState');
  localStorage.removeItem('oauthProvider');
  delete axios.defaults.headers.common['Authorization'];
  
  // Redirect to home page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Set up axios interceptor for authentication
export const setupAuthInterceptor = () => {
  // Add token to requests
  axios.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle 401 responses
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

// Utility functions
const generateState = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Initialize auth on app start
if (typeof window !== 'undefined') {
  setupAuthInterceptor();
  
  // Set up token if it exists
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
} 