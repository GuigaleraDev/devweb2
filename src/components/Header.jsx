import { Link } from 'react-router-dom'
import { Shield, Phone, Clock, ChevronRight } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 border-b border-blue-800">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-orange-500 p-2.5 rounded-xl group-hover:bg-orange-400 transition-colors">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">Comparador de Seguros</span>
              <p className="text-blue-200 text-xs">Compare e economize no seu seguro auto</p>
            </div>
          </Link>

          <div className="flex items-center gap-5 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-400" />
              <span>0800 722 0000</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Atendimento 24h</span>
            </div>
            <Link
              to="/planos"
              className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-1.5"
            >
              Cotar Agora
              <ChevronRight className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
