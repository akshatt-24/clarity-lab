import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

from backend.app.services.retriever import (
    retrieve_context
)

query = input(
    "Ask a biomarker question: "
)

contexts = retrieve_context(query)

print("\nRetrieved Context:\n")

for i, context in enumerate(
        contexts,
        start=1
    ):

    print(f"\n--- Context {i} ---\n")

    print(context)