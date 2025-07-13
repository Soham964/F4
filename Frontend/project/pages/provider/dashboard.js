import React, { useState, useRef } from 'react';
import {
  Home, MapPin, Image as ImageIcon, FileText, Users, Phone,
  Utensils, Car, Edit2, Save, Trash2, Plus, Wifi, Fire, ParkingCircle, Shirt, Compass
} from 'lucide-react';

const initialProperty = {
  name: '',
  location: '',
  description: '',
  guests: '',
  phone: '',
  photos: [],
  services: [],
};

const serviceTypes = [
  { label: 'Food', value: 'food', icon: <Utensils className="w-5 h-5 text-primary-500" /> },
  { label: 'Cabs', value: 'cabs', icon: <Car className="w-5 h-5 text-primary-500" /> },
  { label: 'Guided Tours', value: 'tours', icon: <Compass className="w-5 h-5 text-primary-500" /> },
  { label: 'Laundry', value: 'laundry', icon: <Shirt className="w-5 h-5 text-primary-500" /> },
  { label: 'WiFi', value: 'wifi', icon: <Wifi className="w-5 h-5 text-primary-500" /> },
  { label: 'Bonfire', value: 'bonfire', icon: <Fire className="w-5 h-5 text-primary-500" /> },
  { label: 'Parking', value: 'parking', icon: <ParkingCircle className="w-5 h-5 text-primary-500" /> },
];

const ProviderDashboard = () => {
  const [property, setProperty] = useState(initialProperty);
  const [editing, setEditing] = useState(true);
  const [service, setService] = useState({ type: '', details: '' });
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const fileInputRef = useRef();

  // Handle property field changes
  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  // Handle photo uploads
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setProperty(prev => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
    setPhotoPreviews(prev => [
      ...prev,
      ...files.map(file => URL.createObjectURL(file)),
    ]);
  };

  // Remove photo
  const removePhoto = (idx) => {
    setProperty(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // Handle service add
  const handleServiceAdd = (e) => {
    e.preventDefault();
    if (!service.type || !service.details) return;
    setProperty(prev => ({
      ...prev,
      services: [...prev.services, service],
    }));
    setService({ type: '', details: '' });
  };

  // Remove service
  const removeService = (idx) => {
    setProperty(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== idx),
    }));
  };

  // Save property (simulate save)
  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  // Edit property
  const handleEdit = () => setEditing(true);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4 overflow-hidden">
      {/* Decorative background circles (like homepage) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-accent-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-primary-100 rounded-full opacity-20"></div>
      </div>
      <div className="relative max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 z-10">
        <div className="flex items-center mb-8 space-x-3">
          <Home className="w-8 h-8 text-primary-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Manage Your Property</h2>
        </div>

        {/* Property Form or Summary */}
        {editing ? (
          <form onSubmit={handleSave} className="space-y-6">
            {/* Property Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-500" />
                Property Name
              </label>
              <input
                name="name"
                value={property.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="e.g. Mountain Retreat"
                required
              />
            </div>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                Location
              </label>
              <input
                name="location"
                value={property.location}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Village, District, State"
                required
              />
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary-500" />
                Description
              </label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Describe your property, surroundings, and unique experiences"
                rows={3}
                required
              />
            </div>
            {/* Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary-500" />
                Max Guests
              </label>
              <input
                name="guests"
                type="number"
                min={1}
                value={property.guests}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="e.g. 6"
                required
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary-500" />
                Contact Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={property.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="Contact number for guests"
                required
              />
            </div>
            {/* Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-primary-500" />
                Property Photos
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" /> Upload Photos
              </button>
              <div className="flex flex-wrap mt-3 gap-3">
                {photoPreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img src={src} alt="Property" className="w-24 h-24 object-cover rounded-lg border" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-100 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-primary-500" />
                Add Services
              </label>
              <form onSubmit={handleServiceAdd} className="flex flex-col md:flex-row gap-3">
                <select
                  name="type"
                  value={service.type}
                  onChange={e => setService({ ...service, type: e.target.value })}
                  className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none"
                  required
                >
                  <option value="">Select Service</option>
                  {serviceTypes.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <input
                  name="details"
                  value={service.details}
                  onChange={e => setService({ ...service, details: e.target.value })}
                  className="border rounded-lg px-4 py-3 flex-1 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Details (e.g. Veg meals, Airport pickup)"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" /> Add
                </button>
              </form>
              {/* List of added services */}
              <ul className="mt-3 space-y-2">
                {property.services.map((s, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-gray-50 rounded px-3 py-2">
                    <span className="flex items-center gap-2">
                      {serviceTypes.find(t => t.value === s.type)?.icon}
                      <span className="font-medium">{serviceTypes.find(t => t.value === s.type)?.label}:</span>
                      <span>{s.details}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeService(idx)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
              >
                <Save className="w-5 h-5 mr-2" /> Save Property
              </button>
            </div>
          </form>
        ) : (
          // Property Summary Card
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary-600 flex items-center gap-2">
                <Home className="w-6 h-6" /> {property.name}
              </h3>
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
              >
                <Edit2 className="w-4 h-4 mr-2" /> Edit
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700">{property.location}</span>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700">Max Guests: {property.guests}</span>
                </div>
                <div className="mb-3 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700">{property.phone}</span>
                </div>
                <div className="mb-3">
                  <span className="block text-gray-800 font-medium mb-1">Description:</span>
                  <span className="text-gray-600">{property.description}</span>
                </div>
                <div>
                  <span className="block text-gray-800 font-medium mb-1">Services:</span>
                  <ul className="space-y-1">
                    {property.services.length === 0 && <li className="text-gray-400">No services added</li>}
                    {property.services.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {serviceTypes.find(t => t.value === s.type)?.icon}
                        <span className="font-medium">{serviceTypes.find(t => t.value === s.type)?.label}:</span>
                        <span>{s.details}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <span className="block text-gray-800 font-medium mb-2">Photos:</span>
                <div className="flex flex-wrap gap-3">
                  {photoPreviews.length === 0 && (
                    <span className="text-gray-400">No photos uploaded</span>
                  )}
                  {photoPreviews.map((src, idx) => (
                    <img key={idx} src={src} alt="Property" className="w-28 h-28 object-cover rounded-lg border" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;