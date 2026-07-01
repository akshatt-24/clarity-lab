import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

from backend.app.services.cbc_parser_core import extract_text
from backend.app.services.row_extractor import extract_candidate_rows

from backend.app.services.biomarker_parser import (
    is_biomarker_row,
    parse_biomarker_row
)

from backend.app.services.export_service import export_biomarkers

biomarkers = []

pdf_path = "sample_reports/lab_test_report.pdf"

text = extract_text(pdf_path)

rows = extract_candidate_rows(text)

for row in rows:

    if is_biomarker_row(row):

        biomarker = parse_biomarker_row(row)

        if biomarker:

            # print(biomarker.model_dump())
            biomarkers.append(biomarker)
            file_path = export_biomarkers(
                biomarkers
            )
            print(f"Saved to {file_path}")
            
            # if biomarker.flag:

            #     expected = (
            #         "HIGH"
            #         if biomarker.flag == "H"
            #         else "LOW"
            #     )

            #     if biomarker.status != expected:

            #         print(
            #             f"WARNING: Flag mismatch for "
            #             f"{biomarker.test_name}"
            #         )