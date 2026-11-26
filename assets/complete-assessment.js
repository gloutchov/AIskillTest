/* M22: explicit blueprint slots. Topic banks and lab contracts stay independent. */
const COMPLETE_ASSESSMENT = (() => {
  "use strict";
  const REVIEW_DATE = "2026-11-26";
  const SOURCES = [
    { id: "M22-S01", title: "Google — Introduction to Large Language Models", url: "https://developers.google.com/machine-learning/crash-course/llm", note: ["Token, contesto, parametri e limiti; non definisce le soglie del test.", "Tokens, context, parameters, and limits; it does not define assessment thresholds."] },
    { id: "M22-S02", title: "Google — Embeddings", url: "https://developers.google.com/machine-learning/crash-course/embeddings", note: ["Rappresentazioni e similarità; pertinenza e verità richiedono verifiche.", "Representations and similarity; relevance and truth require checks."] },
    { id: "M22-S03", title: "Vaswani et al. — Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", note: ["Riferimento architetturale storico, non descrizione di ogni modello attuale.", "Historical architecture reference, not a description of every current model."] },
    { id: "M22-S04", title: "Microsoft — Retrieval-augmented generation", url: "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview", note: ["Recupero di contesto autorizzato e limiti; i casi non richiedono un prodotto Microsoft.", "Authorized context retrieval and limits; cases require no Microsoft product."] }
  ];
  // [slot, primary area, evidence, objective, level, kind, explicitly reused source]
  const ROWS = [
    [1,"F","Q","F01","B","knowledge"], [2,"F","Q","F01","B","scenario"],
    [3,"F","Q","F02","B","scenario"], [4,"F","Q","F02","B","knowledge"],
    [5,"F","Q","F03","O","scenario"], [6,"F","Q","F03","O","scenario"],
    [7,"F","Q","F04","O","knowledge"], [8,"F","Q","F04","O","scenario"],
    [9,"F","Q","F05","B","knowledge"], [10,"F","Q","F06","O","scenario"],
    [11,"F","Q","F06","O","scenario"], [12,"F","D","F03","O","self-report","L3"],
    [13,"U","Q","U01","O","scenario","MA01"], [14,"U","Q","U02","O","scenario","MA03"],
    [15,"U","Q","U03","O","scenario","MA05"], [16,"U","Q","U04","O","scenario","MA06"],
    [17,"U","Q","U05","O","scenario","MA07"], [18,"U","Q","U06","O","scenario","MA08"],
    [19,"U","Q","U07","O","scenario","MA09"], [20,"U","Q","U08","O","scenario","MA10"],
    [21,"U","D","U04","O","self-report","F_DS_1"], [22,"U","D","U07","O","self-report","F_DG_1"],
    [23,"U","D","U08","O","self-report","M1"], [24,"U","T","U04","O","formative-text","P_DS_1"],
    [25,"U","T","U06","O","formative-text","P_DI_1"],
    [26,"U","E","U06","O","simulation","LAB_K1_VERIFY"], [27,"U","E","U06","O","simulation","LAB_K1_CORRECT"],
    [28,"U","E","U06","O","simulation","LAB_K1_RELEASE"],
    [29,"A","Q","A01","O","scenario","AW01"], [30,"A","Q","A01","S","scenario","AW02"],
    [31,"A","Q","A02","S","scenario","AW03"], [32,"A","Q","A02","S","scenario","AW04"],
    [33,"A","Q","A03","O","scenario","AW05"], [34,"A","Q","A03","S","scenario","AW06"],
    [35,"A","Q","A04","S","scenario","AW07"], [36,"A","Q","A04","S","scenario","AW08"],
    [37,"A","Q","A05","S","scenario","AW09"], [38,"A","D","A03","S","self-report"],
    [39,"A","E","A04","S","simulation","LAB_K2_SOURCE"], [40,"A","E","A03","S","simulation","LAB_K2_SCOPE"],
    [41,"H","Q","H01","S","knowledge","HR01"], [42,"H","Q","H02","S","scenario","HR02"],
    [43,"H","Q","H03","S","knowledge","HR04"], [44,"H","Q","H03","S","scenario","HR05"],
    [45,"H","Q","H04","S","scenario","HR06"], [46,"H","Q","H04","S","scenario","HR07"],
    [47,"H","Q","H05","S","scenario","HR08"], [48,"H","Q","H06","S","scenario","HR10"],
    [49,"H","D","H02","S","self-report"], [50,"H","E","H05","S","simulation","LAB_K2_RESUME"]
  ];
  const SLOTS = ROWS.map(([n, primaryArea, evidenceType, objectiveId, taskLevel, questionKind, originSourceId]) => ({
    id: `C${String(n).padStart(2,"0")}`, primaryArea, evidenceType, objectiveId, taskLevel, questionKind,
    objectiveAlignment: "direct", secondaryTags: evidenceType === "E" ? ["simulation","verification"] : [],
    originSourceId: originSourceId || null
  }));
  const pick = (pair, language) => pair[language === "en" ? 1 : 0];
  const option = (score, it, en, whyIt, whyEn) => ({ score, label: [it,en], rationale: [whyIt,whyEn] });
  const FOUNDATION = [
    {
      contexts: [
        ["Un'app divide «riorganizzare» in frammenti prima di generare una risposta.", "An app splits 'reorganizing' into pieces before generating a response."],
        ["Un'app divide «internazionale» in frammenti prima di generare una risposta.", "An app splits 'international' into pieces before generating a response."],
        ["Un'app divide «preelaborazione» in frammenti prima di generare una risposta.", "An app splits 'preprocessing' into pieces before generating a response."]],
      prompt: ["Che cosa rappresenta un token?", "What does a token represent?"],
      options: [
        option(5,"Un'unità del testo, anche più piccola di una parola.","A text unit, which may be smaller than a word.","La tokenizzazione può rappresentare parole, frammenti o caratteri.","Tokenization can represent words, pieces, or characters."),
        option(3,"Una parola del testo, sempre intera.","A word in the text, always whole.","Una parola può occupare uno o più token.","A word can take one or more tokens."),
        option(1,"Una fonte verificata associata alla risposta.","A verified source attached to the answer.","I token non certificano l'esistenza di una fonte.","Tokens do not certify that a source exists."),
        option(1,"Un permesso per eseguire un'azione esterna.","Permission to execute an external action.","La tokenizzazione non concede autorizzazioni.","Tokenization grants no authorization.")]
    },
    {
      contexts: [
        ["Due generazioni della stessa sintesi danno formulazioni diverse; una contiene una data assente dalla fonte.","Two generations of the same summary use different wording; one contains a date absent from the source."],
        ["Due generazioni dello stesso verbale danno formulazioni diverse; una aggiunge un nome assente dalla fonte.","Two generations of the same minutes use different wording; one adds a name absent from the source."],
        ["Due generazioni dello stesso report danno formulazioni diverse; una aggiunge un importo assente dalla fonte.","Two generations of the same report use different wording; one adds an amount absent from the source."]],
      prompt: ["Quale conclusione è sostenuta?","Which conclusion is supported?"],
      options: [
        option(5,"La variabilità è possibile; il dettaglio aggiunto richiede riscontro.","Variation is possible; the added detail needs checking.","La generazione plausibile non garantisce corrispondenza alla fonte.","Plausible generation does not guarantee agreement with the source."),
        option(1,"La seconda versione corregge necessariamente la prima.","The second version necessarily corrects the first.","L'ordine delle risposte non dimostra accuratezza.","Answer order does not establish accuracy."),
        option(3,"Scelgo la versione più chiara e segnalo il dettaglio come incerto.","Choose the clearer version and mark the detail uncertain.","La cautela è utile, ma non sostituisce la verifica richiesta.","Caution helps but does not replace the required check."),
        option(1,"La versione più precisa è una prova del dettaglio aggiunto.","The more precise version proves the added detail.","Precisione linguistica e verità sono distinte.","Linguistic precision and truth are distinct.")]
    },
    {
      contexts: [
        ["Carichi un manuale nella sessione. L'app lo usa come contesto e dichiara che non esegue addestramento.","You upload a manual in a session. The app uses it as context and states that it performs no training."],
        ["Carichi un catalogo nella sessione. L'app lo usa come contesto e dichiara che non esegue addestramento.","You upload a catalog in a session. The app uses it as context and states that it performs no training."],
        ["Carichi una procedura nella sessione. L'app la usa come contesto e dichiara che non esegue addestramento.","You upload a procedure in a session. The app uses it as context and states that it performs no training."]],
      prompt: ["Che cosa puoi dedurre?","What can you infer?"],
      options: [
        option(1,"Il caricamento aggiorna i pesi del modello per tutti.","The upload updates model weights for everyone.","Il contesto non equivale ad addestramento.","Context is not the same as training."),
        option(5,"Il documento può guidare la risposta senza modificare i pesi.","The document can guide the answer without changing weights.","Il caso specifica uso in contesto, non un aggiornamento dei parametri.","The case specifies context use rather than a parameter update."),
        option(3,"È disponibile ora; presumo che lo sarà anche nella prossima sessione.","It is available now; assume it will be in the next session too.","La persistenza dipende dall'app e non è dichiarata qui.","Persistence depends on the app and is not specified here."),
        option(1,"Il documento diventa automaticamente una fonte pubblica.","The document automatically becomes a public source.","Il caricamento non implica pubblicazione.","Uploading does not imply publication.")]
    },
    {
      contexts: [
        ["Un servizio genera una bozza da un prompt; il suo contratto di conservazione non è disponibile.","A service generates a draft from a prompt; its retention agreement is unavailable."],
        ["Un servizio genera una traduzione da un testo; il suo contratto di conservazione non è disponibile.","A service generates a translation from a text; its retention agreement is unavailable."],
        ["Un servizio genera una sintesi da un verbale; il suo contratto di conservazione non è disponibile.","A service generates a summary from minutes; its retention agreement is unavailable."]],
      prompt: ["Quale distinzione è corretta?","Which distinction is correct?"],
      options: [
        option(5,"L'inferenza produce output; la conservazione dipende dal servizio.","Inference produces output; retention depends on the service.","Generazione e trattamento dei dati sono aspetti distinti.","Generation and data handling are separate aspects."),
        option(3,"È inferenza, quindi presumo cancellazione alla chiusura.","It is inference, so assume deletion on closing.","La prima parte è corretta, ma non determina la conservazione.","The first part is correct but does not determine retention."),
        option(1,"Ogni risposta richiede riaddestrare i pesi sul prompt.","Every answer requires retraining weights on the prompt.","Inferenza e addestramento sono processi diversi.","Inference and training are different processes."),
        option(1,"Il contesto è sempre una memoria permanente del modello.","Context is always permanent model memory.","La disponibilità nel contesto non prova memoria permanente.","Availability in context does not prove permanent memory.")]
    },
    {
      contexts: [
        ["Un report afferma «le vendite sono cresciute del 20%». La citazione esiste, ma parla solo di visite al sito.","A report claims 'sales rose by 20%'. The citation exists but discusses website visits only."],
        ["Un report afferma «i costi sono scesi del 15%». La citazione esiste, ma parla solo di ore di formazione.","A report claims 'costs fell by 15%'. The citation exists but discusses training hours only."],
        ["Un report afferma «i resi sono scesi del 10%». La citazione esiste, ma parla solo di richieste ricevute.","A report claims 'returns fell by 10%'. The citation exists but discusses incoming requests only."]],
      prompt: ["Come tratti l'affermazione?","How do you handle the claim?"],
      options: [
        option(3,"La segnalo come dubbia, conservando la citazione attuale.","Mark it doubtful while retaining the current citation.","Segnala incertezza ma non risolve la mancata pertinenza.","It signals uncertainty but does not resolve the lack of relevance."),
        option(1,"La confermo perché il collegamento si apre.","Confirm it because the link opens.","L'esistenza della fonte non dimostra che sostenga la frase.","A source's existence does not establish support for the sentence."),
        option(5,"La tratto come non supportata e cerco dati pertinenti.","Treat it as unsupported and seek relevant data.","La prova deve riguardare proprio la misura e il perimetro dichiarati.","Evidence must concern the stated measure and scope."),
        option(1,"Cambio il titolo della fonte per adattarlo alla frase.","Change the source title to fit the sentence.","Modificare la citazione non crea evidenza.","Changing the citation creates no evidence.")]
    },
    {
      contexts: [
        ["Una scheda senza data riporta il limite di 5 allegati. La guida vigente fornita nel caso, datata oggi, indica 3.","An undated card states a limit of 5 attachments. The current guide supplied in the case, dated today, states 3."],
        ["Una scheda senza data riporta il limite di 8 campi. La guida vigente fornita nel caso, datata oggi, indica 6.","An undated card states a limit of 8 fields. The current guide supplied in the case, dated today, states 6."],
        ["Una scheda senza data riporta il limite di 4 versioni. La guida vigente fornita nel caso, datata oggi, indica 2.","An undated card states a limit of 4 versions. The current guide supplied in the case, dated today, states 2."]],
      prompt: ["Quale criterio usi per la risposta?","Which criterion do you use for the answer?"],
      options: [
        option(1,"Faccio la media fra i due limiti.","Average the two limits.","Una media non risolve un conflitto fra versioni.","An average does not resolve a version conflict."),
        option(5,"Uso la guida vigente, indicando fonte e data.","Use the current guide, identifying source and date.","Il caso fornisce già versione applicabile e riferimento verificabile.","The case already supplies the applicable version and a checkable reference."),
        option(1,"Uso il limite maggiore perché è più favorevole.","Use the higher limit because it is more favorable.","La convenienza non determina la versione applicabile.","Convenience does not determine the applicable version."),
        option(3,"Segnalo il conflitto ma lascio il limite senza risposta.","Flag the conflict but leave the limit unanswered.","Rileva la differenza senza usare l'evidenza sufficiente fornita.","It detects the difference without using the sufficient evidence supplied.")]
    },
    {
      contexts: [
        ["Un'app cerca paragrafi in un manuale e li inserisce nel prompt prima della risposta.","An app retrieves paragraphs from a manual and inserts them in the prompt before answering."],
        ["Un'app cerca paragrafi in un archivio e li inserisce nel prompt prima della risposta.","An app retrieves paragraphs from an archive and inserts them in the prompt before answering."],
        ["Un'app cerca paragrafi in un catalogo e li inserisce nel prompt prima della risposta.","An app retrieves paragraphs from a catalog and inserts them in the prompt before answering."]],
      prompt: ["Quale descrizione corrisponde al RAG di questo caso?","Which description matches RAG in this case?"],
      options: [
        option(5,"Recupero di informazioni che arricchisce il contesto della generazione.","Information retrieval that enriches generation context.","I passaggi recuperati sono input; non servono cambiamenti ai pesi.","Retrieved passages are input; weight changes are not required."),
        option(3,"Una ricerca che rende automaticamente affidabile la risposta.","A search that automatically makes the answer reliable.","Identifica il recupero, ma omette i controlli su fonti e uso.","It identifies retrieval but omits checks on sources and their use."),
        option(1,"Un riaddestramento completo su ogni documento recuperato.","Full retraining on every retrieved document.","Inserire testo nel prompt non è riaddestrare il modello.","Inserting text in a prompt does not retrain a model."),
        option(1,"Una procedura che pubblica tutti i documenti consultati.","A procedure that publishes all consulted documents.","Il recupero di contesto non implica pubblicazione.","Context retrieval does not imply publication.")]
    },
    {
      contexts: [
        ["La ricerca semantica restituisce un testo sulle ferie molto simile alla richiesta, ma riferito a un'altra azienda.","Semantic search returns leave guidance very similar to the query but concerning another company."],
        ["La ricerca semantica restituisce un testo sulle spese molto simile alla richiesta, ma riferito a un altro contratto.","Semantic search returns expenses guidance very similar to the query but concerning another contract."],
        ["La ricerca semantica restituisce un testo sulle consegne molto simile alla richiesta, ma riferito a un altro servizio.","Semantic search returns delivery guidance very similar to the query but concerning another service."]],
      prompt: ["Come interpreti la similarità degli embedding?","How do you interpret embedding similarity?"],
      options: [
        option(1,"Certifica che il documento si applica al caso.","It certifies that the document applies to the case.","La similarità non certifica il perimetro.","Similarity does not certify scope."),
        option(3,"È un indizio utile; uso il testo con una nota generica.","It is a useful signal; use the text with a general note.","Riconosce il limite ma usa ancora una fonte non applicabile.","It recognizes the limitation but still uses an inapplicable source."),
        option(5,"Aiuta il recupero; verifico il perimetro prima di usare il testo.","It helps retrieval; check scope before using the text.","Vicinanza vettoriale e applicabilità della fonte sono distinte.","Vector proximity and source applicability are distinct."),
        option(1,"Prova che il modello ha modificato i propri pesi.","It proves that the model changed its weights.","La misura di similarità non dimostra un addestramento.","A similarity measure does not establish training.")]
    },
    {
      contexts: [
        ["Un Transformer elabora una frase di un manuale usando parametri appresi e self-attention.","A Transformer processes a manual sentence using learned parameters and self-attention."],
        ["Un Transformer elabora una frase di un verbale usando parametri appresi e self-attention.","A Transformer processes a sentence from minutes using learned parameters and self-attention."],
        ["Un Transformer elabora una frase di un catalogo usando parametri appresi e self-attention.","A Transformer processes a catalog sentence using learned parameters and self-attention."]],
      prompt: ["Quale spiegazione è adeguata?","Which explanation is appropriate?"],
      options: [
        option(3,"L'attention evidenzia relazioni e certifica i fatti salienti.","Attention highlights relationships and certifies salient facts.","L'associazione di rappresentazioni non verifica la verità.","Associating representations does not verify truth."),
        option(5,"Trasformazioni apprese combinano rappresentazioni in funzione del contesto.","Learned transformations combine representations according to context.","È una descrizione computazionale, senza attribuire coscienza o verifica fattuale.","This is a computational description without attributing consciousness or fact verification."),
        option(1,"Ogni neurone contiene una frase già verificata.","Each neuron contains an already verified sentence.","I parametri non sono un archivio di frasi certificate.","Parameters are not a store of certified sentences."),
        option(1,"L'attention indica che il sistema comprende come una persona.","Attention shows that the system understands like a person.","Il nome del meccanismo non implica capacità mentali umane.","The mechanism's name does not imply human mental abilities.")]
    },
    {
      contexts: [
        ["Devi assegnare ogni messaggio a una di tre categorie definite: richiesta, reclamo, altro. Hai esempi etichettati.","You must assign each message to one of three defined categories: request, complaint, other. Labeled examples are available."],
        ["Devi assegnare ogni documento a una di tre categorie definite: ordine, fattura, altro. Hai esempi etichettati.","You must assign each document to one of three defined categories: order, invoice, other. Labeled examples are available."],
        ["Devi assegnare ogni nota a una di tre categorie definite: guasto, manutenzione, altro. Hai esempi etichettati.","You must assign each note to one of three defined categories: fault, maintenance, other. Labeled examples are available."]],
      prompt: ["Quale famiglia di compito descrive l'obiettivo?","Which task family describes the objective?"],
      options: [
        option(5,"Classificazione; confronto le etichette con esempi di verifica.","Classification; compare labels with checking examples.","L'output richiesto è una classe predefinita; la tecnica può variare.","The required output is a predefined class; the technique may vary."),
        option(3,"Generazione libera; provo a ricavare poi una categoria.","Free generation; try to extract a category afterwards.","Può produrre un'etichetta ma non descrive il compito né ne vincola l'output.","It may produce a label but neither describes the task nor constrains its output."),
        option(1,"Previsione di una quantità futura, senza etichette.","Forecasting a future quantity without labels.","Qui si richiede una classe, non un valore futuro.","The case requires a class rather than a future value."),
        option(1,"Somma deterministica dei caratteri di ciascun testo.","Deterministic summation of characters in each text.","Contare caratteri non assegna la categoria richiesta.","Counting characters does not assign the required category.")]
    },
    {
      contexts: [
        ["Servono due risultati: stimare gli ordini futuri dai dati storici e sommare tre importi già noti.","Two results are needed: estimate future orders from historical data and sum three known amounts."],
        ["Servono due risultati: stimare i ticket futuri dai dati storici e sommare tre conteggi già noti.","Two results are needed: estimate future tickets from historical data and sum three known counts."],
        ["Servono due risultati: stimare le richieste future dai dati storici e sommare tre costi già noti.","Two results are needed: estimate future requests from historical data and sum three known costs."]],
      prompt: ["Quale combinazione è coerente?","Which combination fits?"],
      options: [
        option(1,"Un generatore di testo certifica entrambi senza riscontri.","A text generator certifies both without checks.","La plausibilità non verifica previsione o somma.","Plausibility verifies neither a forecast nor a sum."),
        option(3,"Uso una previsione per entrambi e controllo qualche esempio.","Use forecasting for both and check a few examples.","Per la somma esatta è già disponibile una procedura deterministica.","A deterministic procedure is already available for the exact sum."),
        option(1,"Sommo i dati storici e li considero una previsione certa.","Sum historical data and treat it as a certain forecast.","Un aggregato passato non è una previsione certa.","A historical aggregate is not a certain forecast."),
        option(5,"Previsione da valutare su dati separati; somma con calcolo deterministico.","Evaluate forecasting on separate data; use deterministic arithmetic for the sum.","La scelta segue il tipo di risultato e conserva l'incertezza della previsione.","The choice follows the required result and retains forecast uncertainty.")]
    }
  ];
  const NEXT_STEPS = {
    F01: ["Confronta due generazioni con la stessa fonte e verifica un dettaglio aggiunto.","Compare two generations against the same source and check an added detail."],
    F02: ["Distingui input di sessione, parametri e conservazione dichiarata da un'app.","Distinguish session input, parameters, and retention stated by an app."],
    F03: ["Verifica esistenza, pertinenza e data di una fonte prima di usare una frase.","Check a source's existence, relevance, and date before using a claim."],
    F04: ["Ricostruisci recupero, contesto e risposta di un piccolo esempio RAG.","Trace retrieval, context, and answer in a small RAG example."],
    F05: ["Spiega attention e parametri senza attribuire intenzioni o controllo della verità.","Explain attention and parameters without attributing intentions or truth checking."],
    F06: ["Classifica tre compiti come generazione, classificazione, previsione o calcolo.","Classify three tasks as generation, classification, forecasting, or calculation."]
  };
  function foundationQuestion(slot, form, language) {
    const index = Number(slot.id.slice(1)) - 1, data = FOUNDATION[index];
    const refs = slot.objectiveId === "F04" ? ["M22-S02","M22-S04"] : slot.objectiveId === "F05" ? ["M22-S03"] : slot.objectiveId === "F06" ? ["M18-S08"]
      : slot.objectiveId === "F03" ? ["M18-S11"] : slot.objectiveId === "F02" ? ["M22-S01","M18-S10"] : ["M22-S01"];
    const offset = (index + ["A","B","C"].indexOf(form)) % data.options.length;
    const options = data.options.slice(offset).concat(data.options.slice(0,offset));
    return { section: "Fondamenti tecnici LLM", dimension: "literacy", context: pick(data.contexts[["A","B","C"].indexOf(form)],language),
      text: pick(data.prompt,language), options: options.map(o => ({ score: o.score, title: pick(o.label,language), text: "", rationale: pick(o.rationale,language) })),
      hint: pick(["Usa i dati forniti nel caso.","Use the data supplied in the case."],language),
      feedback: pick(NEXT_STEPS[slot.objectiveId],language), nextStep: pick(NEXT_STEPS[slot.objectiveId],language), sourceRefs: refs };
  }
  function build(form, language, sourceQuestions) {
    if (!["A","B","C"].includes(form)) throw new Error("Unknown complete form");
    const byId = new Map(sourceQuestions.map(q => [q.sourceId || q.id,q]));
    const lab = LOCAL_LAB.questions(form,language);
    return SLOTS.map(slot => {
      if (slot.evidenceType === "E") return { ...lab.find(q => q.sourceId === slot.originSourceId), slotId: slot.id };
      let source;
      if (slot.originSourceId) {
        source = byId.get(slot.originSourceId);
        if (!source) throw new Error(`Incomplete full-test coverage: ${slot.id}/${slot.originSourceId}`);
      } else if (slot.primaryArea === "F") source = foundationQuestion(slot,form,language);
      else source = { section: slot.primaryArea === "A" ? "AI Agents" : "Harness", dimension: "fluency",
        text: slot.primaryArea === "A" ? pick(["Nella mia pratica definisco mandato, approvazioni e condizioni di escalation prima di delegare a un agente.","In my work I define scope, approvals, and escalation conditions before delegating to an agent."],language)
          : pick(["Nella mia pratica conservo vincoli, stato e riferimenti necessari per riprendere una sessione senza affidarmi alla sola memoria della chat.","In my work I retain constraints, state, and references needed to resume a session without relying on chat memory alone."],language),
        context: pick([["Riferisciti a un'attività che hai delegato.","Refer to a task you delegated."],["Riferisciti a una revisione che hai supervisionato.","Refer to a review you supervised."],["Riferisciti a una sessione di lavoro che hai ripreso.","Refer to a work session you resumed."]][["A","B","C"].indexOf(form)],language),
        hint: pick(["Descrivi la tua pratica abituale. Nessuna scelta aumenta il risultato dei quiz.","Describe your regular practice. No choice increases question results."],language) };
      const type = { "self-report": "likert", "formative-text": "text" }[slot.questionKind] || slot.questionKind;
      const question = { ...JSON.parse(JSON.stringify(source)), id: `${form}_${slot.id}`, sourceId: slot.id, slotId: slot.id,
        originSourceId: slot.originSourceId, formId: form, type };
      if (type === "likert") question.options = likertOptions.map((o,i) => ({ ...o,
        ...(language === "en" ? { title: AI_SKILL_I18N.en.likertOptions[i][0], text: AI_SKILL_I18N.en.likertOptions[i][1] } : {}) }));
      return question;
    });
  }
  // Only quiz slots move within area blocks. K1 and K2 stay contiguous; K2 includes C50.
  function order(units, shuffle) {
    const quiz = area => shuffle(units.filter(q => SLOTS.find(s => s.id === q.slotId).primaryArea === area && q.type !== "simulation" && !["likert","text"].includes(q.type)));
    const other = area => units.filter(q => SLOTS.find(s => s.id === q.slotId).primaryArea === area && ["likert","text"].includes(q.type));
    return ["F","U","A","H"].flatMap(area => [...quiz(area),...other(area)])
      .concat(units.filter(q => q.caseId === "K1"),units.filter(q => q.caseId === "K2"));
  }
  function draftAnswerValid(question, raw) {
    return question.type === "text" ? typeof raw === "string" : ASSESSMENT_V3.responseStatus(question,raw) === "valid";
  }
  function draftStatus(draft, versions, units) {
    if (draft.draftSchemaVersion !== 2 || draft.labVersion !== LOCAL_LAB.VERSION || Object.entries(versions).some(([k,v]) => draft[k] !== v)) return "incompatible";
    const fields = ["draftSchemaVersion","assessmentVersion","scoringVersion","labVersion","questionBankVersion","formVersion","modeId","language","formId","index","order","choices","questionIds"];
    if (!["it","en"].includes(draft.language) || !["A","B","C"].includes(draft.formId) || !["verify-first","correct-first"].includes(draft.order)
      || !Number.isInteger(draft.index) || draft.index < 0 || draft.index >= 50 || !draft.choices || typeof draft.choices !== "object" || Array.isArray(draft.choices)
      || Object.keys(draft).some(key => !fields.includes(key)) || !Array.isArray(draft.questionIds) || draft.questionIds.length !== 50 || new Set(draft.questionIds).size !== 50) return "invalid";
    const byId = new Map(units.map(q => [q.id,q]));
    if (draft.questionIds.some(id => !byId.has(id)) || Object.entries(draft.choices).some(([id,raw]) => !byId.has(id) || !draftAnswerValid(byId.get(id),raw))) return "invalid";
    // The two cases must stay together and after the 44 Q/D/T units.
    const lab = LOCAL_LAB.questions(draft.formId,draft.language,draft.order).map(q => q.id);
    if (draft.questionIds.slice(44).join("|") !== lab.join("|")) return "invalid";
    return "compatible";
  }
  return { REVIEW_DATE, SOURCES, SLOTS, FOUNDATION, NEXT_STEPS, build, order, draftAnswerValid, draftStatus };
})();
