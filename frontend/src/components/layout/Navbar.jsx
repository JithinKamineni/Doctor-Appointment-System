import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import NotificationBell from '../notifications/NotificationBell';
import RoleBadge from './RoleBadge';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo.svg';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link to={user ? '/home' : '/login'} className="flex items-center gap-3">
          <img src={logo} alt="MediBook" className="h-10" />
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <RoleBadge role={user.role} />
              <NotificationBell />
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
