import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import BottomNav from './components/layout/BottomNav.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FAQPage from './pages/FAQPage.jsx';
import DrainagePage from './pages/DrainagePage.jsx';
import FormationsMassagesPage from './pages/FormationsMassagesPage.jsx';
import IdeesCadeauxPage from './pages/IdeesCadeauxPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import RoutinePage from './pages/RoutinePage.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';

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
