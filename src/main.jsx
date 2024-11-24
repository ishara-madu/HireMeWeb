import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
// import App from './App.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Home/>
  </StrictMode>,
)
