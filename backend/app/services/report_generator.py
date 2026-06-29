import time

from backend.app.services.explanation_service import (
    generate_explanation
)

from concurrent.futures import (
    ThreadPoolExecutor
)



def generate_report(biomarkers):

    explanations = []

    for biomarker in biomarkers:

        if biomarker.status == "Normal":
            continue

        explanation = generate_explanation(
            biomarker
        )

        explanations.append(
            explanation
        )

        time.sleep(2)

    return {
        "total_tests": len(biomarkers),
        "normal": sum(
            b.status == "NORMAL"
            for b in biomarkers
        ),
        "high": sum(
            b.status == "HIGH"
            for b in biomarkers
        ),
        "low": sum(
            b.status == "LOW"
            for b in biomarkers
        ),
        "results": explanations
    }