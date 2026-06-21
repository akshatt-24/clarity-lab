import os

from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parents[3]

load_dotenv(ROOT_DIR / ".env")

LLM_PROVIDER = os.getenv(
    "LLM_PROVIDER",
    "groq"
)

from google import genai

gemini_client = genai.Client(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

from groq import Groq

groq_client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)

def generate_text(
    prompt: str
):
    if LLM_PROVIDER == "groq":

        try:

            response = groq_client.chat.completions.create(
                model="llama-3.3-70b-versatile",

                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],

                temperature=0.2
            )

            return (
                response
                .choices[0]
                .message
                .content
            )

        except Exception as e:

            print(
                f"Groq failed: {e}"
            )

            print(
                "Falling back to Gemini..."
            )
    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text