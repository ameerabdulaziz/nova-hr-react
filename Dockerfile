# Use an official Node.js image
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first to leverage caching
COPY package.json ./
COPY internals/ ./internals/

# Install dependencies
RUN npm install

# Copy remaining files
COPY . .

# Build React app
RUN npm run build

# Use an optimized production image
FROM busybox:1.35-uclibc

# Copy build output to react_build volume
COPY --from=build /app/build /react_build