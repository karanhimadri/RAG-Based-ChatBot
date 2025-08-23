import cohere
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")

if not COHERE_API_KEY:
  raise ValueError("COHERE_API_KEY is not set in the environment variables.")

co = cohere.Client(COHERE_API_KEY)

def get_embedded_vector_from_texts(texts: List[str]) -> List[List[float]]:
  response = co.embed(
    texts=texts, model="embed-english-v3.0", input_type="classification"
  )
  return response.embeddings  # type: ignore

