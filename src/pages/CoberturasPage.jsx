import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, PlusCircle, Tag } from 'lucide-react'
import { useSeguroStore } from '../store/useSeguroStore'
import GenericTable from '../components/GenericTable'
import Modal from '../components/Modal'

const empty = {
  nome: '',
  descricao: '',
  precoAdicional: 0,
  categoria: 'Assistência',
}

const categoriaColor = {
  'Assistência': 'bg-blue-100 text-blue-700',
  'Danos': 'bg-red-100 text-red-700',
  'Responsabilidade': 'bg-purple-100 text-purple-700',
  'Acessórios': 'bg-yellow-100 text-yellow-700',
}

export default function CoberturasPage() {
  const { coberturas, addCobertura, updateCobertura, deleteCobertura } = useSeguroStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [view, setView] = useState('cards')

  const openCreate = () => {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }

  const openEdit = (c) => {
    setEditing(c)
    const { id, ...rest } = c
    setForm(rest)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta cobertura?')) {
      deleteCobertura(id)
      toast.success('Cobertura excluída com sucesso!')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nome.trim()) {
      toast.error('Informe o nome da cobertura')
      return
    }
    if (editing) {
      updateCobertura({ ...form, id: editing.id })
      toast.success('Cobertura atualizada!')
    } else {
      addCobertura(form)
      toast.success('Cobertura criada!')
    }
    setModalOpen(false)
  }

  const columns = [
    {
      key: 'nome',
      label: 'Cobertura',
      render: (c) => <p className="font-semibold text-blue-900">{c.nome}</p>,
    },
    {
      key: 'categoria',
      label: 'Categoria',
      render: (c) => (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoriaColor[c.categoria] || 'bg-gray-100 text-gray-700'}`}>
          {c.categoria}
        </span>
      ),
    },
    {
      key: 'descricao',
      label: 'Descrição',
      render: (c) => <span className="text-gray-600 text-sm line-clamp-2 max-w-md block">{c.descricao}</span>,
    },
    {
      key: 'precoAdicional',
      label: 'Preço Adicional',
      render: (c) => (
        <span className="font-bold text-orange-500">+ R$ {c.precoAdicional.toFixed(2).replace('.', ',')}/mês</span>
      ),
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-orange-500 p-2 rounded-lg">
              <PlusCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Coberturas Adicionais</h1>
          </div>
          <p className="text-gray-500 text-sm">Personalize seu seguro com coberturas extras.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200 rounded-xl p-1 flex">
            <button
              onClick={() => setView('cards')}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${view === 'cards' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
            >
              Cards
            </button>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${view === 'table' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
            >
              Tabela
            </button>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow"
          >
            <Plus className="w-4 h-4" />
            Nova Cobertura
          </button>
        </div>
      </div>

      {view === 'table' ? (
        <GenericTable
          columns={columns}
          data={coberturas}
          onEdit={openEdit}
          onDelete={handleDelete}
          emptyMessage="Nenhuma cobertura cadastrada."
        />
      ) : coberturas.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-200">
          <PlusCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Nenhuma cobertura cadastrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {coberturas.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-blue-900 text-lg">{c.nome}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${categoriaColor[c.categoria] || 'bg-gray-100 text-gray-700'}`}>
                  <Tag className="inline w-3 h-3 mr-1" />
                  {c.categoria}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 flex-1">{c.descricao}</p>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <p className="text-orange-500 font-bold">
                  + R$ {c.precoAdicional.toFixed(2).replace('.', ',')}<span className="text-xs text-gray-400 font-normal">/mês</span>
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal
          title={editing ? 'Editar Cobertura' : 'Nova Cobertura'}
          onClose={() => setModalOpen(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Nome">
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="input"
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Categoria">
                <select
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="input"
                >
                  <option>Assistência</option>
                  <option>Danos</option>
                  <option>Responsabilidade</option>
                  <option>Acessórios</option>
                </select>
              </Field>
              <Field label="Preço Adicional (R$)">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.precoAdicional}
                  onChange={(e) => setForm({ ...form, precoAdicional: parseFloat(e.target.value) || 0 })}
                  className="input"
                  required
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