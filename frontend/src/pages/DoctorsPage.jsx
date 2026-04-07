import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doctorsApi, specialtiesApi } from '../api/api';
import DoctorCard from '../components/doctors/DoctorCard';
import DoctorFilters from '../components/doctors/DoctorFilters';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SectionHeader from '../components/common/SectionHeader';
import { useDebounce } from '../hooks/useDebounce';
import { usePageTitle } from '../hooks/usePageTitle';

export default function DoctorsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const specialtyId = searchParams.get('specialtyId');
  const [specialty, setSpecialty] = useState(null);
  const [mode, setMode] = useState(searchParams.get('mode') || 'ONLINE');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(search);

  usePageTitle('Doctors');

  useEffect(() => {
    specialtiesApi.getAll().then((items) => setSpecialty(items.find((item) => String(item.id) === specialtyId)));
  }, [specialtyId]);

  useEffect(() => {
    setLoading(true);
    doctorsApi
      .getAll({ specialtyId, mode, search: debouncedSearch, sortBy })
      .then(setDoctors)
      .finally(() => setLoading(false));
  }, [specialtyId, mode, debouncedSearch, sortBy]);

  useEffect(() => {
    setSearchParams({ specialtyId, mode });
  }, [mode, specialtyId, setSearchParams]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Doctors list"
        title={specialty ? `${specialty.name} specialists` : 'Available doctors'}
        description="Choose a mode, refine the list, and view doctor cards with experience, rating, consultation fee and booking access."
      />

      <DoctorFilters mode={mode} setMode={setMode} search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />

      {loading ? <LoadingSpinner label="Loading doctors..." /> : null}

      {!loading && doctors.length === 0 ? (
        <EmptyState title="No doctors found" description="Try another specialty or switch online/offline mode." />
      ) : null}

      <div className="grid gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} selectedMode={mode} />
        ))}
      </div>
    </div>
  );
}
