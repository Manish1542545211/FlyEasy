import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FlightSearchForm({ initialValues = {} }) {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState('roundtrip');
  const [from, setFrom] = useState(initialValues.from || '');
  const [to, setTo] = useState(initialValues.to || '');
  const [departureDate, setDepartureDate] = useState(
    initialValues.departureDate || new Date().toISOString().split('T')[0]
  );
  const [returnDate, setReturnDate] = useState(initialValues.returnDate || '');
  const [passengers, setPassengers] = useState(initialValues.passengers || 1);

  const [errors, setErrors] = useState({});

  const cities = [
    { city: 'Delhi', code: 'DEL' },
    { city: 'Mumbai', code: 'BOM' },
    { city: 'Bangalore', code: 'BLR' },
    { city: 'Goa', code: 'GOI' },
    { city: 'Chennai', code: 'MAA' },
    { city: 'Kolkata', code: 'CCU' },
    { city: 'Hyderabad', code: 'HYD' }
  ];

  const handleSwapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const validate = () => {
    const newErrors = {};

    if (from && to && from.trim().toLowerCase() === to.trim().toLowerCase()) {
      newErrors.to = 'Destination city must be different from departure city.';
    }

    if (!passengers || Number(passengers) < 1) {
      newErrors.passengers = 'Number of passengers must be at least 1.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const searchParams = new URLSearchParams();
      if (from) searchParams.append('from', from.trim());
      if (to) searchParams.append('to', to.trim());
      if (departureDate) searchParams.append('departureDate', departureDate);
      if (tripType === 'roundtrip' && returnDate) {
        searchParams.append('returnDate', returnDate);
      }
      searchParams.append('passengers', passengers.toString());

      navigate(`/flights?${searchParams.toString()}`);
    }
  };

  return (
    <div className="search-card" id="flight-search-container">
      {/* Header & Trip Type Toggle */}
      <div className="search-card-header">
        <h2 className="search-heading">Find Your Flight</h2>
        <div className="trip-type-selector" role="radiogroup" aria-label="Trip Type">
          <button
            type="button"
            className={`trip-type-btn ${tripType === 'roundtrip' ? 'active' : ''}`}
            onClick={() => setTripType('roundtrip')}
          >
            Round Trip
          </button>
          <button
            type="button"
            className={`trip-type-btn ${tripType === 'oneway' ? 'active' : ''}`}
            onClick={() => {
              setTripType('oneway');
              setReturnDate('');
            }}
          >
            One Way
          </button>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="form-error-banner" role="alert">
          Please correct the highlighted fields before searching.
        </div>
      )}

      <form onSubmit={handleSubmit} className="search-form" id="search-flights-form">
        {/* Row 1: Route Selection (From -> Swap -> To) */}
        <div className="search-route-row">
          <div className="form-group route-field">
            <label htmlFor="search-from" className="form-label">
              <svg className="label-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 19h19" />
                <path d="M6 12l4-7 4 3 6-2 1 2-4 3 3 5-2 1-4-4-5 1-1-2" />
              </svg>
              From
            </label>
            <div className="select-wrapper">
              <select
                id="search-from"
                name="from"
                className={`form-input form-select ${errors.from ? 'input-error' : ''}`}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <option value="">All Departure Cities</option>
                {cities.map(({ city, code }) => (
                  <option key={`from-${code}`} value={city}>
                    {city} ({code})
                  </option>
                ))}
              </select>
            </div>
            {errors.from && <span className="form-error">{errors.from}</span>}
          </div>

          <button
            type="button"
            className="swap-cities-btn"
            onClick={handleSwapCities}
            title="Swap Departure and Destination"
            aria-label="Swap departure and destination cities"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16V4M7 4L3 8M7 4L11 8" />
              <path d="M17 8V20M17 20L21 16M17 20L13 16" />
            </svg>
          </button>

          <div className="form-group route-field">
            <label htmlFor="search-to" className="form-label">
              <svg className="label-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 19h19" />
                <path d="M19 12l-4 7-4-3-6 2-1-2 4-3-3-5 2-1 4 4 5-1 1 2" />
              </svg>
              To
            </label>
            <div className="select-wrapper">
              <select
                id="search-to"
                name="to"
                className={`form-input form-select ${errors.to ? 'input-error' : ''}`}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <option value="">All Destination Cities</option>
                {cities.map(({ city, code }) => (
                  <option key={`to-${code}`} value={city}>
                    {city} ({code})
                  </option>
                ))}
              </select>
            </div>
            {errors.to && <span className="form-error">{errors.to}</span>}
          </div>
        </div>

        {/* Row 2: Dates & Passengers */}
        <div className="search-details-row">
          {/* Departure Date */}
          <div className="form-group">
            <label htmlFor="search-departure-date" className="form-label">
              <svg className="label-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Departure
            </label>
            <input
              type="date"
              id="search-departure-date"
              name="departureDate"
              className={`form-input ${errors.departureDate ? 'input-error' : ''}`}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            {errors.departureDate && (
              <span className="form-error">{errors.departureDate}</span>
            )}
          </div>

          {/* Return Date */}
          <div className="form-group">
            <label htmlFor="search-return-date" className="form-label">
              <svg className="label-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Return{' '}
              {tripType === 'oneway' ? (
                <span className="label-disabled">(Disabled)</span>
              ) : (
                <span className="label-optional">(Optional)</span>
              )}
            </label>
            <input
              type="date"
              id="search-return-date"
              name="returnDate"
              className="form-input"
              value={returnDate}
              disabled={tripType === 'oneway'}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Passengers */}
          <div className="form-group">
            <label htmlFor="search-passengers" className="form-label">
              <svg className="label-icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Passengers
            </label>
            <input
              type="number"
              id="search-passengers"
              name="passengers"
              min="1"
              max="10"
              className={`form-input ${errors.passengers ? 'input-error' : ''}`}
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
            {errors.passengers && (
              <span className="form-error">{errors.passengers}</span>
            )}
          </div>
        </div>

        {/* Row 3: Action Button inside Card */}
        <div className="search-action-row">
          <button type="submit" className="search-submit-btn" id="search-flights-btn">
            <svg className="btn-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search Flights</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default FlightSearchForm;
