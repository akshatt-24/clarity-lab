import json
from pathlib import Path


def export_biomarkers(
    biomarkers,
    output_file="output/biomarkers.json"
):

    Path("output").mkdir(
        exist_ok=True
    )

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            [b.model_dump() for b in biomarkers],
            f,
            indent=4
        )

    return output_file