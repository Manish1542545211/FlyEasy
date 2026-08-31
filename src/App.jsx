import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Flights from './pages/Flights';
import FlightDetails from './pages/FlightDetails';
import SeatSelection from './pages/SeatSelection';
import PassengerDetails from './pages/PassengerDetails';
import Confirmation from './pages/Confirmation';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/flights/:id" element={<FlightDetails />} />
            <Route path="/seat-selection/:id" element={<SeatSelection />} />
            <Route path="/passenger-details" element={<PassengerDetails />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
