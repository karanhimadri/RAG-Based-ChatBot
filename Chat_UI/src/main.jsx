import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ApiContextProvider from './context/ApiContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ApiContextProvider>
    <App />
  </ApiContextProvider>
)
