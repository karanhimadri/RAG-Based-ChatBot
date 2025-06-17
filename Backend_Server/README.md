# 🧠 RAG-Based Domain-Specific Chatbot
[![LinkedIn](https://img.shields.io/badge/LinkedIn-HimadriKaran-blue?style=flat&logo=linkedin)](https://linkedin.com/in/himadrikaran)


A context-aware, AI-powered chatbot built with Retrieval-Augmented Generation (RAG) architecture to provide accurate, verifiable responses across domains like education, healthcare, law, and policy.

---

## ✨ Features

- 🔍 Domain-specific retrieval from local knowledge bases
- 🧠 LLM integration using Gemini API for generative responses
- 🧩 Embedding with Cohere for semantic understanding
- 🏪 Vector database with ChromaDB for fast, accurate retrieval
- 📊 Usage credit tracking per user via Redis
- 🌐 React-based modern single-page UI
- 📁 Easily pluggable for new domains or document types

---

## 🛠️ Technical Implementation

### 🔧 Core Technologies

| Layer        | Technology               |
|--------------|--------------------------|
| LLM          | Google Gemini API        |
| Embeddings   | Cohere (`embed-english-v3.0`) |
| Vector DB    | ChromaDB (local)         |
| Backend      | FastAPI                  |
| Frontend     | React.js + Tailwind CSS  |
| Cache/Quota  | Upstash Redis            |

### 🏗️ Architecture Overview
---

```
[Frontend UI]
|
v
[FastAPI Backend] ----> [LLM (Gemini)]
| ^
v |
[ChromaDB Retrieval] --> [Cohere Embeddings]
|
v
[Upstash Redis for Usage Tracking]
```
## 📂 Project Structure (Backend)
```
Backend_Server/
│
├── app/                  # Core logic
│   ├── main.py
│   ├── retriver.py
│   ├── embedder.py
│   ├── llm.py
│   └── utils/
│       └── credit_tracker.py
│
├── chroma_store/         # Chroma vector store
├── sampleData/           # Source docs in JSON
├── requirements.txt
├── .env
└── .gitignore
```

## 🚀 Getting Started

### ✅ Prerequisites

- Python 3.9+
- Node.js 18+
- Redis (Upstash or local)
- ChromeDB (local file-based)
- API keys: `GEMINI_API_KEY`, `COHERE_API_KEY`, `REDIS_URL`, `REDIS_TOKEN`

---

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rag-chatbot.git
cd rag-chatbot/Backend_Server

# Create virtual environment
python -m venv venv
venv\Scripts\activate     # on Windows

# Install dependencies
pip install -r requirements.txt
```

## ⚙️ Configuration

Create a `.env` file in the root:
```js
COHERE_API_KEY=your_key
GEMINI_API_KEY=your_key
REDIS_URL=https://...
REDIS_TOKEN=your_token
```

## 💡 Usage Guide

1. Start Backend Server
```bash
cd app
uvicorn main:app --reload
```
2. Start Frontend Server
```bash
cd Chat_UI
npm install
npm run dev
```
3. Interact via Browser

- Open http://localhost:5173
- Ask queries related to healthcare, education, law, etc.

## 🔒 Security Features
- ✅ Environment variables for all sensitive keys
- ✅ Credit-based usage control via Redis
- ✅ Token-level rate limiting (Upstash)
- ⛔ No hardcoded credentials in production

## 🎯 Performance Optimization
- ⚡ Efficient semantic search using ChromaDB
- 🔁 Batched embedding with Cohere
- 🔄 Redis caching to reduce API overuse
- 📦 Modular design to plug-and-play new domains

## 🔄 Future Enhancements
- 🧬 Add support for OpenAI/SentenceTransformers
- 🗃️ Optional Pinecone/Weaviate for scalable vector storage
- 🧑‍💻 User authentication and role-based access
- 🧠 Feedback learning loop for continuous improvement
- 📊 Admin dashboard for monitoring & analytics
- 📦 Docker + CI/CD for deployment pipeline

## 🙏 Acknowledgments
- Google Gemini API
- Cohere
- ChromaDB
- FastAPI
- Upstash Redis
- Open-source community & contributors

### Built with ❤️ to make domain-specific AI both accessible and accurate.