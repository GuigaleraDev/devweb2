import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeguroStore } from '../store/useSeguroStore'
import StarRating from '../components/StarRating'
import CotacaoModal from '../components/CotacaoModal'
import { Shield, TrendingUp, Users, Award, ArrowRight, Car, CheckCircle, Search } from 'lucide-react'

export default function Home() {
  const { seguradoras, planos, coberturas, loading } = useSeguroStore()
  

  const [termoDigitado, setTermoDigitado] = useState('')
  const [buscaAtiva, setBuscaAtiva] = useState('')
  
  const [planoSelecionado, setPlanoSelecionado] = useState(null)


  const planosFiltrados = planos.filter(p =>
    p.nome.toLowerCase().includes(buscaAtiva.toLowerCase()) ||
    p.seguradoraNome.toLowerCase().includes(buscaAtiva.toLowerCase()) ||
    p.carroExemplo.toLowerCase().includes(buscaAtiva.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando dados...</p>
        </div>
      </div>
    )
  }

  const melhorAvaliada = [...seguradoras].sort((a, b) => b.avaliacao - a.avaliacao)[0]
  const maisBarato = [...planos].sort((a, b) => a.precoMensal - b.precoMensal)[0]

  return (
    <div>
      {planoSelecionado && (
        <CotacaoModal 
          plano={planoSelecionado} 
          onClose={() => setPlanoSelecionado(null)} 
        />
      )}

      <section className="bg-gradient-to-b from-blue-950 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                #1 Comparador do Brasil
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Compare seguros de carro e <span className="text-orange-400">economize até 40%</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Encontre o melhor plano entre as maiores seguradoras do Brasil. Transparência, rapidez e o menor preço garantido.
            </p>

            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Buscar por seguradora, plano ou carro..."
                value={termoDigitado}
                onChange={e => setTermoDigitado(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && setBuscaAtiva(termoDigitado)}
                className="flex-1 bg-white px-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-lg"
              />
              <button
                onClick={() => setBuscaAtiva(termoDigitado)}
                className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg flex items-center gap-2 justify-center"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Building2Icon, label: 'Seguradoras', value: seguradoras.length, color: 'text-blue-600' },
            { icon: FileTextIcon, label: 'Planos Disponíveis', value: planos.length, color: 'text-green-600' },
            { icon: ShieldIcon, label: 'Coberturas Extras', value: coberturas.length, color: 'text-orange-500' },
            { icon: UsersIcon, label: 'Clientes Atendidos', value: '50mil+', color: 'text-purple-600' },
          ].map(({ label, value, color }, i) => (
            <div key={i} className="text-center">
              <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        {buscaAtiva ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-blue-900">
                Resultados para "<span className="text-orange-500">{buscaAtiva}</span>" ({planosFiltrados.length} planos)
              </h2>
              <button 
                onClick={() => { setBuscaAtiva(''); setTermoDigitado(''); }}
                className="text-sm text-gray-500 hover:text-orange-500 font-medium"
              >
                Limpar busca
              </button>
            </div>
            {planosFiltrados.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Nenhum plano encontrado para esta busca.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planosFiltrados.map(plano => (
                  <PlanoCard key={plano.id} plano={plano} onCotar={() => setPlanoSelecionado(plano)} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {melhorAvaliada && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-1">Melhor Avaliada</p>
                    <p className="font-bold text-blue-900 text-lg">{melhorAvaliada.nome}</p>
                    <StarRating value={melhorAvaliada.avaliacao} />
                  </div>
                </div>
              )}
              {maisBarato && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 flex items-center gap-4">
                  <div className="bg-green-600 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-green-500 font-semibold uppercase tracking-wider mb-1">Menor Preço</p>
                    <p className="font-bold text-green-900 text-lg">{maisBarato.nome}</p>
                    <p className="text-green-700 font-semibold">
                      R$ {maisBarato.precoMensal.toFixed(2).replace('.', ',')}/mês
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-blue-900">Seguradoras Parceiras</h2>
                <Link to="/seguradoras" className="text-orange-500 hover:text-orange-600 text-sm font-semibold flex items-center gap-1">
                  Ver todas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {seguradoras.map(s => (
                  <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow text-center">
                    <div className="h-12 flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        {s.logo ? (
                          <img src={s.logo} alt={s.nome} className="w-8 h-8 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
                        ) : (
                          <Shield className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                    </div>
                    <p className="font-semibold text-blue-900 text-sm">{s.nome}</p>
                    <StarRating value={s.avaliacao} />
                    <p className="text-xs text-gray-400 mt-1">{s.tempoMercado} anos</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-blue-900">Planos em Destaque</h2>
                <Link to="/planos" className="text-orange-500 hover:text-orange-600 text-sm font-semibold flex items-center gap-1">
                  Ver todos <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {planos.slice(0, 3).map(plano => (
                  <PlanoCard key={plano.id} plano={plano} onCotar={() => setPlanoSelecionado(plano)} />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 text-center">Por que usar o Comparador de Seguros?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle, title: 'Gratuito e imparcial', desc: 'Compare sem pagar nada, com informações transparentes.' },
                  { icon: Shield, title: 'Dados atualizados', desc: 'Preços e coberturas sempre atualizados das maiores seguradoras.' },
                  { icon: Users, title: 'Suporte especializado', desc: 'Time de especialistas prontos para tirar suas dúvidas.' },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-orange-500 p-2.5 rounded-xl h-fit">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{title}</p>
                      <p className="text-blue-200 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}

function PlanoCard({ plano, onCotar }) {
  const coberturaColor = {
    'Básica': 'bg-gray-100 text-gray-600',
    'Intermediária': 'bg-blue-100 text-blue-700',
    'Completa': 'bg-green-100 text-green-700',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-blue-900">{plano.nome}</p>
          <p className="text-sm text-gray-500">{plano.seguradoraNome}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${coberturaColor[plano.cobertura] || 'bg-gray-100 text-gray-600'}`}>
          {plano.cobertura}
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
        <Car className="w-4 h-4 text-orange-400" />
        <span>{plano.carroExemplo}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{plano.descricao}</p>
      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
        <div>
          <p className="text-xs text-gray-400">A partir de</p>
          <p className="text-xl font-extrabold text-blue-900">
            R$ {plano.precoMensal.toFixed(2).replace('.', ',')}
            <span className="text-sm font-normal text-gray-400">/mês</span>
          </p>
        </div>
        <button
          onClick={onCotar}
          className="bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-md"
        >
          Cotar Plano
        </button>
      </div>
    </div>
  )
}

function Building2Icon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
}
function FileTextIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
}
function ShieldIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
}
function UsersIcon({ className }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
}
