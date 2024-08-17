# Frontend Dockerfile
# Use Node.js image for building the frontend
FROM node:12 as build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

CMD ["npm","start"]

