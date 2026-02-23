import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.tsx'

window.addEventListener('error', (e) => {
  const root = document.getElementById('root')
  if (root && !root.innerHTML) {
    root.innerHTML = `<div style="color:#f85149;background:#0d1117;padding:24px;font-family:monospace;font-size:13px;min-height:100vh">
      <div style="font-size:16px;font-weight:bold;margin-bottom:8px">❌ Runtime Error</div>
      <div>${e.message}</div>
      <div style="color:#8b949e;margin-top:8px">${e.filename}:${e.lineno}</div>
    </div>`
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
