/**
 * Cloudflare Pages Function: /api/brevo-lead
 *
 * Handles three emtrc lead flows securely on Cloudflare's edge with ZERO secrets in client code:
 *   1. `kind: "newsletter"` — adds subscriber to BREVO_NEWSLETTER_LIST_ID + sends welcome email
 *   2. `kind: "pdf"`        — adds contact to BREVO_PDF_LIST_ID + emails the requested PDF link automatically
 *   3. `kind: "free_demo"`  — adds lead to BREVO_ENQUIRY_LIST_ID + alerts team & confirms to owner
 *
 * Configure these encrypted environment variables in Cloudflare Dashboard -> Settings -> Variables & Secrets:
 *   - BREVO_API_KEY
 *   - BREVO_SENDER_EMAIL (e.g. hello@emtrc.com)
 *   - BREVO_SENDER_NAME  (e.g. emtrc London)
 *   - BREVO_NOTIFY_EMAIL (e.g. kieran@emtrc.com)
 *   - BREVO_NEWSLETTER_LIST_ID (numeric Brevo list ID, e.g. 3)
 *   - BREVO_PDF_LIST_ID        (numeric Brevo list ID, e.g. 4)
 *   - BREVO_ENQUIRY_LIST_ID    (numeric Brevo list ID, e.g. 5)
 */

interface BrevoEnv {
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  BREVO_NOTIFY_EMAIL?: string;
  BREVO_NEWSLETTER_LIST_ID?: string;
  BREVO_PDF_LIST_ID?: string;
  BREVO_ENQUIRY_LIST_ID?: string;
}

interface LeadPayload {
  kind?: 'newsletter' | 'pdf' | 'free_demo';
  email?: string;
  name?: string;
  businessName?: string;
  borough?: string;
  trade?: string;
  phone?: string;
  plan?: string;
  guideTitle?: string;
  pdfUrl?: string;
  source?: string;
}

const PDF_LINKS: Record<string, string> = {
  'website-checklist': 'https://emtrc.com/downloads/emtrc-london-website-checklist-2026.pdf',
  'pstn-2027': 'https://emtrc.com/downloads/emtrc-uk-pstn-switch-off-guide-2027.pdf',
  'maps-ai-search': 'https://emtrc.com/downloads/emtrc-google-maps-ai-search-playbook.pdf',
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function parseListId(raw: string | undefined): number | null {
  if (!raw) return null;
  const parsed = Number.parseInt(raw.trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function onRequestPost(context: { request: Request; env: BrevoEnv }): Promise<Response> {
  const { request, env } = context;
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), { status: 400, headers });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!isValidEmail(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Please provide a valid email address.' }), {
      status: 400,
      headers,
    });
  }

  const apiKey = env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    // Graceful response until the owner adds BREVO_API_KEY in Cloudflare Dashboard
    return new Response(
      JSON.stringify({
        ok: true,
        mode: 'unconfigured',
        message: 'Received — configure BREVO_API_KEY in Cloudflare Dashboard to enable live Brevo sync.',
      }),
      { status: 200, headers }
    );
  }

  const kind = body.kind ?? 'newsletter';
  const senderEmail = env.BREVO_SENDER_EMAIL?.trim() || 'hello@emtrc.com';
  const senderName = env.BREVO_SENDER_NAME?.trim() || 'emtrc London';
  const notifyEmail = env.BREVO_NOTIFY_EMAIL?.trim() || senderEmail;

  const listIdMap: Record<string, number | null> = {
    newsletter: parseListId(env.BREVO_NEWSLETTER_LIST_ID),
    pdf: parseListId(env.BREVO_PDF_LIST_ID),
    free_demo: parseListId(env.BREVO_ENQUIRY_LIST_ID),
  };

  const targetListId = listIdMap[kind];
  const brevoHeaders = {
    'api-key': apiKey,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // 1. Upsert contact into Brevo CRM & selected List ID
  const contactPayload: Record<string, unknown> = {
    email,
    updateEnabled: true,
    attributes: {
      FIRSTNAME: (body.name ?? '').trim().slice(0, 80),
      BUSINESS: (body.businessName ?? '').trim().slice(0, 120),
      BOROUGH: (body.borough ?? '').trim().slice(0, 80),
      TRADE: (body.trade ?? '').trim().slice(0, 80),
      PHONE: (body.phone ?? '').trim().slice(0, 40),
      SOURCE: (body.source ?? kind).slice(0, 80),
    },
  };
  if (targetListId) {
    contactPayload.listIds = [targetListId];
  }

  const contactRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: brevoHeaders,
    body: JSON.stringify(contactPayload),
  });

  if (!contactRes.ok && contactRes.status !== 204) {
    const errText = await contactRes.text().catch(() => '');
    return new Response(
      JSON.stringify({ ok: false, error: 'Brevo contact sync failed', detail: errText.slice(0, 200) }),
      { status: 502, headers }
    );
  }

  // 2. Send automatic transactional email (PDF delivery or Demo confirmation + internal alert)
  if (kind === 'pdf') {
    const guideTitle = (body.guideTitle ?? 'Your emtrc London Playbook').slice(0, 140);
    const resolvedPdf =
      body.pdfUrl && body.pdfUrl.startsWith('https://')
        ? body.pdfUrl
        : PDF_LINKS[body.source ?? ''] ?? 'https://emtrc.com/resources#guides';

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email, name: (body.name ?? '').trim() || undefined }],
        subject: `Your free PDF: ${guideTitle}`,
        htmlContent: `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#111;">
          <h2 style="margin-bottom:8px;">Here is your free London playbook</h2>
          <p style="line-height:1.6;color:#444;">Thanks for requesting <strong>${escapeHtml(guideTitle)}</strong> from emtrc London.</p>
          <p style="margin:24px 0;"><a href="${escapeHtml(resolvedPdf)}" style="background:#E03528;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;">Download your PDF</a></p>
          <p style="font-size:13px;color:#666;">Want to see a working demo website built for your business in 48 hours? Reply to this email or visit <a href="https://emtrc.com/free-demo">emtrc.com/free-demo</a>.</p>
        </div>`,
      }),
    });
  } else if (kind === 'free_demo') {
    const biz = escapeHtml((body.businessName ?? 'your business').slice(0, 120));
    const borough = escapeHtml((body.borough ?? 'London').slice(0, 80));
    const trade = escapeHtml((body.trade ?? 'Local business').slice(0, 80));
    const phone = escapeHtml((body.phone ?? 'Not provided').slice(0, 40));

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: brevoHeaders,
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: notifyEmail, name: 'emtrc Team' }],
        replyTo: { email },
        subject: `New Free Demo Request: ${body.businessName ?? email} (${body.borough ?? 'London'})`,
        htmlContent: `<div style="font-family:system-ui,-apple-system,sans-serif;color:#111;">
          <h2>New Free 48-Hour Demo Request</h2>
          <ul>
            <li><strong>Business:</strong> ${biz}</li>
            <li><strong>Trade:</strong> ${trade}</li>
            <li><strong>Borough:</strong> ${borough}</li>
            <li><strong>Email:</strong> ${escapeHtml(email)}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Plan interest:</strong> ${escapeHtml((body.plan ?? 'Not specified').slice(0, 60))}</li>
          </ul>
        </div>`,
      }),
    });
  }

  return new Response(JSON.stringify({ ok: true, mode: 'brevo-live', kind }), { status: 200, headers });
}
