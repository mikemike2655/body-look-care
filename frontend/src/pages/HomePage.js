import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Leaf, Instagram, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import usePageMeta from '../hooks/usePageMeta';
import { useOrganizationSchema } from '../hooks/useJsonLd';
import useContent from '../hooks/useContent';

const products = [
  {
    id: 'miracle-cream',
    name: 'Miracle Cream',
    subtitle: 'Anti-Cellulite',
    price: 31.99,
    image: '/images/product_miracle_cream.jpeg',
    rating: 4.9,
    reviews: 312,
    outOfStock: true
  },
  {
    id: 'le-draineur',
    name: 'Le Draineur',
    subtitle: 'Gélules Drainage Lymphatique',
    price: 24.99,
    image: '/images/product_drainage.jpeg',
    rating: 4.8,
    reviews: 247,
    outOfStock: false,
    badge: 'Best-seller'
  },
  {
    id: 'relax-et-sommeil',
    name: 'Relax & Sommeil',
    subtitle: 'Anti-Stress & Sommeil',
    price: 34.99,
    image: '/images/product_relax_sommeil.jpeg',
    rating: 4.7,
    reviews: 89,
    outOfStock: true
  }
];


const commentScreenshots = [
  '/images/comment1.jpeg',
  '/images/comment2.jpeg',
  '/images/comment3.jpeg',
  '/images/comment4.jpeg',
  '/images/comment5.jpeg',
  '/images/comment5.jpeg'
];

const beforeAfterPhotos = [
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/veg7bz34_avant%20apres%2000%20%282%29.png', caption: 'Avant / Après - Jambes' },
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/wsj4jiwz_avant%20apres%2000.png', caption: 'Avant / Après - Cuisses' },
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/o85pt2ea_avant%20apres%2001.png', caption: 'Avant / Après - Hanches' },
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/0pqtdcz8_avant%20apres%2002.png', caption: 'Avant / Après - Silhouette' },
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/zao29pic_avant%20apres%2003.png', caption: 'Avant / Après - Ventre' }
];

const formatPrice = (price) => price.toFixed(2).replace('.', ',') + ' \u20AC';

function CommentCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mb-10" data-testid="comment-carousel">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {commentScreenshots.map((src, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 px-2">
              <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-100">
                <img src={src} alt={`Avis client ${i + 1}`} className="w-full h-auto object-contain" loading="lazy" data-testid={`comment-screenshot-${i}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30"
        disabled={!canPrev}
        aria-label="Précédent"
        data-testid="carousel-prev"
      >
        <ChevronLeft className="w-5 h-5 text-brand-charcoal" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30"
        disabled={!canNext}
        aria-label="Suivant"
        data-testid="carousel-next"
      >
        <ChevronRight className="w-5 h-5 text-brand-charcoal" />
      </button>
    </div>
  );
}

export default function HomePage() {
  usePageMeta({
    title: 'Body Look Care | Drainage & Anti-Cellulite Naturel',
    description: 'Drainage lymphatique et soins anti-cellulite naturels. Fabriqué en France, vegan, résultats visibles en 28 jours. Livraison offerte.',
    url: '/',
    type: 'website'
  });

  useOrganizationSchema();

  const { data: cms } = useContent('homepage');
  const [lightboxImg, setLightboxImg] = useState(null);

  // CMS data with fallbacks
  const hero = cms?.hero || {};
  const founder = cms?.founder || {};
  const cmsProducts = cms?.products || products;
  const galleryBA = cms?.gallery_before_after || beforeAfterPhotos;
  const galleryReviews = cms?.gallery_reviews || commentScreenshots;
  const celebs = cms?.celebrities || [];
  const celebsTitle = cms?.celebrities_title || "Des personnalités du grand public utilisent et recommandent nos produits";
  const unisexTitle = cms?.unisex_title || "Nos produits sont adaptés aux femmes et aux hommes";
  const unisexText = cms?.unisex_text || "Le drainage et le bien-être n'ont pas de genre. Nos formules naturelles conviennent à tous.";
  const unisexImage = cms?.unisex_image || "/images/man_gamme_complete.jpeg";
  const resultText = cms?.result_text || "<strong>Le résultat ?</strong> Silhouette affinée, jambes légères, peau lissée. <span class='text-brand-forest'>Comptez 3 à 4 semaines pour voir la différence.</span>";
  const resultCta = cms?.result_cta || "Je veux essayer";

  return (
    <div className="page-transition pb-nav" data-testid="home-page">

      {/* ═══ 1. HERO ═══ */}
      <section className="relative" data-testid="hero-section">
        <div className="relative w-full overflow-hidden" style={{ minHeight: '550px' }}>
          <img
            src={hero.image || "https://customer-assets.emergentagent.com/job_0979fc8d-3068-468e-8f1d-9337d6bc3dce/artifacts/nl1s76me_image-12.jpg"}
            alt="Body Look Care - Retrouvez des jambes légères"
            className="w-full object-cover"
            style={{ minHeight: '550px', height: '70vh', maxHeight: '750px', objectPosition: 'center 25%' }}
            loading="eager"
          />
          {/* Gradient bas subtil pour lisibilité du texte — ne couvre que le bas */}
          <div className="absolute inset-x-0 bottom-0" style={{ height: '14%', background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 70%, transparent 100%)' }} />
          {/* Texte centré dans la bande du bas (zone sans visages) */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-4" style={{ paddingBottom: 'clamp(2.2rem, 3.5vw, 3rem)' }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center tracking-wider drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
              style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.8rem)', fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1.15 }}
              data-testid="hero-headline"
            >
              {hero.headline || "LA BEAUTÉ COMMENCE À L'INTÉRIEUR."}
            </motion.h1>
          </div>
          {/* Bouton scroll vers le bas */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            onClick={() => document.getElementById('section-proposition')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full border-2 border-white/40 text-white/60 hover:border-white hover:text-white transition-all duration-300 cursor-pointer"
            aria-label="Défiler vers le bas"
            data-testid="hero-scroll-btn"
          >
            <motion.svg
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </motion.button>
        </div>
      </section>

      {/* ═══ 2. FONDATRICE — "Quel est mon secret ?" ═══ */}
<section className="py-10 md:py-14" id="section-proposition" style={{ background: '#F9F9F7' }} data-testid="section-founder">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="md:col-span-5"
      >
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <img
              src={founder.image || "https://customer-assets.emergentagent.com/job_0979fc8d-3068-468e-8f1d-9337d6bc3dce/artifacts/y9xt2xqt_hf_20260218_152606_37ae0cc1-674a-405e-9a9b-e4b44e2b046e.jpeg"}
              alt="Marie-Julie Parant, Fondatrice de Body Look Care"
              className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              data-testid="founder-image"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-2 opacity-20 -z-10" style={{ borderColor: '#BFA588' }} />
        </div>
      </motion.div>

      <div className="md:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight text-brand-charcoal mb-6" data-testid="founder-headline">
            {founder.title || "Quel est mon secret ?"}
          </h2>
          <div className="space-y-4 text-brand-charcoal/80 leading-relaxed text-[15px]">
            <p>
              En tant qu'infirmière, j'accompagne depuis des années des patients confrontés à un problème largement sous-estimé : <strong>la rétention d'eau</strong>.
            </p>
            <p>
              La rétention d'eau n'est pas qu'une question esthétique. C'est un véritable enjeu de santé publique, encore trop peu reconnu et insuffisamment compris, y compris dans le domaine médical. Pourtant, elle concernerait plus de 80 % de la population, avec des conséquences bien réelles : jambes lourdes, gonflements, cellulite, inconfort quotidien, baisse de mobilité…
            </p>
            <p>
              C'est en constatant ce manque de solutions globales et efficaces que j'ai décidé de créer une gamme complète dédiée au drainage et à la lutte contre la rétention d'eau.
            </p>
            <p>
              Au cœur de cette approche : <strong>Le Draineur</strong>, des gélules formulées à base de trois plantes sélectionnées pour soutenir naturellement le drainage lymphatique et aider l'organisme à éliminer l'excès d'eau.
            </p>
            <p>
              Associé à nos soins corps <strong>Miracle Cream</strong> et <strong>Miracle Scrub</strong>, le travail se fait à la fois de l'intérieur et de l'extérieur, pour une action complémentaire et cohérente.
            </p>
            <p className="text-brand-forest font-medium italic">
              Ce n'est pas un concept marketing. C'est l'approche que j'applique auprès de mes patients depuis des années, aujourd'hui rendue accessible au plus grand nombre.
            </p>
            <p>
              À ce jour, cette gamme soulage déjà de nombreux patients :
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>femmes et hommes</li>
              <li>personnes sédentaires</li>
              <li>sportifs</li>
              <li>profils sujets aux variations hormonales</li>
              <li>personnes souffrant de sensations de jambes lourdes ou de gonflements récurrents</li>
            </ul>
            <p className="font-medium">
              Parce que la rétention d'eau mérite enfin une réponse sérieuse, globale et professionnelle.
            </p>
          </div>
          <Link
            to="/boutique"
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 mt-8"
            data-testid="founder-cta"
          >
            Je découvre ma solution
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
</section>
      {/* ═══ 3. PRODUITS — 3 cartes produits ═══ */}
      <section className="py-10 md:py-14 bg-white" data-testid="products-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cmsProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow relative ${product.outOfStock ? 'opacity-75' : ''}`}
                data-testid={`home-product-card-${product.id}`}
              >
                <div className="relative aspect-square bg-brand-cream">
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full z-10 bg-brand-gold text-white">
                      {product.badge}
                    </span>
                  )}
                  {product.outOfStock && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg" data-testid={`out-of-stock-${product.id}`}>
                        Rupture de stock
                      </span>
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover ${product.outOfStock ? 'grayscale-[30%]' : ''}`}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-brand-charcoal mb-1">{product.name}</h3>
                  <p className="text-brand-forest text-sm font-medium mb-3">{product.subtitle}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-brand-stone">{product.rating}/5 ({product.reviews} avis)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brand-charcoal" data-testid={`home-product-price-${product.id}`}>
                      {formatPrice(product.price)}
                    </span>
                    {product.outOfStock ? (
                      <span className="text-sm text-red-500 font-medium">Indisponible</span>
                    ) : (
                      <Link
                        to={`/produit/${product.id}`}
                        className="btn-primary text-sm px-4 py-2"
                        data-testid={`home-product-cta-${product.id}`}
                      >
                        Découvrir
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Résultat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
            data-testid="result-section"
          >
            <p className="text-xl md:text-2xl text-brand-charcoal font-medium mb-6 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: resultText }} />
            <Link to="/boutique" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4" data-testid="result-cta">
              {resultCta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. GALERIE — 12 photos clickables (6 avant/après + 6 retours clients) ═══ */}
      <section className="py-10 md:py-14 bg-brand-cream" data-testid="section-gallery">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-3">
              Résultats & Témoignages
            </h2>
            <p className="text-brand-stone text-base max-w-xl mx-auto">
              Découvrez les transformations de nos clientes et leurs avis authentiques
            </p>
          </motion.div>

          {/* Ligne 1 : 6 photos Avant / Après */}
          <div className="mb-3">
            <p className="text-xs uppercase tracking-widest text-brand-stone font-medium mb-3">Avant / Après</p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {galleryBA.map((photo, i) => (
                <motion.div
                  key={`ba-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square overflow-hidden rounded-xl bg-white cursor-pointer group relative"
                  onClick={() => setLightboxImg(photo.image)}
                  data-testid={`gallery-before-after-${i}`}
                >
                  <img src={photo.image} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ligne 2 : 6 photos Retours Clients */}
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-stone font-medium mb-3">Retours clients</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {galleryReviews.map((src, i) => (
                <motion.div
                  key={`rc-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.15 }}
                  className="aspect-square overflow-hidden rounded-xl bg-white cursor-pointer group relative"
                  onClick={() => setLightboxImg(src)}
                  data-testid={`gallery-client-review-${i}`}
                >
                  <img src={src} alt={`Avis client ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Lightbox modal ═══ */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
          data-testid="lightbox-modal"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-3xl max-h-[85vh] w-full"
            onClick={e => e.stopPropagation()}
          >
            <img src={lightboxImg} alt="Aperçu" className="w-full h-auto max-h-[85vh] object-contain rounded-xl" />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-3 -right-3 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-brand-charcoal hover:bg-gray-100 transition-colors"
              data-testid="lightbox-close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </motion.div>
        </div>
      )}

      {/* ═══ 5. LOGOS DE CONFIANCE ═══ */}
      <section className="bg-white py-10 md:py-14" data-testid="section-trust">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16" data-testid="trust-logos">
            <div className="flex items-center gap-2 hover:opacity-100 transition-opacity duration-300" data-testid="logo-lehning">
              <img
                src="/images/lehning_logo.png"
                alt="Lehning Laboratoires"
                className="h-16 md:h-20 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(15%) saturate(1200%) hue-rotate(100deg) brightness(95%) contrast(88%)' }}
              />
            </div>
            <div className="flex items-center gap-2" data-testid="logo-vegan">
              <div className="flex items-center gap-2">
                <Leaf className="w-7 h-7 text-brand-forest" />
                <span className="text-sm md:text-base font-bold uppercase tracking-wider text-brand-charcoal">Vegan</span>
              </div>
            </div>
            <div className="flex items-center gap-2" data-testid="logo-made-france">
              <div className="flex items-center gap-2.5 bg-[#1B2A4A] text-white px-4 py-2 rounded-md">
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-4 bg-blue-500 rounded-sm" />
                  <div className="w-1.5 h-4 bg-white rounded-sm" />
                  <div className="w-1.5 h-4 bg-red-500 rounded-sm" />
                </div>
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Made in France</span>
              </div>
            </div>
            <div className="flex items-center gap-2" data-testid="logo-100-naturel">
              <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-[3px] border-brand-forest/70">
                <div className="text-center leading-none">
                  <span className="block text-sm md:text-base font-bold text-brand-forest">100%</span>
                  <span className="block text-[9px] md:text-[11px] uppercase tracking-wider text-brand-forest font-semibold">Naturel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION EXPERTISE — Partenariat Laboratoire Lehning ═══ */}
      <section className="py-10 md:py-14 bg-brand-cream" data-testid="section-expertise">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src="/images/lab_lehning.jpeg"
                alt="Laboratoire Lehning — Recherche et développement"
                className="w-full h-full object-cover min-h-[360px]"
                loading="lazy"
                data-testid="lab-photo"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/lehning_logo.png"
                  alt="Lehning"
                  className="h-10 object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(15%) saturate(1200%) hue-rotate(100deg) brightness(95%) contrast(88%)' }}
                />
                <span className="text-xs uppercase tracking-widest text-brand-stone font-medium">Partenaire scientifique</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-6 leading-snug">
                L'exigence scientifique au service du naturel
              </h2>
              <div className="space-y-4 text-brand-charcoal/80 leading-relaxed text-[15px]">
                <p>
                  Nos produits sont conçus et développés en partenariat avec le <strong>laboratoire français Lehning</strong>, reconnu pour son savoir-faire en phytothérapie et en compléments alimentaires.
                </p>
                <p>
                  Fabriqués en France, ils respectent des normes de qualité strictes et une sélection rigoureuse des ingrédients.
                </p>
                <p>
                  Ce choix d'un laboratoire français garantit des formules fiables, sûres et efficaces, pensées pour offrir de vrais résultats tout en respectant le corps.
                </p>
                <p className="text-brand-forest font-medium italic">
                  C'est l'alliance entre l'exigence scientifique française et une approche naturelle du bien-être, pour des produits en lesquels vous pouvez avoir confiance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ RÉSEAU DE DISTRIBUTION — Points de Vente ═══ */}
      <section className="py-10 md:py-14 bg-white" data-testid="section-b2b">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
              Nos produits en points de vente
            </h2>
            <p className="text-brand-stone text-lg max-w-3xl mx-auto">
              Les produits Body Look Care sont de plus en plus distribués en pharmacies, grandes surfaces et instituts de beauté, en France et à l'étranger.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pharmacies — 4 photos grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              data-testid="b2b-pharmacies"
            >
              <div className="grid grid-cols-2 gap-1">
                <img src="/images/pdv_pharmacie_devanture.jpeg" alt="Devanture pharmacie" className="w-full h-32 object-cover" loading="lazy" />
                <img src="/images/pdv_pharmacie_comptoir.jpeg" alt="Comptoir pharmacie" className="w-full h-32 object-cover" loading="lazy" />
                <img src="/images/pdv_pharmacy_shelf.png" alt="Rayon pharmacie" className="w-full h-32 object-cover" loading="lazy" />
                <img src="/images/pdv_pharmacy_counter2.png" alt="Produits en pharmacie" className="w-full h-32 object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl text-brand-charcoal mb-1">Pharmacies</h3>
                <p className="text-sm text-brand-stone">Disponible au comptoir de votre pharmacie</p>
              </div>
            </motion.div>

            {/* Grandes Surfaces */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              data-testid="b2b-grandes-surfaces"
            >
              <img src="/images/pdv_grande_surface.jpeg" alt="Rayonnages Espace Bio" className="w-full h-[17rem] object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-serif text-xl text-brand-charcoal mb-1">Grandes surfaces</h3>
                <p className="text-sm text-brand-stone">Rayon Espace Bio & Bien-être</p>
              </div>
            </motion.div>

            {/* Instituts de Beauté */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              data-testid="b2b-instituts"
            >
              <img src="/images/pdv_institut.jpeg" alt="Institut de beauté" className="w-full h-[17rem] object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-serif text-xl text-brand-charcoal mb-1">Instituts de beauté</h3>
                <p className="text-sm text-brand-stone">Nos produits professionnels en institut</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ VU SUR — Personnalités (photos réelles) ═══ */}
      <section className="py-10 md:py-14 bg-brand-cream" data-testid="section-celebrities">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
              {celebsTitle}
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {(celebs.length > 0 ? celebs : [
              { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/0rp379ky_IMG_9986.PNG', instagram: 'https://www.instagram.com/larmoiredesoso' },
              { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/9jj3exkw_IMG_9987.PNG', instagram: 'https://www.instagram.com/bodylookcare' },
              { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/2si9p3v5_IMG_9988.PNG', instagram: 'https://www.instagram.com/cindysander_off' },
              { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/aubkotnv_IMG_9989.PNG', instagram: 'https://www.instagram.com/ludivine' },
              { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/g1zv5ghh_IMG_9990.PNG', instagram: 'https://www.instagram.com/nabilla' },
            ]).map((celeb, i) => (
              <motion.a
                key={i}
                href={celeb.instagram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                data-testid={`celebrity-${i}`}
              >
                <img
                  src={celeb.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RÉSEAUX SOCIAUX — Instagram + Facebook + LinkedIn ═══ */}
      <section className="py-10 md:py-14 bg-white" data-testid="section-instagram">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
              Suivez-nous sur les réseaux
            </h2>
            <p className="text-brand-stone mb-8 max-w-lg mx-auto">
              Rejoignez notre communauté et suivez nos actualités, résultats et conseils bien-être
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://www.instagram.com/bodylookcare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                data-testid="instagram-cta"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/bodylookcare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1877F2] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                data-testid="facebook-cta"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/company/bodylookcare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0A66C2] text-white px-8 py-3.5 rounded-full font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                data-testid="linkedin-cta"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION HOMME — Produits unisexes ═══ */}
      <section className="relative overflow-hidden" data-testid="section-unisex">
        <div className="grid md:grid-cols-2 min-h-[500px]">
          <div className="relative">
            <img
              src={unisexImage}
              alt="Homme avec la gamme complète Body Look Care"
              className="w-full h-full object-cover min-h-[400px]"
              loading="lazy"
              data-testid="unisex-image"
            />
          </div>
          <div className="flex items-center bg-brand-charcoal px-8 md:px-16 py-16">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-snug">
                {unisexTitle}
              </h2>
              <p className="text-white/80 text-lg mb-8">
                {unisexText}
              </p>
              <Link
                to="/boutique"
                className="inline-flex items-center gap-2 bg-white text-brand-forest px-8 py-3.5 rounded-full font-semibold hover:bg-brand-sage transition-colors"
                data-testid="unisex-cta"
              >
                Découvrir la gamme
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 16. FIN — Le footer est géré par le layout, rien après ═══ */}
    </div>
  );
}
