export type AppModuleId =
  | 'calls'
  | 'agent'
  | 'leads'
  | 'pricing'
  | 'seo'
  | 'reviews'
  | 'social'
  | 'edits';

export interface MissedCallThread {
  id: string;
  caller: string;
  postcode: string;
  message: string;
  valueGbp: number;
  status: 'Booked' | 'Quote sent' | 'SMS sent';
  timestamp: string;
}

export interface AgentDraftItem {
  id: string;
  category: 'Quote Chase' | 'Supplier Reply' | 'Booking Confirm' | 'Invoice Reminder';
  recipient: string;
  subject: string;
  draftPreview: string;
  status: 'Pending approval' | 'Approved & sent';
}

export interface SalesLeadItem {
  id: string;
  company: string;
  borough: string;
  contactRole: string;
  estimatedMonthlyValue: number;
  signal: string;
  stage: 'New prospect' | 'Intro sent' | 'Call booked';
}

export interface CompetitorPriceRow {
  id: string;
  service: string;
  yourPrice: number;
  boroughMedian: number;
  topRivalName: string;
  topRivalPrice: number;
  synced?: boolean;
}

export interface SeoRankKeyword {
  id: string;
  keyword: string;
  postcode: string;
  mapsRank: number;
  weeklyDelta: number;
  monthlySearches: number;
  reviewsBehindFirst: number;
}

export interface ReviewReplyItem {
  id: string;
  author: string;
  rating: number;
  borough: string;
  excerpt: string;
  draftReply: string;
  status: 'Awaiting approval' | 'Published on Google';
}

export interface SocialPostDraft {
  id: string;
  channel: 'Instagram' | 'Google Business' | 'Facebook' | 'TikTok';
  scheduledFor: string;
  title: string;
  caption: string;
  status: 'Ready to approve' | 'Scheduled';
}

export type VoipRoutingMode = 'ai-receptionist' | 'missed-call-sms' | 'owner-mobile';

export const INITIAL_MISSED_CALLS: readonly MissedCallThread[] = [
  {
    id: 'call-1',
    caller: '07700 900 418',
    postcode: 'SE10',
    message: '“Emergency Vaillant boiler pressure drop — free tomorrow morning?”',
    valueGbp: 240,
    status: 'Booked',
    timestamp: '09:14',
  },
  {
    id: 'call-2',
    caller: '07700 900 291',
    postcode: 'E8',
    message: '“Do you have a 4:30pm skin fade + beard trim slot today?”',
    valueGbp: 42,
    status: 'Booked',
    timestamp: '10:02',
  },
  {
    id: 'call-3',
    caller: '020 7946 0311',
    postcode: 'SW11',
    message: '“2-bed end of tenancy deep clean needed this Friday before check-out.”',
    valueGbp: 265,
    status: 'Quote sent',
    timestamp: '11:28',
  },
];

export const SIMULATED_CALL_POOL: readonly Omit<MissedCallThread, 'id' | 'timestamp'>[] = [
  {
    caller: '07700 900 784',
    postcode: 'N1',
    message: '“Consumer unit tripped in Islington flat — can anyone attend today?”',
    valueGbp: 195,
    status: 'SMS sent',
  },
  {
    caller: '07700 900 612',
    postcode: 'SW7',
    message: '“Looking to book full balayage + gloss for Saturday 11am.”',
    valueGbp: 185,
    status: 'SMS sent',
  },
  {
    caller: '07700 900 509',
    postcode: 'SE15',
    message: '“Can we pre-order 40 sourdough pastries for an office meeting Thursday?”',
    valueGbp: 160,
    status: 'SMS sent',
  },
];

export const INITIAL_AGENT_DRAFTS: readonly AgentDraftItem[] = [
  {
    id: 'agent-1',
    category: 'Quote Chase',
    recipient: 'Mark Stevens · Greenwich Lettings',
    subject: 'Following up on 4x annual CP12 landlord gas certificates',
    draftPreview:
      'Hi Mark — checking if you would like us to lock in Tuesday morning slots for the four SE10 flats at £85 each.',
    status: 'Pending approval',
  },
  {
    id: 'agent-2',
    category: 'Booking Confirm',
    recipient: 'Chloe Patel · SW7',
    subject: 'Saturday 10:30 appointment reminder & patch test note',
    draftPreview:
      'Hi Chloe — looking forward to seeing you Saturday at 10:30. Reply RESCHEDULE if you need to adjust.',
    status: 'Pending approval',
  },
  {
    id: 'agent-3',
    category: 'Supplier Reply',
    recipient: 'London Trade Wholesale E8',
    subject: 'Re-order confirmation: weekly consumables pack',
    draftPreview:
      'Confirmed for Thursday 07:30 delivery to rear entrance on Kingsland Road. Invoice ref #4082 attached.',
    status: 'Approved & sent',
  },
];

export const INITIAL_SALES_LEADS: readonly SalesLeadItem[] = [
  {
    id: 'lead-1',
    company: 'Thameside Lettings & Management',
    borough: 'Greenwich SE10',
    contactRole: 'Property Manager · 48 managed flats',
    estimatedMonthlyValue: 850,
    signal: 'Posted 6 new rental listings this week requiring annual safety & cleaning turns.',
    stage: 'New prospect',
  },
  {
    id: 'lead-2',
    company: 'Redchurch Boutique Hotel',
    borough: 'Shoreditch E2',
    contactRole: 'Operations Director · 34 rooms',
    estimatedMonthlyValue: 640,
    signal: 'Searching for local weekday bakery & specialty coffee wholesale partner.',
    stage: 'Intro sent',
  },
  {
    id: 'lead-3',
    company: 'Clerkenwell Design Co-Working',
    borough: 'Islington EC1',
    contactRole: 'Studio Manager · 120 desks',
    estimatedMonthlyValue: 1120,
    signal: 'Expanding to 2nd floor next month — contract cleaning & maintenance tender open.',
    stage: 'New prospect',
  },
  {
    id: 'lead-4',
    company: 'Battersea Residential Estates',
    borough: 'Wandsworth SW11',
    contactRole: 'Head of Maintenance · 65 units',
    estimatedMonthlyValue: 960,
    signal: 'Requested local NICEIC & Gas Safe preferred contractor shortlist.',
    stage: 'Call booked',
  },
];

export const INITIAL_COMPETITOR_PRICING: readonly CompetitorPriceRow[] = [
  {
    id: 'price-1',
    service: 'Skin Fade & Finish',
    yourPrice: 32,
    boroughMedian: 36,
    topRivalName: 'Broadway Grooming E8',
    topRivalPrice: 38,
  },
  {
    id: 'price-2',
    service: 'Emergency Boiler Diagnostics (1st hr)',
    yourPrice: 95,
    boroughMedian: 115,
    topRivalName: 'SE10 Heat & Pipe',
    topRivalPrice: 120,
  },
  {
    id: 'price-3',
    service: '2-Bed End-of-Tenancy Deep Clean',
    yourPrice: 265,
    boroughMedian: 280,
    topRivalName: 'Wandsworth Sparkle Ltd',
    topRivalPrice: 295,
  },
  {
    id: 'price-4',
    service: 'Full Head Balayage & Cut',
    yourPrice: 185,
    boroughMedian: 210,
    topRivalName: 'Sloane Colour House SW7',
    topRivalPrice: 235,
  },
];

export const INITIAL_SEO_KEYWORDS: readonly SeoRankKeyword[] = [
  {
    id: 'seo-1',
    keyword: 'skin fade barber hackney e8',
    postcode: 'E8',
    mapsRank: 1,
    weeklyDelta: 2,
    monthlySearches: 1480,
    reviewsBehindFirst: 0,
  },
  {
    id: 'seo-2',
    keyword: 'emergency boiler repair greenwich se10',
    postcode: 'SE10',
    mapsRank: 2,
    weeklyDelta: 3,
    monthlySearches: 920,
    reviewsBehindFirst: 6,
  },
  {
    id: 'seo-3',
    keyword: 'balayage hair salon south kensington',
    postcode: 'SW7',
    mapsRank: 1,
    weeklyDelta: 1,
    monthlySearches: 1290,
    reviewsBehindFirst: 0,
  },
  {
    id: 'seo-4',
    keyword: 'end of tenancy cleaner wandsworth sw11',
    postcode: 'SW11',
    mapsRank: 3,
    weeklyDelta: 2,
    monthlySearches: 1640,
    reviewsBehindFirst: 11,
  },
  {
    id: 'seo-5',
    keyword: 'niceic electrician camden nw1',
    postcode: 'NW1',
    mapsRank: 2,
    weeklyDelta: 4,
    monthlySearches: 740,
    reviewsBehindFirst: 4,
  },
];

export const INITIAL_REVIEWS: readonly ReviewReplyItem[] = [
  {
    id: 'rev-1',
    author: 'Priya S.',
    rating: 5,
    borough: 'Greenwich SE10',
    excerpt: '“Boiler fixed same afternoon, clear price upfront and spotless work.”',
    draftReply:
      'Thanks so much Priya — glad we could get your heating back on the same afternoon. Always here whenever SE10 needs us.',
    status: 'Awaiting approval',
  },
  {
    id: 'rev-2',
    author: 'Daniel O.',
    rating: 5,
    borough: 'Hackney E8',
    excerpt: '“Sharpest skin fade on Kingsland Rd, booked straight from Google in 20 seconds.”',
    draftReply:
      'Appreciate the kind words Daniel — great seeing you in the chair and we will have your usual ready next time.',
    status: 'Published on Google',
  },
  {
    id: 'rev-3',
    author: 'Hannah W.',
    rating: 5,
    borough: 'Wandsworth SW11',
    excerpt: '“Full deposit back from Foxtons without a single note on the inventory.”',
    draftReply:
      'Brilliant news on getting your full deposit back Hannah! Wishing you all the best in your new place.',
    status: 'Awaiting approval',
  },
];

export const INITIAL_SOCIAL_DRAFTS: readonly SocialPostDraft[] = [
  {
    id: 'soc-1',
    channel: 'Instagram',
    scheduledFor: 'Thu · 18:15',
    title: 'Weekend slot reminder + Hackney craft reel',
    caption:
      'Four Friday afternoon slots left on Kingsland Rd. Tap the link in bio to grab your chair in 20 seconds — upfront pricing, zero walk-in wait.',
    status: 'Ready to approve',
  },
  {
    id: 'soc-2',
    channel: 'Google Business',
    scheduledFor: 'Fri · 09:00',
    title: 'Spring Boiler Service Fixed Rate (£89)',
    caption:
      'Book your Gas Safe annual boiler check across SE10 & SE3 before peak autumn call-outs. Fixed £89 with full digital certificate.',
    status: 'Ready to approve',
  },
  {
    id: 'soc-3',
    channel: 'Instagram',
    scheduledFor: 'Sun · 10:30',
    title: 'Fresh morning cardamom knots & sourdough batch',
    caption:
      'Straight out of the Peckham deck oven at 08:00. Full allergen & vegan menu live on our mobile site — no tiny PDFs.',
    status: 'Scheduled',
  },
];

export function calculatePriceGapPercent(yourPrice: number, marketMedian: number): number {
  if (marketMedian <= 0) return 0;
  return Math.round(((yourPrice - marketMedian) / marketMedian) * 100);
}

export function calculatePendingApprovalsCount(
  agentDrafts: readonly AgentDraftItem[],
  reviews: readonly ReviewReplyItem[],
  socialDrafts: readonly SocialPostDraft[]
): number {
  const pendingAgents = agentDrafts.filter((a) => a.status === 'Pending approval').length;
  const pendingReviews = reviews.filter((r) => r.status === 'Awaiting approval').length;
  const pendingSocial = socialDrafts.filter((s) => s.status === 'Ready to approve').length;
  return pendingAgents + pendingReviews + pendingSocial;
}

export function filterSeoKeywords(
  keywords: readonly SeoRankKeyword[],
  query: string
): SeoRankKeyword[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [...keywords];
  return keywords.filter(
    (k) =>
      k.keyword.toLowerCase().includes(normalized) ||
      k.postcode.toLowerCase().includes(normalized)
  );
}

export function createSimulatedMissedCall(sequenceIndex: number): MissedCallThread {
  const template = SIMULATED_CALL_POOL[sequenceIndex % SIMULATED_CALL_POOL.length];
  return {
    ...template,
    id: `sim-call-${sequenceIndex + 1}`,
    timestamp: 'Just now',
  };
}
