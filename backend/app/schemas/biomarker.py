from pydantic import BaseModel


class Biomarker(BaseModel):

    test_name: str

    value: str

    unit: str

    reference_range: str

    flag: str | None = None

    status: str | None = None