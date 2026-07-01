from .detector import (
    detect_report_type,
    ReportType,
)

from .cbc_parser import extract_biomarkers as parse_cbc
from .hba1c_parser import extract_biomarkers as parse_hba1c


def parse_report(pdf_path):

    report_type = detect_report_type(pdf_path)

    if report_type == ReportType.CBC:

        print("Using CBC parser")

        return parse_cbc(pdf_path)

    elif report_type == ReportType.HBA1C:

        print("Using HbA1c parser")

        return parse_hba1c(pdf_path)

    else:

        print("No parser available for this report.")

        return []