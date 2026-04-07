import { Navigate, Outlet } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedLayout({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner label="Checking session..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/home" replace />;

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
