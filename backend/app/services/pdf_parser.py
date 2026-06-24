import pdfplumber

def extract_text(pdf_path: str):

    full_text = []

    with pdfplumber.open(pdf_path) as pdf:

        for page in pdf.pages:

            text = page.extract_text()

            if text:

                full_text.append(text)

    return "\n".join(full_text)

from backend.app.services.row_extractor import (
    extract_candidate_rows
)

from backend.app.services.biomarker_parser import (
    is_biomarker_row,
    parse_biomarker_row
)


def extract_biomarkers(pdf_path: str):

    text = extract_text(pdf_path)

    rows = extract_candidate_rows(
        text
    )

    biomarkers = []

    for row in rows:

        if is_biomarker_row(row):

            biomarker = parse_biomarker_row(
                row
            )

            if biomarker:

                biomarkers.append(
                    biomarker
                )

    return biomarkers
