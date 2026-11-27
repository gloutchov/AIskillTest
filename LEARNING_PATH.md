# Primi passi con l'AI / AI First Steps

Questo documento definisce il blueprint editoriale e didattico del percorso introduttivo previsto dalla milestone 13. Il percorso è un'esperienza di apprendimento statica e bilingue, non una versione facile dell'assessment, una certificazione o un test psicometricamente validato.

Nota di compatibilità della milestone 17: l'assessment 3.x usa un quadro delle evidenze separato, mentre Primi passi mantiene domande, tutorial, feedback e risultato didattico esistenti. I report didattici riportano la versione dell'app ma non adottano scoring/schema dell'assessment 3.x, né vengono mediati o confrontati con esso. Lo storico comune è accessibile anche dai risultati didattici per poter aprire i report precedenti quando l'ultima sessione è Primi passi. Questo aggiornamento riguarda navigazione dello storico e contesto dei report, senza cambiare il percorso didattico.

Stato del documento: percorso pubblicato. La revisione editoriale `3.5.8` usa la banca `2026.11-first-steps-2` e le forme `first-steps-1.0`.

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

- A. Cerca una pagina online che corrisponda alla richiesta.
- B. Crea una risposta usando la richiesta e ciò che ha imparato. **[corretta]**
- C. Sceglie una risposta pronta tra quelle archiviate durante l’addestramento.
- D. Controlla la verità delle frasi su fonti esterne prima di rispondere.

**Perché:** Creare una risposta significa usare ciò che il sistema ha imparato. Per sapere se ha anche cercato o verificato qualcosa servono prove di quei passaggi.

#### `N_A_CAP_2` - `CAP-2` - S

**Domanda:** Devi preparare idee per una riunione di team. Quale uso dell'AI è più utile come primo passo?

- A. Chiedo più idee e le confronto con i vincoli. **[corretta]**
- B. Chiedo all’AI di scegliere per il gruppo.
- C. Porto la prima idea e rimando il confronto alla riunione.
- D. Chiedo una sola proposta prima di dire che cosa deve ottenere il gruppo.

**Perché:** Confrontare più idee aiuta a vedere i compromessi. Il gruppo può decidere tenendo conto di vincoli che l’AI potrebbe ignorare.

#### `N_A_LIM_1` - `LIM-1` - S

**Domanda:** Un chatbot fornisce un numero molto preciso, ma non indica da dove proviene. Come lo consideri?

- A. Lo uso perché le cifre decimali fanno pensare a un calcolo preciso.
- B. Gli do credito perché il chatbot presenta il numero con sicurezza.
- C. Lo verifico prima di usarlo. **[corretta]**
- D. Lo scarto perché penso che un chatbot non possa riportare numeri corretti.

**Perché:** Le cifre decimali e il tono sicuro non dicono da dove viene un numero. Per usarlo, cerca una fonte o ripeti il calcolo sui dati di partenza.

#### `N_A_LIM_2` - `LIM-2` - S

**Domanda:** Vuoi conoscere una regola o un orario che potrebbe essere cambiato di recente. Come controlli che sia ancora valido?

- A. Mi affido alla risposta se indica un orario o una regola precisa.
- B. Chiedo all’AI se è aggiornata.
- C. Controllo una fonte ufficiale e la data. **[corretta]**
- D. Uso la versione più dettagliata che il modello riesce a produrre.

**Perché:** La fonte dell’ente interessato e la data di validità permettono di controllare che la regola o l’orario valgano ancora.

#### `N_A_REQ_1` - `REQ-1` - S

**Domanda:** Vuoi far riassumere un testo per persone che non conoscono l'argomento. Quale richiesta è più utile?

- A. Riassumi in cinque punti.
- B. Metti in evidenza i dettagli che potrebbero interessare a chi conosce già l’argomento.
- C. Riassumi in cinque punti per chi è alle prime armi. **[corretta]**
- D. Rendi il testo breve e mantieni la stessa difficoltà dell’originale.

**Perché:** Indicare chi leggerà il riassunto e quanto deve essere lungo aiuta l’AI a scegliere cosa spiegare e cosa tralasciare.

#### `N_A_REQ_2` - `REQ-2` - S

**Domanda:** La prima risposta dell'AI è generica. Qual è il passo successivo più utile?

- A. Ripeto la richiesta identica e scelgo la risposta più dettagliata.
- B. Dico che cosa manca e aggiungo il contesto utile. **[corretta]**
- C. Tengo la risposta e ne cambio solo il tono, lasciando invariato il contenuto.
- D. Cambio strumento con la stessa richiesta.

**Perché:** Dire che cosa manca orienta la correzione. Riprovare da capo con le stesse informazioni lascia il problema irrisolto.

#### `N_A_VER_1` - `VER-1` - S

**Domanda:** L'AI propone titolo, autore e link di una fonte. Prima di citarla, che cosa fai?

- A. Cito la fonte usando autore, titolo e link che l’AI ha dato.
- B. Apro la fonte e controllo che sostenga ciò che voglio citare. **[corretta]**
- C. Chiedo allo stesso chatbot di confermare che la citazione sia vera.
- D. Controllo che il sito sia affidabile, senza leggere la pubblicazione.

**Perché:** Un link può essere corretto e rimandare a un testo che non sostiene la tua affermazione. Controlla sia la pubblicazione sia ciò che dice.

#### `N_A_VER_2` - `VER-2` - S

**Domanda:** Quale risultato dell’AI richiede più controlli prima di essere usato?

- A. Una lista di titoli per una playlist che resterà privata.
- B. Un avviso ufficiale che cambia una procedura per il pubblico. **[corretta]**
- C. Un elenco di idee da discutere al prossimo incontro interno.
- D. Una prova di scrittura da conservare tra i propri appunti.

**Perché:** Un avviso ufficiale può cambiare il comportamento di altre persone. Gli errori hanno conseguenze maggiori e meritano controlli più accurati.

#### `N_A_DAT_1` - `DAT-1` - S

**Domanda:** Devi analizzare un elenco con nomi, email e note sui clienti. Prima di caricarlo in uno strumento AI, che cosa fai?

- A. Carico il file completo perché lo strumento semplifica l’analisi.
- B. Rinomino il file, ma lascio nomi e indirizzi email nelle righe.
- C. Verifico le regole e uso solo i dati necessari in uno strumento approvato. **[corretta]**
- D. Converto il file in PDF e mantengo tutte le informazioni originali.

**Perché:** Cambiare nome o formato non protegge i dati. Prima controlla se puoi usarli in quello strumento e quali informazioni servono davvero.

#### `N_A_DAT_2` - `DAT-2` - S

**Domanda:** Usi l'AI per preparare un documento che verrà inviato all'esterno. Chi mantiene la responsabilità finale?

- A. Il modello, perché ha scritto buona parte del documento.
- B. Il fornitore del servizio, perché mette a disposizione lo strumento.
- C. Chi rivede e usa il documento. **[corretta]**
- D. Chi ha avviato la richiesta iniziale, anche se altri decidono l’invio.

**Perché:** La responsabilità finale resta a chi controlla il documento e decide di usarlo o inviarlo.

### Forma B

#### `N_B_CAP_1` - `CAP-1` - C

**Domanda:** Un'AI riassume un articolo che hai incollato nella conversazione. Che cosa puoi concludere?

- A. Ha confrontato il contenuto dell’articolo con altre fonti online.
- B. Ha riassunto il testo che le ho dato. **[corretta]**
- C. Ha verificato le affermazioni dell’articolo prima di scrivere il riassunto.
- D. Ha memorizzato l’articolo.

**Perché:** Un riassunto rielabora il testo fornito. Da solo non dimostra una ricerca o una verifica indipendente.

#### `N_B_CAP_2` - `CAP-2` - S

**Domanda:** Devi scrivere una prima bozza di email. Quale collaborazione con l'AI è più appropriata?

- A. Do scopo, destinatario e tono. Prima di inviare verifico i fatti e chi riceverà il messaggio. **[corretta]**
- B. Le faccio indovinare destinatario e scopo dal mio ruolo in azienda.
- C. Invio la prima bozza se il testo è scritto bene e non contiene refusi.
- D. Le chiedo di preparare la bozza e di decidere al posto mio quando inviarla.

**Perché:** Dare indicazioni rende la prima bozza più pertinente. La rilettura prima dell’invio resta utile per controllare contenuto e destinatari.

#### `N_B_LIM_1` - `LIM-1` - S

**Domanda:** Una citazione generata contiene autore, anno e titolo completi. Che cosa dimostrano questi dettagli?

- A. Che la pubblicazione è identificata con certezza dal titolo indicato.
- B. Che il modello ha letto la pubblicazione che cita.
- C. Che la citazione sembra plausibile e va verificata. **[corretta]**
- D. Che le affermazioni associate alla citazione sono riportate correttamente.

**Perché:** Autore, anno e titolo possono sembrare precisi anche quando il riferimento è sbagliato. Cerca la pubblicazione e leggila.

#### `N_B_LIM_2` - `LIM-2` - S

**Domanda:** Chiedi all'AI di confrontare prodotti i cui prezzi e caratteristiche cambiano spesso. Quale cautela è essenziale?

- A. Controllo le fonti e la data dei dati. **[corretta]**
- B. Scelgo la tabella più ricca.
- C. Mi fido della tabella se le righe sono complete e i prezzi sono precisi.
- D. Chiedo di fare una classifica unica senza indicare dati incerti.

**Perché:** Per confrontare prezzi e caratteristiche che cambiano, controlla da dove vengono i dati e a quale data si riferiscono.

#### `N_B_REQ_1` - `REQ-1` - S

**Domanda:** Vuoi trasformare alcuni appunti in una tabella operativa. Quale richiesta offre il contesto migliore?

- A. Organizza gli appunti in una tabella breve.
- B. Usa Attività, Responsabile e Scadenza. Segna i dati mancanti. **[corretta]**
- C. Completa ogni riga usando stime quando dagli appunti manca un dato.
- D. Usa pure le colonne che preferisci, purché la tabella sia facile da leggere.

**Perché:** Specificare le colonne rende il risultato riutilizzabile. Segnalare i dati mancanti evita di scambiare una stima per un fatto.

#### `N_B_REQ_2` - `REQ-2` - S

**Domanda:** L'AI restituisce il contenuto giusto nel formato sbagliato. Come procedi?

- A. Scarto il contenuto e faccio riscrivere tutto senza spiegare il motivo.
- B. Chiedo di mantenere il contenuto e mostro il formato atteso. **[corretta]**
- C. Chiedo una revisione generale.
- D. Uso la versione ricevuta perché le informazioni principali sono corrette.

**Perché:** Se il contenuto va bene, chiedi una correzione mirata al formato. Un esempio aiuta a capire che cosa vuoi ottenere.

#### `N_B_VER_1` - `VER-1` - S

**Domanda:** L'AI indica una percentuale da usare in una presentazione. Qual è una verifica indipendente?

- A. Chiedo al modello di ripetere la percentuale e di indicare quanto è sicuro.
- B. Cerco il rapporto originale e controllo periodo e campione. **[corretta]**
- C. Controllo come appare il dato nella slide.
- D. Confronto la percentuale con ciò che mi aspettavo prima di fare la richiesta.

**Perché:** Il rapporto originale aiuta a controllare se la percentuale riguarda le persone e il periodo che ti interessano.

#### `N_B_VER_2` - `VER-2` - S

**Domanda:** Quale attività richiede più controllo umano?

- A. Trovare nomi provvisori per cartelle che uso solo per i miei appunti.
- B. Scrivere frasi alternative per un esercizio che non dovrà essere pubblicato.
- C. Proporre una decisione di spesa che potrebbe impegnare parte del bilancio dell’organizzazione. **[corretta]**
- D. Preparare idee da discutere internamente, lasciando aperta la scelta.

**Perché:** Una decisione di spesa può impegnare risorse reali. Chi decide deve verificare dati e conseguenze prima di approvarla.

#### `N_B_DAT_1` - `DAT-1` - S

**Domanda:** Devi sintetizzare curriculum ricevuti per una selezione. Qual è il primo controllo?

- A. Controllo autorizzazioni, strumento e dati necessari. **[corretta]**
- B. Carico i curriculum completi e cancello le copie locali una volta finito.
- C. Rimuovo le foto ma lascio nomi, indirizzi e altri dati che non servono.
- D. Uso un account personale per separare i documenti da quelli già in azienda.

**Perché:** I curriculum contengono dati personali. Prima di usarli, verifica per quale scopo sei autorizzato e quali informazioni servono davvero.

#### `N_B_DAT_2` - `DAT-2` - S

**Domanda:** L'AI genera un'immagine per una campagna. Prima di pubblicarla, quale comportamento è più responsabile?

- A. Controllo colori e formato, perché sono gli aspetti più visibili della campagna.
- B. Controllo se l’immagine è adatta, se compaiono persone o opere riconoscibili e quali regole si applicano. **[corretta]**
- C. Do per scontato di poterla pubblicare perché l’ho generata con il mio account.
- D. Aggiungo la dicitura «creata con AI» e la considero una verifica sufficiente.

**Perché:** Prima di pubblicare, valuta se l’immagine è adatta e se ci sono persone, opere o marchi riconoscibili. Controlla anche le regole applicabili.

### Forma C

#### `N_C_CAP_1` - `CAP-1` - C

**Domanda:** Chiedi a un sistema generativo di creare l'immagine di una città immaginaria. Quale descrizione è più corretta?

- A. Recupera una foto della città da un archivio.
- B. Genera un’immagine dalla richiesta e da ciò che ha imparato. **[corretta]**
- C. Combina immagini in diretta di città reali fino a trovare la più simile.
- D. Controlla che i dettagli disegnati rispettino le regole del mondo reale.

**Perché:** L’AI può creare un’immagine nuova anche se la città non esiste. I dettagli disegnati possono sembrare realistici senza esserlo.

#### `N_C_CAP_2` - `CAP-2` - S

**Domanda:** Devi organizzare un'attività con diversi vincoli. Come può aiutarti l'AI senza sostituire la decisione?

- A. Propone alternative con vantaggi e limiti. **[corretta]**
- B. Sceglie subito l’opzione finale anche se non conosce le persone coinvolte.
- C. Organizza l’attività senza che io dica quali impegni non si possono spostare.
- D. Tratto la prima proposta come definitiva.

**Perché:** Avere più alternative aiuta a confrontare i compromessi. La scelta finale resta a chi conosce le persone e gli impegni.

#### `N_C_LIM_1` - `LIM-1` - S

**Domanda:** Domandi "Sei sicuro?" e l'AI conferma la risposta con tono ancora più deciso. Che cosa è cambiato?

- A. La seconda risposta costituisce una conferma indipendente della prima.
- B. Il tono più deciso mostra che il modello ha verificato una fonte esterna.
- C. Il tono è cambiato. Per verificare la risposta devo ancora controllare una fonte indipendente. **[corretta]**
- D. Se la formulazione è più sicura, è ragionevole ridurre i controlli.

**Perché:** Lo stesso sistema può ripetere un errore con parole più decise. Per verificarlo, cerca una fonte diversa o controlla i dati originali.

#### `N_C_LIM_2` - `LIM-2` - S

**Domanda:** Chiedi informazioni su una procedura interna che non hai fornito al modello. Qual è il rischio principale?

- A. Che chieda più dettagli prima di rispondere.
- B. Che inventi una procedura plausibile ma diversa da quella reale. **[corretta]**
- C. Che recuperi il documento aziendale corretto dal nome della procedura.
- D. Che usi una procedura generica e la presenti come un esempio, dichiarandolo.

**Perché:** Se il sistema non ha il documento, può colmare il vuoto con una risposta credibile. Per sapere cosa fare serve la procedura approvata.

#### `N_C_REQ_1` - `REQ-1` - S

**Domanda:** Vuoi un messaggio breve per rinviare una riunione. Quale richiesta è più controllabile?

- A. Scrivi un messaggio cortese che proponga una nuova data a tua scelta.
- B. In 60 parole, rinvia la riunione senza inventare date o motivi. **[corretta]**
- C. Scrivi un messaggio formale e inventa una motivazione se serve a renderlo credibile.
- D. Comunica il rinvio nel formato che preferisci.

**Perché:** Indicare lunghezza e informazioni da lasciare aperte aiuta a ottenere un messaggio che non prometta date né attribuisca motivi inventati.

#### `N_C_REQ_2` - `REQ-2` - S

**Domanda:** L’AI ha risposto dando per scontata un’informazione sbagliata. Che cosa fai?

- A. Correggo il presupposto e chiedo di rivedere le parti coinvolte. **[corretta]**
- B. Aggiungo solo la mia preferenza.
- C. Chiedo di ampliare la risposta, senza dire quale informazione è sbagliata.
- D. Tengo la risposta e correggo solo la frase in cui compare l’errore.

**Perché:** Un presupposto errato può cambiare anche le conclusioni. Chiedere di riesaminarle aiuta a correggere tutto ciò che ne dipende.

#### `N_C_VER_1` - `VER-1` - S

**Domanda:** L'AI descrive un obbligo previsto da una norma. Prima di agire, quale controllo è più solido?

- A. Controllo la norma vigente e a chi si applica. **[corretta]**
- B. Mi affido alla spiegazione se cita i termini giuridici corretti e l’articolo.
- C. Chiedo al modello una formulazione più formale per capire se è coerente.
- D. Rileggo il numero di articolo.

**Perché:** Prima di agire, controlla il testo vigente, la data e se la norma vale per il tuo caso. Se le conseguenze contano, chiedi supporto competente.

#### `N_C_VER_2` - `VER-2` - S

**Domanda:** Quale risultato richiede più controlli prima di essere usato?

- A. Una bozza di trama per un racconto che tengo per me.
- B. Un consiglio sulla salute da dare a una persona. **[corretta]**
- C. Una lista di nomi per personaggi che posso cambiare in seguito.
- D. Un elenco provvisorio di film da vedere con amici nel fine settimana.

**Perché:** Un consiglio sulla salute può avere conseguenze sulla persona. Merita controlli più rigorosi di un’idea creativa o reversibile.

#### `N_C_DAT_1` - `DAT-1` - S

**Domanda:** Vuoi far riassumere il verbale di una riunione interna. Qual è il comportamento più prudente?

- A. Uso il mio chatbot preferito perché il verbale è già in formato testo.
- B. Controllo se posso condividerlo, quale strumento è approvato e quali informazioni posso togliere. **[corretta]**
- C. Cambio i nomi delle persone ma lascio gli altri dettagli identificativi.
- D. Aggiungo «contenuto riservato» prima di incollare il verbale completo.

**Perché:** Un verbale può contenere informazioni riservate anche senza nomi. Controlla autorizzazioni, strumento e dati strettamente necessari.

#### `N_C_DAT_2` - `DAT-2` - S

**Domanda:** Un collega vuole usare senza controlli una raccomandazione prodotta dall'AI. Qual è la risposta più responsabile?

- A. Usala se ti sembra ragionevole e cita il modello come responsabile.
- B. Rivediamo dati e conseguenze prima di decidere. **[corretta]**
- C. Chiediamo al modello se conferma.
- D. Usiamo la raccomandazione come ricevuta, indicando solo che è stata generata con AI.

**Perché:** Dire che una proposta viene dall’AI non trasferisce la responsabilità. Chi decide deve controllarne dati, presupposti e possibili conseguenze.

## 6. English question bank

The identifiers, objectives, types, and correct-answer positions match the Italian bank. Answer order will be randomized in the application.

### Form A

#### `N_A_CAP_1` - `CAP-1` - C

**Question:** Which description best represents what a generative AI system does when responding to a request?

- A. It searches for a web page that matches the request.
- B. It creates an answer using the request and what it learned. **[correct]**
- C. It picks a ready-made answer from an archive built during training.
- D. It checks each claim against outside sources before it answers.

**Why:** Creating an answer uses what the system has learned. To know whether it also searched or checked something, look for evidence of those steps.

#### `N_A_CAP_2` - `CAP-2` - S

**Question:** You need ideas for a team meeting. What is the most useful first use of AI?

- A. Ask for several ideas and compare them with the constraints. **[correct]**
- B. Ask AI to pick for the group.
- C. Bring the first idea and wait until the meeting to compare it with the goal.
- D. Request one idea without saying what the team needs to achieve.

**Why:** Comparing several ideas makes trade-offs visible. The team can decide with constraints the AI might not know about.

#### `N_A_LIM_1` - `LIM-1` - S

**Question:** A chatbot gives a very precise number but does not say where it came from. How should you treat it?

- A. Use it because the decimal places suggest a precise calculation.
- B. Trust it because the chatbot states the number with confidence.
- C. Check it before using it. **[correct]**
- D. Discard it because a chatbot cannot give accurate numbers.

**Why:** Precision and confident wording do not tell you where the number came from. Find the source or redo the calculation with the original data.

#### `N_A_LIM_2` - `LIM-2` - S

**Question:** You want a rule or opening time that may have changed recently. What do you do?

- A. Trust the answer if it gives a precise rule or opening time.
- B. Ask AI if the answer is current.
- C. Check an official source and the date. **[correct]**
- D. Use the version with the most detail the model can provide.

**Why:** An official source and its effective date show whether the rule or opening time still applies.

#### `N_A_REQ_1` - `REQ-1` - S

**Question:** You want a text summarized for people who are new to the subject. Which request is most useful?

- A. Summarize it in five points.
- B. Highlight the details that would interest a reader who already knows the subject.
- C. Summarize in five points for someone new to the subject. **[correct]**
- D. Shorten the text and keep the original level of technical detail.

**Why:** Naming the audience and the length helps the AI decide what to explain and what to leave out.

#### `N_A_REQ_2` - `REQ-2` - S

**Question:** The first AI response is generic. What is the most useful next step?

- A. Repeat the same request and select the most detailed answer.
- B. Say what is missing and add the relevant background. **[correct]**
- C. Keep the answer and change only its tone, leaving the content as it is.
- D. Send the same request to a different tool.

**Why:** Pointing out what is missing directs the revision. Repeating the same request leaves the problem unresolved.

#### `N_A_VER_1` - `VER-1` - S

**Question:** AI suggests the title, author, and link of a source. What do you do before citing it?

- A. Cite the source with the author, title, and link that AI supplied.
- B. Open the source, check that it is the publication cited, and read whether it supports the claim. **[correct]**
- C. Ask the same chatbot to confirm that the citation is accurate.
- D. Check that the website is reputable without reading the publication.

**Why:** A real link can lead to a publication that does not support your claim. Check both the publication and what it says.

#### `N_A_VER_2` - `VER-2` - S

**Question:** Which case requires a more rigorous review of AI output?

- A. A private list of possible names for a playlist.
- B. An official notice that changes a procedure for the public. **[correct]**
- C. A list of ideas to discuss at the next internal meeting.
- D. A writing exercise kept in your personal notes.

**Why:** An official notice can change what other people do. Its errors have more serious consequences and deserve closer review.

#### `N_A_DAT_1` - `DAT-1` - S

**Question:** You need to analyze a list containing customer names, emails, and notes. What do you do before uploading it to an AI tool?

- A. Upload the full list because the tool makes the analysis easier.
- B. Rename the file but leave the names and email addresses in its rows.
- C. Check the rules and share only needed data in an approved tool. **[correct]**
- D. Convert the list to PDF and keep all the original information.

**Why:** Renaming or converting the file does not protect the data. Check what you may share and which pieces are actually needed.

#### `N_A_DAT_2` - `DAT-2` - S

**Question:** You use AI to prepare a document that will be sent externally. Who retains final responsibility?

- A. The model, because it wrote much of the document.
- B. The provider, because it makes the tool available.
- C. Whoever reviews and uses the document. **[correct]**
- D. The person who sent the first request, even if others approve the release.

**Why:** Final responsibility stays with whoever checks the document and decides to use or send it.

### Form B

#### `N_B_CAP_1` - `CAP-1` - C

**Question:** AI summarizes an article you pasted into the conversation. What can you conclude?

- A. It compared the article with other sources available on the web.
- B. It summarized the text I provided. **[correct]**
- C. It verified the article’s claims before writing the summary.
- D. It memorized the article.

**Why:** A summary reworks the supplied text. On its own it does not show that the system researched or independently verified the claims.

#### `N_B_CAP_2` - `CAP-2` - S

**Question:** You need a first email draft. Which collaboration with AI is most appropriate?

- A. Give the purpose, recipient, and tone. Before sending, check the facts and who will receive it. **[correct]**
- B. Let it infer the purpose and recipient from my role at work.
- C. Send the first draft if it reads well and has no spelling mistakes.
- D. Ask it to draft the email and choose when to send it for me.

**Why:** Giving clear directions improves the draft. Reading it before sending helps you check the facts and recipient.

#### `N_B_LIM_1` - `LIM-1` - S

**Question:** A generated citation includes a complete author, year, and title. What do those details prove?

- A. That the title identifies an existing publication with certainty.
- B. That the AI read the publication it cites.
- C. That the citation looks plausible and needs checking. **[correct]**
- D. That any claim linked to this citation matches the original publication.

**Why:** An author, year, and title can look precise even if the citation is wrong. Find and read the actual publication.

#### `N_B_LIM_2` - `LIM-2` - S

**Question:** You ask AI to compare products whose prices and features change often. Which precaution is essential?

- A. Check the sources and dates of the data. **[correct]**
- B. Choose the most detailed table.
- C. Trust the table if all rows are filled and its prices look precise.
- D. Ask for a single ranking that leaves out uncertain data.

**Why:** Prices and features change. Check where the comparison data came from and when it was current.

#### `N_B_REQ_1` - `REQ-1` - S

**Question:** You want to turn notes into an operational table. Which request provides the best context?

- A. Arrange the notes in a short table.
- B. Use Task, Owner, and Deadline. Mark missing details. **[correct]**
- C. Fill every row by estimating details that are missing from the notes.
- D. Use any columns you prefer, as long as the table is easy to read.

**Why:** Naming the columns makes the table usable. Marking gaps prevents an estimate from being mistaken for a fact.

#### `N_B_REQ_2` - `REQ-2` - S

**Question:** AI returns the right content in the wrong format. What do you do?

- A. Discard it and have everything rewritten without explaining why.
- B. Keep the content and show the format I need. **[correct]**
- C. Ask for a general revision.
- D. Use the original version because the key information is correct.

**Why:** When the content is useful, ask for a change to the format. An example shows what the revised version should look like.

#### `N_B_VER_1` - `VER-1` - S

**Question:** AI gives you a percentage for a presentation. What counts as an independent check?

- A. Ask the same model to repeat the percentage and state its confidence.
- B. Find the original report and check the period and sample. **[correct]**
- C. Check how the number looks on the slide.
- D. Compare the percentage with what I expected before making the request.

**Why:** The original report lets you check whether the percentage covers the people and time period you need.

#### `N_B_VER_2` - `VER-2` - S

**Question:** Which activity requires more human oversight?

- A. Generate temporary folder names for my personal notes.
- B. Write alternative sentences for an exercise that will stay private.
- C. Propose a spending decision that could commit part of the organization’s budget. **[correct]**
- D. Prepare ideas for an internal discussion where the decision is still open.

**Why:** Spending can commit real resources. Whoever decides should check the evidence and consequences before approving it.

#### `N_B_DAT_1` - `DAT-1` - S

**Question:** You need to summarize resumes received for recruitment. What is the first check?

- A. Check permission, the tool, and which details I need. **[correct]**
- B. Upload the full résumés and delete the local copies afterwards.
- C. Remove photos but keep names, addresses, and other details I do not need.
- D. Use a personal account to separate these files from those already at work.

**Why:** Résumés contain personal information. Check what you are allowed to use, for which purpose, and which details you need.

#### `N_B_DAT_2` - `DAT-2` - S

**Question:** AI generates an image for a campaign. What is the most responsible action before publishing it?

- A. Check colors and dimensions because they are the most visible campaign details.
- B. Check whether the image is suitable, whether it shows recognizable people or works, and which rules apply. **[correct]**
- C. Assume I can publish it because I generated it with my own account.
- D. Add an “AI-generated” label and consider that enough to publish it.

**Why:** Before publishing, check whether the image is suitable and whether it includes recognizable people, works, or brands. Check which rules apply.

### Form C

#### `N_C_CAP_1` - `CAP-1` - C

**Question:** You ask a generative system to create an image of an imaginary city. Which description is most accurate?

- A. Copy a photo of the city from an archive.
- B. Creates an image from the request and patterns it has learned. **[correct]**
- C. Combines live pictures of real cities until it finds the closest match.
- D. Checks whether the buildings and signs it draws follow real-world rules.

**Why:** AI can create an image of a city that does not exist. Its details may look real even when they are not.

#### `N_C_CAP_2` - `CAP-2` - S

**Question:** You need to organize an activity with several constraints. How can AI help without replacing the decision?

- A. Offer alternatives with benefits and drawbacks. **[correct]**
- B. Pick the final option without needing to know the people involved.
- C. Arrange everything without first asking which commitments cannot move.
- D. Treat the first proposal as final.

**Why:** Alternatives help you compare trade-offs. The final choice stays with the people who know the commitments and priorities.

#### `N_C_LIM_1` - `LIM-1` - S

**Question:** You ask "Are you sure?" and AI confirms the answer even more confidently. What changed?

- A. The second answer is independent confirmation of the first one.
- B. The stronger wording means the model has checked an outside source.
- C. The wording changed. To check the answer, I still need to look at an independent source. **[correct]**
- D. The more confident phrasing means I can reasonably do fewer checks.

**Why:** The same system can repeat an error in stronger words. Check a separate source or the original data.

#### `N_C_LIM_2` - `LIM-2` - S

**Question:** You ask about an internal procedure that you did not provide to the model. What is the main risk?

- A. It may ask for details before answering.
- B. It may invent a plausible procedure that differs from the real one. **[correct]**
- C. It may retrieve the correct internal document from the procedure’s name.
- D. It may give a generic procedure and clearly label it as an example.

**Why:** Without the document, AI can fill in gaps with a convincing answer. Use the approved procedure to decide what to do.

#### `N_C_REQ_1` - `REQ-1` - S

**Question:** You want a short message to postpone a meeting. Which request is easiest to control?

- A. Write a polite message that proposes a new date of your choice.
- B. In 60 words, postpone the meeting without inventing dates or reasons. **[correct]**
- C. Write a formal message and invent a reason if that makes it convincing.
- D. Announce the postponement in any format.

**Why:** Specify the length and what is unknown. This helps AI avoid promising dates or giving invented reasons.

#### `N_C_REQ_2` - `REQ-2` - S

**Question:** AI bases its answer on a wrong assumption. What do you do?

- A. Correct the assumption and ask it to revise affected parts. **[correct]**
- B. Add only my preference.
- C. Ask for a fuller answer without saying what information is wrong.
- D. Keep the answer and correct only the sentence where the error appears.

**Why:** A mistaken assumption can affect the conclusions too. Reviewing the parts that depend on it corrects more than the original sentence.

#### `N_C_VER_1` - `VER-1` - S

**Question:** AI describes a legal obligation. What is the strongest check before acting?

- A. Check the current rule and who it applies to. **[correct]**
- B. Trust the explanation if it uses the right legal terms and cites a section.
- C. Ask the model to rewrite it more formally and see if the explanation is consistent.
- D. Check the section number.

**Why:** Before acting, check the current wording, date, and whether the rule applies to your case. Get qualified help if the consequences matter.

#### `N_C_VER_2` - `VER-2` - S

**Question:** Which output needs the most rigorous check before use?

- A. A draft story outline kept in a private notebook.
- B. Health advice intended for another person. **[correct]**
- C. A list of character names that I can change later.
- D. A provisional list of films to watch with friends over the weekend.

**Why:** Health advice can affect a person’s well-being. It deserves closer checking than a creative idea you can readily change.

#### `N_C_DAT_1` - `DAT-1` - S

**Question:** You want to summarize an internal meeting record. What is the most cautious approach?

- A. Paste the minutes into my usual chatbot because they are already plain text.
- B. Check whether I may share the minutes, which tool is approved, and what details can be removed. **[correct]**
- C. Change people’s names but keep other details that can identify them.
- D. Add “confidential” before pasting the complete minutes into the tool.

**Why:** Meeting minutes can contain confidential information even without names. Check permission, the tool, and what you actually need to share.

#### `N_C_DAT_2` - `DAT-2` - S

**Question:** A colleague wants to use an AI-generated recommendation without checks. What is the most responsible response?

- A. Use it if it seems reasonable and credit the model as responsible.
- B. Review the data and consequences before deciding. **[correct]**
- C. Ask the same model to confirm.
- D. Use the recommendation as written and just label it as AI-generated.

**Why:** Saying a proposal came from AI does not transfer responsibility. Whoever decides should check the data, assumptions, and consequences.

## 7. Unita' didattiche riutilizzabili

Le trenta domande non producono trenta tutorial. Ogni errore rimanda a una delle dieci unità seguenti. Le spiegazioni sono contenuti locali dell'app; i collegamenti esterni sono facoltativi.

### `U-CAP-1` - Generare non significa cercare

- Obiettivo: `CAP-1`
- Principio IT: un sistema generativo crea contenuti usando la richiesta e ciò che ha imparato dai dati. Una ricerca, la lettura di un documento e la verifica delle informazioni sono passaggi distinti.
- Principle EN: a generative system creates content from the request and what it learned from data. Searching, reading a document, and checking facts are separate steps.
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
- risposta attesa e spiegazione della domanda per i nuovi report
- esito corretto/da rivedere
- versione della banca e della forma

Non viene salvato o inviato alcun profilo psicologico. Nessun dato lascia il browser salvo export manuale.

### 8.2 Composizione

1. Mostrare il conteggio delle risposte corrette su 10.
2. Aprire per prime le risposte da rivedere. Mostrare domanda, risposta scelta, risposta attesa e spiegazione salvate nel report.
3. Rendere consultabili anche le risposte corrette e le loro spiegazioni.
4. Mostrare una scheda di esercizio per ogni `learningUnitId` da rivedere.
5. Con tutte le risposte corrette, proporre Literacy o un’altra forma di Primi passi.

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

Il risultato riporta il numero di risposte corrette su 10 in questa prova. Il testo di orientamento segue il risultato.

- `0–6` · Rivedi le basi con gli esercizi / Practice the basics with the exercises
- `7–9` · Rileggi le risposte da rivedere / Review the answers you missed
- `10` · Hai risposto bene a tutte le domande / You answered every question correctly

Sono indicazioni di studio. I report precedenti conservano risposte e testi originali e mostrano le schede didattiche. I dettagli per domanda sono disponibili nei nuovi report che li salvano.

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

Gli esempi descrivono la struttura, non impongono l'introduzione di moduli JavaScript o build tool. L'implementazione deve restare compatibile con un hosting statico senza build step.

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
6. uso del conteggio delle risposte corrette su 10 con un’indicazione formativa
7. fasce formative proposte
8. percorsi successivi suggeriti in base agli errori


## Compatibilità M21

Primi passi conserva forme, contenuti, tutorial e contratto didattico autonomo nella release 3.4.0, M21 approvata dal maintainer il 2026-11-25. Il nuovo Laboratorio operativo è un percorso separato e non modifica il risultato didattico. L'azione comune “Cancella dati locali” nei risultati elimina con conferma anche l'eventuale bozza incompleta del laboratorio, oltre a storico e rotazione delle forme; non esegue migrazioni o confronti fra evidenze.
