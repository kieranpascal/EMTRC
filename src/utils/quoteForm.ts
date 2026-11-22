export interface QuoteRequestInput {
  name: string;
  phone: string;
  email: string;
  postcode: string;
  serviceType: string;
  propertySize: string;
  notes: string;
  honeypot: string;
}

export type QuoteValidationErrors = Partial<Record<keyof QuoteRequestInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

export function validateQuoteForm(input: QuoteRequestInput): QuoteValidationErrors {
  const errors: QuoteValidationErrors = {};

  if (input.name.trim().length < 2) {
    errors.name = 'Enter your name.';
  }

  const digits = input.phone.replace(/[^\d]/g, '');
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Enter a valid UK phone number.';
  }

  if (input.email.trim() && !EMAIL_RE.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!input.postcode.trim()) {
    errors.postcode = 'Enter your London postcode.';
  } else if (!UK_POSTCODE_RE.test(input.postcode.trim())) {
    errors.postcode = 'Enter a valid UK postcode (e.g. SW11 1AA).';
  }

  if (!input.serviceType.trim()) {
    errors.serviceType = 'Choose the service you need.';
  }

  return errors;
}

export function hasQuoteErrors(errors: QuoteValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

export interface QuoteSubmitResult {
  ok: boolean;
  mode: 'dry-run' | 'posted' | 'honeypot-dropped' | 'error';
  errorMessage?: string;
}

export async function submitQuoteRequest(
  input: QuoteRequestInput,
  endpoint?: string,
  fetchImpl: typeof fetch = fetch
): Promise<QuoteSubmitResult> {
  if (input.honeypot.trim().length > 0) {
    return { ok: true, mode: 'honeypot-dropped' };
  }

  const target = (endpoint ?? '').trim();
  if (!target) {
    return { ok: true, mode: 'dry-run' };
  }

  try {
    const response = await fetchImpl(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: input.name.trim(),
        phone: input.phone.trim(),
        email: input.email.trim(),
        postcode: input.postcode.trim().toUpperCase(),
        serviceType: input.serviceType.trim(),
        propertySize: input.propertySize.trim(),
        notes: input.notes.trim(),
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return {
        ok: false,
        mode: 'error',
        errorMessage: 'Could not send your quote request right now. Please call us instead.',
      };
    }

    return { ok: true, mode: 'posted' };
  } catch {
    return {
      ok: false,
      mode: 'error',
      errorMessage: 'Could not send your quote request right now. Please call us instead.',
    };
  }
}
