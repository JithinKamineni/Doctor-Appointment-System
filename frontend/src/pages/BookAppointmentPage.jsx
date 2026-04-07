import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { appointmentsApi } from '../api/api';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ErrorMessage from '../components/common/ErrorMessage';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import { STORAGE_KEYS } from '../utils/constants';
import { formatCurrency, formatDateLong, formatTime } from '../utils/formatters';

export default function BookAppointmentPage() {
  usePageTitle('Book Appointment');
  const location = useLocation();
  const { user } = useAuth();
  const [reason, setReason] = useState('General consultation');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const bookingDraft = useMemo(() => {
    const fromState = location.state?.appointment;
    if (fromState) return null;
    const raw = localStorage.getItem(STORAGE_KEYS.bookingDraft);
    return raw ? JSON.parse(raw) : null;
  }, [location.state]);

  useEffect(() => {
    if (location.state?.appointment) setSuccess(location.state.appointment);
  }, [location.state]);

  const handleConfirmBooking = async () => {
    if (!bookingDraft) return;
    try {
      setLoading(true);
      setError('');
      const response = await appointmentsApi.create({
        slotId: bookingDraft.slot.id,
        mode: bookingDraft.mode,
        reason,
        patientId: user.id,
        patientName: user.name,
      });
      setSuccess(response);
    } catch (err) {
      setError(err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingDraft && !success) {
    return <EmptyState title="No booking selected" description="Select a doctor slot first before opening this page." />;
  }

  const doctor = bookingDraft?.doctor;
  const slot = bookingDraft?.slot;
  const mode = bookingDraft?.mode || success?.mode;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
      <Card>
        <h1 className="text-2xl font-bold text-slate-900">Confirm your booking</h1>
        <p className="mt-2 text-sm text-slate-500">Review the appointment details and confirm.</p>

        <ErrorMessage message={error} />

        {success ? (
          <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <h2 className="text-lg font-semibold text-emerald-800">Appointment booked successfully</h2>
            <p className="mt-2 text-sm text-emerald-700">
              Your booking is confirmed. Artifact generated for this appointment:
            </p>
            <div className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-700">{success.artifact}</div>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <label className="label-base">Reason for visit</label>
              <textarea
                rows="5"
                className="input-base resize-none"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <Button className="mt-6" onClick={handleConfirmBooking} loading={loading}>
              Confirm Booking
            </Button>
          </>
        )}
      </Card>

      <Card className="h-fit">
        <h3 className="text-lg font-semibold text-slate-900">Booking summary</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div>
            <p className="text-slate-400">Doctor</p>
            <p className="font-semibold text-slate-900">{success?.doctorName || doctor?.name}</p>
          </div>
          <div>
            <p className="text-slate-400">Date & Time</p>
            <p className="font-semibold text-slate-900">
              {success
                ? `${formatDateLong(success.appointmentDate)} · ${formatTime(success.startTime)}`
                : `${formatDateLong(slot.slotDate)} · ${formatTime(slot.startTime)}`}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Mode</p>
            <p className="font-semibold text-slate-900">{mode}</p>
          </div>
          <div>
            <p className="text-slate-400">Fee</p>
            <p className="font-semibold text-slate-900">{formatCurrency(success?.fee || doctor?.consultationFee)}</p>
          </div>
          <div>
            <p className="text-slate-400">Payment note</p>
            <p className="font-semibold text-slate-900">Fee: {formatCurrency(success?.fee || doctor?.consultationFee)} / Pay at clinic or as instructed</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
