# Use official Node.js image as the base image
FROM node:18.16.0
FROM mcr.microsoft.com/playwright:v1.41.2-focal

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json /app/
COPY server.js /app/

# Install Deps
RUN npm install

# Expose the port on which your app runs
EXPOSE 3000

# Command to run your application
CMD ["node", "server.js"]