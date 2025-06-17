import google.generativeai as genai
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
# Configure the API key
genai.configure(api_key=GEMINI_API_KEY) # type: ignore

# Create a model instance
model = genai.GenerativeModel(model_name="gemini-1.5-flash") # type: ignore

def get_gemini_response(query: str, context: List[str]) -> str:
    formatted_context = "\n\n".join(context)
    
    prompt = f"""
    You are an assistant specialized in domain-specific knowledge.
    Answer the following question concisely using the provided context.

    ### Context:
    {formatted_context}

    ### Question:
    {query}
    """
    response = model.generate_content(prompt)
    return response.text.strip()  # type: ignore



# GEMINI_API_KEY  AIzaSyAwCxM1POHAl1-D11b6aQutEopro8EuG1U