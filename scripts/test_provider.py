import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

from backend.app.services.llm_service import (
    generate_text
)

response = generate_text(
    """
Return JSON only.

{
    "message":"hello"
}
"""
)

print(response)