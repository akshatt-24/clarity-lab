from sqlalchemy.orm import Session

from backend.app.repositories.report_repository import (
    get_report_by_id,
)

from backend.app.repositories.biomarker_repository import (
    get_by_report,
)

from backend.app.schemas.report_detail import (
    ReportDetail,
    SavedBiomarker,
)


def load_report(
    db: Session,
    report_id: str,
):

    report = get_report_by_id(
        db,
        report_id,
    )

    if report is None:

        return None

    rows = get_by_report(
        db,
        report_id,
    )

    normal = []

    attention = []

    high = 0

    low = 0

    for row in rows:

        biomarker = SavedBiomarker(

            test_name=row.test_name,

            value=row.value,

            reference_range=row.reference_range,

            status=row.status,

            explanation=row.explanation,

            possible_causes=row.possible_causes or [],

            questions_to_ask=row.questions_to_ask or [],

            disclaimer=row.disclaimer,

        )

        if row.status.upper() == "NORMAL":

            normal.append(
                biomarker
            )

        else:

            attention.append(
                biomarker
            )

            if row.status.upper() == "HIGH":

                high += 1

            elif row.status.upper() == "LOW":

                low += 1

    return ReportDetail(

        report_id=report.id,

        summary=report.summary,

        normal_count=len(normal),

        high_count=high,

        low_count=low,

        attention_required=attention,

        normal_biomarkers=normal,

        biomarkers=attention,
    )