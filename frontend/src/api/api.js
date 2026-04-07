import axios from 'axios';
import {
  demoAppointments,
  demoDoctors,
  demoNotifications,
  demoSlots,
  demoSpecialties,
  STORAGE_KEYS,
} from '../utils/constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  withCredentials: true,
});

const useMock = String(import.meta.env.VITE_USE_MOCK).toLowerCase() === 'true';

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const getStored = (key, fallback) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

const setStored = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const mockKeys = {
  users: 'mock-users',
  appointments: 'mock-appointments',
  notifications: 'mock-notifications',
  slots: 'mock-slots',
  doctors: 'mock-doctors',
};

const initializeMockStore = () => {
  if (!localStorage.getItem(mockKeys.users)) {
    setStored(mockKeys.users, [
      {
        id: 999,
        name: 'Jithin',
        email: 'patient@example.com',
        password: 'Password@123',
        phone: '9876543210',
        role: 'PATIENT',
      },
      {
        id: 200,
        name: 'Dr. Priya Sharma',
        email: 'doctor@example.com',
        password: 'Password@123',
        role: 'DOCTOR',
      },
      {
        id: 300,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Password@123',
        role: 'ADMIN',
      },
    ]);
  }

  if (!localStorage.getItem(mockKeys.appointments)) setStored(mockKeys.appointments, demoAppointments);
  if (!localStorage.getItem(mockKeys.notifications)) setStored(mockKeys.notifications, demoNotifications);
  if (!localStorage.getItem(mockKeys.slots)) setStored(mockKeys.slots, demoSlots);
  if (!localStorage.getItem(mockKeys.doctors)) setStored(mockKeys.doctors, demoDoctors);
};

initializeMockStore();

const buildDoctorProfile = (doctorId) => {
  const doctor = getStored(mockKeys.doctors, demoDoctors).find((item) => item.id === Number(doctorId));
  const allSlots = getStored(mockKeys.slots, demoSlots).filter((slot) => slot.doctorId === doctor.id);
  return { ...doctor, slots: allSlots };
};

const mockApi = {
  register: async (payload) => {
    await wait();
    const users = getStored(mockKeys.users, []);
    if (users.some((user) => user.email === payload.email)) {
      throw new Error('Email already registered');
    }
    const newUser = {
      id: Date.now(),
      role: 'PATIENT',
      ...payload,
    };
    users.push(newUser);
    setStored(mockKeys.users, users);
    return { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
  },

  login: async (payload) => {
    await wait();
    const users = getStored(mockKeys.users, []);
    const user = users.find((item) => item.email === payload.email && item.password === payload.password);
    if (!user) throw new Error('Invalid email or password');
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  },

  logout: async () => {
    await wait(100);
    return { success: true };
  },

  getSpecialties: async () => {
    await wait();
    return demoSpecialties;
  },

  getDoctors: async ({ specialtyId, mode, search, sortBy }) => {
    await wait();
    let doctors = [...getStored(mockKeys.doctors, demoDoctors)];
    if (specialtyId) doctors = doctors.filter((item) => Number(item.specialtyId) === Number(specialtyId));
    if (mode) doctors = doctors.filter((item) => item.mode === mode || item.mode === 'BOTH');
    if (search) doctors = doctors.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'experience') doctors.sort((a, b) => b.experienceYears - a.experienceYears);
    if (sortBy === 'feeLowHigh') doctors.sort((a, b) => a.consultationFee - b.consultationFee);
    if (sortBy === 'rating') doctors.sort((a, b) => b.rating - a.rating);
    return doctors;
  },

  getDoctorById: async (id) => {
    await wait();
    return buildDoctorProfile(id);
  },

  getDoctorSlots: async (id, date) => {
    await wait();
    const slots = getStored(mockKeys.slots, demoSlots).filter(
      (slot) => slot.doctorId === Number(id) && (!date || slot.slotDate === date)
    );
    return slots;
  },

  createAppointment: async (payload) => {
    await wait();
    const slots = getStored(mockKeys.slots, demoSlots);
    const appointments = getStored(mockKeys.appointments, demoAppointments);
    const notifications = getStored(mockKeys.notifications, demoNotifications);
    const slotIndex = slots.findIndex((slot) => slot.id === Number(payload.slotId));

    if (slotIndex === -1 || slots[slotIndex].status !== 'AVAILABLE') {
      throw new Error('Selected slot is no longer available');
    }

    slots[slotIndex].status = 'BOOKED';
    setStored(mockKeys.slots, slots);

    const doctor = getStored(mockKeys.doctors, demoDoctors).find((item) => item.id === slots[slotIndex].doctorId);
    const appointment = {
      id: Date.now(),
      doctorId: doctor.id,
      patientId: payload.patientId,
      patientName: payload.patientName,
      doctorName: doctor.name,
      doctorPhoto: doctor.photoUrl,
      specialtyName: doctor.specialtyName,
      mode: payload.mode,
      status: 'CONFIRMED',
      appointmentDate: slots[slotIndex].slotDate,
      startTime: slots[slotIndex].startTime,
      endTime: slots[slotIndex].endTime,
      fee: doctor.consultationFee,
      reason: payload.reason,
      artifact: payload.mode === 'ONLINE' ? `${doctor.videoLink}/${Date.now()}` : doctor.clinicAddress,
    };
    appointments.unshift(appointment);
    notifications.unshift({
      id: Date.now() + 1,
      title: 'Appointment Confirmed',
      message: `Your appointment with ${doctor.name} on ${slots[slotIndex].slotDate} at ${slots[slotIndex].startTime} is confirmed.`,
      isRead: false,
      createdAt: new Date().toISOString(),
    });
    setStored(mockKeys.appointments, appointments);
    setStored(mockKeys.notifications, notifications);
    localStorage.removeItem(STORAGE_KEYS.bookingDraft);
    return appointment;
  },

  getMyAppointments: async () => {
    await wait();
    return getStored(mockKeys.appointments, demoAppointments);
  },

  cancelAppointment: async (id) => {
    await wait();
    const appointments = getStored(mockKeys.appointments, demoAppointments);
    const target = appointments.find((item) => item.id === Number(id));
    if (!target || target.status !== 'CONFIRMED') throw new Error('Only confirmed appointments can be cancelled');
    target.status = 'CANCELLED';
    setStored(mockKeys.appointments, appointments);
    return target;
  },

  getAppointmentArtifact: async (id) => {
    await wait();
    const appointments = getStored(mockKeys.appointments, demoAppointments);
    const target = appointments.find((item) => item.id === Number(id));
    return { content: target?.artifact || '' };
  },

  getDoctorTodaySchedule: async () => {
    await wait();
    return getStored(mockKeys.appointments, demoAppointments);
  },

  updateAppointmentStatus: async (id, status) => {
    await wait();
    const appointments = getStored(mockKeys.appointments, demoAppointments);
    const target = appointments.find((item) => item.id === Number(id));
    if (!target) throw new Error('Appointment not found');
    target.status = status;
    setStored(mockKeys.appointments, appointments);
    return target;
  },

  getNotifications: async () => {
    await wait();
    return getStored(mockKeys.notifications, demoNotifications);
  },

  markNotificationRead: async (id) => {
    await wait(150);
    const notifications = getStored(mockKeys.notifications, demoNotifications);
    const target = notifications.find((item) => item.id === Number(id));
    if (target) target.isRead = true;
    setStored(mockKeys.notifications, notifications);
    return target;
  },

  getAdminSummary: async () => {
    await wait();
    return demoSpecialties
      .map((specialty) => {
        const specialtyDoctors = demoDoctors.filter((doctor) => doctor.specialtyId === specialty.id);
        const specialtyAppointments = getStored(mockKeys.appointments, demoAppointments).filter((item) =>
          specialtyDoctors.some((doc) => doc.id === item.doctorId)
        );
        if (!specialtyAppointments.length) return null;
        return {
          specialtyName: specialty.name,
          onlineCount: specialtyAppointments.filter((item) => item.mode === 'ONLINE').length,
          offlineCount: specialtyAppointments.filter((item) => item.mode === 'OFFLINE').length,
          revenue: specialtyAppointments
            .filter((item) => item.status === 'COMPLETED' || item.status === 'CONFIRMED')
            .reduce((sum, item) => sum + item.fee, 0),
        };
      })
      .filter(Boolean);
  },
};

export const authApi = {
  register: async (payload) => {
    if (useMock) return mockApi.register(payload);
    const { data } = await api.post('/api/auth/register', payload);
    return data;
  },
  login: async (payload) => {
    if (useMock) return mockApi.login(payload);
    const { data } = await api.post('/api/auth/login', payload);
    return data;
  },
  logout: async () => {
    if (useMock) return mockApi.logout();
    const { data } = await api.post('/api/auth/logout');
    return data;
  },
};

export const specialtiesApi = {
  getAll: async () => {
    if (useMock) return mockApi.getSpecialties();
    const { data } = await api.get('/api/specialties');
    return data;
  },
};

export const doctorsApi = {
  getAll: async (params) => {
    if (useMock) return mockApi.getDoctors(params);
    const { data } = await api.get('/api/doctors', { params });
    return data;
  },
  getById: async (id) => {
    if (useMock) return mockApi.getDoctorById(id);
    const { data } = await api.get(`/api/doctors/${id}`);
    return data;
  },
  getSlots: async (id, date) => {
    if (useMock) return mockApi.getDoctorSlots(id, date);
    const { data } = await api.get(`/api/doctors/${id}/slots`, { params: { date } });
    return data;
  },
};

export const appointmentsApi = {
  create: async (payload) => {
    if (useMock) return mockApi.createAppointment(payload);
    const { data } = await api.post('/api/appointments', payload);
    return data;
  },
  getMine: async () => {
    if (useMock) return mockApi.getMyAppointments();
    const { data } = await api.get('/api/appointments/my');
    return data;
  },
  cancel: async (id) => {
    if (useMock) return mockApi.cancelAppointment(id);
    const { data } = await api.patch(`/api/appointments/${id}/cancel`);
    return data;
  },
  getArtifact: async (id) => {
    if (useMock) return mockApi.getAppointmentArtifact(id);
    const { data } = await api.get(`/api/appointments/${id}/artifact`);
    return data;
  },
  updateStatus: async (id, status) => {
    if (useMock) return mockApi.updateAppointmentStatus(id, status);
    const { data } = await api.patch(`/api/appointments/${id}/status`, { status });
    return data;
  },
};

export const notificationsApi = {
  getMine: async () => {
    if (useMock) return mockApi.getNotifications();
    const { data } = await api.get('/api/notifications/my');
    return data;
  },
  markRead: async (id) => {
    if (useMock) return mockApi.markNotificationRead(id);
    const { data } = await api.patch(`/api/notifications/${id}/read`);
    return data;
  },
};

export const doctorDashboardApi = {
  getTodaySchedule: async () => {
    if (useMock) return mockApi.getDoctorTodaySchedule();
    const { data } = await api.get('/api/doctor/schedule/today');
    return data;
  },
};

export const adminApi = {
  getSummary: async (date) => {
    if (useMock) return mockApi.getAdminSummary(date);
    const { data } = await api.get('/api/admin/summary', { params: { date } });
    return data;
  },
};

export default api;
