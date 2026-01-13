# Quickstart Guide: Auth-JWT-Bridge

**Feature:** specs/2-auth-jwt/spec.md
**Date:** 2026-01-012

## Authentication Bridge Setup

### Prerequisites
- Node.js 18+ for frontend development
- Python 3.9+ for backend development
- Better Auth account or self-hosted instance
- Neon PostgreSQL database

### Environment Variables
Create `.env` files for both frontend and backend:

**Backend (.env):**
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
BETTER_AUTH_SECRET="your-super-secret-jwt-key-here"
BETTER_AUTH_URL="http://localhost:3000"  # Your frontend URL
```

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000/api/auth"
NEXT_PUBLIC_API_BASE_URL="http://localhost:8000"
```

## Step-by-Step Implementation

### STEP 1: Setup Better Auth in Next.js
1. Install Better Auth:
```bash
npm install @better-auth/react @better-auth/client
```

2. Configure Better Auth with JWT plugin:
```javascript
import { betterAuth } from "@better-auth/node";
import { jwt } from "@better-auth/plugins";

export const auth = betterAuth({
  plugins: [
    jwt({
      secret: process.env.BETTER_AUTH_SECRET,
    }),
  ],
  // Additional configuration...
});
```

3. Set up Neon DB connector in your auth configuration

### STEP 2: Create Login/Signup UI
1. Implement Login/Signup forms using Better Auth components
2. Store JWT in client-side state (secure cookies or localStorage)
3. Create authentication context for managing state
4. Implement logout functionality

### STEP 3: Implement verify_jwt utility in FastAPI
1. Install PyJWT:
```bash
pip install pyjwt
```

2. Create JWT verification utility:
```python
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

def verify_jwt(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.BETTER_AUTH_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### STEP 4: Protect '/api/tasks' routes
1. Create current_user dependency:
```python
from fastapi import Depends

async def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    user_data = verify_jwt(token)
    return user_data
```

2. Inject dependency into all protected routes:
```python
@app.get("/api/{user_id}/tasks")
async def get_tasks(user_id: str, current_user: dict = Depends(get_current_user)):
    if current_user['sub'] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this user's tasks")
    # Continue with the request...
```

### STEP 5: Update SQLModel queries
1. Modify queries to filter by authenticated user_id:
```python
def get_user_tasks(user_id: str, db: Session):
    return db.exec(select(Task).where(Task.user_id == user_id)).all()
```

2. Ensure all task operations respect user boundaries
3. Test that User A cannot access User B's tasks

## Testing Security Validation

To ensure User A cannot view User B's tasks even if they guess the Task ID:

1. Log in as User A
2. Create a task and note its ID
3. Log out and log in as User B
4. Attempt to access User A's task using the known ID
5. Verify that a 403 Forbidden or 404 Not Found response is returned

## Running the Application

1. Start the backend server with authentication
2. Start the frontend server with Better Auth integration
3. Navigate to the frontend URL
4. Register a new account or sign in
5. Test that authentication works and user isolation is enforced