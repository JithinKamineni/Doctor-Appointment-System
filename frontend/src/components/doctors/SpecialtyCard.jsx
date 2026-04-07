import Card from '../common/Card';
import { specialtyIcons } from '../../utils/constants';

export default function SpecialtyCard({ specialty, onClick }) {
  const Icon = specialtyIcons[specialty.name] || specialtyIcons['General Physician'];

  return (
    <button onClick={() => onClick(specialty)} className="text-left">
      <Card className="h-full border border-transparent transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg">
        <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">{specialty.name}</h3>
        <p className="mt-2 text-sm text-slate-500">{specialty.description}</p>
      </Card>
    </button>
  );
}
