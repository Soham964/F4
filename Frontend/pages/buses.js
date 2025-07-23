import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import React, { useState, useEffect } from 'react';
import { fetchBuses } from '../src/utils/api';

export default function Buses() {
  const [from, setFrom] = useState('Delhi');
  const [to, setTo] = useState('Kanpur');
  const [date, setDate] = useState('2025-07-12');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearching(true);
    setError(null);
    
    try {
      const filters = {
        from_city: from,
        to_city: to,
        date: date
      };
      
      const busData = await fetchBuses(filters);
      setResults(busData);
    } catch (err) {
      console.error('Error fetching buses:', err);
      setError('Failed to fetch buses. Please try again.');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  // Load initial data when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const busData = await fetchBuses();
        setResults(busData);
      } catch (err) {
        console.error('Error loading initial bus data:', err);
        setError('Failed to load bus data.');
      }
    };
    
    loadInitialData();
  }, []);

  return (
    <>
      <Head>
        <title>VillageStay | Buses</title>
      </Head>
      <Navbar className="navbar-fixed" />
      <main className="page-content bg-gray-50 min-h-screen">
        <section className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">Book Buses</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <input
              type="text"
              className="border rounded-lg px-4 py-2"
              value={from}
              onChange={e => setFrom(e.target.value)}
              placeholder="From"
              required
            />
            <input
              type="text"
              className="border rounded-lg px-4 py-2"
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="To"
              required
            />
            <input
              type="date"
              className="border rounded-lg px-4 py-2"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary col-span-1 md:col-span-3">SEARCH</button>
          </form>
          
          {error && (
            <div className="text-center py-8 text-lg text-red-600 font-semibold">
              {error}
            </div>
          )}
          
          {searching && (
            <div className="text-center py-8 text-lg text-green-600 font-semibold">
              Searching buses...
            </div>
          )}
          
          {!searching && !error && results.length > 0 && (
            <div className="space-y-6">
              {results.map((bus, idx) => (
                <div key={bus.id || idx} className="bg-white rounded-xl shadow p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-bold">{bus.operator || bus.bus_name}</div>
                      <div className="text-sm text-gray-600">{bus.bus_type || bus.seat_type}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {bus.rating && (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center">
                            ★ {bus.rating}
                          </span>
                        )}
                        {bus.live_tracking && (
                          <span className="text-xs text-blue-600 font-semibold">Live Tracking</span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end mt-2 md:mt-0">
                      <div className="font-bold text-lg text-green-700">₹{bus.price || bus.fare}</div>
                      <button className="btn-primary mt-2">SELECT SEATS</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                    <span>
                      <span className="font-semibold">{bus.departure_time || bus.from_time}</span>
                      {" "}
                      <span className="text-gray-400">→</span>
                      {" "}
                      <span className="font-semibold">{bus.arrival_time || bus.to_time}</span>
                    </span>
                    {bus.duration && <span>Duration: {bus.duration}</span>}
                    {bus.available_seats && <span>{bus.available_seats} Seats Left</span>}
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>From: {bus.from_city}</span>
                    <span>To: {bus.to_city}</span>
                    {bus.amenities && <span>Amenities</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!searching && !error && results.length === 0 && (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600 mb-2">
                {from && to ? 
                  `No buses available from ${from} to ${to} on ${date}` : 
                  'No buses available at the moment.'
                }
              </div>
              <div className="text-sm text-gray-500">
                Try different dates or routes to find available buses.
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
