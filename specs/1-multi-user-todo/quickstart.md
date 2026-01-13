# Quickstart Guide: Multi-User Todo Web Application

**Feature:** specs/1-multi-user-todo/spec.md
**Date:** 2026-01-12

## Project Setup

### Prerequisites
- Node.js 18+ for frontend development
- Python 3.9+ for backend development
- PostgreSQL-compatible database (Neon DB recommended)
- Better Auth account or self-hosted instance

### Environment Variables
Create `.env` files for both frontend and backend:

**Backend (.env):**
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
BETTER_AUTH_SECRET="your-super-secret-jwt-key-here"
BETTER_AUTH_URL="http://localhost:3000"  # Your frontend URL
```

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000/api/auth"
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

## Backend Setup (FastAPI)

1. Initialize the project:
```bash
pip install fastapi sqlmodel python-multipart python-jose[cryptography] passlib[bcrypt] psycopg2-binary uvicorn
```

2. Create the database models based on the data model specification

3. Set up JWT authentication middleware

4. Implement the API endpoints according to the OpenAPI specification

5. Start the server:
```bash
uvicorn main:app --reload --port 8000
```

## Frontend Setup (Next.js)

1. Initialize the project:
```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint
cd frontend
npm install @better-auth/react @better-auth/client
```

2. Configure Better Auth client for authentication

3. Create API client for task management endpoints

4. Build components for task management UI

5. Start the development server:
```bash
npm run dev
```

## Key Implementation Steps

### 1. Database Models
Implement the User and Task models as specified in the data model, ensuring proper relationships and validation.

### 2. Authentication
Configure Better Auth with JWT support and ensure the shared secret is properly configured between frontend and backend.

### 3. API Endpoints
Implement all endpoints as defined in the OpenAPI specification, with proper JWT validation and user isolation.

### 4. Frontend Components
Create responsive UI components for task management, integrating with Better Auth for authentication.

### 5. Testing
Verify that users can only access their own tasks and that all authentication flows work correctly.

## Running the Application

1. Start the backend server
2. Start the frontend server
3. Navigate to the frontend URL
4. Register a new account or sign in
5. Create, view, update, and delete tasks

## Troubleshooting

- If authentication fails, verify that the BETTER_AUTH_SECRET matches between frontend and backend
- If users can see other users' tasks, check the JWT validation middleware implementation
- If database connections fail, verify the DATABASE_URL is correct and accessible