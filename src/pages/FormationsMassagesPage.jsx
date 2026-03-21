import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Clock, Award, ShieldCheck, MapPin, GraduationCap, Heart, Star } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import useContent from '../hooks/useContent';

const graduatePhotos = [
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/w0u0yvr5_IMG_9931.PNG' },
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/o2hsi4q1_IMG_9932.PNG' },
  { image: 'https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/t0nkd398_IMG_9933.PNG' },
];

const objectifs = [
  { icon: GraduationCap, text: 'Un enseignement théorique sur le corps humain et son fonctionnement' },
  { icon: ShieldCheck, text: "Formation à la prise en charge du patient et notamment des règles d'hygiène à respecter via l'apprentissage des soins esthétiques et paramédicaux adaptés" },
  { icon: Heart, text: 'Ateliers de massage, drainage et remodelage corps et visage' },
  { icon: Users, text: 'Apprendre et comprendre le système lymphatique dans sa globalité' },
  { icon: CheckCircle, text: "Maîtrise des indications et contre-indications" },
  { icon: Award, text: "Organiser les séances de prise en charge de vos futurs patients" },
];

export default function FormationsMassagesPage() {
  usePageMeta({
    title: 'Formation Body Look Care | Massage, Drainage & Remodelage',
    description: "Formation professionnelle en drainage lymphatique, massage et remodelage par Marie-Julie Parant. Certificat et droits d'utilisation de la marque.",
    url: '/formations-massages'
  });

  const { data: cms } = useContent('formation');
  const reserveRef = useRef(null);
  const grads = cms?.graduates || graduatePhotos.map(g => g.image);
  const objs = cms?.objectifs || objectifs.map(o => o.text);
  const lieux = cms?.lieux || ['Metz (Lorraine)', 'Luxembourg-ville', 'Paris'];

  return (
    <div className="page-transition pb-nav" data-testid="formations-page">

      {/* ═══ HERO VIDEO ═══ */}
      <section className="relative overflow-hidden" data-testid="formation-hero" style={{ minHeight: '550px' }}>
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ minHeight: '550px', height: '70vh', maxHeight: '750px' }}
          poster=""
        >
          <source src={cms?.hero_video || "https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/srr9liw9_intro-blc.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative flex items-end" style={{ minHeight: '550px', height: '70vh', maxHeight: '750px' }}>
          <div className="w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-20">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4 border border-white/20">
                {cms?.hero_badge || "Formation professionnelle certifiante"}
              </span>
              <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4 max-w-3xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)]" data-testid="formation-headline">
                {cms?.hero_title || "Formation Body Look Care"}
              </h1>
              <p className="text-white/80 text-base md:text-lg max-w-2xl mb-6">
                {cms?.hero_subtitle || "Massage, drainage lymphatique & remodelage corps et visage"}
              </p>
              <button
                onClick={() => reserveRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 bg-white text-brand-forest px-8 py-3.5 rounded-full font-semibold hover:bg-brand-sage transition-colors shadow-lg"
                data-testid="formation-hero-cta"
              >
                Réserver ma place
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

     {/* ═══ INTRODUCTION MARIE-JULIE ═══ */}
      <section className="py-14 md:py-20" style={{ background: '#F9F9F7' }} data-testid="formation-intro">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-4"
            >
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
                  <img
                    src={cms?.intro_image || "https://customer-assets.emergentagent.com/job_942b3f6d-d3ce-4869-a680-de3ee41841e7/artifacts/dema26zu_b1e33fdd-cb1d-4ab5-86a5-285beec84c3d.jpeg"}
                    alt="Marie-Julie Parant, Fondatrice de Body Look Care"
                    className="w-full aspect-[3/4] object-cover"
                    loading="lazy"
                    data-testid="formation-founder-photo"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-brand-forest text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                  Fondatrice & Formatrice
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-8"
            >
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-brand-charcoal mb-6 leading-snug">
                {cms?.intro_title || "Le mot de Marie-Julie"}
              </h2>
              <div className="space-y-4 text-brand-charcoal/80 leading-relaxed text-[15px] md:text-base">
                <p>
                  Bodylookcare est bien plus qu'une technique de massage.
                </p>
                <p>
                  C'est le résultat d'un parcours professionnel exigeant, d'annnées de pratique terrain et d'un travail de recherche approfondi.
                </p>
                <p>
                  Je me suis formée au Brésil, en Italie et au Portugal, trois pays reconnus pour leur expertise avancée dans les techniques de drainage, de remodelage et de travail tissulaire. Mais je ne me suis pas arrêtée à la reproduction de méthodes existantes.
                </p>
                <p>
                  Un véritable travail interne de recherche et d'analyse a été mené pour comprendre les mécanismes physiologiques, affiner les gestes, adapter les pressions et structurer une technique spécifique, cohérente et surtout efficace.
                </p>
                <p className="text-brand-forest font-medium italic text-base">
                  C'est ainsi qu'est née la méthode Bodylookcare : une technique précise, structurée, qui donne des résultats visibles et ressentis.
                </p>
              </div>
              <button
                onClick={() => reserveRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5 mt-8"
                data-testid="formation-intro-cta"
              >
                Rejoindre la formation
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══ OBJECTIFS DE LA FORMATION ═══ */}
      <section className="py-14 md:py-20 bg-white" data-testid="formation-objectifs">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-forest/10 text-brand-forest text-sm font-medium rounded-full mb-4">
              Programme
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal">
              Objectifs de la formation
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {objectifs.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-xl bg-brand-cream/60 border border-brand-sage/10 hover:shadow-md transition-shadow"
                data-testid={`objectif-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-brand-forest/10 flex items-center justify-center shrink-0">
                  <obj.icon className="w-5 h-5 text-brand-forest" />
                </div>
                <p className="text-brand-charcoal/85 text-[15px] leading-relaxed">{obj.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ IMPORTANT — Conditions d'éligibilité ═══ */}
      <section className="py-14 md:py-20 bg-brand-charcoal" data-testid="formation-important">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-4 border border-white/10">
              Important
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Conditions & Éligibilité
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              data-testid="condition-eligibility"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-forest/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-brand-sage" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">Public éligible</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Professionnels de santé, médical, paramédical et esthéticiennes diplômées pratiquants à plus de 60km de Metz et Luxembourg.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              data-testid="condition-participants"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-forest/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-brand-sage" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">9 participants max.</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Le nombre maximum de participants par session est de 9 personnes afin de garantir le meilleur apprentissage possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              data-testid="condition-certificat"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-forest/20 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-brand-sage" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">Certification</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                À l'issue de la formation, des tests seront réalisés et un certificat vous sera délivré avec les droits d'utilisation de notre marque et méthodes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ COLLABORATRICES DIPLOMEES ═══ */}
      <section className="py-14 md:py-20 bg-brand-cream" data-testid="formation-graduates">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal mb-3">
              Elles ont rejoint la famille Body Look Care
            </h2>
            <p className="text-brand-stone text-base max-w-xl mx-auto">
              Nos collaboratrices certifiées exercent avec fierté la méthode Body Look Care
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {grads.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl overflow-hidden shadow-md group"
                data-testid={`graduate-${i}`}
              >
                <img src={typeof src === 'string' ? src : src.image} alt="" className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-forest shrink-0" />
                    <span className="text-xs font-medium text-brand-charcoal">Certifiée Body Look Care</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INFORMATIONS PRATIQUES + CTA RESERVATION ═══ */}
      <section ref={reserveRef} className="py-14 md:py-20 bg-white" data-testid="formation-reserve">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-brand-forest/10 text-brand-forest text-sm font-medium rounded-full mb-4">
              Informations pratiques
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal">
              Réservez votre place
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-cream rounded-2xl p-6 text-center"
              data-testid="info-tarif"
            >
              <div className="w-14 h-14 rounded-full bg-brand-forest/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-forest">&#8364;</span>
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-1">{cms?.tarif || "3 500 \u20AC TTC"}</h3>
              <p className="text-brand-stone text-sm">Tarif de la formation</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-brand-cream rounded-2xl p-6 text-center"
              data-testid="info-duree"
            >
              <div className="w-14 h-14 rounded-full bg-brand-forest/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-brand-forest" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-1">{cms?.duree || "2,5 jours"}</h3>
              <p className="text-brand-stone text-sm">Durée de la formation</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-brand-cream rounded-2xl p-6 text-center"
              data-testid="info-acompte"
            >
              <div className="w-14 h-14 rounded-full bg-brand-forest/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-brand-forest" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-1">Acompte 30%</h3>
              <p className="text-brand-stone text-sm">À régler en ligne, solde lors de la formation</p>
            </motion.div>
          </div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-forest rounded-2xl p-8 md:p-12 text-center shadow-xl"
            data-testid="formation-final-cta"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
              Prêt(e) à rejoindre la famille Body Look Care ?
            </h3>
            <p className="text-white/80 text-base mb-8 max-w-lg mx-auto">
              Places limitées à 9 participants par session. Réservez dès maintenant pour garantir votre place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/boutique"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-forest px-10 py-4 rounded-full font-bold text-base hover:bg-brand-sage transition-colors shadow-lg"
                data-testid="formation-reserve-btn"
              >
                Réserver ma formation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
                data-testid="formation-contact-btn"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ LIEUX ═══ */}
      <section className="py-10 md:py-14 bg-brand-cream" data-testid="formation-lieux">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-charcoal mb-8">Nos lieux de formation</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {lieux.map((lieu, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm" data-testid={`formation-lieu-${i}`}>
                <MapPin className="w-6 h-6 text-brand-forest mx-auto mb-3" />
                <p className="font-medium text-brand-charcoal">{lieu}</p>
                <p className="text-sm text-brand-stone mt-1">Sur rendez-vous</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
