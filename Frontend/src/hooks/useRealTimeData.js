import { useState, useEffect, useCallback } from 'react';
import { realTimeAPI, subscribeToProperties, subscribeToBuses, subscribeToTrains, subscribeToHomestays } from '../utils/api';

export const useRealTimeData = (dataType, filters = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDataUpdate = useCallback((newData) => {
    setData(newData);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    // Connect to WebSocket if not already connected
    if (!realTimeAPI.ws || realTimeAPI.ws.readyState !== WebSocket.OPEN) {
      realTimeAPI.connect();
    }

    let unsubscribe;
    
    // Subscribe to real-time updates based on data type
    switch (dataType) {
      case 'properties':
        unsubscribe = subscribeToProperties(handleDataUpdate, filters);
        break;
      case 'buses':
        unsubscribe = subscribeToBuses(handleDataUpdate, filters);
        break;
      case 'trains':
        unsubscribe = subscribeToTrains(handleDataUpdate, filters);
        break;
      case 'homestays':
        unsubscribe = subscribeToHomestays(handleDataUpdate, filters);
        break;
      default:
        console.warn(`Unknown data type: ${dataType}`);
        return;
    }

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dataType, filters, handleDataUpdate]);

  return { data, loading, error };
};

export const useRealTimeConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    // Connect to WebSocket
    realTimeAPI.connect();

    // Listen for connection status changes
    const originalOnOpen = realTimeAPI.ws?.onopen;
    const originalOnClose = realTimeAPI.ws?.onclose;

    if (realTimeAPI.ws) {
      realTimeAPI.ws.onopen = () => {
        handleConnect();
        if (originalOnOpen) originalOnOpen();
      };

      realTimeAPI.ws.onclose = () => {
        handleDisconnect();
        if (originalOnClose) originalOnClose();
      };
    }

    return () => {
      if (realTimeAPI.ws) {
        realTimeAPI.ws.onopen = originalOnOpen;
        realTimeAPI.ws.onclose = originalOnClose;
      }
    };
  }, []);

  return isConnected;
}; 