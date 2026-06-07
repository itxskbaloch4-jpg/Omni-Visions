import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SiteSettingsProvider } from './hooks/useSiteSettings'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteSettingsProvider>
      <App />
    </SiteSettingsProvider>
  </StrictMode>
)
