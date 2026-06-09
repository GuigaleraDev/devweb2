import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, FileText, Car } from 'lucide-react'
import { useSeguroStore } from '../store/useSeguroStore'
import GenericTable from '../components/GenericTable'
import Modal from '../components/Modal'

const empty = {
  nome: '',
  seguradoraId: 0,
  seguradoraNome: '',
  cobertura: 'Básica',
  precoMensal: 0,
  carroExemplo: '',
  descricao: '',
  franquia: 0,
}

const coberturaColor = {
  'Básica': 'bg-gray-100 text-gray-700',
  'Intermediária': 'bg-blue-100 text-blue-700',
  'Completa': 'bg-green-100 text-green-700',
}

export default function PlanosPage() {
  const { planos, seguradoras, addPlano, updatePlano, deletePlano } = useSeguroStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [filtro, setFiltro] = useState('todos')

  const planosFiltrados = filtro === 'todos'
    ? planos
    : planos.filter(p => p.cobertura === filtro)

  const openCreate = () => {
    setEditing(null)
    const first = seguradoras[0]
    setForm({
      ...empty,
      seguradoraId: first?.id ?? 0,
      seguradoraNome: first?.nome ?? '',
    })
    setModalOpen(true)
  }

  const openEdit = (p) => {
    setEditing(p)
    const { id, ...rest } = p
    setForm(rest)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      deletePlano(id)
      toast.success('Plano excluído com sucesso!')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nome.trim()) {
      toast.error('Informe o nome do plano')
      return
    }
    if (!form.seguradoraId) {
      toast.error('Selecione uma seguradora')
      return
    }
    if (editing) {
      updatePlano({ ...form, id: editing.id })
      toast.success('Plano atualizado!')
    } else {
      addPlano(form)
      toast.success('Plano criado!')
    }
    setModalOpen(false)
  }

  const handleSeguradora = (id) => {
    const s = seguradoras.find(x => x.id === id)
    setForm({ ...form, seguradoraId: id, seguradoraNome: s?.nome ?? '' })
  }

  const columns = [
    {
      key: 'nome',
      label: 'Plano',
      render: (p) => (
        <div>
          <p className="font-semibold text-blue-900">{p.nome}</p>
          <p className="text-xs text-gray-400">{p.seguradoraNome}</p>
        </div>
      ),
    },
    {
      key: 'cobertura',
      label: 'Cobertura',
      render: (p) => (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${coberturaColor[p.cobertura] || 'bg-gray-100 text-gray-700'}`}>
          {p.cobertura}
        </span>
      ),
    },
    {
      key: 'carroExemplo',
      label: 'Carro Exemplo',
      render: (p) => (
        <span className="flex items-center gap-1.5 text-gray-700">
          <Car className="w-4 h-4 text-orange-400" />
          {p.carroExemplo}
        </span>
      ),
    },
    {
      key: 'precoMensal',
      label: 'Preço Mensal',
      render: (p) => (
        <span className="font-bold text-blue-900">R$ {p.precoMensal.toFixed(2).replace('.', ',')}</span>
      ),
    },
    {
      key: 'franquia',
      label: 'Franquia',
      render: (p) => (
        <span className="text-gray-600">R$ {p.franquia.toLocaleString('pt-BR')}</span>
      ),
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-green-600 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Planos de Seguro</h1>
          </div>
          <p className="text-gray-500 text-sm">Gerencie os planos disponíveis nas seguradoras parceiras.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow"
        >
          <Plus className="w-4 h-4" />
          Novo Plano
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {['todos', 'Básica', 'Intermediária', 'Completa'].map(opt => (
          <button
            key={opt}
            onClick={() => setFiltro(opt)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filtro === opt
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400'
            }`}
          >
            {opt === 'todos' ? 'Todos' : opt}
          </button>
        ))}
      </div>

      <GenericTable
        columns={columns}
        data={planosFiltrados}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage="Nenhum plano cadastrado."
      />

      {modalOpen && (
        <Modal
          title={editing ? 'Editar Plano' : 'Novo Plano'}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nome do plano">
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="input"
                required
              />
            </Field>
            <Field label="Seguradora">
              <select
                value={form.seguradoraId}
                onChange={(e) => handleSeguradora(parseInt(e.target.value))}
                className="input"
                required
              >
                <option value={0}>Selecione...</option>
                {seguradoras.map(s => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Cobertura">
                <select
                  value={form.cobertura}
                  onChange={(e) => setForm({ ...form, cobertura: e.target.value })}
                  className="input"
                >
                  <option>Básica</option>
                  <option>Intermediária</option>
                  <option>Completa</option>
                </select>
              </Field>
              <Field label="Preço Mensal (R$)">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.precoMensal}
                  onChange={(e) => setForm({ ...form, precoMensal: parseFloat(e.target.value) || 0 })}
                  className="input"
                  required
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Carro de exemplo">
                <input
                  type="text"
                  value={form.carroExemplo}
                  onChange={(e) => setForm({ ...form, carroExemplo: e.target.value })}
                  className="input"
                  placeholder="Ex: Honda Civic"
                />
              </Field>
              <Field label="Franquia (R$)">
                <input
                  type="number"
                  min="0"
                  value={form.franquia}
                  onChange={(e) => setForm({ ...form, franquia: parseInt(e.target.value) || 0 })}
                  className="input"
                />
              </Field>
            </div>
            <Field label="Descrição">
              <textarea
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="input min-h-[80px]"
                rows={3}
              />
            </Field>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                {editing ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      <style>{`.input { width: 100%; padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 10px; font-size: 14px; outline: none; transition: border-color .15s; background: white; }
      .input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,.15); }`}</style>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 mb-1 block">{label}</span>
      {children}
    </label>
  )
}
