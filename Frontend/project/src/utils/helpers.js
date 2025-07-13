// Date formatting utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options = { month: 'short', day: 'numeric' };
  
  if (start.getFullYear() === end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${start.getFullYear()}`;
  }
  
  return `${start.toLocaleDateString('en-US', { ...options, year: 'numeric' })} - ${end.toLocaleDateString('en-US', { ...options, year: 'numeric' })}`;
};

export const getDaysDifference = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = end.getTime() - start.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const isDateInRange = (date, startDate, endDate) => {
  const checkDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return checkDate >= start && checkDate <= end;
};

// Price formatting utilities
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceShort = (price) => {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`;
  } else if (price >= 1000) {
    return `₹${(price / 1000).toFixed(1)}K`;
  }
  return `₹${price}`;
};

export const calculateTotalPrice = (basePrice, nights, guests = 1, taxes = 0.18) => {
  const subtotal = basePrice * nights * guests;
  const taxAmount = subtotal * taxes;
  const total = subtotal + taxAmount;
  
  return {
    subtotal,
    taxAmount,
    total,
    nights,
    guests,
  };
};

// String utilities
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const capitalizeWords = (text) => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// Array utilities
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

// Rating utilities
export const generateStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push('full');
  }
  
  if (hasHalfStar) {
    stars.push('half');
  }
  
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push('empty');
  }
  
  return stars;
};

export const getRatingText = (rating) => {
  if (rating >= 4.8) return 'Exceptional';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  if (rating >= 3.0) return 'Average';
  return 'Below Average';
};

// Image utilities
export const getImagePlaceholder = (width = 400, height = 300) => {
  return `https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}`;
};

export const optimizeImageUrl = (url, width = 800, height = 600) => {
  if (url.includes('pexels.com')) {
    return url.replace(/w=\d+/, `w=${width}`).replace(/h=\d+/, `h=${height}`);
  }
  return url;
};

// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[+]?[\d\s-()]{10,}$/;
  return re.test(phone);
};

export const validateDate = (date) => {
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate >= today;
};

export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return start < end;
};

// Local storage utilities
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const removeLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// URL utilities
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const query = {};
  
  for (const [key, value] of params.entries()) {
    query[key] = value;
  }
  
  return query;
};

export const updateQueryParams = (params) => {
  const url = new URL(window.location);
  
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key);
    }
  });
  
  window.history.replaceState({}, '', url);
};

// Scroll utilities
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto',
  });
};

export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.offsetTop - offset;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  }
};

// Device utilities
export const isMobile = () => {
  return window.innerWidth <= 768;
};

export const isTablet = () => {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
};

export const isDesktop = () => {
  return window.innerWidth > 1024;
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Random utilities
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomElements = (array, count) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
};

// Color utilities
export const getRandomColor = () => {
  const colors = [
    '#22c55e', '#16a34a', '#15803d',
    '#eab308', '#ca8a04', '#a16207',
    '#d4c252', '#b8a144', '#947c38',
    '#a87f5f', '#9b6f53', '#815a46',
  ];
  return getRandomElement(colors);
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

// Performance utilities
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Error handling utilities
export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  // In production, you might want to send errors to a logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service
  }
};

// Feature flag utilities
export const isFeatureEnabled = (featureName) => {
  const features = getLocalStorage('villagestay_features', {});
  return features[featureName] === true;
};

export const enableFeature = (featureName) => {
  const features = getLocalStorage('villagestay_features', {});
  features[featureName] = true;
  setLocalStorage('villagestay_features', features);
};

export const disableFeature = (featureName) => {
  const features = getLocalStorage('villagestay_features', {});
  features[featureName] = false;
  setLocalStorage('villagestay_features', features);
};