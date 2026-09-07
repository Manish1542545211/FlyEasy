# FlyEasy Airlines ✈️

> **Where luxury, speed, and effortless flight booking meet.**

FlyEasy is a modern React web application for domestic and international flight search, seat reservation, and instant electronic boarding pass generation.

---

## 🚀 Features

- **Modern Airline UI**: Built with responsive layouts, glassmorphism effects, and Lucide React icons.
- **Instant Flight Search**: Search domestic & international flights by origin, destination, travel date, passengers, and class.
- **Interactive Booking Flow**: Modal booking confirmation with seat and passenger details.
- **Boarding Pass Generator**: Realistic electronic boarding pass complete with barcode, gate info, and flight metadata.
- **My Bookings Dashboard**: Manage active trips, view boarding passes, or perform one-click ticket cancellations with persistent state.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS3 custom properties, glassmorphism, responsive flex/grid)

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173`

### 3. Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```text
FlyEasy-main/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BoardingPassCard.jsx    # Electronic boarding pass view
│   │   ├── BookingModal.jsx        # Booking confirmation modal
│   │   ├── FlightCard.jsx          # Individual flight summary card
│   │   ├── FlightSearchForm.jsx    # Origin/Destination search filter
│   │   ├── Footer.jsx              # Application footer
│   │   └── Header.jsx              # Navigation header with booking counter
│   ├── data/
│   │   └── mockFlights.js          # Mock airline flight dataset
│   ├── hooks/
│   │   └── useBookings.js          # Custom React hook managing booking state
│   ├── pages/
│   │   ├── HomePage.jsx            # Landing page with hero & features
│   │   ├── BookPage.jsx            # Flight search and booking page
│   │   ├── MyBookingsPage.jsx      # User bookings and management
│   │   ├── BookingDetailsPage.jsx  # Boarding pass details view
│   │   └── NotFoundPage.jsx        # 404 page
│   ├── App.jsx                     # Route configurations
│   ├── index.css                   # Core design system & component styles
│   └── main.jsx                    # Application entrypoint
├── index.html
├── package.json
└── vite.config.js
```
