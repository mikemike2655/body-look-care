import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Truck, Eye, Package, MapPin, FileText, X, Save, Search } from 'lucide-react';

const STATUS = { pending: 'En attente', confirmed: 'Confirmée', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée' };
const STATUS_COLORS = { pending: 'bg-amber-500/10 text-amber-400', confirmed: 'bg-blue-500/10 text-blue-400', shipped: 'bg-purple-500/10 text-purple-400', delivered: 'bg-emerald-500/10 text-emerald-400', cancelled: 'bg-red-500/10 text-red-400' };
const CARRIERS = ['Colissimo', 'Chronopost', 'Mondial Relay', 'UPS', 'DHL', 'La Poste', 'Autre'];

export default function AdminOrders() {
  const { authFetch } = useAdmin();
  const [orders, setOrders] = useState([]);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const load = () => authFetch('/api/admin/orders').then(r => r?.json()).then(d => d && setOrders(d));
  useEffect(() => { load(); }, []);

  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search && !o.id?.includes(search) && !o.customer_name?.toLowerCase().includes(search.toLowerCase()) && !(o.customer_email || o.email || '').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const updateOrder = async (orderId, updates) => {
    await authFetch(`/api/admin/orders/${orderId}`, { method: 'PUT', body: JSON.stringify(updates) });
    load();
    if (detail?.id === orderId) setDetail(prev => ({ ...prev, ...updates }));
  };

  if (detail) return (
    <div data-testid="admin-order-detail">
      <button onClick={() => setDetail(null)} className="text-gray-400 text-sm mb-4 hover:text-white">&larr; Retour aux commandes</button>
      <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-bold">Commande #{detail.id?.slice(0, 8)}</h2>
            <p className="text-gray-500 text-sm">{detail.created_at?.slice(0, 16)?.replace('T', ' ')}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[detail.status] || STATUS_COLORS.pending}`}>{STATUS[detail.status] || detail.status}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><Eye className="w-4 h-4" /> Client</h3>
            <p className="text-white">{detail.customer_name || 'N/A'}</p>
            <p className="text-gray-400 text-sm">{detail.customer_email || detail.email || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Statut</h3>
            <select value={detail.status || 'pending'} onChange={e => updateOrder(detail.id, { status: e.target.value })}
              className="bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm w-full" data-testid="order-status-select">
              {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        {/* Adresse de livraison */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4" /> Adresse de livraison</h3>
          {typeof detail.shipping_address === 'object' && detail.shipping_address ? (
            <div className="bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm space-y-1" data-testid="order-shipping-address">
              <p>{detail.shipping_address.first_name} {detail.shipping_address.last_name}</p>
              <p className="text-gray-400">{detail.shipping_address.address}</p>
              <p className="text-gray-400">{detail.shipping_address.postal_code} {detail.shipping_address.city}</p>
              <p className="text-gray-400">{detail.shipping_address.country}</p>
            </div>
          ) : (
            <textarea value={detail.shipping_address_display || detail.shipping_address || ''} placeholder="Adresse complète de livraison..."
              onChange={e => setDetail(prev => ({ ...prev, shipping_address: e.target.value }))}
              onBlur={() => updateOrder(detail.id, { shipping_address: detail.shipping_address })}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
              rows={3} data-testid="order-shipping-address" />
          )}
        </div>

        {/* Suivi livraison */}
        <div className="mb-6 p-4 bg-[#0f1117] rounded-lg border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><Truck className="w-4 h-4" /> Suivi de livraison</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Transporteur</label>
              <select value={detail.shipping_carrier || ''} onChange={e => { setDetail(prev => ({...prev, shipping_carrier: e.target.value})); updateOrder(detail.id, {shipping_carrier: e.target.value}); }}
                className="bg-[#1a1d27] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm w-full" data-testid="order-carrier">
                <option value="">Sélectionner...</option>
                {CARRIERS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">N° de suivi</label>
              <input value={detail.tracking_number || ''} placeholder="Ex: 6A12345678901"
                onChange={e => setDetail(prev => ({...prev, tracking_number: e.target.value}))}
                onBlur={() => updateOrder(detail.id, {tracking_number: detail.tracking_number})}
                className="bg-[#1a1d27] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm w-full focus:border-emerald-500 focus:outline-none" data-testid="order-tracking" />
            </div>
          </div>
        </div>

        {/* Notes internes */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><FileText className="w-4 h-4" /> Notes internes</h3>
          <textarea value={detail.notes || ''} placeholder="Notes visibles uniquement par l'admin..."
            onChange={e => setDetail(prev => ({...prev, notes: e.target.value}))}
            onBlur={() => updateOrder(detail.id, {notes: detail.notes})}
            className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
            rows={3} data-testid="order-notes" />
        </div>

        {/* Articles */}
        {detail.items && detail.items.length > 0 && (
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><Package className="w-4 h-4" /> Articles</h3>
            {detail.items.map((item, i) => (
              <div key={i} className="flex justify-between py-2 text-sm border-b border-gray-800 last:border-0">
                <span className="text-white">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                <span className="text-white font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 text-sm font-bold">
              <span className="text-gray-400">Total</span>
              <span className="text-emerald-400">{(detail.total || 0).toFixed(2)} €</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div data-testid="admin-orders">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold">Commandes ({orders.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
              className="bg-[#1a1d27] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-white text-sm w-48 focus:border-emerald-500 focus:outline-none" data-testid="orders-search" />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="bg-[#1a1d27] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" data-testid="orders-filter">
            <option value="all">Tous</option>
            {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-12 text-center">
          <Truck className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500">Aucune commande</p>
        </div>
      ) : (
        <div className="bg-[#1a1d27] rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-800 text-gray-500 text-xs uppercase">
              <th className="px-4 py-3 text-left">N°</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Statut</th>
              <th className="px-4 py-3 text-left">Suivi</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3"></th>
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-800/30 cursor-pointer" onClick={() => setDetail(o)}>
                  <td className="px-4 py-3 text-white font-mono text-xs">#{o.id?.slice(0, 8)}</td>
                  <td className="px-4 py-3"><span className="text-white">{o.customer_name || 'N/A'}</span><br/><span className="text-gray-500 text-xs">{o.customer_email || o.email}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[o.status] || STATUS_COLORS.pending}`}>{STATUS[o.status] || 'En attente'}</span></td>
                  <td className="px-4 py-3 text-xs">{o.tracking_number ? <span className="text-emerald-400 flex items-center gap-1"><Truck className="w-3 h-3" />{o.tracking_number.slice(0,12)}</span> : <span className="text-gray-600">—</span>}</td>
                  <td className="px-4 py-3 text-right text-white font-medium">{(o.total || 0).toFixed(2)} €</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{o.created_at?.slice(0, 10)}</td>
                  <td className="px-4 py-3"><Eye className="w-4 h-4 text-gray-500 hover:text-white" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
