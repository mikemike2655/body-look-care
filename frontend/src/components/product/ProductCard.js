import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, cn } from '../../lib/utils';

export default function ProductCard({ product, className }) {
  const { addToCart, loading } = useCart();
  const { user, toggleFavorite } = useAuth();
  
  const isFavorite = user?.favorites?.includes(product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(product.id);
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavorite(product.id);
  };

  const getBadgeClass = () => {
    switch (product.badge) {
      case 'bestseller': return 'badge-bestseller';
      case 'new': return 'badge-new';
      case 'promo': return 'badge-promo';
      default: return '';
    }
  };

  const getBadgeText = () => {
    switch (product.badge) {
      case 'bestseller': return 'Best-seller';
      case 'new': return 'Nouveau';
      case 'promo': return 'Promo';
      default: return '';
    }
  };

  return (
    <Link 
      to={`/produit/${product.slug}`}
      className={cn("card-product block", className)}
      data-testid={`product-card-${product.id}`}
    >
      {/* Image container */}
      <div className="relative aspect-product overflow-hidden bg-brand-cream-alt">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={cn("absolute top-3 left-3", getBadgeClass())}>
            {getBadgeText()}
          </span>
        )}
        
        {/* Favorite button */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isFavorite 
              ? "bg-brand-forest text-white" 
              : "bg-white/80 text-brand-charcoal hover:bg-white"
          )}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          data-testid={`favorite-btn-${product.id}`}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </button>
        
        {/* Quick add button - visible on hover desktop */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="absolute bottom-3 left-3 right-3 py-2.5 bg-brand-forest text-white rounded-full font-medium text-sm
                     opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                     transition-all duration-300 hover:bg-brand-forest/90 hidden md:flex items-center justify-center gap-2"
          data-testid={`quick-add-btn-${product.id}`}
        >
          <ShoppingBag className="w-4 h-4" />
          Ajouter au panier
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
          <span className="text-sm text-brand-charcoal font-medium">{product.rating}</span>
          <span className="text-xs text-brand-stone">({product.reviews_count})</span>
        </div>
        
        {/* Name */}
        <h3 className="font-medium text-brand-charcoal line-clamp-2 mb-1 group-hover:text-brand-forest transition-colors">
          {product.name}
        </h3>
        
        {/* Short description */}
        <p className="text-sm text-brand-stone line-clamp-1 mb-3">
          {product.short_description}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="price-current text-lg" data-testid={`product-card-price-${product.id}`}>
            {formatPrice(product.price)} TTC
          </span>
          {product.compare_at_price && (
            <span className="price-compare" data-testid={`product-card-compare-${product.id}`}>
              {formatPrice(product.compare_at_price)} TTC
            </span>
          )}
        </div>
        
        {/* Mobile add button */}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full mt-3 py-2.5 bg-brand-forest text-white rounded-full font-medium text-sm
                     hover:bg-brand-forest/90 transition-colors md:hidden flex items-center justify-center gap-2"
          data-testid={`mobile-add-btn-${product.id}`}
        >
          <ShoppingBag className="w-4 h-4" />
          Ajouter
        </button>
      </div>
    </Link>
  );
}
