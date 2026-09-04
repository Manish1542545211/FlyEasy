import ModuleCard from '../components/ModuleCard';
import modules from '../data/modules';
import FlightSearchForm from '../components/FlightSearchForm';

function Home() {
  return (
    <>
      {/* Hero Section with Search Form */}
      <section className="hero" id="hero-section">
        <div className="hero-inner">
          <h1 className="hero-title">FlyEasy</h1>
          <p className="hero-tagline">Simple. Clear. Ready to Fly.</p>
          <p className="hero-description">
            An airline reservation platform designed to simplify the flight booking process.
          </p>

          <FlightSearchForm />
        </div>
      </section>

      {/* Project Description */}
      <section className="about-section" id="about-section">
        <div className="about-inner">
          <h2 className="section-title">About FlyEasy</h2>
          <p className="about-text">
            FlyEasy is an airline reservation platform designed to simplify the
            process of searching, comparing, selecting, and managing flights.
          </p>
        </div>
      </section>

      {/* Booking Workflow */}
      <section className="workflow-section" id="workflow-section">
        <div className="workflow-inner">
          <h2 className="section-title">How It Works</h2>
          <div className="workflow-steps">
            <div className="workflow-step">
              <span className="workflow-icon">🔍</span>
              <span className="workflow-label">Search</span>
            </div>
            <span className="workflow-arrow" aria-hidden="true">→</span>
            <div className="workflow-step">
              <span className="workflow-icon">⚖️</span>
              <span className="workflow-label">Compare</span>
            </div>
            <span className="workflow-arrow" aria-hidden="true">→</span>
            <div className="workflow-step">
              <span className="workflow-icon">✅</span>
              <span className="workflow-label">Select</span>
            </div>
            <span className="workflow-arrow" aria-hidden="true">→</span>
            <div className="workflow-step">
              <span className="workflow-icon">📋</span>
              <span className="workflow-label">Book</span>
            </div>
            <span className="workflow-arrow" aria-hidden="true">→</span>
            <div className="workflow-step">
              <span className="workflow-icon">📂</span>
              <span className="workflow-label">Manage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Module Cards */}
      <section className="modules-section" id="modules-section">
        <div className="modules-inner">
          <h2 className="section-title">Our Project Modules</h2>
          <p className="modules-subtitle">
            The FlyEasy reservation system is divided into eight major modules.
          </p>
          <div className="modules-grid">
            {modules.map((mod) => (
              <ModuleCard key={mod.id} module={mod} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
