from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from auth import UserCreate, authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_password_hash
from database import get_session
from models import User
from datetime import timedelta
from typing import Annotated

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
async def register_user(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Register a new user.
    """
    try:
        # Begin transaction - the session context manager handles this automatically
        # Check if user already exists
        existing_user = session.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Create new user
        hashed_password = get_password_hash(user_data.password)
        user = User(email=user_data.email, password_hash=hashed_password)

        session.add(user)
        session.commit()
        session.refresh(user)

        return {"message": "User created successfully", "user_id": user.id}
    except Exception as e:
        # Session rollback happens automatically if an exception occurs
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login")
async def login_user(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Login a user and return an access token.
    """
    try:
        user = authenticate_user(session, user_data.email, user_data.password)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": str(user.id), "email": user.email},
            expires_delta=access_token_expires
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": user.id,
            "email": user.email
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login failed: {str(e)}"
        )


@router.post("/logout")
async def logout_user():
    """
    Logout the current user.
    """
    # In a real implementation, you might want to blacklist the token
    # or perform other cleanup operations
    return {"message": "Logged out successfully"}