import { STATUS_COLORS } from '../../utils/constants';

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
}
