# from retriver import retrieve_response_and_relevant_chunks


# # load_domain_specific_data_and_store("research","../sampleData/research.json")
# print(retrieve_response_and_relevant_chunks("healthcare","Tell me about the Ayushman Bharat scheme."))


from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
REDIS_URL = os.getenv("REDIS_URL")

print(REDIS_URL)