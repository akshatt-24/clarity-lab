import re

from backend.app.schemas.biomarker import Biomarker
from backend.app.services.cbc_parser_core import extract_text
from backend.app.services.range_analyzer import analyze_range


def extract_biomarkers(pdf_path: str):

    text = extract_text(pdf_path)

    biomarkers = []

    # -----------------------------
    # HbA1c
    # Example:
    # HBA1C 6.3 High
    # -----------------------------

    hba1c_pattern = re.search(
        r"HBA1C\s+([\d\.]+)\s+(High|Low|Normal)?",
        text,
        re.IGNORECASE,
    )

    if hba1c_pattern:

        value = hba1c_pattern.group(1)

        flag = (
            hba1c_pattern.group(2).upper()
            if hba1c_pattern.group(2)
            else None
        )

        reference_range = "< 5.7"

        biomarkers.append(
            Biomarker(
                test_name="HbA1c",
                value=value,
                unit="%",
                reference_range=reference_range,
                flag=flag,
                status=analyze_range(
                    value=value,
                    reference_range=reference_range,
                ),
            )
        )

    # -----------------------------------------
    # Estimated Average Glucose (eAG)
    #
    # Example:
    #
    # ESTIMATED AVERAGE GLUCOSE(EAG)
    # 134.1 High <116 mg/dL
    #
    # -----------------------------------------

    eag_pattern = re.search(
        r"ESTIMATED\s+AVERAGE\s+GLUCOSE.*?([\d\.]+)\s+(High|Low|Normal)?",
        text,
        re.IGNORECASE | re.DOTALL,
    )

    if eag_pattern:

        value = eag_pattern.group(1)

        flag = (
            eag_pattern.group(2).upper()
            if eag_pattern.group(2)
            else None
        )

        reference_range = "< 116"

        biomarkers.append(
            Biomarker(
                test_name="Estimated Average Glucose",
                value=value,
                unit="mg/dL",
                reference_range=reference_range,
                flag=flag,
                status=analyze_range(
                    value=value,
                    reference_range=reference_range,
                ),
            )
        )

    print(f"HbA1c parser extracted: {len(biomarkers)} biomarkers")

    return biomarkers