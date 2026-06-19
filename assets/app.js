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

    const APP_VERSION = "2.2.0";
    const DEFAULT_TEST_MODE_ID = "complete";
    const COMPLETE_TEST_COUNT = 50;
    const TOPIC_TEST_COUNT = 10;
    const SECTION_ORDER = [
      "Literacy",
      "Fondamenti tecnici LLM",
      "Fluency · Delegation",
      "Fluency · Description",
      "Fluency · Discernment",
      "Fluency · Diligence",
      "Mindset",
      "Practical Lab"
    ];

    const TEST_MODES = [
      {
        id: "complete",
        label: "Test completo",
        shortLabel: "Completo",
        type: "complete",
        section: null,
        questionLimit: COMPLETE_TEST_COUNT,
        description: "Tutte le 50 domande: Literacy, fondamenti tecnici, Fluency 4D, Mindset e prove pratiche.",
        outputNote: "Profilo completo con indice AI Skill, quadrante Literacy x Fluency e radar competenze."
      },
      {
        id: "literacy",
        label: "Literacy",
        shortLabel: "Literacy",
        type: "topic",
        section: "Literacy",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Comprensione di funzionamento, limiti, dati, fonti, privacy e affidabilita'.",
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
        id: "delegation",
        label: "Fluency - Delegation",
        shortLabel: "Delegation",
        type: "topic",
        section: "Fluency · Delegation",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Scelta dei task delegabili, scomposizione del lavoro e responsabilita' umana.",
        outputNote: "Report tematico sulla Delegation, senza profilo globale."
      },
      {
        id: "description",
        label: "Fluency - Description",
        shortLabel: "Description",
        type: "topic",
        section: "Fluency · Description",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Qualita' del brief: obiettivi, vincoli, contesto, formato e criteri di qualita'.",
        outputNote: "Report tematico sulla Description, senza profilo globale."
      },
      {
        id: "discernment",
        label: "Fluency - Discernment",
        shortLabel: "Discernment",
        type: "topic",
        section: "Fluency · Discernment",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Valutazione critica di output, dati, fonti, utilita' e rischi prima dell'uso.",
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
        description: "Attitudine, fiducia calibrata, sperimentazione e disponibilita' a cambiare workflow.",
        outputNote: "Report tematico sul Mindset, senza profilo globale."
      },
      {
        id: "practical",
        label: "Practical Lab",
        shortLabel: "Practical Lab",
        type: "topic",
        section: "Practical Lab",
        questionLimit: TOPIC_TEST_COUNT,
        description: "Mini-task operativi, prompt, checklist e controlli applicati a casi concreti.",
        outputNote: "Report tematico sulle prove pratiche, senza profilo globale."
      }
    ];

    let questions = buildQuestionForm("A");


    const sectionGuides = {
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
            description: "Riferimenti utili per comprendere la scelta delle dimensioni Literacy, Fluency e Mindset e il confronto tra autopercezione e comportamento osservato."
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
            source: "Southworth et al. · AI Fluency Framework",
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
          text: "Questo assessment è uno strumento diagnostico interno. Le tre forme A, B e C sono state costruite con la stessa matrice di dimensioni, tipologie e pesi, ma la loro equivalenza è progettata e non dimostrata psicometricamente. Le soglie, i pesi, le domande a trabocchetto e le rubriche locali non costituiscono una validazione psicometrica; per impieghi formali occorrerebbero analisi di affidabilità, validità, bias, difficoltà ed equivalenza delle forme su un campione adeguato."
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
            description: "References useful for understanding the choice of Literacy, Fluency, and Mindset dimensions and the comparison between self-perception and observed behavior."
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
            source: "Southworth et al. · AI Fluency Framework",
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
          text: "This assessment is an internal diagnostic tool. Forms A, B, and C were built with the same matrix of dimensions, item types, and weights, but their equivalence is designed and not psychometrically demonstrated. Thresholds, weights, trap questions, and local rubrics do not constitute psychometric validation; formal use would require reliability, validity, bias, difficulty, and form-equivalence analysis on an adequate sample."
        }
      }
    };

    const profileDescriptions = {
      Beginner: "Bassa Literacy e bassa Fluency. La priorità è costruire basi concettuali e prime esperienze guidate, evitando sia il rifiuto sia l’uso ingenuo.",
      Curious: "Alta Fluency e bassa Literacy. La persona usa già la GenAI, ma deve rafforzare comprensione dei limiti, fonti, privacy e criteri di verifica.",
      Expert: "Alta Literacy e bassa Fluency. La persona conosce concetti e rischi, ma deve tradurli in routine operative, template e casi d’uso quotidiani.",
      Champion: "Alta Literacy e alta Fluency. La persona è candidata a diventare riferimento interno, mentor o contributore di playbook e pratiche aziendali."
    };

    const profileActions = {
      Beginner: [
        "Avviare un percorso pratico con casi a basso rischio e risultati immediatamente verificabili.",
        "Introdurre i concetti base: limiti, allucinazioni, dati, fonti, privacy e responsabilità finale.",
        "Usare template semplici e checklist di verifica per ridurre l’ansia da strumento."
      ],
      Curious: [
        "Rafforzare Literacy: fonti, limiti dei modelli, RAG, privacy, controllo dei dati e citazioni.",
        "Trasformare l’uso spontaneo in workflow documentati e ripetibili.",
        "Inserire controlli di qualità prima dell’uso di output in documenti o decisioni."
      ],
      Expert: [
        "Convertire la conoscenza in casi d’uso reali: bozze, analisi, revisione, sintesi, automazioni leggere.",
        "Definire una libreria di prompt e procedure operative per attività frequenti.",
        "Misurare tempo risparmiato, qualità e rischi per superare il blocco da analisi."
      ],
      Champion: [
        "Coinvolgere la persona come riferimento interno o facilitatore di community of practice.",
        "Far contribuire playbook, esempi, checklist e criteri di valutazione degli output.",
        "Affidare sperimentazioni controllate su workflow più complessi, con metriche e governance."
      ]
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
      bibliographyBackView: "introView",
      autoAdvanceTimer: null,
      carouselTimer: null,
      carouselPaused: false,
      carouselSuspended: false,
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
      return (i18n().sectionLabels && i18n().sectionLabels[section]) || section;
    }

    function localizedMode(mode) {
      const translation = i18n().modes && i18n().modes[mode.id];
      return translation ? { ...mode, ...translation } : mode;
    }

    function localizedSectionGuide(section) {
      const guide = sectionGuides[section] || sectionGuides.Literacy;
      if (!isEnglish()) return guide;
      const englishGuides = {
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
          text: "Measures concrete behavior: action choice, prompt construction, output verification, and responsible data use.",
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

    function applyQuestionTranslation(question) {
      if (!isEnglish()) return question;
      const sourceId = question.sourceId || question.id;
      const formTranslations = i18n().formOverrides && i18n().formOverrides[question.formId];
      const translation = (formTranslations && formTranslations[sourceId]) || (i18n().questions && i18n().questions[sourceId]);
      if (!translation) return question;
      const localized = { ...question };
      if (Array.isArray(translation)) {
        localized.text = translation[0] || question.text;
        localized.hint = translation[1] || question.hint;
        return localized;
      }
      localized.text = translation.text || question.text;
      localized.hint = translation.hint || question.hint;
      localized.feedback = translation.feedback || question.feedback;
      if (translation.rubric) localized.rubric = translation.rubric;
      if (Array.isArray(translation.options) && Array.isArray(question.options)) {
        localized.options = question.options.map((option, index) => ({
          ...option,
          title: translation.options[index] ? translation.options[index][0] : option.title,
          text: translation.options[index] ? translation.options[index][1] : option.text
        }));
      }
      return localized;
    }

    function localizeQuestions(sourceQuestions) {
      return sourceQuestions.map(question => applyQuestionTranslation(question));
    }

    function buildEnglishQuestionForm(formId) {
      return localizeQuestions(baseQuestions.map(baseQuestion => ({
        ...cloneQuestionData(baseQuestion),
        sourceId: baseQuestion.id,
        formId,
        id: `${formId}_${baseQuestion.id}`
      })));
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
        heroTitle: "A practical measure of AI competence",
        subtitle: "An interactive questionnaire to estimate knowledge, operational use, critical judgment, and attitude toward GenAI. The final result produces a profile, dashboard, and training suggestions.",
        sourceNote: "Operational model inspired by Literacy, Fluency, Mindset and the 4D of Fluency: Delegation, Description, Discernment, Diligence. It is not a psychometrically validated test: it is an internal diagnostic tool under improvement.",
        carouselTitle: "Choose your path",
        carouselIntro: "The full test measures the overall profile. The thematic paths are shorter and return a local report limited to the selected area.",
        autoplayPause: state.carouselPaused ? "Resume" : "Pause",
        start: "Start this test",
        bibliography: "Bibliography",
        output: "Output",
        profileDashboard: "Profile + dashboard",
        score: "Score",
        index: "0-100 index",
        report: "Report",
        jsonCsv: "JSON and CSV",
        resultReadingTitle: "How the result is read",
        resultReading: "The main segmentation uses Literacy and Fluency. Low scores in both lead to the Beginner profile; high Fluency but low Literacy leads to Curious; high Literacy but low Fluency leads to Expert; high scores in both lead to Champion. Mindset is shown as an additional lens: it does not change the main profile, but helps understand whether the person is ready, cautious, skeptical, or enabling.",
        profileDataKicker: "Optional data",
        beforeTest: "Before the test",
        profileIntro: "You can enter name, role, team and an initial estimate of your skills. All fields are optional: you can start even if everything is blank.",
        privacy: "The information stays local in the browser cache and localStorage. It is not automatically sent to external servers. It only makes the local report and any manual export more useful.",
        selfIntro: "Declared skills mainly help compare expectations and results: the report shows the gap between initial self-perception and the test score.",
        profileFormTitle: "Data and initial self-assessment",
        name: "Name",
        role: "Role",
        area: "Area / team",
        optional: "Optional",
        selfTitle: "How competent do you consider yourself today?",
        selfHelp: "Enter a personal estimate from 0 to 100. You may leave one or more fields blank: in that case the related comparison will not appear.",
        selfOverallNote: "Overall assessment.",
        selfLiteracyNote: "Knowledge and understanding.",
        selfFluencyNote: "Operational use of AI.",
        selfMindsetNote: "Attitude and openness.",
        startTest: "Start the test",
        back: "Back",
        next: "Next",
        finish: "Calculate dashboard",
        showHints: "Show hints",
        hideHints: "Hide hints",
        answerRequired: "Answer the question before continuing.",
        textAnswerRequired: "Enter an answer before continuing.",
        lastReport: "Show last report",
        footerLicense: "Released under the Apache 2.0 license",
        footerAria: "Copyright and license"
      } : {
        heroTitle: "Misura pratica della competenza AI",
        subtitle: "Un questionario interattivo per stimare conoscenza, uso operativo, giudizio critico e attitudine verso la GenAI. Il risultato finale produce un profilo, una dashboard e suggerimenti formativi.",
        sourceNote: "Modello operativo ispirato alle dimensioni Literacy, Fluency e Mindset e alle 4D della Fluency: Delegation, Description, Discernment, Diligence. Non è un test psicometrico validato: è uno strumento diagnostico interno e migliorabile.",
        carouselTitle: "Scegli il tuo percorso",
        carouselIntro: "Il test completo misura il profilo generale. I percorsi tematici sono piu' brevi e restituiscono un report locale limitato all'area scelta.",
        autoplayPause: state.carouselPaused ? "Riprendi" : "Pausa",
        start: "Inizia questo test",
        bibliography: "Bibliografia",
        output: "Output",
        profileDashboard: "Profilo + dashboard",
        score: "Punteggio",
        index: "Indice 0-100",
        report: "Report",
        jsonCsv: "JSON e CSV",
        resultReadingTitle: "Come viene letto il risultato",
        resultReading: "La segmentazione principale usa Literacy e Fluency. Un punteggio basso in entrambe porta al profilo Beginner; alta Fluency ma bassa Literacy porta al profilo Curious; alta Literacy ma bassa Fluency porta al profilo Expert; punteggi alti in entrambe portano al profilo Champion. Il Mindset viene mostrato come lente aggiuntiva: non cambia il profilo principale, ma aiuta a capire se la persona e' pronta, cauta, scettica o propulsiva.",
        profileDataKicker: "Dati facoltativi",
        beforeTest: "Prima del test",
        profileIntro: "Puoi indicare nome, ruolo, team e una stima iniziale delle tue skill. Tutti i campi sono facoltativi: puoi iniziare anche lasciando tutto vuoto.",
        privacy: "Le informazioni restano locali nella cache e nel localStorage del browser. Non vengono inviate automaticamente a server esterni. Servono solo a rendere piu' utile il report locale e l'eventuale export manuale.",
        selfIntro: "Le skill dichiarate aiutano soprattutto a confrontare aspettative e risultati ottenuti: il report mostra lo scarto tra autopercezione iniziale e punteggio emerso dal test.",
        profileFormTitle: "Dati e autovalutazione iniziale",
        name: "Nome",
        role: "Ruolo",
        area: "Area / team",
        optional: "Facoltativo",
        selfTitle: "Quanto ti consideri competente oggi?",
        selfHelp: "Inserisci una stima personale da 0 a 100. Puoi lasciare vuoto uno o piu' campi: in quel caso il relativo confronto non comparira'.",
        selfOverallNote: "Valutazione complessiva.",
        selfLiteracyNote: "Conoscenza e comprensione.",
        selfFluencyNote: "Uso operativo dell'AI.",
        selfMindsetNote: "Attitudine e apertura.",
        startTest: "Inizia il test",
        back: "Indietro",
        next: "Avanti",
        finish: "Calcola dashboard",
        showHints: "Mostra suggerimenti",
        hideHints: "Nascondi suggerimenti",
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
      if ($("assessmentView").classList.contains("active")) renderQuestion();
      if ($("dashboardView").classList.contains("active") && state.latestReport) renderDashboardWithoutSaving(state.latestReport);
    }

    function bindLanguageSwitcher() {
      document.querySelectorAll("[data-language]").forEach(button => {
        button.addEventListener("click", () => setLanguage(button.dataset.language));
      });
      applyLanguageChrome();
    }

    function getModeById(modeId) {
      return TEST_MODES.find(mode => mode.id === modeId) || TEST_MODES[0];
    }

    function modePoolQuestions(sourceQuestions, mode) {
      if (!mode || mode.id === DEFAULT_TEST_MODE_ID) return sourceQuestions.slice(0, COMPLETE_TEST_COUNT);
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
      const pool = modePoolQuestions(sourceQuestions, selectedMode);
      const limit = selectedMode.questionLimit || pool.length;
      const requiredIds = selectedMode.id === "practical" ? ["P_DS_1", "P_DI_1"] : [];
      if (randomize) return sampleQuestions(pool, limit, formId, requiredIds);
      return pool.slice(0, Math.min(limit, pool.length));
    }

    function questionCountForMode(mode) {
      const selectedMode = mode || getModeById(DEFAULT_TEST_MODE_ID);
      const pool = modePoolQuestions(baseQuestions, selectedMode);
      const limit = selectedMode.questionLimit || pool.length;
      return Math.min(limit, pool.length);
    }

    function modeDuration(mode) {
      if (isEnglish()) return mode.id === DEFAULT_TEST_MODE_ID ? "12-15 minutes" : "3-5 minutes";
      return mode.id === DEFAULT_TEST_MODE_ID ? "12-15 minuti" : "3-5 minuti";
    }

    function modeBadge(mode) {
      if (isEnglish()) return mode.id === DEFAULT_TEST_MODE_ID ? "Complete profile" : "Thematic report";
      return mode.id === DEFAULT_TEST_MODE_ID ? "Profilo completo" : "Report tematico";
    }

    function modeTopics(mode) {
      if (mode.id === DEFAULT_TEST_MODE_ID) {
        return isEnglish()
          ? ["Literacy", "LLM foundations", "Fluency 4D", "Mindset", "Practical Lab"]
          : ["Literacy", "Fondamenti LLM", "Fluency 4D", "Mindset", "Practical Lab"];
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
              <strong>${count} ${isEnglish() ? "questions" : "domande"}</strong>
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
      return !state.carouselPaused && !state.carouselSuspended && $("introView").classList.contains("active");
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

    function suspendModeCarousel() {
      state.carouselSuspended = true;
      clearModeCarouselTimer();
    }

    function resumeModeCarousel() {
      state.carouselSuspended = false;
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
      const carousel = document.querySelector(".assessment-carousel");
      if (carousel) {
        carousel.addEventListener("mouseenter", suspendModeCarousel);
        carousel.addEventListener("mouseleave", resumeModeCarousel);
        carousel.addEventListener("focusin", suspendModeCarousel);
        carousel.addEventListener("focusout", resumeModeCarousel);
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
      const modeQuestions = questionsForMode(baseQuestions, mode);
      const counts = modeQuestions.reduce((acc, question) => {
        acc[question.section] = (acc[question.section] || 0) + 1;
        return acc;
      }, {});
      const total = modeQuestions.length;
      const container = $("questionDistribution");
      if (container) {
        const rows = SECTION_ORDER
          .filter(section => counts[section])
          .map(section => `<div class="topic-row"><span>${escapeHtml(sectionLabel(section))}</span><strong>${counts[section]}</strong></div>`)
          .join("");
        container.innerHTML = `
          ${rows}
          <div class="topic-row topic-total"><span>${escapeHtml(localizedMode(mode).shortLabel || localizedMode(mode).label)}</span><strong>${total}</strong></div>
        `;
      }
      const heroCount = $("heroCount");
      if (heroCount) heroCount.textContent = total;
      const heroDescription = $("heroCountDescription");
      if (heroDescription) {
        heroDescription.textContent = mode.id === DEFAULT_TEST_MODE_ID
          ? (isEnglish() ? "questions from one of three parallel forms, across self-assessment, technical quiz, scenarios, and practical tasks" : "domande estratte da una delle tre forme parallele, tra autovalutazione, quiz tecnico, scenari e prove pratiche")
          : (isEnglish() ? "questions from one of three forms in the selected thematic path, with a local report dedicated to that section" : "domande da una delle tre forme del percorso tematico selezionato, con report locale dedicato alla sezione scelta");
      }
      const modeFootnote = $("modeFootnote");
      if (modeFootnote) {
        modeFootnote.textContent = mode.id === DEFAULT_TEST_MODE_ID
          ? (isEnglish() ? "At start, the app selects one of the three available forms for the current language. Alternatives are shuffled for each assessment." : "All'avvio viene scelta una delle tre forme parallele disponibili per la lingua corrente. Le alternative vengono rimescolate a ogni assessment.")
          : (isEnglish() ? "The thematic path rotates three forms for the selected area, measures only that area, and does not produce a global profile." : "Il percorso tematico ruota tre forme per l'area scelta, misura solo quell'area e non produce un profilo globale.");
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
      const selectedForm = selectNextForm(selectedMode.id, currentLanguage());
      const sourceQuestions = isEnglish() ? buildEnglishQuestionForm(selectedForm) : buildQuestionForm(selectedForm);
      questions = questionsForMode(sourceQuestions, selectedMode, true, selectedForm);
      state.formId = selectedForm;
      state.selectedModeId = selectedMode.id;
      const visibleMode = localizedMode(selectedMode);
      state.meta = {
        name: $("nameInput").value.trim(),
        role: $("roleInput").value.trim(),
        area: $("areaInput").value.trim(),
        assessmentVersion: APP_VERSION,
        language: currentLanguage(),
        languageSource: languageSource(),
        formId: selectedForm,
        formVersion: FORM_VERSION,
        questionBankVersion: QUESTION_BANK_VERSION,
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
      state.answers = {};
      state.optionOrders = {};
      state.hintsVisible = {};
      clearAutoAdvance();
      showView("assessmentView");
      renderQuestion();
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

      $("progressText").textContent = isEnglish() ? `Question ${state.index + 1} of ${total}` : `Domanda ${state.index + 1} di ${total}`;
      $("answeredText").textContent = isEnglish() ? `${count} answers` : `${count} risposte`;
      $("progressFill").style.width = `${pct}%`;
      $("sectionBadge").textContent = sectionLabel(q.section);
      $("questionTitle").textContent = q.text;
      $("questionHint").textContent = q.hint || "";

      const guide = localizedSectionGuide(q.section);
      $("sideTitle").textContent = guide.title;
      $("sideText").textContent = guide.text;
      $("sideList").innerHTML = guide.items.map(item => `<div class="mini-item">${escapeHtml(item)}</div>`).join("");

      const currentValue = state.answers[q.id];

      if (q.type === "text") {
        $("options").innerHTML = `
          <textarea id="${q.id}_text" placeholder="${isEnglish() ? "Write exactly what you would use in the real situation..." : "Scrivi esattamente ciò che useresti nella situazione reale..."}">${escapeHtml(currentValue || "")}</textarea>
        `;
        const textarea = $(`${q.id}_text`);
        textarea.addEventListener("input", (event) => {
          state.answers[q.id] = event.target.value;
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
            renderQuestion();
            scheduleAutoAdvance(q, state.index, selectedValue);
          });
        });
        bindHintToggle(q);
      }

      updateNavigationState(q);
    }

    function isAutoAdvanceQuestion(question) {
      return question.type !== "multi" && question.type !== "text";
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
        ? (isEnglish() ? "Hide hints" : "Nascondi suggerimenti")
        : (isEnglish() ? "Show hints" : "Mostra suggerimenti");
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
      $("answeredText").textContent = isEnglish() ? `${answeredCount()} answers` : `${answeredCount()} risposte`;
      $("prevBtn").textContent = isEnglish() ? "Back" : "Indietro";
      $("nextBtn").textContent = isEnglish() ? "Next" : "Avanti";
      $("finishBtn").textContent = isEnglish() ? "Calculate dashboard" : "Calcola dashboard";
      $("prevBtn").disabled = state.index === 0;
      $("nextBtn").style.display = state.index === total - 1 ? "none" : "inline-flex";
      $("finishBtn").style.display = state.index === total - 1 ? "inline-flex" : "none";
      $("nextBtn").disabled = !isAnswered(q);
      $("finishBtn").disabled = answeredCount() < questions.length;
    }

    function isAnswered(question) {
      const value = state.answers[question.id];
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
        renderQuestion();
      }
    }

    function goPrev() {
      clearAutoAdvance();
      if (state.index > 0) {
        state.index -= 1;
        renderQuestion();
      }
    }

    function answerScore(question, rawAnswer) {
      if (question.type === "likert") return Number(rawAnswer);
      if (question.type === "multi") return scoreMultiAnswer(question, rawAnswer);
      if (question.type === "text") return scoreTextAnswer(question, rawAnswer);
      const opt = question.options[Number(rawAnswer)];
      return opt ? opt.score : 0;
    }

    function scoreMultiAnswer(question, rawAnswer) {
      const selectedIndexes = Array.isArray(rawAnswer) ? rawAnswer : [];
      const maxPositive = question.options.reduce((sum, opt) => sum + Math.max(0, Number(opt.score) || 0), 0) || 1;
      const earned = selectedIndexes.reduce((sum, index) => {
        const opt = question.options[Number(index)];
        return sum + (opt ? Number(opt.score) || 0 : 0);
      }, 0);
      const ratio = Math.max(0, Math.min(1, earned / maxPositive));
      return clamp(Math.round(1 + ratio * 4), 1, 5);
    }

    function scoreTextAnswer(question, rawAnswer) {
      const original = String(rawAnswer || "").trim();
      const normalized = normalizeText(original);
      const criteria = question.rubric && question.rubric.criteria ? question.rubric.criteria : [];
      const redFlags = question.rubric && question.rubric.redFlags ? question.rubric.redFlags : [];
      let points = 0;
      let maxPoints = 0;

      criteria.forEach(criterion => {
        const weight = Number(criterion.points) || 1;
        maxPoints += weight;
        if ((criterion.keywords || []).some(keyword => normalized.includes(normalizeText(keyword)))) {
          points += weight;
        }
      });

      redFlags.forEach(flag => {
        const penalty = Number(flag.points) || 1;
        if ((flag.keywords || []).some(keyword => normalized.includes(normalizeText(keyword)))) {
          points -= penalty;
        }
      });

      const ratio = maxPoints ? Math.max(0, Math.min(1, points / maxPoints)) : 0;
      const score = clamp(Math.round(1 + ratio * 4), 1, 5);
      return score;
    }

    function normalizeText(value) {
      return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function pctFromValues(values) {
      if (!values.length) return 0;
      const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
      return Math.round(((avg - 1) / 4) * 100);
    }

    function pctOrNull(values) {
      return values.length ? pctFromValues(values) : null;
    }

    function averagePresent(values) {
      const present = values.filter(value => typeof value === "number");
      if (!present.length) return null;
      return Math.round(present.reduce((sum, value) => sum + value, 0) / present.length);
    }

    function avg(values) {
      if (!values.length) return 0;
      return values.reduce((sum, value) => sum + value, 0) / values.length;
    }

    function buildSelfComparison(selfAssessment, score) {
      const declared = selfAssessment || {};
      const actual = {
        overall: score.overall,
        literacy: score.literacy,
        fluency: score.fluency,
        mindset: score.mindset
      };
      const labels = {
        overall: "AI Skill",
        literacy: "Literacy",
        fluency: "Fluency",
        mindset: "Mindset"
      };
      return Object.keys(labels).map(key => {
        const rawValue = declared[key];
        const value = Number(rawValue);
        const hasDeclared = rawValue !== null && rawValue !== "" && typeof rawValue !== "undefined" && Number.isFinite(value);
        const measured = typeof actual[key] === "number" ? actual[key] : null;
        return {
          key,
          label: labels[key],
          declared: hasDeclared ? Math.round(clamp(value, 0, 100)) : null,
          measured,
          gap: hasDeclared && measured !== null ? Math.round(value - measured) : null
        };
      });
    }

    function calculateResults() {
      const buckets = {
        literacy: [], mindset: [], delegation: [], description: [], discernment: [], diligence: []
      };
      const typeBuckets = { likert: [], scenario: [], practical: [], behavioral: [], technical: [] };
      const answeredDetails = [];
      const practicalTypes = ["multi", "text", "choice"];

      questions.forEach(q => {
        const raw = state.answers[q.id];
        const score = answerScore(q, raw);
        const bucketKey = q.dimension === "fluency" ? q.sub : q.dimension;
        buckets[bucketKey].push(score);

        const typeKey = q.type === "knowledge" ? "technical" : (practicalTypes.includes(q.type) ? "practical" : q.type);
        if (!typeBuckets[typeKey]) typeBuckets[typeKey] = [];
        typeBuckets[typeKey].push(score);
        if (q.type !== "likert" && q.type !== "knowledge") typeBuckets.behavioral.push(score);

        let answer = "";
        let answerText = "";
        if (q.type === "likert") {
          const selected = localizedLikertOptions().find(opt => opt.value === Number(raw));
          answer = selected ? selected.title : "";
          answerText = selected ? selected.text : "";
        } else if (q.type === "multi") {
          const selectedOptions = Array.isArray(raw) ? raw.map(index => q.options[Number(index)]).filter(Boolean) : [];
          answer = selectedOptions.map(opt => opt.title).join(" | ");
          answerText = selectedOptions.map(opt => opt.text).join(" | ");
        } else if (q.type === "text") {
          answer = isEnglish() ? "Text answer" : "Risposta testuale";
          answerText = String(raw || "").trim();
        } else {
          const selected = q.options[Number(raw)];
          answer = selected ? selected.title : "";
          answerText = selected ? selected.text : "";
        }

        answeredDetails.push({
          id: q.id,
          sourceId: q.sourceId || q.id,
          formId: q.formId || state.formId || null,
          section: q.section,
          dimension: q.dimension,
          sub: q.sub || q.dimension,
          type: q.type,
          question: q.text,
          answer,
          answerText,
          score,
          feedback: q.feedback || ""
        });
      });

      const score = {
        literacy: pctOrNull(buckets.literacy),
        mindset: pctOrNull(buckets.mindset),
        delegation: pctOrNull(buckets.delegation),
        description: pctOrNull(buckets.description),
        discernment: pctOrNull(buckets.discernment),
        diligence: pctOrNull(buckets.diligence)
      };
      score.fluency = averagePresent([score.delegation, score.description, score.discernment, score.diligence]);
      score.execution = pctOrNull(typeBuckets.practical);
      score.behavioral = pctOrNull(typeBuckets.behavioral);
      score.technical = pctOrNull(typeBuckets.technical);

      const mode = getModeById(state.meta && state.meta.testMode && state.meta.testMode.id);
      const isCompleteMode = mode.id === DEFAULT_TEST_MODE_ID;
      score.overall = isCompleteMode
        ? Math.round(score.literacy * 0.35 + score.fluency * 0.45 + score.mindset * 0.20)
        : pctFromValues(answeredDetails.map(item => item.score));
      let profile = isEnglish() ? "Thematic profile" : "Profilo tematico";
      if (isCompleteMode) {
        const highLiteracy = score.literacy >= 60;
        const highFluency = score.fluency >= 60;
        profile = !highLiteracy && !highFluency ? "Beginner" :
          !highLiteracy && highFluency ? "Curious" :
          highLiteracy && !highFluency ? "Expert" : "Champion";
      }

      const mindsetLens = getMindsetLens(score.mindset);
      const likertPct = pctOrNull(typeBuckets.likert);
      const scenarioPct = pctOrNull(typeBuckets.scenario);
      const practicalPct = pctOrNull(typeBuckets.practical);
      const behavioralPct = pctOrNull(typeBuckets.behavioral);
      const technicalPct = pctOrNull(typeBuckets.technical);
      const calibrationGap = typeof likertPct === "number" && typeof behavioralPct === "number"
        ? Math.round(likertPct - behavioralPct)
        : null;
      const calibration = getCalibration(calibrationGap);

      const lowBehaviorItems = answeredDetails.filter(item => item.type !== "likert" && item.type !== "knowledge" && item.score <= 3);
      const lowScenarioItems = answeredDetails.filter(item => item.type === "scenario" && item.score <= 3);
      const lowTechnicalItems = answeredDetails.filter(item => item.type === "knowledge" && item.score <= 3);
      const selfComparison = buildSelfComparison(state.meta.selfAssessment, score);
      const report = {
        meta: { ...state.meta, completedAt: new Date().toISOString() },
        score, profile, mindsetLens, calibrationGap, calibration, likertPct, scenarioPct, practicalPct, behavioralPct, technicalPct, selfComparison,
        answers: answeredDetails,
        lowScenarioItems,
        lowBehaviorItems,
        lowTechnicalItems,
        recommendations: buildRecommendations(score, profile, mode)
      };

      return report;
    }

    function getMindsetLens(score) {
      if (isEnglish()) {
        if (typeof score !== "number") return { label: "Not measured", text: "This mode does not include enough Mindset questions to produce a dedicated lens." };
        if (score < 40) return { label: "Cautious / resistant", text: "Adoption needs concrete use cases, low risk, and close support." };
        if (score < 60) return { label: "Pragmatic but uncertain", text: "There is openness, but clear objectives, rules, and measurable results are needed." };
        if (score < 80) return { label: "Open and manageable", text: "Good predisposition toward controlled experimentation and workflow improvement." };
        return { label: "Enabling", text: "Strong willingness to experiment, share, and guide adoption if supported by method and governance." };
      }
      if (typeof score !== "number") return { label: "Non misurato", text: "Questa modalita' non include abbastanza domande Mindset per produrre una lente dedicata." };
      if (score < 40) return { label: "Cauto / resistente", text: "L’adozione richiede casi d’uso concreti, rischio basso e accompagnamento ravvicinato." };
      if (score < 60) return { label: "Pragmatico ma incerto", text: "C’è apertura, ma servono obiettivi chiari, regole e risultati misurabili." };
      if (score < 80) return { label: "Aperto e gestibile", text: "Buona predisposizione alla sperimentazione controllata e al miglioramento del workflow." };
      return { label: "Propulsivo", text: "Forte propensione a sperimentare, condividere e guidare l’adozione se sostenuta da metodo e governance." };
    }

    function getCalibration(gap) {
      if (isEnglish()) {
        if (typeof gap !== "number") return { label: "Not available", text: "Calibration requires both self-reported answers and behavioral tasks in the same mode." };
        if (gap >= 18) return { label: "Self-assessment higher than tasks", text: "Declared answers are stronger than behavioral choices and practical tasks. Guided exercises, rubrics, and output checks are useful." };
        if (gap <= -18) return { label: "Tasks stronger than self-assessment", text: "The person tends to underestimate themselves or is cautious in declaring competence. Correct practical examples should be valued and turned into method." };
        return { label: "Self-assessment aligned", text: "Declared answers, scenarios, and practical tasks are reasonably aligned." };
      }
      if (typeof gap !== "number") return { label: "Non disponibile", text: "La calibrazione richiede sia risposte dichiarative sia prove comportamentali nella stessa modalita'." };
      if (gap >= 18) return { label: "Autovalutazione alta rispetto alle prove", text: "Le risposte dichiarative sono più forti delle scelte comportamentali e delle prove pratiche. Conviene lavorare su esercizi guidati, rubriche e verifica degli output." };
      if (gap <= -18) return { label: "Prove migliori dell’autovalutazione", text: "La persona tende a sottostimarsi o è prudente nel dichiarare competenza. Conviene valorizzare esempi pratici già corretti e trasformarli in metodo." };
      return { label: "Autovalutazione coerente", text: "Le risposte dichiarative, gli scenari e le prove pratiche sono abbastanza allineati." };
    }

    function buildRecommendations(score, profile, mode) {
      const dims = (isEnglish() ? [
        ["Literacy", score.literacy, "Strengthen foundations, limits, sources, data, privacy, and the difference between plausible and verified output."],
        ["Technical foundations", score.technical, "Consolidate tokens, autoregressive generation, training, inference, context, neural networks, Transformers, hallucinations, RAG, and embeddings."],
        ["Delegation", score.delegation, "Map which parts of work are delegable, which require human control, and which should not be delegated."],
        ["Description", score.description, "Use structured briefs with context, constraints, examples, expected format, and quality criteria."],
        ["Discernment", score.discernment, "Introduce evaluation checklists, source checks, alternative comparison, and risk-proportionate review."],
        ["Diligence", score.diligence, "Clarify allowed data, final responsibility, transparency of use, compliance, and traceability."],
        ["Mindset", score.mindset, "Work on low-risk experiments, calibrated trust, and sharing useful practices."]
      ] : [
        ["Literacy", score.literacy, "Rafforzare fondamenti, limiti, fonti, dati, privacy e differenza tra output plausibile e verificato."],
        ["Fondamenti tecnici", score.technical, "Consolidare token, generazione autoregressiva, addestramento, inferenza, contesto, reti neurali, Transformer, allucinazioni, RAG ed embedding."],
        ["Delegation", score.delegation, "Mappare quali parti del lavoro sono delegabili, quali richiedono controllo umano e quali non vanno delegate."],
        ["Description", score.description, "Usare brief strutturati con contesto, vincoli, esempi, formato atteso e criteri di qualità."],
        ["Discernment", score.discernment, "Introdurre checklist di valutazione, controllo fonti, confronto alternative e revisione proporzionata al rischio."],
        ["Diligence", score.diligence, "Chiarire dati ammessi, responsabilità finale, trasparenza d’uso, compliance e tracciabilità."],
        ["Mindset", score.mindset, "Lavorare su sperimentazioni a basso rischio, fiducia calibrata e condivisione di pratiche utili."]
      ]).filter(item => typeof item[1] === "number").sort((a, b) => a[1] - b[1]);

      const isCompleteMode = !mode || mode.id === DEFAULT_TEST_MODE_ID;
      const thematicActions = isEnglish() ? [
        `Use the ${mode ? localizedMode(mode).label : "selected mode"} result as a targeted diagnosis, not as a global person profile.`,
        "Review low-score answers and turn them into examples or operating checklists.",
        "Complete the full test when a comparable view across Literacy, Fluency, and Mindset is needed."
      ] : [
        `Usare il risultato di ${mode ? mode.label : "questa modalita'"} come diagnosi mirata, non come profilo globale della persona.`,
        "Rivedere le risposte a punteggio basso e trasformarle in esempi o checklist operative.",
        "Completare il test completo quando serve una lettura comparabile su Literacy, Fluency e Mindset."
      ];

      return {
        profile: isCompleteMode && isEnglish() ? englishProfileActions(profile) : (isCompleteMode ? profileActions[profile] : thematicActions),
        weakest: dims.slice(0, 2).map(item => ({ area: item[0], score: item[1], action: item[2] })),
        strongest: dims.slice(-2).reverse().map(item => ({ area: item[0], score: item[1], action: isEnglish() ? "Use this area as leverage to support improvement in weaker areas." : `Usare questa area come leva per sostenere il miglioramento delle aree più deboli.` }))
      };
    }

    function englishProfileActions(profile) {
      const actions = {
        Beginner: [
          "Start with practical, low-risk use cases and immediately verifiable results.",
          "Introduce basic concepts: limits, hallucinations, data, sources, privacy, and final responsibility.",
          "Use simple templates and verification checklists to reduce uncertainty around the tool."
        ],
        Curious: [
          "Strengthen Literacy: sources, model limits, RAG, privacy, data control, and citations.",
          "Turn spontaneous use into documented and repeatable workflows.",
          "Add quality checks before using outputs in documents or decisions."
        ],
        Expert: [
          "Convert knowledge into real use cases: drafting, analysis, review, synthesis, and light automation.",
          "Define a prompt library and operating procedures for frequent activities.",
          "Measure time saved, quality, and risk to move beyond analysis paralysis."
        ],
        Champion: [
          "Use the person as a reference point for internal practices, mentoring, and playbooks.",
          "Document reusable workflows and verification criteria.",
          "Keep governance and measurement visible so adoption does not become uncontrolled enthusiasm."
        ]
      };
      return actions[profile] || [];
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
      const sourceId = sourceQuestionId(item);
      const translation = isEnglish() && i18n().questions ? i18n().questions[sourceId] : null;
      return {
        ...item,
        section: sectionLabel(item.section),
        subLabel: localizedSubLabel(item.sub),
        question: translation && translation.text ? translation.text : item.question,
        feedback: translation && translation.feedback ? translation.feedback : item.feedback
      };
    }

    function displayMindsetLens(report) {
      return getMindsetLens(report && report.score ? report.score.mindset : null);
    }

    function displayCalibration(report) {
      return getCalibration(report ? report.calibrationGap : null);
    }

    function displayRecommendations(report, mode) {
      return buildRecommendations((report && report.score) || {}, report && report.profile, mode);
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
      syncLanguageForReport(report);
      state.latestReport = report;
      saveReport(report);
      const mode = getReportMode(report);
      const visibleMode = localizedMode(mode);
      const isCompleteMode = mode.id === DEFAULT_TEST_MODE_ID;
      const s = { ...report.score };
      const visibleMindsetLens = displayMindsetLens(report);
      const visibleCalibration = displayCalibration(report);
      const visibleRecommendations = displayRecommendations(report, mode);
      const metaTitle = [report.meta.name, report.meta.role, report.meta.area].filter(Boolean).join(" · ");
      const profileTitle = isCompleteMode ? localizedProfileName(report.profile) : visibleMode.label;
      const profileKicker = isCompleteMode ? (isEnglish() ? "Main profile" : "Profilo principale") : (isEnglish() ? "Thematic profile" : "Profilo tematico");
      const profileDescription = isCompleteMode
        ? (isEnglish() ? englishProfileDescription(report.profile) : profileDescriptions[report.profile])
        : `${visibleMode.outputNote} ${isEnglish() ? "The score is calculated only on the" : "Il punteggio e' calcolato solo sulle"} ${modeQuestionCount(report)} ${isEnglish() ? "answered questions." : "domande svolte."}`;
      const calibrationGapText = typeof report.calibrationGap === "number"
        ? (isEnglish() ? ` Declared/behavioral gap: <strong>${report.calibrationGap > 0 ? "+" : ""}${report.calibrationGap}</strong> points.` : ` Gap dichiarato/comportamentale: <strong>${report.calibrationGap > 0 ? "+" : ""}${report.calibrationGap}</strong> punti.`)
        : "";
      const dashboardFootnote = isEnglish()
        ? "Sources, methodology references, and technical further reading are collected on the <strong>Bibliography</strong> page. The tool remains an internal draft: text tasks are scored with local heuristics and do not replace statistical validation, psychometric validation, or expert review."
        : "Fonti, riferimenti metodologici e approfondimenti tecnici sono raccolti nella pagina <strong>Bibliografia</strong>. Lo strumento resta una bozza interna: le prove testuali sono valutate con euristiche locali e non sostituiscono una validazione statistica, psicometrica o una review esperta.";
      const chartBlock = isCompleteMode ? `
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
          <p class="muted small">${isEnglish() ? "Only areas actually measured by the selected mode are shown." : "Sono mostrate solo le aree effettivamente misurate dalla modalita' selezionata."}</p>
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
          <button class="btn-danger" id="clearHistoryBtn">${isEnglish() ? "Clear local history" : "Svuota storico locale"}</button>
        </div>

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
              ${recommendationRows(visibleRecommendations.weakest, isEnglish() ? "There are no measured areas to prioritize." : "Non ci sono aree misurate da ordinare per priorita'.")}
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
            : (isEnglish() ? "Average score calculated only on the questions in the selected mode." : "Punteggio medio calcolato solo sulle domande della modalita' selezionata.")
        ],
        ["Literacy", score.literacy, isEnglish() ? "Understanding of functioning, limits, data, sources, and privacy." : "Comprensione di funzionamento, limiti, dati, fonti e privacy."],
        ["Fluency", score.fluency, isEnglish() ? "Average operational competence across the 4D present in the path." : "Competenza operativa media sulle 4D presenti nel percorso."],
        ["Mindset", score.mindset, isEnglish() ? "Attitude, calibrated trust, and openness to experimentation." : "Attitudine, fiducia calibrata e apertura alla sperimentazione."],
        ["Delegation", score.delegation, isEnglish() ? "Choice of delegable tasks and human responsibility." : "Scelta dei task delegabili e responsabilita' umana."],
        ["Description", score.description, isEnglish() ? "Quality of brief, context, constraints, and expected format." : "Qualita' di brief, contesto, vincoli e formato atteso."],
        ["Discernment", score.discernment, isEnglish() ? "Critical assessment of outputs, sources, usefulness, and risks." : "Valutazione critica di output, fonti, utilita' e rischi."],
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
      const comparison = Array.isArray(report.selfComparison)
        ? report.selfComparison
        : buildSelfComparison(report.meta && report.meta.selfAssessment, report.score);
      const provided = comparison.filter(item => item.declared !== null && item.measured !== null);
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
            <p>${isEnglish() ? "Behavioral answers are overall solid. Scenarios, operating checklists, and mini-tasks are aligned with the resulting profile." : "Le risposte comportamentali risultano complessivamente solide. Scenari, checklist operative e mini-task sono coerenti con il profilo emerso."}</p>
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
            <p>${isEnglish() ? "Technical answers are overall solid. The score measures conceptual understanding, not advanced engineering competence." : "Le risposte tecniche risultano complessivamente solide. Il punteggio misura comprensione concettuale, non competenza ingegneristica avanzata."}</p>
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

    function historyBlock() {
      const history = loadHistory();
      if (!history.length) return "";
      const rows = history.slice(-8).reverse().map(report => {
        const mode = getReportMode(report);
        const visibleMode = localizedMode(mode);
        return `
          <tr>
            <td>${escapeHtml(formatDate(report.meta.completedAt))}</td>
            <td>${escapeHtml(report.meta.name || "—")}</td>
            <td>${escapeHtml(visibleMode.shortLabel || visibleMode.label)}</td>
            <td>${escapeHtml((report.meta && report.meta.formId) || "—")}</td>
            <td>${escapeHtml(localizedProfileName(report.profile))}</td>
            <td>${scoreText(report.score.overall)}</td>
            <td>${scoreText(report.score.literacy)}</td>
            <td>${scoreText(report.score.fluency)}</td>
            <td>${scoreText(report.score.mindset)}</td>
            <td>${scoreText(report.score.technical)}</td>
            <td>${scoreText(report.score.execution)}</td>
          </tr>
        `;
      }).join("");
      const overallValues = history.map(item => item.score && item.score.overall).filter(isScore);
      const avgOverall = overallValues.length ? Math.round(avg(overallValues)) : null;
      return `
        <section class="card" style="margin-top: 18px;">
          <h3>${isEnglish() ? "Local history" : "Storico locale"}</h3>
          <p class="muted">${isEnglish() ? `Latest ${Math.min(8, history.length)} reports saved in this browser. Average path result:` : `Ultimi ${Math.min(8, history.length)} report salvati in questo browser. Media risultato percorso:`} <strong>${scoreText(avgOverall)}/100</strong>.</p>
          <div style="overflow:auto;">
            <table class="history-table">
              <thead><tr><th>${isEnglish() ? "Date" : "Data"}</th><th>${isEnglish() ? "Name" : "Nome"}</th><th>${isEnglish() ? "Mode" : "Modalita'"}</th><th>${isEnglish() ? "Form" : "Forma"}</th><th>${isEnglish() ? "Profile" : "Profilo"}</th><th>${isEnglish() ? "Result" : "Risultato"}</th><th>Literacy</th><th>Fluency</th><th>Mindset</th><th>${isEnglish() ? "Technical" : "Tecnica"}</th><th>${isEnglish() ? "Practical" : "Pratica"}</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </section>
      `;
    }

    function scoreText(value) {
      return isScore(value) ? String(value) : "—";
    }

    function bindDashboardEvents() {
      $("restartBtn").addEventListener("click", () => resetToInitialPage(false));
      $("exportJsonBtn").addEventListener("click", () => exportJson(state.latestReport));
      $("exportCsvBtn").addEventListener("click", () => exportCsv(state.latestReport));
      $("printBtn").addEventListener("click", () => window.print());
      $("bibliographyBtn").addEventListener("click", () => showBibliography("dashboardView"));
      $("clearHistoryBtn").addEventListener("click", () => {
        const ok = window.confirm(isEnglish() ? "Clear the local history saved in this browser?" : "Svuotare lo storico locale salvato in questo browser?");
        if (!ok) return;
        try {
          localStorage.removeItem("aiSkillAssessmentHistory");
          localStorage.removeItem(FORM_CYCLE_STORAGE_KEY);
        } catch (error) {
          console.warn("Impossibile svuotare lo storico locale", error);
        }
        resetToInitialPage(true);
        showToast(isEnglish() ? "Local history cleared." : "Storico locale svuotato.");
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
      state.latestReport = null;
      state.bibliographyBackView = "introView";
      $("progressFill").style.width = "0%";
      if (clearFields) {
        ["nameInput", "roleInput", "areaInput", "selfOverallInput", "selfLiteracyInput", "selfFluencyInput", "selfMindsetInput"].forEach(id => {
          if ($(id)) $(id).value = "";
        });
      }
      showView("introView");
    }

    function renderDashboardWithoutSaving(report) {
      const originalSave = saveReport;
      window.__skipSaveOnce = true;
      renderDashboard(report);
      window.__skipSaveOnce = false;
    }

    function finishAssessment() {
      if (answeredCount() < questions.length) {
        showToast(isEnglish() ? "Answer every question before calculating the dashboard." : "Completa tutte le domande prima di calcolare la dashboard.");
        return;
      }
      const report = calculateResults();
      renderDashboard(report);
    }

    function saveReport(report) {
      if (window.__skipSaveOnce) return;
      const history = loadHistory();
      history.push(report);
      const trimmed = history.slice(-100);
      try {
        localStorage.setItem("aiSkillAssessmentHistory", JSON.stringify(trimmed));
      } catch (error) {
        console.warn("Impossibile salvare lo storico locale", error);
      }
    }

    function loadHistory() {
      try {
        const raw = localStorage.getItem("aiSkillAssessmentHistory");
        return raw ? JSON.parse(raw) : [];
      } catch (error) {
        return [];
      }
    }

    function loadLastReport() {
      const history = loadHistory();
      if (!history.length) {
        showToast(isEnglish() ? "No report in local history." : "Nessun report nello storico locale.");
        return;
      }
      state.latestReport = history[history.length - 1];
      window.__skipSaveOnce = true;
      renderDashboard(state.latestReport);
      window.__skipSaveOnce = false;
    }

    function exportJson(report) {
      if (!report) return;
      const fileName = reportFileName(report, "json");
      downloadBlob(JSON.stringify(report, null, 2), fileName, "application/json;charset=utf-8");
    }

    function exportCsv(report) {
      if (!report) return;
      const rows = [];
      rows.push(["tipo", "campo", "valore"]);
      rows.push(["meta", "nome", report.meta.name || ""]);
      rows.push(["meta", "ruolo", report.meta.role || ""]);
      rows.push(["meta", "area", report.meta.area || ""]);
      rows.push(["meta", "versione_assessment", report.meta.assessmentVersion || "precedente"]);
      rows.push(["meta", "lingua", report.meta.language || "it"]);
      rows.push(["meta", "origine_lingua", report.meta.languageSource || "system"]);
      rows.push(["meta", "forma", report.meta.formId || ""]);
      rows.push(["meta", "versione_forma", report.meta.formVersion || ""]);
      rows.push(["meta", "versione_banca_domande", report.meta.questionBankVersion || ""]);
      const testMode = (report.meta && report.meta.testMode) || {};
      const fallbackMode = getReportMode(report);
      rows.push(["meta", "testMode", testMode.id || fallbackMode.id]);
      rows.push(["meta", "modalita_test_label", testMode.label || fallbackMode.label]);
      rows.push(["meta", "tipo_modalita", testMode.type || fallbackMode.type]);
      rows.push(["meta", "domande_modalita", testMode.questionCount || modeQuestionCount(report)]);
      const selfAssessment = (report.meta && report.meta.selfAssessment) || {};
      rows.push(["autovalutazione", "AI Skill", selfAssessment.overall ?? ""]);
      rows.push(["autovalutazione", "Literacy", selfAssessment.literacy ?? ""]);
      rows.push(["autovalutazione", "Fluency", selfAssessment.fluency ?? ""]);
      rows.push(["autovalutazione", "Mindset", selfAssessment.mindset ?? ""]);
      rows.push(["risultato", "profilo", report.profile]);
      (report.selfComparison || []).forEach(item => rows.push(["confronto", `${item.label} gap dichiarato-test`, item.gap ?? ""]));
      Object.entries(report.score).forEach(([key, value]) => rows.push(["score", key, value]));
      rows.push([]);
      rows.push(["id", "id_base", "forma", "sezione", "dimensione", "domanda", "risposta", "score"]);
      report.answers.forEach(item => rows.push([item.id, item.sourceId || "", item.formId || report.meta.formId || "", item.section, item.sub, item.question, `${item.answer} — ${item.answerText}`, item.score]));
      const csv = rows.map(row => row.map(csvCell).join(",")).join("\n");
      downloadBlob(csv, reportFileName(report, "csv"), "text/csv;charset=utf-8");
    }

    function reportFileName(report, ext) {
      const who = (report.meta.name || "assessment").toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "assessment";
      const date = new Date(report.meta.completedAt).toISOString().slice(0, 10);
      const formLabel = isEnglish() ? "form" : "forma";
      const form = report.meta && report.meta.formId ? `-${formLabel}-${String(report.meta.formId).toLowerCase()}` : "";
      const mode = getReportMode(report);
      const modePart = mode.id && mode.id !== DEFAULT_TEST_MODE_ID ? `-${mode.id}` : "";
      return `ai-skill-${who}-${date}${modePart}${form}.${ext}`;
    }

    function csvCell(value) {
      const str = String(value ?? "");
      if (/[",\n;]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
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
    renderModeSelector();
    renderQuestionDistribution();
    bindModeCarouselGestures();
    bindModeCarouselAutoplay();
    $("modePrevBtn").addEventListener("click", () => moveSelectedMode(-1));
    $("modeNextBtn").addEventListener("click", () => moveSelectedMode(1));
    $("introStartBtn").addEventListener("click", openProfileStep);
    $("introBibliographyBtn").addEventListener("click", () => showBibliography("introView"));
    $("profileBackBtn").addEventListener("click", () => showView("introView"));
    $("startBtn").addEventListener("click", startAssessment);
    $("loadLastBtn").addEventListener("click", loadLastReport);
    $("nextBtn").addEventListener("click", goNext);
    $("prevBtn").addEventListener("click", goPrev);
    $("finishBtn").addEventListener("click", finishAssessment);
    document.querySelectorAll("[data-bibliography-back]").forEach(button => {
      button.addEventListener("click", closeBibliography);
    });
