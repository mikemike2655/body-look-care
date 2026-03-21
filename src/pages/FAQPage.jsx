import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Package, Truck, CreditCard, Leaf, HelpCircle, MessageCircle } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import { useFAQSchema } from '../hooks/useJsonLd';

const faqCategories = [
  {
    id: 'produits',
    name: 'Produits',
    icon: Package,
    questions: [
      {
        q: "En combien de temps vais-je voir des résultats ?",
        a: "Les premiers effets (jambes plus légères) se ressentent dès la 1ère semaine. Pour les résultats visibles sur la silhouette et la cellulite, comptez 3-4 semaines d'utilisation régulière. Je sais que c'est long, mais c'est le temps nécessaire pour que votre corps se rééquilibre naturellement. Pour des résultats optimaux et durables, je recommande 3 mois de cure."
      },
      {
        q: "Les produits sont-ils vraiment naturels ?",
        a: "Oui, 100%. Nos formules sont composées d'actifs d'origine végétale (pissenlit, queue de cerise, mélilot, caféine naturelle). Aucun parabène, sulfate ou ingrédient controversé. Certifiés vegan (à l'exception de la bave d'escargot dans Miracle Cream, obtenue éthiquement sans cruauté)."
      },
      {
        q: "Puis-je utiliser les produits pendant la grossesse ?",
        a: "Je recommande de consulter votre médecin ou sage-femme avant toute utilisation de compléments alimentaires pendant la grossesse ou l'allaitement. Les soins corps (Miracle Cream et Scrub) sont généralement sûrs mais demandez conseil. Pour le drainage manuel en cabinet, c'est différent – je reçois beaucoup de femmes enceintes et ça les soulage énormément !"
      },
      {
        q: "Quelle est la différence avec les autres marques anti-cellulite ?",
        a: "La différence réside dans notre approche 360° : drainage interne + soin externe. La plupart des crèmes n'agissent qu'en surface. Notre combinaison attaque le problème à la source (rétention d'eau + aspect de la peau) pour des résultats durables. C'est l'approche que j'utilise en cabinet depuis des années."
      },
      {
        q: "Les produits conviennent-ils à tous les types de peau ?",
        a: "Oui, nos formules naturelles conviennent à tous les types de peau, y compris les peaux sensibles. Si vous avez des allergies connues, vérifiez la liste des ingrédients ou contactez-moi directement."
      },
      {
        q: "La bave d'escargot, c'est éthique ?",
        a: "Oui ! Les escargots sont élevés dans des conditions respectueuses et la bave est récoltée naturellement, sans leur faire de mal. C'est un point sur lequel j'étais intransigeante lors de la formulation de Miracle Cream."
      },
      {
        q: "Ça fait uriner plus souvent ?",
        a: "Oui, et c'est normal ! C'est le signe que le drainage fonctionne. C'est pour ça que je recommande de prendre Le Draineur le matin – pour éviter de vous lever la nuit."
      },
      {
        q: "Comment conserver les produits ?",
        a: "Conservez les gélules Le Draineur à l'abri de la chaleur et de l'humidité. Pour Miracle Cream et Scrub, gardez-les dans un endroit frais, à l'abri de la lumière directe du soleil. Une fois ouverts, utilisez-les dans les 12 mois."
      }
    ]
  },
  {
    id: 'utilisation',
    name: 'Utilisation',
    icon: HelpCircle,
    questions: [
      {
        q: "Comment utiliser Le Draineur ?",
        a: "2 gélules par jour, le matin à jeun, avec un grand verre d'eau (250 ml minimum). C'est tout ! Une boîte = 1 mois de cure. Pour des résultats consolidés, je recommande 3 mois de cure."
      },
      {
        q: "Comment appliquer Miracle Cream ?",
        a: "Appliquez une noisette sur peau propre et sèche, matin et/ou soir. Massez de bas en haut (des chevilles vers les cuisses) en effectuant des mouvements circulaires. Insistez sur les zones concernées avec des palper-rouler légers. Laissez pénétrer 2-3 minutes avant de vous habiller."
      },
      {
        q: "Comment combiner Relax & Sommeil avec les autres produits ?",
        a: "Relax en journée pour gérer le stress (jusqu'à 3 comprimés), Sommeil le soir avant le coucher (2 comprimés fondants). En parallèle, Le Draineur le matin et Miracle Cream quotidiennement pour une routine complète."
      },
      {
        q: "Puis-je combiner les 3 produits ?",
        a: "Absolument, c'est même ce que je recommande ! C'est l'approche du Pack Transformation : Le Draineur le matin, Miracle Cream quotidiennement, et Relax & Sommeil pour le stress et le sommeil. Cette synergie maximise les résultats."
      },
      {
        q: "Combien de temps dure une cure ?",
        a: "Une cure standard dure 28 jours (1 boîte de Draineur). Pour des résultats optimaux et durables, je recommande 3 mois de cure. Ensuite, vous pouvez faire des cures d'entretien de 28 jours tous les 3-4 mois."
      }
    ]
  },
  {
    id: 'livraison',
    name: 'Livraison & Retours',
    icon: Truck,
    questions: [
      {
        q: "Les frais de livraison sont-ils offerts ?",
        a: "Oui, la livraison est offerte en France métropolitaine dès 50€ d'achat. En dessous, les frais sont de 4,90€. Expédition sous 24h si vous commandez avant 14h."
      },
      {
        q: "Quels sont les délais de livraison ?",
        a: "France métropolitaine : 2-4 jours ouvrés. Corse : 4-6 jours ouvrés. DOM-TOM : 7-12 jours ouvrés. Vous recevez un email avec le numéro de suivi dès l'expédition."
      },
      {
        q: "Livrez-vous à l'international ?",
        a: "Pour l'instant, nous livrons principalement en France. Pour la Belgique, le Luxembourg et la Suisse, contactez-moi directement et on trouvera une solution !"
      },
      {
        q: "Puis-je retourner un produit ?",
        a: "Oui, vous avez 30 jours pour changer d'avis. Les produits non ouverts sont remboursés intégralement. Pour les produits ouverts, contactez-moi – si vous n'êtes pas satisfaite, on trouvera une solution ensemble."
      },
      {
        q: "Comment suivre ma commande ?",
        a: "Dès l'expédition, vous recevez un email avec votre numéro de suivi. Vous pouvez aussi vous connecter à votre compte pour voir l'état de vos commandes."
      }
    ]
  },
  {
    id: 'paiement',
    name: 'Paiement',
    icon: CreditCard,
    questions: [
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Carte bancaire (Visa, Mastercard, CB), PayPal, et paiement en 3x sans frais sur le Pack Cure Intensive. Tous les paiements sont sécurisés et cryptés."
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Absolument. Nous utilisons un système de paiement crypté SSL. Vos données bancaires ne sont jamais stockées sur nos serveurs."
      },
      {
        q: "Puis-je payer en plusieurs fois ?",
        a: "Le paiement en 3x sans frais est disponible pour le Pack Cure Intensive (142€). Pour les autres produits, le paiement se fait en une fois."
      }
    ]
  },
  {
    id: 'drainage',
    name: 'Drainage Lymphatique',
    icon: Leaf,
    questions: [
      {
        q: "C'est quoi exactement le drainage lymphatique ?",
        a: "Le système lymphatique est le 'système d'évacuation' de votre corps. Quand il fonctionne au ralenti, l'eau et les toxines stagnent, provoquant jambes lourdes, gonflements et cellulite. Le drainage, c'est simplement aider ce système à mieux fonctionner – soit par des plantes (Le Draineur), soit par des massages manuels (en cabinet)."
      },
      {
        q: "Drainage en institut vs compléments : que choisir ?",
        a: "Les deux sont complémentaires ! Le drainage manuel en institut (50-80€/séance) offre un effet immédiat mais temporaire. Les compléments drainants agissent de l'intérieur, quotidiennement, pour des résultats progressifs mais durables. L'idéal : combiner les deux."
      },
      {
        q: "Le drainage fait-il maigrir ?",
        a: "Non, le drainage n'élimine pas les graisses. Il élimine l'eau et les toxines, ce qui affine la silhouette et fait perdre des centimètres, mais ce n'est pas une 'vraie' perte de poids. C'est complémentaire à une démarche de perte de poids, mais ça ne la remplace pas."
      },
      {
        q: "Y a-t-il des contre-indications ?",
        a: "Oui. Le drainage est déconseillé en cas de problèmes cardiaques ou rénaux sévères, de thrombose récente, d'infection aiguë, ou de cancer évolutif (sauf avis médical). En cas de doute, consultez votre médecin."
      },
      {
        q: "Puis-je prendre rendez-vous en cabinet ?",
        a: "Oui ! Je pratique toujours le drainage lymphatique manuel dans mes cabinets à Metz, Luxembourg et Paris (sur rendez-vous). Contactez-moi via le formulaire de contact ou sur Instagram pour réserver."
      }
    ]
  }
];

export default function FAQPage() {
  usePageMeta({
    title: 'FAQ | Body Look Care',
    description: 'Retrouvez toutes les réponses sur nos produits naturels, la livraison, le paiement et le drainage lymphatique.',
    url: '/faq'
  });

  const allFaqs = faqCategories.flatMap(cat => cat.questions.map(q => ({ question: q.q, answer: q.a })));
  useFAQSchema(allFaqs);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (categoryId, index) => {
    const key = `${categoryId}-${index}`;
    setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      searchQuery === '' || 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => 
    (activeCategory === 'all' || cat.id === activeCategory) && 
    cat.questions.length > 0
  );

  const totalQuestions = filteredCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="pb-nav" data-testid="faq-page">
      {/* Hero */}
      <section className="bg-brand-cream py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-charcoal mb-4">
              Questions Fréquentes
            </h1>
            <p className="text-brand-stone text-base md:text-lg mb-8">
              Retrouvez les réponses aux questions les plus courantes. 
              Si vous ne trouvez pas ce que vous cherchez, contactez-moi !
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-stone" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-brand-sage/30 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest bg-white"
                data-testid="faq-search-input"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-white sticky top-[96px] md:top-[112px] z-20 border-b border-brand-sage/10">
        <div className="max-w-4xl mx-auto px-4 py-3 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveCategory('all')}
              type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === 'all'
                  ? 'bg-brand-forest text-white'
                  : 'bg-brand-cream text-brand-charcoal hover:bg-brand-sage/20'
              }`}
              data-testid="faq-category-all"
            >
              Toutes ({faqCategories.reduce((sum, c) => sum + c.questions.length, 0)})
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-brand-forest text-white'
                    : 'bg-brand-cream text-brand-charcoal hover:bg-brand-sage/20'
                }`}
                data-testid={`faq-category-${cat.id}`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-8 md:py-12 bg-brand-cream-alt">
        <div className="max-w-4xl mx-auto px-4">
          {searchQuery && (
            <p className="text-sm text-brand-stone mb-6" data-testid="faq-search-results">
              {totalQuestions} résultat{totalQuestions > 1 ? 's' : ''} pour "{searchQuery}"
            </p>
          )}

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12" data-testid="faq-empty-state">
              <p className="text-brand-stone mb-4">Aucune question trouvée pour "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                type="button"
                className="text-brand-forest font-medium hover:underline"
                data-testid="faq-clear-search"
              >
                Effacer la recherche
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {activeCategory === 'all' && (
                    <div className="flex items-center gap-2 mb-4">
                      <category.icon className="w-5 h-5 text-brand-forest" />
                      <h2 className="font-serif text-xl text-brand-charcoal">{category.name}</h2>
                    </div>
                  )}

                  <div className="space-y-3">
                    {category.questions.map((item, index) => {
                      const key = `${category.id}-${index}`;
                      const isOpen = openQuestions[key];

                      return (
                        <div
                          key={index}
                          className="bg-white rounded-xl overflow-hidden border border-brand-sage/10"
                        >
                          <button
                            onClick={() => toggleQuestion(category.id, index)}
                            className="w-full px-5 py-4 flex items-start justify-between gap-4 text-left"
                            aria-expanded={isOpen}
                            data-testid={`faq-question-toggle-${category.id}-${index}`}
                          >
                            <span className="font-medium text-brand-charcoal text-sm md:text-base">
                              {item.q}
                            </span>
                            <ChevronDown 
                              className={`w-5 h-5 text-brand-stone shrink-0 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                          
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              className="px-5 pb-4"
                              data-testid={`faq-answer-${category.id}-${index}`}
                            >
                              <p className="text-brand-stone text-sm md:text-base leading-relaxed">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MessageCircle className="w-12 h-12 text-brand-forest mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-brand-charcoal mb-3">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-brand-stone mb-6">
            Je réponds personnellement à toutes vos questions !
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2"
              data-testid="faq-contact-link"
            >
              Me contacter
            </Link>
            <a
              href="https://instagram.com/bodylookcare"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center justify-center gap-2"
              data-testid="faq-instagram-link"
            >
              DM sur Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-medium text-brand-charcoal mb-4 text-center">Pages utiles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link to="/drainage-lymphatique" className="p-4 bg-white rounded-xl text-center hover:shadow-md transition-shadow" data-testid="faq-link-drainage">
              <Leaf className="w-6 h-6 text-brand-forest mx-auto mb-2" />
              <span className="text-sm text-brand-charcoal">Guide Drainage</span>
            </Link>
            <Link to="/produit/le-draineur" className="p-4 bg-white rounded-xl text-center hover:shadow-md transition-shadow" data-testid="faq-link-draineur">
              <Package className="w-6 h-6 text-brand-forest mx-auto mb-2" />
              <span className="text-sm text-brand-charcoal">Le Draineur</span>
            </Link>
            <Link to="/boutique?category=packs" className="p-4 bg-white rounded-xl text-center hover:shadow-md transition-shadow" data-testid="faq-link-packs">
              <CreditCard className="w-6 h-6 text-brand-forest mx-auto mb-2" />
              <span className="text-sm text-brand-charcoal">Nos Packs</span>
            </Link>
            <Link to="/a-propos" className="p-4 bg-white rounded-xl text-center hover:shadow-md transition-shadow" data-testid="faq-link-histoire">
              <HelpCircle className="w-6 h-6 text-brand-forest mx-auto mb-2" />
              <span className="text-sm text-brand-charcoal">Notre Histoire</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
