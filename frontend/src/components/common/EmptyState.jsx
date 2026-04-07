import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No data found', description = 'Please try again later.' }) {
  return (
    <div className="card-base flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="rounded-full bg-blue-50 p-4 text-blue-600">
        <Inbox className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}
