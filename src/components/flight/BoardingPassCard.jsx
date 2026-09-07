// Course Topic 25-30: Component Composition & Dynamic Rendering

import React from 'react';
import { Plane, Calendar, User, QrCode, Printer, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BoardingPassCard({ booking, onCancel, showDetailLink = true }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="boarding-pass glass-panel hover-lift animate-fade-in">
      {/* Ticket Main Section */}
      <div className="pass-main">
        {/* Header Ribbon */}
        <div className="pass-header">
          <div className="pass-brand">
            <Plane className="pass-logo" />
            <span>FlyEasy Boarding Pass</span>
          </div>
          <span className="pass-status-badge">
            {booking.status || 'Confirmed'}
          </span>
        </div>

        {/* Route Details */}
        <div className="pass-route">
          <div className="route-point">
            <span className="code-large">{booking.from}</span>
            <span className="city-sub">{booking.fromCity}</span>
          </div>

          <div className="route-flight-path">
            <span className="flight-number-tag">{booking.flightNumber}</span>
            <div className="line-with-plane">
              <div className="dot"></div>
              <div className="dash-line"></div>
              <Plane className="path-plane" />
              <div className="dash-line"></div>
              <div className="dot"></div>
            </div>
            <span className="cabin-tag">{booking.cabinClass}</span>
          </div>

          <div className="route-point text-right">
            <span className="code-large">{booking.to}</span>
            <span className="city-sub">{booking.toCity}</span>
          </div>
        </div>

        {/* Grid info */}
        <div className="pass-info-grid">
          <div className="info-cell">
            <span className="cell-label"><User size={12} /> Passenger</span>
            <span className="cell-value">{booking.passengerName}</span>
          </div>

          <div className="info-cell">
            <span className="cell-label"><Calendar size={12} /> Flight Date</span>
            <span className="cell-value">{booking.date}</span>
          </div>

          <div className="info-cell">
            <span className="cell-label">Time</span>
            <span className="cell-value">{booking.departureTime}</span>
          </div>

          <div className="info-cell">
            <span className="cell-label">Gate</span>
            <span className="cell-value highlight">{booking.gate || 'B12'}</span>
          </div>

          <div className="info-cell">
            <span className="cell-label">Seat</span>
            <span className="cell-value highlight">{booking.seatNumber || '14B'}</span>
          </div>

          <div className="info-cell">
            <span className="cell-label">Booking Reference</span>
            <span className="cell-value ref">{booking.id}</span>
          </div>
        </div>
      </div>

      {/* Ticket Tear-off Stub */}
      <div className="pass-stub">
        <div className="stub-notch top"></div>
        <div className="stub-notch bottom"></div>

        <div className="stub-content">
          <div className="stub-header">
            <span>BOARDING PASS</span>
          </div>

          <div className="qr-box">
            <QrCode size={64} className="qr-icon" />
            <span className="scan-text">Scan at Gate</span>
          </div>

          <div className="stub-details">
            <div>
              <strong>Seat:</strong> {booking.seatNumber || '14B'}
            </div>
            <div>
              <strong>Gate:</strong> {booking.gate || 'B12'}
            </div>
          </div>

          <div className="stub-actions no-print">
            <button
              className="btn-icon-action print"
              onClick={handlePrint}
              title="Print Boarding Pass"
            >
              <Printer size={16} /> Print
            </button>

            {onCancel && (
              <button
                className="btn-icon-action cancel"
                onClick={() => onCancel(booking.id)}
                title="Cancel Booking"
              >
                <Trash2 size={16} /> Cancel
              </button>
            )}

            {showDetailLink && (
              <Link
                to={`/bookings/${booking.id}`}
                className="btn-icon-action detail"
                title="View Full Ticket"
              >
                <ArrowRight size={16} /> Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
