/**
 * Cloudflare Worker — comentários do redesign Comida di Buteco.
 *
 * Endpoints:
 *   GET  /api/comments?pageId=X&before=<id>&limit=50
 *        Lista comentários aprovados de uma página, ordem decrescente.
 *   POST /api/comments
 *        Cria comentário. Form fields:
 *          pageId, pageUrl, pageTitle, nickname, message,
 *          cf-turnstile-response (token).
 *
 * Camadas anti-spam:
 *   - Turnstile siteverify (server-side).
 *   - Honeypot opcional via campo "website".
 *   - Rate limit: 1 comentário / minuto / IP / página.
 *   - Validações de tamanho.
 *
 * Bindings esperados:
 *   - DB                        — D1 database "cdb-comments"
 *   - TURNSTILE_SECRET (secret) — secret key do widget Turnstile
 *   - APP_SALT (secret)         — salt para hash do IP
 *   - ALLOWED_ORIGINS (var)     — CSV, ex: "https://phbruce.github.io"
 */

interface Env {
  DB: D1Database;
  TURNSTILE_SECRET: string;
  APP_SALT: string;
  ALLOWED_ORIGINS: string;
}

const MAX_NICK = 50;
const MAX_MSG = 1000;
const MIN_MSG = 1;
const RATE_LIMIT_MS = 60_000;
const PAGE_LIMIT_DEFAULT = 50;
const PAGE_LIMIT_MAX = 100;

interface CommentRow {
  id: number;
  page_id: string;
  nickname: string;
  message: string;
  created_at: number;
}

function corsHeaders(origin: string, allowed: string[]): HeadersInit {
  const ok = allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : "null",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    Vary: "Origin",
  };
}

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function sanitize(s: string, max: number): string {
  return s.replace(/[\x00-\x1F\x7F]/g, "").slice(0, max).trim();
}

function jsonResponse(data: unknown, status: number, cors: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json; charset=utf-8" },
  });
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

async function listComments(env: Env, pageId: string, before: number | null, limit: number): Promise<CommentRow[]> {
  const lim = Math.min(Math.max(1, limit), PAGE_LIMIT_MAX);
  let stmt;
  if (before !== null) {
    stmt = env.DB
      .prepare(
        "SELECT id, page_id, nickname, message, created_at FROM comments " +
        "WHERE page_id = ? AND status = 'approved' AND id < ? " +
        "ORDER BY created_at DESC LIMIT ?",
      )
      .bind(pageId, before, lim);
  } else {
    stmt = env.DB
      .prepare(
        "SELECT id, page_id, nickname, message, created_at FROM comments " +
        "WHERE page_id = ? AND status = 'approved' " +
        "ORDER BY created_at DESC LIMIT ?",
      )
      .bind(pageId, lim);
  }
  const { results } = await stmt.all<CommentRow>();
  return results ?? [];
}

async function isRateLimited(env: Env, ipHash: string, pageId: string): Promise<boolean> {
  const cutoff = Date.now() - RATE_LIMIT_MS;
  const { results } = await env.DB
    .prepare(
      "SELECT id FROM comments WHERE ip_hash = ? AND page_id = ? AND created_at > ? LIMIT 1",
    )
    .bind(ipHash, pageId, cutoff)
    .all();
  return (results?.length ?? 0) > 0;
}

async function handleGet(url: URL, env: Env, cors: HeadersInit): Promise<Response> {
  const pageId = sanitize(url.searchParams.get("pageId") ?? "", 200);
  if (!pageId) return jsonResponse({ error: "pageId required" }, 400, cors);
  const beforeRaw = url.searchParams.get("before");
  const before = beforeRaw ? Number(beforeRaw) : null;
  const limit = Number(url.searchParams.get("limit") ?? PAGE_LIMIT_DEFAULT);
  const items = await listComments(env, pageId, Number.isFinite(before as number) ? (before as number) : null, limit);
  return jsonResponse({ items }, 200, cors);
}

async function handlePost(request: Request, env: Env, cors: HeadersInit): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ error: "bad request" }, 400, cors);
  }

  // honeypot
  if (String(form.get("website") ?? "").trim()) {
    return jsonResponse({ ok: true }, 200, cors); // silently swallow
  }

  const pageId = sanitize(String(form.get("pageId") ?? ""), 200);
  const pageUrl = sanitize(String(form.get("pageUrl") ?? ""), 500);
  const pageTitle = sanitize(String(form.get("pageTitle") ?? ""), 200);
  const nickname = sanitize(String(form.get("nickname") ?? ""), MAX_NICK);
  const message = sanitize(String(form.get("message") ?? ""), MAX_MSG);
  const turnstileToken = String(form.get("cf-turnstile-response") ?? "");

  if (!pageId || !nickname || !message || message.length < MIN_MSG) {
    return jsonResponse({ error: "validation" }, 400, cors);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const ipHash = await sha256Hex(ip + ":" + (env.APP_SALT ?? ""));

  // Turnstile: se SECRET não está configurado, libera (proteção fica só
  // com rate limit + honeypot — útil pra deploy inicial sem Turnstile).
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET, ip);
    if (!ok) {
      return jsonResponse({ error: "captcha" }, 403, cors);
    }
  }

  if (await isRateLimited(env, ipHash, pageId)) {
    return jsonResponse({ error: "rate" }, 429, cors);
  }

  const now = Date.now();
  const result = await env.DB
    .prepare(
      "INSERT INTO comments (page_id, page_url, page_title, nickname, message, created_at, ip_hash, status) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?, 'approved') RETURNING id, page_id, nickname, message, created_at",
    )
    .bind(pageId, pageUrl || null, pageTitle || null, nickname, message, now, ipHash)
    .first<CommentRow>();

  if (!result) {
    return jsonResponse({ error: "insert" }, 500, cors);
  }
  return jsonResponse({ item: result }, 200, cors);
}

async function handle(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const cors = corsHeaders(origin, allowed);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  const url = new URL(request.url);
  if (!url.pathname.startsWith("/api/comments")) {
    return jsonResponse({ error: "not found" }, 404, cors);
  }
  if (request.method === "GET") return handleGet(url, env, cors);
  if (request.method === "POST") return handlePost(request, env, cors);
  return jsonResponse({ error: "method not allowed" }, 405, cors);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handle(request, env).catch((err) => {
      console.error(err);
      return new Response("Internal error", { status: 500 });
    });
  },
};
