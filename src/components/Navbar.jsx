import { NavLink } from 'react-router-dom'
import { Home, Building2, FileText, PlusCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/seguradoras', label: 'Seguradoras', icon: Building2, end: false },
  { to: '/planos', label: 'Planos de Seguro', icon: FileText, end: false },
  { to: '/coberturas', label: 'Coberturas Adicionais', icon: PlusCircle, end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-blue-800 sticky top-0 z-40 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-auto">
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1 py-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
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