from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends,
)

from pathlib import Path
import shutil

from sqlalchemy.orm import Session

from backend.app.db.database import get_db

from backend.app.services.pipeline import (
    process_report,
)

from backend.app.repositories.report_repository import (
    get_reports,
)

from backend.app.schemas.report_history import (
    ReportHistoryItem,
)

from backend.app.services.report_history_service import (
    load_report,
)

from backend.app.schemas.report_detail import (
    ReportDetail,
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.get("/health")
def health():
    return {
        "status": "ok"
    }


@router.post("/upload")
async def upload_report(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    filepath = UPLOAD_DIR / file.filename

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    try:
        report = process_report(
            filepath,
            db,
        )

        return report.model_dump()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get(
    "/history",
    response_model=list[ReportHistoryItem],
)
def report_history(
    db: Session = Depends(get_db),
):
    return get_reports(db)


@router.get(
    "/{report_id}",
    response_model=ReportDetail,
)
def get_saved_report(
    report_id: str,
    db: Session = Depends(get_db),
):

    report = load_report(
        db,
        report_id,
    )

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return report