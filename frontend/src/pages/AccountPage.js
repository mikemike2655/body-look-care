import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { User, Package, Heart, LogOut, ChevronRight, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/product/ProductCard';
import medusa from '../lib/medusa';
import { normalizeOrder, normalizeProduct } from '../lib/medusaUtils';
import { formatPrice, cn } from '../lib/utils';

const menuItems = [
  { name: 'Mon profil', href: '/compte', icon: User },
  { name: 'Mes commandes', href: '/compte/commandes', icon: Package },
  { name: 'Mes favoris', href: '/compte/favoris', icon: Heart }
];

export default function AccountPage() {
  const { user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      openAuthModal('login');
    }
  }, [user, openAuthModal]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-stone mb-4">Veuillez vous connecter pour accéder à votre compte</p>
          <button onClick={() => openAuthModal('login')} className="btn-primary">
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-nav" data-testid="account-page">
      <div className="bg-white border-b border-brand-sage/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <h1 className="font-serif text-3xl text-brand-charcoal mb-2">
            Bonjour, {user.first_name} 👋
          </h1>
          <p className="text-brand-stone">Gérez votre compte et vos commandes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="bg-white rounded-xl p-4 shadow-sm">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                          isActive
                            ? "bg-brand-forest/10 text-brand-forest"
                            : "text-brand-charcoal hover:bg-brand-sage/10"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-brand-error hover:bg-brand-error/5 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Se déconnecter
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <main className="md:col-span-3">
            <Routes>
              <Route index element={<ProfileSection user={user} />} />
              <Route path="commandes" element={<OrdersSection />} />
              <Route path="favoris" element={<FavoritesSection user={user} />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({ user }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl mb-6">Informations personnelles</h2>

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-brand-stone">Prénom</label>
            <p className="font-medium">{user.first_name}</p>
          </div>
          <div>
            <label className="text-sm text-brand-stone">Nom</label>
            <p className="font-medium">{user.last_name}</p>
          </div>
        </div>
        <div>
          <label className="text-sm text-brand-stone">Email</label>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <label className="text-sm text-brand-stone">Membre depuis</label>
          <p className="font-medium">{new Date(user.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</p>
        </div>
      </div>
    </div>
  );
}

function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { orders: medusaOrders } = await medusa.store.order.list();
        setOrders((medusaOrders || []).map(normalizeOrder).filter(Boolean));
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="bg-white rounded-xl p-6 shadow-sm"><p>Chargement...</p></div>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl mb-6">Mes commandes</h2>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-brand-sage mx-auto mb-4" />
          <p className="text-brand-stone mb-4">Vous n'avez pas encore passé de commande</p>
          <Link to="/boutique" className="btn-primary">
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-brand-sage/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-mono text-sm text-brand-stone">{order.order_number}</p>
                  <p className="text-sm text-brand-stone">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-brand-forest" data-testid={`account-order-total-${order.id}`}>
                    {formatPrice(order.total)} TTC
                  </p>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    order.status === 'pending' && "bg-yellow-100 text-yellow-700",
                    order.status === 'confirmed' && "bg-green-100 text-green-700",
                    order.status === 'shipped' && "bg-blue-100 text-blue-700"
                  )}>
                    {order.status === 'pending' && 'En attente'}
                    {order.status === 'confirmed' && 'Confirmée'}
                    {order.status === 'shipped' && 'Expédiée'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {order.items.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden bg-brand-cream-alt shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="w-16 h-16 rounded-lg bg-brand-sage/20 flex items-center justify-center shrink-0 text-sm text-brand-stone">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FavoritesSection({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = user.favorites || [];
        if (favorites.length > 0) {
          // Fetch all products from Medusa and filter by favorites (handles)
          const { products: medusaProducts } = await medusa.store.product.list({ limit: 50, region_id: 'reg_01KM38KEBWAGY16DWNRPSRHG95' });
          const normalized = (medusaProducts || [])
            .map(normalizeProduct)
            .filter(p => p && favorites.includes(p.id));
          setProducts(normalized);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user.favorites]);

  if (loading) {
    return <div className="bg-white rounded-xl p-6 shadow-sm"><p>Chargement...</p></div>;
  }

  return (
    <div>
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="font-serif text-xl">Mes favoris</h2>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl p-6 shadow-sm text-center py-8">
          <Heart className="w-12 h-12 text-brand-sage mx-auto mb-4" />
          <p className="text-brand-stone mb-4">Vous n'avez pas encore de favoris</p>
          <Link to="/boutique" className="btn-primary">
            Découvrir nos produits
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
