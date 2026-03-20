import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = process.env.REACT_APP_BACKEND_URL;
const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('blc_admin_token'));
  const [loading, setLoading] = useState(true);

  const authFetch = useCallback(async (path, options = {}) => {
    const res = await fetch(`${API}${path}`, {
      ...options,
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers }
    });
    if (res.status === 401) { logout(); return null; }
    return res;
  }, [token]);

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    authFetch('/api/admin/auth/me')
      .then(r => r?.json())
      .then(data => { if (data?.role) setAdmin(data); else logout(); })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token, authFetch]);

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/admin/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Identifiants incorrects');
    const data = await res.json();
    localStorage.setItem('blc_admin_token', data.token);
    setToken(data.token);
    setAdmin(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('blc_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, token, loading, login, logout, authFetch }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
