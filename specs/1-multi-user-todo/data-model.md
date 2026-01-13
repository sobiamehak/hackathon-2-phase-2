# Data Model: Multi-User Todo Web Application

**Feature:** specs/1-multi-user-todo/spec.md
**Date:** 2026-01-12
**Status:** Defined

## User Entity

**Table:** `users` (managed by Better Auth)

**Fields:**
- `id`: UUID (Primary Key, auto-generated)
- `email`: VARCHAR(255) (Unique, Required)
- `password_hash`: VARCHAR(255) (Required, encrypted)
- `created_at`: TIMESTAMP (Auto-generated)
- `updated_at`: TIMESTAMP (Auto-generated)

**Relationships:**
- One-to-Many: User has many Tasks

## Task Entity

**Table:** `tasks`

**Fields:**
- `id`: UUID (Primary Key, auto-generated)
- `title`: VARCHAR(200) (Required, Length: 1-200 characters)
- `description`: TEXT (Optional)
- `completed`: BOOLEAN (Default: false)
- `user_id`: UUID (Foreign Key → users.id, Required)
- `created_at`: TIMESTAMP (Auto-generated)
- `updated_at`: TIMESTAMP (Auto-generated)

**Validation Rules:**
- Title must be between 1 and 200 characters
- User_id must reference an existing user
- Completed defaults to false on creation

**State Transitions:**
- New task: completed = false
- Task completed: completed = true
- Task uncompleted: completed = false

## Relationships

**User → Task (One-to-Many)**
- A user can own multiple tasks
- Foreign key constraint ensures referential integrity
- Cascade delete: When user is deleted, all their tasks are deleted

## Indexes

- Primary Key indexes on `id` for both tables
- Foreign Key index on `user_id` in tasks table for efficient user-based queries
- Index on `completed` field for status filtering
- Unique index on `email` in users table

## Constraints

- NOT NULL constraints on required fields
- Foreign Key constraint between tasks.user_id and users.id
- Check constraint on title length (1-200 characters)
- Unique constraint on email addresses