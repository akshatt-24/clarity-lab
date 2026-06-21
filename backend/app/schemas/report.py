from pydantic import BaseModel

from backend.app.schemas.explanation import (
    BiomarkerExplanation
)


class ReportExplanation(BaseModel):

    summary: str

    normal_count: int

    high_count: int

    low_count: int

    biomarkers: list[BiomarkerExplanation]