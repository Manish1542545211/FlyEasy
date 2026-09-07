// Course Topic 19-24 & 31-36: Controlled Forms, Event Handling, React Router Navigation

import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlightSearchForm from '../components/flight/FlightSearchForm';
import { Sparkles } from 'lucide-react';

export default function BookPage() {
  const navigate = useNavigate();

  // On search submit, navigate to /results with all params in the URL
  const handleSearchSubmit = (params) => {
    const qs = new URLSearchParams({
      from: params.from,
      to: params.to,
      departDate: params.departDate,
      passengers: params.passengers,
      cabinClass: params.cabinClass,
    }).toString();
    navigate(`/results?${qs}`);
  };

  // Quick route chips also navigate to results page immediately
  const handleQuickRoute = (fromCode, toCode) => {
    const qs = new URLSearchParams({
      from: fromCode,
      to: toCode,
      departDate: new Date().toISOString().split('T')[0],
      passengers: 1,
      cabinClass: 'Economy',
    }).toString();
    navigate(`/results?${qs}`);
  };

  return (
    <div className="book-page animate-fade-in">
      <div className="page-banner glass-panel">
        <div className="banner-container">
          <div className="banner-text">
            <span className="kicker">Flight Reservation Center</span>
            <h1>Search Flights</h1>
            <p>Enter your route and travel details to find available flights</p>
          </div>
        </div>
      </div>

      <div className="book-container">
        {/* Quick Popular Route Chips */}
        <div className="quick-routes-bar glass-panel">
          <span className="quick-routes-label"><Sparkles size={14} /> Popular Routes:</span>
          <div className="chips-wrap">
            <button className="chip-btn" onClick={() => handleQuickRoute('DEL', 'BOM')}>
              Delhi (DEL) ➔ Mumbai (BOM)
            </button>
            <button className="chip-btn" onClick={() => handleQuickRoute('BOM', 'DEL')}>
              Mumbai (BOM) ➔ Delhi (DEL)
            </button>
            <button className="chip-btn" onClick={() => handleQuickRoute('DEL', 'BLR')}>
              Delhi (DEL) ➔ Bangalore (BLR)
            </button>
            <button className="chip-btn" onClick={() => handleQuickRoute('BLR', 'DEL')}>
              Bangalore (BLR) ➔ Delhi (DEL)
            </button>
            <button className="chip-btn" onClick={() => handleQuickRoute('BOM', 'BLR')}>
              Mumbai (BOM) ➔ Bangalore (BLR)
            </button>
            <button className="chip-btn" onClick={() => handleQuickRoute('BLR', 'BOM')}>
              Bangalore (BLR) ➔ Mumbai (BOM)
            </button>
          </div>
        </div>

        {/* Search Form — submitting navigates to /results */}
        <div className="book-search-wrap">
          <FlightSearchForm onSearch={handleSearchSubmit} />
        </div>
      </div>
    </div>
  );
}
