from pinecone import Pinecone
from dotenv import load_dotenv
import os

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

if not PINECONE_API_KEY:
    raise ValueError("COHERE_API_KEY is not set in the environment variables.")

INDEX_NAME = "multi-domain-index"
CLOUD = "aws"
REGION = "us-east-1"
METRIC = "cosine"
DIMENSION = 1024

pc = Pinecone(api_key=PINECONE_API_KEY)


def connect_index():
    if pc.has_index(INDEX_NAME):
        return

    pc.create_index(
        name=INDEX_NAME,
        dimension=DIMENSION,
        metric=METRIC,
        spec={"serverless": {"cloud": CLOUD, "region": REGION}},
    )


connect_index()
index = pc.Index(INDEX_NAME)

if __name__ == "__main__":
    # stats = index.describe_index_stats()
    # print("\n✅ Connected to index. Stats:", stats)
    query_text = "What are India's commitments under COP26?"
    query_vector = get_embedded_vector_from_texts([query_text])[0]  # type: ignore

    results = index.query(vector=query_vector, top_k=3, include_metadata=True)

    print("🔎 Query results:", results)
