/**
 * Lead worker contract tests — run with:  node --test workers/
 * Covers validation, honeypot, rate limiting, success, upstream failure,
 * timeout-equivalent network error, and mock mode. No network access: the
 * upstream fetch is stubbed.
 */
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import worker from "./lead-worker.js";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

function kv() {
  const store = new Map();
  return {
    async get(k) {
      return store.has(k) ? store.get(k) : null;
    },
    async put(k, v) {
      store.set(k, v);
    },
    _store: store,
  };
}

function makeEnv(overrides = {}) {
  return {
    LEAD_WEBHOOK: "https://upstream.example/hook",
    ALLOWED_ORIGIN: "https://www.magicmirrorbrooklyn.com",
    RATE_KV: kv(),
    LEAD_LOG: kv(),
    ...overrides,
  };
}

function post(body, ip = "1.2.3.4") {
  return new Request("https://worker.example/", {
    method: "POST",
    headers: { "Content-Type": "application/json", "cf-connecting-ip": ip },
    body: JSON.stringify(body),
  });
}

const validLead = {
  name: "Test Person",
  email: "Test@Example.com",
  eventDate: "2027-05-01",
  venueZip: "11201",
  phone: "(917) 555-0100",
};

let upstreamCalls;
beforeEach(() => {
  upstreamCalls = [];
});

function stubUpstream(status = 200) {
  globalThis.fetch = async (url, init) => {
    upstreamCalls.push({ url, body: init?.body });
    return new Response("{}", { status });
  };
}

test("rejects invalid JSON", async () => {
  const env = makeEnv();
  const res = await worker.fetch(
    new Request("https://worker.example/", { method: "POST", body: "not json" }),
    env
  );
  assert.equal(res.status, 400);
});

test("rejects missing required fields with 422", async () => {
  stubUpstream();
  const env = makeEnv();
  const res = await worker.fetch(post({ name: "X" }), env);
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.equal(body.error, "validation");
  assert.ok(body.fields.includes("email"));
  assert.equal(upstreamCalls.length, 0);
});

test("rejects bad zip format", async () => {
  stubUpstream();
  const env = makeEnv();
  const res = await worker.fetch(post({ ...validLead, venueZip: "abc" }), env);
  assert.equal(res.status, 422);
});

test("honeypot returns ok without forwarding", async () => {
  stubUpstream();
  const env = makeEnv();
  const res = await worker.fetch(
    post({ ...validLead, company_website: "spam.example" }),
    env
  );
  assert.equal(res.status, 200);
  assert.equal(upstreamCalls.length, 0);
});

test("valid lead is normalized, forwarded, and acknowledged", async () => {
  stubUpstream(200);
  const env = makeEnv();
  const res = await worker.fetch(post(validLead), env);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).ok, true);
  assert.equal(upstreamCalls.length, 1);
  const sent = JSON.parse(upstreamCalls[0].body);
  assert.equal(sent.email, "test@example.com"); // lowercased
  assert.equal(sent.phone, "9175550100"); // digits only
  const outcomes = [...env.LEAD_LOG._store.values()].map((v) => JSON.parse(v).outcome);
  assert.deepEqual(outcomes, ["delivered"]);
});

test("upstream non-2xx becomes 502 and the lead is preserved in the log", async () => {
  stubUpstream(500);
  const env = makeEnv();
  const res = await worker.fetch(post(validLead), env);
  assert.equal(res.status, 502);
  const entries = [...env.LEAD_LOG._store.values()].map((v) => JSON.parse(v));
  assert.equal(entries[0].outcome, "delivery_failed");
  assert.equal(entries[0].lead.email, "test@example.com");
});

test("network error/timeout becomes 502, not a fake success", async () => {
  globalThis.fetch = async () => {
    throw new Error("connect timeout");
  };
  const env = makeEnv();
  const res = await worker.fetch(post(validLead), env);
  assert.equal(res.status, 502);
  assert.equal((await res.json()).ok, false);
});

test("sixth submission from one IP inside the window is rate limited", async () => {
  stubUpstream(200);
  const env = makeEnv();
  for (let i = 0; i < 5; i++) {
    const ok = await worker.fetch(post(validLead), env);
    assert.equal(ok.status, 200);
  }
  const res = await worker.fetch(post(validLead), env);
  assert.equal(res.status, 429);
  assert.equal(upstreamCalls.length, 5);
});

test("mock mode accepts without forwarding", async () => {
  stubUpstream();
  const env = makeEnv({ MOCK_MODE: "1" });
  const res = await worker.fetch(post(validLead), env);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).mock, true);
  assert.equal(upstreamCalls.length, 0);
});

test("misconfigured worker (no webhook) fails loudly", async () => {
  const env = makeEnv({ LEAD_WEBHOOK: undefined });
  const res = await worker.fetch(post(validLead), env);
  assert.equal(res.status, 500);
});
