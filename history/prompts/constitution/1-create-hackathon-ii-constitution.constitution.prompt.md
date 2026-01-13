---
id: 1
title: create-hackathon-ii-constitution
stage: constitution
date_iso: 2026-01-12
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution
labels:
  - constitution
  - hackathon
  - todo-app
  - spec-driven
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - .specify/memory/constitution.md
tests_yaml: []
---

# Prompt History Record: Create Hackathon II Constitution

## User Input

```
Hackathon II Todo Full-Stack Web App (Phase II)

## Core Principles (Never violate these)
- This is a **spec-driven agentic development** project. **No manual coding allowed** — everything through Claude Code + Spec-Kit Plus workflow.
- Always follow: Write/Update spec → Generate plan → Break into tasks → Implement.
- Monorepo structure must be respected:
  - specs/ → all specifications (overview.md, features/, api/, database/, ui/)
  - frontend/ → Next.js 16+ App Router, TypeScript, Tailwind
  - backend/ → FastAPI + SQLModel + Neon Postgres
  - .spec-kit/config.yaml → already defined phases (phase2-web: task-crud + authentication)
- Use @references correctly: @specs/features/task-crud.md, @frontend/CLAUDE.md, @backend/CLAUDE.md etc.
- Authentication: Better Auth (frontend) + JWT (shared secret via env BETTER_AUTH_SECRET) → FastAPI middleware verifies JWT → enforce user_id ownership on every task operation.
- API endpoints: /api/tasks (not /api/{user_id}/tasks anymore in many examples — cleaner without user_id in path, since JWT gives user)
  But follow provided spec: keep /api/{user_id}/tasks if written, but prefer cleaner /api/tasks with JWT filter.
- Database: Neon Serverless PostgreSQL, SQLModel models, users table by Better Auth, tasks table with user_id FK.
- Security: 401 on no/invalid token, only return own user's tasks.

## Workflow Rules
1. Before any code change: Read relevant @specs/... files.
2. Never invent features outside specs/.
3. When implementing:
   - Backend changes → respect @backend/CLAUDE.md patterns (routes/, models.py, db.py)
   - Frontend changes → respect @frontend/CLAUDE.md (server components default, /lib/api.ts client)
4. After implementation: Suggest running tests / docker-compose up / dev servers.
5. If spec needs update: First propose change in spec file, then implement.
6. Response style: Structured, show plan → tasks → code diffs/edits only.

## Phase II Focus (Current)
- Complete task-crud + authentication features as web app.
- Implement JWT verification middleware in FastAPI.
- Frontend: login/signup with Better Auth → attach JWT to api calls.
- All endpoints protected & filtered by authenticated user.

Last updated: 2026-01-12
```

## Response Summary

Created the initial project constitution file at `.specify/memory/constitution.md` with the following key elements:

1. Core principles for spec-driven agentic development
2. Monorepo structure compliance requirements
3. Authentication and security framework specifications
4. Database and infrastructure standards
5. Development workflow adherence rules
6. Quality assurance and testing guidelines
7. Phase II focus on full-stack web application with task-CRUD and authentication

The constitution serves as the governing document for the Hackathon II Todo Full-Stack Web App project, establishing clear guidelines for all contributors to follow.

## Outcome

The project constitution has been successfully created and will guide all future development activities according to the specified principles and workflows.
