import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="shieldEdgeF" x1="0" y1="0" x2="48" y2="48">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="carBodyF" x1="0" y1="0" x2="48" y2="0">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
                <path d="M24 2 L4 8 V20 C4 34 16 44 24 46 C32 44 44 34 44 20 V8 L24 2 Z" fill="white" fillOpacity="0.05" />
                <path d="M24 2 L4 8 V20 C4 34 16 44 24 46 C32 44 44 34 44 20 V8 L24 2 Z" stroke="url(#shieldEdgeF)" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M12 28 C 12 28, 15 22, 19 21 H 29 C 33 22, 36 28, 36 28 C 39 32, 38 36, 34 36 H 14 C 10 36, 9 32, 12 28 Z" fill="url(#carBodyF)" />
                <path d="M19 21 L 22 15 H 26 L 29 21 Z" fill="#e0f2fe" />
                <path d="M21 17 H 27" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
              </svg>
              <span className="font-bold text-lg">Comparador de Seguros</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              A plataforma mais completa para comparar seguros de carros no Brasil. Encontre o melhor plano para você.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-orange-400 mb-3 uppercase text-xs tracking-widest">Navegação</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="/#/seguradoras" className="hover:text-white transition-colors">Seguradoras</a></li>
              <li><a href="/#/planos" className="hover:text-white transition-colors">Planos de Seguro</a></li>
              <li><a href="/#/coberturas" className="hover:text-white transition-colors">Coberturas Adicionais</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-orange-400 mb-3 uppercase text-xs tracking-widest">Contato</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-400" /> 0800 123 1234</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-400" /> contato@comparadorseguros.com.br</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-400" /> São Paulo, SP — Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
          <span>© {new Date().getFullYear()} Comparador de Seguros. Todos os direitos reservados.</span>
          <span className="mt-2 md:mt-0">Desenvolvido com React + JS</span>
        </div>
      </div>
    </footer>
  )
}