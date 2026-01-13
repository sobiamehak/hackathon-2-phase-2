# Implementation Plan: Auth-JWT-Bridge

**Feature:** specs/2-auth-jwt/spec.md
**Created:** 2026-01-12
**Status:** Proposed
**Author:** Claude Code

## Technical Context

This plan outlines the implementation of the authentication bridge between Better Auth on the frontend and JWT verification on the FastAPI backend. The system will ensure secure user authentication with proper user isolation through JWT token validation.

**Architecture Stack:**
- Frontend: Next.js 16+ with Better Auth integration
- Backend: FastAPI with JWT verification middleware
- Database: Neon Serverless PostgreSQL (via Better Auth)
- Authentication: Better Auth with JWT tokens and shared secret

**Known Unknowns:**
- Better Auth JWT plugin configuration specifics
- Exact implementation of PyJWT verification utility
- Integration between Better Auth and FastAPI authentication flow
- SQLModel query modification patterns for user filtering

## Constitution Check

This implementation adheres to the project constitution by:
- Following spec-driven agentic development workflow
- Respecting monorepo structure (frontend/, backend/, specs/)
- Using Better Auth + JWT authentication as specified
- Implementing user isolation via JWT authentication
- Using Next.js 16+ with App Router and FastAPI with SQLModel

## Phase 0: Research & Resolution

### Research Tasks

1. **Better Auth JWT Plugin Configuration**
   - Research how to configure Better Auth with JWT plugin
   - Determine Neon DB connector setup for Better Auth
   - Understand token structure and payload contents

2. **JWT Verification Utility Implementation**
   - Investigate PyJWT best practices for token verification
   - Research secure handling of BETTER_AUTH_SECRET
   - Determine token expiration and refresh patterns

3. **FastAPI Dependency Injection Pattern**
   - Research how to create current_user dependency for route protection
   - Understand FastAPI security dependencies and authentication flow
   - Learn proper error handling for authentication failures

4. **SQLModel Query Filtering Patterns**
   - Research best practices for user-based query filtering
   - Understand parameterized queries to prevent injection
   - Learn how to integrate authentication with database queries

## Phase 1: Design & Contracts

### Authentication Flow Design

**Frontend Authentication Flow:**
1. User interacts with Login/Signup UI components
2. Better Auth handles credential validation
3. JWT token received and stored in client-side state
4. Token attached to API requests as Bearer header

**Backend Authentication Flow:**
1. Incoming request contains Authorization: Bearer <token>
2. verify_jwt utility decodes and validates token
3. current_user dependency extracts user_id from token
4. SQLModel queries filtered by authenticated user_id

### Security Implementation Design

**Token Validation:**
- Verify token signature using BETTER_AUTH_SECRET
- Validate token expiration
- Extract user_id from token payload
- Return 401 for invalid/missing tokens

**User Isolation:**
- Compare user_id from JWT with requested resource
- Prevent access to other users' data
- Ensure all queries are filtered by authenticated user

### API Contract Design

**Authentication Endpoints:**
- POST /api/auth/login - User login (handled by Better Auth)
- POST /api/auth/signup - User registration (handled by Better Auth)
- POST /api/auth/logout - User logout (handled by Better Auth)

**Protected Task Endpoints:**
- GET /api/{user_id}/tasks - List user's tasks (requires authentication)
- POST /api/{user_id}/tasks - Create new task (requires authentication)
- GET /api/{user_id}/tasks/{id} - Get specific task (requires authentication)
- PUT /api/{user_id}/tasks/{id} - Update task (requires authentication)
- DELETE /api/{user_id}/tasks/{id} - Delete task (requires authentication)
- PATCH /api/{user_id}/tasks/{id}/complete - Toggle completion (requires authentication)

## Phase 2: Implementation Strategy

### STEP 1: Setup Better Auth in Next.js
1. Install Better Auth dependencies
2. Configure Better Auth with JWT plugin
3. Set up Neon DB connector
4. Test basic authentication flow

### STEP 2: Create Login/Signup UI
1. Implement Login/Signup forms using Better Auth components
2. Store JWT in client-side state (cookies/local storage)
3. Create authentication context for managing state
4. Implement logout functionality

### STEP 3: Implement verify_jwt utility
1. Create JWT verification utility in FastAPI
2. Use PyJWT for token decoding and validation
3. Validate against BETTER_AUTH_SECRET
4. Handle token expiration and errors gracefully

### STEP 4: Protect API routes
1. Create current_user dependency using verify_jwt
2. Inject dependency into all protected routes
3. Extract user_id from validated token
4. Return 401 for unauthenticated requests

### STEP 5: Update SQLModel queries
1. Modify queries to filter by authenticated user_id
2. Ensure all task operations respect user boundaries
3. Test that User A cannot access User B's tasks
4. Validate security implementation

## Validation Strategy

**Security Validation:**
- Ensure User A cannot view User B's tasks even if they guess the Task ID
- Verify all API endpoints require valid JWT
- Test user isolation at database query level
- Validate proper error responses for unauthorized access

## Dependencies & External Services

- Better Auth: Frontend authentication management
- PyJWT: Backend token verification
- FastAPI: Backend framework with dependency injection
- SQLModel: Database ORM with query filtering
- Neon PostgreSQL: Database hosting