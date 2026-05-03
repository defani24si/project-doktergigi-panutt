import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Sidebar from './components/Sidebar.jsx'
import './assets/tailwind.css'
import Header from './components/Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="bg-[#f3f4f6] min-h-screen flex font-poppins text-gray-800">
        {/* <Sidebar /> */}
        <div className="flex-1 p-4 overflow-y-auto">
          <App />
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
)