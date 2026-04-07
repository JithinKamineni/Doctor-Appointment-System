import { BriefcaseMedical, IndianRupee, MapPin, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import RatingStars from './RatingStars';
import { formatCurrency } from '../../utils/formatters';
import { MODE_COLORS } from '../../utils/constants';

export default function DoctorCard({ doctor, selectedMode }) {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex gap-4">
        <img
          src={doctor.photoUrl}
          alt={doctor.name}
          className="h-24 w-24 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${MODE_COLORS[selectedMode || doctor.mode]}`}>
              {selectedMode || doctor.mode}
            </span>
          </div>
          <p className="text-sm text-slate-500">{doctor.qualification}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1">
              <BriefcaseMedical className="h-4 w-4 text-blue-600" />
              {doctor.experienceYears} years exp
            </span>
            <span className="inline-flex items-center gap-1">
              <IndianRupee className="h-4 w-4 text-blue-600" />
              {formatCurrency(doctor.consultationFee)}
            </span>
          </div>
          <div className="mt-2">
            <RatingStars rating={doctor.rating} />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        <p>{doctor.bio}</p>
        <div className="mt-2 flex items-center gap-2">
          {selectedMode === 'ONLINE' || doctor.mode === 'ONLINE' ? (
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <Video className="h-4 w-4" />
              Online consult available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-orange-700">
              <MapPin className="h-4 w-4" />
              {doctor.clinicAddress}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Link to={`/doctors/${doctor.id}`} state={{ mode: selectedMode || doctor.mode }}>
          <Button>Book</Button>
        </Link>
      </div>
    </Card>
  );
}
