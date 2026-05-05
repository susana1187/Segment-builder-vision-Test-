import {
  Briefcase,
  ChevronDown,
  ChevronRight,
  Factory,
  Gauge,
  LayoutGrid,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  Upload,
} from 'lucide-react'

const navItem =
  'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm text-white/90 hover:bg-white/5'

export function Sidebar() {
  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col bg-[#0a0a0a] text-white">
      <div className="flex items-center gap-2 px-3 pt-4 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-sm font-bold">
          L
        </div>
        <span className="text-[15px] font-semibold tracking-tight">LiveRamp</span>
      </div>

      <div className="px-3 pb-4">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md bg-[#00c853] px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-[#00e676]"
        >
          Build Segment
          <ChevronDown className="h-4 w-4 opacity-90" aria-hidden />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4 text-[13px]">
        <button type="button" className={navItem}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
            C
          </span>
          <span className="flex-1">Company Name</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </button>

        <button type="button" className={navItem}>
          <Sparkles className="h-4 w-4 shrink-0 text-violet-300" />
          <span className="flex-1">LiveRamp AI</span>
          <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-medium uppercase text-white/70">
            Beta
          </span>
        </button>

        <button type="button" className={navItem}>
          <Search className="h-4 w-4 shrink-0 opacity-80" />
          Search
        </button>
        <button type="button" className={navItem}>
          <LayoutGrid className="h-4 w-4 shrink-0 opacity-80" />
          Dashboard
        </button>
        <button type="button" className={navItem}>
          <Package className="h-4 w-4 shrink-0 opacity-80" />
          <span className="flex-1">Data In</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </button>
        <button type="button" className={navItem}>
          <ShoppingBag className="h-4 w-4 shrink-0 opacity-80" />
          <span className="flex-1">Marketplace</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </button>

        <div className="pt-1">
          <button type="button" className={navItem}>
            <Briefcase className="h-4 w-4 shrink-0 opacity-80" />
            <span className="flex-1">Data Management</span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
          </button>
          <div className="ml-2 mt-0.5 space-y-0.5 border-l border-white/10 pl-2">
            <a href="#" className="block rounded-md px-2 py-1.5 text-white/75 hover:bg-white/5">
              Audiences
            </a>
            <a href="#" className="block rounded-md px-2 py-1.5 text-white/75 hover:bg-white/5">
              Segments
            </a>
            <a
              href="#"
              className="block rounded-md bg-[#c8f7dc] px-2 py-1.5 font-medium text-gray-900"
            >
              Segment Builder
            </a>
            <a href="#" className="block rounded-md px-2 py-1.5 text-white/75 hover:bg-white/5">
              Lookalike Models
            </a>
            <NavNew label="Datasets (Audiences)" />
            <NavNew label="Segments" />
            <NavNew label="Tables & Views" />
            <NavNew label="Identity Engine Workflows" />
          </div>
        </div>

        <button type="button" className={navItem}>
          <Upload className="h-4 w-4 shrink-0 opacity-80" />
          <span className="flex-1">Data Out</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </button>
        <button type="button" className={navItem}>
          <Gauge className="h-4 w-4 shrink-0 opacity-80" />
          <span className="flex-1">Insights</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </button>
        <button type="button" className={navItem}>
          <Factory className="h-4 w-4 shrink-0 opacity-80" />
          <span className="flex-1">Clean Rooms</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-60" />
        </button>
      </nav>

      <div className="border-t border-white/10 p-2">
        <button type="button" className={navItem}>
          <Settings className="h-4 w-4 shrink-0 opacity-80" />
          <span className="flex-1">Administration</span>
          <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
        </button>
      </div>
    </aside>
  )
}

function NavNew({ label }: { label: string }) {
  return (
    <a href="#" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white/75 hover:bg-white/5">
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span className="shrink-0 rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-medium uppercase text-white/70">
        New
      </span>
    </a>
  )
}
