import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Save, Store, Globe, Truck, Instagram } from 'lucide-react';

export default function AdminSettings() {
  const { authFetch } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { authFetch('/api/admin/settings').then(r => r?.json()).then(setSettings); }, []);

  const save = async () => {
    await authFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(settings) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) return <div className="text-gray-500 text-center py-20">Chargement...</div>;

  const Field = ({ label, field, textarea, type = 'text' }) => (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1.5">{label}</label>
      {textarea
        ? <textarea value={settings[field] || ''} onChange={e => setSettings({...settings, [field]: e.target.value})} rows={3}
            className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none" />
        : <input type={type} value={settings[field] || ''} onChange={e => setSettings({...settings, [field]: type === 'number' ? parseFloat(e.target.value) : e.target.value})}
            className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none" />}
    </div>
  );

  return (
    <div data-testid="admin-settings">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Paramètres</h1>
        <button onClick={save} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${saved ? 'bg-emerald-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`} data-testid="admin-settings-save">
          {saved ? <><Check className="w-4 h-4" /> Sauvegardé</> : <><Save className="w-4 h-4" /> Enregistrer</>}
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Section icon={Store} title="Boutique">
          <Field label="Nom du site" field="site_name" />
          <Field label="Slogan" field="tagline" />
          <Field label="Bandeau d'annonce" field="announcement" textarea />
        </Section>
        <Section icon={Globe} title="Contact">
          <Field label="Email" field="email" />
          <Field label="Téléphone" field="phone" />
          <Field label="Adresse" field="address" />
        </Section>
        <Section icon={Instagram} title="Réseaux sociaux">
          <Field label="Instagram" field="instagram" />
          <Field label="Facebook" field="facebook" />
        </Section>
        <Section icon={Truck} title="Livraison">
          <Field label="Seuil livraison gratuite (€)" field="free_shipping_threshold" type="number" />
          <Field label="Devise" field="currency" />
        </Section>
      </div>
    </div>
  );
}

function Check(props) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}><polyline points="20 6 9 17 4 12"/></svg>; }

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-emerald-400" />
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
