/* Milestone 17. Pure local assessment rules; approved blueprint 1.0.0. */
const ASSESSMENT_V3 = (() => {
  "use strict";
  const SCORING_VERSION = "3.1.0";
  const BLUEPRINT_VERSION = "1.0.0";
  const REPORT_SCHEMA_VERSION = 4;
  const AREA_LABELS = {
    F: ["Fondamenti", "Foundations"], U: ["Uso operativo e multimodale", "Operational and multimodal use"],
    A: ["Agenti", "Agents"], H: ["Harness", "Harnesses"]
  };
  const OBJECTIVES = {
    F01: ["Token, generazione e variabilità", "Tokens, generation, and variability"],
    F02: ["Addestramento, inferenza e contesto", "Training, inference, and context"],
    F03: ["Affermazioni e fonti verificabili", "Verifiable claims and sources"],
    F04: ["RAG, ricerca ed embedding", "RAG, search, and embeddings"],
    F05: ["Reti neurali e attention", "Neural networks and attention"],
    F06: ["Famiglie di soluzioni AI", "Families of AI solutions"],
    U01: ["Scelta degli strumenti e delega", "Tool choice and delegation"],
    U02: ["Immagini, scansioni e grafici", "Images, scans, and charts"],
    U03: ["Audio e video", "Audio and video"],
    U04: ["Brief, vincoli e ambiguità", "Briefs, constraints, and ambiguity"],
    U05: ["Qualità, tempo, costo e località", "Quality, time, cost, and locality"],
    U06: ["Verifica degli artefatti", "Artifact verification"],
    U07: ["Dati, diritti e responsabilità", "Data, rights, and responsibility"],
    U08: ["Esperimenti e adozione", "Experiments and adoption"],
    A01: ["Workflow e architetture agentiche", "Workflows and agent architectures"],
    A02: ["Tool, argomenti ed esiti", "Tools, arguments, and outcomes"],
    A03: ["Supervisione e mandato", "Supervision and scope of authority"],
    A04: ["Istruzioni non fidate e divulgazione", "Untrusted instructions and disclosure"],
    A05: ["Diagnosi, loop e arresto", "Diagnosis, loops, and stopping"],
    H01: ["Componenti dell'harness", "Harness components"],
    H02: ["Contesto, memoria e continuità", "Context, memory, and continuity"],
    H03: ["API, MCP, skill e istruzioni", "APIs, MCP, skills, and instructions"],
    H04: ["Contratti e permessi effettivi", "Contracts and enforced permissions"],
    H05: ["Checkpoint e ripresa", "Checkpoints and recovery"],
    H06: ["Tracce e valutazioni ripetibili", "Traces and repeatable evaluations"]
  };
  // Filled from docs/ASSESSMENT_ITEM_MAP.md; changing an existing mapping changes scoring.
  const ITEM_MAP = {
    "L1": {"evidenceType":"D","primaryArea":"F","objectiveId":"F01","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "L2": {"evidenceType":"D","primaryArea":"F","objectiveId":"F02","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "L3": {"evidenceType":"D","primaryArea":"F","objectiveId":"F03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["verification"]},
    "L4": {"evidenceType":"D","primaryArea":"F","objectiveId":"F04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["context"]},
    "L5": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "L6": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["verification"]},
    "L7": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "T1": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F01","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "T2": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F01","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "T3": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F02","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "T4": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F02","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "T5": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F02","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "T6": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F05","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "T7": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F05","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "T8": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["verification"]},
    "T9": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["context"]},
    "T10": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F06","objectiveAlignment":"supporting","taskLevel":"B","secondaryTags":[]},
    "T11": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["verification"]},
    "T12": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["context"]},
    "TR_CITE": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["verification"]},
    "F_DE_1": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_2": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_3": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DS_1": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_2": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_3": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "TR_PROMPT": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DI_1": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_2": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_3": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "TR_SURE": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DG_1": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_2": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_3": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "M1": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M2": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M3": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M4": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M5": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M6": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M7": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M8": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M9": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "P_L_1": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["verification"]},
    "P_DE_1": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "P_DS_1": {"evidenceType":"T","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "P_DS_2": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "P_DI_1": {"evidenceType":"T","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "P_DG_1": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "P_M_1": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "L8": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "L9": {"evidenceType":"D","primaryArea":"A","objectiveId":"A04","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["privacy"]},
    "L10": {"evidenceType":"D","primaryArea":"F","objectiveId":"F01","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "L11": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "L12": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DE_4": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_5": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_6": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_7": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_8": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_9": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_10": {"evidenceType":"D","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_11": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DE_12": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "F_DS_4": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_5": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_6": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_7": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_8": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_9": {"evidenceType":"D","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_10": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DS_11": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "F_DI_4": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_5": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_6": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_7": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_8": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_9": {"evidenceType":"D","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_10": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DI_11": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "F_DG_4": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_5": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_6": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_7": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_8": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_9": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_10": {"evidenceType":"D","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_11": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "F_DG_12": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "M10": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M11": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "M12": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "P_L_2": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "P_DE_2": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "P_DS_3": {"evidenceType":"T","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "P_DI_2": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "P_DG_2": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "T13": {"evidenceType":"Q","primaryArea":"F","objectiveId":"F02","objectiveAlignment":"direct","taskLevel":"B","secondaryTags":[]},
    "M13": {"evidenceType":"D","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "P_M_2": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset"]},
    "AG1": {"evidenceType":"D","primaryArea":"A","objectiveId":"A01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "AG2": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "AG3": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "AG4": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "AG5": {"evidenceType":"D","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "AG6": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "AG7": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A02","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "AG8": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A05","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "AG9": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H06","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "AG10": {"evidenceType":"T","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "AG11": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "AG12": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H02","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["context"]},
    "AG13": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H06","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "AG14": {"evidenceType":"D","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "AG15": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","diligence"]},
    "MA01": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation","multimodal","context"]},
    "MA02": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "MA03": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U02","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["multimodal","verification"]},
    "MA04": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U02","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["multimodal","delegation"]},
    "MA05": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["multimodal","verification"]},
    "MA06": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U04","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["description"]},
    "MA07": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U05","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation","privacy"]},
    "MA08": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U06","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["discernment","verification"]},
    "MA09": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U07","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["diligence","privacy"]},
    "MA10": {"evidenceType":"Q","primaryArea":"U","objectiveId":"U08","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["mindset","verification"]},
    "AW01": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A01","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation"]},
    "AW02": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A01","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","verification"]},
    "AW03": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A02","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "AW04": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A02","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "AW05": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"O","secondaryTags":["delegation","diligence"]},
    "AW06": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["diligence","context"]},
    "AW07": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A04","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["diligence","privacy"]},
    "AW08": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A04","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["diligence","privacy"]},
    "AW09": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A05","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "AW10": {"evidenceType":"Q","primaryArea":"A","objectiveId":"A05","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification","context"]},
    "HR01": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H01","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation","verification"]},
    "HR02": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H02","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["context","verification"]},
    "HR03": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H02","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["context"]},
    "HR04": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["delegation"]},
    "HR05": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H03","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["context","diligence"]},
    "HR06": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H04","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["diligence","privacy"]},
    "HR07": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H04","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]},
    "HR08": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H05","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["context","verification"]},
    "HR09": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H05","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["context","verification"]},
    "HR10": {"evidenceType":"Q","primaryArea":"H","objectiveId":"H06","objectiveAlignment":"direct","taskLevel":"S","secondaryTags":["verification"]}
  };
  ["U06", "U06", "U06", "A04", "A03", "H05"].forEach((objectiveId, i) => {
    ITEM_MAP[LOCAL_LAB.IDS[i]] = { evidenceType: "E", primaryArea: objectiveId[0], objectiveId, objectiveAlignment: "direct", taskLevel: i < 3 ? "O" : "S", secondaryTags: ["simulation", "verification"] };
  });
  COMPLETE_ASSESSMENT.SLOTS.filter(slot => slot.evidenceType !== "E").forEach(slot => {
    const { evidenceType, primaryArea, objectiveId, objectiveAlignment, taskLevel, secondaryTags } = slot;
    ITEM_MAP[slot.id] = { evidenceType, primaryArea, objectiveId, objectiveAlignment, taskLevel, secondaryTags };
  });
  const isRecord = value => value !== null && typeof value === "object" && !Array.isArray(value);
  const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
  const clampCredit = value => Math.max(0, Math.min(1, value));
  const label = (labels, language) => labels[language === "en" ? 1 : 0];
  const objectiveIds = area => Object.keys(OBJECTIVES).filter(id => id[0] === area);
  const indexValue = value => (typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value))) && Number.isInteger(Number(value)) ? Number(value) : null;

  function responseStatus(question, raw) {
    if (question.type === "simulation") return LOCAL_LAB.status(question.sourceId, raw);
    if (raw === undefined || raw === null || raw === "" || (Array.isArray(raw) && !raw.length)) return "missing";
    if (question.type === "text") return typeof raw === "string" && raw.trim().length >= (question.proceedChars || 1) ? "valid" : "invalid";
    if (question.type === "likert") return indexValue(raw) !== null && Number(raw) >= 1 && Number(raw) <= 5 ? "valid" : "invalid";
    const options = question.options || [];
    const validIndex = value => indexValue(value) !== null && Number(value) >= 0 && Number(value) < options.length;
    if (question.type === "multi") return Array.isArray(raw) && raw.every(validIndex) && new Set(raw.map(Number)).size === raw.length ? "valid" : "invalid";
    return validIndex(raw) ? "valid" : "invalid";
  }

  function classify(question) {
    const sourceId = question.sourceId || question.id;
    const definition = ITEM_MAP[sourceId];
    if (!definition) throw new Error(`Missing assessment mapping: ${sourceId}`);
    return { ...definition, secondaryTags: [...definition.secondaryTags] };
  }

  function itemResult(question, raw, meta) {
    const classification = classify(question);
    const status = responseStatus(question, raw);
    const options = question.options || [];
    const selected = status !== "valid" || question.type === "text" || question.type === "likert" || question.type === "simulation" ? []
      : (question.type === "multi" ? raw : [raw]).map(index => options[Number(index)]);
    let credit = null;
    if (classification.evidenceType === "Q" && status === "valid") {
      if (question.type === "multi") {
        const maximum = options.reduce((sum, option) => sum + Math.max(0, Number(option.score) || 0), 0);
        credit = maximum ? clampCredit(selected.reduce((sum, option) => sum + (Number(option.score) || 0), 0) / maximum) : null;
      } else {
        credit = Number.isFinite(selected[0]?.score) ? clampCredit((selected[0].score - 1) / 4) : null;
      }
    }
    const item = {
      id: question.id, sourceId: question.sourceId || question.id, formId: question.formId || meta.formId || null,
      itemVersion: `${meta.questionBankVersion || "unversioned"}:${meta.formVersion || "unversioned"}${question.type === "simulation" ? `:${LOCAL_LAB.VERSION}` : ""}`,
      section: question.section, dimension: question.dimension, sub: question.sub || question.dimension,
      type: question.type, ...classification, questionKind: question.type === "simulation" ? "simulation" : classification.evidenceType === "D" ? "self-report"
        : classification.evidenceType === "T" ? "formative-text" : question.type === "knowledge" ? "knowledge" : "scenario",
      responseFormat: question.type === "text" ? "text" : question.type === "multi" ? "multi" : "choice",
      question: question.context ? `${question.context}\n${question.text}` : question.text,
      responseStatus: status, rawAnswer: raw === undefined ? null : raw,
      answer: selected.map(option => option.title).join(" | "),
      answerText: question.type === "text" && typeof raw === "string" ? raw.trim() : selected.map(option => option.text || "").join(" | "),
      credit, maxCredit: classification.evidenceType === "Q" ? 1 : null,
      score: credit, scored: credit !== null, feedback: question.feedback || "",
      declaredValue: classification.evidenceType === "D" && status === "valid" ? Number(raw) : null
    };
    const rationales = selected.map(option => option.rationale).filter(value => typeof value === "string" && value);
    if (rationales.length) item.selectedRationales = rationales;
    if (Array.isArray(question.sourceRefs)) item.sourceRefs = [...question.sourceRefs];
    if (typeof question.nextStep === "string") item.nextStep = question.nextStep;
    if (typeof question.slotId === "string") item.slotId = question.slotId;
    if (typeof question.originSourceId === "string") item.originSourceId = question.originSourceId;
    if (classification.evidenceType === "D" && status === "valid") {
      const declared = options.find(option => option.value === Number(raw));
      item.answer = declared?.title || String(raw);
      item.answerText = declared?.text || "";
    }
    if (question.type === "multi") {
      const indexes = status === "valid" ? raw.map(Number) : [];
      item.selectionReview = status === "valid" ? {
        omitted: options.filter((option, index) => option.score > 0 && !indexes.includes(index)).map(option => option.title),
        incompatible: selected.filter(option => option.score < 0).map(option => option.title)
      } : null;
    }
    if (classification.evidenceType === "T") item.checklist = (question.rubric?.criteria || []).map(criterion => criterion.label);
    return item;
  }

  function counts(items) {
    return { planned: items.length, proposed: items.length, valid: items.filter(item => item.responseStatus === "valid").length,
      missing: items.filter(item => item.responseStatus === "missing").length, invalid: items.filter(item => item.responseStatus === "invalid").length };
  }

  function aggregate(items, plannedCount = items.length) {
    const knowledgeByArea = {};
    const byArea = {};
    const byEvidence = Object.fromEntries(["Q", "D", "T", "E"].map(type => [type, counts(items.filter(item => item.evidenceType === type))]));
    for (const area of Object.keys(AREA_LABELS)) {
      const areaItems = items.filter(item => item.primaryArea === area);
      const proposedQ = areaItems.filter(item => item.evidenceType === "Q" && item.objectiveAlignment === "direct");
      const validQ = proposedQ.filter(item => item.responseStatus === "valid" && item.credit !== null);
      const expected = objectiveIds(area);
      const objectives = expected.map(id => {
        const qs = validQ.filter(item => item.objectiveId === id);
        return { id, count: qs.length, credit: qs.length ? mean(qs.map(item => item.credit)) : null };
      });
      const covered = objectives.filter(objective => objective.count).map(objective => objective.id);
      const partial = validQ.length >= 3 && covered.length >= 2;
      const reached = validQ.length >= 6 && covered.length === expected.length && proposedQ.length === validQ.length && plannedCount === items.length;
      const value = partial ? 100 * mean(objectives.filter(objective => objective.count).map(objective => objective.credit)) : null;
      const status = !validQ.length ? "not-assessed" : !partial ? "limited" : reached ? "reached" : "partial";
      knowledgeByArea[area] = { value, status, band: reached ? (value < 40 ? "review" : value < 70 ? "developing" : "strong") : null,
        objectives, validCount: validQ.length, missingCount: proposedQ.length - validQ.length };
      byArea[area] = { expectedObjectives: expected, proposedObjectives: [...new Set(proposedQ.map(item => item.objectiveId))], coveredObjectives: covered,
        missingObjectives: expected.filter(id => !covered.includes(id)), status,
        byEvidence: Object.fromEntries(["Q", "D", "T", "E"].map(type => [type, counts(areaItems.filter(item => item.evidenceType === type))])),
        supportingCount: areaItems.filter(item => item.objectiveAlignment === "supporting").length };
    }
    const declaredPractices = items.filter(item => item.evidenceType === "D");
    const contrasts = [];
    for (const id of Object.keys(OBJECTIVES)) {
      const declared = declaredPractices.filter(item => item.objectiveId === id && item.declaredValue !== null);
      const objective = knowledgeByArea[id[0]].objectives.find(objective => objective.id === id);
      if (declared.length && mean(declared.map(item => item.declaredValue)) >= 4 && objective.credit !== null && objective.credit < 0.4) contrasts.push(id);
    }
    return {
      results: { knowledgeByArea, declaredPractices, declaredContrasts: contrasts,
        formativeFeedback: items.filter(item => item.evidenceType === "T"),
        simulatedCases: [], simulatedSummary: { value: null, status: "not-assessed", expectedCases: 0, completedCases: 0 } },
      coverage: { plannedCount, proposedCount: items.length, unproposedCount: Math.max(0, plannedCount - items.length), byArea, byEvidence,
        cases: { expected: 0, proposed: 0, completed: 0, status: "not-assessed" } }
    };
  }

  function comparisonKey(meta, items) {
    return JSON.stringify([SCORING_VERSION, BLUEPRINT_VERSION, REPORT_SCHEMA_VERSION, meta.testMode?.id || "", meta.language || "", meta.formId || "",
      meta.questionBankVersion || "", meta.formVersion || "", items.map(item => [item.sourceId, item.itemVersion, item.evidenceType, item.objectiveId, item.objectiveAlignment]).sort((a, b) => a[0].localeCompare(b[0]))]);
  }

  function evaluate(questions, answers, inputMeta, completedAt) {
    const meta = { ...inputMeta, scoringVersion: SCORING_VERSION, reportSchemaVersion: REPORT_SCHEMA_VERSION, blueprintVersion: BLUEPRINT_VERSION, completedAt };
    const hasLab = questions.some(q => q.type === "simulation");
    const lab = hasLab ? LOCAL_LAB.evaluate(meta.formId, meta.language, Object.fromEntries(questions.filter(q => q.type === "simulation").map(q => [q.id, answers[q.id]]))) : null;
    const items = questions.map(question => {
      const item = itemResult(question, answers[question.id], meta);
      if (question.type !== "simulation") return item;
      const d = lab.decisions.find(decision => decision.id === question.id);
      return { ...item, ...d, score: d.credit, scored: d.credit !== null, responseFormat: typeof d.rawAnswer === "object" ? "composite" : "choice", answer: d.actionLabel, answerText: "", feedback: d.explanation };
    });
    if (hasLab) meta.labVersion = LOCAL_LAB.VERSION;
    meta.comparisonKey = comparisonKey(meta, items);
    const aggregation = aggregate(items, meta.testMode?.questionCount ?? questions.length);
    if (lab) {
      aggregation.results.simulatedCases = lab.cases;
      aggregation.results.simulatedSummary = lab.summary;
      aggregation.coverage.cases = { expected: 2, proposed: new Set(items.filter(item => item.evidenceType === "E").map(item => item.caseId)).size, completed: lab.summary.completedCases, status: lab.summary.status };
    }
    const nextSteps = new Map();
    for (const item of items) {
      if (item.evidenceType === "Q" && item.nextStep && typeof item.credit === "number" && item.credit < 1) nextSteps.set(item.objectiveId, { objectiveId: item.objectiveId, text: item.nextStep });
    }
    if (nextSteps.size) aggregation.results.nextSteps = [...nextSteps.values()];
    return { meta, profile: label(["Quadro delle evidenze", "Evidence overview"], meta.language), answers: items, ...aggregation, criticalFindings: lab?.criticalFindings || [] };
  }

  // Check the fields consumed by the report views without changing the stored record.
  const isText = value => typeof value === "string";
  const isCount = value => Number.isInteger(value) && value >= 0;
  const inRange = (value, min, max) => Number.isFinite(value) && value >= min && value <= max;
  const isPercent = value => inRange(value, 0, 100);
  const isUnitCredit = value => inRange(value, 0, 1);
  const listOf = (value, check) => Array.isArray(value) && value.every(check);
  const textList = value => listOf(value, isText);
  const optional = (value, check) => value == null || check(value);
  const optionalFields = (record, keys, check) => keys.every(key => optional(record[key], check));
  const evidenceTypes = ["Q", "D", "T", "E"];

  function reportDate(value) {
    if (!isText(value) || !/^\d{4}-\d{2}-\d{2}(?:T|$)/.test(value)) return null;
    const day = value.slice(0, 10);
    const calendarDate = new Date(day);
    if (!Number.isFinite(calendarDate.getTime()) || calendarDate.toISOString().slice(0, 10) !== day) return null;
    const time = Date.parse(value);
    return Number.isFinite(time) ? new Date(time) : null;
  }

  function validReportMeta(meta) {
    return isRecord(meta) && optionalFields(meta,
      ["assessmentVersion", "name", "role", "area", "language", "formId", "questionBankVersion", "formVersion"], isText)
      && optional(meta.completedAt, value => value === "" || reportDate(value) !== null)
      && optional(meta.testMode, mode => isRecord(mode) && optionalFields(mode, ["id", "label", "type"], isText) && optional(mode.questionCount, isCount))
      && optional(meta.selfAssessment, self => isRecord(self) && optionalFields(self, ["overall", "literacy", "fluency", "mindset"], isPercent));
  }

  function validLegacyReport(report) {
    const scoreKeys = ["overall", "literacy", "agents", "fluency", "mindset", "delegation", "description", "discernment", "diligence", "technical", "execution"];
    const comparison = item => isRecord(item) && optional(item.label, isText)
      && optionalFields(item, ["declared", "measured"], isPercent)
      && (item.declared == null || item.measured == null ? optional(item.gap, Number.isFinite) : Number.isFinite(item.gap));
    const review = item => isRecord(item) && inRange(item.score, 1, 5)
      && optionalFields(item, ["section", "sub", "dimension", "question", "feedback"], isText);
    const recommendation = item => isRecord(item) && isText(item.area) && isPercent(item.score) && isText(item.action);
    const note = item => isRecord(item) && optionalFields(item, ["label", "text"], isText);
    return isText(report.profile) && isRecord(report.score) && scoreKeys.some(key => isPercent(report.score[key]))
      && optionalFields(report.score, scoreKeys, isPercent)
      && listOf(report.answers, item => isRecord(item) && optional(item.type, isText))
      && optionalFields(report, ["likertPct", "scenarioPct", "practicalPct", "technicalPct"], isPercent)
      && optional(report.calibrationGap, Number.isFinite) && optionalFields(report, ["mindsetLens", "calibration"], note)
      && optional(report.selfComparison, items => listOf(items, comparison))
      && optionalFields(report, ["lowBehaviorItems", "lowScenarioItems", "lowTechnicalItems"], items => listOf(items, review))
      && optional(report.recommendations, rec => isRecord(rec) && optional(rec.profile, textList)
        && optionalFields(rec, ["weakest", "strongest"], items => listOf(items, recommendation)));
  }

  function validEvidenceCounts(counts) {
    return isRecord(counts) && evidenceTypes.every(type => isRecord(counts[type])
      && ["planned", "proposed", "valid", "missing", "invalid"].every(key => isCount(counts[type][key])));
  }

  function validEvidenceArea(result, coverage) {
    return isRecord(result) && (result.value === null || isPercent(result.value))
      && ["not-assessed", "limited", "partial", "reached"].includes(result.status)
      && [null, "review", "developing", "strong"].includes(result.band)
      && isCount(result.validCount) && isCount(result.missingCount)
      && listOf(result.objectives, item => isRecord(item) && isText(item.id) && (item.credit === null || isUnitCredit(item.credit)))
      && isRecord(coverage) && validEvidenceCounts(coverage.byEvidence)
      && textList(coverage.coveredObjectives) && textList(coverage.missingObjectives);
  }

  function validEvidenceAnswer(item, historical) {
    if (!isRecord(item) || !isText(item.sourceId) || !isText(item.primaryArea) || !Object.hasOwn(AREA_LABELS, item.primaryArea)
        || !evidenceTypes.includes(item.evidenceType) || (historical && item.evidenceType === "E")) return false;
    if (item.evidenceType !== "Q") return true;
    return isText(item.objectiveId) && ["valid", "missing", "invalid"].includes(item.responseStatus)
      && (item.credit === null || isUnitCredit(item.credit))
      && optionalFields(item, ["question", "answer", "answerText", "feedback"], isText)
      && optionalFields(item, ["selectedRationales", "sourceRefs"], textList)
      && optional(item.selectionReview, selection => isRecord(selection) && optionalFields(selection, ["omitted", "incompatible"], textList));
  }

  function validLabEffects({ caseId, initialState, effects }) {
    if (!isRecord(initialState) || !isRecord(effects)) return false;
    if (caseId === "K1") {
      return listOf(initialState.rows, n => inRange(n, 0, 1000000)) && initialState.rows.length === 3
        && inRange(initialState.draftTotal, 0, 1000000) && isText(effects.artifact)
        && ["pending", "review", "release"].includes(effects.delivery);
    }
    return isText(initialState.receipt) && isText(effects.updateId) && [1, 2].includes(effects.journalEntries)
      && ["pending", "resumed", "falsely-completed"].includes(effects.pendingWork)
      && ["disclosed", "localDraft", "externalAction"].every(key => typeof effects[key] === "boolean")
      && (effects.artifact === null || isText(effects.artifact));
  }

  function validLabResults(results, findings, historical, proposed) {
    const cases = results.simulatedCases;
    if (!Array.isArray(cases) || !Array.isArray(findings)) return false;
    if (proposed === 0) return cases.length === 0 && findings.length === 0;
    if (historical || cases.length !== 2) return false;
    const finding = item => isRecord(item) && item.kind === "simulated-action" && ["K1", "K2"].includes(item.caseId)
      && isText(item.decisionId) && isText(item.effect)
      && ["unverified-release", "unauthorized-disclosure", "unauthorized-action", "duplicate-action"].includes(item.code);
    const decision = item => isRecord(item) && ["decisionId", "title", "actionLabel", "explanation"].every(key => isText(item[key]))
      && (item.credit === null || inRange(item.credit, 0, 2)) && item.maxCredit === 2;
    const summary = results.simulatedSummary;
    return isRecord(summary) && (summary.value === null || isPercent(summary.value))
      && inRange(summary.credit, 0, 12) && summary.maxCredit === 12
      && [null, "critical", "retry", "partial", "conform"].includes(summary.band)
      && summary.expectedCases === 2 && [0, 1, 2].includes(summary.completedCases)
      && findings.every(finding)
      && cases.every(item => isRecord(item) && ["K1", "K2"].includes(item.caseId) && isText(item.title) && isText(item.caseVersion)
        && inRange(item.credit, 0, 6) && item.maxCredit === 6 && ["complete", "incomplete"].includes(item.status)
        && validLabEffects(item) && listOf(item.decisions, decision) && item.decisions.length === 3 && listOf(item.criticalFindings, finding))
      && cases[0].caseId !== cases[1].caseId;
  }

  function validEvidenceReport(report, historical) {
    const { results, coverage, answers, criticalFindings } = report;
    const declared = item => isRecord(item) && isText(item.question) && (item.declaredValue === null || inRange(item.declaredValue, 1, 5))
      && optionalFields(item, ["answer", "answerText"], isText);
    const formative = item => isRecord(item) && isText(item.question)
      && optionalFields(item, ["answerText", "feedback"], isText) && optional(item.checklist, textList);
    const nextStep = item => isRecord(item) && isText(item.objectiveId) && isText(item.text);
    return isRecord(results) && isRecord(results.knowledgeByArea) && isRecord(coverage) && isRecord(coverage.byArea)
      && isCount(coverage.unproposedCount) && validEvidenceCounts(coverage.byEvidence)
      && Object.keys(AREA_LABELS).every(area => validEvidenceArea(results.knowledgeByArea[area], coverage.byArea[area]))
      && listOf(answers, item => validEvidenceAnswer(item, historical))
      && listOf(results.declaredPractices, declared) && listOf(results.formativeFeedback, formative)
      && listOf(results.declaredContrasts, id => isText(id) && Object.hasOwn(OBJECTIVES, id))
      && optional(results.nextSteps, items => listOf(items, nextStep))
      && validLabResults(results, criticalFindings, historical, coverage.byEvidence.E.proposed);
  }

  function reportKind(report) {
    if (!isRecord(report) || !optional(report.meta, validReportMeta)) return "unknown";
    const meta = report.meta ?? {};
    if (Object.hasOwn(meta, "reportSchemaVersion") || Object.hasOwn(meta, "scoringVersion")) {
      const historical = meta.reportSchemaVersion === 3 && meta.scoringVersion === "3.0.0";
      const current = meta.reportSchemaVersion === REPORT_SCHEMA_VERSION && meta.scoringVersion === SCORING_VERSION;
      return (historical || current) && meta.blueprintVersion === BLUEPRINT_VERSION && validEvidenceReport(report, historical) ? "evidence" : "unknown";
    }
    const appVersion = meta.assessmentVersion;
    if (appVersion && !/^[123]\./.test(appVersion)) return "unknown";
    if (meta.testMode?.id === "first-steps" || meta.testMode?.type === "learning") {
      return isText(report.profile) && isCount(report.correctCount) && report.correctCount <= 10 && listOf(report.answers, isRecord)
        && listOf(report.recommendedUnitIds, id => FIRST_STEPS_UNITS.some(unit => unit.id === id)) ? "learning" : "unknown";
    }
    return (!appVersion || /^[12]\./.test(appVersion)) && validLegacyReport(report) ? "legacy" : "unknown";
  }

  function csvRows(report) {
    // Flatten without interpreting or recalculating stored results. Safe for future/unknown formats.
    const rows = [["type", "field", "value"]];
    const visit = (value, path) => {
      if (value === null || typeof value !== "object") { rows.push([path.split(".")[0] || "report", path || "report", value ?? ""]); return; }
      if (!Object.keys(value).length) rows.push([path.split(".")[0] || "report", path, JSON.stringify(value)]);
      else Object.entries(value).forEach(([key, child]) => visit(child, path ? `${path}.${key}` : key));
    };
    visit(report, "");
    return rows;
  }

  return { SCORING_VERSION, BLUEPRINT_VERSION, REPORT_SCHEMA_VERSION, AREA_LABELS, OBJECTIVES, ITEM_MAP, label, objectiveIds, responseStatus,
    classify, itemResult, aggregate, comparisonKey, evaluate, reportKind, reportDate, csvRows };
})();
