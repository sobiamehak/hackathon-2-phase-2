# Implementation Plan: Task-CRUD-Ownership

**Feature:** specs/3-task-crud/spec.md
**Created:** 2026-01-12
**Status:** Proposed
**Author:** Claude Code

## Technical Context

This plan outlines the implementation of task CRUD operations with strict user ownership enforcement. The system will ensure that users can only access, modify, and delete tasks that belong to them through proper database-level filtering and API-level validation.

**Architecture Stack:**
- Backend: FastAPI with SQLModel for database operations
- Database: Neon Serverless PostgreSQL
- Frontend: Next.js Dashboard UI
- Authentication: JWT-based user identification

**Core Rule:** Never perform a DB operation without a 'where(Task.user_id == current_user.id)' clause.

**Known Unknowns:**
- SQLModel foreign key implementation specifics
- FastAPI dependency injection for current user
- Next.js UI integration with task management API
- Proper error handling for unauthorized access attempts

## Constitution Check

This implementation adheres to the project constitution by:
- Following spec-driven agentic development workflow
- Respecting monorepo structure (frontend/, backend/, specs/)
- Using Next.js 16+ with App Router and FastAPI with SQLModel
- Implementing user isolation via authenticated user ID
- Using Neon Serverless PostgreSQL as specified

## Phase 0: Research & Resolution

### Research Tasks

1. **SQLModel Foreign Key Implementation**
   - Research best practices for defining foreign keys in SQLModel
   - Determine proper validation for title length (1-200 characters)
   - Understand relationship definitions between User and Task models

2. **FastAPI Current User Dependency Injection**
   - Investigate how to properly inject current user into route handlers
   - Understand how to extract user ID from JWT token
   - Learn best practices for authentication dependencies

3. **Database Query Filtering Patterns**
   - Research secure query patterns with user ID filtering
   - Understand parameterized queries to prevent injection
   - Learn transaction handling for CRUD operations

4. **Next.js UI Integration Patterns**
   - Research best practices for dashboard UI with task management
   - Understand state management for task lists
   - Learn API integration patterns in Next.js

## Phase 1: Design & Contracts

### Task Model Design

**Task Entity:**
- id: UUID (primary key, auto-generated)
- title: String (required, 1-200 characters)
- description: Text (optional)
- completed: Boolean (default: false)
- user_id: UUID (foreign key to users.id, required)
- created_at: DateTime (auto-generated)
- updated_at: DateTime (auto-generated)

**Validation Rules:**
- Title must be between 1 and 200 characters
- user_id must match authenticated user's ID
- All operations require user_id matching

### API Contract Design

**Task Management Endpoints:**
- POST /api/tasks - Create new task (assigns current_user.id)
- GET /api/tasks - List user's tasks (filtered by current_user.id)
- PATCH /api/tasks/{id} - Toggle task completion (with ownership check)
- DELETE /api/tasks/{id} - Delete task (with ownership check)

**Security Implementation:**
- All endpoints require valid JWT token
- User ID from JWT token must match task's user_id for operations
- Return 401 for invalid/missing tokens
- Return 403 for user mismatch
- Return 404 for tasks that don't exist or don't belong to user

## Phase 2: Implementation Strategy

### STEP 1: Define SQLModel 'Task' with 'user_id' foreign key and title validation (1-200 chars)
1. Create Task model with proper foreign key relationship
2. Implement title validation with 1-200 character limit
3. Add proper indexing for user_id for efficient queries
4. Test model creation and validation

### STEP 2: Implement POST /api/tasks to automatically assign current_user.id to the task
1. Create POST endpoint that accepts task data
2. Extract current_user.id from authentication
3. Automatically assign user_id during task creation
4. Return created task with all details

### STEP 3: Implement GET /api/tasks to filter results strictly by the authenticated user's ID
1. Create GET endpoint for task listing
2. Filter all results by current_user.id
3. Implement optional status filtering
4. Return only tasks belonging to authenticated user

### STEP 4: Implement PATCH /api/tasks/{id} for toggling 'is_completed' with ownership check
1. Create PATCH endpoint for completion toggle
2. Verify task belongs to current_user.id
3. Toggle is_completed field
4. Return updated task

### STEP 5: Implement DELETE /api/tasks/{id} ensuring users can only delete their own tasks
1. Create DELETE endpoint for task deletion
2. Verify task belongs to current_user.id
3. Delete task if ownership confirmed
4. Return appropriate status

### STEP 6: Build Next.js Dashboard UI with Task List, Toggle, and Delete buttons
1. Create dashboard page with task list
2. Implement task creation form
3. Add toggle completion buttons
4. Add delete task buttons
5. Ensure all UI operations respect user authentication

## Security Validation

**Core Security Rule Implementation:**
- Every database operation must include WHERE clause: Task.user_id == current_user.id
- Verify that users cannot access tasks belonging to other users
- Test edge cases where user tries to access other users' tasks by ID
- Ensure proper error responses for unauthorized access attempts

## Dependencies & External Services

- SQLModel: Database ORM with validation
- FastAPI: Backend framework with dependency injection
- Neon PostgreSQL: Database hosting
- Next.js: Frontend framework for dashboard UI