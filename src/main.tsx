import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SentryErrorBoundary } from './components/SentryErrorBoundary.tsx'
import './utils/sentry.ts' // Initialize Sentry

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SentryErrorBoundary>
      <App />
    </SentryErrorBoundary>
  </StrictMode>,
)
