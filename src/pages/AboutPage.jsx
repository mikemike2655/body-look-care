import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Leaf, MapPin, Phone, Mail, Instagram, Facebook, Award, Users, Sparkles } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import useContent from '../hooks/useContent';

export default function AboutPage() {
  const { data: cms } = useContent('about');
  usePageMeta({
    title: 'Notre Histoire | Body Look Care',
    description: 'Découvrez l’histoire de Marie-Julie, infirmière devenue praticienne, et la mission naturelle de Body Look Care.',
    url: '/a-propos'
  });

  return (
    <div className="page-transition pb-nav" data-testid="about-page">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-forest/10 text-brand-forest text-sm font-medium rounded-full mb-6">
              Notre Histoire
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6">
              {cms?.hero_title || "Body Look Care, c'est avant tout une histoire de passion et de soin"}
            </h1>
            <p className="text-brand-stone text-lg leading-relaxed">
              {cms?.hero_subtitle || "Celle d'une infirmière devenue praticienne en drainage lymphatique, qui a voulu partager les bienfaits de cette technique avec le plus grand nombre."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* L'histoire de Marie-Julie */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-brand-cream">
                <img
                  src={cms?.founder_image || "https://static.prod-images.emergentagent.com/jobs/00ef226f-f000-474f-89cd-17256bce900b/images/40e3db7d2b9db6f82f29d84cb9e5809ffb3a4abe56557f067d459897e7eb4395.png"}
                  alt="Marie-Julie, fondatrice de Body Look Care"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl text-brand-charcoal mb-6">
                "{cms?.founder_quote || "Chaque femme mérite de se sentir bien dans son corps"}"
              </h2>
              
              <div className="prose prose-lg text-brand-stone">
                <p>
                  Bonjour, moi c'est Marie-Julie. Avant de créer Body Look Care, j'étais infirmière. 
                  Pendant des années, j'ai accompagné des patients, écouté leurs histoires, 
                  leurs frustrations... et souvent, celles des femmes qui ne se sentaient plus 
                  bien dans leur corps.
                </p>
                
                <p>
                  La cellulite, les jambes lourdes, la rétention d'eau... Ce ne sont pas "juste" 
                  des problèmes esthétiques. Ce sont des vrais inconforts qui impactent le quotidien 
                  et la confiance en soi. <strong>Je le sais, parce que je l'ai vécu aussi.</strong>
                </p>
                
                <p>
                  Quand j'ai découvert le drainage lymphatique, ça a été une révélation. 
                  Pas une solution miracle, non – mais une approche douce, naturelle, 
                  qui respecte le corps et l'aide à retrouver son équilibre.
                </p>
                
                <p>
                  J'ai ouvert mes premiers cabinets à Metz, puis à Luxembourg et Paris. 
                  Mais je voyais bien que tout le monde ne pouvait pas venir en consultation. 
                  Alors j'ai voulu créer quelque chose d'accessible, <strong>pour que chaque femme 
                  puisse prendre soin d'elle chez elle, avec des produits vraiment efficaces.</strong>
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-sage/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-brand-forest" />
                </div>
                <div>
                  <p className="font-medium text-brand-charcoal">Marie-Julie</p>
                  <p className="text-sm text-brand-stone">Fondatrice & Praticienne en drainage lymphatique</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ce qui nous différencie */}
      <section className="section-padding bg-brand-cream">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
              Ce en quoi je crois profondément
            </h2>
            <p className="text-brand-stone max-w-2xl mx-auto">
              Pas de promesses magiques, pas de "résultats en 3 jours". 
              Juste des produits honnêtes, formulés avec soin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🌿',
                title: 'Du naturel, vraiment',
                description: 'Pas de greenwashing chez nous. Nos formules sont à base de plantes (pissenlit, queue de cerise, mélilot) dont l\'efficacité est reconnue depuis des siècles.'
              },
              {
                icon: '🇫🇷',
                title: 'Fabriqué en France',
                description: 'En collaboration avec les Laboratoires Lehning, experts en phytothérapie depuis 90 ans. Je connais personnellement les équipes qui fabriquent nos produits.'
              },
              {
                icon: '💚',
                title: 'De la patience',
                description: 'Les vrais résultats prennent du temps. Je préfère vous dire la vérité : comptez 3-4 semaines pour voir les premiers changements. Mais ils seront durables.'
              },
              {
                icon: '🤝',
                title: 'De l\'écoute',
                description: 'Chaque femme est différente. Notre équipe est là pour répondre à vos questions, vous guider, vous accompagner. Pas juste pour vendre.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <span className="text-4xl mb-4 block">{value.icon}</span>
                <h3 className="font-medium text-brand-charcoal mb-2">{value.title}</h3>
                <p className="text-sm text-brand-stone leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* L'approche 360° */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
              Pourquoi "drainage de l'intérieur + soin de l'extérieur" ?
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-brand-stone">
            <p>
              En tant que praticienne, j'ai vu des centaines de femmes dépenser des fortunes 
              en crèmes anti-cellulite... sans résultat. Normal : <strong>la cellulite et la rétention 
              d'eau, ça se passe d'abord à l'intérieur du corps.</strong>
            </p>
            
            <p>
              C'est pour ça que j'ai créé Le Draineur : des gélules à base de 3 plantes 
              qui stimulent le drainage lymphatique naturellement. Combinées à nos soins 
              corps (Miracle Cream et Miracle Scrub), vous agissez sur les deux fronts.
            </p>
            
            <p>
              Ce n'est pas une invention marketing. C'est simplement l'approche que j'utilise 
              dans mes cabinets depuis des années, rendue accessible à toutes.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-brand-cream rounded-2xl">
              <span className="text-4xl font-bold text-brand-forest">5 000+</span>
              <p className="text-brand-stone mt-2">Femmes accompagnées</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-2xl">
              <span className="text-4xl font-bold text-brand-forest">4.8/5</span>
              <p className="text-brand-stone mt-2">Note moyenne</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-2xl">
              <span className="text-4xl font-bold text-brand-forest">87%</span>
              <p className="text-brand-stone mt-2">Recommandent à une amie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nos cabinets */}
      <section className="section-padding bg-brand-cream-alt">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-4">
              Venez me rencontrer en cabinet
            </h2>
            <p className="text-brand-stone max-w-2xl mx-auto">
              Au-delà de la boutique en ligne, je continue à pratiquer le drainage lymphatique manuel. 
              C'est ma passion, et c'est aussi ce qui me permet de rester connectée à vos besoins réels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                city: 'Metz (Lorraine)',
                description: 'Mon premier cabinet, ouvert en 2018. C\'est ici que tout a commencé.',
                available: true
              },
              {
                city: 'Luxembourg-ville',
                description: 'Pour mes clientes luxembourgeoises et frontalières.',
                available: true
              },
              {
                city: 'Paris',
                description: 'Sur rendez-vous uniquement, 1 à 2 fois par mois.',
                available: true
              }
            ].map((cabinet, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-brand-forest" />
                  <h3 className="font-medium text-brand-charcoal">{cabinet.city}</h3>
                </div>
                <p className="text-sm text-brand-stone mb-4">{cabinet.description}</p>
                <Link 
                  to="/contact" 
                  className="text-brand-forest text-sm font-medium hover:underline"
                  data-testid={`about-cabinet-${cabinet.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  Prendre rendez-vous →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rejoignez-nous */}
      <section className="section-padding bg-brand-forest text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Rejoignez notre communauté
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Sur Instagram, je partage des conseils, des coulisses, et surtout 
            les témoignages de vraies femmes (pas des mannequins !). 
            Venez discuter, poser vos questions – je réponds personnellement.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://instagram.com/bodylookcare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors"
              data-testid="about-instagram-main"
            >
              <Instagram className="w-5 h-5" />
              @bodylookcare
            </a>
            <a 
              href="https://instagram.com/bodylookcare.la.gamme" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors"
              data-testid="about-instagram-gamme"
            >
              <Instagram className="w-5 h-5" />
              @bodylookcare.la.gamme
            </a>
            <a 
              href="https://facebook.com/bodylookcare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-colors"
              data-testid="about-facebook"
            >
              <Facebook className="w-5 h-5" />
              Body Look Care
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-6">
            Prête à essayer ?
          </h2>
          <p className="text-brand-stone mb-8">
            Commencez par le Pack Découverte si vous voulez tester. 
            Et si ça ne vous convient pas, on vous rembourse – promis, sans discussion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/boutique" 
              className="btn-primary inline-flex items-center gap-2"
              data-testid="about-cta-shop"
            >
              Découvrir les produits
            </Link>
            <Link 
              to="/contact" 
              className="btn-secondary inline-flex items-center gap-2"
              data-testid="about-cta-contact"
            >
              Me poser une question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
