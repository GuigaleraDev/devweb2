import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Building2, Shield } from 'lucide-react'
import { useSeguroStore } from '../store/useSeguroStore'
import GenericTable from '../components/GenericTable'
import Modal from '../components/Modal'
import StarRating from '../components/StarRating'

const empty = {
  nome: '',
  avaliacao: 4.5,
  logo: '',
  tempoMercado: 10,
  descricao: '',
  cnpj: '',
}

export default function SeguradorasPage() {
  const { seguradoras, addSeguradora, updateSeguradora, deleteSeguradora } = useSeguroStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)

  const openCreate = () => {
    setEditing(null)
    setForm(empty)
    setModalOpen(true)
  }

  const openEdit = (s) => {
    setEditing(s)
    const { id, ...rest } = s
    setForm(rest)
    setModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta seguradora?')) {
      deleteSeguradora(id)
      toast.success('Seguradora excluída com sucesso!')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nome.trim()) {
      toast.error('Informe o nome da seguradora')
      return
    }
    if (editing) {
      updateSeguradora({ ...form, id: editing.id })
      toast.success('Seguradora atualizada!')
    } else {
      addSeguradora(form)
      toast.success('Seguradora criada!')
    }
    setModalOpen(false)
  }

  const columns = [
    {
      key: 'nome',
      label: 'Seguradora',
      render: (s) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 p-1">
            {s.logo ? (
              <img 
                src={import.meta.env.BASE_URL + s.logo.replace(/^\//, '')} 
                alt={s.nome} 
                className="w-full h-full object-contain" 
                onError={(e) => { e.target.style.display = 'none' }} 
              />
            ) : (
              <Shield className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <p className="font-semibold text-blue-900">{s.nome}</p>
            <p className="text-xs text-gray-400">{s.cnpj}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'avaliacao',
      label: 'Avaliação',
      render: (s) => <StarRating value={s.avaliacao} />,
    },
    {
      key: 'tempoMercado',
      label: 'Tempo de Mercado',
      render: (s) => <span className="text-gray-700">{s.tempoMercado} anos</span>,
    },
    {
      key: 'descricao',
      label: 'Descrição',
      render: (s) => <span className="text-gray-600 text-sm line-clamp-2 max-w-md block">{s.descricao}</span>,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Seguradoras</h1>
          </div>
          <p className="text-gray-500 text-sm">Gerencie as seguradoras parceiras do comparador.</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow"
        >
          <Plus className="w-4 h-4" />
          Nova Seguradora
        </button>
      </div>

      <GenericTable
        columns={columns}
        data={seguradoras}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage="Nenhuma seguradora cadastrada."
      />

      {modalOpen && (
        <Modal
          title={editing ? 'Editar Seguradora' : 'Nova Seguradora'}
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
              <Field label="Avaliação (0-5)">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.avaliacao}
                  onChange={(e) => setForm({ ...form, avaliacao: parseFloat(e.target.value) || 0 })}
                  className="input"
                  required
                />
              </Field>
              <Field label="Tempo de mercado (anos)">
                <input
                  type="number"
                  min="0"
                  value={form.tempoMercado}
                  onChange={(e) => setForm({ ...form, tempoMercado: parseInt(e.target.value) || 0 })}
                  className="input"
                  required
                />
              </Field>
            </div>
            <Field label="CNPJ">
              <input
                type="text"
                value={form.cnpj}
                onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                className="input"
                placeholder="00.000.000/0000-00"
              />
            </Field>
            <Field label="URL do Logo">
              <input
                type="text"
                value={form.logo}
                onChange={(e) => setForm({ ...form, logo: e.target.value })}
                className="input"
                placeholder="https://..."
              />
            </Field>
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
    </div>
  )
}

function Field(props) {
  const { label, children } = props;
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 mb-1 block">{label}</span>
      {children}
    </label>
  )
}