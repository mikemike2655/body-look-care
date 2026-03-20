import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';
import CartDrawer from './components/cart/CartDrawer';
import AuthModal from './components/auth/AuthModal';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import RoutinePage from './pages/RoutinePage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import DrainagePage from './pages/DrainagePage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import FormationsMassagesPage from './pages/FormationsMassagesPage';
import IdeesCadeauxPage from './pages/IdeesCadeauxPage';
import LegalPage from './pages/LegalPage';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminPages from './pages/admin/AdminPages';
import AdminMedia from './pages/admin/AdminMedia';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminContent from './pages/admin/AdminContent';

import './App.css';

// Layout wrapper for pages that need header/footer
function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <CartDrawer />
      <AuthModal />
    </>
  );
}

// Checkout has its own layout (no header/footer/bottom nav)
function CheckoutLayout({ children }) {
  return (
    <>
      {children}
      <CartDrawer />
      <AuthModal />
    </>
  );
}

// Admin guard
function AdminGuard({ children }) {
  const { admin, loading } = useAdmin();
  if (loading) return <div className="min-h-screen bg-[#0f1117] flex items-center justify-center"><div className="text-gray-500">Chargement...</div></div>;
  if (!admin) return <AdminLogin />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AdminProvider>
            <Routes>
              {/* Admin */}
              <Route path="/admin/*" element={
                <AdminGuard>
                  <Routes>
                    <Route element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="content" element={<AdminContent />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="orders" element={<AdminOrders />} />
                      <Route path="pages" element={<AdminPages />} />
                      <Route path="media" element={<AdminMedia />} />
                      <Route path="users" element={<AdminUsers />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Route>
                  </Routes>
                </AdminGuard>
              } />
              
              {/* Checkout - special layout */}
              <Route 
              path="/checkout" 
              element={
                <CheckoutLayout>
                  <CheckoutPage />
                </CheckoutLayout>
              } 
            />
            
            {/* All other pages - main layout */}
            <Route 
              path="/*" 
              element={
                <MainLayout>
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="boutique" element={<ShopPage />} />
                    <Route path="categorie/:slug" element={<CategoryPage />} />
                    <Route path="produit/:slug" element={<ProductPage />} />
                    <Route path="routine" element={<RoutinePage />} />
                    <Route path="compte/*" element={<AccountPage />} />
                    <Route path="recherche" element={<SearchPage />} />
                    
                    {/* Static pages - placeholder */}
                    <Route path="a-propos" element={<AboutPage />} />
                    <Route path="drainage-lymphatique" element={<DrainagePage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="formations-massages" element={<FormationsMassagesPage />} />
                    <Route path="idees-cadeaux" element={<IdeesCadeauxPage />} />
                    <Route path="mentions-legales" element={<LegalPage />} />
                    <Route path="confidentialite" element={<LegalPage />} />
                    <Route path="politique-cookies" element={<LegalPage />} />
                    <Route path="livraison" element={<StaticPage title="Livraison" />} />
                    <Route path="retours" element={<StaticPage title="Retours & Remboursements" />} />
                    <Route path="faq" element={<FAQPage />} />
                    <Route path="cgv" element={<StaticPage title="CGV" />} />
                    
                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </MainLayout>
              } 
            />
          </Routes>
          <Toaster position="top-center" />
          </AdminProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Placeholder for static pages
function StaticPage({ title }) {
  return (
    <div className="pb-nav">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <h1 className="font-serif text-3xl text-brand-charcoal mb-6">{title}</h1>
        <div className="prose max-w-none text-brand-stone">
          <p>Contenu de la page {title} à venir.</p>
        </div>
      </div>
    </div>
  );
}

// 404 Page
function NotFoundPage() {
  return (
    <div className="pb-nav min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-brand-forest mb-4">404</h1>
        <p className="text-brand-stone text-lg mb-6">Page non trouvée</p>
        <a href="/" className="btn-primary">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

export default App;
