# Research Findings: Multi-User Todo Web Application

**Feature:** specs/1-multi-user-todo/spec.md
**Date:** 2026-01-12
**Status:** Completed

## Decision: Better Auth JWT Configuration

**Rationale:** Better Auth provides built-in JWT support with configurable options. The JWT token will contain user identity information including user_id which can be extracted and verified in the backend.

**Alternatives considered:**
- Custom JWT implementation: More complex and error-prone
- Session-based authentication: Less scalable than JWT
- OAuth providers only: Doesn't meet requirement for email/password signup

## Decision: Database Schema Design

**Rationale:** Using SQLModel with Neon PostgreSQL provides a clean ORM approach with proper relationships. The tasks table will have a foreign key to the users table (managed by Better Auth) to enforce data relationships.

**Fields for Task model:**
- id: UUID primary key
- title: String with length validation (1-200 chars)
- description: Optional text field
- completed: Boolean with default false
- user_id: UUID foreign key linking to user
- timestamps: created_at, updated_at

**Alternatives considered:**
- NoSQL database: Overkill for relational task-to-user data
- Different ORM: SQLModel integrates well with FastAPI
- Different field types: UUID provides better uniqueness than integers

## Decision: API Design Patterns

**Rationale:** Following REST conventions with JWT authentication in Authorization header as Bearer token. User isolation is enforced by verifying the user_id in the JWT matches the user_id in the URL path.

**Implementation approach:**
- Use FastAPI dependencies for JWT verification
- Create middleware to extract and validate user_id from token
- Ensure all endpoints validate user ownership before operations

**Alternatives considered:**
- GraphQL: More complex than needed for this use case
- Different authentication headers: Bearer token is standard practice
- Including user_id in request body: Less secure than URL path validation

## Decision: Frontend Integration Approach

**Rationale:** Next.js App Router provides server components by default with client components where interactivity is needed. Better Auth integrates seamlessly with Next.js and can attach JWT tokens to API requests automatically.

**Implementation approach:**
- Use Better Auth React components for signup/signin
- Configure auth client to attach tokens to API requests
- Create server components for protected routes
- Implement client components for interactive task management

**Alternatives considered:**
- Custom authentication forms: More error-prone than using library
- Different frontend frameworks: Next.js has best ecosystem for this stack
- Manual token management: Better Auth handles this more securely