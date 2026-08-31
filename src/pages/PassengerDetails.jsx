import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function PassengerDetails() {
  return (
    <PageContainer>
      <section className="placeholder-page" id="passenger-details-page">
        <h1 className="placeholder-title">Passenger Details</h1>
        <p className="placeholder-description">
          Enter passenger information.
        </p>
        <div className="placeholder-notice">
          <p>Module under development.</p>
        </div>
        <Link to="/" className="placeholder-home-link">Home</Link>
      </section>
    </PageContainer>
  );
}

export default PassengerDetails;
