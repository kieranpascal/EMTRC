import { EXTRA_TRANSLATIONS } from './i18nExtra';

export type LocaleCode = 'en' | 'zh' | 'ar' | 'es' | 'fr' | 'pt' | 'hi' | 'bn' | 'pl' | 'tr';

export interface LanguageOption {
  code: LocaleCode;
  shortLabel: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { code: 'en', shortLabel: 'EN', nativeName: 'English (UK)', englishName: 'English', dir: 'ltr' },
  { code: 'zh', shortLabel: 'ZH', nativeName: '中文 (普通话)', englishName: 'Mandarin', dir: 'ltr' },
  { code: 'ar', shortLabel: 'AR', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl' },
  { code: 'es', shortLabel: 'ES', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr' },
  { code: 'fr', shortLabel: 'FR', nativeName: 'Français', englishName: 'French', dir: 'ltr' },
  { code: 'pt', shortLabel: 'PT', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr' },
  { code: 'hi', shortLabel: 'HI', nativeName: 'हिन्दी', englishName: 'Hindi', dir: 'ltr' },
  { code: 'bn', shortLabel: 'BN', nativeName: 'বাংলা', englishName: 'Bengali', dir: 'ltr' },
  { code: 'pl', shortLabel: 'PL', nativeName: 'Polski', englishName: 'Polish', dir: 'ltr' },
  { code: 'tr', shortLabel: 'TR', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr' },
] as const;

export function isRtlLocale(code: LocaleCode): boolean {
  return code === 'ar';
}

export interface UiDictionary {
  tickerPrefix: string;
  bookCallShort: string;
  theme: {
    light: string;
    dark: string;
    switchToLight: string;
    switchToDark: string;
  };
  nav: {
    services: string;
    theApp: string;
    clientPortal: string;
    work: string;
    pricing: string;
    aiTools: string;
    blog: string;
    resources: string;
    caseStudies: string;
    training: string;
    about: string;
    contact: string;
    freeDemoCta: string;
    allServices: string;
    allDemos: string;
    howItWorks: string;
    pdfLibrary: string;
    newsletter: string;
    faq: string;
    languageLabel: string;
  };
  megaHeadings: {
    websitesFoundations: string;
    aiFrontDesk: string;
    getFoundLocally: string;
    startOnUs: string;
    freeGuides: string;
    journalLearn: string;
    livePreview: string;
    exploreService: string;
  };
  hero: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    exploreAppCta: string;
    footnotePrefix: string;
    footnoteLink: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
  };
  homeSections: {
    servicesKicker: string;
    servicesLine1: string;
    servicesLine2: string;
    servicesSub: string;
    servicesAllLink: string;
    beforeAfterKicker: string;
    beforeAfterHeadline: string;
    caseStudiesAllLink: string;
    deckKicker: string;
    deckLine1: string;
    deckLine2: string;
    deckSub: string;
    problemEyebrow: string;
    problemHeadline: string;
    rhythmKicker: string;
    rhythmLine1: string;
    rhythmLine2: string;
    rhythmFullLink: string;
    workKicker: string;
    workHeadline: string;
    workAllLink: string;
    openLiveDemo: string;
    trainingKicker: string;
    trainingHeadline: string;
    trainingBody: string;
    trainingOpenCta: string;
    trainingFaqCta: string;
    voicesKicker: string;
    voicesLine1: string;
    voicesLine2: string;
    blogKicker: string;
    blogHeadline: string;
    blogAllLink: string;
    guidesKicker: string;
    guidesHeadline: string;
    guidesSearchLink: string;
    downloadPdfCta: string;
    pricingKicker: string;
    pricingHeadline: string;
    closingDemoTitle: string;
    closingGuideTitle: string;
    readCaseStudy: string;
  };
  workPage: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    ctaLabel: string;
    allTrades: string;
    openDemo: string;
    bottomKicker: string;
    bottomHeadline: string;
    bottomBody: string;
    bottomCta: string;
  };
  servicesPage: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    viewPricing: string;
    exploreService: string;
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
    searchLabel: string;
    searchPlaceholder: string;
    allCategories: string;
    readArticle: string;
    backToBlog: string;
    keyTakeaways: string;
    relatedArticles: string;
  };
  footer: {
    tagline: string;
    services: string;
    guidesDemos: string;
    company: string;
    privacy: string;
    terms: string;
    noCookies: string;
  };
}

export const TRANSLATIONS: Record<LocaleCode, UiDictionary> = {
  en: {
    tickerPrefix: 'London live',
    bookCallShort: 'Book a free call',
    theme: {
      light: 'Light',
      dark: 'Dark',
      switchToLight: 'Switch to light mode',
      switchToDark: 'Switch to dark mode',
    },
    nav: {
      services: 'Services',
      theApp: 'The App',
      clientPortal: 'Client Portal',
      work: 'Work',
      pricing: 'Pricing',
      aiTools: 'AI Tools',
      blog: 'Signals',
      resources: 'Resources',
      caseStudies: 'Case Studies',
      training: 'Training Centre',
      about: 'About',
      contact: 'Contact',
      freeDemoCta: 'Get a free demo',
      allServices: 'All 8 services',
      allDemos: 'Browse 15 live demos',
      howItWorks: 'How it works',
      pdfLibrary: 'Free PDF guides',
      newsletter: 'Fortnightly newsletter',
      faq: 'Straight answers (FAQ)',
      languageLabel: 'Language',
    },
    megaHeadings: {
      websitesFoundations: 'Websites & foundations',
      aiFrontDesk: 'AI front desk',
      getFoundLocally: 'Get found locally',
      startOnUs: 'Start on us',
      freeGuides: 'Free PDF playbooks',
      journalLearn: 'Journal & guides',
      livePreview: 'Featured studio preview',
      exploreService: 'Explore service',
    },
    hero: {
      kicker: 'London local businesses · Built, hosted & looked after',
      headlineLine1: 'Run the business.',
      headlineLine2: 'We run the online bit.',
      subheadline:
        'Websites, domains, business email and AI call-handling for London barbers, salons, trades, cleaners and cafés. One monthly price — and we build you a working demo before you pay a penny.',
      primaryCta: 'Get my free demo',
      secondaryCta: 'Plans from £39/month',
      exploreAppCta: 'Explore the emtrc App',
      footnotePrefix: 'Prefer to talk first?',
      footnoteLink: 'Book a free 15-minute call',
      stat1Label: 'Typical mobile 4G load time',
      stat2Label: 'To your free working demo',
      stat3Label: 'Live London trade demos online',
      stat4Label: 'Starting monthly managed plan',
    },
    homeSections: {
      servicesKicker: 'Eight specialist studio disciplines · One London partner',
      servicesLine1: 'Everything your shop needs,',
      servicesLine2: 'engineered under one roof.',
      servicesSub:
        'Every capability is designed, photographed, hosted and supported by our London studio — never patched together from fragile third-party plugins.',
      servicesAllLink: 'Compare all 8 services',
      beforeAfterKicker: 'Why London clients choose a real studio over DIY AI',
      beforeAfterHeadline: 'What your neighbours see today — vs with emtrc.',
      caseStudiesAllLink: 'Explore all 6 London case studies',
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
      rhythmFullLink: 'See the full launch process',
      workKicker: 'Real working demos — click and test them',
      workHeadline: 'Built for London barbers, salons, trades, cleaners and cafés.',
      workAllLink: 'Browse all 15 live demos',
      openLiveDemo: 'Open live demo',
      trainingKicker: 'Owner Training Centre & Straight Answers',
      trainingHeadline: 'Free checklists built for busy shop owners — not marketers.',
      trainingBody:
        'Whether you work with us today or next year, our interactive Training Centre walks you step by step through Google Maps hygiene, daylight smartphone photography, UK DMCC-compliant reviews and preparing your 020 phone line before 31 January 2027.',
      trainingOpenCta: 'Open Training Centre',
      trainingFaqCta: 'Browse all 24 FAQs',
      voicesKicker: 'Built for real high-street workflows',
      voicesLine1: 'London owners talk straight.',
      voicesLine2: 'So do results.',
      blogKicker: 'emtrc Signals · Field Intelligence',
      blogHeadline: 'Websites, Maps and AI — translated into plain English.',
      blogAllLink: 'Read all Signals briefings',
      guidesKicker: 'Free PDF guides for London owners',
      guidesHeadline: 'Rather read first? Take our playbooks free.',
      guidesSearchLink: 'Search all resources →',
      downloadPdfCta: 'Download free PDF',
      pricingKicker: 'Straightforward pricing',
      pricingHeadline: 'One monthly price. No surprises.',
      closingDemoTitle: 'See your new website in 2 working days.',
      closingGuideTitle: 'Not ready for a demo yet?',
      readCaseStudy: 'Read case study',
    },
    workPage: {
      kicker: 'Live portfolio · 15 clickable London demos',
      headlineLine1: 'Real working demos.',
      headlineLine2: 'Not flat screenshots.',
      description:
        'Every card below opens a live, interactive demo website across five London trades and three studio aesthetics (Bold, Elegant and Minimal) — the exact standard we craft for your free 48-hour demo.',
      ctaLabel: 'Get one built for your business',
      allTrades: 'All trades',
      openDemo: 'Open interactive demo',
      bottomKicker: 'Don’t see your exact trade?',
      bottomHeadline: 'We build your free demo around your actual shop, services & London postcode.',
      bottomBody:
        'Every site is tailored to your colours, photos, prices, booking platform and local borough — delivered in 2 working days with zero obligation.',
      bottomCta: 'Request my free demo',
    },
    servicesPage: {
      kicker: '8 dedicated services · Everything under one London roof',
      headlineLine1: 'Everything your business needs online.',
      headlineLine2: 'Each with its own plain-English plan.',
      description:
        'Start with a fast website that turns Google Maps searches into phone calls. Add professional email, automated review requests, missed-call text-back, a 24/7 AI receptionist or cloud VoIP whenever you are ready.',
      viewPricing: 'View pricing',
      exploreService: 'Explore service',
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
      kicker: 'emtrc Signals · Plain-English London Field Intelligence',
      headlineLine1: 'Websites, Maps and AI,',
      headlineLine2: 'decoded into plain English.',
      subheadline:
        'Practical field intelligence written for London barbers, salons, trades, cleaners and cafés. Every briefing pairs live interactive charts with actions you can ship by Friday.',
      searchLabel: 'Search Signals by title or keyword',
      searchPlaceholder: 'Try PSTN, Google Maps, ChatGPT, 020, domain…',
      allCategories: 'All Signals',
      readArticle: 'Read briefing',
      backToBlog: 'Back to Signals',
      keyTakeaways: 'In short — the key takeaways',
      relatedArticles: 'Keep reading',
    },
    footer: {
      tagline:
        'Websites, domains, business email and AI front-office tools for London local businesses. Built, hosted and looked after for one monthly price.',
      services: 'Services',
      guidesDemos: 'Free guides & demos',
      company: 'Company',
      privacy: 'Privacy policy',
      terms: 'Terms',
      noCookies: 'No cookies · No third-party trackers',
    },
  },
  es: {
    tickerPrefix: 'Londres hoy',
    bookCallShort: 'Reserva una llamada',
    theme: {
      light: 'Claro',
      dark: 'Oscuro',
      switchToLight: 'Cambiar a modo claro',
      switchToDark: 'Cambiar a modo oscuro',
    },
    nav: {
      services: 'Servicios',
      theApp: 'La App',
      clientPortal: 'Portal Clientes',
      work: 'Ejemplos',
      pricing: 'Precios',
      aiTools: 'Herramientas IA',
      blog: 'Señales',
      resources: 'Recursos',
      caseStudies: 'Casos de Éxito',
      training: 'Centro Formativo',
      about: 'Nosotros',
      contact: 'Contacto',
      freeDemoCta: 'Pedir demo gratis',
      allServices: 'Los 8 servicios',
      allDemos: 'Ver 15 demos en vivo',
      howItWorks: 'Cómo funciona',
      pdfLibrary: 'Guías PDF gratis',
      newsletter: 'Boletín quincenal',
      faq: 'Preguntas frecuentes',
      languageLabel: 'Idioma',
    },
    megaHeadings: {
      websitesFoundations: 'Webs y base digital',
      aiFrontDesk: 'Recepción con IA',
      getFoundLocally: 'Visibilidad local',
      startOnUs: 'Empieza sin riesgo',
      freeGuides: 'Guías PDF gratuitas',
      journalLearn: 'Blog y aprendizaje',
      livePreview: 'Vista previa del estudio',
      exploreService: 'Explorar servicio',
    },
    hero: {
      kicker: 'Negocios locales en Londres · Diseño, alojamiento y cuidado',
      headlineLine1: 'Dirige tu negocio.',
      headlineLine2: 'Nosotros llevamos lo digital.',
      subheadline:
        'Webs, dominios, correo profesional y atención de llamadas con IA para barberías, salones, técnicos, limpieza y cafeterías en Londres. Un solo precio mensual y te creamos una demo real antes de pagar nada.',
      primaryCta: 'Pedir mi demo gratis',
      secondaryCta: 'Planes desde £39/mes',
      exploreAppCta: 'Explorar la App emtrc',
      footnotePrefix: '¿Prefieres hablar primero?',
      footnoteLink: 'Reserva una llamada gratuita de 15 min',
      stat1Label: 'Carga media en móvil 4G',
      stat2Label: 'Para tu demo real gratuita',
      stat3Label: 'Demos en vivo por oficio',
      stat4Label: 'Plan mensual gestionado desde',
    },
    homeSections: {
      servicesKicker: 'Ocho disciplinas especializadas · Un estudio en Londres',
      servicesLine1: 'Todo lo que necesita tu local,',
      servicesLine2: 'diseñado bajo un mismo techo.',
      servicesSub:
        'Cada servicio es diseñado, alojado y gestionado por nuestro estudio en Londres — sin plantillas frágiles ni plugins rotos.',
      servicesAllLink: 'Comparar los 8 servicios',
      beforeAfterKicker: 'Por qué los clientes eligen un estudio real',
      beforeAfterHeadline: 'Lo que ven tus vecinos hoy — frente a emtrc.',
      caseStudiesAllLink: 'Ver los 6 casos de Londres',
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
      rhythmFullLink: 'Ver el proceso completo',
      workKicker: 'Demos reales interactivas — pruébalas ahora',
      workHeadline: 'Creadas para barberías, salones, oficios, limpieza y cafeterías.',
      workAllLink: 'Ver las 15 demos en vivo',
      openLiveDemo: 'Abrir demo en vivo',
      trainingKicker: 'Centro de Formación y Respuestas Claras',
      trainingHeadline: 'Guías prácticas para dueños ocupados — no para agencias.',
      trainingBody:
        'Nuestro Centro de Formación te guía paso a paso por Google Maps, fotografía con móvil, reseñas legales en Reino Unido y el cambio de líneas 020 antes del 31 de enero de 2027.',
      trainingOpenCta: 'Abrir Centro Formativo',
      trainingFaqCta: 'Ver las 24 preguntas frecuentes',
      voicesKicker: 'Pensado para negocios locales reales',
      voicesLine1: 'Los dueños hablan claro.',
      voicesLine2: 'Los resultados también.',
      blogKicker: 'El diario de emtrc',
      blogHeadline: 'Webs, Google Maps e IA — explicados sin tecnicismos.',
      blogAllLink: 'Leer todos los artículos',
      guidesKicker: 'Guías PDF gratuitas para dueños en Londres',
      guidesHeadline: '¿Prefieres leer primero? Descarga nuestras guías gratis.',
      guidesSearchLink: 'Buscar todos los recursos →',
      downloadPdfCta: 'Descargar PDF gratis',
      pricingKicker: 'Precios transparentes',
      pricingHeadline: 'Una cuota mensual. Sin sorpresas.',
      closingDemoTitle: 'Ve tu nueva web en 2 días laborables.',
      closingGuideTitle: '¿Aún no estás listo para una demo?',
      readCaseStudy: 'Leer caso de éxito',
    },
    workPage: {
      kicker: 'Portafolio en vivo · 15 demos interactivas en Londres',
      headlineLine1: 'Demos reales en vivo.',
      headlineLine2: 'No capturas estáticas.',
      description:
        'Cada tarjeta abre una web interactiva real en cinco oficios de Londres y tres estilos de estudio — el mismo estándar que creamos para tu demo gratuita en 48 horas.',
      ctaLabel: 'Pide una para tu negocio',
      allTrades: 'Todos los oficios',
      openDemo: 'Abrir demo interactiva',
      bottomKicker: '¿No ves tu oficio exacto?',
      bottomHeadline: 'Creamos tu demo gratuita con tu local, precios y código postal de Londres.',
      bottomBody:
        'Cada web se adapta a tus colores, fotos, tarifas y plataforma de reservas — entregada en 2 días laborables sin compromiso.',
      bottomCta: 'Solicitar mi demo gratis',
    },
    servicesPage: {
      kicker: '8 servicios dedicados · Todo bajo un mismo techo en Londres',
      headlineLine1: 'Todo lo que tu negocio necesita online.',
      headlineLine2: 'Cada servicio con un plan claro.',
      description:
        'Empieza con una web ultrarrápida que convierte búsquedas de Google Maps en llamadas. Añade correo, reseñas, SMS instantáneo, recepcionista IA o VoIP cuando quieras.',
      viewPricing: 'Ver precios',
      exploreService: 'Explorar servicio',
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
        'Guías prácticas para negocios locales en Londres. Cada artículo incluye gráficos interactivos y acciones claras para aplicar esta semana.',
      searchLabel: 'Buscar artículos por título o tema',
      searchPlaceholder: 'Prueba PSTN, Google Maps, ChatGPT, 020, dominio…',
      allCategories: 'Todas las guías',
      readArticle: 'Leer guía',
      backToBlog: 'Volver al blog',
      keyTakeaways: 'En resumen — puntos clave',
      relatedArticles: 'Seguir leyendo',
    },
    footer: {
      tagline:
        'Webs, dominios, correo profesional y herramientas IA para negocios locales en Londres. Diseñados, alojados y cuidados por una cuota mensual.',
      services: 'Servicios',
      guidesDemos: 'Guías y demos gratis',
      company: 'Empresa',
      privacy: 'Privacidad',
      terms: 'Términos',
      noCookies: 'Sin cookies · Sin rastreadores externos',
    },
  },
  fr: {
    tickerPrefix: 'Londres en direct',
    bookCallShort: 'Réserver un appel',
    theme: {
      light: 'Clair',
      dark: 'Sombre',
      switchToLight: 'Passer en mode clair',
      switchToDark: 'Passer en mode sombre',
    },
    nav: {
      services: 'Services',
      theApp: 'L’App',
      clientPortal: 'Espace Client',
      work: 'Exemples',
      pricing: 'Tarifs',
      aiTools: 'Outils IA',
      blog: 'Signaux',
      resources: 'Ressources',
      caseStudies: 'Études de cas',
      training: 'Formation',
      about: 'À propos',
      contact: 'Contact',
      freeDemoCta: 'Démo gratuite',
      allServices: 'Les 8 services',
      allDemos: 'Voir les 15 démos',
      howItWorks: 'Comment ça marche',
      pdfLibrary: 'Guides PDF gratuits',
      newsletter: 'Lettre bimensuelle',
      faq: 'Questions fréquentes',
      languageLabel: 'Langue',
    },
    megaHeadings: {
      websitesFoundations: 'Sites & bases digitales',
      aiFrontDesk: 'Accueil IA',
      getFoundLocally: 'Visibilité locale',
      startOnUs: 'Essayez sans risque',
      freeGuides: 'Guides PDF gratuits',
      journalLearn: 'Blog & conseils',
      livePreview: 'Aperçu studio',
      exploreService: 'Découvrir le service',
    },
    hero: {
      kicker: 'Commerces locaux à Londres · Créés, hébergés et gérés',
      headlineLine1: 'Gérez votre métier.',
      headlineLine2: 'On gère le reste en ligne.',
      subheadline:
        'Sites web, noms de domaine, emails professionnels et réception IA pour barbiers, salons, artisans, sociétés de nettoyage et cafés à Londres. Un tarif mensuel clair — avec une démo fonctionnelle avant de payer.',
      primaryCta: 'Obtenir ma démo gratuite',
      secondaryCta: 'Offres dès £39/mois',
      exploreAppCta: 'Découvrir l’App emtrc',
      footnotePrefix: 'Vous préférez en discuter ?',
      footnoteLink: 'Réserver un appel gratuit de 15 min',
      stat1Label: 'Chargement mobile 4G moyen',
      stat2Label: 'Pour votre démo gratuite',
      stat3Label: 'Démos londoniennes en ligne',
      stat4Label: 'Forfait mensuel géré dès',
    },
    homeSections: {
      servicesKicker: 'Huit expertises studio · Un partenaire à Londres',
      servicesLine1: 'Tout pour votre commerce,',
      servicesLine2: 'réuni sous un même toit.',
      servicesSub:
        'Chaque service est conçu, hébergé et maintenu par notre studio à Londres — sans bricolage ni extensions fragiles.',
      servicesAllLink: 'Comparer les 8 services',
      beforeAfterKicker: 'Pourquoi choisir un vrai studio plutôt qu’un modèle IA',
      beforeAfterHeadline: 'Ce que voient vos voisins — face à emtrc.',
      caseStudiesAllLink: 'Voir les 6 études de cas',
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
      rhythmFullLink: 'Voir le processus complet',
      workKicker: 'Démos réelles interactives — testez-les',
      workHeadline: 'Conçus pour barbiers, salons, artisans, nettoyage et cafés.',
      workAllLink: 'Explorer les 15 démos',
      openLiveDemo: 'Ouvrir la démo',
      trainingKicker: 'Centre de Formation & Réponses Directes',
      trainingHeadline: 'Des checklists concrètes pour gérants pressés.',
      trainingBody:
        'Notre centre de formation vous guide étape par étape : Google Maps, photos smartphone en lumière naturelle, avis conformes au Royaume-Uni et migration 020 avant le 31 janvier 2027.',
      trainingOpenCta: 'Ouvrir la formation',
      trainingFaqCta: 'Parcourir les 24 FAQ',
      voicesKicker: 'Pensé pour le terrain',
      voicesLine1: 'Les commerçants parlent vrai.',
      voicesLine2: 'Les résultats aussi.',
      blogKicker: 'Le journal emtrc',
      blogHeadline: 'Sites web, Google Maps et IA — expliqués simplement.',
      blogAllLink: 'Lire tous les guides',
      guidesKicker: 'Guides PDF gratuits',
      guidesHeadline: 'Envie de lire d’abord ? Téléchargez nos guides gratuits.',
      guidesSearchLink: 'Explorer les ressources →',
      downloadPdfCta: 'Télécharger le PDF',
      pricingKicker: 'Tarifs transparents',
      pricingHeadline: 'Un seul prix mensuel. Zéro surprise.',
      closingDemoTitle: 'Voyez votre nouveau site sous 2 jours ouvrés.',
      closingGuideTitle: 'Pas encore prêt pour une démo ?',
      readCaseStudy: 'Lire l’étude de cas',
    },
    workPage: {
      kicker: 'Portfolio en direct · 15 démos cliquables à Londres',
      headlineLine1: 'De vraies démos en ligne.',
      headlineLine2: 'Pas de simples images.',
      description:
        'Chaque carte ouvre un site interactif réel dans cinq métiers londoniens et trois directions artistiques — exactement ce que nous créons pour votre démo gratuite en 48 h.',
      ctaLabel: 'Créer la vôtre gratuitement',
      allTrades: 'Tous les métiers',
      openDemo: 'Ouvrir la démo interactive',
      bottomKicker: 'Vous ne voyez pas votre métier ?',
      bottomHeadline: 'Nous créons votre démo autour de votre boutique, tarifs et quartier.',
      bottomBody:
        'Chaque site reprend vos couleurs, photos, tarifs et réservations — livré en 2 jours ouvrés sans engagement.',
      bottomCta: 'Demander ma démo gratuite',
    },
    servicesPage: {
      kicker: '8 services dédiés · Un seul studio londonien',
      headlineLine1: 'Tout ce dont votre activité a besoin.',
      headlineLine2: 'Chaque service expliqué simplement.',
      description:
        'Démarrez avec un site rapide qui transforme Google Maps en appels. Ajoutez emails pros, avis automatiques, SMS sur appel manqué, accueil IA ou VoIP à la demande.',
      viewPricing: 'Voir les tarifs',
      exploreService: 'Découvrir le service',
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
        'Guides concrets avec graphiques interactifs pour les indépendants de Londres — lisibles en 8 minutes, applicables dès cette semaine.',
      searchLabel: 'Rechercher par titre ou mot-clé',
      searchPlaceholder: 'Essayez PSTN, Google Maps, ChatGPT, 020…',
      allCategories: 'Tous les guides',
      readArticle: 'Lire le guide',
      backToBlog: 'Retour au blog',
      keyTakeaways: 'En bref — points essentiels',
      relatedArticles: 'Continuer la lecture',
    },
    footer: {
      tagline:
        'Sites web, domaines, emails pros et accueil IA pour commerces locaux à Londres. Conçus, hébergés et suivis pour un tarif mensuel unique.',
      services: 'Services',
      guidesDemos: 'Guides & démos',
      company: 'Entreprise',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      noCookies: 'Sans cookies · Sans traceurs tiers',
    },
  },
  pl: {
    tickerPrefix: 'Londyn na żywo',
    bookCallShort: 'Umów darmową rozmowę',
    theme: {
      light: 'Jasny',
      dark: 'Ciemny',
      switchToLight: 'Przełącz na tryb jasny',
      switchToDark: 'Przełącz na tryb ciemny',
    },
    nav: {
      services: 'Usługi',
      theApp: 'Aplikacja',
      clientPortal: 'Panel Klienta',
      work: 'Realizacje',
      pricing: 'Cennik',
      aiTools: 'Narzędzia AI',
      blog: 'Sygnały',
      resources: 'Materiały',
      caseStudies: 'Case Studies',
      training: 'Centrum Szkoleń',
      about: 'O nas',
      contact: 'Kontakt',
      freeDemoCta: 'Darmowe demo',
      allServices: 'Wszystkie 8 usług',
      allDemos: 'Zobacz 15 demo na żywo',
      howItWorks: 'Jak to działa',
      pdfLibrary: 'Darmowe poradniki PDF',
      newsletter: 'Dwutygodnik',
      faq: 'Pytania i odpowiedzi',
      languageLabel: 'Język',
    },
    megaHeadings: {
      websitesFoundations: 'Strony i podstawy',
      aiFrontDesk: 'Recepcja AI',
      getFoundLocally: 'Widoczność lokalna',
      startOnUs: 'Zacznij bez ryzyka',
      freeGuides: 'Darmowe poradniki PDF',
      journalLearn: 'Blog i wiedza',
      livePreview: 'Podgląd studia',
      exploreService: 'Zobacz usługę',
    },
    hero: {
      kicker: 'Lokalne firmy w Londynie · Projekt, hosting i opieka',
      headlineLine1: 'Prowadź firmę.',
      headlineLine2: 'My zajmiemy się siecią.',
      subheadline:
        'Strony internetowe, domeny, firmowa poczta i obsługa połączeń AI dla barberów, salonów, fachowców, firm sprzątających i kawiarni w Londynie. Jedna stała opłata miesięczna — najpierw zobaczysz gotowe demo za darmo.',
      primaryCta: 'Zamów darmowe demo',
      secondaryCta: 'Plany od £39/mies.',
      exploreAppCta: 'Poznaj aplikację emtrc',
      footnotePrefix: 'Wolisz najpierw porozmawiać?',
      footnoteLink: 'Umów bezpłatną 15-min rozmowę',
      stat1Label: 'Średni czas ładowania w 4G',
      stat2Label: 'Na gotowe darmowe demo',
      stat3Label: 'Działających dem w Londynie',
      stat4Label: 'Plan zarządzany już od',
    },
    homeSections: {
      servicesKicker: 'Osiem specjalizacji · Jedno studio w Londynie',
      servicesLine1: 'Wszystko dla Twojej firmy,',
      servicesLine2: 'pod jednym dachem.',
      servicesSub:
        'Każdą usługę projektujemy, hostujemy i rozwijamy w naszym londyńskim studiu — bez kruchego szablonowego kodu.',
      servicesAllLink: 'Porównaj wszystkie 8 usług',
      beforeAfterKicker: 'Dlaczego lokalne firmy wybierają prawdziwe studio',
      beforeAfterHeadline: 'Co widzą sąsiedzi dziś — a co z emtrc.',
      caseStudiesAllLink: 'Zobacz wszystkie 6 case studies',
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
      rhythmFullLink: 'Zobacz pełny proces wdrożenia',
      workKicker: 'Działające dema — kliknij i przetestuj',
      workHeadline: 'Dla londyńskich barberów, salonów, fachowców, sprzątania i kawiarni.',
      workAllLink: 'Zobacz wszystkie 15 dem',
      openLiveDemo: 'Otwórz demo na żywo',
      trainingKicker: 'Centrum Szkoleń i Konkretne Odpowiedzi',
      trainingHeadline: 'Darmowe checklisty dla zapracowanych właścicieli.',
      trainingBody:
        'Krok po kroku: higiena wizytówki Google Maps, zdjęcia smartfonem w świetle dziennym, legalne opinie w UK oraz przeniesienie numeru 020 przed 31 stycznia 2027.',
      trainingOpenCta: 'Otwórz Centrum Szkoleń',
      trainingFaqCta: 'Przeglądaj 24 FAQ',
      voicesKicker: 'Zbudowane pod realną pracę',
      voicesLine1: 'Właściciele mówią wprost.',
      voicesLine2: 'Wyniki też.',
      blogKicker: 'Dziennik emtrc',
      blogHeadline: 'Strony, Google Maps i AI — prostym językiem.',
      blogAllLink: 'Przeczytaj wszystkie poradniki',
      guidesKicker: 'Darmowe poradniki PDF',
      guidesHeadline: 'Wolisz najpierw poczytać? Pobierz nasze poradniki.',
      guidesSearchLink: 'Przeszukaj materiały →',
      downloadPdfCta: 'Pobierz darmowy PDF',
      pricingKicker: 'Przejrzysty cennik',
      pricingHeadline: 'Jedna opłata miesięczna. Bez niespodzianek.',
      closingDemoTitle: 'Zobacz swoją nową stronę w 2 dni robocze.',
      closingGuideTitle: 'Jeszcze nie gotowy na demo?',
      readCaseStudy: 'Czytaj case study',
    },
    workPage: {
      kicker: 'Portfolio na żywo · 15 klikalnych dem z Londynu',
      headlineLine1: 'Prawdziwe działające dema.',
      headlineLine2: 'Nie płaskie zrzuty ekranu.',
      description:
        'Każda karta otwiera pełne interaktywne demo dla pięciu londyńskich branż w trzech stylach — dokładnie taki poziom przygotujemy dla Twojej firmy w 48 godzin.',
      ctaLabel: 'Zamów demo dla swojej firmy',
      allTrades: 'Wszystkie branże',
      openDemo: 'Otwórz interaktywne demo',
      bottomKicker: 'Nie widzisz dokładnie swojej branży?',
      bottomHeadline: 'Przygotujemy darmowe demo pod Twój lokal, cennik i kod pocztowy.',
      bottomBody:
        'Dopasowujemy kolory, zdjęcia, ceny i system rezerwacji — gotowe w 2 dni robocze bez żadnych zobowiązań.',
      bottomCta: 'Poproś o darmowe demo',
    },
    servicesPage: {
      kicker: '8 wyspecjalizowanych usług · Wszystko w jednym studiu',
      headlineLine1: 'Wszystko, czego potrzebujesz online.',
      headlineLine2: 'Każda usługa opisana prosto.',
      description:
        'Zacznij od szybkiej strony, która zamienia wyszukiwania w Google Maps na telefony. Dodaj pocztę, opinie, SMS po nieodebranych, recepcję AI lub VoIP, gdy będziesz gotowy.',
      viewPricing: 'Zobacz cennik',
      exploreService: 'Zobacz usługę',
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
        'Praktyczne przewodniki z wykresami dla lokalnych firm w Londynie — bez żargonu, gotowe do wdrożenia od razu.',
      searchLabel: 'Szukaj artykułów po tytule lub haśle',
      searchPlaceholder: 'Np. PSTN, Google Maps, ChatGPT, 020, domena…',
      allCategories: 'Wszystkie artykuły',
      readArticle: 'Czytaj poradnik',
      backToBlog: 'Wróć do bloga',
      keyTakeaways: 'W skrócie — najważniejsze wnioski',
      relatedArticles: 'Czytaj dalej',
    },
    footer: {
      tagline:
        'Strony, domeny, poczta firmowa i narzędzia AI dla lokalnych firm w Londynie. Projekt, hosting i stała opieka w jednej opłacie.',
      services: 'Usługi',
      guidesDemos: 'Poradniki i dema',
      company: 'Firma',
      privacy: 'Prywatność',
      terms: 'Regulamin',
      noCookies: 'Bez cookies · Bez zewnętrznych trackerów',
    },
  },
  tr: {
    tickerPrefix: 'Londra canlı',
    bookCallShort: 'Ücretsiz görüşme al',
    theme: {
      light: 'Açık',
      dark: 'Koyu',
      switchToLight: 'Açık moda geç',
      switchToDark: 'Koyu moda geç',
    },
    nav: {
      services: 'Hizmetler',
      theApp: 'Uygulama',
      clientPortal: 'Müşteri Portalı',
      work: 'Örnekler',
      pricing: 'Fiyatlar',
      aiTools: 'Yapay Zeka',
      blog: 'Sinyaller',
      resources: 'Kaynaklar',
      caseStudies: 'Vaka Analizleri',
      training: 'Eğitim Merkezi',
      about: 'Hakkımızda',
      contact: 'İletişim',
      freeDemoCta: 'Ücretsiz demo al',
      allServices: 'Tüm 8 hizmet',
      allDemos: '15 canlı demoyu incele',
      howItWorks: 'Nasıl çalışır',
      pdfLibrary: 'Ücretsiz PDF rehberler',
      newsletter: 'İki haftalık bülten',
      faq: 'Sık sorulan sorular',
      languageLabel: 'Dil',
    },
    megaHeadings: {
      websitesFoundations: 'Web siteleri ve altyapı',
      aiFrontDesk: 'Yapay zeka resepsiyon',
      getFoundLocally: 'Yerel görünürlük',
      startOnUs: 'Risksiz başla',
      freeGuides: 'Ücretsiz PDF rehberler',
      journalLearn: 'Blog ve rehberler',
      livePreview: 'Stüdyo önizlemesi',
      exploreService: 'Hizmeti incele',
    },
    hero: {
      kicker: 'Londra yerel işletmeleri · Kurulum, barındırma ve bakım',
      headlineLine1: 'İşinizi siz yönetin.',
      headlineLine2: 'Dijital tarafı bize bırakın.',
      subheadline:
        'Londra’daki berberler, kuaför salonları, ustalar, temizlik firmaları ve kafeler için web sitesi, alan adı, kurumsal e-posta ve yapay zeka çağrı yönetimi. Tek aylık fiyat — ödeme yapmadan önce çalışan demonuzu hazırlıyoruz.',
      primaryCta: 'Ücretsiz demomu iste',
      secondaryCta: 'Aylık £39’dan başlayan planlar',
      exploreAppCta: 'emtrc Uygulamasını İncele',
      footnotePrefix: 'Önce konuşmak ister misiniz?',
      footnoteLink: 'Ücretsiz 15 dk görüşme ayarla',
      stat1Label: 'Ortalama 4G mobil açılış hızı',
      stat2Label: 'Ücretsiz çalışan demonuz için',
      stat3Label: 'Canlı Londra sektör demosu',
      stat4Label: 'Yönetilen aylık başlangıç fiyatı',
    },
    homeSections: {
      servicesKicker: 'Sekiz uzman stüdyo disiplini · Tek Londra ortağı',
      servicesLine1: 'İşletmenizin ihtiyacı olan her şey,',
      servicesLine2: 'tek çatı altında tasarlandı.',
      servicesSub:
        'Her hizmet Londra stüdyomuz tarafından özel olarak tasarlanır, barındırılır ve yönetilir — kırılgan şablonlar olmadan.',
      servicesAllLink: 'Tüm 8 hizmeti karşılaştır',
      beforeAfterKicker: 'Neden gerçek bir tasarım stüdyosu',
      beforeAfterHeadline: 'Komşularınız bugün ne görüyor — emtrc ile farkı.',
      caseStudiesAllLink: '6 Londra vaka analizini incele',
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
      rhythmFullLink: 'Tüm kurulum sürecini gör',
      workKicker: 'Gerçek çalışan demolar — tıklayıp test edin',
      workHeadline: 'Londra berberleri, salonları, ustaları, temizlik ve kafeleri için.',
      workAllLink: '15 canlı demoyu gör',
      openLiveDemo: 'Canlı demoyu aç',
      trainingKicker: 'İşletme Eğitim Merkezi ve Net Cevaplar',
      trainingHeadline: 'Yoğun işletme sahipleri için ücretsiz kontrol listeleri.',
      trainingBody:
        'Google Haritalar düzeni, gün ışığında akıllı telefon fotoğrafçılığı, İngiltere DMCC uyumlu yorumlar ve 31 Ocak 2027 öncesi 020 telefon geçişi için adım adım rehberler.',
      trainingOpenCta: 'Eğitim Merkezini Aç',
      trainingFaqCta: '24 SSS’yi incele',
      voicesKicker: 'Gerçek iş akışları için tasarlandı',
      voicesLine1: 'İşletme sahipleri net konuşur.',
      voicesLine2: 'Sonuçlar da öyle.',
      blogKicker: 'emtrc rehberleri',
      blogHeadline: 'Web siteleri, Google Haritalar ve AI — sade dille.',
      blogAllLink: 'Tüm yazıları oku',
      guidesKicker: 'Ücretsiz PDF rehberler',
      guidesHeadline: 'Önce okumak ister misiniz? Rehberlerimizi ücretsiz indirin.',
      guidesSearchLink: 'Tüm kaynakları ara →',
      downloadPdfCta: 'Ücretsiz PDF indir',
      pricingKicker: 'Şeffaf fiyatlandırma',
      pricingHeadline: 'Tek aylık ücret. Sürpriz yok.',
      closingDemoTitle: 'Yeni web sitenizi 2 iş gününde görün.',
      closingGuideTitle: 'Henüz demoya hazır değil misiniz?',
      readCaseStudy: 'Vaka analizini oku',
    },
    workPage: {
      kicker: 'Canlı portföy · 15 tıklanabilir Londra demosu',
      headlineLine1: 'Gerçek çalışan demolar.',
      headlineLine2: 'Düz ekran görüntüleri değil.',
      description:
        'Aşağıdaki her kart beş Londra sektörü ve üç stüdyo stilinde canlı, etkileşimli bir demo web sitesi açar — 48 saatlik ücretsiz demonuz için sunduğumuz standart.',
      ctaLabel: 'İşletmeniz için demo isteyin',
      allTrades: 'Tüm sektörler',
      openDemo: 'Etkileşimli demoyu aç',
      bottomKicker: 'Tam sektörünüzü görmüyor musunuz?',
      bottomHeadline: 'Ücretsiz demonuzu gerçek mağazanız, fiyatlarınız ve Londra posta kodunuza göre hazırlıyoruz.',
      bottomBody:
        'Her site renklerinize, fotoğraflarınıza ve randevu sisteminize özel olarak 2 iş gününde sıfır yükümlülükle teslim edilir.',
      bottomCta: 'Ücretsiz demomu iste',
    },
    servicesPage: {
      kicker: '8 özel hizmet · Hepsi tek Londra çatısı altında',
      headlineLine1: 'İşletmenizin çevrimiçi tüm ihtiyaçları.',
      headlineLine2: 'Her biri net ve şeffaf planla.',
      description:
        'Google Haritalar aramalarını telefon aramasına dönüştüren hızlı bir siteyle başlayın. E-posta, yorumlar, anında SMS, 7/24 AI resepsiyonist veya bulut VoIP ekleyin.',
      viewPricing: 'Fiyatları gör',
      exploreService: 'Hizmeti incele',
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
        'Londra’daki yerel işletmeler için etkileşimli grafikli pratik rehberler — kahvenizi içerken okuyup bu hafta uygulayabilirsiniz.',
      searchLabel: 'Başlık veya anahtar kelime ile ara',
      searchPlaceholder: 'PSTN, Google Maps, ChatGPT, 020, domain…',
      allCategories: 'Tüm rehberler',
      readArticle: 'Yazıyı oku',
      backToBlog: 'Tüm yazılara dön',
      keyTakeaways: 'Kısaca — öne çıkan noktalar',
      relatedArticles: 'Okumaya devam et',
    },
    footer: {
      tagline:
        'Londra yerel işletmeleri için web siteleri, alan adları, kurumsal e-posta ve yapay zeka ön büro araçları. Tek aylık ücretle tasarım, barındırma ve bakım.',
      services: 'Hizmetler',
      guidesDemos: 'Ücretsiz rehberler ve demolar',
      company: 'Şirket',
      privacy: 'Gizlilik politikası',
      terms: 'Koşullar',
      noCookies: 'Çerez yok · Üçüncü taraf takipçisi yok',
    },
  },
  ...EXTRA_TRANSLATIONS,
};

const VALID_LOCALES = new Set<LocaleCode>([
  'en',
  'zh',
  'ar',
  'es',
  'fr',
  'pt',
  'hi',
  'bn',
  'pl',
  'tr',
]);

export function resolveLocale(input?: string | null): LocaleCode {
  if (!input) return 'en';
  const normalized = input.trim().toLowerCase().slice(0, 2) as LocaleCode;
  if (VALID_LOCALES.has(normalized)) {
    return normalized;
  }
  return 'en';
}

export function getDictionary(locale: LocaleCode): UiDictionary {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en;
}
