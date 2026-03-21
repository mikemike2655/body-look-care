import React, { createContext, useContext, useState, useEffect } from 'react';
import medusa from '../lib/medusa';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Check existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { customer } = await medusa.store.customer.retrieve();
        if (customer) {
          setUser({
            id: customer.id,
            email: customer.email,
            first_name: customer.first_name || '',
            last_name: customer.last_name || '',
            created_at: customer.created_at,
            favorites: JSON.parse(localStorage.getItem('blc_favorites') || '[]'),
          });
        }
      } catch (e) {
        // No active session — that's fine
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      await medusa.auth.login('customer', 'emailpass', { email, password });
      const { customer } = await medusa.store.customer.retrieve();
      setUser({
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        created_at: customer.created_at,
        favorites: JSON.parse(localStorage.getItem('blc_favorites') || '[]'),
      });
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || 'Erreur de connexion'
      };
    }
  };

  const register = async (data) => {
    try {
      // 1. Register auth identity
      await medusa.auth.register('customer', 'emailpass', {
        email: data.email,
        password: data.password,
      });

      // 2. Login to get the session
      await medusa.auth.login('customer', 'emailpass', {
        email: data.email,
        password: data.password,
      });

      // 3. Create customer profile
      const { customer } = await medusa.store.customer.create({
        email: data.email,
        first_name: data.first_name || data.firstName || '',
        last_name: data.last_name || data.lastName || '',
      });

      setUser({
        id: customer.id,
        email: customer.email,
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        created_at: customer.created_at,
        favorites: [],
      });
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error?.message || "Erreur lors de l'inscription"
      };
    }
  };

  const logout = async () => {
    try {
      await medusa.auth.logout();
    } catch (e) {
      // ignore
    }
    setUser(null);
  };

  // Favorites stored locally (Medusa has no built-in favorites)
  const toggleFavorite = async (productId) => {
    if (!user) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return { success: false };
    }

    const favorites = user.favorites || [];
    const isFav = favorites.includes(productId);
    const updated = isFav
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];

    localStorage.setItem('blc_favorites', JSON.stringify(updated));
    setUser(prev => ({ ...prev, favorites: updated }));
    return { success: true, action: isFav ? 'removed' : 'added' };
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      toggleFavorite,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode,
      openAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
