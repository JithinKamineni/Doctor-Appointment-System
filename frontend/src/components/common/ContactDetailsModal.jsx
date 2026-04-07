import { Mail, MapPin, Phone } from 'lucide-react';
import Modal from './Modal';

export default function ContactDetailsModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact care support">
      <p className="mb-5 text-sm text-slate-500">
        Reach our support team for appointment help, clinic guidance, or booking assistance.
      </p>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Phone</p>
              <p className="mt-1 text-sm text-slate-600">+91 98765 43210</p>
              <p className="text-xs text-slate-500">Available every day, 8:00 AM to 8:00 PM</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-600">support@medibook.com</p>
              <p className="text-xs text-slate-500">Write to us for booking or doctor assistance</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Address</p>
              <p className="mt-1 text-sm text-slate-600">MediBook Care Desk, Road No. 12, Banjara Hills, Hyderabad</p>
              <p className="text-xs text-slate-500">Mon to Sat, 9:00 AM to 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
