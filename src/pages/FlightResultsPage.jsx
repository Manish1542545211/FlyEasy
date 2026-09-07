// Module 2: Flight Results — Clean, Simple, Filterable Results Screen

import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { INITIAL_FLIGHTS, CITIES } from '../data/mockFlights';
import FlightCard from '../components/flight/FlightCard';
import {
  Plane, Filter, SlidersHorizontal, MapPin, Calendar,
  Users, Armchair, SearchX, ArrowLeft, ChevronRight
} from 'lucide-react';

export default function FlightResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read search params from the URL (preserved from search page)
  const from = searchParams.get('from') || 'DEL';
  const to = searchParams.get('to') || 'BOM';
  const departDate = searchParams.get('departDate') || new Date().toISOString().split('T')[0];
  const passengers = Number(searchParams.get('passengers')) || 1;
  const cabinClass = searchParams.get('cabinClass') || 'Economy';

  const [filterStops, setFilterStops] = useState('ALL');
  const [sortBy, setSortBy] = useState('CHEAPEST');

  // Filter mock flight data strictly using the selected from and to
  const matchingFlights = useMemo(() => {
    return INITIAL_FLIGHTS.filter((flight) => {
      const matchesRoute = flight.from === from && flight.to === to;
      if (!matchesRoute) return false;
      if (filterStops === 'NONSTOP') return flight.stops === 'Non-stop';
      if (filterStops === '1STOP') return flight.stops === '1 Stop';
      return true;
    }).sort((a, b) => {
      if (sortBy === 'CHEAPEST') return a.price - b.price;
      if (sortBy === 'EXPENSIVE') return b.price - a.price;
      if (sortBy === 'DURATION') {
        const toMins = (d) => {
          const h = parseInt(d) || 0;
          const m = parseInt(d.split('h')[1]) || 0;
          return h * 60 + m;
        };
        return toMins(a.duration) - toMins(b.duration);
      }
      return 0;
    });
  }, [from, to, filterStops, sortBy]);

  // Handle "Select Flight" — navigate to Flight Details (Module 3)
  const handleSelectFlight = (flight) => {
    const qs = new URLSearchParams({
      from,
      to,
      departDate,
      passengers,
      cabinClass,
    }).toString();
    navigate(`/flights/${flight.id}?${qs}`);
  };

  const originCityObj = CITIES.find((c) => c.code === from);
  const destCityObj = CITIES.find((c) => c.code === to);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="results-page animate-fade-in">
      {/* Breadcrumb */}
      <div className="fd-breadcrumb">
        <div className="fd-breadcrumb-inner" style={{ maxWidth: '1100px' }}>
          <button className="fd-back-btn" onClick={() => navigate('/book')}>
            <ArrowLeft size={16} /> Modify Search
          </button>
          <div className="fd-breadcrumb-path">
            <span>Search</span>
            <ChevronRight size={14} />
            <span className="fd-breadcrumb-active">Flight Results</span>
          </div>
        </div>
      </div>

      <div className="book-container">
        {/* Route Summary Banner */}
        <div className="results-route-summary glass-panel">
          <div className="route-summary-main">
            <span className="route-summary-city">
              <MapPin size={15} />
              {originCityObj?.name || from}
            </span>
            <span className="route-summary-arrow">➔</span>
            <span className="route-summary-city">
              <MapPin size={15} />
              {destCityObj?.name || to}
            </span>
          </div>
          <div className="route-summary-meta">
            <span><Calendar size={13} /> {formatDate(departDate)}</span>
            <span><Users size={13} /> {passengers} Passenger{passengers > 1 ? 's' : ''}</span>
            <span><Armchair size={13} /> {cabinClass}</span>
          </div>
        </div>

        {/* Results Controls Bar */}
        <div className="results-header-bar glass-panel">
          <div className="results-count">
            <Plane size={18} className="plane-icon" />
            <span>
              {matchingFlights.length > 0 ? (
                <span>
                  <strong>{matchingFlights.length}</strong> Flight{matchingFlights.length > 1 ? 's' : ''} available for{' '}
                  <strong>{from} ➔ {to}</strong>
                </span>
              ) : (
                <span>No flights found for this route.</span>
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
                <option value="ALL">All</option>
                <option value="NONSTOP">Non-stop</option>
                <option value="1STOP">1 Stop</option>
              </select>
            </div>

            <div className="control-item">
              <label htmlFor="sort-by"><Filter size={14} /> Sort:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-sm"
              >
                <option value="CHEAPEST">Cheapest</option>
                <option value="EXPENSIVE">Most Expensive</option>
                <option value="DURATION">Shortest Duration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Flight Cards or No Results State */}
        <div className="flights-list-wrap">
          {matchingFlights.length > 0 ? (
            matchingFlights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelectFlight={handleSelectFlight}
              />
            ))
          ) : (
            <div className="no-flights-state glass-panel">
              <div className="no-flights-icon"><SearchX size={48} /></div>
              <h3>No flights found for this route.</h3>
              <p>
                No flights are currently available from{' '}
                <strong>{originCityObj?.name || from}</strong> to{' '}
                <strong>{destCityObj?.name || to}</strong> with the selected filters.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('/book')}>
                <ArrowLeft size={16} /> Modify Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
