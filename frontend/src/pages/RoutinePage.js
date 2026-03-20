import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Check, ShoppingBag, Loader2 } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const skinTypes = [
  { value: 'normale', label: 'Normale', description: 'Peau équilibrée, peu de problèmes' },
  { value: 'sèche', label: 'Sèche', description: 'Tiraillements, manque de confort' },
  { value: 'mixte', label: 'Mixte', description: 'Zone T grasse, joues sèches' },
  { value: 'grasse', label: 'Grasse', description: 'Brillances, pores dilatés' },
  { value: 'sensible', label: 'Sensible', description: 'Réactivité, rougeurs fréquentes' }
];

const concernsOptions = [
  { value: 'hydratation', label: 'Hydratation', icon: '💧' },
  { value: 'éclat', label: 'Éclat & Teint', icon: '✨' },
  { value: 'anti-âge', label: 'Anti-âge', icon: '🌸' },
  { value: 'taches', label: 'Taches', icon: '🔵' },
  { value: 'cellulite', label: 'Cellulite', icon: '🍊' },
  { value: 'minceur', label: 'Minceur', icon: '⚡' },
  { value: 'detox', label: 'Détox', icon: '🌿' },
  { value: 'relaxation', label: 'Relaxation', icon: '🧘' },
  { value: 'sommeil', label: 'Sommeil', icon: '🌙' }
];

const budgetOptions = [
  { value: 'economique', label: 'Économique', description: 'Moins de 30€' },
  { value: 'moyen', label: 'Moyen', description: '30€ - 60€' },
  { value: 'premium', label: 'Premium', description: 'Plus de 60€' }
];

export default function RoutinePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [step, setStep] = useState(0); // 0: intro, 1: skin type, 2: concerns, 3: budget, 4: results
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    skinType: '',
    concerns: [],
    budget: ''
  });

  const toggleConcern = (value) => {
    setFormData(prev => ({
      ...prev,
      concerns: prev.concerns.includes(value)
        ? prev.concerns.filter(c => c !== value)
        : prev.concerns.length < 3 ? [...prev.concerns, value] : prev.concerns
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/routine-assistant`, {
        skin_type: formData.skinType,
        concerns: formData.concerns,
        budget: formData.budget
      });
      
      setResult(response.data);
      
      // Fetch recommended products
      if (response.data.recommended_products.length > 0) {
        const products = await Promise.all(
          response.data.recommended_products.slice(0, 4).map(async (id) => {
            try {
              const res = await axios.get(`${API}/products`);
              return res.data.find(p => p.id === id);
            } catch {
              return null;
            }
          })
        );
        setRecommendedProducts(products.filter(Boolean));
      }
      
      // If no products from API, fetch some based on concerns
      if (recommendedProducts.length === 0) {
        const params = new URLSearchParams();
        formData.concerns.forEach(c => params.append('concern', c));
        const res = await axios.get(`${API}/products?${params.toString()}&limit=4`);
        setRecommendedProducts(res.data);
      }
      
      setStep(4);
    } catch (error) {
      console.error('Error getting routine:', error);
      // Fallback - show some products anyway
      const res = await axios.get(`${API}/products?limit=4`);
      setRecommendedProducts(res.data);
      setResult({
        message: `Voici une routine personnalisée pour votre peau ${formData.skinType}`,
        routine_steps: [
          { step: 1, name: 'Nettoyage', description: 'Nettoyez votre peau matin et soir' },
          { step: 2, name: 'Traitement', description: 'Appliquez vos soins ciblés' },
          { step: 3, name: 'Hydratation', description: 'Hydratez et protégez votre peau' }
        ]
      });
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const addAllToCart = async () => {
    for (const product of recommendedProducts) {
      await addToCart(product.id);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.skinType !== '';
      case 2: return formData.concerns.length > 0;
      case 3: return formData.budget !== '';
      default: return true;
    }
  };

  const nextStep = () => {
    if (step === 3) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen pb-nav" data-testid="routine-page">
      {/* Progress bar */}
      {step > 0 && step < 4 && (
        <div className="bg-white border-b border-brand-sage/10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-brand-stone">Étape {step}/3</span>
              <span className="text-brand-forest font-medium">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-2 bg-brand-sage/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-forest rounded-full transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* Intro */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-brand-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-brand-forest" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
                Trouvez votre routine idéale
              </h1>
              <p className="text-brand-stone text-lg mb-8 max-w-md mx-auto">
                Répondez à quelques questions et découvrez les produits parfaits pour votre peau et vos objectifs.
              </p>
              <button
                onClick={() => setStep(1)}
                className="btn-primary inline-flex items-center gap-2"
                data-testid="start-routine"
              >
                Commencer le diagnostic
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-sm text-brand-stone mt-6">⏱️ Moins de 2 minutes</p>
            </motion.div>
          )}

          {/* Step 1: Skin Type */}
          {step === 1 && (
            <motion.div
              key="skin-type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-2 text-center">
                Quel est votre type de peau ?
              </h2>
              <p className="text-brand-stone text-center mb-8">
                Choisissez celui qui correspond le mieux à votre peau
              </p>
              
              <div className="space-y-3">
                {skinTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFormData({ ...formData, skinType: type.value })}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      formData.skinType === type.value
                        ? "border-brand-forest bg-brand-forest/5"
                        : "border-brand-sage/30 hover:border-brand-sage"
                    )}
                    data-testid={`skin-type-${type.value}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-brand-charcoal">{type.label}</p>
                        <p className="text-sm text-brand-stone">{type.description}</p>
                      </div>
                      {formData.skinType === type.value && (
                        <Check className="w-5 h-5 text-brand-forest" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Concerns */}
          {step === 2 && (
            <motion.div
              key="concerns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-2 text-center">
                Quelles sont vos préoccupations ?
              </h2>
              <p className="text-brand-stone text-center mb-8">
                Sélectionnez jusqu'à 3 préoccupations
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                {concernsOptions.map((concern) => (
                  <button
                    key={concern.value}
                    onClick={() => toggleConcern(concern.value)}
                    disabled={!formData.concerns.includes(concern.value) && formData.concerns.length >= 3}
                    className={cn(
                      "p-4 rounded-xl border-2 text-center transition-all",
                      formData.concerns.includes(concern.value)
                        ? "border-brand-forest bg-brand-forest/5"
                        : "border-brand-sage/30 hover:border-brand-sage disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    data-testid={`concern-${concern.value}`}
                  >
                    <span className="text-2xl mb-2 block">{concern.icon}</span>
                    <p className="text-sm font-medium text-brand-charcoal">{concern.label}</p>
                  </button>
                ))}
              </div>
              
              <p className="text-sm text-brand-stone text-center mt-4">
                {formData.concerns.length}/3 sélectionnées
              </p>
            </motion.div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <motion.div
              key="budget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-2 text-center">
                Quel est votre budget ?
              </h2>
              <p className="text-brand-stone text-center mb-8">
                Pour vous proposer la meilleure sélection
              </p>
              
              <div className="space-y-3">
                {budgetOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, budget: option.value })}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      formData.budget === option.value
                        ? "border-brand-forest bg-brand-forest/5"
                        : "border-brand-sage/30 hover:border-brand-sage"
                    )}
                    data-testid={`budget-${option.value}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-brand-charcoal">{option.label}</p>
                        <p className="text-sm text-brand-stone">{option.description}</p>
                      </div>
                      {formData.budget === option.value && (
                        <Check className="w-5 h-5 text-brand-forest" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {step === 4 && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-2">
                  Votre routine personnalisée
                </h2>
                <p className="text-brand-stone">{result.message}</p>
              </div>

              {/* Routine steps */}
              <div className="bg-brand-cream-alt rounded-xl p-6 mb-8">
                <h3 className="font-serif text-lg mb-4">Votre routine en {result.routine_steps.length} étapes</h3>
                <div className="space-y-4">
                  {result.routine_steps.map((routineStep, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center font-medium shrink-0">
                        {routineStep.step}
                      </div>
                      <div>
                        <p className="font-medium text-brand-charcoal">{routineStep.name}</p>
                        <p className="text-sm text-brand-stone">{routineStep.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended products */}
              {recommendedProducts.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-serif text-lg mb-4">Produits recommandés pour vous</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {recommendedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  
                  <button
                    onClick={addAllToCart}
                    className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
                    data-testid="add-all-routine"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Ajouter toute la routine
                  </button>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={() => { setStep(0); setFormData({ skinType: '', concerns: [], budget: '' }); setResult(null); }}
                  className="text-brand-forest hover:underline"
                >
                  Recommencer le diagnostic
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        {step > 0 && step < 4 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-sage/20">
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-brand-stone hover:text-brand-forest transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
            
            <button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="next-step"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : step === 3 ? (
                <>
                  Voir ma routine
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continuer
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
