export type TagVariant = 'source' | 'tier' | 'cost' | 'size' | 'extra'

export interface AssetTag {
  label: string
  variant: TagVariant
}

export interface SegmentRow {
  id: string
  kind: 'asset' | 'criteria'
  title: string
  tags: AssetTag[]
}
