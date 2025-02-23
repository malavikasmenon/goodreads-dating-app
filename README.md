# Bookworm Dating App

A dating app for book lovers! Connect with people who share your literary interests.

## Features

- User registration with Goodreads profile integration
- Login system
- Profile swiping interface
- Matches view
- Mobile-first responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

The frontend expects the following API endpoints to be available at `http://localhost:8000`:

- POST `/api/register` - User registration
- POST `/api/login` - User authentication
- GET `/api/recommended/profiles` - Get recommended profiles
- POST `/api/swipe` - Handle profile likes/passes
- GET `/api/matches` - Get user matches

## Tech Stack

- React
- React Router
- Tailwind CSS
- Heroicons
