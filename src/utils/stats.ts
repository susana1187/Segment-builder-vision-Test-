import type { SegmentRow } from '../types'

export function computeFooterStats(rows: SegmentRow[]) {
  let p1 = 0
  let p2 = 0
  let p3 = 0
  for (const r of rows) {
    for (const t of r.tags) {
      if (t.label === '1P') p1 += 1
      if (t.label === '2P') p2 += 1
      if (t.label === '3P') p3 += 1
    }
  }

  const hasAssets = rows.some((r) => r.kind === 'asset')
  const segmentSize = hasAssets ? '35K' : '—'
  const cpm = hasAssets ? '$2,50' : '$ —'

  return { segmentSize, p1, p2, p3, cpm }
}
