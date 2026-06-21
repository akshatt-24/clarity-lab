import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from sentence_transformers import SentenceTransformer

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

from backend.app.services.text_chunker import chunk_text


COLLECTION_NAME = "medical_knowledge"

DATA_DIR = Path("data/knowledge_base")


def main():

    print("Loading embedding model...")

    model = SentenceTransformer(
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    print("Connecting to Qdrant...")

    client = QdrantClient(
        host="localhost",
        port=6333
    )

    print("Creating collection if not exists...")

    try:
        client.get_collection(COLLECTION_NAME)

    except Exception:

        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=384,
                distance=Distance.COSINE
            )
        )

    points = []

    files = list(DATA_DIR.glob("*.md"))

    point_id = 0

    for file in files:

        text = file.read_text(encoding="utf-8")

        chunks = chunk_text(text)

        for chunk_index, chunk in enumerate(chunks):

            embedding = model.encode(chunk).tolist()

            points.append(
                PointStruct(
                    id=point_id,
                    vector=embedding,
                    payload={
                        "filename": file.name,
                        "chunk_id": chunk_index,
                        "text": chunk
                    }
                )
            )

            point_id += 1

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

    print(f"Inserted {len(points)} documents")


if __name__ == "__main__":
    main()