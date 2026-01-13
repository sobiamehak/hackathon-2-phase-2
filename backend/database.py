from sqlmodel import create_engine, Session
from sqlalchemy.pool import QueuePool
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# Create engine with enhanced connection pooling
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=10,  # Increased pool size for better performance
    max_overflow=20,  # Allow more connections during peak load
    pool_pre_ping=True,  # Verify connections before use
    pool_recycle=300,  # Recycle connections every 5 minutes
    pool_timeout=30,  # Wait up to 30 seconds for a connection
    echo=False,  # Set to True for SQL query logging (useful for debugging)
)

def get_session():
    with Session(engine) as session:
        yield session