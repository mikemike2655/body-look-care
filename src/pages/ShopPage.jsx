import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Star, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';
import medusa from '../lib/medusa';
import { normalizeProduct } from '../lib/medusaUtils';
import usePageMeta from '../hooks/usePageMeta';
import { useBreadcrumbSchema } from '../hooks/useJsonLd';
import { useReveal } from '../hooks/useReveal';

const categories = [
  { id: 'all', name: 'Tout', count: 6 },
  { id: 'drainage', name: 'Drainage', count: 1 },
  { id: 'soins-corps', name: 'Soins Corps', count: 2 },
  { id: 'packs', name: 'Packs', count: 3 }
];

const sortOptions = [
  { value: 'popular', label: 'Populaires' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' }
];

function RevealDiv({ children, className = '', delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function ShopPage() {
  usePageMeta({ title: 'Boutique | Body Look Care', description: 'Découvrez tous les produits Body Look Care.', url: '/boutique' });
  useBreadcrumbSchema([{ name: 'Accueil', url: '/' }, { name: 'Boutique', url: '/boutique' }]);

  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState({});
  const [medusaProducts, setMedusaProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'popular';

  // Fetch products from Medusa
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products } = await medusa.store.product.list({ limit: 50, region_id: 'reg_01KM38KEBWAGY16DWNRPSRHG95' });
        const normalized = (products || []).map(p => {
          const norm = normalizeProduct(p);
          // Merge with local rich content
          const local = productsData[norm.id] || {};
          return { ...local, ...norm };
        });
        setMedusaProducts(normalized);
      } catch (error) {
        console.error('Error fetching products from Medusa:', error);
        // Fallback to local data
        setMedusaProducts(Object.values(productsData));
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...medusaProducts];
    if (currentCategory === 'drainage') result = result.filter(p => p.id === 'le-draineur');
    else if (currentCategory === 'soins-corps') result = result.filter(p => ['miracle-cream', 'relax-et-sommeil'].includes(p.id));
    else if (currentCategory === 'packs') result = result.filter(p => p.id.startsWith('pack-'));

    switch (currentSort) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }
    return result;
  }, [medusaProducts, currentCategory, currentSort]);

  const handleCategoryChange = (id) => {
    const p = new URLSearchParams(searchParams);
    id === 'all' ? p.delete('category') : p.set('category', id);
    setSearchParams(p);
  };

  const handleAddToCart = async (product) => {
    await addToCart(product.id, 1);
    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedProducts(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  return (
    <div className="pb-nav" data-testid="shop-page">
      {/* Hero */}
      <section className="bg-brand-cream pt-6 pb-10 md:pt-8 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-stone mb-8">
            <Link to="/" className="hover:text-brand-forest transition-colors" data-testid="shop-breadcrumb-home">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-charcoal font-medium">Boutique</span>
          </nav>
          <RevealDiv>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal mb-4 tracking-tight">
              La Boutique
            </h1>
            <p className="text-brand-stone text-base md:text-lg max-w-xl leading-relaxed">
              Des soins formulés en France, à base de plantes naturelles. Pour retrouver confiance et légèreté.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* Filters bar */}
      <section className="bg-white sticky top-14 z-20 border-b border-black/[0.04]" data-testid="shop-filters">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-300 ${
                    currentCategory === cat.id
                      ? 'bg-brand-charcoal text-white'
                      : 'text-brand-stone hover:text-brand-charcoal hover:bg-gray-50'
                  }`}
                  data-testid={`shop-category-${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <select
              value={currentSort}
              onChange={(e) => { const p = new URLSearchParams(searchParams); p.set('sort', e.target.value); setSearchParams(p); }}
              className="text-[13px] text-brand-stone border-0 bg-transparent focus:outline-none cursor-pointer pr-6"
              data-testid="shop-sort-select"
            >
              {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-xs uppercase tracking-wider text-brand-stone mb-8" data-testid="shop-results-count">
            {loadingProducts ? 'Chargement...' : `${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''}`}
          </p>

          {loadingProducts ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-brand-cream rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {filteredProducts.map((product, index) => (
                <RevealDiv key={product.id} delay={index * 80}>
                  <div className="product-card group" data-testid={`shop-product-card-${product.id}`}>
                    <Link to={`/produit/${product.id}`} className="block img-zoom" data-testid={`shop-product-link-${product.id}`}>
                      <div className="aspect-square bg-brand-cream relative">
                        {product.badge && (
                          <span className={`absolute top-4 left-4 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-full z-10 ${
                            product.badge === 'Best-seller' ? 'bg-brand-forest text-white' :
                            product.badge === 'Le + populaire' ? 'bg-brand-gold text-white' :
                            product.badge === 'Nouveau' ? 'bg-brand-charcoal text-white' :
                            'bg-red-500 text-white'
                          }`}>
                            {product.badge}
                          </span>
                        )}
                        <img src={product.images[0]} alt={product.name}
                          className="product-img w-full h-full object-contain p-8" loading="lazy" />
                      </div>
                    </Link>

                    <div className="p-5 md:p-6">
                      <Link to={`/produit/${product.id}`} data-testid={`shop-product-name-link-${product.id}`}>
                        <h3 className="text-lg font-semibold text-brand-charcoal mb-0.5 group-hover:text-brand-forest transition-colors duration-300">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-brand-stone mb-3">{product.subtitle}</p>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-[11px] text-brand-stone">{product.rating || 0} ({product.reviewCount || 0})</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-lg font-bold text-brand-charcoal" data-testid={`shop-product-price-${product.id}`}>
                            {product.price.toFixed(2)} €
                          </span>
                          {product.comparePrice && (
                            <span className="ml-2 text-sm text-brand-stone line-through">{product.comparePrice.toFixed(2)} €</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`p-2.5 rounded-full transition-all duration-300 ${
                            addedProducts[product.id]
                              ? 'bg-green-500 text-white scale-110'
                              : 'bg-brand-charcoal text-white hover:bg-brand-forest hover:scale-105'
                          }`}
                          data-testid={`add-to-cart-${product.id}`}
                        >
                          {addedProducts[product.id] ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </RevealDiv>
              ))}
            </div>
          )}

          {!loadingProducts && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-brand-stone mb-4">Aucun produit trouvé.</p>
              <button onClick={() => handleCategoryChange('all')} className="btn-primary px-6 py-2.5 text-sm" data-testid="shop-empty-reset">
                Voir tout
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Conseil */}
      <section className="pb-14">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <RevealDiv>
            <div className="bg-white rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-forest" />
              <p className="text-xs uppercase tracking-widest text-brand-forest font-semibold mb-3">Conseil de Marie-Julie</p>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-4">
                Vous ne savez pas par où commencer ?
              </h2>
              <p className="text-brand-stone mb-6 leading-relaxed">
                Je recommande toujours de commencer par le <strong className="text-brand-charcoal">Pack Découverte</strong>.
                Il contient Le Draineur + Miracle Cream : l'essentiel de mon approche, à prix réduit.
              </p>
              <Link to="/produit/pack-decouverte" className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm" data-testid="shop-pack-decouverte-cta">
                Voir le Pack Découverte <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-brand-forest py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white/90">
            {[
              { label: 'Fabriqué en France', icon: '🇫🇷' },
              { label: '100% Naturel', icon: '🌿' },
              { label: 'Livraison offerte', icon: '🚚' },
              { label: 'Satisfait ou remboursé', icon: '💚' },
            ].map((b, i) => (
              <div key={i} className="space-y-1.5">
                <p className="text-xl">{b.icon}</p>
                <p className="text-xs uppercase tracking-wider font-medium">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
