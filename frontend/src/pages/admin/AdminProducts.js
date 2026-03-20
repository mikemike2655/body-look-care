import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Plus, Pencil, Trash2, Search, X, Save, Image } from 'lucide-react';

export default function AdminProducts() {
  const { authFetch } = useAdmin();
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');

  const load = () => authFetch('/api/admin/products').then(r => r?.json()).then(d => d && setProducts(d));
  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

  const save = async () => {
    const method = editing.id && products.find(p => p.id === editing.id) ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `/api/admin/products/${editing.id}` : '/api/admin/products';
    await authFetch(url, { method, body: JSON.stringify(editing) });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return;
    await authFetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    load();
  };

  const newProduct = () => setEditing({ name: '', slug: '', price: 0, description: '', short_description: '', images: [], benefits: [], ingredients: '', how_to_use: '', stock: 100, category_id: 'soins-corps', badge: '' });

  if (editing) return (
    <div data-testid="admin-product-edit">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">{editing.id ? 'Modifier le produit' : 'Nouveau produit'}</h1>
        <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Field label="Nom" value={editing.name} onChange={v => setEditing({...editing, name: v})} />
          <Field label="Slug (URL)" value={editing.slug} onChange={v => setEditing({...editing, slug: v})} />
          <Field label="Description courte" value={editing.short_description} onChange={v => setEditing({...editing, short_description: v})} textarea />
          <Field label="Description complète" value={editing.description} onChange={v => setEditing({...editing, description: v})} textarea rows={6} />
          <Field label="Ingrédients" value={editing.ingredients} onChange={v => setEditing({...editing, ingredients: v})} textarea />
          <Field label="Mode d'emploi" value={editing.how_to_use} onChange={v => setEditing({...editing, how_to_use: v})} textarea />
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Bénéfices (un par ligne)</label>
            <textarea value={(editing.benefits || []).join('\n')} onChange={e => setEditing({...editing, benefits: e.target.value.split('\n').filter(Boolean)})}
              rows={4} className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4 space-y-4">
            <h3 className="font-semibold text-sm text-gray-300">Tarification</h3>
            <Field label="Prix (€)" type="number" value={editing.price} onChange={v => setEditing({...editing, price: parseFloat(v) || 0})} />
            <Field label="Ancien prix (€)" type="number" value={editing.compare_at_price || ''} onChange={v => setEditing({...editing, compare_at_price: parseFloat(v) || null})} />
          </div>
          <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4 space-y-4">
            <h3 className="font-semibold text-sm text-gray-300">Organisation</h3>
            <Field label="Catégorie" value={editing.category_id} onChange={v => setEditing({...editing, category_id: v})} />
            <Field label="Stock" type="number" value={editing.stock} onChange={v => setEditing({...editing, stock: parseInt(v) || 0})} />
            <Field label="Badge" value={editing.badge || ''} onChange={v => setEditing({...editing, badge: v || null})} placeholder="new, bestseller..." />
            <Field label="Note" type="number" value={editing.rating || ''} onChange={v => setEditing({...editing, rating: parseFloat(v) || 0})} />
          </div>
          <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4 space-y-4">
            <h3 className="font-semibold text-sm text-gray-300">Images</h3>
            <div className="space-y-2">
              {(editing.images || []).map((img, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <img src={img} alt="" className="w-10 h-10 rounded object-cover bg-gray-800" />
                  <input value={img} onChange={e => { const imgs = [...editing.images]; imgs[i] = e.target.value; setEditing({...editing, images: imgs}); }}
                    className="flex-1 bg-[#0f1117] border border-gray-700 rounded px-2 py-1 text-xs text-white" />
                  <button onClick={() => { const imgs = editing.images.filter((_, j) => j !== i); setEditing({...editing, images: imgs}); }} className="text-red-400"><X className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={() => setEditing({...editing, images: [...(editing.images || []), '']})} className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300">
                <Plus className="w-3 h-3" /> Ajouter une image
              </button>
            </div>
          </div>
          <button onClick={save} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2" data-testid="admin-product-save">
            <Save className="w-4 h-4" /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div data-testid="admin-products">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Produits ({products.length})</h1>
        <button onClick={newProduct} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors" data-testid="admin-add-product">
          <Plus className="w-4 h-4" /> Nouveau
        </button>
      </div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
          className="w-full bg-[#1a1d27] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-emerald-500 focus:outline-none" />
      </div>
      <div className="bg-[#1a1d27] rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-800 text-gray-500 text-xs uppercase">
              <th className="px-4 py-3 text-left">Produit</th>
              <th className="px-4 py-3 text-left">Prix</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Cat.</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-800" /> : <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center"><Image className="w-4 h-4 text-gray-600" /></div>}
                      <div>
                        <p className="text-white font-medium">{p.name}</p>
                        <p className="text-gray-500 text-xs">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">{p.price?.toFixed(2)} €</td>
                  <td className="px-4 py-3"><span className={`${(p.stock || 0) < 10 ? 'text-red-400' : 'text-gray-300'}`}>{p.stock || 0}</span></td>
                  <td className="px-4 py-3 text-gray-400">{p.category_id}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setEditing({...p})} className="text-gray-400 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-gray-800 transition-colors" data-testid={`edit-${p.id}`}><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => remove(p.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-gray-800 transition-colors ml-1" data-testid={`delete-${p.id}`}><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', textarea, rows = 3, placeholder }) {
  const cls = "w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none";
  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1.5">{label}</label>
      {textarea
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} className={cls} placeholder={placeholder} />
        : <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />}
    </div>
  );
}
