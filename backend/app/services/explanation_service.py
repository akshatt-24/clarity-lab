import json

from backend.app.schemas.explanation import (
    BiomarkerExplanation
)

from backend.app.services.llm_service import (
    client,
    MODEL_NAME
)

from backend.app.services.retriever import (
    retrieve_context
)

from backend.app.services.cache import (
    explanation_cache
)


def generate_explanation(
    biomarker
):
    
    cache_key = (
        f"{biomarker.test_name}"
        f"_{biomarker.status}"
    ).lower()

    if cache_key in explanation_cache:

        print(
            f"CACHE HIT: {cache_key}"
        )

        return explanation_cache[
            cache_key
        ]

    contexts = retrieve_context(
        biomarker.test_name
    )

    context_text = "\n\n".join(
        contexts
    )

    prompt = f"""
You are a medical health literacy assistant.

Your purpose is to explain laboratory
results in simple, calm language.

IMPORTANT RULES:

- Do not diagnose diseases.
- Do not mention severe diseases
  unless directly supported by context.
- Focus on common and benign causes first.
- Do not create fear.
- Explain the result clearly.
- This is educational information only.

Biomarker:
{biomarker.test_name}

Value:
{biomarker.value}

Reference Range:
{biomarker.reference_range}

Status:
{biomarker.status}

Medical Context:
{context_text}

Return ONLY valid JSON.

{{
    "test_name": "...",
    "value": "...",
    "reference_range": "...",
    "status": "...",
    "explanation": "...",
    "possible_causes": [
        "...",
        "..."
    ],
    "questions_to_ask": [
        "...",
        "..."
    ],
    "disclaimer": "..."
}}

No markdown.
No code fences.
No extra text.
"""
    # print("CALLING GEMINI") # DEBUG STATEMENT
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    data = json.loads(
        response.text
    )

    validated = BiomarkerExplanation(**data)

    explanation_cache[cache_key] = validated

    return validated