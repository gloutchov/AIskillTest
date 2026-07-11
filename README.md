# AI Skill & Adoption Assessment

## Italiano

Questionario interattivo in italiano e inglese per valutare in modo pratico competenza, uso operativo, giudizio critico e attitudine verso la GenAI.

L'assessment produce un profilo finale, una dashboard dei punteggi e suggerimenti formativi. E' pensato come strumento diagnostico interno e migliorabile, non come test psicometrico validato.

Versione corrente dell'app: `2.3.1`.

Tag di riferimento: `v2.3.1`.

### Nota sullo sviluppo

Questo test e' stato realizzato in vibecoding, usando l'AI come supporto operativo per ideazione, sviluppo, revisione e affinamento dell'esperienza.

### Contenuto del repository

- `ai_skill_test.html`: shell HTML dell'applicazione.
- `assets/styles.css`: stili dell'interfaccia.
- `assets/questions.js`: banca domande, forme parallele e override.
- `assets/i18n.js`: testi localizzati, traduzione inglese della banca domande e varianti form-specific.
- `assets/app.js`: logica client-side, navigazione, scoring, dashboard ed export.
- `LEARNING_PATH.md`: blueprint bilingue del percorso introduttivo pianificato, con domande, unita' didattiche e fonti.
- `index.html`: pagina di ingresso che rimanda al test.
- `LICENSE`: licenza Apache 2.0.

### Come usarlo

Apri `ai_skill_test.html` in un browser moderno. Non servono build, dipendenze o server.

La lingua iniziale segue le impostazioni del browser: italiano se il browser e' in italiano; inglese se il browser e' in inglese o in qualunque altra lingua. Il selettore `IT` / `EN` nella home consente il cambio manuale e salva la preferenza nel `localStorage`. Per evitare report misti, il cambio lingua va fatto prima di iniziare un assessment.

La home mostra un carosello con test completo e percorsi tematici. Il carosello avanza automaticamente ogni 5 secondi e resta controllabile con frecce, indicatori, swipe touch e pulsante `Pausa`.

Durante il test, le domande a scelta singola avanzano automaticamente dopo la selezione. Domande a scelta multipla e prove testuali richiedono il pulsante `Avanti`. Il pulsante `Interrompi il test` annulla la sessione corrente, previa conferma, e torna alla home senza salvare un report.

Nelle domande dichiarative, le alternative restano senza livelli numerici e sono presentate in ordine casuale per favorire la lettura del comportamento descritto. Il comando `Mostra i dettagli` chiarisce le differenze tra applicazione con supporto, autonomia caso per caso, metodo stabile e pratica verificata e condivisibile.

### Cosa misura

L'assessment combina autovalutazione, scenari, quiz tecnici e prove pratiche su:

- AI Literacy: funzionamento, limiti, dati, fonti, privacy e affidabilita' della GenAI.
- Fondamenti LLM: token, contesto, inferenza, Transformer, allucinazioni, RAG, embedding e citazioni.
- AI Agents: agenti, tool, permessi, memoria/stato, controllo umano, log e rollback.
- AI Fluency: Delegation, Description, Discernment e Diligence.
- Mindset: apertura alla sperimentazione, fiducia calibrata e adozione responsabile.
- Practical Lab: mini-task operativi, prompt, checklist e controlli su casi concreti.

Modalita' disponibili:

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

La banca contiene 115 domande base. Il test completo resta a 50 domande e include 4 domande AI Agents. Il percorso AI Agents usa un pool di 15 domande per alimentare la rotazione A/B/C. Le sessioni ruotano tra forme A/B/C separatamente per lingua e modalita'.

Nel test completo, il profilo globale usa questa ponderazione:

- 35% Literacy
- 45% Fluency
- 20% Mindset

Nei percorsi tematici, il risultato e' calcolato solo sulle domande presenti nella modalita' scelta. Le dashboard tematiche non mostrano punteggi globali o aree non misurate.

### Privacy e dati

L'applicazione e' client-side. Dati facoltativi, risposte e report restano nel browser dell'utente tramite `localStorage`, salvo esportazione manuale dei report.

Lo step iniziale consente di inserire nome, ruolo, area/team e autovalutazione delle skill. Tutti questi dati sono facoltativi. L'app non invia automaticamente dati a server esterni, non contiene analytics e non richiede account.

### Export e storico

- JSON: contiene metadati, modalita' di test, forma, punteggi, risposte e raccomandazioni.
- CSV: contiene metadati principali, lingua, origine della scelta lingua, autovalutazione, punteggi e risposte in formato tabellare.
- Storico locale: conserva gli ultimi report nel browser e mostra la modalita' svolta.

Gli export sono sempre azioni manuali dell'utente.

### Pubblicazione con GitHub Pages

Per pubblicarlo come pagina web:

1. Apri le impostazioni del repository su GitHub.
2. Vai in `Pages`.
3. Seleziona il branch principale e la root del repository.
4. Salva e attendi la generazione dell'URL.

Il file `index.html` reindirizza automaticamente a `ai_skill_test.html`, quindi GitHub Pages puo' servire la root del repository senza build step.

### Versioning

- Versione app: `2.3.1`.
- Tag Git: `v2.3.1`.
- Banca domande: `2026.07-m7`.
- Forma assessment: `1.3`.

I tag seguono il formato `vX.Y.Z`. Le modifiche patch aggiornano documentazione o correzioni piccole; le modifiche minor o major introducono cambiamenti funzionali piu' ampi.

### Riferimenti

- Datapizza, [AI Adoption Assessment: misurare la GenAI in azienda](https://datapizza.tech/it/blog/ai-adoption-assessment-misurare-la-genai-in-azienda)
- Davis, [Technology Acceptance Model](https://www.jstor.org/stable/249008)
- Venkatesh et al., [Unified Theory of Acceptance and Use of Technology](https://www.researchgate.net/publication/220259897_User_Acceptance_of_Information_Technology_Toward_a_Unified_View)
- Bandura, [Guide for Constructing Self-Efficacy Scales](https://www.emerald.com/books/edited-volume/18068/chapter-abstract/101339715/Guide-for-Constructing-Self-Efficacy-Scales)
- Southworth et al., [AI Fluency Framework](https://aifluencyframework.org/)
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

Interactive questionnaire in Italian and English for practical assessment of GenAI competence, operational use, critical judgment, and adoption attitude.

The assessment produces a final profile, score dashboard, and training recommendations. It is intended as an internal diagnostic tool that can evolve over time, not as a psychometrically validated test.

Current app version: `2.3.1`.

Reference tag: `v2.3.1`.

### Development Note

This test was built through vibecoding, using AI as operational support for ideation, development, review, and experience refinement.

### Repository Contents

- `ai_skill_test.html`: application HTML shell.
- `assets/styles.css`: interface styles.
- `assets/questions.js`: question bank, parallel forms, and overrides.
- `assets/i18n.js`: localized texts, English question-bank translation, and form-specific variants.
- `assets/app.js`: client-side logic, navigation, scoring, dashboard, and export.
- `LEARNING_PATH.md`: bilingual blueprint for the planned introductory path, including questions, learning units, and sources.
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
- Practical Lab: operational mini-tasks, prompts, checklists, and controls on concrete cases.

Available modes:

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

In the full test, the global profile uses this weighting:

- 35% Literacy
- 45% Fluency
- 20% Mindset

In thematic paths, the result is calculated only on the questions present in the selected mode. Thematic dashboards do not show global scores or unmeasured areas.

### Privacy And Data

The application is fully client-side. Optional profile data, answers, and reports remain in the user's browser through `localStorage`, unless the user manually exports reports.

The initial step can collect name, role, area/team, and self-assessed skills. All fields are optional. The app does not automatically send data to external servers, contains no analytics, and requires no account.

### Export And History

- JSON: includes metadata, test mode, form, scores, answers, and recommendations.
- CSV: includes main metadata, language, language source, self-evaluation, scores, and answers in tabular format.
- Local history: stores recent reports in the browser and shows the completed mode.

Exports are always explicit user actions.

### Publishing With GitHub Pages

To publish it as a web page:

1. Open the repository settings on GitHub.
2. Go to `Pages`.
3. Select the main branch and the repository root.
4. Save and wait for the generated URL.

`index.html` automatically redirects to `ai_skill_test.html`, so GitHub Pages can serve the repository root without a build step.

### Versioning

- App version: `2.3.1`.
- Git tag: `v2.3.1`.
- Question bank: `2026.07-m7`.
- Assessment form: `1.3`.

Tags follow the `vX.Y.Z` format. Patch releases cover documentation or small fixes; minor and major releases introduce broader functional changes.

### References

- Datapizza, [AI Adoption Assessment: misurare la GenAI in azienda](https://datapizza.tech/it/blog/ai-adoption-assessment-misurare-la-genai-in-azienda)
- Davis, [Technology Acceptance Model](https://www.jstor.org/stable/249008)
- Venkatesh et al., [Unified Theory of Acceptance and Use of Technology](https://www.researchgate.net/publication/220259897_User_Acceptance_of_Information_Technology_Toward_a_Unified_View)
- Bandura, [Guide for Constructing Self-Efficacy Scales](https://www.emerald.com/books/edited-volume/18068/chapter-abstract/101339715/Guide-for-Constructing-Self-Efficacy-Scales)
- Southworth et al., [AI Fluency Framework](https://aifluencyframework.org/)
- Ethan Mollick, [Management as an AI Superpower](https://www.oneusefulthing.org/p/management-as-ai-superpower)
- Google for Developers, [Large Language Models](https://developers.google.com/machine-learning/crash-course/llm)
- Google for Developers, [Neural Networks](https://developers.google.com/machine-learning/crash-course/neural-networks)
- Google for Developers, [Embeddings](https://developers.google.com/machine-learning/crash-course/embeddings)
- Google Cloud, [What are AI hallucinations?](https://cloud.google.com/discover/what-are-ai-hallucinations)
- Microsoft Learn, [Retrieval-Augmented Generation overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)
- Vaswani et al., [Attention Is All You Need](https://arxiv.org/abs/1706.03762)

### License

Released under the Apache 2.0 license. See `LICENSE`.
