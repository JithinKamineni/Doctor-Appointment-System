export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const isSlotExpired = (slotDate, startTime) => {
  const now = new Date();
  const slotDateTime = new Date(`${slotDate}T${startTime}:00`);
  return slotDateTime < now;
};

export const getAppointmentBucket = (appointment) => {
  if (appointment.status === 'CANCELLED') return 'cancelled';
  const appointmentDateTime = new Date(`${appointment.appointmentDate}T${appointment.startTime}:00`);
  return appointmentDateTime >= new Date() ? 'upcoming' : 'past';
};
