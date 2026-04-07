import { formatTime } from '../../utils/formatters';
import { cn, isSlotExpired } from '../../utils/helpers';

export default function SlotCard({ slot, selected, onClick }) {
  const unavailable = slot.status !== 'AVAILABLE' || isSlotExpired(slot.slotDate, slot.startTime);

  return (
    <button
      onClick={() => !unavailable && onClick(slot)}
      disabled={unavailable}
      className={cn(
        'rounded-xl border px-4 py-3 text-left transition',
        unavailable && 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400',
        !unavailable && !selected && 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300',
        selected && 'border-blue-600 bg-blue-600 text-white'
      )}
    >
      <p className="text-sm font-semibold">{formatTime(slot.startTime)}</p>
      <p className="mt-1 text-xs">{unavailable ? 'Unavailable' : 'Available'}</p>
    </button>
  );
}
