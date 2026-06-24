from backend.app.services.pdf_parser import (
    extract_biomarkers
)

from backend.app.services.report_explanation_service import (
    generate_report_explanations
)

def process_report(
    pdf_path
):
    print("STEP 1: Parsing PDF...")
    
    biomarkers = extract_biomarkers(str(pdf_path))
    
    print(
        f"Found {len(biomarkers)} biomarkers"
    )
    
    print(
        "STEP 2: Generating report..."
    )
    
    report = generate_report_explanations(
        biomarkers[:5]
    )
    
    return report