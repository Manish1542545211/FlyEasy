// Course Topic 37-42: React Router Route Params (useParams), Dynamic Routing & Navigation

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BoardingPassCard from '../components/BoardingPassCard';
import { ArrowLeft, CheckCircle, Luggage, ShieldAlert, Clock, Printer } from 'lucide-react';

export default function BookingDetailsPage({ getBookingById, cancelBooking }) {
  const { id } = useParams(); // Extract route param :id
  const navigate = useNavigate();

  const booking = getBookingById(id);

  if (!booking) {
    return (
      <div className="container py-5 text-center">
        <div className="glass-panel p-5 max-w-md mx-auto">
          <h2>Reservation Not Found</h2>
          <p>No booking matches ticket ID <code>{id}</code>.</p>
          <Link to="/bookings" className="btn btn-primary mt-3">
            <ArrowLeft size={16} /> Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const handleCancel = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this flight reservation?')) {
      cancelBooking(bookingId);
      navigate('/bookings');
    }
  };

  return (
    <div className="booking-details-page animate-fade-in">
      <div className="details-container">
        <div className="details-nav-bar">
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/bookings')}>
            <ArrowLeft size={16} /> Back to All Bookings
          </button>

          <span className="reference-tag">Ticket ID: {booking.id}</span>
        </div>

        {/* Boarding Pass Component */}
        <BoardingPassCard
          booking={booking}
          onCancel={handleCancel}
          showDetailLink={false}
        />

        {/* Itinerary & Amenities Grid */}
        <div className="amenities-grid">
          <div className="amenity-card glass-panel">
            <div className="amenity-header">
              <Luggage size={20} className="icon-blue" />
              <h3>Baggage Allowance</h3>
            </div>
            <ul>
              <li>1x Cabin Bag (up to 10kg)</li>
              <li>2x Checked Bags (up to 23kg each)</li>
              <li>Free Personal Item (Laptop/Handbag)</li>
            </ul>
          </div>

          <div className="amenity-card glass-panel">
            <div className="amenity-header">
              <Clock size={20} className="icon-gold" />
              <h3>Boarding Schedule</h3>
            </div>
            <ul>
              <li>Check-in Desk Closes: 45 min before departure</li>
              <li>Gate Boarding Begins: 30 min before departure</li>
              <li>Gate Closes: 15 min before departure</li>
            </ul>
          </div>

          <div className="amenity-card glass-panel">
            <div className="amenity-header">
              <ShieldAlert size={20} className="icon-green" />
              <h3>Travel Assurance</h3>
            </div>
            <ul>
              <li>Instant Gate Change Mobile Alerts</li>
              <li>Flight Delay Refund Protection</li>
              <li>Complimentary In-flight Refreshments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
