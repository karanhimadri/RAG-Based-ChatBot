from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time

from config.credit_tracker import track_credits, get_user_credits
from response.generate_response import generate_rag_response


app = FastAPI(
    title="RAG Chatbot Backend",
    version="1.0.0",
    description="API for querying domain-specific knowledge with Gemini + Pinecone + credit tracking",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust for security in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str
    domain: str
    user_id: str


class QueryResponse(BaseModel):
    status: bool
    message: str
    response: str | None
    metadata: dict | None


class CreditsResponse(BaseModel):
    user_id: str
    credits: int


@app.get("/", summary="Health check")
def read_root():
    return {"message": "Hello, FastAPI is running 🚀"}


@app.post("/query", response_model=QueryResponse, summary="Ask a domain-specific query")
async def handle_query(req: QueryRequest, request: Request):
    start_time = time.perf_counter()

    # Check credits
    if not track_credits(req.user_id):
        raise HTTPException(status_code=403, detail="Insufficient credits")

    # Generate RAG response
    rag_response = generate_rag_response(q=req.query, domain=req.domain)

    total_time = round(time.perf_counter() - start_time, 2)
    rag_response["metadata"]["response_time_seconds"] = total_time

    return rag_response


@app.get("/credits", response_model=CreditsResponse, summary="Check remaining credits")
def check_credits(user_id: str):
    credits = get_user_credits(user_id)
    return {"user_id": user_id, "credits": credits}
