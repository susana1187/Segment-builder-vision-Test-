import type { SegmentRow } from '../types'

export const initialRows: SegmentRow[] = [
  {
    id: 'a1',
    kind: 'asset',
    title: 'Asset name 1',
    tags: [
      { label: 'Marketplace', variant: 'source' },
      { label: '3P', variant: 'tier' },
      { label: 'CPM: $2,50', variant: 'cost' },
      { label: 'Size: 11K', variant: 'size' },
    ],
  },
  {
    id: 'a2',
    kind: 'asset',
    title: 'Asset name 2',
    tags: [
      { label: 'My Data', variant: 'source' },
      { label: 'Built segment', variant: 'extra' },
      { label: '2P', variant: 'tier' },
      { label: 'Size: 11K', variant: 'size' },
    ],
  },
  {
    id: 'a3',
    kind: 'asset',
    title: 'Asset name 3',
    tags: [
      { label: 'Clean Room Data', variant: 'source' },
      { label: 'Lookalike', variant: 'extra' },
      { label: '1P', variant: 'tier' },
      { label: 'Size: 11K', variant: 'size' },
    ],
  },
]

export const initialOperators: ('and' | 'or')[] = ['and', 'or']
