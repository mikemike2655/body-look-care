import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import DrainagePage from './pages/DrainagePage';
import FormationsMassagesPage from './pages/FormationsMassagesPage';
import IdeesCadeauxPage from './pages/IdeesCadeauxPage';
import LegalPage from './pages/LegalPage';
import RoutinePage from './pages/RoutinePage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/boutique" element={<ShopPage />} />
                <Route path="/produit/:id" element={<ProductPage />} />
                <Route path="/categorie/:slug" element={<CategoryPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/compte" element={<AccountPage />} />
                <Route path="/recherche" element={<SearchPage />} />
                <Route path="/a-propos" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/drainage" element={<DrainagePage />} />
                <Route path="/formations-massages" element={<FormationsMassagesPage />} />
                <Route path="/idees-cadeaux" element={<IdeesCadeauxPage />} />
                <Route path="/mentions-legales" element={<LegalPage />} />
                <Route path="/ma-routine" element={<RoutinePage />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<AdminLayout />} />
              </Routes>
            </main>
            <Footer />
            <BottomNav />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
