import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { doctorsApi } from '../api/api';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DoctorInfoPanel from '../components/doctors/DoctorInfoPanel';
import SlotCard from '../components/doctors/SlotCard';
import { usePageTitle } from '../hooks/usePageTitle';
import { STORAGE_KEYS } from '../utils/constants';

export default function DoctorProfilePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const mode = location.state?.mode || localStorage.getItem(STORAGE_KEYS.consultMode) || 'ONLINE';

  usePageTitle('Doctor Profile');

  useEffect(() => {
    setLoading(true);
    Promise.all([doctorsApi.getById(id), doctorsApi.getSlots(id, selectedDate)])
      .then(([doctorRes, slotsRes]) => {
        setDoctor(doctorRes);
        setSlots(slotsRes);
      })
      .finally(() => setLoading(false));
  }, [id, selectedDate]);

  const availableCount = useMemo(() => slots.filter((slot) => slot.status === 'AVAILABLE').length, [slots]);

  const handleContinue = () => {
    if (!selectedSlot || !doctor) return;
    localStorage.setItem(
      STORAGE_KEYS.bookingDraft,
      JSON.stringify({ doctor, slot: selectedSlot, mode })
    );
    navigate(`/book/${selectedSlot.id}`);
  };

  if (loading) return <LoadingSpinner label="Loading doctor profile..." />;
  if (!doctor) return <EmptyState title="Doctor not found" description="Please return to the doctors page." />;

  return (
    <div className="grid gap-6 lg:grid-cols-[380px,1fr]">
      <DoctorInfoPanel doctor={doctor} mode={mode} />

      <div className="space-y-6">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Choose slot</h2>
              <p className="mt-1 text-sm text-slate-500">Current time passed slots are disabled. Available slots are green.</p>
            </div>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                className="input-base pl-10"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {mode === 'OFFLINE' ? (
            <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-800">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <div>
                  <p className="font-semibold">Clinic location</p>
                  <p className="mt-1">{doctor.clinicAddress}</p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
            <span>{availableCount} slots available</span>
            <span>{mode} consultation</span>
          </div>

          {slots.length === 0 ? (
            <div className="mt-5">
              <EmptyState title="No slots available" description="Try selecting another date." />
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {slots.map((slot) => (
                <SlotCard key={slot.id} slot={slot} selected={selectedSlot?.id === slot.id} onClick={setSelectedSlot} />
              ))}
            </div>
          )}
        </Card>

        <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Selected slot</h3>
            <p className="mt-1 text-sm text-slate-500">
              {selectedSlot ? `${selectedSlot.slotDate} · ${selectedSlot.startTime} - ${selectedSlot.endTime}` : 'Choose a time slot to continue'}
            </p>
          </div>
          <Button onClick={handleContinue} disabled={!selectedSlot}>
            Continue to booking
          </Button>
        </Card>
      </div>
    </div>
  );
}
