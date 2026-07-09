from uuid import UUID
from pydantic import BaseModel


class SavedBiomarker(BaseModel):

    test_name: str

    value: float

    reference_range: str | None = None

    status: str

    explanation: str | None = None

    possible_causes: list[str] | None = []

    questions_to_ask: list[str] | None = []

    disclaimer: str | None = None

    class Config:
        from_attributes = True


class ReportDetail(BaseModel):

    report_id: UUID

    summary: str

    normal_count: int

    high_count: int

    low_count: int

    attention_required: list[SavedBiomarker]

    normal_biomarkers: list[SavedBiomarker]

    biomarkers: list[SavedBiomarker]