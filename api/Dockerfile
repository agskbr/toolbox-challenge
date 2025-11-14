FROM node:14-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port 8000
EXPOSE 8000

# Command to run the application
CMD ["npm", "run", "start"]