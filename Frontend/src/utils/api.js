import axios from 'axios';
import { getLocalStorage } from './helpers';
import { getFeaturedPackages } from '../mocks/packages';

const BASE_URL = 'http://localhost:8000/api'; 
const WS_URL = 'ws://localhost:8000/ws/realtime/';

// Real-time WebSocket connection
class RealTimeAPI {
  constructor() {
    this.ws = null;
    this.subscribers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    try {
      this.ws = new WebSocket(WS_URL);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMessage(data);
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, 2000 * this.reconnectAttempts);
    }
  }

  handleMessage(data) {
    const { type, data: messageData } = data;
    if (this.subscribers.has(type)) {
      this.subscribers.get(type).forEach(callback => callback(messageData));
    }
  }

  subscribe(type, callback) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }
    this.subscribers.get(type).push(callback);
  }

  unsubscribe(type, callback) {
    if (this.subscribers.has(type)) {
      const callbacks = this.subscribers.get(type);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  sendMessage(type, data = {}) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, ...data }));
    }
  }
}

// Create singleton instance
export const realTimeAPI = new RealTimeAPI();

// Traditional REST API functions
export const fetchFeaturedListings = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/properties/`);
    return res.data;
  } catch (error) {
    console.error('Error fetching featured listings:', error);
    if (error.response) {
      throw new Error(`Failed to fetch listings: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Backend server is not available. Please try again later.');
    } else {
      throw new Error('An error occurred while fetching listings.');
    }
  }
};

export const fetchProperties = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const res = await axios.get(`${BASE_URL}/properties/?${params}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    if (error.response) {
      throw new Error(`Failed to fetch properties: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Backend server is not available. Please try again later.');
    } else {
      throw new Error('An error occurred while fetching properties.');
    }
  }
};

export const fetchBuses = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const res = await axios.get(`${BASE_URL}/buses/?${params}`);
    return res.data || [];
  } catch (error) {
    console.error('Error fetching buses:', error);
    if (error.response && error.response.status === 404) {
      // No buses found - return empty array
      return [];
    } else if (error.response) {
      // Server responded with error status
      throw new Error(`Failed to fetch buses: ${error.response.status}`);
    } else if (error.request) {
      // Network error - backend not available
      throw new Error('Backend server is not available. Please try again later.');
    } else {
      // Other error
      throw new Error('An error occurred while fetching buses.');
    }
  }
};

export const fetchTrains = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const res = await axios.get(`${BASE_URL}/trains/?${params}`);
  return res.data;
};

export const fetchHomestays = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const res = await axios.get(`${BASE_URL}/homestays/?${params}`);
  return res.data;
};

export const fetchCabs = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const res = await axios.get(`${BASE_URL}/cabs/?${params}`);
    return res.data || [];
  } catch (error) {
    console.error('Error fetching cabs:', error);
    if (error.response && error.response.status === 404) {
      // No cabs found - return empty array
      return [];
    } else if (error.response) {
      // Server responded with error status
      throw new Error(`Failed to fetch cabs: ${error.response.status}`);
    } else if (error.request) {
      // Network error - backend not available
      throw new Error('Backend server is not available. Please try again later.');
    } else {
      // Other error
      throw new Error('An error occurred while fetching cabs.');
    }
  }
};

export const fetchBusOperators = async () => {
  const res = await axios.get(`${BASE_URL}/bus-operators/`);
  return res.data;
};

// Real-time subscription functions
export const subscribeToProperties = (callback, filters = {}) => {
  realTimeAPI.subscribe('properties_update', callback);
  realTimeAPI.sendMessage('subscribe_properties', { filters });
  return () => realTimeAPI.unsubscribe('properties_update', callback);
};

export const subscribeToBuses = (callback, filters = {}) => {
  realTimeAPI.subscribe('buses_update', callback);
  realTimeAPI.sendMessage('subscribe_buses', { filters });
  return () => realTimeAPI.unsubscribe('buses_update', callback);
};

export const subscribeToTrains = (callback, filters = {}) => {
  realTimeAPI.subscribe('trains_update', callback);
  realTimeAPI.sendMessage('subscribe_trains', { filters });
  return () => realTimeAPI.unsubscribe('trains_update', callback);
};

export const subscribeToHomestays = (callback, filters = {}) => {
  realTimeAPI.subscribe('homestays_update', callback);
  realTimeAPI.sendMessage('subscribe_homestays', { filters });
  return () => realTimeAPI.unsubscribe('homestays_update', callback);
};

export const getCurrentUser = () => {
  // Assume user is stored in localStorage under 'villagestay_user'
  return getLocalStorage('villagestay_user', null);
};

export const fetchFeaturedPackages = async () => {
  // Simulate async fetch from mock data
  return Promise.resolve(getFeaturedPackages());
};


