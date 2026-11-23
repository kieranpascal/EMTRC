export interface TrainingLesson {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Essential' | 'Quick Win' | '2027 Compliance';
  summary: string;
  steps: readonly string[];
  proTip: string;
}

export interface TrainingTrack {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  outcome: string;
  relatedServiceSlug: string;
  lessons: readonly TrainingLesson[];
}

export const TRAINING_TRACKS: readonly TrainingTrack[] = [
  {
    id: 'google-maps-mastery',
    code: 'TRACK 01',
    title: 'Google Maps & Local 3-Pack Mastery',
    subtitle: 'Fix the five Google Business Profile settings that drive 80% of local London calls.',
    estimatedTime: '20 mins total',
    outcome: 'Verified, clean Google Business Profile aligned with your website and London postcodes.',
    relatedServiceSlug: 'local-seo',
    lessons: [
      {
        id: 'gm-01',
        title: 'Audit your primary & secondary Google categories',
        duration: '5 mins',
        difficulty: 'Essential',
        summary: 'Your primary category has more ranking weight than almost any other setting on Google Maps.',
        steps: [
          'Open Google Business Profile Manager on desktop or search your business name while signed in.',
          'Check your Primary Category matches your highest-margin service (e.g. "Barber shop" or "Heating contractor", not generic "Service establishment").',
          'Add 2 to 4 honest Secondary Categories covering core jobs (e.g. "Plumber", "Gas engineer", "Boiler supplier").',
        ],
        proTip: 'Never stuff irrelevant categories — Google can suspend listings that claim services not supported by your website.',
      },
      {
        id: 'gm-02',
        title: 'Publish transparent services & starting prices',
        duration: '7 mins',
        difficulty: 'Quick Win',
        summary: 'Shoppers and AI assistants both scan your Google Services tab before deciding who to call.',
        steps: [
          'Open Edit Profile → Services inside Google Business Profile.',
          'Add your top 8–12 services with plain-English descriptions mentioning your London borough.',
          'Include honest starting prices (e.g. "Skin Fade — from £28") matching your website word-for-word.',
        ],
        proTip: 'Matching service wording on both Google Maps and your HTML website reinforces relevance for "near me" searches.',
      },
      {
        id: 'gm-03',
        title: 'Lock down Primary Ownership & NAP consistency',
        duration: '8 mins',
        difficulty: 'Essential',
        summary: 'Protect your listing from agency lock-in and fix mismatched postcodes or phone numbers.',
        steps: [
          'Go to Business Profile Settings → People and access, and verify your own email is listed as Primary Owner.',
          'Confirm your Name, Address and Phone (NAP) match your website footer, Apple Maps and Yell/Checkatrade identically.',
          'Update UK Bank Holiday hours for the next 6 months so Maps never shows "Hours might differ".',
        ],
        proTip: 'Google penalises keyword-stuffed business names — stick to your real shopfront or trading name.',
      },
    ],
  },
  {
    id: 'phone-photography',
    code: 'TRACK 02',
    title: '5-Minute Smartphone Shop Photography',
    subtitle: 'Shoot crisp, authentic London shopfront and craft photos on your phone — zero stock-photo look.',
    estimatedTime: '15 mins total',
    outcome: '10 authentic high-trust photos ready for your website hero, gallery and fortnightly Google Maps uploads.',
    relatedServiceSlug: 'websites',
    lessons: [
      {
        id: 'ph-01',
        title: 'Shoot in natural window light & kill overhead flicker',
        duration: '4 mins',
        difficulty: 'Quick Win',
        summary: 'Natural morning daylight beats expensive ring lights for making shops, food and cuts look genuine.',
        steps: [
          'Wipe your smartphone rear camera lens with a clean microfibre cloth (90% of hazy shop photos are fingerprints).',
          'Turn off harsh yellow or flickering fluorescent lights near the window and shoot facing natural daylight.',
          'Tap the brightest area on screen and slide exposure down slightly so highlights never blow out.',
        ],
        proTip: 'Shoot between 08:30 and 10:30 before rush hour when counters, stations and floors are spotless.',
      },
      {
        id: 'ph-02',
        title: 'The 5 mandatory shots every London business needs',
        duration: '6 mins',
        difficulty: 'Essential',
        summary: 'Customers decide if they feel comfortable walking in or inviting you home based on five exact frames.',
        steps: [
          'Frame 1: Wide horizontal exterior shot of your shopfront or clean signwritten van.',
          'Frame 2: Hands-at-work action shot (finishing a fade, pouring coffee, calibrating pipework).',
          'Frame 3: Close-up detail shot of finished craft or tidy tools.',
          'Frame 4: Clean interior/workspace wide shot showing lighting and hygiene.',
          'Frame 5: Warm relaxed portrait of you or the team smiling in your workspace.',
        ],
        proTip: 'Always hold your phone horizontally (landscape) for website hero banners and vertically only for Stories.',
      },
      {
        id: 'ph-03',
        title: 'Upload 3 real photos to Google Maps every fortnight',
        duration: '5 mins',
        difficulty: 'Quick Win',
        summary: 'Fresh genuine photography signals to Google and customers that your business is thriving right now.',
        steps: [
          'Set a recurring 10-minute calendar reminder on the 1st and 15th of each month.',
          'Upload 3 crisp photos straight from your phone to Google Business Profile.',
          'Send your best 2 monthly photos to emtrc on WhatsApp — we optimise and swap them into your website gallery.',
        ],
        proTip: 'Never upload flyers covered in text or promo codes — Google’s vision filters routinely hide text-heavy graphics.',
      },
    ],
  },
  {
    id: 'dmcc-reviews',
    code: 'TRACK 03',
    title: 'DMCC-Compliant Google Reviews Playbook',
    subtitle: 'Build a steady flow of 5-star reviews every week while staying 100% compliant with UK law.',
    estimatedTime: '18 mins total',
    outcome: 'A repeatable, legal post-job review routine that lifts Maps ranking and AI search citations.',
    relatedServiceSlug: 'review-engine',
    lessons: [
      {
        id: 'rv-01',
        title: 'Stay compliant with the UK DMCC Act',
        duration: '5 mins',
        difficulty: 'Essential',
        summary: 'The UK Digital Markets, Competition and Consumers Act bans fake reviews and selective review-gating.',
        steps: [
          'Never buy reviews, swap reviews with friends, or offer discounts strictly in exchange for a 5-star score.',
          'Send the exact same direct Google review link to every completed customer — never hide the link from neutral clients.',
          'Invite genuine feedback openly; polite timing beats aggressive pop-ups every time.',
        ],
        proTip: 'Consistent 4.8★–4.9★ profiles with 80+ recent reviews actually convert better than suspicious 5.0★ profiles with 6 reviews.',
      },
      {
        id: 'rv-02',
        title: 'Copy-and-paste 2-hour post-visit SMS script',
        duration: '6 mins',
        difficulty: 'Quick Win',
        summary: 'Asking within 2 hours of a great haircut, meal or repair triples completion rates.',
        steps: [
          'Copy your direct Google Business Profile "Ask for reviews" short URL.',
          'Send a short warm message: "Hi [Name], thanks for visiting [Shop] today! If you have 20 seconds, a quick Google review really helps our small London team: [link]"',
          'For Growth or Review Engine clients, we automate this step cleanly so you never forget during busy weekends.',
        ],
        proTip: 'Place a small engraved QR stand at the till or reception desk for walk-in customers paying by card.',
      },
      {
        id: 'rv-03',
        title: 'Reply to every review with natural local context',
        duration: '7 mins',
        difficulty: 'Essential',
        summary: 'Your replies are read by both future London customers and AI engines like ChatGPT.',
        steps: [
          'Reply within 48 hours to every positive review thanking the customer by first name.',
          'Mention the specific service and neighbourhood naturally ("Glad we got your boiler pressure sorted in Greenwich!").',
          'If you ever get an unfair 1-star review, stay calm, state the facts politely in 3 sentences, and invite them to email you directly.',
        ],
        proTip: 'Future buyers read your replies to negative reviews more carefully than your 5-star reviews.',
      },
    ],
  },
  {
    id: 'pstn-2027-readiness',
    code: 'TRACK 04',
    title: 'UK PSTN Switch-Off (31 Jan 2027) Readiness',
    subtitle: 'Step-by-step preparation to keep your 020 London number off legacy copper with zero outage.',
    estimatedTime: '22 mins total',
    outcome: 'Full shop-floor telecoms audit ready for clean Cloud VoIP number porting ahead of 31 January 2027.',
    relatedServiceSlug: 'business-phone',
    lessons: [
      {
        id: 'ps-01',
        title: 'Audit every socket on your shop floor or office',
        duration: '8 mins',
        difficulty: '2027 Compliance',
        summary: 'Identify every device currently relying on old BT/Openreach copper wall sockets.',
        steps: [
          'Check your reception desk phones and trace where the cable plugs in (wall master socket vs broadband router).',
          'Check older PDQ card machines and confirm they run on Wi-Fi + 4G SIM rather than a phone line.',
          'Check monitored burglar alarms, panic buttons or lift emergency phones and contact your alarm provider for a 4G dialler check.',
        ],
        proTip: 'Doing this check today avoids frantic Q4 2026 engineer queues and forced emergency line surcharges.',
      },
      {
        id: 'ps-02',
        title: 'Gather your 020 porting paperwork (do NOT cancel first)',
        duration: '7 mins',
        difficulty: '2027 Compliance',
        summary: 'Cancelling your copper line before porting can permanently destroy a 20-year-old 020 number.',
        steps: [
          'Download your latest telecoms bill showing the exact legal account name, address and 020 landline number.',
          'Check whether your broadband is tied to the same copper line (if so, upgrade to SoGEA or full fibre first).',
          'Keep the copper line active until your new Cloud VoIP provider confirms the port date has completed.',
        ],
        proTip: 'A normal UK business number port takes 7 to 14 working days with zero dead-tone gap when handled properly.',
      },
      {
        id: 'ps-03',
        title: 'Set opening-hours call routing & missed-call backup',
        duration: '7 mins',
        difficulty: 'Quick Win',
        summary: 'Turn the mandatory copper switch-off into a better daily workflow for you and your staff.',
        steps: [
          'Ring both your shop handset and your mobile app simultaneously during opening hours.',
          'Route after-hours calls cleanly to a warm out-of-hours greeting or 24/7 AI Receptionist.',
          'Enable 8-second missed-call text-back so busy rush hours never turn into lost customers.',
        ],
        proTip: 'Pre-register for emtrc Business Phone (Cloud VoIP) so we coordinate your port well ahead of the January 2027 deadline.',
      },
    ],
  },
];
