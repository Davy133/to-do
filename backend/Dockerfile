# Base image
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build stage for production
FROM base AS build
RUN npm run build

# Production container
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app /app
RUN npm install --omit=dev

CMD ["node", "dist/server.js"]

# Development container
FROM base AS development
CMD ["npm", "run", "dev"]
