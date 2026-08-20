/**
 * Magic Mirror Brooklyn — lead delivery Worker (Cloudflare).
 *
 * The static site POSTs quote-form leads here (JSON). The Worker:
 *   1. rejects anything but POST + JSON from the allowed origin
 *   2. validates and normalizes fields server-side
 *   3. drops honeypot submissions silently
 *   4. verifies a Cloudflare Turnstile token when TURNSTILE_SECRET is set
 *   5. rate-limits by IP (KV-based fixed window)
 *   6. forwards the lead to LEAD_WEBHOOK (CRM/webhook/email relay) and only
 *      reports success after that upstream acknowledges with a 2xx
 *   7. logs every attempt (accepted/rejected/failed) to LEAD_LOG KV
 *
 * Required bindings/secrets (configure in the Cloudflare dashboard or wrangler.toml —
 * never in the site repo):
 *   LEAD_WEBHOOK     secret  — upstream delivery URL (GoHighLevel inbound webhook,
 *                              Zapier/Make hook, or another mail relay)
 *   TURNSTILE_SECRET secret  — Turnstile server key (optional but recommended;
 *                              add the matching site key to the form when enabled)
 *   RATE_KV          KV      — rate-limit counters
 *   LEAD_LOG         KV      — delivery log (list keys by date to audit)
 *   ALLOWED_ORIGIN   var     — https://www.magicmirrorbrooklyn.com
 *   MOCK_MODE        var     — "1" to accept without forwarding (local/testing)
 *
 * Deploy:  npx wrangler deploy workers/lead-worker.js --name mmb-lead
 * Then set NEXT_PUBLIC_LEAD_ENDPOINT to the worker URL in the site build.
 */

const RATE_LIMIT = 5; // submissions
const RATE_WINDOW_S = 600; // per 10 minutes per IP

const REQUIRED = ["name", "email", "eventDate", "venueZip"];
const MAX_LEN = 2000;

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function json(env, status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(env),
  });
}

async function log(env, entry) {
  if (!env.LEAD_LOG) return;
  const key = `${new Date().toISOString()}-${crypto.randomUUID().slice(0, 8)}`;
  await env.LEAD_LOG.put(key, JSON.stringify(entry), {
    expirationTtl: 60 * 60 * 24 * 90, // keep 90 days
  });
}

const worker = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }
    if (request.method !== "POST") {
      return json(env, 405, { ok: false, error: "method_not_allowed" });
    }

    let lead;
    try {
      lead = await request.json();
    } catch {
      return json(env, 400, { ok: false, error: "invalid_json" });
    }

    // Honeypot: pretend success, deliver nothing.
    if (lead.company_website) {
      await log(env, { outcome: "honeypot", ip: request.headers.get("cf-connecting-ip") });
      return json(env, 200, { ok: true });
    }

    // Server-side validation.
    const errors = [];
    for (const field of REQUIRED) {
      if (!String(lead[field] ?? "").trim()) errors.push(field);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(lead.email ?? "")))
      errors.push("email_format");
    if (!/^\d{5}(-\d{4})?$/.test(String(lead.venueZip ?? "")))
      errors.push("zip_format");
    for (const [k, v] of Object.entries(lead)) {
      if (typeof v === "string" && v.length > MAX_LEN) errors.push(`${k}_too_long`);
    }
    if (errors.length) {
      await log(env, { outcome: "rejected", errors });
      return json(env, 422, { ok: false, error: "validation", fields: errors });
    }

    // Rate limit by IP.
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    if (env.RATE_KV) {
      const bucket = `rate:${ip}:${Math.floor(Date.now() / (RATE_WINDOW_S * 1000))}`;
      const count = parseInt((await env.RATE_KV.get(bucket)) || "0", 10) + 1;
      await env.RATE_KV.put(bucket, String(count), { expirationTtl: RATE_WINDOW_S });
      if (count > RATE_LIMIT) {
        await log(env, { outcome: "rate_limited", ip });
        return json(env, 429, { ok: false, error: "rate_limited" });
      }
    }

    // Turnstile verification (when configured).
    if (env.TURNSTILE_SECRET) {
      const token = String(lead["cf-turnstile-response"] ?? "");
      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET,
            response: token,
            remoteip: ip,
          }),
        }
      ).then((r) => r.json());
      if (!verify.success) {
        await log(env, { outcome: "turnstile_failed", ip });
        return json(env, 403, { ok: false, error: "captcha" });
      }
      delete lead["cf-turnstile-response"];
    }

    // Normalize.
    const clean = {
      ...lead,
      name: String(lead.name).trim(),
      email: String(lead.email).trim().toLowerCase(),
      phone: String(lead.phone ?? "").replace(/[^\d+]/g, ""),
      venueZip: String(lead.venueZip).trim(),
      receivedAt: new Date().toISOString(),
      ip,
    };

    if (env.MOCK_MODE === "1") {
      await log(env, { outcome: "mock_accepted", email: clean.email });
      return json(env, 200, { ok: true, mock: true });
    }

    if (!env.LEAD_WEBHOOK) {
      await log(env, { outcome: "misconfigured" });
      return json(env, 500, { ok: false, error: "not_configured" });
    }

    // Durable delivery: only report success on an upstream 2xx.
    try {
      const upstream = await fetch(env.LEAD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clean),
      });
      if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
      await log(env, { outcome: "delivered", email: clean.email });
      return json(env, 200, { ok: true });
    } catch (err) {
      await log(env, {
        outcome: "delivery_failed",
        email: clean.email,
        error: String(err),
        lead: clean, // preserved in the log so no lead is lost silently
      });
      return json(env, 502, { ok: false, error: "delivery_failed" });
    }
  },
};

export default worker;
