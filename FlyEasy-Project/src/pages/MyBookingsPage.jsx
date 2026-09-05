// Course Topic 31-36: Custom Hooks, LocalStorage State, Conditional Rendering & List Keys

import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardingPassCard from '../components/BoardingPassCard';
import { Bookmark, Plane, PlusCircle, AlertTriangle } from 'lucide-react';

export default function MyBookingsPage({ bookings, cancelBooking }) {
  const navigate = useNavigate();

  return (
    <div className="my-bookings-page animate-fade-in">
      <div className="page-banner glass-panel">
        <div className="banner-container">
          <div className="banner-text">
            <span className="kicker">Passenger Dashboard</span>
            <h1>My Flight Bookings</h1>
            <p>View, print, and manage all your confirmed electronic boarding passes</p>
          </div>
        </div>
      </div>

      <div className="bookings-container">
        <div className="bookings-header-flex">
          <div className="summary-badge-wrap">
            <Bookmark size={20} className="badge-icon" />
            <span>Active Reservations: <strong>{bookings.length}</strong></span>
          </div>

          <button className="btn btn-primary" onClick={() => navigate('/book')}>
            <PlusCircle size={16} /> Book New Flight
          </button>
        </div>

        {bookings.length > 0 ? (
          <div className="boarding-passes-grid">
            {bookings.map((booking) => (
              <BoardingPassCard
                key={booking.id}
                booking={booking}
                onCancel={cancelBooking}
                showDetailLink={true}
              />
            ))}
          </div>
        ) : (
          <div className="empty-bookings-card glass-panel text-center">
            <div className="empty-icon-wrap">
              <Plane size={48} className="empty-plane" />
            </div>
            <h2>No Active Flight Bookings Found</h2>
            <p>You haven't reserved any flights yet. Ready to embark on your next adventure?</p>
            <button className="btn btn-primary btn-lg mt-4" onClick={() => navigate('/book')}>
              <Plane size={18} /> Book Your First Flight Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
