from backend.app.services.cbc_parser_core import (
    extract_biomarkers
)

from backend.app.services.report_explanation_service import (
    generate_report_explanations
)

from backend.app.repositories.report_repository import (
    create_report,
)

from backend.app.repositories.biomarker_repository import (
    create_many,
)

from backend.app.services.validator import (
    validate_biomarkers
)
from backend.app.services.parser.router import (
    parse_report,
)



from sqlalchemy.orm import Session

def process_report(
    pdf_path,
    db: Session,
):
    print("STEP 1: Parsing PDF...")
    
    biomarkers = parse_report(pdf_path)
    
    ## Debug log - 1
    # print("Parser extracted:", len(biomarkers))
    
    biomarkers = validate_biomarkers(biomarkers)
    ## Debug log - 2
    # print("Validator returned:", len(biomarkers))
    
    print(
        f"Found {len(biomarkers)} biomarkers"
    )
    
    print(
        "STEP 2: Generating report..."
    )
    
    report = generate_report_explanations(
        biomarkers
    )
    ## Saving the report after generation immediately.
    saved_report = create_report(
    db=db,
    user_id=None,
    filename=pdf_path.name,
    summary=report.summary,
    )
    ## Saving the parsed biomarkers (not the LLM generated explanations)
    create_many(
    db=db,
    report_id=saved_report.id,
    biomarkers=biomarkers,
    )
    
    report.report_id = saved_report.id
    
    return report