---
id: 1
title: constitution-update-evolution-todo
stage: constitution
date: 2026-01-01
surface: agent
model: Claude Sonnet 4.5
feature: none
branch: 002-rag-chatbot
user: Claude Code
command: sp.constitution
labels: [constitution, hackathon, todo]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 -
---

## Prompt

[11:01 PM, 1/1/2026] 소비아🦋: Evolution of Todo – Hackathon II

## Purpose
This constitution defines the non-negotiable principles, constraints, and quality standards for the entire "Evolution of Todo" project across all 5 phases. It ensures consistency, reliability, scalability, and adherence to Spec-Driven Development (SDD) with Claude Code and Spec-Kit Plus.

All AI agents (Claude Code) and human developers MUST obey these rules. Violations require explicit justification and constitution update.

## Core Principles
1. *Spec-Driven Only: No code can be written or modified without a direct reference to an approved spec file (@specs/*) and task ID. Manual coding is strictly forbidden.
2. *No Vibe Coding*: All features, architecture, and changes must originate from explicit specifications. Ambiguous prompts must be refined into testable acceptance criteria first.
3. *Reusable Intelligence Priority*: Where possible, implement features as reusable agent skills, subagents, or blueprints for bonus points.
4. *Security & Privacy*: User data isolation must be enforced at every layer (e.g., tasks filtered by authenticated user_id). Use JWT for auth; never expose secrets in code.
5. *Scalability & Cloud-Native*: Design for stateless services, horizontal scaling, and event-driven patterns from Phase III onward.
6. *Testability*: Every feature must have acceptance criteria that are automatable (e.g., via unit tests or demo scripts).

## Tech Stack Constraints
- Python: 3.13+ with UV for dependency management.
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS.
- Backend: FastAPI, SQLModel ORM.
- Database: Neon Serverless PostgreSQL only.
- Auth: Better Auth with JWT tokens (shared BETTER_AUTH_SECRET).
- AI: OpenAI Agents SDK, Official MCP SDK, OpenAI ChatKit.
- Deployment: Docker, Minikube, Helm, DigitalOcean Kubernetes (Phase V).
- Event-Driven: Kafka (or compatible like Redpanda), Dapr for abstraction.
- No additional packages without spec justification.

## Code Quality Standards
- *Clean Code*: PEP8/Python, ESLint/Prettier for TS. Functions < 50 lines where possible.
- *Typing*: Full type hints in Python (SQLModel) and TypeScript.
- *Error Handling*: Graceful HTTP exceptions, user-friendly messages in chatbot.
- *Logging*: Structured logs (JSON) for debugging; no print statements in production code.
- *Documentation*: Every file must have docstrings/comments linking to spec/task.
- *Performance*: API responses < 200ms locally; no blocking operations.

## Spec-Driven Workflow Enforcement
- Specs must be organized in /specs/ (features/, api/, database/, ui/).
- Multiple CLAUDE.md files (root, frontend/, backend/) for layered guidance.
- Monorepo structure mandatory for Claude Code context.
- All changes must trace back: Task ID → Spec section → Constitution principle.

## Bonus Features Guidelines
- Reusable Intelligence: Must be implemented as separate agent skills or subagents.
- Cloud-Native Blueprints: Use for Helm/K8s deployments via spec.
- Multi-language (Urdu): Chatbot must handle Urdu input/output seamlessly.
- Voice: Use Web Speech API; no external services.

## Acceptance
This constitution is the single source of truth. Hierarchy: Constitution > Phase Specs > Plans > Tasks.
Last updated: January 01, 2026
[11:01 PM, 1/1/2026] 소비아🦋: # Project Constitution: Evolution of Todo – Hackathon II

## Purpose
This constitution defines the non-negotiable principles, constraints, and quality standards for the entire "Evolution of Todo" project across all 5 phases. It ensures consistency, reliability, scalability, and adherence to Spec-Driven Development (SDD) with Claude Code and Spec-Kit Plus.

All AI agents (Claude Code) and human developers MUST obey these rules. Violations require explicit justification and constitution update.

## Core Principles
1. *Spec-Driven Only: No code can be written or modified without a direct reference to an approved spec file (@specs/*) and task ID. Manual coding is strictly forbidden.
2. *No Vibe Coding*: All features, architecture, and changes must originate from explicit specifications. Ambiguous prompts must be refined into testable acceptance criteria first.
3. *Reusable Intelligence Priority*: Where possible, implement features as reusable agent skills, subagents, or blueprints for bonus points.
4. *Security & Privacy*: User data isolation must be enforced at every layer (e.g., tasks filtered by authenticated user_id). Use JWT for auth; never expose secrets in code.
5. *Scalability & Cloud-Native*: Design for stateless services, horizontal scaling, and event-driven patterns from Phase III onward.
6. *Testability*: Every feature must have acceptance criteria that are automatable (e.g., via unit tests or demo scripts).

## Tech Stack Constraints
- Python: 3.13+ with UV for dependency management.
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS.
- Backend: FastAPI, SQLModel ORM.
- Database: Neon Serverless PostgreSQL only.
- Auth: Better Auth with JWT tokens (shared BETTER_AUTH_SECRET).
- AI: OpenAI Agents SDK, Official MCP SDK, OpenAI ChatKit.
- Deployment: Docker, Minikube, Helm, DigitalOcean Kubernetes (Phase V).
- Event-Driven: Kafka (or compatible like Redpanda), Dapr for abstraction.
- No additional packages without spec justification.

## Code Quality Standards
- *Clean Code*: PEP8/Python, ESLint/Prettier for TS. Functions < 50 lines where possible.
- *Typing*: Full type hints in Python (SQLModel) and TypeScript.
- *Error Handling*: Graceful HTTP exceptions, user-friendly messages in chatbot.
- *Logging*: Structured logs (JSON) for debugging; no print statements in production code.
- *Documentation*: Every file must have docstrings/comments linking to spec/task.
- *Performance*: API responses < 200ms locally; no blocking operations.

## Spec-Driven Workflow Enforcement
- Specs must be organized in /specs/ (features/, api/, database/, ui/).
- Multiple CLAUDE.md files (root, frontend/, backend/) for layered guidance.
- Monorepo structure mandatory for Claude Code context.
- All changes must trace back: Task ID → Spec section → Constitution principle.

## Bonus Features Guidelines
- Reusable Intelligence: Must be implemented as separate agent skills or subagents.
- Cloud-Native Blueprints: Use for Helm/K8s deployments via spec.
- Multi-language (Urdu): Chatbot must handle Urdu input/output seamlessly.
- Voice: Use Web Speech API; no external services.

## Acceptance
This constitution is the single source of truth. Hierarchy: Constitution > Phase Specs > Plans > Tasks.
Last updated: January 01, 2026

## Response snapshot

# Evolution of Todo – Hackathon II Constitution

## Core Principles

### Spec-Driven Only
No code can be written or modified without a direct reference to an approved spec file (@specs/*) and task ID. Manual coding is strictly forbidden.

### No Vibe Coding
All features, architecture, and changes must originate from explicit specifications. Ambiguous prompts must be refined into testable acceptance criteria first.

### Reusable Intelligence Priority
Where possible, implement features as reusable agent skills, subagents, or blueprints for bonus points.

### Security & Privacy
User data isolation must be enforced at every layer (e.g., tasks filtered by authenticated user_id). Use JWT for auth; never expose secrets in code.

### Scalability & Cloud-Native
Design for stateless services, horizontal scaling, and event-driven patterns from Phase III onward.

### Testability
Every feature must have acceptance criteria that are automatable (e.g., via unit tests or demo scripts).

## Tech Stack Constraints

Python: 3.13+ with UV for dependency management.
- Frontend: Next.js 16+ (App Router), TypeScript, Tailwind CSS.
- Backend: FastAPI, SQLModel ORM.
- Database: Neon Serverless PostgreSQL only.
- Auth: Better Auth with JWT tokens (shared BETTER_AUTH_SECRET).
- AI: OpenAI Agents SDK, Official MCP SDK, OpenAI ChatKit.
- Deployment: Docker, Minikube, Helm, DigitalOcean Kubernetes (Phase V).
- Event-Driven: Kafka (or compatible like Redpanda), Dapr for abstraction.
- No additional packages without spec justification.

## Code Quality Standards

Clean Code: PEP8/Python, ESLint/Prettier for TS. Functions < 50 lines where possible.
- Typing: Full type hints in Python (SQLModel) and TypeScript.
- Error Handling: Graceful HTTP exceptions, user-friendly messages in chatbot.
- Logging: Structured logs (JSON) for debugging; no print statements in production code.
- Documentation: Every file must have docstrings/comments linking to spec/task.
- Performance: API responses < 200ms locally; no blocking operations.

## Governance

Spec-Driven Workflow Enforcement:
- Specs must be organized in /specs/ (features/, api/, database/, ui/).
- Multiple CLAUDE.md files (root, frontend/, backend/) for layered guidance.
- Monorepo structure mandatory for Claude Code context.
- All changes must trace back: Task ID → Spec section → Constitution principle.

Bonus Features Guidelines:
- Reusable Intelligence: Must be implemented as separate agent skills or subagents.
- Cloud-Native Blueprints: Use for Helm/K8s deployments via spec.
- Multi-language (Urdu): Chatbot must handle Urdu input/output seamlessly.
- Voice: Use Web Speech API; no external services.

Acceptance: This constitution is the single source of truth. Hierarchy: Constitution > Phase Specs > Plans > Tasks.

**Version**: 1.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-01

## Outcome

- ✅ Impact: Created initial project constitution for "Evolution of Todo" Hackathon II project with 6 core principles, tech stack constraints, code quality standards, and governance rules
- 🧪 Tests: No tests required for constitution creation
- 📁 Files: Updated .specify/memory/constitution.md with complete constitution content
- 🔁 Next prompts: Project can now proceed with feature specifications following the established constitution
- 🧠 Reflection: Constitution successfully captures all requirements from user input and provides a solid foundation for the project's development process

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All constitution requirements met
- Prompt variant (if applicable): Standard constitution creation
- Next experiment (smallest change to try): Begin creating first feature specification following this constitution