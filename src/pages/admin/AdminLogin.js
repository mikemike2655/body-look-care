import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4" data-testid="admin-login">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-xl mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Body Look Care</h1>
          <p className="text-gray-500 text-sm mt-1">Administration</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#1a1d27] rounded-2xl p-6 border border-gray-800">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4" data-testid="admin-login-error">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@bodylookcare.com"
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                data-testid="admin-login-email" required />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********"
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                data-testid="admin-login-password" required />
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
            data-testid="admin-login-submit">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
