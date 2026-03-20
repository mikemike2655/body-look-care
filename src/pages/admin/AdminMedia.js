import React, { useEffect, useState, useRef } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Upload, Image, Trash2, Copy, Check } from 'lucide-react';

export default function AdminMedia() {
  const { authFetch, token } = useAdmin();
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(null);
  const fileRef = useRef();
  const API = process.env.REACT_APP_BACKEND_URL;

  const load = () => authFetch('/api/admin/media').then(r => r?.json()).then(d => d && setMedia(d));
  useEffect(() => { load(); }, []);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    await fetch(`${API}/api/admin/media/upload`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: form });
    setUploading(false);
    load();
    fileRef.current.value = '';
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url.startsWith('http') ? url : `${API}${url}`);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div data-testid="admin-media">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Médias ({media.length})</h1>
        <label className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer transition-colors">
          <Upload className="w-4 h-4" /> {uploading ? 'Upload...' : 'Uploader'}
          <input type="file" accept="image/*" ref={fileRef} onChange={upload} className="hidden" data-testid="admin-media-upload" />
        </label>
      </div>
      {media.length === 0 ? (
        <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-16 text-center">
          <Image className="w-16 h-16 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500">Aucun média. Uploadez votre première image.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map(m => (
            <div key={m.id} className="bg-[#1a1d27] rounded-xl border border-gray-800 overflow-hidden group">
              <div className="aspect-square bg-gray-900 relative">
                <img src={m.url?.startsWith('http') ? m.url : `${API}${m.url}`} alt={m.original_name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyUrl(m.url)} className="bg-white/20 backdrop-blur p-2 rounded-lg hover:bg-white/30 transition-colors" title="Copier l'URL">
                    {copied === m.url ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-400 truncate">{m.original_name}</p>
                <p className="text-xs text-gray-600">{(m.size / 1024).toFixed(0)} Ko</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
