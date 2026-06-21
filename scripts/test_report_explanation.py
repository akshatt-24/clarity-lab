import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

import json

from backend.app.schemas.biomarker import Biomarker

from backend.app.services.report_explanation_service import (
    generate_report_explanations
)

with open(
    "output/biomarkers.json",
    "r",
    encoding="utf-8"
) as f:

    data = json.load(f)

biomarkers = [
    Biomarker(**item)
    for item in data
]

report = generate_report_explanations(
    biomarkers[:5]
)

print(
    report.model_dump_json(
        indent=4
    )
)