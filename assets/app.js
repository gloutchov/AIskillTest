function cloneQuestionData(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function buildQuestionForm(formId) {
      const overrides = formOverrides[formId] || {};
      return baseQuestions.map(baseQuestion => {
        const sourceId = baseQuestion.id;
        const override = overrides[sourceId] || {};
        const merged = { ...cloneQuestionData(baseQuestion), ...cloneQuestionData(override) };
        merged.sourceId = sourceId;
        merged.formId = formId;
        merged.id = `${formId}_${sourceId}`;
        return merged;
      });
    }

    function shuffledValues(values) {
      const copy = [...values];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function formCycleKey(language, modeId) {
      return `${language || "it"}:${modeId || DEFAULT_TEST_MODE_ID}`;
    }

    function normalizeFormCycle(value) {
      const cycle = value && typeof value === "object" ? value : {};
      return {
        remaining: Array.isArray(cycle.remaining) ? cycle.remaining.filter(id => FORM_IDS.includes(id)) : [],
        last: FORM_IDS.includes(cycle.last) ? cycle.last : null
      };
    }

    function readFormCycles() {
      try {
        const raw = localStorage.getItem(FORM_CYCLE_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        if (Array.isArray(parsed.remaining) || parsed.last) {
          return { legacy: normalizeFormCycle(parsed) };
        }
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch (error) {
        return {};
      }
    }

    function readFormCycle(language, modeId) {
      const cycles = readFormCycles();
      return normalizeFormCycle(cycles[formCycleKey(language, modeId)] || cycles.legacy);
    }

    function writeFormCycle(language, modeId, cycle) {
      try {
        const cycles = readFormCycles();
        delete cycles.legacy;
        cycles[formCycleKey(language, modeId)] = normalizeFormCycle(cycle);
        localStorage.setItem(FORM_CYCLE_STORAGE_KEY, JSON.stringify(cycles));
      } catch (error) {
        console.warn("Impossibile salvare la rotazione delle forme", error);
      }
    }

    function selectNextForm(modeId, language) {
      const cycle = readFormCycle(language, modeId);
      if (!cycle.remaining.length) {
        cycle.remaining = shuffledValues(FORM_IDS);
        if (cycle.last && cycle.remaining[0] === cycle.last) {
          const alternativeIndex = cycle.remaining.findIndex(id => id !== cycle.last);
          if (alternativeIndex > 0) {
            [cycle.remaining[0], cycle.remaining[alternativeIndex]] = [cycle.remaining[alternativeIndex], cycle.remaining[0]];
          }
        }
      }
      const selected = cycle.remaining.shift() || shuffledValues(FORM_IDS)[0];
      cycle.last = selected;
      writeFormCycle(language, modeId, cycle);
      return selected;
    }

    const APP_VERSION = "3.5.2";
    const HISTORY_KEY = "aiSkillAssessmentHistory";
    const ASSESSMENT_EPOCH_KEY = "aiSkillAssessmentClearGeneration";
    const DEFAULT_TEST_MODE_ID = "complete";
    const COMPLETE_TEST_COUNT = 50;
    const TOPIC_TEST_COUNT = 10;
    const SECTION_ORDER = [
      "Literacy",
      "Fondamenti tecnici LLM",
      "AI moderne",
      "AI Agents",
      "Harness",
      "Fluency · Delegation",
      "Fluency · Description",
      "Fluency · Discernment",
      "Fluency · Diligence",
      "Mindset",
      "Practical Lab",
      "Laboratorio operativo"
    ];

    const TEST_MODES = [
      {
        id: "complete",
        label: "Test completo",
        shortLabel: "Completo",
        type: "complete",
        section: null,
        questionLimit: COMPLETE_TEST_COUNT,
        description: "50 unità: 36 quiz/scenari, 6 dichiarazioni, 2 testi formativi e 6 decisioni in due casi simulati. Fondamenti, AI moderne, agenti e harness.",
        outputNote: "Risultati per area e simulazioni separati. Una bozza solo locale permette la ripresa, senza conservare i dati iniziali del profilo."
      },
      {
        id: "first-steps",
        label: "Primi passi con l'AI",
        shortLabel: "Primi passi",
        type: "learning",
        section: "Primi passi con l'AI",
        questionLimit: 10,
        description: "Dieci situazioni guidate per scoprire le basi dell'AI generativa.",
        outputNote: "Tutorial personalizzato sugli argomenti da consolidare, senza profilo globale."
      },
      {
        id: "literacy",
        label: "Literacy",
        shortLabel: "Literacy",
        type: "topic",
        section: "Literacy",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Comprensione di funzionamento, limiti, dati, fonti, privacy e affidabilità.",
        outputNote: "Report tematico sulla Literacy, senza profilo globale."
      },
      {
        id: "technical",
        label: "Fondamenti tecnici LLM",
        shortLabel: "Tecnica",
        type: "topic",
        section: "Fondamenti tecnici LLM",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Token, contesto, inferenza, reti neurali, Transformer, allucinazioni, RAG, embedding e citazioni.",
        outputNote: "Report tematico sui fondamenti tecnici, senza profilo globale."
      },
      {
        id: "modern-ai",
        label: "AI moderne",
        shortLabel: "AI moderne",
        type: "topic",
        section: "AI moderne",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Multimodalità, scelta degli strumenti, modelli e controlli su documenti, immagini, audio e video.",
        outputNote: "Dieci scenari con copertura fissa; valuta la scelta, senza eseguire strumenti reali."
      },
      {
        id: "agents",
        label: "AI Agents",
        shortLabel: "Agents",
        type: "topic",
        section: "AI Agents",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Workflow, agente singolo o più agenti; strumenti, supervisione, istruzioni non fidate e diagnosi delle tracce.",
        outputNote: "Dieci scenari con copertura fissa; giudizio sulle decisioni, senza esecuzioni reali."
      },
      {
        id: "harness",
        label: "Harness",
        shortLabel: "Harness",
        type: "topic",
        section: "Harness",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Il sistema di esecuzione dell'agente: contesto, integrazioni, permessi, checkpoint, ripresa e verifica degli esiti.",
        outputNote: "Dieci scenari con copertura fissa; conoscenza del sistema, senza gestione di ambienti reali."
      },
      {
        id: "delegation",
        label: "Fluency - Delegation",
        shortLabel: "Delegation",
        type: "topic",
        section: "Fluency · Delegation",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Scelta dei task delegabili, scomposizione del lavoro e responsabilità umana.",
        outputNote: "Report tematico sulla Delegation, senza profilo globale."
      },
      {
        id: "description",
        label: "Fluency - Description",
        shortLabel: "Description",
        type: "topic",
        section: "Fluency · Description",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Qualità del brief: obiettivi, vincoli, contesto, formato e criteri di qualità.",
        outputNote: "Report tematico sulla Description, senza profilo globale."
      },
      {
        id: "discernment",
        label: "Fluency - Discernment",
        shortLabel: "Discernment",
        type: "topic",
        section: "Fluency · Discernment",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Valutazione critica di output, dati, fonti, utilità e rischi prima dell'uso.",
        outputNote: "Report tematico sul Discernment, senza profilo globale."
      },
      {
        id: "diligence",
        label: "Fluency - Diligence",
        shortLabel: "Diligence",
        type: "topic",
        section: "Fluency · Diligence",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Uso responsabile, trasparente e proporzionato della GenAI nel lavoro reale.",
        outputNote: "Report tematico sulla Diligence, senza profilo globale."
      },
      {
        id: "mindset",
        label: "Mindset",
        shortLabel: "Mindset",
        type: "topic",
        section: "Mindset",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Attitudine, fiducia calibrata, sperimentazione e disponibilità a cambiare workflow.",
        outputNote: "Report tematico sul Mindset, senza profilo globale."
      },
      {
        id: "practical",
        label: "Practical Lab",
        shortLabel: "Practical Lab",
        type: "topic",
        section: "Practical Lab",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Scelte ipotetiche, prompt scritti e checklist formative; nessuna esecuzione osservata.",
        outputNote: "Report su quiz e testi formativi; nessuna evidenza di esecuzione simulata."
      },
      {
        id: "operational-lab", label: "Laboratorio operativo", shortLabel: "Laboratorio", type: "simulation", section: "Laboratorio operativo", questionLimit: 6,
        description: "Due casi con dati sintetici e sei decisioni: correggi un riepilogo e riprendi un'attività agentica interrotta.",
        outputNote: "Esiti simulati e credito parziale separati dai quiz. Bozza solo locale per riprendere dopo una chiusura."
      }
    ];

    let questions = buildQuestionForm("A");


    const sectionGuides = {
      "Primi passi con l'AI": {
        title: "Primi passi con l'AI",
        text: "Un percorso guidato per comprendere possibilità, limiti e comportamenti essenziali nell'uso della GenAI.",
        items: ["Possibilità", "Limiti", "Richieste", "Verifica", "Privacy"]
      },
      "Literacy": {
        title: "Literacy",
        text: "Misura la comprensione dei principi di funzionamento, dei limiti, dei dati e delle condizioni di affidabilità della GenAI.",
        items: ["Fondamenti e limiti", "Allucinazioni e verifiche", "Dati, fonti e contesto", "Privacy e proprietà intellettuale"]
      },
      "Fondamenti tecnici LLM": {
        title: "Fondamenti tecnici LLM",
        text: "Verifica la comprensione effettiva di token, generazione, addestramento, contesto, reti neurali, Transformer, allucinazioni, RAG, embedding, citazioni e storia dell’AI.",
        items: ["Token e contesto", "Training e inferenza", "Reti neurali e Transformer", "Allucinazioni, RAG ed embedding"]
      },
      "AI Agents": {
        title: "AI Agents",
        text: "Esplora le decisioni su processi agentici, tool, supervisione e diagnosi. Mandati e tracce sono ipotetici: non si osserva esecuzione pratica.",
        items: ["Workflow e coordinamento", "Argomenti ed esiti dei tool", "Mandato e istruzioni non fidate", "Stop, escalation e rollback"]
      },
      "Fluency · Delegation": {
        title: "Delegation",
        text: "Misura la capacità di scegliere se, quando e come delegare un compito all’AI in modo strategico.",
        items: ["Scelta del task", "Scomposizione del lavoro", "Confini della delega", "Responsabilità umana"]
      },
      "Fluency · Description": {
        title: "Description",
        text: "Misura la qualità con cui comunichi obiettivi, vincoli, contesto, formato e criteri di qualità allo strumento.",
        items: ["Brief chiaro", "Vincoli e formato", "Esempi e iterazione", "Domande di chiarimento"]
      },
      "Fluency · Discernment": {
        title: "Discernment",
        text: "Misura la capacità di valutare criticamente output, dati, fonti, utilità e rischi prima dell’uso.",
        items: ["Criteri di qualità", "Verifica dei dati", "Riconoscimento del plausibile", "Accettazione o scarto"]
      },
      "Fluency · Diligence": {
        title: "Diligence",
        text: "Misura l’uso responsabile, etico, trasparente e proporzionato della GenAI nel lavoro reale.",
        items: ["Dati ammessi", "Trasparenza", "Compliance", "Responsabilità finale"]
      },
      "Practical Lab": {
        title: "Practical Lab",
        text: "Misura comportamenti concreti: scelta delle azioni, costruzione del prompt, verifica degli output e uso responsabile dei dati.",
        items: ["Mini-task operativi", "Selezione di azioni", "Prompt scritto", "Controlli e governance"]
      },
      "Mindset": {
        title: "Mindset",
        text: "Misura attitudine, fiducia calibrata, propensione alla sperimentazione e disponibilità a cambiare workflow.",
        items: ["Apertura pragmatica", "Fiducia calibrata", "Apprendimento continuo", "Condivisione nel team"]
      }
    };

    const bibliographyCopy = {
      it: {
        intro: {
          kicker: "Fonti e approfondimenti",
          title: "Bibliografia",
          body: "Questa pagina raccoglie il riferimento che ha ispirato la struttura dell’assessment, alcune fonti metodologiche richiamate nell’articolo Datapizza e gli approfondimenti tecnici usati per costruire le domande sugli LLM.",
          note: "I collegamenti si aprono in una nuova scheda. Alcune pubblicazioni possono richiedere registrazione o accesso istituzionale sul sito dell’editore."
        },
        sections: [
          {
            title: "Assessment, adozione e competenza percepita",
            description: "Riferimenti storici per Literacy, Fluency e Mindset. Non validano questo assessment; dichiarazioni e scelte ipotetiche sono evidenze distinte."
          },
          {
            title: "Fondamenti tecnici degli LLM",
            description: "Materiali di approfondimento collegati alle domande tecniche e alle spiegazioni mostrate nella dashboard."
          }
        ],
        items: [
          {
            source: "Datapizza · articolo di riferimento",
            title: "AI Adoption Assessment: misurare la GenAI in azienda",
            text: "Presenta un modello di lettura dell’adozione basato su Literacy, Fluency e Mindset e richiama le quattro D per descrivere la Fluency operativa.",
            link: "Apri l’articolo ↗"
          },
          {
            source: "Davis · MIS Quarterly, 1989",
            title: "Technology Acceptance Model (TAM)",
            text: "Articolo fondativo sull’accettazione delle tecnologie, con particolare attenzione a utilità percepita e facilità d’uso percepita.",
            link: "Apri la pubblicazione ↗"
          },
          {
            source: "Venkatesh et al. · MIS Quarterly, 2003",
            title: "Unified Theory of Acceptance and Use of Technology",
            text: "Propone il modello UTAUT, che integra diversi approcci precedenti per studiare intenzione d’uso e adozione effettiva della tecnologia.",
            link: "Apri la pubblicazione ↗"
          },
          {
            source: "Bandura · 2006",
            title: "Guide for Constructing Self-Efficacy Scales",
            text: "Guida alla costruzione di scale di self-efficacy, rilevante per distinguere ciò che una persona ritiene di saper fare da ciò che dimostra nelle prove.",
            link: "Apri la pubblicazione ↗"
          },
          {
            source: "Casal-Otero et al. · 2023",
            title: "AI Literacy in Higher Education",
            text: "Rassegna sistematica sul concetto di AI literacy e sulle conoscenze, capacità critiche e responsabilità associate all’uso dell’intelligenza artificiale.",
            link: "Apri la pubblicazione ↗"
          },
          {
            source: "Deng e Lin · AI Mindset Scale",
            title: "The Construction and Validation of the AI Mindset Scale",
            text: "Lavoro dedicato alla costruzione di una scala per osservare atteggiamenti, aspettative e orientamento individuale verso l’AI.",
            link: "Apri la pubblicazione ↗"
          },
          {
            source: "Dakan e Feller · AI Fluency Framework",
            title: "Le quattro D della AI Fluency",
            text: "Framework operativo che articola la competenza d’uso in Delegation, Description, Discernment e Diligence.",
            link: "Apri il framework ↗"
          },
          {
            source: "Ethan Mollick · One Useful Thing",
            title: "Management as an AI Superpower",
            text: "Propone di trattare l’interazione con l’AI come un’attività di delega e supervisione: definire il compito, controllare il lavoro e mantenere la responsabilità finale.",
            link: "Apri l’articolo ↗"
          },
          {
            source: "Weinberg · FAIGMOE",
            title: "Framework for the Adoption and Integration of Generative AI",
            text: "Framework rivolto all’adozione e all’integrazione organizzativa della GenAI, con attenzione a competenze, cambiamento e governance.",
            link: "Apri il preprint ↗"
          },
          {
            source: "Lee, Ramasamy e Subbarao · 2025",
            title: "Barriere psicosociali all’adozione tecnologica",
            text: "Rassegna dei modelli TAM e UTAUT applicati alle barriere che possono influenzare accettazione, fiducia e comportamento d’uso.",
            link: "Apri la pubblicazione ↗"
          },
          {
            source: "Google for Developers",
            title: "Introduzione ai Large Language Model",
            text: "Panoramica su modelli linguistici, token, contesto, predizione delle sequenze e problemi tipici degli LLM.",
            link: "Apri l’approfondimento ↗"
          },
          {
            source: "Google for Developers",
            title: "Reti neurali",
            text: "Introduzione a nodi, strati nascosti, funzioni di attivazione e addestramento mediante retropropagazione.",
            link: "Apri l’approfondimento ↗"
          },
          {
            source: "Google for Developers",
            title: "Embeddings",
            text: "Spiega come elementi discreti possano essere rappresentati tramite vettori e confrontati in uno spazio semantico.",
            link: "Apri l’approfondimento ↗"
          },
          {
            source: "Google Cloud",
            title: "Allucinazioni dell’AI",
            text: "Descrive perché un sistema generativo può produrre informazioni plausibili ma errate e riassume alcune strategie di mitigazione.",
            link: "Apri l’approfondimento ↗"
          },
          {
            source: "Microsoft Learn",
            title: "Retrieval-Augmented Generation",
            text: "Descrive il flusso RAG, nel quale il recupero di contenuti pertinenti precede e supporta la generazione della risposta.",
            link: "Apri l’approfondimento ↗"
          },
          {
            source: "Vaswani et al. · 2017",
            title: "Attention Is All You Need",
            text: "Paper che introduce l’architettura Transformer basata sui meccanismi di attention, alla base di molti LLM moderni.",
            link: "Apri il paper ↗"
          },
          {
            source: "Dartmouth",
            title: "Origini del termine “Artificial Intelligence”",
            text: "Ricostruzione storica del progetto Dartmouth del 1956 e del contesto in cui venne formulata l’espressione “intelligenza artificiale”.",
            link: "Apri l’approfondimento ↗"
          }
        ],
        method: {
          title: "Nota metodologica",
          text: "Il modello 3.x separa conoscenze e scenari, pratiche dichiarate e testi formativi. Gli obiettivi pesano uguale nella propria area; le percentuali richiedono almeno 3 quesiti e 2 obiettivi. Le fasce editoriali richiedono almeno 6 quesiti e tutti gli obiettivi dell’area. Un elenco di parole chiave non riceve un punteggio di qualità. Nessun esercizio simulato è ancora presente. Le forme sono equivalenti per progetto, non psicometricamente; pesi e soglie non sono validati. I report 2.x restano leggibili con il modello originale e non sono confrontabili con 3.x."
        }
      },
      en: {
        intro: {
          kicker: "Sources and further reading",
          title: "Bibliography",
          body: "This page collects the reference that inspired the assessment structure, selected methodology sources cited by the Datapizza article, and the technical resources used to build the LLM questions.",
          note: "Links open in a new tab. Some publications may require registration or institutional access on the publisher site."
        },
        sections: [
          {
            title: "Assessment, adoption, and perceived competence",
            description: "Historical references for Literacy, Fluency, and Mindset. They do not validate this assessment; self-reports and hypothetical choices are distinct evidence."
          },
          {
            title: "LLM technical foundations",
            description: "Further reading connected to the technical questions and to the explanations shown in the dashboard."
          }
        ],
        items: [
          {
            source: "Datapizza · reference article",
            title: "AI Adoption Assessment: measuring GenAI in organizations",
            text: "Presents an adoption model based on Literacy, Fluency, and Mindset, and references the four Ds used to describe operational Fluency.",
            link: "Open article ↗"
          },
          {
            source: "Davis · MIS Quarterly, 1989",
            title: "Technology Acceptance Model (TAM)",
            text: "Foundational article on technology acceptance, with a focus on perceived usefulness and perceived ease of use.",
            link: "Open publication ↗"
          },
          {
            source: "Venkatesh et al. · MIS Quarterly, 2003",
            title: "Unified Theory of Acceptance and Use of Technology",
            text: "Introduces the UTAUT model, which integrates earlier approaches to study usage intention and actual technology adoption.",
            link: "Open publication ↗"
          },
          {
            source: "Bandura · 2006",
            title: "Guide for Constructing Self-Efficacy Scales",
            text: "Guide to building self-efficacy scales, relevant for distinguishing what people believe they can do from what they demonstrate in tasks.",
            link: "Open publication ↗"
          },
          {
            source: "Casal-Otero et al. · 2023",
            title: "AI Literacy in Higher Education",
            text: "Systematic review of AI literacy and the knowledge, critical capabilities, and responsibilities associated with using artificial intelligence.",
            link: "Open publication ↗"
          },
          {
            source: "Deng and Lin · AI Mindset Scale",
            title: "The Construction and Validation of the AI Mindset Scale",
            text: "Work focused on building a scale for observing attitudes, expectations, and individual orientation toward AI.",
            link: "Open publication ↗"
          },
          {
            source: "Dakan and Feller · AI Fluency Framework",
            title: "The four Ds of AI Fluency",
            text: "Operational framework that articulates usage competence through Delegation, Description, Discernment, and Diligence.",
            link: "Open framework ↗"
          },
          {
            source: "Ethan Mollick · One Useful Thing",
            title: "Management as an AI Superpower",
            text: "Suggests treating interaction with AI as delegation and supervision: define the task, check the work, and retain final responsibility.",
            link: "Open article ↗"
          },
          {
            source: "Weinberg · FAIGMOE",
            title: "Framework for the Adoption and Integration of Generative AI",
            text: "Framework for organizational GenAI adoption and integration, with attention to skills, change, and governance.",
            link: "Open preprint ↗"
          },
          {
            source: "Lee, Ramasamy, and Subbarao · 2025",
            title: "Psychosocial barriers to technology adoption",
            text: "Review of TAM and UTAUT models applied to barriers that may influence acceptance, trust, and usage behavior.",
            link: "Open publication ↗"
          },
          {
            source: "Google for Developers",
            title: "Introduction to Large Language Models",
            text: "Overview of language models, tokens, context, sequence prediction, and typical LLM issues.",
            link: "Open deep dive ↗"
          },
          {
            source: "Google for Developers",
            title: "Neural networks",
            text: "Introduction to nodes, hidden layers, activation functions, and training through backpropagation.",
            link: "Open deep dive ↗"
          },
          {
            source: "Google for Developers",
            title: "Embeddings",
            text: "Explains how discrete items can be represented as vectors and compared in a semantic space.",
            link: "Open deep dive ↗"
          },
          {
            source: "Google Cloud",
            title: "AI hallucinations",
            text: "Describes why a generative system can produce plausible but incorrect information and summarizes mitigation strategies.",
            link: "Open deep dive ↗"
          },
          {
            source: "Microsoft Learn",
            title: "Retrieval-Augmented Generation",
            text: "Describes the RAG flow, where retrieving relevant content precedes and supports response generation.",
            link: "Open deep dive ↗"
          },
          {
            source: "Vaswani et al. · 2017",
            title: "Attention Is All You Need",
            text: "Paper introducing the Transformer architecture based on attention mechanisms, at the foundation of many modern LLMs.",
            link: "Open paper ↗"
          },
          {
            source: "Dartmouth",
            title: "Origins of the term “Artificial Intelligence”",
            text: "Historical reconstruction of the 1956 Dartmouth project and the context in which the expression “artificial intelligence” was formulated.",
            link: "Open deep dive ↗"
          }
        ],
        method: {
          title: "Methodological note",
          text: "The 3.x model separates knowledge/scenarios, self-reported practices, and formative text. Objectives carry equal weight within each area; percentages require at least 3 questions and 2 objectives. Editorial bands require at least 6 questions and all area objectives. A keyword list receives no quality score. No simulated exercise is included yet. Forms have designed, not psychometric, equivalence; weights and thresholds are not validated. Reports from 2.x retain their original model and cannot be compared with 3.x."
        }
      }
    };

    const profileDescriptions = {
      Beginner: "Bassa Literacy e bassa Fluency. La priorità è costruire basi concettuali e prime esperienze guidate, evitando sia il rifiuto sia l’uso ingenuo.",
      Curious: "Alta Fluency e bassa Literacy. La persona usa già la GenAI, ma deve rafforzare comprensione dei limiti, fonti, privacy e criteri di verifica.",
      Expert: "Alta Literacy e bassa Fluency. La persona conosce concetti e rischi, ma deve tradurli in routine operative, template e casi d’uso quotidiani.",
      Champion: "Alta Literacy e alta Fluency. La persona è candidata a diventare riferimento interno, mentor o contributore di playbook e pratiche aziendali."
    };

    const subLabels = {
      literacy: "Literacy",
      technical: "Fondamenti tecnici",
      mindset: "Mindset",
      delegation: "Delegation",
      description: "Description",
      discernment: "Discernment",
      diligence: "Diligence"
    };

    const state = {
      index: 0,
      answers: {},
      optionOrders: {},
      hintsVisible: {},
      meta: {},
      formId: null,
      selectedModeId: DEFAULT_TEST_MODE_ID,
      latestReport: null,
      unsavedReport: null,
      reportSaveConflict: null,
      draftOwner: null,
      assessmentEpoch: undefined,
      finishing: false,
      bibliographyBackView: "introView",
      autoAdvanceTimer: null,
      carouselTimer: null,
      carouselPaused: false,
      language: readStoredLanguage() || browserDefaultLanguage()
    };

    const AUTO_ADVANCE_DELAY_MS = 280;
    const CAROUSEL_INTERVAL_MS = 5000;

    const $ = (id) => document.getElementById(id);

    function browserDefaultLanguage() {
      const languages = Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ""];
      const first = String(languages[0] || "").toLowerCase();
      return first.startsWith("it") ? "it" : "en";
    }

    function readStoredLanguage() {
      try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return SUPPORTED_LANGUAGES.includes(stored) ? stored : null;
      } catch (error) {
        return null;
      }
    }

    function currentLanguage() {
      return state.language || readStoredLanguage() || browserDefaultLanguage();
    }

    function isEnglish() {
      return currentLanguage() === "en";
    }

    function languageSource() {
      return readStoredLanguage() ? "manual" : "system";
    }

    function i18n() {
      return AI_SKILL_I18N[currentLanguage()] || AI_SKILL_I18N.it || {};
    }

    function sectionLabel(section) {
      if (section === "Laboratorio operativo") return labText("Laboratorio operativo", "Operational lab");
      return (i18n().sectionLabels && i18n().sectionLabels[section]) || section;
    }

    function localizedMode(mode) {
      if (mode.id === "operational-lab" && isEnglish()) return { ...mode, label: "Operational lab", shortLabel: "Lab", description: "Two synthetic cases and six decisions: correct a summary and resume an interrupted agentic task.", outputNote: "Simulated outcomes and partial credit stay separate from questions. A local draft allows recovery after closing." };
      const translation = i18n().modes && i18n().modes[mode.id];
      return translation ? { ...mode, ...translation } : mode;
    }

    function localizedSectionGuide(section) {
      if (section === "Laboratorio operativo") return {title: labText("Laboratorio operativo", "Operational lab"), text: labText("Due casi sintetici, sei decisioni osservabili.", "Two synthetic cases, six observable decisions."), items: modeTopics(getModeById("operational-lab"))};
      const guide = sectionGuides[section] || sectionGuides.Literacy;
      if (section === "Harness") return {
        title: "Harness",
        text: isEnglish() ? "The harness manages execution, tools, context, and state. Interpret hypothetical cases; no environment is built or administered." : "L'harness gestisce esecuzione, strumenti, contesto e stato. Interpreti casi ipotetici; nessun ambiente viene costruito o amministrato.",
        items: isEnglish() ? ["Context and handoffs", "APIs, MCP, skills, and instructions", "Enforced permissions and contracts", "Checkpoints, recovery, and evaluation"] : ["Contesto e consegne", "API, MCP, skill e istruzioni", "Permessi effettivi e contratti", "Checkpoint, ripresa e valutazione"]
      };
      if (section === "AI moderne") return {
        title: isEnglish() ? "Modern AI" : "AI moderne",
        text: isEnglish() ? "Choose capabilities and tools for the stated task. These are hypothetical scenarios, not practical executions." : "Scegli capacità e strumenti adatti al compito dichiarato. Sono scenari ipotetici, non esecuzioni pratiche.",
        items: isEnglish() ? ["Capabilities and tools", "Images, audio, and video", "Quality, time, and cost", "Data and verification"] : ["Capacità e strumenti", "Immagini, audio e video", "Qualità, tempo e costo", "Dati e verifica"]
      };
      if (section === "Practical Lab") return { ...guide,
        text: isEnglish() ? "Hypothetical choices and written prompts with formative feedback; no execution is observed." : "Scelte ipotetiche e prompt scritti con feedback formativo; nessuna esecuzione osservata.",
        items: isEnglish() ? ["Hypothetical choices", "Written prompts", "Formative checklists", "Verification and responsibility"] : ["Scelte ipotetiche", "Prompt scritti", "Checklist formative", "Verifica e responsabilità"] };
      if (!isEnglish()) return guide;
      const englishGuides = {
        "Primi passi con l'AI": {
          title: "AI First Steps",
          text: "A guided path through essential GenAI capabilities, limitations, and responsible behaviors.",
          items: ["Capabilities", "Limits", "Requests", "Verification", "Privacy"]
        },
        "Literacy": {
          title: "Literacy",
          text: "Measures understanding of GenAI principles, limits, data, and reliability conditions.",
          items: ["Foundations and limits", "Hallucinations and checks", "Data, sources, and context", "Privacy and intellectual property"]
        },
        "Fondamenti tecnici LLM": {
          title: "LLM technical foundations",
          text: "Checks practical understanding of tokens, generation, training, context, neural networks, Transformers, hallucinations, RAG, embeddings, citations, and AI history.",
          items: ["Tokens and context", "Training and inference", "Neural networks and Transformers", "Hallucinations, RAG, and embeddings"]
        },
        "AI Agents": {
          title: "AI Agents",
          text: "Explores decisions on agentic processes, tools, supervision, and diagnosis. Scopes and traces are hypothetical: practical execution is not observed.",
          items: ["Workflows and coordination", "Tool arguments and outcomes", "Scope and untrusted instructions", "Stopping, escalation, and rollback"]
        },
        "Fluency · Delegation": {
          title: "Delegation",
          text: "Measures the ability to decide whether, when, and how to delegate a task to AI strategically.",
          items: ["Task choice", "Work decomposition", "Delegation boundaries", "Human responsibility"]
        },
        "Fluency · Description": {
          title: "Description",
          text: "Measures how clearly you communicate objectives, constraints, context, format, and quality criteria to the tool.",
          items: ["Clear brief", "Constraints and format", "Examples and iteration", "Clarifying questions"]
        },
        "Fluency · Discernment": {
          title: "Discernment",
          text: "Measures the ability to critically evaluate outputs, data, sources, usefulness, and risks before use.",
          items: ["Quality criteria", "Data verification", "Recognizing plausibility", "Accept or discard"]
        },
        "Fluency · Diligence": {
          title: "Diligence",
          text: "Measures responsible, ethical, transparent, and proportionate use of GenAI in real work.",
          items: ["Allowed data", "Transparency", "Compliance", "Final responsibility"]
        },
        "Practical Lab": {
          title: "Practical Lab",
          text: "Explores hypothetical choices and written prompts, with formative feedback; no execution is observed.",
          items: ["Operational mini-tasks", "Action selection", "Written prompt", "Controls and governance"]
        },
        "Mindset": {
          title: "Mindset",
          text: "Measures attitude, calibrated trust, experimentation, and willingness to change workflows.",
          items: ["Pragmatic openness", "Calibrated trust", "Continuous learning", "Team sharing"]
        }
      };
      return englishGuides[section] || guide;
    }

    function localizedLikertOptions() {
      const translated = i18n().likertOptions;
      if (!Array.isArray(translated)) return likertOptions;
      return likertOptions.map((option, index) => ({
        ...option,
        title: translated[index] ? translated[index][0] : option.title,
        text: translated[index] ? translated[index][1] : option.text
      }));
    }

    function applyEnglishQuestionTranslation(question) {
      const sourceId = question.sourceId || question.id;
      const english = AI_SKILL_I18N.en;
      const translation = english.formOverrides?.[question.formId]?.[sourceId] || english.questions?.[sourceId];
      if (!translation) return question;
      const localized = { ...question };
      if (Array.isArray(translation)) {
        localized.text = translation[0] || question.text;
        localized.hint = translation[1] || question.hint;
        return localized;
      }
      localized.text = translation.text || question.text;
      if (typeof translation.context === "string") localized.context = translation.context;
      localized.hint = translation.hint || question.hint;
      localized.feedback = translation.feedback || question.feedback;
      if (typeof translation.nextStep === "string") localized.nextStep = translation.nextStep;
      if (translation.rubric) localized.rubric = translation.rubric;
      if (Array.isArray(translation.options) && Array.isArray(question.options)) {
        localized.options = question.options.map((option, index) => ({
          ...option,
          title: translation.options[index] ? translation.options[index][0] : option.title,
          text: translation.options[index] ? translation.options[index][1] : option.text,
          ...(Array.isArray(translation.optionRationales) ? { rationale: translation.optionRationales[index] } : {})
        }));
      }
      return localized;
    }

    function buildEnglishQuestionForm(formId) {
      return baseQuestions.map(baseQuestion => applyEnglishQuestionTranslation({
        ...cloneQuestionData(baseQuestion),
        // New scenarios have form-specific layouts; legacy English layouts stay independent.
        ...(baseQuestion.section === "AI moderne" || ["agents", "harness"].includes(baseQuestion.pathId) ? cloneQuestionData(formOverrides[formId]?.[baseQuestion.id] || {}) : {}),
        sourceId: baseQuestion.id,
        formId,
        id: `${formId}_${baseQuestion.id}`
      }));
    }

    function showView(id) {
      ["introView", "profileView", "assessmentView", "dashboardView", "bibliographyView"].forEach(viewId => {
        $(viewId).classList.toggle("active", viewId === id);
      });
      if (id === "introView") {
        restartModeCarouselTimer();
      } else {
        clearModeCarouselTimer();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openProfileStep() {
      showView("profileView");
    }

    function showBibliography(backView = null) {
      state.bibliographyBackView = backView || (state.latestReport ? "dashboardView" : "introView");
      document.querySelectorAll("[data-bibliography-back]").forEach(button => {
        if (isEnglish()) {
          button.textContent = state.bibliographyBackView === "dashboardView" ? "Back to results" : "Back to home";
        } else {
          button.textContent = state.bibliographyBackView === "dashboardView" ? "Torna ai risultati" : "Torna alla home";
        }
      });
      showView("bibliographyView");
    }

    function closeBibliography() {
      showView(state.bibliographyBackView || "introView");
    }

    function applyBibliographyText() {
      const copy = bibliographyCopy[currentLanguage()] || bibliographyCopy.it;
      const setText = (selector, text) => {
        const element = document.querySelector(selector);
        if (element && typeof text === "string") element.textContent = text;
      };
      setText("#bibliographyView .bibliography-intro .kicker", copy.intro.kicker);
      setText("#bibliographyView .bibliography-intro h2", copy.intro.title);
      setText("#bibliographyView .bibliography-intro > p:nth-of-type(2)", copy.intro.body);
      setText("#bibliographyView .bibliography-intro > p:nth-of-type(3)", copy.intro.note);

      const sections = document.querySelectorAll("#bibliographyView .bibliography-section");
      if (sections[0] && copy.sections[0]) {
        const title = sections[0].querySelector("h2");
        const description = sections[0].querySelector("p.muted");
        if (title) title.textContent = copy.sections[0].title;
        if (description) description.textContent = copy.sections[0].description;
      }
      if (sections[1] && copy.sections[1]) {
        const title = sections[1].querySelector("h2");
        const description = sections[1].querySelector("p.muted");
        if (title) title.textContent = copy.sections[1].title;
        if (description) description.textContent = copy.sections[1].description;
      }
      if (sections[2] && copy.method) {
        const title = sections[2].querySelector("h3");
        const text = sections[2].querySelector("p");
        if (title) title.textContent = copy.method.title;
        if (text) text.textContent = copy.method.text;
      }

      document.querySelectorAll("#bibliographyView .bibliography-item").forEach((article, index) => {
        const item = copy.items[index];
        if (!item) return;
        const source = article.querySelector(".bibliography-source");
        const title = article.querySelector("h3");
        const text = article.querySelector("p");
        const link = article.querySelector(".bibliography-link");
        if (source) source.textContent = item.source;
        if (title) title.textContent = item.title;
        if (text) text.textContent = item.text;
        if (link) link.textContent = item.link;
      });
      const modernTitle = $("modernAiSourcesTitle");
      const modernNote = $("modernAiSourcesNote");
      const modernList = $("modernAiSourcesList");
      if (modernTitle) modernTitle.textContent = isEnglish() ? "Modern AI: capabilities and checks" : "AI moderne: capacità e controlli";
      if (modernNote) modernNote.textContent = isEnglish()
        ? "Primary sources reviewed on " + MODERN_AI.REVIEW_DATE + ". Scenarios are original editorial choices, not validated tests. Links open only on an explicit click."
        : "Fonti primarie ricontrollate il " + MODERN_AI.REVIEW_DATE + ". Gli scenari sono scelte editoriali originali, non test validati. I link si aprono solo con un click esplicito.";
      if (modernList) modernList.innerHTML = MODERN_AI.SOURCES.map(source => `<article class="bibliography-item"><div class="bibliography-source">${escapeHtml(source.id)}</div><h3>${escapeHtml(source.title)}</h3><p>${escapeHtml(source.note[isEnglish() ? 1 : 0])}</p><a class="bibliography-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${isEnglish() ? "Open source ↗" : "Apri la fonte ↗"}</a></article>`).join("");
      const agentsTitle = $("agenticSourcesTitle");
      const agentsNote = $("agenticSourcesNote");
      const agentsList = $("agenticSourcesList");
      if (agentsTitle) agentsTitle.textContent = isEnglish() ? "AI Agents: processes, supervision, and diagnosis" : "AI Agents: processi, supervisione e diagnosi";
      if (agentsNote) agentsNote.textContent = isEnglish()
        ? `Primary sources reviewed on ${AGENTIC_WORKFLOWS.REVIEW_DATE}. Traces and rubrics are original editorial scenarios, not validated measures of practical execution. Links open on a click.`
        : `Fonti primarie ricontrollate il ${AGENTIC_WORKFLOWS.REVIEW_DATE}. Tracce e rubriche sono scenari editoriali originali, non misure validate di esecuzione pratica. Link aperti su click.`;
      if (agentsList) agentsList.innerHTML = AGENTIC_WORKFLOWS.SOURCES.map(source => `<article class="bibliography-item"><div class="bibliography-source">${escapeHtml(source.id)}</div><h3>${escapeHtml(source.title)}</h3><p>${escapeHtml(source.note[isEnglish() ? 1 : 0])}</p><a class="bibliography-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${isEnglish() ? "Open source ↗" : "Apri la fonte ↗"}</a></article>`).join("");
      $("labSourcesTitle").textContent = labText("Laboratorio: stato, ripresa e limiti", "Lab: state, recovery, and limitations");
      $("labSourcesList").innerHTML = LOCAL_LAB.SOURCES.map(source => `<article class="bibliography-item"><h3>${escapeHtml(source.title)}</h3><p>${escapeHtml(source.note[isEnglish() ? 1 : 0])}</p><a class="bibliography-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${labText("Apri la fonte ↗", "Open source ↗")}</a></article>`).join("");
      $("completeSourcesTitle").textContent = labText("Completo: fondamenti e matrice", "Full test: foundations and matrix");
      $("completeSourcesList").innerHTML = COMPLETE_ASSESSMENT.SOURCES.map(source => `<article class="bibliography-item"><h3>${escapeHtml(source.title)}</h3><p>${escapeHtml(source.note[isEnglish() ? 1 : 0])}</p><a class="bibliography-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${labText("Apri la fonte ↗", "Open source ↗")}</a></article>`).join("");
      const harnessTitle = $("harnessSourcesTitle");
      const harnessNote = $("harnessSourcesNote");
      const harnessList = $("harnessSourcesList");
      if (harnessTitle) harnessTitle.textContent = isEnglish() ? "Harness: context, integration, and recovery" : "Harness: contesto, integrazioni e ripresa";
      if (harnessNote) harnessNote.textContent = isEnglish()
        ? `Primary sources reviewed on ${HARNESS_ASSESSMENT.REVIEW_DATE}. Scenarios assess understanding, not observed ability to build or administer a harness. Links open on a click.`
        : `Fonti primarie ricontrollate il ${HARNESS_ASSESSMENT.REVIEW_DATE}. Gli scenari esplorano la comprensione, non l'abilità osservata di costruire o amministrare un harness. Link aperti su click.`;
      if (harnessList) harnessList.innerHTML = HARNESS_ASSESSMENT.SOURCES.map(source => `<article class="bibliography-item"><div class="bibliography-source">${escapeHtml(source.id)}</div><h3>${escapeHtml(source.title)}</h3><p>${escapeHtml(source.note[isEnglish() ? 1 : 0])}</p><a class="bibliography-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${isEnglish() ? "Open source ↗" : "Apri la fonte ↗"}</a></article>`).join("");
    }

    function applyLanguageChrome() {
      const lang = currentLanguage();
      document.documentElement.lang = lang;
      document.querySelectorAll("[data-language]").forEach(button => {
        const active = button.dataset.language === lang;
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      const versionBadge = $("versionBadge");
      if (versionBadge) versionBadge.textContent = lang === "en" ? `Version ${APP_VERSION}` : `Versione ${APP_VERSION}`;
      const staticText = lang === "en" ? {
        heroTitle: "Knowledge and practices in AI use",
        subtitle: "Explore knowledge and judgment on scenarios, self-reported practices, written prompts, and simulated outcomes. Results distinguish each evidence type and its coverage.",
        sourceNote: "Operational model inspired by Literacy, Fluency, Mindset and the 4D of Fluency: Delegation, Description, Discernment, Diligence. It is not a psychometrically validated test: it is an internal diagnostic tool under improvement.",
        carouselTitle: "Choose your path",
        carouselIntro: "The full test covers Foundations, Modern AI, Agents, and Harness, with two local simulated cases. Shorter paths report only collected evidence.",
        autoplayPause: state.carouselPaused ? "Resume" : "Pause",
        start: "Start this test",
        bibliography: "Bibliography",
        output: "Output",
        profileDashboard: "Evidence overview",
        score: "Score",
        index: "Area coverage",
        report: "Report",
        jsonCsv: "JSON and CSV",
        resultReadingTitle: "How the result is read",
        resultReading: "Knowledge/scenario results, self-reports, formative text, and simulated outcomes stay separate. Area percentages require enough relevant questions; unassessed areas are identified. There is no global score or operational qualification.",
        profileDataKicker: "Optional data",
        beforeTest: "Before the test",
        profileIntro: "You can enter name, role, team and an initial estimate of your skills. All fields are optional: you can start even if everything is blank.",
        privacy: "The information stays local in the browser cache and localStorage. It is not automatically sent to external servers. It only makes the local report and any manual export more useful.",
        selfIntro: "Your initial estimates are personal expectations. They are kept separately, without automatic gaps or changes to question results.",
        profileFormTitle: "Data and initial self-assessment",
        name: "Name",
        role: "Role",
        area: "Area / team",
        optional: "Optional",
        selfTitle: "How competent do you consider yourself today?",
        selfHelp: "Enter an optional personal estimate from 0 to 100. It is not a test score and is not directly compared with the results.",
        selfOverallNote: "Overall assessment.",
        selfLiteracyNote: "Knowledge and understanding.",
        selfFluencyNote: "Operational use of AI.",
        selfMindsetNote: "Attitude and openness.",
        startTest: "Start the test",
        back: "Back",
        next: "Next",
        interrupt: "Interrupt test",
        finish: "Calculate dashboard",
        showHints: "Show details",
        hideHints: "Hide details",
        answerRequired: "Answer the question before continuing.",
        textAnswerRequired: "Enter an answer before continuing.",
        lastReport: "Show last report",
        footerLicense: "Released under the Apache 2.0 license",
        footerAria: "Copyright and license"
      } : {
        heroTitle: "Conoscenze e pratiche nell'uso dell'AI",
        subtitle: "Esplora conoscenze e giudizio su scenari, pratiche dichiarate, prompt scritti ed esiti simulati. Il risultato distingue ciascun tipo di evidenza e la sua copertura.",
        sourceNote: "Modello operativo ispirato alle dimensioni Literacy, Fluency e Mindset e alle 4D della Fluency: Delegation, Description, Discernment, Diligence. Non è un test psicometrico validato: è uno strumento diagnostico interno e migliorabile.",
        carouselTitle: "Scegli il tuo percorso",
        carouselIntro: "Il completo copre Fondamenti, AI moderne, Agenti e Harness, con due casi simulati locali. I percorsi brevi mostrano soltanto le evidenze raccolte.",
        autoplayPause: state.carouselPaused ? "Riprendi" : "Pausa",
        start: "Inizia questo test",
        bibliography: "Bibliografia",
        output: "Output",
        profileDashboard: "Quadro delle evidenze",
        score: "Punteggio",
        index: "Copertura per area",
        report: "Report",
        jsonCsv: "JSON e CSV",
        resultReadingTitle: "Come viene letto il risultato",
        resultReading: "Risultati dei quiz/scenari, dichiarazioni, testi formativi ed esiti simulati restano separati. Le percentuali per area richiedono abbastanza quesiti pertinenti; le aree non esplorate sono segnalate. Non ci sono indice globale o qualifiche operative.",
        profileDataKicker: "Dati facoltativi",
        beforeTest: "Prima del test",
        profileIntro: "Puoi indicare nome, ruolo, team e una stima iniziale delle tue skill. Tutti i campi sono facoltativi: puoi iniziare anche lasciando tutto vuoto.",
        privacy: "Le informazioni restano locali nella cache e nel localStorage del browser. Non vengono inviate automaticamente a server esterni. Servono solo a rendere più utile il report locale e l'eventuale export manuale.",
        selfIntro: "Le stime iniziali sono aspettative personali. Restano separate, senza scarti automatici o modifiche ai risultati dei quesiti.",
        profileFormTitle: "Dati e autovalutazione iniziale",
        name: "Nome",
        role: "Ruolo",
        area: "Area / team",
        optional: "Facoltativo",
        selfTitle: "Quanto ti consideri competente oggi?",
        selfHelp: "Inserisci una stima personale facoltativa da 0 a 100. Non è un punteggio del test e non viene confrontata direttamente con i risultati.",
        selfOverallNote: "Valutazione complessiva.",
        selfLiteracyNote: "Conoscenza e comprensione.",
        selfFluencyNote: "Uso operativo dell'AI.",
        selfMindsetNote: "Attitudine e apertura.",
        startTest: "Inizia il test",
        back: "Indietro",
        next: "Avanti",
        interrupt: "Interrompi il test",
        finish: "Calcola dashboard",
        showHints: "Mostra i dettagli",
        hideHints: "Nascondi i dettagli",
        answerRequired: "Rispondi alla domanda prima di proseguire.",
        textAnswerRequired: "Inserisci una risposta prima di proseguire.",
        lastReport: "Mostra ultimo report",
        footerLicense: "Rilasciato con licenza Apache 2.0",
        footerAria: "Copyright e licenza"
      };
      const selectors = [
        [".hero h1", staticText.heroTitle],
        [".subtitle", staticText.subtitle],
        [".source-note", staticText.sourceNote],
        ["#modeCarouselTitle", staticText.carouselTitle],
        [".carousel-heading p:last-child", staticText.carouselIntro],
        ["#modeAutoplayBtn", staticText.autoplayPause],
        ["#introStartBtn", staticText.start],
        ["#introBibliographyBtn", staticText.bibliography],
        [".landing-metrics .metric-card:nth-child(1) span", staticText.output],
        [".landing-metrics .metric-card:nth-child(1) strong", staticText.profileDashboard],
        [".landing-metrics .metric-card:nth-child(2) span", staticText.score],
        [".landing-metrics .metric-card:nth-child(2) strong", staticText.index],
        [".landing-metrics .metric-card:nth-child(3) span", staticText.report],
        [".landing-metrics .metric-card:nth-child(3) strong", staticText.jsonCsv],
        ["#introView > .card:last-child h3", staticText.resultReadingTitle],
        ["#introView > .card:last-child p", staticText.resultReading],
        ["#profileView .grid-2 > .card:first-child .kicker", staticText.profileDataKicker],
        ["#profileView .grid-2 > .card:first-child h2", staticText.beforeTest],
        ["#profileView .grid-2 > .card:first-child > p:nth-of-type(2)", staticText.profileIntro],
        ["#profileView .grid-2 > .card:first-child > p:nth-of-type(3)", staticText.privacy],
        ["#profileView .grid-2 > .card:first-child > p:nth-of-type(4)", staticText.selfIntro],
        ["#profileView .grid-2 > .card:nth-child(2) h2", staticText.profileFormTitle],
        ["label[for='selfOverallInput']", isEnglish() ? "Overall estimate" : "Stima complessiva"],
        ["label[for='nameInput']", staticText.name],
        ["label[for='roleInput']", staticText.role],
        ["label[for='areaInput']", staticText.area],
        [".self-assessment-box h3", staticText.selfTitle],
        [".self-assessment-box .muted", staticText.selfHelp],
        ["#selfOverallInput + .field-note", staticText.selfOverallNote],
        ["#selfLiteracyInput + .field-note", staticText.selfLiteracyNote],
        ["#selfFluencyInput + .field-note", staticText.selfFluencyNote],
        ["#selfMindsetInput + .field-note", staticText.selfMindsetNote],
        ["#startBtn", staticText.startTest],
        ["#profileBackBtn", staticText.back],
        ["#prevBtn", staticText.back],
        ["#nextBtn", staticText.next],
        ["#interruptBtn", staticText.interrupt],
        ["#finishBtn", staticText.finish],
        ["#loadLastBtn", staticText.lastReport]
      ];
      selectors.forEach(([selector, text]) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
      });
      ["nameInput", "roleInput", "areaInput"].forEach(id => {
        const input = $(id);
        if (input) input.placeholder = staticText.optional;
      });
      const legalFooter = document.querySelector(".legal-footer");
      if (legalFooter) legalFooter.setAttribute("aria-label", staticText.footerAria);
      const licenseLink = document.querySelector(".legal-footer a");
      if (licenseLink) licenseLink.textContent = staticText.footerLicense;
      const noviceBadge = document.querySelector(".novice-callout-badge");
      const noviceTitle = $("noviceCalloutTitle");
      const noviceText = document.querySelector(".novice-callout p");
      const noviceButton = $("noviceQuickStartBtn");
      if (noviceBadge) noviceBadge.textContent = isEnglish() ? "New · Guided path" : "Nuovo · Percorso guidato";
      if (noviceTitle) noviceTitle.textContent = isEnglish() ? "Is this your first step into AI?" : "È la prima volta che ti avvicini all'AI?";
      if (noviceText) noviceText.textContent = isEnglish() ? "Start with 10 simple questions and a tutorial built around your mistakes." : "Inizia con 10 domande semplici e un tutorial costruito sui tuoi errori.";
      if (noviceButton) noviceButton.textContent = isEnglish() ? "Explore AI First Steps" : "Scopri Primi passi";
      $("labPrivacyNote").textContent = labText("Completo e Laboratorio operativo condividono una bozza locale. Conserva risposte, testi e azioni confermate, senza i dati iniziali del profilo. Riprendila dalla pagina iniziale. Se la riprendi in un’altra scheda, sarà quella a salvarne le modifiche. Nessun invio a server.", "The full test and Operational lab share a local draft. It keeps answers, text, and confirmed actions, without initial profile data. Resume it from the home page. If you resume in another tab, that tab saves further changes. No server transfer.");
      applyBibliographyText();
    }

    function setLanguage(lang) {
      if (!SUPPORTED_LANGUAGES.includes(lang) || lang === currentLanguage()) return;
      if ($("assessmentView").classList.contains("active") && questions.length) {
        showToast(isEnglish() ? "Change language before starting a new assessment." : "Cambia lingua prima di iniziare un nuovo assessment.");
        applyLanguageChrome();
        return;
      }
      state.language = lang;
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      } catch (error) {
        console.warn("Unable to save language preference", error);
      }
      applyLanguageChrome();
      renderModeSelector();
      renderQuestionDistribution();
      renderLabDraftNotice();
      if ($("assessmentView").classList.contains("active")) renderQuestion();
      if ($("dashboardView").classList.contains("active") && state.latestReport) renderDashboard(state.latestReport);
    }

    function bindLanguageSwitcher() {
      document.querySelectorAll("[data-language]").forEach(button => {
        button.addEventListener("click", () => setLanguage(button.dataset.language));
      });
      applyLanguageChrome();
    }

    function getModeById(modeId) {
      return TEST_MODES.find(mode => mode.id === modeId) || TEST_MODES.find(mode => mode.id === DEFAULT_TEST_MODE_ID);
    }

    function modePoolQuestions(sourceQuestions, mode) {
      if (mode && mode.type === "learning") return FIRST_STEPS_QUESTIONS.it.filter(question => question.formId === "A");
      if (!mode || mode.id === DEFAULT_TEST_MODE_ID) {
        const form = sourceQuestions[0]?.formId || "A";
        return COMPLETE_ASSESSMENT.build(form, currentLanguage(), sourceQuestions);
      }
      return sourceQuestions.filter(question => question.section === mode.section);
    }

    function formWindowQuestions(sourceQuestions, count, formId, requiredIds = []) {
      const copy = [...sourceQuestions];
      const limit = Math.min(count, copy.length);
      const requiredSet = new Set(requiredIds);
      const required = copy.filter(question => requiredSet.has(question.sourceId || question.id)).slice(0, limit);
      const remaining = copy.filter(question => !requiredSet.has(question.sourceId || question.id));
      const remainingLimit = Math.max(0, limit - required.length);
      if (!FORM_IDS.includes(formId) || remainingLimit >= remaining.length) {
        return required.concat(remaining.slice(0, remainingLimit));
      }
      const formIndex = FORM_IDS.indexOf(formId);
      const offset = Math.floor((remaining.length * formIndex) / FORM_IDS.length);
      const selected = remaining.slice(offset).concat(remaining.slice(0, offset)).slice(0, remainingLimit);
      return required.concat(selected);
    }

    function sampleQuestions(sourceQuestions, count, formId = null, requiredIds = []) {
      const selected = formWindowQuestions(sourceQuestions, count, formId, requiredIds);
      const copy = [...selected];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function questionsForMode(sourceQuestions, mode, randomize = false, formId = null) {
      const selectedMode = mode || getModeById(DEFAULT_TEST_MODE_ID);
      if (selectedMode.id === "operational-lab") return LOCAL_LAB.questions(formId || sourceQuestions[0]?.formId || "A", currentLanguage());
      if (selectedMode.id === "complete") {
        const form = formId || sourceQuestions[0]?.formId || "A";
        // Landing counts also need the correctly localized source form.
        const sources = sourceQuestions === baseQuestions ? (isEnglish() ? buildEnglishQuestionForm(form) : buildQuestionForm(form)) : sourceQuestions;
        return COMPLETE_ASSESSMENT.order(COMPLETE_ASSESSMENT.build(form, currentLanguage(), sources), randomize ? shuffledValues : values => values);
      }
      const pool = modePoolQuestions(sourceQuestions, selectedMode);
      const slots = { "modern-ai": MODERN_AI.SLOTS, agents: AGENTIC_WORKFLOWS.SLOTS, harness: HARNESS_ASSESSMENT.SLOTS }[selectedMode.id];
      if (slots) {
        const selected = slots.map(slot => pool.find(question => (question.sourceId || question.id) === slot.id));
        if (selected.some(question => !question)) throw new Error(`Incomplete ${{ agents: "AI Agents", harness: "Harness", "modern-ai": "Modern AI" }[selectedMode.id]} coverage`);
        return randomize ? shuffledValues(selected) : selected;
      }
      const limit = selectedMode.questionLimit || pool.length;
      const requiredIds = selectedMode.id === "practical" ? ["P_DS_1", "P_DI_1"] : [];
      if (randomize) return sampleQuestions(pool, limit, formId, requiredIds);
      return pool.slice(0, Math.min(limit, pool.length));
    }

    function questionCountForMode(mode) {
      const selectedMode = mode || getModeById(DEFAULT_TEST_MODE_ID);
      if (selectedMode.id === "complete") return COMPLETE_TEST_COUNT;
      if (selectedMode.id === "operational-lab") return 6;
      if (selectedMode.type === "learning") return selectedMode.questionLimit;
      const pool = modePoolQuestions(baseQuestions, selectedMode);
      const limit = selectedMode.questionLimit || pool.length;
      return Math.min(limit, pool.length);
    }

    function modeDuration(mode) {
      if (mode.id === "complete") return isEnglish() ? "40-55 minutes (estimate to verify)" : "40-55 minuti (stima da verificare)";
      if (mode.id === "operational-lab") return isEnglish() ? "12-16 minutes (estimate)" : "12-16 minuti (stima)";
      if (["modern-ai", "agents", "harness"].includes(mode.id)) return isEnglish() ? "8-12 minutes (estimate)" : "8-12 minuti (stima)";
      return isEnglish() ? "3-5 minutes" : "3-5 minuti";
    }

    function modeBadge(mode) {
      if (mode.id === "operational-lab") return isEnglish() ? "2 cases · 6 decisions" : "2 casi · 6 decisioni";
      if (mode.type === "learning") return isEnglish() ? "Guided learning" : "Apprendimento guidato";
      if (isEnglish()) return mode.id === DEFAULT_TEST_MODE_ID ? "Evidence overview" : "Thematic report";
      return mode.id === DEFAULT_TEST_MODE_ID ? "Quadro delle evidenze" : "Report tematico";
    }

    function modeTopics(mode) {
      if (mode.id === "operational-lab") return isEnglish() ? ["Data summary", "Permissions", "Checkpoint", "Local simulations"] : ["Riepilogo dati", "Permessi", "Checkpoint", "Simulazioni locali"];
      if (mode.type === "learning") return isEnglish()
        ? ["What GenAI can do", "Limits", "Requests", "Verification", "Privacy"]
        : ["Cosa può fare", "Limiti", "Richieste", "Verifica", "Privacy"];
      if (mode.id === DEFAULT_TEST_MODE_ID) {
        return isEnglish()
          ? ["Foundations", "Modern AI", "Agents", "Harness", "2 simulated cases"]
          : ["Fondamenti", "AI moderne", "Agenti", "Harness", "2 casi simulati"];
      }
      const guide = localizedSectionGuide(mode.section);
      return guide ? guide.items : [sectionLabel(mode.section) || localizedMode(mode).label];
    }

    function selectedTestModeId() {
      return state.selectedModeId || DEFAULT_TEST_MODE_ID;
    }

    function renderModeSelector() {
      const container = $("testModeSelector");
      if (!container) return;
      const selectedIndex = TEST_MODES.findIndex(mode => mode.id === selectedTestModeId());
      const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;
      container.style.transform = `translateX(-${activeIndex * 100}%)`;
      container.innerHTML = TEST_MODES.map(rawMode => {
        const mode = localizedMode(rawMode);
        const count = questionCountForMode(mode);
        const selected = mode.id === state.selectedModeId;
        const topicChips = modeTopics(mode)
          .map(topic => `<span class="pill">${escapeHtml(topic)}</span>`)
          .join("");
        return `
          <article class="mode-card mode-slide ${selected ? "selected" : ""}" id="mode_${escapeHtml(mode.id)}" aria-label="${escapeHtml(mode.label)}" aria-hidden="${selected ? "false" : "true"}">
            <div class="mode-card-top">
              <div>
                <span class="mode-eyebrow">${escapeHtml(modeBadge(mode))}</span>
                <h3>${escapeHtml(mode.label)}</h3>
              </div>
              <strong>${mode.id === "operational-lab" ? modeBadge(mode) : `${count} ${mode.id === "complete" ? labText("unità di risposta", "response units") : labText("domande", "questions")}`}</strong>
            </div>
            <p class="mode-card-desc">${escapeHtml(mode.description)}</p>
            <div class="mode-facts" aria-label="${isEnglish() ? "Path characteristics" : "Caratteristiche del percorso"}">
              <div>
                <span>${isEnglish() ? "Duration" : "Durata"}</span>
                <strong>${escapeHtml(modeDuration(mode))}</strong>
              </div>
              <div>
                <span>${isEnglish() ? "Result" : "Risultato"}</span>
                <strong>${escapeHtml(mode.outputNote)}</strong>
              </div>
            </div>
            <div class="pill-row mode-topic-row" aria-label="${isEnglish() ? "Topics covered" : "Temi affrontati"}">
              ${topicChips}
            </div>
          </article>
        `;
      }).join("");
      renderModeDots();
    }

    function updateSelectedMode(modeId) {
      state.selectedModeId = getModeById(modeId).id;
      const selfBox = document.querySelector(".self-assessment-box");
      if (selfBox) selfBox.hidden = getModeById(state.selectedModeId).type === "learning";
      renderModeSelector();
      renderQuestionDistribution();
      restartModeCarouselTimer();
    }

    function moveSelectedMode(delta) {
      const currentIndex = TEST_MODES.findIndex(mode => mode.id === selectedTestModeId());
      const nextIndex = (currentIndex + delta + TEST_MODES.length) % TEST_MODES.length;
      updateSelectedMode(TEST_MODES[nextIndex].id);
    }

    function renderModeDots() {
      const dots = $("testModeDots");
      if (!dots) return;
      dots.innerHTML = TEST_MODES.map(mode => {
        const selected = mode.id === selectedTestModeId();
        const visibleMode = localizedMode(mode);
        return `<button type="button" class="carousel-dot ${selected ? "active" : ""}" data-mode-id="${escapeHtml(mode.id)}" aria-label="${isEnglish() ? "Show" : "Mostra"} ${escapeHtml(visibleMode.label)}" aria-current="${selected ? "true" : "false"}"></button>`;
      }).join("");
      Array.from(dots.querySelectorAll("[data-mode-id]")).forEach(button => {
        button.addEventListener("click", (event) => updateSelectedMode(event.currentTarget.dataset.modeId));
      });
    }

    function clearModeCarouselTimer() {
      if (state.carouselTimer) {
        window.clearInterval(state.carouselTimer);
        state.carouselTimer = null;
      }
    }

    function shouldRunModeCarousel() {
      return !state.carouselPaused && $("introView").classList.contains("active");
    }

    function restartModeCarouselTimer() {
      clearModeCarouselTimer();
      if (!shouldRunModeCarousel()) return;
      state.carouselTimer = window.setInterval(() => moveSelectedMode(1), CAROUSEL_INTERVAL_MS);
    }

    function updateModeAutoplayButton() {
      const button = $("modeAutoplayBtn");
      if (!button) return;
      button.textContent = state.carouselPaused ? (isEnglish() ? "Resume" : "Riprendi") : (isEnglish() ? "Pause" : "Pausa");
      button.setAttribute("aria-pressed", state.carouselPaused ? "true" : "false");
    }

    function toggleModeCarouselAutoplay() {
      state.carouselPaused = !state.carouselPaused;
      updateModeAutoplayButton();
      restartModeCarouselTimer();
    }

    function bindModeCarouselGestures() {
      const frame = $("modeCarouselFrame");
      if (!frame) return;
      let startX = 0;
      let startY = 0;
      frame.addEventListener("touchstart", (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        startX = touch.clientX;
        startY = touch.clientY;
      }, { passive: true });
      frame.addEventListener("touchend", (event) => {
        const touch = event.changedTouches && event.changedTouches[0];
        if (!touch) return;
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
          moveSelectedMode(deltaX < 0 ? 1 : -1);
        }
      }, { passive: true });
    }

    function bindModeCarouselAutoplay() {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        state.carouselPaused = true;
      }
      const autoplayButton = $("modeAutoplayBtn");
      if (autoplayButton) {
        autoplayButton.addEventListener("click", toggleModeCarouselAutoplay);
      }
      updateModeAutoplayButton();
      restartModeCarouselTimer();
    }

    function renderQuestionDistribution() {
      const mode = getModeById(selectedTestModeId());
      const modeQuestions = mode.type === "learning" ? FIRST_STEPS_QUESTIONS.it.filter(question => question.formId === "A") : questionsForMode(baseQuestions, mode);
      const counts = modeQuestions.reduce((acc, question) => {
        acc[question.section] = (acc[question.section] || 0) + 1;
        return acc;
      }, {});
      const total = modeQuestions.length;
      const container = $("questionDistribution");
      if (container) {
        const rows = mode.id === "complete" ? ["F","U","A","H"].map(area => `<div class="topic-row"><span>${escapeHtml(ASSESSMENT_V3.label(ASSESSMENT_V3.AREA_LABELS[area],currentLanguage()))}</span><strong>${COMPLETE_ASSESSMENT.SLOTS.filter(slot => slot.primaryArea === area).length}</strong></div>`).join("") : SECTION_ORDER
          .filter(section => counts[section])
          .map(section => `<div class="topic-row"><span>${escapeHtml(sectionLabel(section))}</span><strong>${counts[section]}</strong></div>`)
          .join("");
        container.innerHTML = `
          ${rows}
          <div class="topic-row topic-total"><span>${escapeHtml(localizedMode(mode).shortLabel || localizedMode(mode).label)}</span><strong>${total}</strong></div>
        `;
      }
      const heroCount = $("heroCount");
      if (heroCount) heroCount.textContent = mode.id === "operational-lab" ? (isEnglish() ? "2 cases" : "2 casi") : total;
      const heroPills = document.querySelector(".hero-card .pill-row");
      if (heroPills) heroPills.innerHTML = modeTopics(mode).slice(0, 5).map(topic => `<span class="pill">${escapeHtml(topic)}</span>`).join("");
      const heroDescription = $("heroCountDescription");
      if (heroDescription) {
        heroDescription.textContent = mode.id === "operational-lab" ? labText("6 decisioni con azioni locali e feedback dopo il completamento", "6 decisions with local actions and feedback after completion") : mode.type === "learning"
          ? (isEnglish() ? "guided questions followed by a personalized local tutorial" : "domande guidate seguite da un tutorial personalizzato locale")
          : mode.id === DEFAULT_TEST_MODE_ID
          ? (isEnglish() ? "response units: 36 questions/scenarios, 6 self-reports, 2 formative texts, and 6 decisions in 2 simulated cases" : "unità di risposta: 36 quiz/scenari, 6 dichiarazioni, 2 testi formativi e 6 decisioni in 2 casi simulati")
          : (isEnglish() ? "questions from one of three forms in the selected thematic path, with a local report dedicated to that section" : "domande da una delle tre forme del percorso tematico selezionato, con report locale dedicato alla sezione scelta");
      }
      const modeFootnote = $("modeFootnote");
      if (modeFootnote) {
        modeFootnote.textContent = mode.id === "operational-lab" ? labText("Forme A/B/C ruotate localmente. Puoi invertire verifica e calcolo nel primo caso. Nessuna azione esce dal simulatore.", "A/B/C forms rotate locally. You may swap verification and calculation in the first case. No action leaves the simulator.") : mode.type === "learning"
          ? (isEnglish() ? "Three forms rotate locally. The result supports learning and is not comparable with the AI Skill index." : "Tre forme ruotano localmente. Il risultato serve all'apprendimento e non è confrontabile con l'indice AI Skill.")
          : mode.id === DEFAULT_TEST_MODE_ID
          ? (isEnglish() ? "At start, the app selects one of the three available forms for the current language. Alternatives are shuffled for each assessment." : "All'avvio viene scelta una delle tre forme parallele disponibili per la lingua corrente. Le alternative vengono rimescolate a ogni assessment.")
          : (isEnglish() ? "The thematic path rotates three forms for the selected area, measures only that area, and does not produce a global profile." : "Il percorso tematico ruota tre forme per l'area scelta, misura solo quell'area e non produce un profilo globale.");
      }
      const metricValues = document.querySelectorAll(".landing-metrics .metric-card strong");
      if (metricValues.length >= 3 && mode.type === "learning") {
        metricValues[0].textContent = isEnglish() ? "Learning tutorial" : "Tutorial didattico";
        metricValues[1].textContent = isEnglish() ? "Objectives out of 10" : "Obiettivi su 10";
        metricValues[2].textContent = "JSON e CSV";
      }
      const readingTitle = document.querySelector(".landing-metrics + .card h3");
      const readingText = document.querySelector(".landing-metrics + .card p");
      if (mode.type === "learning" && readingTitle && readingText) {
        readingTitle.textContent = isEnglish() ? "How learning feedback works" : "Come funziona il feedback didattico";
        readingText.textContent = isEnglish() ? "Mistakes select short learning units. The result is not an AI Skill score and is not compared with the assessment." : "Gli errori selezionano brevi unità di apprendimento. Il risultato non è un punteggio AI Skill e non viene confrontato con l'assessment.";
      } else if (metricValues.length >= 3 && readingTitle && readingText) {
        metricValues[0].textContent = isEnglish() ? "Evidence overview" : "Quadro delle evidenze";
        metricValues[1].textContent = isEnglish() ? "Area coverage" : "Copertura per area";
        metricValues[2].textContent = isEnglish() ? "JSON and CSV" : "JSON e CSV";
        readingTitle.textContent = isEnglish() ? "How the result is read" : "Come viene letto il risultato";
        readingText.textContent = isEnglish() ? "Knowledge/scenarios, self-reports, formative text, and simulated outcomes stay separate, with coverage for each area. No global score or operational qualification." : "Quiz/scenari, dichiarazioni, testi formativi ed esiti simulati restano separati, con copertura per area. Nessun indice globale o qualifica operativa.";
      }
    }

    function showToast(message) {
      const toast = $("toast");
      toast.textContent = message;
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 2200);
    }

    function optionalScore(inputId) {
      const raw = $(inputId).value.trim();
      if (raw === "") return null;
      const value = Number(raw);
      if (!Number.isFinite(value)) return null;
      return Math.round(clamp(value, 0, 100));
    }

    function startAssessment() {
      const selectedMode = getModeById(selectedTestModeId());
      const usesDraft = ["complete", "operational-lab"].includes(selectedMode.id);
      const saved = usesDraft ? readLabDraft() : null;
      if (saved?.slot && saved.status !== "absent" && !window.confirm(labText(
        "Una bozza esiste già. Sostituirla con una nuova sessione? Puoi annullare e riprenderla dalla pagina iniziale.",
        "A draft already exists. Replace it with a new session? Cancel to resume it from the home page."
      ))) return;
      return withAssessmentStorageLock(() => {
        if (saved?.slot) {
          const current = readLabDraft();
          if (!current.slot || !sameDraftSlot(saved.slot, current.slot)) { markDraftConflict(); return; }
        }
        beginAssessment(selectedMode, saved?.slot, true);
      }, () => beginAssessment(selectedMode, null, false));
    }

    function warnUncoordinatedStorage() {
      labStorageWarning(labText("Il browser non consente di coordinare il salvataggio tra schede. Puoi completare il test ed esportare il report da questa pagina.", "The browser cannot coordinate saving across tabs. You can complete the test and export your report from this page."));
    }

    function beginAssessment(selectedMode, draftSlot, writable) {
      const selectedForm = writable ? selectNextForm(selectedMode.id, currentLanguage()) : shuffledValues(FORM_IDS)[0];
      const sourceQuestions = isEnglish() ? buildEnglishQuestionForm(selectedForm) : buildQuestionForm(selectedForm);
      questions = selectedMode.type === "learning"
        ? shuffledValues(FIRST_STEPS_QUESTIONS[currentLanguage()].filter(question => question.formId === selectedForm)).map(question => ({
            ...cloneQuestionData(question),
            id: question.id,
            sourceId: question.id,
            section: selectedMode.section,
            dimension: "literacy",
            hint: isEnglish() ? "Choose the most useful and verifiable behavior." : "Scegli il comportamento più utile e verificabile.",
            options: question.options.map(option => ({ title: option.title, text: "", score: option.correct ? 5 : 1, correct: option.correct }))
          }))
        : questionsForMode(sourceQuestions, selectedMode, true, selectedForm);
      state.formId = selectedForm;
      state.selectedModeId = selectedMode.id;
      const visibleMode = localizedMode(selectedMode);
      state.meta = {
        sessionId: newAssessmentId(),
        name: $("nameInput").value.trim(),
        role: $("roleInput").value.trim(),
        area: $("areaInput").value.trim(),
        assessmentVersion: APP_VERSION,
        language: currentLanguage(),
        languageSource: languageSource(),
        formId: selectedForm,
        formVersion: selectedMode.type === "learning" ? "first-steps-1.0" : FORM_VERSION,
        questionBankVersion: selectedMode.type === "learning" ? "2026.07-first-steps-1" : QUESTION_BANK_VERSION,
        testMode: {
          id: selectedMode.id,
          label: visibleMode.label,
          type: selectedMode.type,
          section: selectedMode.section,
          questionCount: questions.length
        },
        selfAssessment: {
          overall: optionalScore("selfOverallInput"),
          literacy: optionalScore("selfLiteracyInput"),
          fluency: optionalScore("selfFluencyInput"),
          mindset: optionalScore("selfMindsetInput")
        },
        startedAt: new Date().toISOString()
      };
      state.index = 0;
      state.assessmentEpoch = readAssessmentEpoch();
      state.finishing = false;
      state.draftOwner = draftSlot ? { slot: draftSlot, sessionId: state.meta.sessionId, revision: 0 } : null;
      state.labOrder = "verify-first";
      state.answers = {};
      state.optionOrders = {};
      state.hintsVisible = {};
      clearAutoAdvance();
      if (state.draftOwner) writeLabDraft(state.draftOwner, snapshotLabDraft());
      else if (!writable) warnUncoordinatedStorage();
      else if (["complete", "operational-lab"].includes(selectedMode.id)) labStorageWarning();
      showView("assessmentView");
      renderQuestion();
      if (selectedMode.id === "operational-lab") $("questionTitle").focus();
    }

    function optionSource(question) {
      if (question.type === "likert") return localizedLikertOptions();
      return question.options || [];
    }

    function shuffledOptionIndexes(question) {
      if (question.type === "text") return [];
      const options = optionSource(question);
      if (!options.length) return [];
      if (!state.optionOrders[question.id]) {
        const indexes = options.map((_, index) => index);
        for (let i = indexes.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
        }
        const scores = indexes.map(index => {
          const option = options[index];
          return Number(question.type === "likert" ? option.value : option.score) || 0;
        });
        const ascending = scores.every((score, index) => index === 0 || score >= scores[index - 1]);
        const descending = scores.every((score, index) => index === 0 || score <= scores[index - 1]);
        if (indexes.length > 2 && (ascending || descending)) {
          [indexes[1], indexes[2]] = [indexes[2], indexes[1]];
        } else if (indexes.length === 2 && indexes[0] === 0) {
          indexes.reverse();
        }
        state.optionOrders[question.id] = indexes;
      }
      return state.optionOrders[question.id];
    }

    function displayOptionsFor(question) {
      const options = optionSource(question);
      return shuffledOptionIndexes(question).map((originalIndex, displayIndex) => ({
        option: options[originalIndex],
        value: question.type === "likert" ? options[originalIndex].value : originalIndex,
        displayIndex
      }));
    }

    function renderQuestion() {
      const q = questions[state.index];
      const total = questions.length;
      const count = answeredCount();
      const pct = Math.round((state.index / total) * 100);

      $("progressText").textContent = state.selectedModeId === "complete" ? labText(`Unità ${state.index + 1} di ${total}`, `Unit ${state.index + 1} of ${total}`) : isEnglish() ? `Question ${state.index + 1} of ${total}` : `Domanda ${state.index + 1} di ${total}`;
      $("answeredText").textContent = isEnglish() ? `${count} answers` : `${count} risposte`;
      $("progressFill").style.width = `${pct}%`;
      $("sectionBadge").textContent = sectionLabel(q.section);
      $("questionTitle").textContent = q.text;
      const questionContext = $("questionContext");
      questionContext.hidden = !q.context;
      questionContext.textContent = q.context || "";
      $("questionHint").textContent = (q.hint || "") + (q.type === "text" ? (isEnglish() ? " Formative text: no automatic quality score." : " Testo formativo: nessun punteggio automatico di qualità.") : "");
      const responseGuide = $("responseGuide");
      responseGuide.hidden = q.type !== "likert";
      responseGuide.textContent = q.type === "likert"
        ? (isEnglish()
          ? "Choose what you regularly do in practice, not only what you know or could explain. If two options seem similar, show the details before answering."
          : "Scegli ciò che fai abitualmente nella pratica, non soltanto ciò che conosci o sapresti spiegare. Se due alternative sembrano simili, mostra i dettagli prima di rispondere.")
        : "";

      const guide = localizedSectionGuide(q.section);
      $("sideTitle").textContent = guide.title;
      $("sideText").textContent = guide.text;
      $("sideList").innerHTML = guide.items.map(item => `<div class="mini-item">${escapeHtml(item)}</div>`).join("");

      const currentValue = state.answers[q.id];
      if (q.type === "simulation") { renderLabQuestion(q); return; }

      if (q.type === "text") {
        $("options").innerHTML = `
          <textarea id="${q.id}_text" placeholder="${isEnglish() ? "Write exactly what you would use in the real situation..." : "Scrivi esattamente ciò che useresti nella situazione reale..."}">${escapeHtml(currentValue || "")}</textarea>
        `;
        const textarea = $(`${q.id}_text`);
        textarea.addEventListener("input", (event) => {
          state.answers[q.id] = event.target.value;
          saveLabDraft();
          updateNavigationState(q);
        });
      } else if (q.type === "multi") {
        const selectedValues = Array.isArray(currentValue) ? currentValue : [];
        const opts = displayOptionsFor(q);
        const detailsVisible = Boolean(state.hintsVisible[q.id]);
        const optionMarkup = opts.map(({ option: opt, value: optionValue, displayIndex }) => {
          const checked = selectedValues.includes(Number(optionValue));
          return `
            <label class="option ${checked ? "selected" : ""}" for="${q.id}_${displayIndex}">
              <input id="${q.id}_${displayIndex}" type="checkbox" name="${q.id}" value="${optionValue}" ${checked ? "checked" : ""} />
              <span><strong>${escapeHtml(opt.title)}</strong>${detailsVisible && opt.text ? `<span class="option-detail">${escapeHtml(opt.text)}</span>` : ""}</span>
            </label>
          `;
        }).join("");
        $("options").innerHTML = optionMarkup + optionHintToggle(q, opts, detailsVisible);

        Array.from(document.querySelectorAll(`input[name="${q.id}"]`)).forEach(input => {
          input.addEventListener("change", () => {
            state.answers[q.id] = Array.from(document.querySelectorAll(`input[name="${q.id}"]:checked`)).map(item => Number(item.value));
            saveLabDraft();
            renderQuestion();
          });
        });
        bindHintToggle(q);
      } else {
        const opts = displayOptionsFor(q);
        const detailsVisible = Boolean(state.hintsVisible[q.id]);
        const optionMarkup = opts.map(({ option: opt, value: optionValue, displayIndex }) => {
          const checked = String(currentValue) === String(optionValue);
          return `
            <label class="option ${checked ? "selected" : ""}" for="${q.id}_${displayIndex}">
              <input id="${q.id}_${displayIndex}" type="radio" name="${q.id}" value="${optionValue}" ${checked ? "checked" : ""} />
              <span><strong>${escapeHtml(opt.title)}</strong>${detailsVisible && opt.text ? `<span class="option-detail">${escapeHtml(opt.text)}</span>` : ""}</span>
            </label>
          `;
        }).join("");
        $("options").innerHTML = optionMarkup + optionHintToggle(q, opts, detailsVisible);

        Array.from(document.querySelectorAll(`input[name="${q.id}"]`)).forEach(input => {
          input.addEventListener("change", (event) => {
            const selectedValue = Number(event.target.value);
            state.answers[q.id] = selectedValue;
            saveLabDraft();
            renderQuestion();
            scheduleAutoAdvance(q, state.index, selectedValue);
          });
        });
        bindHintToggle(q);
      }

      updateNavigationState(q);
    }

    function isAutoAdvanceQuestion(question) {
      return question.type !== "multi" && question.type !== "text" && question.type !== "simulation";
    }

    function clearAutoAdvance() {
      if (!state.autoAdvanceTimer) return;
      window.clearTimeout(state.autoAdvanceTimer);
      state.autoAdvanceTimer = null;
    }

    function scheduleAutoAdvance(question, expectedIndex, expectedValue) {
      clearAutoAdvance();
      if (!isAutoAdvanceQuestion(question)) return;
      if (expectedIndex >= questions.length - 1) return;
      state.autoAdvanceTimer = window.setTimeout(() => {
        state.autoAdvanceTimer = null;
        const currentQuestion = questions[state.index];
        const sameQuestion = currentQuestion && currentQuestion.id === question.id && state.index === expectedIndex;
        const sameAnswer = String(state.answers[question.id]) === String(expectedValue);
        if (sameQuestion && sameAnswer && isAnswered(question)) {
          goNext();
        }
      }, AUTO_ADVANCE_DELAY_MS);
    }

    function optionHintToggle(question, displayedOptions, visible) {
      const hasDetails = displayedOptions.some(item => item.option && item.option.text);
      if (!hasDetails) return "";
      const label = visible
        ? (isEnglish() ? "Hide details" : "Nascondi i dettagli")
        : (isEnglish() ? "Show details" : "Mostra i dettagli");
      return `<div class="hint-toggle-row"><button type="button" class="hint-toggle" id="optionHintToggle">${label}</button></div>`;
    }

    function bindHintToggle(question) {
      const button = $("optionHintToggle");
      if (!button) return;
      button.addEventListener("click", () => {
        state.hintsVisible[question.id] = !state.hintsVisible[question.id];
        renderQuestion();
      });
    }

    function updateNavigationState(q) {
      const total = questions.length;
      $("answeredText").textContent = q.type === "simulation" && state.selectedModeId !== "complete" ? labText(`${answeredCount()} decisioni confermate`, `${answeredCount()} confirmed decisions`) : isEnglish() ? `${answeredCount()} answers` : `${answeredCount()} risposte`;
      $("prevBtn").textContent = isEnglish() ? "Back" : "Indietro";
      $("nextBtn").textContent = isEnglish() ? "Next" : "Avanti";
      $("interruptBtn").textContent = isEnglish() ? "Interrupt test" : "Interrompi il test";
      $("finishBtn").textContent = state.selectedModeId === "complete" ? labText("Mostra quadro delle evidenze", "Show evidence overview") : q.type === "simulation" ? labText("Mostra esiti simulati", "Show simulated outcomes") : isEnglish() ? "Calculate dashboard" : "Calcola dashboard";
      $("prevBtn").disabled = state.index === 0;
      $("nextBtn").style.display = state.index === total - 1 ? "none" : "inline-flex";
      $("finishBtn").style.display = state.index === total - 1 ? "inline-flex" : "none";
      $("nextBtn").disabled = !isAnswered(q);
      $("finishBtn").disabled = answeredCount() < questions.length;
    }

    function isAnswered(question) {
      const value = state.answers[question.id];
      if (question.type === "simulation") return LOCAL_LAB.valid(question.sourceId, value);
      if (question.type === "text") return typeof value === "string" && value.trim().length >= (question.proceedChars || 1);
      if (question.type === "multi") return Array.isArray(value) && value.length >= 1;
      return typeof value !== "undefined";
    }

    function answeredCount() {
      return questions.filter(question => isAnswered(question)).length;
    }

    function goNext() {
      clearAutoAdvance();
      const q = questions[state.index];
      if (!isAnswered(q)) {
        showToast(q.type === "text"
          ? (isEnglish() ? "Enter an answer before continuing." : "Inserisci una risposta prima di proseguire.")
          : (isEnglish() ? "Answer the question before continuing." : "Rispondi alla domanda prima di proseguire."));
        return;
      }
      if (state.index < questions.length - 1) {
        state.index += 1;
        saveLabDraft();
        renderQuestion();
        if (q.type === "simulation" || questions[state.index].type === "simulation") $("questionTitle").focus();
      }
    }

    function goPrev() {
      clearAutoAdvance();
      if (state.index > 0) {
        state.index -= 1;
        saveLabDraft();
        renderQuestion();
        if (questions[state.index].type === "simulation") $("questionTitle").focus();
      }
    }

    function interruptAssessment() {
      if (state.finishing) return;
      clearAutoAdvance();
      const ok = window.confirm(isEnglish()
        ? "Interrupt the current test and return to the home page? Your answers for this session will be discarded."
        : "Interrompere il test corrente e tornare alla pagina principale? Le risposte di questa sessione verranno eliminate.");
      if (!ok) return;
      const warning = labText(
        "Test interrotto. Il browser non ha consentito di eliminare la bozza: una copia precedente potrebbe essere ancora presente.",
        "Test interrupted. The browser did not allow the draft to be removed. An earlier copy may still be present."
      );
      const owner = state.draftOwner;
      const leave = draftRemoved => {
        resetToInitialPage(false);
        if (draftRemoved) showToast(reportText("Test interrotto.", "Test interrupted."));
      };
      if (!owner || owner.readOnly || owner.conflict) {
        if (["complete", "operational-lab"].includes(state.meta?.testMode?.id)) { labStorageWarning(warning); leave(false); }
        else leave(true);
        return;
      }
      return withAssessmentStorageLock(() => leave(removeLabDraft(owner.slot, warning)), () => { labStorageWarning(warning); leave(false); });
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function calculateResults() {
      if (getModeById(state.meta?.testMode?.id).type === "learning") return calculateLearningResults();
      const prepared = questions.map(question => question.type === "likert" ? { ...question, options: localizedLikertOptions() } : question);
      return ASSESSMENT_V3.evaluate(prepared, state.answers, state.meta, new Date().toISOString());
    }

    function calculateLearningResults() {
      const answers = questions.map(question => {
        const selected = question.options[Number(state.answers[question.id])];
        return { id: question.id, sourceId: question.id, formId: question.formId, section: question.section, dimension: question.dimension, sub: question.objectiveId, type: question.type, question: question.text, answer: selected ? selected.title : "", answerText: "", score: selected && selected.correct ? 5 : 1, correct: Boolean(selected && selected.correct), objectiveId: question.objectiveId, learningUnitId: question.learningUnitId };
      });
      const correctCount = answers.filter(answer => answer.correct).length;
      const recommendedUnitIds = [...new Set(answers.filter(answer => !answer.correct).map(answer => answer.learningUnitId))];
      const profile = correctCount <= 3 ? (isEnglish() ? "Start with the foundations" : "Inizia dalle basi") : correctCount <= 6 ? (isEnglish() ? "Foundations in progress" : "Basi in costruzione") : correctCount <= 8 ? (isEnglish() ? "Foundations in place, keep practicing" : "Basi presenti, continua ad allenarle") : (isEnglish() ? "Ready for a thematic path" : "Pronto per un percorso tematico");
      return { meta: { ...state.meta, completedAt: new Date().toISOString() }, score: { overall: correctCount * 10 }, profile, answers, correctCount, recommendedUnitIds, recommendations: { profile: [], dimensions: [] } };
    }

    function englishProfileDescription(profile) {
      const descriptions = {
        Beginner: "Low Literacy and low Fluency. The priority is to build conceptual foundations and first guided experiences, avoiding both rejection and naive use.",
        Curious: "High Fluency and low Literacy. The person already uses GenAI, but needs stronger understanding of limits, sources, privacy, and verification criteria.",
        Expert: "High Literacy and low Fluency. The person knows concepts and risks, but needs to translate them into operational routines, templates, and daily use cases.",
        Champion: "High Literacy and high Fluency. The person can become an internal reference, mentor, or contributor to playbooks and practices."
      };
      return descriptions[profile] || "";
    }

    function localizedProfileName(profile) {
      if (profile === "Profilo tematico" || profile === "Thematic profile") {
        return isEnglish() ? "Thematic profile" : "Profilo tematico";
      }
      return profile || (isEnglish() ? "Not available" : "Non disponibile");
    }

    function localizedSubLabel(sub) {
      const labels = isEnglish() ? {
        literacy: "Literacy",
        technical: "Technical foundations",
        mindset: "Mindset",
        delegation: "Delegation",
        description: "Description",
        discernment: "Discernment",
        diligence: "Diligence"
      } : subLabels;
      return labels[sub] || sub || "";
    }

    function sourceQuestionId(item) {
      const raw = String((item && (item.sourceId || item.id)) || "");
      return raw.replace(/^(A|B|C|EN)_/, "");
    }

    function localizedReviewItem(item) {
      return { ...item, subLabel: localizedSubLabel(item.sub || item.dimension) };
    }

    function displayMindsetLens(report) {
      return report?.mindsetLens || { label: "—", text: isEnglish() ? "Not recorded in this report." : "Non registrata nel report." };
    }

    function displayCalibration(report) {
      return report?.calibration || { label: "—", text: isEnglish() ? "Not recorded in this report." : "Non registrata nel report." };
    }

    function displayRecommendations(report, mode) {
      const stored = report && report.recommendations;
      return { profile: Array.isArray(stored?.profile) ? stored.profile.filter(item => typeof item === "string") : [], weakest: Array.isArray(stored?.weakest) ? stored.weakest.filter(item => item && typeof item === "object") : [], strongest: Array.isArray(stored?.strongest) ? stored.strongest.filter(item => item && typeof item === "object") : [] };
    }

    function syncLanguageForReport(report) {
      const storedLanguage = readStoredLanguage();
      const reportLanguage = report && report.meta && report.meta.language;
      const preferredLanguage = storedLanguage || (SUPPORTED_LANGUAGES.includes(reportLanguage) ? reportLanguage : null);
      if (!preferredLanguage || preferredLanguage === state.language) return;
      state.language = preferredLanguage;
      applyLanguageChrome();
    }

    function renderDashboard(report) {
      const kind = ASSESSMENT_V3.reportKind(report);
      syncLanguageForReport(report);
      state.latestReport = report;
      renderPendingReportNotice();
      if (kind === "unknown") { renderUnknownDashboard(report); return; }
      if (kind === "evidence") { renderEvidenceDashboard(report); return; }
      if (kind === "learning") { renderLearningDashboard(report); return; }
      report = { ...report, meta: report.meta || {}, answers: report.answers.filter(item => item && typeof item === "object"),
        selfComparison: Array.isArray(report.selfComparison) ? report.selfComparison.filter(item => item && typeof item === "object") : [],
        lowBehaviorItems: Array.isArray(report.lowBehaviorItems) ? report.lowBehaviorItems.filter(item => item && typeof item === "object") : undefined,
        lowScenarioItems: Array.isArray(report.lowScenarioItems) ? report.lowScenarioItems.filter(item => item && typeof item === "object") : [],
        lowTechnicalItems: Array.isArray(report.lowTechnicalItems) ? report.lowTechnicalItems.filter(item => item && typeof item === "object") : [] };
      const mode = getReportMode(report);
      const visibleMode = localizedMode(mode);
      const isCompleteMode = mode.id === DEFAULT_TEST_MODE_ID;
      const s = { ...report.score };
      const visibleMindsetLens = displayMindsetLens(report);
      const visibleCalibration = displayCalibration(report);
      const visibleRecommendations = displayRecommendations(report, mode);
      const metaTitle = [report.meta.name, report.meta.role, report.meta.area].filter(Boolean).join(" · ");
      const profileTitle = isCompleteMode ? report.profile : visibleMode.label;
      const profileKicker = isCompleteMode ? (isEnglish() ? "Main profile" : "Profilo principale") : (isEnglish() ? "Thematic profile" : "Profilo tematico");
      const profileDescription = isCompleteMode
        ? (isEnglish() ? englishProfileDescription(report.profile) : profileDescriptions[report.profile])
        : `${visibleMode.outputNote} ${isEnglish() ? "The score is calculated only on the" : "Il punteggio è calcolato solo sulle"} ${modeQuestionCount(report)} ${isEnglish() ? "answered questions." : "domande svolte."}`;
      const calibrationGapText = typeof report.calibrationGap === "number"
        ? (isEnglish() ? ` Declared/behavioral gap: <strong>${report.calibrationGap > 0 ? "+" : ""}${report.calibrationGap}</strong> points.` : ` Gap dichiarato/comportamentale: <strong>${report.calibrationGap > 0 ? "+" : ""}${report.calibrationGap}</strong> punti.`)
        : "";
      const dashboardFootnote = isEnglish()
        ? "Sources, methodology references, and technical further reading are collected on the <strong>Bibliography</strong> page. The tool remains an internal draft: text tasks are scored with local heuristics and do not replace statistical validation, psychometric validation, or expert review."
        : "Fonti, riferimenti metodologici e approfondimenti tecnici sono raccolti nella pagina <strong>Bibliografia</strong>. Lo strumento resta una bozza interna: le prove testuali sono valutate con euristiche locali e non sostituiscono una validazione statistica, psicometrica o una review esperta.";
      const chartBlock = isCompleteMode && [s.literacy, s.mindset, s.delegation, s.description, s.discernment, s.diligence].every(isScore) ? `
        <div class="grid-2">
          <section class="card chart-card">
            <div class="chart-title-row">
              <div>
                <h3>${isEnglish() ? "Competency radar" : "Radar competenze"}</h3>
                <p class="muted small">${isEnglish() ? "View across Literacy, Mindset, and the 4D of Fluency." : "Vista su Literacy, Mindset e 4D della Fluency."}</p>
              </div>
            </div>
            <div class="svg-box">${radarSvg(s)}</div>
          </section>
          <section class="card chart-card">
            <div class="chart-title-row">
              <div>
                <h3>${isEnglish() ? "Literacy × Fluency quadrant" : "Quadrante Literacy × Fluency"}</h3>
                <p class="muted small">${isEnglish() ? "The operating threshold is 60/100." : "La soglia operativa è 60/100."}</p>
              </div>
            </div>
            <div class="svg-box">${quadrantSvg(s.literacy, s.fluency, report.profile)}</div>
          </section>
        </div>
      ` : `
        <section class="card chart-card" style="margin-bottom: 18px;">
          <h3>${isEnglish() ? "Thematic path detail" : "Dettaglio percorso tematico"}</h3>
          <p class="muted small">${isEnglish() ? "Only areas actually measured by the selected mode are shown." : "Sono mostrate solo le aree effettivamente misurate dalla modalità selezionata."}</p>
          <div class="bar-list">${dimensionBarRows(s)}</div>
        </section>
      `;

      $("dashboard").innerHTML = `
        <div class="actions" style="margin-top: 0; margin-bottom: 18px;">
          <button class="btn-primary" id="restartBtn">${isEnglish() ? "New assessment" : "Nuovo assessment"}</button>
          <button class="btn-ghost" id="exportJsonBtn">${isEnglish() ? "Export JSON" : "Esporta JSON"}</button>
          <button class="btn-ghost" id="exportCsvBtn">${isEnglish() ? "Export CSV" : "Esporta CSV"}</button>
          <button class="btn-ghost" id="printBtn">${isEnglish() ? "Print / save PDF" : "Stampa / salva PDF"}</button>
          <button class="btn-ghost" id="bibliographyBtn">${isEnglish() ? "Bibliography" : "Bibliografia"}</button>
          <button class="btn-danger" id="clearHistoryBtn">${isEnglish() ? "Clear local data" : "Cancella dati locali"}</button>
        </div>

        <section class="card legacy-notice"><h2>${isEnglish() ? "Previous assessment (2.x)" : "Valutazione precedente (2.x)"}</h2><p>${isEnglish() ? "Original scores and labels are shown without recalculation. These results use the previous model and cannot be compared directly or averaged with 3.x reports." : "Punteggi ed etichette originali sono mostrati senza ricalcolo. Questi risultati usano il modello precedente e non sono confrontabili direttamente o mediabili con i report 3.x."}</p><p>App ${escapeHtml(report.meta?.assessmentVersion || (isEnglish() ? "not recorded" : "non registrata"))}</p></section>
        <div class="grid-4">${scoreSummaryCards(report, isCompleteMode)}</div>

        <div class="profile-band">
          <section class="profile-card">
            <p class="kicker" style="color:#a5b4fc;">${escapeHtml(profileKicker)}</p>
            <div class="profile-title">${escapeHtml(profileTitle)}</div>
            <p>${escapeHtml(profileDescription)}</p>
            <p class="small">${metaTitle ? escapeHtml(metaTitle) + " · " : ""}${formatDate(report.meta.completedAt)} · ${escapeHtml(visibleMode.label)} · ${isEnglish() ? "Form" : "Forma"} ${escapeHtml((report.meta && report.meta.formId) || (isEnglish() ? "not recorded" : "non registrata"))}</p>
          </section>
          <section class="card">
            <h3>${isEnglish() ? "Mindset lens" : "Lente Mindset"}: ${escapeHtml(visibleMindsetLens.label)}</h3>
            <p>${escapeHtml(visibleMindsetLens.text)}</p>
            <h3 style="margin-top: 18px;">${isEnglish() ? "Calibration" : "Calibrazione"}: ${escapeHtml(visibleCalibration.label)}</h3>
            <p>${escapeHtml(visibleCalibration.text)}${calibrationGapText}</p>
          </section>
        </div>

        ${selfAssessmentComparison(report)}

        ${typeScoreCards(report)}

        ${chartBlock}

        <div class="grid-2" style="margin-top: 18px;">
          <section class="card">
            <h3>${isEnglish() ? "Dimension detail" : "Dettaglio dimensioni"}</h3>
            <div class="bar-list">${dimensionBarRows(s)}</div>
          </section>
          <section class="card">
            <h3>${isEnglish() ? "Recommended actions" : "Azioni consigliate"}</h3>
            <div class="analysis-list">
              ${(visibleRecommendations.profile || []).map(action => `<div class="analysis-item">${escapeHtml(action)}</div>`).join("")}
            </div>
          </section>
        </div>

        <div class="grid-2" style="margin-top: 18px;">
          <section class="card">
            <h3>${isEnglish() ? "Areas to strengthen" : "Aree da rafforzare"}</h3>
            <div class="analysis-list">
              ${recommendationRows(visibleRecommendations.weakest, isEnglish() ? "There are no measured areas to prioritize." : "Non ci sono aree misurate da ordinare per priorità.")}
            </div>
          </section>
          <section class="card">
            <h3>${isEnglish() ? "Leverage areas" : "Aree di leva"}</h3>
            <div class="analysis-list">
              ${recommendationRows(visibleRecommendations.strongest, isEnglish() ? "There are no measured areas to use as leverage." : "Non ci sono aree misurate da usare come leva.")}
            </div>
          </section>
        </div>

        ${scenarioReview(report)}
        ${technicalReview(report)}
        ${historyBlock()}

        <p class="footer-note">${dashboardFootnote}</p>
      `;

      $("progressFill").style.width = "100%";
      bindDashboardEvents();
      showView("dashboardView");
    }

    function renderLearningDashboard(report) {
      const titlesEn = { "U-CAP-1": "Generating is not searching", "U-CAP-2": "Decision support, not authority", "U-LIM-1": "Plausible does not mean verified", "U-LIM-2": "Date, scope, and missing context", "U-REQ-1": "Make the task clear", "U-REQ-2": "The first output is a draft", "U-VER-1": "Verify outside the answer", "U-VER-2": "More impact, more oversight", "U-DAT-1": "Data first, tool second", "U-DAT-2": "Responsibility remains human" };
      const actionsEn = { "U-CAP-1": "Ask what information the system actually received.", "U-CAP-2": "Define what AI may propose and what a person must decide.", "U-LIM-1": "Mark facts and references that need checking before reuse.", "U-LIM-2": "State the reference date, available sources, and missing context.", "U-REQ-1": "Add an expected result and one verifiable constraint.", "U-REQ-2": "Give feedback using keep, correct, and add.", "U-VER-1": "Trace one important claim back to its primary source.", "U-VER-2": "Classify the next use as low, medium, or high impact.", "U-DAT-1": "Remove every field that is unnecessary for the result.", "U-DAT-2": "Assign a human reviewer and an approval criterion." };
      const sourceLinks = {
        "U-CAP-1": ["Google for Developers", "https://developers.google.com/machine-learning/intro-to-ml/what-is-ml"], "U-CAP-2": ["European Commission · AI literacy", "https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers"],
        "U-LIM-1": ["Google Cloud · AI hallucinations", "https://cloud.google.com/discover/what-are-ai-hallucinations"], "U-LIM-2": ["Google for Developers · LLMs", "https://developers.google.com/machine-learning/crash-course/llm"],
        "U-REQ-1": ["Google · Prompt engineering", "https://developers.google.com/machine-learning/crash-course/llm/tuning#prompt_engineering"], "U-REQ-2": ["Ethan Mollick · One Useful Thing", "https://www.oneusefulthing.org/p/management-as-ai-superpower"],
        "U-VER-1": ["NIST · Generative AI Profile", "https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=958388"], "U-VER-2": ["Microsoft Learn · Responsible AI", "https://learn.microsoft.com/en-us/training/modules/responsible-ai/"],
        "U-DAT-1": ["EDPB · AI and personal data", "https://www.edpb.europa.eu/news/edpb-opinion-on-ai-models-gdpr-principles-support-responsible-ai_en"], "U-DAT-2": ["EUIPO · Copyright and GenAI", "https://www.euipo.europa.eu/en/copyright-knowledge-centre/copyright-and-genai"]
      };
      const units = report.recommendedUnitIds.map(id => FIRST_STEPS_UNITS.find(unit => unit.id === id)).filter(Boolean);
      const cards = units.map(unit => { const source = sourceLinks[unit.id]; return `<article class="card learning-unit"><p class="kicker">${isEnglish() ? "Review this" : "Da rivedere"}</p><h3>${escapeHtml(isEnglish() ? titlesEn[unit.id] : unit.title.it)}</h3><p>${escapeHtml(isEnglish() ? unit.principle.en : unit.principle.it)}</p><p><strong>${isEnglish() ? "Try this:" : "Prova così:"}</strong> ${escapeHtml(isEnglish() ? actionsEn[unit.id] : unit.action)}</p><a class="bibliography-link" href="${source[1]}" target="_blank" rel="noopener noreferrer">${escapeHtml(source[0])} ↗</a></article>`; }).join("");
      $("dashboard").innerHTML = `<div class="actions" style="margin-top:0;margin-bottom:18px"><button class="btn-primary" id="restartBtn">${isEnglish() ? "Back to paths" : "Torna ai percorsi"}</button><button class="btn-secondary" id="repeatLearningBtn">${isEnglish() ? "Repeat another form" : "Ripeti un'altra forma"}</button><button class="btn-ghost" id="exportJsonBtn">Export JSON</button><button class="btn-ghost" id="exportCsvBtn">Export CSV</button><button class="btn-ghost" id="printBtn">${isEnglish() ? "Print / save PDF" : "Stampa / salva PDF"}</button><button class="btn-ghost" id="bibliographyBtn">${isEnglish() ? "Bibliography" : "Bibliografia"}</button><button class="btn-danger" id="clearHistoryBtn">${isEnglish() ? "Clear local data" : "Cancella dati locali"}</button></div><section class="profile-band"><div class="profile-card"><p class="kicker" style="color:#a5b4fc">${isEnglish() ? "Foundational readiness" : "Preparazione sulle basi"}</p><div class="profile-title">${escapeHtml(report.profile)}</div><p>${report.correctCount}/10 ${isEnglish() ? "learning objectives consolidated. This is learning feedback, not an AI Skill score." : "obiettivi consolidati. È un feedback didattico, non un punteggio AI Skill."}</p></div><div class="card"><h3>${isEnglish() ? "Your next step" : "Il tuo prossimo passo"}</h3><p>${units.length ? (isEnglish() ? "Review the units below, then repeat or continue with a thematic path." : "Rivedi le unità qui sotto, poi ripeti o continua con un percorso tematico.") : (isEnglish() ? "All foundations are consolidated: you can continue with Literacy." : "Tutte le basi sono consolidate: puoi continuare con Literacy.")}</p></div></section><div class="learning-grid">${cards}</div>${historyBlock()}`;
      bindDashboardEvents();
      $("repeatLearningBtn").addEventListener("click", () => {
        if (!confirmLeavingUnsavedReport()) return;
        trackUnsavedReport(null);
        state.selectedModeId = "first-steps";
        showView("profileView");
      });
      $("progressFill").style.width = "100%";
      showView("dashboardView");
    }

    function getReportMode(report) {
      return getModeById(report && report.meta && report.meta.testMode && report.meta.testMode.id);
    }

    function modeQuestionCount(report) {
      const count = report && report.meta && report.meta.testMode && report.meta.testMode.questionCount;
      return typeof count === "number" ? count : ((report && report.answers && report.answers.length) || 0);
    }

    function isScore(value) {
      return typeof value === "number" && Number.isFinite(value);
    }

    function scoreSummaryCards(report, isCompleteMode) {
      const score = report.score || {};
      const entries = [
        [
          isCompleteMode ? (isEnglish() ? "AI Skill index" : "Indice AI Skill") : (isEnglish() ? "Path result" : "Risultato percorso"),
          score.overall,
          isCompleteMode
            ? (isEnglish() ? "Composite score of the full test: 35% Literacy, 45% Fluency, 20% Mindset." : "Punteggio composito del test completo: 35% Literacy, 45% Fluency, 20% Mindset.")
            : (isEnglish() ? "Average score calculated only on the questions in the selected mode." : "Punteggio medio calcolato solo sulle domande della modalità selezionata.")
        ],
        ["Literacy", score.literacy, isEnglish() ? "Understanding of functioning, limits, data, sources, and privacy." : "Comprensione di funzionamento, limiti, dati, fonti e privacy."],
        ["AI Agents", score.agents, isEnglish() ? "Understanding of agent workflows, tools, permissions, logs, and human control." : "Comprensione di workflow agentici, strumenti, permessi, log e controllo umano."],
        ["Fluency", score.fluency, isEnglish() ? "Average operational competence across the 4D present in the path." : "Competenza operativa media sulle 4D presenti nel percorso."],
        ["Mindset", score.mindset, isEnglish() ? "Attitude, calibrated trust, and openness to experimentation." : "Attitudine, fiducia calibrata e apertura alla sperimentazione."],
        ["Delegation", score.delegation, isEnglish() ? "Choice of delegable tasks and human responsibility." : "Scelta dei task delegabili e responsabilità umana."],
        ["Description", score.description, isEnglish() ? "Quality of brief, context, constraints, and expected format." : "Qualità di brief, contesto, vincoli e formato atteso."],
        ["Discernment", score.discernment, isEnglish() ? "Critical assessment of outputs, sources, usefulness, and risks." : "Valutazione critica di output, fonti, utilità e rischi."],
        ["Diligence", score.diligence, isEnglish() ? "Responsible, transparent, and proportionate use of GenAI." : "Uso responsabile, trasparente e proporzionato della GenAI."]
      ];
      return entries
        .filter(([, value], index) => index === 0 || isScore(value))
        .map(([label, value, desc]) => scoreCard(label, value, desc))
        .join("");
    }

    function typeScoreCards(report) {
      const entries = [
        [isEnglish() ? "Self-assessment" : "Autovalutazione", report.likertPct, isEnglish() ? "Average of declared answers, presented without level labels and in random order." : "Media delle risposte dichiarative, presentate senza etichette di livello e in ordine casuale."],
        [isEnglish() ? "Scenarios" : "Scenari", report.scenarioPct, isEnglish() ? "Average of situational choices in realistic cases." : "Media delle scelte situazionali in casi realistici."],
        [isEnglish() ? "Practical tasks" : "Prove pratiche", report.practicalPct, isEnglish() ? "Average of mini-tasks, operating checklists, and prompts evaluated with a local rubric." : "Media di mini-task, checklist operative e prompt valutati con rubrica locale."],
        [isEnglish() ? "Technical foundations" : "Fondamenti tecnici", report.technicalPct, isEnglish() ? "Quiz on tokens, generation, training, context, neural networks, Transformers, hallucinations, RAG, embeddings, and AI history." : "Quiz su token, generazione, training, contesto, reti neurali, Transformer, allucinazioni, RAG, embedding e storia dell'AI."]
      ].filter(([, value]) => isScore(value));
      if (!entries.length) return "";
      return `<div class="grid-4" style="margin-bottom: 18px;">${entries.map(([label, value, desc]) => scoreCard(label, value, desc)).join("")}</div>`;
    }

    function dimensionBarRows(score) {
      const rows = [
        ["Literacy", score.literacy],
        [isEnglish() ? "Technical foundations" : "Fondamenti tecnici", score.technical],
        ["AI Agents", score.agents],
        ["Delegation", score.delegation],
        ["Description", score.description],
        ["Discernment", score.discernment],
        ["Diligence", score.diligence],
        ["Mindset", score.mindset],
        [isEnglish() ? "Practical tasks" : "Prove pratiche", score.execution]
      ].filter(([, value]) => isScore(value));
      if (!rows.length) return `<p class="muted">${isEnglish() ? "No dimensional score available." : "Nessun punteggio dimensionale disponibile."}</p>`;
      return rows.map(([label, value]) => barRow(label, value)).join("");
    }

    function recommendationRows(items, fallback) {
      if (!items || !items.length) return `<div class="analysis-item">${escapeHtml(fallback)}</div>`;
      return items.map(item => `<div class="analysis-item"><strong>${escapeHtml(item.area)} · ${item.score}/100</strong>${escapeHtml(item.action)}</div>`).join("");
    }

    function selfConsistency(gap) {
      if (!isScore(gap)) return { className: "", label: isEnglish() ? "Not recorded" : "Non registrato", detail: "" };
      const distance = Math.abs(Number(gap) || 0);
      if (isEnglish()) {
        if (distance <= 10) {
          return { className: "declared-consistent", label: "Aligned", detail: "absolute gap up to 10 points" };
        }
        if (distance <= 20) {
          return { className: "declared-partial", label: "Partially aligned", detail: "absolute gap from 11 to 20 points" };
        }
        return { className: "declared-inconsistent", label: "Weakly aligned", detail: "absolute gap above 20 points" };
      }
      if (distance <= 10) {
        return { className: "declared-consistent", label: "Coerente", detail: "scarto assoluto fino a 10 punti" };
      }
      if (distance <= 20) {
        return { className: "declared-partial", label: "Parzialmente coerente", detail: "scarto assoluto da 11 a 20 punti" };
      }
      return { className: "declared-inconsistent", label: "Poco coerente", detail: "scarto assoluto superiore a 20 punti" };
    }

    function selfAssessmentComparison(report) {
      const comparison = Array.isArray(report.selfComparison) ? report.selfComparison : [];
      const provided = comparison.filter(item => isScore(item.declared) && isScore(item.measured));
      if (!provided.length) {
        return `
          <section class="card" style="margin-bottom: 18px;">
            <h3>${isEnglish() ? "Initial self-perception × test result" : "Autopercezione iniziale × risultato del test"}</h3>
            <p class="muted">${isEnglish() ? "No initial self-assessment values were entered, so a direct comparison is not available for this report." : "Non sono stati inseriti valori di autovalutazione iniziale, quindi il confronto diretto non è disponibile per questo report."}</p>
          </section>
        `;
      }
      const cards = provided.map(item => {
        const gap = item.gap;
        const gapText = `${gap > 0 ? "+" : ""}${gap}`;
        const consistency = selfConsistency(gap);
        const declaredTitle = isEnglish()
          ? `${consistency.label}: ${consistency.detail}. Absolute gap ${Math.abs(gap)} points.`
          : `${consistency.label}: ${consistency.detail}. Scarto assoluto ${Math.abs(gap)} punti.`;
        return `
          <div class="comparison-card">
            <h4>${escapeHtml(item.label)}</h4>
            <div class="comparison-values">
              <div class="comparison-value ${consistency.className}" title="${escapeHtml(declaredTitle)}"><span>${isEnglish() ? "Declared" : "Dichiarato"}</span><strong>${item.declared}</strong><span class="consistency-tag">${escapeHtml(consistency.label)}</span></div>
              <div class="comparison-value"><span>${isEnglish() ? "From test" : "Dal test"}</span><strong>${item.measured}</strong></div>
            </div>
            <p class="gap-line">${isEnglish() ? "Declared-test gap" : "Gap dichiarato − test"}: <strong>${gapText}</strong> ${isEnglish() ? "points" : "punti"}.</p>
          </div>
        `;
      }).join("");
      return `
        <section class="card" style="margin-bottom: 18px;">
          <h3>${isEnglish() ? "Initial self-perception × test result" : "Autopercezione iniziale × risultato del test"}</h3>
          <p class="muted">${isEnglish() ? "The gap is calculated as the value declared before the test minus the resulting score. A positive value indicates perception above the result; a negative value indicates the opposite. Color uses the absolute gap, so it measures alignment independently from direction." : "Il gap è calcolato come valore dichiarato prima del test meno punteggio emerso. Un valore positivo indica una percezione superiore al risultato; un valore negativo indica il contrario. Il colore considera lo scarto assoluto, quindi misura la coerenza indipendentemente dalla direzione."}</p>
          <div class="consistency-legend" aria-label="${isEnglish() ? "Self-perception alignment legend" : "Legenda coerenza autopercezione"}">
            <span class="legend-chip"><span class="legend-dot green"></span>${isEnglish() ? "Green: gap 0-10" : "Verde: scarto 0–10"}</span>
            <span class="legend-chip"><span class="legend-dot yellow"></span>${isEnglish() ? "Yellow: gap 11-20" : "Giallo: scarto 11–20"}</span>
            <span class="legend-chip"><span class="legend-dot red"></span>${isEnglish() ? "Red: gap above 20" : "Rosso: scarto oltre 20"}</span>
          </div>
          <div class="comparison-grid">${cards}</div>
        </section>
      `;
    }

    function scoreCard(label, score, desc) {
      const value = isScore(score) ? score : "—";
      const suffix = isScore(score) ? "<span>/100</span>" : "";
      return `
        <section class="card score-card">
          <p class="label">${escapeHtml(label)}</p>
          <div class="score">${value}${suffix}</div>
          <p class="desc">${escapeHtml(desc)}</p>
        </section>
      `;
    }

    function barRow(label, value) {
      const pct = isScore(value) ? clamp(value, 0, 100) : 0;
      const display = isScore(value) ? value : "—";
      return `
        <div class="bar-row">
          <strong>${escapeHtml(label)}</strong>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%;"></div></div>
          <span>${display}</span>
        </div>
      `;
    }

    function radarSvg(score) {
      const axes = [
        ["Literacy", score.literacy],
        ["Delegation", score.delegation],
        ["Description", score.description],
        ["Discernment", score.discernment],
        ["Diligence", score.diligence],
        ["Mindset", score.mindset]
      ];
      const cx = 190, cy = 168, maxR = 112;
      const angleOffset = -Math.PI / 2;
      const points = axes.map(([, value], i) => {
        const angle = angleOffset + (i * 2 * Math.PI / axes.length);
        const r = maxR * value / 100;
        return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
      });
      const polygon = points.map(point => point.map(n => n.toFixed(1)).join(",")).join(" ");
      const rings = [25, 50, 75, 100].map(level => {
        const ring = axes.map(([,], i) => {
          const angle = angleOffset + (i * 2 * Math.PI / axes.length);
          const r = maxR * level / 100;
          return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r].map(n => n.toFixed(1)).join(",");
        }).join(" ");
        return `<polygon points="${ring}" fill="none" stroke="#dbe4f0" stroke-width="1" />`;
      }).join("");
      const axisLines = axes.map(([,], i) => {
        const angle = angleOffset + (i * 2 * Math.PI / axes.length);
        const x = cx + Math.cos(angle) * maxR;
        const y = cy + Math.sin(angle) * maxR;
        return `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#e2e8f0" stroke-width="1" />`;
      }).join("");
      const labels = axes.map(([label, value], i) => {
        const angle = angleOffset + (i * 2 * Math.PI / axes.length);
        const x = cx + Math.cos(angle) * (maxR + 42);
        const y = cy + Math.sin(angle) * (maxR + 24);
        return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="#334155">${escapeHtml(label)}</text><text x="${x.toFixed(1)}" y="${(y + 16).toFixed(1)}" text-anchor="middle" font-size="11" fill="#64748b">${value}/100</text>`;
      }).join("");
      const dots = points.map((point) => `<circle cx="${point[0].toFixed(1)}" cy="${point[1].toFixed(1)}" r="4" fill="#4f46e5" />`).join("");

      return `<svg viewBox="0 0 380 335" role="img" aria-label="${isEnglish() ? "AI competency radar" : "Radar competenze AI"}" width="100%" height="100%">
        ${rings}${axisLines}
        <polygon points="${polygon}" fill="rgba(79,70,229,0.28)" stroke="#4f46e5" stroke-width="3" />
        ${dots}${labels}
      </svg>`;
    }

    function quadrantSvg(literacy, fluency, profile) {
      const x = 50 + (literacy / 100) * 300;
      const y = 300 - (fluency / 100) * 260;
      return `<svg viewBox="0 0 390 330" role="img" aria-label="${isEnglish() ? "Literacy Fluency quadrant" : "Quadrante Literacy Fluency"}" width="100%" height="100%">
        <rect x="50" y="40" width="300" height="260" rx="18" fill="#f8fafc" stroke="#cbd5e1" />
        <line x1="230" y1="40" x2="230" y2="300" stroke="#94a3b8" stroke-dasharray="6 6" />
        <line x1="50" y1="144" x2="350" y2="144" stroke="#94a3b8" stroke-dasharray="6 6" />
        <text x="100" y="82" font-size="13" font-weight="800" fill="#475569">Curious</text>
        <text x="272" y="82" font-size="13" font-weight="800" fill="#475569">Champion</text>
        <text x="96" y="262" font-size="13" font-weight="800" fill="#475569">Beginner</text>
        <text x="282" y="262" font-size="13" font-weight="800" fill="#475569">Expert</text>
        <text x="200" y="322" font-size="12" font-weight="700" text-anchor="middle" fill="#334155">Literacy →</text>
        <text x="18" y="170" font-size="12" font-weight="700" text-anchor="middle" fill="#334155" transform="rotate(-90 18 170)">Fluency →</text>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="#4f46e5" stroke="white" stroke-width="4" />
        <text x="${x.toFixed(1)}" y="${(y - 20).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="800" fill="#111827">${escapeHtml(profile)}</text>
        <text x="200" y="24" text-anchor="middle" font-size="12" fill="#64748b">Literacy ${literacy}/100 · Fluency ${fluency}/100</text>
      </svg>`;
    }

    function scenarioReview(report) {
      const hasBehavioralItems = (report.answers || []).some(item => item.type !== "likert" && item.type !== "knowledge");
      if (!hasBehavioralItems) return "";
      const items = report.lowBehaviorItems || report.lowScenarioItems || [];
      if (!items.length) {
        return `
          <section class="card" style="margin-top: 18px;">
            <h3>${isEnglish() ? "Scenarios and practical tasks" : "Scenari e prove pratiche"}</h3>
            <p>${isEnglish() ? "No review items were stored for this section. This is the original 2.x assessment." : "Nel report originale non sono presenti item da rivedere per questa sezione. Questa è la valutazione precedente 2.x."}</p>
          </section>
        `;
      }
      return `
        <section class="card" style="margin-top: 18px;">
          <h3>${isEnglish() ? "Scenarios and practical tasks to review" : "Scenari e prove pratiche da rivedere"}</h3>
          <p class="muted">${isEnglish() ? "These answers are not school-style errors; they indicate behaviors to make more robust or to observe through guided exercises." : "Queste risposte non sono errori in senso scolastico; indicano comportamenti da rendere più robusti o da osservare con esercizi guidati."}</p>
          <div class="analysis-list">
            ${items.map(rawItem => {
              const item = localizedReviewItem(rawItem);
              return `<div class="analysis-item"><strong>${escapeHtml(item.section)} · ${escapeHtml(item.subLabel)} · ${item.score}/5</strong>${escapeHtml(item.feedback)}</div>`;
            }).join("")}
          </div>
        </section>
      `;
    }

    function technicalReview(report) {
      const hasTechnicalItems = (report.answers || []).some(item => item.type === "knowledge");
      if (!hasTechnicalItems) return "";
      const items = report.lowTechnicalItems || [];
      if (!items.length) {
        return `
          <section class="card" style="margin-top: 18px;">
            <h3>${isEnglish() ? "LLM technical foundations" : "Fondamenti tecnici LLM"}</h3>
            <p>${isEnglish() ? "No technical review items were stored. Original scores are shown without recalculation." : "Non sono stati registrati item tecnici da rivedere. I punteggi originali sono mostrati senza ricalcolo."}</p>
          </section>
        `;
      }
      return `
        <section class="card" style="margin-top: 18px;">
          <h3>${isEnglish() ? "Technical foundations to consolidate" : "Fondamenti tecnici da consolidare"}</h3>
          <p class="muted">${isEnglish() ? "The areas below help distinguish declared knowledge from verified understanding of basic mechanisms." : "Le aree sotto riportate aiutano a distinguere conoscenza dichiarata e comprensione verificata dei meccanismi di base."}</p>
          <div class="analysis-list">
            ${items.map(rawItem => {
              const item = localizedReviewItem(rawItem);
              return `<div class="analysis-item"><strong>${escapeHtml(item.question)} · ${item.score}/5</strong>${escapeHtml(item.feedback)}</div>`;
            }).join("")}
          </div>
        </section>
      `;
    }

    function renderPendingReportNotice() {
      const notice = $("pendingReportNotice");
      notice.hidden = !state.unsavedReport;
      if (notice.hidden) {
        notice.innerHTML = "";
        return;
      }
      if (state.unsavedReport !== state.latestReport) {
        notice.innerHTML = `<p class="evidence-note">${reportText("Hai un report in attesa di salvataggio in questa pagina.", "A report is waiting to be saved on this page.")}</p>
          <div class="actions"><button class="btn-secondary" type="button" id="openUnsavedReportBtn">${reportText("Torna al report da salvare", "Return to unsaved report")}</button></div>`;
        $("openUnsavedReportBtn").addEventListener("click", () => {
          if (!state.unsavedReport) return;
          renderDashboard(state.unsavedReport);
          ($("retrySaveReportBtn") || $("exportJsonBtn")).focus();
        });
        return;
      }
      const conflict = state.reportSaveConflict;
      const message = conflict === "cleared" ? reportText("I dati locali sono stati cancellati in un’altra scheda. Esporta il report per conservarlo.", "Local data was cleared in another tab. Export the report to keep it.")
        : conflict === "already-saved" ? reportText("Un’altra scheda ha già salvato questa sessione. Puoi esportare il report di questa scheda.", "Another tab already saved this session. You can export this tab’s report.")
        : conflict === "draft-changed" ? reportText("La bozza è cambiata in un’altra scheda. Esporta questo report per conservare le risposte di questa scheda.", "The draft changed in another tab. Export this report to keep this tab’s answers.")
        : conflict === "draft-read-only" ? reportText("La bozza è stata ripresa senza salvataggio condiviso tra schede. Esporta il report per conservarlo.", "The draft was resumed without shared saving across tabs. Export the report to keep it.")
        : reportText("Il report corrente non è stato salvato nello storico. Esportalo per conservarlo oppure riprova a salvarlo. Una bozza già salvata resta disponibile.", "The current report was not saved to history. Export it to keep a copy or retry saving. Any previously saved draft remains available.");
      notice.innerHTML = `<p class="evidence-note" role="status">${message}</p>` + (conflict ? "" :
        `<div class="actions"><button class="btn-secondary" type="button" id="retrySaveReportBtn">${reportText("Riprova a salvare", "Retry saving")}</button></div>`);
      if (!conflict) $("retrySaveReportBtn").addEventListener("click", retryUnsavedReport);
    }

    function historyBlock() {
      const history = loadHistory();
      if (!history.length) return "";
      const rows = history.map((report, index) => {
        const kind = ASSESSMENT_V3.reportKind(report);
        const meta = report && typeof report.meta === "object" && report.meta || {};
        const mode = meta.testMode || {};
        const family = kind === "evidence" ? reportText("Quadro delle evidenze", "Evidence overview") : kind === "legacy" ? reportText("Valutazione precedente (2.x)", "Previous assessment (2.x)") : kind === "learning" ? reportText("Apprendimento", "Learning") : reportText("Formato non supportato", "Unsupported format");
        return '<tr><td>' + escapeHtml(formatDate(meta.completedAt)) + '</td><td>' + escapeHtml(meta.name || '—') + '</td><td>' + escapeHtml(mode.label || mode.id || '—') + '</td><td>' + escapeHtml(meta.language || '—') + ' / ' + escapeHtml(meta.formId || '—') + '</td><td>' + escapeHtml(meta.assessmentVersion || '—') + '</td><td>' + escapeHtml(family) + '</td><td><button type="button" class="btn-ghost" data-history-index="' + index + '">' + reportText('Apri', 'Open') + '</button></td></tr>';
      }).reverse().join('');
      return '<section class="card evidence-section"><h3>' + reportText('Storico locale', 'Local history') + '</h3><p>' + reportText('Report salvati separatamente per modalità, lingua, forma e versione. Nessuna media o confronto fra risultati incompatibili.', 'Reports are stored separately by mode, language, form, and version. No averaging or comparison of incompatible results.') + '</p><div class="history-scroll"><table class="history-table"><thead><tr><th>' + reportText('Data', 'Date') + '</th><th>' + reportText('Nome', 'Name') + '</th><th>' + reportText('Modalità', 'Mode') + '</th><th>' + reportText('Lingua / forma', 'Language / form') + '</th><th>App</th><th>' + reportText('Tipo di risultato', 'Result type') + '</th><th>' + reportText('Report', 'Report') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>';
    }

    function scoreText(value) {
      return isScore(value) ? String(value) : "—";
    }

    function bindDashboardEvents() {
      document.querySelectorAll("#dashboard [data-history-index]").forEach(button => button.addEventListener("click", () => {
        const index = Number(button.dataset.historyIndex);
        const history = loadHistory();
        if (Number.isInteger(index) && index >= 0 && index < history.length) renderDashboard(history[index]);
      }));
      $("restartBtn").addEventListener("click", () => {
        if (confirmLeavingUnsavedReport()) resetToInitialPage(false);
      });
      $("exportJsonBtn").addEventListener("click", () => exportJson(state.latestReport));
      $("exportCsvBtn").addEventListener("click", () => exportCsv(state.latestReport));
      $("printBtn").addEventListener("click", () => window.print());
      $("bibliographyBtn").addEventListener("click", () => showBibliography("dashboardView"));
      $("clearHistoryBtn").addEventListener("click", () => {
        const prompt = reportText("Eliminare storico locale, rotazione delle forme e bozza incompleta della sessione da questo browser?", "Clear local data, form rotation, and the incomplete session draft in this browser?");
        const unsaved = state.unsavedReport ? reportText(" Anche il report non salvato verrà perso.", " The unsaved report will also be lost.") : "";
        const ok = window.confirm(prompt + unsaved);
        if (!ok) return;
        withAssessmentStorageLock(() => {
          try {
            localStorage.removeItem(HISTORY_KEY);
            localStorage.setItem(ASSESSMENT_EPOCH_KEY, newAssessmentId());
            localStorage.removeItem(FORM_CYCLE_STORAGE_KEY);
            clearDraftRecords();
          } catch (error) {
            labStorageWarning(reportText("Il browser non ha consentito di cancellare tutti i dati locali.", "The browser did not allow all local data to be cleared."));
            return;
          }
          $("labStorageStatus").hidden = true;
          resetToInitialPage(true);
          showToast(reportText("Dati locali cancellati.", "Local data cleared."));
        });
      });
    }

    function resetToInitialPage(clearFields = false) {
      clearAutoAdvance();
      state.index = 0;
      state.answers = {};
      state.optionOrders = {};
      state.hintsVisible = {};
      state.meta = {};
      state.formId = null;
      state.draftOwner = null;
      state.assessmentEpoch = undefined;
      state.finishing = false;
      state.latestReport = null;
      trackUnsavedReport(null);
      state.bibliographyBackView = "introView";
      state.language = readStoredLanguage() || browserDefaultLanguage();
      applyLanguageChrome();
      renderModeSelector();
      renderQuestionDistribution();
      renderLabDraftNotice();
      $("progressFill").style.width = "0%";
      if (clearFields) {
        ["nameInput", "roleInput", "areaInput", "selfOverallInput", "selfLiteracyInput", "selfFluencyInput", "selfMindsetInput"].forEach(id => {
          if ($(id)) $(id).value = "";
        });
      }
      showView("introView");
    }

    function warnBeforeLeavingUnsavedReport(event) {
      event.preventDefault();
      event.returnValue = true;
    }

    function trackUnsavedReport(report) {
      if (report && !state.unsavedReport) window.addEventListener("beforeunload", warnBeforeLeavingUnsavedReport);
      if (!report && state.unsavedReport) window.removeEventListener("beforeunload", warnBeforeLeavingUnsavedReport);
      state.unsavedReport = report;
      if (!report) state.reportSaveConflict = null;
    }

    function confirmLeavingUnsavedReport() {
      return !state.unsavedReport || window.confirm(reportText(
        "Il report non è stato salvato nello storico. Vuoi tornare ai percorsi e abbandonare il report? Puoi annullare per esportarlo o riprovare il salvataggio.",
        "The report has not been saved to history. Return to the paths and leave the report? Cancel to export it or retry saving."
      ));
    }

    function retryUnsavedReport() {
      const report = state.unsavedReport;
      if (!report) return;
      return withAssessmentStorageLock(() => {
        if (state.unsavedReport !== report) return;
        const saved = saveReport(report);
        const draftRemoved = saved && removeCompletedDraft();
        renderDashboard(report);
        if (saved || state.reportSaveConflict) $("exportJsonBtn").focus();
        else $("retrySaveReportBtn").focus();
        if (draftRemoved) showToast(reportText("Report salvato nello storico.", "Report saved to history."));
      }, warnUncoordinatedStorage);
    }

    function removeCompletedDraft() {
      const owner = state.draftOwner;
      state.draftOwner = null;
      return !owner || (!owner.conflict && removeLabDraft(owner.slot));
    }

    function finishAssessment() {
      if (state.finishing) return;
      if (answeredCount() < questions.length) {
        showToast(isEnglish() ? "Answer every question before calculating the dashboard." : "Completa tutte le domande prima di calcolare la dashboard.");
        return;
      }
      state.finishing = true;
      const report = calculateResults();
      const owner = state.draftOwner;
      const draft = owner ? snapshotLabDraft() : null;
      return withAssessmentStorageLock(() => {
        if (state.meta.sessionId !== report.meta.sessionId) return;
        if (saveReport(report)) removeCompletedDraft();
        else if (owner && !owner.readOnly && !state.reportSaveConflict) writeLabDraft(owner, draft);
        renderDashboard(report);
      }, () => {
        if (state.meta.sessionId !== report.meta.sessionId) return;
        if (owner?.readOnly) state.reportSaveConflict = "draft-read-only";
        trackUnsavedReport(report);
        warnUncoordinatedStorage();
        renderDashboard(report);
      });
    }

    function readAssessmentEpoch() {
      try { return localStorage.getItem(ASSESSMENT_EPOCH_KEY); }
      catch (error) { return undefined; }
    }

    function historySnapshot() {
      try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (raw === null) return { records: [], writable: true };
        try {
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? { records: parsed, writable: true } : { records: [parsed], writable: false };
        } catch (error) { return { records: [raw], writable: false }; }
      } catch (error) { return { records: [], writable: false }; }
    }

    function saveReport(report) {
      state.reportSaveConflict = null;
      const snapshot = historySnapshot();
      const epoch = readAssessmentEpoch();
      if (epoch !== undefined && epoch !== (state.assessmentEpoch ?? null)) {
        state.reportSaveConflict = "cleared";
        trackUnsavedReport(report);
        return false;
      }
      if (report.meta.sessionId && snapshot.records.some(record => record?.meta?.sessionId === report.meta.sessionId)) {
        state.reportSaveConflict = "already-saved";
        trackUnsavedReport(report);
        return false;
      }
      if (state.draftOwner?.readOnly) {
        state.reportSaveConflict = "draft-read-only";
        trackUnsavedReport(report);
        return false;
      }
      if (snapshot.writable && epoch !== undefined) {
        try {
          const owner = state.draftOwner;
          if (owner && (owner.conflict || !sameDraftSlot(owner.slot, readDraftSlot()))) {
            markDraftConflict(owner);
            state.reportSaveConflict = "draft-changed";
            trackUnsavedReport(report);
            return false;
          }
          localStorage.setItem(HISTORY_KEY, JSON.stringify(snapshot.records.concat([report]).slice(-100)));
          trackUnsavedReport(null);
          return true;
        } catch (error) {
          console.warn("Impossibile salvare lo storico locale", error);
        }
      }
      trackUnsavedReport(report);
      return false;
    }

    function loadHistory() { return historySnapshot().records; }

    function loadLastReport() {
      const history = loadHistory();
      if (!history.length) {
        showToast(isEnglish() ? "No report in local history." : "Nessun report nello storico locale.");
        return;
      }
      renderDashboard(history[history.length - 1]);
    }

    function exportJson(report) {
      if (report === undefined) return;
      const fileName = reportFileName(report, "json");
      downloadBlob(JSON.stringify(report, null, 2), fileName, "application/json;charset=utf-8");
    }

    function exportCsv(report) {
      if (report === undefined) return;
      const csv = ASSESSMENT_V3.csvRows(report).map(row => row.map(csvCell).join(",")).join("\n");
      downloadBlob(csv, reportFileName(report, "csv"), "text/csv;charset=utf-8");
    }

    function reportFileName(report, ext) {
      const meta = report?.meta || {};
      const who = String(meta.name || "assessment").toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "assessment";
      const completed = new Date(meta.completedAt);
      const date = Number.isFinite(completed.getTime()) ? completed.toISOString().slice(0, 10) : "undated";
      const form = meta.formId ? '-form-' + String(meta.formId).toLowerCase().replace(/[^a-z0-9-]/g, '') : '';
      const mode = meta.testMode?.id ? '-' + String(meta.testMode.id).replace(/[^a-z0-9-]/gi, '') : '';
      return 'ai-skill-' + who + '-' + date + mode + form + '.' + ext;
    }

    function csvCell(value) {
      const str = String(value ?? "");
      if (/[",\r\n;]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
      return str;
    }

    function downloadBlob(content, fileName, type) {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast(isEnglish() ? "File exported." : "File esportato.");
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function formatDate(iso) {
      if (!iso) return "—";
      try {
        return new Intl.DateTimeFormat(isEnglish() ? "en-US" : "it-IT", {
          year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
        }).format(new Date(iso));
      } catch (error) {
        return iso;
      }
    }

    bindLanguageSwitcher();
    window.addEventListener("storage", onSharedDraftChange);
    renderLabDraftNotice();
    renderModeSelector();
    renderQuestionDistribution();
    bindModeCarouselGestures();
    bindModeCarouselAutoplay();
    $("modePrevBtn").addEventListener("click", () => moveSelectedMode(-1));
    $("modeNextBtn").addEventListener("click", () => moveSelectedMode(1));
    $("introStartBtn").addEventListener("click", openProfileStep);
    $("noviceQuickStartBtn").addEventListener("click", () => {
      updateSelectedMode("first-steps");
      openProfileStep();
    });
    $("introBibliographyBtn").addEventListener("click", () => showBibliography("introView"));
    $("profileBackBtn").addEventListener("click", () => showView("introView"));
    $("startBtn").addEventListener("click", startAssessment);
    $("loadLastBtn").addEventListener("click", loadLastReport);
    $("nextBtn").addEventListener("click", goNext);
    $("prevBtn").addEventListener("click", goPrev);
    $("interruptBtn").addEventListener("click", interruptAssessment);
    $("finishBtn").addEventListener("click", finishAssessment);
    document.querySelectorAll("[data-bibliography-back]").forEach(button => {
      button.addEventListener("click", closeBibliography);
    });
