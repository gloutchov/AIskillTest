# Mappa degli item attuali per il blueprint

- Baseline: app `2.4.1`, banca `2026.07-m7`, forma `1.3`.
- Revisione: `2026-11-25`; mappa dei 115 item approvata nella milestone 16, estesa con MA01–MA10 nella M18 approvata; AW01–AW10 nella M19 approvata; HR01–HR10 aggiunti nella M20 approvata dal maintainer; blueprint `1.0.0`.
- Contratto e definizioni: [ASSESSMENT_BLUEPRINT.md](../ASSESSMENT_BLUEPRINT.md).

La tabella classifica tutti i 145 `sourceId` di `baseQuestions`, ciascuno una sola volta. È implementata nei metadati JavaScript e non assegna retroattivamente punteggi ai report storici. Il widget attuale è mantenuto come informazione tecnica; il tipo di evidenza dipende dal compito. Tutti i multi/choice attuali sono Q, nessuno è un esercizio E.

Le righe valgono come mappa degli obiettivi comuni per le forme A/B/C e le traduzioni IT/EN. Gli override attuali richiedono revisione editoriale quando si riusano gli item: la classificazione non dimostra equivalenza di difficoltà. Non si assegna automaticamente un nuovo slot C01-C50 a un vecchio ID.

Q = conoscenze/scenari; D = pratiche dichiarate; T = testo con feedback. Area e obiettivo sono primari; i tag non aggiungono punti. Il livello B/O/S descrive il compito, non la persona. La modalità attuale resta separata dall'area: AG12 e AG9/AG13, per esempio, sono item storici della sezione Agents con area primaria H; non entrano nel nuovo percorso vincolato della M19.

| ID attuale | Widget | Evidenza | Area | Obiettivo | Allineamento | Livello | Tag secondari |
| --- | --- | --- | --- | --- | --- | --- | --- |
| L1 | likert | D | F | F01 | direct | B | — |
| L2 | likert | D | F | F02 | direct | B | — |
| L3 | likert | D | F | F03 | direct | O | verification |
| L4 | likert | D | F | F04 | direct | O | context |
| L5 | likert | D | U | U07 | direct | O | diligence, privacy |
| L6 | scenario | Q | F | F03 | direct | O | verification |
| L7 | scenario | Q | U | U07 | direct | O | diligence, privacy |
| T1 | knowledge | Q | F | F01 | direct | B | — |
| T2 | knowledge | Q | F | F01 | direct | B | — |
| T3 | knowledge | Q | F | F02 | direct | B | — |
| T4 | knowledge | Q | F | F02 | direct | B | — |
| T5 | knowledge | Q | F | F02 | direct | B | — |
| T6 | knowledge | Q | F | F05 | direct | B | — |
| T7 | knowledge | Q | F | F05 | direct | B | — |
| T8 | knowledge | Q | F | F03 | direct | O | verification |
| T9 | knowledge | Q | F | F04 | direct | O | context |
| T10 | knowledge | Q | F | F06 | supporting | B | — |
| T11 | knowledge | Q | F | F03 | direct | O | verification |
| T12 | knowledge | Q | F | F04 | direct | O | context |
| TR_CITE | knowledge | Q | F | F03 | direct | O | verification |
| F_DE_1 | likert | D | U | U01 | direct | O | delegation |
| F_DE_2 | likert | D | U | U01 | direct | O | delegation |
| F_DE_3 | scenario | Q | U | U01 | direct | O | delegation |
| F_DS_1 | likert | D | U | U04 | direct | O | description |
| F_DS_2 | likert | D | U | U04 | direct | O | description |
| F_DS_3 | scenario | Q | U | U04 | direct | O | description |
| TR_PROMPT | scenario | Q | U | U04 | direct | O | description |
| F_DI_1 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_2 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_3 | scenario | Q | U | U06 | direct | O | discernment, verification |
| TR_SURE | scenario | Q | U | U06 | direct | O | discernment, verification |
| F_DG_1 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_2 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_3 | scenario | Q | U | U07 | direct | O | diligence, privacy |
| M1 | likert | D | U | U08 | direct | O | mindset |
| M2 | likert | D | U | U08 | direct | O | mindset |
| M3 | likert | D | U | U08 | direct | O | mindset |
| M4 | likert | D | U | U08 | direct | O | mindset |
| M5 | likert | D | U | U08 | direct | O | mindset |
| M6 | likert | D | U | U08 | direct | O | mindset |
| M7 | likert | D | U | U08 | direct | O | mindset |
| M8 | scenario | Q | U | U08 | direct | O | mindset |
| M9 | scenario | Q | U | U08 | direct | O | mindset |
| P_L_1 | multi | Q | F | F03 | direct | O | verification |
| P_DE_1 | multi | Q | U | U01 | direct | O | delegation |
| P_DS_1 | text | T | U | U04 | direct | O | description |
| P_DS_2 | choice | Q | U | U04 | direct | O | description |
| P_DI_1 | text | T | U | U06 | direct | O | discernment, verification |
| P_DG_1 | multi | Q | U | U07 | direct | O | diligence, privacy |
| P_M_1 | multi | Q | U | U08 | direct | O | mindset |
| L8 | likert | D | U | U06 | direct | O | discernment, verification |
| L9 | likert | D | A | A04 | direct | S | privacy |
| L10 | likert | D | F | F01 | direct | B | — |
| L11 | scenario | Q | U | U07 | direct | O | diligence, privacy |
| L12 | scenario | Q | U | U07 | direct | O | diligence, privacy |
| F_DE_4 | likert | D | U | U01 | direct | O | delegation |
| F_DE_5 | likert | D | U | U01 | direct | O | delegation |
| F_DE_6 | likert | D | U | U01 | direct | O | delegation |
| F_DE_7 | likert | D | U | U01 | direct | O | delegation |
| F_DE_8 | likert | D | U | U01 | direct | O | delegation |
| F_DE_9 | likert | D | U | U01 | direct | O | delegation |
| F_DE_10 | likert | D | U | U01 | direct | O | delegation |
| F_DE_11 | scenario | Q | U | U01 | direct | O | delegation |
| F_DE_12 | scenario | Q | U | U01 | direct | O | delegation |
| F_DS_4 | likert | D | U | U04 | direct | O | description |
| F_DS_5 | likert | D | U | U04 | direct | O | description |
| F_DS_6 | likert | D | U | U04 | direct | O | description |
| F_DS_7 | likert | D | U | U04 | direct | O | description |
| F_DS_8 | likert | D | U | U04 | direct | O | description |
| F_DS_9 | likert | D | U | U04 | direct | O | description |
| F_DS_10 | scenario | Q | U | U04 | direct | O | description |
| F_DS_11 | scenario | Q | U | U04 | direct | O | description |
| F_DI_4 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_5 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_6 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_7 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_8 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_9 | likert | D | U | U06 | direct | O | discernment, verification |
| F_DI_10 | scenario | Q | U | U06 | direct | O | discernment, verification |
| F_DI_11 | scenario | Q | U | U06 | direct | O | discernment, verification |
| F_DG_4 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_5 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_6 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_7 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_8 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_9 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_10 | likert | D | U | U07 | direct | O | diligence, privacy |
| F_DG_11 | scenario | Q | U | U07 | direct | O | diligence, privacy |
| F_DG_12 | scenario | Q | U | U07 | direct | O | diligence, privacy |
| M10 | likert | D | U | U08 | direct | O | mindset |
| M11 | likert | D | U | U08 | direct | O | mindset |
| M12 | scenario | Q | U | U08 | direct | O | mindset |
| P_L_2 | multi | Q | U | U06 | direct | O | discernment, verification |
| P_DE_2 | choice | Q | U | U01 | direct | O | delegation |
| P_DS_3 | text | T | U | U04 | direct | O | description |
| P_DI_2 | choice | Q | U | U06 | direct | O | discernment, verification |
| P_DG_2 | multi | Q | U | U07 | direct | O | diligence, privacy |
| T13 | knowledge | Q | F | F02 | direct | B | — |
| M13 | likert | D | U | U08 | direct | O | mindset |
| P_M_2 | choice | Q | U | U08 | direct | O | mindset |
| AG1 | likert | D | A | A01 | direct | O | delegation |
| AG2 | knowledge | Q | A | A01 | direct | O | delegation |
| AG3 | scenario | Q | A | A03 | direct | S | delegation, diligence |
| AG4 | multi | Q | A | A03 | direct | S | delegation, diligence |
| AG5 | likert | D | A | A03 | direct | S | delegation, diligence |
| AG6 | scenario | Q | A | A03 | direct | S | delegation, diligence |
| AG7 | knowledge | Q | A | A02 | direct | S | verification |
| AG8 | scenario | Q | A | A05 | direct | S | verification |
| AG9 | multi | Q | H | H06 | direct | S | verification |
| AG10 | text | T | A | A03 | direct | S | delegation, diligence |
| AG11 | scenario | Q | A | A03 | direct | S | delegation, diligence |
| AG12 | knowledge | Q | H | H02 | direct | S | context |
| AG13 | choice | Q | H | H06 | direct | S | verification |
| AG14 | likert | D | A | A03 | direct | S | delegation, diligence |
| AG15 | multi | Q | A | A03 | direct | S | delegation, diligence |
| MA01 | scenario | Q | U | U01 | direct | O | delegation, multimodal, context |
| MA02 | scenario | Q | U | U01 | direct | O | delegation |
| MA03 | scenario | Q | U | U02 | direct | O | multimodal, verification |
| MA04 | scenario | Q | U | U02 | direct | O | multimodal, delegation |
| MA05 | scenario | Q | U | U03 | direct | O | multimodal, verification |
| MA06 | scenario | Q | U | U04 | direct | O | description |
| MA07 | scenario | Q | U | U05 | direct | O | delegation, privacy |
| MA08 | scenario | Q | U | U06 | direct | O | discernment, verification |
| MA09 | scenario | Q | U | U07 | direct | O | diligence, privacy |
| MA10 | scenario | Q | U | U08 | direct | O | mindset, verification |
| AW01 | scenario | Q | A | A01 | direct | O | delegation |
| AW02 | scenario | Q | A | A01 | direct | S | delegation, verification |
| AW03 | scenario | Q | A | A02 | direct | S | verification |
| AW04 | scenario | Q | A | A02 | direct | S | verification |
| AW05 | scenario | Q | A | A03 | direct | O | delegation, diligence |
| AW06 | scenario | Q | A | A03 | direct | S | diligence, context |
| AW07 | scenario | Q | A | A04 | direct | S | diligence, privacy |
| AW08 | scenario | Q | A | A04 | direct | S | diligence, privacy |
| AW09 | scenario | Q | A | A05 | direct | S | verification |
| AW10 | scenario | Q | A | A05 | direct | S | verification, context |
| HR01 | scenario | Q | H | H01 | direct | S | delegation, verification |
| HR02 | scenario | Q | H | H02 | direct | S | context, verification |
| HR03 | scenario | Q | H | H02 | direct | S | context |
| HR04 | scenario | Q | H | H03 | direct | S | delegation |
| HR05 | scenario | Q | H | H03 | direct | S | context, diligence |
| HR06 | scenario | Q | H | H04 | direct | S | diligence, privacy |
| HR07 | scenario | Q | H | H04 | direct | S | verification |
| HR08 | scenario | Q | H | H05 | direct | S | context, verification |
| HR09 | scenario | Q | H | H05 | direct | S | context, verification |
| HR10 | scenario | Q | H | H06 | direct | S | verification |

## Controlli e copertura

La classificazione dei 115 item preesistenti implementata nella milestone 17 resta invariata. La milestone 18 aggiunge dieci ID con varianti A/B/C IT/EN in `assets/modern-ai.js`, banca `2026.11-m18`, forma `1.4`. Il comando `node tests/assessment.test.mjs` verifica la corrispondenza fra mappa Markdown e metadati runtime. La classificazione è parte delle regole di scoring, documentate in [SCORING.md](SCORING.md).

Totale corrente: **145 ID**; **86 Q, 55 D, 4 T, 0 E**. La M19 conteneva 135 ID (76 Q, 55 D, 4 T). La M18 conteneva 125 ID (66 Q, 55 D, 4 T). La baseline M16/M17 conteneva 115 ID (56 Q, 55 D, 4 T). Il completo attuale seleziona 50 ID: **27 Q, 21 D, 2 T, 0 E**. Le autovalutazioni facoltative iniziali sono escluse.

AI moderne propone sempre MA01–MA10: **U01×2, U02×2, U03–U08×1**, tutti Q diretti di livello O. Questi slot non entrano nel completo o negli altri tematici prima della milestone 22. La scelta in uno scenario non dimostra esecuzione pratica. Testi bilingui, crediti e fonti sono in [MODERN_AI_REVIEW.md](MODERN_AI_REVIEW.md).

Tutti gli obiettivi hanno ora almeno un Q direttamente allineato nella banca, eccetto **F06**, collegato solo a un quesito storico di supporto. H01, H03, H04 e H05 acquisiscono Q dedicati nel percorso Harness. U02, U03 e U05 hanno ora Q dedicati in AI moderne, ma rimangono assenti dal completo. Alcuni sono richiamati indirettamente in altri quesiti: un richiamo non conta come copertura dedicata. A04 ha ora due Q dedicati nel percorso Agents (AW07/AW08); nel completo resta solo la dichiarazione L9. T10 è collegato a F06 solo come supporto storico (`supporting`): non verifica la scelta della famiglia di soluzione e non soddisfa la copertura dedicata di F06. Le coperture mancanti nel completo e le prove E restano nelle milestone 21-22.

Nella milestone 17 la mappa serve a separare le evidenze dei nuovi report. Le revisioni dei contenuti e la composizione finale seguono le milestone del piano; per cambiare testo, alternative, obiettivo o rubrica bisogna aggiornare le versioni pertinenti. Gli slot futuri e i relativi tipi di prova sono nella sezione 5 del blueprint.

## Revisione del percorso Agents nella milestone 19

AI Agents seleziona sempre AW01–AW10: due Q diretti per ciascun obiettivo A01–A05, con due compiti O e otto S. Le 15 domande AG1–AG15 restano nella banca per tracciabilità; AG1–AG4 continuano a entrare nel completo e non sono riscritti o riclassificati. Il percorso tematico non estrae più dieci domande dal vecchio pool di quindici. Ogni nuovo slot ha tre varianti IT/EN: [tracce, motivazioni e fonti](AGENTIC_WORKFLOWS_REVIEW.md). Banca `2026.11-m19`, forma `1.5`, app `3.2.0`; scoring `3.0.0` e blueprint `1.0.0` invariati. Stato: approvata dal maintainer il `2026-11-25`, release `v3.2.0`.

## Nuovo percorso Harness nella milestone 20

Harness seleziona HR01–HR10: H01, H02×2, H03×2, H04×2, H05×2, H06; dieci Q diretti di livello S con varianti A/B/C IT/EN. I 135 item precedenti conservano testi e classificazione, compresi gli item storici AG12 (H02) e AG9/AG13 (H06); non entrano nel nuovo percorso Harness. Il completo rimane da 50 domande fino alla M22. [Scenari, motivazioni e fonti](HARNESS_REVIEW.md). App `3.3.0`, banca `2026.11-m20`, forma `1.6`; scoring `3.0.0` e blueprint `1.0.0` invariati. Stato: approvata dal maintainer il `2026-11-25`, release `v3.3.0`.
