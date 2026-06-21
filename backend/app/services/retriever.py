from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient

from backend.app.services.cache import (
    retrieval_cache
)

COLLECTION_NAME = "medical_knowledge"

client = QdrantClient(
    host="localhost",
    port=6333
)

embedding_model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

def retrieve_context(
    query: str,
    limit: int = 3
):

    cache_key = query.lower()

    if cache_key in retrieval_cache:

        print("CACHE HIT")

        return retrieval_cache[cache_key]

    query_vector = embedding_model.encode(
        query
    ).tolist()

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=limit
    )

    contexts = [
        point.payload["text"]
        for point in results.points
    ]

    retrieval_cache[cache_key] = contexts

    return contexts