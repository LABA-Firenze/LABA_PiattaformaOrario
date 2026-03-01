/**
 * Formatta i nomi dei professori: "Nome1 / Nome2" -> "Prof. Nome1" + "e Nome2" su due righe
 */
export function formatProfessorLines(professor: string): string[] {
  if (!professor?.trim()) return []
  const parts = professor.split(/\s*\/\s*/).map((p) => p.trim()).filter(Boolean)
  if (parts.length === 0) return []
  if (parts.length === 1) return [`Prof. ${parts[0]}`]
  return [`Prof. ${parts[0]}`, `e ${parts.slice(1).join(', ')}`]
}
