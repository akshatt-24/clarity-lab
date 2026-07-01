from sqlalchemy.orm import Session

from backend.app.models.user import User


def get_by_clerk_id(
    db: Session,
    clerk_id: str,
):

    return (
        db.query(User)
        .filter(User.clerk_id == clerk_id)
        .first()
    )


def create_user(
    db: Session,
    clerk_id: str,
    email: str,
):

    user = User(
        clerk_id=clerk_id,
        email=email,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user