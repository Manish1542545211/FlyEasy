// Header: React Router Navigation (NavLink, useNavigate) & HTML5 Header/Nav

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plane, Bookmark, Menu, X, ArrowRight } from 'lucide-react';

export default function Header({ bookingCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookFlightClick = () => {
    setMobileMenuOpen(false);
    navigate('/book');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo */}
        <NavLink to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-icon-wrap">
            <Plane className="logo-icon" />
          </div>
          <span className="logo-text">FlyEasy<span className="logo-accent">.</span></span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            end
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/bookings" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <Bookmark className="nav-icon-sm" />
            My Bookings
            {bookingCount > 0 && (
              <span className="badge-count">{bookingCount}</span>
            )}
          </NavLink>
        </nav>

        {/* Action Call To Action Button */}
        <div className="header-actions">
          <button 
            className="btn btn-primary btn-header-cta"
            onClick={handleBookFlightClick}
            id="book-flight-header-btn"
          >
            <Plane className="btn-icon-plane" />
            <span>Book Flight</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-slide-down">
          <nav className="mobile-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/bookings" 
              className={({ isActive }) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Bookings ({bookingCount})
            </NavLink>
            <button 
              className="btn btn-primary btn-full"
              onClick={handleBookFlightClick}
            >
              Book Flight Now <ArrowRight size={16} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
