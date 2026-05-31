import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

//NAVEGAÇÃO POR ROTAS POR MEIO DA BIBLIOTECA REACT ROUTER
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)