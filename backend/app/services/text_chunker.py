from typing import List


def chunk_text(
    text: str,
    max_chunk_size: int = 500
) -> List[str]:

    paragraphs = text.split("\n\n")

    chunks = []

    current_chunk = ""

    for paragraph in paragraphs:

        if len(current_chunk) + len(paragraph) < max_chunk_size:

            current_chunk += paragraph + "\n\n"

        else:

            chunks.append(current_chunk.strip())

            current_chunk = paragraph + "\n\n"

    if current_chunk:

        chunks.append(current_chunk.strip())

    return chunks