from pydantic import BaseModel

class BiomarkerInsight(BaseModel):
    
    test_name: str
    
    value: str
    
    status: str
    
    explanation: str
    
    questions: list[str]
    
class ReportResponse(BaseModel):
    
    overall_summary: str
    
    biomarkers: list[BiomarkerInsight]
    
## backend -> frontend contract for the report response