import React, { useCallback, useRef, useState } from 'react';
import GjsEditor, { Canvas } from '@grapesjs/react';
import grapesjs from 'grapesjs';
import gjsBlocksBasic from 'grapesjs-blocks-basic';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import { useAdmin } from '../../contexts/AdminContext';
import { Save, ArrowLeft, Monitor, Tablet, Smartphone, Code, Eye, Layers, Palette, LayoutGrid, Settings2, Check } from 'lucide-react';

const API = process.env.REACT_APP_BACKEND_URL;

// Custom BLC blocks plugin
const blcBlocksPlugin = (editor) => {
  const bm = editor.BlockManager;

  bm.add('blc-hero', {
    label: 'Hero Bannière',
    category: 'Body Look Care',
    content: `
      <section style="padding:80px 20px;text-align:center;background:#fdf6ee;">
        <span style="display:inline-block;padding:6px 20px;background:rgba(34,85,68,0.1);color:#225544;font-size:14px;border-radius:50px;margin-bottom:16px;">Sous-titre</span>
        <h1 style="font-family:Georgia,serif;font-size:42px;color:#2d2d2d;margin-bottom:16px;">Titre principal</h1>
        <p style="font-size:18px;color:#6b6b6b;max-width:600px;margin:0 auto;">Description de la section hero. Modifiez ce texte directement.</p>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="6" y1="9" x2="18" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/></svg>',
  });

  bm.add('blc-text-section', {
    label: 'Texte Riche',
    category: 'Body Look Care',
    content: `
      <section style="padding:60px 20px;max-width:800px;margin:0 auto;">
        <h2 style="font-family:Georgia,serif;font-size:32px;color:#2d2d2d;margin-bottom:16px;">Titre de section</h2>
        <p style="font-size:16px;line-height:1.8;color:#555;">Votre contenu texte ici. Cliquez pour modifier directement. Vous pouvez ajouter du texte riche avec mise en forme.</p>
        <p style="font-size:16px;line-height:1.8;color:#555;">Deuxième paragraphe pour illustrer la mise en page.</p>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="10" x2="16" y2="10"/><line x1="4" y1="14" x2="18" y2="14"/><line x1="4" y1="18" x2="12" y2="18"/></svg>',
  });

  bm.add('blc-image-text', {
    label: 'Image + Texte',
    category: 'Body Look Care',
    content: `
      <section style="padding:60px 20px;max-width:1100px;margin:0 auto;">
        <div style="display:flex;gap:40px;align-items:center;flex-wrap:wrap;">
          <div style="flex:1;min-width:300px;">
            <img src="https://placehold.co/600x400/e8ddd3/555?text=Image" alt="" style="width:100%;border-radius:16px;object-fit:cover;"/>
          </div>
          <div style="flex:1;min-width:300px;">
            <h2 style="font-family:Georgia,serif;font-size:28px;color:#2d2d2d;margin-bottom:12px;">Titre avec image</h2>
            <p style="font-size:16px;line-height:1.7;color:#555;">Description à côté de l'image. Modifiez le texte et l'image directement dans le canvas.</p>
          </div>
        </div>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="9" height="16" rx="1"/><line x1="14" y1="8" x2="22" y2="8"/><line x1="14" y1="12" x2="20" y2="12"/><line x1="14" y1="16" x2="18" y2="16"/></svg>',
  });

  bm.add('blc-features', {
    label: 'Grille Fonctionnalités',
    category: 'Body Look Care',
    content: `
      <section style="padding:60px 20px;background:#fdf6ee;">
        <div style="max-width:1100px;margin:0 auto;text-align:center;">
          <h2 style="font-family:Georgia,serif;font-size:32px;color:#2d2d2d;margin-bottom:8px;">Nos engagements</h2>
          <p style="font-size:16px;color:#888;margin-bottom:40px;">Ce en quoi nous croyons profondément</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;">
            <div style="background:white;border-radius:16px;padding:24px;text-align:left;">
              <span style="font-size:32px;display:block;margin-bottom:12px;">🌿</span>
              <h3 style="font-size:16px;font-weight:600;color:#2d2d2d;margin-bottom:8px;">Naturel</h3>
              <p style="font-size:14px;color:#777;line-height:1.6;">Formules 100% naturelles à base de plantes.</p>
            </div>
            <div style="background:white;border-radius:16px;padding:24px;text-align:left;">
              <span style="font-size:32px;display:block;margin-bottom:12px;">🇫🇷</span>
              <h3 style="font-size:16px;font-weight:600;color:#2d2d2d;margin-bottom:8px;">Fabriqué en France</h3>
              <p style="font-size:14px;color:#777;line-height:1.6;">En Lorraine avec les Laboratoires Lehning.</p>
            </div>
            <div style="background:white;border-radius:16px;padding:24px;text-align:left;">
              <span style="font-size:32px;display:block;margin-bottom:12px;">💚</span>
              <h3 style="font-size:16px;font-weight:600;color:#2d2d2d;margin-bottom:8px;">Honnêteté</h3>
              <p style="font-size:14px;color:#777;line-height:1.6;">Pas de promesses magiques, des résultats réels.</p>
            </div>
            <div style="background:white;border-radius:16px;padding:24px;text-align:left;">
              <span style="font-size:32px;display:block;margin-bottom:12px;">🤝</span>
              <h3 style="font-size:16px;font-weight:600;color:#2d2d2d;margin-bottom:8px;">Écoute</h3>
              <p style="font-size:14px;color:#777;line-height:1.6;">Accompagnement personnalisé pour chacune.</p>
            </div>
          </div>
        </div>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>',
  });

  bm.add('blc-stats', {
    label: 'Statistiques',
    category: 'Body Look Care',
    content: `
      <section style="padding:60px 20px;">
        <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:center;">
          <div style="padding:24px;background:#fdf6ee;border-radius:16px;">
            <span style="font-size:36px;font-weight:700;color:#225544;display:block;">5 000+</span>
            <p style="font-size:14px;color:#777;margin-top:8px;">Femmes accompagnées</p>
          </div>
          <div style="padding:24px;background:#fdf6ee;border-radius:16px;">
            <span style="font-size:36px;font-weight:700;color:#225544;display:block;">4.8/5</span>
            <p style="font-size:14px;color:#777;margin-top:8px;">Note moyenne</p>
          </div>
          <div style="padding:24px;background:#fdf6ee;border-radius:16px;">
            <span style="font-size:36px;font-weight:700;color:#225544;display:block;">87%</span>
            <p style="font-size:14px;color:#777;margin-top:8px;">Recommandent</p>
          </div>
        </div>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="12" width="4" height="8"/><rect x="10" y="6" width="4" height="14"/><rect x="16" y="9" width="4" height="11"/></svg>',
  });

  bm.add('blc-cta', {
    label: 'Appel à l\'action',
    category: 'Body Look Care',
    content: `
      <section style="padding:80px 20px;background:#225544;text-align:center;color:white;">
        <h2 style="font-family:Georgia,serif;font-size:32px;margin-bottom:12px;">Prête à essayer ?</h2>
        <p style="font-size:16px;opacity:0.8;max-width:500px;margin:0 auto 24px;">Commencez par le Pack Découverte. Satisfaite ou remboursée.</p>
        <a href="/boutique" style="display:inline-block;padding:14px 32px;background:white;color:#225544;border-radius:50px;font-weight:600;text-decoration:none;font-size:15px;">Découvrir les produits</a>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 14l2-2 2 2"/><line x1="12" y1="12" x2="12" y2="16"/></svg>',
  });

  bm.add('blc-faq', {
    label: 'FAQ',
    category: 'Body Look Care',
    content: `
      <section style="padding:60px 20px;max-width:800px;margin:0 auto;">
        <h2 style="font-family:Georgia,serif;font-size:32px;color:#2d2d2d;text-align:center;margin-bottom:32px;">Questions fréquentes</h2>
        <div style="border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;margin-bottom:12px;">
          <div style="padding:16px 20px;font-weight:600;font-size:15px;color:#2d2d2d;background:#fafafa;cursor:pointer;">En combien de temps vais-je voir des résultats ?</div>
          <div style="padding:16px 20px;font-size:14px;color:#666;line-height:1.7;">Les premiers effets se ressentent dès la 1ère semaine. Pour les résultats visibles, comptez 3-4 semaines.</div>
        </div>
        <div style="border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;margin-bottom:12px;">
          <div style="padding:16px 20px;font-weight:600;font-size:15px;color:#2d2d2d;background:#fafafa;cursor:pointer;">Les produits sont-ils vraiment naturels ?</div>
          <div style="padding:16px 20px;font-size:14px;color:#666;line-height:1.7;">Oui, 100%. Nos formules sont à base de plantes naturelles. Certifiés vegan.</div>
        </div>
        <div style="border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
          <div style="padding:16px 20px;font-weight:600;font-size:15px;color:#2d2d2d;background:#fafafa;cursor:pointer;">Livraison offerte ?</div>
          <div style="padding:16px 20px;font-size:14px;color:#666;line-height:1.7;">Oui, livraison offerte en France dès 49€ d'achat.</div>
        </div>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 9a3 3 0 1 1 3 3v2"/><circle cx="12" cy="18" r="0.5" fill="currentColor"/></svg>',
  });

  bm.add('blc-testimonial', {
    label: 'Témoignage',
    category: 'Body Look Care',
    content: `
      <section style="padding:60px 20px;background:#fdf6ee;">
        <div style="max-width:700px;margin:0 auto;text-align:center;">
          <div style="font-size:48px;color:#225544;margin-bottom:16px;">"</div>
          <p style="font-size:18px;font-style:italic;line-height:1.7;color:#444;margin-bottom:20px;">Je prends les gélules depuis plus de trois mois et je me sens beaucoup mieux dans mon corps. Mes jambes sont plus légères et affinées !</p>
          <p style="font-weight:600;color:#2d2d2d;">Jade V.</p>
          <div style="color:#225544;font-size:18px;margin-top:8px;">★★★★★</div>
        </div>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 .42.24 1 1 1z"/></svg>',
  });

  bm.add('blc-product-highlight', {
    label: 'Produit Vedette',
    category: 'Body Look Care',
    content: `
      <section style="padding:60px 20px;max-width:1100px;margin:0 auto;">
        <div style="display:flex;gap:40px;align-items:center;flex-wrap:wrap;background:white;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <div style="flex:1;min-width:300px;">
            <img src="https://placehold.co/500x500/e8ddd3/555?text=Produit" alt="" style="width:100%;object-fit:cover;"/>
          </div>
          <div style="flex:1;min-width:300px;padding:40px;">
            <span style="display:inline-block;padding:4px 12px;background:#225544;color:white;font-size:12px;border-radius:50px;margin-bottom:12px;">Best-seller</span>
            <h2 style="font-family:Georgia,serif;font-size:28px;color:#2d2d2d;margin-bottom:8px;">Nom du produit</h2>
            <p style="font-size:24px;font-weight:700;color:#225544;margin-bottom:16px;">29,90 €</p>
            <p style="font-size:15px;line-height:1.7;color:#666;margin-bottom:20px;">Description courte du produit. Avantages et points clés.</p>
            <a href="/boutique" style="display:inline-block;padding:12px 28px;background:#225544;color:white;border-radius:50px;font-weight:600;text-decoration:none;font-size:14px;">Ajouter au panier</a>
          </div>
        </div>
      </section>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  });

  bm.add('blc-divider', {
    label: 'Séparateur',
    category: 'Body Look Care',
    content: `<div style="padding:20px 0;text-align:center;"><hr style="border:none;border-top:2px solid #e8ddd3;max-width:200px;margin:0 auto;"/></div>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="12" x2="20" y2="12"/></svg>',
  });

  bm.add('blc-spacer', {
    label: 'Espace',
    category: 'Body Look Care',
    content: `<div style="height:60px;"></div>`,
    media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="8 8 12 4 16 8"/><polyline points="8 16 12 20 16 16"/></svg>',
  });
};

export default function PageEditor({ page, onSave, onBack }) {
  const { token } = useAdmin();
  const editorRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [device, setDevice] = useState('desktop');
  const [activePanel, setActivePanel] = useState('blocks');

  const handleSave = useCallback(async () => {
    if (!editorRef.current) return;
    setSaving(true);
    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss();
    const gjsData = JSON.stringify(editor.getProjectData());

    try {
      const res = await fetch(`${API}/api/admin/pages/${page.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: html, styles: css, gjs_data: gjsData })
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  }, [page.id, token]);

  const onEditor = useCallback((editor) => {
    editorRef.current = editor;

    // Load saved project data if exists
    if (page.gjs_data) {
      try {
        const projectData = JSON.parse(page.gjs_data);
        // Validate that it's a proper GrapesJS project structure (must have pages or assets array)
        if (projectData && (projectData.pages || projectData.assets || projectData.styles)) {
          editor.loadProjectData(projectData);
        } else {
          // Invalid GrapesJS data, fallback to HTML content
          if (page.content) {
            editor.setComponents(page.content);
            if (page.styles) editor.setStyle(page.styles);
          }
        }
      } catch (e) {
        // Fallback to HTML content on JSON parse error
        if (page.content) {
          editor.setComponents(page.content);
          if (page.styles) editor.setStyle(page.styles);
        }
      }
    } else if (page.content) {
      editor.setComponents(page.content);
      if (page.styles) editor.setStyle(page.styles);
    }

    // Keyboard shortcut: Ctrl+S to save
    editor.Commands.add('save-page', { run: () => handleSave() });
    editor.Keymaps.add('save', 'ctrl+s', 'save-page');

    // Set device commands
    editor.Commands.add('set-device-desktop', { run: (e) => e.setDevice('Desktop') });
    editor.Commands.add('set-device-tablet', { run: (e) => e.setDevice('Tablet') });
    editor.Commands.add('set-device-mobile', { run: (e) => e.setDevice('Mobile portrait') });
  }, [page, handleSave]);

  const changeDevice = (d) => {
    setDevice(d);
    if (!editorRef.current) return;
    const map = { desktop: 'Desktop', tablet: 'Tablet', mobile: 'Mobile portrait' };
    editorRef.current.setDevice(map[d]);
  };

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
    if (!editorRef.current) return;
    const editor = editorRef.current;
    const panels = editor.Panels;
    // Toggle GrapesJS panels
    if (panel === 'styles') {
      panels.getButton('views', 'open-sm')?.set('active', true);
    } else if (panel === 'layers') {
      panels.getButton('views', 'open-layers')?.set('active', true);
    } else if (panel === 'blocks') {
      panels.getButton('views', 'open-blocks')?.set('active', true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f1117] flex flex-col" data-testid="page-visual-editor">
      {/* Toolbar */}
      <div className="h-12 bg-[#1a1d27] border-b border-gray-800 flex items-center px-3 gap-2 flex-shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mr-2 transition-colors" data-testid="visual-editor-back">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1" />
        <span className="text-white font-semibold text-sm truncate max-w-[200px]">{page.title}</span>
        <div className="flex-1" />

        {/* Device toggles */}
        <div className="flex bg-[#0f1117] rounded-lg p-0.5 gap-0.5">
          {[
            { id: 'desktop', icon: Monitor, label: 'Desktop' },
            { id: 'tablet', icon: Tablet, label: 'Tablette' },
            { id: 'mobile', icon: Smartphone, label: 'Mobile' },
          ].map(d => (
            <button key={d.id} onClick={() => changeDevice(d.id)} title={d.label}
              className={`p-1.5 rounded transition-colors ${device === d.id ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-white'}`}
              data-testid={`device-${d.id}`}>
              <d.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        {/* Panel toggles */}
        <div className="flex gap-0.5">
          {[
            { id: 'blocks', icon: LayoutGrid, label: 'Blocs' },
            { id: 'styles', icon: Palette, label: 'Styles' },
            { id: 'layers', icon: Layers, label: 'Calques' },
          ].map(p => (
            <button key={p.id} onClick={() => togglePanel(p.id)} title={p.label}
              className={`p-1.5 rounded transition-colors ${activePanel === p.id ? 'bg-gray-700 text-emerald-400' : 'text-gray-500 hover:text-white'}`}
              data-testid={`panel-${p.id}`}>
              <p.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-gray-700 mx-1" />

        {/* Save */}
        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${saved ? 'bg-emerald-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'} disabled:opacity-50`}
          data-testid="visual-editor-save">
          {saved ? <><Check className="w-4 h-4" /> Sauvegardé</> : saving ? 'Sauvegarde...' : <><Save className="w-4 h-4" /> Enregistrer</>}
        </button>
      </div>

      {/* GrapesJS Editor */}
      <div className="flex-1 overflow-hidden gjs-dark-editor">
        <GjsEditor
          grapesjs={grapesjs}
          grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
          onEditor={onEditor}
          options={{
            height: '100%',
            width: 'auto',
            storageManager: false,
            undoManager: { trackSelection: false },
            canvas: {
              styles: [
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap'
              ]
            },
            deviceManager: {
              devices: [
                { name: 'Desktop', width: '' },
                { name: 'Tablet', width: '768px', widthMedia: '992px' },
                { name: 'Mobile portrait', width: '375px', widthMedia: '480px' },
              ]
            },
            plugins: [gjsBlocksBasic, gjsPresetWebpage, blcBlocksPlugin],
            pluginsOpts: {
              [gjsBlocksBasic]: {
                flexGrid: true,
                category: 'Basique',
              },
              [gjsPresetWebpage]: {
                blocksBasicOpts: false,
                blocks: ['link-block', 'quote', 'text-basic'],
                modalImportTitle: 'Importer du code',
                modalImportLabel: 'Collez votre HTML/CSS ici',
                modalImportButton: 'Importer',
              },
            },
            styleManager: {
              sectors: [
                {
                  name: 'Dimensions',
                  open: false,
                  buildProps: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'padding', 'margin'],
                },
                {
                  name: 'Typographie',
                  open: false,
                  buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
                },
                {
                  name: 'Fond',
                  open: false,
                  buildProps: ['background-color', 'background-image', 'background-repeat', 'background-position', 'background-size'],
                },
                {
                  name: 'Bordures',
                  open: false,
                  buildProps: ['border-radius', 'border', 'box-shadow'],
                },
                {
                  name: 'Disposition',
                  open: false,
                  buildProps: ['display', 'flex-direction', 'justify-content', 'align-items', 'flex-wrap', 'gap', 'position', 'top', 'right', 'bottom', 'left', 'overflow'],
                },
              ],
            },
            assetManager: {
              upload: `${API}/api/admin/media/upload`,
              uploadName: 'file',
              headers: { 'Authorization': `Bearer ${token}` },
              autoAdd: true,
              multiUpload: false,
            },
          }}
        />
      </div>
    </div>
  );
}
