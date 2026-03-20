import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, Droplets, Heart, Zap, Apple, Leaf } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import usePageMeta from '../hooks/usePageMeta';

export default function DrainagePage() {
  usePageMeta({
    title: 'Drainage Lymphatique | Body Look Care',
    description: 'Guide complet du drainage lymphatique expliqué simplement par Marie-Julie. Bienfaits, conseils et approche naturelle.',
    url: '/drainage-lymphatique'
  });

  const symptoms = [
    'Jambes lourdes, surtout en fin de journée',
    'Gonflements des chevilles et des pieds',
    'Rétention d\'eau visible (visage bouffi le matin, doigts gonflés)',
    'Cellulite qui persiste malgré les régimes',
    'Fatigue chronique, manque d\'énergie',
    'Mains et pieds souvent froids',
    'Impression d\'être "gonflée" en permanence'
  ];

  const causes = [
    { title: 'La sédentarité', desc: 'Position assise prolongée, manque de mouvement' },
    { title: 'L\'alimentation', desc: 'Trop de sel, trop de sucre, pas assez d\'eau' },
    { title: 'Le stress', desc: 'Il perturbe tout, y compris la circulation lymphatique' },
    { title: 'Les vêtements serrés', desc: 'Jeans skinny, chaussettes qui marquent...' },
    { title: 'La chaleur', desc: 'L\'été, les symptômes sont souvent pires' }
  ];

  const plants = [
    {
      name: 'Le pissenlit',
      latin: 'Taraxacum officinale',
      description: 'Nos grands-mères l\'appelaient "pisse-en-lit" (pardon pour le nom !) parce qu\'il fait uriner. C\'est un puissant diurétique naturel qui stimule l\'élimination rénale sans agresser l\'organisme.',
      uses: 'Rétention d\'eau, détox du foie, digestion lente'
    },
    {
      name: 'La queue de cerise',
      latin: 'Prunus cerasus',
      description: 'Les pédoncules des cerises sont riches en potassium et en flavonoïdes. Ils favorisent l\'élimination de l\'eau tout en compensant les pertes minérales.',
      uses: 'Drainage doux, circulation, infections urinaires légères'
    },
    {
      name: 'Le mélilot',
      latin: 'Melilotus officinalis',
      description: 'Ma préférée ! Cette petite fleur jaune améliore la circulation veineuse ET lymphatique. Elle contient de la coumarine qui réduit la perméabilité des capillaires.',
      uses: 'Jambes lourdes, insuffisance veineuse, œdèmes'
    }
  ];

  const tips = [
    {
      icon: <Droplets className="w-6 h-6" />,
      title: 'Buvez !',
      description: 'Minimum 1,5L d\'eau par jour. Ça semble contre-intuitif quand on fait de la rétention, mais c\'est essentiel pour aider le corps à éliminer.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Bougez !',
      description: '30 minutes de marche par jour suffisent. La lymphe n\'a pas de pompe comme le sang – c\'est le mouvement qui la fait circuler.'
    },
    {
      icon: <Apple className="w-6 h-6" />,
      title: 'Mangez malin',
      description: 'Réduisez le sel, augmentez les fruits et légumes riches en eau (concombre, melon, asperges). Évitez les plats préparés industriels.'
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: 'Aidez-vous des plantes',
      description: 'Les compléments drainants comme Le Draineur stimulent naturellement l\'élimination. C\'est ce que je recommande à mes clientes en cabinet.'
    }
  ];

  const faq = [
    {
      question: 'Le drainage fait-il maigrir ?',
      answer: 'Non, le drainage n\'élimine pas les graisses. Il élimine l\'eau et les toxines, ce qui affine la silhouette et fait perdre des centimètres, mais ce n\'est pas une "vraie" perte de poids. C\'est complémentaire à une démarche de perte de poids, mais ça ne la remplace pas.'
    },
    {
      question: 'Combien de temps pour voir des résultats ?',
      answer: 'Les premiers effets (jambes plus légères) se ressentent généralement dès la 1ère semaine. Pour des résultats visibles sur la silhouette, comptez 3-4 semaines d\'utilisation régulière. Je sais que c\'est long, mais le corps a besoin de temps pour se rééquilibrer.'
    },
    {
      question: 'Y a-t-il des contre-indications ?',
      answer: 'Oui. Le drainage est déconseillé en cas de problèmes cardiaques ou rénaux sévères, de thrombose récente, d\'infection aiguë, ou de cancer évolutif (sauf avis médical). En cas de doute, consultez votre médecin.'
    },
    {
      question: 'Enceinte, je peux drainer ?',
      answer: 'Le drainage manuel doux par un professionnel est souvent recommandé pendant la grossesse pour soulager les jambes lourdes. Pour les compléments alimentaires, je recommande de demander l\'avis de votre médecin ou sage-femme.'
    },
    {
      question: 'Faut-il boire beaucoup d\'eau ?',
      answer: 'Oui, c\'est essentiel ! Minimum 1,5L par jour. Je sais que ça semble contre-intuitif quand on fait de la rétention, mais l\'eau aide justement le corps à éliminer. Sans eau, les toxines restent bloquées.'
    },
    {
      question: 'Le drainage en institut vs les compléments ?',
      answer: 'Les deux sont complémentaires ! Le drainage manuel en institut (50-80€/séance) offre un effet immédiat et localisé. Les compléments drainants agissent de l\'intérieur, quotidiennement, à un coût accessible. L\'idéal : combiner les deux.'
    }
  ];

  return (
    <div className="pb-nav" data-testid="drainage-page">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-forest/10 text-brand-forest text-sm font-medium rounded-full mb-6">
              Guide complet
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-6">
              Le Drainage Lymphatique Expliqué Simplement
            </h1>
            <p className="text-brand-stone text-lg leading-relaxed max-w-2xl mx-auto">
              Par Marie-Julie, praticienne en drainage lymphatique depuis 2018. 
              Tout ce que vous devez savoir, sans jargon médical.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro de Marie-Julie */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-brand-cream rounded-2xl p-8 border-l-4 border-brand-forest">
            <p className="text-lg text-brand-charcoal leading-relaxed">
              "Quand j'explique le drainage lymphatique à mes clientes, je commence toujours par une image simple : 
              <strong> imaginez votre corps comme une maison avec un système d'évacuation des eaux usées.</strong> 
              Si ce système est bouché ou ralenti, l'eau stagne, les déchets s'accumulent, et tout devient lourd et gonflé. 
              Le drainage, c'est simplement aider ce système à mieux fonctionner."
            </p>
            <p className="text-brand-forest font-medium mt-4">— Marie-Julie</p>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que le système lymphatique */}
      <section className="section-padding bg-brand-cream-alt">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl text-brand-charcoal mb-6">
            Le système lymphatique, c'est quoi ?
          </h2>
          
          <div className="prose prose-lg max-w-none text-brand-stone">
            <p>
              C'est un réseau de vaisseaux et de ganglions qui parcourt tout votre corps, un peu comme les vaisseaux sanguins. 
              Mais contrairement au sang qui a le cœur pour le faire circuler, <strong>la lymphe n'a pas de pompe</strong>. 
              Elle circule grâce aux mouvements de votre corps, aux contractions musculaires, à la respiration.
            </p>
            
            <p>Son rôle ? Crucial :</p>
            <ul>
              <li><strong>Éliminer les déchets</strong> – toxines, cellules mortes, excès d'eau</li>
              <li><strong>Défendre l'organisme</strong> – les ganglions filtrent les agents pathogènes</li>
              <li><strong>Transporter les nutriments</strong> – notamment les graisses après la digestion</li>
            </ul>
            
            <p>
              Quand la lymphe circule mal (et ça arrive vite avec notre mode de vie moderne), 
              l'eau et les toxines stagnent. Résultat : jambes lourdes, gonflements, cellulite, fatigue...
            </p>
          </div>
        </div>
      </section>

      {/* Les signes d'un système ralenti */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl text-brand-charcoal mb-6">
            Comment savoir si votre drainage est ralenti ?
          </h2>
          
          <p className="text-brand-stone mb-8">
            Voici les signes que votre système lymphatique a besoin d'un coup de pouce. 
            Vous vous reconnaissez dans plusieurs points ? C'est peut-être le moment d'agir.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-brand-cream rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-brand-charcoal">{symptom}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="font-medium text-brand-charcoal mb-4">Ce qui peut ralentir le drainage :</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {causes.map((cause, index) => (
                <div key={index} className="p-4 bg-brand-cream-alt rounded-xl">
                  <p className="font-medium text-brand-charcoal mb-1">{cause.title}</p>
                  <p className="text-sm text-brand-stone">{cause.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Les plantes drainantes */}
      <section className="section-padding bg-brand-cream">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl text-brand-charcoal mb-4">
            Les 3 plantes que j'utilise (et pourquoi)
          </h2>
          <p className="text-brand-stone mb-8">
            Pas besoin de formules complexes à 50 ingrédients. Ces 3 plantes sont utilisées depuis des siècles 
            et leur efficacité est prouvée. C'est ce qu'il y a dans Le Draineur.
          </p>
          
          <div className="space-y-6">
            {plants.map((plant, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-forest/10 flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 text-brand-forest" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-brand-charcoal mb-1">{plant.name}</h3>
                    <p className="text-sm text-brand-forest italic mb-3">{plant.latin}</p>
                    <p className="text-brand-stone mb-3">{plant.description}</p>
                    <p className="text-sm">
                      <span className="font-medium text-brand-charcoal">Utilisé pour : </span>
                      <span className="text-brand-stone">{plant.uses}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment stimuler naturellement */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl text-brand-charcoal mb-4 text-center">
            Comment stimuler votre drainage au quotidien
          </h2>
          <p className="text-brand-stone text-center mb-10 max-w-2xl mx-auto">
            Ce que je recommande à mes clientes en cabinet – et que vous pouvez appliquer chez vous.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-cream rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-full bg-brand-forest/10 flex items-center justify-center text-brand-forest mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-medium text-brand-charcoal text-lg mb-2">{tip.title}</h3>
                <p className="text-brand-stone">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* La différence drainage manuel vs naturel */}
      <section className="section-padding bg-brand-cream-alt">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl text-brand-charcoal mb-6">
            Drainage en institut vs drainage naturel : que choisir ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-medium text-brand-charcoal text-lg mb-4">Drainage manuel (en institut)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-brand-stone">Effet immédiat et visible</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-brand-stone">Technique précise, ciblée</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-brand-stone">Moment de détente</span>
                </li>
                <li className="flex items-start gap-2 text-brand-stone">
                  <span className="w-5 text-center">•</span>
                  <span>Coût : 50-80€ par séance</span>
                </li>
                <li className="flex items-start gap-2 text-brand-stone">
                  <span className="w-5 text-center">•</span>
                  <span>Nécessite des RDV réguliers</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-medium text-brand-charcoal text-lg mb-4">Drainage naturel (compléments + soins)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-brand-stone">À faire chez soi, tous les jours</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-brand-stone">Coût accessible (25€/mois)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-brand-stone">Résultats progressifs mais durables</span>
                </li>
                <li className="flex items-start gap-2 text-brand-stone">
                  <span className="w-5 text-center">•</span>
                  <span>Demande de la régularité</span>
                </li>
                <li className="flex items-start gap-2 text-brand-stone">
                  <span className="w-5 text-center">•</span>
                  <span>Résultats en 3-4 semaines</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-brand-forest/10 rounded-2xl p-6 text-center">
            <p className="text-brand-charcoal font-medium">
              Mon conseil ? <strong>Combinez les deux !</strong> Drainage naturel quotidien + 1 séance en institut par mois pour l'entretien.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl text-brand-charcoal mb-8 text-center">
            Questions fréquentes
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-brand-cream rounded-xl px-6 border-0" data-testid={`drainage-faq-item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-brand-charcoal hover:no-underline py-4" data-testid={`drainage-faq-trigger-${index}`}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-stone pb-4" data-testid={`drainage-faq-content-${index}`}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-brand-forest py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Prête à essayer le drainage naturel ?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Commencez par Le Draineur : la formule que j'ai créée à partir de mon expérience en cabinet. 
            Si ça ne vous convient pas, je vous rembourse.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/produit/le-draineur"
              className="inline-flex items-center gap-2 bg-white text-brand-forest px-8 py-4 rounded-full font-semibold hover:bg-brand-sage transition-colors"
              data-testid="drainage-cta-draineur"
            >
              Découvrir Le Draineur
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
              data-testid="drainage-cta-contact"
            >
              Me poser une question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
