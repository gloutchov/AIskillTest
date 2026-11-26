# Checklist di validazione integrata

Riferimento corrente: M22, release `3.5.0`, banca `2026.11-m22`, forma `1.8`; scoring `3.1.0`, schema `4`, blueprint `1.0.0`, casi `1.0.0`. Branch `feature/balanced-complete-assessment`. Milestone e release `v3.5.0` approvate dal maintainer il `2026-11-26`, con autorizzazione a commit, merge, tag, push e rimozione del branch. Gli esiti manuali dettagliati non sono stati comunicati; questa checklist rimane riutilizzabile.

Questa è la checklist riutilizzabile per nuove modifiche. Le verifiche storiche in SCORING e nei documenti M18–M21 descrivono le rispettive release, senza attestare il browser della M22.

Per le patch successive vedi [recupero e storage M23](#m23--recupero-e-storage), [bozze e bibliografia M24](#m24--bozze-tra-schede-e-bibliografia) ed [export CSV M25](#m25--export-csv-e-file-locali).

## Verifiche automatiche

Eseguire dalla radice, senza installare dipendenze:

```powershell
node --test --test-isolation=none tests/*.test.mjs
```

Le verifiche M22 confrontano tutti i 50 slot con la matrice del blueprint in IT/EN e A/B/C; conteggi per area/evidenza, 6 knowledge e 30 scenario, copertura di tutti i 25 obiettivi, Q corretti/parziali/errati, dichiarazioni e testo senza punteggio, E separato, criticità senza compensazione, assenze e null. Verificano anche navigazione, raggruppamento e inversione K1, invalidazione della consegna, ripresa della bozza, rifiuto di dati corrotti/incompatibili, errori di storage, storico originale e JSON/CSV.

`tests/fixtures/m21-regression.json` contiene sei SHA-256 del contenuto effettivo di banca, percorsi non completi, forme didattiche e regole/casi del tag annotato `v3.4.0` (`afb0887`), più un report sintetico originale schema 4. La fixture è stata estratta dagli asset di quel tag, non dalla banca corrente. Non contiene dati di rispondenti e non viene caricata dall'app. Il confronto non richiede Git o processi figli durante i test.

Per rigenerare la revisione editoriale e l'inventario M22:

```powershell
node scripts/build-complete-review.mjs
```

Questo comando genera documentazione locale e non serve all'esecuzione dell'app. I generatori storici includono ora anche le dipendenze del contratto di classificazione.

## Checklist manuale riutilizzabile

Registrare gli esiti nella tabella finale. Completare **almeno una forma IT e una EN**, cronometrare separatamente la durata effettiva e riportare dispositivo/browser. La stima 40–55 minuti resta da verificare; non inferire equivalenza delle forme dai controlli automatici.

1. **Apertura e descrizione.** Aprire `ai_skill_test.html` direttamente e tramite `index.html`; ripetere con hosting statico locale. Badge 3.5.0, quattordici percorsi, dati facoltativi e bibliografia dalla landing. Il completo dichiara 50 unità, con due casi già inclusi; distribuzione F 12, U 16, A 12, H 10. Leggere durata, distinzione Q/D/T/E, nota privacy e salvataggio della bozza.
2. **Quiz e testi.** Avviare con tutti i dati vuoti; verificare ordine/alternative variabili e contenuti nella lingua scelta. La singola scelta avanza rapidamente; Indietro conserva e consente modifica. Nei tematici con multi e nel completo con testo Avanti è obbligatorio. Nessun punteggio o soluzione anticipata. Provare tabulazione, spazio/invio, etichette, focus visibile e zoom 200%.
3. **Caso K1.** Nelle ultime sei unità del completo verificare contatore 45–50 su 50. Confrontare tutte le righe; invertire verifica/calcolo e tornare indietro senza perdere i 44 item. Usare il calcolatore, correggere il totale, preparare anteprima con riferimento alle righe e senza causalità. Confermare ogni azione e poi Avanti. Modificare il calcolo dopo la consegna: occorre riconfermarla. Provare anche totale errato, affermazione causale mantenuta e revisione prudente.
4. **Caso K2.** Gestire la nota non fidata, preparare la bozza entro il mandato e riprendere usando la ricevuta. Le tre decisioni restano contigue anche se C50 è classificato H. Provare un caso corretto e una divulgazione/azione non autorizzata o duplicazione simulata. Non deve avvenire alcuna azione su dati o account reali.
5. **Bozza e interruzione.** Ricaricare a metà quiz, durante un testo parziale e nel laboratorio; Riprendi mantiene lingua, forma, posizione, ordine e risposte, senza consumare una forma né ripristinare dati iniziali del profilo. Esiste una sola bozza condivisa fra completo e laboratorio autonomo. Annullare poi confermare la sostituzione con una nuova sessione. Provare Interrompi annullato/confermato, Elimina bozza, Cancella dati locali e bozza di versione diversa. Un errore di storage deve essere segnalato.
6. **Risultati e limiti.** Rivedere i sei [report campione](M22_REVIEW.md#report-campione-calcolati). Q forte con E debole resta separato; dichiarazioni alte non alzano Q; lacuna Agents resta visibile; un caso incompleto produce E null. Una criticità compare già all'inizio del report e prevale sulla fascia E senza togliere i punti. Non compaiono indice globale, Expert/Champion o capacità non osservate. Aprire motivazioni, suggerimenti e checklist dei testi.
7. **Continuità e storico.** Riprovare almeno un tematico con poche Q, Modern AI, Agents, Harness, laboratorio autonomo e Primi passi. Il tutorial resta distinto dall'assessment. Aprire report originali 2.x, schema 3 e schema 4/3.4.0: testi, valori e versioni restano originali, senza copie dalla sola lettura, ricalcolo o medie fra versioni. Provare la cancellazione esplicita.
8. **Export e bibliografia.** Scaricare JSON/CSV in entrambe le lingue: app 3.5.0, forma 1.8, banca M22, scoring 3.1.0/schema 4, slot/origine dei riusi, scelte/motivazioni, contesti ed effetti E, criticità e assenze. Controllare virgolette, virgole e nuove righe. Bibliografia raggiungibile da landing e risultati, ritorno corretto e fonti aperte solo su click. Provare stampa/salvataggio PDF.
9. **Desktop, mobile e privacy.** Provare almeno desktop e viewport mobile: niente overflow o pulsanti coperti, tabelle leggibili con alternativa testuale, controlli nativi e dettagli utilizzabili da tastiera. In console nessun errore nei flussi verificati; in rete nessun invio di risposte, analytics o caricamento automatico da domini esterni. L'hosting riceve solo richieste dei file statici, senza dati del test. Verificare offline e limiti di persistenza da file://.

## Registro degli esiti

| Prova | Dispositivo/browser | Forma/lingua | Esito e durata | Verificatore/data |
| --- | --- | --- | --- | --- |
| Completo IT | Da compilare | Da compilare | Da verificare | — |
| Completo EN | Da compilare | Da compilare | Da verificare | — |
| Desktop/mobile, tastiera e zoom | Da compilare | IT/EN | Da verificare | — |
| Download, stampa, console e rete | Da compilare | IT/EN | Da verificare | — |
| Approvazione della milestone e della release | — | M22 / v3.5.0 | Approvata; esiti manuali non dettagliati | Maintainer, 2026-11-26 |

Limite della verifica dell'agente: il 2026-11-26 il bootstrap della skill Browser ha restituito «No browser is available»; dopo troubleshooting l'elenco dei browser è vuoto. I test con adattatore DOM non attestano rendering, mobile, tecnologie assistive, console/traffico effettivi, download o stampa. Nessuna durata umana è stata comunicata. Il maintainer ha approvato esplicitamente la chiusura e la release il `2026-11-26`, senza riportare gli esiti dettagliati delle prove manuali IT/EN e desktop/mobile. Il registro distingue quindi approvazione ricevuta da controlli effettivamente attestati.

## M23 — Recupero e storage

Patch `3.5.1`, approvata dal maintainer il `2026-11-26` per la pubblicazione. Gli esiti manuali non sono stati comunicati. Eseguire le prove con dati sintetici in un profilo di prova.

1. Completare il laboratorio e simulare una scrittura negata nello storico. Il report rimane esportabile, l’avviso è in cima e la bozza è ancora recuperabile. Aprire un altro report e poi tornare al report pendente. Rimuovere il blocco e riprovare. Lo storico deve contenere una sola copia del report e la bozza viene rimossa.
2. Ripetere con il completo e un percorso privo di bozza. Verificare l’annullamento del ritorno ai percorsi e il comportamento in caso di chiusura o ricaricamento. La conferma del browser dipende dalle sue impostazioni e dal dispositivo. Controllare che i pulsanti di export restino disponibili.
3. Bloccare lo storage e confermare Interrompi. La home si riapre con un avviso sulla possibile presenza di una copia. Sbloccare lo storage e riprendere una bozza `3.5.0` con dati compatibili. Verificare le etichette in IT ed EN.

La suite passa 61 controlli. Le prove di errore usano storage simulato e un adattatore DOM. La skill Browser non ha trovato un browser disponibile per verificare avviso nativo, resa visiva e download.

## M24 — Bozze tra schede e bibliografia

Patch `3.5.2`, approvata dal maintainer il `2026-11-26` dopo una prova con esito positivo. La suite di 69 test usa uno storage condiviso e una coda asincrona per riprodurre scritture concorrenti, sostituzione della bozza, interruzione obsoleta, cancellazione dei dati con una sessione aperta e salvataggi simultanei nello storico. Verifica anche la ripresa dopo una patch compatibile, i blocchi indisponibili e il markup dei link in IT/EN.

1. Aprire due schede sulla stessa origine in un profilo di prova. Iniziare il completo nella prima, rispondere e riprendere dalla seconda. Verificare lingua, forma, risposta e posizione. Modificare le risposte nelle due schede. Ricaricare e verificare che la bozza contenga le modifiche della scheda che l'ha ripresa per ultima.
2. Ripetere con il laboratorio e una bozza compatibile di `3.5.0` o `3.5.1`. Verificare che la ripresa conservi decisioni e posizione. Interrompere dalla scheda precedente. La bozza corrente deve restare disponibile.
3. Completare nella scheda precedente o riprovare un salvataggio pendente dopo aver sostituito la bozza altrove. Il report resta esportabile. Completare nella scheda che salva la bozza e verificare una sola voce per la sessione.
4. Usare Cancella dati locali con un test ancora aperto in un'altra scheda. Verificare che un completamento tardivo lasci disponibili gli export senza ripristinare la bozza o lo storico. Se il browser impedisce il coordinamento dello storage, verificare che il test resti completabile in memoria.
5. Aprire la bibliografia dalla landing e dai risultati. In entrambi i gruppi indicati nella milestone, confrontare tipografia, colore, sottolineatura e freccia dei link con quelli delle altre fonti, anche dopo il passaggio da IT a EN.

Edge headless su server statico locale e profilo temporaneo ha verificato tipografia, colore, sottolineatura ed etichetta dei sei link in IT/EN. Con due schede ha verificato ripresa del completo, avanzamento dopo una risposta, avvisi di cambio scheda, interruzione senza perdere la bozza altrui, completamento di Primi passi con storico e pulsanti di export e cancellazione dei dati con la bozza aperta altrove. La suite automatica copre anche completamento del completo e del laboratorio, conflitti sul report ed esportazione dei dati con l'adattatore DOM. I download effettivi, la prova mobile e la pubblicazione su GitHub Pages restano da verificare.

## M25 — Export CSV e file locali

Patch `3.5.3`, approvata dal maintainer il `2026-11-26`. Usare dati sintetici. La suite esercita i pulsanti di esportazione del report corrente e di uno storico 2.x. Copre metadati, risposte libere, chiavi legacy, varianti a larghezza intera, spazi e caratteri di controllo iniziali, numeri negativi, zero e valori nulli. Confronta il JSON con il report originale e verifica il nome dei file con e senza profilo.

1. Completare un test con un nome facoltativo e un altro senza nome. Esportare entrambi i formati e controllare prefisso `ai-skill-`, data, modalità e forma. Controllare anche il nome senza data per un report che ne è privo.
2. In Excel usare **Dati → Da testo/CSV** con separatore virgola e UTF-8. Mantenere le interruzioni racchiuse tra virgolette nello stesso campo. Verificare che le celle protette restino testo. Controllare anche accenti, virgole, doppi apici, nuove righe, zero e numeri negativi.
3. Verificare con `git check-ignore -v` i nomi effettivi dei CSV e JSON, compresa una copia con suffisso aggiunto dal browser. Le fixture in `tests/fixtures/` restano tracciabili.

71 test automatici superati. Power Query in Excel 16 ha importato due CSV sintetici, uno del test completo e uno storico 2.x, con tre colonne, campi multilinea integri e nessuna formula. Su un campione a righe singole Excel ha anche confermato zero e valori negativi numerici e celle protette testuali. Il parser CSV di Python ha confermato struttura e valori. L'importazione guidata legacy di Excel ha spezzato un campo multilinea del report completo.

Edge headless ha completato quattro download da localhost, JSON e CSV con e senza nome facoltativo. I nomi corrispondono a data, modalità e forma registrate. Il JSON registra la versione `3.5.3`. `git check-ignore` ha verificato i nomi con e senza profilo e una copia con suffisso.
