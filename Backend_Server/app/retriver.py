import chromadb
import json
from embedder import get_embedded_vector_from_texts
from llm import get_gemini_response

chroma_client = chromadb.PersistentClient(path="../chroma_store")

def load_domain_specific_data_and_store(domain_name: str, json_data_path: str):
  collection = chroma_client.get_or_create_collection(name=f"{domain_name}_docs")
  
  # Load JSON records from file
  with open(json_data_path, "r", encoding="utf-8") as f:
    records = json.load(f)
  
  # Extract data and source fields
  texts = [item["data"] for item in records]
  sources = [item["source"] for item in records]

  # Embed the texts
  embeddings = get_embedded_vector_from_texts(texts)

  # Create unique IDs and metadata
  ids = [f"{domain_name}_{i}" for i in range(len(texts))]
  metadatas = [{"source": source} for source in sources]

  # Add to ChromaDB collection
  collection.add(
    ids=ids,
    documents=texts,
    embeddings=embeddings, # type: ignore
    metadatas=metadatas # type: ignore
  )

  print(f"✅ Data stored successfully in '{domain_name}_docs' collection.")



def retrieve_response_and_relevant_chunks(domain_name: str, query: str, top_k: int = 2):
  # 1. Get the ChromaDB collection for the domain
  collection = chroma_client.get_collection(name=f"{domain_name.strip()}_docs")

  # 2. Embed the query using Cohere
  query_embedding = get_embedded_vector_from_texts([query])[0]

  # 3. Query ChromaDB for top-k relevant chunks
  results = collection.query(
    query_embeddings=[query_embedding],
    n_results=top_k
  )

  # 4. Extract relevant documents (chunks) and metadatas
  matched_chunks = results["documents"][0] # type: ignore
  matched_sources = results["metadatas"][0] # type: ignore

  # 6. Get LLM response (from Gemini or other)
  response = get_gemini_response(query=query, context=matched_chunks) # type: ignore

  # 7. Return both the response and the matched source chunks
  return {
    "answer": response,
    "chunks": [
      {"text": chunk, "source": meta.get("source", "")}
      for chunk, meta in zip(matched_chunks, matched_sources)
    ]
  }

