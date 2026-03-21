import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight, Heart, Minus, Plus, ShoppingBag, Star,
  Truck, Shield, RefreshCw, Check, MessageCircle, Package
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productsData } from '../data/products';
import medusa from '../lib/medusa';
import { normalizeProduct } from '../lib/medusaUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import usePageMeta from '../hooks/usePageMeta';
import { useProductSchema } from '../hooks/useJsonLd';

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart, loading: cartLoading } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  usePageMeta({
    title: product ? `${product.name} | Body Look Care` : 'Produit | Body Look Care',
    description: product?.shortDescription || 'Découvrez nos soins naturels Body Look Care.',
    image: product?.images?.[0],
    type: 'product',
    url: product ? `/produit/${product.id}` : undefined,
    product: product ? { price: product.price } : undefined
  });

  useProductSchema(product);

  useEffect(() => {
    const fetchProduct = async () => {
      setPageLoading(true);
      try {
        // Fetch from Medusa by handle
        const { products } = await medusa.store.product.list({ handle: slug, region_id: 'reg_01KM38KEBWAGY16DWNRPSRHG95' });
        if (products?.length) {
          const normalized = normalizeProduct(products[0]);
          // Merge with local rich content
          const local = productsData[normalized.id] || {};
          setProduct({ ...local, ...normalized });

          // Fetch related products (all products except current)
          const { products: allProducts } = await medusa.store.product.list({ limit: 50, region_id: 'reg_01KM38KEBWAGY16DWNRPSRHG95' });
          const related = (allProducts || [])
            .filter(p => p.handle !== slug)
            .slice(0, 3)
            .map(p => {
              const norm = normalizeProduct(p);
              const loc = productsData[norm.id] || {};
              return { ...loc, ...norm };
            });
          setRelatedProducts(related);
        } else {
          // Fallback to local data only
          const localProduct = productsData[slug] || null;
          setProduct(localProduct);
          if (localProduct) {
            setRelatedProducts(
              Object.values(productsData)
                .filter(p => p.id !== slug)
                .slice(0, 3)
            );
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to local data
        const localProduct = productsData[slug] || null;
        setProduct(localProduct);
        if (localProduct) {
          setRelatedProducts(
            Object.values(productsData)
              .filter(p => p.id !== slug)
              .slice(0, 3)
          );
        }
      } finally {
        setPageLoading(false);
      }
      window.scrollTo(0, 0);
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product.id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-forest border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-stone">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Produit non trouvé</h1>
          <p className="text-brand-stone mb-6">Ce produit n'existe pas ou a été retiré.</p>
          <Link to="/boutique" className="btn-primary">Voir la boutique</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-36 md:pb-nav" data-testid="product-page">
      {/* Breadcrumb */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-stone">
            <Link to="/" className="hover:text-brand-forest transition-colors" data-testid="product-breadcrumb-home">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/boutique" className="hover:text-brand-forest transition-colors" data-testid="product-breadcrumb-shop">Boutique</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-charcoal font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-square bg-brand-cream rounded-2xl overflow-hidden relative img-zoom"
            >
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-full z-10 ${
                  product.badge === 'Le + populaire' ? 'bg-brand-gold text-white' :
                  product.badge === 'Best-seller' ? 'bg-brand-forest text-white' :
                  product.badge === 'Nouveau' ? 'bg-brand-charcoal text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8 transition-transform duration-700"
                data-testid="product-main-image"
                loading="eager"
              />
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-brand-forest shadow-md' : 'border-transparent hover:border-gray-200'
                    }`}
                    data-testid={`product-thumbnail-${index}`}
                  >
                    <img src={img} alt={`${product.name} - vue ${index + 1}`} className="w-full h-full object-contain bg-brand-cream p-2" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-forest font-semibold mb-2">{product.subtitle}</p>
              <h1 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-3 tracking-tight" data-testid="product-title">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 0) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm text-brand-stone">{product.rating || 0}/5 ({product.reviewCount || 0} avis)</span>
              </div>
            </div>

            {product.marieJulieNote && (
              <div className="bg-brand-cream rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-forest" />
                <div className="flex items-start gap-3 pl-3">
                  <div className="w-9 h-9 rounded-full bg-brand-forest/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4 text-brand-forest" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-forest font-semibold mb-1">Le mot de Marie-Julie</p>
                    <p className="text-sm text-brand-stone italic leading-relaxed">"{product.marieJulieNote}"</p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-brand-stone leading-relaxed">{product.shortDescription}</p>

            {product.includes && (
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="font-medium text-brand-charcoal mb-3 flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4" /> Ce pack contient :
                </p>
                <ul className="space-y-2">
                  {product.includes.map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="text-brand-stone">{item.quantity} {item.name}</span>
                      <span className="text-brand-forest font-medium">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.benefits && (
              <ul className="space-y-2.5">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <span className="text-base">{benefit.icon}</span>
                    <span className="text-brand-stone">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Price & Add to Cart */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-baseline gap-3 mb-5" data-testid="product-price-block">
                <span className="text-3xl font-bold text-brand-charcoal" data-testid="product-price">
                  {product.price.toFixed(2)} €
                </span>
                {product.comparePrice && (
                  <>
                    <span className="text-lg text-brand-stone line-through">{product.comparePrice.toFixed(2)} €</span>
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                      -{Math.round((1 - product.price / product.comparePrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center border border-gray-200 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-gray-50 rounded-l-full transition-colors"
                    data-testid="product-qty-decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-sm" data-testid="product-qty-value">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-gray-50 rounded-r-full transition-colors"
                    data-testid="product-qty-increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-brand-stone uppercase tracking-wider">TTC</span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className={`w-full py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-all duration-400 ${
                  addedToCart
                    ? 'bg-green-500 text-white scale-[1.02]'
                    : 'btn-primary'
                }`}
                data-testid="add-to-cart-btn"
              >
                {addedToCart ? (
                  <><Check className="w-5 h-5" /> Ajouté au panier !</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" strokeWidth={1.5} /> Ajouter au panier – {(product.price * quantity).toFixed(2)} €</>
                )}
              </button>

              <div className="mt-5 grid grid-cols-3 gap-3" data-testid="product-trust-badges">
                {[
                  { icon: Truck, label: 'Livraison offerte', testId: 'product-trust-shipping' },
                  { icon: RefreshCw, label: 'Remboursé 30j', testId: 'product-trust-refund' },
                  { icon: Shield, label: 'Paiement sécurisé', testId: 'product-trust-secure' },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 py-3 bg-gray-50 rounded-xl" data-testid={b.testId}>
                    <b.icon className="w-4 h-4 text-brand-forest" strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-wider text-brand-stone font-medium text-center">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs: Description, Composition, Usage, Avis */}
      {(product.fullDescription || product.composition || product.usage || product.reviews) && (
        <section className="bg-brand-cream-alt py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full flex bg-white rounded-xl p-1 mb-8" data-testid="product-tabs">
                <TabsTrigger value="description" className="flex-1 py-3 rounded-lg data-[state=active]:bg-brand-forest data-[state=active]:text-white" data-testid="product-tab-description">
                  Description
                </TabsTrigger>
                {product.composition && (
                  <TabsTrigger value="composition" className="flex-1 py-3 rounded-lg data-[state=active]:bg-brand-forest data-[state=active]:text-white" data-testid="product-tab-composition">
                    Composition
                  </TabsTrigger>
                )}
                {product.usage && (
                  <TabsTrigger value="usage" className="flex-1 py-3 rounded-lg data-[state=active]:bg-brand-forest data-[state=active]:text-white" data-testid="product-tab-usage">
                    Utilisation
                  </TabsTrigger>
                )}
                {product.reviews && product.reviews.length > 0 && (
                  <TabsTrigger value="reviews" className="flex-1 py-3 rounded-lg data-[state=active]:bg-brand-forest data-[state=active]:text-white" data-testid="product-tab-reviews">
                    Avis ({product.reviewCount})
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Description Tab */}
              <TabsContent value="description" className="bg-white rounded-2xl p-6 md:p-8" data-testid="product-tab-description-content">
                {product.fullDescription && (
                  <div
                    className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-charcoal prose-p:text-brand-stone prose-li:text-brand-stone prose-strong:text-brand-charcoal"
                    dangerouslySetInnerHTML={{ __html: product.fullDescription }}
                  />
                )}
              </TabsContent>

              {/* Composition Tab */}
              {product.composition && (
                <TabsContent value="composition" className="bg-white rounded-2xl p-6 md:p-8" data-testid="product-tab-composition-content">
                  <h3 className="font-serif text-2xl text-brand-charcoal mb-6">{product.composition.title}</h3>

                  {product.composition.ingredients && (
                    <div className="space-y-4 mb-8">
                      {product.composition.ingredients.map((ing, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-brand-cream rounded-xl">
                          <div className="w-2 h-2 rounded-full bg-brand-forest mt-2 shrink-0" />
                          <div>
                            <p className="font-medium text-brand-charcoal">
                              {ing.name} {ing.amount && <span className="text-brand-forest">({ing.amount})</span>}
                            </p>
                            <p className="text-sm text-brand-stone">{ing.benefit}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {product.composition.freeFrom && (
                    <div className="mb-6">
                      <p className="font-medium text-brand-charcoal mb-3">Sans :</p>
                      <div className="flex flex-wrap gap-2">
                        {product.composition.freeFrom.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-full">
                            ✗ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.composition.certifications && (
                    <div>
                      <p className="font-medium text-brand-charcoal mb-3">Certifications :</p>
                      <div className="flex flex-wrap gap-2">
                        {product.composition.certifications.map((cert, index) => (
                          <span key={index} className="px-3 py-1 bg-brand-forest/10 text-brand-forest text-sm rounded-full">
                            ✓ {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              )}

              {/* Usage Tab */}
              {product.usage && (
                <TabsContent value="usage" className="bg-white rounded-2xl p-6 md:p-8" data-testid="product-tab-usage-content">
                  <h3 className="font-serif text-2xl text-brand-charcoal mb-4">{product.usage.title}</h3>

                  <div className="bg-brand-cream rounded-xl p-5 mb-6">
                    <p className="text-lg text-brand-charcoal font-medium">{product.usage.instructions}</p>
                  </div>

                  {product.usage.tips && (
                    <div className="mb-6">
                      <p className="font-medium text-brand-charcoal mb-3">Mes conseils :</p>
                      <ul className="space-y-2">
                        {product.usage.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-brand-stone">
                            <Check className="w-4 h-4 text-brand-forest shrink-0 mt-1" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {product.usage.warnings && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <p className="font-medium text-amber-800 mb-2">À savoir :</p>
                      <ul className="space-y-1">
                        {product.usage.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-amber-700">• {warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TabsContent>
              )}

              {/* Reviews Tab */}
              {product.reviews && product.reviews.length > 0 && (
                <TabsContent value="reviews" className="bg-white rounded-2xl p-6 md:p-8" data-testid="product-tab-reviews-content">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-serif text-2xl text-brand-charcoal">Avis clients</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-brand-stone">{product.rating || 0}/5 – {product.reviewCount || 0} avis</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b border-brand-sage/10 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-brand-charcoal">{review.name}</span>
                              {review.verified && (
                                <span className="text-xs bg-brand-forest/10 text-brand-forest px-2 py-0.5 rounded">
                                  Achat vérifié
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}`} />
                                ))}
                              </div>
                              <span className="text-xs text-brand-stone">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-brand-stone leading-relaxed italic">"{review.text}"</p>
                        {review.helpful && (
                          <p className="text-xs text-brand-stone mt-2">
                            {review.helpful} personnes ont trouvé cet avis utile
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </section>
      )}

      {/* FAQ */}
      {product.faq && product.faq.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-6 text-center">
            Questions fréquentes
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {product.faq.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-xl px-6 border border-brand-sage/20" data-testid={`product-faq-item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-brand-charcoal hover:no-underline py-4" data-testid={`product-faq-trigger-${index}`}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-stone pb-4" data-testid={`product-faq-content-${index}`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-brand-cream-alt py-14">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-2 text-center tracking-tight">
              Complétez votre routine
            </h2>
            <p className="text-brand-stone text-center text-sm mb-10">Nos soins se combinent pour des résultats optimaux</p>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/produit/${relatedProduct.id}`}
                  className="product-card group"
                  data-testid={`related-product-${relatedProduct.id}`}
                >
                  <div className="aspect-square bg-brand-cream p-8 img-zoom">
                    <img src={relatedProduct.images[0]} alt={relatedProduct.name}
                      className="w-full h-full object-contain transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-widest text-brand-forest font-semibold mb-1">{relatedProduct.subtitle}</p>
                    <h3 className="font-semibold text-brand-charcoal group-hover:text-brand-forest transition-colors duration-300">{relatedProduct.name}</h3>
                    <p className="text-brand-forest font-bold mt-2">{relatedProduct.price.toFixed(2)} €</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-brand-forest py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
            Une question sur ce produit ?
          </h2>
          <p className="text-white/80 mb-6">
            Je réponds personnellement à vos questions sur Instagram ou par email.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/bodylookcare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors"
              data-testid="product-instagram-link"
            >
              @bodylookcare sur Instagram
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-brand-forest px-6 py-3 rounded-full font-medium hover:bg-brand-sage transition-colors"
              data-testid="product-contact-link"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky Order Bar */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-sage/20 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] safe-area-bottom">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-brand-cream overflow-hidden shrink-0">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-medium text-brand-charcoal">{product.name}</p>
              <p className="text-sm text-brand-stone" data-testid="sticky-order-price">
                {product.price.toFixed(2)} € TTC
              </p>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-brand-forest text-white hover:bg-brand-forest/90'
            }`}
            data-testid="sticky-order-button"
          >
            {addedToCart ? (
              <>
                <Check className="w-5 h-5" />
                Ajouté au panier
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                Commander
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
