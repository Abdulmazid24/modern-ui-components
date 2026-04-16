-- ═══════════════════════════════════════════════════════════════
-- Modern UI Vault — Supabase Database Schema
-- Enterprise Grade (2026)
-- ═══════════════════════════════════════════════════════════════
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor → New Query → Paste & Run
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 2. Enum Types ──────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE license_tier AS ENUM ('free', 'pro', 'team', 'enterprise');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE license_status AS ENUM ('active', 'expired', 'revoked', 'refunded');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE webhook_event_type AS ENUM (
    'order_created', 'order_refunded',
    'subscription_created', 'subscription_updated', 'subscription_cancelled',
    'license_key_created'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ─── 3. Tables ──────────────────────────────────────────────────

-- 3a. License Keys
CREATE TABLE IF NOT EXISTS vault_licenses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_key     TEXT NOT NULL UNIQUE,
  user_email      TEXT NOT NULL,
  user_name       TEXT DEFAULT '',
  tier            license_tier NOT NULL DEFAULT 'pro',
  status          license_status NOT NULL DEFAULT 'active',
  
  -- LemonSqueezy metadata
  ls_order_id       TEXT,
  ls_product_id     TEXT,
  ls_variant_id     TEXT,
  ls_customer_id    TEXT,
  
  -- Activation tracking
  activation_limit  INTEGER NOT NULL DEFAULT 3,
  activation_count  INTEGER NOT NULL DEFAULT 0,
  
  -- Timestamps
  purchased_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at        TIMESTAMPTZ, -- NULL = lifetime
  last_verified_at  TIMESTAMPTZ DEFAULT NOW(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3b. Download Analytics
CREATE TABLE IF NOT EXISTS vault_downloads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  component_name  TEXT NOT NULL,
  component_category TEXT,
  dialect         TEXT DEFAULT 'tsx',
  license_key     TEXT, -- NULL for free components
  user_ip         TEXT,
  user_agent      TEXT,
  downloaded_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3c. Webhook Event Log (for debugging & auditing)
CREATE TABLE IF NOT EXISTS vault_webhook_events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name      TEXT NOT NULL,
  event_type      webhook_event_type,
  payload         JSONB NOT NULL DEFAULT '{}',
  ls_order_id     TEXT,
  ls_customer_email TEXT,
  processed       BOOLEAN NOT NULL DEFAULT FALSE,
  error_message   TEXT,
  received_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3d. Page Views / Analytics (optional, lightweight)
CREATE TABLE IF NOT EXISTS vault_analytics (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event           TEXT NOT NULL, -- 'page_view', 'component_view', 'cli_init', etc.
  path            TEXT,
  component_name  TEXT,
  metadata        JSONB DEFAULT '{}',
  user_ip         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── 4. Indexes ─────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_licenses_key ON vault_licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_licenses_email ON vault_licenses(user_email);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON vault_licenses(status);
CREATE INDEX IF NOT EXISTS idx_licenses_ls_order ON vault_licenses(ls_order_id);

CREATE INDEX IF NOT EXISTS idx_downloads_component ON vault_downloads(component_name);
CREATE INDEX IF NOT EXISTS idx_downloads_date ON vault_downloads(downloaded_at);

CREATE INDEX IF NOT EXISTS idx_webhook_events_order ON vault_webhook_events(ls_order_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_received ON vault_webhook_events(received_at);

CREATE INDEX IF NOT EXISTS idx_analytics_event ON vault_analytics(event);
CREATE INDEX IF NOT EXISTS idx_analytics_component ON vault_analytics(component_name);

-- ─── 5. Row Level Security ──────────────────────────────────────

ALTER TABLE vault_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_analytics ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (API routes use service role key)
-- We explicitly bind this to the service_role so anon keys have NO access.

DROP POLICY IF EXISTS "Service role full access to vault_licenses" ON vault_licenses;
CREATE POLICY "Service role full access to vault_licenses"
  ON vault_licenses FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access to vault_downloads" ON vault_downloads;
CREATE POLICY "Service role full access to vault_downloads"
  ON vault_downloads FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access to vault_webhook_events" ON vault_webhook_events;
CREATE POLICY "Service role full access to vault_webhook_events"
  ON vault_webhook_events FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access to vault_analytics" ON vault_analytics;
CREATE POLICY "Service role full access to vault_analytics"
  ON vault_analytics FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- ─── 6. Updated_at Trigger ──────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_licenses_updated ON vault_licenses;
CREATE TRIGGER trigger_licenses_updated
  BEFORE UPDATE ON vault_licenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ─── 7. Helper Functions ────────────────────────────────────────

-- Check if a license is valid (not expired, not revoked, under activation limit)
CREATE OR REPLACE FUNCTION is_license_valid(key TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  lic RECORD;
BEGIN
  SELECT * INTO lic FROM vault_licenses WHERE license_key = key AND status = 'active';
  IF NOT FOUND THEN RETURN FALSE; END IF;
  IF lic.expires_at IS NOT NULL AND lic.expires_at < NOW() THEN RETURN FALSE; END IF;
  IF lic.activation_count >= lic.activation_limit THEN RETURN FALSE; END IF;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Get download stats for a component
CREATE OR REPLACE FUNCTION get_component_stats(comp_name TEXT)
RETURNS TABLE(total_downloads BIGINT, last_7_days BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT AS total_downloads,
    COUNT(*) FILTER (WHERE downloaded_at > NOW() - INTERVAL '7 days')::BIGINT AS last_7_days
  FROM vault_downloads
  WHERE component_name = comp_name;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════════
-- DONE! Your database schema is ready.
-- ═══════════════════════════════════════════════════════════════
