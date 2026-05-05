import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Action =
  | 'include-rule'
  | 'include-group'
  | 'exclude-rule'
  | 'exclude-group'

type Props = {
  onChoose: (action: Action) => void
  hasRules?: boolean
}

export function AddRuleMenu({ onChoose, hasRules = false }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
      >
        Add Rule
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 min-w-[220px] rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            className="block w-full px-3 py-2 text-left text-sm hover:bg-[#c8f7dc]"
            onClick={() => {
              onChoose('include-rule')
              setOpen(false)
            }}
          >
            Include Rule
          </button>
          <button
            type="button"
            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
            onClick={() => {
              onChoose('include-group')
              setOpen(false)
            }}
          >
            Include Group Rule
          </button>
          <button
            type="button"
            disabled={!hasRules}
            className={`block w-full px-3 py-2 text-left text-sm ${hasRules ? 'text-gray-700 hover:bg-gray-50' : 'cursor-not-allowed text-gray-400'}`}
            onClick={() => {
              onChoose('exclude-rule')
              setOpen(false)
            }}
          >
            Exclude Rule
          </button>
          <button
            type="button"
            disabled={!hasRules}
            className={`block w-full px-3 py-2 text-left text-sm ${hasRules ? 'text-gray-700 hover:bg-gray-50' : 'cursor-not-allowed text-gray-400'}`}
            onClick={() => {
              onChoose('exclude-group')
              setOpen(false)
            }}
          >
            Exclude Group Rule
          </button>
        </div>
      )}
    </div>
  )
}
