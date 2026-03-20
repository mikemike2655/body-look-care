import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import medusa from '../lib/medusa';
import { normalizeProduct } from '../lib/medusaUtils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { cn } from '../lib/utils';
import usePageMeta from '../hooks/usePageMeta';

const skinTypes = ['tous types', 'normale', 'mixte', 'sèche', 'sensible', 'grasse'];
const concerns = ['hydratation', 'anti-âge', 'éclat', 'taches', 'cellulite', 'minceur', 'detox', 'relaxation', 'sommeil'];
const sortOptions = [
  { value: 'popular', label: 'Populaires' },
  { value: 'newest', label: 'Nouveautés' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' }
];

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  usePageMeta({
    title: category ? `${category.name} | Body Look Care` : 'Catégorie | Body Look Care',
    description: category?.description || 'Explorez les soins naturels Body Look Care par catégorie.'
  });

  const [filters, setFilters] = useState({
    skinType: searchParams.get('skin_type') || '',
    concerns: searchParams.getAll('concern') || [],
    sort: searchParams.get('sort') || 'popular'
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch category from Medusa
        const { product_categories } = await medusa.store.productCategory.list({ handle: [slug] });
        const cat = product_categories?.[0];

        if (cat) {
          setCategory({ id: cat.id, name: cat.name, description: cat.description || '' });

          // Fetch products in this category
          const { products: medusaProducts } = await medusa.store.product.list({
            category_id: [cat.id],
            limit: 50,
            region_id: 'reg_01KM38KEBWAGY16DWNRPSRHG95',
          });

          let normalized = (medusaProducts || []).map(normalizeProduct).filter(Boolean);

          // Client-side sorting
          switch (filters.sort) {
            case 'price_asc': normalized.sort((a, b) => a.price - b.price); break;
            case 'price_desc': normalized.sort((a, b) => b.price - a.price); break;
            case 'rating': normalized.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
            case 'newest': normalized.reverse(); break;
            default: break;
          }

          setProducts(normalized);
        } else {
          // Category not found in Medusa
          setCategory(null);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        setCategory(null);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, filters.sort]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));

    // Update URL
    const newParams = new URLSearchParams(searchParams);
    if (value && (!Array.isArray(value) || value.length > 0)) {
      if (Array.isArray(value)) {
        newParams.delete('concern');
        value.forEach(v => newParams.append('concern', v));
      } else {
        newParams.set(key === 'skinType' ? 'skin_type' : key, value);
      }
    } else {
      newParams.delete(key === 'skinType' ? 'skin_type' : key);
    }
    setSearchParams(newParams);
  };

  const toggleConcern = (concern) => {
    const newConcerns = filters.concerns.includes(concern)
      ? filters.concerns.filter(c => c !== concern)
      : [...filters.concerns, concern];
    updateFilter('concerns', newConcerns);
  };

  const clearFilters = () => {
    setFilters({ skinType: '', concerns: [], sort: 'popular' });
    setSearchParams({});
  };

  const activeFiltersCount = (filters.skinType ? 1 : 0) + filters.concerns.length;

  if (!category && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Catégorie non trouvée</h1>
          <Link to="/boutique" className="btn-primary">Voir la boutique</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-nav" data-testid="category-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-sage/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-brand-stone">
            <Link to="/" className="hover:text-brand-forest" data-testid="category-breadcrumb-home">Accueil</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/boutique" className="hover:text-brand-forest" data-testid="category-breadcrumb-shop">Boutique</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-charcoal font-medium">{category?.name || 'Chargement...'}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-2">
            {category?.name}
          </h1>
          <p className="text-brand-stone max-w-2xl">
            {category?.description}
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-[96px] md:top-[112px] z-30 bg-brand-cream border-b border-brand-sage/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile filter button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-brand-sage/30 text-sm font-medium" data-testid="category-mobile-filter-btn">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtrer
                  {activeFiltersCount > 0 && (
                    <span className="w-5 h-5 bg-brand-forest text-white text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-brand-cream">
                <SheetHeader>
                  <SheetTitle className="font-serif">Filtres</SheetTitle>
                </SheetHeader>
                <FilterContent
                  filters={filters}
                  updateFilter={updateFilter}
                  toggleConcern={toggleConcern}
                  clearFilters={clearFilters}
                  onClose={() => setIsFilterOpen(false)}
                />
              </SheetContent>
            </Sheet>

            {/* Desktop filters */}
            <div className="hidden md:flex items-center gap-4">
              {/* Skin type */}
              <Select value={filters.skinType || "all"} onValueChange={(v) => updateFilter('skinType', v === "all" ? '' : v)}>
                <SelectTrigger className="w-40 bg-white" data-testid="category-filter-skin-type">
                  <SelectValue placeholder="Type de peau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous types</SelectItem>
                  {skinTypes.map(type => (
                    <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Concerns dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-brand-sage/30 text-sm" data-testid="category-filter-concerns">
                  Préoccupations
                  {filters.concerns.length > 0 && (
                    <span className="w-5 h-5 bg-brand-forest text-white text-xs rounded-full flex items-center justify-center">
                      {filters.concerns.length}
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-brand-sage/20 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="space-y-2">
                    {concerns.map(concern => (
                      <label key={concern} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={filters.concerns.includes(concern)}
                          onCheckedChange={() => toggleConcern(concern)}
                        />
                        <span className="text-sm capitalize">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-brand-forest hover:underline"
                  data-testid="category-clear-filters"
                >
                  Effacer les filtres
                </button>
              )}
            </div>

            {/* Sort + count */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-brand-stone hidden sm:block">
                {products.length} produit{products.length > 1 ? 's' : ''}
              </span>
              <Select value={filters.sort} onValueChange={(v) => updateFilter('sort', v)}>
                <SelectTrigger className="w-36 bg-white" data-testid="category-sort-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters pills - mobile */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto hide-scrollbar md:hidden">
              {filters.skinType && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-forest/10 text-brand-forest text-sm rounded-full whitespace-nowrap" data-testid="category-filter-pill-skin">
                  {filters.skinType}
                  <button onClick={() => updateFilter('skinType', '')} className="hover:text-brand-error" data-testid="category-filter-pill-skin-remove">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.concerns.map(concern => (
                <span key={concern} className="inline-flex items-center gap-1 px-3 py-1 bg-brand-forest/10 text-brand-forest text-sm rounded-full whitespace-nowrap" data-testid={`category-filter-pill-${concern.replace(/[^a-z0-9]+/gi, '-')}`}>
                  {concern}
                  <button onClick={() => toggleConcern(concern)} className="hover:text-brand-error" data-testid={`category-filter-pill-remove-${concern.replace(/[^a-z0-9]+/gi, '-')}`}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-product bg-white rounded-2xl skeleton" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-brand-stone mb-4">Aucun produit ne correspond à vos critères</p>
            <button onClick={clearFilters} className="btn-secondary" data-testid="category-empty-clear">
              Effacer les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterContent({ filters, updateFilter, toggleConcern, clearFilters, onClose }) {
  return (
    <div className="py-6 space-y-8">
      {/* Skin type */}
      <div>
        <h3 className="font-medium mb-3">Type de peau</h3>
        <div className="space-y-2">
          {skinTypes.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.skinType === type}
                onCheckedChange={(checked) => updateFilter('skinType', checked ? type : '')}
                data-testid={`category-filter-skin-${type.replace(/[^a-z0-9]+/gi, '-')}`}
              />
              <span className="text-sm capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Concerns */}
      <div>
        <h3 className="font-medium mb-3">Préoccupations</h3>
        <div className="space-y-2">
          {concerns.map(concern => (
            <label key={concern} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.concerns.includes(concern)}
                onCheckedChange={() => toggleConcern(concern)}
                data-testid={`category-filter-concern-${concern.replace(/[^a-z0-9]+/gi, '-')}`}
              />
              <span className="text-sm capitalize">{concern}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-brand-sage/20 space-y-3">
        <button onClick={onClose} className="btn-primary w-full" data-testid="category-filter-apply">
          Voir les résultats
        </button>
        <button onClick={clearFilters} className="btn-secondary w-full" data-testid="category-filter-clear">
          Effacer les filtres
        </button>
      </div>
    </div>
  );
}
