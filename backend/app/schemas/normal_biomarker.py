from pydantic import BaseModel


class NormalBiomarker(BaseModel):

    test_name: str

    value: str

    status: str