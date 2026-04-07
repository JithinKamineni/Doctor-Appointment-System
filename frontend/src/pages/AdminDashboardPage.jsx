import { useEffect, useState } from 'react';
import { adminApi } from '../api/api';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import SectionHeader from '../components/common/SectionHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import { demoSpecialties } from '../utils/constants';
import { formatCurrency } from '../utils/formatters';

const initialForm = {
  name: '',
  specialtyId: '',
  mode: 'ONLINE',
  experienceYears: '',
  consultationFee: '',
  qualification: '',
  photoUrl: '',
  clinicAddress: '',
  videoLink: '',
};

export default function AdminDashboardPage() {
  usePageTitle('Admin Dashboard');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [isAddDoctorOpen, setIsAddDoctorOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadSummary = () => {
    setLoading(true);
    adminApi
      .getSummary(date)
      .then(setSummary)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSummary();
  }, [date]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError('');
      await adminApi.addDoctor(form);
      setIsAddDoctorOpen(false);
      setForm(initialForm);
      loadSummary();
    } catch (err) {
      setError(err.message || 'Unable to add doctor');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading admin summary..." />;

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Admin"
        title="Daily summary"
        description="View appointments and revenue grouped by specialty and mode."
        action={<Button onClick={() => setIsAddDoctorOpen(true)}>Add Doctor</Button>}
      />

      <Card className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-700">Summary date</p>
          <p className="text-xs text-slate-500">Change the date to query backend summary API.</p>
        </div>
        <input type="date" className="input-base max-w-[220px]" value={date} onChange={(e) => setDate(e.target.value)} />
      </Card>

      <Card className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-3 pr-4">Specialty</th>
              <th className="pb-3 pr-4">Online</th>
              <th className="pb-3 pr-4">Offline</th>
              <th className="pb-3 pr-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((row) => (
              <tr key={row.specialtyName} className="border-b border-slate-100 last:border-b-0">
                <td className="py-4 pr-4 font-medium text-slate-900">{row.specialtyName}</td>
                <td className="py-4 pr-4 text-slate-600">{row.onlineCount}</td>
                <td className="py-4 pr-4 text-slate-600">{row.offlineCount}</td>
                <td className="py-4 pr-4 text-slate-600">{formatCurrency(row.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isAddDoctorOpen} onClose={() => setIsAddDoctorOpen(false)} title="Add doctor">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <ErrorMessage message={error} />
          <div>
            <label className="label-base">Doctor name</label>
            <input className="input-base" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label-base">Specialty</label>
              <select className="input-base" name="specialtyId" value={form.specialtyId} onChange={handleChange} required>
                <option value="">Select specialty</option>
                {demoSpecialties.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-base">Mode</label>
              <select className="input-base" name="mode" value={form.mode} onChange={handleChange}>
                <option value="ONLINE">ONLINE</option>
                <option value="OFFLINE">OFFLINE</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label-base">Experience (years)</label>
              <input className="input-base" name="experienceYears" type="number" min="1" value={form.experienceYears} onChange={handleChange} required />
            </div>
            <div>
              <label className="label-base">Consultation fee</label>
              <input className="input-base" name="consultationFee" type="number" min="100" value={form.consultationFee} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="label-base">Qualification</label>
            <input className="input-base" name="qualification" value={form.qualification} onChange={handleChange} />
          </div>
          <div>
            <label className="label-base">Photo URL</label>
            <input className="input-base" name="photoUrl" value={form.photoUrl} onChange={handleChange} placeholder="https://..." />
          </div>
          {form.mode === 'OFFLINE' ? (
            <div>
              <label className="label-base">Clinic address</label>
              <input className="input-base" name="clinicAddress" value={form.clinicAddress} onChange={handleChange} required />
            </div>
          ) : (
            <div>
              <label className="label-base">Video link</label>
              <input className="input-base" name="videoLink" value={form.videoLink} onChange={handleChange} placeholder="meet.medibook.com/..." />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAddDoctorOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              Save doctor
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
