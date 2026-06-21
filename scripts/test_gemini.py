import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.append(str(ROOT))

from backend.app.services.llm_service import client

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain what platelets do in one sentence."
)

print(response.text)