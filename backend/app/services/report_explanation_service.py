import json

from backend.app.services.retriever import (
    retrieve_context
)

from backend.app.schemas.report import (
    ReportExplanation
)

from backend.app.services.llm_service import (
    generate_text
)

def build_context(
    biomarkers
):

    context_sections = []

    for biomarker in biomarkers:

        if biomarker.status == "Normal":
            continue

        contexts = retrieve_context(
            biomarker.test_name
        )

        joined = "\n".join(
            contexts
        )

        context_sections.append(
            f"""
            TEST:
            {biomarker.test_name}

            VALUE:
            {biomarker.value}

            REFERENCE:
            {biomarker.reference_range}

            STATUS:
            {biomarker.status}

            KNOWLEDGE:
            {joined}
            """
                    )

    return "\n\n".join(
        context_sections
    )
    
def generate_report_explanations(biomarkers):
    
    # print("\nBIOMARKER STATUSES:\n")
    ## for DEBUG

    # for b in biomarkers:
    #     print(
    #         b.test_name,
    #         "=>",
    #         b.status
    #     )
    normal_count = sum(
        1 for b in biomarkers
        if str(b.status).lower() == "normal"
    )

    low_count = sum(
        1 for b in biomarkers
        if str(b.status).lower() == "low"
    )

    high_count = sum(
        1 for b in biomarkers
        if str(b.status).lower() == "high"
    )
    
    from backend.app.schemas.normal_biomarker import (
        NormalBiomarker,
    )

    normal_biomarkers = [

        NormalBiomarker(

            test_name=b.test_name,

            value=b.value,

            status=b.status,

            reference_range=b.reference_range,

        )

        for b in biomarkers

        if str(b.status).lower() == "normal"

    ]
    
    abnormal_biomarkers = [
        b
        for b in biomarkers
        if str(b.status).lower() != "normal"
    ]

    context_text = build_context(
        abnormal_biomarkers
    )
    
    if not context_text.strip():

        context_text = (
            "No medical knowledge available."
        )

    prompt = f"""
    You are a consumer health literacy assistant.

    Explain only the biomarkers that require attention.

    Use calm language.

    Do not diagnose disease.

    Do not create fear.

    Provide:

    1. Plain English explanation
    2. Common causes
    3. Questions for doctor

    Report Data:

    {context_text}

    Return ONLY JSON.

    {{
    "summary": "...",

    "normal_count": {normal_count},

    "high_count": {high_count},

    "low_count": {low_count},
    
    "attention_required": [
    {{
        "test_name": "...",
        "value": "...",
        "reference_range": "...",
        "status": "...",
        "explanation": "...",
        "possible_causes": [],
        "questions_to_ask": [],
        "disclaimer": "..."
    }}
    ],

    "normal_biomarkers": [
    {{
        "test_name": "...",
        "value": "...",
        "status": "Normal"
    }}
    ],

    "biomarkers": [
        {{
        "test_name": "...",
        "value": "...",
        "reference_range": "...",
        "status": "...",
        "explanation": "...",
        "possible_causes": [],
        "questions_to_ask": [],
        "disclaimer": "..."
        }}
    ]
    }}
    """
    
    if not abnormal_biomarkers:

        return ReportExplanation(
            summary="All biomarkers are within normal range.",
            normal_count=normal_count,
            high_count=0,
            low_count=0,
            attention_required=[],
            normal_biomarkers=normal_biomarkers,
            biomarkers=[]
        )
        
    response_text = generate_text(prompt)
    
    from backend.app.utils.json_utils import (clean_json)
    
    response_text = clean_json(response_text)
  
    data = json.loads(
        response_text
    )
    data["normal_count"] = normal_count
    data["high_count"] = high_count
    data["low_count"] = low_count

    data["normal_biomarkers"] = (
        normal_biomarkers
    )
    data["attention_required"] = (
        data.get("attention_required", [])
    )

    data["biomarkers"] = (
        data["attention_required"]
    )

    return ReportExplanation(
        **data
    )