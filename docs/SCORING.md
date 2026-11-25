# Scoring 3.0.0 e formato dei report 3.x

Implementazione della milestone 17, basata su [ASSESSMENT_BLUEPRINT.md](../ASSESSMENT_BLUEPRINT.md) `1.0.0` e sulla [mappa degli item](ASSESSMENT_ITEM_MAP.md). Scoring approvato il `2026-11-25`, release `v3.0.0`; M18 approvata nella release `3.1.0`. La M19 introduce l'app `3.2.0`, approvata dal maintainer il `2026-11-25`, con dieci nuovi slot Agents e gli stessi calcoli, soglie e schema.

## Evidenze e calcolo

- Q: knowledge, scenario, choice e multi attuali. Le alternative 1-5 diventano `(score - 1) / 4`. Le scelte multiple sommano crediti e penalità delle selezioni, dividono per i crediti positivi disponibili e limitano il rapporto a [0, 1], senza arrotondamento intermedio.
- D: tutti i likert. Conservano il valore dichiarato 1-5 e il testo scelto; `score`, `credit` e `maxCredit` sono `null`, `scored` è `false`.
- T: i quattro item testuali della banca. Testo e checklist restano formativi, con gli stessi valori nulli di D. Le keyword e le red flag delle rubriche esistenti non producono punti o verifiche automatiche di qualità.
- E: assente in questa milestone. `simulatedCases` è vuoto e il risultato simulato è `null`, non zero. Il laboratorio operativo arriverà nella milestone 21.

Il completo conserva 50 domande: 27 Q, 21 D e 2 T. I tematici restano da 10. Le 125 domande e forme della M18 sono invariate come contenuti; la M19 aggiunge dieci slot Q Agents con tre varianti IT/EN, portando la banca a 135 ID (76 Q, 55 D, 4 T, 0 E). Primi passi conserva forme, unità didattiche e risultato autonomo. Il percorso Agents sostituisce l'estrazione dal vecchio pool con la matrice vincolata AW01–AW10; AG1–AG15 restano nella banca e AG1–AG4 nel completo.

La media dei Q validi e direttamente allineati si calcola prima per obiettivo; la media degli obiettivi presenti determina la percentuale d'area. Gli obiettivi non proposti non valgono zero. T10 storico è un quesito di supporto a F06: mostra il proprio credito, ma resta fuori da media e copertura dell'area.

Le aree sono F (fondamenti), U (uso operativo e multimodale), A (agenti), H (harness). Non esistono indice globale, profili Beginner/Curious/Expert/Champion, gap numerico fra dichiarazioni e prove o media fra Q/D/T/E nei nuovi report.

## Copertura e assenze

| Condizione sui Q diretti | Risultato |
| --- | --- |
| Nessun Q valido | Percentuale `null`, non esplorata; eventuali risposte mancanti/non valide indicate |
| Meno di 3 Q validi o meno di 2 obiettivi | Esiti degli item, evidenza limitata; nessuna percentuale d'area |
| Almeno 3 Q e 2 obiettivi | Percentuale con copertura parziale |
| Almeno 6 Q, tutti gli obiettivi dell'area, nessuna risposta Q diretta mancante/non valida e nessuna domanda prevista assente | Copertura prevista raggiunta e fascia editoriale |

Solo con copertura raggiunta: sotto 40 da riprendere, da 40 a meno di 70 in consolidamento, da 70 buon esito nei quesiti. Sono scelte editoriali, non soglie psicometriche. Il completo non verifica direttamente tutti i 25 obiettivi: terminarlo non comporta copertura piena.

AI moderne propone sempre U01×2, U02×2 e U03–U08×1. Con dieci risposte valide raggiunge la copertura prevista di U; F/A/H restano non esplorate. Sono scelte su scenari, senza esercizi E o esecuzioni osservate. Ogni caso ha un'alternativa da 1 credito, una da 0,5 e due da 0; con tutte le scelte parziali U vale 50. Un solo errore completo su uno dei due U01 produce 93,75, perché gli otto obiettivi pesano uguale. Una risposta mancante impedisce fascia e copertura raggiunta. Rubriche e traduzioni sono in [MODERN_AI_REVIEW.md](MODERN_AI_REVIEW.md).

AI Agents propone sempre A01–A05×2, tutti Q diretti (2 O, 8 S). Con dieci risposte valide raggiunge la copertura prevista di A; F/U/H restano non esplorate. Ogni slot ha alternative da 1/0,5/0/0 crediti: dieci corrette producono 100, dieci parziali 50, dieci errate 0; una errata e nove corrette producono 90. Una risposta mancante impedisce fascia e copertura raggiunta. Anche prompt injection e rollback sono giudizi su tracce ipotetiche: non producono esercizi E, qualifiche operative o nuovi flag critici. [Tracce e motivazioni bilingui](AGENTIC_WORKFLOWS_REVIEW.md).

Le risposte hanno stato `valid`, `missing` o `invalid`. Un indice fuori range, un booleano al posto di una scelta o selezioni duplicate non diventano risposte errate a zero. Una risposta corretta esclusa per mancanza di copertura resta consultabile nel dettaglio. D e stime iniziali non alzano Q; un contrasto testuale si mostra solo fra D alto e Q debole sullo stesso obiettivo, senza sottrarre scale diverse.

## Schema e versioni

`assets/assessment.js` contiene regole pure, catalogo bilingue degli obiettivi e metadati dei 135 item; `assets/report-ui.js` mostra i risultati. `assets/modern-ai.js` e `assets/agentic-workflows.js` registrano scenari, traduzioni e fonti dopo banca e i18n, prima della valutazione. Sono script classici locali, senza dipendenze, build, fetch o valutatori remoti. Modificare le assegnazioni di item esistenti richiede di rivedere `scoringVersion`, anche senza cambiarne il testo. L'aggiunta dei nuovi item e dei suggerimenti mantiene calcoli, soglie e assegnazioni preesistenti: aggiorna banca/forme/app, mentre scoring `3.0.0` e schema `3` restano invariati.

| Campo | Contenuto |
| --- | --- |
| `meta.assessmentVersion` | `3.2.0`, versione dell'app |
| `meta.scoringVersion` | `3.0.0`, versione del calcolo |
| `meta.reportSchemaVersion` | `3`, formato del report assessment |
| `meta.blueprintVersion` | `1.0.0`, contratto approvato |
| `meta.questionBankVersion`, `meta.formVersion` | `2026.11-m19`, `1.5` (in 3.1.0 erano `2026.11-m18`, `1.4`; in 3.0.0 `2026.07-m7`, `1.3`) |
| `meta.language`, `languageSource`, `formId`, `testMode` | Lingua/origine, forma A/B/C, modalità e quantità |
| `meta.comparisonKey` | Firma locale di versioni, modalità, lingua, forma e identità/classificazione degli item ordinati; non contiene risposte o dati personali |
| `answers[]` | Identità e versione dell'item, tipo Q/D/T, area, obiettivo, tag, livello, allineamento, formato, stato, risposta grezza e leggibile, credito e feedback; nei nuovi scenari anche motivazione e fonti |
| `results.knowledgeByArea` | Percentuale eventuale, stato di copertura, fascia eventuale e crediti per obiettivo |
| `results.declaredPractices`, `declaredContrasts`, `formativeFeedback` | Dichiarazioni, obiettivi del confronto testuale e checklist formative |
| `answers[].nextStep`, `results.nextSteps` | Campi facoltativi M19: suggerimento salvato nell'item e suggerimenti per obiettivi con una scelta non piena, senza effetti sul credito |
| `results.simulatedCases`, `simulatedSummary` | Nessun caso; valore simulato `null` e stato non esplorato |
| `coverage` | Quantità previste/proposte/valide/mancanti/non valide per tipo e area; obiettivi presenti/assenti e casi |
| `criticalFindings` | Vuoto nella m17: nessun flag di errore critico è stato inventato retroattivamente per gli item attuali |

`answers[].score` è un alias del credito Q 0-1, nullo per D/T; non è la scala 1-5 dei report 2.x. `slotId` è assente perché gli slot C01-C50 non sono ancora stati applicati agli item. Primi passi non usa lo schema assessment 3 o lo scoring 3.0.0: mantiene il proprio contratto didattico, con la versione dell'app nei metadati.

Negli scenari AI moderne e Agents `answers[].question` include contesto e domanda separati da una nuova riga: il dato completo resta leggibile anche nei renderer 3.0.0. I campi facoltativi `selectedRationales` (array di testi della scelta effettuata) e `sourceRefs` (ID delle fonti nei cataloghi M18/M19) aggiungono motivazione e letture. Non sono requisiti per riconoscere lo schema 3 e non modificano il credito. I report precedenti senza questi campi sono letti ed esportati senza modifiche. I riferimenti sono link espliciti al catalogo delle fonti, non nuove valutazioni del contenuto archiviato.

I nuovi scenari Agents conservano `nextStep`, testo bilingue selezionato nella lingua della sessione. Alla creazione del report, un Q valido con credito minore di 1 propone quel suggerimento in `results.nextSteps`, deduplicato per obiettivo, come `{objectiveId,text}`. Nessun suggerimento è inferito da assenze/risposte invalide, stime o dichiarazioni. I testi restano originali nello storico e negli export, senza essere ricalcolati o aggiunti a report 3.0.0/3.1.0 durante l'apertura; il renderer tollera campi facoltativi assenti o malformati senza modificare il record. I suggerimenti non costituiscono esercizi svolti o certificazioni.

## Storico, export e privacy

Lo storico resta nella chiave locale `aiSkillAssessmentHistory`, con limite di 100 record. Ogni record è apribile individualmente. Non vengono mostrate medie, graduatorie o delta fra report: nemmeno fra A/B/C o campioni tematici differenti. La firma serve a riconoscere identità di condizioni, non a dimostrare apprendimento.

La revisione globale di banca e forme delle milestone 18/19 cambia `comparisonKey` anche per i percorsi preesistenti. La M19 cambia inoltre gli item selezionati nel percorso Agents. Le versioni dei record salvati restano originali: nessuna migrazione o ricalcolo. Lo storico continua a distinguere formati didattici, evidence 3.x, legacy e sconosciuti.

I report 1.x/2.x riconoscibili mantengono dati, punteggi, etichette e raccomandazioni originali e mostrano un avviso di modello precedente. La vista può fornire valori vuoti per campi facoltativi assenti, senza modificare il record. L'apertura non salva una copia né ricalcola punteggi, raccomandazioni o confronti mancanti. L'interfaccia segue la preferenza manuale corrente o, in sua assenza, la lingua del report; domande, risposte e raccomandazioni archiviate conservano il testo originale, senza ritraduzione tramite la banca attuale. Il ritorno ai percorsi ripristina la lingua scelta dall'utente o il default del browser per il nuovo assessment.

Un formato futuro, sconosciuto o incompleto viene mostrato come dati originali esportabili. I record invalidi non impediscono l'apertura degli altri. Se il contenitore dello storico non è un array JSON valido o lo storage non è accessibile, il nuovo report resta visibile ma non sovrascrive lo storico. Un errore di quota mostra un avviso con invito a esportare. La cancellazione resta un'azione esplicita con conferma.

JSON esporta il record originale completo. Il CSV della 3.0.0 usa tre colonne stabili `type,field,value`, con percorsi come `meta.scoringVersion`, `answers.0.evidenceType` o `coverage.byEvidence.Q.valid`. Esporta anche dati legacy/sconosciuti senza riclassificarli. Questo formato sostituisce il precedente CSV a sezioni; un valore nullo è vuoto, uno zero resta `0`, e gli stati chiariscono le assenze. Array vuoti e oggetti vuoti sono rappresentati come `[]` e `{}`; virgole, virgolette e nuove righe vengono quotate. L'ordine e il nome dei campi tecnici non cambiano con la lingua; testi e risposte conservano la lingua registrata.

Non si aggiungono chiavi di tracking, draft di sessione, invii di risposte, API AI o risorse esterne automatiche. Gli export restano manuali. I report aggiungono classificazione, scelte grezze e dati necessari a spiegare il risultato; non raccolgono tempi, tasti o dati reali del dispositivo. I dati delle fixture sono tutti sintetici.

## Verifica e revisione del maintainer

Eseguire senza installazioni:

```powershell
node tests/assessment.test.mjs
```

Il test runner integrato di Node è usato direttamente per non richiedere la creazione di processi figli nel sandbox. I controlli coprono scoring, mappa, assenze, credito parziale, soglie, identità dei risultati, storico, export, auto-advance e composizione. L'adattatore DOM in memoria verifica produzione del markup e collegamento degli eventi, senza attestare layout o comportamento di un browser reale.

Verifica M18: **25 controlli passati**, **66 composizioni assessment** (11 modalità × IT/EN × A/B/C) e **6 forme didattiche**. Verificati matrice fissa, corrispondenza traduzioni/opzioni/crediti, risultati 100/50/0, pesi per obiettivo, assenze, avvio/completamento del nuovo percorso, ritorno Indietro, storico, JSON/CSV e bibliografia bilingue. Confronto aggiuntivo con `main` `27d6245`: testi, opzioni e mappa dei 115 item nelle sei forme, composizioni dei 60 percorsi precedenti e forme didattiche invariati. Nessun dato reale del browser è stato letto. Le risposte corrette risultano le più lunghe in 1/10, 2/10 e 1/10 casi IT e 4/10, 1/10 e 2/10 EN (A/B/C); il controllo è editoriale, non una verifica psicometrica.

Verifica M19: **30 controlli passati**, ancora **66 composizioni assessment e 6 forme didattiche**. Verificati due Q per A01–A05, livelli O/S, IT/EN e layout delle opzioni A/B/C, risultati 100/50/0, assenze, suggerimenti deduplicati e congelati nello storico, JSON/CSV, auto-advance/Indietro e bibliografia bilingue. Confronto con `main` `e28a0d2`: testi, alternative e mappa dei 125 item precedenti nelle sei forme, 60 composizioni non Agents e forme didattiche invariati. Risposta corretta più lunga in 2/10, 3/10, 1/10 casi IT e 3/10, 3/10, 2/10 EN; carico medio progettato di 85–91 parole per scenario incluse le alternative, durata stimata 8–12 minuti. Sono controlli editoriali, non equivalenza o durata misurate. Nessun dato reale del browser è stato letto.

Esempi da esaminare in [tests/fixtures/m17-reports.json](../tests/fixtures/m17-reports.json):

| Esempio sintetico | Risultato atteso |
| --- | --- |
| `knowledge-high-declared-low`, IT/A | F/U/A 100 con copertura parziale; D basso separato; H non esplorata |
| `declared-high-questions-low`, EN/B | F/U/A 0; D alto non modifica i quiz; contrasti testuali sugli obiettivi comuni |
| `agents-gap`, IT/A | F/U 100, A 0, H non esplorata; nessuna qualifica agentica o voto globale |
| `legacy-2x` | Punteggio 92 e profilo Champion conservati con avviso; fixture di formato, non una nuova valutazione |

Queste fixture non vengono caricate dall'app né inserite automaticamente nello storico. Sono esempi di formato e risultati consultabili dal maintainer.

Checklist manuale prima della chiusura della milestone:

1. Aprire `ai_skill_test.html` direttamente, poi la root `index.html`; controllare badge 3.2.0, descrizione e durata Agents aggiornate, assenza di errori e risorse tutte locali.
2. Rivedere tutte le varianti in [AGENTIC_WORKFLOWS_REVIEW.md](AGENTIC_WORKFLOWS_REVIEW.md) e completare casi Agents corretti/parziali/errati in IT e EN. Verificare utilità operativa, leggibilità delle tracce, auto-advance reversibile, copertura A, motivazioni, suggerimenti e fonti; nessuna qualifica di esecuzione pratica.
3. Provare un tematico con pochi Q: nessuna percentuale non sostenuta; area assente senza zero. Confermare multi/testo con Avanti e ritorno tramite Indietro.
4. Aprire report 2.x, 3.0.0 e 3.1.0 già presenti nello storico e poi un report nuovo. Verificare punteggi e suggerimenti originali, nessuna copia creata dalla sola apertura e nessuna media. Riprovare completo, AI moderne e Primi passi per confermare la continuità dei flussi.
5. Scaricare JSON/CSV nelle due lingue e verificarne campi/versioni, testo con virgole/virgolette/nuove righe e assenze distinte da zero.
6. Verificare bibliografia dalla landing e dai risultati; controllare con tastiera e viewport mobile schede, dettagli, storico e pulsanti.
7. Controllare traffico e console in un browser reale: nessun invio di risposte o caricamento esterno automatico. Verificare stampa e cancellazione esplicita dello storico.

Limite della verifica nell'ambiente di sviluppo: il tentativo di aprire il file locale con il runtime Browser restituisce ancora «No browser is available» nella M19. Apertura visiva, eventi reali, layout desktop/mobile, download, console e traffico non sono stati verificati dall'agente in un browser reale. Il maintainer ha approvato M17, M18 e M19 e autorizzato le rispettive release il `2026-11-25`; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione.
