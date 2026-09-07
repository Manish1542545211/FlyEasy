// Course Topic 37-42: React Router 404 Pages & Catch-all (*) Routes

import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-page animate-fade-in">
      <div className="not-found-card glass-panel text-center">
        <div className="plane-cloud-visual">
          <Plane className="lost-plane" />
          <span className="error-code">404</span>
        </div>

        <h1>Flight Off-Track!</h1>
        <p className="not-found-text">
          The flight route or destination page you are looking for has entered an unknown turbulence zone.
        </p>

        <div className="actions-row">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Return to Home Page
          </Link>
          <Link to="/book" className="btn btn-secondary btn-lg">
            <Compass size={18} /> Search Flights
          </Link>
        </div>
      </div>
    </div>
  );
}
