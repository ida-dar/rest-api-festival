FROM node:14-alpine AS backend

# Set working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all filesś
COPY . .

# Expose port 3000
EXPOSE 8000

# Start the application
CMD ["npm", "run", "start"]
