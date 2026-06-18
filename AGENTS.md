# Regole d'ingaggio per agenti

Questo file definisce come lavorare nel repository `AIskillTest`.

## Principi

- L'app e' un test statico pubblicabile su GitHub Pages.
- La privacy e' parte del prodotto: nessun dato del rispondente deve essere inviato a server esterni senza richiesta esplicita.
- Le risposte e lo storico devono restare locali nel browser, tramite `localStorage` o meccanismo equivalente documentato.
- Il test non deve essere presentato come psicometricamente validato.
- Ogni modifica deve preservare chiarezza per l'utente e tracciabilita' per il maintainer.
- Tutti i file `.md` rilevanti devono restare aggiornati quando una modifica cambia flusso, comportamento, versioning, privacy, struttura tecnica o processo di lavoro.

## Branch e milestone

- Lavorare una sola milestone per branch.
- Partire sempre da `main` pulito e aggiornato.
- Usare nomi branch descrittivi:
  - `plan/...` per documentazione di piano
  - `feature/...` per nuove funzionalita'
  - `fix/...` per correzioni
  - `docs/...` per sola documentazione
- Non committare una milestone prima della validazione del maintainer, quando il maintainer ha chiesto esplicitamente validazione prima del commit.
- Dopo validazione:
  - commit con messaggio breve e descrittivo
  - merge su `main`
  - push di `main`
  - tag se previsto dalla milestone
  - cancellazione del branch

## Versioning

- Versione corrente iniziale: `1.0.0`.
- Patch: modifica piccola, incremento `0.0.1`.
- Minor: modifica media, incremento `0.1.0`.
- Major: modifica grossa, incremento `1.0.0`.
- Il tag Git deve essere annotato e nel formato `vX.Y.Z`.
- Aggiornare in modo coerente:
  - badge/versione visibile in UI
  - `assessmentVersion` negli export/report
- README o documentazione se la modifica cambia comportamento pubblico

## Documentazione Markdown

- Tenere aggiornati tutti i file `.md` coinvolti o impattati dalla modifica.
- Aggiornare `README.md` quando cambiano uso pubblico, versioni, modalita' di test, privacy, installazione o pubblicazione.
- Aggiornare `PLAN.md` quando cambiano milestone, stato, branch, criteri di validazione o strategia di release.
- Aggiornare `AGENTS.md` quando cambiano regole operative, flusso Git, standard di qualita' o vincoli di progetto.
- Aggiungere note a eventuali altri documenti Markdown quando una modifica rende obsolete istruzioni, esempi o checklist.

## Qualita' e validazione

Prima di proporre una modifica per la validazione:

- controllare `git status --short --branch`
- leggere il diff con `git diff`
- verificare che lo scope corrisponda alla milestone
- aprire la pagina o eseguire un test manuale equivalente
- verificare avvio test, navigazione, risultati, export e bibliografia quando toccati
- segnalare chiaramente cio' che non e' stato possibile verificare

## Regole UI

- La landing deve spiegare cosa misura il test prima di chiedere dati personali.
- I dati iniziali devono restare facoltativi.
- La nota privacy deve essere visibile nello step dati.
- La bibliografia deve essere accessibile dalla landing e dai risultati.
- Nei test brevi, non mostrare punteggi globali se le dimensioni mancanti rendono il risultato fuorviante.
- Nelle scelte singole, l'auto-advance deve essere rapido ma reversibile tramite `Indietro`.
- Nelle scelte multiple e nei campi testo, il pulsante `Avanti` deve restare obbligatorio.

## Struttura file

- E' consentito spezzare l'HTML monolitico in file statici separati.
- Evitare build tool e dipendenze finche' non servono davvero.
- Se si introducono piu' file:
  - tenere HTML, CSS, logica app, banca domande e bibliografia separabili
  - preservare compatibilita' con GitHub Pages
  - documentare se serve un server locale per lo sviluppo
- Non introdurre chiamate di rete per salvare risposte o profilazioni.

## Gestione dati

- Non aggiungere analytics, tracking o invio automatico di risultati.
- Non salvare dati sensibili oltre quanto necessario al funzionamento locale.
- Gli export JSON/CSV devono essere azioni esplicite dell'utente.
- Ogni nuovo campo dati deve avere una ragione leggibile per l'utente.

## Git

- Non usare comandi distruttivi come `git reset --hard` o checkout forzati senza richiesta esplicita.
- Non includere modifiche non collegate alla milestone.
- Non cancellare modifiche del maintainer.
- Prima del merge, assicurarsi che il branch sia aggiornato rispetto a `main`.
- Dopo merge e push, eliminare il branch solo quando il maintainer ha confermato che la milestone e' chiusa.
