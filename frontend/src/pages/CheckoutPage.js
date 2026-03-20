import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Lock, Truck, CreditCard, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import medusa from '../lib/medusa';
import { formatPrice, cn } from '../lib/utils';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import usePageMeta from '../hooks/usePageMeta';

export default function CheckoutPage() {
  usePageMeta({
    title: 'Checkout | Body Look Care',
    description: 'Finalisez votre commande Body Look Care en toute sécurité.'
  });

  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1); // 1: info, 2: payment, 3: confirmation
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    paymentMethod: 'card'
  });

  const shipping = cart.subtotal >= 50 ? 0 : 4.90;
  const total = cart.subtotal + shipping;

  useEffect(() => {
    if (cart.items.length === 0 && !order) {
      navigate('/');
    }
  }, [cart.items.length, order, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cartId = cart.id;
      if (!cartId) throw new Error('No cart found');

      // Step 1: Update cart with email and shipping address
      await medusa.store.cart.update(cartId, {
        email: formData.email,
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          country_code: 'fr',
          phone: formData.phone,
        },
        billing_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          country_code: 'fr',
        },
      });

      // Step 2: Add shipping method
      const { shipping_options } = await medusa.store.fulfillment.listCartOptions({ cart_id: cartId });
      if (shipping_options?.length) {
        await medusa.store.cart.addShippingMethod(cartId, {
          option_id: shipping_options[0].id,
        });
      }

      // Step 3: Initialize payment session (auto-creates payment collection)
      const { cart: freshCart } = await medusa.store.cart.retrieve(cartId);
      await medusa.store.payment.initiatePaymentSession(freshCart, {
        provider_id: 'pp_system_default',
      });

      // Step 4: Complete the cart (creates the order)
      const { type, order: completedOrder } = await medusa.store.cart.complete(cartId);

      if (type === 'order' && completedOrder) {
        const normalizedOrder = {
          id: completedOrder.id,
          order_number: completedOrder.display_id ? `#${completedOrder.display_id}` : completedOrder.id,
          email: completedOrder.email || formData.email,
          subtotal: (completedOrder.subtotal || 0) / 100,
          shipping: (completedOrder.shipping_total || 0) / 100,
          total: (completedOrder.total || 0) / 100,
        };
        setOrder(normalizedOrder);
        setStep(3);
        // Clear the cart ID since it's been completed
        localStorage.removeItem('medusa_cart_id');
        await fetchCart();
      } else {
        throw new Error('Order completion failed');
      }

      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Confirmation page
  if (step === 3 && order) {
    return (
      <div className="min-h-screen bg-white py-12 md:py-20" data-testid="checkout-confirmation">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl text-brand-charcoal mb-3">
            Merci pour votre commande !
          </h1>
          <p className="text-brand-stone mb-6">
            Un email de confirmation a été envoyé à <strong>{order.email}</strong>
          </p>

          <div className="bg-brand-cream rounded-xl p-6 text-left mb-8" data-testid="checkout-confirmation-summary">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-brand-sage/20" data-testid="checkout-confirmation-order-number">
              <span className="text-brand-stone">Numéro de commande</span>
              <span className="font-mono font-medium">{order.order_number}</span>
            </div>
            <div className="flex items-center justify-between mb-2" data-testid="checkout-confirmation-subtotal">
              <span className="text-brand-stone">Sous-total</span>
              <span>{formatPrice(order.subtotal)} TTC</span>
            </div>
            <div className="flex items-center justify-between mb-2" data-testid="checkout-confirmation-shipping">
              <span className="text-brand-stone">Livraison</span>
              <span>{order.shipping === 0 ? 'Offerte' : `${formatPrice(order.shipping)} TTC`}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-brand-sage/20 font-semibold" data-testid="checkout-confirmation-total">
              <span>Total</span>
              <span className="text-brand-forest">{formatPrice(order.total)} TTC</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/boutique" className="btn-primary w-full flex items-center justify-center gap-2" data-testid="checkout-continue-shopping">
              Continuer mes achats
            </Link>
            {user && (
              <Link to="/compte/commandes" className="btn-secondary w-full" data-testid="checkout-view-orders">
                Voir mes commandes
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream" data-testid="checkout-page">
      {/* Header */}
      <header className="bg-white border-b border-brand-sage/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-serif text-xl font-semibold text-brand-charcoal" data-testid="checkout-logo-link">
              BODY<span className="font-normal"> LOOK CARE</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-brand-stone">
              <Lock className="w-4 h-4" />
              Paiement sécurisé
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-brand-sage/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className={cn(
              "flex items-center gap-2",
              step >= 1 ? "text-brand-forest font-medium" : "text-brand-stone"
            )}>
              {step > 1 ? <Check className="w-4 h-4" /> : <span className="w-5 h-5 rounded-full bg-brand-forest text-white text-xs flex items-center justify-center">1</span>}
              Informations
            </span>
            <ChevronRight className="w-4 h-4 text-brand-sage" />
            <span className={cn(
              "flex items-center gap-2",
              step >= 2 ? "text-brand-forest font-medium" : "text-brand-stone"
            )}>
              {step > 2 ? <Check className="w-4 h-4" /> : <span className={cn(
                "w-5 h-5 rounded-full text-xs flex items-center justify-center",
                step >= 2 ? "bg-brand-forest text-white" : "bg-brand-sage/30 text-brand-stone"
              )}>2</span>}
              Paiement
            </span>
            <ChevronRight className="w-4 h-4 text-brand-sage" />
            <span className={cn(
              "flex items-center gap-2",
              step === 3 ? "text-brand-forest font-medium" : "text-brand-stone"
            )}>
              <span className={cn(
                "w-5 h-5 rounded-full text-xs flex items-center justify-center",
                step === 3 ? "bg-brand-forest text-white" : "bg-brand-sage/30 text-brand-stone"
              )}>3</span>
              Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <form onSubmit={handleSubmitInfo} className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="font-serif text-xl mb-6">Coordonnées</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        data-testid="checkout-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        data-testid="checkout-phone"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="font-serif text-xl mb-6">Adresse de livraison</h2>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          data-testid="checkout-firstname"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          data-testid="checkout-lastname"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        data-testid="checkout-address"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          data-testid="checkout-postalcode"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                          data-testid="checkout-city"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-4" data-testid="checkout-continue">
                  Continuer vers le paiement
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitPayment} className="space-y-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-brand-stone hover:text-brand-forest transition-colors"
                  data-testid="checkout-back-to-info"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Modifier mes informations
                </button>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="font-serif text-xl mb-6">Mode de paiement</h2>

                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(v) => setFormData({ ...formData, paymentMethod: v })}
                    className="space-y-3"
                  >
                    <label className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                      formData.paymentMethod === 'card'
                        ? "border-brand-forest bg-brand-forest/5"
                        : "border-brand-sage/30 hover:border-brand-sage"
                    )} data-testid="checkout-payment-card">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5 text-brand-forest" />
                      <div className="flex-1">
                        <p className="font-medium">Carte bancaire</p>
                        <p className="text-sm text-brand-stone">Visa, Mastercard, CB</p>
                      </div>
                    </label>

                    <label className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                      formData.paymentMethod === 'paypal'
                        ? "border-brand-forest bg-brand-forest/5"
                        : "border-brand-sage/30 hover:border-brand-sage"
                    )} data-testid="checkout-payment-paypal">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">P</div>
                      <div className="flex-1">
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-brand-stone">Paiement sécurisé via PayPal</p>
                      </div>
                    </label>
                  </RadioGroup>

                  {/* Simulated card form */}
                  {formData.paymentMethod === 'card' && (
                    <div className="mt-6 p-4 bg-brand-cream rounded-xl">
                      <p className="text-sm text-brand-stone text-center mb-3">
                        Environnement de démonstration - Aucun paiement réel
                      </p>
                      <div className="space-y-3">
                        <Input placeholder="1234 5678 9012 3456" disabled />
                        <div className="grid grid-cols-2 gap-3">
                          <Input placeholder="MM/AA" disabled />
                          <Input placeholder="CVC" disabled />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                  data-testid="checkout-pay"
                >
                  {loading ? (
                    'Traitement en cours...'
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Payer {formatPrice(total)} TTC
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
              <h2 className="font-serif text-xl mb-6">Récapitulatif</h2>

              <div className="space-y-4 mb-6" data-testid="checkout-items">
                {cart.items.map((item) => (
                  <div key={item.product_id} className="flex gap-3">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-brand-cream-alt shrink-0">
                      <img
                        src={item.product?.images[0]}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product?.name}</p>
                      <p className="text-sm text-brand-stone">Qté: {item.quantity}</p>
                      <p className="text-brand-forest font-medium">
                        {formatPrice(item.product?.price * item.quantity)} TTC
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-brand-sage/20" data-testid="checkout-summary">
                <div className="flex justify-between text-sm" data-testid="checkout-subtotal">
                  <span className="text-brand-stone">Sous-total</span>
                  <span>{formatPrice(cart.subtotal)} TTC</span>
                </div>
                <div className="flex justify-between text-sm" data-testid="checkout-shipping">
                  <span className="text-brand-stone flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Livraison
                  </span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Offerte' : `${formatPrice(shipping)} TTC`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-brand-sage/20 font-semibold text-lg" data-testid="checkout-total">
                  <span>Total</span>
                  <span className="text-brand-forest">{formatPrice(total)} TTC</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-brand-stone mt-4 text-center">
                  Plus que {formatPrice(50 - cart.subtotal)} TTC pour la livraison offerte !
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
