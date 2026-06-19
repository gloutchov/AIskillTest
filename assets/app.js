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

    function readFormCycle() {
      try {
        const raw = localStorage.getItem(FORM_CYCLE_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return {
          remaining: Array.isArray(parsed.remaining) ? parsed.remaining.filter(id => FORM_IDS.includes(id)) : [],
          last: FORM_IDS.includes(parsed.last) ? parsed.last : null
        };
      } catch (error) {
        return { remaining: [], last: null };
      }
    }

    function writeFormCycle(cycle) {
      try {
        localStorage.setItem(FORM_CYCLE_STORAGE_KEY, JSON.stringify(cycle));
      } catch (error) {
        console.warn("Impossibile salvare la rotazione delle forme", error);
      }
    }

    function selectNextForm() {
      const cycle = readFormCycle();
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
      writeFormCycle(cycle);
      return selected;
    }

    const APP_VERSION = "2.0.2";
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
      carouselSuspended: false
    };

    const AUTO_ADVANCE_DELAY_MS = 280;
    const CAROUSEL_INTERVAL_MS = 5000;

    const $ = (id) => document.getElementById(id);

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
        button.textContent = state.bibliographyBackView === "dashboardView" ? "Torna ai risultati" : "Torna alla home";
      });
      showView("bibliographyView");
    }

    function closeBibliography() {
      showView(state.bibliographyBackView || "introView");
    }

    function getModeById(modeId) {
      return TEST_MODES.find(mode => mode.id === modeId) || TEST_MODES[0];
    }

    function modePoolQuestions(sourceQuestions, mode) {
      if (!mode || mode.id === DEFAULT_TEST_MODE_ID) return sourceQuestions.slice(0, COMPLETE_TEST_COUNT);
      return sourceQuestions.filter(question => question.section === mode.section);
    }

    function sampleQuestions(sourceQuestions, count) {
      const copy = [...sourceQuestions];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy.slice(0, Math.min(count, copy.length));
    }

    function questionsForMode(sourceQuestions, mode, randomize = false) {
      const selectedMode = mode || getModeById(DEFAULT_TEST_MODE_ID);
      const pool = modePoolQuestions(sourceQuestions, selectedMode);
      const limit = selectedMode.questionLimit || pool.length;
      if (randomize) return sampleQuestions(pool, limit);
      return pool.slice(0, Math.min(limit, pool.length));
    }

    function questionCountForMode(mode) {
      const selectedMode = mode || getModeById(DEFAULT_TEST_MODE_ID);
      const pool = modePoolQuestions(baseQuestions, selectedMode);
      const limit = selectedMode.questionLimit || pool.length;
      return Math.min(limit, pool.length);
    }

    function modeDuration(mode) {
      return mode.id === DEFAULT_TEST_MODE_ID ? "12-15 minuti" : "3-5 minuti";
    }

    function modeBadge(mode) {
      return mode.id === DEFAULT_TEST_MODE_ID ? "Profilo completo" : "Report tematico";
    }

    function modeTopics(mode) {
      if (mode.id === DEFAULT_TEST_MODE_ID) {
        return ["Literacy", "Fondamenti LLM", "Fluency 4D", "Mindset", "Practical Lab"];
      }
      const guide = sectionGuides[mode.section];
      return guide ? guide.items : [mode.section || mode.label];
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
      container.innerHTML = TEST_MODES.map(mode => {
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
              <strong>${count} domande</strong>
            </div>
            <p class="mode-card-desc">${escapeHtml(mode.description)}</p>
            <div class="mode-facts" aria-label="Caratteristiche del percorso">
              <div>
                <span>Durata</span>
                <strong>${escapeHtml(modeDuration(mode))}</strong>
              </div>
              <div>
                <span>Risultato</span>
                <strong>${escapeHtml(mode.outputNote)}</strong>
              </div>
            </div>
            <div class="pill-row mode-topic-row" aria-label="Temi affrontati">
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
        return `<button type="button" class="carousel-dot ${selected ? "active" : ""}" data-mode-id="${escapeHtml(mode.id)}" aria-label="Mostra ${escapeHtml(mode.label)}" aria-current="${selected ? "true" : "false"}"></button>`;
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
      button.textContent = state.carouselPaused ? "Riprendi" : "Pausa";
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
          .map(section => `<div class="topic-row"><span>${escapeHtml(section)}</span><strong>${counts[section]}</strong></div>`)
          .join("");
        container.innerHTML = `
          ${rows}
          <div class="topic-row topic-total"><span>${escapeHtml(mode.shortLabel || mode.label)}</span><strong>${total}</strong></div>
        `;
      }
      const heroCount = $("heroCount");
      if (heroCount) heroCount.textContent = total;
      const heroDescription = $("heroCountDescription");
      if (heroDescription) {
        heroDescription.textContent = mode.id === DEFAULT_TEST_MODE_ID
          ? "domande estratte da una delle tre forme parallele, tra autovalutazione, quiz tecnico, scenari e prove pratiche"
          : "domande nel percorso tematico selezionato, con report locale dedicato alla sezione scelta";
      }
      const modeFootnote = $("modeFootnote");
      if (modeFootnote) {
        modeFootnote.textContent = mode.id === DEFAULT_TEST_MODE_ID
          ? "All'avvio viene scelta una delle tre forme parallele disponibili. Le alternative vengono rimescolate a ogni assessment."
          : "Il percorso tematico misura solo l'area scelta: non produce un profilo globale e non mostra punteggi su dimensioni assenti.";
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
      const selectedForm = selectNextForm();
      const selectedMode = getModeById(selectedTestModeId());
      questions = questionsForMode(buildQuestionForm(selectedForm), selectedMode, true);
      state.formId = selectedForm;
      state.selectedModeId = selectedMode.id;
      state.meta = {
        name: $("nameInput").value.trim(),
        role: $("roleInput").value.trim(),
        area: $("areaInput").value.trim(),
        assessmentVersion: APP_VERSION,
        formId: selectedForm,
        formVersion: FORM_VERSION,
        questionBankVersion: QUESTION_BANK_VERSION,
        testMode: {
          id: selectedMode.id,
          label: selectedMode.label,
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
      if (question.type === "likert") return likertOptions;
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

      $("progressText").textContent = `Domanda ${state.index + 1} di ${total}`;
      $("answeredText").textContent = `${count} risposte`;
      $("progressFill").style.width = `${pct}%`;
      $("sectionBadge").textContent = q.section;
      $("questionTitle").textContent = q.text;
      $("questionHint").textContent = q.hint || "";

      const guide = sectionGuides[q.section] || sectionGuides.Literacy;
      $("sideTitle").textContent = guide.title;
      $("sideText").textContent = guide.text;
      $("sideList").innerHTML = guide.items.map(item => `<div class="mini-item">${escapeHtml(item)}</div>`).join("");

      const currentValue = state.answers[q.id];

      if (q.type === "text") {
        $("options").innerHTML = `
          <textarea id="${q.id}_text" placeholder="Scrivi esattamente ciò che useresti nella situazione reale...">${escapeHtml(currentValue || "")}</textarea>
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
      return `<div class="hint-toggle-row"><button type="button" class="hint-toggle" id="optionHintToggle">${visible ? "Nascondi suggerimenti" : "Mostra suggerimenti"}</button></div>`;
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
      $("answeredText").textContent = `${answeredCount()} risposte`;
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
        showToast(q.type === "text" ? "Inserisci una risposta prima di proseguire." : "Rispondi alla domanda prima di proseguire.");
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
          const selected = likertOptions.find(opt => opt.value === Number(raw));
          answer = selected ? selected.title : "";
          answerText = selected ? selected.text : "";
        } else if (q.type === "multi") {
          const selectedOptions = Array.isArray(raw) ? raw.map(index => q.options[Number(index)]).filter(Boolean) : [];
          answer = selectedOptions.map(opt => opt.title).join(" | ");
          answerText = selectedOptions.map(opt => opt.text).join(" | ");
        } else if (q.type === "text") {
          answer = "Risposta testuale";
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
      let profile = "Profilo tematico";
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
      if (typeof score !== "number") return { label: "Non misurato", text: "Questa modalita' non include abbastanza domande Mindset per produrre una lente dedicata." };
      if (score < 40) return { label: "Cauto / resistente", text: "L’adozione richiede casi d’uso concreti, rischio basso e accompagnamento ravvicinato." };
      if (score < 60) return { label: "Pragmatico ma incerto", text: "C’è apertura, ma servono obiettivi chiari, regole e risultati misurabili." };
      if (score < 80) return { label: "Aperto e gestibile", text: "Buona predisposizione alla sperimentazione controllata e al miglioramento del workflow." };
      return { label: "Propulsivo", text: "Forte propensione a sperimentare, condividere e guidare l’adozione se sostenuta da metodo e governance." };
    }

    function getCalibration(gap) {
      if (typeof gap !== "number") return { label: "Non disponibile", text: "La calibrazione richiede sia risposte dichiarative sia prove comportamentali nella stessa modalita'." };
      if (gap >= 18) return { label: "Autovalutazione alta rispetto alle prove", text: "Le risposte dichiarative sono più forti delle scelte comportamentali e delle prove pratiche. Conviene lavorare su esercizi guidati, rubriche e verifica degli output." };
      if (gap <= -18) return { label: "Prove migliori dell’autovalutazione", text: "La persona tende a sottostimarsi o è prudente nel dichiarare competenza. Conviene valorizzare esempi pratici già corretti e trasformarli in metodo." };
      return { label: "Autovalutazione coerente", text: "Le risposte dichiarative, gli scenari e le prove pratiche sono abbastanza allineati." };
    }

    function buildRecommendations(score, profile, mode) {
      const dims = [
        ["Literacy", score.literacy, "Rafforzare fondamenti, limiti, fonti, dati, privacy e differenza tra output plausibile e verificato."],
        ["Fondamenti tecnici", score.technical, "Consolidare token, generazione autoregressiva, addestramento, inferenza, contesto, reti neurali, Transformer, allucinazioni, RAG ed embedding."],
        ["Delegation", score.delegation, "Mappare quali parti del lavoro sono delegabili, quali richiedono controllo umano e quali non vanno delegate."],
        ["Description", score.description, "Usare brief strutturati con contesto, vincoli, esempi, formato atteso e criteri di qualità."],
        ["Discernment", score.discernment, "Introdurre checklist di valutazione, controllo fonti, confronto alternative e revisione proporzionata al rischio."],
        ["Diligence", score.diligence, "Chiarire dati ammessi, responsabilità finale, trasparenza d’uso, compliance e tracciabilità."],
        ["Mindset", score.mindset, "Lavorare su sperimentazioni a basso rischio, fiducia calibrata e condivisione di pratiche utili."]
      ].filter(item => typeof item[1] === "number").sort((a, b) => a[1] - b[1]);

      const isCompleteMode = !mode || mode.id === DEFAULT_TEST_MODE_ID;
      const thematicActions = [
        `Usare il risultato di ${mode ? mode.label : "questa modalita'"} come diagnosi mirata, non come profilo globale della persona.`,
        "Rivedere le risposte a punteggio basso e trasformarle in esempi o checklist operative.",
        "Completare il test completo quando serve una lettura comparabile su Literacy, Fluency e Mindset."
      ];

      return {
        profile: isCompleteMode ? profileActions[profile] : thematicActions,
        weakest: dims.slice(0, 2).map(item => ({ area: item[0], score: item[1], action: item[2] })),
        strongest: dims.slice(-2).reverse().map(item => ({ area: item[0], score: item[1], action: `Usare questa area come leva per sostenere il miglioramento delle aree più deboli.` }))
      };
    }

    function renderDashboard(report) {
      state.latestReport = report;
      saveReport(report);
      const mode = getReportMode(report);
      const isCompleteMode = mode.id === DEFAULT_TEST_MODE_ID;
      const s = { ...report.score };
      const metaTitle = [report.meta.name, report.meta.role, report.meta.area].filter(Boolean).join(" · ");
      const profileTitle = isCompleteMode ? report.profile : mode.label;
      const profileKicker = isCompleteMode ? "Profilo principale" : "Profilo tematico";
      const profileDescription = isCompleteMode
        ? profileDescriptions[report.profile]
        : `${mode.outputNote} Il punteggio e' calcolato solo sulle ${modeQuestionCount(report)} domande svolte.`;
      const calibrationGapText = typeof report.calibrationGap === "number"
        ? ` Gap dichiarato/comportamentale: <strong>${report.calibrationGap > 0 ? "+" : ""}${report.calibrationGap}</strong> punti.`
        : "";
      const chartBlock = isCompleteMode ? `
        <div class="grid-2">
          <section class="card chart-card">
            <div class="chart-title-row">
              <div>
                <h3>Radar competenze</h3>
                <p class="muted small">Vista su Literacy, Mindset e 4D della Fluency.</p>
              </div>
            </div>
            <div class="svg-box">${radarSvg(s)}</div>
          </section>
          <section class="card chart-card">
            <div class="chart-title-row">
              <div>
                <h3>Quadrante Literacy × Fluency</h3>
                <p class="muted small">La soglia operativa è 60/100.</p>
              </div>
            </div>
            <div class="svg-box">${quadrantSvg(s.literacy, s.fluency, report.profile)}</div>
          </section>
        </div>
      ` : `
        <section class="card chart-card" style="margin-bottom: 18px;">
          <h3>Dettaglio percorso tematico</h3>
          <p class="muted small">Sono mostrate solo le aree effettivamente misurate dalla modalita' selezionata.</p>
          <div class="bar-list">${dimensionBarRows(s)}</div>
        </section>
      `;

      $("dashboard").innerHTML = `
        <div class="actions" style="margin-top: 0; margin-bottom: 18px;">
          <button class="btn-primary" id="restartBtn">Nuovo assessment</button>
          <button class="btn-ghost" id="exportJsonBtn">Esporta JSON</button>
          <button class="btn-ghost" id="exportCsvBtn">Esporta CSV</button>
          <button class="btn-ghost" id="printBtn">Stampa / salva PDF</button>
          <button class="btn-ghost" id="bibliographyBtn">Bibliografia</button>
          <button class="btn-danger" id="clearHistoryBtn">Svuota storico locale</button>
        </div>

        <div class="grid-4">${scoreSummaryCards(report, isCompleteMode)}</div>

        <div class="profile-band">
          <section class="profile-card">
            <p class="kicker" style="color:#a5b4fc;">${escapeHtml(profileKicker)}</p>
            <div class="profile-title">${escapeHtml(profileTitle)}</div>
            <p>${escapeHtml(profileDescription)}</p>
            <p class="small">${metaTitle ? escapeHtml(metaTitle) + " · " : ""}${formatDate(report.meta.completedAt)} · ${escapeHtml(mode.label)} · Forma ${escapeHtml((report.meta && report.meta.formId) || "non registrata")}</p>
          </section>
          <section class="card">
            <h3>Lente Mindset: ${escapeHtml(report.mindsetLens.label)}</h3>
            <p>${escapeHtml(report.mindsetLens.text)}</p>
            <h3 style="margin-top: 18px;">Calibrazione: ${escapeHtml(report.calibration.label)}</h3>
            <p>${escapeHtml(report.calibration.text)}${calibrationGapText}</p>
          </section>
        </div>

        ${selfAssessmentComparison(report)}

        ${typeScoreCards(report)}

        ${chartBlock}

        <div class="grid-2" style="margin-top: 18px;">
          <section class="card">
            <h3>Dettaglio dimensioni</h3>
            <div class="bar-list">${dimensionBarRows(s)}</div>
          </section>
          <section class="card">
            <h3>Azioni consigliate</h3>
            <div class="analysis-list">
              ${report.recommendations.profile.map(action => `<div class="analysis-item">${escapeHtml(action)}</div>`).join("")}
            </div>
          </section>
        </div>

        <div class="grid-2" style="margin-top: 18px;">
          <section class="card">
            <h3>Aree da rafforzare</h3>
            <div class="analysis-list">
              ${recommendationRows(report.recommendations.weakest, "Non ci sono aree misurate da ordinare per priorita'.")}
            </div>
          </section>
          <section class="card">
            <h3>Aree di leva</h3>
            <div class="analysis-list">
              ${recommendationRows(report.recommendations.strongest, "Non ci sono aree misurate da usare come leva.")}
            </div>
          </section>
        </div>

        ${scenarioReview(report)}
        ${technicalReview(report)}
        ${historyBlock()}

        <p class="footer-note">Fonti, riferimenti metodologici e approfondimenti tecnici sono raccolti nella pagina <strong>Bibliografia</strong>. Lo strumento resta una bozza interna: le prove testuali sono valutate con euristiche locali e non sostituiscono una validazione statistica, psicometrica o una review esperta.</p>
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
          isCompleteMode ? "Indice AI Skill" : "Risultato percorso",
          score.overall,
          isCompleteMode
            ? "Punteggio composito del test completo: 35% Literacy, 45% Fluency, 20% Mindset."
            : "Punteggio medio calcolato solo sulle domande della modalita' selezionata."
        ],
        ["Literacy", score.literacy, "Comprensione di funzionamento, limiti, dati, fonti e privacy."],
        ["Fluency", score.fluency, "Competenza operativa media sulle 4D presenti nel percorso."],
        ["Mindset", score.mindset, "Attitudine, fiducia calibrata e apertura alla sperimentazione."],
        ["Delegation", score.delegation, "Scelta dei task delegabili e responsabilita' umana."],
        ["Description", score.description, "Qualita' di brief, contesto, vincoli e formato atteso."],
        ["Discernment", score.discernment, "Valutazione critica di output, fonti, utilita' e rischi."],
        ["Diligence", score.diligence, "Uso responsabile, trasparente e proporzionato della GenAI."]
      ];
      return entries
        .filter(([, value], index) => index === 0 || isScore(value))
        .map(([label, value, desc]) => scoreCard(label, value, desc))
        .join("");
    }

    function typeScoreCards(report) {
      const entries = [
        ["Autovalutazione", report.likertPct, "Media delle risposte dichiarative, presentate senza etichette di livello e in ordine casuale."],
        ["Scenari", report.scenarioPct, "Media delle scelte situazionali in casi realistici."],
        ["Prove pratiche", report.practicalPct, "Media di mini-task, checklist operative e prompt valutati con rubrica locale."],
        ["Fondamenti tecnici", report.technicalPct, "Quiz su token, generazione, training, contesto, reti neurali, Transformer, allucinazioni, RAG, embedding e storia dell'AI."]
      ].filter(([, value]) => isScore(value));
      if (!entries.length) return "";
      return `<div class="grid-4" style="margin-bottom: 18px;">${entries.map(([label, value, desc]) => scoreCard(label, value, desc)).join("")}</div>`;
    }

    function dimensionBarRows(score) {
      const rows = [
        ["Literacy", score.literacy],
        ["Fondamenti tecnici", score.technical],
        ["Delegation", score.delegation],
        ["Description", score.description],
        ["Discernment", score.discernment],
        ["Diligence", score.diligence],
        ["Mindset", score.mindset],
        ["Prove pratiche", score.execution]
      ].filter(([, value]) => isScore(value));
      if (!rows.length) return `<p class="muted">Nessun punteggio dimensionale disponibile.</p>`;
      return rows.map(([label, value]) => barRow(label, value)).join("");
    }

    function recommendationRows(items, fallback) {
      if (!items || !items.length) return `<div class="analysis-item">${escapeHtml(fallback)}</div>`;
      return items.map(item => `<div class="analysis-item"><strong>${escapeHtml(item.area)} · ${item.score}/100</strong>${escapeHtml(item.action)}</div>`).join("");
    }

    function selfConsistency(gap) {
      const distance = Math.abs(Number(gap) || 0);
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
            <h3>Autopercezione iniziale × risultato del test</h3>
            <p class="muted">Non sono stati inseriti valori di autovalutazione iniziale, quindi il confronto diretto non è disponibile per questo report.</p>
          </section>
        `;
      }
      const cards = provided.map(item => {
        const gap = item.gap;
        const gapText = `${gap > 0 ? "+" : ""}${gap}`;
        const consistency = selfConsistency(gap);
        const declaredTitle = `${consistency.label}: ${consistency.detail}. Scarto assoluto ${Math.abs(gap)} punti.`;
        return `
          <div class="comparison-card">
            <h4>${escapeHtml(item.label)}</h4>
            <div class="comparison-values">
              <div class="comparison-value ${consistency.className}" title="${escapeHtml(declaredTitle)}"><span>Dichiarato</span><strong>${item.declared}</strong><span class="consistency-tag">${escapeHtml(consistency.label)}</span></div>
              <div class="comparison-value"><span>Dal test</span><strong>${item.measured}</strong></div>
            </div>
            <p class="gap-line">Gap dichiarato − test: <strong>${gapText}</strong> punti.</p>
          </div>
        `;
      }).join("");
      return `
        <section class="card" style="margin-bottom: 18px;">
          <h3>Autopercezione iniziale × risultato del test</h3>
          <p class="muted">Il gap è calcolato come valore dichiarato prima del test meno punteggio emerso. Un valore positivo indica una percezione superiore al risultato; un valore negativo indica il contrario. Il colore considera lo scarto assoluto, quindi misura la coerenza indipendentemente dalla direzione.</p>
          <div class="consistency-legend" aria-label="Legenda coerenza autopercezione">
            <span class="legend-chip"><span class="legend-dot green"></span>Verde: scarto 0–10</span>
            <span class="legend-chip"><span class="legend-dot yellow"></span>Giallo: scarto 11–20</span>
            <span class="legend-chip"><span class="legend-dot red"></span>Rosso: scarto oltre 20</span>
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

      return `<svg viewBox="0 0 380 335" role="img" aria-label="Radar competenze AI" width="100%" height="100%">
        ${rings}${axisLines}
        <polygon points="${polygon}" fill="rgba(79,70,229,0.28)" stroke="#4f46e5" stroke-width="3" />
        ${dots}${labels}
      </svg>`;
    }

    function quadrantSvg(literacy, fluency, profile) {
      const x = 50 + (literacy / 100) * 300;
      const y = 300 - (fluency / 100) * 260;
      return `<svg viewBox="0 0 390 330" role="img" aria-label="Quadrante Literacy Fluency" width="100%" height="100%">
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
            <h3>Scenari e prove pratiche</h3>
            <p>Le risposte comportamentali risultano complessivamente solide. Scenari, checklist operative e mini-task sono coerenti con il profilo emerso.</p>
          </section>
        `;
      }
      return `
        <section class="card" style="margin-top: 18px;">
          <h3>Scenari e prove pratiche da rivedere</h3>
          <p class="muted">Queste risposte non sono errori in senso scolastico; indicano comportamenti da rendere più robusti o da osservare con esercizi guidati.</p>
          <div class="analysis-list">
            ${items.map(item => `<div class="analysis-item"><strong>${escapeHtml(item.section)} · ${escapeHtml(subLabels[item.sub] || item.sub)} · ${item.score}/5</strong>${escapeHtml(item.feedback)}</div>`).join("")}
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
            <h3>Fondamenti tecnici LLM</h3>
            <p>Le risposte tecniche risultano complessivamente solide. Il punteggio misura comprensione concettuale, non competenza ingegneristica avanzata.</p>
          </section>
        `;
      }
      return `
        <section class="card" style="margin-top: 18px;">
          <h3>Fondamenti tecnici da consolidare</h3>
          <p class="muted">Le aree sotto riportate aiutano a distinguere conoscenza dichiarata e comprensione verificata dei meccanismi di base.</p>
          <div class="analysis-list">
            ${items.map(item => `<div class="analysis-item"><strong>${escapeHtml(item.question)} · ${item.score}/5</strong>${escapeHtml(item.feedback)}</div>`).join("")}
          </div>
        </section>
      `;
    }

    function historyBlock() {
      const history = loadHistory();
      if (!history.length) return "";
      const rows = history.slice(-8).reverse().map(report => {
        const mode = getReportMode(report);
        return `
          <tr>
            <td>${escapeHtml(formatDate(report.meta.completedAt))}</td>
            <td>${escapeHtml(report.meta.name || "—")}</td>
            <td>${escapeHtml(mode.shortLabel || mode.label)}</td>
            <td>${escapeHtml((report.meta && report.meta.formId) || "—")}</td>
            <td>${escapeHtml(report.profile)}</td>
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
          <h3>Storico locale</h3>
          <p class="muted">Ultimi ${Math.min(8, history.length)} report salvati in questo browser. Media risultato percorso: <strong>${scoreText(avgOverall)}/100</strong>.</p>
          <div style="overflow:auto;">
            <table class="history-table">
              <thead><tr><th>Data</th><th>Nome</th><th>Modalita'</th><th>Forma</th><th>Profilo</th><th>Risultato</th><th>Literacy</th><th>Fluency</th><th>Mindset</th><th>Tecnica</th><th>Pratica</th></tr></thead>
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
        const ok = window.confirm("Svuotare lo storico locale salvato in questo browser?");
        if (!ok) return;
        try {
          localStorage.removeItem("aiSkillAssessmentHistory");
          localStorage.removeItem(FORM_CYCLE_STORAGE_KEY);
        } catch (error) {
          console.warn("Impossibile svuotare lo storico locale", error);
        }
        resetToInitialPage(true);
        showToast("Storico locale svuotato.");
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
        showToast("Completa tutte le domande prima di calcolare la dashboard.");
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
        showToast("Nessun report nello storico locale.");
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
      const form = report.meta && report.meta.formId ? `-forma-${String(report.meta.formId).toLowerCase()}` : "";
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
      showToast("File esportato.");
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
        return new Intl.DateTimeFormat("it-IT", {
          year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
        }).format(new Date(iso));
      } catch (error) {
        return iso;
      }
    }

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
