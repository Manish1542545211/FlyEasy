import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function SeatSelection() {
  const { id } = useParams();

  return (
    <PageContainer>
      <section className="placeholder-page" id="seat-selection-page">
        <h1 className="placeholder-title">Seat Selection</h1>
        <p className="placeholder-description">
          Choose a seat for your selected flight.
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

export default SeatSelection;
