import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function Flights() {
  return (
    <PageContainer>
      <section className="placeholder-page" id="flights-page">
        <h1 className="placeholder-title">Flight Results</h1>
        <p className="placeholder-description">
          View and compare available flights.
        </p>
        <div className="placeholder-notice">
          <p>Module under development.</p>
        </div>
        <Link to="/" className="placeholder-home-link">Home</Link>
      </section>
    </PageContainer>
  );
}

export default Flights;
