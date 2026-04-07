import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDateLong, formatTime } from '../../utils/formatters';

export default function AppointmentCard({ appointment, onCancel }) {
  return (
    <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-4">
        <img src={appointment.doctorPhoto} alt={appointment.doctorName} className="h-20 w-20 rounded-2xl object-cover" />
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{appointment.doctorName}</h3>
            <StatusBadge status={appointment.status} />
          </div>
          <p className="text-sm text-slate-500">{appointment.specialtyName}</p>
          <p className="mt-2 text-sm text-slate-600">
            {formatDateLong(appointment.appointmentDate)} · {formatTime(appointment.startTime)}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {appointment.mode} · {formatCurrency(appointment.fee)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to={`/book/${appointment.id}`} state={{ appointment }}>
          <Button variant="outline">View Details</Button>
        </Link>
        {appointment.status === 'CONFIRMED' ? (
          <Button variant="danger" onClick={() => onCancel(appointment.id)}>
            Cancel
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
