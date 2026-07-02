from sqlalchemy.orm import Session

from backend.app.models.report import Report


def create_report(
    db: Session,
    user_id: int | None,
    filename: str,
    summary: str,
):
    report = Report(
        user_id=user_id,
        file_name=filename,
        summary=summary,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


def get_reports(db: Session):

    return (
        db.query(Report)
        .order_by(Report.uploaded_at.desc())
        .all()
    )


def get_report(
    db: Session,
    report_id: str,
):

    return (
        db.query(Report)
        .filter(Report.id == report_id)
        .first()
    )


def delete_report(
    db: Session,
    report: Report,
):

    db.delete(report)
    db.commit()