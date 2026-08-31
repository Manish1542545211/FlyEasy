# FlyEasy

**Simple. Clear. Ready to Fly.**

FlyEasy is an airline reservation platform designed to simplify the process of searching, comparing, selecting, and managing flights.

## Current Stage — Skeleton

This is the **Evaluation 1 Skeleton** — the common foundation for the four-person team.

The skeleton establishes:

- Project structure (Vite + React)
- Components (Navbar, Footer, ModuleCard, PageContainer)
- Pages (Home + 8 module placeholders + 404)
- Navigation and Routing (React Router)
- Responsive CSS (Grid + Flexbox + Media Queries)

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
FlyEasy/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ModuleCard.jsx
│   │   └── PageContainer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── Flights.jsx
│   │   ├── FlightDetails.jsx
│   │   ├── SeatSelection.jsx
│   │   ├── PassengerDetails.jsx
│   │   ├── Confirmation.jsx
│   │   ├── MyBookings.jsx
│   │   └── NotFound.jsx
│   ├── data/
│   │   └── modules.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── README.md
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/search` | Flight Search |
| `/flights` | Flight Results |
| `/flights/:id` | Flight Details (dynamic) |
| `/seat-selection/:id` | Seat Selection (dynamic) |
| `/passenger-details` | Passenger Details |
| `/confirmation/:id` | Booking Confirmation (dynamic) |
| `/my-bookings` | My Bookings |
| `*` | 404 Not Found |

## Team Module Ownership (Phase 2)

| Member | Modules |
|--------|---------|
| Member 1 | Module 1 (Flight Search) + Module 2 (Flight Results) |
| Member 2 | Module 3 (Flight Details) + Module 4 (Seat Selection) |
| Member 3 | Module 5 (Passenger Details) + Module 6 (Booking Confirmation) |
| Member 4 | Module 7 (My Bookings) + Module 8 (Navigation & Routing) |

## Technologies

- React (Vite)
- JavaScript / JSX
- CSS3 (Vanilla)
- React Router
