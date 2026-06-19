# AI Skill & Adoption Assessment

Questionario interattivo in italiano e inglese per valutare in modo pratico competenza, uso operativo, giudizio critico e attitudine verso la GenAI.

L'assessment produce un profilo finale, una dashboard dei punteggi e suggerimenti formativi. E' pensato come strumento diagnostico interno e migliorabile, non come test psicometrico validato.

Versione corrente dell'app: `2.1.0`.

Tag di riferimento: `v2.1.0`.

## Nota sullo sviluppo

Questo test e' stato realizzato in vibecoding, usando l'AI come supporto operativo per ideazione, sviluppo, revisione e affinamento dell'esperienza.

## Contenuto del repository

- `ai_skill_test.html`: shell HTML dell'applicazione.
- `assets/styles.css`: stili dell'interfaccia.
- `assets/questions.js`: banca domande, forme parallele e override.
- `assets/i18n.js`: testi localizzati e traduzione inglese della banca domande base.
- `assets/app.js`: logica client-side, navigazione, scoring, dashboard ed export.
- `index.html`: pagina di ingresso che rimanda al test.
- `LICENSE`: licenza Apache 2.0.

## Come usarlo

Apri `ai_skill_test.html` in un browser moderno. Non servono build, dipendenze o server.

La lingua iniziale segue le impostazioni del browser: se la lingua di sistema e' italiana, l'app parte in italiano; se e' inglese o qualunque altra lingua, parte in inglese. Il selettore `IT` / `EN` nella home consente il cambio manuale e salva la preferenza nel `localStorage` del browser. Landing, test, dashboard e bibliografia vengono localizzati. Per evitare report misti, il cambio lingua va fatto prima di iniziare un assessment.

La home mostra un carosello orizzontale manuale per scegliere tra:

- test completo da 50 domande;
- percorsi tematici da 10 domande.

Ogni slide indica durata stimata, output atteso e temi affrontati. Il carosello avanza automaticamente ogni 5 secondi, ma frecce, indicatori, swipe touch e pulsante `Pausa` permettono di controllarlo. Il conteggio delle domande e la sintesi nel riquadro laterale si aggiornano in base alla modalita' selezionata. Il pulsante `Inizia questo test` porta a uno step separato con dati e autovalutazione iniziale facoltativi; il test vero e proprio parte solo dal pulsante `Inizia il test`.

Durante il test, le domande a scelta singola avanzano automaticamente dopo la selezione. Le domande a scelta multipla e le prove testuali richiedono ancora il pulsante `Avanti`.

Il test salva localmente nel browser lo storico degli ultimi report e permette di esportare i risultati in formato JSON o CSV. Storico ed export includono modalita' svolta, lingua, origine della scelta lingua, forma A/B/C o forma `EN`, versione dell'assessment e versione della banca domande.

Per sviluppo locale e verifica manuale e' possibile aprire direttamente `ai_skill_test.html`, perche' il progetto usa solo file statici.

## Cosa misura

L'assessment combina autovalutazione, scenari, quiz tecnici e prove pratiche su:

- AI Literacy: funzionamento, limiti, dati, fonti, privacy e affidabilita' della GenAI.
- AI Fluency: Delegation, Description, Discernment e Diligence.
- Mindset: apertura alla sperimentazione, fiducia calibrata e adozione responsabile.
- Fondamenti LLM: token, contesto, inferenza, Transformer, allucinazioni, RAG, embedding e citazioni.

Le modalita' disponibili sono:

- Test completo: 50 domande su tutte le aree.
- Literacy: 10 domande.
- Fondamenti tecnici LLM: 10 domande.
- Fluency - Delegation: 10 domande.
- Fluency - Description: 10 domande.
- Fluency - Discernment: 10 domande.
- Fluency - Diligence: 10 domande.
- Mindset: 10 domande.
- Practical Lab: 10 domande.

Nei percorsi tematici, le 10 domande vengono estratte casualmente dal pool disponibile per l'area scelta, cosi' due sessioni consecutive dello stesso tema non propongono necessariamente lo stesso set.

La banca contiene 100 domande base. In italiano, considerando la rotazione sulle tre forme A/B/C, il carnet erogabile arriva a 300 item. In inglese viene usata la traduzione localizzata della banca base, identificata negli export come forma `EN`.

Nel test completo, il profilo globale usa questa ponderazione:

- 35% Literacy
- 45% Fluency
- 20% Mindset

Nei percorsi tematici, il risultato e' calcolato solo sulle domande presenti nella modalita' scelta. Le dashboard tematiche non mostrano punteggi globali o aree non misurate.

## Privacy e dati

L'applicazione e' client-side. Dati facoltativi, risposte e report restano nel browser dell'utente tramite `localStorage`, salvo esportazione manuale dei report.

Lo step iniziale consente di inserire nome, ruolo, area/team e autovalutazione delle skill. Tutti questi dati sono facoltativi. Le skill dichiarate servono al confronto tra aspettative e risultati ottenuti.

L'app non invia automaticamente dati a server esterni, non contiene analytics e non richiede account. Chi usa lo stesso browser puo' vedere lo storico locale finche' non viene svuotato.

Per raccolte strutturate in contesti aziendali, definire prima policy, base giuridica, consenso, tempi di conservazione, accessi e modalita' di analisi dei risultati.

## Export e storico

- JSON: contiene metadati, modalita' di test, forma, punteggi, risposte e raccomandazioni.
- CSV: contiene metadati principali, lingua, origine della scelta lingua, autovalutazione, punteggi e risposte in formato tabellare.
- Storico locale: conserva gli ultimi report nel browser e mostra la modalita' svolta.

Gli export sono sempre azioni manuali dell'utente.

## Pubblicazione con GitHub Pages

Per pubblicarlo come pagina web:

1. Apri le impostazioni del repository su GitHub.
2. Vai in `Pages`.
3. Seleziona il branch principale e la root del repository.
4. Salva e attendi la generazione dell'URL.

Il file `index.html` reindirizza automaticamente a `ai_skill_test.html`, quindi GitHub Pages puo' servire la root del repository senza build step.

## Versioning

- Versione app: `2.1.0`.
- Tag Git: `v2.1.0`.
- Banca domande: `2026.06-m4`.
- Forma assessment: `1.0`.

I tag seguono il formato `vX.Y.Z`. Le modifiche patch aggiornano documentazione o correzioni piccole; le modifiche minor o major introducono cambiamenti funzionali piu' ampi.

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
