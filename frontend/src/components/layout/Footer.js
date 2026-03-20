import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone, Leaf } from 'lucide-react';
import Logo from '../common/Logo';

export default function Footer() {
  return (
    <footer className="bg-brand-forest text-white pb-20 md:pb-0" data-testid="site-footer">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <Leaf className="w-8 h-8 mx-auto mb-4 text-brand-sage" />
            <h3 className="font-serif text-2xl md:text-3xl mb-3">Rejoignez la communauté</h3>
            <p className="text-white/70 mb-6">
              -10% sur votre première commande + nos conseils beauté exclusifs
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-sage"
                data-testid="newsletter-input"
              />
              <button 
                type="submit" 
                className="px-8 py-3 rounded-full bg-white text-brand-forest font-medium hover:bg-brand-sage transition-colors"
                data-testid="newsletter-submit"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Logo width={140} height={70} variant="light" />
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Drainage lymphatique et soins anti-cellulite naturels. Fabriqué en France, 100% naturel & vegan.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/bodylookcare" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-sage transition-colors" aria-label="Instagram" data-testid="footer-instagram-main">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/bodylookcare.la.gamme" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-sage transition-colors" aria-label="Instagram La Gamme" data-testid="footer-instagram-gamme">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/bodylookcare" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-sage transition-colors" aria-label="Facebook" data-testid="footer-facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Produits */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Produits</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/produit/le-draineur" className="hover:text-white transition-colors" data-testid="footer-product-draineur">Le Draineur</Link></li>
              <li><Link to="/produit/miracle-cream" className="hover:text-white transition-colors" data-testid="footer-product-miracle-cream">Miracle Cream</Link></li>
              <li><Link to="/produit/relax-et-sommeil" className="hover:text-white transition-colors" data-testid="footer-product-relax-sommeil">Relax & Sommeil</Link></li>
              <li><Link to="/categorie/packs" className="hover:text-white transition-colors" data-testid="footer-product-packs">Packs & Promotions</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Aide</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/drainage-lymphatique" className="hover:text-white transition-colors" data-testid="footer-help-drainage">Guide Drainage</Link></li>
              <li><Link to="/livraison" className="hover:text-white transition-colors" data-testid="footer-help-livraison">Livraison</Link></li>
              <li><Link to="/retours" className="hover:text-white transition-colors" data-testid="footer-help-retours">Retours & Remboursements</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors" data-testid="footer-help-faq">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors" data-testid="footer-help-contact">Nous contacter</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-white/70" data-testid="footer-contact-list">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Metz • Luxembourg • Paris</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:contact@bodylookcare.com" className="hover:text-white transition-colors" data-testid="footer-contact-email">
                  contact@bodylookcare.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+33123456789" className="hover:text-white transition-colors" data-testid="footer-contact-phone">
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© 2026 Body Look Care | Fabrication française | Soins naturels & drainage lymphatique</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-white transition-colors" data-testid="footer-legal-mentions">Mentions légales</Link>
            <Link to="/cgv" className="hover:text-white transition-colors" data-testid="footer-legal-cgv">CGV</Link>
            <Link to="/confidentialite" className="hover:text-white transition-colors" data-testid="footer-legal-confidentialite">Confidentialité</Link>
            <Link to="/politique-cookies" className="hover:text-white transition-colors" data-testid="footer-legal-cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
