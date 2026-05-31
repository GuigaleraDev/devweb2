import { Pencil, Trash2 } from 'lucide-react';

export default function GenericTable(props) {
  const { columns, data, onEdit, onDelete, emptyMessage = "Nenhum registro encontrado." } = props;

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-900 text-white">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-center font-semibold w-28">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={item.id}
              className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700">
                  {col.render ? col.render(item) : String(item[col.key] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-1.5 rounded-lg transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}