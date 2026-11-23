export interface TrainingLesson {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Essential' | 'Quick Win' | '2027 Compliance' | 'Growth Lever';
  summary: string;
  whyItMatters: string;
  impactMetric: string;
  steps: readonly string[];
  commonMistake: string;
  proTip: string;
  copyTemplate?: {
    label: string;
    text: string;
  };
}

export interface TrainingTrack {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  outcome: string;
  relatedServiceSlug: string;
  coverImage: string;
  coverAlt: string;
  accentTone: 'coral' | 'amber' | 'emerald' | 'blue';
  lessons: readonly TrainingLesson[];
}

export interface OwnerScriptTemplate {
  id: string;
  category: 'Missed Calls' | 'Google Reviews' | 'Negative Replies' | 'PSTN 2027' | 'Quotes & Follow-Up';
  title: string;
  whenToUse: string;
  channel: 'SMS / WhatsApp' | 'Google Reply' | 'Email';
  script: string;
}

export interface LondonCalendarQuarter {
  id: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  months: string;
  theme: string;
  focusStat: string;
  tasks: readonly {
    month: string;
    headline: string;
    detail: string;
    tradeFocus: string;
  }[];
}

export const TRAINING_TRACKS: readonly TrainingTrack[] = [
  // =========================================================================
  // TRACK 01: Google Maps & Local 3-Pack Mastery
  // =========================================================================
  {
    id: 'google-maps-mastery',
    code: 'TRACK 01',
    title: 'Google Maps & Local 3-Pack Mastery',
    subtitle: 'Fix the core Google Business Profile signals that drive 80% of local London phone calls.',
    estimatedTime: '22 mins total',
    outcome: 'A locked-down, cleanly categorised Google Business Profile aligned with your website and London postcodes.',
    relatedServiceSlug: 'local-seo',
    coverImage: '/src/assets/images/emtrc_mobile_maps_search_1795424180037.jpg',
    coverAlt: 'London local search results showing Google Maps 3-Pack on a modern smartphone',
    accentTone: 'coral',
    lessons: [
      {
        id: 'gm-01',
        title: 'Audit your primary & secondary Google categories',
        duration: '6 mins',
        difficulty: 'Essential',
        summary: 'Your primary category carries more Google Maps 3-Pack ranking weight than almost any other field.',
        whyItMatters:
          'When a Londoner searches "emergency plumber Greenwich" or "balayage South Kensington", Google immediately filters candidates by Primary Category before checking reviews or website links. Picking a vague category like "Contractor" or "Beauty salon" quietly hides you from high-intent buyers.',
        impactMetric: '+34% avg lift in discovery searches',
        steps: [
          'Open Google Business Profile Manager on desktop or search your exact business name while signed in as Primary Owner.',
          'Set your Primary Category to your single highest-margin trade (e.g. "Barber shop", "Heating contractor", "Hairdresser", or "Espresso bar").',
          'Add 2 to 4 truthful Secondary Categories that match services listed on your website (e.g. "Plumber", "Gas engineer", "Boiler supplier").',
          'Inspect the top 3 ranking competitors in your London borough to confirm you have not missed a standard UK trade category.',
        ],
        commonMistake:
          'Stuffing 10 unrelated categories (like adding "Electrician" and "Handyman" to a heating firm) — Google dilutes relevance and can trigger automated profile suspension.',
        proTip:
          'Check your categories every 6 months — Google quietly adds UK-specific sub-categories that can jump you ahead of older listings.',
      },
      {
        id: 'gm-02',
        title: 'Publish transparent services & starting prices',
        duration: '8 mins',
        difficulty: 'Quick Win',
        summary: 'Local shoppers and AI assistants both read your Google Services tab before deciding who to call.',
        whyItMatters:
          'Google now displays bold justification badges directly in Maps results such as "Provides: Skin fade" or "Website mentions: Combi boiler service". Filling out your Services tab with exact London wording and honest starting prices turns impressions into direct calls.',
        impactMetric: '2.1x higher tap-to-call conversion',
        steps: [
          'Open Edit Profile → Services inside Google Business Profile.',
          'List your top 8–12 bread-and-butter services using the plain English words London customers actually type.',
          'Include starting prices (e.g. "Skin Fade & Beard Trim — £36", "Annual Boiler Service — £95") matching your website word-for-word.',
          'Write a crisp 1–2 sentence description for each service mentioning your London borough naturally.',
        ],
        commonMistake:
          'Leaving the Services tab blank or writing vague internal jargon like "Bespoke tier-2 package" instead of plain service names.',
        proTip:
          'Matching service names identically across your Google Profile and your HTML website reinforces relevance for both Google Maps and ChatGPT.',
      },
      {
        id: 'gm-03',
        title: 'Lock down Primary Ownership, Bank Holidays & NAP consistency',
        duration: '8 mins',
        difficulty: 'Essential',
        summary: 'Protect your listing from agency lock-in and eliminate conflicting postcodes or holiday warnings.',
        whyItMatters:
          'Every UK Bank Holiday weekend, thousands of London Google listings display an orange "Hours might differ" warning that costs shops walk-ins. Meanwhile, mismatched phone numbers across Yell, Checkatrade, and Apple Maps reduce Google’s trust score.',
        impactMetric: '100% protection against profile lock-out',
        steps: [
          'Go to Business Profile Settings → People and access, and verify your own business email is set as Primary Owner (never an ex-employee or old agency).',
          'Check your Name, Address and Phone (NAP) match your website footer, Apple Business Connect, Bing Places, and Yell character-for-character.',
          'Set Special Hours for all upcoming UK Bank Holidays for the next 6 months (Easter, May, August, Christmas/New Year).',
          'Add UTM tracking (?utm_source=google&utm_medium=maps) to your Website link so monthly reports separate Maps traffic from organic clicks.',
        ],
        commonMistake:
          'Adding keywords to your Google Business Name (e.g. "Smith Plumbing — Best Cheap Plumber London E1") — competitors can report this and suspend your profile overnight.',
        proTip:
          'Stick strictly to your real shopfront signage or trading name so your profile survives every Google verification audit.',
      },
    ],
  },

  // =========================================================================
  // TRACK 02: 5-Minute Smartphone Shop Photography
  // =========================================================================
  {
    id: 'phone-photography',
    code: 'TRACK 02',
    title: '5-Minute Smartphone Shop Photography',
    subtitle: 'Shoot authentic London shopfront, van, and craft photos on your phone — zero cheesy stock-photo look.',
    estimatedTime: '18 mins total',
    outcome: '10 crisp, natural-light photographs ready for your website hero, portfolio gallery, and fortnightly Maps uploads.',
    relatedServiceSlug: 'websites',
    coverImage: '/src/assets/images/london_cafe_storefront_morning_1795428788037.jpg',
    coverAlt: 'East London independent corner bakery and espresso bar photographed in crisp morning daylight',
    accentTone: 'amber',
    lessons: [
      {
        id: 'ph-01',
        title: 'Shoot in natural morning daylight & kill overhead flicker',
        duration: '5 mins',
        difficulty: 'Quick Win',
        summary: 'Morning window light beats expensive ring lights for making London shops, food, and workmanship look genuine.',
        whyItMatters:
          'Yellow halogen bulbs and flickering tube lights make clean premises look dingy on mobile screens. Customers form a trust judgement in under 0.4 seconds — bright, colour-accurate photos signal high hygiene and craftsmanship immediately.',
        impactMetric: '+42% more Google Maps direction taps',
        steps: [
          'Wipe your smartphone rear camera lens with a clean microfibre cloth (almost every blurry shop photo is skin oil on the lens).',
          'Turn off harsh yellow spotlights near the window and shoot with natural daylight hitting your subject from the side.',
          'Enable the 3×3 Camera Grid in iPhone/Android settings so vertical door frames, mirrors, and brickwork stay dead straight.',
          'Tap the brightest highlight on screen and slide exposure down a touch so whites and windows never blow out.',
        ],
        commonMistake:
          'Standing directly in front of a bright shop window with your subject in shadow (backlighting) — always put the window behind or beside the camera.',
        proTip:
          'Shoot between 08:15 and 10:00 right before opening when floors, espresso machines, styling chairs, and toolboxes are spotless.',
      },
      {
        id: 'ph-02',
        title: 'The 5 mandatory frames every London trade website needs',
        duration: '7 mins',
        difficulty: 'Essential',
        summary: 'Customers decide whether they feel safe walking in or inviting you into their flat based on five exact shots.',
        whyItMatters:
          'Empty stock photos tell a London buyer nothing about your actual standards. Showing your real shopfront, your hands doing precision work, and a relaxed smile from the owner removes anxiety before they ever dial your number.',
        impactMetric: '2.3x higher enquiry rate vs stock imagery',
        steps: [
          'Frame 1 (Hero Exterior): Wide horizontal shot of your shopfront signage from across the pavement, or your spotless signwritten van parked neatly.',
          'Frame 2 (Hands at Work): Mid-close action shot — finishing a crisp fade, pouring latte art, testing brushed brass wiring, or bleeding copper pipework.',
          'Frame 3 (Finished Craft): Tight detail shot showing spotless results (gleaming kitchen worktop, balanced balayage colour, tidy consumer unit).',
          'Frame 4 (Clean Interior): Wide landscape view of your chairs, waiting area, or tidy workspace showing lighting and cleanliness.',
          'Frame 5 (Human Portrait): Warm, natural waist-up portrait of you or the team smiling beside your real workspace — no stiff passport stares.',
        ],
        commonMistake:
          'Shooting every photo vertically (portrait mode) — website hero banners and browser cards need wide horizontal (landscape) frames.',
        proTip:
          'Take 3 landscape shots and 2 vertical shots of every standout job so you cover your website, Google Maps, and Instagram Stories in one go.',
      },
      {
        id: 'ph-03',
        title: 'Build a fortnightly Google Maps & website gallery rhythm',
        duration: '6 mins',
        difficulty: 'Quick Win',
        summary: 'Uploading fresh genuine photos every two weeks proves to Google and buyers that your business is thriving today.',
        whyItMatters:
          'Listings whose most recent photo is from 2022 quietly lose clicks to active competitors across the street. Google’s own data shows businesses with fresh authentic photos receive significantly more website clicks and direction requests.',
        impactMetric: '+35% higher Maps website clicks',
        steps: [
          'Set a recurring 10-minute calendar alert on the 1st and 15th of every month.',
          'Upload 2–3 crisp, real job or shop photos straight from your phone into Google Business Profile.',
          'WhatsApp your single best photo each month to your emtrc studio contact — we optimise, caption, and add it to your live website gallery.',
          'Delete any blurry, dark, or outdated photos from years ago that no longer reflect your standards.',
        ],
        commonMistake:
          'Uploading Canva posters packed with promotional text and borders — Google’s automated vision checks routinely reject or hide text-heavy graphics.',
        proTip:
          'Pure clean photography always beats graphic flyers on Google Maps — save promotional text for your Google Updates tab.',
      },
    ],
  },

  // =========================================================================
  // TRACK 03: DMCC-Compliant Google Reviews Playbook
  // =========================================================================
  {
    id: 'dmcc-reviews',
    code: 'TRACK 03',
    title: 'DMCC-Compliant Google Reviews Playbook',
    subtitle: 'Build a steady flow of authentic 5-star reviews every week while staying 100% compliant with UK law.',
    estimatedTime: '20 mins total',
    outcome: 'A legal, repeatable post-job review routine that compounds Google Maps rankings and AI search trust.',
    relatedServiceSlug: 'review-engine',
    coverImage: '/src/assets/images/emtrc_service_reviews_shop_1795375920338.jpg',
    coverAlt: 'Happy London customer leaving a 5-star Google review on their smartphone at a shop counter',
    accentTone: 'emerald',
    lessons: [
      {
        id: 'rv-01',
        title: 'Stay 100% compliant with the UK DMCC Act 2024',
        duration: '6 mins',
        difficulty: 'Essential',
        summary: 'The UK Digital Markets, Competition and Consumers Act bans fake reviews and selective review-gating.',
        whyItMatters:
          'The Competition and Markets Authority (CMA) now holds direct enforcement powers against fake reviews and deceptive "gating" funnels (asking "Were you happy?" and only sending happy people to Google). Running a clean, transparent system protects your listing from sudden Google wipes.',
        impactMetric: 'Zero risk of CMA or Google review purge',
        steps: [
          'Never purchase reviews, run staff/friend review swaps, or offer freebies strictly contingent on leaving a 5-star rating.',
          'Send the exact same direct Google review URL to every completed paying customer — never filter out neutral clients.',
          'Make sure every review invite states clearly who it is from and takes customers straight to Google in one tap.',
          'Keep a simple log (or let emtrc Review Engine handle it) so every review correlates cleanly with real completed bookings.',
        ],
        commonMistake:
          'Using shady third-party widgets that route 1–3 star clicks to a hidden form and only show Google to 4–5 star clicks — this violates both Google policy and UK DMCC rules.',
        proTip:
          'A realistic 4.8★–4.9★ rating with 90+ fresh, detailed reviews converts better than a suspicious 5.0★ profile with only 7 reviews.',
      },
      {
        id: 'rv-02',
        title: 'The 2-hour post-visit SMS & QR till stand routine',
        duration: '7 mins',
        difficulty: 'Quick Win',
        summary: 'Asking politely within 2 hours of a great haircut, boiler repair, or clean triples review completion rates.',
        whyItMatters:
          'Most delighted customers fully intend to leave a review — then get onto the Tube and forget forever. Sending a warm, personal 1-tap SMS within two hours while the great result is still fresh turns silent fans into permanent public proof.',
        impactMetric: '3.1x higher review response rate',
        steps: [
          'Inside Google Business Profile, click "Ask for reviews" and copy your short direct g.page link.',
          'Send a short, human SMS or WhatsApp within 2 hours of job completion using the template below.',
          'Place a discreet engraved acrylic/brass QR stand right beside your card machine for walk-in clients.',
          'For Business/Growth clients with Review Engine (£39/mo), automate this trigger cleanly so weekends never slip.',
        ],
        commonMistake:
          'Batch-emailing 200 past customers from 18 months ago all in one afternoon — sudden review spikes can trigger Google’s spam filter and hide genuine reviews.',
        proTip:
          'Steady beats spiky: 2 to 4 genuine reviews every week outranks a one-off burst of 20 reviews followed by silence.',
        copyTemplate: {
          label: '2-Hour Post-Visit SMS',
          text: 'Hi [First Name], thanks for choosing [Business Name] today! If you have 20 seconds, a quick Google review really helps our small London team stay visible locally: [Your Google Link] — Thanks again, [Your Name]',
        },
      },
      {
        id: 'rv-03',
        title: 'Reply to every review with natural London context',
        duration: '7 mins',
        difficulty: 'Essential',
        summary: 'Your replies are read carefully by both cautious London customers and AI assistants like ChatGPT.',
        whyItMatters:
          'A blank review feed looks unattended. Thoughtful owner replies prove a real local person stands behind the work, naturally reinforce your London borough and service terms, and turn rare unfair 1-star reviews into trust-builders.',
        impactMetric: '+18% higher buyer trust on Maps profiles',
        steps: [
          'Reply within 48 hours to every positive review thanking the client by first name.',
          'Naturally reference the exact service and area ("So glad we got your Vaillant boiler pressure sorted in Greenwich today!").',
          'For any unfair or upset 1-star review, pause for 2 hours, stay completely calm, state the polite facts in 3 sentences, and invite them to email or call you to resolve it.',
          'Never argue, insult the reviewer, or disclose private customer details publicly.',
        ],
        commonMistake:
          'Copy-pasting the exact same robotic "Thanks for your review!" onto 50 reviews in a row — it wastes an easy trust signal.',
        proTip:
          'Prospective customers read your responses to negative reviews more carefully than your 5-star praise — calm professionalism wins their call.',
      },
    ],
  },

  // =========================================================================
  // TRACK 04: UK PSTN Switch-Off (31 Jan 2027) Readiness
  // =========================================================================
  {
    id: 'pstn-2027-readiness',
    code: 'TRACK 04',
    title: 'UK PSTN Switch-Off (31 Jan 2027) Readiness',
    subtitle: 'Protect your 020 London number from copper retirement and turn VoIP into a cleaner daily phone setup.',
    estimatedTime: '22 mins total',
    outcome: 'A complete shop-floor socket audit and porting folder ready for zero-outage 020 Cloud VoIP migration.',
    relatedServiceSlug: 'business-phone',
    coverImage: '/src/assets/images/emtrc_service_voip_office_1795375919862.jpg',
    coverAlt: 'Modern London office desk with a Cloud VoIP business handset and mobile companion app',
    accentTone: 'blue',
    lessons: [
      {
        id: 'ps-01',
        title: 'Audit every copper wall socket on your shop floor or office',
        duration: '8 mins',
        difficulty: '2027 Compliance',
        summary: 'Identify every hidden device currently relying on legacy BT/Openreach copper telephone sockets.',
        whyItMatters:
          'Most owners only think of their desk handset — then get blindsided when an old monitored burglar alarm, panic button, or legacy PDQ card terminal fails because it was still dialling over copper.',
        impactMetric: 'Prevents surprise Q4 2026 shop outages',
        steps: [
          'Locate your BT/Openreach master phone socket and physically trace every cable plugged into it or any extension sockets.',
          'Verify your card terminals run on Wi-Fi + 4G SIM (modern Dojo, SumUp, Square, Zettle are safe; legacy phone-line PDQs are not).',
          'Phone your burglar alarm, CCTV, or lift emergency line provider and ask directly: "Does our system require PSTN copper, or is it already on dual-path IP/4G?"',
          'Check your broadband bill to confirm whether you are on legacy ADSL/FTTC tied to a voice line or already on data-only SoGEA / Full Fibre (FTTP).',
        ],
        commonMistake:
          'Assuming your alarm company or telecoms broker will automatically upgrade your premises before 31 January 2027 without you chasing them.',
        proTip:
          'Completing this 8-minute audit now beats the Q4 2026 London Openreach engineer queue and avoids rush hardware fees.',
      },
      {
        id: 'ps-02',
        title: 'Prepare your 020 LoA porting paperwork (never cancel first)',
        duration: '7 mins',
        difficulty: '2027 Compliance',
        summary: 'Cancelling your old copper contract before porting completes can permanently wipe out a 20-year-old 020 number.',
        whyItMatters:
          'Your 020 London landline is printed on your van livery, shopfront fascia, business cards, and Google Maps profile. A regulated UK Letter of Authority (LoA) port transfers it cleanly — but ONLY while the existing line remains active.',
        impactMetric: 'Zero dead-tone gap during 020 porting',
        steps: [
          'Download your most recent telecoms invoice showing exact legal account holder name, installation postcode, account number, and 020 number(s).',
          'Confirm whether your broadband shares that same copper pair; if so, migrate broadband to SoGEA or Full Fibre BEFORE porting the voice number.',
          'Submit your Letter of Authority (LoA) to your Cloud VoIP provider while keeping your old BT/provider account live.',
          'Wait for official written port completion confirmation (typically 7–14 working days) before confirming final line closure.',
        ],
        commonMistake:
          'Ringing BT or TalkTalk to "cancel the landline from Friday" before your new VoIP provider has completed the number port.',
        proTip:
          'Even a tiny typo between the postcode on your old BT bill and your LoA form can reject a UK number port — match the bill verbatim.',
      },
      {
        id: 'ps-03',
        title: 'Configure opening-hours routing, 4G failover & missed-call SMS',
        duration: '7 mins',
        difficulty: 'Quick Win',
        summary: 'Turn the mandatory copper switch-off into a smarter daily workflow for you and your team.',
        whyItMatters:
          'Cloud VoIP is not just a compliance chore — it finally lets your 020 number ring your mobile app when you are out on jobs, automatically stop ringing at 6pm, and trigger 8-second missed-call text-back during rush hours.',
        impactMetric: 'Captures ~40% of previously lost calls',
        steps: [
          'Set simultaneous ring during opening hours so calls ring both your shop reception handset and your smartphone VoIP app.',
          'Add an automatic out-of-hours greeting at closing time directing callers to your online booking link or 24/7 AI Receptionist.',
          'Configure instant 4G/5G mobile failover so a brief street broadband glitch never gives customers a dead tone.',
          'Pair your line with 8-second missed-call text-back so unanswered rush-hour calls turn into booked jobs.',
        ],
        commonMistake:
          'Leaving a default robotic voicemail ("Leave a message after the tone") — over 62% of London mobile callers hang up and ring the next listing.',
        proTip:
          'Pre-register for emtrc Business Phone (Cloud VoIP) and we handle the broadband check, LoA porting, and missed-call workflow end-to-end.',
      },
    ],
  },

  // =========================================================================
  // TRACK 05: Conversion-First Local Websites & Pricing Psychology
  // =========================================================================
  {
    id: 'conversion-local-web',
    code: 'TRACK 05',
    title: 'Conversion-First Websites & Price Clarity',
    subtitle: 'Turn mobile browsers into booked appointments in under 15 seconds with clear pricing and trust proof.',
    estimatedTime: '20 mins total',
    outcome: 'A clear above-the-fold mobile layout, transparent price guide, and friction-free call/WhatsApp flow.',
    relatedServiceSlug: 'websites',
    coverImage: '/src/assets/images/london_boiler_engineer_work_1795428786510.jpg',
    coverAlt: 'Gas Safe London heating engineer inspecting copper combi boiler pipework with diagnostic gauges',
    accentTone: 'coral',
    lessons: [
      {
        id: 'cw-01',
        title: 'Pass the 5-second London thumb test above the fold',
        duration: '6 mins',
        difficulty: 'Growth Lever',
        summary: 'Most local business homepages waste the entire first mobile screen on a vague slogan and a giant logo.',
        whyItMatters:
          'Over 78% of London local service searches happen on a smartphone — often while walking down a high street or standing beside a leaking radiator. If visitors cannot see WHAT you do, WHERE in London you operate, and HOW to call/book within 5 seconds, they hit Back.',
        impactMetric: '+52% more mobile tap-to-call clicks',
        steps: [
          'Open your website on your own phone over 4G (not office Wi-Fi) and time how many seconds it takes to become clickable.',
          'Check that your first screen without scrolling clearly states: your trade, your London borough(s), live "Open now" status, and a bold Call or Book button.',
          'Make sure your phone number is a real tappable tel: link — never typed as plain text inside an image.',
          'Remove slow auto-playing background videos and intrusive pop-up chat bubbles that cover the call button.',
        ],
        commonMistake:
          'Writing vague headlines like "Quality Solutions You Can Trust Since 2012" instead of "Gas Safe Boiler Repairs & Installations in Greenwich & Blackheath".',
        proTip:
          'A clear headline + starting price + tappable Call/Book button above the fold beats fancy animations every single time.',
      },
      {
        id: 'cw-02',
        title: 'Why publishing starting prices filters out tyre-kickers',
        duration: '7 mins',
        difficulty: 'Growth Lever',
        summary: 'Hiding prices behind "Contact us for a quote" loses serious buyers and floods your phone with price-shoppers.',
        whyItMatters:
          'Busy Londoners hate awkward mystery pricing. Publishing transparent "from £X" guide prices or fixed diagnostic fees pre-qualifies serious clients who respect your craft and immediately cuts down time-wasting "how much for a quick job?" calls.',
        impactMetric: '40% fewer low-intent quote calls',
        steps: [
          'List your 6–10 most common services with honest starting prices (e.g. "Skin Fade — £32", "Boiler Diagnostic — £85", "End-of-Tenancy 2-Bed Clean — from £215").',
          'Add clear duration or what-is-included notes beneath each price so buyers see the real value immediately.',
          'For complex bespoke jobs (rewires, colour corrections, full installations), state your transparent call-out/consultation policy and typical price band.',
          'Keep your website price table in plain HTML text — never upload a pinch-to-zoom PDF or Instagram screenshot.',
        ],
        commonMistake:
          'Uploading a scanned photo of a paper price leaflet — impossible to read on phones and completely invisible to Google and ChatGPT.',
        proTip:
          'Whenever your prices go up by £2–£5, WhatsApp emtrc and we update your live HTML table within 24 hours.',
      },
      {
        id: 'cw-03',
        title: 'Place local trust proof right beside every booking button',
        duration: '7 mins',
        difficulty: 'Essential',
        summary: 'Accreditations, postcode reviews, and real guarantees convert hesitant visitors right at the moment of action.',
        whyItMatters:
          'Putting all your Google reviews on a forgotten "Testimonials" sub-page hides your strongest persuasion asset. Placing real local reviews and UK accreditations (Gas Safe, NICEIC, Checkatrade, Food Hygiene 5) directly next to your booking CTA removes last-second doubt.',
        impactMetric: '+29% lift in completed enquiries',
        steps: [
          'Display verifiable UK credentials in plain sight (Gas Safe number, NICEIC badge, Public Liability insurance limit, or 5-Star Hygiene rating).',
          'Feature 3–4 short genuine reviews quoting real customers’ first names and London neighbourhoods (e.g. "Marcus, Dalston E8").',
          'State one concrete promise right next to your enquiry button (e.g. "No call-out fee if we can’t fix it" or "Same-day confirmation").',
          'Add an interactive WhatsApp quick-message link for clients who prefer sending a quick photo of a job over phoning.',
        ],
        commonMistake:
          'Showing anonymous quotes like "Great service! — J.S." with no neighbourhood or job context — savvy London buyers assume they are made up.',
        proTip:
          'Always link your displayed rating straight to your live Google Business Profile so sceptical buyers can verify every review in one click.',
      },
    ],
  },

  // =========================================================================
  // TRACK 06: ChatGPT, Apple Maps & AI Search Readiness
  // =========================================================================
  {
    id: 'ai-search-readiness',
    code: 'TRACK 06',
    title: 'ChatGPT, Apple Maps & AI Search Readiness',
    subtitle: 'Ensure your London business gets recommended when locals ask ChatGPT, Perplexity, or Siri.',
    estimatedTime: '19 mins total',
    outcome: 'Verified Apple Business Connect profile, machine-readable Schema.org markup, and citable Q&A pages.',
    relatedServiceSlug: 'local-seo',
    coverImage: '/src/assets/images/london_salon_balayage_studio_1795428787038.jpg',
    coverAlt: 'South Kensington independent hair studio styled with natural Georgian window light and arched brass mirrors',
    accentTone: 'emerald',
    lessons: [
      {
        id: 'ai-01',
        title: 'Claim & verify Apple Business Connect (Siri & iPhone Maps)',
        duration: '6 mins',
        difficulty: 'Quick Win',
        summary: 'Over 55% of London smartphone users carry iPhones — and Apple Intelligence pulls local business data straight from Apple Maps.',
        whyItMatters:
          'Most UK trades obsess over Google and completely forget Apple Maps, leaving outdated opening hours or old tenant names on millions of London iPhones. Apple Business Connect is 100% free and feeds Siri, Spotlight, and Apple Maps directly.',
        impactMetric: 'Captures 55%+ London iPhone share',
        steps: [
          'Visit businessconnect.apple.com and sign in with your Apple ID.',
          'Search for your London business address and claim your Place Card (or create a fresh listing if missing).',
          'Upload your real logo, wide daylight hero cover photo, exact opening hours, website URL, and booking action button.',
          'Verify your listing cleanly via business document or phone verification so competitors cannot suggest wrong edits.',
        ],
        commonMistake:
          'Leaving Apple Maps unverified so it scrapes stale phone numbers from old Yell or Foursquare directories.',
        proTip:
          'Add your Fresha, Booksy, or direct website booking URL into Apple’s "Action" button so iPhone users can book straight from Apple Maps.',
      },
      {
        id: 'ai-02',
        title: 'Ship clean LocalBusiness Schema.org JSON-LD & HTML prices',
        duration: '7 mins',
        difficulty: 'Growth Lever',
        summary: 'AI answer engines rely on structured JSON-LD data to verify your trade, postcodes, prices, and hours without guessing.',
        whyItMatters:
          'When someone asks ChatGPT "Recommend an independent electrician in Clapham with transparent call-out rates", the AI checks structured web signals plus Bing/Google/Apple citations. Clean Schema.org JSON-LD acts as an official digital passport for your business.',
        impactMetric: 'Verified entity recognition by AI crawlers',
        steps: [
          'Verify your website declares the specific Schema.org subtype (e.g. BarberShop, Plumber, Electrician, HairSalon, CafeOrCoffeeShop) — not generic Organization.',
          'Include exact areaServed London boroughs, openingHoursSpecification, priceRange, telephone, and sameAs links to your Instagram and Google profile.',
          'Run your live homepage through validator.schema.org to confirm zero JSON syntax warnings.',
          'Ensure every core service and starting price exists as plain crawlable HTML text rather than locked inside a third-party widget.',
        ],
        commonMistake:
          'Using heavy drag-and-drop site builders that hide service lists behind slow JavaScript tabs that AI crawlers skip.',
        proTip:
          'Every emtrc Business and Growth site generates and validates LocalBusiness Schema.org JSON-LD automatically at build time.',
      },
      {
        id: 'ai-03',
        title: 'Publish 5 plain-English local Q&As that AI assistants quote verbatim',
        duration: '6 mins',
        difficulty: 'Growth Lever',
        summary: 'Direct question-and-answer blocks on your website match exactly how Londoners prompt ChatGPT and Perplexity.',
        whyItMatters:
          'AI search assistants love quoting concise, authoritative answers to real local questions like "Do you cover congestion-zone parking in W1?" or "How long does a balayage appointment take?". Five well-written FAQs on your site make you the easiest business to cite.',
        impactMetric: 'Direct citations in AI local answers',
        steps: [
          'Write down the 5 exact questions new London customers ask you every week on the phone or WhatsApp.',
          'Answer each question in 2–4 plain, factual sentences naming your borough, typical turnaround time, and starting price.',
          'Publish them in a clean FAQ section on your homepage or dedicated services page (avoid hiding them in PDFs).',
          'Keep your Bing Places profile synced too — ChatGPT Search leans heavily on Bing’s UK business index alongside live web crawls.',
        ],
        commonMistake:
          'Writing fluffy AI-generated blog paragraphs full of filler instead of concrete local facts (boroughs, hours, call-out rules, exact prices).',
        proTip:
          'Mention specific London details AI can trust — tube stations nearby, ULEZ/parking clarity, and UK trade accreditations.',
      },
    ],
  },
];

export const OWNER_SCRIPTS_VAULT: readonly OwnerScriptTemplate[] = [
  {
    id: 'script-missed-call',
    category: 'Missed Calls',
    title: '8-Second Missed-Call Recovery Text',
    whenToUse: 'Send automatically (or manually within 2 mins) whenever you miss an enquiry call while with a client.',
    channel: 'SMS / WhatsApp',
    script:
      'Hi! Sorry we just missed your call at [Business Name] — we’re hands-on with a customer right now. Reply here with what you need (or your London postcode) and we’ll get right back to you, or grab a slot online here: [Booking Link]',
  },
  {
    id: 'script-dmcc-review',
    category: 'Google Reviews',
    title: 'DMCC-Compliant 2-Hour Post-Visit Review Invite',
    whenToUse: 'Send to every completed customer ~2 hours after their haircut, meal, clean, or completed repair.',
    channel: 'SMS / WhatsApp',
    script:
      'Hi [First Name], thanks so much for visiting [Business Name] today! As a small independent London business, genuine Google reviews mean the world to us. If you have 20 seconds, you can share honest feedback right here: [Direct Google Link] — Thanks, [Your Name]',
  },
  {
    id: 'script-positive-reply',
    category: 'Google Reviews',
    title: 'Local-SEO Positive Review Reply',
    whenToUse: 'Reply within 48 hours to reinforce your trade and London borough naturally.',
    channel: 'Google Reply',
    script:
      'Thanks so much [First Name] — it was a pleasure looking after your [Service, e.g. skin fade / boiler service] in [London Borough] today. Really appreciate you supporting our independent team and we look forward to seeing you again soon!',
  },
  {
    id: 'script-calm-1star',
    category: 'Negative Replies',
    title: 'Calm, High-Trust Reply to an Unfair or Upset 1-Star Review',
    whenToUse: 'Use when a review is harsh or inaccurate — written to reassure the next 500 Londoners reading your profile.',
    channel: 'Google Reply',
    script:
      'Hi [Name], we’re genuinely sorry your visit didn’t feel 5-star. We take pride in every job we do in [Borough] and always want to put things right promptly. We can’t locate a booking under this name, so please email me directly on [hello@yourbusiness.co.uk] or call [020 xxxx xxxx] and I will look into this personally today. — [Your Name], Owner',
  },
  {
    id: 'script-quote-followup',
    category: 'Quotes & Follow-Up',
    title: 'Polite 48-Hour Trade Quote Check-In',
    whenToUse: 'Send 2 days after emailing a boiler, electrical, decorating, or deep-clean estimate (recovers ~25% of silent quotes).',
    channel: 'SMS / WhatsApp',
    script:
      'Hi [First Name], just a quick note from [Your Name] at [Business Name] to check our quote for [Job Summary] landed safely in your inbox. Happy to answer any quick questions or hold a [Day] slot in [Borough] for you — zero rush either way.',
  },
  {
    id: 'script-pstn-check',
    category: 'PSTN 2027',
    title: 'Alarm / PDQ Supplier 2027 Copper Compliance Check Email',
    whenToUse: 'Email your alarm monitoring or card terminal provider today to avoid a 31 Jan 2027 surprise outage.',
    channel: 'Email',
    script:
      'Subject: PSTN Copper Switch-Off Check — Account [Account Number] ([Postcode])\n\nHi team, ahead of the Openreach PSTN copper switch-off on 31 January 2027, could you confirm in writing whether our current equipment at [Shop Address] relies on an analogue copper telephone socket, or if it already runs on IP / 4G cellular? If an upgrade is required, please send the hardware options and lead time. Many thanks, [Your Name]',
  },
];

export const LONDON_MARKETING_CALENDAR: readonly LondonCalendarQuarter[] = [
  {
    id: 'q1',
    quarter: 'Q1',
    months: 'January – March',
    theme: 'Reset, Winter Boiler Peak & New Year Refresh',
    focusStat: 'Highest urgency quarter for trades & post-holiday salon resets',
    tasks: [
      {
        month: 'January',
        headline: 'Lock in new-year prices & winter trade availability',
        detail: 'Update your website HTML price guide, remove festive banners, and publish clear emergency winter call-out slots on Google Maps.',
        tradeFocus: 'Heating, Plumbing, Cleaning & Fitness',
      },
      {
        month: 'February',
        headline: 'Audit Apple Business Connect & Google Categories',
        detail: 'Verify your iPhone Apple Maps Place Card, add any newly launched services, and upload 3 crisp morning craft photos.',
        tradeFocus: 'All 32 London Boroughs',
      },
      {
        month: 'March',
        headline: 'Set Easter & Spring Bank Holiday hours early',
        detail: 'Pre-enter Good Friday and Easter Monday hours in Google Business Profile so Maps never flags your shop with "Hours might differ".',
        tradeFocus: 'Barbers, Salons, Cafés & Retail',
      },
    ],
  },
  {
    id: 'q2',
    quarter: 'Q2',
    months: 'April – June',
    theme: 'Spring Curb Appeal, Daylight Photography & Bank Holidays',
    focusStat: 'Best natural window light of the year for fresh website photos',
    tasks: [
      {
        month: 'April',
        headline: 'Shoot your annual 5-frame daylight shopfront refresh',
        detail: 'Use crisp April morning sun to update your exterior shopfront, van livery, and hands-at-work hero photographs.',
        tradeFocus: 'Every Local Trade & High-Street Shop',
      },
      {
        month: 'May',
        headline: 'Update Early & Late May Bank Holiday opening times',
        detail: 'Confirm Bank Holiday opening hours 14 days in advance and share a short Google Update showcasing weekend availability.',
        tradeFocus: 'Barbers, Salons, Cafés & Cleaners',
      },
      {
        month: 'June',
        headline: 'Run your mid-year Google Reviews & DMCC check',
        detail: 'Reply to any unaddressed reviews, refresh your counter QR stand, and check your 6-month review velocity against your nearest 3 competitors.',
        tradeFocus: 'All Service Trades',
      },
    ],
  },
  {
    id: 'q3',
    quarter: 'Q3',
    months: 'July – September',
    theme: 'Summer Bookings, Back-to-School Rush & PSTN Checkpoints',
    focusStat: 'Prime window to port 020 numbers before Q4 Openreach queues',
    tasks: [
      {
        month: 'July',
        headline: 'Capture summer weddings, holidays & end-of-tenancy moves',
        detail: 'London flat moves and summer events peak in July–August — highlight quick turnaround slots and WhatsApp quote links.',
        tradeFocus: 'Cleaners, Salons, Barbers & Electricians',
      },
      {
        month: 'August',
        headline: 'Complete your 020 PSTN VoIP migration audit',
        detail: 'Check copper sockets, alarm diallers, and SoGEA/FTTP broadband early so your 020 number port finishes cleanly before autumn queues.',
        tradeFocus: 'All 020 Landline Businesses',
      },
      {
        month: 'September',
        headline: 'Launch pre-winter boiler, lighting & school-term offers',
        detail: 'Add seasonal service highlights (boiler servicing, outdoor security lighting, back-to-work cuts) and refresh local area pages.',
        tradeFocus: 'Heating, Electrical, Barbers & Cafés',
      },
    ],
  },
  {
    id: 'q4',
    quarter: 'Q4',
    months: 'October – December',
    theme: 'Peak Season Revenue, Festive Hours & Year-End Proof',
    focusStat: 'Highest revenue quarter for salons, barbers, hospitality & heating',
    tasks: [
      {
        month: 'October',
        headline: 'Switch on missed-call SMS ahead of peak call volume',
        detail: 'Darker evenings and cold snaps spike phone calls — make sure unanswered calls trigger an 8-second recovery text instead of voicemail.',
        tradeFocus: 'Plumbers, Electricians, Salons & Barbers',
      },
      {
        month: 'November',
        headline: 'Publish December extended hours & gift voucher banners',
        detail: 'WhatsApp emtrc your December late-night dates and gift-card links by 15 November so regulars book prime slots early.',
        tradeFocus: 'Barbers, Salons, Cafés & Local Shops',
      },
      {
        month: 'December',
        headline: 'Lock Christmas/New Year hours & review annual call ROI',
        detail: 'Set exact Christmas Eve through 2 January hours on Google & Apple Maps, and review your annual tap-to-call report to plan next year.',
        tradeFocus: 'All London Local Businesses',
      },
    ],
  },
];
