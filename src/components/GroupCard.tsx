import { Layers, Plus } from 'lucide-react'
import type { SegmentGroup, SegmentRow } from '../types'
import { AssetCard } from './AssetCard'
import { LogicOperator } from './LogicOperator'

type Props = {
  group: SegmentGroup
  selectedId: string | null
  onSelectChild: (id: string) => void
  onRemoveChild: (groupId: string, childId: string) => void
  onRemoveGroup: (groupId: string) => void
  onAddRule: (groupId: string) => void
  onUpdateOperator: (groupId: string, index: number, value: 'and' | 'or') => void
}

export function GroupCard({ group, selectedId, onSelectChild, onRemoveChild, onRemoveGroup, onAddRule, onUpdateOperator }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Group header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          <Layers className="h-3.5 w-3.5" />
          Group Rule
        </div>
        <button
          type="button"
          onClick={() => onRemoveGroup(group.id)}
          className="rounded px-2 py-0.5 text-xs text-red-500 hover:bg-red-50"
        >
          Remove Group
        </button>
      </div>

      {/* Children with AND/OR between them */}
      {group.children.length > 0 && (
        <div className="px-3 py-3 space-y-0">
          {group.children.map((child: SegmentRow, index: number) => (
            <div key={child.id}>
              {index > 0 && (
                <div className="my-2 flex justify-start">
                  <LogicOperator
                    value={group.operators[index - 1] ?? 'and'}
                    onChange={(v) => onUpdateOperator(group.id, index - 1, v)}
                  />
                </div>
              )}
              <AssetCard
                row={child}
                selected={selectedId === child.id}
                onSelect={() => onSelectChild(child.id)}
                onRemove={() => onRemoveChild(group.id, child.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Add rule buttons */}
      <div className={`flex gap-2 px-4 py-3 ${group.children.length > 0 ? 'border-t border-gray-100' : ''}`}>
        <button
          type="button"
          onClick={() => onAddRule(group.id)}
          className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-100"
        >
          <Plus className="h-3.5 w-3.5" />
          Include Rule
        </button>
        <button
          type="button"
          onClick={() => onAddRule(group.id)}
          className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:bg-gray-100"
        >
          <Plus className="h-3.5 w-3.5" />
          Exclude Rule
        </button>
      </div>
    </div>
  )
}
