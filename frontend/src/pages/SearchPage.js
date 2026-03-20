import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import medusa from '../lib/medusa';
import { normalizeProduct } from '../lib/medusaUtils';
import usePageMeta from '../hooks/usePageMeta';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  usePageMeta({
    title: query ? `Recherche "${query}" | Body Look Care` : 'Recherche | Body Look Care',
    description: 'Recherchez un produit Body Look Care et trouvez votre routine idéale.'
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { products } = await medusa.store.product.list({ q: query, region_id: 'reg_01KM38KEBWAGY16DWNRPSRHG95' });
        setResults((products || []).map(normalizeProduct).filter(Boolean));
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  return (
    <div className="pb-nav" data-testid="search-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-sage/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-brand-stone">
            <Link to="/" className="hover:text-brand-forest" data-testid="search-breadcrumb-home">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-charcoal font-medium">Recherche</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-brand-charcoal mb-2">
            {query ? `Résultats pour "${query}"` : 'Rechercher'}
          </h1>
          {query && !loading && (
            <p className="text-brand-stone" data-testid="search-results-count">
              {results.length} produit{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-product bg-white rounded-2xl skeleton" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-brand-sage mx-auto mb-4" />
            <h2 className="font-serif text-xl mb-2">Aucun résultat</h2>
            <p className="text-brand-stone mb-6">
              {query
                ? `Nous n'avons pas trouvé de produits correspondant à "${query}"`
                : 'Entrez un terme de recherche pour trouver des produits'
              }
            </p>
            <Link to="/boutique" className="btn-primary" data-testid="search-shop-link">
              Voir tous les produits
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
