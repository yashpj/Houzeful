# Use Node.js with nginx
FROM node:18-alpine

# Install nginx
RUN apk add --no-cache nginx gettext

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Copy nginx template
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Create directories nginx needs
RUN mkdir -p /var/log/nginx /var/cache/nginx/client_temp

# Use Railway's PORT environment variable
CMD envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

EXPOSE $PORT