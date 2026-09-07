// Module 3: Flight Details — Clean, Simple Flight Breakdown

import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { INITIAL_FLIGHTS } from '../data/mockFlights';
import {
  Plane, Clock, MapPin, Calendar, Users, Armchair, ArrowRight,
  ArrowLeft, Luggage, ShoppingBag, Tag, ChevronRight, CheckCircle2,
  Info
} from 'lucide-react';

export default function FlightDetailsPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lookup the exact flight clicked from mockFlights
  const flight = INITIAL_FLIGHTS.find((f) => f.id === id);

  // Preserve search context for back navigation and pricing
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const departDate = searchParams.get('departDate') || '';
  const passengers = Number(searchParams.get('passengers')) || 1;
  const cabinClass = searchParams.get('cabinClass') || 'Economy';

  // Back to results with preserved search state
  const handleBack = () => {
    const qs = new URLSearchParams({ from, to, departDate, passengers, cabinClass }).toString();
    navigate(`/results?${qs}`);
  };

  // Simple Continue button (handoff to next module)
  const handleContinue = () => {
    alert(`Proceeding to passenger details for ${flight?.flightNumber} (${cabinClass}). Next module coming soon!`);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not selected';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Cabin class price multiplier
  const multiplier = cabinClass === 'Business' ? 1.8 : cabinClass === 'First' ? 2.5 : 1;

  // Flight not found guard
  if (!flight) {
    return (
      <div className="flight-details-page animate-fade-in">
        <div className="fd-not-found glass-panel">
          <Plane size={48} />
          <h2>Flight Not Found</h2>
          <p>The flight you selected could not be found. Please return to the results page.</p>
          <button className="btn btn-primary" onClick={handleBack}>
            <ArrowLeft size={16} /> Back to Search Results
          </button>
        </div>
      </div>
    );
  }

  const pricePerSeat = Math.round(flight.price * multiplier);
  const totalPrice = pricePerSeat * passengers;

  // Baggage based on class
  const baggageInfo = {
    Economy: { cabin: flight.cabinBaggage || '7 kg', checkIn: flight.checkInBaggage || '15 kg', fare: 'Standard Economy' },
    Business: { cabin: '15 kg', checkIn: '25 kg', fare: 'Business Class' },
    First: { cabin: '20 kg', checkIn: '35 kg', fare: 'First Class' },
  };
  const baggage = baggageInfo[cabinClass] || baggageInfo.Economy;

  const isNonStop = flight.stops === 'Non-stop';

  return (
    <div className="flight-details-page animate-fade-in">
      {/* Breadcrumb / Back button */}
      <div className="fd-breadcrumb">
        <div className="fd-breadcrumb-inner">
          <button className="fd-back-btn" onClick={handleBack} id="fd-back-to-results-btn">
            <ArrowLeft size={16} /> Back to Search Results
          </button>
          <div className="fd-breadcrumb-path">
            <span>Search</span>
            <ChevronRight size={14} />
            <span>Flight Results</span>
            <ChevronRight size={14} />
            <span className="fd-breadcrumb-active">Flight Details</span>
          </div>
        </div>
      </div>

      <div className="fd-container">

        {/* ── 1. FLIGHT & DEPARTURE / ARRIVAL SUMMARY ── */}
        <section className="fd-section">
          <div className="fd-card glass-panel" id="fd-flight-summary">
            <div className="fd-card-header">
              <div className="fd-airline-row">
                <span className="fd-airline-logo">{flight.logo || '✈️'}</span>
                <div>
                  <h2 className="fd-airline-name">{flight.airline}</h2>
                  <span className="fd-flight-meta">{flight.flightNumber} &bull; {flight.aircraft || 'Commercial Jet'}</span>
                </div>
              </div>
              <div className={`fd-stops-pill ${isNonStop ? 'nonstop' : 'hasstop'}`}>
                {flight.stops}
              </div>
            </div>

            <div className="fd-summary-grid">
              <div className="fd-summary-item">
                <span className="fd-label"><MapPin size={13} /> From</span>
                <span className="fd-value">{flight.fromCity} ({flight.from})</span>
              </div>
              <div className="fd-summary-item">
                <span className="fd-label"><MapPin size={13} /> To</span>
                <span className="fd-value">{flight.toCity} ({flight.to})</span>
              </div>
              <div className="fd-summary-item">
                <span className="fd-label"><Calendar size={13} /> Departure Date</span>
                <span className="fd-value">{formatDate(departDate)}</span>
              </div>
              <div className="fd-summary-item">
                <span className="fd-label"><Clock size={13} /> Duration</span>
                <span className="fd-value">{flight.duration}</span>
              </div>
              <div className="fd-summary-item">
                <span className="fd-label"><Users size={13} /> Passengers</span>
                <span className="fd-value">{passengers} Passenger{passengers > 1 ? 's' : ''}</span>
              </div>
              <div className="fd-summary-item">
                <span className="fd-label"><Armchair size={13} /> Cabin Class</span>
                <span className="fd-value">{cabinClass}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. JOURNEY & ITINERARY ── */}
        <section className="fd-section">
          <h3 className="fd-section-title">Journey &amp; Itinerary</h3>
          <div className="fd-card glass-panel fd-itinerary" id="fd-itinerary">
            {/* Origin */}
            <div className="fd-itin-stop">
              <div className="fd-itin-time">{flight.departureTime}</div>
              <div className="fd-itin-city">
                <span className="fd-itin-code">{flight.from}</span>
                <span className="fd-itin-cityname">{flight.fromCity}</span>
              </div>
            </div>

            {/* Route line */}
            <div className="fd-itin-line-wrap">
              <div className="fd-itin-line">
                <span className="fd-itin-dot"></span>
                <div className="fd-itin-connector">
                  <Plane className="fd-itin-plane-icon" size={16} />
                  <span className="fd-itin-duration">{flight.duration}</span>
                  {!isNonStop && flight.layover && (
                    <span className="fd-itin-stop-badge">
                      <Info size={12} /> {flight.layover}
                    </span>
                  )}
                </div>
                <span className="fd-itin-dot end"></span>
              </div>
            </div>

            {/* Destination */}
            <div className="fd-itin-stop end">
              <div className="fd-itin-time">{flight.arrivalTime}</div>
              <div className="fd-itin-city">
                <span className="fd-itin-code">{flight.to}</span>
                <span className="fd-itin-cityname">{flight.toCity}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. BAGGAGE INFORMATION ── */}
        <section className="fd-section">
          <h3 className="fd-section-title">Baggage Allowance</h3>
          <div className="fd-card glass-panel fd-baggage-grid" id="fd-fare-baggage">
            <div className="fd-baggage-item">
              <div className="fd-baggage-icon"><ShoppingBag size={22} /></div>
              <div>
                <span className="fd-label">Cabin Baggage</span>
                <span className="fd-value">{baggage.cabin} per person</span>
              </div>
            </div>
            <div className="fd-baggage-item">
              <div className="fd-baggage-icon"><Luggage size={22} /></div>
              <div>
                <span className="fd-label">Check-in Baggage</span>
                <span className="fd-value">{baggage.checkIn} per person</span>
              </div>
            </div>
            <div className="fd-baggage-item">
              <div className="fd-baggage-icon"><Tag size={22} /></div>
              <div>
                <span className="fd-label">Fare Type</span>
                <span className="fd-value">{baggage.fare}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. AMENITIES ── */}
        {flight.amenities && flight.amenities.length > 0 && (
          <section className="fd-section">
            <h3 className="fd-section-title">In-Flight Amenities</h3>
            <div className="fd-card glass-panel fd-amenities-card">
              <div className="fd-amenities-list">
                {flight.amenities.map((item, idx) => (
                  <div key={idx} className="fd-amenity-badge">
                    <CheckCircle2 size={16} className="amenity-check" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 5. PRICE BREAKDOWN ── */}
        <section className="fd-section">
          <h3 className="fd-section-title">Price Details</h3>
          <div className="fd-card glass-panel fd-price-card" id="fd-price-summary">
            <div className="fd-price-rows">
              <div className="fd-price-row">
                <span>Base Fare ({cabinClass})</span>
                <span>₹{pricePerSeat.toLocaleString('en-IN')} / seat</span>
              </div>
              {passengers > 1 && (
                <div className="fd-price-row">
                  <span>Passengers</span>
                  <span>&times; {passengers}</span>
                </div>
              )}
              <div className="fd-price-row">
                <span>Taxes &amp; Airport Fees</span>
                <span className="fd-price-included">Included</span>
              </div>
              <div className="fd-price-row fd-price-total">
                <span>Total Amount</span>
                <span className="fd-total-amount">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p className="fd-price-note">
              <CheckCircle2 size={13} /> All taxes and surcharges included. No hidden convenience fees.
            </p>
          </div>
        </section>

        {/* ── 6. ACTIONS: BACK & CONTINUE ── */}
        <div className="fd-actions">
          <button className="btn btn-secondary fd-back-action" onClick={handleBack}>
            <ArrowLeft size={16} /> Back to Search Results
          </button>
          <button
            className="btn btn-primary fd-continue-btn"
            id="fd-continue-btn"
            onClick={handleContinue}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
