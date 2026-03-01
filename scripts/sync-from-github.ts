/**
 * Script CLI per sincronizzare gli orari da LABA_Orari (GitHub Pages) a Supabase.
 * Uso: npx tsx scripts/sync-from-github.ts
 *
 * Richiede .env.local con NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
 * (o SUPABASE_SERVICE_ROLE_KEY per operazioni con privilegi elevati).
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Configura .env.local con NEXT_PUBLIC_SUPABASE_URL e (SUPABASE_SERVICE_ROLE_KEY o NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  process.exit(1)
}

async function main() {
  const { createClient } = await import('@supabase/supabase-js')
  const { syncFromGitHub } = await import('../lib/syncFromGitHub')

  const supabase = createClient(supabaseUrl, supabaseKey)
  console.log('🚀 Avvio sync da GitHub Pages...\n')

  const results = await syncFromGitHub(supabase)

  const total = results.reduce((a, r) => ({ imported: a.imported + r.imported, errors: a.errors + r.errors }), { imported: 0, errors: 0 })
  console.log('\n✨ Sync completato!')
  console.log(`   Importate: ${total.imported}`)
  console.log(`   Errori: ${total.errors}`)
  results.forEach((r) => {
    if (r.imported > 0 || r.errors > 0) {
      console.log(`   - ${r.corso}: ${r.imported} ok, ${r.errors} errori`)
    }
  })
}

main().catch((e) => {
  console.error('❌', e)
  process.exit(1)
})
