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
    ## WORKS !!
    # print("========== PDF TEXT ==========")
    # print(text[:1500])
    # print("==============================")

    rows = extract_candidate_rows(
        text
    )
    
    ## WORKS
    # print("Rows extracted:", len(rows))

    # for r in rows[:15]:
    #     print(r)

    biomarkers = []

    for row in rows:

        result = is_biomarker_row(row)

        # print(repr(row))

        if result:

            biomarker = parse_biomarker_row(
                row
            )

            if biomarker:

                biomarkers.append(
                    biomarker
                )

    return biomarkers
