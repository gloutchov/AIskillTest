# AI Skill & Adoption Assessment

## Italiano

Questionario interattivo in italiano e inglese per esplorare conoscenze, giudizio su scenari e pratiche dichiarate nell’uso della GenAI.

L'assessment produce un quadro delle evidenze: conoscenze/scenari, pratiche dichiarate e testi con feedback restano separati, con copertura e limiti per area. È pensato come strumento diagnostico interno e migliorabile, non come test psicometrico validato.

Versione corrente dell'app: `3.0.0`, milestone 17 approvata dal maintainer il `2026-11-25`.

Tag di riferimento: `v3.0.0`.

### Nota sullo sviluppo

Questo test è stato realizzato in vibecoding, usando l'AI come supporto operativo per ideazione, sviluppo, revisione e affinamento dell'esperienza.

### Contenuto del repository

- `ai_skill_test.html`: shell HTML dell'applicazione.
- `assets/styles.css`: stili dell'interfaccia.
- `assets/questions.js`: banca domande, forme parallele e override.
- `assets/i18n.js`: testi localizzati, traduzione inglese della banca domande e varianti form-specific.
- `assets/learning.js`: forme A/B/C e unità didattiche del percorso introduttivo.
- `assets/app.js`: navigazione client-side, storico, dashboard legacy/didattica ed export.
- `assets/assessment.js`: regole pure dello scoring 3.x e metadati degli item.
- `assets/report-ui.js`: quadro delle evidenze IT/EN.
- `docs/SCORING.md`: schema, compatibilità e verifica della milestone 17.
- `tests/assessment.test.mjs`: controlli deterministici senza dipendenze.
- `aiskilltest_icon.png`: icona del sito e dei collegamenti salvati su dispositivo.
- `scripts/build-learning-data.mjs`: genera l'asset didattico dal blueprint senza dipendenze.
- `LEARNING_PATH.md`: blueprint bilingue del percorso introduttivo pianificato, con domande, unità didattiche e fonti.
- `ASSESSMENT_BLUEPRINT.md`: blueprint approvato della milestone 16 per competenze, prove, risultati e compatibilità dello storico della futura serie 3.x.
- `docs/ASSESSMENT_ITEM_MAP.md`: classificazione dei 115 item attuali per tipo di evidenza, area e obiettivo.
- `PLAN.md`: roadmap, stato delle milestone e criteri di validazione e release.
- `index.html`: pagina di ingresso che rimanda al test.
- `LICENSE`: licenza Apache 2.0.

### Come usarlo

Apri `ai_skill_test.html` in un browser moderno. Non servono build, dipendenze o server.

La lingua iniziale segue le impostazioni del browser: italiano se il browser è in italiano; inglese se il browser è in inglese o in qualunque altra lingua. Il selettore `IT` / `EN` nella home consente il cambio manuale e salva la preferenza nel `localStorage`. Per evitare report misti, il cambio lingua va fatto prima di iniziare un assessment.

La home mostra un carosello con test completo e percorsi tematici. Il carosello avanza automaticamente ogni 5 secondi e resta controllabile con frecce, indicatori, swipe touch e pulsante `Pausa`.

Durante il test, le domande a scelta singola avanzano automaticamente dopo la selezione. Domande a scelta multipla e prove testuali richiedono il pulsante `Avanti`. Il pulsante `Interrompi il test` annulla la sessione corrente, previa conferma, e torna alla home senza salvare un report.

Nelle domande dichiarative, le alternative restano senza livelli numerici e sono presentate in ordine casuale per favorire la lettura del comportamento descritto. Il comando `Mostra i dettagli` chiarisce le differenze tra applicazione con supporto, autonomia caso per caso, metodo stabile e pratica verificata e condivisibile.

### Cosa misura

L'assessment combina autovalutazione, scenari, quiz tecnici e prove pratiche su:

- AI Literacy: funzionamento, limiti, dati, fonti, privacy e affidabilità della GenAI.
- Fondamenti LLM: token, contesto, inferenza, Transformer, allucinazioni, RAG, embedding e citazioni.
- AI Agents: agenti, tool, permessi, memoria/stato, controllo umano, log e rollback.
- AI Fluency: Delegation, Description, Discernment e Diligence.
- Mindset: apertura alla sperimentazione, fiducia calibrata e adozione responsabile.
- Practical Lab: quiz su scelte ipotetiche e prompt con checklist formative; nessuna esecuzione simulata.

Modalità disponibili:

- Primi passi con l'AI: 10 domande guidate e tutorial personalizzato.
- Test completo: 50 domande.
- Literacy: 10 domande.
- Fondamenti tecnici LLM: 10 domande.
- AI Agents: 10 domande.
- Fluency - Delegation: 10 domande.
- Fluency - Description: 10 domande.
- Fluency - Discernment: 10 domande.
- Fluency - Diligence: 10 domande.
- Mindset: 10 domande.
- Practical Lab: 10 domande.

La banca contiene 115 domande base. Il test completo resta a 50 domande e include 4 domande AI Agents. Il percorso AI Agents usa un pool di 15 domande per alimentare la rotazione A/B/C. Le sessioni ruotano tra forme A/B/C separatamente per lingua e modalità.

`Primi passi con l'AI` è un'esperienza di apprendimento, non un assessment comparabile con gli altri risultati. Usa tre forme da 10 domande e propone spiegazioni locali e letture facoltative. I link esterni si aprono soltanto dopo un click esplicito.

Il completo mantiene 50 domande: 27 quiz/scenari, 21 dichiarazioni e 2 testi formativi. Nessun item attuale è un esercizio simulato. Le aree di risultato sono Fondamenti, Uso operativo e multimodale, Agenti e Harness; le coperture moderne ancora mancanti sono indicate.

Le percentuali usano soltanto quiz e scenari direttamente pertinenti, con peso uguale per obiettivo. Servono almeno 3 quesiti validi e 2 obiettivi per mostrare una percentuale d'area; le fasce editoriali richiedono almeno 6 quesiti e tutti gli obiettivi dell'area. Dichiarazioni e stime iniziali non modificano i quiz. I testi aperti offrono checklist formative senza scoring lessicale.

I nuovi report non producono indice globale, quadrante, radar o profili Beginner/Curious/Expert/Champion. Nei tematici sono mostrati solo risultati sostenuti dalle evidenze presenti, con le altre aree dichiarate non esplorate. Regole, metadati, limiti e checklist di verifica sono in [docs/SCORING.md](docs/SCORING.md).

### Privacy e dati

L'applicazione è client-side. Dati facoltativi, risposte e report restano nel browser dell'utente tramite `localStorage`, salvo esportazione manuale dei report.

Lo step iniziale consente di inserire nome, ruolo, area/team e autovalutazione delle skill. Tutti questi dati sono facoltativi. L'app non invia automaticamente dati a server esterni, non contiene analytics e non richiede account.

### Export e storico

- JSON: contiene il record completo originale, con versioni di app/scoring/schema/blueprint, lingua, modalità, forma, evidenze, copertura e risposte.
- CSV: formato `type,field,value` con percorsi di campo stabili, compresi metadati, risposte, evidenze e copertura; sostituisce il precedente CSV a sezioni.
- Storico locale: conserva fino a 100 report apribili singolarmente. I report 2.x restano originali con avviso, senza ricalcolo, medie o confronti diretti con 3.x. Formati sconosciuti sono consultabili ed esportabili senza alterare i dati.

Gli export sono sempre azioni manuali dell'utente. Se lo storico è danneggiato o la quota del browser è esaurita, un avviso invita a esportare il report corrente senza sovrascrivere i dati precedenti.

### Sito pubblico

L'applicazione è disponibile all'indirizzo:

- [https://aiskilltest.glaucosilvestri.it](https://aiskilltest.glaucosilvestri.it)

Il file `CNAME` associa il dominio personalizzato al progetto. `index.html` reindirizza automaticamente a `ai_skill_test.html`, quindi la root del sito funziona senza build step.

L'icona a forma di casa accanto al selettore della lingua rimanda al sito principale [glaucosilvestri.it](https://www.glaucosilvestri.it).

### Versioning

- Versione app: `3.0.0`.
- Tag Git: `v3.0.0`.
- Banca domande: `2026.07-m7`.
- Forma assessment: `1.3`.
- Banca Primi passi: `2026.07-first-steps-1`.
- Forma Primi passi: `first-steps-1.0`.

I tag seguono il formato `vX.Y.Z`. Le modifiche patch aggiornano documentazione o correzioni piccole; le modifiche minor o major introducono cambiamenti funzionali più ampi.

### Progettazione dell'aggiornamento 3.x

La milestone 16 definisce il [blueprint delle competenze e della valutazione](ASSESSMENT_BLUEPRINT.md) `1.0.0`, approvato dal maintainer il `2026-11-25`, con la [mappa dei 115 item attuali](docs/ASSESSMENT_ITEM_MAP.md). Il blueprint distingue conoscenze/scenari, pratiche dichiarate, esercizi simulati e testi con feedback; definisce copertura, rubriche, percorsi futuri e conservazione dei report 2.x senza ricalcolo. Matrice, soglie, tempi e terminologia sono scelte editoriali da verificare durante l'implementazione.

La milestone 17 introduce il nuovo modello di valutazione nella release `3.0.0`, approvata dal maintainer il `2026-11-25`. Banca e forme restano invariate; i nuovi percorsi e il laboratorio arriveranno nelle milestone 18-22 di [PLAN.md](PLAN.md). La versione pubblicata precedente è `2.4.1`.

### Verifica locale

Eseguire `node tests/assessment.test.mjs`. Non servono installazioni; controlli e limiti del test senza browser sono in [docs/SCORING.md](docs/SCORING.md).

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

The assessment produces an evidence overview: knowledge/scenarios, self-reported practices, and text with feedback remain separate, with area coverage and limits. It is intended as an internal diagnostic tool that can evolve over time, not as a psychometrically validated test.

Current app version: `3.0.0`, milestone 17 approved by the maintainer on `2026-11-25`.

Reference tag: `v3.0.0`.

### Development Note

This test was built through vibecoding, using AI as operational support for ideation, development, review, and experience refinement.

### Repository Contents

- `ai_skill_test.html`: application HTML shell.
- `assets/styles.css`: interface styles.
- `assets/questions.js`: question bank, parallel forms, and overrides.
- `assets/i18n.js`: localized texts, English question-bank translation, and form-specific variants.
- `assets/learning.js`: A/B/C forms and learning units for the introductory path.
- `assets/app.js`: client-side navigation, history, legacy/learning dashboards, and export.
- `assets/assessment.js`: pure 3.x scoring rules and item metadata.
- `assets/report-ui.js`: IT/EN evidence overview.
- `docs/SCORING.md`: schema, compatibility, and milestone 17 verification.
- `tests/assessment.test.mjs`: dependency-free deterministic checks.
- `aiskilltest_icon.png`: site icon and saved-link icon on supported devices.
- `scripts/build-learning-data.mjs`: generates the learning asset from the blueprint without dependencies.
- `LEARNING_PATH.md`: bilingual blueprint for the planned introductory path, including questions, learning units, and sources.
- `ASSESSMENT_BLUEPRINT.md`: approved milestone 16 blueprint for competencies, evidence, results, and history compatibility in the future 3.x series.
- `docs/ASSESSMENT_ITEM_MAP.md`: classification of all 115 current items by evidence type, primary area, and objective.
- `PLAN.md`: roadmap, milestone status, and validation and release criteria.
- `index.html`: entry page that redirects to the test.
- `LICENSE`: Apache 2.0 license.

### How To Use It

Open `ai_skill_test.html` in a modern browser. No build, dependency, or server is required.

The initial language follows the browser settings: Italian if the browser is in Italian; English if the browser is in English or any other language. The `IT` / `EN` selector on the home page allows manual switching and stores the preference in browser `localStorage`. To avoid mixed-language reports, switch language before starting an assessment.

The home page shows a carousel with the full test and thematic paths. The carousel advances automatically every 5 seconds and remains controllable through arrows, indicators, touch swipe, and the `Pause` button.

During the test, single-choice questions advance automatically after selection. Multiple-choice questions and text tasks still require the `Next` button. The `Interrupt test` button cancels the current session after confirmation and returns to the home page without saving a report.

In declarative questions, options remain unnumbered and are presented in random order to encourage reading the described behavior. The `Show details` control clarifies the differences between applying something with support, working independently case by case, using a stable method, and maintaining a verified, shareable practice.

### What It Measures

The assessment combines self-evaluation, scenarios, technical quizzes, and practical tasks on:

- AI Literacy: GenAI mechanics, limits, data, sources, privacy, and reliability.
- LLM foundations: tokens, context, inference, Transformers, hallucinations, RAG, embeddings, and citations.
- AI Agents: agents, tools, permissions, memory/state, human control, logs, and rollback.
- AI Fluency: Delegation, Description, Discernment, and Diligence.
- Mindset: openness to experimentation, calibrated trust, and responsible adoption.
- Practical Lab: hypothetical-choice questions and prompts with formative checklists; no simulated execution.

Available modes:

- AI First Steps: 10 guided questions and a personalized tutorial.
- Full test: 50 questions.
- Literacy: 10 questions.
- LLM technical foundations: 10 questions.
- AI Agents: 10 questions.
- Fluency - Delegation: 10 questions.
- Fluency - Description: 10 questions.
- Fluency - Discernment: 10 questions.
- Fluency - Diligence: 10 questions.
- Mindset: 10 questions.
- Practical Lab: 10 questions.

The bank contains 115 base questions. The full test remains at 50 questions and includes 4 AI Agents questions. The AI Agents path uses a 15-question pool to support A/B/C rotation. Sessions rotate across A/B/C forms separately by language and test mode.

`AI First Steps` is a learning experience, not an assessment comparable with the other results. It uses three 10-question forms and provides local explanations and optional readings. External links open only after an explicit click.

The full test keeps 50 questions: 27 knowledge/scenarios, 21 self-reports, and 2 formative texts. No current item is a simulated exercise. Result areas are Foundations, Operational and multimodal use, Agents, and Harnesses; missing modern coverage is identified.

Percentages use only directly relevant questions/scenarios, with equal weight per objective. An area percentage requires at least 3 valid questions and 2 objectives; editorial bands require at least 6 questions and all area objectives. Self-reports and initial estimates do not change question results. Open text receives formative checklists without keyword scoring.

New reports produce no global index, quadrant, radar, or Beginner/Curious/Expert/Champion profile. Thematic paths show only results supported by collected evidence, identifying other areas as not assessed. Rules, metadata, limitations, and the verification checklist are documented in [docs/SCORING.md](docs/SCORING.md).

### Privacy And Data

The application is fully client-side. Optional profile data, answers, and reports remain in the user's browser through `localStorage`, unless the user manually exports reports.

The initial step can collect name, role, area/team, and self-assessed skills. All fields are optional. The app does not automatically send data to external servers, contains no analytics, and requires no account.

### Export And History

- JSON: includes the complete original record, with app/scoring/schema/blueprint versions, language, mode, form, evidence, coverage, and answers.
- CSV: uses `type,field,value` with stable field paths for metadata, answers, evidence, and coverage; replaces the previous section-based CSV.
- Local history: keeps up to 100 individually openable reports. Reports from 2.x remain original with a notice, without recalculation, averaging, or direct comparison with 3.x. Unknown formats can be inspected and exported without altering data.

Exports are always explicit user actions. If history is damaged or browser storage is full, a notice asks the user to export the current report without overwriting previous data.

### Public Website

The application is available at:

- [https://aiskilltest.glaucosilvestri.it](https://aiskilltest.glaucosilvestri.it)

The `CNAME` file associates the custom domain with the project. `index.html` automatically redirects to `ai_skill_test.html`, so the site root works without a build step.

The home icon next to the language selector links to the main website, [glaucosilvestri.it](https://www.glaucosilvestri.it).

### Versioning

- App version: `3.0.0`.
- Git tag: `v3.0.0`.
- Question bank: `2026.07-m7`.
- Assessment form: `1.3`.
- First Steps bank: `2026.07-first-steps-1`.
- First Steps form: `first-steps-1.0`.

Tags follow the `vX.Y.Z` format. Patch releases cover documentation or small fixes; minor and major releases introduce broader functional changes.

### Planning The 3.x Update

Milestone 16 defines the [competency and assessment blueprint](ASSESSMENT_BLUEPRINT.md) `1.0.0`, approved by the maintainer on `2026-11-25`, with a [map of all 115 current items](docs/ASSESSMENT_ITEM_MAP.md). The blueprint separates knowledge/scenarios, self-reported practices, simulated exercises, and text with formative feedback; it defines coverage, rubrics, future paths, and preservation of 2.x reports without recalculation. The matrix, thresholds, timing, and terminology are editorial choices to verify during implementation.

Milestone 17 introduces the new assessment model in release `3.0.0`, approved by the maintainer on `2026-11-25`. The bank and forms are unchanged; new paths and the lab follow in milestones 18-22 of [PLAN.md](PLAN.md). The previous published version is `2.4.1`.

### Local Verification

Run `node tests/assessment.test.mjs`. No installation is needed; checks and limitations of testing without a browser are documented in [docs/SCORING.md](docs/SCORING.md).

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
