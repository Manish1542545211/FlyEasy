// Course Topic 25-30: Component Composition, Props, and Conditional Rendering

import React from 'react';
import { Plane, Clock, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function FlightCard({ flight, onSelectFlight }) {
  return (
    <div className="flight-card glass-panel hover-lift">
      <div className="flight-card-header">
        <div className="airline-info">
          <span className="airline-logo">{flight.logo || '✈️'}</span>
          <div>
            <h3 className="airline-name">{flight.airline}</h3>
            <span className="flight-num">{flight.flightNumber} • {flight.aircraft}</span>
          </div>
        </div>

        <div className="flight-stops-badge">
          {flight.stops}
        </div>
      </div>

      <div className="flight-card-body">
        {/* Departure */}
        <div className="time-block departure">
          <span className="time-large">{flight.departureTime}</span>
          <span className="city-code">{flight.from}</span>
          <span className="city-name">{flight.fromCity}</span>
        </div>

        {/* Flight Route Line Graphic */}
        <div className="route-visual">
          <span className="duration-text"><Clock size={12} /> {flight.duration}</span>
          <div className="route-line-wrap">
            <div className="route-dot start"></div>
            <div className="route-line">
              <Plane className="plane-on-line" />
            </div>
            <div className="route-dot end"></div>
          </div>
          <span className="route-type-label">Direct Skyway</span>
        </div>

        {/* Arrival */}
        <div className="time-block arrival">
          <span className="time-large">{flight.arrivalTime}</span>
          <span className="city-code">{flight.to}</span>
          <span className="city-name">{flight.toCity}</span>
        </div>

        {/* Price & Action */}
        <div className="price-action-block">
          <div className="price-tag">
            <span className="price-curr">₹</span>
            <span className="price-val">{flight.price}</span>
            <span className="price-per">/ seat</span>
          </div>

          <span className="seats-tag">
            <UserCheck size={12} /> {flight.seatsAvailable} seats left
          </span>

          <button
            className="btn btn-primary btn-select-flight"
            onClick={() => onSelectFlight(flight)}
          >
            Select Flight <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
