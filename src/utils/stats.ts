import type { CanvasItem, SegmentRow } from '../types'

/** Parse a size string like "Size: 320K", "Size: 2M", "Size: 11K" → number */
function parseSize(tag: string): number | null {
  const match = tag.match(/[\d,.]+\s*([KkMm]?)/)
  if (!match) return null
  const num = parseFloat(match[0].replace(',', '.'))
  const unit = match[1].toUpperCase()
  if (unit === 'M') return Math.round(num * 1_000_000)
  if (unit === 'K') return Math.round(num * 1_000)
  return Math.round(num)
}

function rowSize(row: SegmentRow): number {
  for (const t of row.tags) {
    if (t.label.startsWith('Size:')) {
      const s = parseSize(t.label.replace('Size:', '').trim())
      if (s !== null) return s
    }
  }
  return 0
}

function parseCpm(tag: string): number {
  const match = tag.match(/[\d,]+\.?[\d]*/)
  if (!match) return 0
  return parseFloat(match[0].replace(',', '.'))
}

function rowCpm(row: SegmentRow): number {
  for (const t of row.tags) {
    if (t.label.startsWith('CPM:')) {
      return parseCpm(t.label.replace('CPM:', '').trim())
    }
  }
  return 0
}

/**
 * Combine two sizes with AND (intersection) or OR (union).
 * AND: estimate ~55% overlap of the smaller audience
 * OR:  union formula A + B - overlap
 */
function combine(a: number, b: number, op: 'and' | 'or'): number {
  if (a === 0) return b
  if (b === 0) return a
  const maxPop = 300_000_000 // rough US addressable universe
  if (op === 'or') {
    const overlap = (a / maxPop) * b
    return Math.round(Math.min(a + b - overlap, maxPop))
  } else {
    // AND: intersection estimate
    const overlap = (Math.min(a, b) / maxPop) * Math.max(a, b)
    return Math.round(Math.max(overlap, Math.min(a, b) * 0.05))
  }
}

/** Compute the effective size of a list of rows joined by operators */
function computeGroupSize(rows: SegmentRow[], operators: ('and' | 'or')[]): number {
  if (rows.length === 0) return 0
  let size = rowSize(rows[0])
  for (let i = 1; i < rows.length; i++) {
    const op = operators[i - 1] ?? 'and'
    size = combine(size, rowSize(rows[i]), op)
  }
  return size
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return String(n)
}

export function computeFooterStats(
  items: CanvasItem[],
  operators: ('and' | 'or')[],
) {
  let p1 = 0
  let p2 = 0
  let p3 = 0
  let maxCpm = 0

  // Collect flat rows for P1/P2/P3/CPM counting
  const allRows: SegmentRow[] = items.flatMap((item) =>
    item.kind === 'group' ? item.children : [item],
  )
  for (const r of allRows) {
    for (const t of r.tags) {
      if (t.label === '1P') p1 += 1
      if (t.label === '2P') p2 += 1
      if (t.label === '3P') p3 += 1
      if (t.label.startsWith('CPM:')) maxCpm = Math.max(maxCpm, rowCpm(r))
    }
  }

  if (items.length === 0) {
    return { segmentSize: '—', p1: 0, p2: 0, p3: 0, cpm: '$ —' }
  }

  // Compute size of each top-level item (groups get their own internal size)
  const itemSizes: number[] = items.map((item) => {
    if (item.kind === 'group') {
      return computeGroupSize(item.children, item.operators)
    }
    return rowSize(item)
  })

  // Combine top-level items with their operators
  let totalSize = itemSizes[0]
  for (let i = 1; i < itemSizes.length; i++) {
    const op = operators[i - 1] ?? 'and'
    totalSize = combine(totalSize, itemSizes[i], op)
  }

  const segmentSize = totalSize > 0 ? fmt(totalSize) : '—'
  const cpm = maxCpm > 0 ? `$${maxCpm.toFixed(2)}` : '$ —'

  return { segmentSize, p1, p2, p3, cpm }
}
