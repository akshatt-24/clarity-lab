from pydantic import BaseModel


class BiomarkerExplanation(BaseModel):

    test_name: str

    value: str

    reference_range: str

    status: str

    explanation: str

    possible_causes: list[str]

    questions_to_ask: list[str]

    disclaimer: str