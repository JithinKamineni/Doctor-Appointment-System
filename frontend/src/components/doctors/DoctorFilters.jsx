import { Search, SlidersHorizontal } from 'lucide-react';

export default function DoctorFilters({
  mode,
  setMode,
  search,
  setSearch,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="card-base flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {['ONLINE', 'OFFLINE'].map((item) => (
          <button
            key={item}
            onClick={() => setMode(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === item ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="input-base pl-10"
            placeholder="Search doctor name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select className="input-base pl-10" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Top rated</option>
            <option value="experience">Most experience</option>
            <option value="feeLowHigh">Fee: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
