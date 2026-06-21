import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

from backend.app.services.explanation_service import (
    generate_explanation
)

result = generate_explanation(
    test_name="Platelet Count",
    status="LOW"
)

print(result)