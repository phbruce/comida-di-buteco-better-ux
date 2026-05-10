-- D1 schema para comentários (ADR-0015 + ADR-0017).
-- Aplicar inicial com: wrangler d1 execute cdb-comments --file=worker/comments.sql
-- Migração rating (ADR-0017) — rodar UMA vez se a tabela já existia:
--   wrangler d1 execute cdb-comments --remote \
--     --command "ALTER TABLE comments ADD COLUMN rating INTEGER"

CREATE TABLE IF NOT EXISTS comments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id     TEXT    NOT NULL,
  page_url    TEXT,
  page_title  TEXT,
  nickname    TEXT    NOT NULL,
  message     TEXT    NOT NULL,
  rating      INTEGER,                       -- ADR-0017: NULL ou 1..5
  created_at  INTEGER NOT NULL,              -- ms desde epoch
  ip_hash     TEXT,                          -- sha-256(IP + APP_SALT), nunca exibido
  status      TEXT    NOT NULL DEFAULT 'approved'
                       CHECK (status IN ('approved','hidden','spam','pending'))
);

CREATE INDEX IF NOT EXISTS idx_comments_page
  ON comments(page_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comments_rate
  ON comments(ip_hash, created_at);
