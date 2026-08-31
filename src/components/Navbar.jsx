import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          FlyEasy
        </Link>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          id="navbar-toggle-btn"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/search" onClick={closeMenu}>Search</NavLink>
          </li>
          <li>
            <NavLink to="/flights" onClick={closeMenu}>Flights</NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings" onClick={closeMenu}>My Bookings</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
