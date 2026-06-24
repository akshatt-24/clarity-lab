import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

from backend.app.services.pipeline import (
    process_report
)

report = process_report(
    "uploads/lab_test_report.pdf"
)

print(
    report.model_dump_json(
        indent=4
    )
)