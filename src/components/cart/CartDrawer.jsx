import React from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, loading } = useCart();

  const shippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - cart.subtotal);
  const hasFreeShipping = cart.subtotal >= shippingThreshold;

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-brand-cream flex flex-col" data-testid="cart-drawer">
        <SheetHeader className="border-b border-brand-sage/20 pb-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-xl">
            <ShoppingBag className="w-5 h-5" />
            Mon panier ({cart.items.length})
          </SheetTitle>
        </SheetHeader>

        {/* Free shipping progress */}
        {cart.items.length > 0 && (
          <div className="py-4 border-b border-brand-sage/20">
            {hasFreeShipping ? (
              <div className="flex items-center gap-2 text-brand-forest text-sm font-medium" data-testid="cart-free-shipping">
                <span className="text-lg">✓</span>
                Livraison offerte !
              </div>
            ) : (
              <>
                <p className="text-sm text-brand-stone mb-2" data-testid="cart-free-shipping-remaining">
                  Plus que <span className="font-semibold text-brand-forest">{formatPrice(remainingForFreeShipping)} TTC</span> pour la livraison gratuite
                </p>
                <div className="h-2 bg-brand-sage/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-forest rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (cart.subtotal / shippingThreshold) * 100)}%` }}
                    data-testid="cart-shipping-progress"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <ShoppingBag className="w-16 h-16 text-brand-sage mb-4" />
              <h3 className="font-serif text-xl mb-2">Votre panier est vide</h3>
              <p className="text-brand-stone text-sm mb-6">
                Découvrez nos soins et trouvez votre routine idéale
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                data-testid="cart-empty-cta"
              >
                Découvrir nos produits
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div 
                  key={item.product_id}
                  className="flex gap-4 bg-white rounded-xl p-3"
                  data-testid={`cart-item-${item.product_id}`}
                >
                  {/* Image */}
                  <Link 
                    to={`/produit/${item.product?.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-24 rounded-lg overflow-hidden bg-brand-cream-alt shrink-0"
                    data-testid={`cart-item-image-link-${item.product_id}`}
                  >
                    <img
                      src={item.product?.images[0]}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </Link>
                  
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/produit/${item.product?.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="font-medium text-sm hover:text-brand-forest transition-colors line-clamp-2"
                      data-testid={`cart-item-name-link-${item.product_id}`}
                    >
                      {item.product?.name}
                    </Link>
                    <p className="text-brand-forest font-semibold mt-1" data-testid={`cart-item-price-${item.product_id}`}>
                      {formatPrice(item.product?.price)} TTC
                    </p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          disabled={loading}
                          className="quantity-btn"
                          aria-label="Diminuer"
                          data-testid={`cart-qty-decrease-${item.product_id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium" data-testid={`cart-qty-${item.product_id}`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={loading}
                          className="quantity-btn"
                          aria-label="Augmenter"
                          data-testid={`cart-qty-increase-${item.product_id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        disabled={loading}
                        className="text-brand-stone hover:text-brand-error transition-colors p-1"
                        aria-label="Supprimer"
                        data-testid={`cart-remove-${item.product_id}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-brand-sage/20 pt-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between" data-testid="cart-subtotal">
              <span className="text-brand-stone">Sous-total</span>
              <span className="font-semibold text-lg">{formatPrice(cart.subtotal)} TTC</span>
            </div>
            
            <p className="text-xs text-brand-stone text-center">
              Frais de livraison calculés à l'étape suivante
            </p>
            
            {/* Actions */}
            <div className="space-y-2">
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="btn-primary w-full flex items-center justify-center gap-2"
                data-testid="checkout-btn"
              >
                Commander
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-secondary w-full"
                data-testid="cart-continue-shopping"
              >
                Continuer mes achats
              </button>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 pt-2 text-xs text-brand-stone">
              <span>🔒 Paiement sécurisé</span>
              <span>📦 Livraison rapide</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
