import { useState } from 'react'
import { X, Car, User, Phone, Mail, CheckCircle, Shield, ChevronRight } from 'lucide-react'

export default function CotacaoModal(props) {
  const { plano, onClose } = props;

  const [step, setStep] = useState('form')
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    carro: plano.carroExemplo,
    ano: '',
    cep: '',
  })

  const coberturaColor = {
    'Básica':        { bg: 'bg-gray-50',   text: 'text-gray-700',  border: 'border-gray-200' },
    'Intermediária': { bg: 'bg-blue-50',   text: 'text-blue-700',  border: 'border-blue-200' },
    'Completa':      { bg: 'bg-green-50',  text: 'text-green-700', border: 'border-green-200' },
  }
  
  const colors = coberturaColor[plano.cobertura] || coberturaColor['Básica']

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('success')
  }

  const mask = (val, type) => {
    const d = val.replace(/\D/g, '')
    if (type === 'phone') {
      if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    }
    return d.replace(/(\d{5})(\d{0,3})/, '$1-$2')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5 flex items-start justify-between">
          <div>
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Cotação de Seguro</p>
            <h2 className="text-white text-xl font-bold">{plano.nome}</h2>
            <p className="text-blue-200 text-sm mt-0.5">{plano.seguradoraNome}</p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white p-1 transition-colors mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`px-6 py-3 flex items-center justify-between border-b ${colors.bg} ${colors.border} border`}>
          <div className="flex items-center gap-3">
            <Shield className={`w-4 h-4 ${colors.text}`} />
            <span className={`text-sm font-semibold ${colors.text}`}>Cobertura {plano.cobertura}</span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-gray-500 text-xs flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {plano.carroExemplo}</span>
          </div>
          <span className="font-bold text-blue-900 text-sm">R$ {plano.precoMensal.toFixed(2).replace('.', ',')}/mês</span>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <p className="text-gray-500 text-sm">Preencha seus dados para receber a cotação por e-mail.</p>

            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1">
                  <User className="w-3.5 h-3.5 text-blue-500" /> Nome completo
                </span>
                <input
                  type="text"
                  required
                  value={form.nome}
                  onChange={e => setForm({ ...form, nome: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1">
                    <Mail className="w-3.5 h-3.5 text-blue-500" /> E-mail
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5 text-blue-500" /> Telefone
                  </span>
                  <input
                    type="text"
                    required
                    value={form.telefone}
                    onChange={e => setForm({ ...form, telefone: mask(e.target.value, 'phone') })}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1">
                    <Car className="w-3.5 h-3.5 text-blue-500" /> Modelo do carro
                  </span>
                  <input
                    type="text"
                    required
                    value={form.carro}
                    onChange={e => setForm({ ...form, carro: e.target.value })}
                    placeholder="Ex: Fiat Argo"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">Ano do carro</span>
                  <input
                    type="number"
                    required
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={form.ano}
                    onChange={e => setForm({ ...form, ano: e.target.value })}
                    placeholder={String(new Date().getFullYear())}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-1 block">CEP</span>
                <input
                  type="text"
                  required
                  value={form.cep}
                  onChange={e => setForm({ ...form, cep: mask(e.target.value, 'cep') })}
                  placeholder="00000-000"
                  maxLength={9}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                />
              </label>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium text-sm hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-400 text-white rounded-xl font-bold text-sm shadow transition flex items-center justify-center gap-2"
              >
                Solicitar Cotação <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Cotação Solicitada!</h3>
            <p className="text-gray-500 text-sm mb-2">
              Olá, <span className="font-semibold text-gray-700">{form.nome}</span>! Recebemos sua solicitação para o plano
            </p>
            <p className="font-bold text-blue-800 mb-1">{plano.nome} — {plano.seguradoraNome}</p>
            <p className="text-gray-400 text-xs mb-6">Em até 24h úteis você receberá a cotação em <span className="text-blue-600">{form.email}</span></p>

            <div className="bg-blue-50 rounded-xl p-4 text-left mb-6 text-sm text-gray-600 space-y-1">
              <p><span className="font-semibold text-blue-800">Plano:</span> {plano.nome}</p>
              <p><span className="font-semibold text-blue-800">Carro:</span> {form.carro} ({form.ano})</p>
              <p><span className="font-semibold text-blue-800">Valor estimado:</span> R$ {plano.precoMensal.toFixed(2).replace('.', ',')}/mês</p>
              <p><span className="font-semibold text-blue-800">Franquia:</span> R$ {plano.franquia.toLocaleString('pt-BR')}</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-semibold text-sm transition"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}