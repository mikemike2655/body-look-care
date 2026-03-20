import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Package, ShoppingCart, Users, Euro, Clock, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const { authFetch } = useAdmin();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    authFetch('/api/admin/dashboard').then(r => r?.json()).then(setStats);
  }, [authFetch]);

  if (!stats) return <div className="text-gray-500 text-center py-20">Chargement...</div>;

  const cards = [
    { label: 'Produits', value: stats.products, icon: Package, color: 'emerald' },
    { label: 'Commandes', value: stats.orders, icon: ShoppingCart, color: 'blue' },
    { label: 'Clients', value: stats.users, icon: Users, color: 'purple' },
    { label: 'Revenus', value: `${stats.revenue.toFixed(2)} €`, icon: Euro, color: 'amber' },
    { label: 'En attente', value: stats.pending_orders, icon: Clock, color: 'orange' },
    { label: 'Pages', value: stats.pages, icon: FileText, color: 'cyan' },
  ];

  const colors = {
    emerald: 'bg-emerald-500/10 text-emerald-400',
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    amber: 'bg-amber-500/10 text-amber-400',
    orange: 'bg-orange-500/10 text-orange-400',
    cyan: 'bg-cyan-500/10 text-cyan-400',
  };

  return (
    <div data-testid="admin-dashboard">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map(c => (
          <div key={c.label} className="bg-[#1a1d27] rounded-xl p-4 border border-gray-800" data-testid={`stat-${c.label.toLowerCase()}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{c.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[c.color]}`}>
                <c.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{c.value}</p>
          </div>
        ))}
      </div>
      {stats.recent_orders.length > 0 && (
        <div className="bg-[#1a1d27] rounded-xl border border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800"><h2 className="font-semibold text-sm">Commandes récentes</h2></div>
          <div className="divide-y divide-gray-800">
            {stats.recent_orders.map(o => (
              <div key={o.id} className="px-4 py-3 flex items-center justify-between text-sm">
                <div>
                  <span className="text-white font-medium">#{o.id?.slice(0, 8)}</span>
                  <span className="text-gray-500 ml-2">{o.customer_name || o.email || 'Client'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400' : o.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' : o.status === 'cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {o.status || 'pending'}
                  </span>
                  <span className="text-white font-medium">{(o.total || 0).toFixed(2)} €</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
