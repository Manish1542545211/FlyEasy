import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function Search() {
  return (
    <PageContainer>
      <section className="placeholder-page" id="search-page">
        <h1 className="placeholder-title">Flight Search</h1>
        <p className="placeholder-description">
          Search for available flights.
        </p>
        <div className="placeholder-notice">
          <p>Module under development.</p>
        </div>
        <Link to="/" className="placeholder-home-link">Home</Link>
      </section>
    </PageContainer>
  );
}

export default Search;
