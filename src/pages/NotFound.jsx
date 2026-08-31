import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

function NotFound() {
  return (
    <PageContainer>
      <section className="placeholder-page not-found-page" id="not-found-page">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-message">Page Not Found</p>
        <p className="placeholder-description">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="placeholder-home-link">Back to Home</Link>
      </section>
    </PageContainer>
  );
}

export default NotFound;
