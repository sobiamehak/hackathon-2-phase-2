# Data Model: Task-CRUD-Ownership

**Feature:** specs/3-task-crud/spec.md
**Date:** 2026-01-12
**Status:** Defined

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

**Constraints:**
- NOT NULL constraints on required fields
- Foreign Key constraint between tasks.user_id and users.id
- Check constraint on title length (1-200 characters)
- User_id must match authenticated user's ID for operations

**Indexes:**
- Primary Key index on `id`
- Foreign Key index on `user_id` for efficient user-based queries
- Index on `completed` field for status filtering

## Validation Rules

**Title Validation:**
- Must be between 1 and 200 characters
- Required field (not null)
- Trimmed of leading/trailing whitespace

**User Ownership Validation:**
- All operations must verify user_id matches authenticated user
- Cannot create task for another user
- Cannot view another user's task
- Cannot update another user's task
- Cannot delete another user's task

**State Transitions:**
- New task: completed = false (default)
- Task completed: completed = true
- Task uncompleted: completed = false

## Relationships

**User → Task (One-to-Many)**
- A user can own multiple tasks
- Foreign key constraint ensures referential integrity
- When user is deleted, all their tasks are deleted (cascade delete)

## Security Constraints

**Database Level:**
- Foreign key constraint ensures tasks are linked to valid users
- No direct access to other users' tasks possible at database level

**Application Level:**
- Every query must include WHERE clause: Task.user_id == current_user.id
- All operations validate user ownership before execution
- Return 403 Forbidden if user tries to access another user's task

## API Access Patterns

**Secure Query Examples:**
- List tasks: `SELECT * FROM tasks WHERE user_id = ?`
- Get task: `SELECT * FROM tasks WHERE id = ? AND user_id = ?`
- Update task: `UPDATE tasks SET ... WHERE id = ? AND user_id = ?`
- Delete task: `DELETE FROM tasks WHERE id = ? AND user_id = ?`
- Toggle completion: `UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?`