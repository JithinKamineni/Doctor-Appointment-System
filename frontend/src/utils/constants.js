import {
  Activity,
  Baby,
  Brain,
  Ear,
  Eye,
  HeartPulse,
  PersonStanding,
  ShieldPlus,
  Stethoscope,
  UserRound,
} from 'lucide-react';

export const STORAGE_KEYS = {
  auth: 'doctor-app-auth',
  bookingDraft: 'doctor-app-booking-draft',
  consultMode: 'doctor-app-consult-mode',
};

export const ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN',
};

export const MODES = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
};

export const APPOINTMENT_STATUS = {
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
};

export const STATUS_COLORS = {
  CONFIRMED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-700',
  NO_SHOW: 'bg-amber-100 text-amber-700',
};

export const MODE_COLORS = {
  ONLINE: 'bg-emerald-100 text-emerald-700',
  OFFLINE: 'bg-orange-100 text-orange-700',
};

export const specialtyIcons = {
  Cardiology: HeartPulse,
  Dermatology: ShieldPlus,
  Pediatrics: Baby,
  Orthopedics: PersonStanding,
  Gynecology: Activity,
  Neurology: Brain,
  ENT: Ear,
  Psychiatry: Brain,
  Ophthalmology: Eye,
  'General Physician': Stethoscope,
  'General Physician/Internal Medicine': UserRound,
};

export const demoSpecialties = [
  { id: 1, name: 'Cardiology', description: 'Heart and vascular care', iconUrl: '', isActive: true },
  { id: 2, name: 'Dermatology', description: 'Skin, hair and nail care', iconUrl: '', isActive: true },
  { id: 3, name: 'Pediatrics', description: 'Child health specialists', iconUrl: '', isActive: true },
  { id: 4, name: 'Orthopedics', description: 'Bones, joints and mobility', iconUrl: '', isActive: true },
  { id: 5, name: 'Gynecology', description: 'Women’s health specialists', iconUrl: '', isActive: true },
  { id: 6, name: 'Neurology', description: 'Brain and nerves care', iconUrl: '', isActive: true },
  { id: 7, name: 'ENT', description: 'Ear, nose and throat', iconUrl: '', isActive: true },
  { id: 8, name: 'Psychiatry', description: 'Mental wellness support', iconUrl: '', isActive: true },
  { id: 9, name: 'Ophthalmology', description: 'Eye and vision care', iconUrl: '', isActive: true },
  { id: 10, name: 'General Physician', description: 'Primary care and internal medicine', iconUrl: '', isActive: true },
];

export const demoDoctors = [
  {
    id: 1,
    specialtyId: 1,
    specialtyName: 'Cardiology',
    name: 'Dr. Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    experienceYears: 8,
    rating: 4.8,
    consultationFee: 800,
    mode: 'ONLINE',
    qualification: 'MBBS, MD Cardiology',
    bio: 'Experienced cardiologist focused on preventive heart care and online consultations.',
    clinicAddress: '',
    videoLink: 'meet.medibook.com/priya-sharma',
    languages: ['English', 'Hindi'],
  },
  {
    id: 2,
    specialtyId: 1,
    specialtyName: 'Cardiology',
    name: 'Dr. Raj Kumar',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    experienceYears: 12,
    rating: 4.7,
    consultationFee: 600,
    mode: 'OFFLINE',
    qualification: 'MBBS, DM Cardiology',
    bio: 'Senior cardiologist with deep experience in managing hypertension and heart rhythm issues.',
    clinicAddress: 'Apollo Heart Clinic, Banjara Hills, Hyderabad',
    videoLink: '',
    languages: ['English', 'Hindi', 'Telugu'],
  },
  {
    id: 3,
    specialtyId: 2,
    specialtyName: 'Dermatology',
    name: 'Dr. Anita Verma',
    photoUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80',
    experienceYears: 5,
    rating: 4.6,
    consultationFee: 500,
    mode: 'ONLINE',
    qualification: 'MBBS, MD Dermatology',
    bio: 'Dermatologist for acne, skin allergies and online follow-up care.',
    clinicAddress: '',
    videoLink: 'meet.medibook.com/anita-verma',
    languages: ['English', 'Hindi'],
  },
  {
    id: 4,
    specialtyId: 4,
    specialtyName: 'Orthopedics',
    name: 'Dr. Suresh Patel',
    photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    experienceYears: 15,
    rating: 4.9,
    consultationFee: 700,
    mode: 'OFFLINE',
    qualification: 'MBBS, MS Orthopedics',
    bio: 'Orthopedic surgeon handling fractures, joint pain and rehabilitation planning.',
    clinicAddress: 'Apollo Bone & Joint Centre, Jubilee Hills, Hyderabad',
    videoLink: '',
    languages: ['English', 'Hindi', 'Telugu'],
  },
  {
    id: 5,
    specialtyId: 3,
    specialtyName: 'Pediatrics',
    name: 'Dr. Meena Iyer',
    photoUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80',
    experienceYears: 6,
    rating: 4.7,
    consultationFee: 400,
    mode: 'ONLINE',
    qualification: 'MBBS, MD Pediatrics',
    bio: 'Child specialist providing online consultation for common pediatric concerns.',
    clinicAddress: '',
    videoLink: 'meet.medibook.com/meena-iyer',
    languages: ['English', 'Tamil', 'Hindi'],
  },
  {
    id: 6,
    specialtyId: 6,
    specialtyName: 'Neurology',
    name: 'Dr. Arun Nair',
    photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    experienceYears: 10,
    rating: 4.8,
    consultationFee: 900,
    mode: 'OFFLINE',
    qualification: 'MBBS, DM Neurology',
    bio: 'Neurologist for migraine, nerve pain and neuro follow-up appointments.',
    clinicAddress: 'Apollo Neuro Centre, Gachibowli, Hyderabad',
    videoLink: '',
    languages: ['English', 'Malayalam', 'Hindi'],
  },
];

const dates = (() => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const fmt = (d) => d.toISOString().slice(0, 10);
  return { today: fmt(today), tomorrow: fmt(tomorrow) };
})();

const slotTimes = [
  ['09:00', '09:30'],
  ['10:00', '10:30'],
  ['11:00', '11:30'],
  ['14:00', '14:30'],
  ['15:00', '15:30'],
  ['16:00', '16:30'],
];

export const demoSlots = demoDoctors.flatMap((doctor) =>
  [dates.today, dates.tomorrow].flatMap((slotDate) =>
    slotTimes.map(([startTime, endTime], index) => ({
      id: Number(`${doctor.id}${slotDate.replaceAll('-', '')}${index + 1}`),
      doctorId: doctor.id,
      slotDate,
      startTime,
      endTime,
      status:
        startTime === '11:00' && slotDate === dates.today
          ? 'BOOKED'
          : startTime === '15:00' && doctor.id % 2 === 0
          ? 'BOOKED'
          : 'AVAILABLE',
    }))
  )
);

export const demoAppointments = [
  {
    id: 101,
    doctorId: 1,
    patientId: 999,
    patientName: 'Jithin',
    doctorName: 'Dr. Priya Sharma',
    doctorPhoto: demoDoctors[0].photoUrl,
    specialtyName: 'Cardiology',
    mode: 'ONLINE',
    status: 'CONFIRMED',
    appointmentDate: dates.today,
    startTime: '10:00',
    endTime: '10:30',
    fee: 800,
    artifact: 'meet.medibook.com/priya-sharma/101',
  },
  {
    id: 102,
    doctorId: 4,
    patientId: 999,
    patientName: 'Jithin',
    doctorName: 'Dr. Suresh Patel',
    doctorPhoto: demoDoctors[3].photoUrl,
    specialtyName: 'Orthopedics',
    mode: 'OFFLINE',
    status: 'COMPLETED',
    appointmentDate: dates.tomorrow,
    startTime: '14:00',
    endTime: '14:30',
    fee: 700,
    artifact: 'Apollo Bone & Joint Centre, Jubilee Hills, Hyderabad',
  },
];

export const demoNotifications = [
  {
    id: 1,
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Priya Sharma on today at 10:00 is confirmed.',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Booking Reminder',
    message: 'Please be ready 10 minutes before your consultation starts.',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];
