import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, MessageSquareHeart, ShieldPlus } from 'lucide-react';
import { specialtiesApi } from '../api/api';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ContactDetailsModal from '../components/common/ContactDetailsModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SectionHeader from '../components/common/SectionHeader';
import SpecialtyCard from '../components/doctors/SpecialtyCard';
import ModeSelectorModal from '../components/doctors/ModeSelectorModal';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import { STORAGE_KEYS } from '../utils/constants';
import { getGreeting } from '../utils/helpers';

function QuickLinkCard({ icon: Icon, title, description, actionLabel, onClick }) {
  return (
    <Card className="border border-slate-200 p-6">
      <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <button className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600" onClick={onClick}>
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </button>
    </Card>
  );
}

export default function HomePage() {
  usePageTitle('Home');
  const navigate = useNavigate();
  const { user } = useAuth();
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modeModalOpen, setModeModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(Boolean(localStorage.getItem(STORAGE_KEYS.consultMode)));

  useEffect(() => {
    specialtiesApi
      .getAll()
      .then(setSpecialties)
      .finally(() => setLoading(false));
  }, []);

  const selectedMode = localStorage.getItem(STORAGE_KEYS.consultMode) || '';

  const handleModeSelect = (mode) => {
    localStorage.setItem(STORAGE_KEYS.consultMode, mode);
    setShowSpecialties(true);
    setModeModalOpen(false);
  };

  const handleSpecialtyClick = (specialty) => {
    const mode = localStorage.getItem(STORAGE_KEYS.consultMode);
    if (!mode) {
      setModeModalOpen(true);
      return;
    }
    navigate(`/doctors?specialtyId=${specialty.id}&mode=${mode}`);
  };

  const handleStartBooking = () => {
    setModeModalOpen(true);
  };

  if (loading) return <LoadingSpinner label="Loading home page..." />;

  if (user?.role === 'ADMIN') {
    return (
      <div className="space-y-8">
        <Card className="bg-hero p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Admin workspace</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {getGreeting()}, {user?.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Manage doctors, review daily summaries, and handle administrative operations from one place.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate('/admin/dashboard')}>Open admin dashboard</Button>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <QuickLinkCard
            icon={ShieldPlus}
            title="Administrative controls"
            description="Add doctors, review summary metrics, and manage the platform from the admin dashboard."
            actionLabel="Go to dashboard"
            onClick={() => navigate('/admin/dashboard')}
          />
          <QuickLinkCard
            icon={MessageSquareHeart}
            title="Support contact"
            description="View support phone number, email, and help desk address."
            actionLabel="View contact details"
            onClick={() => setContactModalOpen(true)}
          />
        </div>

        <ContactDetailsModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      </div>
    );
  }

  if (user?.role === 'DOCTOR') {
    return (
      <div className="space-y-8">
        <Card className="bg-hero p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Doctor workspace</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {getGreeting()}, {user?.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            View today’s appointments, update visit status, and manage your consultation schedule.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate('/doctor/dashboard')}>Open doctor dashboard</Button>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <QuickLinkCard
            icon={CalendarDays}
            title="Today’s schedule"
            description="Check patient appointments, timing, and visit mode from your doctor dashboard."
            actionLabel="View schedule"
            onClick={() => navigate('/doctor/dashboard')}
          />
          <QuickLinkCard
            icon={MessageSquareHeart}
            title="Support contact"
            description="Need front-desk help? Open contact details for phone, email, and address."
            actionLabel="View contact details"
            onClick={() => setContactModalOpen(true)}
          />
        </div>

        <ContactDetailsModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
        <Card className="bg-hero p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Patient dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {getGreeting()}, {user?.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            How is your day going? Start your booking flow, choose online or offline consultation, and then explore matching specialties and doctors.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={handleStartBooking}>Start booking</Button>
            <Button variant="outline" onClick={() => navigate('/my-appointments')}>
              My appointments
            </Button>
          </div>
        </Card>

        <Card className="relative overflow-hidden border border-blue-100 bg-white p-6">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-50 blur-2xl" />
          <div className="relative">
            <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">
              <MessageSquareHeart className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">Need help?</h2>
            <p className="mt-2 text-sm text-slate-500">
              Contact our care support team for booking guidance, clinic details, and consultation assistance.
            </p>
            <button
              className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-600"
              onClick={() => setContactModalOpen(true)}
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </button>
            {selectedMode ? <p className="mt-4 text-xs text-slate-500">Selected consultation mode: {selectedMode}</p> : null}
          </div>
        </Card>
      </section>

      {showSpecialties ? (
        <section>
          <SectionHeader
            eyebrow="Find doctors"
            title="Browse specialties"
            description="Choose a specialty below to see doctors based on your selected consultation mode."
            action={<Button variant="secondary" onClick={() => setModeModalOpen(true)}>Change Online / Offline</Button>}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.id} specialty={specialty} onClick={handleSpecialtyClick} />
            ))}
          </div>
        </section>
      ) : null}

      <ModeSelectorModal isOpen={modeModalOpen} onClose={() => setModeModalOpen(false)} onSelect={handleModeSelect} />
      <ContactDetailsModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}
