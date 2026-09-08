// Flight Search Form: Controlled Inputs, Events, useState

import { useState } from 'react';
import { CITIES } from '../../data/mockFlights';
import { Calendar, Users, ArrowRightLeft, Search, PlaneTakeoff, PlaneLanding } from 'lucide-react';

export default function FlightSearchForm({ onSearch, initialFrom = 'DEL', initialTo = 'BOM' }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const nextWeekStr = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [departDate, setDepartDate] = useState(todayStr);
  const [returnDate, setReturnDate] = useState(nextWeekStr);
  const [tripType, setTripType] = useState('one-way'); // 'one-way' | 'round-trip'
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (from === to) {
      setErrorMsg('Origin and Destination cities cannot be the same!');
      return;
    }

    if (onSearch) {
      onSearch({
        from,
        to,
        departDate,
        returnDate: tripType === 'round-trip' ? returnDate : null,
        tripType,
        passengers,
        cabinClass,
      });
    }
  };

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="search-form-card glass-panel">
      {/* Trip Type Tabs */}
      <div className="trip-tabs">
        <button
          type="button"
          className={`tab-btn ${tripType === 'one-way' ? 'active' : ''}`}
          onClick={() => setTripType('one-way')}
        >
          One Way Flight
        </button>
        <button
          type="button"
          className={`tab-btn ${tripType === 'round-trip' ? 'active' : ''}`}
          onClick={() => setTripType('round-trip')}
        >
          Round Trip
        </button>
      </div>

      {errorMsg && (
        <div className="form-error-banner animate-fade-in">
          ⚠️ {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flight-form">
        <div className="form-grid">
          {/* FROM CITY */}
          <div className="form-group">
            <label htmlFor="from-city">
              <PlaneTakeoff className="field-icon" /> From (Origin)
            </label>
            <select
              id="from-city"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="form-control"
              required
            >
              {CITIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* SWAP BUTTON */}
          <div className="swap-btn-wrap">
            <button
              type="button"
              className="swap-btn"
              onClick={handleSwap}
              title="Swap Origin and Destination"
            >
              <ArrowRightLeft size={18} />
            </button>
          </div>

          {/* TO CITY */}
          <div className="form-group">
            <label htmlFor="to-city">
              <PlaneLanding className="field-icon" /> To (Destination)
            </label>
            <select
              id="to-city"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="form-control"
              required
            >
              {CITIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* DEPARTURE DATE */}
          <div className="form-group">
            <label htmlFor="depart-date">
              <Calendar className="field-icon" /> Departure Date
            </label>
            <input
              type="date"
              id="depart-date"
              value={departDate}
              min={todayStr}
              onChange={(e) => setDepartDate(e.target.value)}
              className="form-control"
              required
            />
          </div>

          {/* RETURN DATE (If Round Trip) */}
          {tripType === 'round-trip' && (
            <div className="form-group animate-fade-in">
              <label htmlFor="return-date">
                <Calendar className="field-icon" /> Return Date
              </label>
              <input
                type="date"
                id="return-date"
                value={returnDate}
                min={departDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="form-control"
                required
              />
            </div>
          )}

          {/* PASSENGERS & CLASS */}
          <div className="form-group">
            <label htmlFor="passengers">
              <Users className="field-icon" /> Passengers & Class
            </label>
            <div className="multi-field-row">
              <select
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="form-control"
              >
                <option value={1}>1 Passenger</option>
                <option value={2}>2 Passengers</option>
                <option value={3}>3 Passengers</option>
                <option value={4}>4 Passengers</option>
              </select>

              <select
                id="cabin-class"
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="form-control"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First Class</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-submit-row">
          <button type="submit" className="btn btn-primary btn-lg btn-search-submit">
            <Search className="btn-icon" /> Search Available Flights
          </button>
        </div>
      </form>
    </div>
  );
}
