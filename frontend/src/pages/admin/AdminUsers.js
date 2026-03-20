import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Users, Mail, ShoppingCart, Pencil, Trash2, X, Save, Eye, ArrowLeft, Phone, MapPin, Calendar } from 'lucide-react';

export default function AdminUsers() {
  const { authFetch } = useAdmin();
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');

  const load = () => authFetch('/api/admin/users').then(r => r?.json()).then(d => d && setUsers(d));
  useEffect(() => { load(); }, []);

  const viewProfile = async (user) => {
    setProfile(user);
    const res = await authFetch(`/api/admin/users/${user.id}/orders`);
    const data = await res?.json();
    if (data) setUserOrders(data.orders || []);
  };

  const saveEdit = async () => {
    await authFetch(`/api/admin/users/${editing.id}`, { method: 'PUT', body: JSON.stringify(editing) });
    setEditing(null);
    load();
    if (profile?.id === editing.id) setProfile(editing);
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Supprimer ce client et toutes ses données ?')) return;
    await authFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    setProfile(null);
    load();
  };

  const filtered = users.filter(u =>
    !search || u.first_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.last_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Editing form
  if (editing) return (
    <div data-testid="admin-user-edit">
      <button onClick={() => setEditing(null)} className="text-gray-400 text-sm mb-4 hover:text-white flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Retour</button>
      <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-bold mb-6">Modifier le profil</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Prénom', key: 'first_name' },
            { label: 'Nom', key: 'last_name' },
            { label: 'Email', key: 'email' },
            { label: 'Téléphone', key: 'phone' },
            { label: 'Adresse', key: 'address' },
            { label: 'Ville', key: 'city' },
          ].map(f => (
            <div key={f.key}>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">{f.label}</label>
              <input value={editing[f.key] || ''} onChange={e => setEditing({...editing, [f.key]: e.target.value})}
                className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none" />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={saveEdit} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center gap-2" data-testid="save-user-btn"><Save className="w-4 h-4" /> Enregistrer</button>
          <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm">Annuler</button>
        </div>
      </div>
    </div>
  );

  // Profile view
  if (profile) return (
    <div data-testid="admin-user-profile">
      <button onClick={() => setProfile(null)} className="text-gray-400 text-sm mb-4 hover:text-white flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Retour</button>
      <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xl font-bold">
              {profile.first_name?.[0]}{profile.last_name?.[0]}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{profile.first_name} {profile.last_name}</h2>
              <p className="text-gray-400 text-sm flex items-center gap-1"><Mail className="w-3 h-3" /> {profile.email}</p>
              {profile.phone && <p className="text-gray-500 text-xs flex items-center gap-1"><Phone className="w-3 h-3" /> {profile.phone}</p>}
              {profile.address && <p className="text-gray-500 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" /> {profile.address} {profile.city}</p>}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditing(profile)} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg" data-testid="edit-user-btn"><Pencil className="w-4 h-4 text-gray-300" /></button>
            <button onClick={() => deleteUser(profile.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg" data-testid="delete-user-btn"><Trash2 className="w-4 h-4 text-red-400" /></button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0f1117] rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white">{userOrders.length}</p>
            <p className="text-gray-500 text-xs">Commandes</p>
          </div>
          <div className="bg-[#0f1117] rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-emerald-400">{userOrders.reduce((s, o) => s + (o.total || 0), 0).toFixed(2)} €</p>
            <p className="text-gray-500 text-xs">Total dépensé</p>
          </div>
          <div className="bg-[#0f1117] rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-white flex items-center justify-center gap-1"><Calendar className="w-4 h-4 text-gray-500" /> {profile.created_at?.slice(0, 10)}</p>
            <p className="text-gray-500 text-xs">Inscrit le</p>
          </div>
        </div>
      </div>

      {/* Historique commandes */}
      <div className="bg-[#1a1d27] rounded-xl border border-gray-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800"><h3 className="font-semibold text-sm flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Historique des commandes</h3></div>
        {userOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">Aucune commande pour ce client</div>
        ) : (
          <div className="divide-y divide-gray-800">
            {userOrders.map(o => (
              <div key={o.id} className="px-4 py-3 flex items-center justify-between text-sm">
                <div>
                  <span className="text-white font-mono text-xs">#{o.id?.slice(0, 8)}</span>
                  <span className="text-gray-500 ml-2">{o.created_at?.slice(0, 10)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400' : o.status === 'cancelled' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>{o.status || 'pending'}</span>
                  <span className="text-white font-medium">{(o.total || 0).toFixed(2)} €</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div data-testid="admin-users">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Clients ({users.length})</h1>
        <div className="relative">
          <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un client..."
            className="bg-[#1a1d27] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-white text-sm w-56 focus:border-emerald-500 focus:outline-none" data-testid="users-search" />
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-12 text-center">
          <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500">Aucun client inscrit</p>
        </div>
      ) : (
        <div className="bg-[#1a1d27] rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-800 text-gray-500 text-xs uppercase">
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Inscrit le</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((u, i) => (
                <tr key={i} className="hover:bg-gray-800/30">
                  <td className="px-4 py-3 text-white font-medium">{u.first_name} {u.last_name}</td>
                  <td className="px-4 py-3 text-gray-400 flex items-center gap-2"><Mail className="w-3 h-3" /> {u.email}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.created_at?.slice(0, 10)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => viewProfile(u)} className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded" data-testid={`view-user-${i}`}><Eye className="w-3.5 h-3.5 text-gray-300" /></button>
                    <button onClick={() => setEditing(u)} className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded"><Pencil className="w-3.5 h-3.5 text-gray-300" /></button>
                    <button onClick={() => deleteUser(u.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
