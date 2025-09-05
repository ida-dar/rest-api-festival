#!/bin/bash

# Create a volume-aware approach for data import
echo "Creating shared volume directory for data import..."
mkdir -p ./mongo_data/seed_data

# Copy JSON data files to volume-mounted directory
echo "Copying data files to volume-mounted directory..."
cp -r ./db/data/* ./mongo_data/seed_data/

# Import data into MongoDB collections using the volume path
echo "Importing data from volume path..."
docker exec rest-api-festival-mongo mongoimport --db NewWaveDB --collection concerts --drop --file /data/db/seed_data/concerts.json --jsonArray
docker exec rest-api-festival-mongo mongoimport --db NewWaveDB --collection seats --drop --file /data/db/seed_data/seats.json --jsonArray
docker exec rest-api-festival-mongo mongoimport --db NewWaveDB --collection testimonials --drop --file /data/db/seed_data/testimonials.json --jsonArray

# Clean up
echo "Cleaning up..."
rm -rf ./mongo_data/seed_data

echo "Data import completed successfully"
