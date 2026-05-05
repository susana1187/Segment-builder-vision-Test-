import { ChevronDown, Info, PieChart, Plus, RefreshCw, Search, X } from 'lucide-react'
import { useState } from 'react'

type Tab = 'details' | 'split' | 'overlaps'

type Props = {
  onClose: () => void
}

const MY_SEGMENT_SIZE = 35000

const availableSegments = [
  { id: 's1', label: 'Loyalty Members — Q1',    size: 120000, overlapPct: 36, color: '#a78bfa' },
  { id: 's2', label: 'High Value Buyers',         size:  45000, overlapPct: 58, color: '#fb923c' },
  { id: 's3', label: 'Email Subscribers',         size:  89000, overlapPct: 22, color: '#34d399' },
  { id: 's4', label: 'App Users — iOS',           size:  67000, overlapPct: 14, color: '#f472b6' },
  { id: 's5', label: 'CRM Upload Q2',             size:  34000, overlapPct: 71, color: '#38bdf8' },
  { id: 's6', label: 'Retargeting Pool',          size: 200000, overlapPct:  8, color: '#facc15' },
]

function fmt(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${Math.round(n / 1000)}K`
  return String(n)
}

const platforms = [
  'Facebook - US',
  'X (Twitter)',
  'Yahoo! (fka Verizon Media)',
  'Campaign Analytics',
  'Meta',
  'Cadent (3INFO)',
  'The Trade Desk',
  'Google DV360',
  'Amazon DSP',
  'Roku',
]

export function InsightsPanel({ onClose }: Props) {
  const [tab, setTab] = useState<Tab>('details')
  const [permittedOpen, setPermittedOpen] = useState(false)
  const [platformSearch, setPlatformSearch] = useState('')
  const [splitEnabled, setSplitEnabled] = useState(true)
  const [splitCount, setSplitCount] = useState('2')
  const [splitNames, setSplitNames] = useState([
    'Potential_Car_Buyers_Test',
    'Potential_Car_Buyers_Control',
  ])
  const [splitPcts, setSplitPcts] = useState([50, 50])
  const [overlapIds, setOverlapIds] = useState<string[]>(['s1', 's2'])
  const [overlapSearch, setOverlapSearch] = useState('')

  const filteredPlatforms = platforms.filter((p) =>
    p.toLowerCase().includes(platformSearch.toLowerCase()),
  )

  function updateSplitName(index: number, value: string) {
    setSplitNames((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function handleSplitCount(value: string) {
    const n = Math.max(2, Math.min(5, Number(value)))
    setSplitCount(String(n))
    setSplitNames((prev) => {
      const next = [...prev]
      while (next.length < n) next.push(`Split_${next.length + 1}`)
      return next.slice(0, n)
    })
    const base = Math.floor(100 / n)
    const remainder = 100 - base * n
    setSplitPcts(Array.from({ length: n }, (_, i) => base + (i === n - 1 ? remainder : 0)))
  }

  function updateSplitPct(index: number, value: string) {
    const num = Math.min(100, Math.max(0, Number(value) || 0))
    setSplitPcts((prev) => { const next = [...prev]; next[index] = num; return next })
  }

  const pctTotal = splitPcts.reduce((a, b) => a + b, 0)

  return (
    <aside className="flex h-full w-[550px] shrink-0 flex-col border-l border-gray-200 bg-white shadow-xl">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-gray-100 px-3 py-0">
        <div className="flex gap-4 text-sm">
          {(
            [
              ['details', 'Details'],
              ['split', 'Split Segment'],
              ['overlaps', 'Data Overlaps'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`border-b-2 pt-4 pb-4 font-medium ${
                tab === id
                  ? 'border-[#00c853] text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
            aria-label="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1.5 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto text-sm">

        {/* ── Details ── */}
        {tab === 'details' && (
          <div className="p-4 space-y-5">
            {/* Description */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Description
              </p>
              <p className="text-gray-700 leading-relaxed">
                These segment is about ... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation.
              </p>
            </div>

            {/* Permitted Use Cases */}
            <div className="rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => setPermittedOpen((o) => !o)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                Permitted Use Cases
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${permittedOpen ? '' : '-rotate-90'}`}
                />
              </button>
              {permittedOpen && (
                <div className="border-t border-gray-100 px-4 py-3 space-y-1.5 text-gray-700">
                  {['Audience Targeting', 'Measurement & Attribution', 'Lookalike Modeling', 'Retargeting'].map((u) => (
                    <div key={u} className="flex items-center gap-2 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00c853]" />
                      {u}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Destination Platforms */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                Available Destination Platforms
              </p>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Platforms"
                  value={platformSearch}
                  onChange={(e) => setPlatformSearch(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white py-2 pl-8 pr-3 text-sm placeholder:text-gray-400 focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
                />
              </div>
              <div className="divide-y divide-gray-100 rounded-lg border border-gray-200">
                {filteredPlatforms.length === 0 ? (
                  <p className="px-4 py-3 text-xs text-gray-400">No platforms match.</p>
                ) : (
                  filteredPlatforms.map((p) => (
                    <div key={p} className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      {p}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Split Segment ── */}
        {tab === 'split' && (
          <div className="p-4 space-y-5">
            {/* Toggle row */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSplitEnabled((v) => !v)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
                  splitEnabled ? 'bg-[#00c853]' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={splitEnabled}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 mt-0.5 ${
                    splitEnabled ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-700">Split Segment into</span>
              <select
                value={splitCount}
                onChange={(e) => handleSplitCount(e.target.value)}
                disabled={!splitEnabled}
                className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-800 focus:border-[#00c853] focus:outline-none disabled:opacity-50"
              >
                {[2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <Info className="h-4 w-4 text-gray-400" />
            </div>

            {/* Segment name + percentage inputs */}
            {splitEnabled && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 pl-6">
                  <span className="flex-1">Segment name</span>
                  <span className="w-20 text-right">Split %</span>
                </div>
                {splitNames.map((name, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 shrink-0 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateSplitName(i, e.target.value)}
                      className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
                    />
                    <div className="relative w-20 shrink-0">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={splitPcts[i] ?? 0}
                        onChange={(e) => updateSplitPct(i, e.target.value)}
                        className="w-full rounded-md border border-gray-200 py-2 pl-3 pr-6 text-sm text-gray-800 focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
                    </div>
                  </div>
                ))}
                <div className={`flex justify-end pr-0 text-xs font-medium ${pctTotal === 100 ? 'text-[#00c853]' : 'text-red-500'}`}>
                  Total: {pctTotal}% {pctTotal !== 100 && '— must equal 100%'}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Data Overlaps ── */}
        {tab === 'overlaps' && (() => {
          const selected = availableSegments.filter((s) => overlapIds.includes(s.id))
          const unselected = availableSegments.filter(
            (s) => !overlapIds.includes(s.id) &&
              s.label.toLowerCase().includes(overlapSearch.toLowerCase()),
          )
          const avgOverlap = selected.length
            ? Math.round(selected.reduce((a, s) => a + s.overlapPct, 0) / selected.length)
            : 0
          const uniquePct = 100 - Math.min(100, selected.reduce((a, s) => a + s.overlapPct * 0.4, 0))

          return (
            <div className="p-4 space-y-5">
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Your Segment', value: fmt(MY_SEGMENT_SIZE), sub: 'total size' },
                  { label: 'Avg Overlap', value: `${avgOverlap}%`, sub: 'across compared' },
                  { label: 'Unique Reach', value: `${Math.round(uniquePct)}%`, sub: 'no overlap' },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-center">
                    <p className="text-xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Add segment */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Compare against</p>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search segments to compare..."
                    value={overlapSearch}
                    onChange={(e) => setOverlapSearch(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-white py-2 pl-8 pr-3 text-sm placeholder:text-gray-400 focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
                  />
                </div>
                {overlapSearch && unselected.length > 0 && (
                  <div className="mt-1 rounded-md border border-gray-200 bg-white shadow-sm">
                    {unselected.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { setOverlapIds((p) => [...p, s.id]); setOverlapSearch('') }}
                        className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                          {s.label}
                        </span>
                        <Plus className="h-3.5 w-3.5 text-gray-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Overlap cards */}
              <div className="space-y-3">
                {selected.map((s) => (
                  <div key={s.id} className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                        <p className="truncate text-sm font-medium text-gray-800">{s.label}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOverlapIds((p) => p.filter((id) => id !== s.id))}
                        className="shrink-0 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="flex-1 overflow-hidden rounded-full bg-gray-100" style={{ height: 6 }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${s.overlapPct}%`, backgroundColor: s.color }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-xs font-semibold text-gray-700">
                        {s.overlapPct}%
                      </span>
                    </div>
                    <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                      <span>Overlap with your segment</span>
                      <span>{fmt(Math.round(MY_SEGMENT_SIZE * s.overlapPct / 100))} shared</span>
                    </div>
                    <div className="mt-1 text-[10px] text-gray-400">
                      Segment size: {fmt(s.size)}
                    </div>
                  </div>
                ))}
                {selected.length === 0 && (
                  <p className="py-4 text-center text-xs text-gray-400">
                    Search and add segments above to see overlap data.
                  </p>
                )}
              </div>

              {/* Venn */}
              {selected.length >= 2 && (
                <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                  <p className="mb-3 text-center text-xs font-medium text-gray-600">Audience overlap preview</p>
                  <DynamicVenn segments={selected.slice(0, 3)} />
                  <div className="mt-3 flex flex-wrap justify-center gap-3 text-[11px]">
                    {selected.slice(0, 3).map((s) => (
                      <Legend key={s.id} color={s.color} label={s.label} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })()}
      </div>
    </aside>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-gray-700">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="max-w-[120px] truncate">{label}</span>
    </span>
  )
}

function DynamicVenn({ segments }: { segments: typeof availableSegments }) {
  const positions = [
    { cx: 115, cy: 95 },
    { cx: 205, cy: 95 },
    { cx: 160, cy: 148 },
  ]
  return (
    <svg viewBox="0 0 320 200" className="mx-auto h-44 w-full max-w-[320px]" aria-hidden>
      {segments.map((s, i) => (
        <circle
          key={s.id}
          cx={positions[i]?.cx ?? 160}
          cy={positions[i]?.cy ?? 100}
          r={62}
          fill={s.color}
          fillOpacity={0.45}
          stroke={s.color}
          strokeOpacity={0.8}
          strokeWidth={1.5}
        />
      ))}
    </svg>
  )
}
