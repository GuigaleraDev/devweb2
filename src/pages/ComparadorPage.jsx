import { useState, useMemo } from 'react'
import { GitCompare, Car, Shield, Star, TrendingDown, Award, Info, ArrowRight, ChevronDown } from 'lucide-react'
import { useSeguroStore } from '../store/useSeguroStore'
import CotacaoModal from '../components/CotacaoModal'

const coberturaColor = {
  'Básica':        { bg: 'bg-gray-50',   text: 'text-gray-700',  border: 'border-gray-200' },
  'Intermediária': { bg: 'bg-blue-50',   text: 'text-blue-700',  border: 'border-blue-200' },
  'Completa':      { bg: 'bg-emerald-50',text: 'text-emerald-700',border: 'border-emerald-200' },
}

const coberturaBadge = {
  'Básica':        'bg-gray-100 text-gray-600 border-gray-200',
  'Intermediária': 'bg-blue-100 text-blue-700 border-blue-200',
  'Completa':      'bg-emerald-100 text-emerald-700 border-emerald-200',
}

export default function ComparadorPage() {
  const { carros, tabelaPrecos, seguradoras, planos, loading } = useSeguroStore()
  
  const [carroSelecionado, setCarroSelecionado] = useState('');
  const [inputBusca, setInputBusca] = useState('');
  const [filtroCob, setFiltroCob] = useState('todos');
  const [cotacaoPlano, setCotacaoPlano] = useState(null);
  
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const carroObj = carros.find(c => c.id === carroSelecionado)

  const carrosFiltrados = useMemo(() => {
    const termo = inputBusca.toLowerCase()
    return carros.filter(c => `${c.marca} ${c.modelo}`.toLowerCase().includes(termo))
  }, [carros, inputBusca])

  const carrosAgrupadosPorMarca = useMemo(() => {
    return carrosFiltrados.reduce((acc, carro) => {
      if (!acc[carro.marca]) acc[carro.marca] = []
      acc[carro.marca].push(carro)
      return acc
    }, {})
  }, [carrosFiltrados])

  const linhas = useMemo(() => {
    if (!carroSelecionado) return []
    return tabelaPrecos
      .filter(tp => filtroCob === 'todos' || tp.cobertura === filtroCob)
      .map(tp => ({
        ...tp,
        preco: tp.precos[carroSelecionado] ?? null,
      }))
      .filter(tp => tp.preco !== null)
      .sort((a, b) => a.preco - b.preco)
  }, [carroSelecionado, tabelaPrecos, filtroCob])

  const menorPreco = linhas[0]?.preco ?? null

  function handleCotar(tp) {
    // 1. Busca os dados originais do plano (para manter a descrição e IDs)
    const planoOriginal = planos.find(p => p.id === tp.planoId) || {};
    
    // 2. Monta o plano para o Modal, forçando a substituição do carro
    setCotacaoPlano({ 
      ...planoOriginal,
      nome: tp.planoNome,
      seguradoraNome: tp.seguradoraNome,
      cobertura: tp.cobertura,
      precoMensal: tp.preco, // Usa o preço real da tabela
      // O SEGREDO ESTÁ AQUI: Injeta o nome do carro selecionado na tela
      carroExemplo: carroObj ? `${carroObj.marca} ${carroObj.modelo}` : planoOriginal.carroExemplo,
      franquia: tp.franquia,
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Carregando dados...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-500/30">
              <GitCompare className="w-7 h-7 text-white" />
            </div>
            <span className="text-orange-300 font-semibold text-sm uppercase tracking-widest">Comparador Inteligente</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Compare seguros<br />
            <span className="text-orange-400">pelo seu carro</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mb-8">
            Escolha o modelo do seu veículo e veja os preços reais de cada plano nas principais seguradoras do Brasil.
          </p>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 max-w-xl">
            <label className="text-sm font-semibold text-blue-200 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Car className="w-4 h-4" /> Digite ou selecione seu veículo
            </label>
            
            <div className="relative">
              <input
                type="text"
                value={inputBusca}
                onChange={e => {
                  setInputBusca(e.target.value)
                  setDropdownAberto(true)
                  setCarroSelecionado('')
                }}
                onFocus={() => setDropdownAberto(true)}
                onBlur={() => setDropdownAberto(false)}
                placeholder="Ex: Fiat Argo, Chevrolet Onix..."
                className="w-full bg-white text-blue-900 font-bold text-lg px-5 py-4 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:font-normal placeholder:text-gray-400"
                autoComplete="off"
              />
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

              {dropdownAberto && carrosFiltrados.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-80 overflow-y-auto">
                  {Object.entries(carrosAgrupadosPorMarca).map(([marca, modelos]) => (
                    <div key={marca}>
                      <div className="sticky top-0 bg-gray-100/95 backdrop-blur px-4 py-2 text-xs font-extrabold text-blue-900 uppercase tracking-widest border-y border-gray-200 shadow-sm z-10">
                        {marca}
                      </div>
                      {modelos.map(carro => (
                        <div
                          key={carro.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setCarroSelecionado(carro.id);
                            setInputBusca(`${carro.marca} ${carro.modelo}`);
                            setDropdownAberto(false);
                          }}
                          className="px-5 py-3 hover:bg-orange-50 cursor-pointer transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                        >
                          <span className="font-semibold text-gray-800">{carro.modelo}</span>
                          <span className="text-xs text-gray-500 font-medium">
                            {carro.categoria} • FIPE R$ {carro.fipe.toLocaleString('pt-BR')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {carroObj && (
              <div className="mt-3 flex items-center gap-3 text-blue-100 text-sm">
                <Car className="w-4 h-4 text-orange-300" />
                <span><strong className="text-white">{carroObj.marca} {carroObj.modelo}</strong></span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {!carroSelecionado && (
          <div className="text-center py-24">
            <div className="bg-blue-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-14 h-14 text-blue-300" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Selecione um veículo acima</h2>
            <p className="text-gray-500">Para visualizar a foto do carro e comparar os preços lado a lado.</p>
          </div>
        )}

        {carroSelecionado && carroObj && (
          <>
            {/* O NOVO DASHBOARD DO CARRO */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-stretch">
              
              {/* Painel Esquerdo: Imagem do Carro (Requisito do Projeto) */}
              <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest z-10">
                  Veículo Selecionado
                </div>
                
                {carroObj.imagem ? (
                  <img
                    src={import.meta.env.BASE_URL + carroObj.imagem.replace(/^\//, '')}
                    alt={`${carroObj.marca} ${carroObj.modelo}`}
                    className="w-full h-auto max-h-48 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : (
                  <Car className="w-24 h-24 text-blue-200 drop-shadow-lg" />
                )}
                
                <div className="mt-4 text-center z-10">
                  <h3 className="text-2xl font-black text-blue-900">{carroObj.marca} {carroObj.modelo}</h3>
                  <p className="text-sm font-semibold text-gray-500 bg-white/80 px-3 py-1 rounded-full mt-2 shadow-sm inline-block backdrop-blur-sm">
                    {carroObj.categoria}
                  </p>
                </div>
              </div>

              {/* Painel Direito: Cards de Estatísticas */}
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-sm flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2.5 rounded-xl"><TrendingDown className="w-5 h-5 text-blue-600" /></div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Menor preço</p>
                  </div>
                  <p className="text-3xl font-black text-blue-900">
                    R$ {menorPreco?.toFixed(2).replace('.', ',')}
                    <span className="text-base font-medium text-gray-400">/mês</span>
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl border border-orange-100 p-6 shadow-sm flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-50 p-2.5 rounded-xl"><Award className="w-5 h-5 text-orange-500" /></div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Planos Compatíveis</p>
                  </div>
                  <p className="text-3xl font-black text-blue-900">
                    {linhas.length} <span className="text-base font-medium text-gray-400">opções</span>
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm flex flex-col justify-center gap-2 sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 p-2.5 rounded-xl"><Shield className="w-5 h-5 text-emerald-600" /></div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Valor Base FIPE Estimado</p>
                  </div>
                  <p className="text-3xl font-black text-blue-900">
                    R$ {carroObj.fipe.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabela de Planos */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase">Plano</th>
                      <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase">Seguradora</th>
                      <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase">Cobertura</th>
                      <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase">Preço/mês</th>
                      <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {linhas.map((tp, idx) => (
                      <tr key={tp.planoId} className="hover:bg-blue-50/60 transition-colors bg-white">
                        <td className="px-5 py-4 font-semibold text-blue-900">{tp.planoNome}</td>
                        <td className="px-5 py-4 font-medium text-gray-700">{tp.seguradoraNome}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[11px] font-bold px-2 py-1 rounded-md ${coberturaBadge[tp.cobertura] || 'bg-gray-100 text-gray-600'}`}>
                            {tp.cobertura}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-black text-blue-900">R$ {tp.preco.toFixed(2).replace('.', ',')}</td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => handleCotar(tp)}
                            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all shadow-sm"
                          >
                            Cotar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {cotacaoPlano && (
        <CotacaoModal
          plano={cotacaoPlano}
          onClose={() => setCotacaoPlano(null)}
        />
      )}
    </div>
  )
}