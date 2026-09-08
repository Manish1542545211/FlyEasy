// Module 5: Passenger Details

import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { INITIAL_FLIGHTS } from '../data/mockFlights';
import {
  User, Mail, Phone, ArrowLeft, ChevronRight,
  Plane, AlertCircle, CheckCircle2, Armchair
} from 'lucide-react';

export default function PassengerDetails({ addBooking }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read search context from query params
  const flightId = searchParams.get('flightId') || '';
  const seatsParam = searchParams.get('seats') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('departDate') || '';
  const passengers = searchParams.get('passengers') || '1';
  const cabinClass = searchParams.get('cabinClass') || 'Economy';

  // Parse seats into array
  const seatsList = seatsParam ? seatsParam.split(',') : [];
  const passengerCount = seatsList.length || Number(passengers);

  // Find the selected flight
  const flight = INITIAL_FLIGHTS.find((f) => f.id === flightId);

  // Create empty form for one passenger
  const createEmptyForm = () => ({
    fullName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
  });

  // Form state — array of passenger forms
  const [formData, setFormData] = useState(
    Array.from({ length: passengerCount }, () => createEmptyForm())
  );

  // Errors — array of error objects
  const [errors, setErrors] = useState(
    Array.from({ length: passengerCount }, () => ({}))
  );

  // Handle input change for a specific passenger
  const handleChange = (index, e) => {
    const { name, value } = e.target;

    // Update form data for this passenger
    const updatedForms = [...formData];
    updatedForms[index] = { ...updatedForms[index], [name]: value };
    setFormData(updatedForms);

    // Clear error for this field
    if (errors[index][name]) {
      const updatedErrors = [...errors];
      updatedErrors[index] = { ...updatedErrors[index], [name]: '' };
      setErrors(updatedErrors);
    }
  };

  // Validate one passenger's fields
  const validatePassenger = (data) => {
    const errs = {};

    if (!data.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    }

    if (!data.age) {
      errs.age = 'Age is required.';
    } else if (isNaN(data.age) || Number(data.age) < 1 || Number(data.age) > 120) {
      errs.age = 'Please enter a valid age (1–120).';
    }

    if (!data.gender) {
      errs.gender = 'Please select a gender.';
    }

    if (!data.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!data.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/\d{10,}/.test(data.phone.replace(/\D/g, ''))) {
      errs.phone = 'Phone number must have at least 10 digits.';
    }

    return errs;
  };

  // Validate all passengers
  const validateAll = () => {
    const allErrors = formData.map((data) => validatePassenger(data));
    setErrors(allErrors);

    // Check if any passenger has errors
    for (let i = 0; i < allErrors.length; i++) {
      if (Object.keys(allErrors[i]).length > 0) return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    // Price multiplier based on cabin class
    let multiplier = 1;
    if (cabinClass === 'Business') multiplier = 1.8;
    else if (cabinClass === 'First') multiplier = 2.5;

    const pricePerSeat = flight ? Math.round(flight.price * multiplier) : 0;
    const totalPrice = pricePerSeat * passengerCount;

    // Build passengers array
    const passengersArray = formData.map((data, i) => ({
      fullName: data.fullName.trim(),
      age: data.age,
      gender: data.gender,
      email: data.email.trim(),
      phone: data.phone.trim(),
      seatNumber: seatsList[i] || '',
    }));

    // Build booking data (backward compatible)
    const bookingData = {
      flightId: flightId,
      airline: flight?.airline || '',
      flightNumber: flight?.flightNumber || '',
      from: flight?.from || from,
      fromCity: flight?.fromCity || '',
      to: flight?.to || to,
      toCity: flight?.toCity || '',
      departureTime: flight?.departureTime || '',
      arrivalTime: flight?.arrivalTime || '',
      date: departDate,
      // Primary passenger fields (backward compatible)
      passengerName: passengersArray[0].fullName,
      passengerEmail: passengersArray[0].email,
      passengerPhone: passengersArray[0].phone,
      seatNumber: passengersArray[0].seatNumber,
      cabinClass: cabinClass,
      price: totalPrice,
      totalPassengers: passengerCount,
      passengers: passengersArray,
    };

    const createdBooking = addBooking(bookingData);

    // Go to confirmation page
    navigate(`/confirmation/${createdBooking.id}`);
  };

  // Navigate back
  const handleBack = () => {
    const qs = new URLSearchParams({ from, to, departDate, passengers, cabinClass }).toString();
    navigate(`/seat-selection/${flightId}?${qs}`);
  };

  // Guard: flight not found
  if (!flight) {
    return (
      <div className="passenger-details-page animate-fade-in">
        <div className="fd-not-found glass-panel">
          <Plane size={48} />
          <h2>Flight Not Found</h2>
          <p>Could not find the selected flight. Please go back and try again.</p>
          <button className="btn btn-primary" onClick={() => navigate('/book')}>
            <ArrowLeft size={16} /> Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="passenger-details-page animate-fade-in">
      {/* Breadcrumb */}
      <div className="fd-breadcrumb">
        <div className="fd-breadcrumb-inner">
          <button className="fd-back-btn" onClick={handleBack}>
            <ArrowLeft size={16} /> Back to Seat Selection
          </button>
          <div className="fd-breadcrumb-path">
            <span>Search</span>
            <ChevronRight size={14} />
            <span>Results</span>
            <ChevronRight size={14} />
            <span>Details</span>
            <ChevronRight size={14} />
            <span>Seat</span>
            <ChevronRight size={14} />
            <span className="fd-breadcrumb-active">Passenger Details</span>
          </div>
        </div>
      </div>

      <div className="pd-container">
        <h1 className="pd-page-title">Passenger Details</h1>

        {/* Flight & Seat Summary */}
        <div className="pd-summary glass-panel">
          <div className="pd-summary-row">
            <span className="pd-summary-label">Flight</span>
            <span className="pd-summary-value">{flight.airline} — {flight.flightNumber}</span>
          </div>
          <div className="pd-summary-row">
            <span className="pd-summary-label">Route</span>
            <span className="pd-summary-value">{flight.fromCity} ({flight.from}) → {flight.toCity} ({flight.to})</span>
          </div>
          <div className="pd-summary-row">
            <span className="pd-summary-label">Selected Seat{seatsList.length > 1 ? 's' : ''}</span>
            <span className="pd-summary-value">
              {seatsList.map((seat, i) => (
                <span key={seat} className="pd-seat-badge">
                  {seat}{i < seatsList.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </div>
          <div className="pd-summary-row">
            <span className="pd-summary-label">Cabin Class</span>
            <span className="pd-summary-value">{cabinClass}</span>
          </div>
          {passengerCount > 1 && (
            <div className="pd-summary-row">
              <span className="pd-summary-label">Passengers</span>
              <span className="pd-summary-value">{passengerCount}</span>
            </div>
          )}
        </div>

        {/* Passenger Forms */}
        <form onSubmit={handleSubmit} noValidate>
          {formData.map((data, index) => (
            <div key={index} className="pd-form glass-panel pd-passenger-section">
              <h2 className="pd-form-title">
                <User size={20} />
                Passenger {index + 1}
                <span className="pd-seat-tag">
                  <Armchair size={14} /> Seat {seatsList[index]}
                </span>
              </h2>

              {/* Full Name */}
              <div className="pd-field">
                <label htmlFor={`pd-fullName-${index}`}>
                  <User size={14} /> Full Name <span className="pd-required">*</span>
                </label>
                <input
                  type="text"
                  id={`pd-fullName-${index}`}
                  name="fullName"
                  value={data.fullName}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g. Aarav Sharma"
                  className={`pd-input ${errors[index].fullName ? 'pd-input-error' : ''}`}
                />
                {errors[index].fullName && (
                  <span className="pd-error-text"><AlertCircle size={13} /> {errors[index].fullName}</span>
                )}
              </div>

              {/* Age and Gender */}
              <div className="pd-field-row">
                <div className="pd-field">
                  <label htmlFor={`pd-age-${index}`}>
                    Age <span className="pd-required">*</span>
                  </label>
                  <input
                    type="number"
                    id={`pd-age-${index}`}
                    name="age"
                    value={data.age}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. 25"
                    min="1"
                    max="120"
                    className={`pd-input ${errors[index].age ? 'pd-input-error' : ''}`}
                  />
                  {errors[index].age && (
                    <span className="pd-error-text"><AlertCircle size={13} /> {errors[index].age}</span>
                  )}
                </div>

                <div className="pd-field">
                  <label htmlFor={`pd-gender-${index}`}>
                    Gender <span className="pd-required">*</span>
                  </label>
                  <select
                    id={`pd-gender-${index}`}
                    name="gender"
                    value={data.gender}
                    onChange={(e) => handleChange(index, e)}
                    className={`pd-input ${errors[index].gender ? 'pd-input-error' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors[index].gender && (
                    <span className="pd-error-text"><AlertCircle size={13} /> {errors[index].gender}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="pd-field">
                <label htmlFor={`pd-email-${index}`}>
                  <Mail size={14} /> Email Address <span className="pd-required">*</span>
                </label>
                <input
                  type="email"
                  id={`pd-email-${index}`}
                  name="email"
                  value={data.email}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g. aarav@example.com"
                  className={`pd-input ${errors[index].email ? 'pd-input-error' : ''}`}
                />
                {errors[index].email && (
                  <span className="pd-error-text"><AlertCircle size={13} /> {errors[index].email}</span>
                )}
              </div>

              {/* Phone */}
              <div className="pd-field">
                <label htmlFor={`pd-phone-${index}`}>
                  <Phone size={14} /> Phone Number <span className="pd-required">*</span>
                </label>
                <input
                  type="tel"
                  id={`pd-phone-${index}`}
                  name="phone"
                  value={data.phone}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="e.g. +91 98765 43210"
                  className={`pd-input ${errors[index].phone ? 'pd-input-error' : ''}`}
                />
                {errors[index].phone && (
                  <span className="pd-error-text"><AlertCircle size={13} /> {errors[index].phone}</span>
                )}
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="pd-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleBack}>
              <ArrowLeft size={16} /> Back
            </button>
            <button type="submit" className="btn btn-primary fd-continue-btn" id="pd-submit-btn">
              <CheckCircle2 size={16} /> Confirm & Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
