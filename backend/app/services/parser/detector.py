from enum import Enum
import pdfplumber


class ReportType(str, Enum):
    CBC = "cbc"
    HBA1C = "hba1c"
    LIPID = "lipid"
    THYROID = "thyroid"
    LIVER = "liver"
    KIDNEY = "kidney"
    UNKNOWN = "unknown"


CBC_KEYWORDS = {
    "Haemoglobin",
    "Platelet Count",
    "RBC Count",
    "Total W.B.C. Count",
    "M.C.V.",
    "M.C.H.",
    "M.C.H.C.",
    "RDW",
    "PDW",
    "MPV",
}

HBA1C_KEYWORDS = {
    "HBA1C",
    "GLYCOSYLATED",
    "ESTIMATED AVERAGE GLUCOSE",
    "EAG",
}

LIPID_KEYWORDS = {
    "CHOLESTEROL",
    "HDL",
    "LDL",
    "TRIGLYCERIDES",
    "VLDL",
}

THYROID_KEYWORDS = {
    "TSH",
    "T3",
    "T4",
    "FREE T4",
}

LIVER_KEYWORDS = {
    "SGOT",
    "SGPT",
    "AST",
    "ALT",
    "BILIRUBIN",
    "ALBUMIN",
}

KIDNEY_KEYWORDS = {
    "CREATININE",
    "UREA",
    "BUN",
    "URIC ACID",
}


def extract_text(pdf_path):

    text = []

    with pdfplumber.open(pdf_path) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:

                text.append(page_text)

    return "\n".join(text).upper()


def keyword_score(text, keywords):

    score = 0

    for keyword in keywords:

        if keyword.upper() in text:

            score += 1

    return score


def detect_report_type(pdf_path):

    text = extract_text(pdf_path)

    scores = {
        ReportType.CBC: keyword_score(text, CBC_KEYWORDS),
        ReportType.HBA1C: keyword_score(text, HBA1C_KEYWORDS),
        ReportType.LIPID: keyword_score(text, LIPID_KEYWORDS),
        ReportType.THYROID: keyword_score(text, THYROID_KEYWORDS),
        ReportType.LIVER: keyword_score(text, LIVER_KEYWORDS),
        ReportType.KIDNEY: keyword_score(text, KIDNEY_KEYWORDS),
    }

    report_type = max(scores, key=scores.get)

    if scores[report_type] == 0:
        report_type = ReportType.UNKNOWN

    print(f"Detected Report Type : {report_type.value}")

    return report_type