import { NavLink } from 'react-router-dom'
import { Home, Building2, FileText, ShieldPlus, GitCompare, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/comparador', label: 'Comparar', icon: GitCompare, end: false, highlight: false },
  { to: '/seguradoras', label: 'Seguradoras', icon: Building2, end: false },
  { to: '/planos', label: 'Planos de Seguro', icon: FileText, end: false },
  { to: '/coberturas', label: 'Coberturas Adicionais', icon: ShieldPlus, end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-blue-900 sticky top-0 z-40 border-b border-blue-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex items-center gap-1 py-1.5">
          {links.map(({ to, label, icon: Icon, end, highlight }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : highlight
                    ? 'text-orange-300 hover:bg-blue-800 hover:text-orange-200 border border-orange-400/30'
                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>

        <div className="md:hidden flex items-center justify-between h-12">
          <span className="text-white text-sm font-bold">Menu</span>
          <button
            className="text-white p-2 hover:bg-blue-800 rounded-lg transition"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1 border-t border-blue-800 pt-2">
            {links.map(({ to, label, icon: Icon, end, highlight }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : highlight
                      ? 'text-orange-300 hover:bg-blue-800 hover:text-orange-200'
                      : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}