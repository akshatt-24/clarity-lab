from pydantic import BaseModel


class NormalBiomarker(BaseModel):

    test_name: str

    value: str

    status: str

    reference_range: str | None = None

    explanation: str | None = None

    possible_causes: list[str] | None = None

    questions_to_ask: list[str] | None = None

    disclaimer: str | None = None









# from pydantic import BaseModel


# class NormalBiomarker(BaseModel):

#     test_name: str

#     value: str

#     status: str