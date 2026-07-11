# Piano di evoluzione

Questo piano governa le prossime modifiche del progetto `AIskillTest`. Ogni milestone deve essere sviluppata su un branch dedicato, validata, poi committata, mergiata su `main`, pushata e taggata quando produce una nuova versione dell'app.

Versione di partenza: `1.0.0`.

## Regole di release

- Modifica piccola: incremento `0.0.1`.
- Modifica media: incremento `0.1.0`.
- Modifica grossa: incremento `1.0.0`.
- Ogni tag GitHub deve essere annotato nel formato `vX.Y.Z`.
- Il tag va creato solo dopo merge su `main` e push del branch principale.
- Se una milestone cambia solo documentazione e non il comportamento dell'app, non richiede tag salvo decisione esplicita.

## Flusso operativo per ogni milestone

1. Partire da `main` aggiornato e pulito.
2. Creare un branch dedicato con nome descrittivo.
3. Implementare una sola milestone per branch.
4. Validare localmente.
5. Far validare la modifica al maintainer.
6. Solo dopo validazione, eseguire commit.
7. Eseguire merge su `main`.
8. Pushare `main`.
9. Creare e pushare il tag se la milestone produce una nuova versione.
10. Eliminare il branch locale e remoto.

## Inventario attuale del test

Ogni forma del test contiene 50 domande.

| Area | Domande |
| --- | ---: |
| Literacy | 7 |
| Fondamenti tecnici LLM | 11 |
| AI Agents | 4 |
| Fluency - Delegation | 3 |
| Fluency - Description | 4 |
| Fluency - Discernment | 4 |
| Fluency - Diligence | 3 |
| Mindset | 7 |
| Practical Lab | 7 |
| Totale | 50 |

Vista aggregata:

| Macro-area | Domande |
| --- | ---: |
| Literacy inclusi fondamenti tecnici e item Agents collegati | 21 |
| Fluency incluse le 4D e prove pratiche collegate | 21 |
| Mindset incluse prove pratiche collegate | 8 |
| Practical Lab trasversale | 7 |

Nota: alcune domande del Practical Lab contribuiscono a Literacy, Fluency o Mindset. La sezione AI Agents ha 4 domande nel test completo e un pool tematico dedicato da 15 domande per alimentare la rotazione A/B/C.

## Milestone 0 - Documentazione di governance

- Branch: `plan/milestones-and-agents`
- Tipo: documentazione
- Versione target: nessun bump applicativo
- Scope:
  - aggiungere `PLAN.md`
  - aggiungere `AGENTS.md`
  - fissare regole di branch, validazione, merge, tag e versioning
- Validazione:
  - lettura del maintainer
  - `git status --short --branch`
- Stato: completata su `main`

## Milestone 1 - Refactor file statici

- Branch: `feature/static-file-refactor`
- Tipo: modifica media
- Versione target: `1.1.0`
- Obiettivo:
  - spezzare `ai_skill_test.html` in file più leggibili senza cambiare comportamento.
- Scope consigliato:
  - `index.html` o `ai_skill_test.html` come shell HTML principale
  - `assets/styles.css` per gli stili
  - `assets/app.js` per stato, navigazione, scoring ed export
  - `assets/questions.js` per banca domande, forme e override
  - eventuale `assets/bibliography.js` o markup dedicato se conviene
- Vincoli:
  - il sito deve restare statico e pubblicabile su GitHub Pages
  - evitare bundler e dipendenze se non strettamente necessari
  - preferire script classici caricabili anche da file locale; se si usano module script, documentare che serve server locale
  - nessun cambio funzionale intenzionale in questa milestone
- Validazione:
  - apertura pagina principale
  - avvio test
  - completamento rapido di un percorso campione
  - export JSON e CSV
  - accesso alla bibliografia
- Stato: completata su `main`

## Milestone 2 - Nuova pagina iniziale e step dati

- Branch: `feature/landing-and-profile-flow`
- Tipo: modifica media
- Versione target: `1.2.0`
- Obiettivo:
  - separare la landing descrittiva dallo step di raccolta dati facoltativi.
- Scope:
  - home iniziale con descrizione del test
  - riepilogo delle 50 domande e distribuzione per tema
  - pulsante `Inizia`
  - pulsante `Bibliografia`
  - click su `Bibliografia` porta alla pagina bibliografia
  - click su `Inizia` porta allo step dati
  - step dati con nome, ruolo, team/area e autovalutazione skill
  - nota chiara: le informazioni restano locali nella cache/localStorage del browser
  - nota privacy: nessun invio automatico a server esterni
  - spiegazione: le skill dichiarate servono a confrontare aspettative e risultati ottenuti
  - campi tutti facoltativi
  - pulsante finale per iniziare realmente il test
- Decisione UX:
  - versione e metadati restano visibili nella home/hero, non nel titolo del browser
  - bibliografia resta disponibile anche dai risultati finali
- Validazione:
  - landing visibile al primo accesso
  - bibliografia raggiungibile dalla landing
  - ritorno dalla bibliografia funzionante
  - dati facoltativi non bloccano l'avvio
  - i dati inseriti appaiono nel report/export
  - nessun dato lascia il browser
- Stato: completata su `main`

## Milestone 3 - Avanzamento automatico sulle scelte singole

- Branch: `feature/auto-advance-single-choice`
- Tipo: modifica piccola
- Versione target: `1.2.1`
- Obiettivo:
  - nelle domande a scelta singola, passare automaticamente alla domanda successiva dopo la risposta.
- Scope:
  - auto-advance per `choice`, `scenario`, `knowledge` e Likert, se rappresentati come scelta singola
  - mantenere il pulsante `Indietro`
  - evitare auto-advance per `multi`
  - evitare auto-advance per `text`
  - mantenere il pulsante `Avanti` dove necessario
  - gestire ultima domanda senza salto improprio
- Dettagli UX:
  - usare un delay breve solo se serve a far percepire la selezione
  - se l'utente torna indietro e cambia risposta, il comportamento deve restare prevedibile
- Validazione:
  - scelta singola avanza da sola
  - scelta multipla richiede `Avanti`
  - testo/prompt richiede `Avanti`
  - `Indietro` conserva la risposta precedente
  - completamento test ancora possibile
- Stato: completata su `main`

## Milestone 4 - Modalità di test

- Branch: `feature/test-modes`
- Tipo: modifica grossa
- Versione target: `2.0.0`
- Obiettivo:
  - offrire un test completo e test tematici più brevi.
- Modalità previste:
  - test completo da 50 domande
  - Literacy da 10 domande
  - Fondamenti tecnici LLM da 10 domande
  - Fluency - Delegation da 10 domande
  - Fluency - Description da 10 domande
  - Fluency - Discernment da 10 domande
  - Fluency - Diligence da 10 domande
  - Mindset da 10 domande
  - Practical Lab da 10 domande
- Decisioni applicate:
  - i test tematici includono solo le domande della sezione scelta; il Practical Lab resta una modalità dedicata
  - i test brevi mostrano un profilo tematico, non il profilo globale Beginner/Curious/Expert/Champion
  - lo storico distingue chiaramente `complete` e `topic`
  - la rotazione A/B/C resta attiva anche sui test tematici
  - ogni test tematico estrae casualmente 10 domande dal pool della sezione, ampliato dove necessario
  - la banca domande passa a 100 domande base, pari a 300 item erogabili sulle tre forme A/B/C
- Scope:
  - selettore di modalità nella landing o nello step dati
  - conteggio domande aggiornato in base alla modalità
  - scoring coerente anche quando alcune dimensioni non sono presenti
  - dashboard adattata ai test brevi
  - export JSON/CSV con `testMode`
  - storico report con modalità visibile
- Validazione:
  - test completo resta a 50 domande
  - ogni test tematico contiene 10 domande della sezione attesa
  - due sessioni consecutive dello stesso tema possono mostrare set di domande diversi
  - risultati non mostrano aree assenti come punteggi fuorvianti
  - export include modalità e versione
  - bibliografia resta raggiungibile
- Stato: completata su `main`

## Milestone 5 - Revisione README e documentazione pubblica

- Branch: `feature/readme-test-modes`
- Tipo: modifica piccola
- Versione target: `2.0.1`
- Obiettivo:
  - aggiornare README e documentazione dopo l'introduzione delle modalità di test.
- Scope:
  - descrivere test completo e test tematici
  - indicare privacy/localStorage
  - aggiornare distribuzione domande
  - aggiornare istruzioni GitHub Pages
  - allineare riferimenti a versione e tag
- Validazione:
  - README coerente con UI e comportamento reale
  - link principali funzionanti
- Stato: completata su `main`

## Milestone 6 - Carosello scelta test in landing

- Branch: `feature/landing-carousel`
- Tipo: modifica piccola
- Versione target: `2.0.2`
- Obiettivo:
  - sostituire l'elenco verticale dei test e il riquadro separato dei temi con un carosello orizzontale a scorrimento automatico ogni 5 secondi.
- Scope:
  - una sezione unica `Scegli il tuo percorso` nella landing
  - slide per test completo e percorsi tematici
  - autoplay ogni 5 secondi con pulsante `Pausa`
  - frecce, indicatori e swipe touch per scorrere i percorsi
  - durata stimata, output atteso e temi affrontati dentro ogni slide
  - avvertenza chiara: i percorsi tematici non producono profilo globale
  - aggiornamento del conteggio nel riquadro hero in base alla modalità selezionata
  - versione app e documentazione aggiornate
- Validazione:
  - carosello visibile al primo accesso
  - autoplay cambia percorso con ritmo leggibile
  - pulsante `Pausa`, frecce, indicatori e swipe touch controllano il percorso
  - `Inizia questo test` apre lo step dati con la modalità selezionata
  - test completo resta a 50 domande
  - percorsi tematici restano a 10 domande e mostrano report tematico
  - layout leggibile su desktop e mobile
- Stato: completata su `main`

## Milestone 7 - Riconoscimento licenza GitHub

- Branch: `fix/apache-license-detection`
- Tipo: correzione repository metadata
- Versione target: nessun bump applicativo
- Obiettivo:
  - sostituire il file `LICENSE` incompleto con il testo canonico completo Apache License 2.0.
- Scope:
  - aggiornare solo `LICENSE`
  - mantenere invariata la versione dell'app
  - nessun tag applicativo
- Validazione:
  - presenza di `END OF TERMS AND CONDITIONS`
  - presenza dell'appendice canonica Apache 2.0
  - repository pulito dopo commit e merge
- Stato: completata su `main`

## Milestone 8 - Localizzazione italiano/inglese

- Branch: `feature/english-localization`
- Tipo: modifica media
- Versione target: `2.1.0`
- Obiettivo:
  - aggiungere la variante inglese del test e una scelta lingua manuale, mantenendo il comportamento statico e locale dell'app.
- Scope:
  - selettore `IT` / `EN` nella pagina di avvio
  - default lingua da impostazioni browser: italiano se il browser è in italiano, inglese per inglese o qualunque altra lingua
  - salvataggio della preferenza manuale nel `localStorage`
  - testi principali di landing, step dati, test, dashboard, bibliografia ed export localizzati
  - traduzione inglese della banca domande base
  - forma `EN` per gli assessment in inglese
  - rotazione A/B/C preservata per gli assessment in italiano
  - metadati lingua e origine scelta lingua negli export
  - versione app e documentazione aggiornate
- Vincoli:
  - nessuna chiamata di rete
  - nessun tracciamento o invio automatico dei risultati
  - cambio lingua da fare prima dell'avvio del test, per evitare report con domande e risposte miste
- Validazione:
  - browser italiano apre di default la versione italiana
  - browser inglese o non italiano apre di default la versione inglese
  - selettore manuale `IT` / `EN` cambia lingua e mantiene la preferenza localmente
  - test italiano continua a usare forme A/B/C
  - test inglese usa forma `EN` e domande tradotte
  - percorsi tematici restano a 10 domande
  - test completo resta a 50 domande
  - dashboard ed export includono lingua, origine lingua e versione `2.1.0`
  - documentazione aggiornata
- Stato: completata su `main`

## Milestone 9 - Cache busting asset statici

- Branch: `fix/english-dashboard-strings`
- Tipo: modifica piccola
- Versione target: `2.1.1`
- Obiettivo:
  - evitare che browser e GitHub Pages riusino versioni obsolete di JavaScript e CSS dopo patch di localizzazione.
- Scope:
  - aggiornare la versione app a `2.1.1`
  - aggiungere query string di versione a `assets/styles.css`, `assets/questions.js`, `assets/i18n.js` e `assets/app.js`
  - mantenere invariati banca domande, privacy, export e logica di scoring
  - aggiornare README e piano
- Validazione:
  - apertura della pagina con badge `2.1.1`
  - caricamento degli asset con query string `v=2.1.1`
  - full test inglese da 50 domande con controlli e dashboard localizzati
  - sintassi JavaScript valida
- Stato: completata su `main`

## Milestone 10 - Rotazione forme e varianti pratiche

- Branch: `feature/form-rotation-all-modes`
- Tipo: modifica media
- Versione target: `2.2.0`
- Obiettivo:
  - ridurre la ripetizione percepita dei quesiti quando una persona ripete lo stesso test o lo stesso percorso tematico.
- Scope:
  - usare la rotazione A/B/C per italiano e inglese
  - separare il ciclo delle forme per lingua e modalità di test
  - mantenere test completo a 50 domande e percorsi tematici a 10 domande
  - arricchire gli slot pratici aperti con varianti equivalenti su action plan, dashboard dati, deep search, creazione documenti e verifica dashboard
  - localizzare in inglese le varianti pratiche form-specific B/C
  - aggiornare versione app, versione banca domande, versione forma, query string asset, README e piano
- Vincoli:
  - nessuna chiamata di rete
  - nessun tracciamento o invio automatico dei risultati
  - rubriche degli slot pratici mantenute a 6 criteri con red flag equivalenti
- Validazione:
  - test completo italiano ruota A/B/C e resta a 50 domande
  - test completo inglese ruota A/B/C e resta a 50 domande
  - percorsi brevi ruotano A/B/C per lingua e modalità
  - le varianti pratiche aperte B/C sono localizzate in inglese
  - export/report includono forma A/B/C, lingua, versione `2.2.0`, banca `2026.06-m5` e forma `1.1`
  - sintassi JavaScript valida
- Stato: completata su `main`

## Milestone 11 - AI Agents e README bilingue

- Branch: `feature/ai-agents-assessment`
- Tipo: modifica media
- Versione target: `2.3.0`
- Obiettivo:
  - introdurre una sezione dedicata agli AI Agents senza superare le 50 domande nel test completo e rendere il README bilingue.
- Scope:
  - aggiungere il percorso tematico `AI Agents` da 10 domande
  - aggiungere 15 domande base sugli agenti in italiano e inglese
  - inserire 4 domande AI Agents nel test completo mantenendo il totale a 50 domande
  - aggiungere varianti equivalenti B/C per gli item Agents presenti nel completo
  - includere punteggio, barre, raccomandazioni e guida sezione per AI Agents
  - mantenere il carosello in autoplay ogni 5 secondi salvo pausa esplicita
  - aggiungere `Interrompi il test` con conferma e annullamento della sessione corrente
  - aggiornare UI, cache busting, versione app, banca domande e forma assessment
  - trasformare `README.md` in documentazione bilingue italiano/inglese
- Vincoli:
  - nessuna chiamata di rete
  - nessun tracciamento o invio automatico dei risultati
  - dati e storico restano locali nel browser
  - il test non deve essere presentato come psicometricamente validato
- Validazione:
  - test completo italiano e inglese restano a 50 domande
  - percorso AI Agents italiano e inglese mostra 10 domande dal pool dedicato
  - forme A/B/C ruotano anche per il percorso AI Agents
  - il carosello avanza automaticamente ogni 5 secondi quando non è in pausa
  - `Interrompi il test` chiede conferma, scarta le risposte correnti e torna alla home
  - report ed export includono versione `2.3.0`, banca `2026.06-m6` e forma `1.2`
  - README bilingue coerente con comportamento pubblico
  - sintassi JavaScript valida
- Stato: completata su `main`

## Milestone 12 - Chiarezza delle risposte dichiarative

- Branch: `fix/declarative-answer-details`
- Tipo: modifica piccola
- Versione target: `2.3.1`
- Obiettivo:
  - rendere più distinguibili i livelli delle domande dichiarative senza reintrodurre numeri, ordine crescente o altri segnali che favoriscano la selezione automatica del livello massimo.
- Motivazione:
  - nei test preliminari, la scala ordinata induceva alcuni partecipanti molto esposti a tutorial, newsletter e contenuti AI a scegliere sistematicamente il livello più alto
  - il mescolamento delle alternative ha favorito risposte più meditate, ma la differenza tra autonomia occasionale, metodo stabile e pratica trasferibile può risultare poco chiara
  - la revisione deve preservare la frizione utile, riducendo l'ambiguita' semantica e il carico di decodifica
- Scope:
  - mantenere il mescolamento delle alternative dichiarative e l'assenza di etichette numeriche o livelli espliciti
  - riscrivere titoli e dettagli delle cinque alternative usando evidenze comportamentali osservabili
  - distinguere con chiarezza: comportamento non applicato, applicazione con supporto, autonomia caso per caso, metodo stabile e pratica verificata/trasferibile
  - evitare che familiarita' con il linguaggio AI, capacita' di spiegare un concetto o consumo di contenuti siano presentati come prova sufficiente di pratica operativa
  - sostituire `Mostra suggerimenti` / `Nascondi suggerimenti` con `Mostra i dettagli` / `Nascondi i dettagli`, e con equivalenti naturali in inglese
  - aggiungere una breve istruzione che inviti a rispondere in base a ciò che si fa abitualmente e a usare i dettagli quando due alternative sembrano simili
  - verificare che il comando sia visibile prima della selezione, considerato l'auto-advance delle scelte singole
  - aggiornare localizzazione italiana e inglese, versione app, cache busting, versione banca/forma se necessario, README e piano
- Vincoli:
  - non rendere visibile quale alternativa assegna il punteggio più alto
  - non modificare pesi, scoring o composizione dei percorsi salvo necessità documentata
  - non presentare la scala come psicometricamente validata
  - nessuna chiamata di rete e nessun cambiamento alla gestione locale dei dati
- Validazione:
  - alternative dichiarative mostrate in ordine casuale in italiano e inglese
  - dettagli comprensibili anche fuori dall'ordine gerarchico originale
  - differenza riconoscibile tra autonomia, metodo ripetibile e trasferibilità
  - comando `Mostra i dettagli` apre e richiude correttamente i testi
  - selezione, auto-advance, ritorno con `Indietro` e cambio risposta restano prevedibili
  - test completo e percorsi interessati mantengono conteggi e scoring attesi
  - report, export, privacy e bibliografia restano invariati salvo versionamento
  - README italiano/inglese e metadati di versione allineati
- Criterio di validazione del maintainer:
  - lettura comparativa delle cinque alternative senza numeri e in almeno tre ordini differenti
  - conferma che la scala richieda attenzione ma non la ricostruzione ambigua della gerarchia
- Stato: completata su `main`

## Milestone 13 - Blueprint del percorso introduttivo

- Branch: `plan/novice-learning-path`
- Tipo: documentazione e progettazione contenuti
- Versione target: nessun bump applicativo
- Obiettivo:
  - definire prima dell'implementazione la matrice didattica, le tre forme parallele, le unità di apprendimento e le fonti del percorso rivolto a persone con poca o nessuna esperienza di AI.
- Posizionamento:
  - il percorso è un'esperienza di apprendimento, non una versione facile dell'assessment e non una certificazione
  - nome di lavoro italiano: `Primi passi con l'AI`
  - nome di lavoro inglese: `AI First Steps`
  - il risultato non è confrontabile con l'indice AI Skill del test completo
- Deliverable documentali:
  - aggiungere un documento dedicato, per esempio `LEARNING_PATH.md`, mantenuto in italiano e con le stringhe pubbliche previste anche in inglese
  - definire dieci obiettivi verificabili distribuiti in cinque aree: possibilità della GenAI, limiti/falsa sicurezza, richieste e contesto, verifica di fonti/output, privacy/responsabilità
  - progettare tre forme A/B/C da 10 domande con la stessa matrice di aree e difficoltà, per una banca minima di 30 domande introduttive
  - definire quali domande siano di comprensione, scenario o scelta operativa; limitare gli item dichiarativi perché non producono errori didattici interpretabili
  - definire un insieme ridotto di unità didattiche riutilizzabili, collegate a più domande e condivise tra le tre forme
  - per ogni unità specificare: principio, errore tipico, spiegazione, esempio, micro-azione, fonte, lingua, difficoltà, tempo stimato e data di verifica della fonte
  - classificare le letture in tre livelli: spiegazione locale breve, approfondimento introduttivo, studio avanzato
  - mappare le fonti già presenti che possono essere riutilizzate e identificare le lacune, in particolare privacy/dati, verifica delle fonti, copyright e uso proporzionato al rischio
  - preferire fonti primarie, istituzionali, gratuite, accessibili e stabili; distinguere la bibliografia metodologica dai materiali consigliati al neofita
  - documentare la logica con cui errori e risposte corrette alimentano il tutorial personalizzato
- Vincoli:
  - equivalenza delle forme progettata ma non dichiarata come dimostrata psicometricamente
  - nessuna domanda deve richiedere gergo tecnico non spiegato o conoscenze specialistiche estranee agli obiettivi introduttivi
  - il tutorial locale deve essere comprensibile senza obbligare l'utente ad aprire collegamenti esterni
  - nessuna incorporazione automatica di video, widget o contenuti di terze parti
- Validazione:
  - ogni forma contiene esattamente 10 domande e copre la stessa matrice 2+2+2+2+2
  - ogni domanda è collegata ad almeno un obiettivo e a un'unità didattica
  - ogni unità didattica ha almeno una fonte tracciabile e una spiegazione locale autonoma
  - revisione del linguaggio da parte del maintainer con attenzione a neofiti e persone non appassionate di AI
  - controllo che fonti metodologiche e letture consigliate siano presentate con funzioni distinte
- Criterio di validazione del maintainer:
  - approvazione della matrice, delle 30 domande, delle unità didattiche e della selezione delle fonti prima di iniziare l'implementazione applicativa
- Stato: completata su `main`

## Milestone 14 - Percorso guidato Primi passi con l'AI

- Branch: `feature/novice-learning-path`
- Tipo: modifica media
- Versione target: `2.4.0`
- Dipendenza:
  - milestone 13 validata dal maintainer
- Obiettivo:
  - introdurre un percorso statico e bilingue da 10 domande che trasformi gli errori in un tutorial personalizzato e offra una continuazione di studio graduata.
- Scope percorso:
  - aggiungere `Primi passi con l'AI` / `AI First Steps` al selettore dei percorsi in landing
  - descrivere chiaramente destinatari, durata, finalità didattica e non confrontabilità con il test completo
  - mantenere facoltativi gli eventuali dati iniziali e mostrare la nota privacy esistente
  - selezionare a ogni sessione una forma A/B/C completa da 10 domande secondo il ciclo locale già adottato, separato per lingua e modalità
  - mescolare ordine delle domande e alternative senza alterare la copertura fissa delle cinque aree
  - usare scenari quotidiani, domande di comprensione e scelte operative con linguaggio accessibile
  - non mostrare indice AI Skill, profilo globale Beginner/Curious/Expert/Champion o punteggi di dimensioni non misurate
  - presentare un risultato denominato `Preparazione sulle basi` o equivalente validato nella milestone 13
- Scope tutorial personalizzato:
  - mostrare al termine le unità didattiche collegate agli errori, senza duplicare la stessa spiegazione per domande diverse
  - per ogni errore mostrare situazione, limite della scelta, principio da ricordare, esempio e micro-azione concreta
  - riconoscere anche le risposte corrette con un rinforzo breve e non celebrativo
  - mantenere disponibili localmente tutte le spiegazioni essenziali
  - proporre approfondimenti in livelli di impegno, con tempo stimato e indicazione della fonte
  - aprire fonti esterne solo dopo un'azione esplicita dell'utente e in una nuova scheda
  - offrire al termine la possibilità di ripetere il percorso con una forma successiva o passare a un test tematico, chiarendo che la ripetizione ha finalità didattica
- Struttura tecnica consigliata:
  - mantenere compatibilita' diretta con GitHub Pages, senza build tool o dipendenze runtime
  - separare, se utile, banca domande introduttive, unità didattiche e fonti in file statici dedicati
  - collegare domande e unità tramite identificatori stabili, senza generare contenuti o spiegazioni tramite servizi esterni
  - salvare report e storico solo in `localStorage`, usando la modalità e la forma per distinguere il percorso introduttivo dagli assessment
  - includere in JSON/CSV almeno modalità, forma, lingua, versione, risposte e identificatori delle unità consigliate, senza esportazioni automatiche
- Bibliografia e studio:
  - mantenere la bibliografia metodologica attuale
  - aggiungere una sezione distinta per le risorse di apprendimento introduttive
  - indicare per ogni risorsa livello, lingua, tempo stimato e data dell'ultima verifica
  - includere solo collegamenti scelti nella milestone 13 e verificati prima della release
- Privacy e accessibilità:
  - nessun dato del rispondente, errore o risultato inviato a server esterni
  - nessun analytics, tracking, embed o caricamento preventivo di risorse esterne
  - link esterni attivati solo dal click dell'utente e descritti come tali
  - tutorial leggibile su desktop e mobile, navigabile da tastiera e comprensibile senza affidarsi solo a colore o icone
- Documentazione e versioning:
  - aggiornare UI, `assessmentVersion`, versione banca domande, versione forme, cache busting e tag previsti
  - aggiornare `README.md` in italiano e inglese con modalità, finalità, privacy, storico, export e pubblicazione GitHub Pages
  - aggiornare `PLAN.md` con esito e versione finale
  - aggiornare `AGENTS.md` solo se l'implementazione introduce nuove regole operative o vincoli permanenti
  - mantenere `LEARNING_PATH.md` allineato a domande, unità e fonti effettivamente pubblicate
- Validazione funzionale:
  - percorso introduttivo italiano e inglese contiene esattamente 10 domande
  - tre sessioni complete possono attraversare A/B/C senza rompere il ciclo delle altre modalità
  - ogni forma rispetta la matrice 2+2+2+2+2 approvata
  - tutorial finale mostra contenuti pertinenti agli errori e non duplica unità condivise
  - risposte corrette ricevono un rinforzo coerente e gli errori una spiegazione non giudicante
  - nessun profilo o punteggio globale fuorviante appare nel percorso
  - ripetizione del percorso e passaggio ai test tematici funzionano
  - storico, JSON e CSV distinguono percorso, forma, lingua e versione
  - bibliografia e approfondimenti sono raggiungibili dalla landing e dal risultato
- Validazione tecnica e privacy:
  - apertura diretta di `ai_skill_test.html` e pubblicazione GitHub Pages funzionano senza build
  - test manuale equivalente su desktop e mobile per landing, avvio, navigazione, risultato, tutorial, storico, export e bibliografia
  - ispezione del traffico conferma assenza di richieste esterne durante test e tutorial; sono ammesse solo navigazioni esplicite dopo click su una fonte
  - refresh e ritorno non inviano né perdono dati oltre il comportamento locale documentato
  - sintassi JavaScript valida e nessun errore in console nei flussi principali
- Criterio di validazione del maintainer:
  - completamento manuale di almeno una forma in italiano e una in inglese, includendo risposte corrette ed errate
  - revisione del tutorial come esperienza di apprendimento autonoma, accessibile e capace di suggerire un passo successivo senza obbligarlo
- Stato: completata e approvata dal maintainer; release `v2.4.0`

## Backlog opzionale

- Aggiungere una checklist manuale di QA in `docs/QA.md`.
- Aggiungere un piccolo smoke test Playwright se il progetto passa a una struttura servita da dev server.
- Estrarre le fonti bibliografiche in un formato dati riutilizzabile.
- Aggiungere una pagina changelog.
