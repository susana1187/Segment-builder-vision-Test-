type Props = {
  segmentSize: string
  p1: number
  p2: number
  p3: number
  cpm: string
  canBuild: boolean
}

export function FooterBar({
  segmentSize,
  p1,
  p2,
  p3,
  cpm,
  canBuild,
}: Props) {
  const items = [
    { value: segmentSize, label: 'Segment Size' },
    { value: String(p1), label: '1P Segments' },
    { value: String(p2), label: '2P Segments' },
    { value: String(p3), label: '3P Segments' },
    { value: cpm.startsWith('$') ? cpm : `$ ${cpm}`, label: 'CPM Cost' },
  ]

  return (
    <footer className="flex shrink-0 flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-3">
      <div className="flex flex-wrap gap-8">
        {items.map((it) => (
          <div key={it.label} className="text-center sm:text-left">
            <div className="text-lg font-semibold tabular-nums text-gray-900">{it.value}</div>
            <div className="text-[11px] text-gray-500">{it.label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
        >
          Save for later
        </button>
        <button
          type="button"
          disabled={!canBuild}
          className={`rounded-md px-4 py-2 text-sm font-semibold shadow-sm ${
            canBuild
              ? 'bg-[#00c853] text-gray-900 hover:bg-[#00e676]'
              : 'cursor-not-allowed bg-gray-300 text-gray-400'
          }`}
        >
          Build Segment
        </button>
      </div>
    </footer>
  )
}
