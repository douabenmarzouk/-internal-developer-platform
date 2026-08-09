# ---------- Stage 1: Build React App ----------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy source code
COPY . .

# Build the React app for production
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------



# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

