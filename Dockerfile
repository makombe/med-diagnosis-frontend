# -----------------------
#     STAGE 1: BUILD
# -----------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build for production
RUN npm run build
