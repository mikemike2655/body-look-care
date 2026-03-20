import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Save, Plus, Trash2, X, Image, Link2, Type, ChevronDown, ChevronUp, Check, FileText, Home, GraduationCap, HelpCircle, Mail, Heart, Gift } from 'lucide-react';

const PAGES = [
  { id: 'homepage', label: 'Accueil', icon: Home },
  { id: 'formation', label: 'Formation', icon: GraduationCap },
  { id: 'about', label: 'Mon Histoire', icon: Heart },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'idees-cadeaux', label: 'Idées Cadeaux', icon: Gift },
];

export default function AdminContent() {
  const { authFetch } = useAdmin();
  const [activePage, setActivePage] = useState('homepage');
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const load = async (pageId) => {
    const res = await authFetch(`/api/admin/content/${pageId}`);
    const json = await res?.json();
    if (json?.data) setData(json.data);
  };

  useEffect(() => { load(activePage); }, [activePage]);

  const save = async () => {
    setSaving(true);
    await authFetch(`/api/admin/content/${activePage}`, { method: 'PUT', body: JSON.stringify({ data }) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (path, value) => {
    setData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (keys[i].match(/^\d+$/)) obj = obj[parseInt(keys[i])];
        else obj = obj[keys[i]];
      }
      const lastKey = keys[keys.length - 1];
      if (lastKey.match(/^\d+$/)) obj[parseInt(lastKey)] = value;
      else obj[lastKey] = value;
      return copy;
    });
  };

  if (!data) return <div className="text-gray-500 text-center py-20">Chargement...</div>;

  return (
    <div data-testid="admin-content">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Contenu du site</h1>
          <div className="flex gap-1 bg-[#1a1d27] rounded-lg p-1 border border-gray-800">
            {PAGES.map(p => (
              <button key={p.id} onClick={() => { setActivePage(p.id); setData(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activePage === p.id ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                data-testid={`content-tab-${p.id}`}>
                <p.icon className="w-4 h-4" /> {p.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={save} disabled={saving}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${saved ? 'bg-emerald-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
          data-testid="content-save">
          {saved ? <><Check className="w-4 h-4" /> Sauvegardé</> : saving ? 'Sauvegarde...' : <><Save className="w-4 h-4" /> Enregistrer</>}
        </button>
      </div>

      {activePage === 'homepage' && <HomepageEditor data={data} set={set} />}
      {activePage === 'formation' && <FormationEditor data={data} set={set} />}
      {activePage === 'about' && <AboutEditor data={data} set={set} />}
      {activePage === 'faq' && <FAQEditor data={data} set={set} />}
      {activePage === 'contact' && <ContactEditor data={data} set={set} />}
      {activePage === 'idees-cadeaux' && <GiftEditor data={data} set={set} />}
    </div>
  );
}

function Section({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#1a1d27] rounded-xl border border-gray-800 mb-4 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-800/30 transition-colors">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
          <span className="font-semibold text-sm text-white">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4 border-t border-gray-800 pt-4">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, textarea, rows = 2, placeholder, type = 'text' }) {
  const cls = "w-full bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none";
  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1.5">{label}</label>
      {textarea ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} className={cls} placeholder={placeholder} />
        : <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} className={cls} placeholder={placeholder} />}
    </div>
  );
}

function ImageField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-gray-400 text-xs font-medium mb-1.5">{label}</label>
      <div className="flex gap-2 items-center">
        {value && <img src={value} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-800 shrink-0" />}
        <input value={value || ''} onChange={e => onChange(e.target.value)}
          className="flex-1 bg-[#0f1117] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none" placeholder="URL de l'image" />
      </div>
    </div>
  );
}

function ListEditor({ items, onUpdate, renderItem, addLabel, newItem }) {
  return (
    <div className="space-y-2">
      {items?.map((item, i) => (
        <div key={i} className="flex gap-2 items-start bg-[#0f1117] rounded-lg p-3">
          <div className="flex-1">{renderItem(item, i)}</div>
          <button onClick={() => { const copy = [...items]; copy.splice(i, 1); onUpdate(copy); }}
            className="text-red-400/60 hover:text-red-400 p-1 shrink-0 mt-1"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>
      ))}
      <button onClick={() => onUpdate([...(items || []), newItem])}
        className="text-emerald-400 text-xs flex items-center gap-1 hover:text-emerald-300">
        <Plus className="w-3 h-3" /> {addLabel}
      </button>
    </div>
  );
}

// ============== HOMEPAGE EDITOR ==============
function HomepageEditor({ data, set }) {
  return (
    <>
      <Section title="Hero (bannière principale)" icon={Image} defaultOpen={true}>
        <Field label="Titre principal" value={data.hero?.headline} onChange={v => set('hero.headline', v)} />
        <ImageField label="Image de fond" value={data.hero?.image} onChange={v => set('hero.image', v)} />
      </Section>

      <Section title="Section Fondatrice" icon={Type}>
        <Field label="Titre" value={data.founder?.title} onChange={v => set('founder.title', v)} />
        <ImageField label="Photo Marie-Julie" value={data.founder?.image} onChange={v => set('founder.image', v)} />
        <Field label="Paragraphe 1 (HTML autorisé)" value={data.founder?.paragraph1} onChange={v => set('founder.paragraph1', v)} textarea rows={3} />
        <Field label="Paragraphe 2 (HTML autorisé)" value={data.founder?.paragraph2} onChange={v => set('founder.paragraph2', v)} textarea rows={3} />
        <Field label="Paragraphe 3 (italique)" value={data.founder?.paragraph3} onChange={v => set('founder.paragraph3', v)} textarea rows={2} />
        <Field label="Texte du bouton CTA" value={data.founder?.cta_text} onChange={v => set('founder.cta_text', v)} />
      </Section>

      <Section title="Produits vedettes (page d'accueil)" icon={FileText}>
        <ListEditor
          items={data.products}
          onUpdate={v => set('products', v)}
          addLabel="Ajouter un produit"
          newItem={{ id: '', name: '', subtitle: '', price: 0, image: '', rating: 4.5, reviews: 0, outOfStock: false }}
          renderItem={(p, i) => (
            <div className="grid grid-cols-2 gap-2">
              <Field label="Nom" value={p.name} onChange={v => { const c = [...data.products]; c[i] = {...c[i], name: v}; set('products', c); }} />
              <Field label="Sous-titre" value={p.subtitle} onChange={v => { const c = [...data.products]; c[i] = {...c[i], subtitle: v}; set('products', c); }} />
              <Field label="Prix (€)" value={p.price} type="number" onChange={v => { const c = [...data.products]; c[i] = {...c[i], price: parseFloat(v) || 0}; set('products', c); }} />
              <Field label="Badge" value={p.badge || ''} onChange={v => { const c = [...data.products]; c[i] = {...c[i], badge: v || null}; set('products', c); }} placeholder="Best-seller, Nouveau..." />
              <div className="col-span-2"><ImageField label="Image" value={p.image} onChange={v => { const c = [...data.products]; c[i] = {...c[i], image: v}; set('products', c); }} /></div>
              <div className="col-span-2 flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                  <input type="checkbox" checked={p.outOfStock || false} onChange={e => { const c = [...data.products]; c[i] = {...c[i], outOfStock: e.target.checked}; set('products', c); }}
                    className="rounded border-gray-600" /> Rupture de stock
                </label>
                <Field label="Note" value={p.rating} type="number" onChange={v => { const c = [...data.products]; c[i] = {...c[i], rating: parseFloat(v) || 0}; set('products', c); }} />
                <Field label="Nb avis" value={p.reviews} type="number" onChange={v => { const c = [...data.products]; c[i] = {...c[i], reviews: parseInt(v) || 0}; set('products', c); }} />
              </div>
            </div>
          )}
        />
      </Section>

      <Section title="Texte résultat + CTA" icon={Type}>
        <Field label="Texte (HTML autorisé)" value={data.result_text} onChange={v => set('result_text', v)} textarea rows={3} />
        <Field label="Texte du bouton" value={data.result_cta} onChange={v => set('result_cta', v)} />
      </Section>

      <Section title="Galerie Avant / Après" icon={Image}>
        <ListEditor
          items={data.gallery_before_after}
          onUpdate={v => set('gallery_before_after', v)}
          addLabel="Ajouter une photo"
          newItem={{ image: '', caption: 'Avant / Après' }}
          renderItem={(p, i) => (
            <ImageField label={`Photo ${i + 1}`} value={p.image} onChange={v => { const c = [...data.gallery_before_after]; c[i] = {...c[i], image: v}; set('gallery_before_after', c); }} />
          )}
        />
      </Section>

      <Section title="Galerie Retours Clients" icon={Image}>
        <ListEditor
          items={data.gallery_reviews}
          onUpdate={v => set('gallery_reviews', v)}
          addLabel="Ajouter un screenshot"
          newItem=""
          renderItem={(src, i) => (
            <ImageField label={`Screenshot ${i + 1}`} value={src} onChange={v => { const c = [...data.gallery_reviews]; c[i] = v; set('gallery_reviews', c); }} />
          )}
        />
      </Section>

      <Section title="Personnalités / Célébrités" icon={Link2}>
        <Field label="Titre de la section" value={data.celebrities_title} onChange={v => set('celebrities_title', v)} />
        <ListEditor
          items={data.celebrities}
          onUpdate={v => set('celebrities', v)}
          addLabel="Ajouter une personnalité"
          newItem={{ image: '', instagram: '' }}
          renderItem={(c, i) => (
            <div className="space-y-2">
              <ImageField label="Photo" value={c.image} onChange={v => { const copy = [...data.celebrities]; copy[i] = {...copy[i], image: v}; set('celebrities', copy); }} />
              <Field label="Lien Instagram" value={c.instagram} onChange={v => { const copy = [...data.celebrities]; copy[i] = {...copy[i], instagram: v}; set('celebrities', copy); }} placeholder="https://www.instagram.com/..." />
            </div>
          )}
        />
      </Section>

      <Section title="Section Homme / Unisexe" icon={Type}>
        <Field label="Titre" value={data.unisex_title} onChange={v => set('unisex_title', v)} />
        <Field label="Texte" value={data.unisex_text} onChange={v => set('unisex_text', v)} textarea />
        <ImageField label="Image" value={data.unisex_image} onChange={v => set('unisex_image', v)} />
      </Section>
    </>
  );
}

// ============== FORMATION EDITOR ==============
function FormationEditor({ data, set }) {
  return (
    <>
      <Section title="Hero (bannière vidéo)" icon={Image} defaultOpen={true}>
        <Field label="Titre" value={data.hero_title} onChange={v => set('hero_title', v)} />
        <Field label="Sous-titre" value={data.hero_subtitle} onChange={v => set('hero_subtitle', v)} />
        <Field label="Badge" value={data.hero_badge} onChange={v => set('hero_badge', v)} />
        <Field label="URL Vidéo" value={data.hero_video} onChange={v => set('hero_video', v)} />
      </Section>

      <Section title="Introduction Marie-Julie" icon={Type}>
        <Field label="Titre" value={data.intro_title} onChange={v => set('intro_title', v)} />
        <ImageField label="Photo" value={data.intro_image} onChange={v => set('intro_image', v)} />
        <Field label="Paragraphe 1 (HTML)" value={data.intro_p1} onChange={v => set('intro_p1', v)} textarea />
        <Field label="Paragraphe 2" value={data.intro_p2} onChange={v => set('intro_p2', v)} textarea />
        <Field label="Paragraphe 3 (italique)" value={data.intro_p3} onChange={v => set('intro_p3', v)} textarea />
      </Section>

      <Section title="Objectifs de la formation" icon={FileText}>
        <ListEditor
          items={data.objectifs}
          onUpdate={v => set('objectifs', v)}
          addLabel="Ajouter un objectif"
          newItem=""
          renderItem={(obj, i) => (
            <Field label={`Objectif ${i + 1}`} value={obj} onChange={v => { const c = [...data.objectifs]; c[i] = v; set('objectifs', c); }} />
          )}
        />
      </Section>

      <Section title="Conditions d'éligibilité" icon={Type}>
        <Field label="Public éligible" value={data.condition_public} onChange={v => set('condition_public', v)} textarea rows={3} />
        <Field label="Nombre de participants" value={data.condition_participants} onChange={v => set('condition_participants', v)} textarea rows={2} />
        <Field label="Certification" value={data.condition_certificat} onChange={v => set('condition_certificat', v)} textarea rows={3} />
      </Section>

      <Section title="Photos diplômées" icon={Image}>
        <ListEditor
          items={data.graduates}
          onUpdate={v => set('graduates', v)}
          addLabel="Ajouter une photo"
          newItem=""
          renderItem={(src, i) => (
            <ImageField label={`Photo ${i + 1}`} value={src} onChange={v => { const c = [...data.graduates]; c[i] = v; set('graduates', c); }} />
          )}
        />
      </Section>

      <Section title="Tarifs & Informations" icon={Type}>
        <Field label="Tarif" value={data.tarif} onChange={v => set('tarif', v)} />
        <Field label="Durée" value={data.duree} onChange={v => set('duree', v)} />
        <Field label="Acompte" value={data.acompte} onChange={v => set('acompte', v)} />
        <Field label="Détail acompte" value={data.acompte_detail} onChange={v => set('acompte_detail', v)} />
      </Section>

      <Section title="Lieux de formation" icon={Type}>
        <ListEditor
          items={data.lieux}
          onUpdate={v => set('lieux', v)}
          addLabel="Ajouter un lieu"
          newItem=""
          renderItem={(lieu, i) => (
            <Field label={`Lieu ${i + 1}`} value={lieu} onChange={v => { const c = [...data.lieux]; c[i] = v; set('lieux', c); }} />
          )}
        />
      </Section>
    </>
  );
}


// ============== ABOUT EDITOR ==============
function AboutEditor({ data, set }) {
  return (
    <>
      <Section title="Hero" icon={Type} defaultOpen={true}>
        <Field label="Titre" value={data.hero_title} onChange={v => set('hero_title', v)} />
        <Field label="Sous-titre" value={data.hero_subtitle} onChange={v => set('hero_subtitle', v)} textarea />
      </Section>
      <Section title="Histoire de Marie-Julie" icon={Type}>
        <ImageField label="Photo fondatrice" value={data.founder_image} onChange={v => set('founder_image', v)} />
        <Field label="Citation principale" value={data.founder_quote} onChange={v => set('founder_quote', v)} />
        <ListEditor
          items={data.story_paragraphs}
          onUpdate={v => set('story_paragraphs', v)}
          addLabel="Ajouter un paragraphe"
          newItem=""
          renderItem={(p, i) => (
            <Field label={`Paragraphe ${i + 1} (HTML autorisé)`} value={p} onChange={v => { const c = [...data.story_paragraphs]; c[i] = v; set('story_paragraphs', c); }} textarea rows={3} />
          )}
        />
      </Section>
      <Section title="Nos valeurs" icon={Type}>
        <ListEditor
          items={data.values}
          onUpdate={v => set('values', v)}
          addLabel="Ajouter une valeur"
          newItem={{ title: '', description: '' }}
          renderItem={(val, i) => (
            <div className="space-y-2">
              <Field label="Titre" value={val.title} onChange={v => { const c = [...data.values]; c[i] = {...c[i], title: v}; set('values', c); }} />
              <Field label="Description" value={val.description} onChange={v => { const c = [...data.values]; c[i] = {...c[i], description: v}; set('values', c); }} textarea rows={2} />
            </div>
          )}
        />
      </Section>
      <Section title="Statistiques" icon={Type}>
        <ListEditor
          items={data.stats}
          onUpdate={v => set('stats', v)}
          addLabel="Ajouter une stat"
          newItem={{ value: '', label: '' }}
          renderItem={(s, i) => (
            <div className="grid grid-cols-2 gap-2">
              <Field label="Valeur" value={s.value} onChange={v => { const c = [...data.stats]; c[i] = {...c[i], value: v}; set('stats', c); }} placeholder="5 000+" />
              <Field label="Label" value={s.label} onChange={v => { const c = [...data.stats]; c[i] = {...c[i], label: v}; set('stats', c); }} placeholder="Femmes accompagnées" />
            </div>
          )}
        />
      </Section>
    </>
  );
}

// ============== FAQ EDITOR ==============
function FAQEditor({ data, set }) {
  return (
    <>
      <Section title="En-tête" icon={Type} defaultOpen={true}>
        <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
        <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} textarea />
      </Section>
      {(data.categories || []).map((cat, ci) => (
        <Section key={ci} title={`Catégorie : ${cat.name}`} icon={HelpCircle}>
          <Field label="Nom de la catégorie" value={cat.name} onChange={v => {
            const c = [...data.categories]; c[ci] = {...c[ci], name: v}; set('categories', c);
          }} />
          <ListEditor
            items={cat.questions}
            onUpdate={v => { const c = [...data.categories]; c[ci] = {...c[ci], questions: v}; set('categories', c); }}
            addLabel="Ajouter une question"
            newItem={{ q: '', a: '' }}
            renderItem={(faq, i) => (
              <div className="space-y-2">
                <Field label="Question" value={faq.q} onChange={v => {
                  const cats = [...data.categories]; const qs = [...cats[ci].questions]; qs[i] = {...qs[i], q: v}; cats[ci] = {...cats[ci], questions: qs}; set('categories', cats);
                }} />
                <Field label="Réponse" value={faq.a} onChange={v => {
                  const cats = [...data.categories]; const qs = [...cats[ci].questions]; qs[i] = {...qs[i], a: v}; cats[ci] = {...cats[ci], questions: qs}; set('categories', cats);
                }} textarea rows={3} />
              </div>
            )}
          />
        </Section>
      ))}
      <button onClick={() => set('categories', [...(data.categories || []), { id: 'new', name: 'Nouvelle catégorie', questions: [] }])}
        className="w-full border-2 border-dashed border-gray-700 hover:border-emerald-500/50 rounded-xl py-3 text-gray-500 hover:text-emerald-400 text-sm font-medium flex items-center justify-center gap-2 transition-colors">
        <Plus className="w-4 h-4" /> Ajouter une catégorie
      </button>
    </>
  );
}

// ============== CONTACT EDITOR ==============
function ContactEditor({ data, set }) {
  return (
    <>
      <Section title="En-tête" icon={Type} defaultOpen={true}>
        <Field label="Titre" value={data.title} onChange={v => set('title', v)} />
        <Field label="Sous-titre" value={data.subtitle} onChange={v => set('subtitle', v)} textarea />
      </Section>
      <Section title="Coordonnées" icon={Mail}>
        <Field label="Email" value={data.email} onChange={v => set('email', v)} />
        <Field label="Instagram" value={data.instagram} onChange={v => set('instagram', v)} />
      </Section>
      <Section title="Cabinets" icon={Type}>
        <ListEditor
          items={data.cabinets}
          onUpdate={v => set('cabinets', v)}
          addLabel="Ajouter un cabinet"
          newItem={{ city: '', description: '', hours: '' }}
          renderItem={(cab, i) => (
            <div className="space-y-2">
              <Field label="Ville" value={cab.city} onChange={v => { const c = [...data.cabinets]; c[i] = {...c[i], city: v}; set('cabinets', c); }} />
              <Field label="Description" value={cab.description} onChange={v => { const c = [...data.cabinets]; c[i] = {...c[i], description: v}; set('cabinets', c); }} />
              <Field label="Horaires" value={cab.hours} onChange={v => { const c = [...data.cabinets]; c[i] = {...c[i], hours: v}; set('cabinets', c); }} />
            </div>
          )}
        />
      </Section>
      <Section title="Note personnelle" icon={Type}>
        <Field label="Note de Marie-Julie" value={data.personal_note} onChange={v => set('personal_note', v)} textarea rows={3} />
      </Section>
    </>
  );
}

// ============== GIFT/IDEES CADEAUX EDITOR ==============
function GiftEditor({ data, set }) {
  return (
    <>
      <Section title="En-tête" icon={Type} defaultOpen={true}>
        <Field label="Titre" value={data.hero_title} onChange={v => set('hero_title', v)} />
        <Field label="Sous-titre" value={data.hero_subtitle} onChange={v => set('hero_subtitle', v)} textarea />
      </Section>
      <Section title="Coffrets cadeaux" icon={Gift}>
        <ListEditor
          items={data.gifts}
          onUpdate={v => set('gifts', v)}
          addLabel="Ajouter un coffret"
          newItem={{ title: '', description: '', price: '', image: '', ideal: '' }}
          renderItem={(g, i) => (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Titre" value={g.title} onChange={v => { const c = [...data.gifts]; c[i] = {...c[i], title: v}; set('gifts', c); }} />
                <Field label="Prix" value={g.price} onChange={v => { const c = [...data.gifts]; c[i] = {...c[i], price: v}; set('gifts', c); }} />
              </div>
              <Field label="Description" value={g.description} onChange={v => { const c = [...data.gifts]; c[i] = {...c[i], description: v}; set('gifts', c); }} textarea rows={2} />
              <ImageField label="Image" value={g.image} onChange={v => { const c = [...data.gifts]; c[i] = {...c[i], image: v}; set('gifts', c); }} />
              <div className="grid grid-cols-2 gap-2">
                <Field label="Ancien prix" value={g.originalPrice || ''} onChange={v => { const c = [...data.gifts]; c[i] = {...c[i], originalPrice: v || null}; set('gifts', c); }} placeholder="57,00" />
                <Field label="Réduction" value={g.discount || ''} onChange={v => { const c = [...data.gifts]; c[i] = {...c[i], discount: v || null}; set('gifts', c); }} placeholder="-15%" />
              </div>
              <Field label="Idéal pour..." value={g.ideal} onChange={v => { const c = [...data.gifts]; c[i] = {...c[i], ideal: v}; set('gifts', c); }} />
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input type="checkbox" checked={g.popular || false} onChange={e => { const c = [...data.gifts]; c[i] = {...c[i], popular: e.target.checked}; set('gifts', c); }} className="rounded border-gray-600" />
                Le + populaire (mise en avant)
              </label>
            </div>
          )}
        />
      </Section>
      <Section title="Coffret sur mesure" icon={Type}>
        <Field label="Titre" value={data.custom_title} onChange={v => set('custom_title', v)} />
        <Field label="Texte" value={data.custom_text} onChange={v => set('custom_text', v)} textarea />
      </Section>
    </>
  );
}
