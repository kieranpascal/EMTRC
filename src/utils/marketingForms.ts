export interface FreeDemoFormData {
  businessName: string;
  trade: string;
  borough: string;
  profileUrl: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  consentContact: boolean;
  consentMarketing: boolean;
  websiteHoneypot: string;
}

export interface PdfDownloadFormData {
  guideId: string;
  name: string;
  email: string;
  businessType: string;
  consent: boolean;
  websiteHoneypot: string;
}

export interface NewsletterFormData {
  email: string;
  websiteHoneypot: string;
}

export interface FormSubmitResult {
  ok: boolean;
  mode: 'dry-run' | 'submitted' | 'spam-dropped';
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validateFreeDemoForm(
  data: FreeDemoFormData
): Partial<Record<keyof FreeDemoFormData, string>> {
  const errors: Partial<Record<keyof FreeDemoFormData, string>> = {};
  if (!data.businessName.trim() || data.businessName.trim().length < 2) {
    errors.businessName = 'Enter your business name.';
  }
  if (!data.trade.trim()) {
    errors.trade = 'Select your trade or sector.';
  }
  if (!data.borough.trim()) {
    errors.borough = 'Select your London borough.';
  }
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Enter your name.';
  }
  if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (data.profileUrl.trim()) {
    const val = data.profileUrl.trim();
    if (!/^https?:\/\//i.test(val) && !val.includes('.')) {
      errors.profileUrl = 'Enter a valid Google Maps or Instagram link (or leave blank).';
    }
  }
  if (!data.consentContact) {
    errors.consentContact = 'Please confirm emtrc can contact you about your free demo.';
  }
  return errors;
}

export function validatePdfDownloadForm(
  data: PdfDownloadFormData
): Partial<Record<keyof PdfDownloadFormData, string>> {
  const errors: Partial<Record<keyof PdfDownloadFormData, string>> = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Enter your first name.';
  }
  if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address so we can send the guide.';
  }
  if (!data.consent) {
    errors.consent = 'Tick the box to receive your free PDF guide.';
  }
  return errors;
}

export interface ContactEnquiryFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  borough: string;
  serviceInterest: string;
  message: string;
  consent: boolean;
  websiteHoneypot: string;
}

export function validateNewsletterForm(
  data: NewsletterFormData
): Partial<Record<keyof NewsletterFormData, string>> {
  const errors: Partial<Record<keyof NewsletterFormData, string>> = {};
  if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export function validateContactEnquiryForm(
  data: ContactEnquiryFormData
): Partial<Record<keyof ContactEnquiryFormData, string>> {
  const errors: Partial<Record<keyof ContactEnquiryFormData, string>> = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Enter your full name.';
  }
  if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address so our London studio can reply.';
  }
  if (!data.serviceInterest.trim()) {
    errors.serviceInterest = 'Select what you would like help with.';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = 'Tell us briefly about your business or question (at least 10 characters).';
  }
  if (!data.consent) {
    errors.consent = 'Confirm emtrc can reply to your enquiry.';
  }
  return errors;
}

export async function postStaticForm<T extends { websiteHoneypot: string }>(
  endpoint: string | undefined,
  payload: T,
  fetchImpl: typeof fetch = fetch
): Promise<FormSubmitResult> {
  if (payload.websiteHoneypot.trim().length > 0) {
    return { ok: true, mode: 'spam-dropped' };
  }

  const trimmed = (endpoint ?? '').trim();
  if (!trimmed) {
    return { ok: true, mode: 'dry-run' };
  }

  const { websiteHoneypot: _ignored, ...cleanPayload } = payload;
  try {
    const res = await fetchImpl(trimmed, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(cleanPayload),
    });
    if (!res.ok) {
      return {
        ok: false,
        mode: 'submitted',
        error: 'We could not send that right now. Please email us directly or try again.',
      };
    }
    return { ok: true, mode: 'submitted' };
  } catch {
    return {
      ok: false,
      mode: 'submitted',
      error: 'Connection issue. Please try again or email hello@emtrc.com.',
    };
  }
}
