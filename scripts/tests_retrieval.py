from sentence_transformers import SentenceTransformer

from qdrant_client import QdrantClient


COLLECTION_NAME = "medical_knowledge"


def main():

    query = input("Ask a question: ")

    model = SentenceTransformer(
        "sentence-transformers/all-MiniLM-L6-v2"
    )

    client = QdrantClient(
        host="localhost",
        port=6333
    )

    query_vector = model.encode(query).tolist()

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=3
    )

    for result in results.points:

        print("=" * 50)

        print("File:", result.payload["filename"])

        print(
            "Chunk:",
            result.payload["chunk_id"]
        )

        print()

        print(result.payload["text"])

        print()

        print("Score:", result.score)


if __name__ == "__main__":
    main()