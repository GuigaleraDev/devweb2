import { createHead, UnheadProvider } from '@unhead/react/client'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const head = createHead()

createRoot(document.getElementById('root')).render(
  <UnheadProvider head={head}>
    <HashRouter>
      <App />
    </HashRouter>
  </UnheadProvider>
)
