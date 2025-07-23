import Head from 'next/head';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, CalendarDays, Train, User, Filter, CheckCircle, Clock, ArrowDownUp, Info } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const trainClasses = [
  { label: 'All Classes', value: '' },
  { label: 'Sleeper (SL)', value: 'SL' },
  { label: 'AC 3 Tier (3A)', value: '3A' },
  { label: 'AC 2 Tier (2A)', value: '2A' },
  { label: 'AC First Class (1A)', value: '1A' },
  { label: 'Chair Car (CC)', value: 'CC' },
];

const mockTrains = [
  {
    number: '12452',
    name: 'Shram Shkti Exp',
    from: 'New Delhi',
    to: 'Kanpur Central',
    departure: '23:55',
    arrival: '06:20',
    duration: '6h 25m',
    date: new Date(),
    days: 'SMTWTFS',
    classes: [
      { code: 'SL', type: 'TATKAL', price: 405, available: 10, updated: '15 mins ago' },
      { code: '3A', type: 'TATKAL', price: 1100, available: 41, updated: '30 mins ago' },
      { code: '2A', type: 'TATKAL', price: 1510, available: 26, updated: '5 hrs ago' },
      { code: '3E', type: 'TATKAL', price: 1200, available: 11, updated: '1 hr ago' },
    ],
    freeCancellation: true,
    quota: ['General', 'Tatkal'],
    ac: true,
    available: true,
  },
  // ...add more mock trains as needed
];

const quickFilters = [
  { label: 'AC', key: 'ac' },
  { label: 'Available', key: 'available' },
  { label: 'Departure after 6 PM', key: 'after6pm' },
  { label: 'Arrival before 12 PM', key: 'before12pm' },
];
const ticketTypes = [
  { label: 'Free Cancellation', key: 'freeCancellation' },
  { label: 'Trip Guarantee', key: 'tripGuarantee' },
];
const quotas = [
  { label: 'General Quota', key: 'general' },
  { label: 'Tatkal', key: 'tatkal' },
];

function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
}

const TrainsSection = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [travelDate, setTravelDate] = useState(new Date());
  const [trainClass, setTrainClass] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState({
    ac: false,
    available: false,
    after6pm: false,
    before12pm: false,
    freeCancellation: false,
    tripGuarantee: false,
    general: false,
    tatkal: false,
    class: '',
  });

  // Filter logic for sidebar
  const filterTrains = (trains) => {
    return trains.filter((t) => {
      if (filters.ac && !t.ac) return false;
      if (filters.available && !t.available) return false;
      if (filters.after6pm && parseInt(t.departure.split(':')[0]) < 18) return false;
      if (filters.before12pm && parseInt(t.arrival.split(':')[0]) >= 12) return false;
      if (filters.freeCancellation && !t.freeCancellation) return false;
      if (filters.general && !(t.quota || []).includes('General')) return false;
      if (filters.tatkal && !(t.quota || []).includes('Tatkal')) return false;
      if (filters.class && !t.classes.some(c => c.code === filters.class)) return false;
      if (from && !t.from.toLowerCase().includes(from.toLowerCase())) return false;
      if (to && !t.to.toLowerCase().includes(to.toLowerCase())) return false;
      if (trainClass && !t.classes.some(c => c.code === trainClass)) return false;
      // Add more filter logic as needed
      return true;
    });
  };

  const [filteredTrains, setFilteredTrains] = useState(mockTrains);

  const handleSearch = () => {
    setShowResults(true);
    setFilteredTrains(filterTrains(mockTrains));
  };

  const handleFilterChange = (key) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      setFilteredTrains(filterTrains(mockTrains));
      return updated;
    });
  };

  const handleClassFilter = (e) => {
    setFilters((prev) => ({
      ...prev,
      class: e.target.value,
    }));
    setFilteredTrains(filterTrains(mockTrains));
  };

  // Date navigation bar (7 days)
  const daysNav = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(travelDate);
    d.setDate(travelDate.getDate() + i);
    return d;
  });

  return (
    <>
      {/* Book Trains Header */}
      <div className="w-full bg-transparent pt-10 pb-2">
        <div className="container-custom mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Book Trains</h1>
        </div>
      </div>
      <section className="section-padding bg-[#f5f6fa] min-h-screen">
        <div className="container-custom flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          {showResults && (
            <aside className="w-full md:w-1/4 bg-white rounded-xl shadow p-4 mb-8 md:mb-0">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Filter className="w-5 h-5" /> Quick Filters</h3>
              <div className="space-y-2 mb-6">
                {quickFilters.map(f => (
                  <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[f.key]}
                      onChange={() => handleFilterChange(f.key)}
                      className="accent-primary-500"
                    />
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>
              <h4 className="font-semibold mb-2">Ticket Types</h4>
              <div className="space-y-2 mb-6">
                {ticketTypes.map(f => (
                  <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[f.key]}
                      onChange={() => handleFilterChange(f.key)}
                      className="accent-primary-500"
                    />
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>
              <h4 className="font-semibold mb-2">Quota</h4>
              <div className="space-y-2 mb-6">
                {quotas.map(f => (
                  <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[f.key]}
                      onChange={() => handleFilterChange(f.key)}
                      className="accent-primary-500"
                    />
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>
              <h4 className="font-semibold mb-2">Journey Class</h4>
              <select
                className="input-field w-full"
                value={filters.class}
                onChange={handleClassFilter}
              >
                <option value="">All Classes</option>
                {trainClasses.slice(1).map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-4 mb-6"
              onSubmit={e => { e.preventDefault(); handleSearch(); }}
            >
              <div className="flex items-center gap-2 w-full md:w-1/4">
                <MapPin className="w-5 h-5 text-primary-500" />
                <input
                  type="text"
                  placeholder="From City"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-1/4">
                <MapPin className="w-5 h-5 text-primary-500" />
                <input
                  type="text"
                  placeholder="To City"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-1/4">
                <CalendarDays className="w-5 h-5 text-primary-500" />
                <DatePicker
                  selected={travelDate}
                  onChange={date => setTravelDate(date)}
                  className="input-field"
                  dateFormat="EEE, dd MMM yy"
                  minDate={new Date()}
                  placeholderText="Travel Date"
                  required
                />
              </div>
              <div className="flex items-center gap-2 w-full md:w-1/6">
                <User className="w-5 h-5 text-primary-500" />
                <select
                  value={trainClass}
                  onChange={e => setTrainClass(e.target.value)}
                  className="input-field"
                >
                  {trainClasses.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn-primary flex items-center gap-2"
              >
                <Search className="w-5 h-5" /> Search
              </button>
            </motion.form>

            {/* Date Navigation Bar */}
            {showResults && (
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {daysNav.map((d, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded-lg font-semibold border transition ${
                      d.toDateString() === travelDate.toDateString()
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-primary-50'
                    }`}
                    onClick={() => setTravelDate(new Date(d))}
                  >
                    {d.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' })}
                  </button>
                ))}
              </div>
            )}

            {/* Results Header */}
            {showResults && (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <div className="font-semibold text-gray-700">
                  {filteredTrains.length} trains found
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-gray-600">
                    <ArrowDownUp className="w-4 h-4" /> Sort by
                  </span>
                  <select className="input-field">
                    <option>Availability</option>
                    <option>Train Name</option>
                    <option>Travel Time</option>
                    <option>Arrival</option>
                    <option>Departure</option>
                  </select>
                </div>
              </div>
            )}

            {/* Train Cards */}
            {showResults && (
              <div className="space-y-6">
                {/* Example Offer Banner */}
                <div className="rounded-xl bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 text-white p-6 flex items-center gap-4 shadow">
                  <Info className="w-8 h-8" />
                  <div>
                    <div className="font-bold text-lg mb-1">Introducing Trip Guarantee</div>
                    <div className="text-sm">
                      Get <span className="font-bold">3X refund</span> if your waitlisted ticket doesn’t get confirmed. Use this amount to upgrade your ticket to: Flights, Buses, Cabs, Trains.
                    </div>
                  </div>
                  <span className="ml-auto bg-orange-500 text-white px-3 py-1 rounded-full font-semibold text-xs">LIMITED OFFER</span>
                </div>

                {filteredTrains.length === 0 && (
                  <div className="text-center text-gray-500 py-12">No trains found for the selected criteria.</div>
                )}

                {filteredTrains.map((train, idx) => (
                  <div key={train.number} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                        <span className="font-bold text-lg">{train.name}</span>
                        <span className="text-xs text-gray-500 ml-2">#{train.number}</span>
                        <span className="ml-4 text-xs text-gray-500 flex items-center gap-1">
                          Depart on: <span className="font-semibold">{train.days}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-6 items-center mb-2">
                        <div>
                          <span className="block font-bold text-xl">{train.departure}</span>
                          <span className="block text-xs text-gray-500">{train.from}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary-500" />
                          <span className="font-semibold">{train.duration}</span>
                        </div>
                        <div>
                          <span className="block font-bold text-xl">{train.arrival}</span>
                          <span className="block text-xs text-gray-500">{train.to}</span>
                        </div>
                        <a href="#" className="text-primary-500 underline text-xs ml-4">View Route</a>
                      </div>
                    </div>
                    {/* Class Fare Cards */}
                    <div className="flex flex-wrap gap-4 items-center">
                      {train.classes.map((cls, i) => (
                        <div key={cls.code} className="bg-gray-50 rounded-lg p-4 min-w-[120px] flex flex-col items-center border border-gray-200">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="font-bold">{cls.code}</span>
                            <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded ml-1">{cls.type}</span>
                          </div>
                          <div className="font-bold text-lg mb-1">₹{cls.price}</div>
                          <div className="text-green-600 font-semibold text-xs mb-1">
                            Available {cls.available}
                          </div>
                          <div className="text-gray-500 text-xs mb-1">Free Cancellation</div>
                          <div className="text-gray-400 text-[10px]">Updated {cls.updated}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default function TrainsPage() {
  return (
    <>
      <Head>
        <title>Book Trains | VillageStay</title>
        <meta name="description" content="Book trains easily with VillageStay. Search, filter, and view all available trains with live availability and calendar integration." />
      </Head>
      <Navbar />
      <main className="page-content bg-gray-50 min-h-screen">
        <TrainsSection />
      </main>
      <Footer />
    </>
  );
}
