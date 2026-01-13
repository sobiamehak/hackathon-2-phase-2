# Quickstart Guide: Task-CRUD-Ownership

**Feature:** specs/3-task-crud/spec.md
**Date:** 2026-01-12

## Task Management with User Ownership

### Prerequisites
- Python 3.9+ for backend development
- Node.js 18+ for frontend development
- Neon PostgreSQL database
- Authentication system with current user identification

### Environment Variables
**Backend (.env):**
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
BETTER_AUTH_SECRET="your-super-secret-jwt-key-here"
```

## Step-by-Step Implementation

### STEP 1: Define SQLModel 'Task' with 'user_id' foreign key and title validation (1-200 chars)
1. Install SQLModel:
```bash
pip install sqlmodel
```

2. Create Task model with foreign key and validation:
```python
from sqlmodel import SQLModel, Field, create_engine
from typing import Optional
from datetime import datetime
import uuid

class TaskBase(SQLModel):
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = None
    completed: bool = False

class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

### STEP 2: Implement POST /api/tasks to automatically assign current_user.id to the task
1. Create POST endpoint with current user injection:
```python
from fastapi import Depends, HTTPException
from sqlmodel import Session, select

@app.post("/api/tasks", response_model=Task)
def create_task(task_data: TaskCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Automatically assign current_user.id to the task
    task = Task(**task_data.dict(), user_id=current_user.id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
```

### STEP 3: Implement GET /api/tasks to filter results strictly by the authenticated user's ID
1. Create GET endpoint with user filtering:
```python
@app.get("/api/tasks", response_model=list[Task])
def get_tasks(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Filter results strictly by authenticated user's ID
    statement = select(Task).where(Task.user_id == current_user.id)
    tasks = db.exec(statement).all()
    return tasks
```

### STEP 4: Implement PATCH /api/tasks/{id} for toggling 'is_completed' with ownership check
1. Create PATCH endpoint with ownership validation:
```python
@app.patch("/api/tasks/{task_id}", response_model=Task)
def toggle_task_completion(task_id: uuid.UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Verify task belongs to current_user.id
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    task = db.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Toggle is_completed field
    task.completed = not task.completed
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
```

### STEP 5: Implement DELETE /api/tasks/{id} ensuring users can only delete their own tasks
1. Create DELETE endpoint with ownership validation:
```python
@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: uuid.UUID, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Verify task belongs to current_user.id
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    task = db.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Delete task if ownership confirmed
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}
```

### STEP 6: Build Next.js Dashboard UI with Task List, Toggle, and Delete buttons
1. Create dashboard page with task management:
```jsx
// pages/dashboard.jsx
'use client';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  // Toggle task completion
  const toggleTask = async (taskId) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    // Refresh tasks
    // ...refresh logic
  };

  // Delete task
  const deleteTask = async (taskId) => {
    await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    // Refresh tasks
    // ...refresh logic
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Security Validation

**Core Security Rule Enforcement:**
- Every database operation includes WHERE clause: Task.user_id == current_user.id
- Verify that users cannot access tasks belonging to other users
- Test edge cases where user tries to access other users' tasks by ID
- Ensure proper error responses for unauthorized access attempts

## Testing Security

To verify the security rule "Never perform a DB operation without a 'where(Task.user_id == current_user.id)' clause":

1. Log in as User A
2. Create a task and note its ID
3. Log out and log in as User B
4. Attempt to access User A's task using the known ID
5. Verify that a 403 Forbidden or 404 Not Found response is returned