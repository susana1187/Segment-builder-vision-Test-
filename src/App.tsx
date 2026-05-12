import { BarChart3, Bell, CircleHelp, Sparkles, UserRound } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AddRuleMenu } from './components/AddRuleMenu'
import { AssetCard } from './components/AssetCard'
import { AssetPickerModal } from './components/AssetPickerModal'
import { AssistantPanel } from './components/AssistantPanel'
import { FooterBar } from './components/FooterBar'
import { GroupCard } from './components/GroupCard'
import { InsightsPanel } from './components/InsightsPanel'
import { LogicOperator } from './components/LogicOperator'
import { Sidebar } from './components/Sidebar'
import type { CanvasItem, SegmentRow } from './types'
import { computeFooterStats } from './utils/stats'

type RightPanel = 'none' | 'assistant' | 'insights'

export default function App() {
  const [segmentName, setSegmentName] = useState('My awesome segment')
  const [rows, setRows] = useState<CanvasItem[]>([])
  const [operators, setOperators] = useState<('and' | 'or')[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [panel, setPanel] = useState<RightPanel>('none')
  const [assetPickerOpen, setAssetPickerOpen] = useState(false)
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const stats = useMemo(() => computeFooterStats(rows, operators), [rows, operators])
  const canBuild = rows.length > 0
  const addedTitles = useMemo(
    () => rows.flatMap((item) => item.kind === 'group' ? item.children.map((c) => c.title) : [item.title]),
    [rows],
  )
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (assetPickerOpen && pickerRef.current) {
      pickerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [assetPickerOpen])

  function togglePanel(next: Exclude<RightPanel, 'none'>) {
    setPanel((p) => (p === next ? 'none' : next))
  }

  function updateOperator(index: number, value: 'and' | 'or') {
    setOperators((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function handleAddRuleChoice(
    action: 'include-rule' | 'include-group' | 'exclude-rule' | 'exclude-group',
  ) {
    if (action === 'include-rule') setAssetPickerOpen(true)
    if (action === 'include-group') {
      const groupId = crypto.randomUUID()
      const hadRows = rows.length > 0
      setRows((r) => [...r, { id: groupId, kind: 'group', children: [], operators: [] }])
      if (hadRows) setOperators((o) => [...o, 'and'])
    }
  }

  function handleRemoveRow(id: string) {
    const index = rows.findIndex((r) => r.id === id)
    setRows((r) => r.filter((row) => row.id !== id))
    setOperators((ops) => {
      const next = [...ops]
      if (index > 0) next.splice(index - 1, 1)
      else if (next.length > 0) next.splice(0, 1)
      return next
    })
    if (selectedId === id) setSelectedId(null)
  }

  function handleRemoveGroup(groupId: string) {
    const index = rows.findIndex((r) => r.id === groupId)
    setRows((r) => r.filter((item) => item.id !== groupId))
    setOperators((ops) => {
      const next = [...ops]
      if (index > 0) next.splice(index - 1, 1)
      else if (next.length > 0) next.splice(0, 1)
      return next
    })
  }

  function handleRemoveChild(groupId: string, childId: string) {
    setRows((prev) =>
      prev.flatMap((item) => {
        if (item.kind !== 'group' || item.id !== groupId) return [item]
        const index = item.children.findIndex((c) => c.id === childId)
        const remaining = item.children.filter((c) => c.id !== childId)
        if (remaining.length === 0) return []
        const newOps = [...item.operators]
        if (index > 0) newOps.splice(index - 1, 1)
        else if (newOps.length > 0) newOps.splice(0, 1)
        return [{ ...item, children: remaining, operators: newOps }]
      }),
    )
    if (selectedId === childId) setSelectedId(null)
  }

  function handleUpdateGroupOperator(groupId: string, index: number, value: 'and' | 'or') {
    setRows((prev) =>
      prev.map((item) => {
        if (item.kind !== 'group' || item.id !== groupId) return item
        const newOps = [...item.operators]
        newOps[index] = value
        return { ...item, operators: newOps }
      }),
    )
  }

  function handleTurnIntoGroup(id: string) {
    setRows((r) =>
      r.map((row): CanvasItem =>
        row.id === id && row.kind !== 'group'
          ? {
              ...row,
              kind: 'criteria' as const,
              title: row.title,
              tags: [
                { label: 'My Data', variant: 'source' },
                { label: 'Built segment', variant: 'extra' },
                { label: 'CPM: $2,25', variant: 'cost' },
              ],
            }
          : row,
      ),
    )
  }

  function handleConfirmAsset(title: string, tags: SegmentRow['tags']) {
    const id = crypto.randomUUID()
    const newRow: SegmentRow = { id, kind: 'asset', title, tags }
    if (activeGroupId) {
      setRows((prev) =>
        prev.map((item) =>
          item.kind === 'group' && item.id === activeGroupId
            ? {
                ...item,
                children: [...item.children, newRow],
                operators: item.children.length > 0 ? [...item.operators, 'and'] : item.operators,
              }
            : item,
        ),
      )
      setActiveGroupId(null)
    } else {
      const hadRows = rows.length > 0
      setRows((r) => [...r, newRow])
      if (hadRows) setOperators((o) => [...o, 'and'])
    }
    setSelectedId(id)
    setAssetPickerOpen(false)
  }

  return (
    <div className="flex h-screen min-h-0 bg-[#f3f4f6] text-gray-900">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />

      <div className="flex min-w-0 flex-1">
        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 bg-white px-8 pb-4 pt-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-[32px] font-semibold tracking-tight text-gray-900">
                  Segment Builder
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Combine audience rules from any data source. Use the AI Assistant to build smarter segments faster.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Help"
                >
                  <CircleHelp className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  aria-label="Account"
                >
                  <UserRound className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-[240px] max-w-[426px] flex-1">
                <label htmlFor="segment-name" className="text-xs font-medium text-gray-700">
                  Segment Name
                </label>
                <input
                  id="segment-name"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => togglePanel('insights')}
                  className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium shadow-sm ${
                    panel === 'insights'
                      ? 'border-[#00c853] bg-[#00c853]/10 text-gray-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  Insights
                </button>
                <button
                  type="button"
                  onClick={() => togglePanel('assistant')}
                  className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${
                    panel === 'assistant'
                      ? 'bg-[#ddd6fe] text-violet-950 ring-1 ring-violet-300'
                      : 'bg-[#ede9fe] text-violet-950 hover:bg-[#ddd6fe]'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  Assistant
                </button>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
            {rows.map((item, index) => (
              <div key={item.id} className={index === 0 ? '' : 'mt-3'}>
                {index > 0 && (
                  <div className="mb-3 flex justify-start">
                    <LogicOperator
                      value={operators[index - 1] ?? 'and'}
                      onChange={(v) => updateOperator(index - 1, v)}
                    />
                  </div>
                )}
                {item.kind === 'group' ? (
                  <GroupCard
                    group={item}
                    selectedId={selectedId}
                    onSelectChild={(id) => setSelectedId(id)}
                    onRemoveChild={handleRemoveChild}
                    onRemoveGroup={handleRemoveGroup}
                    onAddRule={(groupId) => {
                      setActiveGroupId(groupId)
                      setAssetPickerOpen(true)
                    }}
                    onUpdateOperator={handleUpdateGroupOperator}
                  />
                ) : (
                  <AssetCard
                    row={item}
                    selected={selectedId === item.id}
                    onSelect={() => setSelectedId(item.id)}
                    onRemove={() => handleRemoveRow(item.id)}
                    onTurnIntoGroup={() => handleTurnIntoGroup(item.id)}
                  />
                )}
              </div>
            ))}

            <div className={`flex min-h-[72px] items-center justify-start rounded-lg border border-dashed border-gray-300 bg-gray-50/80 px-4 py-3 ${rows.length > 0 ? 'mt-4' : ''}`}>
              <AddRuleMenu onChoose={handleAddRuleChoice} hasRules={rows.length > 0} />
            </div>

            {assetPickerOpen && (
              <div ref={pickerRef}>
                <AssetPickerModal
                  open
                  onClose={() => setAssetPickerOpen(false)}
                  onConfirm={handleConfirmAsset}
                  addedTitles={addedTitles}
                />
              </div>
            )}
          </div>

          <FooterBar
            segmentSize={stats.segmentSize}
            p1={stats.p1}
            p2={stats.p2}
            p3={stats.p3}
            cpm={stats.cpm}
            canBuild={canBuild}
          />
        </main>

        {panel === 'assistant' && <AssistantPanel onClose={() => setPanel('none')} />}
        {panel === 'insights' && <InsightsPanel onClose={() => setPanel('none')} />}
      </div>

    </div>
  )
}
