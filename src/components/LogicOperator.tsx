import { ChevronDown } from 'lucide-react'

type Props = {
  value: 'and' | 'or'
  onChange: (v: 'and' | 'or') => void
}

export function LogicOperator({ value, onChange }: Props) {
  return (
    <div className="relative w-fit min-w-[5.25rem]">
      <select
        aria-label="Combine with"
        value={value}
        onChange={(e) => onChange(e.target.value as 'and' | 'or')}
        className="min-w-[5.25rem] appearance-none rounded-md border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-gray-700 shadow-sm hover:border-gray-300 focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
      >
        <option value="and">And</option>
        <option value="or">Or</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
    </div>
  )
}
