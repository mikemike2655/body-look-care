import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (authMode === 'login') {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData);
    }

    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-md bg-brand-cream" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center">
            {authMode === 'login' ? 'Connexion' : 'Créer un compte'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {authMode === 'register' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">Prénom</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  required
                  className="mt-1"
                  data-testid="first-name-input"
                />
              </div>
              <div>
                <Label htmlFor="last_name">Nom</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                  className="mt-1"
                  data-testid="last-name-input"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
              data-testid="email-input"
            />
          </div>

          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
                className="pr-10"
                data-testid="password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-stone hover:text-brand-charcoal"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-brand-error text-sm" data-testid="auth-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
            data-testid="auth-submit"
          >
            {loading ? 'Chargement...' : authMode === 'login' ? 'Se connecter' : 'Créer mon compte'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-brand-stone text-sm">
            {authMode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}
            <button
              onClick={switchMode}
              className="ml-1 text-brand-forest font-medium hover:underline"
              data-testid="switch-auth-mode"
            >
              {authMode === 'login' ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>

        {authMode === 'register' && (
          <p className="text-xs text-brand-stone text-center mt-4">
            En créant un compte, vous acceptez nos{' '}
            <a href="/cgv" className="underline">CGV</a> et notre{' '}
            <a href="/confidentialite" className="underline">Politique de confidentialité</a>
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
