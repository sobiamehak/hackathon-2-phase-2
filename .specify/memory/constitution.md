<!-- Sync Impact Report
Version Change: N/A (Initial Creation) -> 1.0.0
Modified Principles: N/A
Added Sections: All initial principles and governance
Removed Sections: N/A
Templates Requiring Updates: N/A (initial creation)
Follow-up TODOs: None
-->

# Project Constitution: Hackathon II Todo Full-Stack Web App

**Version:** 1.0.0
**Ratification Date:** 2026-01-12
**Last Amended Date:** 2026-01-12
**Status:** Active

## Purpose

This constitution establishes the governing principles, development practices, and operational guidelines for the Hackathon II Todo Full-Stack Web App project. All contributors must adhere to these principles to ensure consistent, high-quality development outcomes.

## Core Principles

### Principle 1: Spec-Driven Agentic Development
**Rule:** This is a **spec-driven agentic development** project. **No manual coding allowed** — everything through Claude Code + Spec-Kit Plus workflow.
**Guidance:** Always follow: Write/Update spec → Generate plan → Break into tasks → Implement.
**Rationale:** Ensures systematic development with proper documentation and traceability.

### Principle 2: Monorepo Structure Compliance
**Rule:** Monorepo structure must be respected:
- specs/ → all specifications (overview.md, features/, api/, database/, ui/)
- frontend/ → Next.js 16+ App Router, TypeScript, Tailwind
- backend/ → FastAPI + SQLModel + Neon Postgres
- .spec-kit/config.yaml → defined phases (phase2-web: task-crud + authentication)
**Guidance:** Use @references correctly: @specs/features/task-crud.md, @frontend/CLAUDE.md, @backend/CLAUDE.md etc.
**Rationale:** Maintains organized project structure with clear separation of concerns.

### Principle 3: Authentication and Security Framework
**Rule:** Authentication: Better Auth (frontend) + JWT (shared secret via env BETTER_AUTH_SECRET) → FastAPI middleware verifies JWT → enforce user_id ownership on every task operation.
**Guidance:** API endpoints should preferably use /api/tasks with JWT filtering rather than /api/{user_id}/tasks.
**Rationale:** Ensures secure, authenticated access with proper user isolation.

### Principle 4: Database and Infrastructure Standards
**Rule:** Use Neon Serverless PostgreSQL, SQLModel models, users table by Better Auth, tasks table with user_id FK.
**Guidance:** Security: 401 on no/invalid token, only return own user's tasks.
**Rationale:** Provides scalable, secure database infrastructure with proper user data isolation.

### Principle 5: Development Workflow Adherence
**Rule:**
1. Before any code change: Read relevant @specs/... files.
2. Never invent features outside specs/.
3. When implementing:
   - Backend changes → respect @backend/CLAUDE.md patterns (routes/, models.py, db.py)
   - Frontend changes → respect @frontend/CLAUDE.md (server components default, /lib/api.ts client)
**Rationale:** Ensures consistency and adherence to established patterns and specifications.

### Principle 6: Quality Assurance and Testing
**Rule:** After implementation: Suggest running tests / docker-compose up / dev servers.
**Guidance:** If spec needs update: First propose change in spec file, then implement.
**Rationale:** Maintains high quality and validates implementations before merging.

## Phase II Focus

### Current Priority: Full-Stack Web Application
**Objective:** Complete task-crud + authentication features as web app.
**Specific Requirements:**
- Implement JWT verification middleware in FastAPI
- Frontend: login/signup with Better Auth → attach JWT to api calls
- All endpoints protected & filtered by authenticated user
**Rationale:** Transition from console app to secure, multi-user web application.

## Governance

### Amendment Process
Changes to this constitution require:
1. Specification update in @specs/... files
2. Plan generation reflecting constitutional changes
3. Approval from project maintainers
4. Implementation following task breakdown

### Versioning Policy
- MAJOR: Backward incompatible governance/principle removals or redefinitions
- MINOR: New principle/section added or materially expanded guidance
- PATCH: Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Review
Regular reviews ensure ongoing adherence to constitutional principles:
- Code reviews verify principle compliance
- Automated checks validate structural requirements
- Periodic governance assessments maintain alignment