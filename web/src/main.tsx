import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
=======
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router"
>>>>>>> main

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
<<<<<<< HEAD
)
=======
)
>>>>>>> main
