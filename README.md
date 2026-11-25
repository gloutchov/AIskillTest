# AI Skill & Adoption Assessment

## Italiano

Questionario interattivo in italiano e inglese per esplorare conoscenze, giudizio su scenari e pratiche dichiarate nell’uso della GenAI.

L'assessment produce un quadro delle evidenze: conoscenze/scenari, pratiche dichiarate, testi con feedback ed esiti simulati restano separati, con copertura e limiti per area. È pensato come strumento diagnostico interno e migliorabile, non come test psicometrico validato.

Versione corrente dell'app: `3.4.0`, milestone 21 approvata dal maintainer il `2026-11-25`. Release precedente: `3.3.0` (milestone 20).

Tag di riferimento: `v3.4.0`.

### Nota sullo sviluppo

Questo test è stato realizzato in vibecoding, usando l'AI come supporto operativo per ideazione, sviluppo, revisione e affinamento dell'esperienza.

### Contenuto del repository

- `ai_skill_test.html`: shell HTML dell'applicazione.
- `assets/styles.css`: stili dell'interfaccia.
- `assets/questions.js`: banca domande, forme parallele e override.
- `assets/i18n.js`: testi localizzati, traduzione inglese della banca domande e varianti form-specific.
- `assets/learning.js`: forme A/B/C e unità didattiche del percorso introduttivo.
- `assets/modern-ai.js`: scenari originali AI moderne, varianti A/B/C IT/EN, motivazioni e fonti.
- `assets/agentic-workflows.js`: tracce ipotetiche del percorso Agents, varianti A/B/C IT/EN, motivazioni, suggerimenti e fonti.
- `assets/harness.js`: scenari del percorso Harness, varianti A/B/C IT/EN, motivazioni, suggerimenti e fonti.
- `assets/operational-lab.js`: casi sintetici, scelte stabili e regole pure del laboratorio.
- `assets/lab-ui.js`: simulatore locale, bozza recuperabile e report E.
- `docs/OPERATIONAL_LAB_REVIEW.md`: varianti IT/EN, rubriche, stato, privacy e checklist M21.
- `assets/app.js`: navigazione client-side, storico, dashboard legacy/didattica ed export.
- `assets/assessment.js`: regole pure dello scoring 3.x e metadati degli item.
- `assets/report-ui.js`: quadro delle evidenze IT/EN.
- `docs/SCORING.md`: scoring, schema, compatibilità e verifiche delle milestone 17-21.
- `docs/MODERN_AI_REVIEW.md`: revisione delle 30 varianti bilingui, crediti e fonti della milestone 18.
- `docs/AGENTIC_WORKFLOWS_REVIEW.md`: revisione delle 30 varianti bilingui con tracce, crediti e fonti della milestone 19.
- `docs/HARNESS_REVIEW.md`: revisione delle 30 varianti bilingui Harness, con crediti, motivazioni e fonti della milestone 20.
- `tests/assessment.test.mjs`: controlli deterministici senza dipendenze.
- `aiskilltest_icon.png`: icona del sito e dei collegamenti salvati su dispositivo.
- `scripts/build-learning-data.mjs`: genera l'asset didattico dal blueprint senza dipendenze.
- `scripts/build-modern-ai-review.mjs`: rigenera la documentazione di revisione dagli scenari; facoltativo, non serve all'app.
- `scripts/build-agentic-review.mjs`: rigenera la revisione Agents dagli scenari; facoltativo, non serve all'app.
- `scripts/build-harness-review.mjs`: rigenera la revisione Harness; facoltativo, non serve all'app.
- `LEARNING_PATH.md`: blueprint bilingue del percorso introduttivo pianificato, con domande, unità didattiche e fonti.
- `ASSESSMENT_BLUEPRINT.md`: blueprint approvato della milestone 16 per competenze, prove, risultati e compatibilità dello storico della futura serie 3.x.
- `docs/ASSESSMENT_ITEM_MAP.md`: classificazione dei 145 quesiti e delle sei decisioni E per tipo di evidenza, area e obiettivo.
- `PLAN.md`: roadmap, stato delle milestone e criteri di validazione e release.
- `index.html`: pagina di ingresso che rimanda al test.
- `LICENSE`: licenza Apache 2.0.

### Come usarlo

Apri `ai_skill_test.html` in un browser moderno. Non servono build, dipendenze o server.

La lingua iniziale segue le impostazioni del browser: italiano se il browser è in italiano; inglese se il browser è in inglese o in qualunque altra lingua. Il selettore `IT` / `EN` nella home consente il cambio manuale e salva la preferenza nel `localStorage`. Per evitare report misti, il cambio lingua va fatto prima di iniziare un assessment.

La home mostra un carosello con test completo e percorsi tematici. Il carosello avanza automaticamente ogni 5 secondi e resta controllabile con frecce, indicatori, swipe touch e pulsante `Pausa`.

Durante il test, le domande a scelta singola avanzano automaticamente dopo la selezione. Domande a scelta multipla e prove testuali richiedono il pulsante `Avanti`. Nel Laboratorio operativo occorrono sempre conferma esplicita dell’azione e Avanti. Il pulsante `Interrompi il test` annulla la sessione corrente, previa conferma, e torna alla home senza salvare un report.

Nelle domande dichiarative, le alternative restano senza livelli numerici e sono presentate in ordine casuale per favorire la lettura del comportamento descritto. Il comando `Mostra i dettagli` chiarisce le differenze tra applicazione con supporto, autonomia caso per caso, metodo stabile e pratica verificata e condivisibile.

### Cosa misura

L'assessment combina autovalutazione, scenari, quiz tecnici e prove pratiche su:

- AI Literacy: funzionamento, limiti, dati, fonti, privacy e affidabilità della GenAI.
- Fondamenti LLM: token, contesto, inferenza, Transformer, allucinazioni, RAG, embedding e citazioni.
- AI moderne: capacità multimodali, ricerca documentale/web, scelta di strumenti e configurazioni, verifica degli artefatti e perimetro dei dati.
- AI Agents: scelta fra workflow, agente singolo o più agenti; tool ed esiti, supervisione, istruzioni non fidate, diagnosi, memoria/stato, log e rollback.
- Harness: componenti di esecuzione, contesto e consegne, API/MCP/skill/istruzioni, controlli effettivi, checkpoint, ripresa e valutazione.
- AI Fluency: Delegation, Description, Discernment e Diligence.
- Mindset: apertura alla sperimentazione, fiducia calibrata e adozione responsabile.
- Practical Lab: quiz su scelte ipotetiche e prompt con checklist formative; nessuna esecuzione simulata.
- Laboratorio operativo: 2 casi sintetici, 6 decisioni E, calcolatore e artefatto modificabili, mandato/checkpoint e ripresa locale; credito parziale, criticità e bozza recuperabile.

Modalità disponibili:

- Primi passi con l'AI: 10 domande guidate e tutorial personalizzato.
- Test completo: 50 domande.
- Literacy: 10 domande.
- Fondamenti tecnici LLM: 10 domande.
- AI moderne: 10 scenari con copertura fissa, durata stimata 8-12 minuti.
- AI Agents: 10 scenari con copertura fissa, durata stimata 8-12 minuti.
- Harness: 10 scenari con copertura fissa, durata stimata 8-12 minuti.
- Fluency - Delegation: 10 domande.
- Fluency - Description: 10 domande.
- Fluency - Discernment: 10 domande.
- Fluency - Diligence: 10 domande.
- Mindset: 10 domande.
- Practical Lab: 10 domande.
- Laboratorio operativo: 2 casi, 6 decisioni E.

La banca contiene 145 domande base: le 115 originarie, 10 slot AI moderne, 10 Agents e 10 Harness, ciascuno dei nuovi slot con tre varianti bilingui. Il test completo resta a 50 domande e include gli stessi 4 item Agents originari. Le 15 domande AG1–AG15 restano disponibili nella banca, ma il percorso Agents usa i dieci slot AW01–AW10 con copertura vincolata. Le sessioni ruotano tra forme A/B/C separatamente per lingua e modalità.

AI moderne seleziona sempre U01×2, U02×2 e U03–U08×1. Comprende immagini/scansioni/grafici, audio/video, comprensione rispetto a generazione o azione, scelta fra capacità e strumenti, brief, controlli e adozione. Le configurazioni sono ipotetiche e contengono tutti i vincoli necessari; non richiedono nomi o listini a memoria. I risultati mostrano la motivazione della scelta effettuata e letture facoltative. Il percorso valuta decisioni su scenari, senza osservare esecuzione pratica. Equivalenza delle forme e durata sono editoriali, non validate empiricamente.

AI Agents seleziona due scenari per ciascuno degli obiettivi A01–A05: processo, tool/argomenti/esiti, supervisione, istruzioni non fidate/divulgazione e diagnosi/stop. Mandati e brevi tracce forniscono tutti i dati necessari: nessun servizio viene eseguito o collegato. Il risultato distingue giudizio su scenario da esecuzione pratica e, con dieci risposte valide, può raggiungere la copertura prevista di A. Motivazioni e suggerimenti di approfondimento restano locali; crediti, livelli e durata sono editoriali. Tutte le varianti sono nel [documento di revisione Agents](docs/AGENTIC_WORKFLOWS_REVIEW.md).

Harness seleziona sempre H01, H02×2, H03×2, H04×2, H05×2 e H06, tutti Q di livello S. I termini tecnici sono spiegati nei casi e nel feedback; non servono installazioni o credenziali. Il percorso può raggiungere la copertura prevista di H con dieci risposte valide, ma non certifica capacità di costruire o amministrare un harness. Le tracce restano testo ipotetico, senza esecuzioni reali o simulate E. [Scenari e motivazioni bilingui](docs/HARNESS_REVIEW.md).

`Primi passi con l'AI` è un'esperienza di apprendimento, non un assessment comparabile con gli altri risultati. Usa tre forme da 10 domande e propone spiegazioni locali e letture facoltative. I link esterni si aprono soltanto dopo un click esplicito.

Il completo mantiene 50 domande: 27 quiz/scenari, 21 dichiarazioni e 2 testi formativi. Le sei decisioni E sono nel solo Laboratorio operativo, separato dal completo. Le aree di risultato sono Fondamenti, Uso operativo e multimodale, Agenti e Harness; le coperture moderne ancora mancanti sono indicate.

Le percentuali usano soltanto quiz e scenari direttamente pertinenti, con peso uguale per obiettivo. Servono almeno 3 quesiti validi e 2 obiettivi per mostrare una percentuale d'area; le fasce editoriali richiedono almeno 6 quesiti e tutti gli obiettivi dell'area. Dichiarazioni e stime iniziali non modificano i quiz. I testi aperti offrono checklist formative senza scoring lessicale.

I nuovi report non producono indice globale, quadrante, radar o profili Beginner/Curious/Expert/Champion. Nei tematici sono mostrati solo risultati sostenuti dalle evidenze presenti, con le altre aree dichiarate non esplorate. Regole, metadati, limiti e checklist di verifica sono in [docs/SCORING.md](docs/SCORING.md).

### Laboratorio operativo (M21)

Due casi, in IT/EN e A/B/C: verifica di un riepilogo (300/100/50 secondo la forma) e ripresa di un’attività agentica con ricevuta. Ogni decisione richiede conferma e Avanti. Puoi invertire verifica e calcolo, modificare l’artefatto e rivedere le azioni prima del report. La modifica del calcolo richiede una nuova conferma della consegna. Crediti e motivazioni appaiono al termine: 0/1/2 per decisione, massimo 6 per caso e 12 totali, separati da Q. E percentuale solo con entrambi i casi completi; un errore critico prevale sulla fascia, conservando i punti. Sono esiti simulati senza qualifica operativa.

La banca conserva 145 quesiti Q/D/T e aggiunge sei unità E separate: 151 ID classificati, quattordici percorsi inclusi Primi passi. Durata laboratorio 12–16 minuti stimata, non misurata. [Varianti, regole e validazione](docs/OPERATIONAL_LAB_REVIEW.md).

### Privacy e dati

L'applicazione è client-side. Dati facoltativi, risposte e report restano nel browser dell'utente tramite `localStorage`, salvo esportazione manuale dei report.

Lo step iniziale consente di inserire nome, ruolo, area/team e autovalutazione delle skill. Tutti questi dati sono facoltativi. L'app non invia automaticamente dati a server esterni, non contiene analytics e non richiede account.

Una sola bozza incompleta del laboratorio è conservata in `aiSkillOperationalLabDraft`, distinta dallo storico: versioni, lingua, forma, posizione, ordine e decisioni confermate; nessun dato del profilo o log dei tentativi. La home permette Riprendi/Elimina bozza; Interrompi confermato, completamento o Cancella dati locali la eliminano. Bozze incompatibili non vengono ricalcolate. Gli errori di salvataggio/cancellazione sono segnalati; da `file://` la persistenza varia per browser. I report schema 3/scoring 3.0 rimangono originali; i nuovi report schema 4/scoring 3.1 includono casi, effetti e criticità E senza migrare lo storico.

### Export e storico

- JSON: contiene il record completo originale, con versioni di app/scoring/schema/blueprint, lingua, modalità, forma, evidenze, copertura e risposte.
- CSV: formato `type,field,value` con percorsi di campo stabili, compresi metadati, risposte, evidenze e copertura; sostituisce il precedente CSV a sezioni.
- Storico locale: conserva fino a 100 report apribili singolarmente. I report 2.x restano originali con avviso, senza ricalcolo, medie o confronti diretti con 3.x. Formati sconosciuti sono consultabili ed esportabili senza alterare i dati.

Gli export sono sempre azioni manuali dell'utente. Se lo storico è danneggiato o la quota del browser è esaurita, un avviso invita a esportare il report corrente senza sovrascrivere i dati precedenti.

Gli item AI moderne, Agents e Harness salvano contesto e domanda completi, motivazione della scelta e riferimenti alle fonti anche negli export. Nei nuovi scenari Agents e Harness il report conserva inoltre suggerimenti per gli obiettivi con almeno una scelta parziale o errata, deduplicati per obiettivo. I report 3.0.0/3.1.0/3.2.0 restano originali e leggibili, senza aggiungere suggerimenti ricavati dalla banca corrente. La nuova banca e la nuova forma producono una diversa firma di confronto anche nei percorsi preesistenti; non si ricalcolano lo storico o le sue versioni.

### Sito pubblico

L'applicazione è disponibile all'indirizzo:

- [https://aiskilltest.glaucosilvestri.it](https://aiskilltest.glaucosilvestri.it)

Il file `CNAME` associa il dominio personalizzato al progetto. `index.html` reindirizza automaticamente a `ai_skill_test.html`, quindi la root del sito funziona senza build step.

L'icona a forma di casa accanto al selettore della lingua rimanda al sito principale [glaucosilvestri.it](https://www.glaucosilvestri.it).

### Versioning

- Versione app: `3.4.0`.
- Tag Git: `v3.4.0`.
- Banca domande: `2026.11-m21`.
- Forma assessment: `1.7`.
- Scoring: `3.1.0`; schema report `4`; blueprint `1.0.0`; casi/laboratorio `1.0.0`.
- Banca Primi passi: `2026.07-first-steps-1`.
- Forma Primi passi: `first-steps-1.0`.

I tag seguono il formato `vX.Y.Z`. Le modifiche patch aggiornano documentazione o correzioni piccole; le modifiche minor o major introducono cambiamenti funzionali più ampi.

### Progettazione dell'aggiornamento 3.x

La milestone 16 definisce il [blueprint delle competenze e della valutazione](ASSESSMENT_BLUEPRINT.md) `1.0.0`, approvato dal maintainer il `2026-11-25`, con la [mappa degli item](docs/ASSESSMENT_ITEM_MAP.md), inizialmente 115, ora 145 quesiti più sei decisioni E. Il blueprint distingue conoscenze/scenari, pratiche dichiarate, esercizi simulati e testi con feedback; definisce copertura, rubriche, percorsi futuri e conservazione dei report 2.x senza ricalcolo. Matrice, soglie, tempi e terminologia sono scelte editoriali da verificare durante l'implementazione.

La milestone 17 introduce il nuovo modello di valutazione nella release `3.0.0`, approvata il `2026-11-25`, senza revisionare banca e forme. La milestone 18 aggiunge AI moderne nella release `3.1.0`, approvata dal maintainer il `2026-11-25`: il completo e i nove tematici preesistenti mantengono testi e composizioni. Il laboratorio e l'integrazione del completo seguono nelle milestone 19-22 di [PLAN.md](PLAN.md). [Documento di revisione](docs/MODERN_AI_REVIEW.md).

La milestone 19 introduce la revisione Agents nella release `3.2.0`, approvata dal maintainer il `2026-11-25`. La milestone 20 introduce Harness nella release `3.3.0`, approvata dal maintainer il `2026-11-25`; il completo resta invariato. La M21 implementa il Laboratorio operativo nella release `3.4.0`, approvata dal maintainer il `2026-11-25`; la M22 non è avviata.

### Verifica locale

Eseguire `node --test --test-isolation=none tests/assessment.test.mjs tests/operational-lab.test.mjs`. Non servono installazioni; controlli e limiti del test senza browser sono in [docs/SCORING.md](docs/SCORING.md).

### Riferimenti

- Datapizza, [AI Adoption Assessment: misurare la GenAI in azienda](https://datapizza.tech/it/blog/ai-adoption-assessment-misurare-la-genai-in-azienda)
- Davis, [Technology Acceptance Model](https://www.jstor.org/stable/249008)
- Venkatesh et al., [Unified Theory of Acceptance and Use of Technology](https://www.researchgate.net/publication/220259897_User_Acceptance_of_Information_Technology_Toward_a_Unified_View)
- Bandura, [Guide for Constructing Self-Efficacy Scales](https://www.emerald.com/books/edited-volume/18068/chapter-abstract/101339715/Guide-for-Constructing-Self-Efficacy-Scales)
- Rick Dakan e Joseph Feller, [AI Fluency Framework](https://aifluencyframework.org/)
- Ethan Mollick, [Management as an AI Superpower](https://www.oneusefulthing.org/p/management-as-ai-superpower)
- Google for Developers, [Large Language Models](https://developers.google.com/machine-learning/crash-course/llm)
- Google for Developers, [Neural Networks](https://developers.google.com/machine-learning/crash-course/neural-networks)
- Google for Developers, [Embeddings](https://developers.google.com/machine-learning/crash-course/embeddings)
- Google Cloud, [What are AI hallucinations?](https://cloud.google.com/discover/what-are-ai-hallucinations)
- Microsoft Learn, [Retrieval-Augmented Generation overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)
- Vaswani et al., [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

### Licenza

Distribuito con licenza Apache 2.0. Vedi `LICENSE`.

---

## English

Interactive questionnaire in Italian and English exploring GenAI knowledge, judgment on scenarios, and self-reported practices.

The assessment produces an evidence overview: knowledge/scenarios, self-reported practices, text with feedback, and simulated outcomes remain separate, with area coverage and limits. It is intended as an internal diagnostic tool that can evolve over time, not as a psychometrically validated test.

Current app version: `3.4.0`, milestone 21 approved by the maintainer on `2026-11-25`. Previous release: `3.3.0` (milestone 20).

Reference tag: `v3.4.0`.

### Development Note

This test was built through vibecoding, using AI as operational support for ideation, development, review, and experience refinement.

### Repository Contents

- `ai_skill_test.html`: application HTML shell.
- `assets/styles.css`: interface styles.
- `assets/questions.js`: question bank, parallel forms, and overrides.
- `assets/i18n.js`: localized texts, English question-bank translation, and form-specific variants.
- `assets/learning.js`: A/B/C forms and learning units for the introductory path.
- `assets/modern-ai.js`: original Modern AI scenarios, IT/EN A/B/C variants, rationales, and sources.
- `assets/agentic-workflows.js`: hypothetical Agents traces, IT/EN A/B/C variants, rationales, suggestions, and sources.
- `assets/harness.js`: Harness scenarios, IT/EN A/B/C variants, rationales, suggestions, and sources.
- `assets/operational-lab.js`: synthetic cases, stable choices, and pure lab rules.
- `assets/lab-ui.js`: local simulator, recoverable draft, and E reporting.
- `docs/OPERATIONAL_LAB_REVIEW.md`: IT/EN variants, rubrics, state, privacy, and M21 checklist.
- `assets/app.js`: client-side navigation, history, legacy/learning dashboards, and export.
- `assets/assessment.js`: pure 3.x scoring rules and item metadata.
- `assets/report-ui.js`: IT/EN evidence overview.
- `docs/SCORING.md`: scoring, schema, compatibility, and milestone 17-20 verification.
- `docs/MODERN_AI_REVIEW.md`: review of all 30 bilingual variants, credits, and milestone 18 sources.
- `docs/AGENTIC_WORKFLOWS_REVIEW.md`: review of all 30 bilingual milestone 19 variants with traces, credits, and sources.
- `docs/HARNESS_REVIEW.md`: review of all 30 bilingual milestone 20 Harness variants, credits, rationales, and sources.
- `tests/assessment.test.mjs`: dependency-free deterministic checks.
- `aiskilltest_icon.png`: site icon and saved-link icon on supported devices.
- `scripts/build-learning-data.mjs`: generates the learning asset from the blueprint without dependencies.
- `scripts/build-modern-ai-review.mjs`: regenerates review documentation from the scenarios; optional, not required by the app.
- `scripts/build-agentic-review.mjs`: regenerates Agents review documentation; optional, not required by the app.
- `scripts/build-harness-review.mjs`: regenerates Harness review documentation; optional, not required by the app.
- `LEARNING_PATH.md`: bilingual blueprint for the planned introductory path, including questions, learning units, and sources.
- `ASSESSMENT_BLUEPRINT.md`: approved milestone 16 blueprint for competencies, evidence, results, and history compatibility in the future 3.x series.
- `docs/ASSESSMENT_ITEM_MAP.md`: classification of all 145 current items by evidence type, primary area, and objective.
- `PLAN.md`: roadmap, milestone status, and validation and release criteria.
- `index.html`: entry page that redirects to the test.
- `LICENSE`: Apache 2.0 license.

### How To Use It

Open `ai_skill_test.html` in a modern browser. No build, dependency, or server is required.

The initial language follows the browser settings: Italian if the browser is in Italian; English if the browser is in English or any other language. The `IT` / `EN` selector on the home page allows manual switching and stores the preference in browser `localStorage`. To avoid mixed-language reports, switch language before starting an assessment.

The home page shows a carousel with the full test and thematic paths. The carousel advances automatically every 5 seconds and remains controllable through arrows, indicators, touch swipe, and the `Pause` button.

During the test, single-choice questions advance automatically after selection. Multiple-choice questions and text tasks still require the `Next` button. Operational lab decisions always require explicit action confirmation followed by Next. The `Interrupt test` button cancels the current session after confirmation and returns to the home page without saving a report.

In declarative questions, options remain unnumbered and are presented in random order to encourage reading the described behavior. The `Show details` control clarifies the differences between applying something with support, working independently case by case, using a stable method, and maintaining a verified, shareable practice.

### What It Measures

The assessment combines self-evaluation, scenarios, technical quizzes, and practical tasks on:

- AI Literacy: GenAI mechanics, limits, data, sources, privacy, and reliability.
- LLM foundations: tokens, context, inference, Transformers, hallucinations, RAG, embeddings, and citations.
- Modern AI: multimodal capabilities, document/web search, tool and configuration selection, artifact checks, and data boundaries.
- AI Agents: choosing a workflow, one agent, or multiple agents; tools and outcomes, supervision, untrusted instructions, diagnosis, memory/state, logs, and rollback.
- Harness: execution components, context and handoffs, APIs/MCP/skills/instructions, effective controls, checkpoints, recovery, and evaluation.
- AI Fluency: Delegation, Description, Discernment, and Diligence.
- Mindset: openness to experimentation, calibrated trust, and responsible adoption.
- Practical Lab: hypothetical-choice questions and prompts with formative checklists; no simulated execution.
- Operational lab: 2 synthetic cases and 6 E decisions, an editable calculation/artifact, checkpoint recovery, partial credit, critical findings, and a local draft.

Available modes:

- AI First Steps: 10 guided questions and a personalized tutorial.
- Full test: 50 questions.
- Literacy: 10 questions.
- LLM technical foundations: 10 questions.
- Modern AI: 10 scenarios with fixed coverage, estimated duration 8-12 minutes.
- AI Agents: 10 scenarios with fixed coverage, estimated duration 8-12 minutes.
- Harness: 10 scenarios with fixed coverage, estimated duration 8-12 minutes.
- Fluency - Delegation: 10 questions.
- Fluency - Description: 10 questions.
- Fluency - Discernment: 10 questions.
- Fluency - Diligence: 10 questions.
- Mindset: 10 questions.
- Practical Lab: 10 questions.
- Operational lab: 2 cases, 6 E decisions.

The bank contains 145 base questions: the original 115 items, 10 Modern AI slots, 10 Agents slots, and 10 Harness slots, each new slot with three bilingual variants. The full test remains at 50 questions and includes the same 4 original Agents items. The 15 AG1–AG15 questions remain in the bank, but the Agents path uses the ten AW01–AW10 slots with fixed coverage. Sessions rotate across A/B/C forms separately by language and test mode.

Modern AI always selects U01×2, U02×2, and U03–U08×1. It covers images/scans/charts, audio/video, understanding versus generation or action, capability and tool selection, briefs, checks, and adoption. Configurations are hypothetical and supply all required constraints; no product names or price lists need memorizing. Results show a rationale for the selected choice and optional readings. This path assesses decisions on scenarios without observing practical execution. Form equivalence and timing are editorial, not empirically validated.

AI Agents selects two scenarios for each A01–A05 objective: process, tool/arguments/outcomes, supervision, untrusted instructions/disclosure, and diagnosis/stopping. Scopes and short traces provide all necessary data: no service is executed or connected. Results distinguish scenario judgment from practical execution and can reach planned A coverage with ten valid answers. Rationales and follow-up suggestions remain local; credits, levels, and timing are editorial. All variants are in the [Agents review document](docs/AGENTIC_WORKFLOWS_REVIEW.md).

Harness always selects H01, H02×2, H03×2, H04×2, H05×2, and H06, all level-S Q. Technical terms are explained in cases and feedback; no installation or credentials are needed. The path can reach planned H coverage with ten valid answers but does not certify ability to build or administer a harness. Traces remain hypothetical text without real execution or simulated E exercises. [Bilingual scenarios and rationales](docs/HARNESS_REVIEW.md).

`AI First Steps` is a learning experience, not an assessment comparable with the other results. It uses three 10-question forms and provides local explanations and optional readings. External links open only after an explicit click.

The full test keeps 50 questions: 27 knowledge/scenarios, 21 self-reports, and 2 formative texts. The six E decisions are in the separate Operational lab path. Result areas are Foundations, Operational and multimodal use, Agents, and Harnesses; missing modern coverage is identified.

Percentages use only directly relevant questions/scenarios, with equal weight per objective. An area percentage requires at least 3 valid questions and 2 objectives; editorial bands require at least 6 questions and all area objectives. Self-reports and initial estimates do not change question results. Open text receives formative checklists without keyword scoring.

New reports produce no global index, quadrant, radar, or Beginner/Curious/Expert/Champion profile. Thematic paths show only results supported by collected evidence, identifying other areas as not assessed. Rules, metadata, limitations, and the verification checklist are documented in [docs/SCORING.md](docs/SCORING.md).

### Operational Lab (M21)

Two cases, in IT/EN and A/B/C: summary verification (300/100/50 by form) and agentic recovery using a receipt. Every decision requires confirmation and Next. Verification and calculation may be swapped; artifacts and actions can be revised before reporting. Changing the calculation requires delivery to be confirmed again. Credits and feedback appear at completion: 0/1/2 per decision, up to 6 per case and 12 total, separate from Q. An E percentage requires both complete cases; critical errors override the band while retaining points. These are simulated outcomes without an operational qualification.

The bank retains 145 Q/D/T questions plus six separate E units: 151 classified IDs, fourteen paths including First Steps. Estimated lab duration is 12–16 minutes, without empirical timing validation. [Variants, rules, and validation](docs/OPERATIONAL_LAB_REVIEW.md).

### Privacy And Data

The application is fully client-side. Optional profile data, answers, and reports remain in the user's browser through `localStorage`, unless the user manually exports reports.

The initial step can collect name, role, area/team, and self-assessed skills. All fields are optional. The app does not automatically send data to external servers, contains no analytics, and requires no account.

One incomplete lab draft is retained in `aiSkillOperationalLabDraft`, separate from history: versions, language, form, position, order, and confirmed choices; no profile data or attempt log. The home page offers Resume/Discard; confirmed Interrupt, completion, or Clear local data deletes it. Incompatible drafts are not recalculated. Storage/removal failures are reported; `file://` persistence varies by browser. Schema 3/scoring 3.0 reports remain original; new schema 4/scoring 3.1 records add cases, effects, and E findings without migrating history.

### Export And History

- JSON: includes the complete original record, with app/scoring/schema/blueprint versions, language, mode, form, evidence, coverage, and answers.
- CSV: uses `type,field,value` with stable field paths for metadata, answers, evidence, and coverage; replaces the previous section-based CSV.
- Local history: keeps up to 100 individually openable reports. Reports from 2.x remain original with a notice, without recalculation, averaging, or direct comparison with 3.x. Unknown formats can be inspected and exported without altering data.

Exports are always explicit user actions. If history is damaged or browser storage is full, a notice asks the user to export the current report without overwriting previous data.

Modern AI, Agents, and Harness items store the full context and question, selected-choice rationale, and source references in exports too. For new Agents and Harness scenarios, reports also retain suggestions for objectives with at least one partial or incorrect choice, deduplicated by objective. Reports from 3.0.0/3.1.0/3.2.0 remain original and readable without adding suggestions from the current bank. The new bank and form create a different comparison signature even for existing paths; history and its version metadata are never recalculated.

### Public Website

The application is available at:

- [https://aiskilltest.glaucosilvestri.it](https://aiskilltest.glaucosilvestri.it)

The `CNAME` file associates the custom domain with the project. `index.html` automatically redirects to `ai_skill_test.html`, so the site root works without a build step.

The home icon next to the language selector links to the main website, [glaucosilvestri.it](https://www.glaucosilvestri.it).

### Versioning

- App version: `3.4.0`.
- Git tag: `v3.4.0`.
- Question bank: `2026.11-m21`.
- Assessment form: `1.7`.
- Scoring: `3.1.0`; report schema `4`; blueprint `1.0.0`; cases/lab `1.0.0`.
- First Steps bank: `2026.07-first-steps-1`.
- First Steps form: `first-steps-1.0`.

Tags follow the `vX.Y.Z` format. Patch releases cover documentation or small fixes; minor and major releases introduce broader functional changes.

### Planning The 3.x Update

Milestone 16 defines the [competency and assessment blueprint](ASSESSMENT_BLUEPRINT.md) `1.0.0`, approved by the maintainer on `2026-11-25`, with an [item map](docs/ASSESSMENT_ITEM_MAP.md), originally 115 items, now 145 questions plus six E decisions. The blueprint separates knowledge/scenarios, self-reported practices, simulated exercises, and text with formative feedback; it defines coverage, rubrics, future paths, and preservation of 2.x reports without recalculation. The matrix, thresholds, timing, and terminology are editorial choices to verify during implementation.

Milestone 17 introduces the new assessment model in release `3.0.0`, approved on `2026-11-25`, without revising the bank or forms. Milestone 18 adds Modern AI in release `3.1.0`, approved by the maintainer on `2026-11-25`: the full test and nine existing thematic paths retain their texts and compositions. The lab and full-test integration follow in milestones 19-22 of [PLAN.md](PLAN.md). [Review document](docs/MODERN_AI_REVIEW.md).

Milestone 19 introduces the Agents revision in release `3.2.0`, approved by the maintainer on `2026-11-25`. Milestone 20 introduces Harness in release `3.3.0`, approved by the maintainer on `2026-11-25`; the full test remains unchanged. M21 implements the Operational lab in release `3.4.0`, approved by the maintainer on `2026-11-25`; M22 has not started.

### Local Verification

Run `node --test --test-isolation=none tests/assessment.test.mjs tests/operational-lab.test.mjs`. No installation is needed; checks and limitations of testing without a browser are documented in [docs/SCORING.md](docs/SCORING.md).

### References

- Datapizza, [AI Adoption Assessment: misurare la GenAI in azienda](https://datapizza.tech/it/blog/ai-adoption-assessment-misurare-la-genai-in-azienda)
- Davis, [Technology Acceptance Model](https://www.jstor.org/stable/249008)
- Venkatesh et al., [Unified Theory of Acceptance and Use of Technology](https://www.researchgate.net/publication/220259897_User_Acceptance_of_Information_Technology_Toward_a_Unified_View)
- Bandura, [Guide for Constructing Self-Efficacy Scales](https://www.emerald.com/books/edited-volume/18068/chapter-abstract/101339715/Guide-for-Constructing-Self-Efficacy-Scales)
- Rick Dakan and Joseph Feller, [AI Fluency Framework](https://aifluencyframework.org/)
- Ethan Mollick, [Management as an AI Superpower](https://www.oneusefulthing.org/p/management-as-ai-superpower)
- Google for Developers, [Large Language Models](https://developers.google.com/machine-learning/crash-course/llm)
- Google for Developers, [Neural Networks](https://developers.google.com/machine-learning/crash-course/neural-networks)
- Google for Developers, [Embeddings](https://developers.google.com/machine-learning/crash-course/embeddings)
- Google Cloud, [What are AI hallucinations?](https://cloud.google.com/discover/what-are-ai-hallucinations)
- Microsoft Learn, [Retrieval-Augmented Generation overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)
- Vaswani et al., [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

### License

Released under the Apache 2.0 license. See `LICENSE`.
