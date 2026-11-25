import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, "assets/operational-lab.js"), "utf8") + "\nglobalThis.lab=LOCAL_LAB", context);
const lab = context.lab;
const code = value => String.fromCharCode(96) + value + String.fromCharCode(96);
const lines = [
  "# Laboratorio operativo — revisione M21",
  "",
  "Documento generato da `node scripts/build-operational-lab-review.mjs` usando i dati e le regole canoniche di `assets/operational-lab.js`. Aggiornare il generatore per le note e il modulo per dati, scelte e rubriche; non correggere a mano le varianti qui sotto.",
  "",
  "App `3.4.0`, scoring `3.1.0`, schema report `4`, laboratorio/casi `1.0.0`, banca `2026.11-m21`, forma `1.7`, blueprint approvato `1.0.0`. Sviluppata nel branch `feature/local-operational-lab`; M21 approvata dal maintainer il `2026-11-25`, release `v3.4.0`, con autorizzazione a commit, merge, push, tag e rimozione del branch.",
  "",
  "## Contratto di esecuzione",
  "",
  "Il nuovo percorso `operational-lab` contiene due casi, sei decisioni E, nelle forme A/B/C e in IT/EN. Practical Lab resta il precedente percorso di quiz e testi formativi; il completo da 50 domande resta invariato fino alla M22. Non sono eseguiti agenti, modelli, API, esportazioni del registro o azioni esterne reali.",
  "",
  "K1 espone tre righe sintetiche, una bozza errata, un calcolatore (somma/media/totale bozza), un campo numerico correggibile e un'anteprima della consegna. Selezionare un controllo non esegue un'azione: occorre Applica, quindi Avanti. Il calcolatore modifica il numero proposto, che deve ancora essere applicato. La verifica può precedere o seguire il calcolo; la consegna viene dopo entrambi. Cambiare il calcolo annulla una consegna precedente e richiede una nuova conferma sull'anteprima aggiornata.",
  "",
  "K2 espone dati sintetici, mandato, nota non attendibile, checkpoint, ID e ricevuta. Gestire la nota, preparare l'artefatto dai dati disponibili e riprendere il lavoro sono tre azioni distinte. Il chiarimento sulla nota riguarda soltanto quell'istruzione: non revoca il mandato. La scelta di preparazione genera una bozza sintetica visibile; quella esterna produce solo un effetto simulato esplicito. La ripresa riguarda il lavoro successivo, senza implicare che sia già completato: `continue`/`repeat-update` lo segnano ripreso, `wait` lo mantiene pendente, `declare-complete` registra una falsa conclusione. `hold-all` non genera l'artefatto; riprendere in seguito non finge che un artefatto sia stato prodotto. La registrazione iniziale è interna, già autorizzata e confermata; `repeat-update` aggiunge esattamente un secondo effetto.",
  "",
  "Ogni render, navigazione e recupero ricostruisce lo stato iniziale più le scelte finali confermate: non conserva un log di tentativi e non riapplica effetti cumulativi. Cambiare una scelta rimuove il vecchio effetto e i relativi flag dal risultato finale. Questo contratto consente di rivedere le scelte prima del report; non è una prova con tentativi irreversibili. Il laboratorio non assegna punti al testo libero e non richiede upload.",
  "",
  "Crediti, rubriche, soluzioni e fasce sono mostrati solo dopo il completamento delle sei decisioni. Durante l'esercizio sono visibili gli effetti diretti delle azioni e l'artefatto, senza giudizi di correttezza o punti. Controlli HTML nativi, label, fieldset/legend, focus dopo la conferma e la navigazione; tabella a due colonne con alternativa testuale completa, nessun drag.",
  "",
  "## Credito e criticità",
  "",
  "Ogni decisione vale 0/1/2, ogni caso massimo 6, laboratorio massimo 12. Una risposta assente/non valida ha credito null, non zero. I casi incompleti mostrano soltanto il credito delle decisioni valide; la percentuale E complessiva resta null finché entrambi i casi non sono completi. Nessuna media o compensazione fra Q/D/T/E.",
  "",
  "Senza errori critici: E <50 → `retry`; 50–<80 → `partial`; ≥80 e almeno 4/6 per caso → `conform`. Con 6/6 e 3/6 si ottiene 75 e fascia parziale. Qualsiasi errore critico prevale con `critical`, conserva i crediti grezzi e identifica caso, decisione ed effetto. Anche un laboratorio incompleto può mostrare una criticità già eseguita, ma E resta null. Sono soglie editoriali, senza qualifica operativa o validazione psicometrica.",
  "",
  "- `unverified-release`: consegna simulata esplicita di un totale errato o di una causalità non supportata. Un errore di calcolo trattenuto per revisione non è critico; l'assenza del riferimento da sola vale zero ma non è critica.",
  "- `unauthorized-disclosure`: esportazione simulata del registro fuori mandato.",
  "- `unauthorized-action`: azione esterna simulata senza approvazione.",
  "- `duplicate-action`: seconda registrazione dello stesso update già confermato. La falsa conclusione vale zero ma non produce un duplicato.",
  "",
  "## Bozza, storico e privacy",
  "",
  "Una sola bozza incompleta, chiave `aiSkillOperationalLabDraft`, separata da `aiSkillAssessmentHistory`. Schema bozza 1: versioni app/scoring/lab/banca/forma, modeId, lingua, forma, indice corrente, ordine verifica/calcolo e sole scelte confermate con ID stabili. Nessun nome, ruolo, team, stima personale, tempo di risposta, sequenza dei tentativi o effetto derivato. La versione del laboratorio identifica entrambe le versioni dei casi e delle relative rubriche.",
  "",
  "Modificare un controllo annulla la sua vecchia conferma; i valori ancora non applicati non vengono recuperati. Avanti, Indietro e il cambio d'ordine salvano la posizione. La home offre Riprendi o Elimina bozza; il recupero ripristina lingua, forma, ordine e scelte senza consumare una nuova forma e senza recuperare dati del profilo. Iniziare un nuovo laboratorio con una bozza esistente chiede esplicitamente di eliminarla. Altri percorsi possono essere svolti conservando la bozza.",
  "",
  "Una bozza incompatibile o corrotta rimane intatta finché non viene eliminata: nessuna applicazione automatica delle nuove regole alle vecchie scelte. Interrompi confermato, Elimina bozza, completamento e Cancella dati locali eliminano la bozza; la cancellazione complessiva rimuove anche storico e rotazione delle forme. Annullare una conferma conserva lo stato. Gli errori di lettura/scrittura/rimozione vengono segnalati; un'interruzione non si conclude se la cancellazione fallisce. Se fallisce la rimozione dopo il completamento, il report resta leggibile ma il recupero potrebbe offrire la bozza precedente.",
  "",
  "Dati e report non lasciano il browser. La simulazione funziona con script classici anche da file://; la persistenza dipende dal browser, dall'origine e dalle sue impostazioni e non è garantita per file:// o navigazione privata. Nessun account, build tool, chiamata di rete o valutatore AI. JSON/CSV e link esterni richiedono un gesto esplicito. Il report conserva lo stato iniziale sintetico, le decisioni finali, gli effetti e le motivazioni, senza cronologia delle modifiche. I report schema 3/scoring 3.0 restano originali e leggibili; gli schema 4 hanno firma di confronto distinta.",
  "",
  "## Validazione del maintainer prima del commit",
  "",
  "Le verifiche automatiche coprono le sei forme, 864 configurazioni K1 e 216 K2, casi completi/incompleti, parziali, errori critici e modifica delle scelte; i limiti dei test DOM sono in SCORING.md. Browser non disponibile nell'ambiente dell'agente. Il maintainer ha approvato la chiusura il 2026-11-25 senza riportare gli esiti dettagliati della prova manuale; questa checklist resta un riferimento, senza attestare controlli browser non eseguiti dall'agente.",
  "",
  "1. Aprire ai_skill_test.html direttamente e tramite index.html; controllare badge 3.4.0, quattordici percorsi, bibliografia dalla landing e dai risultati, assenza di errori in console e assenza di richieste con risposte/tracce.",
  "2. Eseguire un laboratorio corretto in IT e EN, su desktop e mobile: tutte le righe, somma (totali A=300/B=100/C=50), riferimento incluso, causalità rimossa, consegna; use-data, draft-only, continue. Attesi 6/6+6/6, 100, nessun flag. Verificare anteprima e conferme, Next obbligatorio, tastiera e focus, tabella e alternativa testuale.",
  "3. Eseguire un caso critico nelle due lingue su desktop/mobile: consegnare il totale errato oppure ripetere update-17/28/39. Attesa fascia critica con effetto esplicito e crediti conservati. Con declare-complete nessun duplicate-action. Nessun punto o feedback di soluzione prima del report.",
  "4. Invertire verifica/calcolo; tornare indietro e correggere calcolo/consegna e repeat-update. Attesi invalidazione della consegna, rimozione dei vecchi flag dopo nuova conferma, registro nuovamente a 1. Ricaricare a metà, riprendere senza nuova forma e controllare che gli effetti non si sommino.",
  "5. Provare Interrompi e annullamento, Elimina bozza, nuovo laboratorio con bozza, errore di storage, Cancella dati locali. Verificare storico ed export JSON/CSV originali, download e stampa reali, compreso almeno un report 2.x e uno schema 3. Nessuna inferenza sulle prestazioni lavorative.",
  "",
  "## Varianti canoniche IT/EN",
  ""
];
for (const language of ["it", "en"]) for (const form of ["A", "B", "C"]) {
  const v = lab.variant(form, language);
  const qs = lab.questions(form, language);
  const good = Object.fromEntries(qs.map((q, i) => [q.id, ["all-rows", { operation: "sum", total: v.total }, { action: "release", reference: true, keepClaim: false }, "use-data", "draft-only", "continue"][i]]));
  lines.push(`### ${language.toUpperCase()} · Forma ${form}`, "", "**K1**", "", qs[0].context, "", `Totale atteso: **${v.total}**.`, "");
  for (const q of qs) {
    if (q.caseId === "K2" && q.sourceId === "LAB_K2_SOURCE") lines.push("**K2**", "", q.context, "", v.draftText, "");
    lines.push(`**${q.sourceId} — ${q.text}**`, "", lab.evaluate(form, language, good).decisions.find(d => d.id === q.id).explanation, "");
    const choices = lab.choices(q.sourceId, language);
    if (!choices.length) {
      const samples = q.sourceId === "LAB_K1_CORRECT" ? [{ operation: "sum", total: v.total }, { operation: "sum", total: v.draft }, { operation: "draft", total: v.draft }]
        : [{ action: "release", reference: true, keepClaim: false }, { action: "review", reference: false, keepClaim: true }, { action: "release", reference: true, keepClaim: true }];
      for (const action of samples) {
        const result = lab.evaluate(form, language, { ...good, [q.id]: action });
        const d = result.decisions.find(d => d.id === q.id);
        lines.push(`- ${code(JSON.stringify(action))}: ${d.credit}/2${result.criticalFindings.length ? `; ${result.criticalFindings.map(f => f.code).join(", ")}` : ""}.`);
      }
    } else for (const action of choices) {
      const result = lab.evaluate(form, language, { ...good, [q.id]: action.value });
      const d = result.decisions.find(d => d.id === q.id);
      lines.push(`- ${code(action.value)}: ${action.label} — ${d.credit}/2${result.criticalFindings.length ? `; ${result.criticalFindings.map(f => f.code).join(", ")}` : ""}.`);
    }
    lines.push("");
  }
}
lines.push("## Fonti e limiti", "", "Fonti primarie ricontrollate il 2026-11-25; supportano i principi di stato e i vincoli tecnici, non i pesi o la validità della prova. Le rubriche e i dati sintetici discendono dal blueprint approvato.", "", ...lab.SOURCES.map(s => `- [${s.title}](${s.url}): ${s.note[0]}`), "");
fs.writeFileSync(path.join(root, "docs/OPERATIONAL_LAB_REVIEW.md"), lines.join("\n"));
