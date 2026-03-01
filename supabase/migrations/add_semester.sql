-- Aggiungi colonna semester per filtrare 1° vs 2° semestre
-- 1 = primo semestre (set-gen), 2 = secondo semestre (feb-giu)
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS semester INTEGER DEFAULT 2;
UPDATE lessons SET semester = 2 WHERE semester IS NULL;
CREATE INDEX IF NOT EXISTS idx_lessons_semester ON lessons(semester);
