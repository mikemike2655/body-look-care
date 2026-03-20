import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Shield, Cookie, ChevronDown, ChevronUp } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';

const TABS = [
  { path: '/mentions-legales', label: 'Mentions Légales', icon: Scale },
  { path: '/confidentialite', label: 'Confidentialité', icon: Shield },
  { path: '/politique-cookies', label: 'Cookies', icon: Cookie },
];

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-brand-sage/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left group" data-testid={`section-toggle-${title?.slice(0,20)}`}>
        <h3 className="font-semibold text-brand-charcoal text-base md:text-lg group-hover:text-brand-forest transition-colors">{title}</h3>
        {open ? <ChevronUp className="w-5 h-5 text-brand-stone shrink-0" /> : <ChevronDown className="w-5 h-5 text-brand-stone shrink-0" />}
      </button>
      {open && <div className="pb-6 text-brand-charcoal/75 text-sm md:text-[15px] leading-relaxed space-y-3">{children}</div>}
    </div>
  );
}

function MentionsLegales() {
  return (
    <>
      <Section title="Siège social" defaultOpen={true}>
        <p><strong>BODY LOOK CARE</strong></p>
        <p>13 rue derrière le couvent<br />57640 SAINTE BARBE &ndash; FRANCE</p>
        <p>SIRET : 87979363600017<br />SIREN : 879 793 636<br />N° TVA intracommunautaire : FR56879793636</p>
      </Section>
      <Section title="Édition et hébergement du site">
        <p><strong>Éditeur :</strong> BODY LOOK CARE &ndash; 13 rue derrière le couvent, 57640 Sainte Barbe, France.</p>
        <p><strong>Directrice de la publication :</strong> Marie-Julie Parant, en sa qualité de gérante.</p>
        <p>Le site bodylookcare.com est conçu, développé et administré par Body Look Care.</p>
        <p><strong>Hébergement :</strong> le site est hébergé par OVH SAS, 2 rue Kellermann, 59100 Roubaix, France &ndash; <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">www.ovhcloud.com</a></p>
      </Section>
      <Section title="Conditions générales d'utilisation">
        <p>L'utilisateur reconnaît avoir pris connaissance des présentes mentions légales et s'engage à les respecter. Il reconnaît avoir vérifié que la configuration informatique qu'il utilise ne contient aucun virus ou tout autre logiciel malveillant et qu'elle est en parfait état de fonctionnement.</p>
        <p>L'utilisateur est seul responsable du choix, de l'utilisation et de l'interprétation des données qu'il consulte, interroge et transfère sur Internet.</p>
      </Section>
      <Section title="Contenu du site">
        <p>Body Look Care se réserve le droit de modifier, à tout moment et sans préavis, le contenu de ce site. Body Look Care met tout en œuvre pour offrir aux utilisateurs des informations fiables, mais ne saurait être tenu pour responsable des erreurs, d'une absence de disponibilité ou du caractère obsolète des informations.</p>
        <p>En aucun cas les informations contenues dans ce site ne constituent une garantie. L'utilisateur qui constaterait des inexactitudes ou des informations erronées est invité à en informer Body Look Care via le formulaire de contact.</p>
      </Section>
      <Section title="Propriété intellectuelle">
        <p>L'ensemble des contenus présents sur le site (textes, images, photographies, vidéos, logos, marques, graphismes) est protégé par le droit d'auteur et le droit de la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, est strictement interdite sans l'accord écrit préalable de Body Look Care.</p>
        <p>Crédits photographiques : sauf mention contraire, toutes les photographies de ce site sont la propriété exclusive de Body Look Care.</p>
      </Section>
      <Section title="Protection des données personnelles">
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD &ndash; Règlement UE 2016/679) et à la loi Informatique et Libertés modifiée, l'utilisateur dispose d'un droit d'accès, de rectification, d'effacement, de portabilité, de limitation et d'opposition concernant ses données personnelles.</p>
        <p>Pour exercer ces droits, l'utilisateur peut adresser sa demande par e-mail à : <a href="mailto:contact@bodylookcare.com" className="text-brand-forest hover:underline font-medium">contact@bodylookcare.com</a></p>
        <p>Pour plus de détails, consultez notre <Link to="/confidentialite" className="text-brand-forest hover:underline font-medium">Politique de Confidentialité</Link>.</p>
      </Section>
      <Section title="Litiges">
        <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux compétents de Metz seront seuls compétents.</p>
      </Section>
    </>
  );
}

function PolitiqueConfidentialite() {
  return (
    <>
      <Section title="Article 1 : Préambule" defaultOpen={true}>
        <p>La présente politique de confidentialité s'applique au site <strong>bodylookcare.com</strong>, édité par Body Look Care.</p>
        <p>Elle a pour objectif d'informer les utilisateurs sur :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>La manière dont sont collectées et traitées leurs données à caractère personnel (prénom, nom, adresse postale, adresse e-mail, numéro de téléphone, adresse IP)</li>
          <li>Les droits dont ils disposent concernant ces données</li>
          <li>L'identité du responsable du traitement des données collectées</li>
          <li>Les destinataires éventuels de ces données</li>
          <li>La politique du site en matière de cookies</li>
        </ul>
        <p className="mt-2">Cette politique complète les <Link to="/mentions-legales" className="text-brand-forest hover:underline font-medium">Mentions Légales</Link> du site.</p>
      </Section>
      <Section title="Article 2 : Principes généraux">
        <p>Conformément à l'article 5 du Règlement européen 2016/679 (RGPD), la collecte et le traitement des données respectent les principes suivants :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Licéité, loyauté et transparence :</strong> les données ne sont collectées qu'avec le consentement éclairé de l'utilisateur</li>
          <li><strong>Finalités déterminées :</strong> la collecte et le traitement répondent à des objectifs précis et légitimes</li>
          <li><strong>Minimisation :</strong> seules les données strictement nécessaires sont collectées</li>
          <li><strong>Conservation limitée :</strong> les données sont conservées pour une durée proportionnée à leur finalité</li>
          <li><strong>Intégrité et confidentialité :</strong> le responsable du traitement garantit la sécurité des données collectées</li>
        </ul>
      </Section>
      <Section title="Article 3 : Données collectées">
        <p>Les données à caractère personnel collectées sur le site sont les suivantes :</p>
        <p><strong>Via le site :</strong> adresse e-mail (inscription à la newsletter)</p>
        <p><strong>Via la boutique en ligne :</strong> prénom, nom, adresse postale, numéro de téléphone, adresse e-mail</p>
        <p>Ces données sont collectées lorsque l'utilisateur :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>S'inscrit à la newsletter</li>
          <li>Effectue un achat de produits ou services</li>
          <li>Remplit le formulaire de contact</li>
        </ul>
        <p className="mt-2">Les données sont conservées pour une durée maximale de <strong>3 ans</strong> à compter du dernier contact avec l'utilisateur, conformément aux recommandations de la CNIL.</p>
      </Section>
      <Section title="Article 4 : Responsable du traitement">
        <p><strong>Responsable :</strong> BODY LOOK CARE &ndash; <a href="mailto:contact@bodylookcare.com" className="text-brand-forest hover:underline">contact@bodylookcare.com</a></p>
        <p>Le responsable du traitement s'engage à :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Protéger les données personnelles collectées</li>
          <li>Ne pas les transmettre à des tiers sans information préalable de l'utilisateur</li>
          <li>Respecter les finalités pour lesquelles ces données ont été collectées</li>
          <li>Notifier l'utilisateur en cas de violation de données dans les 72 heures (article 33 du RGPD)</li>
        </ul>
        <p className="mt-2">Le site dispose d'un certificat SSL garantissant la sécurité des échanges de données.</p>
        <p><strong>Délégué à la Protection des Données (DPO) :</strong><br />Body Look Care<br />Tél. : <a href="tel:+33787593514" className="text-brand-forest hover:underline">+33 7 87 59 35 14</a><br />E-mail : <a href="mailto:contact@bodylookcare.com" className="text-brand-forest hover:underline">contact@bodylookcare.com</a></p>
      </Section>
      <Section title="Article 5 : Droits de l'utilisateur">
        <p>Conformément au RGPD (articles 15 à 22), l'utilisateur dispose des droits suivants :</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Droit d'accès</strong> (art. 15) : obtenir la confirmation que des données le concernant sont traitées et en recevoir une copie</li>
          <li><strong>Droit de rectification</strong> (art. 16) : faire corriger des données inexactes ou incomplètes</li>
          <li><strong>Droit à l'effacement</strong> (art. 17) : demander la suppression de ses données personnelles</li>
          <li><strong>Droit à la portabilité</strong> (art. 20) : recevoir ses données dans un format structuré et les transmettre à un autre responsable de traitement</li>
          <li><strong>Droit à la limitation du traitement</strong> (art. 18) : demander la suspension du traitement de ses données</li>
          <li><strong>Droit d'opposition</strong> (art. 21) : s'opposer au traitement de ses données pour des motifs légitimes</li>
          <li><strong>Droit relatif au sort des données après le décès</strong> (loi n° 2016-1321 du 7 octobre 2016)</li>
        </ul>
        <p className="mt-3">Le responsable du traitement dispose d'un délai de <strong>30 jours</strong> pour répondre à toute demande.</p>
        <p>Pour exercer vos droits : <a href="mailto:contact@bodylookcare.com" className="text-brand-forest hover:underline font-medium">contact@bodylookcare.com</a></p>
        <p><strong>Réclamation :</strong> en cas de litige, vous pouvez saisir la CNIL &ndash; <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">www.cnil.fr</a></p>
      </Section>
      <Section title="Article 6 : Mineurs">
        <p>Conformément à l'article 8 du RGPD et à la loi Informatique et Libertés, seuls les mineurs âgés de <strong>15 ans ou plus</strong> peuvent consentir au traitement de leurs données personnelles. En dessous de cet âge, l'accord d'un représentant légal est requis.</p>
      </Section>
      <Section title="Article 7 : Cookies">
        <p>Le site utilise des cookies. Pour en savoir plus, consultez notre <Link to="/politique-cookies" className="text-brand-forest hover:underline font-medium">Politique Cookies</Link>.</p>
      </Section>
      <Section title="Article 8 : Modifications et acceptation">
        <p>Body Look Care se réserve le droit de modifier la présente politique afin de garantir sa conformité avec le droit en vigueur.</p>
        <p>L'utilisateur sera informé de toute modification substantielle par notification sur le site ou par e-mail.</p>
        <p><strong>Dernière mise à jour :</strong> 23 février 2026</p>
        <p>En naviguant sur le site, l'utilisateur atteste avoir lu et compris la présente politique de confidentialité et en accepte les conditions.</p>
      </Section>
    </>
  );
}

function PolitiqueCookies() {
  return (
    <>
      <Section title="1. Qu'est-ce qu'un cookie ?" defaultOpen={true}>
        <p>Un cookie est un petit fichier texte déposé sur le terminal de l'utilisateur (ordinateur, smartphone, tablette) lors de la visite d'un site internet. Il permet au serveur web de reconnaître le navigateur et de conserver certaines informations (préférences, panier d'achat, session de connexion, etc.).</p>
        <p>Les cookies ne sont ni des logiciels espions ni des virus. La plupart des navigateurs modernes permettent aux utilisateurs de gérer leurs préférences en matière de cookies.</p>
      </Section>
      <Section title="2. Cookies utilisés sur notre site">
        <p>Sous réserve de votre consentement, les cookies suivants peuvent être déposés sur votre terminal :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (session, panier d'achat, sécurité). Ces cookies ne requièrent pas votre consentement.</li>
          <li><strong>Cookies analytiques :</strong> permettent de mesurer l'audience du site et d'améliorer l'expérience utilisateur (nombre de visites, pages consultées, parcours de navigation)</li>
          <li><strong>Cookies de personnalisation :</strong> adaptent l'affichage du site à vos préférences (langue, résolution d'écran)</li>
          <li><strong>Cookies marketing :</strong> permettent de vous proposer des contenus ou publicités adaptés à vos centres d'intérêt</li>
        </ul>
        <p className="mt-2 font-medium text-brand-charcoal">Conformément à la directive ePrivacy et aux recommandations de la CNIL, votre consentement est recueilli avant le dépôt de tout cookie non essentiel.</p>
      </Section>
      <Section title="3. Cookies tiers">
        <p>Certains cookies peuvent être déposés par des services tiers intégrés au site (réseaux sociaux, outils d'analyse). Ces tiers disposent de leurs propres politiques de confidentialité :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">Meta (Facebook / Instagram)</a></li>
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">Google (Analytics, YouTube)</a></li>
          <li><a href="https://x.com/fr/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">X (anciennement Twitter)</a></li>
        </ul>
      </Section>
      <Section title="4. Durée de conservation">
        <p>Conformément aux recommandations de la CNIL, le consentement de l'utilisateur concernant les cookies est valide pour une durée maximale de <strong>13 mois</strong>. À l'issue de cette période, votre consentement vous sera de nouveau demandé.</p>
        <p>Les informations collectées via les cookies sont conservées pour une durée maximale de 25 mois.</p>
      </Section>
      <Section title="5. Gérer vos préférences">
        <p>Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><a href="https://support.google.com/chrome/answer/95647?hl=fr" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">Microsoft Edge</a></li>
          <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-brand-forest hover:underline">Opera</a></li>
        </ul>
        <p className="mt-2">La désactivation des cookies peut affecter le fonctionnement de certaines fonctionnalités du site (panier d'achat, espace client).</p>
      </Section>
      <Section title="6. Mise à jour">
        <p>La présente politique cookies peut être modifiée à tout moment pour garantir sa conformité avec la réglementation en vigueur.</p>
        <p><strong>Dernière mise à jour :</strong> 23 février 2026</p>
      </Section>
    </>
  );
}

const META = {
  '/mentions-legales': { title: 'Mentions Légales | Body Look Care', description: 'Mentions légales du site Body Look Care. Informations sur l\'éditeur, l\'hébergeur et les conditions d\'utilisation.' },
  '/confidentialite': { title: 'Politique de Confidentialité | Body Look Care', description: 'Politique de confidentialité et protection des données personnelles de Body Look Care, conforme au RGPD.' },
  '/politique-cookies': { title: 'Politique Cookies | Body Look Care', description: 'Politique d\'utilisation des cookies sur le site Body Look Care, conforme à la directive ePrivacy.' },
};

const TITLES = {
  '/mentions-legales': 'Mentions Légales',
  '/confidentialite': 'Politique de Confidentialité',
  '/politique-cookies': 'Politique Cookies',
};

export default function LegalPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  const meta = META[currentPath] || META['/mentions-legales'];

  usePageMeta({ title: meta.title, description: meta.description, url: currentPath });

  const activeTab = TABS.find(t => t.path === currentPath) || TABS[0];

  return (
    <div className="page-transition pb-nav" data-testid="legal-page">
      {/* Header */}
      <section className="bg-brand-charcoal py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <activeTab.icon className="w-10 h-10 text-brand-sage mx-auto mb-4" />
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-3" data-testid="legal-page-title">
              {TITLES[currentPath] || 'Mentions Légales'}
            </h1>
            <p className="text-white/60 text-sm">Body Look Care &ndash; 13 rue derrière le couvent, 57640 Sainte Barbe, France</p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-brand-sage/10 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <nav className="flex gap-1 overflow-x-auto" data-testid="legal-tabs">
            {TABS.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  currentPath === tab.path
                    ? 'border-brand-forest text-brand-forest'
                    : 'border-transparent text-brand-stone hover:text-brand-charcoal hover:border-brand-sage/30'
                }`}
                data-testid={`legal-tab-${tab.path.slice(1)}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPath === '/mentions-legales' && <MentionsLegales />}
            {currentPath === '/confidentialite' && <PolitiqueConfidentialite />}
            {currentPath === '/politique-cookies' && <PolitiqueCookies />}
          </motion.div>
        </div>
      </section>

      {/* Footer contact */}
      <section className="py-8 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <p className="text-brand-stone text-sm">
            Pour toute question relative à vos données personnelles : <a href="mailto:contact@bodylookcare.com" className="text-brand-forest font-medium hover:underline">contact@bodylookcare.com</a> | Tél. : <a href="tel:+33787593514" className="text-brand-forest font-medium hover:underline">+33 7 87 59 35 14</a>
          </p>
        </div>
      </section>
    </div>
  );
}
