-- 기존 PostgreSQL 운영 DB에 적용하는 애드센스 준비 마이그레이션

ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS level VARCHAR(20) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS upgraded_at TIMESTAMPTZ DEFAULT NULL;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  IF ROW(
    NEW.title, NEW.content, NEW.slug, NEW.category, NEW.level,
    NEW.thumbnail_url, NEW.meta_description, NEW.keywords,
    NEW.status, NEW.published_at, NEW.upgraded_at
  ) IS DISTINCT FROM ROW(
    OLD.title, OLD.content, OLD.slug, OLD.category, OLD.level,
    OLD.thumbnail_url, OLD.meta_description, OLD.keywords,
    OLD.status, OLD.published_at, OLD.upgraded_at
  ) THEN
    NEW.updated_at = NOW();
  ELSE
    NEW.updated_at = OLD.updated_at;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE comments
  ALTER COLUMN is_approved SET DEFAULT FALSE;
