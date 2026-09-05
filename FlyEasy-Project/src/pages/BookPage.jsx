// Course Topic 31-36: useMemo Optimization, Custom Hooks, Conditional Rendering, React Router URL Params

import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { INITIAL_FLIGHTS, CITIES } from '../data/mockFlights';
import FlightSearchForm from '../components/FlightSearchForm';
import FlightCard from '../components/FlightCard';
import BookingModal from '../components/BookingModal';
import { Plane, Filter, SlidersHorizontal, Compass, Sparkles } from 'lucide-react';

export default function BookPage({ addBooking }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Default to popular route DEL ➔ BOM if unspecified
  const initialFrom = searchParams.get('from') || 'DEL';
  const initialTo = searchParams.get('to') || 'BOM';

  const [activeSearchParams, setActiveSearchParams] = useState({
    from: initialFrom,
    to: initialTo,
    departDate: searchParams.get('departDate') || new Date().toISOString().split('T')[0],
    passengers: Number(searchParams.get('passengers')) || 1,
    cabinClass: searchParams.get('cabinClass') || 'Economy',
  });

  const [selectedFlightForBooking, setSelectedFlightForBooking] = useState(null);
  const [filterStops, setFilterStops] = useState('ALL'); // 'ALL' | 'NONSTOP'
  const [sortBy, setSortBy] = useState('PRICE_LOW'); // 'PRICE_LOW' | 'PRICE_HIGH'

  const handleSearchSubmit = (params) => {
    setActiveSearchParams(params);
    setSearchParams({
      from: params.from,
      to: params.to,
      departDate: params.departDate,
      passengers: params.passengers,
      cabinClass: params.cabinClass,
    });
  };

  const handleQuickRouteSelect = (fromCode, toCode) => {
    handleSearchSubmit({
      ...activeSearchParams,
      from: fromCode,
      to: toCode,
    });
  };

  // Course Topic 31-36: useMemo optimization for filtering and sorting
  const matchingFlights = useMemo(() => {
    return INITIAL_FLIGHTS.filter((flight) => {
      const matchesFrom = flight.from === activeSearchParams.from;
      const matchesTo = flight.to === activeSearchParams.to;

      if (filterStops === 'NONSTOP' && flight.stops !== 'Non-stop') {
        return false;
      }
      return matchesFrom && matchesTo;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.price - b.price;
      if (sortBy === 'PRICE_HIGH') return b.price - a.price;
      return 0;
    });
  }, [activeSearchParams, filterStops, sortBy]);

  // Fallback to all flights if no exact route match found
  const displayFlights = matchingFlights.length > 0 ? matchingFlights : INITIAL_FLIGHTS;
  const isShowingAllFallback = matchingFlights.length === 0;

  // Handle booking confirmation
  const handleBookingConfirm = (bookingData) => {
    const created = addBooking(bookingData);
    setSelectedFlightForBooking(null);
    navigate(`/bookings/${created.id}`);
  };

  const originCityObj = CITIES.find((c) => c.code === activeSearchParams.from);
  const destCityObj = CITIES.find((c) => c.code === activeSearchParams.to);

  return (
    <div className="book-page animate-fade-in">
      <div className="page-banner glass-panel">
        <div className="banner-container">
          <div className="banner-text">
            <span className="kicker">Flight Reservation Center</span>
            <h1>Book Your Flight</h1>
            <p>Select dates and route to view live flight options across India</p>
          </div>
        </div>
      </div>

      <div className="book-container">
        {/* Quick Popular Route Chips */}
        <div className="quick-routes-bar glass-panel">
          <span className="quick-routes-label"><Sparkles size={14} /> Quick Demo Routes:</span>
          <div className="chips-wrap">
            <button 
              className={`chip-btn ${activeSearchParams.from === 'DEL' && activeSearchParams.to === 'BOM' ? 'active' : ''}`}
              onClick={() => handleQuickRouteSelect('DEL', 'BOM')}
            >
              Delhi (DEL) ➔ Mumbai (BOM)
            </button>
            <button 
              className={`chip-btn ${activeSearchParams.from === 'BOM' && activeSearchParams.to === 'BLR' ? 'active' : ''}`}
              onClick={() => handleQuickRouteSelect('BOM', 'BLR')}
            >
              Mumbai (BOM) ➔ Bengaluru (BLR)
            </button>
            <button 
              className={`chip-btn ${activeSearchParams.from === 'DEL' && activeSearchParams.to === 'GOI' ? 'active' : ''}`}
              onClick={() => handleQuickRouteSelect('DEL', 'GOI')}
            >
              Delhi (DEL) ➔ Goa (GOI)
            </button>
            <button 
              className={`chip-btn ${activeSearchParams.from === 'DEL' && activeSearchParams.to === 'DXB' ? 'active' : ''}`}
              onClick={() => handleQuickRouteSelect('DEL', 'DXB')}
            >
              Delhi (DEL) ➔ Dubai (DXB)
            </button>
          </div>
        </div>

        {/* Search Form Wrapper */}
        <div className="book-search-wrap">
          <FlightSearchForm 
            onSearch={handleSearchSubmit} 
            initialFrom={activeSearchParams.from}
            initialTo={activeSearchParams.to}
          />
        </div>

        {/* Results Controls Bar */}
        <div className="results-header-bar glass-panel">
          <div className="results-count">
            <Plane size={18} className="plane-icon" />
            <span>
              {isShowingAllFallback ? (
                <span>Showing All <strong>{displayFlights.length}</strong> Flight Schedules across India</span>
              ) : (
                <span><strong>{displayFlights.length}</strong> Direct Flight(s) for <strong>{originCityObj?.city || activeSearchParams.from} ➔ {destCityObj?.city || activeSearchParams.to}</strong></span>
              )}
            </span>
          </div>

          <div className="filter-controls">
            <div className="control-item">
              <label htmlFor="stops-filter"><SlidersHorizontal size={14} /> Stops:</label>
              <select 
                id="stops-filter"
                value={filterStops}
                onChange={(e) => setFilterStops(e.target.value)}
                className="select-sm"
              >
                <option value="ALL">All Flights</option>
                <option value="NONSTOP">Non-stop Only</option>
              </select>
            </div>

            <div className="control-item">
              <label htmlFor="sort-by"><Filter size={14} /> Sort By:</label>
              <select 
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-sm"
              >
                <option value="PRICE_LOW">Lowest Price</option>
                <option value="PRICE_HIGH">Highest Price</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Flight List */}
        <div className="flights-list-wrap">
          {displayFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              onSelectFlight={(f) => setSelectedFlightForBooking(f)}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedFlightForBooking && (
        <BookingModal
          flight={selectedFlightForBooking}
          searchParams={activeSearchParams}
          onClose={() => setSelectedFlightForBooking(null)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}
