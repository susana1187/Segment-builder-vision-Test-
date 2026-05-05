import { BarChart3, Database, Layers, LayoutGrid, MoreVertical, PieChart, ShoppingBag, ShoppingCart, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { AssetTag, SegmentRow } from '../types'

const tagIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Marketplace': ShoppingCart,
  'My Data': UserRound,
  'Clean Room': LayoutGrid,
  'Clean Room Data': LayoutGrid,
  'Built Segment': Layers,
  'Built segment': Layers,
  'Datasets': Database,
  'Marketplace Recommendations': ShoppingBag,
}

const tagStyles: Record<
  AssetTag['variant'],
  { bg: string; text: string }
> = {
  source: { bg: 'bg-sky-100', text: 'text-sky-900' },
  tier: { bg: 'bg-amber-100', text: 'text-amber-900' },
  cost: { bg: 'bg-rose-100', text: 'text-rose-900' },
  size: { bg: 'bg-emerald-100', text: 'text-emerald-900' },
  extra: { bg: 'bg-violet-100', text: 'text-violet-900' },
}

type Props = {
  row: SegmentRow
  selected?: boolean
  onSelect?: () => void
  onRemove?: () => void
  onTurnIntoGroup?: () => void
}

export function AssetCard({ row, selected, onSelect, onRemove, onTurnIntoGroup }: Props) {
  const Icon = row.kind === 'criteria' ? BarChart3 : PieChart
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect?.()
        }
      }}
      className={`flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3 shadow-sm transition-shadow hover:shadow-md ${
        selected ? 'border-[#00c853] ring-1 ring-[#00c853]/30' : 'border-gray-200'
      }`}
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-50 text-gray-600">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-semibold text-gray-900">{row.title}</p>
          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="More options"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen((o) => !o)
              }}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full z-20 mt-1 min-w-[180px] rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMenuOpen(false)
                    onRemove?.()
                  }}
                >
                  Remove Rule
                </button>
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    setMenuOpen(false)
                    onTurnIntoGroup?.()
                  }}
                >
                  Turn into Group Rule
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {row.tags.map((t) => {
            const SourceIcon = tagIcons[t.label]
            return (
              <span
                key={t.label}
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${tagStyles[t.variant].bg} ${tagStyles[t.variant].text}`}
              >
                {SourceIcon && <SourceIcon className="h-3 w-3 shrink-0" />}
                {t.label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
