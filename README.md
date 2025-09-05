# Rest API Festival

A music festival website with the ability to book tickets. Used technologies are listed below.

## Used Technologies

- React - version: 18.0
- Redux
- Node.js
- MongoDB
- WebSocket
- Chai
- Docker & Docker Compose
- Deployed with Heroku

## Getting Started

### Requirements

- Node.js: 14.x.x or above
- npm: 6.x.x or above
- Docker & Docker Compose (for containerized setup)

### Clone this repo

```
git clone https://github.com/ida-dar/rest-api-festival.git
```

### Navigate to the root folder and install all dependencies

```
yarn install
# or
npm install
```

## Running the Application

### Option 1: Using Docker (Recommended)

1. Start the containers:

   ```
   docker-compose up -d
   ```

2. Setup the MongoDB database:

   ```
   ./setup-mongo.sh
   ```

   This script will ensure that MongoDB has the required sample data.

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Option 2: Local Development

1. Make sure MongoDB is running locally on port 27017

2. Start the application:

   ```
   yarn start
   # or
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Database Management

Two scripts are available for managing the MongoDB database:

- `./setup-mongo.sh` - Ensures MongoDB has data when using Docker (run this after starting containers)
- `./reset-db.sh` - Completely resets the database by removing all data and restarting containers

The MongoDB initialization script (`docker/mongo-init/init-mongo.js`) runs automatically when the container is first created and will populate the database with sample data if it's empty. Since data is stored in a Docker volume, it persists between container restarts.

## Docker Volumes

The MongoDB data is persisted using Docker volumes. The data is stored in the `./mongo_data` directory, which is mounted to `/data/db` in the MongoDB container.

Happy Hacking!
