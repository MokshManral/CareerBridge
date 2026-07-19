from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routers.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "API is running"}