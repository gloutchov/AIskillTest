# Primi passi con l'AI / AI First Steps

Questo documento definisce il blueprint editoriale e didattico del percorso introduttivo previsto dalla milestone 13. Il percorso è un'esperienza di apprendimento statica e bilingue, non una versione facile dell'assessment, una certificazione o un test psicometricamente validato.

Stato del documento: proposta per validazione del maintainer.

Data di verifica delle fonti: 2026-07-11.

## 1. Posizionamento

Nome italiano: `Primi passi con l'AI`.

Nome inglese: `AI First Steps`.

Promessa italiana:

> Dieci situazioni guidate per scoprire le basi dell'AI generativa. Alla fine, gli errori diventano spiegazioni ed esercizi brevi per continuare a imparare.

English promise:

> Ten guided situations to discover the foundations of generative AI. At the end, mistakes become short explanations and exercises for continued learning.

Il percorso è rivolto a persone con poca esperienza, a chi non si riconosce nel linguaggio tecnico dell'assessment e a chi vuole capire i principi essenziali prima di affrontare un test tematico.

Il risultato:

- si chiama `Preparazione sulle basi` / `Foundational readiness`
- descrive esclusivamente le aree esplorate nelle dieci domande
- non produce l'indice AI Skill
- non produce i profili Beginner, Curious, Expert o Champion
- non è confrontabile con il test completo o con i percorsi tematici
- serve a scegliere che cosa ripassare e quale percorso affrontare successivamente

## 2. Principi editoriali

- Usare situazioni quotidiane e verbi concreti.
- Evitare gergo non spiegato, nomi di prodotti e conoscenze legate a una singola interfaccia.
- Chiedere che cosa è più utile, prudente o verificabile, non quale definizione è stata memorizzata.
- Evitare trabocchetti: le alternative errate devono rappresentare equivoci realistici.
- Non trasformare ogni domanda in un messaggio allarmistico; possibilità e limiti devono restare entrambi visibili.
- Non usare item dichiarativi per assegnare un errore didattico: il percorso usa comprensione, scenari e scelte operative.
- Mostrare le alternative in ordine casuale, mantenendo stabile il significato della risposta corretta.
- Spiegare gli errori con tono non giudicante e senza etichette sulla persona.
- Rendere il tutorial locale autosufficiente; le fonti esterne sono un passo facoltativo.

## 3. Matrice 2+2+2+2+2

Ogni forma contiene una domanda per ciascuno dei dieci obiettivi. Le cinque aree ricevono quindi due domande ciascuna.

| Area | ID | Obiettivo verificabile | Evidenza attesa |
| --- | --- | --- | --- |
| Possibilità della GenAI | `CAP-1` | Riconoscere che un sistema generativo produce nuovi contenuti a partire da input e pattern appresi | Distingue generazione da ricerca o archivio automatico |
| Possibilità della GenAI | `CAP-2` | Scegliere compiti adatti come supporto, mantenendo scopo e decisione umani | Usa l'AI per alternative, bozze o trasformazioni, non come autorità finale |
| Limiti e falsa sicurezza | `LIM-1` | Distinguere una risposta plausibile da una risposta verificata | Non usa tono, precisione o sicurezza come prova |
| Limiti e falsa sicurezza | `LIM-2` | Riconoscere limiti di aggiornamento e contesto | Verifica data, perimetro e informazioni mancanti |
| Richieste e contesto | `REQ-1` | Formulare una richiesta con obiettivo, contesto e formato | Riduce assunzioni inutili e rende l'output valutabile |
| Richieste e contesto | `REQ-2` | Migliorare il risultato attraverso iterazione, esempi e correzioni | Tratta il primo output come una bozza da orientare |
| Verifica di fonti e output | `VER-1` | Eseguire una verifica indipendente di fatti e riferimenti | Apre e confronta fonti esterne pertinenti |
| Verifica di fonti e output | `VER-2` | Proporzionare controllo e supervisione al rischio | Aumenta le verifiche quando l'impatto aumenta |
| Privacy e responsabilità | `DAT-1` | Riconoscere dati personali, riservati o non autorizzati prima dell'invio | Minimizza i dati e controlla strumento e policy |
| Privacy e responsabilità | `DAT-2` | Mantenere responsabilità, trasparenza e rispetto dei diritti | Revisiona, dichiara l'uso quando rilevante e verifica permessi |

## 4. Forme parallele

Le forme sono equivalenti per progetto, non per dimostrazione psicometrica. Ogni forma contiene gli stessi dieci obiettivi, nello stesso rapporto tra comprensione e scenari, con contesti differenti.

Legenda tipo:

- `C`: comprensione di un principio
- `S`: scenario con scelta operativa

| Slot | Obiettivo | Forma A | Forma B | Forma C |
| ---: | --- | --- | --- | --- |
| 1 | `CAP-1` | C: che cosa fa un generatore | C: riassunto non equivale a ricerca | C: immagine generata non proviene da un catalogo |
| 2 | `CAP-2` | S: idee per una riunione | S: prima bozza di email | S: alternative per organizzare un'attività |
| 3 | `LIM-1` | S: numero preciso senza fonte | S: citazione completa ma non aperta | S: risposta confermata con tono sicuro |
| 4 | `LIM-2` | S: orari o regole recenti | S: confronto prodotti aggiornabile | S: procedura interna non fornita |
| 5 | `REQ-1` | S: riassunto per un pubblico | S: tabella operativa | S: messaggio con tono e vincoli |
| 6 | `REQ-2` | S: primo output generico | S: formato sbagliato | S: assunzione errata |
| 7 | `VER-1` | S: fonte bibliografica | S: dato statistico | S: istruzione normativa |
| 8 | `VER-2` | S: invito informale vs comunicazione ufficiale | S: idea creativa vs decisione economica | S: appunti personali vs consiglio sanitario |
| 9 | `DAT-1` | S: elenco clienti | S: curriculum ricevuti | S: verbale interno |
| 10 | `DAT-2` | S: documento destinato all'esterno | S: immagine per una campagna | S: raccomandazione a un collega |

L'ordine in tabella è editoriale. Nell'app le dieci domande vengono mescolate, preservando la copertura della forma scelta.

## 5. Banca domande italiana

Ogni domanda ha quattro alternative. La risposta corretta è identificata per il maintainer, ma posizione e lettera non devono apparire nell'app.

### Forma A

#### `N_A_CAP_1` - `CAP-1` - C

**Domanda:** Quale descrizione rappresenta meglio ciò che fa un sistema di AI generativa quando risponde a una richiesta?

- A. Cerca sempre sul web e copia la pagina più pertinente.
- B. Genera un contenuto usando l'input ricevuto e pattern appresi dai dati. **[corretta]**
- C. Recupera sempre una risposta già scritta e conservata in un archivio.
- D. Verifica automaticamente che ogni frase sia vera prima di mostrarla.

#### `N_A_CAP_2` - `CAP-2` - S

**Domanda:** Devi preparare idee per una riunione di team. Quale uso dell'AI è più utile come primo passo?

- A. Chiederle diverse proposte, poi confrontarle con obiettivo e vincoli reali. **[corretta]**
- B. Chiederle di scegliere da sola la proposta definitiva per il team.
- C. Accettare la prima idea perché generata rapidamente.
- D. Evitare l'AI: le idee generate non possono mai essere utili.

#### `N_A_LIM_1` - `LIM-1` - S

**Domanda:** Un chatbot fornisce un numero molto preciso, ma non indica da dove proviene. Come lo consideri?

- A. Affidabile, perché la precisione indica un calcolo reale.
- B. Probabilmente vero se la frase è scritta con sicurezza.
- C. Un dato da verificare prima di usarlo. **[corretta]**
- D. Sicuramente falso, perché i chatbot non possono usare numeri.

#### `N_A_LIM_2` - `LIM-2` - S

**Domanda:** Vuoi conoscere una regola o un orario che potrebbe essere cambiato di recente. Che cosa fai?

- A. Uso la risposta del modello senza altre verifiche.
- B. Chiedo al modello di rispondere con maggiore sicurezza.
- C. Controllo una fonte ufficiale aggiornata e la data di validità. **[corretta]**
- D. Considero valida la risposta se contiene molti dettagli.

#### `N_A_REQ_1` - `REQ-1` - S

**Domanda:** Vuoi far riassumere un testo per persone che non conoscono l'argomento. Quale richiesta è più utile?

- A. "Riassumi."
- B. "Scrivi qualcosa di interessante su questo testo."
- C. "Riassumi il testo in cinque punti, per un pubblico non tecnico, spiegando i termini indispensabili." **[corretta]**
- D. "Produci il miglior riassunto possibile senza farmi domande."

#### `N_A_REQ_2` - `REQ-2` - S

**Domanda:** La prima risposta dell'AI è generica. Qual è il passo successivo più utile?

- A. Ripetere identica la domanda finché cambia risposta.
- B. Aggiungere contesto, indicare che cosa manca e chiedere una nuova versione. **[corretta]**
- C. Considerare il primo output come il massimo possibile.
- D. Cambiare immediatamente strumento senza chiarire il compito.

#### `N_A_VER_1` - `VER-1` - S

**Domanda:** L'AI propone titolo, autore e link di una fonte. Prima di citarla, che cosa fai?

- A. La uso: tanti dettagli dimostrano che esiste.
- B. Apro il link e verifico identità, contenuto e sostegno alla frase. **[corretta]**
- C. Chiedo allo stesso chatbot se la fonte è reale.
- D. Controllo soltanto che il link abbia un aspetto professionale.

#### `N_A_VER_2` - `VER-2` - S

**Domanda:** In quale caso serve una revisione più rigorosa dell'output AI?

- A. Un elenco privato di possibili titoli per una playlist.
- B. Una comunicazione ufficiale che può influenzare altre persone. **[corretta]**
- C. Una lista informale di idee da scartare o modificare.
- D. Un esercizio creativo che non verrà pubblicato.

#### `N_A_DAT_1` - `DAT-1` - S

**Domanda:** Devi analizzare un elenco con nomi, email e note sui clienti. Prima di caricarlo in uno strumento AI, che cosa fai?

- A. Lo carico se lo strumento è facile da usare.
- B. Tolgo soltanto il nome del file.
- C. Verifico autorizzazione e policy, scelgo uno strumento approvato e riduco i dati al minimo necessario. **[corretta]**
- D. Lo trasformo in PDF, perché così i dati diventano anonimi.

#### `N_A_DAT_2` - `DAT-2` - S

**Domanda:** Usi l'AI per preparare un documento che verrà inviato all'esterno. Chi mantiene la responsabilità finale?

- A. Il modello, perché ha scritto gran parte del testo.
- B. Il fornitore dello strumento in ogni circostanza.
- C. La persona o l'organizzazione che revisiona e usa il documento. **[corretta]**
- D. Nessuno, se nel documento compare la parola "bozza".

### Forma B

#### `N_B_CAP_1` - `CAP-1` - C

**Domanda:** Un'AI riassume un articolo che hai incollato nella conversazione. Che cosa puoi concludere?

- A. Ha necessariamente cercato e confrontato altre fonti online.
- B. Ha trasformato il contenuto fornito, ma questo non equivale a una ricerca indipendente. **[corretta]**
- C. Ha verificato automaticamente tutte le affermazioni dell'articolo.
- D. Ha memorizzato definitivamente l'articolo nei propri parametri.

#### `N_B_CAP_2` - `CAP-2` - S

**Domanda:** Devi scrivere una prima bozza di email. Quale collaborazione con l'AI è più appropriata?

- A. Fornire scopo, destinatario e tono, poi revisionare la bozza prima dell'invio. **[corretta]**
- B. Far scegliere al modello destinatari e contenuto senza contesto.
- C. Inviare automaticamente il primo testo generato.
- D. Usare l'AI soltanto se può assumersi la responsabilità dell'invio.

#### `N_B_LIM_1` - `LIM-1` - S

**Domanda:** Una citazione generata contiene autore, anno e titolo completi. Che cosa dimostrano questi dettagli?

- A. Che la pubblicazione esiste sicuramente.
- B. Che il modello ha letto l'intera pubblicazione.
- C. Che la citazione appare plausibile, ma deve ancora essere verificata. **[corretta]**
- D. Che ogni affermazione associata alla citazione è corretta.

#### `N_B_LIM_2` - `LIM-2` - S

**Domanda:** Chiedi all'AI di confrontare prodotti i cui prezzi e caratteristiche cambiano spesso. Quale cautela è essenziale?

- A. Controllare data e fonti dei dati usati nel confronto. **[corretta]**
- B. Preferire sempre la risposta più lunga.
- C. Considerare aggiornato il confronto se contiene una tabella.
- D. Chiedere di non mostrare incertezze.

#### `N_B_REQ_1` - `REQ-1` - S

**Domanda:** Vuoi trasformare alcuni appunti in una tabella operativa. Quale richiesta offre il contesto migliore?

- A. "Metti in tabella."
- B. "Organizza questi appunti in colonne Attività, Responsabile, Scadenza e Dubbi; non inventare i dati mancanti." **[corretta]**
- C. "Crea una tabella perfetta e completa."
- D. "Decidi tu struttura e informazioni mancanti."

#### `N_B_REQ_2` - `REQ-2` - S

**Domanda:** L'AI restituisce il contenuto giusto nel formato sbagliato. Come procedi?

- A. Scarto tutto senza spiegare il problema.
- B. Chiedo una nuova versione indicando il formato atteso e mostrando, se utile, un esempio. **[corretta]**
- C. Riparto con una richiesta ancora più generica.
- D. Copio il risultato così com'è, perché il contenuto è sufficiente.

#### `N_B_VER_1` - `VER-1` - S

**Domanda:** L'AI indica una percentuale da usare in una presentazione. Qual è una verifica indipendente?

- A. Chiedere allo stesso modello di ripetere la percentuale.
- B. Cercare il rapporto originale o una fonte affidabile e controllare periodo e campione. **[corretta]**
- C. Verificare che la percentuale abbia due decimali.
- D. Usarla se è simile a ciò che ti aspettavi.

#### `N_B_VER_2` - `VER-2` - S

**Domanda:** Quale attività richiede più controllo umano?

- A. Generare nomi provvisori per una cartella personale.
- B. Suggerire varianti di una frase per esercizio.
- C. Proporre una decisione che impegna denaro dell'organizzazione. **[corretta]**
- D. Creare tre idee da discutere e scartare liberamente.

#### `N_B_DAT_1` - `DAT-1` - S

**Domanda:** Devi sintetizzare curriculum ricevuti per una selezione. Qual è il primo controllo?

- A. Verificare finalità, autorizzazioni, policy e dati realmente necessari prima di usare uno strumento approvato. **[corretta]**
- B. Caricare tutti i file e cancellarli dal computer dopo l'uso.
- C. Rimuovere soltanto le fotografie.
- D. Usare un account personale per separare il lavoro dall'azienda.

#### `N_B_DAT_2` - `DAT-2` - S

**Domanda:** L'AI genera un'immagine per una campagna. Prima di pubblicarla, quale comportamento è più responsabile?

- A. Pubblicarla subito, perché un contenuto generato non richiede controlli.
- B. Verificare adeguatezza, possibili somiglianze o diritti coinvolti e regole di trasparenza applicabili. **[corretta]**
- C. Dichiararla automaticamente libera da qualunque diritto.
- D. Attribuire l'immagine a un artista reale per renderla credibile.

### Forma C

#### `N_C_CAP_1` - `CAP-1` - C

**Domanda:** Chiedi a un sistema generativo di creare l'immagine di una città immaginaria. Quale descrizione è più corretta?

- A. Deve trovare nel proprio archivio una fotografia identica già esistente.
- B. Compone un nuovo output usando richiesta e pattern appresi, senza garantire che ogni dettaglio sia realistico. **[corretta]**
- C. Fotografa in tempo reale una città scelta casualmente.
- D. Verifica automaticamente che edifici e segnali rispettino regole reali.

#### `N_C_CAP_2` - `CAP-2` - S

**Domanda:** Devi organizzare un'attività con diversi vincoli. Come può aiutarti l'AI senza sostituire la decisione?

- A. Generando alternative con vantaggi e limiti da confrontare. **[corretta]**
- B. Scegliendo autonomamente l'opzione finale senza conoscere le persone coinvolte.
- C. Eliminando la necessità di chiarire obiettivi e vincoli.
- D. Garantendo che la prima proposta sia la più adatta.

#### `N_C_LIM_1` - `LIM-1` - S

**Domanda:** Domandi "Sei sicuro?" e l'AI conferma la risposta con tono ancora più deciso. Che cosa è cambiato?

- A. La risposta è diventata una prova indipendente.
- B. Il modello ha necessariamente consultato una fonte esterna.
- C. Hai ottenuto una nuova formulazione, non una verifica indipendente. **[corretta]**
- D. La sicurezza del tono rende trascurabile il rischio di errore.

#### `N_C_LIM_2` - `LIM-2` - S

**Domanda:** Chiedi informazioni su una procedura interna che non hai fornito al modello. Qual è il rischio principale?

- A. Che il modello rifiuti sempre di rispondere.
- B. Che produca una procedura plausibile ma diversa da quella reale. **[corretta]**
- C. Che recuperi automaticamente il documento interno corretto.
- D. Che aggiorni la procedura ufficiale senza autorizzazione.

#### `N_C_REQ_1` - `REQ-1` - S

**Domanda:** Vuoi un messaggio breve per rinviare una riunione. Quale richiesta è più controllabile?

- A. "Scrivi un messaggio."
- B. "Scrivi un messaggio cortese di massimo 60 parole: rinvia la riunione a data da definire, non inventare motivazioni e chiedi conferma di lettura." **[corretta]**
- C. "Scrivi il messaggio migliore in assoluto."
- D. "Comunica quello che ritieni opportuno."

#### `N_C_REQ_2` - `REQ-2` - S

**Domanda:** L'AI basa la risposta su un'assunzione sbagliata. Che cosa fai?

- A. Correggo esplicitamente l'assunzione e chiedo di rivedere le parti influenzate. **[corretta]**
- B. Continuo la conversazione senza segnalarla.
- C. Chiedo soltanto una risposta più lunga.
- D. Considero impossibile migliorare il risultato.

#### `N_C_VER_1` - `VER-1` - S

**Domanda:** L'AI descrive un obbligo previsto da una norma. Prima di agire, quale controllo è più solido?

- A. Verificare testo vigente, data, ambito e, se l'impatto è rilevante, chiedere supporto competente. **[corretta]**
- B. Accettare la spiegazione se usa un linguaggio giuridico.
- C. Chiedere allo stesso modello di riscriverla in modo più formale.
- D. Usare la risposta se cita un numero di articolo non verificato.

#### `N_C_VER_2` - `VER-2` - S

**Domanda:** Quale output richiede il controllo più rigoroso prima dell'uso?

- A. Appunti privati per immaginare la trama di un racconto.
- B. Un possibile consiglio sanitario destinato a una persona. **[corretta]**
- C. Idee di nomi per un personaggio immaginario.
- D. Una lista provvisoria di film da vedere.

#### `N_C_DAT_1` - `DAT-1` - S

**Domanda:** Vuoi far riassumere il verbale di una riunione interna. Qual è il comportamento più prudente?

- A. Incollarlo in qualunque chatbot, perché è solo testo.
- B. Verificare classificazione, partecipanti, policy e strumento; rimuovere ciò che non serve. **[corretta]**
- C. Cambiare i nomi delle persone lasciando tutti gli altri dettagli identificativi.
- D. Aggiungere la frase "contenuto riservato" prima del testo.

#### `N_C_DAT_2` - `DAT-2` - S

**Domanda:** Un collega vuole usare senza controlli una raccomandazione prodotta dall'AI. Qual è la risposta più responsabile?

- A. "Usala: se sembra ragionevole, la responsabilità è del sistema."
- B. "Revisioniamo dati, assunzioni e conseguenze; la decisione resta nostra." **[corretta]**
- C. "Basta chiedere al modello di assumersi la responsabilità."
- D. "Ogni uso dell'AI deve essere vietato, indipendentemente dal contesto."

## 6. English question bank

The identifiers, objectives, types, and correct-answer positions match the Italian bank. Answer order will be randomized in the application.

### Form A

#### `N_A_CAP_1` - `CAP-1` - C

**Question:** Which description best represents what a generative AI system does when responding to a request?

- A. It always searches the web and copies the most relevant page.
- B. It generates content using the input and patterns learned from data. **[correct]**
- C. It always retrieves a previously written answer from an archive.
- D. It automatically verifies every sentence before showing it.

#### `N_A_CAP_2` - `CAP-2` - S

**Question:** You need ideas for a team meeting. What is the most useful first use of AI?

- A. Ask for several proposals, then compare them with the real goal and constraints. **[correct]**
- B. Ask it to choose the final proposal for the team on its own.
- C. Accept the first idea because it was generated quickly.
- D. Avoid AI because generated ideas can never be useful.

#### `N_A_LIM_1` - `LIM-1` - S

**Question:** A chatbot gives a very precise number but does not say where it came from. How should you treat it?

- A. As reliable, because precision indicates a real calculation.
- B. As probably true if it is written confidently.
- C. As a figure to verify before using it. **[correct]**
- D. As certainly false, because chatbots cannot use numbers.

#### `N_A_LIM_2` - `LIM-2` - S

**Question:** You want a rule or opening time that may have changed recently. What do you do?

- A. Use the model's answer without further checks.
- B. Ask the model to answer more confidently.
- C. Check a current official source and its effective date. **[correct]**
- D. Treat the answer as valid if it contains many details.

#### `N_A_REQ_1` - `REQ-1` - S

**Question:** You want a text summarized for people who are new to the subject. Which request is most useful?

- A. "Summarize."
- B. "Write something interesting about this text."
- C. "Summarize the text in five points for a non-technical audience, explaining essential terms." **[correct]**
- D. "Produce the best possible summary without asking questions."

#### `N_A_REQ_2` - `REQ-2` - S

**Question:** The first AI response is generic. What is the most useful next step?

- A. Repeat the same question until the answer changes.
- B. Add context, identify what is missing, and request a new version. **[correct]**
- C. Treat the first output as the best the system can do.
- D. Immediately change tools without clarifying the task.

#### `N_A_VER_1` - `VER-1` - S

**Question:** AI suggests the title, author, and link of a source. What do you do before citing it?

- A. Use it: extensive detail proves it exists.
- B. Open the link and verify identity, content, and support for the claim. **[correct]**
- C. Ask the same chatbot whether the source is real.
- D. Check only that the link looks professional.

#### `N_A_VER_2` - `VER-2` - S

**Question:** Which case requires a more rigorous review of AI output?

- A. A private list of possible playlist titles.
- B. An official communication that may affect other people. **[correct]**
- C. An informal list of ideas that can be changed or discarded.
- D. A creative exercise that will not be published.

#### `N_A_DAT_1` - `DAT-1` - S

**Question:** You need to analyze a list containing customer names, emails, and notes. What do you do before uploading it to an AI tool?

- A. Upload it if the tool is easy to use.
- B. Remove only the file name.
- C. Check authorization and policy, choose an approved tool, and minimize the data. **[correct]**
- D. Convert it to PDF because that makes the data anonymous.

#### `N_A_DAT_2` - `DAT-2` - S

**Question:** You use AI to prepare a document that will be sent externally. Who retains final responsibility?

- A. The model, because it wrote much of the text.
- B. The tool provider in every circumstance.
- C. The person or organization that reviews and uses the document. **[correct]**
- D. Nobody, if the document contains the word "draft."

### Form B

#### `N_B_CAP_1` - `CAP-1` - C

**Question:** AI summarizes an article you pasted into the conversation. What can you conclude?

- A. It necessarily searched for and compared other online sources.
- B. It transformed the supplied content, but this is not independent research. **[correct]**
- C. It automatically verified every claim in the article.
- D. It permanently stored the article in its parameters.

#### `N_B_CAP_2` - `CAP-2` - S

**Question:** You need a first email draft. Which collaboration with AI is most appropriate?

- A. Provide purpose, recipient, and tone, then review the draft before sending. **[correct]**
- B. Let the model choose recipients and content without context.
- C. Automatically send the first generated text.
- D. Use AI only if it can take responsibility for sending it.

#### `N_B_LIM_1` - `LIM-1` - S

**Question:** A generated citation includes a complete author, year, and title. What do those details prove?

- A. That the publication certainly exists.
- B. That the model read the entire publication.
- C. That the citation looks plausible but still needs verification. **[correct]**
- D. That every claim associated with it is correct.

#### `N_B_LIM_2` - `LIM-2` - S

**Question:** You ask AI to compare products whose prices and features change often. Which precaution is essential?

- A. Check the date and sources of the comparison data. **[correct]**
- B. Always prefer the longest answer.
- C. Treat the comparison as current if it contains a table.
- D. Ask it not to show uncertainty.

#### `N_B_REQ_1` - `REQ-1` - S

**Question:** You want to turn notes into an operational table. Which request provides the best context?

- A. "Put this in a table."
- B. "Organize these notes into Task, Owner, Deadline, and Open questions; do not invent missing data." **[correct]**
- C. "Create a perfect and complete table."
- D. "Choose the structure and missing information yourself."

#### `N_B_REQ_2` - `REQ-2` - S

**Question:** AI returns the right content in the wrong format. What do you do?

- A. Discard everything without explaining the issue.
- B. Request a new version, state the expected format, and provide an example if useful. **[correct]**
- C. Start over with an even more generic request.
- D. Copy the result as it is because the content is enough.

#### `N_B_VER_1` - `VER-1` - S

**Question:** AI gives you a percentage for a presentation. What counts as an independent check?

- A. Ask the same model to repeat the percentage.
- B. Find the original report or a reliable source and check period and sample. **[correct]**
- C. Check that the percentage has two decimal places.
- D. Use it if it is close to what you expected.

#### `N_B_VER_2` - `VER-2` - S

**Question:** Which activity requires more human oversight?

- A. Generate temporary names for a personal folder.
- B. Suggest sentence variations for practice.
- C. Propose a decision that commits organizational funds. **[correct]**
- D. Create three ideas that can be freely discussed and discarded.

#### `N_B_DAT_1` - `DAT-1` - S

**Question:** You need to summarize resumes received for recruitment. What is the first check?

- A. Check purpose, authorization, policy, and necessary data before using an approved tool. **[correct]**
- B. Upload every file and delete it from your computer afterwards.
- C. Remove only the photographs.
- D. Use a personal account to separate the task from the company.

#### `N_B_DAT_2` - `DAT-2` - S

**Question:** AI generates an image for a campaign. What is the most responsible action before publishing it?

- A. Publish immediately because generated content needs no checks.
- B. Check suitability, possible similarities or rights, and applicable transparency rules. **[correct]**
- C. Automatically declare it free of all rights.
- D. Attribute it to a real artist to make it credible.

### Form C

#### `N_C_CAP_1` - `CAP-1` - C

**Question:** You ask a generative system to create an image of an imaginary city. Which description is most accurate?

- A. It must find an identical existing photograph in its archive.
- B. It composes a new output from the request and learned patterns, without guaranteeing realistic details. **[correct]**
- C. It takes a live photograph of a randomly selected city.
- D. It automatically verifies that buildings and signs follow real rules.

#### `N_C_CAP_2` - `CAP-2` - S

**Question:** You need to organize an activity with several constraints. How can AI help without replacing the decision?

- A. Generate alternatives with advantages and limitations to compare. **[correct]**
- B. Choose the final option without knowing the people involved.
- C. Remove the need to clarify goals and constraints.
- D. Guarantee that the first proposal is the best fit.

#### `N_C_LIM_1` - `LIM-1` - S

**Question:** You ask "Are you sure?" and AI confirms the answer even more confidently. What changed?

- A. The answer became independent evidence.
- B. The model necessarily consulted an external source.
- C. You received another formulation, not an independent check. **[correct]**
- D. The confident tone makes the risk of error negligible.

#### `N_C_LIM_2` - `LIM-2` - S

**Question:** You ask about an internal procedure that you did not provide to the model. What is the main risk?

- A. The model will always refuse to answer.
- B. It may produce a plausible procedure that differs from the real one. **[correct]**
- C. It will automatically retrieve the correct internal document.
- D. It will update the official procedure without authorization.

#### `N_C_REQ_1` - `REQ-1` - S

**Question:** You want a short message to postpone a meeting. Which request is easiest to control?

- A. "Write a message."
- B. "Write a polite message of no more than 60 words: postpone the meeting to a date to be decided, do not invent reasons, and ask recipients to confirm they read it." **[correct]**
- C. "Write the best possible message."
- D. "Communicate whatever you think is appropriate."

#### `N_C_REQ_2` - `REQ-2` - S

**Question:** AI bases its answer on a wrong assumption. What do you do?

- A. Explicitly correct the assumption and request a revision of affected parts. **[correct]**
- B. Continue without pointing it out.
- C. Ask only for a longer answer.
- D. Treat the result as impossible to improve.

#### `N_C_VER_1` - `VER-1` - S

**Question:** AI describes a legal obligation. What is the strongest check before acting?

- A. Check the current text, date, scope, and seek qualified support if the impact is significant. **[correct]**
- B. Accept the explanation if it uses legal language.
- C. Ask the same model to rewrite it more formally.
- D. Use it if it cites an unverified article number.

#### `N_C_VER_2` - `VER-2` - S

**Question:** Which output needs the most rigorous check before use?

- A. Private notes for imagining a story plot.
- B. Possible health advice intended for another person. **[correct]**
- C. Character-name ideas for fiction.
- D. A temporary list of films to watch.

#### `N_C_DAT_1` - `DAT-1` - S

**Question:** You want to summarize an internal meeting record. What is the most cautious approach?

- A. Paste it into any chatbot because it is only text.
- B. Check classification, participants, policy, and tool; remove anything unnecessary. **[correct]**
- C. Change people's names while keeping all other identifying details.
- D. Add the words "confidential content" before the text.

#### `N_C_DAT_2` - `DAT-2` - S

**Question:** A colleague wants to use an AI-generated recommendation without checks. What is the most responsible response?

- A. "Use it: if it sounds reasonable, the system is responsible."
- B. "Let's review data, assumptions, and consequences; the decision remains ours." **[correct]**
- C. "Just ask the model to take responsibility."
- D. "Every use of AI must be banned, regardless of context."

## 7. Unita' didattiche riutilizzabili

Le trenta domande non producono trenta tutorial. Ogni errore rimanda a una delle dieci unità seguenti. Le spiegazioni sono contenuti locali dell'app; i collegamenti esterni sono facoltativi.

### `U-CAP-1` - Generare non significa cercare

- Obiettivo: `CAP-1`
- Principio IT: un sistema generativo produce output a partire dall'input e da pattern appresi; non cerca necessariamente sul web, non recupera sempre un documento e non verifica automaticamente la verità.
- Principle EN: a generative system produces output from the input and learned patterns; it does not necessarily search the web, retrieve a document, or automatically verify truth.
- Equivoco tipico: confondere generazione, ricerca, archivio e verifica.
- Esempio: un riassunto di un testo incollato può essere utile senza costituire una ricerca indipendente.
- Micro-azione: prima di usare un output, chiedersi quali informazioni il sistema ha realmente ricevuto.
- Rinforzo corretto: hai distinto la generazione di contenuto dal recupero e dalla verifica.
- Fonti: `SRC-GOOGLE-ML`, `SRC-GOOGLE-LLM`.

### `U-CAP-2` - Supporto alla decisione, non autorità

- Obiettivo: `CAP-2`
- Principio IT: l'AI è utile per creare alternative, bozze e trasformazioni; scopo, vincoli e decisione finale restano umani.
- Principle EN: AI is useful for alternatives, drafts, and transformations; purpose, constraints, and the final decision remain human.
- Equivoco tipico: delegare la decisione solo perché il sistema genera una risposta fluida.
- Esempio: chiedere tre proposte con vantaggi e limiti prima di scegliere.
- Micro-azione: definire che cosa può proporre l'AI e che cosa deve decidere una persona.
- Rinforzo corretto: hai usato l'AI come supporto mantenendo il controllo sul risultato.
- Fonti: `SRC-MOLLICK`, `SRC-EU-LITERACY`.

### `U-LIM-1` - Plausibile non significa verificato

- Obiettivo: `LIM-1`
- Principio IT: tono sicuro, dettagli, numeri precisi e citazioni complete possono accompagnare anche un errore.
- Principle EN: confident tone, detail, precise numbers, and complete-looking citations can also accompany an error.
- Equivoco tipico: scambiare forma e sicurezza apparente per evidenza.
- Esempio: un riferimento bibliografico può sembrare autentico pur non esistendo.
- Micro-azione: segnare fatti e riferimenti da verificare prima di riusarli.
- Rinforzo corretto: hai trattato la plausibilità come un'ipotesi, non come una prova.
- Fonti: `SRC-GOOGLE-HALLUCINATIONS`, `SRC-NIST-GENAI`.

### `U-LIM-2` - Data, perimetro e contesto mancante

- Obiettivo: `LIM-2`
- Principio IT: un output può essere coerente ma obsoleto o costruito senza informazioni locali indispensabili.
- Principle EN: an output can be coherent yet outdated or produced without essential local information.
- Equivoco tipico: presumere che il modello conosca l'ultima versione o documenti non forniti.
- Esempio: una procedura interna plausibile non coincide necessariamente con quella approvata.
- Micro-azione: indicare data di riferimento e fonti disponibili; dichiarare ciò che manca.
- Rinforzo corretto: hai controllato aggiornamento e perimetro prima di usare l'output.
- Fonti: `SRC-GOOGLE-LLM`, `SRC-EU-LITERACY`.

### `U-REQ-1` - Rendere chiaro il compito

- Obiettivo: `REQ-1`
- Principio IT: obiettivo, contesto, pubblico, vincoli e formato riducono le assunzioni e rendono il risultato valutabile.
- Principle EN: goal, context, audience, constraints, and format reduce assumptions and make the result easier to evaluate.
- Equivoco tipico: credere che un prompt debba essere soltanto lungo o formulato con parole speciali.
- Esempio: specificare colonne e divieto di inventare dati mancanti.
- Micro-azione: aggiungere alla prossima richiesta un risultato atteso e un vincolo verificabile.
- Rinforzo corretto: hai trasformato una richiesta generica in un compito controllabile.
- Fonti: `SRC-GOOGLE-PROMPT`.

### `U-REQ-2` - Il primo output è una bozza

- Obiettivo: `REQ-2`
- Principio IT: correggere assunzioni, mostrare esempi e chiedere revisioni mirate fa parte del lavoro con un sistema generativo.
- Principle EN: correcting assumptions, showing examples, and requesting targeted revisions are part of working with a generative system.
- Equivoco tipico: accettare o scartare definitivamente il primo tentativo.
- Esempio: indicare quale formato non è stato rispettato e mostrarne uno corretto.
- Micro-azione: formulare un feedback con `mantieni`, `correggi`, `aggiungi`.
- Rinforzo corretto: hai usato l'iterazione per orientare il risultato.
- Fonti: `SRC-GOOGLE-PROMPT`, `SRC-MOLLICK`.

### `U-VER-1` - Verificare fuori dalla risposta

- Obiettivo: `VER-1`
- Principio IT: una verifica indipendente apre la fonte originale o confronta una sorgente affidabile, controllando identità, data, ambito e sostegno alla specifica affermazione.
- Principle EN: an independent check opens the original source or compares a reliable source, checking identity, date, scope, and support for the specific claim.
- Equivoco tipico: chiedere conferma allo stesso sistema o fidarsi dell'aspetto di un link.
- Esempio: risalire dal numero citato al rapporto e controllare periodo e campione.
- Micro-azione: verificare una singola affermazione importante seguendo il collegamento fino alla fonte primaria.
- Rinforzo corretto: hai cercato evidenza indipendente e pertinente.
- Fonti: `SRC-GOOGLE-HALLUCINATIONS`, `SRC-NIST-GENAI`.

### `U-VER-2` - Più impatto, più controllo

- Obiettivo: `VER-2`
- Principio IT: il livello di verifica deve crescere con conseguenze, irreversibilità e persone coinvolte.
- Principle EN: the level of review should increase with consequences, irreversibility, and the people affected.
- Equivoco tipico: applicare lo stesso controllo a un brainstorming privato e a una decisione sanitaria, legale o economica.
- Esempio: una comunicazione ufficiale richiede fonti, revisione e approvazione più forti di una lista privata di idee.
- Micro-azione: classificare il prossimo uso come basso, medio o alto impatto prima di scegliere i controlli.
- Rinforzo corretto: hai proporzionato la supervisione alle possibili conseguenze.
- Fonti: `SRC-NIST-GENAI`, `SRC-EU-LITERACY`, `SRC-MS-RESPONSIBLE`.

### `U-DAT-1` - Prima i dati, poi lo strumento

- Obiettivo: `DAT-1`
- Principio IT: prima dell'invio bisogna riconoscere dati personali, riservati o regolati, verificare autorizzazione e policy, minimizzare e usare ambienti approvati.
- Principle EN: before sending data, identify personal, confidential, or regulated information, check authorization and policy, minimize it, and use approved environments.
- Equivoco tipico: credere che rinominare un file, convertirlo in PDF o sostituire pochi nomi renda anonimo il contenuto.
- Esempio: un verbale può identificare persone anche senza mostrarne il nome completo.
- Micro-azione: eliminare dalla prossima richiesta ogni campo non necessario al risultato.
- Rinforzo corretto: hai valutato i dati prima della comodità dello strumento.
- Fonti: `SRC-UNESCO-GENAI`, `SRC-EDPB-AI`.

### `U-DAT-2` - La responsabilità resta umana

- Obiettivo: `DAT-2`
- Principio IT: chi usa e pubblica l'output deve revisionarlo, rispettare diritti e regole, dichiarare l'uso quando rilevante e assumersi la decisione finale.
- Principle EN: whoever uses and publishes the output must review it, respect rights and rules, disclose AI use when relevant, and own the final decision.
- Equivoco tipico: attribuire responsabilità, intenzione o autorità al modello.
- Esempio: un'immagine generata richiede comunque verifica di adeguatezza, somiglianze e condizioni d'uso.
- Micro-azione: aggiungere al workflow un responsabile della revisione e un criterio di approvazione.
- Rinforzo corretto: hai mantenuto responsabilità e controllo sull'uso finale.
- Fonti: `SRC-UNESCO-GENAI`, `SRC-MS-RESPONSIBLE`, `SRC-EU-LITERACY`, `SRC-EUIPO-COPYRIGHT`, `SRC-EU-TRANSPARENCY`.

## 8. Logica del tutorial personalizzato

### 8.1 Raccolta

Per ogni risposta l'app salva localmente:

- ID domanda e forma
- obiettivo e unità didattica
- alternativa scelta
- esito corretto/da rivedere
- versione della banca e della forma

Non viene salvato o inviato alcun profilo psicologico. Nessun dato lascia il browser salvo export manuale.

### 8.2 Composizione

1. Raggruppare gli errori per `learningUnitId`.
2. Mostrare ogni unità una sola volta anche se più domande future vi fanno riferimento.
3. Ordinare prima le unità con errore, seguendo la sequenza: possibilità, limiti, richieste, verifica, dati/responsabilità.
4. Mostrare poi un riepilogo compatto degli obiettivi risposti correttamente.
5. Non mostrare classifiche, percentile o confronti con altri utenti.
6. Se tutte le risposte sono corrette, proporre comunque una sintesi e il passaggio a Literacy o Fondamenti tecnici.

### 8.3 Scheda di errore

Ogni scheda contiene:

- `Da rivedere` / `Review this`
- titolo dell'unità
- situazione sintetica della domanda
- perché la scelta è incompleta o rischiosa, riferito alla scelta e non alla persona
- principio da ricordare
- esempio
- micro-azione
- approfondimenti facoltativi graduati

Formula da evitare: `Hai dimostrato di non capire...`.

Formula preferita: `Questa scelta si affida alla precisione apparente. Un numero preciso può comunque essere generato senza una fonte verificata.`

### 8.4 Rinforzo corretto

Le risposte corrette ricevono una frase breve collegata all'unità, senza linguaggio celebrativo o punteggi di superiorita'. Esempio:

> Buona scelta operativa: hai distinto una risposta plausibile da una verifica indipendente.

### 8.5 Risultato sintetico

Il risultato può mostrare il numero di obiettivi consolidati su 10, ma non deve essere chiamato indice AI Skill. Fasce proposte:

- `0-3`: Inizia dalle basi / Start with the foundations
- `4-6`: Basi in costruzione / Foundations in progress
- `7-8`: Basi presenti, continua ad allenarle / Foundations in place, keep practicing
- `9-10`: Pronto per un percorso tematico / Ready for a thematic path

Le fasce sono feedback didattico progettato, non soglie validate. Prima dell'implementazione il maintainer deve decidere se mostrare il conteggio numerico o soltanto le etichette.

### 8.6 Passo successivo

- Ripeti il percorso: avvia la forma successiva nel ciclo locale.
- Approfondisci Literacy: suggerito se prevalgono `CAP`, `LIM` o `VER`.
- Approfondisci Fluency - Description: suggerito se prevalgono `REQ`.
- Approfondisci Fluency - Diligence: suggerito se prevalgono `DAT`.
- Vai al test completo: proposto solo come opzione, non come conseguenza automatica di un punteggio.

## 9. Fonti e livelli di approfondimento

Le fonti metodologiche dell'assessment restano nella bibliografia attuale. Questa tabella seleziona risorse utili per studiare; non tutte sono adatte come prima lettura.

| ID | Fonte | Uso | Livello | Lingua | Tempo stimato | Accesso | Verificata |
| --- | --- | --- | --- | --- | ---: | --- | --- |
| `SRC-GOOGLE-ML` | [Google for Developers - What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml) | definizione accessibile di modello, previsione e generazione | introduttivo | EN, traduzione sito disponibile | 10 min | gratuito | 2026-07-11 |
| `SRC-GOOGLE-LLM` | [Google for Developers - Introduction to Large Language Models](https://developers.google.com/machine-learning/crash-course/llm) | token, contesto, generazione e limiti | avanzato per un neofita | EN, traduzioni sito disponibili | 45 min | gratuito | 2026-07-11 |
| `SRC-GOOGLE-PROMPT` | [Google for Developers - Prompt engineering](https://developers.google.com/machine-learning/crash-course/llm/tuning#prompt_engineering) | istruzioni, esempi e distinzione dal training | intermedio | EN | 15 min | gratuito | 2026-07-11 |
| `SRC-GOOGLE-HALLUCINATIONS` | [Google Cloud - What are AI hallucinations?](https://cloud.google.com/discover/what-are-ai-hallucinations) | plausibilità, cause e mitigazioni | introduttivo/intermedio | EN, localizzazione variabile | 10 min | gratuito | 2026-07-11 |
| `SRC-MOLLICK` | [Ethan Mollick - Management as an AI Superpower](https://www.oneusefulthing.org/p/management-as-ai-superpower) | delegazione, supervisione e responsabilità | introduttivo/intermedio | EN | 10 min | gratuito | 2026-07-11 |
| `SRC-UNESCO-GENAI` | [UNESCO - Guidance for Generative AI in Education and Research](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research) | approccio human-centred, privacy, rischi e usi significativi | approfondimento | multilingue | 45-60 min | gratuito | 2026-07-11 |
| `SRC-EU-LITERACY` | [European Commission - AI Literacy Questions and Answers](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers) | literacy contestuale, rischi, formazione proporzionata e supervisione | intermedio | EN, traduzione automatica UE | 20 min | gratuito | 2026-07-11 |
| `SRC-EDPB-AI` | [EDPB - Opinion on AI models and personal data](https://www.edpb.europa.eu/news/edpb-opinion-on-ai-models-gdpr-principles-support-responsible-ai_en) | dati personali nello sviluppo e uso di modelli AI | avanzato | EN | 20 min per la sintesi | gratuito | 2026-07-11 |
| `SRC-MS-RESPONSIBLE` | [Microsoft Learn - Explore responsible AI](https://learn.microsoft.com/en-us/training/modules/responsible-ai/) | principi di uso responsabile | introduttivo | EN | 30 min | gratuito | 2026-07-11 |
| `SRC-NIST-GENAI` | [NIST - Generative AI Profile](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=958388) | confabulation, rischi e controlli proporzionati | avanzato | EN | 60+ min | gratuito, PDF | 2026-07-11 |
| `SRC-EUIPO-COPYRIGHT` | [EUIPO Copyright Knowledge Centre - Copyright and Generative AI](https://www.euipo.europa.eu/en/copyright-knowledge-centre/copyright-and-genai) | opere creative, GenAI e quadro europeo del copyright | intermedio | EN, traduzioni UE disponibili | 15 min | gratuito | 2026-07-11 |
| `SRC-EU-TRANSPARENCY` | [European Commission - Transparency of AI-generated content](https://digital-strategy.ec.europa.eu/it/policies/code-practice-ai-generated-content) | marcatura, etichettatura e trasparenza per contenuti generati o manipolati | intermedio | IT tramite eTranslation UE | 15 min | gratuito | 2026-07-11 |

### 9.1 Presentazione nell'app

Per non spegnere la curiosita', ogni unità propone al massimo:

1. una spiegazione locale da 2-3 minuti
2. una lettura introduttiva da 5-15 minuti
3. un approfondimento avanzato facoltativo

Esempio per `U-LIM-1`:

- `Capisci ora`: spiegazione ed esempio locali
- `Approfondisci`: Google Cloud, allucinazioni, circa 10 minuti
- `Studia il rischio`: NIST Generative AI Profile, avanzato

I link esterni devono essere descritti come tali, aperti solo dopo click e mai precaricati tramite embed, iframe, video o widget.

### 9.2 Lacune e cautele

- Privacy: l'EDPB è autorevole ma troppo tecnico come prima lettura; il contenuto locale deve tradurne i principi operativi senza offrire consulenza legale.
- Copyright: EUIPO offre una porta d'ingresso istituzionale europea; il contenuto locale deve comunque evitare conclusioni assolute sulla protezione di uno specifico output.
- Trasparenza: la pagina della Commissione descrive obblighi applicabili in casi specifici; il tutorial deve insegnare a verificare il contesto, non trasformare l'etichettatura in una regola universale indistinta.
- Lingua italiana: molte fonti primarie sono in inglese; la spiegazione locale italiana è quindi parte essenziale del prodotto.
- Aggiornamento: pagine normative e linee guida vanno ricontrollate a ogni release che cambia il percorso.
- Neutralita': le risorse di fornitori tecnologici sostengono concetti tecnici, non raccomandazioni commerciali o scelta di prodotti.

## 10. Metadati previsti per l'implementazione

Struttura concettuale di una domanda:

```js
{
  id: "N_A_LIM_1",
  formId: "A",
  mode: "first-steps",
  area: "limits",
  objectiveId: "LIM-1",
  learningUnitId: "U-LIM-1",
  type: "knowledge",
  text: "...",
  options: [
    { id: "a", text: "...", correct: false, misconception: "precision-as-proof" },
    { id: "b", text: "...", correct: true }
  ]
}
```

Struttura concettuale di un'unità:

```js
{
  id: "U-LIM-1",
  objectiveId: "LIM-1",
  title: { it: "Plausibile non significa verificato", en: "Plausible does not mean verified" },
  principle: { it: "...", en: "..." },
  example: { it: "...", en: "..." },
  action: { it: "...", en: "..." },
  sources: ["SRC-GOOGLE-HALLUCINATIONS", "SRC-NIST-GENAI"]
}
```

Gli esempi descrivono la struttura, non impongono l'introduzione di moduli JavaScript o build tool. L'implementazione deve restare compatibile con script statici e GitHub Pages.

## 11. Checklist di validazione contenuti

- [ ] Il nome del percorso e la promessa sono comprensibili a chi non usa AI.
- [ ] Ogni forma contiene esattamente 10 domande.
- [ ] Ogni forma contiene una domanda per ciascun obiettivo.
- [ ] Ogni area contiene esattamente due domande per forma.
- [ ] Tutte le alternative errate rappresentano equivoci plausibili, non battute o assurdita'.
- [ ] Nessuna domanda richiede conoscenze tecniche non introdotte.
- [ ] Italiano e inglese mantengono lo stesso significato operativo.
- [ ] Ogni domanda rimanda a una sola unità primaria.
- [ ] Ogni unità ha principio, equivoco, esempio, micro-azione e rinforzo.
- [ ] Il tutorial non attribuisce caratteristiche personali a chi sbaglia.
- [ ] Le fonti essenziali sono gratuite e accessibili senza embed.
- [ ] Le fonti avanzate sono riconoscibili come tali.
- [ ] Privacy, copyright e contenuti normativi non sono presentati come consulenza professionale.
- [ ] Il risultato non è confrontato con l'indice AI Skill.
- [ ] Ripetere il percorso è presentato come apprendimento, non come tentativo di aumentare un punteggio.

## 12. Decisioni richieste al maintainer

Prima della milestone 14 vanno approvati o modificati:

1. nome `Primi passi con l'AI` / `AI First Steps`
2. dieci obiettivi e matrice 2+2+2+2+2
3. testo delle 30 domande in italiano e inglese
4. dieci unità didattiche e relativo tono
5. fonti da mostrare nell'app, incluse EUIPO per copyright e Commissione europea per trasparenza
6. uso del conteggio `obiettivi consolidati su 10` oppure sole etichette formative
7. fasce formative proposte
8. percorsi successivi suggeriti in base agli errori
