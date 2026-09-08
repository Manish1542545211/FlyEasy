// Home Page: Semantic HTML5, JSX Composition, Props & Interactive Elements

import { useNavigate } from 'react-router-dom';
import { Plane, Sparkles, ShieldCheck, Zap, ArrowRight, Star } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const handleBookFlightClick = () => {
    navigate('/book');
  };

  return (
    <div className="home-page animate-fade-in">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content-container">
          <div className="hero-badge animate-slide-down">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Elevate Your Sky Journeys</span>
          </div>

          <h1 className="hero-title animate-slide-up">
            FlyEasy <span className="gradient-text">Airlines</span>
          </h1>

          <p className="hero-subtitle animate-slide-up delay-1">
            Where luxury, speed, and effortless flight booking meet. Experience seamless domestic & international flights across India with instant electronic boarding passes.
          </p>

          <div className="hero-cta-wrap animate-slide-up delay-2">
            <button 
              className="btn btn-primary btn-hero-center"
              onClick={handleBookFlightClick}
              id="book-flight-center-hero-btn"
            >
              <Plane className="btn-icon-plane" />
              <span>Book Flight</span>
              <ArrowRight size={18} className="arrow-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* WHY FLYEASY FEATURES */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Fly With Us</h2>
            <p className="section-subtitle">Designed for smooth travel, effortless booking, and ultimate comfort</p>
          </div>

          <div className="features-grid">
            <div className="feature-card glass-panel hover-lift">
              <div className="feature-icon-wrap blue">
                <Zap size={24} />
              </div>
              <h3>Instant Booking Speed</h3>
              <p>Reserve your seat in under 60 seconds with zero hidden fees and instant mobile boarding passes.</p>
            </div>

            <div className="feature-card glass-panel hover-lift">
              <div className="feature-icon-wrap gold">
                <ShieldCheck size={24} />
              </div>
              <h3>Flexi Cancellation</h3>
              <p>Free change of travel date or seamless one-click cancellation straight from your My Bookings dashboard.</p>
            </div>

            <div className="feature-card glass-panel hover-lift">
              <div className="feature-icon-wrap green">
                <Star size={24} />
              </div>
              <h3>Premium Cabin Comfort</h3>
              <p>Enjoy extra legroom, high-speed onboard WiFi, and complimentary gourmet dining on all flights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner-section">
        <div className="section-container">
          <div className="cta-banner glass-panel">
            <div className="cta-content">
              <h2>Ready to take off into the skies?</h2>
              <p>Book your domestic & international tickets today with zero extra convenience fee.</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleBookFlightClick}>
              <Plane size={18} /> Book Your Flight Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
