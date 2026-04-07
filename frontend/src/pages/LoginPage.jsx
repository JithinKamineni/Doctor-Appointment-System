import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';

export default function LoginPage() {
  usePageTitle('Login');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const user = await login(form);
      const redirectPath =
        user.role === 'DOCTOR' ? '/doctor/dashboard' : user.role === 'ADMIN' ? '/admin/dashboard' : '/home';
      navigate(location.state?.from?.pathname || redirectPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-hero px-4 py-10">
      <Card className="grid w-full max-w-5xl overflow-hidden p-0 md:grid-cols-2">
        <div className="bg-blue-600 p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">MediBook</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight">Welcome back to your smarter doctor booking experience.</h1>
          <p className="mt-4 text-sm text-blue-100">
            Sign in to explore specialties, view live slots, and book online or offline consultations in a polished Apollo-style interface.
          </p>
          <div className="mt-8 rounded-2xl bg-white/10 p-4 text-sm text-blue-50">
            Demo accounts: patient@example.com / Password@123 · doctor@example.com / Password@123 · admin@example.com / Password@123
          </div>
        </div>

        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Login</h2>
          <p className="mt-2 text-sm text-slate-500">Use your account to continue.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <ErrorMessage message={error} />
            <div>
              <label className="label-base">Email</label>
              <input className="input-base" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="label-base">Password</label>
              <input className="input-base" name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full" loading={loading}>
              Login
            </Button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            New user?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Create an account
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
