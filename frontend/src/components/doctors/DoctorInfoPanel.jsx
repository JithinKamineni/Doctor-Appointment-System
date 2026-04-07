import { BriefcaseMedical, IndianRupee, Languages, MapPin, Video } from 'lucide-react';
import Card from '../common/Card';
import RatingStars from './RatingStars';
import { formatCurrency } from '../../utils/formatters';

export default function DoctorInfoPanel({ doctor, mode }) {
  return (
    <Card className="sticky top-24">
      <img src={doctor.photoUrl} alt={doctor.name} className="h-72 w-full rounded-2xl object-cover" />
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{doctor.name}</h1>
      <p className="mt-1 text-sm text-slate-500">{doctor.qualification}</p>
      <div className="mt-3">
        <RatingStars rating={doctor.rating} />
      </div>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <BriefcaseMedical className="h-4 w-4 text-blue-600" />
          {doctor.experienceYears} years experience
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-blue-600" />
          Consultation fee {formatCurrency(doctor.consultationFee)}
        </div>
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-blue-600" />
          {doctor.languages?.join(', ')}
        </div>
        {mode === 'ONLINE' ? (
          <div className="flex items-start gap-2 text-emerald-700">
            <Video className="mt-0.5 h-4 w-4" />
            Video consult artifact generated after booking
          </div>
        ) : (
          <div className="flex items-start gap-2 text-orange-700">
            <MapPin className="mt-0.5 h-4 w-4" />
            {doctor.clinicAddress}
          </div>
        )}
      </div>
      <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{doctor.bio}</p>
    </Card>
  );
}
