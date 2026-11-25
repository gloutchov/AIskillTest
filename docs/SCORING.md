# Scoring e formato dei report 3.0.0

Implementazione della milestone 17, basata su [ASSESSMENT_BLUEPRINT.md](../ASSESSMENT_BLUEPRINT.md) `1.0.0` e sulla [mappa dei 115 item](ASSESSMENT_ITEM_MAP.md). Stato: approvata dal maintainer il `2026-11-25`, release `v3.0.0`.

## Evidenze e calcolo

- Q: knowledge, scenario, choice e multi attuali. Le alternative 1-5 diventano `(score - 1) / 4`. Le scelte multiple sommano crediti e penalità delle selezioni, dividono per i crediti positivi disponibili e limitano il rapporto a [0, 1], senza arrotondamento intermedio.
- D: tutti i likert. Conservano il valore dichiarato 1-5 e il testo scelto; `score`, `credit` e `maxCredit` sono `null`, `scored` è `false`.
- T: i quattro item testuali della banca. Testo e checklist restano formativi, con gli stessi valori nulli di D. Le keyword e le red flag delle rubriche esistenti non producono punti o verifiche automatiche di qualità.
- E: assente in questa milestone. `simulatedCases` è vuoto e il risultato simulato è `null`, non zero. Il laboratorio operativo arriverà nella milestone 21.

Il completo conserva 50 domande: 27 Q, 21 D e 2 T. I tematici restano da 10; banca, item e forme non sono stati revisionati. Primi passi conserva forme, unità didattiche e risultato autonomo.

La media dei Q validi e direttamente allineati si calcola prima per obiettivo; la media degli obiettivi presenti determina la percentuale d'area. Gli obiettivi non proposti non valgono zero. T10 storico è un quesito di supporto a F06: mostra il proprio credito, ma resta fuori da media e copertura dell'area.

Le aree sono F (fondamenti), U (uso operativo e multimodale), A (agenti), H (harness). Non esistono indice globale, profili Beginner/Curious/Expert/Champion, gap numerico fra dichiarazioni e prove o media fra Q/D/T/E nei nuovi report.

## Copertura e assenze

| Condizione sui Q diretti | Risultato |
| --- | --- |
| Nessun Q valido | Percentuale `null`, non esplorata; eventuali risposte mancanti/non valide indicate |
| Meno di 3 Q validi o meno di 2 obiettivi | Esiti degli item, evidenza limitata; nessuna percentuale d'area |
| Almeno 3 Q e 2 obiettivi | Percentuale con copertura parziale |
| Almeno 6 Q, tutti gli obiettivi dell'area, nessuna risposta Q diretta mancante/non valida e nessuna domanda prevista assente | Copertura prevista raggiunta e fascia editoriale |

Solo con copertura raggiunta: sotto 40 da riprendere, da 40 a meno di 70 in consolidamento, da 70 buon esito nei quesiti. Sono scelte editoriali, non soglie psicometriche. La banca attuale non verifica direttamente tutti i 25 obiettivi: la m17 non può mostrare copertura piena solo perché un completo è stato terminato.

Le risposte hanno stato `valid`, `missing` o `invalid`. Un indice fuori range, un booleano al posto di una scelta o selezioni duplicate non diventano risposte errate a zero. Una risposta corretta esclusa per mancanza di copertura resta consultabile nel dettaglio. D e stime iniziali non alzano Q; un contrasto testuale si mostra solo fra D alto e Q debole sullo stesso obiettivo, senza sottrarre scale diverse.

## Schema e versioni

`assets/assessment.js` contiene regole pure, catalogo bilingue degli obiettivi e metadati dei 115 item; `assets/report-ui.js` mostra i risultati. Sono script classici locali, senza dipendenze, build, fetch o valutatori remoti. Le assegnazioni della mappa sono metadati di scoring: la loro modifica richiede di rivedere `scoringVersion`, anche senza cambiare il testo degli item.

| Campo | Contenuto |
| --- | --- |
| `meta.assessmentVersion` | `3.0.0`, versione dell'app |
| `meta.scoringVersion` | `3.0.0`, versione del calcolo |
| `meta.reportSchemaVersion` | `3`, formato del report assessment |
| `meta.blueprintVersion` | `1.0.0`, contratto approvato |
| `meta.questionBankVersion`, `meta.formVersion` | Invariate: `2026.07-m7`, `1.3` |
| `meta.language`, `languageSource`, `formId`, `testMode` | Lingua/origine, forma A/B/C, modalità e quantità |
| `meta.comparisonKey` | Firma locale di versioni, modalità, lingua, forma e identità/classificazione degli item ordinati; non contiene risposte o dati personali |
| `answers[]` | Identità e versione dell'item, tipo Q/D/T, area, obiettivo, tag, livello, allineamento, formato, stato, risposta grezza e leggibile, credito e feedback |
| `results.knowledgeByArea` | Percentuale eventuale, stato di copertura, fascia eventuale e crediti per obiettivo |
| `results.declaredPractices`, `declaredContrasts`, `formativeFeedback` | Dichiarazioni, obiettivi del confronto testuale e checklist formative |
| `results.simulatedCases`, `simulatedSummary` | Nessun caso; valore simulato `null` e stato non esplorato |
| `coverage` | Quantità previste/proposte/valide/mancanti/non valide per tipo e area; obiettivi presenti/assenti e casi |
| `criticalFindings` | Vuoto nella m17: nessun flag di errore critico è stato inventato retroattivamente per gli item attuali |

`answers[].score` è un alias del credito Q 0-1, nullo per D/T; non è la scala 1-5 dei report 2.x. `slotId` è assente perché gli slot C01-C50 non sono ancora stati applicati agli item. Primi passi non usa lo schema assessment 3 o lo scoring 3.0.0: mantiene il proprio contratto didattico, con la versione dell'app nei metadati.

## Storico, export e privacy

Lo storico resta nella chiave locale `aiSkillAssessmentHistory`, con limite di 100 record. Ogni record è apribile individualmente. Non vengono mostrate medie, graduatorie o delta fra report: nemmeno fra A/B/C o campioni tematici differenti. La firma serve a riconoscere identità di condizioni, non a dimostrare apprendimento.

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

Esempi da esaminare in [tests/fixtures/m17-reports.json](../tests/fixtures/m17-reports.json):

| Esempio sintetico | Risultato atteso |
| --- | --- |
| `knowledge-high-declared-low`, IT/A | F/U/A 100 con copertura parziale; D basso separato; H non esplorata |
| `declared-high-questions-low`, EN/B | F/U/A 0; D alto non modifica i quiz; contrasti testuali sugli obiettivi comuni |
| `agents-gap`, IT/A | F/U 100, A 0, H non esplorata; nessuna qualifica agentica o voto globale |
| `legacy-2x` | Punteggio 92 e profilo Champion conservati con avviso; fixture di formato, non una nuova valutazione |

Queste fixture non vengono caricate dall'app né inserite automaticamente nello storico. Sono esempi di formato e risultati consultabili dal maintainer.

Checklist manuale prima della chiusura della milestone:

1. Aprire `ai_skill_test.html` direttamente, poi la root `index.html`; controllare badge 3.0.0, assenza di errori e risorse tutte locali.
2. Completare una forma IT e una EN, includendo Q errati, D alti e testo composto solo da keyword. Verificare copertura, feedback T senza punti, lacuna Agents e assenza di indice/profili globali.
3. Provare un tematico con pochi Q: nessuna percentuale non sostenuta; area assente senza zero. Confermare multi/testo con Avanti e ritorno tramite Indietro.
4. Aprire un report 2.x già presente nello storico e poi un report nuovo. Verificare punteggi e raccomandazioni originali, nessuna copia creata dalla sola apertura e nessuna media.
5. Scaricare JSON/CSV nelle due lingue e verificarne campi/versioni, testo con virgole/virgolette/nuove righe e assenze distinte da zero.
6. Verificare bibliografia dalla landing e dai risultati; controllare con tastiera e viewport mobile schede, dettagli, storico e pulsanti.
7. Controllare traffico e console in un browser reale: nessun invio di risposte o caricamento esterno automatico. Verificare stampa e cancellazione esplicita dello storico.

Limite della verifica nell'ambiente di sviluppo: runtime Browser senza browser disponibile. Apertura visiva, eventi reali, layout desktop/mobile, download, console e traffico non sono stati verificati dall'agente in un browser reale. Il maintainer ha approvato la milestone e autorizzato commit, merge, push e tag il `2026-11-25`; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione.
