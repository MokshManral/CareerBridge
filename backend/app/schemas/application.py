from pydantic import BaseModel


class ApplicationCreate(BaseModel):
    company: str
    role: str
    status: str


class ApplicationUpdate(BaseModel):
    company: str | None = None
    role: str | None = None
    status: str | None = None


class ApplicationResponse(BaseModel):
    id: int
    company: str
    role: str
    status: str
    user_id: int

    model_config = {
        "from_attributes": True
    }