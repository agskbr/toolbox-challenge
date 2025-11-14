# Toolbox Challenge

## Overview
This project is a full-stack application that interacts with an external API to fetch and display file information. The application consists of a React frontend and a Node.js backend.

## Prerequisites
- Docker
- Docker Compose

## Project Structure
```
.
├── api/                  # Backend service
│   ├── src/              # Source code
│   ├── Dockerfile        # Backend Docker configuration
│   └── package.json      # Backend dependencies
├── web/                  # Frontend service
│   ├── src/              # Source code
│   ├── public/           # Static files
│   ├── Dockerfile        # Frontend Docker configuration
│   └── package.json      # Frontend dependencies
└── docker-compose.yml    # Docker Compose configuration
```

## Getting Started

### Running with Docker Compose
1. Navigate to the project directory
```bash
cd /toolbox-challenge
```
2. Run the following command:
```bash
docker-compose up -d --build
```
3. Access the application at http://localhost:3000

### API Endpoints
- `GET /files/data` - List all files with their content
- `GET /files/list` - List available files
- `GET /files/data?fileName={filename}` - Get specific file content

## Development

### Running Locally

#### Backend

env variables:
```bash
EXTERNAL_API_URL=<external_api_url>
API_KEY=<api_key>
```

```bash
cd api
nvm use # use the same node version as in the .nvmrc file
npm install
npm run dev
```

#### Frontend

env variables:
```bash
API_URL=<api_url>
```

```bash
cd web
nvm use # use the same node version as in the .nvmrc file
npm install
npm start
```

### Testing
```bash
# Run backend tests
cd api
npm test

# Run frontend tests
cd ../web
npm test
```
