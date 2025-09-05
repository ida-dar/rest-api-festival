#!/bin/bash

echo "WARNING: This will remove all MongoDB data and reset the database."
read -p "Are you sure you want to continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Operation cancelled."
    exit 1
fi

echo "Stopping Docker containers..."
docker-compose down

echo "Removing MongoDB volume data..."
rm -rf ./mongo_data/*

echo "Starting Docker containers..."
docker-compose up -d

echo "Waiting for MongoDB to initialize (15 seconds)..."
sleep 15

echo "Running setup script to ensure data is loaded..."
./setup-mongo.sh

echo "Database has been reset successfully."
