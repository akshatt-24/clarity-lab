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

    context_text = build_context(
        biomarkers
    )

    prompt = f"""
You are a consumer health literacy assistant.

Explain every biomarker.

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

  "normal_count": 0,

  "high_count": 0,

  "low_count": 0,

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
    response_text = generate_text(prompt)
    from backend.app.utils.json_utils import (clean_json)
    
    response_text = clean_json(response_text)
  
    data = json.loads(
        response_text
    )

    return ReportExplanation(
        **data
    )