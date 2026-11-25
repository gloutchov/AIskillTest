# Revisione editoriale — Harness (milestone 20)

Stato: approvata dal maintainer il `2026-11-25`, release `v3.3.0`. App `3.3.0`, banca `2026.11-m20`, forme `1.6`; scoring `3.0.0`, schema `3`, blueprint `1.0.0` invariati.

Fonti ricontrollate il **2026-11-25**. Documento generato con `node scripts/build-harness-review.mjs` dai dati locali. È facoltativo e non serve per eseguire l'app.

## Matrice, criteri e limiti

Ogni forma A/B/C in IT/EN propone HR01–HR10: H01, H02×2, H03×2, H04×2, H05×2, H06. Tutti sono Q diretti di livello S, che descrive la complessità del compito e non una qualifica personale. La selezione è vincolata; ordine delle domande e alternative varia. Le 30 varianti sono originali e progettate sulla stessa matrice, senza equivalenza psicometrica dimostrata.

Il percorso esplora il sistema di esecuzione dell'agente: modello, prompt, ciclo agentico, harness e valutatore; fonti, contesto, compattazione, memoria e consegne; API, MCP, skill e AGENTS.md; contratti e permessi effettivi; checkpoint e ripresa; artefatti, tracce, metriche e regressioni. I termini sono definiti nel contesto o nel feedback e non richiedono memoria di prodotti o API.

Le tracce sono dati sintetici da interpretare. Non sono installazioni, connessioni, credenziali raccolte o strumenti eseguiti. I nomi di operazioni, gli ID, i tempi e i contratti valgono solo nel caso. Si valuta comprensione e giudizio, non capacità osservata di costruire o amministrare un harness; nessun E o flag critico di simulazione viene introdotto.

Per ciascun caso: score editoriale 5 → credito 1; 3 → 0,5; 1 → 0. Un'alternativa è piena, una parziale, due errate. La scelta parziale soddisfa solo parte della richiesta; non autorizza azioni incompatibili. Le risposte corrette non richiedono sempre più controlli, più testo o uno stop: nei casi con mandato e prove sufficienti si procede entro il perimetro.

Con dieci risposte valide il percorso può raggiungere la copertura prevista di H; F/U/A restano non esplorate. I sei obiettivi pesano uguale: nove risposte corrette e una errata in H01 producono 83,33; un solo errore in uno dei due H02 produce 91,67. Tutte le risposte parziali producono 50. Una risposta mancante impedisce fascia e copertura raggiunta. I valori sono editoriali, non soglie psicometriche.

Motivazioni, contesto completo, fonti e suggerimenti per obiettivi con almeno una scelta valida non piena sono salvati nella lingua della sessione e negli export. I suggerimenti sono deduplicati e non sono prove svolte. Aprire un report non ricalcola o ritraduce questi testi. Tutti i 135 item precedenti, il completo, Agents, AI moderne e Primi passi conservano contenuti e composizioni; integrazione del completo nella M22.

Criterio di validazione: revisione di copertura, tracce, alternative e traduzioni; completamento di forme IT/EN con casi corretti, parziali ed errati e verifica di comprensibilità, recupero senza duplicazioni, permessi rispetto a istruzioni, navigazione, copertura H, suggerimenti, storico, export e bibliografia. Il maintainer ha approvato la milestone il `2026-11-25` e autorizzato commit, merge, tag, push e rimozione del branch; gli esiti dettagliati della checklist manuale non sono stati riportati nella conversazione. Limiti della verifica dell'agente senza browser reale in [SCORING.md](SCORING.md).

| Slot | Obiettivo | Livello | Fonti |
| --- | --- | --- | --- |
| HR01 | H01 — Componenti dell'harness | S | M20-S03, M20-S09 |
| HR02 | H02 — Contesto, memoria e continuità | S | M20-S01, M20-S03 |
| HR03 | H02 — Contesto, memoria e continuità | S | M20-S02, M20-S03 |
| HR04 | H03 — API, MCP, skill e istruzioni | S | M20-S04, M20-S08 |
| HR05 | H03 — API, MCP, skill e istruzioni | S | M20-S05, M20-S06, M20-S07 |
| HR06 | H04 — Contratti e permessi effettivi | S | M20-S07 |
| HR07 | H04 — Contratti e permessi effettivi | S | M20-S08, M20-S07 |
| HR08 | H05 — Checkpoint e ripresa | S | M20-S03, M20-S08 |
| HR09 | H05 — Checkpoint e ripresa | S | M20-S03, M20-S08 |
| HR10 | H06 — Tracce e valutazioni ripetibili | S | M20-S09, M20-S03 |

## Fonti primarie e ambito

Le fonti sostengono i principi; crediti, soglie e contratti degli scenari sono editoriali. I collegamenti restano facoltativi e aperti soltanto su click.

- **M20-S01** — [Anthropic — Effective context engineering](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents): Selezione del contesto utile e gestione di informazioni finite; principi, non promesse di memoria perfetta. / Selecting useful context and managing finite information; principles, not promises of perfect memory.
- **M20-S02** — [OpenAI — Compaction](https://developers.openai.com/api/docs/guides/compaction): Ridurre il contesto conservando stato utile è distinto da archiviare e recuperare ogni dettaglio. / Reducing context while retaining useful state differs from archiving and retrieving every detail.
- **M20-S03** — [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents): Stato, progressi verificabili, consegne e controllo del risultato; non impone un SDK. / State, verifiable progress, handoffs, and outcome checks; no SDK is prescribed.
- **M20-S04** — [MCP — Introduction](https://modelcontextprotocol.io/docs/getting-started/intro): Protocollo di collegamento a dati e strumenti, distinto da permessi e affidabilità del contenuto. / A protocol connecting data and tools, distinct from permissions and content trustworthiness.
- **M20-S05** — [Agent Skills — Overview](https://agentskills.io/home): Procedure e risorse caricabili quando pertinenti; una skill non concede automaticamente accessi. / Procedures and resources loaded when relevant; a skill does not automatically grant access.
- **M20-S06** — [AGENTS.md — Open format](https://agents.md/): Contesto e istruzioni di progetto; precedenze e applicazione dipendono dall'ambiente dichiarato. / Project context and instructions; precedence and enforcement depend on the stated environment.
- **M20-S07** — [OpenAI — Sandbox security](https://developers.openai.com/api/docs/guides/agents-api/environments/security): Isolamento, rete e credenziali impongono confini distinti dalle istruzioni testuali. / Isolation, networking, and credentials impose boundaries distinct from textual instructions.
- **M20-S08** — [OpenAI — Function calling](https://developers.openai.com/api/docs/guides/function-calling): Tool, argomenti, esecuzione e risultati: gli schemi non sostituiscono la verifica semantica. / Tools, arguments, execution, and results: schemas do not replace semantic checks.
- **M20-S09** — [OpenAI — Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals): Tracce, criteri e campioni ripetibili per individuare regressioni; nessun valutatore remoto nel test. / Traces, criteria, and repeatable samples to detect regressions; no remote grader in this test.

M20-S01/S03 sono articoli tecnici storici del 2025: si usano principi di contesto e continuità, senza imporre modelli o SDK dell'epoca. M20-S02 descrive anche formati di compattazione opachi: i riassunti testuali dei casi sono caratteristiche delle app ipotetiche, non una descrizione universale di quella API. M20-S04 rimanda alla documentazione MCP `2026-07-28`. M20-S05/S06 definiscono formati e convenzioni: gerarchia e caricamento sono dichiarati dal singolo caso, non assunti uguali in tutti i prodotti. M20-S07 distingue superfici locali e remote. M20-S08/S09 sostengono contratti e verifiche ripetibili; il test non chiama API né valutatori esterni. Ricontrollare le fonti nelle revisioni future.

## Forma A

### A-HR01 — H01 / S

Fonti: M20-S03, M20-S09.

**Italiano**

Un sistema prepara report. Il modello propone testo e chiamate; le istruzioni definiscono il compito; un ciclo agentico sceglie il passo successivo. L'harness, cioè il sistema di esecuzione, gestisce tool, contesto e stato. Un controllo separato confronta il PDF prodotto con i requisiti.

**Quale assegnazione delle responsabilità è corretta?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Il modello propone, l'harness gestisce l'esecuzione, il valutatore controlla l'artefatto. | Distingue generazione, gestione del processo e verifica indipendente del risultato. |
| 0,5 | Controllo soltanto il testo del modello e rinvio la verifica del PDF effettivamente prodotto. | Esamina una parte del processo, ma non dimostra che l'artefatto soddisfi i requisiti. |
| 0 | Il prompt impone da solo i permessi tecnici; l'ambiente non richiede altri controlli. | Un'istruzione non configura automaticamente accessi a tool, file o rete. |
| 0 | Se il ciclo agentico dichiara concluso, il controllo esterno deve confermare senza leggere il PDF. | La dichiarazione del sistema non sostituisce una verifica dell'output. |

Feedback: Modello, istruzioni, ciclo agentico, harness e valutazione collaborano, con responsabilità diverse. La conoscenza dei componenti non dimostra di saperli amministrare.

Suggerimento / Next step: Disegna un sistema semplice e assegna a modello, prompt, agente, harness e valutatore una responsabilità verificabile ciascuno.

**English**

A system prepares reports. The model proposes text and calls; instructions define the task; an agent loop chooses the next step. The harness, the execution system, manages tools, context, and state. A separate check compares the resulting PDF with requirements.

**Which assignment of responsibilities is correct?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | The model proposes, the harness manages execution, and the evaluator checks the artifact. | It distinguishes generation, process management, and independent outcome checking. |
| 0.5 | Check only the model text and defer checking the actual PDF produced. | It examines part of the process but does not show that the artifact meets requirements. |
| 0 | The prompt alone enforces technical permissions; the environment needs no other controls. | An instruction does not automatically configure tool, file, or network access. |
| 0 | If the agent loop declares completion, the external check must confirm without reading the PDF. | The system's claim does not replace an output check. |

Feedback: Model, instructions, agent loop, harness, and evaluation work together with different responsibilities. Knowing the components does not demonstrate ability to administer them.

Suggerimento / Next step: Sketch a simple system and assign one verifiable responsibility each to the model, prompt, agent, harness, and evaluator.

### A-HR02 — H02 / S

Fonti: M20-S01, M20-S03.

**Italiano**

Devi preparare una bozza secondo la policy interna v4. La fonte ufficiale autorizzata contiene v4 e l'appendice necessaria; una vecchia chat riporta v2. Hai anche centinaia di pagine estranee. Il contesto del modello è lo spazio limitato di informazioni disponibili nel turno.

**Quale contesto prepari per la richiesta?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Porto vincoli, v4 e appendice pertinenti, conservando riferimenti e versione. | Seleziona informazioni utili e verificabili senza confondere volume e pertinenza. |
| 0,5 | Uso v4 e l'appendice, ma ometto i riferimenti utili a ricontrollare i passaggi. | Sceglie la fonte giusta, ma rende meno tracciabile il risultato. |
| 0 | Uso soltanto la vecchia chat perché il suo riassunto è più breve della policy corrente. | La brevità non rende aggiornata una fonte che il caso dichiara superata. |
| 0 | Inserisco tutte le pagine ed elimino i vincoli per lasciare più spazio ai dati. | La quantità non compensa la perdita dei requisiti del compito. |

Feedback: Il contesto va selezionato per compito, fonte e versione. Un insieme più grande non è automaticamente più utile; i riferimenti rendono possibile recuperare dettagli.

Suggerimento / Next step: Prepara un passaggio di consegne con vincoli, fonti/versioni, stato e punti aperti; verifica cosa puoi recuperare se un riassunto omette un dettaglio.

**English**

You must prepare a draft under internal policy v4. The authorized official source contains v4 and the required appendix; an old chat reports v2. Hundreds of unrelated pages are also available. Model context is the limited space of information available in the turn.

**Which context do you prepare for the request?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Include constraints, relevant v4 content and appendix, retaining references and version. | It selects useful, verifiable information without confusing volume with relevance. |
| 0.5 | Use v4 and the appendix but omit references needed to recheck passages. | It selects the right source but makes the result less traceable. |
| 0 | Use only the old chat because its summary is shorter than the current policy. | Brevity does not make a source current when the case states it is superseded. |
| 0 | Include all pages and remove constraints to leave more room for data. | Quantity does not compensate for losing task requirements. |

Feedback: Select context by task, source, and version. A larger set is not automatically more useful; references allow details to be retrieved.

Suggerimento / Next step: Prepare a handoff with constraints, sources/versions, state, and open points; check what can be retrieved if a summary omits a detail.

### A-HR03 — H02 / S

Fonti: M20-S02, M20-S03.

**Italiano**

Dopo una compattazione, cioè riduzione del contesto, il riassunto dice «preparare report». Omette il vincolo «solo bozza locale» e la tabella verificata. Il mandato originale e una nota di stato persistente sono ancora accessibili alla nuova sessione.

**Come ricostruisci il contesto prima di proseguire?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Recupero mandato e dati necessari, poi aggiorno la consegna con vincoli e stato. | Usa le fonti ancora disponibili invece di considerare il riassunto una memoria completa. |
| 0,5 | Recupero il vincolo sulla bozza, ma rinvio il recupero della tabella necessaria. | Ripristina il perimetro, ma non ancora i dati sufficienti al lavoro. |
| 0 | Assumo che ogni dettaglio omesso sia automaticamente conservato e recuperato dal modello. | La compattazione non va trattata come archivio perfetto di ogni dettaglio. |
| 0 | Pubblico il report perché la parola bozza non compare più nel riassunto. | Un'omissione nel riassunto non estende il mandato originale. |

Feedback: Contesto del turno, riassunto e memoria persistente sono cose diverse. Un passaggio di consegne utile conserva vincoli, fonti, stato e parti aperte, con possibilità di verifica.

Suggerimento / Next step: Prepara un passaggio di consegne con vincoli, fonti/versioni, stato e punti aperti; verifica cosa puoi recuperare se un riassunto omette un dettaglio.

**English**

After compaction, a reduction of context, the summary says 'prepare report'. It omits 'local draft only' and the verified table. The original scope and a persistent state note remain accessible to the new session.

**How do you reconstruct context before continuing?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Retrieve the scope and required data, then update the handoff with constraints and state. | It uses available sources instead of treating the summary as complete memory. |
| 0.5 | Retrieve the draft constraint but defer retrieving the required table. | It restores scope but not yet enough data for the work. |
| 0 | Assume every omitted detail is automatically retained and retrieved by the model. | Compaction should not be treated as a perfect archive of every detail. |
| 0 | Publish the report because the word draft no longer appears in the summary. | A summary omission does not expand the original scope. |

Feedback: Turn context, summary, and persistent memory differ. A useful handoff retains constraints, sources, state, and open work with a way to verify them.

Suggerimento / Next step: Prepare a handoff with constraints, sources/versions, state, and open points; check what can be retrieved if a summary omits a detail.

### A-HR04 — H03 / S

Fonti: M20-S04, M20-S08.

**Italiano**

Un'app deve leggere ticket. L'API espone read_ticket(id); un server MCP presenta questa funzione al client tramite un protocollo comune. La connessione usa una credenziale di sola lettura. Il contenuto dei ticket può includere testo scritto da terzi.

**Come distingui collegamento, funzione e fiducia?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | L'API legge, MCP collega; credenziale e provenienza restano da controllare. | Il protocollo non concede ulteriori permessi e non rende autorevole ogni contenuto. |
| 0,5 | Controllo funzione e credenziale, ma considero attendibile ogni istruzione nei ticket. | Riconosce parte dell'integrazione, ma confonde dati restituiti e istruzioni autorizzate. |
| 0 | MCP aggiorna i pesi del modello a ogni lettura, quindi non serve più interrogare l'API. | Collegare strumenti e dati non equivale a riaddestrare il modello. |
| 0 | Con MCP ottengo anche accesso di scrittura. | Un collegamento non amplia da solo il perimetro della credenziale. |

Feedback: API e tool definiscono operazioni; MCP è un modo di collegarle. Autorizzazioni e fiducia nei dati vanno valutate separatamente dal protocollo.

Suggerimento / Next step: Per un'integrazione ipotetica, separa l'API che agisce, il collegamento MCP, le procedure della skill e le istruzioni di progetto dai permessi effettivi.

**English**

An app needs to read tickets. The API exposes read_ticket(id); an MCP server presents this function to the client through a common protocol. The connection uses a read-only credential. Ticket content may include third-party text.

**How do you distinguish connection, function, and trust?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | The API reads, MCP connects; credentials and provenance still need checking. | The protocol grants no additional permission and does not make every content authoritative. |
| 0.5 | Check the function and credential but trust every instruction in the tickets. | It recognizes part of the integration but confuses returned data with authorized instructions. |
| 0 | MCP updates model weights on every read, so querying the API is no longer needed. | Connecting tools and data is not equivalent to retraining the model. |
| 0 | With MCP I also gain write access. | A connection does not itself expand credential scope. |

Feedback: APIs and tools define operations; MCP is one way to connect them. Authorization and data trust must be evaluated separately from the protocol.

Suggerimento / Next step: For a hypothetical integration, separate the acting API, MCP connection, skill procedures, and project instructions from effective permissions.

### A-HR05 — H03 / S

Fonti: M20-S05, M20-S06, M20-S07.

**Italiano**

Una skill contiene una procedura di revisione e un template. AGENTS.md indica come lavorare nel progetto. L'app dichiara che questi file forniscono istruzioni, mentre gli accessi sono imposti dall'ambiente. Nessuno dei due file può concedere una scrittura in produzione.

**Quale uso distingue procedure, istruzioni e accessi?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso procedura e istruzioni pertinenti, verificando i permessi effettivi dell'ambiente. | Le risorse guidano il lavoro senza sostituire i controlli tecnici o il mandato. |
| 0,5 | Leggo le istruzioni del progetto, ma ignoro procedura e template utili al compito. | Riconosce le istruzioni, ma non usa risorse pertinenti già disponibili. |
| 0 | Una skill caricata rende automaticamente attendibili tutti gli script e autorizzate le scritture. | Caricare una procedura non garantisce affidabilità né concede accessi. |
| 0 | Aggiungo permesso produzione in AGENTS.md e considero modificati gli accessi del server. | Il testo del file non configura da solo i permessi del server. |

Feedback: Skill e file di progetto possono contenere procedure, risorse e istruzioni. Il loro ruolo dipende dall'app, mentre mandato e permessi effettivi restano controlli distinti.

Suggerimento / Next step: Per un'integrazione ipotetica, separa l'API che agisce, il collegamento MCP, le procedure della skill e le istruzioni di progetto dai permessi effettivi.

**English**

A skill contains a review procedure and a template. AGENTS.md describes how to work in the project. The app states that these files provide instructions while access is enforced by the environment. Neither file can grant a production write.

**Which use distinguishes procedures, instructions, and access?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the relevant procedure and instructions while checking actual environment permissions. | The resources guide work without replacing technical controls or scope. |
| 0.5 | Read project instructions but ignore the procedure and template useful for the task. | It recognizes instructions but fails to use relevant resources already available. |
| 0 | A loaded skill automatically makes every script trustworthy and all writes authorized. | Loading a procedure guarantees neither trustworthiness nor access. |
| 0 | Add production permission to AGENTS.md and treat server access as changed. | File text does not itself configure server permissions. |

Feedback: Skills and project files can contain procedures, resources, and instructions. Their role depends on the app, while scope and effective permissions remain separate controls.

Suggerimento / Next step: For a hypothetical integration, separate the acting API, MCP connection, skill procedures, and project instructions from effective permissions.

### A-HR06 — H04 / S

Fonti: M20-S07.

**Italiano**

Un job di analisi deve leggere una copia dei dati e scrivere solo in una cartella temporanea. Il prompt vieta modifiche alla produzione, ma l'ambiente monta la produzione in scrittura e dispone di rete aperta. È possibile usare un ambiente isolato con copia in lettura e output locale.

**Quale configurazione impone il perimetro del caso?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso l'ambiente isolato con copia in lettura, output e rete limitati al mandato. | Allinea gli accessi effettivi al compito invece di affidarsi solo al divieto testuale. |
| 0,5 | Limito i file alla copia, ma rinvio il controllo della rete prima di eseguire il job. | Migliora un confine e non avvia il lavoro, ma lascia incompleta la configurazione richiesta. |
| 0 | Ripeto il divieto nel prompt e lascio produzione e rete con tutti i permessi disponibili. | Un divieto testuale non rimuove capacità tecniche dell'ambiente. |
| 0 | Do al valutatore credenziali amministrative così potrà correggere eventuali danni dopo. | Una verifica successiva non impone il confine prima dell'esecuzione. |

Feedback: Prompt, controlli del tool e isolamento dell'ambiente hanno ruoli diversi. I limiti devono valere dove l'azione può realmente avvenire.

Suggerimento / Next step: Definisci per un tool sintetico schema, controlli semantici, permessi dell'ambiente, timeout e massimo di tentativi; includi un caso che deve essere respinto.

**English**

An analysis job must read a data copy and write only to a temporary folder. The prompt forbids production changes, but the environment mounts production as writable and has open networking. An isolated environment with a read-only copy and local output is available.

**Which configuration enforces this case's scope?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the isolated environment with a read-only copy, output and networking limited to scope. | It aligns effective access with the task instead of relying only on a textual prohibition. |
| 0.5 | Limit files to the copy but defer the network check before running the job. | It improves one boundary without starting work but leaves the required configuration incomplete. |
| 0 | Repeat the prohibition in the prompt and leave production and networking fully accessible. | A textual prohibition does not remove the environment's technical capabilities. |
| 0 | Give the evaluator administrator credentials so it can fix any damage afterwards. | A later check does not enforce the boundary before execution. |

Feedback: Prompts, tool checks, and environment isolation have different roles. Limits must apply where an action can actually occur.

Suggerimento / Next step: Define a synthetic tool's schema, semantic checks, environment permissions, timeout, and attempt limit; include a case that must be rejected.

### A-HR07 — H04 / S

Fonti: M20-S08, M20-S07.

**Italiano**

read_total(run_id) è di sola lettura; richiede un ID e restituisce run_id e total intero. La configurazione consente timeout di 4 secondi e due tentativi.
Traccia per R17: {run_id:'R18', total:100}. Il JSON rispetta i tipi, ma riguarda un altro run.

**Come gestisci contratto ed esito?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Respingo l'esito per ID errato e gestisco il recupero entro timeout e tentativi. | Oltre allo schema verifica la corrispondenza al compito; non avvia un loop senza limiti. |
| 0,5 | Non uso il totale, ma segnalo genericamente un errore senza indicare i due ID. | Evita il dato errato, ma omette una diagnosi utile al recupero. |
| 0 | Accetto il totale perché il JSON è valido, anche se l'ID non è quello richiesto. | Uno schema corretto non dimostra che il risultato risponda alla richiesta. |
| 0 | Ripeto la lettura senza timeout né limite finché compare il valore che mi aspetto. | La ripetizione illimitata viola il contratto e non definisce un criterio di verifica. |

Feedback: Valida argomenti, tipi e corrispondenza semantica dell'output. Timeout e budget di tentativi limitano il recupero; una risposta ben formata può essere sbagliata.

Suggerimento / Next step: Definisci per un tool sintetico schema, controlli semantici, permessi dell'ambiente, timeout e massimo di tentativi; includi un caso che deve essere respinto.

**English**

read_total(run_id) is read-only; it requires an ID and returns run_id and an integer total. Configuration allows a 4-second timeout and two attempts.
Trace for R17: {run_id:'R18', total:100}. The JSON satisfies types but refers to another run.

**How do you handle the contract and outcome?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Reject the wrong-ID result and handle recovery within the timeout and attempt limits. | Beyond the schema, it checks task correspondence without starting an unlimited loop. |
| 0.5 | Do not use the total, but report a generic error without the two IDs. | It avoids the wrong data but omits a useful recovery diagnosis. |
| 0 | Accept the total because the JSON is valid even though the ID is not the requested one. | A correct schema does not prove that a result answers the request. |
| 0 | Repeat the read without timeout or limit until the expected value appears. | Unlimited repetition violates the contract and defines no checking criterion. |

Feedback: Validate arguments, types, and semantic correspondence of output. Timeouts and attempt budgets bound recovery; a well-formed response can still be wrong.

Suggerimento / Next step: Define a synthetic tool's schema, semantic checks, environment permissions, timeout, and attempt limit; include a case that must be rejected.

### A-HR08 — H05 / S

Fonti: M20-S03, M20-S08.

**Italiano**

Il checkpoint, stato salvato per riprendere, registra update U17 completato sul record T17 e bozza successiva da preparare. Il servizio conferma la ricevuta di U17 con gli stessi ID. Dopo l'interruzione l'agente propone di ripartire dall'update; ripeterlo può duplicarne l'effetto.

**Da quale punto riprendi il lavoro?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso la ricevuta verificata e riprendo dalla bozza ancora aperta. | Stato e ricevuta concordano: non serve ripetere l'effetto già completato. |
| 0,5 | Non ripeto l'update, ma sospendo tutto per chiedere una conferma già disponibile. | Evita duplicazioni ma non usa lo stato sufficiente a riprendere la parte autorizzata. |
| 0 | Ripeto U17 per confermare che sia riuscito. | La ricevuta confermata rende la ripetizione inutile e potenzialmente duplicata. |
| 0 | Segno concluso l'intero compito perché l'update ha una ricevuta valida. | La bozza successiva resta un requisito non completato. |

Feedback: Il checkpoint guida la ripresa se identità, stato e ricevute corrispondono. Distingui l'effetto già confermato dal lavoro che resta da fare.

Suggerimento / Next step: Su una traccia interrotta, confronta checkpoint, ID dell'operazione e ricevuta prima di scegliere cosa riprendere o riprovare.

**English**

The checkpoint, saved state for resumption, records update U17 completed on record T17 and a next draft still to prepare. The service confirms the receipt for U17 with the same IDs. After interruption, the agent proposes restarting from the update; repeating it may duplicate its effect.

**Where do you resume the work?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the verified receipt and resume from the remaining draft. | State and receipt agree: the already completed effect need not be repeated. |
| 0.5 | Do not repeat the update but pause everything to request an already available confirmation. | It avoids duplication but does not use sufficient state to resume the authorized remainder. |
| 0 | Repeat U17 to confirm it worked. | The confirmed receipt makes repetition unnecessary and potentially duplicative. |
| 0 | Mark the whole task complete because the update has a valid receipt. | The following draft remains an unfinished requirement. |

Feedback: A checkpoint guides resumption when identity, state, and receipts match. Distinguish a confirmed effect from remaining work.

Suggerimento / Next step: On an interrupted trace, compare checkpoint, operation ID, and receipt before choosing what to resume or retry.

### A-HR09 — H05 / S

Fonti: M20-S03, M20-S08.

**Italiano**

Una scrittura W17 termina con timeout: il client non sa se il servizio l'abbia applicata. Il checkpoint dice esito sconosciuto, non fallito. È disponibile una lettura di stato tramite la stessa chiave W17; creare una nuova chiave può produrre una seconda scrittura.

**Quale passo riduce il rischio di duplicazione?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Leggo lo stato di W17 prima di decidere se e come riprovare. | Verifica l'effetto incerto senza presumere che il timeout equivalga a mancata applicazione. |
| 0,5 | Non riscrivo e passo il blocco alla persona senza usare la lettura disponibile. | Evita un duplicato ma rinuncia a una verifica pertinente già disponibile. |
| 0 | Dopo il timeout ripeto con W18, assumendo W17 non applicata. | Un esito di rete incerto non dimostra l'assenza dell'effetto sul servizio. |
| 0 | Registro successo nel checkpoint per poter andare avanti senza interrogare il servizio. | Una modifica allo stato locale non verifica l'esito remoto. |

Feedback: Dopo un'interruzione riconcilia lo stato locale con l'operazione effettiva. Chiavi stabili e contratti di ripetizione vanno verificati, non presunti universali.

Suggerimento / Next step: Su una traccia interrotta, confronta checkpoint, ID dell'operazione e ricevuta prima di scegliere cosa riprendere o riprovare.

**English**

Write W17 ends in a timeout: the client does not know whether the service applied it. The checkpoint says outcome unknown, not failed. A status read using the same W17 key is available; creating a new key may produce a second write.

**Which step reduces duplication risk?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Read W17's status before deciding whether and how to retry. | It checks the uncertain effect without assuming timeout means non-application. |
| 0.5 | Do not write again and hand the blockage to a person without using the available read. | It avoids a duplicate but forgoes an available, relevant check. |
| 0 | After timeout, retry with W18, assuming W17 was not applied. | An uncertain network outcome does not prove the service effect is absent. |
| 0 | Record success in the checkpoint to continue without querying the service. | Changing local state does not verify the remote outcome. |

Feedback: After interruption, reconcile local state with the actual operation. Stable keys and retry contracts must be checked, not assumed universal.

Suggerimento / Next step: On an interrupted trace, compare checkpoint, operation ID, and receipt before choosing what to resume or retry.

### A-HR10 — H06 / S

Fonti: M20-S09, M20-S03.

**Italiano**

Una modifica del modello o dell'harness rende le prime risposte più rapide. Devi decidere se adottarla per produrre report: contano correttezza dell'artefatto, errori, interventi umani, costo e tempo fino al risultato utilizzabile. Hai casi di prova rappresentativi e requisiti già definiti.

**Quale confronto può rilevare miglioramenti e regressioni?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Ripeto gli stessi casi e controllo artefatti, tracce e metriche concordate. | Rende confrontabili le condizioni e include il costo dell'intero processo. |
| 0,5 | Ripeto gli stessi casi e confronto solo tempo iniziale e costo di generazione. | Conserva il campione, ma trascura esiti e lavoro di verifica richiesti. |
| 0 | Accetto l'autodichiarazione del modello senza leggere i file prodotti dal nuovo sistema. | La dichiarazione del generatore non è una verifica indipendente dell'artefatto. |
| 0 | Uso solo i casi facili per la nuova versione e quelli difficili per la precedente. | Campioni diversi non isolano l'effetto della modifica. |

Feedback: Valutazione ed esecuzione sono distinte. Un confronto ripetibile include requisiti, tracce e controlli indipendenti degli esiti, senza dedurre competenza dalla sola velocità.

Suggerimento / Next step: Confronta due configurazioni sugli stessi casi e requisiti: controlla artefatti, errori, interventi umani, costo e durata totale, oltre alle tracce.

**English**

A model or harness change makes first responses faster. You must decide whether to adopt it for reports: artifact correctness, errors, human interventions, cost, and time to a usable result matter. Representative test cases and defined requirements are available.

**Which comparison can detect improvements and regressions?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Repeat the same cases and check artifacts, traces, and agreed metrics. | It makes conditions comparable and includes the cost of the whole process. |
| 0.5 | Repeat the same cases and compare only first-response time and generation cost. | It keeps the sample but omits required outcomes and verification work. |
| 0 | Accept the model's self-report without reading files produced by the new system. | The generator's self-report is not an independent artifact check. |
| 0 | Use only easy cases for the new version and difficult ones for the old version. | Different samples do not isolate the effect of the change. |

Feedback: Evaluation and execution differ. Repeatable comparison includes requirements, traces, and independent outcome checks without inferring competence from speed alone.

Suggerimento / Next step: Compare two configurations on the same cases and requirements: check artifacts, errors, human interventions, cost, and total duration, as well as traces.

## Forma B

### B-HR01 — H01 / S

Fonti: M20-S03, M20-S09.

**Italiano**

Un assistente analizza ordini sintetici. Il modello propone un passo; un ciclo agentico decide se cercare ancora. Le istruzioni fissano lo scopo. L'harness gestisce invocazioni, contesto, stato e limiti. Un valutatore separato controlla la tabella finale su dati noti.

**Quale distinzione aiuta a diagnosticare il sistema?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Distinguo proposta del modello, gestione dell'harness e controllo della tabella. | Attribuisce compiti diversi ai componenti invece di chiamare tutto modello. |
| 0,5 | Esamino il ciclo e le chiamate, ma rinvio il confronto della tabella coi dati noti. | La traccia è utile, ma manca una verifica dell'esito concordato. |
| 0 | Il valutatore deve riscrivere da solo i permessi del tool per far passare ogni caso. | Cambiare i confini per ottenere successo non valuta il sistema secondo i requisiti. |
| 0 | Modello, harness e valutatore sono lo stesso componente. | La conferma del generatore non sostituisce le responsabilità di esecuzione e verifica. |

Feedback: L'harness è il sistema che sostiene l'esecuzione; il valutatore controlla comportamenti o risultati secondo criteri. Un prompt descrive requisiti, non esegue da solo tutti questi ruoli.

Suggerimento / Next step: Disegna un sistema semplice e assegna a modello, prompt, agente, harness e valutatore una responsabilità verificabile ciascuno.

**English**

An assistant analyzes synthetic orders. The model proposes a step; an agent loop decides whether to search further. Instructions set the scope. The harness manages invocations, context, state, and limits. A separate evaluator checks the final table against known data.

**Which distinction helps diagnose the system?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Distinguish the model proposal, harness management, and table checking. | It assigns different tasks to components instead of calling everything the model. |
| 0.5 | Inspect the loop and calls but defer comparing the table with known data. | The trace is useful, but the agreed outcome check is missing. |
| 0 | The evaluator must rewrite tool permissions itself to make every case pass. | Changing boundaries to achieve success does not evaluate the system against requirements. |
| 0 | Model, harness, and evaluator are the same component. | The generator's confirmation does not replace execution and checking responsibilities. |

Feedback: The harness supports execution; the evaluator checks behaviors or outcomes against criteria. A prompt describes requirements rather than performing all these roles itself.

Suggerimento / Next step: Sketch a simple system and assign one verifiable responsibility each to the model, prompt, agent, harness, and evaluator.

### B-HR02 — H02 / S

Fonti: M20-S01, M20-S03.

**Italiano**

Per una sintesi servono i prezzi interni approvati del periodo P2, unità e due esclusioni. La tabella ufficiale autorizzata contiene tutti e tre; una presentazione vecchia usa P1. Il contesto è limitato e molte righe non riguardano il compito.

**Quale selezione conserva le informazioni necessarie?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Seleziono P2 con unità ed esclusioni, mantenendo fonte e versione. | Riduce il volume senza perdere i vincoli che determinano il significato dei dati. |
| 0,5 | Uso i dati P2 corretti, ma lascio fuori le esclusioni dalla richiesta di sintesi. | La fonte è pertinente, ma la selezione perde una condizione richiesta. |
| 0 | Uso P1 perché è già in forma di slide e considero aggiornati anche i suoi valori. | La comodità del formato non aggiorna il periodo della fonte. |
| 0 | Tolgo unità e fonte e inserisco tutte le righe per compensare con più numeri. | Più dati non ricostruiscono significato e provenienza eliminati. |

Feedback: Selezionare contesto significa conservare ciò che cambia la risposta, non soltanto accorciare. Unità, esclusioni, versioni e riferimenti rendono utilizzabili i dati.

Suggerimento / Next step: Prepara un passaggio di consegne con vincoli, fonti/versioni, stato e punti aperti; verifica cosa puoi recuperare se un riassunto omette un dettaglio.

**English**

A summary needs approved internal prices for period P2, units, and two exclusions. The authorized official table contains all three; an old presentation uses P1. Context is limited and many rows are irrelevant to the task.

**Which selection retains the necessary information?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Select P2 with units and exclusions, retaining source and version. | It reduces volume without losing constraints that determine data meaning. |
| 0.5 | Use correct P2 data but leave exclusions out of the summary request. | The source is relevant, but the selection loses a required condition. |
| 0 | Use P1 because it is already in slides and treat its values as current. | Format convenience does not update the source period. |
| 0 | Remove units and source and include all rows to compensate with more numbers. | More data does not reconstruct removed meaning and provenance. |

Feedback: Selecting context means retaining what changes the answer, not merely shortening. Units, exclusions, versions, and references make data usable.

Suggerimento / Next step: Prepare a handoff with constraints, sources/versions, state, and open points; check what can be retrieved if a summary omits a detail.

### B-HR03 — H02 / S

Fonti: M20-S02, M20-S03.

**Italiano**

Una nuova sessione riceve un riassunto compatto senza le unità del calcolo. La memoria persistente riporta una vecchia conversione, mentre la fonte ufficiale corrente definisce l'unità diversa. Entrambe sono accessibili; nessuna delle note è un risultato verificato della nuova sessione.

**Come prepari una consegna affidabile per continuare?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Recupero l'unità corrente e aggiorno la consegna con fonte e dato da ricontrollare. | La persistenza di una nota non la rende aggiornata rispetto alla fonte autorizzata. |
| 0,5 | Segnalo il conflitto e sospendo il calcolo senza consultare la fonte disponibile. | Non inventa l'unità, ma non usa l'evidenza disponibile per risolvere il punto. |
| 0 | Uso sempre la memoria persistente: conservare un dato dimostra che è ancora corretto. | Durata della conservazione e validità del contenuto sono proprietà distinte. |
| 0 | Lascio decidere al modello l'unità più probabile e registro il calcolo come verificato. | Una scelta plausibile non sostituisce il recupero della definizione disponibile. |

Feedback: Una memoria va verificata per origine e attualità; una compattazione può omettere dettagli utili. La consegna distingue ciò che è confermato da ciò che va riletto.

Suggerimento / Next step: Prepara un passaggio di consegne con vincoli, fonti/versioni, stato e punti aperti; verifica cosa puoi recuperare se un riassunto omette un dettaglio.

**English**

A new session receives a compact summary without calculation units. Persistent memory records an old conversion, while the current official source defines a different unit. Both are accessible; neither note is a verified result from the new session.

**How do you prepare a reliable handoff to continue?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Retrieve the current unit and update the handoff with its source and the value to recheck. | Persistence does not make a note current relative to the authorized source. |
| 0.5 | Flag the conflict and pause calculation without consulting the available source. | It does not invent the unit but fails to use available evidence to resolve it. |
| 0 | Always use persistent memory: storing a value proves it is still correct. | Storage duration and content validity are separate properties. |
| 0 | Let the model choose the most likely unit and record the calculation as verified. | A plausible choice does not replace retrieving the available definition. |

Feedback: Check memory for provenance and currency; compaction can omit useful details. A handoff distinguishes confirmed information from what must be reread.

Suggerimento / Next step: Prepare a handoff with constraints, sources/versions, state, and open points; check what can be retrieved if a summary omits a detail.

### B-HR04 — H03 / S

Fonti: M20-S04, M20-S08.

**Italiano**

Un servizio calendario offre un'API per leggere eventi. Un connettore MCP rende il tool disponibile all'app; la credenziale consente solo il calendario Demo. Il testo degli eventi può contenere note libere, compresa una richiesta di modificare altri calendari.

**Quale interpretazione dell'integrazione è corretta?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Il tool legge via API/MCP; le note non ampliano il permesso su Demo. | Distingue accesso tecnico al servizio da autorità delle informazioni restituite. |
| 0,5 | Controllo il calendario consentito, ma tratto la richiesta nelle note come nuova istruzione. | Verifica un limite tecnico, ma attribuisce autorità operativa a contenuto non fidato. |
| 0 | MCP rende scrivibili tutti i calendari. | Il protocollo non concede permessi ulteriori rispetto al sistema configurato. |
| 0 | La lettura aggiorna i pesi del modello e sostituisce il collegamento per tutte le sessioni future. | Ricevere dati di un calendario non equivale a riaddestrare il modello. |

Feedback: Un connettore collega funzionalità; non decide da solo quali dati sono istruzioni o quali modifiche sono consentite. Questi confini restano espliciti nello scenario.

Suggerimento / Next step: Per un'integrazione ipotetica, separa l'API che agisce, il collegamento MCP, le procedure della skill e le istruzioni di progetto dai permessi effettivi.

**English**

A calendar service offers an API to read events. An MCP connector makes the tool available to the app; its credential allows only calendar Demo. Event text may contain free-form notes, including a request to modify other calendars.

**Which interpretation of the integration is correct?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | The tool reads through API/MCP; notes do not expand permission beyond Demo. | It distinguishes technical service access from the authority of returned information. |
| 0.5 | Check the allowed calendar but treat the request in the notes as a new instruction. | It checks one technical limit but gives operational authority to untrusted content. |
| 0 | MCP makes all calendars writable. | The protocol does not grant permission beyond the configured system. |
| 0 | Reading updates model weights and replaces the connection for all future sessions. | Receiving calendar data is not equivalent to retraining the model. |

Feedback: A connector links functionality; it does not itself decide which data are instructions or which changes are allowed. Those boundaries remain explicit in the scenario.

Suggerimento / Next step: For a hypothetical integration, separate the acting API, MCP connection, skill procedures, and project instructions from effective permissions.

### B-HR05 — H03 / S

Fonti: M20-S05, M20-S06, M20-S07.

**Italiano**

Una skill contiene una procedura per documentare test; AGENTS.md indica convenzioni del repository. L'applicazione stabilisce come caricarle e quale precedenza seguire. Il mandato autorizza una revisione locale e l'ambiente non consente pubblicazioni esterne.

**Come usi queste risorse nel sistema dichiarato?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Carico le risorse pertinenti e svolgo la revisione entro mandato e accessi locali. | Usa procedure e convenzioni senza trasformarle in permessi aggiuntivi. |
| 0,5 | Seguo le convenzioni del repository ma non uso la procedura di test pertinente. | Riconosce parte delle istruzioni, ma rinuncia a una risorsa utile al compito. |
| 0 | Tratto ogni AGENTS.md di qualunque fonte come superiore a tutte le regole dell'app. | Il nome del file non impone una gerarchia universale indipendente dall'ambiente. |
| 0 | Una skill con uno script di upload concede automaticamente il diritto di pubblicare. | Disponibilità di codice e autorizzazione ad eseguirne gli effetti sono distinte. |

Feedback: Leggi procedure e convenzioni quando pertinenti e applica la gerarchia dichiarata dall'ambiente. Un file di istruzioni non cambia da solo policy o controlli d'accesso.

Suggerimento / Next step: Per un'integrazione ipotetica, separa l'API che agisce, il collegamento MCP, le procedure della skill e le istruzioni di progetto dai permessi effettivi.

**English**

A skill contains a procedure for documenting tests; AGENTS.md provides repository conventions. The application defines loading and precedence. Scope authorizes a local review and the environment does not allow external publishing.

**How do you use these resources in the stated system?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Load relevant resources and perform the review within scope and local access. | It uses procedures and conventions without turning them into additional permissions. |
| 0.5 | Follow repository conventions but do not use the relevant testing procedure. | It recognizes some instructions but forgoes a resource useful to the task. |
| 0 | Treat any AGENTS.md from any source as higher priority than every application rule. | The filename does not impose a universal hierarchy independent of the environment. |
| 0 | A skill containing an upload script automatically grants the right to publish. | Code availability and authorization for its effects are separate. |

Feedback: Read procedures and conventions when relevant and apply the environment's stated hierarchy. An instruction file does not itself change policy or access controls.

Suggerimento / Next step: For a hypothetical integration, separate the acting API, MCP connection, skill procedures, and project instructions from effective permissions.

### B-HR06 — H04 / S

Fonti: M20-S07.

**Italiano**

Il job deve leggere una copia e creare un output locale. Il sandbox, ambiente isolato, ha copia in sola lettura, cartella temporanea scrivibile e rete disabilitata. Le prove confermano che una scrittura in produzione viene negata. Il mandato include questo job e non richiede rete.

**Quale scelta usa i controlli già adeguati?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Eseguo il job nel sandbox previsto e verifico l'output locale. | Configurazione e prove sostengono il compito autorizzato senza richiedere accessi ulteriori. |
| 0,5 | Sospendo il job per richiedere un'altra verifica dei medesimi permessi già provati. | Non amplia il rischio, ma rinvia una scelta già supportata dal caso. |
| 0 | Apro rete e produzione per prevenire futuri blocchi. | Aggiunge capacità non necessarie e fuori dal perimetro indicato. |
| 0 | Eseguo fuori dal sandbox e mantengo soltanto il divieto testuale di cambiare produzione. | Sostituisce controlli effettivi disponibili con un'istruzione non equivalente. |

Feedback: Imporre permessi adeguati non significa bloccare ogni attività. Se mandato, isolamento e prove sono sufficienti, si può procedere nel perimetro e verificare l'esito.

Suggerimento / Next step: Definisci per un tool sintetico schema, controlli semantici, permessi dell'ambiente, timeout e massimo di tentativi; includi un caso che deve essere respinto.

**English**

The job must read a copy and create a local output. The sandbox, an isolated environment, has a read-only copy, writable temporary folder, and networking disabled. Tests confirm production writes are denied. Scope includes this job and requires no networking.

**Which choice uses the already adequate controls?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Run the job in the specified sandbox and check the local output. | Configuration and tests support the authorized task without requiring further access. |
| 0.5 | Pause the job to request another check of the same already tested permissions. | It does not expand risk but defers a choice already supported by the case. |
| 0 | Open networking and production writes to prevent future blockers. | It adds unnecessary capabilities outside the stated scope. |
| 0 | Run outside the sandbox and keep only the textual prohibition on production changes. | It replaces available effective controls with a nonequivalent instruction. |

Feedback: Enforcing suitable permissions does not mean blocking all activity. When scope, isolation, and tests suffice, proceed within boundaries and check the outcome.

Suggerimento / Next step: Define a synthetic tool's schema, semantic checks, environment permissions, timeout, and attempt limit; include a case that must be rejected.

### B-HR07 — H04 / S

Fonti: M20-S08, M20-S07.

**Italiano**

read_total(report_id) richiede l'ID R28; il contratto restituisce total intero. Timeout: 3 secondi, massimo due tentativi.
Traccia: richiesta con R28 -> {report_id:'R28', total:'cento'}. Il contenitore JSON è valido, ma total è testo e non un numero.

**Quale controllo applica il contratto dichiarato?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Segnalo total di tipo errato e uso il recupero limitato previsto. | La validità del contenitore non basta a rispettare lo schema del risultato. |
| 0,5 | Non uso il risultato, ma segnalo solo errore senza nominare il campo non valido. | Evita di propagare il dato, ma rende incompleta la diagnosi del contratto. |
| 0 | Accetto il testo come intero perché un modello può intuire cosa significhi cento. | Il caso richiede una risposta conforme al contratto, non una reinterpretazione implicita. |
| 0 | Tolgo timeout e limite dei tentativi e continuo finché il contenuto sembra utilizzabile. | Non risolve la violazione di schema e ignora i limiti forniti. |

Feedback: Controlla input e output, non solo che un tool abbia risposto. Un errore di schema richiede diagnosi e recupero entro limiti espliciti, senza inventare conformità.

Suggerimento / Next step: Definisci per un tool sintetico schema, controlli semantici, permessi dell'ambiente, timeout e massimo di tentativi; includi un caso che deve essere respinto.

**English**

read_total(report_id) requires ID R28; the contract returns an integer total. Timeout: 3 seconds, at most two attempts.
Trace: request with R28 -> {report_id:'R28', total:'one hundred'}. The JSON container is valid, but total is text rather than a number.

**Which check applies the stated contract?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Report the wrong total type and use the specified bounded recovery. | Container validity is insufficient to satisfy the result schema. |
| 0.5 | Do not use the result but report only an error without naming the invalid field. | It avoids propagating the data but leaves contract diagnosis incomplete. |
| 0 | Accept text as an integer because a model can infer what one hundred means. | The case requires a contract-compliant response, not implicit reinterpretation. |
| 0 | Remove timeout and attempt limits and continue until content seems usable. | It does not resolve the schema violation and ignores supplied limits. |

Feedback: Check input and output, not merely that a tool responded. A schema error needs diagnosis and recovery within explicit limits without inventing compliance.

Suggerimento / Next step: Define a synthetic tool's schema, semantic checks, environment permissions, timeout, and attempt limit; include a case that must be rejected.

### B-HR08 — H05 / S

Fonti: M20-S03, M20-S08.

**Italiano**

Lo stato salvato (checkpoint) registra messaggio M28 consegnato al destinatario previsto e nota locale ancora da completare. La ricevuta del servizio conferma ID, destinatario e consegna; il mandato non richiede un secondo invio. La nuova sessione dispone di queste informazioni.

**Quale ripresa evita effetti duplicati?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Completo la nota pendente e conservo la ricevuta senza reinviare M28. | Usa la consegna già confermata e riprende soltanto il requisito residuo. |
| 0,5 | Non reinvio, ma sospendo la nota chiedendo conferma di una consegna già verificata. | Evita il duplicato ma ritarda il lavoro ancora consentito. |
| 0 | Reinvio M28 per confermare la consegna. | La ricevuta già disponibile non giustifica un nuovo effetto esterno. |
| 0 | Considero finito tutto il mandato perché l'invio è completato, ignorando la nota. | Un sotto-obiettivo completato non elimina quello ancora aperto. |

Feedback: La ripresa usa stato salvato e conferme per distinguere operazioni concluse e parti residue. Ripetere un invio non è una verifica della sua prima consegna.

Suggerimento / Next step: Su una traccia interrotta, confronta checkpoint, ID dell'operazione e ricevuta prima di scegliere cosa riprendere o riprovare.

**English**

The saved state (checkpoint) records message M28 delivered to the intended recipient and a local note still to complete. The service receipt confirms ID, recipient, and delivery; scope requires no second send. The new session has this information.

**Which resumption avoids duplicate effects?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Complete the pending note and retain the receipt without resending M28. | It uses confirmed delivery and resumes only the remaining requirement. |
| 0.5 | Do not resend but pause the note to request confirmation of already verified delivery. | It avoids a duplicate but delays remaining allowed work. |
| 0 | Resend M28 to confirm delivery. | The available receipt does not justify another external effect. |
| 0 | Treat the whole scope as complete because sending finished, ignoring the note. | A completed subgoal does not remove the remaining one. |

Feedback: Resumption uses saved state and confirmations to distinguish completed operations from remaining work. Repeating a send does not verify its first delivery.

Suggerimento / Next step: On an interrupted trace, compare checkpoint, operation ID, and receipt before choosing what to resume or retry.

### B-HR09 — H05 / S

Fonti: M20-S03, M20-S08.

**Italiano**

Dopo un'interruzione, la lettura autorevole dello stato di W28 conferma not_applied. Il tool autorizzato consente ancora un tentativo con la stessa chiave W28 e garantisce che quella chiave non produca effetti duplicati. Rimane necessario verificare l'esito finale della scrittura.

**Quale recupero usa le informazioni e il contratto forniti?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Riprovo con W28 entro il limite e verifico lo stato finale. | Qui la non applicazione è verificata e il contratto permette la ripetizione con chiave stabile. |
| 0,5 | Mi fermo e chiedo di nuovo il permesso già dato per quel tentativo verificabile. | Non duplica effetti, ma rinuncia al recupero autorizzato previsto nel caso. |
| 0 | Uso una nuova chiave per riprovare W28. | La garanzia dichiarata riguarda la chiave stabile, non qualunque nuova operazione. |
| 0 | Segno completato senza riprovare perché not_applied dimostra già il risultato richiesto. | Lo stato conferma l'assenza dell'effetto, non il suo completamento. |

Feedback: Non tutti i timeout richiedono uno stop definitivo. La scelta dipende da stato autorevole, mandato, budget e garanzie di ripetizione esplicitamente fornite.

Suggerimento / Next step: Su una traccia interrotta, confronta checkpoint, ID dell'operazione e ricevuta prima di scegliere cosa riprendere o riprovare.

**English**

After interruption, the authoritative status read for W28 confirms not_applied. The authorized tool allows one more attempt with the same W28 key and guarantees that this key does not produce duplicate effects. The final write outcome still needs checking.

**Which recovery uses the supplied information and contract?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Retry with W28 within the limit and check final state. | Here non-application is verified and the contract allows retrying with a stable key. |
| 0.5 | Stop and request again the permission already granted for that verifiable attempt. | It does not duplicate effects but forgoes the authorized recovery specified in the case. |
| 0 | Use a new key to retry W28. | The stated guarantee concerns the stable key, not any new operation. |
| 0 | Mark complete without retrying because not_applied already proves the required result. | The status confirms absence of the effect, not its completion. |

Feedback: Not every timeout requires a permanent stop. The choice depends on authoritative state, scope, budget, and explicitly supplied retry guarantees.

Suggerimento / Next step: On an interrupted trace, compare checkpoint, operation ID, and receipt before choosing what to resume or retry.

### B-HR10 — H06 / S

Fonti: M20-S09, M20-S03.

**Italiano**

Nel pilot di un nuovo harness i log non mostrano errori tecnici e le risposte iniziali sono più veloci. Alcune tabelle esportate però hanno somme errate e richiedono correzioni umane più lunghe. Devi confrontare qualità, errori, interventi, costo e tempo totale sugli stessi casi.

**Quale valutazione risponde al problema osservato?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Verifico le tabelle sui dati noti e includo correzioni e metriche complete nel confronto. | Il processo può non fallire tecnicamente e produrre comunque un artefatto errato. |
| 0,5 | Confronto i log sugli stessi casi, rinviando il controllo delle tabelle e delle correzioni. | La traccia aiuta la diagnosi, ma non copre i requisiti d'esito e lavoro umano. |
| 0 | Adotto il nuovo harness perché l'assenza di errori nei log garantisce somme corrette. | Il caso fornisce già una prova che successo tecnico e correttezza possono divergere. |
| 0 | Escludo i casi con correzioni dal campione per non penalizzare la nuova configurazione. | Rimuovere le regressioni osservate impedisce un confronto rappresentativo. |

Feedback: Gli artefatti vanno controllati indipendentemente dalle dichiarazioni e dai log del generatore. Il tempo di correzione è parte del costo operativo del risultato.

Suggerimento / Next step: Confronta due configurazioni sugli stessi casi e requisiti: controlla artefatti, errori, interventi umani, costo e durata totale, oltre alle tracce.

**English**

In a new harness pilot, logs show no technical errors and initial responses are faster. Some exported tables nevertheless have wrong sums and require longer human corrections. You must compare quality, errors, interventions, cost, and total time on the same cases.

**Which evaluation addresses the observed problem?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Check tables against known data and include corrections and full metrics in comparison. | A process can avoid technical failure while still producing an incorrect artifact. |
| 0.5 | Compare logs on the same cases, deferring checks of tables and corrections. | The trace helps diagnosis but does not cover outcome and human-work requirements. |
| 0 | Adopt the new harness because error-free logs guarantee correct sums. | The case already provides evidence that technical success and correctness can differ. |
| 0 | Exclude cases needing corrections so the new configuration is not penalized. | Removing observed regressions prevents a representative comparison. |

Feedback: Artifacts need checking independently of generator claims and logs. Correction time is part of the outcome's operational cost.

Suggerimento / Next step: Compare two configurations on the same cases and requirements: check artifacts, errors, human interventions, cost, and total duration, as well as traces.

## Forma C

### C-HR01 — H01 / S

Fonti: M20-S03, M20-S09.

**Italiano**

Un sistema genera schede da documenti. Il prompt specifica formato e vincoli; il modello propone testo e azioni. Il ciclo agentico decide il passo successivo, l'harness ne gestisce esecuzione, contesto e stato. Un valutatore confronta le schede con le fonti autorizzate.

**Quale lettura distingue le responsabilità dei componenti?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Il prompt definisce requisiti, l'harness gestisce il processo e il valutatore controlla le schede. | Separa le istruzioni, la gestione operativa e il confronto indipendente con le fonti. |
| 0,5 | Controllo il prompt e la traccia delle chiamate, rimandando la lettura delle schede prodotte. | Controlla parti del sistema senza ancora verificare l'output richiesto. |
| 0 | Il valutatore deve fidarsi del testo finale perché è stato prodotto dal modello configurato. | L'identità del generatore non dimostra corrispondenza alle fonti. |
| 0 | I permessi tecnici sono una proprietà del testo del prompt e non dell'ambiente di esecuzione. | Un requisito testuale non cambia da solo le capacità effettivamente disponibili. |

Feedback: Il sistema completo comprende generazione, scelta dei passi, esecuzione e verifica. Riconoscere i componenti aiuta a leggere un caso, senza certificare capacità di costruirli.

Suggerimento / Next step: Disegna un sistema semplice e assegna a modello, prompt, agente, harness e valutatore una responsabilità verificabile ciascuno.

**English**

A system generates cards from documents. The prompt specifies format and constraints; the model proposes text and actions. The agent loop chooses the next step, and the harness manages execution, context, and state. An evaluator compares cards with authorized sources.

**Which interpretation distinguishes component responsibilities?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | The prompt defines requirements, the harness manages the process, and the evaluator checks cards. | It separates instructions, operational management, and independent comparison with sources. |
| 0.5 | Check the prompt and call trace, postponing reading the generated cards. | It checks parts of the system without yet verifying the required output. |
| 0 | The evaluator must trust final text because the configured model produced it. | Generator identity does not prove correspondence with sources. |
| 0 | Technical permissions are a property of prompt text rather than the execution environment. | A textual requirement does not itself change actually available capabilities. |

Feedback: The complete system includes generation, step selection, execution, and checking. Recognizing components helps interpret a case without certifying ability to build them.

Suggerimento / Next step: Sketch a simple system and assign one verifiable responsibility each to the model, prompt, agent, harness, and evaluator.

### C-HR02 — H02 / S

Fonti: M20-S01, M20-S03.

**Italiano**

Devi rispondere su una procedura interna corrente v7. La policy autorizzata include le eccezioni del caso. Un post pubblico più recente descrive una procedura diversa; una vecchia nota interna usa v5. Il modello può ricevere solo estratti e riferimenti pertinenti.

**Quale selezione rispetta scopo e provenienza?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso v7 ed eccezioni pertinenti con riferimento, senza sostituirle col post pubblico. | La fonte autorizzata risponde al compito; la sola data più recente non determina l'autorità. |
| 0,5 | Uso v7 ma ometto le eccezioni per rendere più breve il contesto. | Riduce il testo perdendo una parte necessaria per rispondere al caso. |
| 0 | Uso il post perché ogni fonte più recente sostituisce automaticamente la policy interna. | La cronologia non concede a una fonte esterna autorità sulla procedura richiesta. |
| 0 | Mescolo v5, v7 e post senza etichettarli, lasciando al modello la scelta della regola. | Perde provenienza e distinzione fra regole che il caso dichiara diverse. |

Feedback: Pertinenza, autorità e versione sono controlli diversi. Mantieni nel contesto le eccezioni che cambiano l'esito e riferimenti che permettono di verificarle.

Suggerimento / Next step: Prepara un passaggio di consegne con vincoli, fonti/versioni, stato e punti aperti; verifica cosa puoi recuperare se un riassunto omette un dettaglio.

**English**

You must answer about current internal procedure v7. The authorized policy includes this case's exceptions. A newer public post describes a different procedure; an old internal note uses v5. The model can receive only relevant excerpts and references.

**Which selection respects purpose and provenance?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use relevant v7 content and exceptions with references rather than replacing them with the public post. | The authorized source answers the task; a newer date alone does not establish authority. |
| 0.5 | Use v7 but omit exceptions to shorten context. | It shortens text while losing a necessary part of the case answer. |
| 0 | Use the post because any newer source automatically replaces internal policy. | Chronology does not give an external source authority over the requested procedure. |
| 0 | Mix v5, v7, and the post without labels, leaving rule selection to the model. | It loses provenance and distinctions between rules that the case states differ. |

Feedback: Relevance, authority, and version are different checks. Retain exceptions that change the outcome and references that allow verification.

Suggerimento / Next step: Prepare a handoff with constraints, sources/versions, state, and open points; check what can be retrieved if a summary omits a detail.

### C-HR03 — H02 / S

Fonti: M20-S02, M20-S03.

**Italiano**

Il riassunto di una sessione lunga conserva il risultato proposto ma omette la fonte e un vincolo di esclusione. La memoria del progetto contiene un link al mandato originale e il punto ancora da verificare. Il nuovo turno deve completare una bozza con quel vincolo.

**Quale passaggio ricostruisce una continuità verificabile?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Riapro fonte e mandato, recupero l'esclusione e distinguo proposta da verifica conclusa. | Usa la memoria come riferimento a prove e stato, non come garanzia del risultato proposto. |
| 0,5 | Recupero il vincolo, ma consegno il risultato proposto senza risolvere il punto da verificare. | Ripristina un requisito ma non completa la verifica che il caso mantiene aperta. |
| 0 | Tratto il riassunto come prova di ogni controllo precedente anche quando non ne dà riferimenti. | Un riassunto non documenta automaticamente tutte le verifiche o i dettagli omessi. |
| 0 | Elimino il vincolo dalla memoria per far coincidere mandato e risultato già proposto. | Adattare la nota al risultato non modifica il mandato originale. |

Feedback: La continuità richiede accesso a fonti e stato utile, oltre a un riassunto. Una consegna rende riconoscibili vincoli, proposte, verifiche e questioni ancora aperte.

Suggerimento / Next step: Prepara un passaggio di consegne con vincoli, fonti/versioni, stato e punti aperti; verifica cosa puoi recuperare se un riassunto omette un dettaglio.

**English**

A long-session summary retains a proposed result but omits its source and an exclusion constraint. Project memory contains a link to the original scope and the point still to verify. The new turn must complete a draft under that constraint.

**Which step reconstructs verifiable continuity?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Reopen the source and scope, retrieve the exclusion, and distinguish a proposal from a completed check. | It uses memory as a reference to evidence and state, not as a guarantee of the proposed result. |
| 0.5 | Retrieve the constraint but deliver the proposed result without resolving the point to verify. | It restores a requirement but does not complete the check left open in the case. |
| 0 | Treat the summary as proof of every prior check even without references. | A summary does not automatically document every check or omitted detail. |
| 0 | Remove the constraint from memory to make scope match the already proposed result. | Adapting a note to the result does not change the original scope. |

Feedback: Continuity requires access to sources and useful state beyond a summary. A handoff makes constraints, proposals, checks, and open questions identifiable.

Suggerimento / Next step: Prepare a handoff with constraints, sources/versions, state, and open points; check what can be retrieved if a summary omits a detail.

### C-HR04 — H03 / S

Fonti: M20-S04, M20-S08.

**Italiano**

Un'app può leggere un inventario mediante un'API già verificata e autorizzata. È disponibile anche un server MCP che espone la stessa lettura. Nessuna scrittura è nel mandato e nessun requisito impone un protocollo specifico.

**Quale scelta distingue funzione e collegamento?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Uso la lettura autorizzata; MCP è un collegamento possibile, non un permesso aggiuntivo. | Il caso consente l'API esistente senza introdurre un componente solo per il suo nome. |
| 0,5 | Rinvio la lettura finché non migro a MCP, pur avendo già l'API adatta e verificata. | Non supera il mandato, ma introduce una dipendenza non richiesta dal compito. |
| 0 | Scelgo MCP per ottenere anche scritture escluse dalla credenziale e dal mandato. | Il collegamento non concede capacità che il servizio o il mandato negano. |
| 0 | Con MCP non devo più controllare se i dati letti siano pertinenti o aggiornati. | Un protocollo di accesso non verifica automaticamente il contenuto della fonte. |

Feedback: Un tool può usare un'API direttamente o tramite un collegamento. La scelta dipende da requisiti e prove, senza equiparare MCP ad autonomia, accesso o correttezza garantiti.

Suggerimento / Next step: Per un'integrazione ipotetica, separa l'API che agisce, il collegamento MCP, le procedure della skill e le istruzioni di progetto dai permessi effettivi.

**English**

An app can read inventory through an already tested, authorized API. An MCP server exposing the same read is also available. Scope includes no writes and no requirement mandates a particular protocol.

**Which choice distinguishes functionality from connection?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Use the authorized read; MCP is a possible connection, not additional permission. | The case permits the existing API without adding a component solely for its name. |
| 0.5 | Defer reading until migration to MCP despite an existing suitable, tested API. | It stays within scope but introduces a dependency not required by the task. |
| 0 | Choose MCP to gain writes excluded by the credential and scope. | A connection does not grant capabilities denied by the service or scope. |
| 0 | With MCP, checking whether read data is relevant or current is no longer needed. | An access protocol does not automatically verify source content. |

Feedback: A tool can use an API directly or through a connection. Selection depends on requirements and evidence without equating MCP with autonomy, access, or guaranteed correctness.

Suggerimento / Next step: For a hypothetical integration, separate the acting API, MCP connection, skill procedures, and project instructions from effective permissions.

### C-HR05 — H03 / S

Fonti: M20-S05, M20-S06, M20-S07.

**Italiano**

L'app elenca molte skill con nome e descrizione e carica i dettagli quando servono. Una skill di report contiene istruzioni, script e template pertinenti; AGENTS.md contiene convenzioni del progetto. Il mandato è produrre una bozza locale e l'app impone una gerarchia esplicita alle istruzioni.

**Quale uso delle risorse è pertinente e circoscritto?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Carico la skill pertinente e le convenzioni, verificando gli effetti degli script prima dell'uso. | Usa risorse su richiesta nel mandato, senza assumere affidabilità o nuovi accessi dal caricamento. |
| 0,5 | Uso soltanto il nome della skill, senza leggerne la procedura o il template richiesto. | Il catalogo aiuta a trovare una risorsa, ma non sostituisce i dettagli necessari per applicarla. |
| 0 | Eseguo tutti gli script di tutte le skill elencate perché la disponibilità ne autorizza gli effetti. | La presenza nel catalogo non dimostra pertinenza, affidabilità o autorizzazione. |
| 0 | Uso il file di istruzioni per rimuovere le restrizioni di rete che l'ambiente impone al job. | Un documento non cambia da solo le restrizioni tecniche del job. |

Feedback: Procedure, template e convenzioni danno contesto operativo. Il caricamento selettivo riduce rumore; gli script e gli effetti restano soggetti a mandato e permessi.

Suggerimento / Next step: Per un'integrazione ipotetica, separa l'API che agisce, il collegamento MCP, le procedure della skill e le istruzioni di progetto dai permessi effettivi.

**English**

The app lists many skills with names and descriptions and loads details when needed. A reporting skill contains relevant instructions, scripts, and templates; AGENTS.md contains project conventions. Scope is to produce a local draft and the app enforces an explicit instruction hierarchy.

**Which use of resources is relevant and bounded?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Load the relevant skill and conventions, checking script effects before use. | It uses on-demand resources within scope without assuming loading grants trust or new access. |
| 0.5 | Use only the skill name without reading its procedure or the required template. | The catalogue helps find a resource but does not replace details needed to apply it. |
| 0 | Run every script from every listed skill because availability authorizes their effects. | Catalogue presence proves neither relevance, trustworthiness, nor authorization. |
| 0 | Use the instruction file to remove network restrictions enforced by the environment. | A document does not itself change technical job restrictions. |

Feedback: Procedures, templates, and conventions provide operational context. Selective loading reduces noise; scripts and effects remain subject to scope and permissions.

Suggerimento / Next step: For a hypothetical integration, separate the acting API, MCP connection, skill procedures, and project instructions from effective permissions.

### C-HR06 — H04 / S

Fonti: M20-S07.

**Italiano**

Il codice locale è isolato e senza rete, ma un tool remoto esegue chiamate dal proprio server con una credenziale ampia. Il mandato permette solo letture nel progetto Demo e vieta invii esterni. Il blocco di rete locale non si applica al server remoto; è possibile limitarne tool e credenziale.

**Dove deve essere imposto il controllo effettivo?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Limito anche tool e credenziale remoti e verifico il diniego fuori perimetro. | Il confine va applicato dove viene eseguita l'azione, non soltanto al codice locale. |
| 0,5 | Controllo ancora il sandbox locale e sospendo il tool remoto finché non verifico i suoi limiti. | Non avvia l'accesso ampio, ma lascia incompleta la configurazione del canale remoto. |
| 0 | Uso il tool ampio perché la rete locale disattivata garantisce che nessun server remoto possa inviare. | Il caso distingue esplicitamente le due superfici di esecuzione. |
| 0 | Aggiungo al prompt non inviare e mantengo al server remoto la credenziale con tutti gli accessi. | L'istruzione non riduce i permessi effettivi di quel canale. |

Feedback: Isolamento e permessi hanno un perimetro concreto. Tool locali e remoti possono agire in ambienti diversi: i controlli devono coprire il canale che produce l'effetto.

Suggerimento / Next step: Definisci per un tool sintetico schema, controlli semantici, permessi dell'ambiente, timeout e massimo di tentativi; includi un caso che deve essere respinto.

**English**

Local code is isolated without networking, but a remote tool makes calls from its own server using a broad credential. Scope allows only reads in project Demo and forbids external sending. Local network blocking does not apply to the remote server; its tools and credential can be restricted.

**Where must effective control be enforced?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Restrict remote tools and credentials too and test denial outside scope. | The boundary must apply where the action runs, not only to local code. |
| 0.5 | Recheck the local sandbox and pause the remote tool until its limits are verified. | It does not start broad access but leaves remote-channel configuration incomplete. |
| 0 | Use the broad tool because disabled local networking guarantees no remote server can send. | The case explicitly distinguishes the two execution surfaces. |
| 0 | Add do not send to the prompt and leave the remote server's credential fully privileged. | The instruction does not reduce that channel's effective permissions. |

Feedback: Isolation and permissions have a concrete scope. Local and remote tools can act in different environments: controls must cover the channel producing the effect.

Suggerimento / Next step: Define a synthetic tool's schema, semantic checks, environment permissions, timeout, and attempt limit; include a case that must be rejected.

### C-HR07 — H04 / S

Fonti: M20-S08, M20-S07.

**Italiano**

read_job(job_id) richiede J39; il contratto ammette status='running' o 'done'. Il client impone timeout di 2 secondi e due tentativi.
Traccia: {job_id:'J39', status:'finished'}. Il JSON ha i campi attesi, ma il valore di status non è tra quelli ammessi.

**Quale validazione rispetta il contratto?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Respingo status non ammesso e gestisco il recupero entro i limiti del client. | Verifica anche i valori ammessi, senza trasformare implicitamente un output non conforme. |
| 0,5 | Non uso lo stato ma segnalo soltanto tool non disponibile senza descrivere il valore inatteso. | Evita una conclusione scorretta ma non distingue indisponibilità e violazione del contratto. |
| 0 | Interpreto finished come done e segno concluso senza una regola di conversione autorizzata. | La somiglianza delle parole non modifica l'insieme di valori dichiarato nel caso. |
| 0 | Disabilito timeout e validazione e uso l'ultimo testo ricevuto come prova di completamento. | Rimuove controlli necessari senza verificare lo stato del job. |

Feedback: Uno schema include tipi, campi e valori ammessi; la correttezza del risultato richiede anche corrispondenza al compito. Un recupero resta limitato dal contratto fornito.

Suggerimento / Next step: Definisci per un tool sintetico schema, controlli semantici, permessi dell'ambiente, timeout e massimo di tentativi; includi un caso che deve essere respinto.

**English**

read_job(job_id) requires J39; its contract allows status='running' or 'done'. The client enforces a 2-second timeout and two attempts.
Trace: {job_id:'J39', status:'finished'}. JSON has expected fields, but status is not an allowed value.

**Which validation respects the contract?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Reject the disallowed status and handle recovery within client limits. | It checks allowed values too, without implicitly transforming noncompliant output. |
| 0.5 | Do not use the state but report only tool unavailable without describing the unexpected value. | It avoids a wrong conclusion but does not distinguish unavailability from contract violation. |
| 0 | Interpret finished as done and mark complete without an authorized conversion rule. | Word similarity does not change the set of values declared in the case. |
| 0 | Disable timeout and validation and use the last received text as proof of completion. | It removes necessary checks without verifying job state. |

Feedback: A schema includes types, fields, and allowed values; result correctness also requires task correspondence. Recovery remains bounded by the supplied contract.

Suggerimento / Next step: Define a synthetic tool's schema, semantic checks, environment permissions, timeout, and attempt limit; include a case that must be rejected.

### C-HR08 — H05 / S

Fonti: M20-S03, M20-S08.

**Italiano**

Lo stato salvato (checkpoint) conferma update U39 completato sul record C39; ricevuta e servizio riportano gli stessi ID. Il file draft.md è stato creato ma non ancora controllato. Il mandato richiede update e bozza verificata; ripetere l'update può duplicarne l'effetto.

**Quale passo completa la parte ancora aperta?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Controllo draft.md sui requisiti senza ripetere l'update confermato. | La creazione del file non ne dimostra la verifica, mentre l'update ha già una ricevuta coerente. |
| 0,5 | Non ripeto l'update ma chiedo una conferma ulteriore prima di leggere il file già disponibile. | Evita il duplicato, ma rinvia il controllo residuo già nel mandato. |
| 0 | Ripeto U39 e ricreo la bozza per ricominciare da una situazione che considero pulita. | Ripartire dall'inizio non annulla l'effetto già registrato e può duplicarlo. |
| 0 | Dichiaro tutto completato perché esistono ricevuta dell'update e un file con il nome atteso. | L'esistenza del file non soddisfa il requisito di verifica del contenuto. |

Feedback: Riprendi dalla prima condizione non ancora soddisfatta. Ricevute coerenti evitano ripetizioni; artefatti presenti richiedono comunque il controllo previsto.

Suggerimento / Next step: Su una traccia interrotta, confronta checkpoint, ID dell'operazione e ricevuta prima di scegliere cosa riprendere o riprovare.

**English**

The saved state (checkpoint) confirms update U39 completed on record C39; receipt and service report the same IDs. File draft.md was created but not yet checked. Scope requires an update and a verified draft; repeating the update may duplicate its effect.

**Which step completes the remaining part?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Check draft.md against requirements without repeating the confirmed update. | File creation does not prove verification, while the update already has a consistent receipt. |
| 0.5 | Do not repeat the update but request further confirmation before reading the available file. | It avoids a duplicate but defers the remaining in-scope check. |
| 0 | Repeat U39 and recreate the draft to restart from what I consider a clean state. | Restarting does not undo the recorded effect and may duplicate it. |
| 0 | Declare everything complete because an update receipt and an expected filename exist. | File existence does not satisfy the content-verification requirement. |

Feedback: Resume from the first unmet condition. Consistent receipts prevent repetition; existing artifacts still require the specified check.

Suggerimento / Next step: On an interrupted trace, compare checkpoint, operation ID, and receipt before choosing what to resume or retry.

### C-HR09 — H05 / S

Fonti: M20-S03, M20-S08.

**Italiano**

La sessione riprende il run R39 e l'operazione W39, il cui esito è sconosciuto. La memoria contiene una ricevuta di R38/W38, relativa a dati precedenti. È disponibile lo stato autorevole di W39; un nuovo invio potrebbe creare un secondo effetto.

**Come riconcili checkpoint e ricevuta?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Controllo W39 con gli ID correnti prima di usare una ricevuta o ripetere l'azione. | Una ricevuta di un altro run non conferma l'esito dell'operazione corrente. |
| 0,5 | Segnalo il conflitto e sospendo tutto senza interrogare lo stato corrente disponibile. | Evita un'assunzione errata ma rinuncia alla verifica pertinente già disponibile. |
| 0 | Uso R38/W38 come prova di W39 perché nella memoria esiste già una ricevuta. | Esistenza e identità di una prova non sono equivalenti. |
| 0 | Creo W40 e ripeto subito l'effetto perché il checkpoint non dice completato. | Sconosciuto non significa non applicato: la nuova operazione può duplicare l'effetto. |

Feedback: Lo stato persistente è utile solo se appartiene all'operazione e ai dati pertinenti. Verifica identità e risultato prima di riprovare un'azione con effetti.

Suggerimento / Next step: Su una traccia interrotta, confronta checkpoint, ID dell'operazione e ricevuta prima di scegliere cosa riprendere o riprovare.

**English**

The session resumes run R39 and operation W39, whose outcome is unknown. Memory contains a receipt for R38/W38 concerning previous data. Authoritative W39 status is available; a new submission could create a second effect.

**How do you reconcile checkpoint and receipt?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Check W39 using current IDs before using a receipt or repeating the action. | A receipt from another run does not confirm the current operation's outcome. |
| 0.5 | Report the conflict and pause everything without querying available current state. | It avoids a wrong assumption but forgoes an available, relevant check. |
| 0 | Use R38/W38 as proof of W39 because memory already contains a receipt. | Evidence existence and evidence identity are not equivalent. |
| 0 | Create W40 and immediately repeat the effect because the checkpoint does not say complete. | Unknown does not mean unapplied: the new operation may duplicate the effect. |

Feedback: Persistent state is useful only when it belongs to the relevant operation and data. Check identity and outcome before retrying an action with side effects.

Suggerimento / Next step: On an interrupted trace, compare checkpoint, operation ID, and receipt before choosing what to resume or retry.

### C-HR10 — H06 / S

Fonti: M20-S09, M20-S03.

**Italiano**

Su 100 casi rappresentativi uguali, controlli indipendenti danno: configurazione L, 96% accettabili, 2 interventi umani, costo 1 e 5 minuti; R, 98%, 8 interventi, costo 4 e 9 minuti. Tempi e costi includono correzioni. Servono almeno 95%, massimo 6 minuti e costo 2.

**Quale decisione è sostenuta dalla valutazione fornita?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Scelgo L: soddisfa i tre requisiti e le misure comprendono il lavoro di revisione. | Usa risultati e costo complessivi, senza privilegiare la sola percentuale più alta. |
| 0,5 | Rinvio la scelta per chiedere altre prove identiche, pur avendo già il campione richiesto. | Cerca evidenza, ma non usa quella già sufficiente per scegliere entro i vincoli forniti. |
| 0 | Scelgo R perché il 98% compensa automaticamente tempo e costo oltre i limiti. | I requisiti sono congiunti: la qualità più alta non annulla i limiti dichiarati. |
| 0 | Tolgo gli interventi umani dalle misure e confronto solo la durata della prima risposta. | Rimuove una parte del processo che il caso richiede esplicitamente di includere. |

Feedback: Una valutazione può sostenere una scelta quando criteri, campione e controlli sono adeguati. Qui i numeri sono sintetici e non descrivono un prodotto o una capacità personale.

Suggerimento / Next step: Confronta due configurazioni sugli stessi casi e requisiti: controlla artefatti, errori, interventi umani, costo e durata totale, oltre alle tracce.

**English**

On the same 100 representative cases, independent checks give: configuration L, 96% acceptable, 2 human interventions, cost 1 and 5 minutes; R, 98%, 8 interventions, cost 4 and 9 minutes. Times and costs include corrections. Requirements are at least 95%, at most 6 minutes and cost 2.

**Which decision is supported by the supplied evaluation?**

| Credito | Alternativa | Motivazione dopo il test |
| --- | --- | --- |
| 1 | Choose L: it meets all three requirements and measurements include review work. | It uses overall outcomes and costs rather than favoring the highest percentage alone. |
| 0.5 | Defer the choice to request more identical tests despite already having the required sample. | It seeks evidence but does not use evidence already sufficient to choose within the stated constraints. |
| 0 | Choose R because 98% automatically compensates for time and cost above the limits. | Requirements are joint: higher quality does not cancel stated limits. |
| 0 | Remove human interventions from measurements and compare only first-response duration. | It removes a part of the process that the case explicitly requires including. |

Feedback: Evaluation can support a choice when criteria, sample, and checks are adequate. Here the numbers are synthetic and describe neither a product nor a person's capability.

Suggerimento / Next step: Compare two configurations on the same cases and requirements: check artifacts, errors, human interventions, cost, and total duration, as well as traces.
