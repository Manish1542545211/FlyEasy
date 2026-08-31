import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function FlightDetails() {
  const { id } = useParams();

  return (
    <PageContainer>
      <section className="placeholder-page" id="flight-details-page">
        <h1 className="placeholder-title">Flight Details</h1>
        <p className="placeholder-description">
          View complete information about a selected flight.
        </p>
        <p className="placeholder-param">
          Flight ID: <strong>{id}</strong>
        </p>
        <div className="placeholder-notice">
          <p>Module under development.</p>
        </div>
        <Link to="/" className="placeholder-home-link">Home</Link>
      </section>
    </PageContainer>
  );
}

export default FlightDetails;
