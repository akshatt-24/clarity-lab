import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

import json

from backend.app.schemas.biomarker import Biomarker

from backend.app.services.report_generator import (
    generate_report
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

report = generate_report(
    biomarkers[:5]
)

print("\nSUMMARY\n")

print(f"Total Tests : {report['total_tests']}")
print(f"Normal      : {report['normal']}")
print(f"High        : {report['high']}")
print(f"Low         : {report['low']}")

print("\nDETAILED RESULTS\n")

for result in report["results"]:

    print()

    print(
        result.model_dump_json(
            indent=4
        )
    )