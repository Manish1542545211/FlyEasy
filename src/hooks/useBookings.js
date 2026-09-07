// Course Topic 31-36: Custom Hooks, useState, useEffect & Browser Storage (LocalStorage + JSON)

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'flyeasy_user_bookings';

export function useBookings() {
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse bookings from localStorage', e);
    }
    // Default sample booking formatted in Indian terms
    return [
      {
        id: 'BK-789012',
        flightId: 'FE-101',
        airline: 'IndiGo Express',
        flightNumber: '6E-2041',
        from: 'DEL',
        fromCity: 'New Delhi',
        to: 'BOM',
        toCity: 'Mumbai',
        departureTime: '06:15 AM',
        arrivalTime: '08:30 AM',
        date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        passengerName: 'Aarav Sharma',
        passengerEmail: 'aarav.sharma@student.edu.in',
        passengerPhone: '+91 98765 43210',
        seatNumber: '14B',
        cabinClass: 'Economy',
        price: 4850,
        gate: 'T3 - 15B',
        status: 'Confirmed',
        bookedAt: new Date().toISOString(),
      }
    ];
  });

  // Sync with LocalStorage whenever bookings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  // Add booking
  const addBooking = (newBookingData) => {
    const bookingId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
    const seats = ['12A', '14B', '18C', '21F', '08D', '11C'];
    const randomSeat = seats[Math.floor(Math.random() * seats.length)];
    const gates = ['T3 - Gate 12', 'T2 - Gate 08', 'T1 - Gate 04', 'T3 - Gate 15B'];
    const randomGate = gates[Math.floor(Math.random() * gates.length)];

    const createdBooking = {
      id: bookingId,
      ...newBookingData,
      seatNumber: randomSeat,
      gate: randomGate,
      status: 'Confirmed',
      bookedAt: new Date().toISOString(),
    };

    setBookings((prev) => [createdBooking, ...prev]);
    return createdBooking;
  };

  // Cancel booking
  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
  };

  // Find booking by ID
  const getBookingById = (id) => {
    return bookings.find((b) => b.id === id);
  };

  return {
    bookings,
    addBooking,
    cancelBooking,
    getBookingById,
  };
}
