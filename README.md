# 🧠 RAG-Based ChatBot

A full-stack AI chatbot system powered by **Retrieval-Augmented Generation (RAG)**. This project combines a **FastAPI backend** for intelligent query processing and embedding generation, with a **Vite + React frontend** for a seamless user experience. It supports domain-specific knowledge across **healthcare**, **education**, **legal**, and **policy** sectors.

---

## 📦 Project Overview

This repository is structured into two main parts:

```bash
RAG_Based_ChatBot/
│
├── Backend_Server/     # FastAPI backend, embeddings, LLM logic, ChromaDB
├── Chat_UI/            # Vite + React frontend (user interface)
└── README.md           # ← You're here
```
> Each folder includes its own `README.md` for more detailed instructions.

---

## ✨ Key Features

- 🔍 **Retrieval-Augmented Generation** with domain-specific context
- ⚡ FastAPI backend with integrated vector search (ChromaDB)
- 🧠 Gemini & Cohere LLM embedding and generation
- 🖥️ React frontend built using Vite + Tailwind CSS
- 🗂️ Organized by domains: Healthcare, Education, Legal, Policy
- 💾 Local vector store with persistent ChromaDB setup
- 🎯 Credit tracking system using Upstash Redis

---

## 🚀 Quick Start

### 🧰 Prerequisites

- Python 3.10+
- Node.js 18+
- Redis (Upstash or local)
- Virtualenv (`python -m venv`)
- API keys for:
  - Cohere
  - Gemini
  - Upstash Redis

---

## 🚀 How to Run the Project
```bash
# Backend
cd Backend_Server
python -m venv venv
venv\Scripts\activate    # on Window
pip install -r requirements.txt
cd app
uvicorn main:app --reload

# Frontend
cd Chat_UI
npm install
npm run dev
```

## 🙏 Acknowledgments
- Cohere Embedding API
- Gemini API
- ChromaDB
- FastAPI
- Vite
- Tailwind CSS
- Upstash Redis

---
# Built with ❤️ by [Himadri Karan](https://linkedin.com/in/himadrikaran)

