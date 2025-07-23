import React, { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchCabs } from "../src/utils/api";

export default function Cabs() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Load initial data when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const cabData = await fetchCabs();
        setResults(cabData);
      } catch (err) {
        console.error('Error loading initial cab data:', err);
        setError('Failed to load cab data.');
      }
    };
    
    loadInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearching(true);
    setError(null);
    
    try {
      const formattedDate = date ? date.toISOString().split('T')[0] : '';
      const filters = {
        from: from,
        to: to,
        date: formattedDate,
        time: time
      };
      
      const cabData = await fetchCabs(filters);
      setResults(cabData);
    } catch (err) {
      console.error('Error fetching cabs:', err);
      setError('Failed to fetch cabs. Please try again.');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
      <Head>
        <title>VillageStay | Cabs</title>
      </Head>
      <Navbar className="navbar-fixed" />
      <main className="page-content bg-gray-50 min-h-screen">
        <section className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">Book Outstation Cabs</h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <input
              type="text"
              className="border rounded-lg px-4 py-2"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From"
              required
            />
            <input
              type="text"
              className="border rounded-lg px-4 py-2"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To"
              required
            />
            <input
              type="time"
              className="border rounded-lg px-4 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <div className="relative">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="w-full border rounded-lg px-4 py-2"
                placeholderText="Select Date"
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-primary col-span-1 md:col-span-4"
            >
              SEARCH
            </button>
          </form>
          
          {error && (
            <div className="text-center py-8 text-lg text-red-600 font-semibold">
              {error}
            </div>
          )}
          
          {searching && (
            <div className="text-center py-8 text-lg text-green-600 font-semibold">
              Searching cabs...
            </div>
          )}
          
          {!searching && !error && results.length > 0 && (
            <div className="space-y-6">
              {results.map((cab, idx) => (
                <div
                  key={cab.id || idx}
                  className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={cab.image || '/cab-default.png'}
                      alt={cab.model || cab.name}
                      className="w-16 h-12 object-contain"
                    />
                    <div>
                      <div className="font-bold text-base flex items-center gap-2">
                        {cab.name || cab.model}
                        {cab.rating && (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center">
                            ★ {cab.rating}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {cab.fuel && `${cab.fuel} • `}{cab.seats && `${cab.seats} Seats`}{cab.ac && " • AC"}
                      </div>
                      {cab.note && (
                        <div className="text-yellow-700 text-xs mt-1">
                          {cab.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end mt-3 md:mt-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-blue-700">
                        ₹{cab.price || cab.fare}
                      </span>
                      {cab.oldPrice && (
                        <span className="line-through text-gray-400 text-xs">
                          ₹{cab.oldPrice}
                        </span>
                      )}
                    </div>
                    {cab.taxes && (
                      <div className="text-xs text-gray-500">
                        + ₹{cab.taxes} Taxes
                      </div>
                    )}
                    <button className="btn-primary mt-2">SELECT CAB</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!searching && !error && results.length === 0 && (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600 mb-2">
                {from && to ? 
                  `No cabs available from ${from} to ${to} on ${date ? date.toISOString().split('T')[0] : 'selected date'}` : 
                  'No cabs available at the moment.'
                }
              </div>
              <div className="text-sm text-gray-500">
                Try different dates or routes to find available cabs.
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

