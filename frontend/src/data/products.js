// Données produits Body Look Care avec ton humain de Marie-Julie

export const productsData = {
  'le-draineur': {
    id: 'le-draineur',
    name: 'Le Draineur',
    subtitle: 'Gélules Drainage Lymphatique',
    tagline: 'Retrouvez des jambes légères naturellement',
    price: 25.00,
    comparePrice: null,
    sku: 'BLC-DRA-001',
    rating: 4.8,
    reviewCount: 247,
    badge: 'Best-seller',
    images: [
      'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/89rsin7j_IMG_9680.png',
      'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/2vq7efss_IMG_9712.jpeg',
      'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/v7t6g638_IMG_9704.jpeg',
      'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/jrf7ynix_IMG_9705.png'
    ],
    
    // Ton humain de Marie-Julie
    marieJulieNote: "C'est le produit que j'aurais aimé avoir quand j'ai commencé à souffrir de jambes lourdes. J'ai passé des mois à chercher la bonne formule avec les Laboratoires Lehning. Le résultat : 3 plantes simples mais terriblement efficaces.",
    
    shortDescription: "60 gélules pour 1 mois de cure. Des plantes que nos grands-mères utilisaient déjà – pissenlit, queue de cerise, mélilot – mais dosées avec précision pour un drainage efficace.",
    
    benefits: [
      { icon: '💧', text: 'Jambes plus légères dès la 1ère semaine' },
      { icon: '✨', text: 'Silhouette affinée après 3-4 semaines' },
      { icon: '🌿', text: '100% naturel, sans additifs chimiques' },
      { icon: '🇫🇷', text: 'Fabriqué en Lorraine avec les Laboratoires Lehning' }
    ],
    
    fullDescription: `
      <h3>Pourquoi j'ai créé Le Draineur</h3>
      <p>En cabinet, je voyais des femmes dépenser des fortunes en crèmes anti-cellulite... sans résultat. Normal : <strong>la rétention d'eau et la cellulite, ça se passe d'abord à l'intérieur du corps.</strong></p>
      
      <p>Le système lymphatique, c'est un peu le "système d'évacuation" de votre corps. Quand il ralentit (sédentarité, stress, alimentation...), l'eau stagne, les toxines s'accumulent, et voilà les jambes lourdes et la peau d'orange.</p>
      
      <h3>3 plantes, pas de blabla</h3>
      <p>Pas besoin de 50 ingrédients. J'ai choisi 3 plantes dont l'efficacité est prouvée depuis des siècles :</p>
      <ul>
        <li><strong>Le pissenlit</strong> – Nos grands-mères l'utilisaient déjà pour "nettoyer" l'organisme. Il stimule naturellement l'élimination rénale.</li>
        <li><strong>La queue de cerise</strong> – Un drainant doux mais efficace, riche en potassium pour compenser les pertes minérales.</li>
        <li><strong>Le mélilot</strong> – Ma préférée ! Elle améliore la circulation veineuse et soulage vraiment les jambes lourdes.</li>
      </ul>
      
      <h3>À quoi s'attendre (honnêtement)</h3>
      <p>Je ne vais pas vous promettre des miracles en 3 jours. Voici ce que mes clientes observent généralement :</p>
      <ul>
        <li><strong>Semaine 1-2 :</strong> Sensation de légèreté dans les jambes, moins de gonflements le soir</li>
        <li><strong>Semaine 3-4 :</strong> Silhouette visiblement affinée, effet "détox" ressenti</li>
        <li><strong>Après 3 mois :</strong> Résultats consolidés, nouvelles habitudes installées</li>
      </ul>
      
      <p><em>Conseil de praticienne : pour des résultats optimaux, combinez avec Miracle Cream. C'est l'approche que j'utilise en cabinet.</em></p>
    `,
    
    composition: {
      title: 'Ce qu\'il y a dedans (et ce qu\'il n\'y a pas)',
      ingredients: [
        { name: 'Pissenlit (extrait sec)', amount: '300 mg', benefit: 'Stimule l\'élimination rénale' },
        { name: 'Queue de cerise (extrait)', amount: '200 mg', benefit: 'Drainage doux, riche en potassium' },
        { name: 'Mélilot (extrait)', amount: '150 mg', benefit: 'Circulation veineuse, jambes légères' }
      ],
      additionalIngredients: 'Gélule végétale (HPMC), stéarate de magnésium végétal.',
      freeFrom: ['Gluten', 'Lactose', 'Additifs artificiels', 'Colorants', 'OGM'],
      certifications: ['Vegan', 'Fabriqué en France', 'Sans cruauté']
    },
    
    usage: {
      title: 'Comment l\'utiliser',
      instructions: '2 gélules par jour, le matin avec un grand verre d\'eau. C\'est tout !',
      tips: [
        'Prenez-les à jeun pour une meilleure absorption',
        'Buvez au moins 1,5L d\'eau par jour (c\'est vraiment important !)',
        'Une boîte = 1 mois de cure',
        'Pour des résultats durables, je recommande 3 mois de cure'
      ],
      warnings: [
        'Déconseillé aux femmes enceintes ou allaitantes sans avis médical',
        'Si vous avez des problèmes rénaux, demandez conseil à votre médecin',
        'Vous allez uriner plus souvent – c\'est normal, ça veut dire que ça marche !'
      ]
    },
    
    reviews: [
      {
        name: 'Jade V.',
        rating: 5,
        date: '15/01/2026',
        verified: true,
        text: 'Je prends les gélules depuis plus de trois mois et je me sens beaucoup mieux dans mon corps. Mes jambes sont plus légères et affinées ! C\'est un réel plaisir. Je recommande vivement pour toutes celles qui ont des problèmes de rétention d\'eau comme moi.',
        helpful: 127
      },
      {
        name: 'Sophie M.',
        rating: 5,
        date: '08/01/2026',
        verified: true,
        text: 'Dès la première semaine, j\'ai senti mes jambes moins gonflées le soir. Après un mois complet, mes chevilles sont vraiment affinées. Je continue pour une deuxième cure. Produit naturel, ça fait la différence!',
        helpful: 89
      },
      {
        name: 'Marie L.',
        rating: 4,
        date: '02/01/2026',
        verified: true,
        text: 'Produit efficace mais il faut être régulière et patiente. Les effets arrivent progressivement. J\'ai perdu 2 cm de tour de cuisse en 6 semaines. Je recommande d\'associer avec la Miracle Cream pour de meilleurs résultats.',
        helpful: 45
      }
    ],
    
    faq: [
      {
        question: 'En combien de temps vais-je voir des résultats ?',
        answer: 'Honnêtement, les premiers effets (jambes plus légères) se ressentent dès la 1ère semaine. Pour les résultats visibles sur la silhouette, comptez 3-4 semaines. Je sais que c\'est long, mais c\'est le temps nécessaire pour que votre corps se rééquilibre naturellement.'
      },
      {
        question: 'Je peux le prendre pendant la grossesse ?',
        answer: 'Je recommande de demander l\'avis de votre médecin ou sage-femme avant. Pour le drainage manuel en cabinet, c\'est différent – je reçois beaucoup de femmes enceintes et ça les soulage énormément !'
      },
      {
        question: 'Ça fait uriner plus souvent ?',
        answer: 'Oui, et c\'est normal ! C\'est le signe que le drainage fonctionne. C\'est pour ça que je recommande de les prendre le matin – pour éviter de vous lever la nuit.'
      },
      {
        question: 'C\'est mieux que le drainage en institut ?',
        answer: 'Les deux sont complémentaires ! Le Draineur agit de l\'intérieur, quotidiennement, à un coût accessible. Le drainage manuel en institut (50-80€ la séance) offre un effet plus immédiat. L\'idéal : combiner les deux.'
      }
    ],
    
    relatedProducts: ['miracle-cream', 'relax-et-sommeil', 'pack-transformation']
  },
  
  'miracle-cream': {
    id: 'miracle-cream',
    name: 'Miracle Cream',
    subtitle: 'Crème Anti-Cellulite',
    tagline: 'Lissez et raffermissez votre peau',
    price: 32.00,
    comparePrice: null,
    sku: 'BLC-MCR-001',
    rating: 4.9,
    reviewCount: 312,
    badge: 'Nouveau',
    images: [
      'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/4szmy6zw_IMG_9684.jpeg',
      'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/o1xvazx9_IMG_9707.jpeg',
      'https://customer-assets.emergentagent.com/job_ecommerce-bodylook/artifacts/oj3yu5ts_IMG_9714.jpeg'
    ],
    
    marieJulieNote: "J'ai testé des dizaines de crèmes anti-cellulite avant de créer celle-ci. La plupart ne font que hydrater la peau en surface. Miracle Cream, c'est différent : on a combiné la bave d'escargot (oui, je sais, ça sonne bizarre, mais les résultats sont là !) avec de la caféine pour vraiment agir sur la peau d'orange.",
    
    shortDescription: "200ml pour environ 2 mois d'utilisation. Une texture légère qui pénètre vite, sans laisser de film gras. Parfaite à utiliser le matin avant de s'habiller.",
    
    benefits: [
      { icon: '✨', text: 'Peau visiblement plus lisse en 4 semaines' },
      { icon: '💪', text: 'Effet raffermissant grâce à la bave d\'escargot' },
      { icon: '☕', text: 'Caféine naturelle pour stimuler la microcirculation' },
      { icon: '🌸', text: 'Texture légère, pas de film gras' }
    ],
    
    fullDescription: `
      <h3>Pourquoi la bave d'escargot ?</h3>
      <p>Je sais, dit comme ça, c'est pas très glamour ! Mais la bave d'escargot, c'est un concentré de bonnes choses pour la peau : allantoïne, collagène, élastine, acide glycolique... Elle régénère, répare et raffermit.</p>
      
      <p>Combinée à la caféine (qui stimule la circulation et aide à déstocker les graisses), vous obtenez une crème qui agit vraiment – pas juste une crème qui sent bon et qui hydrate.</p>
      
      <h3>Comment je l'utilise en cabinet</h3>
      <p>En séance de drainage, j'applique toujours une crème à la fin pour prolonger les effets du massage. C'est ce qui m'a donné l'idée de créer Miracle Cream : pour que mes clientes puissent continuer le soin chez elles.</p>
      
      <h3>La technique du massage (c'est important !)</h3>
      <p>Une crème, même la meilleure, ne fait pas tout. La façon dont vous l'appliquez compte énormément :</p>
      <ol>
        <li>Appliquez une noisette sur peau propre et sèche</li>
        <li>Massez de bas en haut (des chevilles vers les cuisses) – toujours dans le sens de la circulation</li>
        <li>Faites des mouvements de "palper-rouler" sur les zones concernées</li>
        <li>Insistez 2-3 minutes par jambe</li>
      </ol>
      
      <p><em>Mon conseil : utilisez Relax & Sommeil en complément pour une routine bien-être complète. Le corps se régénère mieux quand vous dormez bien.</em></p>
    `,
    
    composition: {
      title: 'Les actifs qui font la différence',
      ingredients: [
        { name: 'Bave d\'escargot', amount: 'Concentrée', benefit: 'Régénération, élasticité, réparation' },
        { name: 'Caféine', amount: 'Naturelle', benefit: 'Stimule la lipolyse et la circulation' },
        { name: 'Queue de cerise', amount: 'Extrait', benefit: 'Propriétés drainantes' },
        { name: 'Huiles végétales', amount: 'Sélectionnées', benefit: 'Nutrition sans film gras' }
      ],
      freeFrom: ['Parabènes', 'Silicones', 'Huiles minérales', 'Colorants artificiels'],
      certifications: ['Fabriqué en France', 'Non testé sur animaux']
    },
    
    usage: {
      title: 'Mode d\'emploi',
      instructions: '1 à 2 applications par jour, matin et/ou soir. Massez pendant 2-3 minutes par zone.',
      tips: [
        'Le matin, attendez que ça pénètre bien avant de vous habiller (2-3 min)',
        'Le soir, c\'est le moment idéal pour prendre votre temps et bien masser',
        'Combinez avec Relax & Sommeil pour une routine bien-être complète',
        'Combinez avec Le Draineur pour l\'approche complète'
      ]
    },
    
    reviews: [
      {
        name: 'Émilie R.',
        rating: 5,
        date: '20/01/2026',
        verified: true,
        text: 'J\'étais sceptique sur la bave d\'escargot, mais les résultats sont là ! Ma peau est plus ferme, plus lisse. Et la texture est vraiment agréable, pas du tout collante.',
        helpful: 78
      },
      {
        name: 'Nathalie P.',
        rating: 5,
        date: '12/01/2026',
        verified: true,
        text: 'Enfin une crème anti-cellulite qui fonctionne ! Je l\'utilise avec Le Draineur et les résultats sont impressionnants après 6 semaines.',
        helpful: 64
      }
    ],
    
    faq: [
      {
        question: 'La bave d\'escargot, c\'est éthique ?',
        answer: 'Oui ! Les escargots sont élevés dans des conditions respectueuses et la bave est récoltée naturellement, sans leur faire de mal. C\'est un point sur lequel j\'étais intransigeante.'
      },
      {
        question: 'Je peux l\'utiliser sur le visage ?',
        answer: 'Cette formule est conçue pour le corps. Pour le visage, les besoins sont différents. Je travaille peut-être sur quelque chose... mais chut !'
      }
    ],
    
    relatedProducts: ['le-draineur', 'relax-et-sommeil', 'pack-decouverte']
  },
  
  'pack-decouverte': {
    id: 'pack-decouverte',
    name: 'Pack Découverte',
    subtitle: 'Le Draineur + Miracle Cream',
    tagline: 'Pour tester l\'approche complète',
    price: 48.50,
    comparePrice: 57.00,
    sku: 'BLC-PKD-001',
    rating: 4.8,
    reviewCount: 89,
    badge: '-15%',
    images: [
      '/logo-product.svg'
    ],
    
    marieJulieNote: "Si vous hésitez, commencez par là. C'est le pack que je recommande à mes nouvelles clientes en cabinet : drainage interne + soin externe, l'essentiel de mon approche. Et si ça ne vous convient pas, je vous rembourse.",
    
    shortDescription: "L'association parfaite pour débuter : Le Draineur (60 gélules) + Miracle Cream (200ml). Économisez 15% par rapport à l'achat séparé.",
    
    includes: [
      { name: 'Le Draineur', quantity: '1x', value: '25€' },
      { name: 'Miracle Cream', quantity: '1x', value: '32€' }
    ],
    
    benefits: [
      { icon: '💧', text: 'Drainage interne avec Le Draineur' },
      { icon: '✨', text: 'Soin externe avec Miracle Cream' },
      { icon: '📅', text: 'Cure complète de 28 jours' },
      { icon: '💰', text: 'Économisez 8,50€ (15%)' }
    ],
    
    relatedProducts: ['pack-transformation', 'relax-et-sommeil']
  },
  
  'pack-transformation': {
    id: 'pack-transformation',
    name: 'Pack Transformation',
    subtitle: 'Programme Complet 3-en-1',
    tagline: 'Notre best-seller – et je comprends pourquoi',
    price: 72.25,
    comparePrice: 85.00,
    sku: 'BLC-PKT-001',
    rating: 4.9,
    reviewCount: 156,
    badge: 'Le + populaire',
    images: [
      '/logo-product.svg'
    ],
    
    marieJulieNote: "C'est le pack que j'utiliserais si j'étais à votre place. Il contient tout ce qu'il faut pour reproduire chez vous l'approche que j'utilise en cabinet. Le guide d'utilisation inclus vous explique exactement comment faire – c'est comme si je vous accompagnais.",
    
    shortDescription: "Le programme complet : Le Draineur + Miracle Cream + Relax & Sommeil + Guide d'utilisation. Tout ce qu'il faut pour des résultats visibles en 28 jours.",
    
    includes: [
      { name: 'Le Draineur', quantity: '1x', value: '25€' },
      { name: 'Miracle Cream', quantity: '1x', value: '32€' },
      { name: 'Relax & Sommeil', quantity: '1x', value: '35€' },
      { name: 'Guide d\'utilisation', quantity: '1x', value: 'Offert' }
    ],
    
    benefits: [
      { icon: '🎯', text: 'Programme 3-en-1 complet' },
      { icon: '📖', text: 'Guide d\'utilisation inclus' },
      { icon: '💰', text: 'Économisez 12,75€ (15%)' },
      { icon: '⭐', text: 'Notre pack le plus populaire' }
    ],
    
    relatedProducts: ['pack-intensive', 'le-draineur']
  },
  
  'pack-intensive': {
    id: 'pack-intensive',
    name: 'Pack Cure Intensive',
    subtitle: 'Programme 3 Mois',
    tagline: 'Pour celles qui veulent des résultats durables',
    price: 142.00,
    comparePrice: 179.00,
    sku: 'BLC-PKI-001',
    rating: 5.0,
    reviewCount: 67,
    badge: '-20%',
    images: [
      '/logo-product.svg'
    ],
    
    marieJulieNote: "Je recommande 3 mois de cure pour des résultats vraiment consolidés. C'est un investissement, mais c'est aussi le meilleur rapport qualité/prix. Et avec le paiement en 3x sans frais, ça devient accessible.",
    
    shortDescription: "La cure complète de 3 mois : 3x Le Draineur + 2x Miracle Cream + 1x Relax & Sommeil + Programme personnalisé. Économisez 20%.",
    
    includes: [
      { name: 'Le Draineur', quantity: '3x', value: '75€' },
      { name: 'Miracle Cream', quantity: '2x', value: '64€' },
      { name: 'Relax & Sommeil', quantity: '1x', value: '35€' },
      { name: 'Programme personnalisé', quantity: '1x', value: 'Offert' }
    ],
    
    benefits: [
      { icon: '📅', text: 'Cure complète de 3 mois' },
      { icon: '💰', text: 'Économisez 37€ (20%)' },
      { icon: '💳', text: 'Paiement en 3x sans frais' },
      { icon: '📋', text: 'Programme personnalisé inclus' }
    ],
    
    relatedProducts: ['pack-transformation', 'le-draineur']
  },

  'relax-et-sommeil': {
    id: 'relax-et-sommeil',
    name: 'Relax & Sommeil',
    subtitle: 'Duo Anti-Stress & Sommeil Réparateur',
    tagline: 'Retrouvez sérénité et nuits paisibles naturellement',
    price: 35.00,
    comparePrice: null,
    sku: 'BLC-RXS-001',
    rating: 4.7,
    reviewCount: 89,
    badge: 'Nouveau',
    category: 'soins-corps',
    images: [
      'https://customer-assets.emergentagent.com/job_a099ab8e-d396-4fb9-b4e8-575a47a65665/artifacts/rnr3orrs_IMG_9757.png'
    ],

    marieJulieNote: "Le stress et le manque de sommeil, c'est un cercle vicieux que je vois chez beaucoup de mes clientes. Le corps ne peut pas se régénérer correctement si on dort mal. J'ai voulu créer un duo qui agit sur les deux fronts : calmer le stress en journée et favoriser un sommeil réparateur la nuit.",

    shortDescription: "Duo complet : « Relax » (90 comprimés anti-stress) + « Sommeil » (60 comprimés, fondants en bouche). Des plantes et de la mélatonine pour retrouver calme et nuits paisibles.",

    benefits: [
      { icon: '🧘', text: 'Réduction du stress et relaxation avec Relax' },
      { icon: '🌙', text: 'Endormissement rapide avec Sommeil (mélatonine)' },
      { icon: '🌿', text: 'Extraits de plantes : chanvre, rhodiole, mélisse, eschscholtzia' },
      { icon: '🇫🇷', text: 'Fabriqué en France, comprimés fondants' }
    ],

    fullDescription: `
      <h3>« Relax » – Votre allié anti-stress au quotidien</h3>
      <p><em>Pilulier de 90 comprimés (dose journalière : jusqu'à 3 comprimés)</em></p>
      <p>Surcharge d'activité, stress du quotidien... il est parfois difficile de se détendre et de retrouver son calme. Ces comprimés anti-stress contiennent :</p>
      <ul>
        <li><strong>Huile de graines de chanvre (Cannabis sativa)</strong> – Aide à réguler vos émotions et faire face au stress</li>
        <li><strong>Rhodiole</strong> – Aide à réduire l'impact négatif du stress sur le corps</li>
        <li><strong>Mélisse</strong> – Favorise la relaxation et le bien-être mental et physique</li>
      </ul>

      <h3>« Sommeil » – Pour un endormissement rapide et réparateur</h3>
      <p><em>Pilulier de 60 comprimés fondants (dose journalière : 2 comprimés)</em></p>
      <p>Découvrez « Sommeil », notre comprimé qui fond dans la bouche, pour vous aider à vous endormir plus rapidement et avoir une qualité de sommeil réparatrice.</p>
      <ul>
        <li><strong>Mélatonine (0.9 mg/comprimé)</strong> – Contribue à réduire le temps d'endormissement</li>
        <li><strong>Eschscholtzia</strong> – Plante qui contribue à l'amélioration du sommeil</li>
      </ul>
      <p>Pris quelques minutes avant le coucher, ils vous aideront à préparer idéalement le sommeil et à vous endormir sereinement.</p>

      <h3>Pour les 100 premières commandes : 1 Miracle Cream offerte !</h3>
      <p><em>Offre limitée – profitez-en tant qu'il est encore temps.</em></p>
    `,

    composition: {
      title: 'Ce qu\'il y a dedans',
      ingredients: [
        { name: 'Huile de graines de chanvre', amount: 'Dosée', benefit: 'Régulation émotionnelle, gestion du stress' },
        { name: 'Rhodiole (extrait)', amount: 'Dosée', benefit: 'Réduit l\'impact du stress sur le corps' },
        { name: 'Mélisse (extrait)', amount: 'Dosée', benefit: 'Relaxation et bien-être mental' },
        { name: 'Mélatonine', amount: '0.9 mg/comprimé', benefit: 'Réduit le temps d\'endormissement' },
        { name: 'Eschscholtzia (extrait)', amount: 'Dosée', benefit: 'Amélioration de la qualité du sommeil' }
      ],
      freeFrom: ['Gluten', 'Lactose', 'Additifs artificiels', 'Colorants', 'OGM'],
      certifications: ['Vegan', 'Fabriqué en France', 'Sans cruauté']
    },

    usage: {
      title: 'Comment les utiliser',
      instructions: 'Relax : jusqu\'à 3 comprimés par jour. Sommeil : 2 comprimés fondants quelques minutes avant le coucher.',
      tips: [
        'Relax : prenez 1 à 3 comprimés dans la journée selon votre niveau de stress',
        'Sommeil : laissez fondre 2 comprimés sous la langue 15 min avant le coucher',
        'Commencez par Relax en journée pour réduire le stress, puis Sommeil le soir',
        'Pour des résultats optimaux, utilisez le duo pendant au moins 1 mois'
      ],
      warnings: [
        'Déconseillé aux femmes enceintes ou allaitantes sans avis médical',
        'La mélatonine peut interagir avec certains médicaments – consultez votre médecin',
        'Ne pas conduire après la prise de Sommeil'
      ]
    },

    reviews: [
      {
        name: 'Isabelle D.',
        rating: 5,
        date: '25/01/2026',
        verified: true,
        text: 'Le duo Relax & Sommeil a changé mes nuits ! Je m\'endors en 15 minutes au lieu d\'1h. Et en journée, Relax m\'aide vraiment à gérer le stress au travail. Merci Marie-Julie !',
        helpful: 42
      },
      {
        name: 'Catherine B.',
        rating: 5,
        date: '18/01/2026',
        verified: true,
        text: 'Les comprimés Sommeil qui fondent en bouche, c\'est génial. Pas besoin d\'eau, c\'est pratique. Et l\'effet est rapide, en 20 min je suis partie. Je recommande.',
        helpful: 38
      },
      {
        name: 'Pauline M.',
        rating: 4,
        date: '10/01/2026',
        verified: true,
        text: 'Bon produit. Relax est efficace pour le stress du quotidien. Pour Sommeil, il m\'a fallu quelques jours pour trouver le bon timing (15 min avant le coucher, pas plus). Maintenant ça marche bien.',
        helpful: 21
      }
    ],

    faq: [
      {
        question: 'Je peux prendre Relax et Sommeil en même temps ?',
        answer: 'Oui, c\'est même le but du duo ! Relax en journée pour gérer le stress, et Sommeil le soir avant le coucher. Ils sont complémentaires et ne contiennent pas les mêmes actifs.'
      },
      {
        question: 'La mélatonine, c\'est addictif ?',
        answer: 'Non, la mélatonine n\'est pas addictive. C\'est une hormone que votre corps produit naturellement. Nos comprimés contiennent 0.9 mg, une dose physiologique qui aide simplement votre corps à retrouver son rythme naturel.'
      },
      {
        question: 'Combien de temps avant de voir des résultats ?',
        answer: 'Pour Sommeil, l\'effet est quasi immédiat (15-30 min). Pour Relax, les effets sur le stress se ressentent généralement après 1 à 2 semaines d\'utilisation régulière.'
      },
      {
        question: 'C\'est quoi l\'offre Miracle Cream offerte ?',
        answer: 'Pour les 100 premières commandes de Relax & Sommeil, nous offrons une Miracle Cream ! C\'est notre façon de vous remercier de tester cette nouveauté. L\'offre est automatiquement appliquée.'
      }
    ],

    relatedProducts: ['le-draineur', 'miracle-cream', 'pack-transformation']
  }
};

export const getProductBySlug = (slug) => {
  return productsData[slug] || null;
};

export const getAllProducts = () => {
  return Object.values(productsData);
};

export const getRelatedProducts = (productSlug) => {
  const product = productsData[productSlug];
  if (!product || !product.relatedProducts) return [];
  return product.relatedProducts.map(slug => productsData[slug]).filter(Boolean);
};
