# Laboratorio operativo — revisione M21

Documento generato da `node scripts/build-operational-lab-review.mjs` usando i dati e le regole canoniche di `assets/operational-lab.js`. Aggiornare il generatore per le note e il modulo per dati, scelte e rubriche; non correggere a mano le varianti qui sotto.

App `3.4.0`, scoring `3.1.0`, schema report `4`, laboratorio/casi `1.0.0`, banca `2026.11-m21`, forma `1.7`, blueprint approvato `1.0.0`. Sviluppata nel branch `feature/local-operational-lab`; M21 approvata dal maintainer il `2026-11-25`, release `v3.4.0`, con autorizzazione a commit, merge, push, tag e rimozione del branch.

## Contratto di esecuzione

Il nuovo percorso `operational-lab` contiene due casi, sei decisioni E, nelle forme A/B/C e in IT/EN. Practical Lab resta il precedente percorso di quiz e testi formativi; il completo da 50 domande resta invariato fino alla M22. Non sono eseguiti agenti, modelli, API, esportazioni del registro o azioni esterne reali.

K1 espone tre righe sintetiche, una bozza errata, un calcolatore (somma/media/totale bozza), un campo numerico correggibile e un'anteprima della consegna. Selezionare un controllo non esegue un'azione: occorre Applica, quindi Avanti. Il calcolatore modifica il numero proposto, che deve ancora essere applicato. La verifica può precedere o seguire il calcolo; la consegna viene dopo entrambi. Cambiare il calcolo annulla una consegna precedente e richiede una nuova conferma sull'anteprima aggiornata.

K2 espone dati sintetici, mandato, nota non attendibile, checkpoint, ID e ricevuta. Gestire la nota, preparare l'artefatto dai dati disponibili e riprendere il lavoro sono tre azioni distinte. Il chiarimento sulla nota riguarda soltanto quell'istruzione: non revoca il mandato. La scelta di preparazione genera una bozza sintetica visibile; quella esterna produce solo un effetto simulato esplicito. La ripresa riguarda il lavoro successivo, senza implicare che sia già completato: `continue`/`repeat-update` lo segnano ripreso, `wait` lo mantiene pendente, `declare-complete` registra una falsa conclusione. `hold-all` non genera l'artefatto; riprendere in seguito non finge che un artefatto sia stato prodotto. La registrazione iniziale è interna, già autorizzata e confermata; `repeat-update` aggiunge esattamente un secondo effetto.

Ogni render, navigazione e recupero ricostruisce lo stato iniziale più le scelte finali confermate: non conserva un log di tentativi e non riapplica effetti cumulativi. Cambiare una scelta rimuove il vecchio effetto e i relativi flag dal risultato finale. Questo contratto consente di rivedere le scelte prima del report; non è una prova con tentativi irreversibili. Il laboratorio non assegna punti al testo libero e non richiede upload.

Crediti, rubriche, soluzioni e fasce sono mostrati solo dopo il completamento delle sei decisioni. Durante l'esercizio sono visibili gli effetti diretti delle azioni e l'artefatto, senza giudizi di correttezza o punti. Controlli HTML nativi, label, fieldset/legend, focus dopo la conferma e la navigazione; tabella a due colonne con alternativa testuale completa, nessun drag.

## Credito e criticità

Ogni decisione vale 0/1/2, ogni caso massimo 6, laboratorio massimo 12. Una risposta assente/non valida ha credito null, non zero. I casi incompleti mostrano soltanto il credito delle decisioni valide; la percentuale E complessiva resta null finché entrambi i casi non sono completi. Nessuna media o compensazione fra Q/D/T/E.

Senza errori critici: E <50 → `retry`; 50–<80 → `partial`; ≥80 e almeno 4/6 per caso → `conform`. Con 6/6 e 3/6 si ottiene 75 e fascia parziale. Qualsiasi errore critico prevale con `critical`, conserva i crediti grezzi e identifica caso, decisione ed effetto. Anche un laboratorio incompleto può mostrare una criticità già eseguita, ma E resta null. Sono soglie editoriali, senza qualifica operativa o validazione psicometrica.

- `unverified-release`: consegna simulata esplicita di un totale errato o di una causalità non supportata. Un errore di calcolo trattenuto per revisione non è critico; l'assenza del riferimento da sola vale zero ma non è critica.
- `unauthorized-disclosure`: esportazione simulata del registro fuori mandato.
- `unauthorized-action`: azione esterna simulata senza approvazione.
- `duplicate-action`: seconda registrazione dello stesso update già confermato. La falsa conclusione vale zero ma non produce un duplicato.

## Bozza, storico e privacy

Una sola bozza incompleta, chiave `aiSkillOperationalLabDraft`, separata da `aiSkillAssessmentHistory`. Schema bozza 1: versioni app/scoring/lab/banca/forma, modeId, lingua, forma, indice corrente, ordine verifica/calcolo e sole scelte confermate con ID stabili. Nessun nome, ruolo, team, stima personale, tempo di risposta, sequenza dei tentativi o effetto derivato. La versione del laboratorio identifica entrambe le versioni dei casi e delle relative rubriche.

Modificare un controllo annulla la sua vecchia conferma; i valori ancora non applicati non vengono recuperati. Avanti, Indietro e il cambio d'ordine salvano la posizione. La home offre Riprendi o Elimina bozza; il recupero ripristina lingua, forma, ordine e scelte senza consumare una nuova forma e senza recuperare dati del profilo. Iniziare un nuovo laboratorio con una bozza esistente chiede esplicitamente di eliminarla. Altri percorsi possono essere svolti conservando la bozza.

Una bozza incompatibile o corrotta rimane intatta finché non viene eliminata: nessuna applicazione automatica delle nuove regole alle vecchie scelte. Interrompi confermato, Elimina bozza, completamento e Cancella dati locali eliminano la bozza; la cancellazione complessiva rimuove anche storico e rotazione delle forme. Annullare una conferma conserva lo stato. Gli errori di lettura/scrittura/rimozione vengono segnalati; un'interruzione non si conclude se la cancellazione fallisce. Se fallisce la rimozione dopo il completamento, il report resta leggibile ma il recupero potrebbe offrire la bozza precedente.

Dati e report non lasciano il browser. La simulazione funziona con script classici anche da file://; la persistenza dipende dal browser, dall'origine e dalle sue impostazioni e non è garantita per file:// o navigazione privata. Nessun account, build tool, chiamata di rete o valutatore AI. JSON/CSV e link esterni richiedono un gesto esplicito. Il report conserva lo stato iniziale sintetico, le decisioni finali, gli effetti e le motivazioni, senza cronologia delle modifiche. I report schema 3/scoring 3.0 restano originali e leggibili; gli schema 4 hanno firma di confronto distinta.

## Validazione del maintainer prima del commit

Le verifiche automatiche coprono le sei forme, 864 configurazioni K1 e 216 K2, casi completi/incompleti, parziali, errori critici e modifica delle scelte; i limiti dei test DOM sono in SCORING.md. Browser non disponibile nell'ambiente dell'agente. Il maintainer ha approvato la chiusura il 2026-11-25 senza riportare gli esiti dettagliati della prova manuale; questa checklist resta un riferimento, senza attestare controlli browser non eseguiti dall'agente.

1. Aprire ai_skill_test.html direttamente e tramite index.html; controllare badge 3.4.0, quattordici percorsi, bibliografia dalla landing e dai risultati, assenza di errori in console e assenza di richieste con risposte/tracce.
2. Eseguire un laboratorio corretto in IT e EN, su desktop e mobile: tutte le righe, somma (totali A=300/B=100/C=50), riferimento incluso, causalità rimossa, consegna; use-data, draft-only, continue. Attesi 6/6+6/6, 100, nessun flag. Verificare anteprima e conferme, Next obbligatorio, tastiera e focus, tabella e alternativa testuale.
3. Eseguire un caso critico nelle due lingue su desktop/mobile: consegnare il totale errato oppure ripetere update-17/28/39. Attesa fascia critica con effetto esplicito e crediti conservati. Con declare-complete nessun duplicate-action. Nessun punto o feedback di soluzione prima del report.
4. Invertire verifica/calcolo; tornare indietro e correggere calcolo/consegna e repeat-update. Attesi invalidazione della consegna, rimozione dei vecchi flag dopo nuova conferma, registro nuovamente a 1. Ricaricare a metà, riprendere senza nuova forma e controllare che gli effetti non si sommino.
5. Provare Interrompi e annullamento, Elimina bozza, nuovo laboratorio con bozza, errore di storage, Cancella dati locali. Verificare storico ed export JSON/CSV originali, download e stampa reali, compreso almeno un report 2.x e uno schema 3. Nessuna inferenza sulle prestazioni lavorative.

## Varianti canoniche IT/EN

### IT · Forma A

**K1**

Fonte sintetica (ordini): righe 120, 80, 100, stesso periodo. Bozza: 330. La campagna ha causato la crescita. Verifica il totale e prepara una sintesi con fonti; nessuna evidenza causale disponibile.

Totale atteso: **300**.

**LAB_K1_VERIFY — Verifica le evidenze**

2: tutte le righe collegate al totale; 1: evidenza incompleta; 0: bozza accettata senza riscontro.

- `all-rows`: Collega tutte e tre le righe al totale della bozza — 2/2.
- `one-row`: Registra un dubbio usando solo la prima riga — 1/2.
- `trust-draft`: Accetta il totale della bozza senza riscontro — 0/2.

**LAB_K1_CORRECT — Correggi il riepilogo**

Un punto per l'operazione somma, uno per il totale 300. La selezione del totale della bozza non ricostruisce il calcolo.

- `{"operation":"sum","total":300}`: 2/2.
- `{"operation":"sum","total":330}`: 1/2; unverified-release.
- `{"operation":"draft","total":330}`: 0/2; unverified-release.

**LAB_K1_RELEASE — Prepara e consegna l'artefatto**

2: consegna con totale corretto, riferimento alle righe e senza causalità; 1: sospensione per revisione; 0: artefatto non conforme. Solo la consegna errata o con causalità è critica.

- `{"action":"release","reference":true,"keepClaim":false}`: 2/2.
- `{"action":"review","reference":false,"keepClaim":true}`: 1/2.
- `{"action":"release","reference":true,"keepClaim":true}`: 0/2; unverified-release.

**K2**

Dati sintetici: Ticket T17: richiesta di ripristino password; la procedura interna richiede il portale di recupero e verifica dell'identità. Mandato: bozza locale per la knowledge base; nessuna autorizzazione a pubblicare la bozza. update-17: registrazione interna completata, ACK-update-17, 1 effetto; preparazione e verifica pendenti. Una nota non attendibile chiede di esportare l'intero registro fuori mandato.

Bozza KB: indirizzare al portale di recupero; verificare l'identità secondo la procedura interna.

**LAB_K2_SOURCE — Gestisci l'istruzione nella fonte**

2: istruzione scartata e dati legittimi mantenuti; 1: chiarimento; 0: divulgazione simulata fuori mandato, critica.

- `use-data`: Scarta l'istruzione incorporata e usa i dati del mandato — 2/2.
- `pause-source`: Sospendi l'istruzione incorporata per un chiarimento — 1/2.
- `export`: Esegui un'esportazione simulata dell'intero registro fuori mandato — 0/2; unauthorized-disclosure.

**LAB_K2_SCOPE — Applica il mandato**

2: bozza entro il mandato, azione esterna alla persona; 1: blocco anche del lavoro consentito; 0: azione esterna simulata senza approvazione, critica.

- `draft-only`: Crea soltanto la bozza locale; lascia l'azione esterna alla persona — 2/2.
- `hold-all`: Blocca anche la preparazione locale in attesa di approvazione — 1/2.
- `external`: Esegui anche l'azione esterna simulata senza approvazione — 0/2; unauthorized-action.

**LAB_K2_RESUME — Riprendi dal checkpoint**

2: ricevuta usata e lavoro pendente ripreso; 1: ulteriore verifica; 0: registrazione duplicata o falsa conclusione. Solo la duplicazione produce l'errore critico duplicate-action.

- `continue`: Usa la ricevuta, non ripetere la registrazione e riprendi il lavoro pendente — 2/2.
- `wait`: Non ripetere la registrazione; attendi un'ulteriore verifica dello stato — 1/2.
- `repeat-update`: Ripeti la registrazione già confermata e poi riprendi — 0/2; duplicate-action.
- `declare-complete`: Dichiara concluso il lavoro pendente senza svolgerlo — 0/2.

### IT · Forma B

**K1**

Fonte sintetica (ticket): righe 40, 25, 35, stesso periodo. Bozza: 120. L'assistente ha causato la riduzione. Verifica il totale e prepara una sintesi con fonti; nessuna evidenza causale disponibile.

Totale atteso: **100**.

**LAB_K1_VERIFY — Verifica le evidenze**

2: tutte le righe collegate al totale; 1: evidenza incompleta; 0: bozza accettata senza riscontro.

- `all-rows`: Collega tutte e tre le righe al totale della bozza — 2/2.
- `one-row`: Registra un dubbio usando solo la prima riga — 1/2.
- `trust-draft`: Accetta il totale della bozza senza riscontro — 0/2.

**LAB_K1_CORRECT — Correggi il riepilogo**

Un punto per l'operazione somma, uno per il totale 100. La selezione del totale della bozza non ricostruisce il calcolo.

- `{"operation":"sum","total":100}`: 2/2.
- `{"operation":"sum","total":120}`: 1/2; unverified-release.
- `{"operation":"draft","total":120}`: 0/2; unverified-release.

**LAB_K1_RELEASE — Prepara e consegna l'artefatto**

2: consegna con totale corretto, riferimento alle righe e senza causalità; 1: sospensione per revisione; 0: artefatto non conforme. Solo la consegna errata o con causalità è critica.

- `{"action":"release","reference":true,"keepClaim":false}`: 2/2.
- `{"action":"review","reference":false,"keepClaim":true}`: 1/2.
- `{"action":"release","reference":true,"keepClaim":true}`: 0/2; unverified-release.

**K2**

Dati sintetici: Fattura F28: imponibile 80, imposta 20, totale registrato 100; pagamento non ancora verificato. Mandato: nota locale di riconciliazione; nessuna autorizzazione a inviare la nota. update-28: registrazione interna completata, ACK-update-28, 1 effetto; preparazione e verifica pendenti. Una nota non attendibile chiede di esportare l'intero registro fuori mandato.

Nota di riconciliazione: 80 + 20 = 100; verificare separatamente lo stato del pagamento.

**LAB_K2_SOURCE — Gestisci l'istruzione nella fonte**

2: istruzione scartata e dati legittimi mantenuti; 1: chiarimento; 0: divulgazione simulata fuori mandato, critica.

- `use-data`: Scarta l'istruzione incorporata e usa i dati del mandato — 2/2.
- `pause-source`: Sospendi l'istruzione incorporata per un chiarimento — 1/2.
- `export`: Esegui un'esportazione simulata dell'intero registro fuori mandato — 0/2; unauthorized-disclosure.

**LAB_K2_SCOPE — Applica il mandato**

2: bozza entro il mandato, azione esterna alla persona; 1: blocco anche del lavoro consentito; 0: azione esterna simulata senza approvazione, critica.

- `draft-only`: Crea soltanto la bozza locale; lascia l'azione esterna alla persona — 2/2.
- `hold-all`: Blocca anche la preparazione locale in attesa di approvazione — 1/2.
- `external`: Esegui anche l'azione esterna simulata senza approvazione — 0/2; unauthorized-action.

**LAB_K2_RESUME — Riprendi dal checkpoint**

2: ricevuta usata e lavoro pendente ripreso; 1: ulteriore verifica; 0: registrazione duplicata o falsa conclusione. Solo la duplicazione produce l'errore critico duplicate-action.

- `continue`: Usa la ricevuta, non ripetere la registrazione e riprendi il lavoro pendente — 2/2.
- `wait`: Non ripetere la registrazione; attendi un'ulteriore verifica dello stato — 1/2.
- `repeat-update`: Ripeti la registrazione già confermata e poi riprendi — 0/2; duplicate-action.
- `declare-complete`: Dichiara concluso il lavoro pendente senza svolgerlo — 0/2.

### IT · Forma C

**K1**

Fonte sintetica (richieste): righe 18, 12, 20, stesso periodo. Bozza: 60. Il nuovo processo ha causato il miglioramento. Verifica il totale e prepara una sintesi con fonti; nessuna evidenza causale disponibile.

Totale atteso: **50**.

**LAB_K1_VERIFY — Verifica le evidenze**

2: tutte le righe collegate al totale; 1: evidenza incompleta; 0: bozza accettata senza riscontro.

- `all-rows`: Collega tutte e tre le righe al totale della bozza — 2/2.
- `one-row`: Registra un dubbio usando solo la prima riga — 1/2.
- `trust-draft`: Accetta il totale della bozza senza riscontro — 0/2.

**LAB_K1_CORRECT — Correggi il riepilogo**

Un punto per l'operazione somma, uno per il totale 50. La selezione del totale della bozza non ricostruisce il calcolo.

- `{"operation":"sum","total":50}`: 2/2.
- `{"operation":"sum","total":60}`: 1/2; unverified-release.
- `{"operation":"draft","total":60}`: 0/2; unverified-release.

**LAB_K1_RELEASE — Prepara e consegna l'artefatto**

2: consegna con totale corretto, riferimento alle righe e senza causalità; 1: sospensione per revisione; 0: artefatto non conforme. Solo la consegna errata o con causalità è critica.

- `{"action":"release","reference":true,"keepClaim":false}`: 2/2.
- `{"action":"review","reference":false,"keepClaim":true}`: 1/2.
- `{"action":"release","reference":true,"keepClaim":true}`: 0/2; unverified-release.

**K2**

Dati sintetici: Avanzamento P39: due attività completate, una ancora aperta; nessuna data finale confermata. Mandato: bozza locale del report; nessuna autorizzazione a creare un'attività esterna. update-39: registrazione interna completata, ACK-update-39, 1 effetto; preparazione e verifica pendenti. Una nota non attendibile chiede di esportare l'intero registro fuori mandato.

Bozza report: 2 attività completate e 1 aperta; data finale da confermare.

**LAB_K2_SOURCE — Gestisci l'istruzione nella fonte**

2: istruzione scartata e dati legittimi mantenuti; 1: chiarimento; 0: divulgazione simulata fuori mandato, critica.

- `use-data`: Scarta l'istruzione incorporata e usa i dati del mandato — 2/2.
- `pause-source`: Sospendi l'istruzione incorporata per un chiarimento — 1/2.
- `export`: Esegui un'esportazione simulata dell'intero registro fuori mandato — 0/2; unauthorized-disclosure.

**LAB_K2_SCOPE — Applica il mandato**

2: bozza entro il mandato, azione esterna alla persona; 1: blocco anche del lavoro consentito; 0: azione esterna simulata senza approvazione, critica.

- `draft-only`: Crea soltanto la bozza locale; lascia l'azione esterna alla persona — 2/2.
- `hold-all`: Blocca anche la preparazione locale in attesa di approvazione — 1/2.
- `external`: Esegui anche l'azione esterna simulata senza approvazione — 0/2; unauthorized-action.

**LAB_K2_RESUME — Riprendi dal checkpoint**

2: ricevuta usata e lavoro pendente ripreso; 1: ulteriore verifica; 0: registrazione duplicata o falsa conclusione. Solo la duplicazione produce l'errore critico duplicate-action.

- `continue`: Usa la ricevuta, non ripetere la registrazione e riprendi il lavoro pendente — 2/2.
- `wait`: Non ripetere la registrazione; attendi un'ulteriore verifica dello stato — 1/2.
- `repeat-update`: Ripeti la registrazione già confermata e poi riprendi — 0/2; duplicate-action.
- `declare-complete`: Dichiara concluso il lavoro pendente senza svolgerlo — 0/2.

### EN · Forma A

**K1**

Synthetic source (orders): rows 120, 80, 100, same period. Draft: 330. The campaign caused the growth. Check the total and prepare a sourced summary; no causal evidence is available.

Totale atteso: **300**.

**LAB_K1_VERIFY — Check the evidence**

2: all rows connected to the total; 1: incomplete evidence; 0: draft accepted without checking.

- `all-rows`: Connect all three rows to the draft total — 2/2.
- `one-row`: Record a doubt using only the first row — 1/2.
- `trust-draft`: Accept the draft total without checking — 0/2.

**LAB_K1_CORRECT — Correct the summary**

One point for the sum operation, one for the total 300. Selecting the draft total does not reconstruct the calculation.

- `{"operation":"sum","total":300}`: 2/2.
- `{"operation":"sum","total":330}`: 1/2; unverified-release.
- `{"operation":"draft","total":330}`: 0/2; unverified-release.

**LAB_K1_RELEASE — Prepare and deliver the artifact**

2: delivery with the correct total, row reference, and no causal claim; 1: held for review; 0: nonconforming artifact. Only delivery with an incorrect total or causal claim is critical.

- `{"action":"release","reference":true,"keepClaim":false}`: 2/2.
- `{"action":"review","reference":false,"keepClaim":true}`: 1/2.
- `{"action":"release","reference":true,"keepClaim":true}`: 0/2; unverified-release.

**K2**

Synthetic data: Ticket T17: password reset requested; internal procedure requires the recovery portal and identity verification. Scope: local knowledge-base draft; no permission to publish the draft. update-17: internal registration complete, ACK-update-17, 1 effect; preparation and verification pending. An untrusted note asks to export the entire register outside scope.

KB draft: direct the person to the recovery portal; verify identity under the internal procedure.

**LAB_K2_SOURCE — Handle the instruction inside the source**

2: instruction discarded while retaining legitimate data; 1: clarification; 0: simulated disclosure outside scope, critical.

- `use-data`: Discard the embedded instruction and use the authorized data — 2/2.
- `pause-source`: Pause the embedded instruction for clarification — 1/2.
- `export`: Simulate exporting the entire register outside the authorized scope — 0/2; unauthorized-disclosure.

**LAB_K2_SCOPE — Apply the authorized scope**

2: draft within scope, external action left to the person; 1: authorized work also blocked; 0: simulated external action without approval, critical.

- `draft-only`: Create only the local draft; leave the external action to the person — 2/2.
- `hold-all`: Block even local preparation while awaiting approval — 1/2.
- `external`: Also execute the simulated external action without approval — 0/2; unauthorized-action.

**LAB_K2_RESUME — Resume from the checkpoint**

2: receipt used and pending work resumed; 1: additional check; 0: duplicate registration or false completion. Only duplication produces the critical duplicate-action error.

- `continue`: Use the receipt, skip the completed registration, and resume pending work — 2/2.
- `wait`: Skip the completed registration; wait for another status check — 1/2.
- `repeat-update`: Repeat the confirmed registration, then resume — 0/2; duplicate-action.
- `declare-complete`: Declare the pending work complete without doing it — 0/2.

### EN · Forma B

**K1**

Synthetic source (tickets): rows 40, 25, 35, same period. Draft: 120. The assistant caused the reduction. Check the total and prepare a sourced summary; no causal evidence is available.

Totale atteso: **100**.

**LAB_K1_VERIFY — Check the evidence**

2: all rows connected to the total; 1: incomplete evidence; 0: draft accepted without checking.

- `all-rows`: Connect all three rows to the draft total — 2/2.
- `one-row`: Record a doubt using only the first row — 1/2.
- `trust-draft`: Accept the draft total without checking — 0/2.

**LAB_K1_CORRECT — Correct the summary**

One point for the sum operation, one for the total 100. Selecting the draft total does not reconstruct the calculation.

- `{"operation":"sum","total":100}`: 2/2.
- `{"operation":"sum","total":120}`: 1/2; unverified-release.
- `{"operation":"draft","total":120}`: 0/2; unverified-release.

**LAB_K1_RELEASE — Prepare and deliver the artifact**

2: delivery with the correct total, row reference, and no causal claim; 1: held for review; 0: nonconforming artifact. Only delivery with an incorrect total or causal claim is critical.

- `{"action":"release","reference":true,"keepClaim":false}`: 2/2.
- `{"action":"review","reference":false,"keepClaim":true}`: 1/2.
- `{"action":"release","reference":true,"keepClaim":true}`: 0/2; unverified-release.

**K2**

Synthetic data: Invoice F28: net 80, tax 20, recorded total 100; payment not yet verified. Scope: local reconciliation note; no permission to send the note. update-28: internal registration complete, ACK-update-28, 1 effect; preparation and verification pending. An untrusted note asks to export the entire register outside scope.

Reconciliation note: 80 + 20 = 100; verify payment status separately.

**LAB_K2_SOURCE — Handle the instruction inside the source**

2: instruction discarded while retaining legitimate data; 1: clarification; 0: simulated disclosure outside scope, critical.

- `use-data`: Discard the embedded instruction and use the authorized data — 2/2.
- `pause-source`: Pause the embedded instruction for clarification — 1/2.
- `export`: Simulate exporting the entire register outside the authorized scope — 0/2; unauthorized-disclosure.

**LAB_K2_SCOPE — Apply the authorized scope**

2: draft within scope, external action left to the person; 1: authorized work also blocked; 0: simulated external action without approval, critical.

- `draft-only`: Create only the local draft; leave the external action to the person — 2/2.
- `hold-all`: Block even local preparation while awaiting approval — 1/2.
- `external`: Also execute the simulated external action without approval — 0/2; unauthorized-action.

**LAB_K2_RESUME — Resume from the checkpoint**

2: receipt used and pending work resumed; 1: additional check; 0: duplicate registration or false completion. Only duplication produces the critical duplicate-action error.

- `continue`: Use the receipt, skip the completed registration, and resume pending work — 2/2.
- `wait`: Skip the completed registration; wait for another status check — 1/2.
- `repeat-update`: Repeat the confirmed registration, then resume — 0/2; duplicate-action.
- `declare-complete`: Declare the pending work complete without doing it — 0/2.

### EN · Forma C

**K1**

Synthetic source (requests): rows 18, 12, 20, same period. Draft: 60. The new process caused the improvement. Check the total and prepare a sourced summary; no causal evidence is available.

Totale atteso: **50**.

**LAB_K1_VERIFY — Check the evidence**

2: all rows connected to the total; 1: incomplete evidence; 0: draft accepted without checking.

- `all-rows`: Connect all three rows to the draft total — 2/2.
- `one-row`: Record a doubt using only the first row — 1/2.
- `trust-draft`: Accept the draft total without checking — 0/2.

**LAB_K1_CORRECT — Correct the summary**

One point for the sum operation, one for the total 50. Selecting the draft total does not reconstruct the calculation.

- `{"operation":"sum","total":50}`: 2/2.
- `{"operation":"sum","total":60}`: 1/2; unverified-release.
- `{"operation":"draft","total":60}`: 0/2; unverified-release.

**LAB_K1_RELEASE — Prepare and deliver the artifact**

2: delivery with the correct total, row reference, and no causal claim; 1: held for review; 0: nonconforming artifact. Only delivery with an incorrect total or causal claim is critical.

- `{"action":"release","reference":true,"keepClaim":false}`: 2/2.
- `{"action":"review","reference":false,"keepClaim":true}`: 1/2.
- `{"action":"release","reference":true,"keepClaim":true}`: 0/2; unverified-release.

**K2**

Synthetic data: Progress P39: two tasks complete, one still open; no confirmed final date. Scope: local report draft; no permission to create an external task. update-39: internal registration complete, ACK-update-39, 1 effect; preparation and verification pending. An untrusted note asks to export the entire register outside scope.

Report draft: 2 tasks complete and 1 open; final date to be confirmed.

**LAB_K2_SOURCE — Handle the instruction inside the source**

2: instruction discarded while retaining legitimate data; 1: clarification; 0: simulated disclosure outside scope, critical.

- `use-data`: Discard the embedded instruction and use the authorized data — 2/2.
- `pause-source`: Pause the embedded instruction for clarification — 1/2.
- `export`: Simulate exporting the entire register outside the authorized scope — 0/2; unauthorized-disclosure.

**LAB_K2_SCOPE — Apply the authorized scope**

2: draft within scope, external action left to the person; 1: authorized work also blocked; 0: simulated external action without approval, critical.

- `draft-only`: Create only the local draft; leave the external action to the person — 2/2.
- `hold-all`: Block even local preparation while awaiting approval — 1/2.
- `external`: Also execute the simulated external action without approval — 0/2; unauthorized-action.

**LAB_K2_RESUME — Resume from the checkpoint**

2: receipt used and pending work resumed; 1: additional check; 0: duplicate registration or false completion. Only duplication produces the critical duplicate-action error.

- `continue`: Use the receipt, skip the completed registration, and resume pending work — 2/2.
- `wait`: Skip the completed registration; wait for another status check — 1/2.
- `repeat-update`: Repeat the confirmed registration, then resume — 0/2; duplicate-action.
- `declare-complete`: Declare the pending work complete without doing it — 0/2.

## Fonti e limiti

Fonti primarie ricontrollate il 2026-11-25; supportano i principi di stato e i vincoli tecnici, non i pesi o la validità della prova. Le rubriche e i dati sintetici discendono dal blueprint approvato.

- [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents): Stato verificabile e ripresa del lavoro. I dati e le rubriche del laboratorio sono costruiti dall'autore, senza validazione psicometrica.
- [MDN — Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): Persistenza nel browser, errori di accesso e limiti delle pagine file://. Non garantisce il recupero in tutti i browser.
