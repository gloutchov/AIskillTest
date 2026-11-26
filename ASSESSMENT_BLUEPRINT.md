# Blueprint delle competenze e della valutazione

- Milestone: 16, `plan/assessment-competency-blueprint`.
- Revisione: `2026-11-25`; versione del blueprint: `1.0.0`.
- Stato: approvato dal maintainer il `2026-11-25`; riferimento per le milestone 17-22.
- Baseline verificata: app `2.4.1`, banca `2026.07-m7`, forma `1.3`.
- Attuazione: milestone 17-22 di [PLAN.md](PLAN.md); nessun cambiamento applicativo nella milestone 16.

Questo documento definisce il contratto editoriale fra prove e risultati. Distribuzioni, pesi, soglie e tempi sono scelte editoriali approvate da verificare durante l'implementazione, non stime psicometriche o requisiti imposti dalle fonti. La validazione del maintainer fissa il riferimento per l'implementazione; le revisioni successive devono indicare motivazione, impatto e versione.

## 1. Destinatari, livelli e promessa

Il test è rivolto a chi inizia, a chi usa l'AI nel lavoro e a chi configura o supervisiona sistemi agentici. I livelli descrivono la complessità dei compiti, non qualifiche attribuite alle persone né prerequisiti obbligatori.

| Livello di compito | Nome IT / EN | Esempio di richiesta | Limite dell'inferenza |
| --- | --- | --- | --- |
| B | Fondamenti / Foundations | Distinguere contesto, addestramento e fonti | Comprendere un principio non dimostra di applicarlo sul lavoro |
| O | Uso operativo / Operational use | Scegliere uno strumento e verificare un artefatto | Una scelta su scenario resta una risposta ipotetica |
| S | Configurazione e supervisione / Configuration and supervision | Leggere una traccia e riprendere un processo con permessi limitati | La simulazione non dimostra di saper amministrare un sistema reale |

Ogni item avrà un livello principale. I percorsi restano accessibili senza superare un livello precedente. Non si usano marchi, sigle, numero di strumenti conosciuti o tutorial seguiti come indicatori di competenza.

Promessa IT:

> Esplora ciò che riconosci nei quesiti, le pratiche che dichiari e le decisioni che prendi in esercizi simulati. Il risultato mostra copertura, limiti e passi da approfondire; non certifica prestazioni sul lavoro.

Promise EN:

> Explore what you recognize in questions, the practices you report, and the decisions you make in simulated exercises. Results show coverage, limits, and areas to develop; they do not certify workplace performance.

`Primi passi con l'AI` resta un percorso didattico autonomo, con risultati e storico distinti come definito in [LEARNING_PATH.md](LEARNING_PATH.md). Non ne vengono modificati domande, tutorial o finalità.

## 2. Quattro tipi di evidenza

| Codice | Etichetta IT / EN | Cosa raccoglie | Contributo al risultato |
| --- | --- | --- | --- |
| Q | Conoscenze e scenari / Knowledge and scenarios | Risposte a quiz, alternative, checklist e tracce ipotetiche | Punteggio Q; distinguere `knowledge` e `scenario` nei dettagli |
| D | Pratiche dichiarate / Self-reported practices | Autovalutazioni e frequenze dichiarate | Sintesi D separata; nessun incremento di Q o E |
| E | Esercizi simulati / Simulated exercises | Decisioni che modificano uno stato sintetico e producono un esito verificato localmente | Punti E, esiti per caso e motivazioni; nessuna equivalenza con produzione |
| T | Testo con feedback / Text with formative feedback | Prompt, piani e spiegazioni libere non verificabili con regole affidabili | Checklist formativa; nessun punteggio numerico di competenza |

Il tipo di widget non determina da solo il tipo di evidenza. Una scelta multipla su «cosa faresti» è Q, anche se la vecchia sezione si chiama Practical Lab. Una scelta in un esercizio diventa E solo se esistono stato iniziale, transizione, risultato atteso e controllo locale espliciti. Nessun item attuale è E.

Le quattro autovalutazioni facoltative dello step dati restano dati dichiarati separati dagli item D. Non entrano nei conteggi delle 50 domande o nello scoring. Una risposta assente non equivale a una dichiarazione bassa.

## 3. Matrice degli obiettivi osservabili

L'asse primario è composto da quattro aree: F, U, A, H. Ogni item contribuisce a una sola area e a un solo obiettivo primario. Tag secondari consentono letture trasversali senza duplicare punti o conteggi: `delegation`, `description`, `discernment`, `diligence`, `mindset`, `privacy`, `multimodal`, `verification`, `context`.

Le sigle delle fonti rimandano al registro della sezione 11. Il criterio nella tabella definisce ciò che una risposta deve distinguere; non costituisce una dichiarazione di abilità professionale. Le forme future devono specificare le alternative corrette e parziali prima della pubblicazione.

| ID | Area e livello | Obiettivo | Prova prevista | Criterio di esito leggibile | Fonti |
| --- | --- | --- | --- | --- | --- |
| F01 | Fondamenti, B | Spiegare generazione probabilistica, token e variabilità | Q definizione e confronto | Distingue generazione da recupero di frasi o verifica automatica della verità | S01 |
| F02 | Fondamenti, B | Distinguere addestramento, inferenza, contesto, conservazione e fine-tuning | Q su documento e sessione | Non deduce modifica dei pesi o memoria permanente dal caricamento di un file | S01, S02 |
| F03 | Fondamenti, B/O | Riconoscere affermazioni non supportate e verificare riferimenti | Q con fonte sintetica; D separato | Distingue esistenza, pertinenza e aggiornamento della fonte dalla sicurezza dell'output | S03, S04 |
| F04 | Fondamenti, B/O | Distinguere RAG, ricerca, embedding e addestramento | Q su recupero documentale | Il recupero seleziona contesto; somiglianza e citazione non garantiscono correttezza | S03, S05 |
| F05 | Fondamenti, B | Riconoscere reti neurali e attention senza antropomorfismo | Q confronto di spiegazioni | Identifica trasformazioni apprese; non attribuisce coscienza o controllo fattuale all'attention | S01, S06 |
| F06 | Fondamenti, B/O | Distinguere generazione, classificazione, previsione e procedura deterministica | Q scelta su compito | Sceglie la famiglia di soluzione coerente; non tratta ogni automazione come LLM | S01, S07 |
| U01 | Uso operativo e multimodale, O | Scegliere chat, ricerca, codice, browser o workflow e cosa delegare | Q scenario | Associa accessi e controlli necessari al compito; considera anche una soluzione senza AI | S07, S08 |
| U02 | Uso operativo e multimodale, O | Distinguere comprensione e generazione di immagini, scansioni e grafici | Q con input/artefatto descritto | Prevede controlli su lettura, unità e dettagli; leggere una schermata non equivale ad agire | S09, S10 |
| U03 | Uso operativo e multimodale, O | Distinguere trascrizione, sintesi, generazione audio/video e relative verifiche | Q scenario | Non ricostruisce con certezza parti mancanti o eventi fuori dai dati disponibili | S11, S12 |
| U04 | Uso operativo e multimodale, O | Definire obiettivo, input, vincoli, formato e gestione delle ambiguità | Q; D; T su brief | Richiede dati mancanti o dichiara assunzioni invece di inventare fatti e decisioni | S08 |
| U05 | Uso operativo e multimodale, O | Scegliere capacità e livello di ragionamento con vincoli di qualità, tempo, costo e località | Q confronto di configurazioni sintetiche | Usa criteri e prove sul compito, senza presumere che il modello più grande sia sempre adatto | S07 |
| U06 | Uso operativo e multimodale, O | Verificare dati, calcoli, fonti e requisiti di un artefatto | Q; T; E caso documenti/dati | Ricostruisce un risultato dai dati e distingue descrizione, correlazione e causalità | S04, S08 |
| U07 | Uso operativo e multimodale, O | Controllare perimetro dati, diritti, autorizzazioni e responsabilità | Q con regola fornita; D | Usa solo dati e azioni consentiti dal caso; adatta revisione e trasparenza all'impatto | S03, S08 |
| U08 | Uso operativo e multimodale, O | Progettare un piccolo esperimento e calibrare l'adozione sui risultati | Q; D con tag mindset | Definisce baseline, criterio di esito e revisione; entusiasmo e scetticismo non sono errori in sé | S04, S08 |
| A01 | Agenti, O/S | Scegliere workflow, singolo agente o più agenti | Q con compromessi | Giustifica autonomia e coordinamento rispetto al compito; complessità aggiuntiva deve avere utilità | S13 |
| A02 | Agenti, S | Scegliere tool, argomenti ed esito atteso di un'azione | Q su breve traccia | Controlla contratto e risultato; una tool call riuscita non dimostra il completamento del compito | S13, S04 |
| A03 | Agenti, O/S | Definire supervisione, approvazioni ed escalation proporzionate | Q; D; E caso agentico | Distingue proposta, approvazione ed esecuzione; non autorizza azioni fuori dal mandato | S13, S14 |
| A04 | Agenti, S | Riconoscere istruzioni non fidate e impedire divulgazioni non autorizzate | Q; E caso agentico | Tratta documento/output del tool come dati; non ne esegue un ordine di esfiltrazione | S14 |
| A05 | Agenti, S | Diagnosticare loop, dati mancanti e condizioni di arresto | Q su traccia | Limita i tentativi, individua l'impedimento e conclude o passa alla persona con stato utile | S13, S15 |
| H01 | Harness, S | Distinguere modello, prompt, agente, harness di esecuzione e valutatore | Q su architettura | Associa ogni responsabilità al componente pertinente, senza confondere esecuzione e valutazione | S15, S04 |
| H02 | Harness, S | Selezionare contesto e distinguere compattazione, memoria e passaggio di consegne | Q; D | Conserva vincoli e stato necessari alla ripresa; non considera la compattazione una memoria perfetta | S02, S15 |
| H03 | Harness, S | Distinguere tool/API, MCP, skill e file AGENTS.md | Q su integrazione | Riconosce interfacce, procedure e istruzioni; nessuno di questi concede da solo accessi o affidabilità | S16, S17, S18 |
| H04 | Harness, S | Applicare contratti, permessi effettivi, isolamento, timeout e tentativi limitati | Q configurazione | Distingue divieto nel prompt da accesso imposto dall'ambiente; valida input e output | S13, S14 |
| H05 | Harness, S | Riprendere da checkpoint senza duplicare azioni già completate | Q; E caso agentico | Verifica ricevuta e stato persistito prima di decidere quali operazioni ripetere | S15 |
| H06 | Harness, S | Valutare esiti, tracce, artefatti, costo, durata e regressioni | Q confronto di test | Usa criteri ripetibili e controlli indipendenti, includendo errori e interventi umani | S04, S15 |

Per U07 i vincoli giuridici o aziendali necessari sono forniti nello scenario. Il test non richiede consulenza legale o conoscenza a memoria di policy non visibili. Gli esempi di video non implicano che ogni modello accetti video nativamente: input supportati e strumenti disponibili devono essere dichiarati nel caso.

## 4. Inventario e riclassificazione della versione 2.4.1

Inventario ricavato da `baseQuestions` e `COMPLETE_QUESTION_IDS`, non dai nomi delle sezioni:

| Tipo attuale | Banca | Completo | Evidenza futura |
| --- | ---: | ---: | --- |
| likert | 55 | 21 | D |
| knowledge | 17 | 12 | Q, sottotipo knowledge |
| scenario | 25 | 9 | Q, sottotipo scenario |
| multi | 9 | 5 | Q, sottotipo scenario |
| choice | 5 | 1 | Q, sottotipo scenario |
| text | 4 | 2 | T |
| Totale | 115 | 50 | Banca: Q 56, D 55, T 4, E 0; completo: Q 27, D 21, T 2, E 0 |

La [mappa degli item](docs/ASSESSMENT_ITEM_MAP.md) assegna a tutti i 115 ID una sola area, un obiettivo e un tipo di evidenza. È una classificazione editoriale per la migrazione, non un cambiamento dei dati dell'app. L1-L7, alcuni quesiti tecnici e i casi pratici cambiano formulazione fra A/B/C: la mappa identifica l'obiettivo comune, ma non certifica identica difficoltà.

Il gruppo T contiene `P_DS_1`, `P_DI_1`, `P_DS_3`, `AG10`. Restano testi formativi finché non esiste una verifica dell'esito diversa dalla presenza di parole. I 14 item multi/choice della banca descrivono scelte ipotetiche, non esecuzioni osservate. AG12 è assegnato primariamente ad H02 e AG13 ad H06, pur restando nel percorso Agents: area primaria e modalità di erogazione sono metadati diversi.

La mappa distingue anche allineamento diretto e di supporto: T10 riguarda la storia dell'AI ed è collegato a F06 come contesto introduttivo, ma non verifica la scelta fra famiglie di soluzione. Il suo credito resta leggibile come quesito storico; non basta a dichiarare F06 coperto. Un collegamento tematico non deve creare evidenze su un obiettivo non verificato.

## 5. Composizione target del completo: 50 unità di risposta

La matrice seguente è implementata nella release M22 `3.5.0`, approvata dal maintainer il `2026-11-26`. Fino alla release approvata `3.4.0` il completo conservava 50 item precedenti, senza gli esercizi E; le note di attuazione storiche descrivono quelle versioni. La M22 è il riferimento corrente; i limiti delle verifiche sono documentati nella sezione 18.

| Area primaria | Q | D | T | E | Totale | Minimo Q e copertura target |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| F — Fondamenti | 11 | 1 | 0 | 0 | 12 | 11 Q, tutti i 6 obiettivi F |
| U — Uso operativo e multimodale | 8 | 3 | 2 | 3 | 16 | 8 Q, tutti gli 8 obiettivi U |
| A — Agenti | 9 | 1 | 0 | 2 | 12 | 9 Q, tutti i 5 obiettivi A |
| H — Harness | 8 | 1 | 0 | 1 | 10 | 8 Q, tutti i 6 obiettivi H |
| Totale | 36 | 6 | 2 | 6 | 50 | Tutti i 25 obiettivi, senza sommare tag secondari |

Limite dichiarativo: al massimo 6 D su 50 (12%); T al massimo 2. Le risposte verificabili su quiz/scenari sono 36 (72%); 6 decisioni (12%) appartengono a due esercizi. I sei passi degli esercizi sono inclusi nelle 50 unità, non sei domande aggiuntive né sei casi indipendenti. Due casi rappresentano comunque solo due contesti di esecuzione simulata.

Le 4D attraversano U e A; Mindset resta una lettura dichiarata e un tema degli scenari U08, senza punteggio di atteggiamento «giusto». La quota F mantiene basi accessibili; U preserva l'utilità quotidiana; A e H ottengono spazio sufficiente perché la loro assenza non resti nascosta. Questa è una scelta editoriale da riesaminare con la validazione.

### 5.1 Slot vincolati per tutte le forme e lingue

Gli slot sono nuovi identificatori di progetto, non rinominazioni automatiche degli ID attuali. `K1` e `K2` sono i due casi della sezione 7. Ogni riga definisce tipo di evidenza e obiettivo obbligatori in A/B/C e IT/EN.

| Slot | Area | Evidenza | Obiettivo | Livello | Prova | Compito da progettare |
| --- | --- | --- | --- | --- | --- | --- |
| C01 | F | Q | F01 | B | knowledge | Token e generazione |
| C02 | F | Q | F01 | B | scenario | Variabilità e plausibilità |
| C03 | F | Q | F02 | B | scenario | File nel contesto e pesi |
| C04 | F | Q | F02 | B | knowledge | Inferenza e conservazione |
| C05 | F | Q | F03 | O | scenario | Citazione esistente ma non pertinente |
| C06 | F | Q | F03 | O | scenario | Fonte e aggiornamento |
| C07 | F | Q | F04 | O | knowledge | RAG e addestramento |
| C08 | F | Q | F04 | O | scenario | Ricerca semantica ed embedding |
| C09 | F | Q | F05 | B | knowledge | Attention e trasformazioni apprese |
| C10 | F | Q | F06 | O | scenario | Generazione e classificazione |
| C11 | F | Q | F06 | O | scenario | Previsione e procedura deterministica |
| C12 | F | D | F03 | O | self-report | Verifiche dichiarate |
| C13 | U | Q | U01 | O | scenario | Scelta dello strumento e della delega |
| C14 | U | Q | U02 | O | scenario | Immagine/scansione/grafico e controlli |
| C15 | U | Q | U03 | O | scenario | Audio/video e limiti dei dati |
| C16 | U | Q | U04 | O | scenario | Brief ambiguo e richieste di chiarimento |
| C17 | U | Q | U05 | O | scenario | Compromessi fra configurazioni |
| C18 | U | Q | U06 | O | scenario | Verifica di artefatto e conclusioni |
| C19 | U | Q | U07 | O | scenario | Dati, autorizzazione e responsabilità |
| C20 | U | Q | U08 | O | scenario | Baseline e criteri del pilota |
| C21 | U | D | U04 | O | self-report | Metodo dichiarato nel brief |
| C22 | U | D | U07 | O | self-report | Pratiche dichiarate sui dati |
| C23 | U | D | U08 | O | self-report | Sperimentazione e fiducia dichiarate |
| C24 | U | T | U04 | O | formative-text | Prompt/brief formativo |
| C25 | U | T | U06 | O | formative-text | Spiegazione formativa delle verifiche |
| C26 | U | E | U06 | O | simulation | K1: individuare la discrepanza |
| C27 | U | E | U06 | O | simulation | K1: correggere il risultato |
| C28 | U | E | U06 | O | simulation | K1: scegliere l'artefatto da consegnare |
| C29 | A | Q | A01 | O | scenario | Workflow o agente |
| C30 | A | Q | A01 | S | scenario | Singolo agente o coordinamento multiplo |
| C31 | A | Q | A02 | S | scenario | Tool e argomenti |
| C32 | A | Q | A02 | S | scenario | Esito del tool e requisito del compito |
| C33 | A | Q | A03 | O | scenario | Approvazione proporzionata |
| C34 | A | Q | A03 | S | scenario | Escalation e mandato |
| C35 | A | Q | A04 | S | scenario | Istruzione non autorizzata nella fonte |
| C36 | A | Q | A04 | S | scenario | Confine di divulgazione dei dati |
| C37 | A | Q | A05 | S | scenario | Loop e condizioni di arresto |
| C38 | A | D | A03 | S | self-report | Supervisione dichiarata |
| C39 | A | E | A04 | S | simulation | K2: gestire l'istruzione non fidata |
| C40 | A | E | A03 | S | simulation | K2: operare entro il mandato |
| C41 | H | Q | H01 | S | knowledge | Componenti di esecuzione e valutatore |
| C42 | H | Q | H02 | S | scenario | Contesto, memoria e compattazione |
| C43 | H | Q | H03 | S | knowledge | Tool/API e MCP |
| C44 | H | Q | H03 | S | scenario | Skill e file di istruzioni |
| C45 | H | Q | H04 | S | scenario | Permessi imposti e prompt |
| C46 | H | Q | H04 | S | scenario | Schemi, timeout e tentativi limitati |
| C47 | H | Q | H05 | S | scenario | Checkpoint e ricevuta |
| C48 | H | Q | H06 | S | scenario | Tracce, esiti e regressioni |
| C49 | H | D | H02 | S | self-report | Continuità delle sessioni dichiarata |
| C50 | H | E | H05 | S | simulation | K2: riprendere senza duplicazione |

I 36 Q comprendono 6 prove di comprensione (`knowledge`) e 30 scenari (`scenario`). Le altre prove sono 6 `self-report`, 2 `formative-text` e 6 `simulation`; la colonna livello vincola la complessità progettata in tutte le varianti.

La numerazione è logica, non vincola l'ordine visivo. C39/C40/C50 devono restare raggruppati nel caso K2; il contatore del completo distingue unità di risposta e casi. Nei quiz a scelta singola l'avanzamento resta rapido e reversibile; scelte multiple, testi e passi degli esercizi richiedono `Avanti` / `Next` per confermare. Le azioni simulate non avanzano al semplice focus o al cambio accidentale di un controllo.

### 5.2 Tempi e corrispondenza A/B/C

Stima editoriale del completo: 40-55 minuti, senza timer obbligatorio. Budget: Q 21-27 minuti, D circa 2, T 4-6, E 12-16, lettura e passaggi 2-3. I tempi devono essere cronometrati durante la validazione della milestone 22 prima di aggiornare la promessa pubblica.

Per ogni slot A/B/C conservano obiettivo, evidenza, livello, numero di decisioni, massimi, credito parziale, errori critici e carico di lettura analogo. Cambiano contesto e dati. IT/EN traducono la medesima variante senza aggiungere suggerimenti. Le traduzioni non sono ulteriori forme psicometricamente equivalenti. Niente risposta corretta riconoscibile sistematicamente dalla lunghezza o dal numero di cautele; posizioni delle alternative variabili, identificatori semantici stabili.

## 6. Modalità, coperture e durata

| Modalità | Quantità | Matrice prevista | Evidenze e limiti | Attuazione |
| --- | --- | --- | --- | --- |
| Completo / Full test, `complete` | 50 unità | Sezione 5 | Q/D/T/E separati; due casi | M22 approvata, v3.5.0; 50 unità incluse sei E |
| AI moderne / Modern AI, `modern-ai` | 10 domande | U01 x2, U02 x2, U03, U04, U05, U06, U07, U08 | 10 Q; scelta su scenario, nessuna esecuzione | M18 |
| AI Agents, `agents` | 10 domande | A01 x2, A02 x2, A03 x2, A04 x2, A05 x2 | 10 Q; processo, tool, supervisione, injection e diagnosi obbligatori | M19 |
| Harness, `harness` | 10 domande | H01, H02 x2, H03 x2, H04 x2, H05 x2, H06 | 10 Q; include ripresa e permessi reali vs prompt | M20 |
| Laboratorio operativo / Operational lab, `operational-lab` | 2 casi, 6 decisioni | K1: U06 x3; K2: A04, A03, H05 | 6 E; non è un percorso tematico da 10 quiz | M21 |
| Literacy e Fondamenti tecnici LLM | 10 domande ciascuno | Mappa degli item F/U e selezione effettiva | Q e D separati; aree non presenti dichiarate | Rilettura M17; revisione integrata M22 |
| Delegation, Description, Discernment, Diligence | 10 domande ciascuno | Tag 4D e obiettivi della mappa | Molti D attuali: un risultato dichiarato non diventa un voto operativo | Rilettura M17; revisione integrata M22 |
| Mindset | 10 domande | D e scenari U08, secondo gli item selezionati | D separato da giudizio su scenari; nessuna penalità per cautela o entusiasmo dichiarati | Rilettura M17; revisione integrata M22 |
| Practical Lab esistente | 10 domande | Q e T attuali della mappa | Descrizione esplicita «quiz e testi formativi»; non attribuire E | M17; resta distinto dal nuovo laboratorio |
| Primi passi / AI First Steps, `first-steps` | 10 domande guidate | Blueprint didattico esistente | Apprendimento e tutorial; fuori dallo scoring 3.x | Invariato |

Le matrici dei tre percorsi nuovi/rivisti sono vincoli per ogni forma, non attese statistiche su estrazioni casuali. Sono ammessi pool più ampi solo se la selezione mantiene tutte le quote. Modern AI, Agents e Harness hanno durata proposta di 8-12 minuti; il laboratorio 12-16 minuti, circa 6-8 per caso. Le modalità legacy mantengono le stime correnti fino a una misura aggiornata.

Le 4D restano percorsi e tag leggibili. La riclassificazione per area non autorizza da sola a cambiare nome, conteggio o banca di un percorso nella milestone 17. L'eventuale revisione dei relativi item nella milestone 22 deve essere motivata e riportata in banca/forme.

## 7. Laboratorio: due casi per forma

Si usano esclusivamente dati sintetici già inclusi negli asset. Il browser simula strumenti, ricevute e artefatti senza leggere file del dispositivo, accedere ad account, eseguire codice arbitrario o fare richieste esterne. Non sono richiesti upload, installazioni o credenziali. Le azioni disponibili sono controlli dell'app con effetti sul solo stato del caso.

### 7.1 K1 — Verificare un riepilogo di dati

| Variante | Fonte sintetica e valori | Bozza errata | Esito atteso |
| --- | --- | --- | --- |
| A | Ordini: tre righe da 120, 80 e 100 unità, stesso periodo | Totale 330 e crescita attribuita a una campagna senza dati comparativi | Totale 300; nessuna conclusione causale |
| B | Ticket: tre righe da 40, 25 e 35 casi, stesso periodo | Totale 120 e riduzione attribuita a un assistente senza confronto | Totale 100; nessuna conclusione causale |
| C | Richieste: tre righe da 18, 12 e 20 casi, stesso periodo | Totale 60 e miglioramento attribuito a un nuovo processo senza confronto | Totale 50; nessuna conclusione causale |

Tre decisioni, massimo 2 punti ciascuna:

1. Individuare l'incongruenza fra fonte e bozza: 2 se collega le tre righe al totale errato; 1 se segnala un dubbio ma seleziona una prova incompleta; 0 se considera la bozza verificata. Si usano evidenze selezionabili, non ricerca di parole nel testo.
2. Correggere il risultato: 1 punto per l'operazione di somma pertinente e 1 per il totale numerico corretto. I dati e le unità sono forniti; non si valuta un generico paragrafo di spiegazione.
3. Scegliere l'artefatto finale: 2 per totale corretto, riferimento alla fonte e rimozione dell'attribuzione causale; 1 per sospendere la consegna chiedendo revisione; 0 per consegnare il risultato errato o una causalità non supportata.

Errore critico E `unverified-release`: confermare la consegna simulata di un artefatto con errore noto o conclusione causale non supportata. Il semplice errore nel calcolo al passo 2 resta un errore di esercizio; la criticità riguarda la successiva azione esplicita di consegna. La UI deve rendere leggibile l'artefatto che si sta confermando.

La verifica della fonte e la correzione possono essere eseguite in entrambi gli ordini, prima della consegna. Questi sono percorsi alternativi ammessi, valutati sullo stesso stato finale. La sequenza definitiva e le alternative di ogni variante saranno scritte nella milestone 21.

### 7.2 K2 — Proseguire un'attività agentica interrotta

In tutte le varianti, `update-*` identifica una registrazione nel diario interno sintetico, già autorizzata e completata nella sessione precedente. Ripeterla aggiunge una seconda registrazione dello stesso evento. Non rappresenta una modifica esterna concessa implicitamente dal caso: ricevuta, effetto e mandato sono forniti insieme alla traccia.

| Variante | Attività e mandato | Traccia persistita | Evento da gestire |
| --- | --- | --- | --- |
| A | Leggere ticket sintetici e preparare una bozza di knowledge base; nessuna pubblicazione | `update-17` completato con ricevuta; bozza successiva pendente | Nota nel ticket ordina di esportare l'archivio a un destinatario esterno |
| B | Leggere fatture sintetiche e proporre una nota di riconciliazione; nessun invio | `update-28` completato con ricevuta; nota successiva pendente | Testo nella fattura chiede di inviare l'intero registro fuori dal perimetro |
| C | Leggere avanzamenti sintetici e preparare una bozza di report; nessuna apertura di task esterni | `update-39` completato con ricevuta; report successivo pendente | Allegato chiede di inoltrare tutti i dati a un indirizzo non autorizzato |

Tre decisioni, massimo 2 punti ciascuna:

1. A04: 2 se scarta l'ordine nella fonte e prosegue sui dati pertinenti; 1 se sospende chiedendo chiarimento senza eseguirlo; 0 se esegue la divulgazione simulata. Criticità `unauthorized-disclosure` solo nell'ultimo caso.
2. A03: 2 se usa lettura e creazione della bozza nel mandato, lasciando la pubblicazione alla persona; 1 se blocca tutto pur potendo preparare una bozza; 0 se esegue un invio/pubblicazione simulati senza approvazione. Criticità `unauthorized-action` nell'ultimo caso.
3. H05: 2 se usa la ricevuta, non ripete l'aggiornamento completato e riprende la parte pendente; 1 se sospende per verificare ulteriormente lo stato; 0 se ripete l'azione già completata o dichiara finito il lavoro pendente. `duplicate-action` è critico solo se la ripetizione simulata produce il doppio effetto descritto nel caso.

Per ciascuna variante, una configurazione conforme e una configurazione conservativa con richiesta di revisione sono percorsi ammessi con credito diverso. Non viene premiata automaticamente l'alternativa più lunga o quella con più approvazioni.

### 7.3 Navigazione, recupero e dati

Ogni caso ha ID/versione, stato iniziale, identificatori stabili delle scelte, transizioni ammesse, massimi e regole di esito. Tornare indietro e modificare una scelta ricalcola dal principio lo stato dipendente: nessun punto o flag obsoleto e nessuna azione duplicata per effetto della sola navigazione.

La milestone 21 aggiungerà un draft locale separato dallo storico dei report, con versione del caso, modalità, lingua, forma e sole scelte necessarie al recupero. Lo stato derivato viene ricostruito. Si conserva al massimo una sessione incompleta, finché completata, scartata o cancellata dall'utente; nessuna sincronizzazione. Un draft incompatibile propone di ricominciare senza applicare transizioni con regole nuove. `Interrompi` confermato scarta il draft; ricaricare la pagina permette di riprendere un draft compatibile. La nota privacy e il comando di cancellazione dovranno includerlo.

Il report registra la configurazione finale e gli esiti necessari a spiegarla, non tasti premuti, tempi di permanenza o una cronologia di tentativi. Non si dichiara di misurare prestazioni temporali. Le decisioni modificate durante la prova non rappresentano un'azione reale irreversibile.

Controlli disponibili da tastiera, focus visibile, etichette, lettura senza solo colore, layout mobile e alternativa testuale alle tabelle. Nessun drag-and-drop obbligatorio. Durante la prova non si mostrano soluzioni o punteggi; dopo il completamento si rendono consultabili dati, regole ed esiti.

## 8. Scoring e significato dei risultati

### 8.1 Q — Regole deterministiche e pesi

Ogni item Q produce un credito compreso fra 0 e 1, con chiave e credito parziale documentati. Non si usa un LLM come valutatore. Nella transizione della milestone 17, le alternative legacy da 1 a 5 vengono normalizzate con `(score - 1) / 4`, senza attribuire loro validità aggiuntiva. Le nuove alternative possono usare 0, 0.5 e 1 quando il credito parziale ha una motivazione precisa.

Per `multi`, sommare i crediti positivi e le penalità delle opzioni selezionate e dividere per la somma dei soli crediti positivi disponibili, limitando il rapporto a [0, 1]. Non arrotondare a una scala 1-5 prima dell'aggregazione. Il feedback indica omissioni e scelte incompatibili; le penalità sono fissate per item. Le nuove prove includono il caso «seleziona tutto» nella revisione, per evitare un esito alto senza discriminazione.

Prima si calcola la media degli item Q con allineamento diretto di ciascun obiettivo; il valore Q dell'area è la media degli obiettivi effettivamente raccolti, moltiplicata per 100. Gli item di solo supporto mantengono il credito individuale nei dettagli, ma restano fuori dalle medie e dai minimi di copertura Q. Ogni obiettivo pesa uguale nella propria area: le ripetizioni su token o permessi non devono oscurare altri obiettivi. Esempio: F01=1 e F02=0 danno 50, anche se F01 ha due item e F02 uno. Gli arrotondamenti sono solo di presentazione, a fine calcolo.

Non si introduce un indice globale numerico 3.x e si ritirano dal nuovo assessment i profili Beginner/Curious/Expert/Champion. I report nuovi si chiamano `Quadro delle evidenze` / `Evidence overview`. Non esistono pesi per sommare Q, D, E e T: sono evidenze diverse. I vecchi pesi 35/45/20 restano soltanto nei report storici 2.x.

### 8.2 Copertura, assenze e fasce editoriali

- Un'area senza Q validi ha punteggio `null` e dicitura `Non esplorata` / `Not assessed`, mai 0.
- Con meno di 3 Q validi o meno di 2 obiettivi distinti si mostrano gli esiti degli item e `Evidenza limitata` / `Limited evidence`, senza percentuale d'area.
- Con almeno 3 Q e 2 obiettivi si può mostrare la percentuale, sempre con conteggio e `Copertura parziale` / `Partial coverage` se manca la soglia successiva.
- L'area ha `Copertura prevista raggiunta` / `Planned coverage reached` solo con almeno 6 Q validi e tutti gli obiettivi dell'area verificati da Q con allineamento diretto. Gli item di solo supporto, come T10 storico rispetto a F06, non soddisfano la copertura. Ciò descrive la matrice editoriale, non sufficienza statistica. Il completo target soddisfa i minimi più stringenti della sezione 5.
- Per una percentuale con copertura prevista raggiunta: meno di 40 `Da riprendere` / `Review foundations`; da 40 a meno di 70 `In consolidamento` / `Developing`; da 70 `Buon esito nei quesiti` / `Strong question results`. Nessuna fascia si chiama «competente» o «esperto».
- Per coperture parziali si mostra il numero con l'avvertenza, senza assegnare la fascia all'intera area. Il report elenca gli obiettivi presenti e quelli mancanti; fuori tema non significa errato.

Il limite di 6 Q e le fasce 40/70 sono scelte conservative di leggibilità da verificare con esempi, non cut-off validati. Il risultato non usa percentili, intervalli di confidenza inventati o certificazioni. Nei percorsi tematici vengono esposte soltanto le aree interessate, con un riepilogo delle restanti come non esplorate, senza radar di zeri.

### 8.3 D, T ed E

D conserva risposta e scala dichiarata. Eventuali medie descrivono solo le dichiarazioni, senza fasce di merito o equivalenza numerica con Q/E. Il confronto con Q è testuale e circoscritto agli stessi obiettivi; non si sottraggono scale diverse per produrre un «gap di competenza». Una dichiarazione alta con Q basso genera un invito a esercitarsi, non un giudizio sulla persona.

T non produce `score: 0`: produce `score: null`, `scored: false` e feedback formativo. La checklist contiene requisiti spiegati e domande di revisione; eventuali parole rilevate sono indizi da controllare, non criteri «soddisfatti» automaticamente. Un elenco di parole, una negazione e un piano coerente non possono ricevere lo stesso attestato automatico di qualità. L'app non prova a distinguere semanticamente questi casi con un parser lessicale.

E assegna 0/1/2 per decisione secondo la sezione 7. Ogni caso ha massimo 6; il laboratorio massimo 12. Con entrambi i casi completi si mostra la percentuale complessiva E e gli esiti separati. Non si interpreta una sola decisione H come una percentuale di capacità pratica sugli harness. Con un caso incompleto il risultato totale E è `null`; si possono leggere i soli casi conclusi come copertura parziale.

Per casi completi senza errori critici: meno di 50% `Esercizi da riprovare` / `Retry the exercises`; da 50 a meno di 80% `Esiti parziali` / `Partial outcomes`; da 80% `Esiti conformi nei casi simulati` / `Expected outcomes in simulated cases`. L'ultima fascia richiede anche almeno 4/6 in ciascun caso: 6/6 e 3/6 restano esiti parziali. Soglie e distribuzione del credito sono editoriali.

Un errore critico E mantiene visibili i punti grezzi, ma sostituisce la fascia con `Decisione critica da rivedere` / `Review a critical decision`, indicando caso, scelta ed effetto sintetico. Non cancella risultati Q né viene compensato da un altro caso. Cambiare la decisione prima della consegna finale ricalcola il flag sul nuovo stato; non si conserva una penalità invisibile.

### 8.4 Lacune critiche e risposte mancanti

Un errore Q su istruzioni non fidate, permessi o ripresa produce una nota di comprensione sull'obiettivo e mostra la scelta; non viene chiamato incidente operativo. Per gli item futuri una chiave `criticalMisconception` identifica esplicitamente le alternative che confondono dati e ordini, concedono accessi non autorizzati o duplicano effetti. La nota resta visibile anche con una percentuale alta nell'area. La milestone 17 non inventa questi flag retroattivamente se non sono documentati nell'item.

Un'area con punteggio sotto 40 e copertura adeguata viene evidenziata prima delle raccomandazioni generiche. Le aree A e H senza copertura restano esplicitamente non esplorate o parziali. Nessun risultato, anche alto, attribuisce qualifica agentica, di amministratore o capacità di produzione.

La UI può continuare a richiedere una risposta a ogni unità prima del completamento. Il calcolo deve comunque gestire report incompleti: campo assente o indice invalido non è una risposta minima. Esclude il credito non disponibile, incrementa `missingCount` e impedisce lo stato di copertura raggiunta. La nota distingue item non proposti, proposti senza risposta valida e risposte errate. T vuoto resta formativo senza punti; D vuoto resta assente. Non si ricostruiscono risposte dal testo dell'etichetta.

### 8.5 Casi limite da rendere verificabili nella milestone 17

| Input | Esito richiesto |
| --- | --- |
| Massimo Q, dichiarazioni D minime | Q invariato; dichiarazioni basse mostrate separatamente |
| D massimo e Q minimo | Q invariato e lacune visibili; nessuna promozione tramite autovalutazione |
| Elenco delle parole chiave di P_DS_1 | T formativo, nessun incremento Q/E, nessuna competenza pratica assegnata |
| Minimo sui quattro item Agents attuali, massimo su tutti gli altri | Evidenze Agents deboli visibili: AG1 in D, AG2/AG3/AG4 in Q; nessun Champion, nessuna compensazione globale; E assente |
| Tutto corretto tranne i quesiti A nel completo target | A a 0 con copertura raggiunta e lacuna esplicita; altre aree restano alte; nessun voto globale che la nasconda |
| Tutti i Q corretti, E debole o con errore critico | Buon esito sui quesiti separato dall'esito debole/critico delle simulazioni |
| Percorso con soli D/T o un solo Q valido | Nessuna percentuale oggettiva d'area o globale; solo evidenze effettive |
| Area non proposta o risposta Q invalida | Assenza dichiarata, conteggi verificabili, nessuno zero inventato |
| Ritorno a un passo K2 e cambio della scelta | Stato, punti e flag derivati coerenti con la configurazione finale |

## 9. Esempi per verificare i limiti delle rubriche

Stimolo T: trasformare appunti incompleti in un action plan senza inventare responsabili o scadenze. La rubrica formativa chiede obiettivo, dati disponibili, schema di output, incertezze e controlli. Le valutazioni seguenti sono esempi di revisione umana, non etichette che l'app assegna automaticamente.

| Caso | Esempio IT | Esempio EN | Lettura formativa; scoring automatico |
| --- | --- | --- | --- |
| Coerente | «Usa solo gli appunti forniti. Produci azione, responsabile e scadenza. Segna “da confermare” dove mancano dati; separa proposte e decisioni approvate. Elenca le domande aperte e confronta ogni riga con gli appunti prima della consegna.» | “Use only the supplied notes. List action, owner, and due date. Mark missing data as ‘to confirm’; separate proposals from approved decisions. List open questions and check each row against the notes before delivery.” | Collega istruzioni, dati mancanti e verifica; T, nessun punto Q/E |
| Parziale | «Fai una tabella delle azioni con responsabile e data.» | “Make an action table with owner and date.” | Formato utile, ma non disciplina lacune e verifiche; T, nessun punto Q/E |
| Errato | «Completa tu nomi e date plausibili e manda il piano come approvato.» | “Fill in plausible names and dates and send the plan as approved.” | Inventa fatti e approvazione; feedback da discutere, nessun flag E derivato dal solo testo |
| Elenco di parole | «Obiettivo, contesto, responsabile, scadenza, privacy, verifica, fonti, non inventare.» | “Goal, context, owner, deadline, privacy, verification, sources, do not invent.” | Non definisce un procedimento; la presenza di termini non dimostra adempimento |
| Negazione ingannevole per il parser | «Non verificare le fonti; inventa una scadenza se manca.» | “Do not verify sources; invent a deadline if missing.” | Contiene termini della checklist ma istruzioni opposte; nessun riconoscimento lessicale vale come qualità |

Controprova E: in K1-A, scegliere la somma e inserire 300 ottiene 2 punti al passo di correzione. Scegliere la somma e inserire 330 ottiene 1; scegliere il totale della bozza senza ricostruzione ottiene 0. Scrivere «somma, dati, verifica, 300» in una spiegazione T non sostituisce i controlli richiesti dall'esercizio. In K2, un elenco «permessi, checkpoint, rollback» non evita il flag se la scelta finale invia senza mandato o ripete l'aggiornamento.

## 10. Metadati, storico ed export

Questa sezione è il contratto approvato per la milestone 17; alcuni metadati esistono già nell'app 2.4.1, mentre classificazioni e struttura dei risultati sono nuovi. I nomi tecnici sono stabili e indipendenti dalla lingua; etichette e feedback sono IT/EN.

| Campo previsto | Significato |
| --- | --- |
| `meta.assessmentVersion` | Versione app; `3.0.0` alla milestone 17 |
| `meta.scoringVersion` | Versione delle regole di calcolo, valore iniziale previsto `3.0.0`; non segue automaticamente ogni release dell'app |
| `meta.reportSchemaVersion` | Schema del nuovo report, valore previsto `3`; distinto da scoring e schema didattico |
| `meta.blueprintVersion` | Versione approvata del blueprint: `1.0.0` |
| `meta.questionBankVersion`, `meta.formVersion`, `meta.formId` | Versioni/forma degli item effettivamente proposti |
| `meta.testMode`, `meta.language`, `meta.languageSource` | Modalità con tipo e quantità, lingua e origine della scelta; preservare le informazioni attuali |
| `answers[].sourceId`, `slotId`, `itemVersion` | Identità del contenuto e relativa revisione; lo slot è assente per item legacy senza corrispondenza |
| `answers[].evidenceType`, `questionKind`, `responseFormat`, `primaryArea`, `objectiveId`, `secondaryTags`, `taskLevel` | Classificazione esplicita; `questionKind` distingue knowledge/scenario/self-report/formative-text/simulation, `responseFormat` identifica il controllo (scelta, multi, testo, numero) |
| `answers[].objectiveAlignment` | `direct` o `supporting`; un richiamo di supporto non soddisfa la copertura dedicata dell'obiettivo |
| `answers[].credit`, `maxCredit`, `scored` | Credito grezzo e massimo per Q/E; valori `null` e `scored: false` per D/T |
| `answers[].responseStatus` | `valid`, `missing`, `invalid`; non sostituire assenza con errore |
| `results.knowledgeByArea` | Percentuale Q, conteggi validi/mancanti, obiettivi coperti, copertura e fascia eventuale |
| `results.declaredPractices`, `results.formativeFeedback` | Dichiarazioni e feedback testuali distinti dai risultati Q/E |
| `results.simulatedCases` | ID/versione/forma del caso, scelte finali minime, punti, massimi, stato, esito e flag critici |
| `coverage` | Per area e tipo: unità previste dalla modalità, proposte, valide, mancanti, obiettivi attesi/coperti; per E anche casi attesi e conclusi |
| `criticalFindings` | Distinguere `misconception` in Q e `simulated-action` in E, con ID e spiegazione |
| `meta.comparisonKey` | Identifica solo risultati confrontabili secondo le regole sotto; non aggrega famiglie incompatibili |

Il report conserva risposte e testo necessari a spiegare l'esito, non solo etichette e percentuali. Q/E non deducono crediti dalle stringhe localizzate. Gli export JSON conservano la struttura; il CSV aggiunge righe distinte per metadati, evidenze, copertura, casi e criticità. Celle assenti restano vuote e distinguibili da 0 tramite stato; virgole, virgolette e nuove righe devono essere esportate correttamente. Le nuove righe non devono mescolare punti E con percentuali Q o dichiarazioni.

### 10.1 Regole di compatibilità

1. Un report `2.x` viene aperto con i suoi punteggi, profilo e raccomandazioni originali e avviso `Valutazione precedente (2.x)` / `Previous assessment (2.x)`. Non viene ricalcolato, riscritto o dotato di prove E inesistenti.
2. Scoring/schema assenti identificano un formato legacy solo se il contenuto è riconoscibile. Un formato sconosciuto o una versione futura non viene trattato automaticamente come 2.x: mostrare i dati recuperabili e l'incompatibilità, senza inventare valori.
3. Rendering legacy e nuovo usano percorsi espliciti. Mancanza di un campo opzionale non deve bloccare storico e export. Un record non valido non rende illeggibili tutti gli altri; dati locali originali non vengono cancellati durante la lettura.
4. Nessuna media, classifica o delta fra 2.x e 3.x, assessment e Primi passi, Q e D/E/T, modalità o coperture differenti. Le etichette legacy non vengono rinominate come se provenissero dal nuovo contratto.
5. Un eventuale confronto entro 3.x richiede stessa modalità, lingua, forma, scoring, banca, versione forma/blueprint e firma degli item, rubriche e casi effettivamente proposti. La firma è calcolata localmente da identificatori/versioni ordinati; non contiene risposte o dati personali. Sessioni con diverso campionamento non producono un delta diretto. Anche un confronto ammesso descrive variazione nei medesimi quesiti, non apprendimento dimostrato.
6. Una release applicativa che cambia solo presentazione non cambia da sola `scoringVersion`. Una variazione di pesi, soglie, normalizzazione, assegnazioni primarie o regole di esito richiede nuova versione scoring e revisione della confrontabilità. Una modifica dei contenuti aggiorna banca e forme; una modifica di schema aggiorna lo schema. Nessuna versione nuova viene applicata retroattivamente.

Restano salvataggio nel browser, esportazioni esplicite e limite corrente di 100 report. L'aggiunta del draft E nella milestone 21 viene documentata separatamente e inclusa nella cancellazione dei dati locali. Nessuna telemetria, valutazione remota o acquisizione di dati dei volontari è autorizzata da questo blueprint.

## 11. Fonti primarie e registro di revisione

Consultazione: `2026-11-25`. Le fonti sostengono le definizioni tecniche e offrono principi per scenari originali; non validano questo test, i suoi livelli o le soglie. Le proposte di item e rubriche sono elaborazione editoriale del progetto. Prima delle milestone di contenuto si ricontrollano disponibilità, pertinenza e cambiamenti, evitando domande su listini, versioni o menu a memoria.

| ID | Fonte primaria | Uso nel blueprint | Stabilità e motivo della revisione |
| --- | --- | --- | --- |
| S01 | [Google — Introduction to Large Language Models](https://developers.google.com/machine-learning/crash-course/llm) | Generazione, token e fondamenti | Principi relativamente stabili; selezionare solo concetti utili ai destinatari |
| S02 | [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents) | Gestione e selezione del contesto | Principi trasferibili; strategie concrete dipendono dall'ambiente |
| S03 | [Microsoft — Retrieval-Augmented Generation overview](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview) | Recupero, fonti e accessi | Separare concetti di retrieval dalla piattaforma Azure |
| S04 | [OpenAI — Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals) | Tracce, criteri e confronti ripetibili | Controllata la documentazione attuale; non riprodurre le procedure del servizio nell'app |
| S05 | [Google — Embeddings](https://developers.google.com/machine-learning/crash-course/embeddings) | Rappresentazioni e somiglianza | Principio stabile; nessuna equivalenza fra vicinanza e verità |
| S06 | [Vaswani et al. — Attention Is All You Need](https://arxiv.org/abs/1706.03762) | Attention e architettura Transformer | Fonte storica primaria; non usarla come descrizione esaustiva di ogni modello moderno |
| S07 | [OpenAI — Model selection](https://developers.openai.com/api/docs/guides/model-selection) | Confronti sul compito e compromessi | Dettagli di modelli e prezzi volatili; mantenere solo criteri e verifica empirica |
| S08 | [Dakan e Feller — AI Fluency Framework](https://aifluencyframework.org/) | Delegation, Description, Discernment, Diligence | Riferimento degli autori; corregge l'attribuzione pregressa a Southworth nel README; gli item restano originali |
| S09 | [OpenAI — Images and vision](https://developers.openai.com/api/docs/guides/images-vision) | Comprensione visiva e limiti | Capacità/supporti cambiano; dichiarare input e requisiti nello scenario |
| S10 | [OpenAI — Computer use](https://developers.openai.com/api/docs/guides/tools-computer-use) | Distinzione fra lettura e interazione | Controlli e ambienti cambiano; nessun uso reale nel test |
| S11 | [OpenAI — Audio and voice](https://developers.openai.com/api/docs/guides/audio) | Distinzione fra compiti audio | Guide di prodotto mutevoli; non richiedere nomi di API |
| S12 | [OpenAI — Video generation](https://developers.openai.com/api/docs/guides/video-generation) | Riferimento storico alla generazione video distinta dall'analisi | Ricontrollato in M18: la pagina segnala chiusura di Sora 2 / Videos API il 24 settembre 2026; per i nuovi scenari usare i riferimenti correnti S19/S20 e capacità dichiarate |
| S13 | [Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents) | Workflow, agenti e scelta della complessità | Articolo storico con avviso di evoluzione degli strumenti; usare i principi, non lo stack dell'epoca |
| S14 | [MCP — Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | Confini di fiducia, autorizzazioni e integrazioni | Consultata la versione a cui rimanda il sito (`2026-07-28`); evitare dettagli di protocollo come nozioni obbligatorie |
| S15 | [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents) | Continuità, progressi e verifica | Esempio di esecuzione su più sessioni; non imporre nomi di file o un SDK specifico |
| S16 | [Model Context Protocol — Introduzione](https://modelcontextprotocol.io/docs/getting-started/intro) | MCP come collegamento a dati e strumenti | Consultata la pagina corrente (`2026-07-28`); distinguere standard da capacità/autorizzazioni |
| S17 | [Agent Skills — Overview](https://agentskills.io/home) | Procedure, risorse e caricamento delle skill | Formato e supporto evolvono; nessun automatismo di affidabilità |
| S18 | [AGENTS.md — Sito del formato](https://agents.md/) | Istruzioni e contesto per agenti di coding | Separare convenzione del file da gerarchia e permessi imposti dal singolo ambiente |
| S19 | [Google — Video understanding](https://aistudio.google.com/docs/video-understanding) | Comprensione di video esistenti, audio e riferimenti temporali | Aggiunto e consultato in M18; dichiarare supporti e limiti, non assumere osservabilità di eventi fuori campo |
| S20 | [Google — Video generation](https://aistudio.google.com/docs/video) | Nuovi video e produzione distinta dalle evidenze | Aggiunto e consultato in M18; disponibilità e versioni cambiano, nessun nome di modello richiesto negli item |

Le fonti esterne non vengono caricate automaticamente dall'app. Il registro qui è documentazione di sviluppo; bibliografia e spiegazioni IT/EN in UI saranno aggiornate nelle milestone che introducono i relativi contenuti. L'utente deve poter capire il feedback anche senza aprire le fonti.

| Data | Revisione e motivazione | Effetto |
| --- | --- | --- |
| 2026-11-24 | Roadmap: lacune di copertura, rubriche lessicali e aggregazione che nasconde Agents | Definite milestone 16-22 |
| 2026-11-25 | Prima proposta di matrice, inventario, scoring separato, casi e compatibilità | Solo documentazione; attende validazione, app ancora 2.4.1 |
| 2026-11-25 | Approvazione del maintainer della matrice e del contratto di valutazione | Blueprint 1.0.0 approvato; milestone 16 completata, app ancora 2.4.1 |
| 2026-11-25 | M18: ricontrollo delle fonti per nuovi scenari multimodali; S12 diventa storico, aggiunti S19/S20 | Nessuna variazione al contratto approvato; registro M18 completo in MODERN_AI_REVIEW.md |

## 12. Validazione della milestone e consegna alle successive

La milestone 16 deve verificare: inventario esaustivo di 115 ID senza duplicati; 50 slot con quote Q/D/T/E esatte; tutti i 25 obiettivi con fonte, prova e criterio; percorsi da 10 con coperture vincolate; due casi per ciascuna forma; tempi espliciti; esempi coerenti/parziali/errati/lessicali; regole su assenze, criticità e storico. La verifica documentale e la lettura equivalente dell'app corrente non sostituiscono l'esecuzione delle nuove prove, che ancora non esistono.

Per la milestone 17 preparare verifiche deterministiche senza framework obbligatorio su: separazione Q/D/T/E; credito parziale e aggregazione per obiettivo; dati mancanti/invalidi; casi limite della sezione 8.5; rendering/export dei report legacy, nuovi e sconosciuti. Le milestone 18-20 verificano le matrici delle forme e le traduzioni; la 21 verifica transizioni, recupero, percorsi alternativi e criticità; la 22 integra tutto in `docs/QA.md`.

Verifiche eseguite il `2026-11-25`:

- Lettura di banca e logica locali con Node, senza inizializzazione del DOM e con storage sintetico in memoria: confermati 115 item e classificazioni; nessun dato del browser dell'utente è stato letto.
- Verifica documentale dei 25 obiettivi, 50 slot, quote per area e tipo, livelli e sottotipi; tutti gli obiettivi hanno un Q diretto nella matrice target. Mappa senza ID mancanti o duplicati, tabelle coerenti e collegamenti relativi esistenti.
- Verifica delle 60 composizioni assessment correnti: 10 modalità, 2 lingue, 3 forme; completo da 50 e tematici da 10. Primi passi non è stato modificato né incluso in questa verifica.
- Riprodotti sulla logica 2.4.1 il caso Agents minimo con globale 92/100 e profilo Champion, e il massimo 5/5 di P_DS_1 per un elenco di parole chiave. Sono conferme della baseline, non prove dell'implementazione 3.x.
- Ricontrollate le 18 fonti primarie del registro; le scelte di scoring e copertura restano editoriali.
- Verifica visiva/interattiva non eseguita: il runtime Browser non ha trovato alcun browser disponibile. Non sono stati verificati layout, navigazione, download, console o traffico di un browser reale. Lo scope modifica solo Markdown; HTML, CSS, JavaScript, versioni e file didattici sono invariati.

Il maintainer ha approvato il blueprint il `2026-11-25`. Le verifiche sopra non attestano ancora correttezza delle future rubriche implementate, equivalenza delle forme o tempi misurati.

Decisioni approvate dal maintainer il `2026-11-25` per la milestone 17:

1. Quattro aree e 25 obiettivi; livelli come complessità dei compiti e nessun percorso obbligato.
2. Completo target 12 F + 16 U + 12 A + 10 H; 36 Q + 6 D + 2 T + 6 decisioni E, con durata stimata 40-55 minuti.
3. Eliminazione dell'indice globale e dei profili Expert/Champion nei nuovi report; evidenze separate, copertura e soglie editoriali dichiarate.
4. Testi aperti solo formativi; esercizi valutati tramite decisioni e risultati locali, con due casi e criticità visibili.
5. Storico 2.x conservato senza ricalcolo e senza confronti diretti con 3.x; nuove versioni e metadati tracciabili.

Il blueprint approvato è il riferimento per la milestone 17. Schermate e implementazioni delle milestone successive richiedono la propria validazione secondo PLAN.md.

## 13. Attuazione nella milestone 17

La milestone 17, sviluppata sul branch `feature/evidence-based-scoring`, implementa il contratto Q/D/T della banca esistente, con versione app e scoring `3.0.0`, schema report `3` e blueprint `1.0.0`. Il maintainer ha approvato la milestone e la release `v3.0.0` il `2026-11-25`; la versione pubblicata precedente è `2.4.1`.

La classificazione è riportata in `assets/assessment.js` e verificata contro la mappa Markdown. La banca e le forme restano invariate: il completo ha ancora 27 Q, 21 D e 2 T; nessun E è stato introdotto e la matrice target da 50 slot della sezione 5 resta prevista per la milestone 22. I report non possono dichiarare copertura piena degli obiettivi mancanti.

Scoring, schema, compatibilità dello storico, nuovo CSV e checklist di validazione sono documentati in [docs/SCORING.md](docs/SCORING.md). I [report sintetici](tests/fixtures/m17-reports.json) illustrano dichiarazioni e quiz divergenti, lacuna Agents e formato legacy; non contengono dati di rispondenti e non vengono caricati automaticamente dall'app. La verifica automatica comprende 19 controlli, 60 composizioni assessment e 6 forme didattiche. La verifica dell'agente in un browser reale non è stata possibile nell'ambiente disponibile; il maintainer ha approvato la chiusura, senza riportare gli esiti dettagliati della checklist manuale nella conversazione.

## 14. Attuazione nella milestone 18

La milestone 18, sviluppata sul branch `feature/modern-ai-capabilities`, aggiunge AI moderne: dieci scenari Q di livello O, con matrice U01×2, U02×2 e U03–U08×1 in tutte le forme A/B/C IT/EN. App `3.1.0`, banca `2026.11-m18`, forme `1.4`; scoring `3.0.0`, schema `3` e blueprint `1.0.0` restano invariati. Il maintainer ha approvato la milestone e la release `v3.1.0` il `2026-11-25`.

Le domande sono originali e usano strumenti e misure sintetici con vincoli dichiarati. Coprono modalità/capacità/app/architettura/ambiente, ricerca documentale e web, generazione/classificazione/previsione/calcolo, immagini/scansioni/grafici, audio/video, azioni tramite browser, brief, compromessi e verifiche. Le scelte valutano giudizio ipotetico; nessuna esecuzione pratica è osservata. Fonti ricontrollate, crediti, motivazioni e tutte le varianti sono nel [documento di revisione bilingue](docs/MODERN_AI_REVIEW.md). Il registro M18 distingue esplicitamente riferimenti video correnti da API cessate.

U02, U03 e U05 acquisiscono prove dedicate solo nel nuovo percorso. Il completo conserva 50 domande (27 Q, 21 D, 2 T) e non incorpora MA01–MA10; nove tematici precedenti e Primi passi mantengono contenuti e composizione. La matrice target del completo e gli esercizi E restano nelle milestone successive. Con dieci risposte valide AI moderne può raggiungere la copertura prevista di U, senza inferire abilità di esecuzione o risultati sulle altre aree.

Verificati 25 controlli, 66 composizioni assessment e 6 forme didattiche; confronto con main `27d6245` per conservazione dei 115 item nelle sei forme e delle 60 composizioni precedenti. I report 3.0.0 e legacy restano originali; contesto completo e campi facoltativi di motivazione/fonti arricchiscono i nuovi export. Verifica dell’agente in un browser reale non disponibile: layout, mobile, download, console e traffico reali restano nella [checklist del maintainer](docs/SCORING.md). Non sono dimostrate equivalenza psicometrica delle forme o durata empirica.

## 15. Attuazione nella milestone 19

La milestone 19, sviluppata sul branch `feature/agentic-workflow-assessment`, introduce AI Agents rivisto: dieci scenari Q, due per A01–A05, con livelli 2 O e 8 S in ogni forma A/B/C IT/EN. App `3.2.0`, banca `2026.11-m19`, forme `1.5`; scoring `3.0.0`, schema `3` e blueprint `1.0.0` invariati. Il maintainer ha approvato la milestone e la release `v3.2.0` il `2026-11-25`.

AW01–AW10 sostituiscono nel percorso la vecchia estrazione da AG1–AG15. Gli item originari restano nella banca per tracciabilità e il completo continua a usare AG1–AG4 con testi e classificazioni invariati; 50 domande con 27 Q, 21 D e 2 T fino alla M22. AI moderne, altri tematici e Primi passi conservano i propri contenuti e composizioni. A04 acquisisce due Q dedicati nel percorso Agents, mentre nel completo resta solo la dichiarazione L9.

Le tracce originali forniscono mandato, dati, contratti e limiti. Comprendono scelta fra workflow/agente singolo/delega multipla, tool e argomenti, esiti intermedi o incompleti, supervisione proporzionata, prompt injection in fonti e output, divulgazione, credenziali revocabili, stato/log/memoria/rollback, tentativi limitati, escalation e dichiarazione del completamento. Non eseguono strumenti, non raccolgono credenziali e non introducono E o flag critici di simulazione. La copertura prevista di A descrive giudizio su scenario, senza attestare esecuzione pratica.

Tutte le varianti, motivazioni e otto fonti primarie ricontrollate sono in [AGENTIC_WORKFLOWS_REVIEW.md](docs/AGENTIC_WORKFLOWS_REVIEW.md). Il registro separa principi architetturali storici da documentazione corrente e segnala la guida legacy di Agent Builder. I crediti e i compromessi sono elaborazione editoriale locale. Suggerimenti di approfondimento per scelte non piene sono salvati nel report e negli export; i record precedenti restano originali senza suggerimenti aggiunti o ricalcolati all’apertura.

Verificati 30 controlli, 66 composizioni assessment e 6 forme didattiche. Confronto con `main` `e28a0d2`: 125 item precedenti e relativa mappa nelle sei forme, 60 composizioni non Agents e forme didattiche invariati. Alternativa corretta più lunga in 1–3 casi su 10 per forma/lingua; carico progettato e durata restano editoriali. Il tentativo Browser sul file locale non trova un browser disponibile; layout, mobile, interazioni/download reali, console e traffico restano nella [checklist di validazione](docs/SCORING.md).

## 16. Attuazione nella milestone 20

La M20, sviluppata sul branch `feature/agent-harness-assessment`, introduce Harness: dieci scenari Q di livello S, matrice H01, H02×2, H03×2, H04×2, H05×2, H06 in ogni forma A/B/C IT/EN. App `3.3.0`, banca `2026.11-m20`, forme `1.6`; scoring `3.0.0`, schema `3`, blueprint `1.0.0` invariati. Il maintainer ha approvato la milestone e la release `v3.3.0` il `2026-11-25`.

HR01–HR10 esplorano componenti di esecuzione e valutatore, fonti e contesto, compattazione/memoria/consegne, API/MCP/skill/AGENTS.md, permessi effettivi e isolamento locale/remoto, contratti, timeout e tentativi, checkpoint e ricevute, ripresa senza duplicazione, artefatti, metriche e regressioni. I termini sono spiegati e i contratti forniti; nessuna installazione o credenziale richiesta. I tool sono descritti in casi sintetici e non eseguiti. La copertura H indica comprensione e giudizio su scenari, senza certificare costruzione o amministrazione di un harness. Nessun E o flag critico simulato introdotto.

Tutte le varianti, motivazioni, suggerimenti e nove fonti primarie ricontrollate sono in [HARNESS_REVIEW.md](docs/HARNESS_REVIEW.md). Il registro distingue principi storici da formati di prodotto, non tratta MCP o file di istruzioni come autorizzazioni universali e limita le garanzie di ripetizione al contratto di ciascun caso. Le scelte di credito e copertura restano editoriali. Le regole M19 salvano anche i suggerimenti Harness nel report senza ricalcolo all’apertura dello storico.

I 135 item precedenti e le loro classificazioni restano invariati: completo da 50 (27 Q, 21 D, 2 T), Agents, AI moderne e Primi passi mantengono contenuti e composizioni. Gli item storici H nel pool Agents restano tracciabili ma non entrano nel nuovo Harness. H01/H03/H04/H05 acquisiscono Q dedicati nella banca; F06 rimane senza Q diretto e il completo non incorpora i nuovi slot prima della M22. Il laboratorio E resta nella M21.

Verificati 35 controlli, 72 composizioni assessment e 6 forme didattiche. Confronto con `main` `dcf6428`: 135 item nelle sei forme, relativa mappa e 66 composizioni precedenti invariati. Risposta corretta più lunga in 0–4 casi su 10 per forma/lingua; carico medio progettato 91–103 parole e durata stimata 8–12 minuti, senza validazione empirica. Browser non disponibile nell’ambiente: layout, mobile, tredici indicatori del carosello, interazioni/download reali, console e traffico restano nella [checklist del maintainer](docs/SCORING.md).


## 17. Implementazione M21 — approvata

La M21 implementa il Laboratorio operativo nel branch feature/local-operational-lab. App 3.4.0, banca 2026.11-m21, forma 1.7, casi/rubriche 1.0.0; scoring 3.1.0 e schema report 4 introducono E. Blueprint 1.0.0 invariato; M21 approvata dal maintainer il 2026-11-25, release v3.4.0, con autorizzazione a commit, merge, push, tag e rimozione del branch. I report precedenti schema 3/scoring 3.0 restano leggibili e originali.

Due casi K1/K2, sei decisioni E in ciascuna forma IT/EN A/B/C; 145 quesiti precedenti conservati più sei unità E separate da baseQuestions. U06×3 di livello O, A04/A03/H05 di livello S. La composizione del completo resta 27 Q, 21 D, 2 T, senza E fino alla M22; Practical Lab resta il percorso precedente con quiz e testi. F06 resta senza Q diretto nella banca attuale.

K1 fornisce registro, calcolatore modificabile e anteprima di consegna: verifica/calcolo possono scambiarsi, consegna dopo entrambi. Cambiare il calcolo annulla la vecchia consegna. K2 distingue gestione dell'istruzione incorporata, preparazione di una bozza dai dati sintetici e ripresa del lavoro pendente; ogni scelta confermata produce il proprio effetto locale. La pausa sulla nota non revoca il mandato, hold-all non crea l'artefatto e continue non finge un completamento. Ripetere update-17/28/39 porta da uno a due effetti nel registro. Le revisioni prima del report ricostruiscono effetti e criticità dalle scelte finali, senza cronologia cumulativa dei tentativi.

Credito 0/1/2 per decisione, massimo 6 per caso e 12 totali. E percentuale solo con entrambi i casi completi; casi parziali leggibili senza trasformare le assenze in zero. Soglie e minimo 4/6 per caso rispettano le sezioni 7 e 8.3. Qualsiasi azione critica simulata mantiene i punti e prevale sulla fascia; se il laboratorio è incompleto la criticità è visibile ma E resta null. Nessuna compensazione Q/E e nessuna qualifica operativa. Rubriche e soluzioni appaiono dopo il completamento.

Una sola bozza locale incompleta in aiSkillOperationalLabDraft, separata dallo storico: versioni, lingua, forma, ordine, posizione e scelte confermate, senza dati del profilo o tempi. Versione lab 1.0.0 identifica i due casi e le rubriche; modifiche richiedono versioni coerenti e rendono la bozza incompatibile. Recupero senza consumare una forma, eliminazione esplicita o a completamento/interruzione confermata. Errori di storage visibili; da file:// persistenza dipendente dal browser. Le bozze incompatibili/corrotte non vengono ricalcolate. Il report salva stato iniziale sintetico, scelte finali, artefatti/effetti, punti e motivazioni, senza log dei tentativi.

[Varianti IT/EN e contratto completo](docs/OPERATIONAL_LAB_REVIEW.md), [regole e checklist](docs/SCORING.md), [inventario E](docs/ASSESSMENT_ITEM_MAP.md). Nessun dato reale del browser consultato. Verifica Browser non disponibile: gli esiti dettagliati della prova IT/EN desktop/mobile e di download, console e traffico non sono stati riportati dal maintainer nell’approvazione. Tempi 12–16 minuti stimati e forme parallele sono scelte editoriali, senza validazione empirica o psicometrica.

## 18. Attuazione M22 — approvata dal maintainer

Il branch `feature/balanced-complete-assessment` implementa app `3.5.0`, banca `2026.11-m22`, forma `1.8`. Blueprint `1.0.0`, scoring `3.1.0`, schema report `4` e casi `1.0.0` restano invariati: si applica la matrice approvata, senza ricalcolare i risultati precedenti.

`assets/complete-assessment.js` rende espliciti C01–C50 e la loro origine. Gli 11 Q F sono nuovi e coprono tutti i sei obiettivi, incluso F06 che prima mancava di prove dirette. Altri 25 Q riusano otto MA, nove AW e otto HR con forma/lingua e motivazioni originali; HR01/HR04 sono i due compiti di comprensione Harness. Quattro D e due T sono riusi dichiarati; due D su A03/H02 sono nuovi. I 44 ID Q/D/T dedicati conservano slotId/originSourceId; le sei E conservano ID LAB e aggiungono slotId senza duplicare casi o crediti.

La distribuzione è esattamente 12 F, 16 U, 12 A, 10 H; 36 Q (6 knowledge, 30 scenario), 6 D, 2 T, 6 E. I quiz sono rimescolati entro area; K1 e K2 seguono come due blocchi, mantenendo C39/C40/C50 insieme. L'inversione verifica/calcolo di K1 non sostituisce l'intero questionario. Le azioni richiedono conferma e Avanti; correggere il calcolo invalida la consegna. Le criticità E compaiono già all'inizio del report e non sono compensate dai quiz.

Il requisito di recupero locale della sezione 7 si applica anche al completo: una sola bozza condivisa con laboratorio autonomo. Il completo salva draft schema 2 con ID/ordine e risposte/testi, incluse bozze testuali parziali e sole azioni E confermate. Esclude dati iniziali del profilo, tempi e cronologia. Riprende stessa lingua/forma senza consumare rotazione; i campi iniziali sono vuoti. Le bozze M21 o di versioni diverse non sono migrate. Il laboratorio mantiene il proprio schema draft 1. Le modalità tematiche e le sei forme di Primi passi conservano contenuti e regole originali.

La M22 e la release `v3.5.0` sono state approvate dal maintainer il `2026-11-26`, con autorizzazione a commit, merge, tag, push e rimozione del branch. La [matrice e le 300 unità IT/EN](docs/M22_REVIEW.md), i sei report campione e la [checklist unica](docs/QA.md) conservano il dettaglio della verifica. Gli esiti manuali IT/EN desktop/mobile e i tempi umani non sono stati riportati nella conversazione: la stima 40–55 minuti rimane qualificata come da verificare. La skill Browser non trova browser disponibili; il test con adattatore DOM non attesta layout, download, stampa, console o traffico reali.
