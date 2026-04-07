import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedLayout from '../layouts/ProtectedLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import DoctorsPage from '../pages/DoctorsPage';
import DoctorProfilePage from '../pages/DoctorProfilePage';
import BookAppointmentPage from '../pages/BookAppointmentPage';
import MyAppointmentsPage from '../pages/MyAppointmentsPage';
import DoctorDashboardPage from '../pages/DoctorDashboardPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedLayout allowedRoles={['PATIENT', 'DOCTOR', 'ADMIN']} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorProfilePage />} />
        <Route path="/book/:slotId" element={<BookAppointmentPage />} />
        <Route path="/my-appointments" element={<MyAppointmentsPage />} />
      </Route>

      <Route element={<ProtectedLayout allowedRoles={['DOCTOR']} />}>
        <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
      </Route>

      <Route element={<ProtectedLayout allowedRoles={['ADMIN']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
