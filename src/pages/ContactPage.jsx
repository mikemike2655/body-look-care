import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, MessageCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import usePageMeta from '../hooks/usePageMeta';
import useContent from '../hooks/useContent';

export default function ContactPage() {
  const { data: cms } = useContent('contact');
  usePageMeta({
    title: 'Contact | Body Look Care',
    description: 'Contactez Marie-Julie pour un conseil personnalisé, un suivi de commande ou un rendez-vous de drainage lymphatique.',
    url: '/contact'
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const subjects = [
    'Question sur un produit',
    'Conseil personnalisé',
    'Suivi de commande',
    'Rendez-vous drainage lymphatique',
    'Partenariat professionnel',
    'Autre'
  ];

  const cabinets = [
    {
      city: 'Metz (Lorraine)',
      description: 'Mon premier cabinet, ouvert en 2018. C\'est ici que tout a commencé !',
      address: 'Sur rendez-vous',
      hours: 'Lundi - Vendredi : 9h - 18h',
      phone: 'Sur demande',
      available: true
    },
    {
      city: 'Luxembourg-ville',
      description: 'Pour mes clientes luxembourgeoises et frontalières.',
      address: 'Sur rendez-vous',
      hours: 'Mardi - Samedi : 10h - 17h',
      phone: 'Sur demande',
      available: true
    },
    {
      city: 'Paris',
      description: 'Je me déplace 1 à 2 fois par mois. Places limitées !',
      address: 'Sur rendez-vous uniquement',
      hours: 'Dates variables',
      phone: 'Sur demande',
      available: true
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSending(false);
    setSent(true);
    toast.success('Message envoyé ! Je vous réponds sous 24h.');
    
    // Reset after a delay
    setTimeout(() => {
      setSent(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      });
    }, 3000);
  };

  return (
    <div className="pb-nav" data-testid="contact-page">
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-4">
              {cms?.title || "Parlons-en !"}
            </h1>
            <p className="text-brand-stone text-lg max-w-2xl mx-auto">
              {cms?.subtitle || "Une question sur un produit ? Besoin d'un conseil personnalisé ? Envie de prendre rendez-vous en cabinet ? Je suis là pour vous aider."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white border-b border-brand-sage/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.a
              href="mailto:contact@bodylookcare.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 p-6 bg-brand-cream rounded-2xl hover:bg-brand-cream-alt transition-colors"
              data-testid="contact-email-card"
            >
              <div className="w-12 h-12 rounded-full bg-brand-forest/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand-forest" />
              </div>
              <div>
                <p className="font-medium text-brand-charcoal">Par email</p>
                <p className="text-sm text-brand-forest">contact@bodylookcare.com</p>
                <p className="text-xs text-brand-stone mt-1">Réponse sous 24h</p>
              </div>
            </motion.a>

            <motion.a
              href="https://instagram.com/bodylookcare"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 p-6 bg-brand-cream rounded-2xl hover:bg-brand-cream-alt transition-colors"
              data-testid="contact-instagram-card"
            >
              <div className="w-12 h-12 rounded-full bg-brand-forest/10 flex items-center justify-center shrink-0">
                <Instagram className="w-6 h-6 text-brand-forest" />
              </div>
              <div>
                <p className="font-medium text-brand-charcoal">Sur Instagram</p>
                <p className="text-sm text-brand-forest">@bodylookcare</p>
                <p className="text-xs text-brand-stone mt-1">Je réponds en DM !</p>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 p-6 bg-brand-cream rounded-2xl"
              data-testid="contact-chat-card"
            >
              <div className="w-12 h-12 rounded-full bg-brand-forest/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-brand-forest" />
              </div>
              <div>
                <p className="font-medium text-brand-charcoal">Chat en direct</p>
                <p className="text-sm text-brand-stone">Disponible sur le site</p>
                <p className="text-xs text-brand-stone mt-1">Lun-Ven : 10h-17h</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Cabinets */}
      <section className="section-padding bg-brand-cream-alt">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-2xl text-brand-charcoal mb-2">
                Envoyez-moi un message
              </h2>
              <p className="text-brand-stone mb-6">
                Je lis et réponds personnellement à chaque message.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-brand-charcoal mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-sage/30 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      placeholder="Marie"
                      data-testid="contact-first-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-brand-charcoal mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-sage/30 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      placeholder="Dupont"
                      data-testid="contact-last-name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-charcoal mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-sage/30 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                    placeholder="marie@exemple.com"
                    data-testid="contact-email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-charcoal mb-1">
                    Téléphone (optionnel)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-brand-sage/30 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                    placeholder="06 12 34 56 78"
                    data-testid="contact-phone"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-charcoal mb-1">
                    Objet de votre message *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-sage/30 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest bg-white"
                    data-testid="contact-subject"
                  >
                    <option value="">Choisissez un sujet</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-charcoal mb-1">
                    Votre message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-brand-sage/30 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest resize-none"
                    placeholder="Décrivez votre demande..."
                    data-testid="contact-message"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-brand-sage/30 text-brand-forest focus:ring-brand-forest"
                    data-testid="contact-newsletter"
                  />
                  <label htmlFor="newsletter" className="text-sm text-brand-stone">
                    Je souhaite recevoir les conseils beauté et offres exclusives Body Look Care
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sending || sent}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    sent 
                      ? 'bg-green-500 text-white' 
                      : 'bg-brand-forest text-white hover:bg-brand-forest/90'
                  }`}
                  data-testid="contact-submit"
                >
                  {sent ? (
                    <>
                      <Check className="w-5 h-5" />
                      Message envoyé !
                    </>
                  ) : sending ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer mon message
                    </>
                  )}
                </button>

                <p className="text-xs text-brand-stone text-center">
                  Vos données sont protégées et ne seront jamais partagées.
                </p>
              </form>
            </motion.div>

            {/* Cabinets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-2xl text-brand-charcoal mb-2">
                Me rencontrer en cabinet
              </h2>
              <p className="text-brand-stone mb-6">
                Je pratique toujours le drainage lymphatique manuel. 
                C'est ce qui me permet de rester connectée à vos besoins réels.
              </p>

              <div className="space-y-4">
                {cabinets.map((cabinet, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-brand-sage/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-forest/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-brand-forest" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-brand-charcoal mb-1">{cabinet.city}</h3>
                        <p className="text-sm text-brand-stone mb-3">{cabinet.description}</p>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-brand-stone">
                            <Clock className="w-4 h-4" />
                            {cabinet.hours}
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              subject: 'Rendez-vous drainage lymphatique',
                              message: `Bonjour Marie-Julie,\n\nJe souhaiterais prendre rendez-vous pour une séance de drainage lymphatique à ${cabinet.city}.\n\n`
                            }));
                            document.getElementById('message')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="mt-4 text-sm font-medium text-brand-forest hover:underline"
                          type="button"
                          data-testid={`contact-request-${cabinet.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                        >
                          Demander un rendez-vous →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note personnelle */}
              <div className="mt-6 bg-brand-cream rounded-xl p-5 border-l-4 border-brand-forest">
                <p className="text-sm text-brand-stone italic">
                  "Je limite volontairement le nombre de rendez-vous pour pouvoir 
                  prendre le temps avec chaque cliente. Si les créneaux sont complets, 
                  n'hésitez pas à vous inscrire sur liste d'attente !"
                </p>
                <p className="text-sm text-brand-forest font-medium mt-2">— Marie-Julie</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Rapide */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-2xl text-brand-charcoal mb-4">
            Avant de me contacter...
          </h2>
          <p className="text-brand-stone mb-6">
            Peut-être que la réponse se trouve déjà ici ?
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <a href="/drainage-lymphatique" className="p-4 bg-brand-cream rounded-xl hover:bg-brand-cream-alt transition-colors" data-testid="contact-quicklink-drainage">
              <p className="font-medium text-brand-charcoal">Guide du drainage lymphatique</p>
              <p className="text-sm text-brand-stone">Tout comprendre sur le drainage</p>
            </a>
            <a href="/produit/le-draineur" className="p-4 bg-brand-cream rounded-xl hover:bg-brand-cream-alt transition-colors" data-testid="contact-quicklink-draineur">
              <p className="font-medium text-brand-charcoal">Le Draineur : mode d'emploi</p>
              <p className="text-sm text-brand-stone">Posologie, conseils, précautions</p>
            </a>
            <a href="/livraison" className="p-4 bg-brand-cream rounded-xl hover:bg-brand-cream-alt transition-colors" data-testid="contact-quicklink-livraison">
              <p className="font-medium text-brand-charcoal">Livraison & retours</p>
              <p className="text-sm text-brand-stone">Délais, suivi, remboursement</p>
            </a>
            <a href="/a-propos" className="p-4 bg-brand-cream rounded-xl hover:bg-brand-cream-alt transition-colors" data-testid="contact-quicklink-histoire">
              <p className="font-medium text-brand-charcoal">Notre histoire</p>
              <p className="text-sm text-brand-stone">Qui est Marie-Julie ?</p>
            </a>
          </div>
        </div>
      </section>

      {/* Social CTA */}
      <section className="bg-brand-forest py-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-4">
            Rejoignez la communauté !
          </h2>
          <p className="text-white/80 mb-6">
            Sur Instagram, je partage des conseils, des coulisses, 
            et les témoignages de vraies clientes.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://instagram.com/bodylookcare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors"
              data-testid="contact-instagram-main"
            >
              <Instagram className="w-5 h-5" />
              @bodylookcare
            </a>
            <a 
              href="https://instagram.com/bodylookcare.la.gamme" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors"
              data-testid="contact-instagram-gamme"
            >
              <Instagram className="w-5 h-5" />
              @bodylookcare.la.gamme
            </a>
            <a 
              href="https://facebook.com/bodylookcare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors"
              data-testid="contact-facebook"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
