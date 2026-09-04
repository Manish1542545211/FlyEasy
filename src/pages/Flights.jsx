import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import flights from '../data/flights';

function Flights() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('price-asc');

  const fromParam = searchParams.get('from') || '';
  const toParam = searchParams.get('to') || '';
  const departureDate = searchParams.get('departureDate') || '';
  const passengers = searchParams.get('passengers') || '1';

  const hasSearchParams = Boolean(fromParam || toParam);

  // Filter flights if search parameters exist, otherwise display all mock flights
  const filteredFlights = flights.filter((flight) => {
    if (!hasSearchParams) return true;

    const matchesFrom = fromParam
      ? flight.departure.city.toLowerCase().includes(fromParam.toLowerCase()) ||
        flight.departure.code.toLowerCase().includes(fromParam.toLowerCase())
      : true;

    const matchesTo = toParam
      ? flight.arrival.city.toLowerCase().includes(toParam.toLowerCase()) ||
        flight.arrival.code.toLowerCase().includes(toParam.toLowerCase())
      : true;

    return matchesFrom && matchesTo;
  });

  // Sort flights based on selection
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    const priceA = a.baseFare + a.taxes;
    const priceB = b.baseFare + b.taxes;

    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    return 0;
  });

  // Helper to format currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Helper to format date display
  const formatDateDisplay = (dateString) => {
    if (!dateString) return 'Any Date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <PageContainer>
      <section className="flights-page-section" id="flights-page">
        {/* Header / Route Summary */}
        <div className="results-header-container">
          <div className="results-route-title">
            <h1 className="route-heading">
              {fromParam && toParam ? `${fromParam} → ${toParam}` : 'All Flight Routes'}
            </h1>
            <p className="route-date">
              {formatDateDisplay(departureDate)} • {passengers} {Number(passengers) === 1 ? 'Passenger' : 'Passengers'}
            </p>
          </div>
          {hasSearchParams && (
            <Link to="/search" className="modify-search-link">
              Modify Search
            </Link>
          )}
        </div>

        {/* Results Bar: Count & Sort */}
        <div className="results-meta-bar">
          <span className="results-count">
            <strong>{sortedFlights.length}</strong> {sortedFlights.length === 1 ? 'flight' : 'flights'} found
          </span>

          <div className="sort-container">
            <label htmlFor="sort-select" className="sort-label">
              Sort
            </label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Duration</option>
            </select>
          </div>
        </div>

        {/* Flights List */}
        {sortedFlights.length > 0 ? (
          <div className="flights-list" id="flights-list">
            {sortedFlights.map((flight) => {
              const totalPrice = flight.baseFare + flight.taxes;

              return (
                <div key={flight.id} className="wireframe-flight-card" id={`flight-card-${flight.id}`}>
                  {/* Top Row: Airline & Flight ID */}
                  <div className="card-top-row">
                    <span className="airline-name">{flight.airline}</span>
                    <span className="flight-id-badge">{flight.id}</span>
                  </div>

                  {/* Middle Row: Route & Times */}
                  <div className="card-middle-row">
                    <div className="time-code-block departure">
                      <span className="time-display">{flight.departure.time}</span>
                      <span className="code-display">{flight.departure.code}</span>
                    </div>

                    <div className="route-visual-line">
                      <div className="connecting-line"></div>
                    </div>

                    <div className="time-code-block arrival">
                      <span className="time-display">{flight.arrival.time}</span>
                      <span className="code-display">{flight.arrival.code}</span>
                    </div>
                  </div>

                  {/* Subline: Duration & Stops */}
                  <div className="card-subline">
                    <span>
                      {flight.duration} • {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}
                    </span>
                  </div>

                  {/* Bottom Row: Price & View Details Button */}
                  <div className="card-bottom-row">
                    <div className="price-display-box">
                      <span className="total-price-tag">{formatCurrency(totalPrice)}</span>
                      <span className="tax-breakdown-subtext">
                        ({formatCurrency(flight.baseFare)} + {formatCurrency(flight.taxes)} tax)
                      </span>
                    </div>

                    <Link
                      to={`/flights/${flight.id}`}
                      className="view-details-btn wireframe-btn"
                      id={`view-details-${flight.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-flights-card" id="empty-flights-state">
            <div className="empty-icon">✈</div>
            <h3>No flights available</h3>
            <p>
              We couldn't find any flights matching <strong>{fromParam || 'selected city'}</strong> to{' '}
              <strong>{toParam || 'selected city'}</strong>.
            </p>
            <div className="empty-actions">
              <Link to="/search" className="placeholder-home-link">
                Search Again
              </Link>
              <Link to="/flights" className="clear-filter-link">
                View All Flights
              </Link>
            </div>
          </div>
        )}
      </section>
    </PageContainer>
  );
}

export default Flights;
