import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/frank-ruhl-libre'
import '@fontsource-variable/assistant'
import '@fontsource/amatic-sc/700.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
