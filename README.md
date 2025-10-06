# 🤖 RAG Chatbot System - Intelligent Domain-Specific Assistant

[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.12+-blue.svg)](https://www.python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)
[![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-orange.svg)](https://www.pinecone.io/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-1.5_Flash-yellow.svg)](https://ai.google.dev/)
[![Cohere](https://img.shields.io/badge/Cohere-Embeddings-purple.svg)](https://cohere.ai/)
[![Redis](https://img.shields.io/badge/Upstash_Redis-Credit_System-red.svg)](https://upstash.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green.svg)](https://supabase.com/)

> **A complete full-stack Retrieval-Augmented Generation (RAG) system with modern web interface and intelligent backend, delivering specialized AI assistance across multiple domains.**

## 📸 **Project Screenshots**

### Chat Interface
![Chat Interface](screenshots/chat_inerfacd.png)
*Modern, responsive chat interface with real-time messaging and typing indicators*

<table>
  <tr>
    <td align="center">
      <img src="screenshots/rag_backend_pipeline_diagram.png" width="300" alt="RAG Backend Pipeline"/><br/>
      <b>Backend Architecture</b><br/>
      <sub>Complete RAG pipeline architecture diagram</sub>
    </td>
    <td align="center">
      <img src="screenshots/authentication_page.png" width="300" alt="Authentication Page"/><br/>
      <b>Authentication System</b><br/>
      <sub>Secure user authentication with Supabase integration</sub>
    </td>
    <td align="center">
      <img src="screenshots/chat_citation_sources_panel.png" width="300" alt="Citation Sources Panel"/><br/>
      <b>Source Citations Panel</b><br/>
      <sub>Source citations and references for transparent AI responses</sub>
    </td>
  </tr>
</table>


## 🚀 **Project Highlights**

### **Backend System**
- **🎯 Business Impact**: Intelligent knowledge assistant across 5 critical domains (Agriculture, Education, Environment, Finance, Healthcare)
- **⚡ Performance**: Sub-second response times with real-time performance tracking
- **💰 Cost Management**: Smart credit-based usage control preventing API abuse
- **🔒 Production-Ready**: Secure API key management, CORS support, and scalable serverless architecture

### **Frontend Application**
- **🤖 Multi-Domain AI Assistant**: 5 specialized categories with domain-specific knowledge bases
- **💬 Advanced Chat Interface**: Real-time chat with typing indicators and message history
- **🔐 User Authentication**: Supabase integration with credit-based usage system
- **🎨 Modern UI/UX**: Built with Next.js 15, React 19, and Tailwind CSS
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices

---

## 🏗️ **System Architecture**

### **Core RAG Pipeline**
1. **Query Embedding** → Cohere's `embed-english-v3.0` converts queries to 1024-dim vectors
2. **Semantic Search** → Pinecone retrieves top-3 relevant documents with domain filtering
3. **Context Augmentation** → Retrieved documents provide contextual knowledge
4. **Response Generation** → Google Gemini 1.5 Flash generates human-like responses
5. **Metadata Enrichment** → Returns sources, confidence scores, and performance metrics

---

## 🛠️ **Technology Stack**

### **Frontend Technologies**
- **Next.js 15** - React framework with App Router and dynamic routing
- **React 19** - Latest React with enhanced performance
- **Tailwind CSS** - Utility-first CSS framework with dark/light theme support
- **Supabase** - User authentication and management
- **LocalStorage** - Message history persistence

### **Backend & API**
- **FastAPI** - High-performance async web framework
- **Python** - Latest Python with enhanced performance
- **Pydantic** - Data validation and serialization

### **AI & Machine Learning**
- **Google Gemini 1.5 Flash** - Large Language Model for response generation
- **Cohere v3.0** - State-of-the-art text embeddings
- **Custom System Instructions** - Optimized prompts for consistent output

### **Data & Storage**
- **Pinecone** - Serverless vector database (AWS us-east-1)
- **Redis** - Managed Redis for credit tracking
- **JSON Data Sources** - Curated domain-specific knowledge bases
- **Supabase Database** - User data and chat history storage

---

## 📊 **Business Domains & Use Cases**

| Domain | Use Cases | Sample Query |
|--------|-----------|--------------|
| 🌾 **Agriculture** | Farming practices, crop management, agricultural policies | "What are the best drought-resistant crops for Indian farmers?" |
| 🎓 **Education** | Educational policies, curriculum, learning resources | "What are the key features of India's National Education Policy 2020?" |
| 🌍 **Environment** | Climate policies, renewable energy, sustainability | "What are India's commitments under COP26?" |
| 💼 **Finance** | Economic policies, financial regulations, market insights | "What are the latest RBI monetary policy changes?" |
| 🏥 **Healthcare** | Health policies, medical guidelines, public health | "What are India's vaccination strategies for rural areas?" |

---

## 🔧 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Python 3.12+
- API Keys: Google Gemini, Cohere, Pinecone, Upstash Redis
- Supabase project for authentication

### **Backend Setup**
```bash
# Clone the repository
git clone <repository-url>
cd Rag_ChatBot_Backend

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Add your API keys to .env

# Run the backend
uvicorn main:app --reload
```

### **Frontend Setup**
```bash
# Navigate to frontend directory
cd rag-frontend

# Install dependencies
npm install

# Set environment variables
cp .env.local.example .env.local
# Add your Supabase keys

# Run the development server
npm run dev
```

### **Environment Variables**

**Backend (.env)**
```bash
GEMINI_API_KEY=your_gemini_api_key
COHERE_API_KEY=your_cohere_api_key
PINECONE_API_KEY=your_pinecone_api_key
REDIS_URL=your_upstash_redis_url
REDIS_TOKEN=your_upstash_redis_token
```

**Frontend (.env.local)**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

---

## 📁 **Project Structure**

```
ChatBot/
├── Rag_ChatBot_Backend/        # Backend API
│   ├── main.py                 # FastAPI application entry point
│   ├── requirements.txt        # Python dependencies
│   ├── config/
│   ├── embeddings/
│   ├── llms/
│   ├── response/
│   └── sample_data/
└── rag-frontend/               # Next.js Frontend
    ├── src/
    │   ├── app/                # Next.js App Router
    │   │   ├── layout.js       # Root layout
    │   │   ├── page.js         # Home page
    │   │   └── chat/           # Chat routes
    │   ├── components/         # Reusable components
    │   ├── context/            # React context providers
    │   ├── lib/
    │   └── utils/
    └── public/                 # Static assets
```

---

## **Developer Profile**

**Ready to discuss how this RAG system can solve your business challenges?**

- 📧 **Email:** himadrikaran516@gmail.com | karanhimadri1234@gmail.com  
- 💼 **LinkedIn:** [linkedin.com/in/himadrikaran](https://linkedin.com/in/himadrikaran)  
- 🐱 **GitHub:** [github.com/karanhimadri](https://github.com/karanhimadri)  

---

*Built with ❤️ for intelligent information retrieval and enhanced user experiences. A complete full-stack solution combining cutting-edge AI with modern web technologies.*
