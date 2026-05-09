-- D1 schema para comentários (ADR-0015)
-- Aplicar com: wrangler d1 execute cdb-comments --file=worker/comments.sql

CREATE TABLE IF NOT EXISTS comments (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id     TEXT    NOT NULL,
  page_url    TEXT,
  page_title  TEXT,
  nickname    TEXT    NOT NULL,
  message     TEXT    NOT NULL,
  created_at  INTEGER NOT NULL,            -- ms desde epoch
  ip_hash     TEXT,                        -- sha-256(IP + APP_SALT), nunca exibido
  status      TEXT    NOT NULL DEFAULT 'approved'
                       CHECK (status IN ('approved','hidden','spam','pending'))
);

CREATE INDEX IF NOT EXISTS idx_comments_page
  ON comments(page_id, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_comments_rate
  ON comments(ip_hash, created_at);
