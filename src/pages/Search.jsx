import PageContainer from '../components/PageContainer';
import FlightSearchForm from '../components/FlightSearchForm';

function Search() {
  return (
    <PageContainer>
      <section className="search-page-section" id="search-page">
        <div className="page-header">
          <h1 className="page-title">Flight Search</h1>
          <p className="page-description">
            Search for available flights by entering your travel details below.
          </p>
        </div>
        
        <FlightSearchForm />
      </section>
    </PageContainer>
  );
}

export default Search;
