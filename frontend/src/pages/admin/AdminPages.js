import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { FileText, Pencil, Save, X, Plus, Eye, EyeOff, ChevronUp, ChevronDown, Trash2, GripVertical, Type, Image, LayoutGrid, BarChart3, MousePointerClick, HelpCircle, AlignLeft, Monitor, Wand2 } from 'lucide-react';
import '../../styles/grapesjs-dark.css';

const PageEditor = lazy(() => import('./PageEditor'));

const SECTION_TYPES = [
  { type: 'hero', label: 'Hero / Bannière', icon: Monitor, color: 'emerald' },
  { type: 'richtext', label: 'Texte riche', icon: AlignLeft, color: 'blue' },
  { type: 'image_text', label: 'Image + Texte', icon: Image, color: 'purple' },
  { type: 'features', label: 'Grille de fonctionnalités', icon: LayoutGrid, color: 'amber' },
  { type: 'stats', label: 'Statistiques', icon: BarChart3, color: 'cyan' },
  { type: 'cta', label: 'Appel à l\'action', icon: MousePointerClick, color: 'orange' },
  { type: 'faq', label: 'FAQ', icon: HelpCircle, color: 'pink' },
];

const SECTION_DEFAULTS = {
  hero: { title: '', subtitle: '', description: '', bg: 'cream' },
  richtext: { title: '', content: '' },
  image_text: { title: '', content: '', image_url: '', image_position: 'right' },
  features: { title: '', subtitle: '', items: [{ icon: '', title: '', description: '' }] },
  stats: { title: '', items: [{ value: '', label: '' }] },
  cta: { title: '', description: '', button_text: 'Découvrir', button_link: '/boutique', bg: 'forest' },
  faq: { title: 'Questions fréquentes', items: [{ question: '', answer: '' }] },
};

const TYPE_COLORS = {
  hero: 'border-emerald-500/30 bg-emerald-500/5',
  richtext: 'border-blue-500/30 bg-blue-500/5',
  image_text: 'border-purple-500/30 bg-purple-500/5',
  features: 'border-amber-500/30 bg-amber-500/5',
  stats: 'border-cyan-500/30 bg-cyan-500/5',
  cta: 'border-orange-500/30 bg-orange-500/5',
  faq: 'border-pink-500/30 bg-pink-500/5',
};

const TYPE_BADGES = {
  hero: 'bg-emerald-500/20 text-emerald-400',
  richtext: 'bg-blue-500/20 text-blue-400',
  image_text: 'bg-purple-500/20 text-purple-400',
  features: 'bg-amber-500/20 text-amber-400',
  stats: 'bg-cyan-500/20 text-cyan-400',
  cta: 'bg-orange-500/20 text-orange-400',
  faq: 'bg-pink-500/20 text-pink-400',
};

export default function AdminPages() {
  const { authFetch } = useAdmin();
  const [pages, setPages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(false);
  const [addingSectionIdx, setAddingSectionIdx] = useState(null);
  const [visualEditor, setVisualEditor] = useState(null);

  const load = () => authFetch('/api/admin/pages').then(r => r?.json()).then(d => d && setPages(d));
  useEffect(() => { load(); }, []);

  const save = async () => {
    const method = pages.find(p => p.id === editing.id) ? 'PUT' : 'POST';
    const url = method === 'PUT' ? `/api/admin/pages/${editing.id}` : '/api/admin/pages';
    await authFetch(url, { method, body: JSON.stringify(editing) });
    setEditing(null);
    load();
  };

  const updateSection = (idx, data) => {
    const sections = [...(editing.sections || [])];
    sections[idx] = { ...sections[idx], data: { ...sections[idx].data, ...data } };
    setEditing({ ...editing, sections });
  };

  const addSection = (type) => {
    const sections = [...(editing.sections || [])];
    const insertAt = addingSectionIdx !== null ? addingSectionIdx + 1 : sections.length;
    sections.splice(insertAt, 0, { type, data: { ...SECTION_DEFAULTS[type] } });
    setEditing({ ...editing, sections });
    setAddingSectionIdx(null);
  };

  const removeSection = (idx) => {
    const sections = (editing.sections || []).filter((_, i) => i !== idx);
    setEditing({ ...editing, sections });
  };

  const moveSection = (idx, dir) => {
    const sections = [...(editing.sections || [])];
    const target = idx + dir;
    if (target < 0 || target >= sections.length) return;
    [sections[idx], sections[target]] = [sections[target], sections[idx]];
    setEditing({ ...editing, sections });
  };

  // ====================== VISUAL EDITOR ======================
  if (visualEditor) return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#0f1117] text-gray-500">Chargement de l'éditeur visuel...</div>}>
      <PageEditor page={visualEditor} onSave={() => { setVisualEditor(null); load(); }} onBack={() => setVisualEditor(null)} />
    </Suspense>
  );

  // ====================== EDITOR VIEW ======================
  if (editing) return (
    <div data-testid="admin-page-edit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => { setEditing(null); setPreview(false); }} className="text-gray-400 hover:text-white" data-testid="admin-page-back">
            <X className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{editing.title || 'Nouvelle page'}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setVisualEditor(editing); setEditing(null); }}
            className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            data-testid="admin-page-visual-editor">
            <Wand2 className="w-4 h-4" /> Éditeur visuel
          </button>
          <button onClick={() => setPreview(!preview)}
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${preview ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:text-white'}`}
            data-testid="admin-page-preview-toggle">
            <Eye className="w-4 h-4" /> {preview ? 'Édition' : 'Aperçu'}
          </button>
          <button onClick={save}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            data-testid="admin-page-save">
            <Save className="w-4 h-4" /> Enregistrer
          </button>
        </div>
      </div>

      {preview ? (
        <PagePreview page={editing} />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main - Sections */}
          <div className="lg:col-span-2 space-y-3">
            {/* Page Info */}
            <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Titre" value={editing.title} onChange={v => setEditing({ ...editing, title: v })} testId="page-title" />
                <Field label="Slug (URL)" value={editing.slug} onChange={v => setEditing({ ...editing, slug: v })} testId="page-slug" />
              </div>
            </div>

            {/* Sections */}
            {(editing.sections || []).map((section, idx) => (
              <div key={idx} className={`rounded-xl border p-4 transition-colors ${TYPE_COLORS[section.type] || 'border-gray-800 bg-[#1a1d27]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-600" />
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${TYPE_BADGES[section.type] || 'bg-gray-700 text-gray-300'}`}>
                      {SECTION_TYPES.find(t => t.type === section.type)?.label || section.type}
                    </span>
                    {section.data?.title && <span className="text-sm text-gray-400 truncate max-w-[200px]">{section.data.title}</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-20" data-testid={`section-up-${idx}`}><ChevronUp className="w-4 h-4" /></button>
                    <button onClick={() => moveSection(idx, 1)} disabled={idx === (editing.sections || []).length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-20" data-testid={`section-down-${idx}`}><ChevronDown className="w-4 h-4" /></button>
                    <button onClick={() => removeSection(idx)} className="p-1 text-gray-500 hover:text-red-400" data-testid={`section-delete-${idx}`}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <SectionEditor type={section.type} data={section.data || {}} onChange={d => updateSection(idx, d)} />
              </div>
            ))}

            {/* Add section */}
            {addingSectionIdx === null ? (
              <button onClick={() => setAddingSectionIdx((editing.sections || []).length - 1)}
                className="w-full border-2 border-dashed border-gray-700 hover:border-emerald-500/50 rounded-xl py-4 text-gray-500 hover:text-emerald-400 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                data-testid="admin-add-section">
                <Plus className="w-4 h-4" /> Ajouter une section
              </button>
            ) : (
              <SectionPicker onSelect={addSection} onCancel={() => setAddingSectionIdx(null)} />
            )}
          </div>

          {/* Sidebar - SEO */}
          <div className="space-y-4">
            <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4 space-y-3">
              <h3 className="font-semibold text-sm text-gray-300 flex items-center gap-2"><Type className="w-4 h-4 text-emerald-400" /> SEO</h3>
              <Field label="Meta Title" value={editing.meta_title} onChange={v => setEditing({ ...editing, meta_title: v })} testId="page-meta-title" />
              <Field label="Meta Description" value={editing.meta_description} onChange={v => setEditing({ ...editing, meta_description: v })} textarea testId="page-meta-desc" />
            </div>
            <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4 space-y-3">
              <h3 className="font-semibold text-sm text-gray-300">Contenu HTML libre</h3>
              <Field label="HTML (optionnel)" value={editing.content} onChange={v => setEditing({ ...editing, content: v })} textarea rows={6} mono testId="page-html" />
            </div>
            <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4">
              <p className="text-xs text-gray-500">
                {(editing.sections || []).length} section{(editing.sections || []).length !== 1 ? 's' : ''} configurée{(editing.sections || []).length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ====================== LIST VIEW ======================
  return (
    <div data-testid="admin-pages">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Pages ({pages.length})</h1>
        <button onClick={() => setEditing({ title: '', slug: '', content: '', meta_title: '', meta_description: '', sections: [] })}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2" data-testid="admin-add-page">
          <Plus className="w-4 h-4" /> Nouvelle page
        </button>
      </div>
      <div className="bg-[#1a1d27] rounded-xl border border-gray-800 divide-y divide-gray-800">
        {pages.map(p => (
          <div key={p.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-white font-medium text-sm">{p.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">/{p.slug}</span>
                  {(p.sections || []).length > 0 && (
                    <span className="text-xs text-emerald-400/60">{p.sections.length} section{p.sections.length > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {p.active !== false ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4 text-gray-600" />}
              <button onClick={() => setVisualEditor({ ...p, sections: p.sections || [] })} className="text-gray-400 hover:text-purple-400 p-1.5 rounded-lg hover:bg-gray-800" title="Éditeur visuel" data-testid={`visual-page-${p.id}`}>
                <Wand2 className="w-4 h-4" />
              </button>
              <button onClick={() => setEditing({ ...p, sections: p.sections || [] })} className="text-gray-400 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-gray-800" data-testid={`edit-page-${p.id}`}>
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ====================== SECTION PICKER ======================
function SectionPicker({ onSelect, onCancel }) {
  return (
    <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-4" data-testid="section-picker">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold">Choisir un type de section</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {SECTION_TYPES.map(t => (
          <button key={t.type} onClick={() => onSelect(t.type)}
            className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors group"
            data-testid={`pick-section-${t.type}`}>
            <t.icon className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 transition-colors" />
            <span className="text-xs text-gray-400 group-hover:text-white text-center">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ====================== SECTION EDITORS ======================
function SectionEditor({ type, data, onChange }) {
  switch (type) {
    case 'hero': return <HeroEditor data={data} onChange={onChange} />;
    case 'richtext': return <RichTextEditor data={data} onChange={onChange} />;
    case 'image_text': return <ImageTextEditor data={data} onChange={onChange} />;
    case 'features': return <FeaturesEditor data={data} onChange={onChange} />;
    case 'stats': return <StatsEditor data={data} onChange={onChange} />;
    case 'cta': return <CTAEditor data={data} onChange={onChange} />;
    case 'faq': return <FAQEditor data={data} onChange={onChange} />;
    default: return <p className="text-gray-500 text-sm">Type inconnu: {type}</p>;
  }
}

function HeroEditor({ data, onChange }) {
  return (
    <div className="space-y-3">
      <Field label="Titre" value={data.title} onChange={v => onChange({ title: v })} testId="hero-title" />
      <Field label="Sous-titre" value={data.subtitle} onChange={v => onChange({ subtitle: v })} testId="hero-subtitle" />
      <Field label="Description" value={data.description} onChange={v => onChange({ description: v })} textarea testId="hero-desc" />
      <div>
        <label className="block text-gray-400 text-xs font-medium mb-1.5">Fond</label>
        <div className="flex gap-2">
          {['cream', 'white', 'forest', 'dark'].map(bg => (
            <button key={bg} onClick={() => onChange({ bg })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${data.bg === bg ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
              {bg === 'cream' ? 'Crème' : bg === 'white' ? 'Blanc' : bg === 'forest' ? 'Vert' : 'Sombre'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function RichTextEditor({ data, onChange }) {
  return (
    <div className="space-y-3">
      <Field label="Titre (optionnel)" value={data.title} onChange={v => onChange({ title: v })} testId="rt-title" />
      <Field label="Contenu (HTML)" value={data.content} onChange={v => onChange({ content: v })} textarea rows={8} mono testId="rt-content" />
    </div>
  );
}

function ImageTextEditor({ data, onChange }) {
  return (
    <div className="space-y-3">
      <Field label="Titre" value={data.title} onChange={v => onChange({ title: v })} testId="it-title" />
      <Field label="Contenu" value={data.content} onChange={v => onChange({ content: v })} textarea testId="it-content" />
      <Field label="URL de l'image" value={data.image_url} onChange={v => onChange({ image_url: v })} testId="it-image" />
      {data.image_url && <img src={data.image_url} alt="" className="w-20 h-20 rounded-lg object-cover bg-gray-800" />}
      <div>
        <label className="block text-gray-400 text-xs font-medium mb-1.5">Position image</label>
        <div className="flex gap-2">
          {['left', 'right'].map(pos => (
            <button key={pos} onClick={() => onChange({ image_position: pos })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${data.image_position === pos ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
              {pos === 'left' ? 'Gauche' : 'Droite'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturesEditor({ data, onChange }) {
  const items = data.items || [];
  const updateItem = (idx, field, val) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange({ items: updated });
  };
  return (
    <div className="space-y-3">
      <Field label="Titre" value={data.title} onChange={v => onChange({ title: v })} testId="feat-title" />
      <Field label="Sous-titre" value={data.subtitle} onChange={v => onChange({ subtitle: v })} testId="feat-subtitle" />
      <div className="space-y-2">
        <label className="block text-gray-400 text-xs font-medium">Éléments</label>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start bg-[#0f1117] rounded-lg p-2">
            <div className="flex-1 space-y-1.5">
              <input value={item.icon || ''} onChange={e => updateItem(i, 'icon', e.target.value)} placeholder="Icône (emoji)" className="w-full bg-transparent border border-gray-700 rounded px-2 py-1 text-white text-xs focus:border-emerald-500 focus:outline-none" />
              <input value={item.title || ''} onChange={e => updateItem(i, 'title', e.target.value)} placeholder="Titre" className="w-full bg-transparent border border-gray-700 rounded px-2 py-1 text-white text-xs focus:border-emerald-500 focus:outline-none" />
              <textarea value={item.description || ''} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Description" rows={2} className="w-full bg-transparent border border-gray-700 rounded px-2 py-1 text-white text-xs focus:border-emerald-500 focus:outline-none" />
            </div>
            <button onClick={() => onChange({ items: items.filter((_, j) => j !== i) })} className="text-red-400/60 hover:text-red-400 p-1"><Trash2 className="w-3 h-3" /></button>
          </div>
        ))}
        <button onClick={() => onChange({ items: [...items, { icon: '', title: '', description: '' }] })}
          className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300" data-testid="feat-add-item">
          <Plus className="w-3 h-3" /> Ajouter un élément
        </button>
      </div>
    </div>
  );
}

function StatsEditor({ data, onChange }) {
  const items = data.items || [];
  const updateItem = (idx, field, val) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange({ items: updated });
  };
  return (
    <div className="space-y-3">
      <Field label="Titre (optionnel)" value={data.title} onChange={v => onChange({ title: v })} testId="stats-title" />
      <div className="space-y-2">
        <label className="block text-gray-400 text-xs font-medium">Statistiques</label>
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center bg-[#0f1117] rounded-lg p-2">
            <input value={item.value || ''} onChange={e => updateItem(i, 'value', e.target.value)} placeholder="Valeur (ex: 5000+)" className="w-24 bg-transparent border border-gray-700 rounded px-2 py-1 text-white text-xs focus:border-emerald-500 focus:outline-none" />
            <input value={item.label || ''} onChange={e => updateItem(i, 'label', e.target.value)} placeholder="Label" className="flex-1 bg-transparent border border-gray-700 rounded px-2 py-1 text-white text-xs focus:border-emerald-500 focus:outline-none" />
            <button onClick={() => onChange({ items: items.filter((_, j) => j !== i) })} className="text-red-400/60 hover:text-red-400 p-1"><Trash2 className="w-3 h-3" /></button>
          </div>
        ))}
        <button onClick={() => onChange({ items: [...items, { value: '', label: '' }] })}
          className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300" data-testid="stats-add-item">
          <Plus className="w-3 h-3" /> Ajouter une statistique
        </button>
      </div>
    </div>
  );
}

function CTAEditor({ data, onChange }) {
  return (
    <div className="space-y-3">
      <Field label="Titre" value={data.title} onChange={v => onChange({ title: v })} testId="cta-title" />
      <Field label="Description" value={data.description} onChange={v => onChange({ description: v })} textarea testId="cta-desc" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Texte du bouton" value={data.button_text} onChange={v => onChange({ button_text: v })} testId="cta-btn-text" />
        <Field label="Lien du bouton" value={data.button_link} onChange={v => onChange({ button_link: v })} testId="cta-btn-link" />
      </div>
      <div>
        <label className="block text-gray-400 text-xs font-medium mb-1.5">Fond</label>
        <div className="flex gap-2">
          {['forest', 'cream', 'white', 'dark'].map(bg => (
            <button key={bg} onClick={() => onChange({ bg })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${data.bg === bg ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
              {bg === 'forest' ? 'Vert' : bg === 'cream' ? 'Crème' : bg === 'white' ? 'Blanc' : 'Sombre'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQEditor({ data, onChange }) {
  const items = data.items || [];
  const updateItem = (idx, field, val) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange({ items: updated });
  };
  return (
    <div className="space-y-3">
      <Field label="Titre" value={data.title} onChange={v => onChange({ title: v })} testId="faq-title" />
      <div className="space-y-2">
        <label className="block text-gray-400 text-xs font-medium">Questions / Réponses</label>
        {items.map((item, i) => (
          <div key={i} className="bg-[#0f1117] rounded-lg p-2 space-y-1.5">
            <div className="flex gap-2">
              <input value={item.question || ''} onChange={e => updateItem(i, 'question', e.target.value)} placeholder="Question"
                className="flex-1 bg-transparent border border-gray-700 rounded px-2 py-1 text-white text-xs font-medium focus:border-emerald-500 focus:outline-none" />
              <button onClick={() => onChange({ items: items.filter((_, j) => j !== i) })} className="text-red-400/60 hover:text-red-400 p-1"><Trash2 className="w-3 h-3" /></button>
            </div>
            <textarea value={item.answer || ''} onChange={e => updateItem(i, 'answer', e.target.value)} placeholder="Réponse" rows={2}
              className="w-full bg-transparent border border-gray-700 rounded px-2 py-1 text-white text-xs focus:border-emerald-500 focus:outline-none" />
          </div>
        ))}
        <button onClick={() => onChange({ items: [...items, { question: '', answer: '' }] })}
          className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300" data-testid="faq-add-item">
          <Plus className="w-3 h-3" /> Ajouter une question
        </button>
      </div>
    </div>
  );
}

// ====================== PREVIEW ======================
function PagePreview({ page }) {
  const sections = page.sections || [];

  if (sections.length === 0 && !page.content) {
    return (
      <div className="bg-[#1a1d27] rounded-xl border border-gray-800 p-16 text-center" data-testid="page-preview-empty">
        <Eye className="w-12 h-12 text-gray-700 mx-auto mb-3" />
        <p className="text-gray-500">Aucune section. Ajoutez du contenu pour voir l'aperçu.</p>
      </div>
    );
  }

  const BG_MAP = {
    cream: 'bg-amber-50 text-gray-900',
    white: 'bg-white text-gray-900',
    forest: 'bg-emerald-800 text-white',
    dark: 'bg-gray-900 text-white',
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-800" data-testid="page-preview">
      {/* Page title bar */}
      <div className="bg-gray-100 border-b px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-gray-500 ml-2">bodylookcare.com/{page.slug}</span>
      </div>

      {sections.map((section, idx) => {
        const d = section.data || {};
        const bgClass = BG_MAP[d.bg] || BG_MAP.white;

        switch (section.type) {
          case 'hero':
            return (
              <div key={idx} className={`py-16 px-8 text-center ${bgClass}`}>
                {d.subtitle && <span className="inline-block px-4 py-1 bg-emerald-700/10 text-emerald-700 text-sm font-medium rounded-full mb-4">{d.subtitle}</span>}
                <h1 className="text-3xl font-serif mb-4">{d.title || 'Titre'}</h1>
                {d.description && <p className="text-base opacity-70 max-w-xl mx-auto">{d.description}</p>}
              </div>
            );
          case 'richtext':
            return (
              <div key={idx} className="py-12 px-8 max-w-3xl mx-auto">
                {d.title && <h2 className="text-2xl font-serif text-gray-900 mb-4">{d.title}</h2>}
                <div className="prose text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: d.content || '<p>Contenu...</p>' }} />
              </div>
            );
          case 'image_text':
            return (
              <div key={idx} className="py-12 px-8 max-w-5xl mx-auto">
                <div className={`grid md:grid-cols-2 gap-8 items-center ${d.image_position === 'left' ? '' : ''}`}>
                  {d.image_position === 'left' && <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">{d.image_url && <img src={d.image_url} alt="" className="w-full h-full object-cover" />}</div>}
                  <div>
                    <h2 className="text-2xl font-serif text-gray-900 mb-3">{d.title || 'Titre'}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">{d.content}</p>
                  </div>
                  {d.image_position !== 'left' && <div className="aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden">{d.image_url && <img src={d.image_url} alt="" className="w-full h-full object-cover" />}</div>}
                </div>
              </div>
            );
          case 'features':
            return (
              <div key={idx} className="py-12 px-8 bg-amber-50">
                <div className="max-w-5xl mx-auto">
                  {d.title && <h2 className="text-2xl font-serif text-gray-900 text-center mb-2">{d.title}</h2>}
                  {d.subtitle && <p className="text-gray-500 text-center text-sm mb-8">{d.subtitle}</p>}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(d.items || []).map((item, i) => (
                      <div key={i} className="bg-white rounded-xl p-4">
                        {item.icon && <span className="text-2xl block mb-2">{item.icon}</span>}
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-xs">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          case 'stats':
            return (
              <div key={idx} className="py-12 px-8">
                <div className="max-w-4xl mx-auto">
                  {d.title && <h2 className="text-2xl font-serif text-gray-900 text-center mb-8">{d.title}</h2>}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {(d.items || []).map((item, i) => (
                      <div key={i} className="p-4 bg-amber-50 rounded-xl">
                        <span className="text-2xl font-bold text-emerald-700">{item.value}</span>
                        <p className="text-gray-500 text-xs mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          case 'cta':
            return (
              <div key={idx} className={`py-12 px-8 text-center ${bgClass}`}>
                <h2 className="text-2xl font-serif mb-3">{d.title || 'Titre'}</h2>
                {d.description && <p className="opacity-70 text-sm mb-6 max-w-xl mx-auto">{d.description}</p>}
                <span className="inline-block px-6 py-2.5 bg-white/20 rounded-full text-sm font-medium">{d.button_text || 'Bouton'}</span>
              </div>
            );
          case 'faq':
            return (
              <div key={idx} className="py-12 px-8 max-w-3xl mx-auto">
                {d.title && <h2 className="text-2xl font-serif text-gray-900 text-center mb-8">{d.title}</h2>}
                <div className="space-y-3">
                  {(d.items || []).map((item, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-4">
                      <p className="font-medium text-gray-900 text-sm">{item.question || 'Question...'}</p>
                      <p className="text-gray-500 text-xs mt-2">{item.answer || 'Réponse...'}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          default:
            return null;
        }
      })}

      {page.content && (
        <div className="py-8 px-8 max-w-3xl mx-auto border-t">
          <div className="prose text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      )}
    </div>
  );
}

// ====================== SHARED FIELD ======================
function Field({ label, value, onChange, type = 'text', textarea, rows = 3, placeholder, mono, testId }) {
  const cls = `w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none ${mono ? 'font-mono text-xs' : ''}`;
  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1.5">{label}</label>
      {textarea
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} className={cls} placeholder={placeholder} data-testid={testId} />
        : <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} data-testid={testId} />}
    </div>
  );
}
