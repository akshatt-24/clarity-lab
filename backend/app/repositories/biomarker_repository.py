from sqlalchemy.orm import Session

from backend.app.models.biomarker import Biomarker


def create_biomarker(
    db: Session,
    report_id: int,
    biomarker,
):

    row = Biomarker(

        report_id=report_id,

        test_name=biomarker.test_name,

        value=biomarker.value,

        reference_range=biomarker.reference_range,

        status=biomarker.status,
    )

    db.add(row)

    return row


def create_many(
    db: Session,
    report_id: int,
    biomarkers,
):

    for biomarker in biomarkers:

        create_biomarker(
            db,
            report_id,
            biomarker,
        )

    db.commit()