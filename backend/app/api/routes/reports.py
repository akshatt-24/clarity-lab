from fastapi import (APIRouter, 
                    UploadFile,
                    File ,
                    HTTPException
                    )
from pathlib import Path
import shutil

from backend.app.services.pipeline import (  
    process_report
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)
UPLOAD_DIR = Path(
        "uploads"
    )

UPLOAD_DIR.mkdir(
    exist_ok=True
)

@router.get("/health")
def health():
    
    return {
        "status": "ok"
    }
    
@router.post("/upload")
async def upload_report(
    file: UploadFile = File(...)
):

    filepath = (
        UPLOAD_DIR /
        file.filename
    )

    with open(
        filepath,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )
        
    try:
        report = process_report(
                    filepath
                )

        return report.model_dump()
    
    except Exception as e:
        
        raise HTTPException(
            status_code = 500,
            detail = str(e)
        )
    
    