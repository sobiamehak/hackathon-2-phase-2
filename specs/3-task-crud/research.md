# Research Findings: Task-CRUD-Ownership

**Feature:** specs/3-task-crud/spec.md
**Date:** 2026-01-12
**Status:** Completed

## Decision: SQLModel Foreign Key Implementation

**Rationale:** SQLModel provides robust support for foreign key relationships with proper typing and validation. Using SQLAlchemy's foreign key functionality within SQLModel ensures proper database relationships.

**Implementation approach:**
- Use `Field(foreign_key="users.id")` for user_id field
- Implement proper validation with `String(min_length=1, max_length=200)` for title
- Define relationship using `Relationship()` if bidirectional access needed
- Add proper indexing for user_id field for query performance

**Alternatives considered:**
- Manual validation only: Less secure than database-level constraints
- No foreign key constraints: Would not ensure data integrity
- Different ORM: SQLModel integrates best with FastAPI

## Decision: FastAPI Current User Dependency Injection

**Rationale:** FastAPI's dependency injection system provides clean, reusable authentication logic with proper error handling and integration with the framework.

**Implementation approach:**
- Create dependency function that validates JWT and returns user info
- Use Depends() to inject current user into route handlers
- Extract user_id from validated token
- Cache validated user info in request context

**Alternatives considered:**
- Manual validation in each route: Would duplicate code
- Middleware approach: Dependencies provide better integration
- Different authentication patterns: FastAPI dependencies are the idiomatic way

## Decision: Database Query Filtering Patterns

**Rationale:** Applying user_id filters at the query level provides the strongest security boundary by ensuring unauthorized data cannot be accessed even if other layers fail.

**Implementation approach:**
- Use `select(Task).where(Task.user_id == current_user_id)` for all queries
- Use parameterized queries to prevent injection
- Apply filters consistently across all endpoints
- Validate that filters are applied before data access

**Alternatives considered:**
- Application-level filtering: Less secure than database-level
- No filtering: Would not meet security requirements
- Different filtering mechanisms: Direct WHERE clauses are most straightforward

## Decision: Next.js UI Integration Patterns

**Rationale:** Next.js with App Router provides server components by default with client components where interactivity is needed. Using React state management for task operations provides a smooth user experience.

**Implementation approach:**
- Create server component for initial task list loading
- Implement client components for interactive operations (toggle, delete)
- Use SWR or React Query for data fetching and mutation
- Implement proper error handling and loading states

**Alternatives considered:**
- All server components: Would require page refreshes for updates
- All client components: Would hurt initial load performance
- Different state management: React state and SWR are standard approaches