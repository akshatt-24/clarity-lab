from pydantic import BaseModel

from backend.app.schemas.explanation import (
    BiomarkerExplanation
)

from backend.app.schemas.normal_biomarker import (
    NormalBiomarker
)


class ReportExplanation(BaseModel):

    summary: str

    normal_count: int

    high_count: int

    low_count: int

    attention_required: list[
        BiomarkerExplanation
    ]

    normal_biomarkers: list[
        NormalBiomarker
    ]

    biomarkers: list[
        BiomarkerExplanation
    ]