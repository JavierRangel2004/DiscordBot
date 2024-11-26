# Use the official Node.js LTS (Long Term Support) image
FROM node:18

# Install build dependencies for @napi-rs/canvas
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Clean npm cache to prevent potential conflicts
RUN npm cache clean --force

# Install nodemon globally
RUN npm install -g nodemon

# Install all dependencies, forcing a build from source for native modules
RUN npm install --build-from-source

# Copy the rest of the application code
COPY . .


# Run the deploy-commands script to register Discord commands
# Note: It's better to run this as a separate step, but included here for automation
# RUN node deploy-commands.js

# Start the bot using nodemon
CMD ["nodemon", "src/index.js"]
