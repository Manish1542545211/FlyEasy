import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function Confirmation() {
  const { id } = useParams();

  return (
    <PageContainer>
      <section className="placeholder-page" id="confirmation-page">
        <h1 className="placeholder-title">Booking Confirmation</h1>
        <p className="placeholder-description">
          Review and confirm your reservation.
        </p>
        <p className="placeholder-param">
          Booking ID: <strong>{id}</strong>
        </p>
        <div className="placeholder-notice">
          <p>Module under development.</p>
        </div>
        <Link to="/" className="placeholder-home-link">Home</Link>
      </section>
    </PageContainer>
  );
}

export default Confirmation;
