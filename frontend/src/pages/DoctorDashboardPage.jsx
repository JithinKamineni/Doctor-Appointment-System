import { useEffect, useState } from 'react';
import { appointmentsApi, doctorDashboardApi } from '../api/api';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SectionHeader from '../components/common/SectionHeader';
import StatusBadge from '../components/appointments/StatusBadge';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatTime } from '../utils/formatters';

export default function DoctorDashboardPage() {
  usePageTitle('Doctor Dashboard');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSchedule = () => {
    setLoading(true);
    doctorDashboardApi
      .getTodaySchedule()
      .then(setAppointments)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await appointmentsApi.updateStatus(id, status);
    loadSchedule();
  };

  if (loading) return <LoadingSpinner label="Loading today's schedule..." />;

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Doctor" title="Today's schedule" description="Review appointments and mark completed or no-show." />
      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-3 pr-4">Patient</th>
              <th className="pb-3 pr-4">Time</th>
              <th className="pb-3 pr-4">Mode</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3 pr-4">Update</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
                <td className="py-4 pr-4 font-medium text-slate-900">{item.patientName || 'Patient'}</td>
                <td className="py-4 pr-4 text-slate-600">{formatTime(item.startTime)}</td>
                <td className="py-4 pr-4 text-slate-600">{item.mode}</td>
                <td className="py-4 pr-4"><StatusBadge status={item.status} /></td>
                <td className="py-4 pr-4">
                  <select
                    className="input-base min-w-[180px]"
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="NO_SHOW">NO_SHOW</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
