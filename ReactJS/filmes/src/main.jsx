import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UsuarioProvider } from './context/UsuarioProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </StrictMode>,
)
