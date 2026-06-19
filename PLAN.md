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
| Fondamenti tecnici LLM | 13 |
| Fluency - Delegation | 3 |
| Fluency - Description | 4 |
| Fluency - Discernment | 4 |
| Fluency - Diligence | 3 |
| Mindset | 9 |
| Practical Lab | 7 |
| Totale | 50 |

Vista aggregata:

| Macro-area | Domande |
| --- | ---: |
| Literacy inclusi fondamenti tecnici | 20 |
| Fluency incluse le 4D e prove pratiche collegate | 21 |
| Mindset incluse prove pratiche collegate | 10 |
| Practical Lab trasversale | 7 |

Nota: alcune domande del Practical Lab contribuiscono a Literacy, Fluency o Mindset. Per i test tematici bisognera' decidere se mostrarle dentro il tema misurato o tenerle come modulo separato.

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
  - spezzare `ai_skill_test.html` in file piu' leggibili senza cambiare comportamento.
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

## Milestone 4 - Modalita' di test

- Branch: `feature/test-modes`
- Tipo: modifica grossa
- Versione target: `2.0.0`
- Obiettivo:
  - offrire un test completo e test tematici piu' brevi.
- Modalita' previste:
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
  - i test tematici includono solo le domande della sezione scelta; il Practical Lab resta una modalita' dedicata
  - i test brevi mostrano un profilo tematico, non il profilo globale Beginner/Curious/Expert/Champion
  - lo storico distingue chiaramente `complete` e `topic`
  - la rotazione A/B/C resta attiva anche sui test tematici
  - ogni test tematico estrae casualmente 10 domande dal pool della sezione, ampliato dove necessario
  - la banca domande passa a 100 domande base, pari a 300 item erogabili sulle tre forme A/B/C
- Scope:
  - selettore di modalita' nella landing o nello step dati
  - conteggio domande aggiornato in base alla modalita'
  - scoring coerente anche quando alcune dimensioni non sono presenti
  - dashboard adattata ai test brevi
  - export JSON/CSV con `testMode`
  - storico report con modalita' visibile
- Validazione:
  - test completo resta a 50 domande
  - ogni test tematico contiene 10 domande della sezione attesa
  - due sessioni consecutive dello stesso tema possono mostrare set di domande diversi
  - risultati non mostrano aree assenti come punteggi fuorvianti
  - export include modalita' e versione
  - bibliografia resta raggiungibile
- Stato: completata su `main`

## Milestone 5 - Revisione README e documentazione pubblica

- Branch: `feature/readme-test-modes`
- Tipo: modifica piccola
- Versione target: `2.0.1`
- Obiettivo:
  - aggiornare README e documentazione dopo l'introduzione delle modalita' di test.
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
  - aggiornamento del conteggio nel riquadro hero in base alla modalita' selezionata
  - versione app e documentazione aggiornate
- Validazione:
  - carosello visibile al primo accesso
  - autoplay cambia percorso con ritmo leggibile
  - pulsante `Pausa`, frecce, indicatori e swipe touch controllano il percorso
  - `Inizia questo test` apre lo step dati con la modalita' selezionata
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
  - default lingua da impostazioni browser: italiano se il browser e' in italiano, inglese per inglese o qualunque altra lingua
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
  - separare il ciclo delle forme per lingua e modalita' di test
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
  - percorsi brevi ruotano A/B/C per lingua e modalita'
  - le varianti pratiche aperte B/C sono localizzate in inglese
  - export/report includono forma A/B/C, lingua, versione `2.2.0`, banca `2026.06-m5` e forma `1.1`
  - sintassi JavaScript valida
- Stato: in validazione

## Backlog opzionale

- Aggiungere una checklist manuale di QA in `docs/QA.md`.
- Aggiungere un piccolo smoke test Playwright se il progetto passa a una struttura servita da dev server.
- Estrarre le fonti bibliografiche in un formato dati riutilizzabile.
- Aggiungere una pagina changelog.
