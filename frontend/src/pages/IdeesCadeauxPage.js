import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, Heart, Star, Package } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import useContent from '../hooks/useContent';

const giftIdeas = [
  {
    title: 'Coffret Découverte',
    description: 'Le Draineur + Miracle Cream — Le duo parfait pour une première expérience Body Look Care.',
    price: '48,50',
    originalPrice: '57,00',
    discount: '-15%',
    image: 'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png',
    ideal: 'Pour une amie qui veut prendre soin d\'elle'
  },
  {
    title: 'Coffret Bien-être Complet',
    description: 'Le Draineur + Miracle Cream + Relax & Sommeil — Le programme transformation 3-en-1.',
    price: '72,25',
    originalPrice: '85,00',
    discount: '-15%',
    image: '/images/all_products.jpeg',
    ideal: 'Pour offrir une routine complète',
    popular: true
  },
  {
    title: 'Bon Cadeau Drainage',
    description: 'Offrez une séance de drainage lymphatique en cabinet avec Marie-Julie. Une expérience unique de bien-être.',
    price: 'À partir de 80,00',
    image: 'https://bodylookcare.com/wp-content/uploads/2020/06/body-look-care-soins-bien-etre-massages-500x500.jpg',
    ideal: 'Pour une expérience inoubliable'
  }
];

export default function IdeesCadeauxPage() {
  const { data: cms } = useContent('idees-cadeaux');
  const gifts = cms?.gifts || giftIdeas;
  usePageMeta({
    title: 'Idées Cadeaux | Body Look Care',
    description: 'Offrez du bien-être naturel avec nos coffrets cadeaux Body Look Care. Drainage, soins anti-cellulite et massages.',
    url: '/idees-cadeaux'
  });

  return (
    <div className="page-transition pb-nav" data-testid="idees-cadeaux-page">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-brand-gold/20 text-brand-gold text-sm font-medium rounded-full mb-6">
              <Gift className="w-4 h-4 inline mr-1" />
              Idées cadeaux
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6">
              {cms?.hero_title || "Offrez du bien-être naturel"}
            </h1>
            <p className="text-brand-stone text-lg leading-relaxed max-w-2xl mx-auto">
              Trouvez le cadeau parfait pour faire plaisir à vos proches. Nos coffrets et bons cadeaux
              sont la solution idéale pour offrir une expérience de soin unique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Ideas */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {gifts.map((gift, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border ${gift.popular ? 'border-brand-gold ring-2 ring-brand-gold/20' : 'border-gray-100'}`}
                data-testid={`gift-card-${index}`}
              >
                {gift.popular && (
                  <div className="bg-brand-gold text-white text-center py-2 text-sm font-semibold">
                    Le + populaire
                  </div>
                )}
                <div className="aspect-square bg-brand-cream overflow-hidden">
                  <img src={gift.image} alt={gift.title} className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-brand-charcoal mb-2">{gift.title}</h3>
                  <p className="text-brand-stone text-sm mb-4">{gift.description}</p>
                  <div className="flex items-center gap-2 mb-3 text-sm text-brand-forest">
                    <Heart className="w-4 h-4" />
                    <span className="italic">{gift.ideal}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-brand-charcoal">{gift.price} &euro;</span>
                    {gift.originalPrice && (
                      <>
                        <span className="text-sm text-brand-stone line-through">{gift.originalPrice} &euro;</span>
                        <span className="text-xs font-semibold text-white bg-red-500 px-2 py-0.5 rounded-full">{gift.discount}</span>
                      </>
                    )}
                  </div>
                  <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-sm w-full justify-center" data-testid={`gift-cta-${index}`}>
                    Commander ce coffret
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Gift CTA */}
      <section className="section-padding bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Package className="w-12 h-12 text-brand-gold mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
              {cms?.custom_title || "Envie d'un coffret sur mesure ?"}
            </h2>
            <p className="text-brand-stone text-lg mb-8 max-w-xl mx-auto">
              {cms?.custom_text || "Composez votre propre coffret cadeau en choisissant les produits et services qui feront plaisir à coup sûr."}
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
              Créer mon coffret personnalisé
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
