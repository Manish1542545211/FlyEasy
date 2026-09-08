// Booking Confirmation Page

import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Plane, User, Mail, Phone, MapPin,
  Calendar, Armchair, ArrowRight, Home, Tag, Users
} from 'lucide-react';

export default function Confirmation({ getBookingById }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const booking = getBookingById(id);

  // Guard: booking not found
  if (!booking) {
    return (
      <div className="confirmation-page animate-fade-in">
        <div className="fd-not-found glass-panel">
          <Plane size={48} />
          <h2>Booking Not Found</h2>
          <p>
            No booking was found with ID <code>{id}</code>. It may have been cancelled or the link may be incorrect.
          </p>
          <div className="cf-not-found-actions">
            <button className="btn btn-primary" onClick={() => navigate('/bookings')}>
              View My Bookings
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              <Home size={16} /> Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasMultiplePassengers = booking.passengers && booking.passengers.length > 1;

  return (
    <div className="confirmation-page animate-fade-in">
      <div className="cf-container">
        {/* Success Header */}
        <div className="cf-success-header glass-panel">
          <div className="cf-success-icon">
            <CheckCircle2 size={56} />
          </div>
          <h1 className="cf-success-title">Booking Confirmed!</h1>
          <p className="cf-success-subtitle">
            Your flight has been successfully booked. Here are your booking details.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="cf-details-card glass-panel">
          <h2 className="cf-section-title">Booking Information</h2>

          <div className="cf-details-grid">
            <div className="cf-detail-item">
              <span className="cf-detail-label"><Tag size={14} /> Booking ID</span>
              <span className="cf-detail-value cf-booking-id">{booking.id}</span>
            </div>

            {!hasMultiplePassengers && (
              <>
                <div className="cf-detail-item">
                  <span className="cf-detail-label"><User size={14} /> Passenger Name</span>
                  <span className="cf-detail-value">{booking.passengerName}</span>
                </div>

                <div className="cf-detail-item">
                  <span className="cf-detail-label"><Mail size={14} /> Email</span>
                  <span className="cf-detail-value">{booking.passengerEmail}</span>
                </div>

                <div className="cf-detail-item">
                  <span className="cf-detail-label"><Phone size={14} /> Phone</span>
                  <span className="cf-detail-value">{booking.passengerPhone}</span>
                </div>
              </>
            )}

            {hasMultiplePassengers && (
              <div className="cf-detail-item">
                <span className="cf-detail-label"><Users size={14} /> Total Passengers</span>
                <span className="cf-detail-value">{booking.passengers.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Multi-Passenger List */}
        {hasMultiplePassengers && (
          <div className="cf-details-card glass-panel">
            <h2 className="cf-section-title">Passenger Details</h2>
            <div className="cf-passengers-list">
              {booking.passengers.map((p, i) => (
                <div key={i} className="cf-passenger-item">
                  <div className="cf-passenger-header">
                    <span className="cf-passenger-num">
                      <User size={14} /> Passenger {i + 1}
                    </span>
                    <span className="cf-passenger-seat">
                      <Armchair size={14} /> Seat {p.seatNumber}
                    </span>
                  </div>
                  <div className="cf-passenger-info">
                    <span><strong>Name:</strong> {p.fullName}</span>
                    <span><strong>Age:</strong> {p.age} • <strong>Gender:</strong> {p.gender}</span>
                    <span><Mail size={12} /> {p.email}</span>
                    <span><Phone size={12} /> {p.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flight Details Card */}
        <div className="cf-details-card glass-panel">
          <h2 className="cf-section-title">Flight Details</h2>

          <div className="cf-details-grid">
            <div className="cf-detail-item">
              <span className="cf-detail-label"><Plane size={14} /> Airline</span>
              <span className="cf-detail-value">{booking.airline}</span>
            </div>

            <div className="cf-detail-item">
              <span className="cf-detail-label"><Plane size={14} /> Flight Number</span>
              <span className="cf-detail-value">{booking.flightNumber}</span>
            </div>

            <div className="cf-detail-item">
              <span className="cf-detail-label"><MapPin size={14} /> From → To</span>
              <span className="cf-detail-value">
                {booking.fromCity} ({booking.from}) → {booking.toCity} ({booking.to})
              </span>
            </div>

            <div className="cf-detail-item">
              <span className="cf-detail-label"><Calendar size={14} /> Travel Date</span>
              <span className="cf-detail-value">{booking.date || 'N/A'}</span>
            </div>

            <div className="cf-detail-item">
              <span className="cf-detail-label"><Armchair size={14} /> Seat{hasMultiplePassengers ? 's' : ''}</span>
              <span className="cf-detail-value cf-seat-badge">
                {hasMultiplePassengers
                  ? booking.passengers.map((p) => p.seatNumber).join(', ')
                  : booking.seatNumber
                }
              </span>
            </div>

            <div className="cf-detail-item">
              <span className="cf-detail-label"><Armchair size={14} /> Cabin Class</span>
              <span className="cf-detail-value">{booking.cabinClass}</span>
            </div>

            <div className="cf-detail-item">
              <span className="cf-detail-label">Status</span>
              <span className="cf-detail-value cf-status-badge">{booking.status}</span>
            </div>

            <div className="cf-detail-item">
              <span className="cf-detail-label">Gate</span>
              <span className="cf-detail-value">{booking.gate || 'To be announced'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cf-actions">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/bookings')}
            id="cf-view-bookings-btn"
          >
            View My Bookings <ArrowRight size={16} />
          </button>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('/')}
          >
            <Home size={16} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
