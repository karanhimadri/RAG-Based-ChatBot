from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from retriver import retrieve_response_and_relevant_chunks
from utils.credit_tracker import track_credits, get_user_credits

app = FastAPI()

# Enable CORS
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.post("/query")
async def handle_query(request: Request):
  body = await request.json()
  query = body.get("query")
  domain = body.get("domain")
  user_id = body.get("user_id")

  if not all([query, domain, user_id]):
    return {"error": "Missing query, domain, or user_id"}

  if not track_credits(user_id):
    return {"error": "Insufficient credits"}

  response = retrieve_response_and_relevant_chunks(domain, query)
  return response

@app.get("/credits")
def check_credits(user_id: str):
  credits = get_user_credits(user_id)
  return {"user_id": user_id, "credits": credits}
