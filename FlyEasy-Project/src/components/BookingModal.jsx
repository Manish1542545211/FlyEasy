// Course Topic 19-24 & 31-36: React State (useState), Form Controlled Inputs & Event Handlers

import React, { useState } from 'react';
import { X, CheckCircle, Plane, User, Mail, Phone, Calendar } from 'lucide-react';

export default function BookingModal({ flight, searchParams, onClose, onConfirm }) {
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [date, setDate] = useState(searchParams?.departDate || new Date().toISOString().split('T')[0]);
  const [cabinClass, setCabinClass] = useState(searchParams?.cabinClass || 'Economy');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!flight) return null;

  const multiplier = cabinClass === 'Business' ? 1.8 : cabinClass === 'First' ? 2.5 : 1;
  const totalPrice = Math.round(flight.price * multiplier);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onConfirm({
        flightId: flight.id,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        from: flight.from,
        fromCity: flight.fromCity,
        to: flight.to,
        toCity: flight.toCity,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        date: date,
        passengerName: passengerName,
        passengerEmail: passengerEmail,
        passengerPhone: passengerPhone,
        cabinClass: cabinClass,
        price: totalPrice,
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content glass-panel animate-scale-up">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Plane className="modal-icon" />
            <h2>Complete Flight Reservation</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Flight Quick Summary */}
        <div className="modal-flight-summary">
          <div className="summary-route">
            <span className="summary-city">{flight.fromCity} ({flight.from})</span>
            <span className="summary-arrow">➔</span>
            <span className="summary-city">{flight.toCity} ({flight.to})</span>
          </div>
          <div className="summary-meta">
            <span>{flight.airline} • {flight.flightNumber}</span>
            <span className="summary-price">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Passenger Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="p-name"><User size={14} /> Full Passenger Name</label>
            <input
              type="text"
              id="p-name"
              placeholder="e.g. Aarav Sharma"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="p-email"><Mail size={14} /> Email Address</label>
              <input
                type="email"
                id="p-email"
                placeholder="aarav.sharma@example.in"
                value={passengerEmail}
                onChange={(e) => setPassengerEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="p-phone"><Phone size={14} /> Mobile Phone (+91)</label>
              <input
                type="tel"
                id="p-phone"
                placeholder="+91 98765 43210"
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="travel-date"><Calendar size={14} /> Travel Date</label>
              <input
                type="date"
                id="travel-date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="modal-cabin">Cabin Class</label>
              <select
                id="modal-cabin"
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="form-control"
              >
                <option value="Economy">Economy (₹{flight.price.toLocaleString('en-IN')})</option>
                <option value="Business">Business (₹{Math.round(flight.price * 1.8).toLocaleString('en-IN')})</option>
                <option value="First">First Class (₹{Math.round(flight.price * 2.5).toLocaleString('en-IN')})</option>
              </select>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="price-breakdown">
            <div className="breakdown-row">
              <span>Base Fare ({cabinClass})</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="breakdown-row">
              <span>GST & Airport User Fee</span>
              <span>Included (₹0.00)</span>
            </div>
            <div className="breakdown-row total">
              <span>Total Amount Payable</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                'Confirming Reservation...'
              ) : (
                <>
                  <CheckCircle size={18} /> Confirm & Pay ₹{totalPrice.toLocaleString('en-IN')}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
