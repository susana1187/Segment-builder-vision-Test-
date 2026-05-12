import {
  ChevronDown,
  ChevronRight,
  Database,
  Folder,
  LayoutGrid,
  PieChart,
  Search,
  ShoppingBag,
  ShoppingCart,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'
import { useState } from 'react'
import type { TagVariant } from '../types'

type LeafTag = { label: string; bg: string; text: string; variant: TagVariant }

type AssetLeaf = {
  id: string
  label: string
  tags: LeafTag[]
  description: string
  iabCategories: string
  purchaseIntent?: string
  segmentType: string
}

type TreeBranch = {
  id: string
  label: string
  Icon: React.ComponentType<{ className?: string }>
  children: AssetLeaf[]
}

const tree: TreeBranch[] = [
  {
    id: 'datasets',
    label: 'Datasets',
    Icon: Database,
    children: [
      {
        id: 'ds-active',
        label: 'Campaign_FY26_SS > Audience > Active Users',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,50', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 320K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Users who engaged with at least one campaign touchpoint in the last 90 days. Verified against CRM first-party data.',
        iabCategories: 'Audience | Behavioral | Campaign Engagement | Active',
        segmentType: 'Standard',
      },
      {
        id: 'ds-lapsed',
        label: 'Campaign_FY26_SS > Audience > Lapsed Users',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,50', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 180K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Users who have not engaged with any campaign in the last 180 days. Useful for re-engagement strategies.',
        iabCategories: 'Audience | Behavioral | Campaign Engagement | Lapsed',
        segmentType: 'Standard',
      },
    ],
  },
  {
    id: 'campaign',
    label: 'Campaign_FY26_SS',
    Icon: Folder,
    children: [
      {
        id: 'camp-garden',
        label: 'Spring_Launch > Interest > Gardening',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,75', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 95K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Audience with demonstrated interest in gardening and outdoor planting, built from Spring Launch campaign interactions.',
        iabCategories: 'Hobbies | Home & Garden | Gardening | Outdoor Living',
        segmentType: 'Custom',
      },
      {
        id: 'camp-home',
        label: 'Spring_Launch > Interest > Home Improvement',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,75', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 142K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Users who clicked on home improvement content during the Spring Launch campaign. High purchase intent signal.',
        iabCategories: 'Home & Garden | Home Improvement | DIY | Renovation',
        purchaseIntent: 'Purchase Intent | Hardware | Paint & Supplies | Flooring | Power Tools',
        segmentType: 'Custom',
      },
    ],
  },
  {
    id: 'migrated',
    label: 'Migrated CP2',
    Icon: Folder,
    children: [
      {
        id: 'mig-age',
        label: 'Legacy_Segment_A > Demographic > Age 25–34',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,60', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 210K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Demographic segment targeting adults aged 25–34, migrated from the legacy CP2 platform.',
        iabCategories: 'Demographic | Age | Young Adults | 25–34',
        segmentType: 'Standard',
      },
      {
        id: 'mig-purchase',
        label: 'Legacy_Segment_B > Behavioral > Purchase Intent',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,80', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 78K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'High-intent buyers identified by behavioral signals from the legacy CP2 system. Strong conversion history.',
        iabCategories: 'Behavioral | Purchase Intent | Shopping | High Value',
        segmentType: 'Standard',
      },
    ],
  },
  {
    id: 'build-segments',
    label: 'Build Segments',
    Icon: Wrench,
    children: [
      {
        id: 'build-look1',
        label: 'Custom_Build_01 > Lookalike > Seed 1K',
        tags: [
          { label: 'Built Segment', bg: 'bg-violet-100', text: 'text-violet-900', variant: 'extra' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $1,20', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 500K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Lookalike model built from a 1K seed audience of top converters. Modeled against LiveRamp\'s identity graph.',
        iabCategories: 'Modeled | Lookalike | High Propensity | Conversion',
        segmentType: 'Lookalike',
      },
      {
        id: 'build-look2',
        label: 'Custom_Build_02 > Lookalike > Seed 5K',
        tags: [
          { label: 'Built Segment', bg: 'bg-violet-100', text: 'text-violet-900', variant: 'extra' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $1,00', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 2M', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Broader lookalike built from a 5K seed, offering greater reach with moderate precision.',
        iabCategories: 'Modeled | Lookalike | Broad Reach | Scale',
        segmentType: 'Lookalike',
      },
    ],
  },
  {
    id: 'my-data',
    label: 'My Data',
    Icon: UserRound,
    children: [
      {
        id: 'crm-q1',
        label: 'CRM_Upload_Q1 > Email Matched > 45% Match Rate',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,00', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 67K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Q1 CRM email list matched against the identity graph at a 45% match rate. No media cost — first-party owned.',
        iabCategories: 'CRM | Email | First Party | Owned Audience',
        segmentType: 'First Party',
      },
      {
        id: 'crm-q2',
        label: 'CRM_Upload_Q2 > Email Matched > 52% Match Rate',
        tags: [
          { label: 'My Data', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '1P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $0,00', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 84K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Q2 CRM upload with improved match rate of 52%. Higher quality data hygiene applied before submission.',
        iabCategories: 'CRM | Email | First Party | Owned Audience',
        segmentType: 'First Party',
      },
    ],
  },
  {
    id: 'clean-room',
    label: 'Clean Room Data',
    Icon: LayoutGrid,
    children: [
      {
        id: 'cr-partner-a',
        label: 'Partner_Overlap_A > Matched Audience > 120K',
        tags: [
          { label: 'Clean Room', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '2P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $1,50', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 120K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Overlap audience derived from a clean room collaboration with Partner A. Privacy-safe matching via encrypted IDs.',
        iabCategories: 'Clean Room | Partner Data | Overlap | Privacy Safe',
        segmentType: 'Clean Room',
      },
      {
        id: 'cr-partner-b',
        label: 'Partner_Overlap_B > Matched Audience > 89K',
        tags: [
          { label: 'Clean Room', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '2P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $1,50', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 89K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Overlap with Partner B from a retail clean room environment. Strong affinity with household goods categories.',
        iabCategories: 'Clean Room | Partner Data | Retail | Household',
        segmentType: 'Clean Room',
      },
    ],
  },
  {
    id: 'marketplace',
    label: 'Marketplace Data (already requested)',
    Icon: ShoppingCart,
    children: [
      {
        id: 'aiq-edu',
        label: 'AnalyticsIQ > Demographics > Education > Some College',
        tags: [
          { label: 'Marketplace', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '3P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $2,50', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 11K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'These individuals are known to work at Aetna. This dataset\'s performance is verified by Truthset. Healthcare, insurance, medical, coverage.',
        iabCategories: 'Demographic | Education & Occupation | Education (Highest Level) | College Education | Professional School',
        purchaseIntent: 'Purchase Intent* | Consumer Packaged Goods | Edible | Beverages | Coffee & Tea | Coffee Creamer',
        segmentType: 'Standard',
      },
      {
        id: 'aiq-fin',
        label: 'AnalyticsIQ > Finance > Investing > 529 College Plan',
        tags: [
          { label: 'Marketplace', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '3P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $2,25', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 8K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Audiences actively investing in 529 college savings plans, sourced from AnalyticsIQ financial behavioral data.',
        iabCategories: 'Finance | Investing | Education Savings | College Planning',
        segmentType: 'Standard',
      },
    ],
  },
  {
    id: 'marketplace-rec',
    label: 'Marketplace Recommendations (to request)',
    Icon: ShoppingBag,
    children: [
      {
        id: 'exp-income',
        label: 'Experian > Income > Household > $100K+',
        tags: [
          { label: 'Marketplace', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '3P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $3,00', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 22K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'High-income households earning $100K or more annually, sourced from Experian\'s financial data network.',
        iabCategories: 'Demographic | Income | Affluent | High Net Worth',
        segmentType: 'Standard',
      },
      {
        id: 'nielsen-tv',
        label: 'Nielsen > TV Viewers > Primetime > 18–49',
        tags: [
          { label: 'Marketplace', bg: 'bg-sky-100', text: 'text-sky-900', variant: 'source' as TagVariant },
          { label: '3P', bg: 'bg-amber-100', text: 'text-amber-900', variant: 'tier' as TagVariant },
          { label: 'CPM: $3,50', bg: 'bg-rose-100', text: 'text-rose-900', variant: 'cost' as TagVariant },
          { label: 'Size: 45K', bg: 'bg-emerald-100', text: 'text-emerald-900', variant: 'size' as TagVariant },
        ],
        description: 'Adults 18–49 who regularly watch primetime TV, verified by Nielsen viewership measurement data.',
        iabCategories: 'Media | Television | Primetime | Adults 18–49',
        purchaseIntent: 'Purchase Intent | Consumer Electronics | Streaming | Entertainment',
        segmentType: 'Standard',
      },
    ],
  },
]

const allLeaves = tree.flatMap((b) => b.children)

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: (title: string, tags: { label: string; variant: TagVariant }[]) => void
  addedTitles?: string[]
}

export function AssetPickerModal({ open, onClose, onConfirm, addedTitles = [] }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [overviewOpen, setOverviewOpen] = useState(false)
  const [query, setQuery] = useState('')

  if (!open) return null

  const selected = selectedId ? allLeaves.find((l) => l.id === selectedId) ?? null : null

  const normalizedQuery = query.trim().toLowerCase()
  const visibleTree = normalizedQuery
    ? tree
        .map((branch) => ({
          ...branch,
          children: branch.children.filter((leaf) =>
            leaf.label.toLowerCase().includes(normalizedQuery),
          ),
        }))
        .filter((branch) => branch.children.length > 0)
    : tree

  function toggleBranch(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Select Asset</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-gray-500 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex divide-x divide-gray-100" style={{ height: '420px' }}>
        {/* Left — tree */}
        <div className="flex w-[40%] flex-col">
          <div className="relative border-b border-gray-100 px-3 py-2">
            <Search className="absolute left-5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-gray-50 py-1.5 pl-7 pr-3 text-sm placeholder:text-gray-400 focus:border-[#00c853] focus:outline-none focus:ring-1 focus:ring-[#00c853]"
            />
          </div>
          <div className="flex-1 overflow-y-auto py-2 text-sm">
          {visibleTree.length === 0 && (
            <p className="px-4 py-3 text-xs text-gray-400">No assets match your search.</p>
          )}
          {visibleTree.map((branch) => {
            const isExpanded = normalizedQuery ? true : expanded.has(branch.id)
            return (
              <div key={branch.id}>
                <button
                  type="button"
                  onClick={() => toggleBranch(branch.id)}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                >
                  <span className="w-4 shrink-0 text-gray-400">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                  <branch.Icon className="h-4 w-4 shrink-0 text-gray-500" />
                  <span className="leading-snug">{branch.label}</span>
                </button>

                {isExpanded && (
                  <ul>
                    {branch.children.map((leaf) => {
                      const alreadyAdded = addedTitles.includes(leaf.label)
                      return (
                        <li key={leaf.id}>
                          <button
                            type="button"
                            disabled={alreadyAdded}
                            onClick={() => !alreadyAdded && setSelectedId(leaf.id)}
                            className={`flex w-full items-center gap-2 py-2 pl-10 pr-4 text-left text-sm leading-snug ${
                              alreadyAdded
                                ? 'cursor-not-allowed text-gray-300'
                                : selectedId === leaf.id
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <PieChart className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                            <span className="flex-1">{leaf.label}</span>
                            {alreadyAdded && (
                              <span className="shrink-0 text-[10px] text-gray-300">Added</span>
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
          </div>
        </div>

        {/* Right — detail */}
        <div className="flex-1 overflow-y-auto p-5">
          {!selected && (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Select an asset from the list to see details
            </div>
          )}
          {selected && (
            <>
              <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
                <PieChart className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />
                <h3 className="text-base font-semibold leading-snug text-gray-900">
                  {selected.label}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <span
                    key={t.label}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${t.bg} ${t.text}`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Description
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{selected.description}</p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  IAB Categories
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{selected.iabCategories}</p>
              </div>

              {selected.purchaseIntent && (
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{selected.purchaseIntent}</p>
              )}

              <div className="mt-5 rounded border border-gray-200">
                <button
                  type="button"
                  onClick={() => setOverviewOpen((o) => !o)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  Asset Overview
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${overviewOpen ? '' : '-rotate-90'}`}
                  />
                </button>
                {overviewOpen && (
                  <div className="border-t border-gray-100 px-4 py-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Segment Type</span>
                      <span className="font-medium text-gray-900">{selected.segmentType}</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!selected || addedTitles.includes(selected?.label ?? '')}
          onClick={() => {
            if (selected) {
              onConfirm(
                selected.label,
                selected.tags.map(({ label, variant }) => ({ label, variant })),
              )
              onClose()
            }
          }}
          className="rounded-md bg-[#00c853] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#00e676] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
        >
          Add asset
        </button>
      </div>
    </div>
  )
}
