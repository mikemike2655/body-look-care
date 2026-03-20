import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, User, Heart, ArrowRight, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const navLinks = [
  { name: 'Boutique', href: '/boutique' },
  { name: 'Formation', href: '/formations-massages' },
  { name: 'Idées cadeaux', href: '/idees-cadeaux' },
  { name: 'Mon histoire', href: '/a-propos' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItemsCount, setIsCartOpen } = useCart();
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 200 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsMenuOpen(false); setIsSearchOpen(false); }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'header-scrolled' : ''}`}
        data-testid="main-header"
      >
        {/* Promo banner */}
        <div className={`bg-brand-forest overflow-hidden transition-all duration-500 ${scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'}`}>
          <div className="h-9 flex items-center justify-center gap-6 text-white/90 whitespace-nowrap animate-marquee-container" data-testid="promo-banner">
            <span className="text-xs tracking-[0.15em] uppercase font-medium">Livraison offerte en France</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-xs tracking-[0.15em] uppercase font-medium">100% Naturel & Vegan</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-xs tracking-[0.15em] uppercase font-medium">Satisfait ou remboursé 30 jours</span>
          </div>
        </div>

        {/* Main header bar */}
        <div className={`transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-[0_1px_20px_rgba(0,0,0,0.06)] border-b border-black/[0.04]'
            : 'bg-white/80 backdrop-blur-xl border-b border-brand-sage/10'
        }`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20 md:h-[85px]'}`}>

              {/* Left: mobile menu + nav */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="lg:hidden p-2 -ml-2 text-brand-charcoal/70 hover:text-brand-charcoal transition-colors"
                  aria-label="Menu"
                  data-testid="mobile-menu-btn"
                >
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                </button>

                <nav className="hidden lg:flex items-center gap-7 mr-24" data-testid="desktop-nav">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="nav-link group relative text-[13px] tracking-[0.04em] uppercase text-brand-charcoal/70 hover:text-brand-charcoal font-medium transition-colors duration-300"
                      data-testid={`nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-forest group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Center: Logo */}
              <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center" data-testid="logo-link">
                <Logo width={scrolled ? 130 : 160} height={scrolled ? 65 : 80} variant="dark" className="transition-all duration-500" />
              </Link>

              {/* Right: Actions */}
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="header-action-btn"
                  aria-label="Rechercher"
                  data-testid="search-btn"
                >
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>

                <button
                  onClick={() => user ? navigate('/compte/favoris') : openAuthModal()}
                  className="header-action-btn hidden sm:flex"
                  aria-label="Favoris"
                  data-testid="favorites-btn"
                >
                  <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>

                <button
                  onClick={() => user ? navigate('/compte') : openAuthModal()}
                  className="header-action-btn"
                  aria-label="Compte"
                  data-testid="account-btn"
                >
                  <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="header-action-btn relative"
                  aria-label="Panier"
                  data-testid="cart-btn"
                >
                  <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  {cartItemsCount > 0 && (
                    <span className="cart-badge" data-testid="cart-count">
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className={`transition-all duration-500 ${scrolled ? 'h-14' : 'h-[100px] md:h-[106px]'}`} />

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-400 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[320px] max-w-[85vw] bg-white transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Logo width={90} height={45} variant="dark" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer"
              data-testid="mobile-menu-close-btn"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="p-5 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center justify-between py-3.5 px-3 text-brand-charcoal/80 hover:text-brand-charcoal hover:bg-gray-50 rounded-lg text-[15px] font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
                data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
                <ChevronRight className="w-4 h-4 text-gray-300" strokeWidth={1.5} />
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
              {[
                { name: 'Guide Drainage', href: '/drainage-lymphatique', testId: 'mobile-nav-guide-drainage' },
                { name: 'Contact', href: '/contact', testId: 'mobile-nav-contact' },
                { name: 'FAQ', href: '/faq', testId: 'mobile-nav-faq' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center justify-between py-3 px-3 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-gray-50 rounded-lg text-sm transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={link.testId}
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-gray-200" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile menu footer CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100 bg-gray-50/50">
            <Link
              to="/boutique"
              className="flex items-center justify-center gap-2 w-full bg-brand-forest text-white rounded-full py-3 text-sm font-medium hover:bg-brand-forest/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Découvrir la boutique
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
        <div className={`absolute top-0 left-0 right-0 bg-white shadow-2xl transition-transform duration-500 ease-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-2xl mx-auto p-6 md:p-10">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-stone/50" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full pl-14 pr-14 py-4 bg-gray-50 rounded-full border border-gray-200 focus:border-brand-forest/40 focus:bg-white outline-none text-base transition-all duration-300"
                autoFocus={isSearchOpen}
                data-testid="search-input"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fermer"
                data-testid="search-close-btn"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs text-brand-stone/60 uppercase tracking-wider mr-1 self-center">Populaire</span>
              {['Le Draineur', 'Miracle Cream', 'Packs'].map((term) => (
                <button
                  key={term}
                  onClick={() => { setSearchQuery(term); }}
                  className="px-4 py-1.5 bg-gray-50 hover:bg-brand-forest/5 border border-gray-200 hover:border-brand-forest/30 rounded-full text-xs text-brand-charcoal/70 hover:text-brand-forest transition-all duration-200"
                  data-testid={`popular-search-${term.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
