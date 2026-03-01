# Sync automatico da GitHub

Quando modifichi i JSON degli orari nel repo **LABA_Orari** su GitHub, la piattaforma può sincronizzarsi automaticamente senza dover cliccare "Sync" da Admin.

## Configurazione

### 1. Genera un secret per il webhook

```bash
openssl rand -hex 32
```

Copia il risultato (es. `a1b2c3d4e5f6...`).

### 2. Aggiungi la variabile su Railway

1. Vai su Railway → progetto Piattaforma Orario
2. **Variables** → Add Variable
3. Nome: `GITHUB_WEBHOOK_SECRET`
4. Valore: incolla il secret generato
5. Salva (Railway farà un redeploy)

### 3. Configura il webhook su GitHub

1. Apri il repo **LABA_Orari** su GitHub
2. **Settings** → **Webhooks** → **Add webhook**
3. Compila:
   - **Payload URL**: `https://orario.laba.biz/api/webhooks/github`
   - **Content type**: `application/json`
   - **Secret**: incolla lo stesso secret usato su Railway
   - **Which events?**: "Just the push event"
4. **Add webhook**

### 4. Verifica

Dopo aver creato il webhook, GitHub invia un "ping" per testare. Controlla che compaia un segno verde (✓) accanto al webhook. In caso di errore, controlla i "Recent Deliveries" per vedere la risposta del server.

## Comportamento

- **Nessun doppione**: il sync elimina le lezioni esistenti per corso+anno e reinserisce i dati da GitHub. Non si creano duplicati.
- **Solo push su main**: il sync parte solo quando fai push sul branch `main` (o `master`) di LABA_Orari.
- **Risposta immediata**: la piattaforma risponde subito a GitHub (entro pochi secondi) e esegue il sync in background.
