import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
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

result = generate_explanation(
    biomarker
)

print()

print(result.model_dump_json(
    indent=4
))