# Revisione editoriale — AI moderne (milestone 18)

Stato: approvata dal maintainer il `2026-11-25`, release `v3.1.0`. App `3.1.0`, banca `2026.11-m18`, forme `1.4`; scoring `3.0.0`, schema `3`, blueprint `1.0.0` invariati.

Revisione delle fonti: **2026-11-25**. Questo documento è generato dai dati locali con `node scripts/build-modern-ai-review.mjs`; non è necessario per eseguire l'app.

## Criteri e limiti

Le 30 varianti originali sono disponibili in italiano e inglese. Ogni sessione propone i dieci slot della stessa forma, con ordine di domande e opzioni rimescolato. La matrice di obiettivi è fissa, senza estrazione casuale da un pool più ampio. Il completo e i nove tematici preesistenti conservano le proprie composizioni; Primi passi resta indipendente.

Sono scenari Q a scelta singola, di livello operativo O. Valutano una decisione sui dati forniti, non l'esecuzione pratica di strumenti. Le configurazioni e le misure riportate sono sintetiche: non descrivono prodotti, listini, garanzie di precisione o regole generali di trattamento dei dati.

Per ciascun caso: score editoriale 5 → credito 1, score 3 → credito 0,5, score 1 → credito 0. Le motivazioni sono visibili dopo il test per la scelta effettuata. Il credito parziale indica un elemento pertinente ma insufficiente rispetto ai vincoli; non autorizza una scelta incompatibile. I pesi e le fasce sono editoriali. Le forme hanno la stessa matrice per progetto: non è dimostrata un'equivalenza psicometrica di difficoltà.

Criterio di validazione: revisione di tutte le varianti, traduzioni e crediti; completamento di almeno una forma IT e una EN, con verifica di chiarezza, utilità operativa, Indietro, risultati, storico, export e bibliografia. Il maintainer ha approvato la milestone il `2026-11-25` e autorizzato commit e release; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione. Il limite della verifica dell'agente senza browser reale è documentato in [SCORING.md](SCORING.md).

## Matrice comune

| Slot | Obiettivo | Livello | Fonti |
| --- | --- | --- | --- |
| MA01 | U01 — Scelta degli strumenti e delega | O | M18-S02, M18-S03, M18-S11 |
| MA02 | U01 — Scelta degli strumenti e delega | O | M18-S07, M18-S08 |
| MA03 | U02 — Immagini, scansioni e grafici | O | M18-S02, M18-S09 |
| MA04 | U02 — Immagini, scansioni e grafici | O | M18-S03 |
| MA05 | U03 — Audio e video | O | M18-S04, M18-S05, M18-S06 |
| MA06 | U04 — Brief, vincoli e ambiguità | O | M18-S09 |
| MA07 | U05 — Qualità, tempo, costo e località | O | M18-S01, M18-S10 |
| MA08 | U06 — Verifica degli artefatti | O | M18-S07, M18-S09 |
| MA09 | U07 — Dati, diritti e responsabilità | O | M18-S10, M18-S09 |
| MA10 | U08 — Esperimenti e adozione | O | M18-S01, M18-S12 |

U01 e U02 hanno due quesiti; U03–U08 uno ciascuno. La percentuale U mantiene peso uguale per obiettivo, non per domanda. Tutte le altre aree restano non esplorate in questo percorso. Una copertura raggiunta descrive gli obiettivi dei quesiti, non un'abilità osservata nell'esecuzione.

## Fonti primarie

Le fonti sostengono le distinzioni concettuali; non prescrivono i crediti degli scenari. I servizi evolvono: ricontrollare disponibilità, limiti e policy prima di una revisione futura. Nessuna fonte è caricata automaticamente dal test; i collegamenti richiedono un click.

- **M18-S01** — [OpenAI — Model selection](https://developers.openai.com/api/docs/guides/model-selection): Scelta e confronto sul compito: qualità, costo e tempo. / Task-based selection and comparison: quality, cost, and time.
- **M18-S02** — [OpenAI — Images and vision](https://developers.openai.com/api/docs/guides/images-vision): Comprensione visiva distinta dalla generazione; limiti di lettura e dettagli. / Visual understanding versus generation; reading and detail limitations.
- **M18-S03** — [OpenAI — Computer use](https://developers.openai.com/api/docs/guides/tools-computer-use): Leggere una schermata e agire sull'interfaccia richiedono capacità diverse. / Reading a screen and acting on the interface require different capabilities.
- **M18-S04** — [Google — Video understanding](https://aistudio.google.com/docs/video-understanding): Analisi di video esistenti, riferimenti temporali e limiti degli input. / Existing-video analysis, timestamps, and input limitations.
- **M18-S05** — [Google — Video generation](https://aistudio.google.com/docs/video): Generazione di nuovi video distinta dalla verifica di eventi registrati. / Generating new videos differs from verifying recorded events.
- **M18-S06** — [OpenAI — Audio and voice](https://developers.openai.com/api/docs/guides/audio): Trascrizione, interazione vocale e sintesi sono compiti distinti. / Transcription, voice interaction, and speech synthesis are distinct tasks.
- **M18-S07** — [OpenAI — Code Interpreter](https://developers.openai.com/api/docs/guides/tools-code-interpreter): Esecuzione di codice per dati, calcoli e artefatti, con verifiche degli esiti. / Code execution for data, calculations, and artifacts, with outcome checks.
- **M18-S08** — [Google — What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml): Generazione, classificazione e previsione; confronto con procedure deterministiche. / Generation, classification, and prediction; comparison with deterministic procedures.
- **M18-S09** — [Dakan & Feller — AI Fluency Framework](https://aifluencyframework.org/): Delega, brief, valutazione e responsabilità nella collaborazione con l'AI. / Delegation, briefs, evaluation, and responsibility in AI collaboration.
- **M18-S10** — [OpenAI — Data controls](https://developers.openai.com/api/docs/guides/your-data): Addestramento, conservazione e trattamento sono controlli distinti e dipendono dal servizio. / Training, retention, and processing are separate controls and depend on the service.
- **M18-S11** — [OpenAI — Web search](https://developers.openai.com/api/docs/guides/tools-web-search): Ricerca aggiornata e fonti citabili, da verificare sul contenuto. / Current search and citable sources whose content still needs checking.
- **M18-S12** — [OpenAI — Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals): Criteri, campioni e valutazioni ripetibili; qui applicati a confronti ipotetici. / Criteria, samples, and repeatable evaluations; applied here to hypothetical comparisons.

Il riferimento S12 del blueprint approvato (OpenAI Video generation) è conservato come storico: la pagina consultata segnala la chiusura di Sora 2 / Videos API il 24 settembre 2026. Per la distinzione attuale fra comprensione e generazione video questa milestone usa M18-S04 e M18-S05. Non assume la disponibilità delle precedenti API o di specifiche versioni dei modelli.

## Forma A

### A-MA01 — U01

Fonti: M18-S02, M18-S03, M18-S11.

**Italiano**

Un'app invia foto e testo allo stesso modello. Per preparare una bozza consulta un manuale interno e cerca sul web specifiche pubbliche appena aggiornate; un tool salva il file in un ambiente limitato.

**Quale descrizione distingue le parti da controllare?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Input multimodale, ricerca documentale/web e tool nell'ambiente limitato. | Distingue modalità, fonti interne e web aggiornato, tool e ambiente: ogni passaggio richiede il proprio controllo. |
| 0,5 | Modello visivo da verificare; basta il manuale anche per le novità pubbliche. | Riconosce l'input visivo ma non verifica che il manuale contenga le specifiche appena aggiornate. |
| 0 | Agente autonomo: ricevere foto implica poter operare sui file. | La capacità di leggere foto non concede strumenti, permessi o autonomia d'azione. |
| 0 | Modello riaddestrato: cercare nel manuale ne aggiorna i pesi. | Il recupero di documenti fornisce contesto; non equivale a riaddestramento. |

Feedback: Capacità del modello, input/output, recupero delle fonti, app e ambiente non sono categorie alternative: occorre distinguerne i controlli.

**English**

An app sends photos and text to the same model. To prepare a draft it consults an internal manual and searches the web for newly updated public specifications; a tool saves the file in a restricted environment.

**Which description distinguishes the components that need checking?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Multimodal input, internal/web search and a restricted tool environment. | It distinguishes modalities, internal and current web sources, tools, and environment: each step needs its own check. |
| 0.5 | A visual model to check; the manual alone also suffices for public updates. | It recognizes visual input but does not check whether the manual contains the newly updated specifications. |
| 0 | An autonomous agent: receiving photos implies being able to act on files. | Reading photos does not grant tools, permissions, or autonomy to act. |
| 0 | A retrained model: searching the manual updates its weights. | Document retrieval supplies context; it is not equivalent to retraining. |

Feedback: Model capabilities, input/output, source retrieval, the app, and its environment are not mutually exclusive categories: their controls need to be distinguished.

### A-MA02 — U01

Fonti: M18-S07, M18-S08.

**Italiano**

Devi creare una bozza, smistare migliaia di messaggi, prevedere i volumi del mese e sommare importi. Hai una chat per le bozze, un classificatore e un modello previsionale già validati, più uno script di somma. Tutti sono approvati; contano costo e ripetibilità.

**Quale distribuzione del lavoro è più adatta?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Chat per la bozza; classificatore per lo smistamento; previsione per i volumi; script per la somma. | Riusa le soluzioni verificate per ciascun compito e conserva il calcolo deterministico dove basta. |
| 0,5 | Chat per bozza e smistamento; modello previsionale per i volumi; script per la somma. | La chat può classificare, ma qui sostituisce senza verifica il classificatore già validato per grandi volumi. |
| 0 | Chat per tutti i passaggi, usando il testo generato anche come previsione e totale. | Un'unica interfaccia non garantisce qualità previsionale o calcoli ripetibili sullo storico. |
| 0 | Ricerca documentale per tutti i passaggi, perché dispone anche dei dati storici. | Recuperare dati non sostituisce classificazione validata, previsione o calcolo degli importi. |

Feedback: Generazione, classificazione, previsione e procedure deterministiche rispondono a esigenze diverse. Scegliere uno strumento non dimostra di saperlo usare.

**English**

You need a draft, routing for thousands of messages, a monthly volume forecast, and a sum of amounts. You have a drafting chat, an already validated classifier and forecasting model, plus a summation script. All are approved; cost and repeatability matter.

**Which allocation of work fits best?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Chat for the draft; classifier for routing; forecasting for volumes; script for the sum. | It reuses verified solutions for each task and keeps deterministic calculation where sufficient. |
| 0.5 | Chat for drafting and routing; forecasting model for volumes; script for the sum. | Chat can classify, but here it replaces the high-volume validated classifier without checking the tradeoff. |
| 0 | Chat for every step, using generated text as both the forecast and the total. | A single interface does not guarantee forecast quality or repeatable calculations on historical data. |
| 0 | Document search for every step, because it also has access to historical data. | Retrieving data does not replace validated classification, forecasting, or calculation of amounts. |

Feedback: Generation, classification, prediction, and deterministic procedures meet different needs. Selecting a tool does not demonstrate the ability to use it.

### A-MA03 — U02

Fonti: M18-S02, M18-S09.

**Italiano**

Una scansione contiene il brief approvato per una locandina. La data è poco leggibile. Sono disponibili lettura visiva/OCR, generazione di immagini e un editor di impaginazione; serve un'illustrazione nuova con data esatta.

**Come prepari il contenuto visivo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Confermo la data; genero l'illustrazione e impagino il testo verificato. | Distingue comprensione dell'input, informazione da confermare e generazione di un nuovo visual. |
| 0,5 | Uso l'OCR e descrivo l'illustrazione, lasciando la produzione al team. | Può aiutare la lettura e il brief, ma non produce il visual richiesto e lascia la data incerta. |
| 0 | Faccio rigenerare la scansione nitida e assumo corretta la data ricostruita. | Un dettaglio plausibile generato non recupera con certezza un'informazione illeggibile. |
| 0 | Chiedo al lettore visivo la locandina finale senza controllare l'output. | Leggere un'immagine non implica poterla generare o impaginare correttamente. |

Feedback: Lettura e generazione sono capacità diverse; OCR e modelli visivi possono sbagliare. Testi e dettagli fattuali vanno confrontati con una fonte leggibile.

**English**

A scan contains the approved brief for a poster. The date is hard to read. Visual reading/OCR, image generation, and a layout editor are available; you need a new illustration with the exact date.

**How do you prepare the visual content?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Confirm the date; generate the illustration and lay out verified text. | It separates input understanding, information needing confirmation, and generation of a new visual. |
| 0.5 | Use OCR and describe the illustration, leaving production to the team. | It may help reading and briefing, but does not produce the required visual and leaves the date uncertain. |
| 0 | Regenerate a sharp scan and assume the reconstructed date is correct. | A plausible generated detail does not reliably recover illegible information. |
| 0 | Ask the visual reader for the final poster without checking the output. | Reading an image does not imply the ability to generate it or lay it out correctly. |

Feedback: Reading and generation are different capabilities; OCR and vision models can make mistakes. Text and factual details need comparison with a readable source.

### A-MA04 — U02

Fonti: M18-S03.

**Italiano**

Hai una schermata del CRM e devi delegare l'aggiornamento di un recapito sintetico. Il modello può leggere immagini; l'app offre anche un browser autorizzato alla modifica di quel solo campo. Non è disponibile un'API.

**Quale passaggio può portare a una modifica verificabile?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso il browser autorizzato e verifico il valore dopo il salvataggio. | L'azione richiede uno strumento con permesso effettivo e un controllo dell'esito. |
| 0,5 | Fornisco alla persona i passaggi e le chiedo di confermare la modifica. | È un'alternativa prudente, ma trasferisce l'esecuzione alla persona anziché completare la delega. |
| 0 | Faccio descrivere al modello la schermata corretta e considero concluso. | Una descrizione non modifica il CRM e non costituisce una ricevuta di salvataggio. |
| 0 | Genero l'immagine del recapito aggiornato e la uso come prova del salvataggio. | Un'immagine sintetica non dimostra un cambiamento nello stato dell'applicazione. |

Feedback: Comprendere una schermata non equivale ad agire. Qui si valuta la scelta su uno scenario, senza collegarsi a un CRM o dimostrare capacità esecutiva.

**English**

You have a CRM screenshot and need to delegate an update to a synthetic contact detail. The model can read images; the app also provides a browser authorized to edit that field only. No API is available.

**Which step can produce a verifiable change?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the authorized browser and verify the value after saving. | The action requires a tool with actual permission and an outcome check. |
| 0.5 | Give the person the steps and ask them to confirm the change. | It is a cautious alternative, but hands execution to the person instead of completing the delegation. |
| 0 | Have the model describe the corrected screen and consider the task done. | A description does not change the CRM or constitute a save receipt. |
| 0 | Generate an image of the updated detail and use it as evidence of saving. | A synthetic image does not demonstrate a change in application state. |

Feedback: Understanding a screen is not acting on it. This is a scenario-choice question, with no CRM connection or demonstration of execution.

### A-MA05 — U03

Fonti: M18-S04, M18-S05, M18-S06.

**Italiano**

Un video formativo esistente mostra un gesto che la trascrizione non descrive. Devi verificare il gesto e poi creare una breve demo con voce sintetica. Il sistema dichiara supporto all'analisi del video con audio, alla generazione video e alla sintesi vocale.

**Come distingui verifica e produzione della demo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Verifico gesto e tempi nel video; creo poi una demo dichiarata sintetica. | Usa la registrazione per verificare l'evento e tiene separato il nuovo contenuto generato. |
| 0,5 | Trascrivo l'audio e preparo il copione, rimandando la verifica del gesto. | Supporta il copione, ma una trascrizione non basta a verificare un'azione visiva silenziosa. |
| 0 | Genero il gesto mancante e uso la demo per stabilire che era stato eseguito. | La generazione produce un esempio, non una prova dell'evento registrato. |
| 0 | Uso un solo fotogramma e sintetizzo la voce come conferma dell'intera sequenza. | Una singola immagine e un audio inventato non documentano lo svolgimento temporale. |

Feedback: Trascrivere, analizzare video, generare una clip e sintetizzare una voce sono compiti distinti. Le capacità disponibili sono dichiarate dal caso, non attribuite a ogni modello.

**English**

An existing training video shows a gesture not described in the transcript. You need to verify the gesture, then create a short demo with synthetic speech. The system explicitly supports video-with-audio analysis, video generation, and speech synthesis.

**How do you distinguish verification from producing the demo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Verify the gesture and timing in the video; then create a clearly synthetic demo. | It uses the recording to verify the event and keeps newly generated content separate. |
| 0.5 | Transcribe the audio and prepare the script, postponing gesture verification. | It supports scripting, but a transcript cannot verify a silent visual action. |
| 0 | Generate the missing gesture and use the demo to establish that it occurred. | Generation produces an example, not evidence of a recorded event. |
| 0 | Use one frame and synthesize speech as confirmation of the whole sequence. | A single image and invented audio do not document a sequence over time. |

Feedback: Transcription, video analysis, clip generation, and speech synthesis are distinct tasks. Available capabilities are stated in the case, not attributed to every model.

### A-MA06 — U04

Fonti: M18-S09.

**Italiano**

Devi ottenere un action plan da note approvate, ma mancano alcuni responsabili e scadenze. Il documento finale deve distinguere decisioni già prese e proposte ancora aperte.

**Quale brief rende verificabile il risultato?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Usa le note, separa decisioni e proposte; marca i dati mancanti e indica le domande aperte. | Definisce fonte, struttura e trattamento delle lacune senza trasformarle in fatti inventati. |
| 0,5 | Prepara una tabella di azioni con responsabile e data, usando uno stile sintetico e uniforme. | Il formato è utile, ma non regola dati mancanti e distinzione fra proposte e decisioni. |
| 0 | Completa i campi mancanti con stime realistiche e presenta tutte le righe come concordate. | Una stima non documentata non è una decisione approvata né un responsabile assegnato. |
| 0 | Mantieni il brief vago e chiedi al modello di comportarsi come il massimo esperto del progetto. | Il ruolo richiesto non sostituisce input, vincoli e criteri di accettazione. |

Feedback: Un brief utile specifica risultato, input e vincoli, chiedendo chiarimenti solo dove servono. Non è la lunghezza del prompt a garantire l'esito.

**English**

You need an action plan from approved notes, but some owners and dates are missing. The final document must distinguish decisions already made from proposals still open.

**Which brief makes the result verifiable?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the notes, separate decisions and proposals; mark missing data and list open questions. | It defines the source, structure, and handling of gaps without turning them into invented facts. |
| 0.5 | Prepare a concise, consistent table of actions with an owner and date for each. | The format is useful but does not govern missing data or separate proposals from decisions. |
| 0 | Fill missing fields with realistic estimates and present all rows as agreed. | An undocumented estimate is neither an approved decision nor an assigned owner. |
| 0 | Keep the brief vague and ask the model to act as the project's foremost expert. | A requested role does not replace inputs, constraints, or acceptance criteria. |

Feedback: A useful brief specifies the result, inputs, and constraints, requesting clarification where needed. Prompt length does not guarantee the outcome.

### A-MA07 — U05

Fonti: M18-S01, M18-S10.

**Italiano**

Per uno smistamento ripetitivo servono accuratezza almeno 97% e latenza sotto 2 secondi. Su casi rappresentativi: configurazione L con ragionamento ridotto, 98%, 0,3 s, costo relativo 1; configurazione R con ragionamento elevato, 99%, 4 s, costo 8. Entrambe sono approvate per i dati.

**Quale configurazione scegli in base alle prove fornite?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | L: soddisfa qualità e latenza richieste con costo minore. | La configurazione più leggera supera la soglia sul compito e rispetta il vincolo temporale. |
| 0,5 | Avvio un altro confronto senza usare ancora L, pur avendo già il campione richiesto. | Ulteriori verifiche sono possibili, ma qui rinviano una scelta già sostenuta dai dati dichiarati. |
| 0 | R: il punto di accuratezza in più giustifica anche il superamento della latenza. | Il caso impone un limite di latenza che R non rispetta, anche se è più accurata. |
| 0 | R: il ragionamento elevato garantisce qualità indipendentemente dai test sul compito. | Il livello di ragionamento non elimina la necessità di confrontare esiti, costo e durata. |

Feedback: Usa i risultati sul compito e tutti i vincoli, non il prestigio del modello. I numeri sono sintetici e non rappresentano listini o prestazioni di prodotti reali.

**English**

For repetitive routing you need at least 97% accuracy and latency below 2 seconds. On representative cases: configuration L with lower reasoning effort, 98%, 0.3 s, relative cost 1; configuration R with higher effort, 99%, 4 s, cost 8. Both are approved for the data.

**Which configuration do you choose based on the provided evidence?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | L: it meets the quality and latency requirements at lower cost. | The lighter configuration clears the task's quality threshold and meets the time constraint. |
| 0.5 | Run another comparison before using L, despite already having the required sample. | Further checks are possible but postpone a choice already supported by the stated evidence. |
| 0 | R: the extra accuracy point justifies exceeding the latency limit. | The case imposes a latency limit that R fails, even though it is more accurate. |
| 0 | R: higher reasoning effort guarantees quality regardless of task tests. | Reasoning effort does not remove the need to compare outcomes, cost, and duration. |

Feedback: Use task results and all constraints, rather than model prestige. The figures are synthetic, not real product prices or performance claims.

### A-MA08 — U06

Fonti: M18-S07, M18-S09.

**Italiano**

Un riepilogo AI conta 110 ticket e attribuisce il risultato a un nuovo assistente. Il CSV del periodo contiene tre gruppi da 40, 25 e 35 ticket; non ci sono confronto precedente o dati sull'introduzione dell'assistente.

**Quale verifica è necessaria prima di consegnare il riepilogo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Ricalcolo 100 ticket e tolgo l'attribuzione causale non supportata. | Corregge il totale sui dati disponibili e riconosce l'assenza di evidenza causale. |
| 0,5 | Correggo il totale a 100 e mantengo l'effetto dell'assistente come spiegazione plausibile. | Il calcolo è corretto, ma la plausibilità non sostiene una conclusione causale nel report. |
| 0 | Conservo 110 e faccio ridisegnare il grafico per renderlo coerente con il testo. | Rendere coerenti due output non li rende coerenti con il CSV sorgente. |
| 0 | Chiedo a una seconda chat di confermare il risultato senza fornirle il CSV. | Una conferma senza i dati non verifica né il totale né l'attribuzione. |

Feedback: La verifica riguarda dati, periodo, calcoli e forza della conclusione. Questo quiz valuta la scelta del controllo, non un'analisi eseguita dal rispondente.

**English**

An AI summary counts 110 tickets and attributes the result to a new assistant. The period's CSV has three groups of 40, 25, and 35 tickets; there is no earlier comparison or data about the assistant's introduction.

**What check is needed before delivering the summary?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Recalculate 100 tickets and remove the unsupported causal attribution. | It corrects the total from available data and recognizes the absence of causal evidence. |
| 0.5 | Correct the total to 100 and retain the assistant's effect as a plausible explanation. | The calculation is correct, but plausibility does not support a causal claim in the report. |
| 0 | Keep 110 and redraw the chart so it agrees with the text. | Making two outputs agree does not make them consistent with the source CSV. |
| 0 | Ask a second chat to confirm the result without supplying the CSV. | Confirmation without the data verifies neither the total nor the attribution. |

Feedback: Verification concerns data, period, calculations, and the strength of the conclusion. This question assesses a choice of checks, not analysis performed by the respondent.

### A-MA09 — U07

Fonti: M18-S10, M18-S09.

**Italiano**

La policy del caso vieta che un documento riservato lasci la rete aziendale. Un servizio cloud dichiara di non usarlo per addestramento; un ambiente locale approvato può elaborarlo senza connessioni esterne.

**Quale scelta rispetta il perimetro indicato?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso l'ambiente locale approvato, con i soli dati necessari al compito. | Rispetta il vincolo di località dichiarato e limita i contenuti trattati. |
| 0,5 | Preparo una sintesi locale e sospendo la scelta dello strumento fino a un chiarimento. | Non divulga i dati, ma il caso fornisce già un ambiente consentito e il vincolo necessario. |
| 0 | Uso il cloud: l'esclusione dall'addestramento significa che il file resta locale. | Non addestramento, conservazione e luogo dell'elaborazione sono concetti distinti. |
| 0 | Tolgo il titolo del documento e invio il resto al cloud senza altre modifiche. | Togliere un titolo non rimuove i contenuti riservati né modifica il vincolo di uscita. |

Feedback: Applica la policy fornita: non si richiede una valutazione legale. Un'interfaccia sul dispositivo o un'opzione sul training non dimostrano elaborazione locale.

**English**

The case policy forbids a confidential document from leaving the company network. A cloud service says it will not use it for training; an approved local environment can process it without external connections.

**Which choice respects the stated boundary?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the approved local environment with only the data needed for the task. | It respects the stated locality constraint and limits processed content. |
| 0.5 | Prepare a local summary and defer tool selection until clarification. | It does not disclose data, but the case already supplies an allowed environment and the relevant rule. |
| 0 | Use the cloud: exclusion from training means the file stays local. | Training exclusion, retention, and processing location are separate concepts. |
| 0 | Remove the document title and send the rest to the cloud unchanged. | Removing a title does not remove confidential content or change the outbound-data rule. |

Feedback: Apply the supplied policy: no legal assessment is required. An on-device interface or a training setting does not prove local processing.

### A-MA10 — U08

Fonti: M18-S01, M18-S12.

**Italiano**

Un team propone un nuovo strumento AI dopo una demo convincente. Devi decidere se migliorerebbe le bozze rispetto al processo attuale, includendo il lavoro di controllo umano.

**Quale prova rende la decisione più utile?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Confronto casi rappresentativi: qualità, errori, costo e tempo fino alla consegna. | Misura il valore rispetto alla baseline, includendo correzioni ed eccezioni. |
| 0,5 | Uso gli stessi casi e confronto solo il tempo della prima risposta, lasciando aperta la qualità. | Il confronto è controllato in parte, ma omette qualità e tempo di revisione. |
| 0 | Scelgo gli esempi migliori della demo e li tratto come rappresentativi del lavoro. | La selezione dei soli successi non descrive errori e casi ordinari. |
| 0 | Adotto il tool se il team lo preferisce, senza confrontare gli esiti sul processo. | La preferenza è utile, ma non sostituisce evidenze su qualità, carico di revisione e valore. |

Feedback: Un pilota richiede criterio di esito, baseline e campione adeguato. La velocità della chiamata non coincide con il tempo per ottenere un risultato utilizzabile.

**English**

A team proposes a new AI tool after an impressive demo. You need to decide whether it improves drafting compared with the current process, including human review work.

**Which test makes the decision more useful?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Compare representative cases: quality, errors, cost, and time through delivery. | It measures value against the baseline, including corrections and exceptions. |
| 0.5 | Use the same cases and compare only first-response time, leaving quality unresolved. | The comparison is partly controlled but omits quality and review time. |
| 0 | Choose the best demo examples and treat them as representative of the work. | Selecting only successes does not represent errors or routine cases. |
| 0 | Adopt the tool if the team prefers it, without comparing process outcomes. | Preference is useful but does not replace evidence on quality, review effort, and value. |

Feedback: A pilot needs outcome criteria, a baseline, and a suitable sample. Call speed is not the same as time to a usable result.

## Forma B

### B-MA01 — U01

Fonti: M18-S02, M18-S03, M18-S11.

**Italiano**

Un assistente invia audio e testo allo stesso modello. I tool consultano un catalogo interno e cercano sul web un avviso pubblico appena emesso dal produttore; l'app genera il file di risposta in un ambiente separato.

**Quale lettura distingue capacità e sistema complessivo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Modalità audio/testo, ricerca interna/web e produzione del file sono aspetti distinti. | Le modalità non garantiscono accesso alle fonti aggiornate: catalogo, avviso web e file richiedono tool e controlli propri. |
| 0,5 | È un modello audio/testo: controllo la trascrizione, lasciando sullo sfondo il tool. | Riconosce le modalità ma non considera pertinenza e aggiornamento dei dati recuperati. |
| 0 | Il catalogo aggiorna i parametri del modello ogni volta che viene interrogato. | Consultare un catalogo fornisce dati alla sessione, non un aggiornamento automatico dei pesi. |
| 0 | Se il modello comprende audio, può creare file e accedere a ogni catalogo senza tool. | La modalità di input non concede accessi, funzioni di esportazione o permessi nell'ambiente. |

Feedback: Descrivi separatamente cosa riceve il modello, quali fonti il sistema può consultare e come produce artefatti. Più capacità possono coesistere nella stessa app.

**English**

An assistant sends audio and text to the same model. Tools query an internal catalogue and search the web for a public notice just issued by the manufacturer; the app creates the response file in a separate environment.

**Which interpretation distinguishes capabilities from the overall system?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Audio/text modalities, internal/web search, and file creation are separate aspects. | Modalities do not guarantee access to current sources: the catalogue, web notice, and file need their own tools and checks. |
| 0.5 | It is an audio/text model: check transcription, leaving the tool in the background. | It recognizes modalities but does not consider the relevance and freshness of retrieved data. |
| 0 | The catalogue updates model parameters every time it is queried. | Querying a catalogue supplies session data, not an automatic update to model weights. |
| 0 | If the model understands audio, it can create files and access any catalogue without tools. | An input modality does not grant access, export functions, or environment permissions. |

Feedback: Describe separately what the model receives, which sources the system can query, and how it produces artifacts. Several capabilities can coexist in one app.

### B-MA02 — U01

Fonti: M18-S07, M18-S08.

**Italiano**

Un processo richiede lettere originali, classificazione di reclami, previsione della domanda e conteggio di pezzi per ordine. Esistono un generatore di bozze, un classificatore e un previsore già validati, più un conteggio deterministico. Sono approvati; priorità a costo e ripetibilità.

**Quale scelta usa le capacità pertinenti?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Generazione per le lettere, classificazione per i reclami, previsione per la domanda, regole per i conteggi. | Distingue i quattro compiti e riusa i componenti già verificati senza aggiungere variabilità al conteggio. |
| 0,5 | Generazione per lettere e reclami, previsore per la domanda, regole per i conteggi. | Un generatore può classificare, ma sostituire il classificatore richiede una nuova verifica di qualità e costo. |
| 0 | Generazione per ogni passaggio, chiedendo al testo finale di contenere anche la previsione esatta. | La fluidità della risposta non prova accuratezza della previsione o correttezza del conteggio. |
| 0 | Recupero documentale per ogni passaggio, perché i documenti contengono reclami e ordini passati. | Recuperare esempi storici non esegue da solo classificazione, previsione e conteggio. |

Feedback: La scelta dipende dall'obiettivo, dai dati e dai componenti verificati disponibili, non dal fatto che un'interfaccia accetti richieste in linguaggio naturale.

**English**

A process needs original letters, complaint classification, demand forecasting, and counts of parts per order. A draft generator, a validated classifier and forecaster, and deterministic counting already exist. All are approved; cost and repeatability have priority.

**Which choice uses the relevant capabilities?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Generation for letters, classification for complaints, forecasting for demand, rules for counts. | It distinguishes the four tasks and reuses verified components without adding variability to counting. |
| 0.5 | Generation for letters and complaints, forecasting for demand, rules for counts. | A generator can classify, but replacing the classifier requires checking quality and cost again. |
| 0 | Generation for every step, asking the final text to include an exact forecast as well. | Response fluency does not prove forecast accuracy or correct counting. |
| 0 | Document retrieval for every step, because documents contain past complaints and orders. | Retrieving historical examples does not itself perform classification, forecasting, or counting. |

Feedback: Selection depends on the objective, data, and available verified components, rather than whether an interface accepts natural-language requests.

### B-MA03 — U02

Fonti: M18-S02, M18-S09.

**Italiano**

La scansione di un brief approvato indica il formato di una scheda illustrativa, ma una cifra è ambigua. Devi creare un'immagine nuova, con didascalie esatte. Hai lettura visiva/OCR, un generatore di immagini e un editor.

**Quale flusso distingue lettura e generazione?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Confermo la cifra; creo l'immagine e aggiungo le didascalie controllate. | Non trasforma una lettura incerta in un fatto; separa il nuovo visual dal contenuto verificato. |
| 0,5 | Trascrivo il brief con l'OCR e lascio l'immagine a una fase di produzione successiva. | Avvia il lavoro, ma non risolve la cifra ambigua né completa la produzione richiesta. |
| 0 | Genero una scansione più definita e considero autentica la cifra che appare. | Un dettaglio ricreato può essere inventato: la nitidezza non dimostra fedeltà alla fonte. |
| 0 | Uso l'output del lettore visivo come file finale, senza verificare se abbia prodotto un'immagine. | Una descrizione o trascrizione non coincide con l'artefatto visivo richiesto. |

Feedback: Comprensione di un'immagine, generazione di una nuova immagine e impaginazione non sono la stessa operazione. I dettagli fattuali incerti richiedono una fonte migliore.

**English**

A scan of an approved brief specifies the format for an illustrated sheet, but one digit is ambiguous. You need a new image with exact captions. Visual reading/OCR, an image generator, and an editor are available.

**Which workflow distinguishes reading from generation?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Confirm the digit; create the image and add checked captions. | It does not turn uncertain reading into a fact; it separates the new visual from verified content. |
| 0.5 | Transcribe the brief with OCR and leave the image for a later production stage. | It starts the work but neither resolves the ambiguous digit nor completes the requested production. |
| 0 | Generate a clearer scan and treat the displayed digit as authentic. | A recreated detail may be invented: sharpness does not demonstrate fidelity to the source. |
| 0 | Use the visual reader's output as the final file without checking whether it produced an image. | A description or transcript is not the requested visual artifact. |

Feedback: Understanding an image, generating a new image, and layout are not the same operation. Uncertain factual details require a better source.

### B-MA04 — U02

Fonti: M18-S03.

**Italiano**

Devi delegare lo spostamento di un evento sintetico. Hai una schermata del calendario, un'API autorizzata e già verificata per quella modifica, e un browser autorizzato con interfaccia che cambia spesso. Conta la ripetibilità.

**Quale percorso è più adatto al vincolo dichiarato?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso l'API verificata e controllo la nuova data nell'esito restituito. | Usa l'interfaccia già verificata per il compito e controlla il cambiamento di stato. |
| 0,5 | Uso il browser e verifico il salvataggio, accettando di adattare il flusso ai cambi di UI. | Può eseguire l'azione consentita, ma aggiunge fragilità rispetto all'API disponibile. |
| 0 | Faccio modificare la data nell'immagine del calendario e archivio quella come conferma. | Modificare una schermata non cambia l'evento nell'applicazione. |
| 0 | Chiedo al modello visivo di confermare lo spostamento senza usare API o browser. | La comprensione visiva non produce un'azione né una ricevuta del sistema. |

Feedback: Una schermata può aiutare a comprendere il contesto; l'azione richiede uno strumento abilitato. Si preferisce il percorso adatto al compito e ai vincoli, non il tool più spettacolare.

**English**

You need to delegate moving a synthetic event. You have a calendar screenshot, an authorized API already verified for that change, and an authorized browser whose interface changes often. Repeatability matters.

**Which route best fits the stated constraint?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the verified API and check the new date in the returned result. | It uses the interface already verified for the task and checks the state change. |
| 0.5 | Use the browser and verify saving, accepting the need to adapt to UI changes. | It can execute the allowed action but adds fragility compared with the available API. |
| 0 | Change the date in the calendar image and archive that as confirmation. | Editing a screenshot does not change the event in the application. |
| 0 | Ask the vision model to confirm the move without using the API or browser. | Visual understanding produces neither an action nor a system receipt. |

Feedback: A screenshot can help understand context; action requires an enabled tool. Prefer the route suited to the task and constraints, not the most impressive tool.

### B-MA05 — U03

Fonti: M18-S04, M18-S05, M18-S06.

**Italiano**

Nel video di una dimostrazione si sente la descrizione di una consegna, ma il passaggio dell'oggetto avviene fuori campo. Devi riassumere ciò che è verificabile e creare una nuova demo narrata. Sono disponibili analisi video/audio, generazione video e sintesi vocale.

**Come gestisci il limite della registrazione?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Distinguo il parlato dal gesto non visibile; creo una demo dichiarata sintetica. | Non attribuisce al video un'osservazione assente e separa ricostruzione illustrativa da prova. |
| 0,5 | Trascrivo il parlato e preparo la narrazione, lasciando non chiarito il gesto fuori campo. | La trascrizione è utile, ma il riepilogo deve esplicitare il limite di ciò che è visibile. |
| 0 | Genero i fotogrammi mancanti e li uso per confermare che la consegna sia avvenuta. | Una ricostruzione generata non verifica un fatto non registrato. |
| 0 | Uso l'ultimo fotogramma come prova dell'intera sequenza e sintetizzo il resto dell'audio. | Un fotogramma non descrive da solo la sequenza; un audio sintetico aggiunge contenuto, non evidenza. |

Feedback: Le modalità disponibili ampliano ciò che si può analizzare, ma non rendono visibili dati assenti. La generazione di una demo va distinta dall'analisi della registrazione.

**English**

In a demonstration video, a handover is described aloud, but the object changes hands off camera. You need to summarize what is verifiable and create a new narrated demo. Video/audio analysis, video generation, and speech synthesis are available.

**How do you handle the recording's limitation?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Separate speech from the unseen gesture; create a clearly synthetic demo. | It does not attribute an absent observation to the video and separates illustration from evidence. |
| 0.5 | Transcribe the speech and prepare narration, leaving the off-camera gesture unresolved. | The transcript is useful, but the summary must explicitly state the limits of visible evidence. |
| 0 | Generate missing frames and use them to confirm that the handover occurred. | A generated reconstruction does not verify an unrecorded fact. |
| 0 | Use the last frame as proof of the whole sequence and synthesize the remaining audio. | A frame alone does not describe the sequence; synthetic audio adds content, not evidence. |

Feedback: Available modalities expand what can be analyzed but do not reveal absent data. Generating a demo must be distinguished from analyzing the recording.

### B-MA06 — U04

Fonti: M18-S09.

**Italiano**

Ti chiedono una presentazione con immagini e un breve video a partire da note di riunione. Non sono definiti pubblico, durata o formato di consegna. Le note non autorizzano nuove promesse sul progetto.

**Come imposti la richiesta prima della produzione?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Chiarisco pubblico, durata e formato; vincolo i contenuti alle note approvate. | Richiede le informazioni che cambiano il deliverable e conserva il vincolo sulle promesse. |
| 0,5 | Chiedo uno stile visivo uniforme e una scaletta, rimandando pubblico e durata. | Aiuta l'impostazione, ma lascia aperti requisiti che guidano scelta degli strumenti e contenuti. |
| 0 | Lascio al modello pubblico e durata, chiedendogli di rendere il progetto più convincente. | Affida al modello assunzioni sostanziali e rischia di aggiungere promesse non approvate. |
| 0 | Aggiungo molti esempi stilistici e un ruolo esperto senza definire i requisiti mancanti. | Esempi e ruoli non sostituiscono obiettivi, vincoli e formato atteso. |

Feedback: Il brief va adattato al risultato e alle modalità richieste. Chiarire pochi requisiti decisivi è più utile che aggiungere istruzioni generiche o dettagli non necessari.

**English**

You are asked for a presentation with images and a short video based on meeting notes. Audience, length, and delivery format are undefined. The notes authorize no new promises about the project.

**How do you frame the request before production?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Clarify audience, length, and format; limit content to approved notes. | It requests information that changes the deliverable and preserves the constraint on promises. |
| 0.5 | Request a consistent visual style and outline, deferring audience and length. | It helps structure the work but leaves requirements open that guide tool and content choices. |
| 0 | Let the model choose audience and length, asking it to make the project more convincing. | It delegates material assumptions and risks adding unapproved promises. |
| 0 | Add many style examples and an expert role without defining missing requirements. | Examples and roles do not replace objectives, constraints, or the expected format. |

Feedback: The brief should fit the result and required modalities. Clarifying a few decisive requirements is more useful than adding generic instructions or unnecessary detail.

### B-MA07 — U05

Fonti: M18-S01, M18-S10.

**Italiano**

Per un confronto complesso fra documenti serve almeno il 95% di esiti accettabili entro 8 secondi. Sui casi rappresentativi: L con ragionamento ridotto, 80%, 1 s, costo relativo 1; R con ragionamento elevato, 96%, 6 s, costo 6. Entrambi gli ambienti sono approvati.

**Quale scelta soddisfa i requisiti forniti?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | R: raggiunge la qualità minima e resta entro il tempo consentito. | Il costo maggiore è giustificato dai requisiti che L non soddisfa sul campione fornito. |
| 0,5 | Uso L come bozza e impongo revisione umana, senza misurare il tempo finale. | Introduce un controllo utile, ma non dimostra che il flusso raggiunga qualità e durata richieste. |
| 0 | L: la risposta più rapida soddisfa il requisito anche se la qualità osservata è inferiore. | La velocità non compensa il mancato raggiungimento della soglia di qualità dichiarata. |
| 0 | R senza controlli successivi: il ragionamento elevato elimina ogni possibilità di errore. | Il 96% misurato non è una garanzia di perfezione e il ragionamento elevato non elimina gli errori. |

Feedback: Non sempre conviene il modello più economico o più rapido: la scelta deve rispettare la qualità minima e il tempo end-to-end previsto. I dati del caso sono sintetici.

**English**

For a complex document comparison you need at least 95% acceptable outcomes within 8 seconds. On representative cases: L with lower reasoning effort, 80%, 1 s, relative cost 1; R with higher effort, 96%, 6 s, cost 6. Both environments are approved.

**Which choice meets the supplied requirements?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | R: it reaches minimum quality and stays within the allowed time. | The higher cost is justified by requirements that L fails on the supplied sample. |
| 0.5 | Use L for a draft and require human review, without measuring final time. | It adds a useful check but does not demonstrate that the workflow meets quality and time requirements. |
| 0 | L: the faster response meets the requirement despite lower observed quality. | Speed does not compensate for failing the stated quality threshold. |
| 0 | R without later checks: higher reasoning effort eliminates every possibility of error. | Measured 96% performance is not a guarantee of perfection, and higher reasoning effort does not eliminate errors. |

Feedback: The cheapest or fastest model is not always suitable: selection must meet minimum quality and end-to-end time requirements. Case data is synthetic.

### B-MA08 — U06

Fonti: M18-S07, M18-S09.

**Italiano**

Una dashboard AI riporta conversione del 28% e la attribuisce al nuovo chatbot. La tabella sorgente del periodo contiene 100 visite e 20 iscrizioni. Mancano confronto precedente e controllo di altri cambiamenti.

**Quale controllo rende la conclusione sostenibile?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Ricalcolo il 20% e separo il dato dall'effetto del chatbot non dimostrato. | Controlla la metrica e limita la conclusione a ciò che la tabella consente di affermare. |
| 0,5 | Correggo la percentuale al 20% e mantengo il chatbot come causa probabile nel titolo. | Corregge il calcolo ma continua a presentare un effetto causale privo di confronto. |
| 0 | Mantengo il 28% e cambio i filtri finché il grafico restituisce lo stesso numero. | Adattare i filtri alla conclusione non verifica la metrica originaria. |
| 0 | Chiedo al modello se la conversione sia ragionevole e uso la sua conferma. | Una conferma di plausibilità non ricostruisce il rapporto iscrizioni/visite né l'effetto del chatbot. |

Feedback: Per verificare una dashboard occorre risalire a metrica, dati e perimetro. Il fatto che due cambiamenti coincidano non dimostra un nesso causale.

**English**

An AI dashboard reports 28% conversion and attributes it to the new chatbot. The period's source table contains 100 visits and 20 sign-ups. There is no earlier comparison or control for other changes.

**Which check makes the conclusion supportable?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Recalculate 20% and separate the figure from the unproven chatbot effect. | It checks the metric and limits the conclusion to what the table supports. |
| 0.5 | Correct the percentage to 20% and retain the chatbot as the likely cause in the title. | It fixes the calculation but still presents a causal effect without comparison evidence. |
| 0 | Keep 28% and change filters until the chart produces the same number. | Adapting filters to fit a conclusion does not verify the original metric. |
| 0 | Ask the model whether the conversion is reasonable and use its confirmation. | Plausibility confirmation reconstructs neither the sign-ups/visits ratio nor the chatbot effect. |

Feedback: Verifying a dashboard requires tracing the metric, data, and scope. Two changes occurring together do not demonstrate causation.

### B-MA09 — U07

Fonti: M18-S10, M18-S09.

**Italiano**

La policy consente un servizio esterno solo per categoria del ticket e mese, entrambi non riservati nel caso. L'export include anche nomi, email e testo riservato. Un tool locale non approvato registra tutti i campi in log accessibili al team.

**Quale configurazione rispetta finalità e dati consentiti?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Invio al servizio approvato solo categoria e mese, verificando l'export ridotto. | Usa i soli campi consentiti e un trattamento già approvato; locale non significa automaticamente adeguato. |
| 0,5 | Rimuovo nomi ed email ma lascio il testo dei ticket nel file prima di scegliere il servizio. | La minimizzazione è parziale: resta testo riservato che il servizio non può ricevere. |
| 0 | Uso il tool locale con tutti i campi: la località rende irrilevanti accessi e log. | La policy e l'esposizione dei log restano rilevanti anche con elaborazione locale. |
| 0 | Carico l'export completo nel servizio approvato e gli chiedo di ignorare i campi vietati. | Un'istruzione di ignorare i campi non impedisce che vengano trasmessi. |

Feedback: Autorizzazione, minimizzazione, conservazione e accessi vanno verificati sul caso. Le etichette cloud o locale non sostituiscono questi controlli.

**English**

Policy allows an external service only for ticket category and month, both non-confidential in this case. The export also includes names, emails, and confidential text. An unapproved local tool logs all fields where the team can access them.

**Which configuration respects the purpose and permitted data?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Send only category and month to the approved service, checking the reduced export. | It uses only permitted fields and approved processing; local does not automatically mean appropriate. |
| 0.5 | Remove names and emails but leave ticket text in the file before selecting a service. | Minimization is partial: confidential text remains that the service is not allowed to receive. |
| 0 | Use the local tool with all fields: locality makes access and logs irrelevant. | Policy and log exposure remain relevant even with local processing. |
| 0 | Upload the full export to the approved service and ask it to ignore forbidden fields. | An instruction to ignore fields does not prevent their transmission. |

Feedback: Authorization, minimization, retention, and access need checking for the case. Cloud or local labels do not replace these controls.

### B-MA10 — U08

Fonti: M18-S01, M18-S12.

**Italiano**

Devi scegliere fra una chat e un flusso con ricerca documentale per rispondere a domande sulle procedure interne. Entrambi sono approvati. Una demo non basta a capire qualità delle risposte, pertinenza delle citazioni e carico di revisione.

**Quale confronto informa la scelta operativa?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso gli stessi casi rappresentativi e verifico risposte, fonti, errori e tempo totale. | Confronta esiti verificabili e lavoro umano a parità di compito, includendo i casi difficili. |
| 0,5 | Uso le stesse domande e confronto solo la velocità, senza controllare cosa sostengono le fonti. | Controlla parte del confronto ma omette correttezza, citazioni e revisione necessaria. |
| 0 | Scelgo la ricerca documentale senza prove perché la presenza di citazioni garantisce la verità. | Fonti recuperate o citazioni esistenti possono essere irrilevanti o interpretate male. |
| 0 | Scelgo il sistema con la demo più fluida e ignoro gli errori sui casi ordinari del team. | La fluidità della demo non misura affidabilità o valore nel processo reale. |

Feedback: Definisci in anticipo qualità attesa, casi e criteri. Valuta anche correzioni, casi senza risposta e costi, non soltanto la prima risposta generata.

**English**

You need to choose between chat and a document-search workflow for internal procedure questions. Both are approved. A demo cannot establish answer quality, citation relevance, or review effort.

**Which comparison informs the operational choice?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the same representative cases and check answers, sources, errors, and total time. | It compares verifiable outcomes and human work on the same tasks, including difficult cases. |
| 0.5 | Use the same questions and compare speed only, without checking what sources support. | It controls part of the comparison but omits correctness, citations, and required review. |
| 0 | Choose document search without testing because citations guarantee truth. | Retrieved sources or existing citations may be irrelevant or misinterpreted. |
| 0 | Choose the system with the smoothest demo and ignore errors on the team's routine cases. | Demo fluency does not measure reliability or value in the actual process. |

Feedback: Define expected quality, cases, and criteria in advance. Also assess corrections, unanswerable cases, and costs, not just the first generated answer.

## Forma C

### C-MA01 — U01

Fonti: M18-S02, M18-S03, M18-S11.

**Italiano**

Un'app invia un'immagine e una richiesta allo stesso modello per classificare un oggetto. I tool leggono il catalogo interno e cercano sul web le nuove specifiche pubbliche; il risultato è validato in un ambiente isolato prima di creare una scheda.

**Quale descrizione evita di confondere capacità e componenti?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Classificazione multimodale, ricerca interna/web e validazione nell'ambiente. | Distingue il compito del modello da accesso a fonti interne, aggiornamenti web e controlli del sistema. |
| 0,5 | Classificazione visiva del modello; considero catalogo e validazione dettagli accessori. | Riconosce il compito visivo ma trascura componenti che influenzano affidabilità e accesso. |
| 0 | Generazione di immagini, perché ogni modello che riceve immagini deve crearne altre. | La modalità di input non determina il tipo di output né il compito svolto. |
| 0 | Agente con accesso libero: riconoscere un oggetto comporta poter modificare il catalogo. | Comprensione e classificazione non concedono permessi di modifica. |

Feedback: Classificazione, modalità multimodale, app, fonti e ambiente possono coesistere. Per scegliere e verificare il sistema bisogna distinguere queste responsabilità.

**English**

An app sends an image and a request to the same model to classify an object. Tools read the internal catalogue and search the web for new public specifications; the result is validated in an isolated environment before a sheet is created.

**Which description avoids confusing capabilities and components?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Multimodal classification, internal/web search, and environment validation. | It distinguishes the model's task from access to internal sources, web updates, and system checks. |
| 0.5 | Visual model classification; treat catalogue retrieval and validation as incidental details. | It recognizes the visual task but overlooks components affecting reliability and access. |
| 0 | Image generation, because every model receiving images must create new ones. | Input modality does not determine output type or the task performed. |
| 0 | An unrestricted agent: recognizing an object entails being able to modify the catalogue. | Understanding and classification do not grant editing permissions. |

Feedback: Classification, multimodal input, the app, sources, and environment can coexist. Selecting and checking the system requires distinguishing those responsibilities.

### C-MA02 — U01

Fonti: M18-S07, M18-S08.

**Italiano**

Per un servizio devi scrivere spiegazioni originali, assegnare richieste a categorie, stimare il carico futuro e applicare una formula di rimborso già definita. Sono disponibili generatore, classificatore validato, previsore validato e funzione deterministica; tutti approvati, con priorità a ripetibilità e costo.

**Quale assegnazione rispetta la natura dei compiti?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Generatore per spiegazioni, classificatore per categorie, previsore per carico, formula per rimborsi. | Riusa le verifiche esistenti e non sostituisce una regola esatta con una generazione variabile. |
| 0,5 | Generatore per spiegazioni e categorie, previsore per carico, formula per rimborsi. | Può essere una soluzione alternativa, ma la classificazione generativa richiederebbe verifica rispetto al componente validato. |
| 0 | Generatore per tutto, facendo dipendere rimborsi e stime solo dalla plausibilità del testo. | La forma del testo non dimostra rispetto della formula o accuratezza previsionale. |
| 0 | Ricerca nei casi passati per tutto, senza eseguire la formula o un modello di previsione. | I casi recuperati forniscono contesto ma non sostituiscono il calcolo richiesto. |

Feedback: Un LLM può partecipare a più attività, ma non serve a sostituire ogni procedura. La scelta va motivata rispetto al compito, alle prove e ai vincoli forniti.

**English**

For a service you need original explanations, request categorization, future-load estimates, and an already defined refund formula. A generator, validated classifier, validated forecaster, and deterministic function are available; all are approved, with repeatability and cost prioritized.

**Which allocation respects the nature of the tasks?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Generator for explanations, classifier for categories, forecaster for load, formula for refunds. | It reuses existing validation and does not replace an exact rule with variable generation. |
| 0.5 | Generator for explanations and categories, forecaster for load, formula for refunds. | It may be an alternative, but generative classification would need checking against the validated component. |
| 0 | Generator for everything, basing refunds and estimates only on text plausibility. | Text presentation demonstrates neither adherence to the formula nor forecast accuracy. |
| 0 | Search past cases for everything, without running the formula or a forecasting model. | Retrieved cases provide context but do not replace the required calculation. |

Feedback: An LLM can contribute to several activities, but need not replace every procedure. Selection should be justified by the task, evidence, and supplied constraints.

### C-MA03 — U02

Fonti: M18-S02, M18-S09.

**Italiano**

Devi trasformare un report scansionato in un'infografica con illustrazione originale. Il grafico nella scansione è poco leggibile, ma è disponibile la tabella verificata con valori e unità. Hai lettura visiva, grafici da dati e generazione di immagini.

**Come mantieni separati dati e nuovo contenuto visivo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso la tabella per il grafico e genero separatamente l'illustrazione. | Mantiene i dati verificabili e usa la generazione per il nuovo contenuto illustrativo. |
| 0,5 | Trascrivo la scansione e descrivo l'infografica, lasciando grafico e illustrazione da produrre. | Avvia il brief ma non realizza gli artefatti richiesti, pur essendo disponibili gli strumenti. |
| 0 | Rigenero il grafico dalla scansione sfocata e assumo esatti i valori disegnati. | La somiglianza visiva non garantisce il rispetto dei numeri della tabella. |
| 0 | Chiedo al lettore visivo un'immagine finale e salto il confronto con la tabella. | Comprendere la scansione non equivale a generare un artefatto quantitativamente corretto. |

Feedback: Un'immagine gradevole non è una verifica dei dati. Per il grafico servono valori e unità controllati; l'illustrazione generata ha uno scopo diverso.

**English**

You need to turn a scanned report into an infographic with an original illustration. Its chart is hard to read, but a verified table with values and units is available. Visual reading, data-driven charting, and image generation are available.

**How do you keep data separate from new visual content?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the table for the chart and generate the illustration separately. | It keeps data verifiable and uses generation for new illustrative content. |
| 0.5 | Transcribe the scan and describe the infographic, leaving chart and illustration to be produced. | It starts the brief but does not produce the required artifacts despite available tools. |
| 0 | Regenerate the chart from the blurred scan and assume drawn values are exact. | Visual similarity does not guarantee adherence to the table's numbers. |
| 0 | Ask the visual reader for a final image and skip comparison with the table. | Understanding the scan is not equivalent to generating a quantitatively correct artifact. |

Feedback: An attractive image does not verify data. A chart needs checked values and units; a generated illustration serves a different purpose.

### C-MA04 — U02

Fonti: M18-S03.

**Italiano**

Una schermata mostra l'anteprima di un report. Devi delegare l'esportazione del PDF completo. L'app consente al browser autorizzato di scaricarlo; un lettore visivo può solo descrivere la schermata.

**Quale azione può soddisfare la richiesta?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Esporto con il browser e verifico che il PDF contenga tutto il report. | Usa uno strumento capace di agire e controlla l'artefatto prodotto, non solo l'anteprima. |
| 0,5 | Consegno le istruzioni alla persona perché esegua e controlli l'esportazione. | È un passaggio di consegne valido, ma non esegue la delega con lo strumento disponibile. |
| 0 | Salvo l'immagine dell'anteprima come PDF e la considero il documento completo. | L'anteprima può omettere pagine o contenuti: cambiarne il formato non li recupera. |
| 0 | Chiedo al lettore visivo di confermare il download senza usare il browser. | Descrivere una schermata non avvia un download né verifica il file risultante. |

Feedback: Per completare un'attività servono strumento adatto, permesso ed esito verificabile. Il quiz non scarica file e non accede al dispositivo del rispondente.

**English**

A screenshot shows a report preview. You need to delegate exporting the complete PDF. The app allows an authorized browser to download it; a visual reader can only describe the screen.

**Which action can satisfy the request?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Export with the browser and verify that the PDF contains the complete report. | It uses an action-capable tool and checks the produced artifact, not just the preview. |
| 0.5 | Give instructions to the person to perform and check the export. | It is a valid handoff but does not execute the delegation using the available tool. |
| 0 | Save the preview image as a PDF and treat it as the complete document. | A preview may omit pages or content: changing its format does not recover them. |
| 0 | Ask the visual reader to confirm the download without using the browser. | Describing a screen neither initiates a download nor checks the resulting file. |

Feedback: Completing a task needs a suitable tool, permission, and a verifiable outcome. This question downloads no files and does not access the respondent's device.

### C-MA05 — U03

Fonti: M18-S04, M18-S05, M18-S06.

**Italiano**

Un filmato con audio documenta l'uso di un dispositivo dimostrativo. Devi verificare ordine dei gesti e istruzioni pronunciate, poi produrre una clip illustrativa narrata. Sono dichiarate capacità di analisi video/audio, generazione video e sintesi vocale.

**Quale approccio distingue le evidenze dalla nuova clip?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Controllo sequenza e parlato nell'originale; creo poi una clip dichiarata sintetica. | Usa le modalità pertinenti per verificare l'originale e distingue il nuovo contenuto. |
| 0,5 | Trascrivo l'audio e preparo la narrazione, lasciando da verificare l'ordine dei gesti. | La trascrizione aiuta il testo, ma non basta a controllare la sequenza visiva. |
| 0 | Genero una clip plausibile dal parlato e la uso per verificare i gesti dell'originale. | La generazione non è un controllo indipendente su ciò che la registrazione mostra. |
| 0 | Estraggo un fotogramma e tratto la voce sintetica come conferma della procedura completa. | Una foto non mostra l'ordine degli eventi e una voce creata non prova istruzioni registrate. |

Feedback: Analisi e generazione richiedono controlli diversi. Tempi, parlato e azioni vanno verificati nell'input pertinente, indicando ciò che rimane incerto.

**English**

A video with audio documents use of a demonstration device. You need to check gesture order and spoken instructions, then produce a narrated illustrative clip. Video/audio analysis, video generation, and speech synthesis are explicitly supported.

**Which approach distinguishes evidence from the new clip?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Check sequence and speech in the original; then create a clearly synthetic clip. | It uses relevant modalities to check the original and distinguishes newly created content. |
| 0.5 | Transcribe the audio and prepare narration, leaving gesture order to be checked. | Transcription helps the text but is insufficient to check the visual sequence. |
| 0 | Generate a plausible clip from the speech and use it to verify the original gestures. | Generation is not an independent check on what the recording shows. |
| 0 | Extract one frame and treat synthetic speech as confirmation of the entire procedure. | A photo does not show event order, and generated speech does not prove recorded instructions. |

Feedback: Analysis and generation require different checks. Timing, speech, and actions need checking in the relevant input, identifying what remains uncertain.

### C-MA06 — U04

Fonti: M18-S09.

**Italiano**

Devi far preparare un confronto da documenti interni. Due allegati usano definizioni diverse di cliente attivo; non è chiaro quali esclusioni applicare. Il risultato deve essere riconducibile ai dati forniti.

**Quale indicazione riduce le assunzioni non autorizzate?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Chiedi definizione e perimetro; segnala le differenze prima di produrre il confronto. | Tratta l'ambiguità che cambierebbe la metrica e rende verificabile il criterio usato. |
| 0,5 | Crea una tabella leggibile e cita entrambi gli allegati, senza risolvere le definizioni. | Cita le fonti ma lascia il confronto fra quantità potenzialmente non omogenee. |
| 0 | Scegli la definizione che produce il risultato più convincente e non mostrare le alternative. | La preferenza per un risultato non è un criterio autorizzato per definire la metrica. |
| 0 | Scrivi una richiesta più lunga e ripeti che il confronto deve essere corretto, senza chiarimenti. | Ripetere un obiettivo non risolve un'informazione mancante che determina il calcolo. |

Feedback: Un brief verificabile rende espliciti definizioni, fonti e criteri di accettazione. Quando un'ambiguità cambia il risultato, conviene chiarirla anziché inventare una convenzione.

**English**

You need a comparison prepared from internal documents. Two attachments use different definitions of an active customer; required exclusions are unclear. The result must be traceable to the supplied data.

**Which instruction reduces unauthorized assumptions?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Ask for the definition and scope; identify differences before producing the comparison. | It addresses ambiguity that would change the metric and makes the criterion verifiable. |
| 0.5 | Create a readable table and cite both attachments without resolving the definitions. | It cites sources but leaves a comparison between potentially incompatible quantities. |
| 0 | Choose the definition producing the most convincing result and omit alternatives. | Preference for a result is not an authorized criterion for defining the metric. |
| 0 | Write a longer request and repeat that the comparison must be correct, without clarification. | Repeating an objective does not resolve missing information that determines the calculation. |

Feedback: A verifiable brief makes definitions, sources, and acceptance criteria explicit. When ambiguity changes the result, clarify it rather than inventing a convention.

### C-MA07 — U05

Fonti: M18-S01, M18-S10.

**Italiano**

Un'analisi deve restare nella rete locale, superare il 97% di esiti accettabili e concludersi entro 8 secondi. L elabora localmente con ragionamento moderato: 99%, 6 s, costo relativo 3. R è remoto: 99%, 1 s, costo 1. Sono prove sintetiche sul compito.

**Quale scelta soddisfa tutti i vincoli?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | L: rispetta località, qualità e tempo, pur costando di più. | Il costo inferiore di R non supera il vincolo esplicito sul luogo di elaborazione. |
| 0,5 | Mantengo il lavoro locale e sospendo l'uso di L per chiedere un'ulteriore prova non richiesta. | Non espone i dati, ma rinvia una scelta già sostenuta dalle prove e dai vincoli forniti. |
| 0 | R: ha la stessa qualità e costo minore, quindi il vincolo di località può essere ignorato. | Qualità e costo non autorizzano a violare una condizione di elaborazione dichiarata. |
| 0 | R con un prompt che chiede di restare locale, senza cambiare l'ambiente remoto. | Un'istruzione testuale non cambia il luogo in cui il servizio esegue il modello. |

Feedback: La scelta include qualità, durata, costo e località. Il livello di ragionamento è una configurazione da valutare sul compito, non una garanzia o un permesso sui dati.

**English**

An analysis must stay on the local network, exceed 97% acceptable outcomes, and finish within 8 seconds. L processes locally with moderate reasoning: 99%, 6 s, relative cost 3. R is remote: 99%, 1 s, cost 1. These are synthetic task measurements.

**Which choice meets all constraints?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | L: it meets locality, quality, and time constraints despite higher cost. | R's lower cost does not override the explicit processing-location constraint. |
| 0.5 | Keep work local and defer using L to request an additional test not required by the case. | It does not expose data but postpones a choice already supported by the supplied evidence and constraints. |
| 0 | R: it has equal quality and lower cost, so the locality constraint can be ignored. | Quality and cost do not authorize violating a stated processing condition. |
| 0 | R with a prompt asking it to stay local, without changing the remote environment. | A text instruction does not change where the service runs the model. |

Feedback: Selection includes quality, duration, cost, and locality. Reasoning effort is a configuration to evaluate on the task, not a guarantee or a data permission.

### C-MA08 — U06

Fonti: M18-S07, M18-S09.

**Italiano**

Un documento AI riporta 55 richieste evase e attribuisce il miglioramento a un nuovo processo. La tabella del periodo contiene gruppi da 10, 20 e 30 richieste; non ci sono baseline o altri dati sull'effetto del processo.

**Come verifichi il risultato prima dell'uso?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Ricalcolo 60 richieste e separo il totale dall'effetto causale non dimostrato. | Usa i dati disponibili per il totale e riconosce ciò che manca per attribuire un effetto. |
| 0,5 | Correggo 55 in 60 e mantengo il miglioramento causato dal processo come interpretazione probabile. | La correzione aritmetica non aggiunge la baseline necessaria alla conclusione causale. |
| 0 | Lascio 55 perché la differenza è piccola e la conclusione generale sembra sensata. | La plausibilità non giustifica un totale errato o un effetto non verificato. |
| 0 | Chiedo una riformulazione più prudente senza confrontare il testo con la tabella. | Cambiare il tono non verifica i dati né corregge il calcolo. |

Feedback: Controlla separatamente il valore numerico e l'interpretazione. Le verifiche devono essere indipendenti dalla sicurezza con cui il modello presenta la conclusione.

**English**

An AI document reports 55 completed requests and attributes improvement to a new process. The period's table contains groups of 10, 20, and 30 requests; there is no baseline or other evidence of the process's effect.

**How do you check the result before use?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Recalculate 60 requests and separate the total from the unproven causal effect. | It uses available data for the total and recognizes what is missing for causal attribution. |
| 0.5 | Correct 55 to 60 and retain process-caused improvement as the likely interpretation. | The arithmetic correction does not add the baseline needed for a causal conclusion. |
| 0 | Keep 55 because the difference is small and the general conclusion seems reasonable. | Plausibility justifies neither an incorrect total nor an unverified effect. |
| 0 | Request more cautious wording without comparing the text with the table. | Changing tone neither verifies data nor corrects the calculation. |

Feedback: Check the numeric value separately from its interpretation. Checks must be independent of how confidently the model presents the conclusion.

### C-MA09 — U07

Fonti: M18-S10, M18-S09.

**Italiano**

La policy permette il servizio grafico esterno solo per materiale pubblico o sintetico già autorizzato. Devi illustrare un concetto; hai immagini riservate di un prototipo e un set sintetico approvato che basta allo scopo.

**Quale input scegli per il servizio?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso il set sintetico approvato, limitato agli elementi utili all'illustrazione. | Raggiunge lo scopo nel perimetro consentito senza divulgare il prototipo. |
| 0,5 | Tolgo i nomi del progetto dalle foto del prototipo, lasciando i dettagli riservati. | Riduce alcuni identificatori ma non rende autorizzati i contenuti riservati rimasti. |
| 0 | Carico il prototipo completo e chiedo al generatore di non memorizzarlo dopo la risposta. | La richiesta non impedisce l'invio dei dati vietati né modifica le condizioni del servizio. |
| 0 | Rinomino le foto con codici generici e considero così pubblici i contenuti del prototipo. | Il nome del file non cambia la riservatezza dell'immagine. |

Feedback: Ogni modalità può contenere informazioni riservate: immagini, metadati e testo vanno trattati secondo lo scopo e la policy fornita. Non è richiesta memoria di norme giuridiche.

**English**

Policy allows the external graphics service only for public or already authorized synthetic material. You need to illustrate a concept; you have confidential prototype images and an approved synthetic set sufficient for the task.

**Which input do you choose for the service?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the approved synthetic set, limited to elements useful for the illustration. | It achieves the objective within the allowed scope without disclosing the prototype. |
| 0.5 | Remove project names from prototype photos, leaving confidential details. | It reduces some identifiers but does not authorize the remaining confidential content. |
| 0 | Upload the complete prototype and ask the generator not to remember it after responding. | The request neither prevents forbidden data transmission nor changes service conditions. |
| 0 | Rename photos with generic codes and treat the prototype content as public. | A filename does not change image confidentiality. |

Feedback: Any modality may contain confidential information: images, metadata, and text must follow the supplied purpose and policy. Memorization of legal rules is not required.

### C-MA10 — U08

Fonti: M18-S01, M18-S12.

**Italiano**

Un nuovo modello produce bozze più rapidamente, ma richiede correzioni più lunghe del metodo attuale. Devi scegliere il processo per il prossimo ciclo di lavoro, considerando anche una soluzione senza AI.

**Quale confronto aiuta a decidere se adottarlo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Confronto qualità, costi ed errori sullo stesso campione fino all'output utilizzabile. | Include il costo di verifica e conserva il processo non AI come baseline effettiva. |
| 0,5 | Cronometro le prime risposte sugli stessi casi, annotando ma senza misurare le correzioni. | Rende il confronto parziale: il tempo di revisione può annullare il vantaggio iniziale. |
| 0 | Adotto il modello perché il tempo di generazione è minore, ignorando la revisione. | La generazione è solo una parte del tempo necessario a un risultato accettabile. |
| 0 | Confronto i casi migliori del modello con quelli più difficili del processo attuale. | I campioni sbilanciati non isolano il contributo del nuovo processo. |

Feedback: Adotta, correggi o scarta un uso dell'AI in base al risultato complessivo. Una misura ripetibile comprende qualità attesa, errori e interventi umani su casi comparabili.

**English**

A new model produces drafts faster but requires longer corrections than the current method. You need to choose the process for the next work cycle, also considering a solution without AI.

**Which comparison helps decide whether to adopt it?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Compare quality, costs, and errors on the same sample through a usable output. | It includes verification cost and keeps the non-AI process as an actual baseline. |
| 0.5 | Time first responses on the same cases, noting corrections but not measuring them. | It makes the comparison partial: review time may eliminate the initial advantage. |
| 0 | Adopt the model because generation is faster, ignoring review. | Generation is only part of the time needed for an acceptable result. |
| 0 | Compare the model's best cases with the current process's most difficult cases. | Unbalanced samples do not isolate the contribution of the new process. |

Feedback: Adopt, revise, or reject an AI use based on the complete outcome. Repeatable measurement includes expected quality, errors, and human interventions on comparable cases.
