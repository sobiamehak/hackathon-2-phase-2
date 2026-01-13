# Data Model: Auth-JWT-Bridge

**Feature:** specs/2-auth-jwt/spec.md
**Date:** 2026-01-12
**Status:** Defined

## Authentication Data Elements

**JWT Token Structure:**
- `sub`: Subject (user ID)
- `email`: User's email address
- `exp`: Expiration timestamp
- `iat`: Issued at timestamp
- `jti`: JWT ID (optional, for revocation)
- `user_id`: User identifier (redundant with sub but explicit)

**Token Properties:**
- Algorithm: HS256 (HMAC SHA-256)
- Expiration: Configurable (default 24 hours)
- Secret: Stored in BETTER_AUTH_SECRET environment variable

## User Authentication Flow Data

**Login Request:**
- `email`: User's email address (required)
- `password`: User's password (required)

**Login Response:**
- `token`: JWT token string (required)
- `expires_in`: Seconds until token expiration (required)
- `user`: User object with public information

**Registration Request:**
- `email`: User's email address (required)
- `password`: User's password (required, validated)
- `name`: User's display name (optional)

**Registration Response:**
- `token`: JWT token string (required)
- `expires_in`: Seconds until token expiration (required)
- `user`: User object with public information

## Authentication State Management

**Client-Side Storage:**
- JWT token stored in secure HTTP-only cookie or localStorage
- Token refresh mechanism (if implemented)
- Authentication state persistence across sessions

## Security Validation Data

**Validation Checks:**
- Token signature validity against secret
- Token expiration check
- User existence verification
- Permission scope validation (if applicable)

**Error Responses:**
- `error`: Error code (e.g., "invalid_token", "expired_token")
- `message`: Human-readable error description
- `status_code`: HTTP status code (401, 403, etc.)