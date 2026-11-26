# Design QA - M14 landing refinements

Nota M20 (`2026-11-25`): aggiunti il tredicesimo percorso Harness, descrizione/guida bilingue e nove fonti primarie. Contesti con tracce e suggerimenti usano markup e stili delle M18/M19; nessun nuovo CSS o media esterno. Avvio, navigazione, risultati e bibliografia verificati con adattatore DOM. Il tentativo Browser sul file locale restituisce «No browser is available» e l'elenco dei browser è vuoto: non sono attestati layout desktop/mobile, disposizione dei tredici indicatori, interazioni/download reali, console e traffico. Il maintainer ha approvato la M20 e la release `v3.3.0`, senza riportare gli esiti dettagliati della checklist manuale; le immagini M14 non attestano la UI 3.3.0. Checklist in [docs/SCORING.md](docs/SCORING.md).

Nota M19 (`2026-11-25`): aggiornati descrizione/durata del percorso Agents, contesti con tracce, suggerimenti salvati nei risultati e sezione fonti bilingue. Il carosello conserva dodici percorsi. Le tracce usano il paragrafo con nuove righe già introdotto in M18; nessun nuovo CSS, media o contenuto remoto automatico. Markup/eventi verificati con adattatore DOM. Il tentativo di apertura del file locale nel runtime Browser restituisce «No browser is available»: non sono attestati layout desktop/mobile, interazioni reali, download, console e traffico. Il maintainer ha approvato la M19 e la release `v3.2.0`, senza riportare gli esiti dettagliati della checklist manuale; le immagini M14 non attestano la UI 3.2.0. Checklist in [docs/SCORING.md](docs/SCORING.md).

Nota M18 (`2026-11-25`): aggiunti il dodicesimo percorso del carosello, il contesto degli scenari sopra la domanda, motivazioni nei risultati e fonti bilingui in bibliografia. Nessuna nuova immagine o risorsa esterna automatica. Markup ed eventi sono verificati con adattatore DOM; il runtime Browser continua a non avere browser disponibili. Non sono stati verificati visivamente i dodici indicatori, la leggibilità dei contesti o le nuove sezioni desktop/mobile. Il maintainer ha approvato la M18 e la release `v3.1.0`, senza riportare gli esiti dettagliati della checklist manuale; le immagini M14 non attestano la UI 3.1.0. Checklist corrente in [docs/SCORING.md](docs/SCORING.md).

Nota M17 (`2026-11-25`): le schermate e le verifiche sotto sono evidenze storiche della M14. La M17 aggiorna testi della landing e dashboard con il quadro delle evidenze; non è stato possibile eseguire QA visiva perché il runtime Browser non dispone di un browser. Le verifiche del markup e degli eventi con adattatore DOM non sostituiscono il controllo visivo desktop/mobile. Il maintainer ha approvato la milestone e la release `v3.0.0`, senza riportare gli esiti dettagliati della checklist manuale. Checklist corrente in [docs/SCORING.md](docs/SCORING.md).

- Source visual truth: `/Users/gloutchov/Desktop/Screenshot 2026-07-11 alle 14.54.24.png`
- Final desktop implementation: `docs/design-qa/m14-landing-desktop.png`
- Mobile implementation: `docs/design-qa/m14-landing-mobile.png`
- Desktop viewport: 1440 x 1200
- Mobile viewport: 390 x 844
- State: landing, Italian, carousel visible

## Full-view comparison evidence

The source showed the existing landing with carousel indicators wrapping onto a second line. The revised implementation preserves the established typography, indigo/teal palette, card radii, controls, and carousel structure. A compact teal callout has been intentionally added above the carousel content, as requested. The carousel card was compacted to offset the new callout, and all eleven indicators remain on one line.

## Focused-region evidence

The focused comparison concerned the carousel footer and new novice callout. Desktop evidence shows a single unbroken indicator row with the explanatory copy retaining its own space. Mobile evidence shows the callout stacked vertically, a readable CTA, no horizontal clipping, and the carousel continuing below it. No separate image assets or icons were introduced.

## Findings and comparison history

- P2 resolved: carousel indicators wrapped in the source screenshot.
  - Fix: `flex-wrap: nowrap`, non-shrinking indicator container, and compact carousel spacing.
  - Post-fix evidence: final desktop screenshot shows every indicator on one line.
- P2 resolved: adding a novice promotion could have made the carousel substantially taller.
  - Fix: compact callout plus reduced carousel frame margin, card padding, fact padding, and internal vertical gaps.
  - Post-fix evidence: the callout and complete mode information remain visible together at the target desktop viewport.
- P2 resolved: a new generic green would have drifted from the product palette.
  - Fix: existing teal/cyan family used for border, background, badge, and CTA.
- P2 resolved: ASCII approximations of Italian accents reduced copy quality.
  - Fix: visible Italian strings and their Markdown source were normalized to Unicode accents; the generated learning asset was rebuilt.

## Required fidelity surfaces

- Fonts and typography: existing families, weights, hierarchy, wrapping, and antialiasing preserved; callout uses the established scale.
- Spacing and layout rhythm: callout and carousel compaction balance each other; indicators no longer wrap; mobile stacks without overflow.
- Colors and visual tokens: callout reuses the existing teal/cyan accent and indigo context rather than adding a foreign green.
- Image quality and asset fidelity: no new raster, placeholder, SVG, or substitute asset was required.
- Copy and content: accents corrected; novice promise is concise and consistent with the implemented learning path.

## Primary interactions and console

- Novice CTA selects `first-steps` and opens the profile step.
- Carousel controls and indicators remain interactive.
- Desktop and mobile layouts inspected.
- Browser console: zero errors and zero warnings.

## Follow-up polish

No remaining P0, P1, or P2 findings. Minor P3 spacing adjustments can be considered after broader device testing.

final result: passed


## M21 — Operational lab, release 3.4.0 (2026-11-25)

Questa nota riguarda il nuovo laboratorio; il precedente “passed” descrive soltanto la revisione storica delle schermate allora disponibili. Il maintainer ha approvato la chiusura M21 e la release v3.4.0 il 2026-11-25, senza riportare gli esiti dettagliati della checklist manuale.

Due casi, sei decisioni E, forme A/B/C IT/EN: registro con alternativa testuale completa, calcolatore numerico, anteprima dell'artefatto e conferma esplicita; mandato/checkpoint/ricevuta, bozza generata e registro degli effetti simulati. Nessun drag, controlli nativi etichettati e raggruppati con fieldset/legend, focus dopo conferma/navigazione. Nessuna auto-advance; report e rubriche solo dopo il completamento. Carosello con quattordici percorsi, Practical Lab distinto da Laboratorio operativo.

La home espone recupero/eliminazione della singola bozza locale. Lo step dati spiega salvataggio, eliminazione e limiti di storage. Gli errori di persistenza hanno un messaggio stabile e un toast; nessun pannello fisso copre i pulsanti. Il report separa Q/D/T/E, spiega i crediti e mette in evidenza le azioni critiche; nessuna qualifica operativa.

La skill Browser è stata applicata; discovery dopo troubleshooting restituisce nessun browser disponibile. Verificati markup ed eventi con un adattatore DOM, senza affermare verifica visiva. Desktop/mobile, rendering dei controlli nativi, focus effettivo e screen reader, download e stampa reali, console e richieste di rete non sono attestati dalla verifica dell’agente; l’approvazione del maintainer non contiene esiti dettagliati di questi controlli. [Checklist concreta IT/EN, corretta e critica](docs/OPERATIONAL_LAB_REVIEW.md#validazione-del-maintainer-prima-del-commit).


## M22 — release 3.5.0 approvata (2026-11-26)

Il completo presenta 50 unità, distribuzione primaria F/U/A/H 12/16/12/10 e due casi inclusi nel conteggio. Quiz e varianti restano nei blocchi di area; K1/K2 sono gli ultimi due blocchi e il contatore distingue unità/caso. L'inversione verifica/calcolo di K1 preserva gli altri 44 item; la consegna richiede riconferma dopo una modifica. Le azioni simulate restano esplicite, con Avanti obbligatorio e feedback solo dopo il completamento.

Completo e laboratorio condividono una sola bozza locale: messaggio di recupero con lingua/forma e assenza di dati iniziali del profilo, conferma prima della sostituzione, errori di storage visibili. Il report mostra le criticità E già nell'introduzione, separandole dai punteggi Q. UI IT/EN, descrizioni, durata qualificata come stima da verificare, nota privacy e bibliografia aggiornate; nessun cambiamento al percorso Primi passi.

Verificati flussi e contenuti con adattatore DOM e regressioni automatiche; nessuna verifica visiva attestata. La skill Browser, dopo troubleshooting, restituisce elenco vuoto. Desktop/mobile, focus reale, tastiera e screen reader, zoom, download/stampa, console e traffico restano da verificare nella [checklist corrente](docs/QA.md). Il maintainer ha approvato M22 e la release v3.5.0 il 2026-11-26, autorizzando commit, merge, tag, push e rimozione del branch; non ha riportato gli esiti manuali dettagliati o tempi umani. La durata resta una stima da verificare; i precedenti “passed” e le approvazioni M21 descrivono soltanto revisioni storiche.
