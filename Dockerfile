# Use the Node.js base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:dev"]
