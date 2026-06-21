# from sentence_transformers import SentenceTransformer

# model = SentenceTransformer(
#     "sentence-transformers/all-MiniLM-L6-v2"
# )

# vector = model.encode("What is ALT?")

# print(len(vector))

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from backend.app.services.retriever import retrieve_context

contexts = retrieve_context("Platelet Count")

for c in contexts:
    print(c)