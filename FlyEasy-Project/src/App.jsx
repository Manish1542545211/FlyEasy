// Course Topics 25-30, 31-36 & 37-42: Component Hierarchy, Custom Hooks & React Router Setup

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import { useBookings } from './hooks/useBookings';

export default function App() {
  const { bookings, addBooking, cancelBooking, getBookingById } = useBookings();

  return (
    <div className="app-wrapper">
      {/* Header with nav and booking counter */}
      <Header bookingCount={bookings.length} />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/book" 
            element={<BookPage addBooking={addBooking} />} 
          />
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
