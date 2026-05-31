import { Link } from 'react-router-dom'
import { Phone, Clock, ChevronRight } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative flex items-center justify-center">
              <svg 
                width="56" height="56" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" 
                className="group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
              >
                <defs>
                  <linearGradient id="shieldEdge" x1="0" y1="0" x2="48" y2="48">
                    <stop offset="0%" stopColor="#38bdf8" /> 
                    <stop offset="100%" stopColor="#2563eb" /> 
                  </linearGradient>
                  <linearGradient id="carBody" x1="0" y1="0" x2="48" y2="0">
                    <stop offset="0%" stopColor="#fb923c" /> 
                    <stop offset="100%" stopColor="#ea580c" /> 
                  </linearGradient>
                  <filter id="headlightGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

             
                <path d="M24 2 L4 8 V20 C4 34 16 44 24 46 C32 44 44 34 44 20 V8 L24 2 Z" fill="white" fillOpacity="0.05" />
                
             
                <path d="M24 2 L4 8 V20 C4 34 16 44 24 46 C32 44 44 34 44 20 V8 L24 2 Z" stroke="url(#shieldEdge)" strokeWidth="2.5" strokeLinejoin="round" />

           
                <path d="M10 14 L34 30 M14 8 L38 24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.1" />

           
                <ellipse cx="14" cy="35" rx="2.5" ry="3.5" fill="#0f172a" />
                <ellipse cx="34" cy="35" rx="2.5" ry="3.5" fill="#0f172a" />

           
                <path d="M12 28 C 12 28, 15 22, 19 21 H 29 C 33 22, 36 28, 36 28 C 39 32, 38 36, 34 36 H 14 C 10 36, 9 32, 12 28 Z" fill="black" fillOpacity="0.25" transform="translate(0, 4)" filter="blur(2px)"/>

             
                <path d="M12 28 C 12 28, 15 22, 19 21 H 29 C 33 22, 36 28, 36 28 C 39 32, 38 36, 34 36 H 14 C 10 36, 9 32, 12 28 Z" fill="url(#carBody)" />
                
           
                <path d="M19 21 L 22 15 H 26 L 29 21 Z" fill="#e0f2fe" />
                <path d="M21 17 H 27" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />

             
                <path d="M20 32 H 28" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />

               
                <path d="M14 28 L 18 29 M 34 28 L 30 29" stroke="white" strokeWidth="2.5" strokeLinecap="round" filter="url(#headlightGlow)" className="animate-pulse" />
              </svg>

              <div className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-900 shadow-sm" />
            </div>
            
            <div>
              <span className="text-xl font-extrabold tracking-tight leading-none block">
                Comparador de Seguros
              </span>
              <p className="text-blue-300 text-xs font-medium mt-1">Compare. Economize. Proteja-se.</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-5 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <div className="bg-blue-700/60 p-1.5 rounded-lg">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <span className="font-medium">0800 123 1234</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-blue-700/60 p-1.5 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <span className="font-medium">Atendimento 24h</span>
              </div>
            </div>

            <Link
              to="/comparador"
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-orange-500/30 hover:scale-105"
            >
              Cotar Agora <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}