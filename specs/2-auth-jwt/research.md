# Research Findings: Auth-JWT-Bridge

**Feature:** specs/2-auth-jwt/spec.md
**Date:** 2026-01-12
**Status:** Completed

## Decision: Better Auth JWT Plugin Configuration

**Rationale:** Better Auth provides built-in JWT support with configurable options. The JWT plugin will be configured to work with Neon DB connector to manage user sessions and issue tokens.

**Configuration approach:**
- Install @better-auth/node with JWT plugin
- Configure with BETTER_AUTH_SECRET for signing
- Connect to Neon DB for user management
- Enable JWT issuance on successful authentication

**Alternatives considered:**
- Custom JWT implementation: More complex and error-prone
- Session-based authentication: Less scalable than JWT
- OAuth providers only: Doesn't meet requirement for email/password signup

## Decision: JWT Verification Utility Implementation

**Rationale:** Using PyJWT library provides secure and standardized JWT verification with proper algorithm support and validation features.

**Implementation approach:**
- Create utility function using PyJWT's decode method
- Verify token signature against BETTER_AUTH_SECRET
- Validate token expiration (exp claim)
- Extract user_id from token payload
- Handle exceptions appropriately (invalid token, expired, etc.)

**Alternatives considered:**
- Custom JWT parsing: More error-prone and less secure
- Different libraries: PyJWT is the standard for Python JWT handling
- Different validation approaches: Standard JWT validation practices

## Decision: FastAPI Dependency Injection Pattern

**Rationale:** FastAPI's dependency injection system provides clean, reusable authentication logic with proper error handling and integration with the framework.

**Implementation approach:**
- Create a dependency function that validates JWT and returns user info
- Use Depends() to inject authentication into route handlers
- Return 401 responses for invalid tokens
- Cache validated user info in request context

**Alternatives considered:**
- Middleware approach: Dependencies provide better integration with FastAPI
- Manual validation in each route: Would duplicate code
- Different authentication patterns: FastAPI dependencies are the idiomatic way

## Decision: SQLModel Query Filtering Patterns

**Rationale:** Applying user_id filters at the query level provides the strongest security boundary by ensuring unauthorized data cannot be accessed even if other layers fail.

**Implementation approach:**
- Add user_id filter to all SELECT queries
- Use parameterized queries to prevent injection
- Apply filters consistently across all endpoints
- Validate that filters are applied before data access

**Alternatives considered:**
- Application-level filtering: Less secure than database-level
- No filtering: Would not meet security requirements
- Different filtering mechanisms: Direct WHERE clauses are most straightforward