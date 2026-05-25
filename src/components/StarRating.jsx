import { Star } from 'lucide-react'

export default function StarRating({ value, max = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value)
        const partial = !filled && i < value
        return (
          <span key={i} className="relative inline-block">
            <Star className="w-4 h-4 text-gray-300" fill="currentColor" />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : `${(value % 1) * 100}%` }}
              >
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              </span>
            )}
          </span>
        )
      })}
      <span className="text-sm text-gray-600 ml-1 font-medium">{value.toFixed(1)}</span>
    </div>
  )
}