import { Building2, Video } from 'lucide-react';
import Modal from '../common/Modal';

export default function ModeSelectorModal({ isOpen, onClose, onSelect }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose consultation type">
      <p className="mb-5 text-sm text-slate-500">
        First select how you want to consult. Based on this, matching specialties and doctors will be shown.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => onSelect('ONLINE')}
          className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Video className="mb-3 h-8 w-8 text-emerald-700" />
          <h4 className="text-lg font-semibold text-slate-900">Online</h4>
          <p className="mt-1 text-sm text-slate-600">Video consultation from home with live slot selection.</p>
        </button>

        <button
          onClick={() => onSelect('OFFLINE')}
          className="rounded-2xl border border-orange-100 bg-orange-50 p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Building2 className="mb-3 h-8 w-8 text-orange-700" />
          <h4 className="text-lg font-semibold text-slate-900">Offline</h4>
          <p className="mt-1 text-sm text-slate-600">In-clinic visit with address, instructions and available slots.</p>
        </button>
      </div>
    </Modal>
  );
}
