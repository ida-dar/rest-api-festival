# Database Management for Rest API Festival

This directory contains sample data files for the MongoDB database used by the Rest API Festival project.

## Data Files

Sample data is stored in JSON format:

- `db/data/concerts.json`
- `db/data/seats.json`
- `db/data/testimonials.json`

These files are used by:

1. The MongoDB initialization script (`docker/mongo-init/init-mongo.js`)
2. The setup script (`setup-mongo.sh`) as a fallback method

## Docker Volume Persistence

The project uses Docker volumes to ensure data persistence between container restarts. The MongoDB data is stored in the `./mongo_data` directory, which is mounted to `/data/db` in the MongoDB container.

## Automatic Initialization

When the MongoDB container is first created, it automatically runs the initialization script in the `/docker-entrypoint-initdb.d` directory. The script checks if collections exist and have data before adding sample data.

If the automatic initialization doesn't work, you can use the setup script:

```
./setup-mongo.sh
```

## Reset Database

To completely reset the database:

```
./reset-db.sh
```

This will remove all data, restart containers, and reinitialize the database.
