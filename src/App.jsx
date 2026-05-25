import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SeguradorasPage from './pages/SeguradorasPage'
import PlanosPage from './pages/PlanosPage'
import CoberturasPage from './pages/CoberturasPage'
import { useSeguroStore } from './store/useSeguroStore'

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/seguradoras', element: <SeguradorasPage /> },
  { path: '/planos', element: <PlanosPage /> },
  { path: '/coberturas', element: <CoberturasPage /> },
]

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  const { loadData } = useSeguroStore()

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Header />
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App