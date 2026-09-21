-- Projects table for CMS
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge TEXT,
  approach TEXT,
  scope TEXT DEFAULT '[]',
  result TEXT,
  cover_image TEXT,
  images TEXT DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  published INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Index for filtering by category
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Index for filtering by published status
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
