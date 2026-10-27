import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/karantina/700.css'
import '@fontsource-variable/heebo'
import '@fontsource/amatic-sc/700.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
