# User Authentication API(server)

A robust Node.js authentication service built with NestJS, MongoDB, Passport and JWT.

## Features

- User authentication (Login/Register)
- JWT-based authentication
- API Key protection
- Profile management
- Input validation
- Standardized API responses
- Comprehensive error handling
- Winston logger integration
- Swagger for API documentation.


## Installation

```bash
npm install
```

## Environment Setup

Create the `.env` file in the root directory with the required variables

## Running the Application

Development mode:
```bash
npm run start:dev
```

## API Endpoints

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user

### Users
- GET `/users/profile` - Get user profile (Protected)


## Request Headers

- Authentication: Bearer {jwt_token}
- X-API-KEY: {api_key}

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- API key protection
- Input validation and sanitization
- Error handling and logging
- API rate limiting



# User Authentication App(client)

A modern React application with authentication features built using TypeScript, Vite, and Tailwind CSS.

## Features

- User Authentication (Sign Up, Sign In, Sign Out)
- Protected Routes
- User Profile Management
- Modern UI with Tailwind CSS
- Type-Safe Development with TypeScript

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create the `.env` file in the root directory with the required variables

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable components
├── context/       # React Context providers
├── pages/         # Page components
└── services/      # API services
```

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

