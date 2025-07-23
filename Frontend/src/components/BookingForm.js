import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  CreditCard, 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  AlertCircle
} from 'lucide-react';
import { formatPrice, calculateTotalPrice } from '../utils/helpers';

const BookingForm = ({ listing, onBookingSubmit }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    dates: {
      checkIn: '',
      checkOut: '',
    },
    guests: {
      adults: 2,
      children: 0,
    },
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    specialRequests: '',
    paymentMethod: 'card',
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (section, field, value) => {
    setBookingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`${section}.${field}`]: null,
      }));
    }
  };

  const handleDirectChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 1:
        if (!bookingData.dates.checkIn) {
          newErrors['dates.checkIn'] = 'Check-in date is required';
        }
        if (!bookingData.dates.checkOut) {
          newErrors['dates.checkOut'] = 'Check-out date is required';
        }
        if (bookingData.dates.checkIn && bookingData.dates.checkOut) {
          const checkIn = new Date(bookingData.dates.checkIn);
          const checkOut = new Date(bookingData.dates.checkOut);
          if (checkIn >= checkOut) {
            newErrors['dates.checkOut'] = 'Check-out must be after check-in';
          }
        }
        if (bookingData.guests.adults + bookingData.guests.children > listing.maxGuests) {
          newErrors['guests.adults'] = `Maximum ${listing.maxGuests} guests allowed`;
        }
        break;

      case 2:
        if (!bookingData.guestInfo.firstName) {
          newErrors['guestInfo.firstName'] = 'First name is required';
        }
        if (!bookingData.guestInfo.lastName) {
          newErrors['guestInfo.lastName'] = 'Last name is required';
        }
        if (!bookingData.guestInfo.email) {
          newErrors['guestInfo.email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(bookingData.guestInfo.email)) {
          newErrors['guestInfo.email'] = 'Please enter a valid email';
        }
        if (!bookingData.guestInfo.phone) {
          newErrors['guestInfo.phone'] = 'Phone number is required';
        }
        break;

      case 3:
        if (!bookingData.agreeTerms) {
          newErrors['agreeTerms'] = 'You must agree to the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      await onBookingSubmit(bookingData);
      setStep(4); // Success step
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Calculate pricing
  const nights = bookingData.dates.checkIn && bookingData.dates.checkOut
    ? Math.ceil((new Date(bookingData.dates.checkOut) - new Date(bookingData.dates.checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  const totalGuests = bookingData.guests.adults + bookingData.guests.children;
  const pricing = calculateTotalPrice(listing.price, nights, totalGuests);

  const steps = [
    { title: 'Dates & Guests', icon: Calendar },
    { title: 'Guest Information', icon: User },
    { title: 'Payment', icon: CreditCard },
    { title: 'Confirmation', icon: CheckCircle },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index + 1 <= step
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm ${
                index + 1 <= step ? 'text-primary-500' : 'text-gray-500'
              }`}>
                {s.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  index + 1 < step ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Select Dates & Guests</h3>
            
            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={bookingData.dates.checkIn}
                  onChange={(e) => handleInputChange('dates', 'checkIn', e.target.value)}
                  className={`input-field ${errors['dates.checkIn'] ? 'border-red-500' : ''}`}
                />
                {errors['dates.checkIn'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['dates.checkIn']}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={bookingData.dates.checkOut}
                  onChange={(e) => handleInputChange('dates', 'checkOut', e.target.value)}
                  className={`input-field ${errors['dates.checkOut'] ? 'border-red-500' : ''}`}
                />
                {errors['dates.checkOut'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['dates.checkOut']}</p>
                )}
              </div>
            </div>

            {/* Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adults
                </label>
                <select
                  value={bookingData.guests.adults}
                  onChange={(e) => handleInputChange('guests', 'adults', parseInt(e.target.value))}
                  className={`input-field ${errors['guests.adults'] ? 'border-red-500' : ''}`}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                {errors['guests.adults'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['guests.adults']}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Children
                </label>
                <select
                  value={bookingData.guests.children}
                  onChange={(e) => handleInputChange('guests', 'children', parseInt(e.target.value))}
                  className="input-field"
                >
                  {[0, 1, 2, 3, 4].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Summary */}
            {nights > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Price Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{formatPrice(listing.price)} × {nights} nights</span>
                    <span>{formatPrice(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>{formatPrice(pricing.taxAmount)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(pricing.total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Guest Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={bookingData.guestInfo.firstName}
                  onChange={(e) => handleInputChange('guestInfo', 'firstName', e.target.value)}
                  className={`input-field ${errors['guestInfo.firstName'] ? 'border-red-500' : ''}`}
                />
                {errors['guestInfo.firstName'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['guestInfo.firstName']}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={bookingData.guestInfo.lastName}
                  onChange={(e) => handleInputChange('guestInfo', 'lastName', e.target.value)}
                  className={`input-field ${errors['guestInfo.lastName'] ? 'border-red-500' : ''}`}
                />
                {errors['guestInfo.lastName'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['guestInfo.lastName']}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={bookingData.guestInfo.email}
                  onChange={(e) => handleInputChange('guestInfo', 'email', e.target.value)}
                  className={`input-field ${errors['guestInfo.email'] ? 'border-red-500' : ''}`}
                />
                {errors['guestInfo.email'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['guestInfo.email']}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={bookingData.guestInfo.phone}
                  onChange={(e) => handleInputChange('guestInfo', 'phone', e.target.value)}
                  className={`input-field ${errors['guestInfo.phone'] ? 'border-red-500' : ''}`}
                />
                {errors['guestInfo.phone'] && (
                  <p className="text-red-500 text-sm mt-1">{errors['guestInfo.phone']}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={bookingData.guestInfo.address}
                onChange={(e) => handleInputChange('guestInfo', 'address', e.target.value)}
                className="input-field"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) => handleDirectChange('specialRequests', e.target.value)}
                rows="3"
                className="input-field"
                placeholder="Any special requests or requirements..."
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Payment & Confirmation</h3>
            
            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Property</span>
                  <span>{listing.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates</span>
                  <span>{bookingData.dates.checkIn} to {bookingData.dates.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>{totalGuests} guests</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{nights} nights</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>{formatPrice(pricing.total)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Payment Method</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={bookingData.paymentMethod === 'card'}
                    onChange={(e) => handleDirectChange('paymentMethod', e.target.value)}
                    className="mr-2"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={bookingData.paymentMethod === 'upi'}
                    onChange={(e) => handleDirectChange('paymentMethod', e.target.value)}
                    className="mr-2"
                  />
                  <span>UPI</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={bookingData.paymentMethod === 'netbanking'}
                    onChange={(e) => handleDirectChange('paymentMethod', e.target.value)}
                    className="mr-2"
                  />
                  <span>Net Banking</span>
                </label>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={bookingData.agreeTerms}
                  onChange={(e) => handleDirectChange('agreeTerms', e.target.checked)}
                  className="mr-2 mt-1"
                />
                <span className="text-sm text-gray-700">
                  I agree to the terms and conditions, cancellation policy, and privacy policy.
                </span>
              </label>
              {errors['agreeTerms'] && (
                <p className="text-red-500 text-sm mt-1">{errors['agreeTerms']}</p>
              )}
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <h5 className="font-semibold text-yellow-800">Important Notes</h5>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• No refund for cancellations within 24 hours</li>
                    <li>• Check-in time: {listing.checkIn}</li>
                    <li>• Check-out time: {listing.checkOut}</li>
                    <li>• Please bring valid ID proof</li>
                  </ul>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
                <p className="text-red-700">{errors.submit}</p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Booking Details</h4>
              <p className="text-sm text-gray-600">
                Confirmation Number: #VS{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </motion.button>
            )}
            
            {step < 3 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="btn-primary ml-auto"
              >
                Next
              </motion.button>
            )}
            
            {step === 3 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary ml-auto disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingForm;