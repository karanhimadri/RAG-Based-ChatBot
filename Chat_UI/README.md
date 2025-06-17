# 💬 Chat_UI – Frontend for RAG-Based Chatbot

A sleek and responsive single-page React application built using **Vite**, designed to interface with a domain-specific RAG (Retrieval-Augmented Generation) chatbot backend.

---

## ✨ Features

- 🎨 Clean and minimalist UI powered by **Tailwind CSS**
- ⚡ Fast loading and optimized performance with **Vite**
- 📦 Dynamic credit usage tracker
- 🔗 Integrates with LLMs via a REST API (Gemini, Cohere)
- 🧠 Domain selection for contextual responses (Legal, Education, Policy, etc.)
- 🧭 Navbar with real-time credit display and stack indicators
- 🧩 Modular, scalable component structure

---

## 🛠️ Technical Stack

### 🔧 Core Technologies

| Stack        | Tech                  |
| ------------ | --------------------- |
| Frontend     | React (Vite)          |
| Styling      | Tailwind CSS          |
| State Mgmt   | React Context API     |
| Icons        | Lucide React          |
| HTTP Client  | Native `fetch()`      |

---

## 🧱 Project Structure

```
Chat_UI/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images, static JS data
│   ├── components/         # UI components (Navbar, MessageBox, etc.)
│   ├── context/            # Context API for global state
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .gitignore
├── package.json
├── vite.config.js
└── tailwind.config.js
```
---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v18+)
- npm

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Chat_UI.git
cd Chat_UI

# Install dependencies
npm install
```
---
## ⚙️ Configuration
Create a .env file in the root of Chat_UI/
```js
VITE_API_BASE_URL=http://localhost:8000
```
---
## ▶️ Run the App
```bash
npm run dev
```
Open your browser at: http://localhost:5173

---
## 💡 Usage Guide
- Type your query in the input box.
- Select a relevant domain.
- Press Enter or click Send.
- View AI-generated responses fetched from the backend.
- Also you can see the actual data sources like citation.
- Watch the credit tracker update as you query.

---
## 🔒 Security Considerations
- All environment variables are managed via .env (never commit this file).
- Minimal client-side data stored.
- CORS controlled via backend.
---

## ⚡ Performance Optimization
- Built with Vite for lightning-fast builds and HMR
- Tailwind's JIT compilation for reduced CSS size
- Minimal re-renders using functional components
---

## 🔄 Future Enhancements
- 🌐 Multi-language support
- 🪪 User authentication and profile integration
- 📈 Analytics dashboard for query stats
- 🧾 Chat history with local/session storage
- 💬 Feedback system on response quality
---

# Made with ❤️ by [Himadri Karan](https://www.linkedin.com/in/himadrikaran)
