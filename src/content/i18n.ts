export type LocaleCode = 'en' | 'es' | 'fr' | 'pl' | 'tr';

export interface LanguageOption {
  code: LocaleCode;
  shortLabel: string;
  nativeName: string;
  englishName: string;
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { code: 'en', shortLabel: 'EN', nativeName: 'English (UK)', englishName: 'English' },
  { code: 'es', shortLabel: 'ES', nativeName: 'Español', englishName: 'Spanish' },
  { code: 'fr', shortLabel: 'FR', nativeName: 'Français', englishName: 'French' },
  { code: 'pl', shortLabel: 'PL', nativeName: 'Polski', englishName: 'Polish' },
  { code: 'tr', shortLabel: 'TR', nativeName: 'Türkçe', englishName: 'Turkish' },
] as const;

export interface UiDictionary {
  tickerPrefix: string;
  bookCallShort: string;
  nav: {
    services: string;
    work: string;
    pricing: string;
    aiTools: string;
    blog: string;
    resources: string;
    about: string;
    contact: string;
    freeDemoCta: string;
    allServices: string;
    allDemos: string;
    howItWorks: string;
    pdfLibrary: string;
    newsletter: string;
    faq: string;
  };
  megaHeadings: {
    websitesFoundations: string;
    aiFrontDesk: string;
    getFoundLocally: string;
    startOnUs: string;
    freeGuides: string;
    journalLearn: string;
  };
  hero: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    footnotePrefix: string;
    footnoteLink: string;
  };
  homeSections: {
    deckKicker: string;
    deckLine1: string;
    deckLine2: string;
    deckSub: string;
    problemEyebrow: string;
    problemHeadline: string;
    rhythmKicker: string;
    rhythmLine1: string;
    rhythmLine2: string;
    workKicker: string;
    workHeadline: string;
    workAllLink: string;
    voicesKicker: string;
    voicesLine1: string;
    voicesLine2: string;
    blogKicker: string;
    blogHeadline: string;
    blogAllLink: string;
    guidesKicker: string;
    guidesHeadline: string;
    pricingKicker: string;
    pricingHeadline: string;
    closingDemoTitle: string;
    closingGuideTitle: string;
  };
  newsletter: {
    eyebrow: string;
    headline: string;
    buttonLabel: string;
    placeholder: string;
    disclaimer: string;
    successMessage: string;
  };
  servicePage: {
    painKicker: string;
    painHeadline: string;
    watchHeadline1: string;
    watchHeadline2: string;
    whoHeadline: string;
    whyHeadline1: string;
    whyHeadline2: string;
    faqKicker: string;
    faqHeadline: string;
    relatedKicker: string;
    relatedHeadline: string;
    backToServices: string;
  };
  blogPage: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    allCategories: string;
    readArticle: string;
    backToBlog: string;
    keyTakeaways: string;
    relatedArticles: string;
  };
  footer: {
    services: string;
    guidesDemos: string;
    company: string;
    noCookies: string;
  };
}

export const TRANSLATIONS: Record<LocaleCode, UiDictionary> = {
  en: {
    tickerPrefix: 'London live',
    bookCallShort: 'Book a free call',
    nav: {
      services: 'Services',
      work: 'Work',
      pricing: 'Pricing',
      aiTools: 'AI Tools',
      blog: 'Blog',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      freeDemoCta: 'Get a free demo',
      allServices: 'All 8 services',
      allDemos: 'Browse 15 live demos',
      howItWorks: 'How it works',
      pdfLibrary: 'Free PDF guides',
      newsletter: 'Fortnightly newsletter',
      faq: 'Straight answers (FAQ)',
    },
    megaHeadings: {
      websitesFoundations: 'Websites & foundations',
      aiFrontDesk: 'AI front desk',
      getFoundLocally: 'Get found locally',
      startOnUs: 'Start on us',
      freeGuides: 'Free PDF playbooks',
      journalLearn: 'Journal & guides',
    },
    hero: {
      kicker: 'London local businesses · Built, hosted & looked after',
      headlineLine1: 'Run the business.',
      headlineLine2: 'We run the online bit.',
      subheadline:
        'Websites, domains, business email and AI call-handling for London barbers, salons, trades, cleaners and cafés. One monthly price — and we build you a working demo before you pay a penny.',
      primaryCta: 'Get my free demo',
      secondaryCta: 'Plans from £39/month',
      footnotePrefix: 'Prefer to talk first?',
      footnoteLink: 'Book a free 15-minute call',
    },
    homeSections: {
      deckKicker: 'Everything handled in one place',
      deckLine1: 'Your digital front office,',
      deckLine2: 'without hiring an agency.',
      deckSub:
        'Start with a fast website that actually brings in calls. Add review requests, missed-call text-back, AI answering and cloud phones only when your business is ready.',
      problemEyebrow: 'The London high street reality',
      problemHeadline: '1 in 3 London local businesses still have no website — or one that loses callers.',
      rhythmKicker: 'How a launch actually feels',
      rhythmLine1: 'Three steps.',
      rhythmLine2: 'Live this week.',
      workKicker: 'Real working demos — click and test them',
      workHeadline: 'Built for London barbers, salons, trades, cleaners and cafés.',
      workAllLink: 'Browse all 15 live demos',
      voicesKicker: 'Built for real high-street workflows',
      voicesLine1: 'London owners talk straight.',
      voicesLine2: 'So do results.',
      blogKicker: 'The emtrc journal',
      blogHeadline: 'Websites, Maps and AI — translated into plain English.',
      blogAllLink: 'Read all journal guides',
      guidesKicker: 'Free PDF guides for London owners',
      guidesHeadline: 'Rather read first? Take our playbooks free.',
      pricingKicker: 'Straightforward pricing',
      pricingHeadline: 'One monthly price. No surprises.',
      closingDemoTitle: 'See your new website in 2 working days.',
      closingGuideTitle: 'Not ready for a demo yet?',
    },
    newsletter: {
      eyebrow: 'The London Local Dispatch',
      headline: 'One useful email a fortnight.',
      buttonLabel: 'Join free',
      placeholder: 'you@yourbusiness.co.uk',
      disclaimer: 'No spam, ever. One click to unsubscribe, and we never sell your address.',
      successMessage: 'You are on the list. Look out for the next London Local Dispatch in your inbox.',
    },
    servicePage: {
      painKicker: 'The pain this kills',
      painHeadline: 'Sound familiar?',
      watchHeadline1: 'Watch it',
      watchHeadline2: 'actually work.',
      whoHeadline: 'Who this is for.',
      whyHeadline1: 'Why ours',
      whyHeadline2: 'beats DIY.',
      faqKicker: 'Straight answers',
      faqHeadline: 'The questions London owners actually ask.',
      relatedKicker: 'Pairs cleanly with',
      relatedHeadline: 'Other services under the same roof.',
      backToServices: 'All services',
    },
    blogPage: {
      kicker: 'The emtrc journal · Plain-English London guides',
      headlineLine1: 'Websites, Maps and AI,',
      headlineLine2: 'translated into plain English.',
      subheadline:
        'Practical guides written for London barbers, salons, trades, cleaners and cafés. Every article passes one test: can you read it with a coffee and act on it by Friday?',
      allCategories: 'All guides',
      readArticle: 'Read guide',
      backToBlog: 'Back to all guides',
      keyTakeaways: 'In short — the key takeaways',
      relatedArticles: 'Keep reading',
    },
    footer: {
      services: 'Services',
      guidesDemos: 'Free guides & demos',
      company: 'Company',
      noCookies: 'No cookies · No third-party trackers',
    },
  },
  es: {
    tickerPrefix: 'Londres hoy',
    bookCallShort: 'Reserva una llamada',
    nav: {
      services: 'Servicios',
      work: 'Ejemplos',
      pricing: 'Precios',
      aiTools: 'Herramientas IA',
      blog: 'Blog',
      resources: 'Recursos',
      about: 'Nosotros',
      contact: 'Contacto',
      freeDemoCta: 'Pedir demo gratis',
      allServices: 'Los 8 servicios',
      allDemos: 'Ver 15 demos en vivo',
      howItWorks: 'Cómo funciona',
      pdfLibrary: 'Guías PDF gratis',
      newsletter: 'Boletín quincenal',
      faq: 'Preguntas frecuentes',
    },
    megaHeadings: {
      websitesFoundations: 'Webs y base digital',
      aiFrontDesk: 'Recepción con IA',
      getFoundLocally: 'Visibilidad local',
      startOnUs: 'Empieza sin riesgo',
      freeGuides: 'Guías PDF gratuitas',
      journalLearn: 'Blog y aprendizaje',
    },
    hero: {
      kicker: 'Negocios locales en Londres · Diseño, alojamiento y cuidado',
      headlineLine1: 'Dirige tu negocio.',
      headlineLine2: 'Nosotros llevamos lo digital.',
      subheadline:
        'Webs, dominios, correo profesional y atención de llamadas con IA para barberías, salones, técnicos, limpieza y cafeterías en Londres. Un solo precio mensual y te creamos una demo real antes de pagar nada.',
      primaryCta: 'Pedir mi demo gratis',
      secondaryCta: 'Planes desde £39/mes',
      footnotePrefix: '¿Prefieres hablar primero?',
      footnoteLink: 'Reserva una llamada gratuita de 15 min',
    },
    homeSections: {
      deckKicker: 'Todo gestionado en un solo lugar',
      deckLine1: 'Tu oficina digital,',
      deckLine2: 'sin pagar una agencia cara.',
      deckSub:
        'Empieza con una web rápida que genere llamadas. Añade reseñas, SMS por llamada perdida, recepcionista IA y teléfono en la nube solo cuando lo necesites.',
      problemEyebrow: 'La realidad comercial en Londres',
      problemHeadline: '1 de cada 3 negocios locales en Londres no tiene web — o pierde llamadas cada día.',
      rhythmKicker: 'Así se lanza tu web',
      rhythmLine1: 'Tres pasos.',
      rhythmLine2: 'En marcha esta semana.',
      workKicker: 'Demos reales interactivas — pruébalas ahora',
      workHeadline: 'Creadas para barberías, salones, oficios, limpieza y cafeterías.',
      workAllLink: 'Ver las 15 demos en vivo',
      voicesKicker: 'Pensado para negocios locales reales',
      voicesLine1: 'Los dueños hablan claro.',
      voicesLine2: 'Los resultados también.',
      blogKicker: 'El diario de emtrc',
      blogHeadline: 'Webs, Google Maps e IA — explicados sin tecnicismos.',
      blogAllLink: 'Leer todos los artículos',
      guidesKicker: 'Guías PDF gratuitas para dueños en Londres',
      guidesHeadline: '¿Prefieres leer primero? Descarga nuestras guías gratis.',
      pricingKicker: 'Precios transparentes',
      pricingHeadline: 'Una cuota mensual. Sin sorpresas.',
      closingDemoTitle: 'Ve tu nueva web en 2 días laborables.',
      closingGuideTitle: '¿Aún no estás listo para una demo?',
    },
    newsletter: {
      eyebrow: 'The London Local Dispatch',
      headline: 'Un correo útil cada quince días.',
      buttonLabel: 'Suscribirme gratis',
      placeholder: 'tu@tunegocio.co.uk',
      disclaimer: 'Sin spam. Baja en un clic y nunca vendemos tu correo.',
      successMessage: '¡Listo! Ya estás en la lista para recibir el próximo boletín.',
    },
    servicePage: {
      painKicker: 'El problema que resolvemos',
      painHeadline: '¿Te suena familiar?',
      watchHeadline1: 'Míralo',
      watchHeadline2: 'en acción.',
      whoHeadline: 'Para quién es este servicio.',
      whyHeadline1: 'Por qué supera',
      whyHeadline2: 'al hazlo tú mismo.',
      faqKicker: 'Respuestas claras',
      faqHeadline: 'Preguntas frecuentes de negocios en Londres.',
      relatedKicker: 'Combina perfectamente con',
      relatedHeadline: 'Otros servicios bajo el mismo techo.',
      backToServices: 'Todos los servicios',
    },
    blogPage: {
      kicker: 'El diario de emtrc · Guías claras para Londres',
      headlineLine1: 'Webs, Maps e IA,',
      headlineLine2: 'explicados en lenguaje claro.',
      subheadline:
        'Guías prácticas para negocios locales en Londres. Cada artículo se lee con un café y se puede aplicar esta misma semana.',
      allCategories: 'Todas las guías',
      readArticle: 'Leer guía',
      backToBlog: 'Volver al blog',
      keyTakeaways: 'En resumen — puntos clave',
      relatedArticles: 'Seguir leyendo',
    },
    footer: {
      services: 'Servicios',
      guidesDemos: 'Guías y demos gratis',
      company: 'Empresa',
      noCookies: 'Sin cookies · Sin rastreadores externos',
    },
  },
  fr: {
    tickerPrefix: 'Londres en direct',
    bookCallShort: 'Réserver un appel',
    nav: {
      services: 'Services',
      work: 'Exemples',
      pricing: 'Tarifs',
      aiTools: 'Outils IA',
      blog: 'Blog',
      resources: 'Ressources',
      about: 'À propos',
      contact: 'Contact',
      freeDemoCta: 'Démo gratuite',
      allServices: 'Les 8 services',
      allDemos: 'Voir les 15 démos',
      howItWorks: 'Comment ça marche',
      pdfLibrary: 'Guides PDF gratuits',
      newsletter: 'Lettre bimensuelle',
      faq: 'Questions fréquentes',
    },
    megaHeadings: {
      websitesFoundations: 'Sites & bases digitales',
      aiFrontDesk: 'Accueil IA',
      getFoundLocally: 'Visibilité locale',
      startOnUs: 'Essayez sans risque',
      freeGuides: 'Guides PDF gratuits',
      journalLearn: 'Blog & conseils',
    },
    hero: {
      kicker: 'Commerces locaux à Londres · Créés, hébergés et gérés',
      headlineLine1: 'Gérez votre métier.',
      headlineLine2: 'On gère le reste en ligne.',
      subheadline:
        'Sites web, noms de domaine, emails professionnels et réception IA pour barbiers, salons, artisans, sociétés de nettoyage et cafés à Londres. Un tarif mensuel clair — avec une démo fonctionnelle avant de payer.',
      primaryCta: 'Obtenir ma démo gratuite',
      secondaryCta: 'Offres dès £39/mois',
      footnotePrefix: 'Vous préférez en discuter ?',
      footnoteLink: 'Réserver un appel gratuit de 15 min',
    },
    homeSections: {
      deckKicker: 'Tout au même endroit',
      deckLine1: 'Votre accueil digital,',
      deckLine2: 'sans payer une agence.',
      deckSub:
        'Démarrez avec un site rapide qui déclenche des appels. Ajoutez avis Google, SMS sur appel manqué, réceptionniste IA et téléphonie cloud à votre rythme.',
      problemEyebrow: 'La réalité des commerces londoniens',
      problemHeadline: '1 commerce local sur 3 à Londres n’a pas de site — ou perd des clients chaque jour.',
      rhythmKicker: 'Votre lancement en pratique',
      rhythmLine1: 'Trois étapes.',
      rhythmLine2: 'En ligne cette semaine.',
      workKicker: 'Démos réelles interactives — testez-les',
      workHeadline: 'Conçus pour barbiers, salons, artisans, nettoyage et cafés.',
      workAllLink: 'Explorer les 15 démos',
      voicesKicker: 'Pensé pour le terrain',
      voicesLine1: 'Les commerçants parlent vrai.',
      voicesLine2: 'Les résultats aussi.',
      blogKicker: 'Le journal emtrc',
      blogHeadline: 'Sites web, Google Maps et IA — expliqués simplement.',
      blogAllLink: 'Lire tous les guides',
      guidesKicker: 'Guides PDF gratuits',
      guidesHeadline: 'Envie de lire d’abord ? Téléchargez nos guides gratuits.',
      pricingKicker: 'Tarifs transparents',
      pricingHeadline: 'Un seul prix mensuel. Zéro surprise.',
      closingDemoTitle: 'Voyez votre nouveau site sous 2 jours ouvrés.',
      closingGuideTitle: 'Pas encore prêt pour une démo ?',
    },
    newsletter: {
      eyebrow: 'The London Local Dispatch',
      headline: 'Un email utile tous les 15 jours.',
      buttonLabel: 'S’inscrire',
      placeholder: 'vous@votreentreprise.co.uk',
      disclaimer: 'Zéro spam. Désinscription en un clic, adresse jamais revendue.',
      successMessage: 'Vous êtes inscrit. Surveillez le prochain numéro dans votre boîte mail.',
    },
    servicePage: {
      painKicker: 'Le problème résolu',
      painHeadline: 'Ça vous parle ?',
      watchHeadline1: 'Voyez-le',
      watchHeadline2: 'en action.',
      whoHeadline: 'Pour qui est ce service.',
      whyHeadline1: 'Pourquoi mieux',
      whyHeadline2: 'que le bricolage.',
      faqKicker: 'Réponses directes',
      faqHeadline: 'Les questions que posent vraiment les gérants.',
      relatedKicker: 'Se combine avec',
      relatedHeadline: 'Nos autres services dédiés.',
      backToServices: 'Tous les services',
    },
    blogPage: {
      kicker: 'Le journal emtrc · Guides pratiques Londres',
      headlineLine1: 'Sites, Maps et IA,',
      headlineLine2: 'traduits en langage clair.',
      subheadline:
        'Guides concrets pour les indépendants de Londres : lisibles en 5 minutes, applicables dès cette semaine.',
      allCategories: 'Tous les guides',
      readArticle: 'Lire le guide',
      backToBlog: 'Retour au blog',
      keyTakeaways: 'En bref — points essentiels',
      relatedArticles: 'Continuer la lecture',
    },
    footer: {
      services: 'Services',
      guidesDemos: 'Guides & démos',
      company: 'Entreprise',
      noCookies: 'Sans cookies · Sans traceurs tiers',
    },
  },
  pl: {
    tickerPrefix: 'Londyn na żywo',
    bookCallShort: 'Umów darmową rozmowę',
    nav: {
      services: 'Usługi',
      work: 'Realizacje',
      pricing: 'Cennik',
      aiTools: 'Narzędzia AI',
      blog: 'Blog',
      resources: 'Materiały',
      about: 'O nas',
      contact: 'Kontakt',
      freeDemoCta: 'Darmowe demo',
      allServices: 'Wszystkie 8 usług',
      allDemos: 'Zobacz 15 demo na żywo',
      howItWorks: 'Jak to działa',
      pdfLibrary: 'Darmowe poradniki PDF',
      newsletter: 'Dwutygodnik',
      faq: 'Pytania i odpowiedzi',
    },
    megaHeadings: {
      websitesFoundations: 'Strony i podstawy',
      aiFrontDesk: 'Recepcja AI',
      getFoundLocally: 'Widoczność lokalna',
      startOnUs: 'Zacznij bez ryzyka',
      freeGuides: 'Darmowe poradniki PDF',
      journalLearn: 'Blog i wiedza',
    },
    hero: {
      kicker: 'Lokalne firmy w Londynie · Projekt, hosting i opieka',
      headlineLine1: 'Prowadź firmę.',
      headlineLine2: 'My zajmiemy się siecią.',
      subheadline:
        'Strony internetowe, domeny, firmowa poczta i obsługa połączeń AI dla barberów, salonów, fachowców, firm sprzątających i kawiarni w Londynie. Jedna stała opłata miesięczna — najpierw zobaczysz gotowe demo za darmo.',
      primaryCta: 'Zamów darmowe demo',
      secondaryCta: 'Plany od £39/mies.',
      footnotePrefix: 'Wolisz najpierw porozmawiać?',
      footnoteLink: 'Umów bezpłatną 15-min rozmowę',
    },
    homeSections: {
      deckKicker: 'Wszystko w jednym miejscu',
      deckLine1: 'Twoje cyfrowe biuro,',
      deckLine2: 'bez drogiej agencji.',
      deckSub:
        'Zacznij od szybkiej strony, która generuje telefony. Opinie Google, SMS po nieodebranym połączeniu, recepcjonistę AI i telefon w chmurze dodasz kiedy chcesz.',
      problemEyebrow: 'Realia lokalnych firm w Londynie',
      problemHeadline: 'Co trzecia lokalna firma w Londynie nie ma strony — albo traci klientów z Google Maps.',
      rhythmKicker: 'Jak wygląda wdrożenie',
      rhythmLine1: 'Trzy kroki.',
      rhythmLine2: 'Online jeszcze w tym tygodniu.',
      workKicker: 'Działające dema — kliknij i przetestuj',
      workHeadline: 'Dla londyńskich barberów, salonów, fachowców, sprzątania i kawiarni.',
      workAllLink: 'Zobacz wszystkie 15 dem',
      voicesKicker: 'Zbudowane pod realną pracę',
      voicesLine1: 'Właściciele mówią wprost.',
      voicesLine2: 'Wyniki też.',
      blogKicker: 'Dziennik emtrc',
      blogHeadline: 'Strony, Google Maps i AI — prostym językiem.',
      blogAllLink: 'Przeczytaj wszystkie poradniki',
      guidesKicker: 'Darmowe poradniki PDF',
      guidesHeadline: 'Wolisz najpierw poczytać? Pobierz nasze poradniki.',
      pricingKicker: 'Przejrzysty cennik',
      pricingHeadline: 'Jedna opłata miesięczna. Bez niespodzianek.',
      closingDemoTitle: 'Zobacz swoją nową stronę w 2 dni robocze.',
      closingGuideTitle: 'Jeszcze nie gotowy na demo?',
    },
    newsletter: {
      eyebrow: 'The London Local Dispatch',
      headline: 'Jeden konkretny email co dwa tygodnie.',
      buttonLabel: 'Dołącz za darmo',
      placeholder: 'ty@twojafirma.co.uk',
      disclaimer: 'Zero spamu. Wypis jednym kliknięciem, nie sprzedajemy danych.',
      successMessage: 'Jesteś na liście! Wypatruj kolejnego wydania na skrzynce.',
    },
    servicePage: {
      painKicker: 'Problem, który usuwamy',
      painHeadline: 'Brzmi znajomo?',
      watchHeadline1: 'Zobacz jak to',
      watchHeadline2: 'działa na żywo.',
      whoHeadline: 'Dla kogo jest ta usługa.',
      whyHeadline1: 'Dlaczego lepiej',
      whyHeadline2: 'niż samemu.',
      faqKicker: 'Konkretne odpowiedzi',
      faqHeadline: 'Najczęstsze pytania właścicieli firm w Londynie.',
      relatedKicker: 'Świetnie łączy się z',
      relatedHeadline: 'Pozostałe usługi pod jednym dachem.',
      backToServices: 'Wszystkie usługi',
    },
    blogPage: {
      kicker: 'Dziennik emtrc · Poradniki dla Londynu',
      headlineLine1: 'Strony, Mapy i AI,',
      headlineLine2: 'wytłumaczone po ludzku.',
      subheadline:
        'Praktyczne przewodniki dla lokalnych firm w Londynie — bez żargonu, gotowe do wdrożenia od razu.',
      allCategories: 'Wszystkie artykuły',
      readArticle: 'Czytaj poradnik',
      backToBlog: 'Wróć do bloga',
      keyTakeaways: 'W skrócie — najważniejsze wnioski',
      relatedArticles: 'Czytaj dalej',
    },
    footer: {
      services: 'Usługi',
      guidesDemos: 'Poradniki i dema',
      company: 'Firma',
      noCookies: 'Bez cookies · Bez zewnętrznych trackerów',
    },
  },
  tr: {
    tickerPrefix: 'Londra canlı',
    bookCallShort: 'Ücretsiz görüşme al',
    nav: {
      services: 'Hizmetler',
      work: 'Örnekler',
      pricing: 'Fiyatlar',
      aiTools: 'Yapay Zeka',
      blog: 'Blog',
      resources: 'Kaynaklar',
      about: 'Hakkımızda',
      contact: 'İletişim',
      freeDemoCta: 'Ücretsiz demo al',
      allServices: 'Tüm 8 hizmet',
      allDemos: '15 canlı demoyu incele',
      howItWorks: 'Nasıl çalışır',
      pdfLibrary: 'Ücretsiz PDF rehberler',
      newsletter: 'İki haftalık bülten',
      faq: 'Sık sorulan sorular',
    },
    megaHeadings: {
      websitesFoundations: 'Web siteleri ve altyapı',
      aiFrontDesk: 'Yapay zeka resepsiyon',
      getFoundLocally: 'Yerel görünürlük',
      startOnUs: 'Risksiz başla',
      freeGuides: 'Ücretsiz PDF rehberler',
      journalLearn: 'Blog ve rehberler',
    },
    hero: {
      kicker: 'Londra yerel işletmeleri · Kurulum, barındırma ve bakım',
      headlineLine1: 'İşinizi siz yönetin.',
      headlineLine2: 'Dijital tarafı bize bırakın.',
      subheadline:
        'Londra’daki berberler, kuaför salonları, ustalar, temizlik firmaları ve kafeler için web sitesi, alan adı, kurumsal e-posta ve yapay zeka çağrı yönetimi. Tek aylık fiyat — ödeme yapmadan önce çalışan demonuzu hazırlıyoruz.',
      primaryCta: 'Ücretsiz demomu iste',
      secondaryCta: 'Aylık £39’dan başlayan planlar',
      footnotePrefix: 'Önce konuşmak ister misiniz?',
      footnoteLink: 'Ücretsiz 15 dk görüşme ayarla',
    },
    homeSections: {
      deckKicker: 'Her şey tek çatı altında',
      deckLine1: 'Dijital ön büronuz,',
      deckLine2: 'ajans maliyeti olmadan.',
      deckSub:
        'Gerçek telefon getiren hızlı bir web sitesiyle başlayın. Google yorumları, cevapsız çağrı SMS’i, 7/24 AI resepsiyonist ve bulut telefonu hazır olduğunuzda ekleyin.',
      problemEyebrow: 'Londra caddelerindeki gerçek',
      problemHeadline: 'Londra’daki her 3 yerel işletmeden 1’inin web sitesi yok — ya da müşteri kaybediyor.',
      rhythmKicker: 'Kurulum süreci',
      rhythmLine1: 'Üç adım.',
      rhythmLine2: 'Bu hafta yayında.',
      workKicker: 'Gerçek çalışan demolar — tıklayıp test edin',
      workHeadline: 'Londra berberleri, salonları, ustaları, temizlik ve kafeleri için.',
      workAllLink: '15 canlı demoyu gör',
      voicesKicker: 'Gerçek iş akışları için tasarlandı',
      voicesLine1: 'İşletme sahipleri net konuşur.',
      voicesLine2: 'Sonuçlar da öyle.',
      blogKicker: 'emtrc rehberleri',
      blogHeadline: 'Web siteleri, Google Haritalar ve AI — sade dille.',
      blogAllLink: 'Tüm yazıları oku',
      guidesKicker: 'Ücretsiz PDF rehberler',
      guidesHeadline: 'Önce okumak ister misiniz? Rehberlerimizi ücretsiz indirin.',
      pricingKicker: 'Şeffaf fiyatlandırma',
      pricingHeadline: 'Tek aylık ücret. Sürpriz yok.',
      closingDemoTitle: 'Yeni web sitenizi 2 iş gününde görün.',
      closingGuideTitle: 'Henüz demoya hazır değil misiniz?',
    },
    newsletter: {
      eyebrow: 'The London Local Dispatch',
      headline: 'İki haftada bir faydalı e-posta.',
      buttonLabel: 'Ücretsiz katıl',
      placeholder: 'siz@isletmeniz.co.uk',
      disclaimer: 'Spam yok. Tek tıkla çıkabilir, adresinizi asla paylaşmayız.',
      successMessage: 'Listeye eklendiniz. Bir sonraki sayımız yakında gelen kutunuzda.',
    },
    servicePage: {
      painKicker: 'Çözdüğü sorun',
      painHeadline: 'Tanıdık geliyor mu?',
      watchHeadline1: 'Nasıl çalıştığını',
      watchHeadline2: 'canlı görün.',
      whoHeadline: 'Kimler için ideal.',
      whyHeadline1: 'Neden kendin yap',
      whyHeadline2: 'araçlarından iyi.',
      faqKicker: 'Net cevaplar',
      faqHeadline: 'Londra işletme sahiplerinin sorduğu sorular.',
      relatedKicker: 'Birlikte harika çalışır',
      relatedHeadline: 'Aynı çatı altındaki diğer hizmetler.',
      backToServices: 'Tüm hizmetler',
    },
    blogPage: {
      kicker: 'emtrc rehberleri · Londra işletmeleri için',
      headlineLine1: 'Web, Haritalar ve AI,',
      headlineLine2: 'sade dille anlatıldı.',
      subheadline:
        'Londra’daki yerel işletmeler için pratik rehberler — kahvenizi içerken okuyup bu hafta uygulayabilirsiniz.',
      allCategories: 'Tüm rehberler',
      readArticle: 'Yazıyı oku',
      backToBlog: 'Tüm yazılara dön',
      keyTakeaways: 'Kısaca — öne çıkan noktalar',
      relatedArticles: 'Okumaya devam et',
    },
    footer: {
      services: 'Hizmetler',
      guidesDemos: 'Ücretsiz rehberler ve demolar',
      company: 'Şirket',
      noCookies: 'Çerez yok · Üçüncü taraf takipçisi yok',
    },
  },
};

export function resolveLocale(input?: string | null): LocaleCode {
  if (!input) return 'en';
  const normalized = input.trim().toLowerCase().slice(0, 2);
  if (normalized === 'es' || normalized === 'fr' || normalized === 'pl' || normalized === 'tr') {
    return normalized;
  }
  return 'en';
}

export function getDictionary(locale: LocaleCode): UiDictionary {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en;
}
