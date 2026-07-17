from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Application(Base):
    __tablename__ = "applications"

    id: Mapped[int] = mapped_column(primary_key=True)
    company: Mapped[str] = mapped_column(String(100), nullable=False)
    role: Mapped[str] = mapped_column(String(100), nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"),nullable=False)