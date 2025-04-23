# Stage 1: Build
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code (excluding test files)
COPY tsconfig.json ./
COPY src ./src

# Remove test files before building to avoid compilation errors
RUN find ./src -name "*.spec.ts" -type f -delete

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:23-alpine

# Create app user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production
# Ensure application knows which port to listen on
ENV PORT=3000

# Install SQLite dependencies
RUN apk add --no-cache sqlite

# Create directory for database with proper permissions
RUN mkdir -p /app/data && chown -R appuser:appgroup /app

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --production && chown -R appuser:appgroup /app/node_modules

# Copy only the necessary built artifacts
COPY --from=builder /app/dist ./dist
RUN chown -R appuser:appgroup /app/dist

# Expose the application port
EXPOSE 3000

# Set the data directory as a volume
VOLUME /app/data

# Use a non-root user for security
USER appuser

# Start the application
CMD ["node", "dist/main.js"]