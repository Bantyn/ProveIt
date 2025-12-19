import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'

createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <BrowserRouter>
      {/* <Providers> */}
        <App />
      {/* </Providers> */}
    </BrowserRouter>
  </React.StrictMode>
)
