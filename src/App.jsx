// Course Topics 25-30, 31-36 & 37-42: Component Hierarchy, Custom Hooks & React Router Setup

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import FlightResultsPage from './pages/FlightResultsPage';
import FlightDetailsPage from './pages/FlightDetailsPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import { useBookings } from './hooks/useBookings';

export default function App() {
  const { bookings, cancelBooking, getBookingById } = useBookings();

  return (
    <div className="app-wrapper">
      {/* Header with nav and booking counter */}
      <Header bookingCount={bookings.length} />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
          {/* Module 2: Flight Results (separate screen) */}
          <Route path="/results" element={<FlightResultsPage />} />
          {/* Module 3: Flight Details */}
          <Route path="/flights/:id" element={<FlightDetailsPage />} />
          <Route 
            path="/bookings" 
            element={<MyBookingsPage bookings={bookings} cancelBooking={cancelBooking} />} 
          />
          <Route 
            path="/bookings/:id" 
            element={<BookingDetailsPage getBookingById={getBookingById} cancelBooking={cancelBooking} />} 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
