from backend.app.schemas.biomarker import (
    Biomarker
)

import re

# " 5.30 " -> 5.30 
def clean_value(
    value: str,
) -> str:

    if value is None:
        return ""

    value = value.strip()

    value = value.replace(",", "")

    value = re.sub(
        r"\s+",
        "",
        value,
    )

    return value

# normal , Normal, NORMAL  --> NORMAL 
def normalize_status(
    status: str,
) -> str:

    if not status:

        return "UNKNOWN"

    status = status.strip().upper()

    mapping = {

        "NORMAL": "NORMAL",

        "LOW": "LOW",

        "HIGH": "HIGH",

    }

    return mapping.get(
        status,
        "UNKNOWN",
    )
    
## Haemoglobin, haemoglobin, HAEMOGLOBIN --> all become identical  
def normalize_name(
    name: str,
) -> str:
    name = re.sub(
        r"\s+",
        " ",
        name.strip()
    )

    return name.upper()
    # return (
    #     name.strip()
    #         .replace("  ", " ")
    #         .upper()
    # )
    
def remove_duplicates(
    biomarkers: list[Biomarker],
) -> list[Biomarker]:

    unique = {}

    for biomarker in biomarkers:

        key = normalize_name(
            biomarker.test_name
        )

        if key not in unique:

            unique[key] = biomarker

    return list(
        unique.values()
    )
    

def is_numeric(
    value: str,
) -> bool:

    try:

        float(value)

        return True

    except (
        ValueError,
        TypeError,
    ):

        return False


def validate_biomarkers(
    biomarkers: list[Biomarker],
) -> list[Biomarker]:

    valid = []

    for biomarker in biomarkers:

        biomarker.value = clean_value(
            biomarker.value
        )

        biomarker.status = normalize_status(
            biomarker.status
        )

        biomarker.test_name = normalize_name(
            biomarker.test_name
        )

        if not biomarker.test_name:

            print(
                "Skipping empty biomarker name."
            )

            continue

        if not is_numeric(
            biomarker.value
        ):

            print(
                f"Skipping parser artifact: "
                f"{biomarker.test_name}"
            )

            continue

        valid.append(
            biomarker
        )

    valid = remove_duplicates(
        valid
    )

    print(
        f"Validator kept "
        f"{len(valid)}/{len(biomarkers)} biomarkers."
    )

    return valid