import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Sparkles, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Shop', href: '/boutique', icon: Grid3X3 },
  { name: 'Routine', href: '/routine', icon: Sparkles },
  { name: 'Panier', href: '#cart', icon: ShoppingBag, isCart: true },
  { name: 'Compte', href: '/compte', icon: User, requiresAuth: true },
];

export default function BottomNav() {
  const location = useLocation();
  const { cartItemsCount, setIsCartOpen } = useCart();
  const { user, openAuthModal } = useAuth();

  const handleNavClick = (item, e) => {
    if (item.isCart) {
      e.preventDefault();
      setIsCartOpen(true);
    } else if (item.requiresAuth && !user) {
      e.preventDefault();
      openAuthModal();
    }
  };

  // Hide on checkout pages
  if (location.pathname.startsWith('/checkout')) {
    return null;
  }

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-effect border-t border-brand-sage/20 safe-area-bottom"
      data-testid="bottom-nav"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href === '/boutique' && location.pathname.startsWith('/categorie'));
          
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => handleNavClick(item, e)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full relative transition-colors",
                isActive ? "text-brand-forest" : "text-brand-stone"
              )}
              data-testid={`bottom-nav-${item.name.toLowerCase()}`}
            >
              <div className="relative">
                <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5]")} />
                {item.isCart && cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-brand-error text-white text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="bottom-nav-cart-count">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] mt-1 font-medium",
                isActive && "font-semibold"
              )}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand-forest rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
