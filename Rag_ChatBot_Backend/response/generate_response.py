import sys
import time
from pathlib import Path
import uuid

# Ensure project root is on sys.path when running this file directly from the embeddings directory
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from llms.gemini_llm import get_gemini_response
from embeddings.embedder import get_embedded_vector_from_texts
from config.pinacone_config import index


def generate_rag_response(q: str, domain: str) -> dict:
    start_time = time.perf_counter()  # start timer

    # 1. Embed query
    query_vector = get_embedded_vector_from_texts([q])[0]

    # 2. Query Pinecone
    results = index.query(
        vector=query_vector,
        top_k=3,
        include_metadata=True,
        filter={"domain": {"$eq": domain}},  # type: ignore
    )

    # 3. Extract matches
    matches = results.get("matches", [])  # type: ignore
    original_texts = [m["metadata"]["original_text"] for m in matches]
    sources = [m["metadata"]["source"] for m in matches]

    data = [
        {
            "id": str(uuid.uuid4()),
            "textdata": m["metadata"].get("original_text"),
            "source": m["metadata"].get("source"),
            "score": m.get("score"),
        }
        for m in matches
    ]

    # 4. Generate response with Gemini
    response = get_gemini_response(query=q, context=original_texts)

    end_time = time.perf_counter()  # end timer
    total_time = round(end_time - start_time, 2)  # seconds with 2 decimal precision

    # 5. Return structured response
    return {
        "status": True,
        "message": "Response generated successfully.",
        "response": response,
        "metadata": {
            "sources": sources,
            "data": data,
            "response_time_seconds": total_time,
        },
    }


if __name__ == "__main__":
    response = generate_rag_response(
        "What are India's commitments under COP26?", "environment"
    )
    print(response)
