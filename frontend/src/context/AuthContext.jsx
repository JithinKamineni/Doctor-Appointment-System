import { createContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/api';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.auth);
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (payload) => {
    const response = await authApi.login(payload);
    setUser(response);
    localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(response));
    return response;
  };

  const register = async (payload) => {
    return authApi.register(payload);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.auth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      setUser,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
