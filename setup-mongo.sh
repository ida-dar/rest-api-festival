#!/bin/bash

echo "=== MongoDB Setup Script ==="
echo "This script will ensure your MongoDB has the required data"
echo

# Check if containers are running
if ! docker ps | grep -q rest-api-festival-mongo; then
  echo "MongoDB container is not running."
  echo "Starting containers..."
  docker-compose up -d
  echo "Waiting for MongoDB to initialize (15 seconds)..."
  sleep 15
fi

# Check if MongoDB has data
echo "Checking if MongoDB has data..."
CONCERT_COUNT=$(docker exec rest-api-festival-mongo mongo NewWaveDB --quiet --eval "db.concerts.count()")

if [ "$CONCERT_COUNT" == "0" ] || [ -z "$CONCERT_COUNT" ]; then
  echo "No data found in MongoDB. Adding sample data..."
  
  # Method 1: Using the MongoDB script directly
  echo "Running MongoDB initialization script..."
  docker exec rest-api-festival-mongo mongo --eval "$(cat docker/mongo-init/init-mongo.js)"
  
  # If that doesn't work, try mongoimport
  CONCERT_COUNT=$(docker exec rest-api-festival-mongo mongo NewWaveDB --quiet --eval "db.concerts.count()")
  
  if [ "$CONCERT_COUNT" == "0" ] || [ -z "$CONCERT_COUNT" ]; then
    echo "MongoDB script didn't add data. Using mongoimport as fallback..."
    
    # Create temporary directory in volume
    mkdir -p ./mongo_data/seed_data
    
    # Copy JSON data files
    cp -r ./db/data/* ./mongo_data/seed_data/
    
    # Import data
    docker exec rest-api-festival-mongo mongoimport --db NewWaveDB --collection concerts --drop --file /data/db/seed_data/concerts.json --jsonArray
    docker exec rest-api-festival-mongo mongoimport --db NewWaveDB --collection seats --drop --file /data/db/seed_data/seats.json --jsonArray
    docker exec rest-api-festival-mongo mongoimport --db NewWaveDB --collection testimonials --drop --file /data/db/seed_data/testimonials.json --jsonArray
    
    # Clean up
    rm -rf ./mongo_data/seed_data
  fi
else
  echo "MongoDB already has data ($CONCERT_COUNT concerts found)"
fi

# Final verification
echo
echo "=== Final Verification ==="
CONCERT_COUNT=$(docker exec rest-api-festival-mongo mongo NewWaveDB --quiet --eval "db.concerts.count()")
SEAT_COUNT=$(docker exec rest-api-festival-mongo mongo NewWaveDB --quiet --eval "db.seats.count()")
TESTIMONIAL_COUNT=$(docker exec rest-api-festival-mongo mongo NewWaveDB --quiet --eval "db.testimonials.count()")

echo "Concerts: $CONCERT_COUNT"
echo "Seats: $SEAT_COUNT"
echo "Testimonials: $TESTIMONIAL_COUNT"

if [ "$CONCERT_COUNT" == "0" ] || [ -z "$CONCERT_COUNT" ]; then
  echo "Failed to add data to MongoDB. Please check your Docker setup and MongoDB configuration."
  exit 1
else
  echo "MongoDB setup complete!"
fi
