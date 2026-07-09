from sqlalchemy.orm import Session

from backend.app.models.biomarker import Biomarker


def create_biomarker(
    db: Session,
    report_id: str,
    biomarker,
):

    row = Biomarker(

        report_id=report_id,

        test_name=biomarker.test_name,

        value=biomarker.value,

        reference_range=biomarker.reference_range,

        status=biomarker.status,

        explanation=getattr(
            biomarker,
            "explanation",
            None,
        ),

        possible_causes=getattr(
            biomarker,
            "possible_causes",
            None,
        ),

        questions_to_ask=getattr(
            biomarker,
            "questions_to_ask",
            None,
        ),

        disclaimer=getattr(
            biomarker,
            "disclaimer",
            None,
        ),
    )

    db.add(row)

    return row


def create_many(
    db: Session,
    report_id: str,
    biomarkers,
):

    for biomarker in biomarkers:

        create_biomarker(
            db,
            report_id,
            biomarker,
        )

    db.commit()


def get_by_report(
    db: Session,
    report_id: str,
):
    return (
        db.query(Biomarker)
        .filter(Biomarker.report_id == report_id)
        .all()
    )