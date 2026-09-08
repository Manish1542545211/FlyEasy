// Module 4: Seat Selection

import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { INITIAL_FLIGHTS } from '../data/mockFlights';
import {
  Plane, MapPin, ArrowLeft, ArrowRight, ChevronRight, AlertCircle
} from 'lucide-react';

// Fixed set of unavailable (already booked) seats
const UNAVAILABLE_SEATS = ['1B', '2C', '4A', '5D', '7B', '9C'];

// Seat layout: A B [aisle] C D
const SEAT_COLUMNS = ['A', 'B', 'C', 'D'];
const TOTAL_ROWS = 10;

export default function SeatSelection() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read search context from URL
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('departDate') || '';
  const passengers = searchParams.get('passengers') || '1';
  const cabinClass = searchParams.get('cabinClass') || 'Economy';

  const passengerCount = Number(passengers);

  // Find the selected flight
  const flight = INITIAL_FLIGHTS.find((f) => f.id === id);

  // State — array of selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle seat click — toggle seat selection
  const handleSeatClick = (seatLabel) => {
    if (UNAVAILABLE_SEATS.includes(seatLabel)) return;

    // If seat is already selected, remove it
    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatLabel));
      setErrorMsg('');
      return;
    }

    // If max seats already selected, show message
    if (selectedSeats.length >= passengerCount) {
      setErrorMsg(`You can only select ${passengerCount} seat${passengerCount > 1 ? 's' : ''}.`);
      return;
    }

    // Add seat
    setSelectedSeats([...selectedSeats, seatLabel]);
    setErrorMsg('');
  };

  // Continue to next step
  const handleContinue = () => {
    if (selectedSeats.length !== passengerCount) {
      setErrorMsg(`Please select exactly ${passengerCount} seat${passengerCount > 1 ? 's' : ''}.`);
      return;
    }
    const qs = new URLSearchParams({
      flightId: id,
      seats: selectedSeats.join(','),
      from,
      to,
      departDate,
      passengers,
      cabinClass,
    }).toString();
    navigate(`/passenger-details?${qs}`);
  };

  // Back to Flight Details
  const handleBack = () => {
    const qs = new URLSearchParams({ from, to, departDate, passengers, cabinClass }).toString();
    navigate(`/flights/${id}?${qs}`);
  };

  // Guard: flight not found
  if (!flight) {
    return (
      <div className="seat-selection-page animate-fade-in">
        <div className="fd-not-found glass-panel">
          <Plane size={48} />
          <h2>Flight Not Found</h2>
          <p>The selected flight could not be found. Please go back and try again.</p>
          <button className="btn btn-primary" onClick={() => navigate('/book')}>
            <ArrowLeft size={16} /> Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="seat-selection-page animate-fade-in">
      {/* Breadcrumb */}
      <div className="fd-breadcrumb">
        <div className="fd-breadcrumb-inner">
          <button className="fd-back-btn" onClick={handleBack}>
            <ArrowLeft size={16} /> Back to Flight Details
          </button>
          <div className="fd-breadcrumb-path">
            <span>Search</span>
            <ChevronRight size={14} />
            <span>Results</span>
            <ChevronRight size={14} />
            <span>Details</span>
            <ChevronRight size={14} />
            <span className="fd-breadcrumb-active">Seat Selection</span>
          </div>
        </div>
      </div>

      <div className="ss-container">
        {/* Page Heading */}
        <h1 className="ss-page-title">
          Select Your Seat{passengerCount > 1 ? 's' : ''}
        </h1>
        {passengerCount > 1 && (
          <p className="ss-passenger-hint">
            Please select <strong>{passengerCount} seats</strong> for {passengerCount} passengers.
          </p>
        )}

        {/* Flight Summary */}
        <div className="ss-flight-summary glass-panel">
          <div className="ss-summary-left">
            <span className="ss-airline-logo">{flight.logo || '✈️'}</span>
            <div>
              <strong className="ss-airline-name">{flight.airline}</strong>
              <span className="ss-flight-num">{flight.flightNumber}</span>
            </div>
          </div>
          <div className="ss-summary-right">
            <span className="ss-route">
              <MapPin size={14} />
              {flight.fromCity} ({flight.from})
              <span className="ss-route-arrow">→</span>
              {flight.toCity} ({flight.to})
            </span>
            <span className="ss-time">{flight.departureTime} — {flight.arrivalTime}</span>
          </div>
        </div>

        {/* Seat Legend */}
        <div className="ss-legend">
          <div className="ss-legend-item">
            <span className="ss-legend-box available"></span>
            <span>Available</span>
          </div>
          <div className="ss-legend-item">
            <span className="ss-legend-box selected"></span>
            <span>Selected</span>
          </div>
          <div className="ss-legend-item">
            <span className="ss-legend-box booked"></span>
            <span>Booked</span>
          </div>
        </div>

        {/* Airplane Seat Map */}
        <div className="ss-airplane glass-panel">
          {/* Cockpit visual */}
          <div className="ss-cockpit">
            <Plane size={28} />
            <span>Front</span>
          </div>

          {/* Column headers */}
          <div className="ss-column-headers">
            <span className="ss-row-num-header"></span>
            <span className="ss-col-label">A</span>
            <span className="ss-col-label">B</span>
            <span className="ss-aisle-gap"></span>
            <span className="ss-col-label">C</span>
            <span className="ss-col-label">D</span>
          </div>

          {/* Seat rows */}
          <div className="ss-rows">
            {Array.from({ length: TOTAL_ROWS }, (_, rowIndex) => {
              const rowNum = rowIndex + 1;
              return (
                <div className="ss-row" key={rowNum}>
                  <span className="ss-row-num">{String(rowNum).padStart(2, '0')}</span>
                  {SEAT_COLUMNS.map((col, colIndex) => {
                    const seatLabel = `${rowNum}${col}`;
                    const isBooked = UNAVAILABLE_SEATS.includes(seatLabel);
                    const isSelected = selectedSeats.includes(seatLabel);

                    let seatClass = 'ss-seat available';
                    if (isBooked) seatClass = 'ss-seat booked';
                    else if (isSelected) seatClass = 'ss-seat selected';

                    return (
                      <React.Fragment key={seatLabel}>
                        {/* Aisle gap between B and C */}
                        {colIndex === 2 && <span className="ss-aisle-gap"></span>}
                        <button
                          className={seatClass}
                          onClick={() => handleSeatClick(seatLabel)}
                          disabled={isBooked}
                          title={isBooked ? 'Seat already booked' : `Select seat ${seatLabel}`}
                          id={`seat-${seatLabel}`}
                        >
                          {col}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Seats Display */}
        <div className="ss-selected-display glass-panel">
          {selectedSeats.length > 0 ? (
            <p className="ss-selected-text">
              Selected Seat{selectedSeats.length > 1 ? 's' : ''}:{' '}
              {selectedSeats.map((seat, i) => (
                <strong key={seat} className="ss-seat-highlight">
                  {seat}{i < selectedSeats.length - 1 ? ', ' : ''}
                </strong>
              ))}
              <span className="ss-seat-count">
                ({selectedSeats.length} / {passengerCount})
              </span>
            </p>
          ) : (
            <p className="ss-no-seat-text">
              No seat selected yet. Click on a seat above to choose.
            </p>
          )}
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="ss-error-msg animate-fade-in">
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {/* Actions */}
        <div className="fd-actions">
          <button className="btn btn-secondary fd-back-action" onClick={handleBack}>
            <ArrowLeft size={16} /> Back to Flight Details
          </button>
          <button
            className="btn btn-primary fd-continue-btn"
            id="ss-continue-btn"
            onClick={handleContinue}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
