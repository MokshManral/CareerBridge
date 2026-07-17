from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("SUPABASE_URL")

if not DATABASE_URL:
  raise RuntimeError("DATABASE_URL is not set. Please add it on .env file. ")

try:
  engine = create_engine(DATABASE_URL)

except Exception as e:
  raise RuntimeError(
        f"Invalid DATABASE_URL: {e}"
  ) from e

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)