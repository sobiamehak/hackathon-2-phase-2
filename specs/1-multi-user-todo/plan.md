# Implementation Plan: Multi-User Todo Web Application

**Feature:** specs/1-multi-user-todo/spec.md
**Created:** 2026-01-12
**Status:** Proposed
**Author:** Claude Code

## Technical Context

This plan outlines the implementation of a full-stack multi-user Todo web application with authentication using Better Auth + JWT, persistent storage with Neon PostgreSQL, and a Next.js frontend. The system will enforce user isolation through JWT-based authentication.

**Architecture Stack:**
- Frontend: Next.js 16+ with App Router, Tailwind CSS
- Backend: FastAPI with SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT tokens
- Deployment: Modern web application architecture

**Known Unknowns:**
- Specific JWT configuration options for Better Auth
- Database schema details for tasks table
- API endpoint implementation details
- Frontend component structure

## Constitution Check

This implementation adheres to the project constitution by:
- Following spec-driven agentic development workflow
- Respecting monorepo structure (frontend/, backend/, specs/)
- Using Better Auth + JWT authentication as specified
- Implementing user isolation via JWT authentication
- Using Next.js 16+ with App Router and FastAPI with SQLModel

## Phase 0: Research & Resolution

### Research Tasks

1. **Better Auth Configuration Research**
   - Investigate JWT configuration options in Better Auth
   - Determine how to extract user_id from JWT tokens
   - Understand shared secret management between frontend and backend

2. **Database Schema Research**
   - Research optimal SQLModel schema for tasks table
   - Determine proper foreign key relationships with users table
   - Understand Neon PostgreSQL specific considerations

3. **API Design Research**
   - Determine best practices for REST API design with JWT authentication
   - Research proper error handling and response formats
   - Understand user isolation implementation patterns

4. **Frontend Integration Research**
   - Research how to properly attach JWT tokens to API requests
   - Understand Next.js middleware patterns for authentication
   - Determine best practices for state management

## Phase 1: Design & Contracts

### Data Model Design

**User Entity:**
- id: UUID (primary key, auto-generated)
- email: String (unique, required)
- password_hash: String (encrypted)
- created_at: DateTime (auto-generated)
- updated_at: DateTime (auto-generated)

**Task Entity:**
- id: UUID (primary key, auto-generated)
- title: String (required, 1-200 characters)
- description: Text (optional)
- completed: Boolean (default: false)
- user_id: UUID (foreign key to users.id)
- created_at: DateTime (auto-generated)
- updated_at: DateTime (auto-generated)

### API Contract Design

**Authentication Endpoints:**
- POST /api/auth/signup - User registration
- POST /api/auth/signin - User login
- POST /api/auth/signout - User logout

**Task Management Endpoints:**
- GET /api/{user_id}/tasks - List user's tasks with optional status filter
- POST /api/{user_id}/tasks - Create new task for user
- GET /api/{user_id}/tasks/{id} - Get specific task
- PUT /api/{user_id}/tasks/{id} - Update task
- DELETE /api/{user_id}/tasks/{id} - Delete task
- PATCH /api/{user_id}/tasks/{id}/complete - Toggle completion status

**Security Implementation:**
- All task endpoints require valid JWT token
- User ID from JWT token must match user_id in URL
- Return 401 Unauthorized for invalid/missing tokens
- Return 403 Forbidden for user mismatch

### Quickstart Guide

1. Set up project structure with frontend/ and backend/ directories
2. Configure environment variables (database URL, JWT secret)
3. Implement database models with SQLModel
4. Create authentication endpoints with Better Auth
5. Build task CRUD API with JWT validation middleware
6. Develop frontend components with Next.js
7. Connect frontend to backend API with proper JWT handling
8. Test user isolation and authentication flow

## Phase 2: Implementation Strategy

### Backend Implementation
1. Set up FastAPI application structure
2. Configure SQLModel database models
3. Implement JWT authentication middleware
4. Create task CRUD operations with user isolation
5. Add proper error handling and validation

### Frontend Implementation
1. Set up Next.js application with App Router
2. Integrate Better Auth for authentication
3. Create task management components
4. Implement API client with JWT token handling
5. Build responsive UI with Tailwind CSS

### Testing Strategy
1. Unit tests for API endpoints
2. Integration tests for authentication flow
3. End-to-end tests for user isolation
4. Security testing for authentication bypass

## Dependencies & External Services

- Better Auth: User management and JWT issuance
- Neon PostgreSQL: Database hosting and management
- Next.js: Frontend framework
- FastAPI: Backend framework
- SQLModel: Database modeling
- Tailwind CSS: Styling framework

## Risk Assessment

- **Authentication Security Risk**: Ensure proper JWT validation to prevent unauthorized access
- **Data Isolation Risk**: Critical to enforce user_id matching to prevent cross-user data access
- **Performance Risk**: Database queries should be optimized for user-specific filtering
- **Deployment Risk**: Proper environment configuration required for JWT secret management