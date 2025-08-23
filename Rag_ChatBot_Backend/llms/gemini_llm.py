import google.generativeai as genai
from typing import List
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
  raise ValueError("GEMINI_API_KEY environment variable not set")

genai.configure(api_key=GEMINI_API_KEY)  # type: ignore

# Create a model with system instruction
model = genai.GenerativeModel(  # type: ignore
  model_name="gemini-1.5-flash",
  system_instruction="""
  You are a helpful domain-specific assistant.
  
  When generating responses, follow these rules:
  - Provide a clear and concise answer (around 3–5 sentences or 3–5 bullet points).
  - Focus only on the most important details from the context, avoid unnecessary repetition.
  - If available, include 1–2 relevant links from the context to support the answer.
  - Format text using only the following Markdown symbols:
    - **bold**
    - *italic*
    - - (dash) for unordered lists
    - 1. 2. 3. for ordered lists
    - [link text](https://example.com) for links
    - Emojis
  - Do NOT use any other Markdown syntax (no headings #, no tables, no code blocks, no HTML tags).
  - Keep the tone factual, well-structured, and easy to read.
  """
)


def get_gemini_response(query: str, context: List[str]) -> str:
  formatted_context = "\n\n".join(context)

  prompt = f"""
  Answer the following question concisely using the provided context.

  ### Context:
  {formatted_context}

  ### Question:
  {query}
  """
  response = model.generate_content(contents=prompt)
  return response.text.strip()




if __name__ == '__main__':
  ctx = ["At COP26 in Glasgow, India pledged to achieve net-zero carbon emissions by 2070 and committed to reducing the carbon intensity of its economy by 45% from 2005 levels by 2030. (Reference: https://unfccc.int/cop26)", "India’s climate adaptation strategy focuses on agriculture, water resources, and disaster resilience. Initiatives include promoting climate-resilient crops, rainwater harvesting, and early warning systems for extreme weather. (Details: https://www.napcc.gov.in/)", "Climate finance in India is growing, with green bonds and international funding supporting renewable projects, afforestation, and sustainable infrastructure. (Info: https://www.climatefinance.in/)"]
  query = "What are India's commitments under COP26?"
  result = get_gemini_response(query=query, context=ctx)
  print(result)