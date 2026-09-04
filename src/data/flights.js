const flights = [
  {
    id: "FE102",
    airline: "FlyEasy Airlines",
    departure: {
      city: "Delhi",
      code: "DEL",
      time: "10:30 AM"
    },
    arrival: {
      city: "Mumbai",
      code: "BOM",
      time: "12:40 PM"
    },
    duration: "2h 10m",
    stops: 0,
    baseFare: 5500,
    taxes: 950
  },
  {
    id: "FE205",
    airline: "FlyEasy Express",
    departure: {
      city: "Delhi",
      code: "DEL",
      time: "02:15 PM"
    },
    arrival: {
      city: "Mumbai",
      code: "BOM",
      time: "04:30 PM"
    },
    duration: "2h 15m",
    stops: 0,
    baseFare: 4800,
    taxes: 850
  },
  {
    id: "FE310",
    airline: "FlyEasy Connect",
    departure: {
      city: "Delhi",
      code: "DEL",
      time: "06:00 AM"
    },
    arrival: {
      city: "Bangalore",
      code: "BLR",
      time: "08:45 AM"
    },
    duration: "2h 45m",
    stops: 0,
    baseFare: 6200,
    taxes: 1100
  },
  {
    id: "FE412",
    airline: "FlyEasy Air",
    departure: {
      city: "Mumbai",
      code: "BOM",
      time: "05:20 PM"
    },
    arrival: {
      city: "Goa",
      code: "GOI",
      time: "06:35 PM"
    },
    duration: "1h 15m",
    stops: 0,
    baseFare: 3400,
    taxes: 600
  },
  {
    id: "FE518",
    airline: "FlyEasy Airlines",
    departure: {
      city: "Delhi",
      code: "DEL",
      time: "08:10 PM"
    },
    arrival: {
      city: "Mumbai",
      code: "BOM",
      time: "11:55 PM"
    },
    duration: "3h 45m",
    stops: 1,
    baseFare: 4200,
    taxes: 750
  },
  {
    id: "FE624",
    airline: "FlyEasy Express",
    departure: {
      city: "Bangalore",
      code: "BLR",
      time: "09:15 AM"
    },
    arrival: {
      city: "Chennai",
      code: "MAA",
      time: "10:15 AM"
    },
    duration: "1h 00m",
    stops: 0,
    baseFare: 2900,
    taxes: 500
  },
  {
    id: "FE730",
    airline: "FlyEasy Connect",
    departure: {
      city: "Delhi",
      code: "DEL",
      time: "01:40 PM"
    },
    arrival: {
      city: "Kolkata",
      code: "CCU",
      time: "04:00 PM"
    },
    duration: "2h 20m",
    stops: 0,
    baseFare: 5100,
    taxes: 900
  },
  {
    id: "FE845",
    airline: "FlyEasy Air",
    departure: {
      city: "Mumbai",
      code: "BOM",
      time: "07:30 PM"
    },
    arrival: {
      city: "Hyderabad",
      code: "HYD",
      time: "08:55 PM"
    },
    duration: "1h 25m",
    stops: 0,
    baseFare: 3800,
    taxes: 700
  },
  {
    id: "FE901",
    airline: "FlyEasy Airlines",
    departure: {
      city: "Mumbai",
      code: "BOM",
      time: "06:30 AM"
    },
    arrival: {
      city: "Delhi",
      code: "DEL",
      time: "08:40 AM"
    },
    duration: "2h 10m",
    stops: 0,
    baseFare: 5200,
    taxes: 920
  },
  {
    id: "FE902",
    airline: "FlyEasy Express",
    departure: {
      city: "Bangalore",
      code: "BLR",
      time: "11:15 AM"
    },
    arrival: {
      city: "Delhi",
      code: "DEL",
      time: "02:00 PM"
    },
    duration: "2h 45m",
    stops: 0,
    baseFare: 6100,
    taxes: 1050
  },
  {
    id: "FE903",
    airline: "FlyEasy Connect",
    departure: {
      city: "Kolkata",
      code: "CCU",
      time: "05:45 PM"
    },
    arrival: {
      city: "Delhi",
      code: "DEL",
      time: "08:10 PM"
    },
    duration: "2h 25m",
    stops: 0,
    baseFare: 5300,
    taxes: 940
  },
  {
    id: "FE904",
    airline: "FlyEasy Air",
    departure: {
      city: "Mumbai",
      code: "BOM",
      time: "08:00 AM"
    },
    arrival: {
      city: "Bangalore",
      code: "BLR",
      time: "09:40 AM"
    },
    duration: "1h 40m",
    stops: 0,
    baseFare: 4300,
    taxes: 780
  },
  {
    id: "FE905",
    airline: "FlyEasy Airlines",
    departure: {
      city: "Bangalore",
      code: "BLR",
      time: "04:50 PM"
    },
    arrival: {
      city: "Mumbai",
      code: "BOM",
      time: "06:35 PM"
    },
    duration: "1h 45m",
    stops: 0,
    baseFare: 4500,
    taxes: 810
  },
  {
    id: "FE906",
    airline: "FlyEasy Express",
    departure: {
      city: "Delhi",
      code: "DEL",
      time: "07:15 AM"
    },
    arrival: {
      city: "Hyderabad",
      code: "HYD",
      time: "09:30 AM"
    },
    duration: "2h 15m",
    stops: 0,
    baseFare: 5400,
    taxes: 960
  },
  {
    id: "FE907",
    airline: "FlyEasy Connect",
    departure: {
      city: "Hyderabad",
      code: "HYD",
      time: "06:20 PM"
    },
    arrival: {
      city: "Delhi",
      code: "DEL",
      time: "08:40 PM"
    },
    duration: "2h 20m",
    stops: 0,
    baseFare: 5600,
    taxes: 980
  },
  {
    id: "FE908",
    airline: "FlyEasy Air",
    departure: {
      city: "Goa",
      code: "GOI",
      time: "08:10 PM"
    },
    arrival: {
      city: "Mumbai",
      code: "BOM",
      time: "09:25 PM"
    },
    duration: "1h 15m",
    stops: 0,
    baseFare: 3600,
    taxes: 650
  },
  {
    id: "FE909",
    airline: "FlyEasy Airlines",
    departure: {
      city: "Chennai",
      code: "MAA",
      time: "03:30 PM"
    },
    arrival: {
      city: "Bangalore",
      code: "BLR",
      time: "04:30 PM"
    },
    duration: "1h 00m",
    stops: 0,
    baseFare: 3000,
    taxes: 520
  },
  {
    id: "FE910",
    airline: "FlyEasy Express",
    departure: {
      city: "Delhi",
      code: "DEL",
      time: "10:00 AM"
    },
    arrival: {
      city: "Goa",
      code: "GOI",
      time: "01:30 PM"
    },
    duration: "3h 30m",
    stops: 1,
    baseFare: 5800,
    taxes: 1020
  }
];

export default flights;
