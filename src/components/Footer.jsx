import { Shield, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Comparador de Seguros</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              A plataforma mais completa para comparar seguros de carros no Brasil. Encontre o melhor plano para você.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-orange-400 mb-3 uppercase text-xs tracking-widest">Navegação</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/seguradoras" className="hover:text-white transition-colors">Seguradoras</Link></li>
              <li><Link to="/planos" className="hover:text-white transition-colors">Planos de Seguro</Link></li>
              <li><Link to="/coberturas" className="hover:text-white transition-colors">Coberturas Adicionais</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-orange-400 mb-3 uppercase text-xs tracking-widest">Contato</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-400" /> 0800 722 0000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-400" /> contato@comparadorseguros.com.br</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-400" /> São Paulo, SP — Brasil</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
