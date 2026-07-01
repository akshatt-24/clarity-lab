import re
from backend.app.schemas.biomarker import Biomarker
from backend.app.services.range_analyzer import analyze_range

KNOWN_PARAMETERS = {
    "Haemoglobin",
    "Total W.B.C. Count",
    "Polymorphs",
    "Lymphocytes",
    "Eosinophils",
    "Monocytes",
    "Basophils",
    "Platelet Count",
    "RBC Count",
    "Packed cell volume(PCV)",
    "M.C.V.",
    "M.C.H.",
    "M.C.H.C.",
    "RBC Distribution Width -CV (RDW-CV)",
    "RDW-SD",
    "PDW",
    "MPV",
    "P-LCR",
    "PCT",
    "IG"
}


def is_biomarker_row(line: str) -> bool:

    line = line.strip()

    for parameter in KNOWN_PARAMETERS:

        if line.startswith(parameter):

            return True

    return False

def parse_biomarker_row(line: str):

    matched_parameter = None
    
    line = line.strip()

    for parameter in KNOWN_PARAMETERS:

        if line.startswith(parameter):

            matched_parameter = parameter
            break

    if not matched_parameter:
        return None

    remaining = line[len(matched_parameter):].strip()

    tokens = remaining.split()

    flag = None

    if tokens and tokens[0] in {"H", "L"}:
        flag = tokens[0]
        tokens = tokens[1:]

    if len(tokens) < 3:
        return None

    value = tokens[0]

    unit = tokens[1]

    reference_range = " ".join(tokens[2:])
    
    status = analyze_range(
        value=value,
        reference_range=reference_range
    )

    return Biomarker(
        test_name=matched_parameter,
        value=value,
        unit=unit,
        reference_range=reference_range,
        flag=flag,
        status=status
    )