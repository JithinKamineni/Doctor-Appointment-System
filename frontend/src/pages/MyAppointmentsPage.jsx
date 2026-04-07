import { useEffect, useMemo, useState } from 'react';
import { appointmentsApi } from '../api/api';
import AppointmentCard from '../components/appointments/AppointmentCard';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SectionHeader from '../components/common/SectionHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { getAppointmentBucket } from '../utils/helpers';

export default function MyAppointmentsPage() {
  usePageTitle('My Appointments');
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);

  const loadAppointments = () => {
    setLoading(true);
    appointmentsApi
      .getMine()
      .then(setAppointments)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(
    () => appointments.filter((appointment) => getAppointmentBucket(appointment) === activeTab),
    [appointments, activeTab]
  );

  const handleCancel = async (appointmentId) => {
    await appointmentsApi.cancel(appointmentId);
    loadAppointments();
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Appointments"
        title="My appointments"
        description="View upcoming, past and cancelled appointments with status badges and actions."
      />

      <div className="card-base flex flex-wrap gap-2">
        {['upcoming', 'past', 'cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? <LoadingSpinner label="Loading appointments..." /> : null}
      {!loading && filteredAppointments.length === 0 ? (
        <EmptyState title="No appointments in this tab" description="Your appointment cards will appear here." />
      ) : null}

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} onCancel={handleCancel} />
        ))}
      </div>
    </div>
  );
}
