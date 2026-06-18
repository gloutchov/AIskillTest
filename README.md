# AI Skill & Adoption Assessment

Questionario interattivo in italiano per valutare in modo pratico competenza, uso operativo, giudizio critico e attitudine verso la GenAI.

L'assessment produce un profilo finale, una dashboard dei punteggi e suggerimenti formativi. E' pensato come strumento diagnostico interno e migliorabile, non come test psicometrico validato.

Versione corrente dell'app: `1.2.0`.

## Nota sullo sviluppo

Questo test e' stato realizzato in vibecoding, usando l'AI come supporto operativo per ideazione, sviluppo, revisione e affinamento dell'esperienza.

## Contenuto del repository

- `ai_skill_test.html`: shell HTML dell'applicazione.
- `assets/styles.css`: stili dell'interfaccia.
- `assets/questions.js`: banca domande, forme parallele e override.
- `assets/app.js`: logica client-side, navigazione, scoring, dashboard ed export.
- `index.html`: pagina di ingresso che rimanda al test.
- `LICENSE`: licenza Apache 2.0.

## Come usarlo

Apri `ai_skill_test.html` in un browser moderno. Non servono build, dipendenze o server.

La home descrive il test completo da 50 domande, mostra la distribuzione per tema e permette di aprire la bibliografia prima di iniziare. Il pulsante `Inizia` porta a uno step separato con dati e autovalutazione iniziale facoltativi; il test vero e proprio parte solo dal pulsante `Inizia il test`.

Il test salva localmente nel browser lo storico degli ultimi report e permette di esportare i risultati in formato JSON o CSV.

Per sviluppo locale e verifica manuale e' possibile aprire direttamente `ai_skill_test.html`, perche' il progetto usa solo file statici.

## Cosa misura

L'assessment combina autovalutazione, scenari, quiz tecnici e prove pratiche su:

- AI Literacy: funzionamento, limiti, dati, fonti, privacy e affidabilita' della GenAI.
- AI Fluency: Delegation, Description, Discernment e Diligence.
- Mindset: apertura alla sperimentazione, fiducia calibrata e adozione responsabile.
- Fondamenti LLM: token, contesto, inferenza, Transformer, allucinazioni, RAG, embedding e citazioni.

Il punteggio composito usa questa ponderazione:

- 35% Literacy
- 45% Fluency
- 20% Mindset

## Privacy e dati

L'applicazione e' client-side. Dati facoltativi, risposte e report restano nel browser dell'utente tramite `localStorage`, salvo esportazione manuale dei report. Le skill dichiarate nello step iniziale servono al confronto tra aspettative e risultati ottenuti.

Per raccolte strutturate in contesti aziendali, definire prima policy, base giuridica, consenso, tempi di conservazione, accessi e modalita' di analisi dei risultati.

## Pubblicazione con GitHub Pages

Per pubblicarlo come pagina web:

1. Apri le impostazioni del repository su GitHub.
2. Vai in `Pages`.
3. Seleziona il branch principale e la root del repository.
4. Salva e attendi la generazione dell'URL.

## Riferimenti

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

## Licenza

Distribuito con licenza Apache 2.0. Vedi `LICENSE`.
