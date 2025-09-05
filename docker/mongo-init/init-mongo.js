// MongoDB initialization script
print("Starting MongoDB initialization...");

db = db.getSiblingDB("NewWaveDB");

// Create collections
db.createCollection("concerts");
db.createCollection("seats");
db.createCollection("testimonials");

// Insert concert data
db.concerts.insertMany([
  {
    performer: "John Doe",
    genre: "Rock",
    price: 25,
    day: 1,
    image: "/img/uploads/1fsd324fsdg.jpg",
  },
  {
    performer: "Rebekah Parker",
    genre: "R&B",
    price: 30,
    day: 1,
    image: "/img/uploads/2f342s4fsdg.jpg",
  },
  {
    performer: "Maybell Haley",
    genre: "Pop",
    price: 40,
    day: 2,
    image: "/img/uploads/hdfh42sd213.jpg",
  },
]);

// Insert seat data
db.seats.insertMany([
  { day: 1, seat: 3, client: "Amanda Doe", email: "amandadoe@example.com" },
  { day: 1, seat: 9, client: "Curtis Johnson", email: "curtisj@example.com" },
  { day: 1, seat: 10, client: "Felix McManara", email: "felixm@example.com" },
  { day: 1, seat: 26, client: "Fauna Keithrins", email: "faunak@example.com" },
  { day: 2, seat: 1, client: "Felix McManara", email: "felixm@example.com" },
  { day: 2, seat: 2, client: "Molier Lo Celso", email: "molierlc@example.com" },
]);

// Insert testimonial data
db.testimonials.insertMany([
  { author: "John Doe", text: "This festival was amazing!" },
  { author: "Jane Smith", text: "Best time of my life!" },
  { author: "Amanda Doe", text: "Great music and atmosphere!" },
]);

print("MongoDB initialization completed successfully");
