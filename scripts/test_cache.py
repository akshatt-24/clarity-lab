import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT))


from backend.app.schemas.biomarker import Biomarker

from backend.app.services.explanation_service import (
    generate_explanation
)

biomarker = Biomarker(
    test_name="Platelet Count",
    value="138",
    unit="10^3/ul",
    reference_range="150 - 450",
    flag="L",
    status="LOW"
)

print("\nFIRST CALL\n")

generate_explanation(
    biomarker
)

print("\nSECOND CALL\n")

generate_explanation(
    biomarker
)