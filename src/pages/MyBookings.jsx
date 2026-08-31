import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function MyBookings() {
  return (
    <PageContainer>
      <section className="placeholder-page" id="my-bookings-page">
        <h1 className="placeholder-title">My Bookings</h1>
        <p className="placeholder-description">
          View your saved reservations.
        </p>
        <div className="placeholder-notice">
          <p>Module under development.</p>
        </div>
        <Link to="/" className="placeholder-home-link">Home</Link>
      </section>
    </PageContainer>
  );
}

export default MyBookings;
