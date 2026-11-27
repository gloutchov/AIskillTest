# Scoring 3.1.0 e formato dei report 3.x

La patch M24 `3.5.2` coordina bozze e storico tra schede. Lo scoring e la banca dati della `3.5.0` restano il riferimento. Vedi [bozze tra schede](#m24--bozze-tra-schede).

La patch M25 `3.5.3` protegge le celle testuali durante la generazione del CSV. Vedi [contratto dell'export CSV](#m25--export-csv).

Implementazione della milestone 17, basata su [ASSESSMENT_BLUEPRINT.md](../ASSESSMENT_BLUEPRINT.md) `1.0.0` e sulla [mappa degli item](ASSESSMENT_ITEM_MAP.md). Scoring approvato il `2026-11-25`, release `v3.0.0`; M18/M19 approvate nelle release `3.1.0`/`3.2.0`. La M20 introduce l'app `3.3.0`, approvata dal maintainer il `2026-11-25`, con dieci slot Harness e gli stessi calcoli, soglie e schema.

M21: app `3.4.0`, scoring `3.1.0`, schema `4`, casi/laboratorio `1.0.0`, approvata dal maintainer il `2026-11-25`; release `v3.4.0`. La nuova versione introduce le regole E, senza cambiare il calcolo Q o riscrivere i report schema 3/scoring 3.0. [Contratto, varianti e validazione](OPERATIONAL_LAB_REVIEW.md).

## Evidenze e calcolo

- Q: knowledge, scenario, choice e multi attuali. Le alternative 1-5 diventano `(score - 1) / 4`. Le scelte multiple sommano crediti e penalità delle selezioni, dividono per i crediti positivi disponibili e limitano il rapporto a [0, 1], senza arrotondamento intermedio.
- D: tutti i likert. Conservano il valore dichiarato 1-5 e il testo scelto; `score`, `credit` e `maxCredit` sono `null`, `scored` è `false`.
- T: i quattro item testuali tematici e i due slot formativi dedicati al completo. Testo e checklist restano formativi, con gli stessi valori nulli di D. Le keyword e le red flag delle rubriche esistenti non producono punti o verifiche automatiche di qualità.
- E: sei decisioni riusate nel completo M22 e nel Laboratorio operativo, due casi nelle forme IT/EN A/B/C. Crediti grezzi 0/1/2 (max 6 per caso, 12 complessivi), mancanti/non validi null. Ogni decisione confermata modifica un modello sintetico; i punti non entrano mai in Q. Nei percorsi senza laboratorio simulatedCases resta vuoto e il valore E null, non zero.

La release M22 contiene 50 unità: 36 Q, 6 D, 2 T e 6 E, distribuite 12 F, 16 U, 12 A, 10 H. Il completo fino a 3.4.0 aveva 27 Q, 21 D e 2 T: i report di quelle versioni restano originali. All’uscita della M22 la banca tematica contava 145 ID Q/D/T. Dalla M28, la banca attiva contiene 130 ID Q/D/T e l’inventario del runtime conta 180 ID (111 Q, 58 D, 5 T, 6 E). I 15 ID rimossi si conservano nell’[archivio Agents](archive/agents-original.json), con le classificazioni originali. Trentuno Q/D/T sono riusi espliciti e tredici sono nuovi; gli ID LAB non vengono duplicati. Primi passi, tematici e regole del laboratorio autonomo mantengono i contenuti approvati. [Matrice e motivazioni M22](M22_REVIEW.md).

La media dei Q validi e direttamente allineati si calcola prima per obiettivo; la media degli obiettivi presenti determina la percentuale d'area. Gli obiettivi non proposti non valgono zero. T10 storico è un quesito di supporto a F06: mostra il proprio credito, ma resta fuori da media e copertura dell'area.

Le aree sono F (fondamenti), U (uso operativo e multimodale), A (agenti), H (harness). Non esistono indice globale, profili Beginner/Curious/Expert/Champion, gap numerico fra dichiarazioni e prove o media fra Q/D/T/E nei nuovi report.

## Copertura e assenze

| Condizione sui Q diretti | Risultato |
| --- | --- |
| Nessun Q valido | Percentuale `null`, non esplorata; eventuali risposte mancanti/non valide indicate |
| Meno di 3 Q validi o meno di 2 obiettivi | Esiti degli item, evidenza limitata; nessuna percentuale d'area |
| Almeno 3 Q e 2 obiettivi | Percentuale con copertura parziale |
| Almeno 6 Q, tutti gli obiettivi dell'area, nessuna risposta Q diretta mancante/non valida e nessuna domanda prevista assente | Copertura prevista raggiunta e fascia editoriale |

Solo con copertura raggiunta: sotto 40 da riprendere, da 40 a meno di 70 in consolidamento, da 70 buon esito nei quesiti. Sono scelte editoriali, non soglie psicometriche. Il completo M22 propone Q diretti per tutti i 25 obiettivi, con 11 F, 8 U, 9 A e 8 H: risposte valide su tutti i Q permettono la copertura prevista delle quattro aree. Le versioni fino alla 3.4.0 non proponevano questa matrice e non vengono ricalcolate.

AI moderne propone sempre U01×2, U02×2 e U03–U08×1. Con dieci risposte valide raggiunge la copertura prevista di U; F/A/H restano non esplorate. Sono scelte su scenari, senza esercizi E o esecuzioni osservate. Ogni caso ha un'alternativa da 1 credito, una da 0,5 e due da 0; con tutte le scelte parziali U vale 50. Un solo errore completo su uno dei due U01 produce 93,75, perché gli otto obiettivi pesano uguale. Una risposta mancante impedisce fascia e copertura raggiunta. Rubriche e traduzioni sono in [MODERN_AI_REVIEW.md](MODERN_AI_REVIEW.md).

AI Agents propone sempre A01–A05×2, tutti Q diretti (2 O, 8 S). Con dieci risposte valide raggiunge la copertura prevista di A; F/U/H restano non esplorate. Ogni slot ha alternative da 1/0,5/0/0 crediti: dieci corrette producono 100, dieci parziali 50, dieci errate 0; una errata e nove corrette producono 90. Una risposta mancante impedisce fascia e copertura raggiunta. Anche prompt injection e rollback sono giudizi su tracce ipotetiche: non producono esercizi E, qualifiche operative o nuovi flag critici. [Tracce e motivazioni bilingui](AGENTIC_WORKFLOWS_REVIEW.md).

Harness propone H01, H02×2, H03×2, H04×2, H05×2, H06: dieci Q diretti di livello S. Dieci risposte valide possono raggiungere la copertura prevista di H; F/U/A restano non esplorate. Con crediti 1/0,5/0/0, tutte corrette producono 100, tutte parziali 50 e tutte errate 0. I sei obiettivi hanno peso uguale: un errore su H01 e nove corrette producono 83,33; un errore su uno dei due H02 produce 91,67 (esempi qui arrotondati a due decimali; UI a interi, calcolo senza arrotondamento intermedio). Una risposta mancante impedisce fascia e copertura raggiunta. I casi non dimostrano di saper costruire o amministrare un harness e non introducono E. [Scenari bilingui e contratti](HARNESS_REVIEW.md).

Le risposte hanno stato `valid`, `missing` o `invalid`. Un indice fuori range, un booleano al posto di una scelta o selezioni duplicate non diventano risposte errate a zero. Una risposta corretta esclusa per mancanza di copertura resta consultabile nel dettaglio. D e stime iniziali non alzano Q; un contrasto testuale si mostra solo fra D alto e Q debole sullo stesso obiettivo, senza sottrarre scale diverse.

## Esiti E nella M21

La percentuale complessiva richiede entrambi i casi completi. In un caso incompleto il credito rappresenta soltanto le decisioni valide e value resta null; la somma grezza non viene presentata come risultato finale. Senza criticità: meno di 50 → retry; da 50 a meno di 80 → partial; da 80 e almeno 4/6 in ciascun caso → conform. 6/6 + 3/6 produce 75, parziale. Le soglie sono editoriali.

Un'azione critica simulata conserva i punti e prevale con band critical, anche se una delle sei decisioni è ancora mancante: E totale resta null se incompleto, mentre la criticità già eseguita è leggibile. I codici sono unverified-release (totale errato o causalità non supportata consegnati), unauthorized-disclosure (registro esportato fuori mandato), unauthorized-action (azione esterna senza approvazione), duplicate-action (secondo effetto dell'update già confermato). Un calcolo errato trattenuto per revisione e una falsa conclusione non producono duplicate-action o altre criticità implicite.

K1 verifica tutte le righe (2), solo una (1), oppure si fida della bozza (0); ricostruisce il calcolo (1 somma + 1 numero corretto); consegna totale corretto con fonte e senza causalità (2), trattiene per revisione (1) o produce un artefatto non conforme (0). K2 scarta istruzioni incorporate mantenendo dati legittimi (2), chiede chiarimento (1) o divulga (0); prepara entro il mandato (2), blocca tutto (1) o agisce esternamente (0); usa la ricevuta e riprende (2), attende verifica (1), duplica o dichiara falsamente concluso (0).

La verifica e il calcolo possono scambiarsi di ordine; la consegna segue entrambi. Cambiare il calcolo invalida la vecchia consegna. Ogni stato e criticità sono ricostruiti dalle sole scelte finali: Indietro, render e recupero non accumulano effetti. Una revisione elimina gli effetti e flag della configurazione precedente; nessun log dei tentativi. Crediti e motivazioni si vedono dopo il completamento. Dettagli e varianti canoniche: [OPERATIONAL_LAB_REVIEW.md](OPERATIONAL_LAB_REVIEW.md).

## Schema e versioni

`assets/assessment.js` contiene regole pure, catalogo bilingue degli obiettivi e metadati dei 180 ID attivi (130 tematici, 44 del completo e sei decisioni E); `assets/report-ui.js` mostra i risultati. `assets/modern-ai.js`, `assets/agentic-workflows.js` e `assets/harness.js` registrano scenari, traduzioni e fonti dopo banca e i18n, prima della valutazione. Sono script classici locali, senza dipendenze, build, fetch o valutatori remoti. Modificare le assegnazioni di item esistenti richiede di rivedere `scoringVersion`, anche senza cambiarne il testo. Gli slot M18–M20 riusano calcoli e suggerimenti preesistenti. La M21 aggiunge i moduli classici locali operational-lab.js (regole pure) e lab-ui.js (UI e bozza), introduce lo scoring E 3.1.0 e lo schema 4; il lettore riconosce separatamente schema 3/scoring 3.0 e schema 4/scoring 3.1, senza migrazioni.

| Campo | Contenuto |
| --- | --- |
| `meta.assessmentVersion` | `3.4.0`, versione dell'app |
| `meta.scoringVersion` | `3.1.0`, versione del calcolo |
| `meta.reportSchemaVersion` | `4`, formato del report assessment |
| `meta.blueprintVersion` | `1.0.0`, contratto approvato |
| `meta.questionBankVersion`, `meta.formVersion` | `2026.11-m21`, `1.7` (M20: `2026.11-m20`/`1.6`; M19: `2026.11-m19`/`1.5`; M18: `2026.11-m18`/`1.4`; M17: `2026.07-m7`/`1.3`) |
| `meta.language`, `languageSource`, `formId`, `testMode` | Lingua/origine, forma A/B/C, modalità e quantità |
| `meta.comparisonKey` | Firma locale di versioni, modalità, lingua, forma e identità/classificazione degli item ordinati; non contiene risposte o dati personali |
| `answers[]` | Identità e versione dell'item, tipo Q/D/T/E, area, obiettivo, tag, livello, allineamento, formato, stato, risposta grezza e leggibile, credito e feedback; nei nuovi scenari anche motivazione e fonti |
| `results.knowledgeByArea` | Percentuale eventuale, stato di copertura, fascia eventuale e crediti per obiettivo |
| `results.declaredPractices`, `declaredContrasts`, `formativeFeedback` | Dichiarazioni, obiettivi del confronto testuale e checklist formative |
| `answers[].nextStep`, `results.nextSteps` | Campi facoltativi introdotti in M19 e riusati da Harness: suggerimenti salvati, deduplicati per obiettivo con una scelta non piena; nessun effetto sul credito |
| `results.simulatedCases`, `simulatedSummary` | K1/K2: identità/versione, stato sintetico iniziale, scelte finali, effetti, crediti, motivazioni e criticità; E totale solo con entrambi completi. Vuoti negli altri percorsi |
| `coverage` | Quantità previste/proposte/valide/mancanti/non valide per tipo e area; obiettivi presenti/assenti e casi |
| `criticalFindings` | Solo azioni E simulate: kind, caseId, decisionId, code, effect. Vuoto per Q/D/T |
| `meta.labVersion`, `answers[].caseVersion` | Versione 1.0.0 dei casi/rubriche E, inclusa anche in itemVersion e nella firma di confronto |

`answers[].score` è un alias del credito Q 0-1 o E 0-2, nullo per D/T; non è la scala 1-5 dei report 2.x. `slotId` è assente perché gli slot C01-C50 non sono ancora stati applicati agli item. Primi passi non usa lo schema assessment 3/4 o lo scoring 3.x: mantiene il proprio contratto didattico, con la versione dell'app nei metadati.

Negli scenari AI moderne, Agents e Harness `answers[].question` include contesto e domanda separati da una nuova riga: il dato completo resta leggibile anche nei renderer 3.0.0. I campi facoltativi `selectedRationales` (array di testi della scelta effettuata) e `sourceRefs` (ID delle fonti nei cataloghi M18/M19/M20) aggiungono motivazione e letture. Non sono requisiti per riconoscere lo schema 3 e non modificano il credito. I report precedenti senza questi campi sono letti ed esportati senza modifiche. I riferimenti sono link espliciti al catalogo delle fonti, non nuove valutazioni del contenuto archiviato.

I nuovi scenari Agents e Harness conservano `nextStep`, testo bilingue selezionato nella lingua della sessione. Alla creazione del report, un Q valido con credito minore di 1 propone quel suggerimento in `results.nextSteps`, deduplicato per obiettivo, come `{objectiveId,text}`. Nessun suggerimento è inferito da assenze/risposte invalide, stime o dichiarazioni. I testi restano originali nello storico e negli export. Se `nextSteps` è assente il report si apre regolarmente. Se contiene valori malformati il report si apre in «Dati originali». I suggerimenti non costituiscono esercizi svolti o certificazioni.

## Storico, export e privacy

Lo storico resta nella chiave locale `aiSkillAssessmentHistory`, con limite di 100 record. Il pulsante «Risultati precedenti» nella pagina iniziale apre lo stesso elenco locale disponibile nei risultati. Ogni record è apribile individualmente. Non vengono mostrate medie, graduatorie o delta fra report: nemmeno fra A/B/C o campioni tematici differenti. La firma serve a riconoscere identità di condizioni, non a dimostrare apprendimento.

La revisione globale di banca e forme delle milestone 18-20 cambia `comparisonKey` anche per i percorsi preesistenti. La M19 cambia inoltre gli item selezionati nel percorso Agents; la M20 aggiunge una modalità indipendente. Le versioni dei record salvati restano originali: nessuna migrazione o ricalcolo. Lo storico continua a distinguere formati didattici, evidence 3.x, legacy e sconosciuti.

I report 1.x/2.x riconoscibili mantengono dati, punteggi, etichette e raccomandazioni originali e mostrano un avviso di modello precedente. La vista può fornire valori vuoti per campi facoltativi assenti, senza modificare il record. L'apertura non salva una copia né ricalcola punteggi, raccomandazioni o confronti mancanti. L'interfaccia segue la preferenza manuale corrente o, in sua assenza, la lingua del report; domande, risposte e raccomandazioni archiviate conservano il testo originale, senza ritraduzione tramite la banca attuale. Il ritorno ai percorsi ripristina la lingua scelta dall'utente o il default del browser per il nuovo assessment.

La M26 verifica i campi utilizzati dalle viste 1.x/2.x, didattiche e degli schemi 3 e 4, comprese date, checklist, punteggi, raccomandazioni e risultati del laboratorio. I campi facoltativi possono essere assenti. Un formato futuro, sconosciuto o incompleto si apre in «Dati originali», dove il record è mostrato come testo, con export JSON e CSV. Nella tabella dello storico i metadati inutilizzabili sono indicati con un trattino. Gli export senza una data utilizzabile riportano `undated` nel nome del file.

Uno storico costituito da un array JSON leggibile mantiene consultabili i record individuali e accetta nuovi salvataggi entro il limite di 100, anche in presenza di record danneggiati. Se il contenitore dello storico non è un array JSON valido o lo storage non è accessibile, il nuovo report resta visibile ma non sovrascrive lo storico. Un errore di quota mostra un avviso con invito a esportare. La cancellazione resta un'azione esplicita con conferma.

JSON esporta il record originale completo. Il CSV della 3.0.0 usa tre colonne stabili `type,field,value`, con percorsi come `meta.scoringVersion`, `answers.0.evidenceType` o `coverage.byEvidence.Q.valid`. Esporta anche dati legacy/sconosciuti senza riclassificarli. Questo formato sostituisce il precedente CSV a sezioni; un valore nullo è vuoto, uno zero resta `0`, e gli stati chiariscono le assenze. Array vuoti e oggetti vuoti sono rappresentati come `[]` e `{}`; virgole, virgolette e nuove righe vengono quotate. L'ordine e il nome dei campi tecnici non cambiano con la lingua; testi e risposte conservano la lingua registrata.

La M21 conserva una sola bozza incompleta in `aiSkillOperationalLabDraft`, separata dallo storico: schema bozza 1, versioni, modalità, lingua, forma, posizione, ordine e scelte confermate. Nessun profilo o log dei tentativi; gli effetti si ricostruiscono. La home offre Riprendi/Elimina; completamento, interruzione confermata o Cancella dati locali la eliminano. Bozze incompatibili/corrotte sono conservate finché non eliminate. Errori di storage vengono segnalati; da file:// la persistenza dipende dal browser. Non si aggiungono chiavi di tracking, invii di risposte, API AI o risorse esterne automatiche. Gli export restano manuali. I report aggiungono classificazione, scelte grezze e dati necessari a spiegare il risultato; non raccolgono tempi, tasti o dati reali del dispositivo. I dati delle fixture sono tutti sintetici.

## Verifica e revisione del maintainer

Eseguire senza installazioni:

```powershell
node --test --test-isolation=none tests/assessment.test.mjs tests/operational-lab.test.mjs
```

Il test runner integrato di Node è usato direttamente per non richiedere la creazione di processi figli nel sandbox. I controlli coprono scoring, mappa, assenze, credito parziale, soglie, identità dei risultati, storico, export, auto-advance e composizione. L'adattatore DOM in memoria verifica produzione del markup e collegamento degli eventi, senza attestare layout o comportamento di un browser reale.

Verifica M18: **25 controlli passati**, **66 composizioni assessment** (11 modalità × IT/EN × A/B/C) e **6 forme didattiche**. Verificati matrice fissa, corrispondenza traduzioni/opzioni/crediti, risultati 100/50/0, pesi per obiettivo, assenze, avvio/completamento del nuovo percorso, ritorno Indietro, storico, JSON/CSV e bibliografia bilingue. Confronto aggiuntivo con `main` `27d6245`: testi, opzioni e mappa dei 115 item nelle sei forme, composizioni dei 60 percorsi precedenti e forme didattiche invariati. Nessun dato reale del browser è stato letto. Le risposte corrette risultano le più lunghe in 1/10, 2/10 e 1/10 casi IT e 4/10, 1/10 e 2/10 EN (A/B/C); il controllo è editoriale, non una verifica psicometrica.

Verifica M19: **30 controlli passati**, ancora **66 composizioni assessment e 6 forme didattiche**. Verificati due Q per A01–A05, livelli O/S, IT/EN e layout delle opzioni A/B/C, risultati 100/50/0, assenze, suggerimenti deduplicati e congelati nello storico, JSON/CSV, auto-advance/Indietro e bibliografia bilingue. Confronto con `main` `e28a0d2`: testi, alternative e mappa dei 125 item precedenti nelle sei forme, 60 composizioni non Agents e forme didattiche invariati. Risposta corretta più lunga in 2/10, 3/10, 1/10 casi IT e 3/10, 3/10, 2/10 EN; carico medio progettato di 85–91 parole per scenario incluse le alternative, durata stimata 8–12 minuti. Sono controlli editoriali, non equivalenza o durata misurate. Nessun dato reale del browser è stato letto.

Verifica M20: **35 controlli passati**, **72 composizioni assessment** (12 modalità × IT/EN × A/B/C) e **6 forme didattiche**. Verificati matrice H, livello S, traduzioni e layout delle opzioni, risultati 100/50/0, pesi per obiettivo, assenze, avvio/navigazione/completamento, suggerimenti salvati, storico, JSON/CSV e bibliografia bilingue con adattatore DOM. Confronto con `main` `dcf6428`: 135 item precedenti e relativa mappa nelle sei forme, 66 composizioni precedenti e forme didattiche invariati. Risposta corretta più lunga in 0/10, 0/10, 2/10 casi IT e 4/10, 2/10, 4/10 EN; carico medio progettato 91–103 parole per scenario comprese le alternative. Durata 8–12 minuti stimata; controlli editoriali, senza equivalenza psicometrica o durata empirica dimostrata. Nessun dato reale del browser letto.

Esempi da esaminare in [tests/fixtures/m17-reports.json](../tests/fixtures/m17-reports.json):

| Esempio sintetico | Risultato atteso |
| --- | --- |
| `knowledge-high-declared-low`, IT/A | F/U/A 100 con copertura parziale; D basso separato; H non esplorata |
| `declared-high-questions-low`, EN/B | F/U/A 0; D alto non modifica i quiz; contrasti testuali sugli obiettivi comuni |
| `agents-gap`, IT/A | F/U 100, A 0, H non esplorata; nessuna qualifica agentica o voto globale |
| `legacy-2x` | Punteggio 92 e profilo Champion conservati con avviso; fixture di formato, non una nuova valutazione |

Queste fixture non vengono caricate dall'app né inserite automaticamente nello storico. Sono esempi di formato e risultati consultabili dal maintainer.

Checklist manuale prima della chiusura della milestone:

1. Aprire `ai_skill_test.html` direttamente, poi la root `index.html`; controllare badge 3.4.0, percorso Laboratorio operativo e quattordici indicatori del carosello, assenza di errori e risorse tutte locali.
2. Rivedere tutte le varianti in [HARNESS_REVIEW.md](HARNESS_REVIEW.md) e completare forme IT/EN con casi corretti/parziali/errati. Verificare chiarezza tecnica senza dipendenza da piattaforme, leggibilità delle tracce, auto-advance reversibile, copertura H, motivazioni, suggerimenti e fonti; nessuna qualifica di costruzione/amministrazione.
3. Provare un tematico con pochi Q: nessuna percentuale non sostenuta; area assente senza zero. Confermare multi/testo con Avanti e ritorno tramite Indietro.
4. Aprire report 2.x, 3.0.0, 3.1.0 e 3.2.0 già presenti nello storico e poi un report nuovo. Verificare punteggi e suggerimenti originali, nessuna copia creata dalla sola apertura e nessuna media. Riprovare completo, Agents, AI moderne e Primi passi per confermare la continuità dei flussi.
5. Scaricare JSON/CSV nelle due lingue e verificarne campi/versioni, testo con virgole/virgolette/nuove righe e assenze distinte da zero.
6. Verificare bibliografia dalla landing e dai risultati; controllare con tastiera e viewport mobile schede, dettagli, storico e pulsanti.
7. Controllare traffico e console in un browser reale: nessun invio di risposte o caricamento esterno automatico. Verificare stampa e cancellazione esplicita dello storico.

Limite della verifica nell'ambiente di sviluppo: il tentativo di aprire il file locale con il runtime Browser restituisce ancora «No browser is available» nella M20; nessun browser è elencato come disponibile. Apertura visiva, eventi reali, layout desktop/mobile, download, console e traffico non sono stati verificati dall'agente in un browser reale. Il maintainer ha approvato M17, M18, M19 e M20 e autorizzato le rispettive release il `2026-11-25`; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione.


## Verifica M21 — approvata dal maintainer

50 controlli automatici passati: 72 composizioni precedenti Q/D/T, 6 nuove forme laboratorio, 6 forme didattiche indipendenti; 864 configurazioni K1 e 216 K2. Verificati credito 0/1/2, assenze e valori invalidi, soglie, criticità ed effetti espliciti, ordini alternativi, invalidazione della consegna, revisione senza flag obsoleti o registrazioni duplicate, conferme/Avanti e anteprima, bozza compatibile/incompatibile/corrotta, privacy dei campi, errori di storage/rimozione, interruzione e annullamento, completamento e cancellazione, report schema 3/4 e ripiego leggibile per record malformati, JSON/CSV, bibliografia e asset locali. Nessun dato reale del browser consultato.

L'adattatore DOM non attesta rendering, tastiera reale, mobile o download. La skill Browser non trova un browser disponibile dopo bootstrap/troubleshooting; non sono verificati in browser apertura diretta, layout desktop/mobile, focus e tecnologie assistive, console, traffico, download o stampa. Il maintainer ha approvato la chiusura della M21 e la release `v3.4.0` il `2026-11-25`, autorizzando commit, merge, push, tag e rimozione del branch. Gli esiti dettagliati della prova manuale non sono stati riportati nella conversazione; la [checklist IT/EN con caso corretto e critico](OPERATIONAL_LAB_REVIEW.md#validazione-del-maintainer-prima-del-commit) resta riferimento di verifica, senza attribuire all’agente controlli browser non eseguiti.

## M22 — completo integrato, release 3.5.0 approvata

App `3.5.0`, banca `2026.11-m22`, forma `1.8`; scoring `3.1.0`, schema report `4`, blueprint `1.0.0` e casi `1.0.0` invariati. Lo scoring resta lo stesso: cambia il campione di prove del completo, con ID e metadati tracciabili. Il maintainer ha approvato la milestone e la release `v3.5.0` il `2026-11-26`, autorizzando commit, merge, push, tag e rimozione del branch.

Le 36 Q sono 6 knowledge e 30 scenario; 6 D (12%) e 2 T non assegnano punti. I sei passi E sono i due casi M21 e conservano credito 0/1/2, massimo 6 per caso/12 totale, minimo 4/6 per caso per la fascia conforme, criticità che prevalgono sulla fascia e percentuale null con casi incompleti. Q/D/T/E restano separati anche con copertura Q piena. Il report rende le azioni critiche visibili prima dei punteggi Q; giudizio corretto nei quiz non compensa un'azione simulata fuori mandato.

C01–C50 sono slot della matrice: i 44 Q/D/T usano sourceId dedicati, con slotId e originSourceId nei riusi; le sei E mantengono sourceId LAB e slotId. C41/C43 sono i due compiti di comprensione Harness riusati da HR01/HR04. I campi aggiunti sono facoltativi, quindi non richiedono un nuovo schema. La firma di confronto cambia con banca/forma e nuovi ID; report 2.x, schema 3 e schema 4 precedenti restano immutati all'apertura e all'export.

La singola bozza `aiSkillOperationalLabDraft` è condivisa fra completo e laboratorio autonomo. Il completo salva draft schema 2, con versioni, modalità, lingua, forma, indice, ordine K1, questionIds e risposte, inclusi testi parziali e sole azioni E confermate. Non conserva dati iniziali del profilo, tempi o tentativi. I dati numerici/compositi E sono sanitizzati; ID, scelte, versioni e raggruppamento finale dei casi sono verificati alla ripresa. Il laboratorio mantiene draft schema 1. Una nuova sessione chiede conferma prima di sostituire la bozza; interruzione confermata, completamento e cancellazione esplicita la rimuovono. Errori di storage/rimozione sono visibili. Non si migrano bozze incompatibili o storici.

Verificati 58 controlli automatici: 72 composizioni assessment, 6 forme laboratorio e 6 didattiche; confronto della matrice C01–C50 nelle sei forme IT/EN A/B/C; risultati Q 100/50/0; copertura e pesi; Q forti/E deboli; dichiarazioni alte con Q bassi; lacuna agentica; casi incompleti; critiche non compensate; navigazione e conferme; inversione K1 senza perdita delle altre domande; invalidazione della consegna; bozza senza profilo, ripresa senza consumo forma, incompatibilità, corruzione e errori di storage; storico/JSON/CSV e metadati opzionali. I 145 item tematici, le composizioni non complete, le sei forme didattiche e le regole lab corrispondono ai sei hash del tag approvato v3.4.0 (`afb0887`). Il suo report schema 4 nella fixture resta originale e leggibile.

I generatori di revisione sono facoltativi e non servono all'app. Le varianti correnti e sei report campione sono in [M22_REVIEW.md](M22_REVIEW.md). La checklist manuale corrente è soltanto [QA.md](QA.md); gli elenchi precedenti sopra sono evidenze storiche delle M17–M21. L'agente non dispone di browser dopo bootstrap e troubleshooting: non sono attestati apertura visiva, tastiera reale, desktop/mobile, download/stampa, console/rete o tempi umani. Il maintainer ha approvato la chiusura il `2026-11-26`; gli esiti dettagliati delle prove manuali IT/EN e desktop/mobile non sono stati riportati nella conversazione e non vengono attribuiti alla verifica dell’agente.

## M23 — Recupero dei risultati

Il completamento calcola il report e prova a scriverlo nello storico locale. Se la scrittura fallisce, il report originale resta in memoria con i comandi di export e salvataggio. Aprire un report storico lascia disponibile un pulsante per tornare al report pendente. Riprovare salva lo stesso record, con lo stesso orario di completamento. Uno storico illeggibile o non scrivibile conserva i dati preesistenti.

Per completo e laboratorio la bozza viene rimossa dopo che lo storico accetta il report. In caso di errore si tenta di aggiornare la bozza, che conserva le risposte ma esclude i dati del profilo. Se fallisce anche quell’aggiornamento, una bozza già salvata può contenere uno stato precedente. Se manca una bozza recuperabile, il report rimane disponibile finché la pagina resta aperta. Tornare ai percorsi richiede conferma. Alla chiusura o al ricaricamento la pagina richiede un avviso al browser, che può ometterlo.

Interrompi riporta ai percorsi anche se la rimozione della bozza fallisce. L’avviso segnala che può rimanere una copia. Le bozze `3.5.0` si possono riprendere con `3.5.1` quando formato e versioni dei contenuti coincidono. I test della patch coprono questi flussi con un adattatore DOM. Vedi la [checklist M23](QA.md#m23--recupero-e-storage).

## M24 — Bozze tra schede

`aiSkillAssessmentDraft` conserva un identificatore casuale della sessione, una revisione e la bozza con il formato del percorso. Il completo usa schema 2 e il laboratorio schema 1. La ripresa verifica schema, banca, forma, scoring, versione dei casi e contenuto delle risposte. `assessmentVersion` indica la provenienza e può differire tra patch compatibili. Quando la chiave corrente è assente, la pagina legge `aiSkillOperationalLabDraft` e trasferisce una bozza compatibile alla prima ripresa con salvataggio.

Un blocco esclusivo Web Locks coordina le operazioni sullo storage della stessa origine. Ogni ripresa avanza la revisione e ogni scrittura verifica il record da cui parte. Le notifiche `storage` aggiornano la disponibilità della bozza e avvisano la scheda che ha perso il salvataggio. Quando il browser non consente il blocco, si può completare il test in memoria ed esportarlo. [Specifiche Web Locks](https://w3c.github.io/web-locks/), [evento storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).

I nuovi report schema 4 aggiungono `meta.sessionId` per impedire più salvataggi della stessa sessione. I report già registrati mantengono i campi originali. Cancella dati locali aggiorna la chiave `aiSkillAssessmentClearGeneration` con un valore casuale. Un tentativo di salvataggio iniziato prima della cancellazione resta esportabile in memoria. La rimozione della bozza lascia un marcatore vuoto nella chiave corrente per ignorare eventuali bozze riscritte da vecchie schede. Le versioni precedenti accedono ancora allo storico senza coordinamento e vanno ricaricate dopo l'aggiornamento. [Checklist M24](QA.md#m24--bozze-tra-schede-e-bibliografia).

## M25 — Export CSV

Le righe mantengono le tre colonne `type,field,value`. Il serializzatore verifica ogni cella testuale, compresi nomi di campi provenienti da report storici. Se l'inizio del testo può essere interpretato come formula, antepone un apostrofo e racchiude il risultato tra virgolette. Il controllo copre anche spazi iniziali, caratteri di controllo e varianti a larghezza intera dei segni di formula. Le righe del CSV sono separate da CRLF. All'interno di una cella, virgole, punti e virgola, virgolette e nuove righe seguono il quoting del CSV. I valori numerici, compresi zero e numeri negativi, sono emessi senza prefisso. Il valore nullo resta una cella vuota. La protezione si applica durante l'export. JSON e record in memoria o nello storico conservano i valori originali.

Per importare usare UTF-8, separatore virgola e doppi apici come delimitatore di testo. In Excel usare Power Query da **Dati → Da testo/CSV**, mantenendo le interruzioni racchiuse tra virgolette nello stesso campo. L'importazione guidata legacy di Excel può spezzare i campi multilinea. A seconda del lettore, l'apostrofo può essere visibile. [Connettore CSV di Power Query](https://learn.microsoft.com/power-query/connectors/text-csv), [opzioni di importazione di Calc](https://help.libreoffice.org/latest/en-GB/text/shared/00/00000208.html?DbPAR=CALC).

## Patch 3.5.8 — Testi e report

Le banche passano a `2026.11-editorial-1` per l’assessment e a `2026.11-first-steps-2` per Primi passi. Forme, scoring, schema dei report, crediti e classificazioni restano invariati. La firma di confronto dei nuovi assessment distingue la revisione editoriale dalla banca precedente.

Nei nuovi report didattici `answers[].expectedAnswer` e `answers[].feedback` contengono risposta attesa e spiegazione nella lingua della prova. Entrambi sono disponibili negli export. Un report precedente continua a mostrare i dati e i suggerimenti originali disponibili.

Le bozze compatibili della banca `2026.11-m22` si aggiornano quando l’utente sceglie di riprendere. Se la bozza della forma B inglese del completo contiene già una scelta per `C22`, riapre quella dichiarazione con la formulazione aggiornata e mantiene tutte le altre risposte. L’avviso precede la ripresa. Lo storico resta consultabile nella sua versione originale.
