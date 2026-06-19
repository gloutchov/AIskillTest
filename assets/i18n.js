const LANGUAGE_STORAGE_KEY = "aiSkillAssessmentLanguage";
const SUPPORTED_LANGUAGES = ["it", "en"];

const AI_SKILL_I18N = {
  it: {
    name: "Italiano"
  },
  en: {
    name: "English",
    sectionLabels: {
      "Literacy": "Literacy",
      "Fondamenti tecnici LLM": "LLM technical foundations",
      "AI Agents": "AI Agents",
      "Fluency · Delegation": "Fluency · Delegation",
      "Fluency · Description": "Fluency · Description",
      "Fluency · Discernment": "Fluency · Discernment",
      "Fluency · Diligence": "Fluency · Diligence",
      "Mindset": "Mindset",
      "Practical Lab": "Practical Lab"
    },
    likertOptions: [
      ["I do not recognize this behavior in how I work", "I would not know how to apply it without guidance, or I do not consider it part of my approach."],
      ["I recognize it mostly when I follow external support", "I can proceed using examples, templates, or prepared guidance."],
      ["I apply it independently in ordinary cases", "I can do it, but the method is not always stable, explicit, or transferable."],
      ["It is part of my working method", "I apply it with repeatable criteria, checks, and steps."],
      ["I turn it into a reusable and shareable practice", "I evaluate outcomes, define standards, and can support others in applying it."]
    ],
    modes: {
      complete: {
        label: "Full test",
        shortLabel: "Full",
        description: "All 50 questions: Literacy, technical foundations, AI Agents, Fluency 4D, Mindset, and practical tasks.",
        outputNote: "Complete profile with AI Skill index, Literacy x Fluency quadrant, and competency radar."
      },
      literacy: {
        label: "Literacy",
        shortLabel: "Literacy",
        description: "Understanding of how GenAI works, its limits, data, sources, privacy, and reliability.",
        outputNote: "Thematic Literacy report, without a global profile."
      },
      technical: {
        label: "LLM technical foundations",
        shortLabel: "Technical",
        description: "Tokens, context, inference, neural networks, Transformers, hallucinations, RAG, embeddings, and citations.",
        outputNote: "Thematic report on technical foundations, without a global profile."
      },
      delegation: {
        label: "Fluency - Delegation",
        shortLabel: "Delegation",
        description: "Choosing delegable tasks, decomposing work, and preserving human responsibility.",
        outputNote: "Thematic Delegation report, without a global profile."
      },
      agents: {
        label: "AI Agents",
        shortLabel: "Agents",
        description: "AI agents, tools, permissions, memory, human control, logs, and operational workflows.",
        outputNote: "Thematic report on AI Agents, without a global profile."
      },
      description: {
        label: "Fluency - Description",
        shortLabel: "Description",
        description: "Brief quality: objectives, constraints, context, format, and quality criteria.",
        outputNote: "Thematic Description report, without a global profile."
      },
      discernment: {
        label: "Fluency - Discernment",
        shortLabel: "Discernment",
        description: "Critical evaluation of outputs, data, sources, usefulness, and risks before use.",
        outputNote: "Thematic Discernment report, without a global profile."
      },
      diligence: {
        label: "Fluency - Diligence",
        shortLabel: "Diligence",
        description: "Responsible, transparent, and proportionate use of GenAI in real work.",
        outputNote: "Thematic Diligence report, without a global profile."
      },
      mindset: {
        label: "Mindset",
        shortLabel: "Mindset",
        description: "Attitude, calibrated trust, experimentation, and willingness to change workflows.",
        outputNote: "Thematic Mindset report, without a global profile."
      },
      practical: {
        label: "Practical Lab",
        shortLabel: "Practical Lab",
        description: "Operational mini-tasks, prompts, checklists, and controls applied to concrete cases.",
        outputNote: "Thematic report on practical tasks, without a global profile."
      }
    },
    formOverrides: {
      B: {
        AG1: {
          text: "I recognize when a flow only needs chat, when automation is enough, and when it needs an agent with tools, state, and control criteria.",
          hint: "Assess whether you distinguish text response, information retrieval, and governed action."
        },
        AG2: {
          text: "An agent must complete a task with multiple steps and possible exceptions. What makes it different from a single prompt?",
          hint: "Choose the characteristic most tied to operational behavior.",
          options: [
            ["It produces more creative text", "Creativity does not define an agent."],
            ["It maintains state, uses tools, and moves toward a goal", "An agentic workflow combines instructions, context, tools, and progress rules."],
            ["It does not need instructions", "More autonomy requires clearer instructions and limits."],
            ["It always knows updated information", "Freshness depends on available tools and sources."]
          ],
          feedback: "An agent is useful when it must orchestrate steps and tools under explicit constraints, not when you only need a longer answer."
        },
        AG3: {
          text: "You want to introduce an agent that triages supplier requests and proposes operational replies. What is the strongest first step?",
          hint: "Assess delegability, data, and responsibility.",
          options: [
            ["Let it reply directly to suppliers", "External impact is transferred without control."],
            ["Write a very detailed prompt", "The prompt is not enough if tools, logs, and limits are missing."],
            ["Use it only on the simplest requests", "This reduces risk but does not define the operating model."],
            ["Map request types, data, systems, and excluded cases", "This builds the perimeter before autonomy."],
            ["Define permissions, approvals, metrics, logs, and fallback", "This establishes progressive autonomy and human control."]
          ],
          feedback: "Agent design starts from scope, tools, authorization, stop criteria, and responsibility."
        },
        AG4: {
          text: "You want to connect an agent to invoices and an ERP system to propose master-data updates. Which constraints do you impose?",
          hint: "Select controls on access, data, and changes.",
          options: [
            ["Read-only access where possible", "This reduces the impact of errors."],
            ["Human approval before writing to the ERP", "Changes to core systems remain controlled."],
            ["Logs of documents read, proposed fields, and rationale", "This makes behavior reconstructable."],
            ["Blocking rules for ambiguous or inconsistent data", "This avoids updates on unreliable cases."],
            ["Testing in an environment or controlled sample", "This lets you observe errors before production."],
            ["Admin permissions for simplicity", "This unnecessarily increases operational risk."],
            ["Automatic updates without logs", "This removes traceability and control."]
          ],
          feedback: "An agent connected to management systems needs least privilege, approvals, logs, stop conditions, and controlled testing."
        },
        P_DS_1: {
          text: "Write the prompt you would use to ask AI to design a data-analysis dashboard from a CSV export with undocumented fields and some missing rows. You do not want it to invent KPIs, values, or interpretations.",
          hint: "Write the prompt you would actually use to get a controllable dashboard.",
          feedback: "The prompt should define the objective, available data, allowed KPIs, visualizations, handling of gaps, and dataset quality checks.",
          rubric: {
            criteria: [
              { label: "Dashboard objective", points: 1, keywords: ["dashboard", "analysis", "objective", "goal", "decision", "monitor"] },
              { label: "Dataset and fields", points: 1, keywords: ["csv", "data", "dataset", "fields", "columns", "rows"] },
              { label: "Do not invent KPIs or values", points: 1, keywords: ["do not invent", "don't invent", "do not assume", "kpi", "values", "missing"] },
              { label: "Visualizations and format", points: 1, keywords: ["charts", "visualizations", "layout", "table", "format"] },
              { label: "Gaps and clarifications", points: 1, keywords: ["missing", "incomplete", "ambiguous", "clarify", "questions", "flag"] },
              { label: "Final verification", points: 1, keywords: ["verify", "check", "quality", "review", "validation"] }
            ],
            redFlags: [
              { label: "blind delegation", points: 1, keywords: ["you decide", "choose the kpis", "without asking", "final version"] },
              { label: "invented data", points: 1, keywords: ["invent data", "estimate freely", "fill in the values"] }
            ]
          }
        },
        P_DI_1: {
          text: "A deep search result cites three sources to support the claim that 'GenAI reduces onboarding time by 35%'. One source is not accessible and two appear to repeat the same press release. Write the checks you would perform before using the conclusion.",
          hint: "List the real checks on sources, independence, and relevance.",
          feedback: "Deep search does not remove the need for verification: check accessibility, primary source, independence, relevance, and the limits of the conclusion.",
          rubric: {
            criteria: [
              { label: "Source accessibility", points: 1, keywords: ["source", "link", "accessible", "open", "publication"] },
              { label: "Primary source", points: 1, keywords: ["primary", "original", "study", "report", "author"] },
              { label: "Date and context", points: 1, keywords: ["date", "version", "context", "sector", "onboarding"] },
              { label: "Source independence", points: 1, keywords: ["independent", "same press release", "repeat", "cross-check", "compare"] },
              { label: "Claim relevance", points: 1, keywords: ["35", "metric", "sample", "definition", "support"] },
              { label: "Prudent use and citation", points: 1, keywords: ["do not use", "remove", "caution", "cite", "note", "trace"] }
            ],
            redFlags: [
              { label: "trust in precision", points: 1, keywords: ["35% so", "precise figure", "looks credible"] },
              { label: "model confirmation", points: 1, keywords: ["ask ai", "ask the model if", "are you sure"] }
            ]
          }
        }
      },
      C: {
        AG1: {
          text: "I can distinguish an assistant that answers, a RAG system that retrieves sources, and an agent that can choose steps, use tools, and maintain state.",
          hint: "Consider architecture, autonomy, and control, not the commercial name of the tool."
        },
        AG2: {
          text: "Which description best represents an agentic workflow?",
          hint: "Choose the most complete option operationally.",
          options: [
            ["A chat with a more assertive tone", "Tone does not change the nature of the system."],
            ["A cycle of planning, tool use, observation, and control", "The agent progresses using tools, state, and defined criteria."],
            ["A model that is always connected to the web", "Connection to external sources is only one possible tool."],
            ["A system that always decides without people", "Agents can and often should include human approvals."]
          ],
          feedback: "An agentic workflow is not a more powerful chat: it is a governed process connecting model, tools, state, and supervision."
        },
        AG3: {
          text: "An agent should prepare project status reports and open tasks when it detects blockers. Where do you start?",
          hint: "Assess data, actions, and approval points.",
          options: [
            ["Ask it for complete daily reports", "You produce output but do not govern actions and sources."],
            ["Allow it to create tasks freely", "It opens operational actions without criteria."],
            ["Limit it to less critical projects", "This reduces impact but remains weakly designed."],
            ["Define sources, blocker signals, and reviewers", "This connects inputs, criteria, and human control."],
            ["Design a workflow with thresholds, drafts, approvals, logs, and rollback", "This makes autonomy progressive and verifiable."]
          ],
          feedback: "Agents that open tasks or modify workflows need thresholds, approvals, observability, and recovery paths."
        },
        AG4: {
          text: "You want to use an agent to read HR tickets and propose updates to the internal knowledge base. Which controls do you impose?",
          hint: "Select measures that protect data, responsibility, and quality.",
          options: [
            ["Minimization and masking of personal data", "This reduces exposure of sensitive content."],
            ["Proposals only, with approved publication", "The agent does not change official content by itself."],
            ["A record of sources, tickets, and suggested changes", "This makes the proposal verifiable."],
            ["Escalation for personal or disciplinary cases", "Sensitive cases remain outside automation."],
            ["Periodic checking of errors and bias", "This measures quality and impact over time."],
            ["Full access to personal files", "This exposes data that is not needed for the task."],
            ["Automatic publication of changes", "This turns suggestions into official content without review."]
          ],
          feedback: "An agent on HR data requires minimization, approval, traceability, escalation, and effect monitoring."
        },
        P_DS_1: {
          text: "Write the prompt you would use to create a draft decision document from a brief, scattered notes, and partial attachments. You want to distinguish facts, assumptions, decisions already made, and points to confirm.",
          hint: "Write the prompt you would actually use to get a document that can be reviewed.",
          feedback: "The prompt should produce a useful but reviewable document, separating available inputs, facts, assumptions, decisions, and points to confirm.",
          rubric: {
            criteria: [
              { label: "Objective and document", points: 1, keywords: ["document", "draft", "decision", "objective", "audience", "stakeholders"] },
              { label: "Available input", points: 1, keywords: ["notes", "brief", "attachments", "material", "sources"] },
              { label: "Facts versus assumptions", points: 1, keywords: ["facts", "assumptions", "uncertain", "decisions", "do not invent", "to confirm"] },
              { label: "Format and structure", points: 1, keywords: ["format", "structure", "sections", "executive summary", "table"] },
              { label: "Clarifications and gaps", points: 1, keywords: ["questions", "clarify", "missing", "ambiguous", "assumptions"] },
              { label: "Review", points: 1, keywords: ["verify", "check", "review", "consistency", "approval"] }
            ],
            redFlags: [
              { label: "artificial certainty", points: 1, keywords: ["make it certain", "present as fact", "hide doubts", "invent"] },
              { label: "automatic publication", points: 1, keywords: ["publish directly", "send without review", "final version"] }
            ]
          }
        },
        P_DI_1: {
          text: "AI generates a mini-dashboard and concludes: 'sales grew by 18% thanks to the new campaign', but it does not show queries, filters, comparison period, or excluded data. Write the checks you would perform before presenting the dashboard.",
          hint: "Describe the real verification process for data, metrics, and interpretation.",
          feedback: "A dashboard must be checked for data origin, queries, filters, metric definition, comparison period, and causal interpretation before presentation.",
          rubric: {
            criteria: [
              { label: "Data origin and query", points: 1, keywords: ["data", "query", "origin", "source", "dataset"] },
              { label: "Filters and scope", points: 1, keywords: ["filters", "scope", "excluded", "segments", "sample"] },
              { label: "Metric definition", points: 1, keywords: ["sales", "definition", "measure", "18", "metric"] },
              { label: "Period and baseline", points: 1, keywords: ["period", "comparison", "baseline", "before", "after"] },
              { label: "Causality and alternatives", points: 1, keywords: ["cause", "correlation", "factors", "selection", "confounding"] },
              { label: "Prudent use", points: 1, keywords: ["do not use", "remove", "caution", "cite", "note", "verify"] }
            ],
            redFlags: [
              { label: "accepting the number", points: 1, keywords: ["18% is precise", "looks realistic", "put it in"] },
              { label: "self-confirmation", points: 1, keywords: ["ask ai", "are you sure", "ask the model to confirm"] }
            ]
          }
        }
      }
    },
    questions: {
      L1: ["I can explain in simple terms how a language model generates an answer and why it can be wrong.", "You do not need a researcher-level technical explanation: what matters is understanding the principle and the general limits."],
      L2: ["I distinguish between training data, conversation context, uploaded documents, memory, and external sources.", "This distinction matters because it affects reliability, freshness, and verifiability of the output."],
      L3: ["I know the concept of hallucination and use checks before assuming that an output is correct.", "A plausible answer is not automatically a verified answer."],
      L4: ["I understand when web search, RAG, document bases, or company sources are needed instead of just chatting with a model.", "This item measures whether you can choose the right way to provide context to the tool."],
      L5: ["I know the basic implications of privacy, intellectual property, and confidential data when using AI tools.", "What matters is risk awareness, even if you are not a legal or compliance specialist."],
      L8: ["I can distinguish between an output that is useful as a draft and content that is verified enough to be used in a work document.", "This item measures the difference between operational usefulness and final reliability."],
      L9: ["When I use AI tools, I consider the risk that instructions, files, or examples in the prompt may improperly influence the answer.", "What matters is awareness of context, prompt injection, and input quality."],
      L10: ["I can explain why a model may produce different answers to similar requests and why this is not automatically an error.", "This assesses understanding of the probabilistic and contextual nature of generation."],
      F_DE_1: ["Before using AI, I choose which parts of the work to delegate and which must remain under human control.", "Good delegation also means deciding what not to delegate."],
      F_DE_2: ["I break complex activities into reliable steps to assign, verify, or have AI rework.", "Work decomposition reduces invisible errors and makes the result more controllable."],
      F_DE_4: ["Before using AI, I clarify which decision remains mine and which part can only be supported by the tool.", "Mature delegation keeps responsibility and human control."],
      F_DE_5: ["I can separate exploratory, analytical, creative, and decision-making activities when designing an AI workflow.", "Not every step has the same level of delegability."],
      F_DE_6: ["When I assign a task to AI, I define acceptance criteria before looking at the output.", "Quality should be designed upfront, not only judged afterward."],
      F_DE_7: ["I use AI to generate alternatives, but I compare risks, constraints, and consequences of the final choice myself.", "Generating options is not the same as delegating the choice."],
      F_DE_8: ["I recognize when an activity requires access to context, relationships, or responsibility that AI does not have.", "Some tasks look textual but depend on organizational responsibility."],
      F_DE_9: ["I break complex tasks into short, verifiable, correctable steps instead of asking for a final result in a single prompt.", "Effective delegation reduces opacity and increases control."],
      F_DE_10: ["I consciously decide when not to use AI because the verification cost would exceed the benefit.", "Competence also includes not delegating."],
      F_DS_1: ["I write requests that include objective, context, constraints, audience, expected format, and quality criteria.", "The quality of the description directly affects the quality of delegated work."],
      F_DS_2: ["I iterate with AI: I ask clarifying questions, provide examples, correct assumptions, and narrow the scope.", "Competence does not end with the first prompt."],
      F_DS_4: ["In prompts, I include audience, objective, constraints, and expected level of detail.", "Effective description reduces ambiguity about the result."],
      F_DS_5: ["When I do not have enough information, I ask AI to ask me questions before producing the output.", "Surfacing gaps is often better than forcing an answer."],
      F_DS_6: ["I specify the output format when I need to compare, copy, or reuse the result.", "Format and structure are part of the brief, not cosmetic details."],
      F_DS_7: ["I use examples of strong and weak outputs to clarify the required standard.", "Examples help the model understand implicit criteria."],
      F_DS_8: ["I make explicit which assumptions AI may make and which it must flag as uncertain.", "Unstated assumptions are a frequent source of fragile outputs."],
      F_DS_9: ["When the first output is poor, I adjust the brief deliberately instead of repeating the same request.", "Iteration is not just asking the model to try again."],
      F_DI_1: ["I evaluate outputs with specific criteria before using them in a document, decision, or communication.", "Discernment is the ability to separate what is useful from what must be corrected or discarded."],
      F_DI_2: ["I verify claims, numbers, citations, or high-impact decisions with independent sources or checks.", "Verification should be proportionate to the risk and impact of the content."],
      F_DI_4: ["I assess whether an AI output really answers the question or is merely plausible and well written.", "Form can hide content gaps."],
      F_DI_5: ["I check citations, numbers, and proper names before reusing them in professional contexts.", "Precise details are often the ones that need the most verification."],
      F_DI_6: ["I compare multiple alternatives generated by AI instead of automatically accepting the first answer.", "Comparison helps reveal omissions and bias."],
      F_DI_7: ["I can recognize when an output is out of scope compared with the data provided or the available sources.", "A model may fill gaps with plausible content."],
      F_DI_8: ["I use explicit criteria to decide whether to accept, correct, regenerate, or discard an output.", "Mature review has thresholds and criteria."],
      F_DI_9: ["I distinguish factual error, incompleteness, unsuitable tone, and weak reasoning when evaluating an answer.", "Different problems require different corrections."],
      F_DG_1: ["I take final responsibility for what I produce with AI, even when the tool contributes substantially.", "Responsibility is not transferred to the model."],
      F_DG_2: ["I disclose or document AI use when relevant for transparency, audit, compliance, or recipient trust.", "Transparency depends on context: it is not always identical, but it must be governed."],
      F_DG_4: ["Before using data with AI, I check whether it belongs to confidential, personal, or regulated categories.", "Responsibility starts with data classification."],
      F_DG_5: ["I avoid using personal accounts or unapproved tools to process company information.", "Tool convenience is not enough to make it appropriate."],
      F_DG_6: ["When AI contributes substantially to content, I assess whether to disclose it to the recipient.", "Transparency depends on context, expectations, and impact."],
      F_DG_7: ["I keep track of sources and steps used when AI results may influence important decisions or documents.", "Traceability and auditability are part of responsible use."],
      F_DG_8: ["I use synthetic, minimized, or anonymized data when real data is not necessary for the task.", "The best data to protect is data that is not shared."],
      F_DG_9: ["I recognize when an AI output may have reputational, legal, or discriminatory impacts and requires extra review.", "The level of control should increase with risk."],
      F_DG_10: ["I do not use AI to bypass policies, controls, or responsibilities of my role.", "Diligence also means respecting the organizational boundary."],
      M1: ["I see AI as an amplifier that requires human judgment, not an automatic replacement for thinking.", "Maturity is neither blind enthusiasm nor automatic rejection."],
      M2: ["I feel comfortable experimenting with AI on low-risk activities with clear objectives.", "Willingness to run controlled experiments is an important adoption indicator."],
      M3: ["When an output is wrong, I try to understand whether the issue comes from the prompt, context, data, or tool limits.", "This separates frustration from the ability to improve the process."],
      M4: ["I am willing to change my workflow if AI demonstrates measurable and controllable value.", "This measures openness to change, not obedience to change."],
      M5: ["I maintain calibrated trust: I do not accept outputs unchecked, but I do not discard the tool after the first error.", "Calibrated trust is an operational balance."],
      M6: ["I am willing to share practices, examples, and cautions with colleagues to improve AI use in the team.", "Individual mindset also affects organizational diffusion."],
      M7: ["I regularly update myself on the capabilities, limits, and risks of AI tools.", "GenAI changes quickly: competence must be maintained."],
      M10: ["I accept measuring AI effectiveness with evidence, not only enthusiasm or personal annoyance.", "A mature mindset is experimental and measurable."],
      M11: ["When a colleague uses AI well, I try to understand the method instead of focusing only on the final result.", "Competence grows by observing repeatable practices."],
      M13: ["I am willing to question both my skepticism and my enthusiasm when AI results do not confirm them.", "A mature mindset remains anchored to evidence and learning."]
    }
  }
};

Object.assign(AI_SKILL_I18N.en.questions, {
  L6: {
    text: "You need to prepare a summary on a regulatory topic that may have changed in recent months. What do you do?",
    hint: "Situational scenario: choose the approach closest to what you would actually do.",
    options: [
      ["Use the chatbot's first output", "If the text is well written, I consider it sufficient."],
      ["Ask the chatbot whether it is sure", "I rely on its confirmation without external checks."],
      ["Ask for a summary and check a few points", "I verify only the parts that seem doubtful."],
      ["Use updated sources and then ask for a summary", "I start from reliable sources and check dates and references."],
      ["Create a flow with sources, citations, and verification", "I separate research, synthesis, checking, and final review."]
    ],
    feedback: "For topics that may change or have high impact, competence is not only generating text: it is governing sources, update dates, and verification."
  },
  L7: {
    text: "You have a set of company documents to query with AI. What do you assess before starting?",
    hint: "The most mature answer combines usefulness, data access, security, and traceability.",
    options: [
      ["Upload everything into the most convenient tool", "The important thing is to get an answer quickly."],
      ["Upload only the smallest documents", "I mainly worry about technical upload limits."],
      ["Remove a few sensitive data points", "I partially anonymize without checking policy or tool boundaries."],
      ["Check policy, access, and purpose", "I use approved tools and document the data perimeter."],
      ["Design a controlled flow", "With minimized data, citable sources, RAG logic, or an authorized repository."]
    ],
    feedback: "AI literacy includes data and governance boundaries, not only the quality of the answer produced."
  },
  T1: {
    text: "In the context of an LLM, what is a token?",
    hint: "Choose the technically most accurate definition. Options are shown in random order.",
    options: [
      ["It is always a complete word", "Each word corresponds exactly to one token, regardless of language and punctuation."],
      ["It is a unit produced by the tokenizer", "It may correspond to a word, part of a word, punctuation mark, or other text fragment."],
      ["It is an internal parameter of the network", "It indicates one of the numerical values learned during training."],
      ["It is always a single character", "Each letter, space, or symbol is necessarily treated as a separate token."]
    ],
    feedback: "A token is the discrete unit used by the tokenizer to represent text. It does not necessarily match a word or a single character."
  },
  T2: {
    text: "How is an answer normally generated by an autoregressive LLM?",
    hint: "This concerns the general generation mechanism, not the chatbot interface.",
    options: [
      ["It automatically consults the web for every sentence", "It searches for the freshest answer and rewrites it."],
      ["It estimates the next token and repeats the process", "It computes a probability distribution over possible next tokens, selects one, and continues using what it has generated."],
      ["It retrieves a memorized sentence", "It finds the most similar sentence in the training set and returns it almost unchanged."],
      ["It composes the whole answer in one step", "It first fully understands the question, then writes all the text simultaneously."]
    ],
    feedback: "An autoregressive LLM generates one token at a time, conditioning each step on available context and previously generated tokens."
  },
  T3: {
    text: "What is the essential difference between training and inference?",
    hint: "Think about what happens to the model parameters in the two phases.",
    options: [
      ["Parameters keep changing in both phases", "Every conversation automatically rewrites the base model."],
      ["Training changes parameters; inference uses them", "During training, parameters are optimized on data; during ordinary use, the model applies learned parameters to the received context."],
      ["Inference verifies the truth of answers", "It is the phase where the system automatically checks every claim against reliable sources."],
      ["Training is only about speed", "It mainly makes the model faster, while inference teaches it new concepts."]
    ],
    feedback: "Training optimizes model parameters; inference uses those parameters to compute a prediction or generate an output."
  },
  T4: {
    text: "When you provide a document to an LLM during a normal session, which statement is generally most accurate?",
    hint: "Actual data handling depends on the service and its policies, but the technical principle is distinguishable.",
    options: [
      ["The document automatically enters the model weights", "The model is retrained in real time and will permanently retain that information."],
      ["The document is used as session input or context", "Normally it does not retrain the base model by itself; data retention and use depend on the service terms."],
      ["The document never leaves the device", "Every AI tool always processes the file only locally."],
      ["The document becomes a verified source", "Once uploaded, every claim in it is automatically considered correct by the system."]
    ],
    feedback: "Session context, service retention, and model training are different concepts. Provider policies still need to be checked."
  },
  T5: {
    text: "What does an LLM context window indicate?",
    hint: "Consider prompt, conversation, documents, and generated output.",
    options: [
      ["The total amount of data used to train the model", "It measures the size of the historical dataset the model learned from."],
      ["A permanent memory of all conversations", "Everything ever said remains available to the model."],
      ["The token capacity manageable in a single processing run", "It includes provided context and space needed for output; excess content may be excluded, truncated, or handled with other strategies."],
      ["The maximum number of simultaneous users", "It indicates how many people can query the model at the same time."]
    ],
    feedback: "The context window is a token capacity limit for the current processing run, not unlimited or permanent memory."
  },
  T6: {
    text: "Which description best represents an artificial neural network?",
    hint: "This asks for a correct intuition, not a full mathematical definition.",
    options: [
      ["A faithful digital copy of the human brain", "It reproduces biological neurons and consciousness with the same functioning as the brain."],
      ["A set of numerical transformations with learned parameters", "Nodes and layers combine inputs through weights and functions adapted during training to recognize relationships in data."],
      ["An ordered archive of sentences and answers", "It stores complete texts and retrieves them when it recognizes a similar question."],
      ["A program made only of explicit rules", "Every answer derives from if/then instructions manually written by developers."]
    ],
    feedback: "A neural network is a parametric model made of numerical transformations organized in layers. The biological analogy is only partial."
  },
  T7: {
    text: "In a Transformer, what is the attention mechanism generally used for?",
    hint: "Do not confuse mathematical attention with human attention, intention, or consciousness.",
    options: [
      ["It automatically verifies source reliability", "It gives more weight to true sources and discards unreliable ones."],
      ["It weights relationships among token representations", "It lets the model combine context information by assigning different relevance to different positions."],
      ["It gives the model awareness of meaning", "It turns statistical computation into conscious understanding of text."],
      ["It only counts word frequency", "It picks the most repeated terms and builds the answer around them."]
    ],
    feedback: "Attention computes weights among context representations. It is a mathematical mechanism and does not imply consciousness or truth control."
  },
  T8: {
    text: "What is an LLM hallucination?",
    hint: "Choose the most accurate definition.",
    options: [
      ["Plausible but false, invented, or unsupported content", "The model produces a linguistically convincing claim that is not grounded in reliable information or the available context."],
      ["Any creative or original answer", "Creativity and hallucination are not the same: creative content can be coherent with the request."],
      ["A technical freeze that stops the program", "The term does not mean a crash or application halt."],
      ["An intentional lie by the model", "An LLM does not consciously choose to deceive and has no human intentions."]
    ],
    feedback: "A hallucination is a plausible but false, invented, or insufficiently supported output. Fluency is not factual verification."
  },
  T9: {
    text: "What best describes a RAG system?",
    hint: "RAG means Retrieval-Augmented Generation.",
    options: [
      ["It retrains the model for every question", "Retrieved documents immediately and permanently change model weights."],
      ["It retrieves external content and adds it to context", "The model generates using selected documents too; retrieval quality, citations, and verification remain essential."],
      ["It automatically makes every answer true", "The presence of documents eliminates errors, misinterpretations, and hallucinations."],
      ["It is a method to make generation random", "It increases the variety of words selected by the model."]
    ],
    feedback: "RAG combines document retrieval and generation. It is not retraining and does not replace source and output quality assessment."
  },
  T10: {
    text: "Did artificial intelligence exist before modern LLMs?",
    hint: "This distinguishes AI history from the recent spread of generative chatbots.",
    options: [
      ["No, LLMs created the first real field of AI", "Before generative chatbots there were only normal computer programs."],
      ["Yes, AI has had several approaches for many decades", "Symbolic AI, expert systems, search, machine learning, and neural networks predate modern LLMs."],
      ["Yes, but only in industrial robotics", "Before LLMs, AI concerned only physical machines and automation."],
      ["No, AI began with the Transformer in 2017", "The Transformer architecture is not the historical origin of the whole discipline."]
    ],
    feedback: "The term artificial intelligence dates back to the 1950s, and LLMs are a recent phase in a much longer history."
  },
  T11: {
    text: "How do you handle a possible hallucination in an output intended for work?",
    hint: "Choose the behavior you would actually apply.",
    options: [
      ["Verify critical claims with reliable sources and human review", "I check data, dates, citations, and high-impact steps; I flag remaining uncertainty and calibrate review to risk."],
      ["Ask for sources and check only some points", "This is a partial check: useful, but it may leave errors in untested parts."],
      ["Ask the model: 'Are you sure?'", "The same model's answer is not independent verification and may repeat the same error."],
      ["Tell it not to invent and use the result", "The instruction may steer behavior, but it does not make the output automatically true."],
      ["Trust it if the text is precise and well written", "Form, apparent confidence, and numerical precision do not prove correctness."]
    ],
    feedback: "A possible hallucination requires independent verification, source traceability, and review proportional to impact, not a simple request for confirmation."
  },
  T12: {
    text: "What is an embedding?",
    hint: "Choose the most accurate general technical definition.",
    options: [
      ["A numerical representation that places similar content near each other", "Texts or other objects are transformed into vectors usable for similarity, semantic search, clustering, and retrieval."],
      ["A complete summary of the original text", "An embedding does not preserve content like a readable summary."],
      ["An encrypted copy of the document", "A vector representation is not encryption or anonymization."],
      ["The permanent prompt stored in the model", "Embeddings are not instructions and do not automatically modify model weights."]
    ],
    feedback: "An embedding is a learned vector representation. It helps compare semantic proximity, but is not a guarantee of truth or encryption."
  },
  TR_CITE: {
    text: "An LLM provides title, author, year, DOI, and link for a source. What can you conclude?",
    hint: "Choose what would be sufficient before using the citation.",
    options: [
      ["Nothing about its existence until I verify the source outside the model", "Even complete and credible-looking references may be invented, wrong, or refer to different content."],
      ["The DOI makes the source almost certainly real", "Even a plausible identifier may not exist or may not match the title."],
      ["The link is enough if the domain looks authoritative", "A plausible URL does not prove the page exists or supports the cited claim."],
      ["Bibliographic precision proves the model consulted the source", "The model can generate coherent details without retrieving or verifying the document."]
    ],
    feedback: "A complete citation is not proof of existence or relevance. Open the source and verify identity, content, date, and match with the claim."
  }
});

Object.assign(AI_SKILL_I18N.en.questions, {
  AG1: {
    text: "I distinguish between a chatbot, traditional automation, RAG, and an AI agent that can plan steps and use tools.",
    hint: "What matters is understanding when AI answers, when it retrieves information, and when it can execute actions."
  },
  AG2: {
    text: "Which characteristic best distinguishes an AI agent from a normal chat with an LLM?",
    hint: "Choose the most operational description.",
    options: [
      ["It always responds with longer text", "Output length does not define an agent."],
      ["It can use tools and manage steps toward a goal", "An agent combines model, instructions, state, tools, and progress criteria."],
      ["It always has access to the whole web", "Access to tools or sources depends on configuration."],
      ["It is necessarily autonomous without supervision", "Many agents require human approvals and tight limits."]
    ],
    feedback: "An agent is not just a text response: it is a system that can orchestrate steps, tools, and state under defined constraints."
  },
  AG3: {
    text: "A team proposes an agent to automatically manage complex customer requests. What is the first design check?",
    hint: "Assess whether the task is truly delegable to an agent.",
    options: [
      ["Activate it immediately on real cases", "Scope and risk definition are skipped."],
      ["Give it a very detailed prompt", "The prompt helps, but it is not enough to govern actions and data."],
      ["Start only with the most frequent cases", "This reduces complexity, but does not clarify limits and responsibilities."],
      ["Map tasks, data, tools, and excluded cases", "This creates a controllable basis for deciding the level of automation."],
      ["Define scope, approvals, metrics, logs, and fallback", "This establishes what the agent can do, when it must stop, and when it must escalate."]
    ],
    feedback: "Agentic delegation requires boundaries, tools, data, success criteria, fallback, and responsibility before automation."
  },
  AG4: {
    text: "You want to use an agent that reads tickets and updates the CRM. Which constraints do you impose before enabling it?",
    hint: "Select controls on data, actions, and traceability.",
    options: [
      ["Minimum permissions on tools", "The agent must be able to do only what is needed."],
      ["Human approval for sensitive changes", "High-impact actions remain supervised."],
      ["Logs of reads and changes", "Traceability makes behavior auditable."],
      ["Stop and escalation rules", "The agent must stop on ambiguous or risky cases."],
      ["Testing on representative but controlled data", "The flow is tested first under safe conditions."],
      ["Full access to avoid blockers", "This increases risk and makes the agent less controllable."],
      ["No logs to protect speed", "Speed does not justify lack of audit."]
    ],
    feedback: "An operational agent requires minimum permissions, approvals, logs, stop conditions, and controlled testing."
  },
  AG5: {
    text: "When I design an agent, I define objective, available tools, constraints, intermediate outputs, and stop conditions.",
    hint: "An agentic brief must describe the process and controls, not only the final result."
  },
  AG6: {
    text: "An agent can send emails to customers. Which configuration is most prudent at launch?",
    hint: "Consider external impact and recoverability.",
    options: [
      ["Automatic sending of all emails", "This immediately exposes customers and the organization to unfiltered errors."],
      ["Automatic sending if the tone is safe", "Tone does not measure correctness or appropriateness."],
      ["Automatic drafts and sample checking", "This reduces risk but may let critical cases through."],
      ["Drafts with approval for external recipients", "This keeps human control over impactful communications."],
      ["Drafts, checklist, risk thresholds, and blocking uncertain cases", "This combines efficiency, verification, and fallback."]
    ],
    feedback: "External actions require progressive autonomy levels and approvals proportional to risk."
  },
  AG7: {
    text: "What does it mean, in practice, to give tools to an AI agent?",
    hint: "Think about what the system can do beyond generating text.",
    options: [
      ["Automatically increasing its general intelligence", "Tools expand possible actions; they do not guarantee better judgment."],
      ["Allowing it to call functions or services within defined permissions", "It can search, read, write, or trigger procedures if authorized."],
      ["Making it able to always verify every answer", "Verification depends on configured tools, sources, and criteria."],
      ["Removing the need for instructions", "More tools require clearer instructions and limits."]
    ],
    feedback: "Tool use means connecting the agent to functions or services governed by permissions, inputs, outputs, and controls."
  },
  AG8: {
    text: "An agent keeps retrying the same step and consumes time without improving the result. What do you do?",
    hint: "Assess loops, stop criteria, and observability.",
    options: [
      ["Let it continue", "The loop can consume resources and amplify errors."],
      ["Ask it to try harder", "This does not change criteria or available information."],
      ["Restart the session", "It may unblock the case but does not solve the cause."],
      ["Analyze logs and failed steps", "I understand where data, tools, or criteria are missing."],
      ["Apply stop conditions, diagnosis, and human fallback", "I stop the loop and turn the error into an operating rule."]
    ],
    feedback: "Agents require observability and stop criteria: waiting for the process to improve on its own is not enough."
  },
  AG9: {
    text: "Which information should be tracked to make an agent auditable?",
    hint: "Select what allows decisions and actions to be reconstructed.",
    options: [
      ["Inputs received and sources consulted", "They are needed to understand the context used."],
      ["Tools called and parameters used", "This makes operational actions verifiable."],
      ["Intermediate outputs and rationale", "This helps diagnose errors and assumptions."],
      ["Human approvals and overrides", "This shows where responsibility was exercised."],
      ["Errors, blocks, and fallback", "This supports improvement and risk management."],
      ["Only the final result", "This is not enough to reconstruct behavior."],
      ["No logs to avoid complexity", "This reduces control and accountability."]
    ],
    feedback: "An auditable agent keeps traces of inputs, tools, intermediate outputs, approvals, errors, and fallback."
  },
  AG10: {
    text: "Write the prompt/brief you would use to configure an agent that analyzes support tickets and proposes knowledge-base updates, without publishing unapproved changes.",
    hint: "Include objective, tools, limits, approvals, and output format.",
    feedback: "An agentic brief must govern tools, limits, intermediate outputs, approvals, and stop conditions.",
    rubric: {
      criteria: [
        { label: "Objective and scope", points: 1, keywords: ["objective", "scope", "ticket", "knowledge base", "kb"] },
        { label: "Tools and sources", points: 1, keywords: ["tools", "sources", "ticket", "knowledge base", "knowledge"] },
        { label: "Action limits", points: 1, keywords: ["do not publish", "do not modify", "proposal only", "permissions", "limits"] },
        { label: "Human approval", points: 1, keywords: ["approval", "review", "human", "validation"] },
        { label: "Output format", points: 1, keywords: ["format", "table", "diff", "proposal", "priority"] },
        { label: "Controls and stop", points: 1, keywords: ["check", "control", "log", "stop", "escalation", "uncertain"] }
      ],
      redFlags: [
        { label: "automatic publication", points: 1, keywords: ["publish directly", "modify automatically", "without approval"] },
        { label: "blind delegation", points: 1, keywords: ["you decide", "do everything", "without logs"] }
      ]
    }
  },
  AG11: {
    text: "An agent can approve refunds below a certain threshold. Which control is most important?",
    hint: "Consider economic impact, abuse, and edge cases.",
    options: [
      ["Let it approve every case below the threshold", "The monetary threshold alone does not cover fraud or exceptions."],
      ["Ask for an explanation after approval", "Ex-post traceability does not prevent critical errors."],
      ["Check only the highest refunds", "This reduces economic risk but ignores anomalous patterns."],
      ["Use rules, sampling, and anomaly blocking", "This combines automation and control."],
      ["Thresholds, anti-fraud signals, approvals, and periodic audit", "This governs autonomy, exceptions, and responsibility."]
    ],
    feedback: "Agentic autonomy on economic actions requires thresholds, exceptions, audit, and risk-proportionate approvals."
  },
  AG12: {
    text: "Why are memory and state delicate in an AI agent?",
    hint: "Think about operational continuity and error propagation.",
    options: [
      ["Because they make errors impossible", "Memory and state can also preserve wrong assumptions."],
      ["Because they influence later actions and must be governed", "State, memory, and context can propagate wrong decisions or data."],
      ["Because they replace logs", "Operational memory and audit logs are different concepts."],
      ["Because they eliminate the need for permissions", "Permissions remain necessary even with persistent memory."]
    ],
    feedback: "An agent's state influences later steps: it must be visible, limited, and correctable."
  },
  AG13: {
    text: "Which metric is most useful for evaluating an operational agent, beyond the final result?",
    hint: "Choose a metric that reveals process quality.",
    options: [
      ["Number of words generated", "This does not measure quality or control."],
      ["Average speed without distinguishing cases", "Speed must be read together with errors, escalation, and risk."],
      ["Users' subjective satisfaction", "Useful, but insufficient alone."],
      ["Success rate with errors and escalation", "This measures outcome and need for intervention."],
      ["Success, errors, tool calls, escalation, rollback, and impact", "This observes the whole agentic workflow."]
    ],
    feedback: "An agent must be evaluated on its steps: actions, errors, escalation, rollback, and impact, not only on the final output."
  },
  AG14: {
    text: "I can decompose a process into steps an agent can execute, steps that require approval, and steps that must remain with a person.",
    hint: "Agentic competence includes designing progressive autonomy and checkpoints."
  },
  AG15: {
    text: "Before connecting an agent to company systems, which checks do you perform on credentials and access?",
    hint: "Select practices that reduce operational risk.",
    options: [
      ["Dedicated and revocable accounts or tokens", "They enable control and fast deactivation."],
      ["Minimum permissions for each tool", "This limits the impact of errors or abuse."],
      ["Secrets not inserted in the prompt", "Credentials must be managed outside free text."],
      ["Monitoring and alerts on actions", "This helps detect anomalous behavior."],
      ["Revocation and rollback procedure", "This is needed to react quickly."],
      ["Use the user's personal credentials", "This mixes responsibility and increases exposure."],
      ["Give administrator access for simplicity", "This violates the principle of least privilege."]
    ],
    feedback: "Agent credentials and access must be dedicated, limited, monitored, and revocable."
  }
});

Object.assign(AI_SKILL_I18N.en.questions, {
  P_L_1: {
    text: "AI returns an answer about a potentially updated regulation, but without links or dates. Select the actions you would take before using the content.",
    hint: "Select all operational actions you would actually apply. Risky choices lower the score.",
    options: [
      ["Look for a primary or institutional source", "I verify the content on a relevant authority, official gazette, standard body, or official source."],
      ["Check date, version, and scope of application", "I verify whether the information is current and whether it really applies to my case."],
      ["Distinguish general explanation from updated information", "I use AI to understand the topic, but not as the final source for dates or obligations."],
      ["Report sources and remaining uncertainty", "In the final document I distinguish what is verified from what needs confirmation."],
      ["Ask AI whether it is sure", "I consider the model's confirmation sufficient without looking for an external source."],
      ["Copy the text if it is coherent", "If the reasoning seems logical, I use it without further checks."],
      ["Check only if something sounds odd", "I rely on perceived plausibility as the first quality criterion."]
    ],
    feedback: "For updatable content, practical competence appears in how you manage source, date, version, and scope of application, not in declared confidence."
  },
  P_DE_1: {
    text: "You need to analyze 25 pages of documentation to prepare a recommendation. Select which parts you would assign to AI and which you would use only as support.",
    hint: "This assesses operational delegation: what you make the tool do and what remains human responsibility.",
    options: [
      ["Extract themes, requirements, and risks to verify", "I use AI to produce a first controllable map of the material."],
      ["Create an alternatives/criteria matrix", "I ask for a comparison structure, then check criteria and weights."],
      ["Prepare questions for stakeholders", "I use AI to highlight ambiguities and points to clarify."],
      ["Produce a human review checklist", "I ask it to help me avoid missing important checks."],
      ["Let AI decide the final recommendation", "I transfer the concluding decision to the tool."],
      ["Send the result without review", "I directly use the generated text as the official recommendation."],
      ["Ask for one summary without references", "I speed up reading, but lose traceability and control."]
    ],
    feedback: "Solid delegation uses AI to accelerate analysis, alternatives, and checks, but does not transfer the final decision."
  },
  P_DS_1: {
    text: "Write the prompt you would use to ask AI to turn messy meeting notes into a usable action plan. The notes may be incomplete: you do not want the tool to invent decisions or responsibilities.",
    hint: "Write exactly the prompt you would use in the real situation, even if it is very short.",
    feedback: "A practical prompt must make the work verifiable: objective, input, constraints, format, handling of missing information, and final checks.",
    rubric: {
      criteria: [
        { label: "Objective and deliverable", points: 1, keywords: ["objective", "goal", "action plan", "deliverable", "actions", "next steps"] },
        { label: "Context and input", points: 1, keywords: ["notes", "meeting", "minutes", "context", "input"] },
        { label: "Constraint: do not invent", points: 1, keywords: ["do not invent", "don't invent", "do not add", "do not infer", "missing information", "assumptions"] },
        { label: "Expected format", points: 1, keywords: ["table", "format", "columns", "owner", "deadline", "priority"] },
        { label: "Ambiguity and clarifications", points: 1, keywords: ["clarify", "questions", "ambiguous", "unclear", "incomplete", "flag"] },
        { label: "Quality control", points: 1, keywords: ["verify", "check", "consistency", "checklist", "risks", "inconsistency"] }
      ],
      redFlags: [
        { label: "blind delegation", points: 1, keywords: ["you decide", "do it yourself", "without asking", "final version", "perfect"] },
        { label: "no verification", points: 1, keywords: ["no need to verify", "without verifying", "do not check"] }
      ]
    }
  },
  P_DS_2: {
    text: "Which prompt would you use to get a truly usable answer on a complex business problem?",
    hint: "Choose the prompt that best sets context, constraints, output, criteria, and interaction.",
    options: [
      ["Tell me what to do about this problem", "Very open request, with no context or criteria."],
      ["Write a complete and convincing plan", "It asks for a final output, but does not define data, constraints, or checks."],
      ["First ask me 5 questions, then propose 3 options with risks", "Context, constraints, criteria, explicit assumptions, table format, and points to verify."],
      ["Give me 10 ideas and I will choose", "Useful for divergence, but weak on quality, risks, and verification."],
      ["Answer briefly and operationally", "The format is clear, but context, criteria, and assumptions are missing."]
    ],
    feedback: "Effective Description is not only linguistic clarity: it is designing the task and its control."
  },
  P_DI_1: {
    text: "An AI output contains this sentence: 'According to the 2026 Global Manufacturing Observatory report, 72.4% of European manufacturing companies use AI agents in production.' There is no link. Write the checks you perform before putting it in a presentation.",
    hint: "Write the checks you would actually perform, even in a very concise form.",
    feedback: "Practical discernment appears when a plausible and precise figure is treated as a hypothesis until it is traceable.",
    rubric: {
      criteria: [
        { label: "Source existence", points: 1, keywords: ["exist", "source", "report", "link", "publication", "author"] },
        { label: "Source reliability", points: 1, keywords: ["reliable", "authoritative", "institution", "methodology", "sample"] },
        { label: "Date and version", points: 1, keywords: ["date", "version", "2026", "updated", "published"] },
        { label: "Independent comparison", points: 1, keywords: ["compare", "independent source", "other sources", "cross-check", "cross check"] },
        { label: "Prudent use of the figure", points: 1, keywords: ["unverified", "hypothesis", "remove", "do not use", "caution", "range"] },
        { label: "Citation or traceability", points: 1, keywords: ["citation", "reference", "url", "note", "slide", "trace"] }
      ],
      redFlags: [
        { label: "precision mistaken for quality", points: 1, keywords: ["precise so", "looks precise", "use it as is"] },
        { label: "self-referential confirmation", points: 1, keywords: ["ask ai", "ask the model if", "ask chatgpt"] }
      ]
    }
  },
  P_DG_1: {
    text: "You have an internal document with customer names, confidential prices, and commercial notes. What do you do before using it with an AI tool?",
    hint: "Select the concrete actions you would apply. Some choices look fast but are weak from a governance standpoint.",
    options: [
      ["Check policy and approved tools", "I verify whether the tool is authorized for that type of data."],
      ["Minimize or anonymize content", "I use only what is needed and remove unnecessary identifiers."],
      ["Assess purpose, access, and retention", "I ask who can access the data and what remains in the tool."],
      ["Look for a governed alternative", "I use a company environment, authorized repository, controlled RAG, or synthetic data."],
      ["Document assumptions and scope", "I keep track of what I used and why."],
      ["Upload it as it is", "The document is internal, but I only need it to work faster."],
      ["Use a personal account", "I avoid organizational friction by using the tool I know best."],
      ["Remove only the file name", "A cosmetic change that does not really reduce confidential content."]
    ],
    feedback: "Practical Diligence concerns data perimeter, authorized tools, minimization, traceability, and responsibility."
  },
  P_M_1: {
    text: "A first attempt with AI produces a mediocre output. Select what you do to improve the process.",
    hint: "This measures calibrated trust and operational learning, not generic optimism.",
    options: [
      ["Reformulate the brief", "I add context, constraints, audience, format, and quality criteria."],
      ["Provide an example of the expected output", "I make the desired standard clearer."],
      ["Ask for assumptions and preliminary questions", "I surface what is missing before producing the final answer."],
      ["Break down the task", "I separate research, synthesis, review, and checking instead of asking for everything together."],
      ["Compare the output with explicit criteria", "I assess what works, what is missing, and what should be redone."],
      ["Repeat the same request", "I hope the model randomly produces a better answer."],
      ["Accept the result because I have little time", "I use a mediocre output without correcting the process."],
      ["Discard AI permanently", "I interpret a single weak output as proof that the tool is useless."]
    ],
    feedback: "A mature mindset appears in the ability to adjust process, prompt, and criteria after a weak result."
  },
  L11: {
    text: "An AI output cites an internal document you do not remember uploading. What do you do?",
    hint: "Choose the strongest behavior regarding sources, memory, and context.",
    options: [
      ["Use the citation if it seems coherent", "I assume the model has access to the document."],
      ["Ask the model where it found it", "I rely on the model's explanation without external verification."],
      ["Check whether the document is in the conversation", "I verify the immediate context, but not the whole perimeter."],
      ["Check context, uploaded files, and settings", "I check where the information could come from and whether it is authorized."],
      ["Treat the citation as unverified until traceable", "I look for the real source, document uncertainty, and do not use it until confirmed."]
    ],
    feedback: "An AI-generated citation should be treated as a hypothesis until it can be traced to an accessible and authorized source."
  },
  L12: {
    text: "You need to use AI to prepare a customer answer about non-public company data. What is the first check?",
    hint: "The best answer puts data perimeter and tool first, then productivity.",
    options: [
      ["Write the answer immediately with the fastest tool", "I prioritize speed and apparent quality."],
      ["Remove the customer's name and proceed", "I reduce little risk and do not verify the context."],
      ["Use only aggregated data", "This reduces risk, but is not enough without policy and a suitable tool."],
      ["Check data classification and approved tools", "I verify whether I can use that content in that service."],
      ["Define a minimized and traceable flow", "I use only necessary data, an authorized environment, human review, and notes on sources and limits."]
    ],
    feedback: "Literacy includes knowing that output quality does not compensate for an unguided data perimeter."
  },
  P_L_2: {
    text: "You need to use an AI-generated document in an external context. What checks do you perform before delivery?",
    hint: "Select the actions that make the content traceable and defensible.",
    options: [
      ["Verify data, dates, and proper names", "I check the elements most exposed to error."],
      ["Check sources and citations", "I make claims traceable."],
      ["Review tone and audience", "I adapt the text to real use."],
      ["Flag remaining uncertainty", "I do not turn hypotheses into certainties."],
      ["Check only grammar and style", "Form does not guarantee correctness."],
      ["Use the text because it is convincing", "Persuasiveness does not replace verification."]
    ],
    feedback: "Practical pre-delivery control concerns accuracy, sources, context, and uncertainty."
  },
  P_DE_2: {
    text: "Which step would you NOT delegate entirely to AI in a supplier selection process?",
    hint: "Choose the most important boundary of responsibility.",
    options: [
      ["Summarizing technical sheets", "It can be useful support if verified."],
      ["Extracting recurring requirements", "Delegable with control."],
      ["Deciding the winning supplier", "The decision requires responsibility, context, and human verification."],
      ["Preparing a comparison table", "Useful if data is traceable."],
      ["Generating clarification questions", "Good use as support."]
    ],
    feedback: "AI can support comparison and analysis, but it must not absorb responsibility for the choice."
  },
  P_DS_3: {
    text: "Write a prompt asking AI to revise a commercial proposal without changing promises, prices, or contractual terms.",
    hint: "Write the prompt you would actually use, including constraints and output format.",
    feedback: "A good revision prompt separates form and substance: it improves clarity without altering commitments.",
    rubric: {
      criteria: [
        { label: "Objective", points: 1, keywords: ["review", "revise", "improve", "proposal", "commercial"] },
        { label: "Substantive constraints", points: 1, keywords: ["do not change", "do not modify", "prices", "terms", "promises", "conditions"] },
        { label: "Format", points: 1, keywords: ["table", "comments", "before", "after", "reason"] },
        { label: "Control", points: 1, keywords: ["flag", "doubts", "risks", "verify", "check"] },
        { label: "Recipient", points: 1, keywords: ["client", "customer", "recipient", "tone", "style"] }
      ],
      redFlags: [
        { label: "substantive delegation", points: 1, keywords: ["rewrite freely", "improve the terms", "make it more advantageous"] }
      ]
    }
  },
  P_DI_2: {
    text: "AI produces a comparison table, but one row seems too favorable to your hypothesis. Which check has priority?",
    hint: "Choose the check that reduces confirmation risk.",
    options: [
      ["Leave it as is because it confirms the hypothesis", "You accept the bias."],
      ["Make the row more cautious in tone", "You correct form, not content."],
      ["Ask for a second table", "It may help, but remains self-referential."],
      ["Verify source data and comparison criteria", "Basic controls and method."],
      ["Look for counterevidence and rerun the comparison", "You test the hypothesis with explicit criteria."]
    ],
    feedback: "Practical discernment requires especially checking what feels convenient or confirmatory."
  },
  P_DG_2: {
    text: "You are preparing a prompt with customer data. Which actions truly reduce risk?",
    hint: "Select concrete minimization and governance actions.",
    options: [
      ["Use only fields needed for the task", "Data minimization."],
      ["Replace identifiers with placeholders", "Reduces direct exposure."],
      ["Use an approved tool", "Aligns the process with policy."],
      ["Document purpose and scope", "Makes processing explainable."],
      ["Only change file names", "Does not protect the content."],
      ["Use a personal account to save time", "Increases control and retention risk."]
    ],
    feedback: "Risk reduction comes from minimization, anonymization, approved tools, and traceability."
  },
  T13: {
    text: "Which statement best describes model fine-tuning?",
    hint: "Distinguish fine-tuning, prompting, and document retrieval.",
    options: [
      ["Writing a longer prompt", "The prompt does not modify model parameters."],
      ["Additional training on specific data", "It adapts the model to a domain or behavior by modifying parameters or trainable components."],
      ["Loading documents into context", "This concerns input or RAG, not necessarily fine-tuning."],
      ["Manually verifying answers", "Verification is review, not training."]
    ],
    feedback: "Fine-tuning is an adaptation process through further training; it is not the same as prompt engineering or RAG."
  },
  P_M_2: {
    text: "After one month of AI experimentation, results are uneven. What is the most useful next step?",
    hint: "Choose the action that turns scattered experience into learning.",
    options: [
      ["Stop everything", "Uneven results are read as definitive failure."],
      ["Continue without changing method", "Attempts accumulate but learning does not."],
      ["Use only successful cases", "Useful, but it may ignore conditions and limits."],
      ["Collect success and failure patterns", "You start understanding when AI works."],
      ["Define playbooks, metrics, and excluded cases", "Experimentation becomes a shareable operating method."]
    ],
    feedback: "A good mindset does not seek immediate uniform success: it builds criteria, playbooks, and limits of use."
  }
});

Object.assign(AI_SKILL_I18N.en.questions, {
  F_DE_3: {
    text: "You are asked to prepare a draft operating plan for a new project in two hours. How do you use AI?",
    hint: "This measures strategic delegation, not simple speed.",
    options: [
      ["Ask it to write the whole plan", "Then I send it almost unchanged."],
      ["Ask it for a general draft", "I adjust style and formatting."],
      ["Ask for a structure and a few ideas", "I integrate it with my own experience."],
      ["Divide the work into phases", "Brief, risks, stakeholders, milestones, assumptions, then I verify."],
      ["Use AI as a controlled co-analyst", "I generate alternatives, decision criteria, risks, and validation checklists."]
    ],
    feedback: "Mature delegation defines boundaries, steps, quality criteria, and final responsibility."
  },
  F_DE_11: {
    text: "You need to write a recommendation on a strategic choice with incomplete data. What do you delegate to AI?",
    hint: "The best choice uses AI as structured support, not as the decision-maker.",
    options: [
      ["The final decision", "I ask which option to choose and follow it."],
      ["A convincing text", "I mainly care about presenting the recommendation well."],
      ["A list of pros and cons", "Useful, but still weakly governed."],
      ["A matrix with assumptions and missing data", "I use AI to structure reasoning and reveal gaps."],
      ["Alternatives, risks, questions, and verification criteria", "I keep the decision human and use AI to improve process quality."]
    ],
    feedback: "In strategic decisions, delegation covers structure, alternatives, and checks, not final responsibility."
  },
  F_DE_12: {
    text: "A task is urgent, repetitive, and based on already verified data. How do you use AI?",
    hint: "The best answer balances automation and lightweight control.",
    options: [
      ["Never use it on urgent tasks", "I avoid the tool even when risk is low."],
      ["Delegate everything without review", "Urgency removes all checks."],
      ["Use it for a draft and spot-check", "Useful, but not very explicit."],
      ["Define template, inputs, and final check", "I use AI where it speeds things up and verify fit."],
      ["Create a reusable micro-workflow", "Standard inputs, criteria, exceptions, and risk-proportionate review."]
    ],
    feedback: "Mature operational delegation is proportionate: more automation when data, criteria, and risk are under control."
  },
  F_DS_3: {
    text: "AI produces a generic and unhelpful answer. What is your most likely reaction?",
    hint: "The best answer is not immediately changing tools, but improving the work description.",
    options: [
      ["Conclude the tool is useless", "I abandon the attempt."],
      ["Repeat the same question", "Hoping for a better answer."],
      ["Add a few details", "I specify the desired result better."],
      ["Rewrite the brief", "I add context, constraints, examples, audience, and format."],
      ["Set up a mini-procedure", "I ask for preliminary questions, criteria, draft, review, and self-check."]
    ],
    feedback: "Mature Description turns a generic request into a verifiable assignment."
  },
  TR_PROMPT: {
    text: "Which statement about prompt length is most accurate?",
    hint: "Evaluate the principle, not personal preference.",
    options: [
      ["Length alone does not measure prompt quality", "What matters is that objective, context, constraints, and criteria are relevant; a prompt may be short or long depending on the task."],
      ["A longer prompt always produces a better answer", "Useless, contradictory, or redundant detail may worsen the task instead of clarifying it."],
      ["A short prompt is always more effective because it gives the model freedom", "Sometimes brevity is enough, but complex tasks may leave too many implicit assumptions."],
      ["Quality appears when the prompt exceeds about one hundred words", "There is no universal word threshold that turns a request into a good prompt."]
    ],
    feedback: "Prompt quality depends on the adequacy of information and task verifiability, not a predefined length."
  },
  F_DS_10: {
    text: "You want one summary for the CEO and one for the technical team. How do you set the request?",
    hint: "The best answer differentiates audience, level, and format.",
    options: [
      ["Ask for a single summary", "One output should work for everyone."],
      ["Ask for two versions of different length", "Length alone is not enough to change usefulness."],
      ["Name the two audiences", "Good start, but criteria and format are missing."],
      ["Define objective, tone, and detail for each", "I adapt content and format to the two uses."],
      ["Ask for two outputs with criteria, risks, and open questions", "I differentiate audience, supported decisions, technical detail, and uncertainties."]
    ],
    feedback: "Effective Description designs the output for the recipient and the decision it must support."
  },
  F_DS_11: {
    text: "A prompt produces answers that are too generic. What is the most useful change?",
    hint: "Look for the change that increases context and verifiability.",
    options: [
      ["Write: be more precise", "A generic request to solve genericity."],
      ["Ask for a longer answer", "More text does not mean more quality."],
      ["Add a few contextual details", "It improves the result, but may remain hard to verify."],
      ["Add context, criteria, and format", "It orients the output toward real use."],
      ["Add examples, constraints, criteria, and a request for clarifying questions", "It turns the prompt into a controllable brief."]
    ],
    feedback: "A generic output is corrected by designing the task better, not only asking for more precision."
  },
  F_DI_3: {
    text: "AI proposes a very precise numerical figure without a source. What do you do?",
    hint: "This measures your reaction to a plausible but unverified output.",
    options: [
      ["Use it because it is very precise", "Apparent precision is enough for me."],
      ["Ask AI whether it is correct", "I settle for its confirmation."],
      ["Use it with a caution note", "I flag that it may need verification."],
      ["Look for an independent source", "I use the figure only after checking it."],
      ["Treat the figure as a hypothesis", "I ask for source, method, range, alternatives, and verify with reliable sources."]
    ],
    feedback: "A precise number can be more dangerous than a vague statement if it is not traceable."
  },
  TR_SURE: {
    text: "AI gives a doubtful figure. You write 'Are you sure?' and the model confirms it confidently. How do you treat that confirmation?",
    hint: "Choose the evidentiary value you would assign to the second answer.",
    options: [
      ["It is not independent verification: I check the figure externally", "The model may repeat, rephrase, or reinforce the same error; internal confirmation does not replace a separate check."],
      ["It is a useful signal, so I use the figure with a caution note", "Caution is better than blind acceptance, but the figure remains unverified."],
      ["The second answer makes the figure reliable enough", "Asking the same system again does not create new evidence."],
      ["Confident language means the model rechecked it", "A confident tone does not prove access to sources or factual verification."]
    ],
    feedback: "'Are you sure?' may trigger revision, but it does not produce independent evidence. Relevant data need external sources or checks."
  },
  F_DI_10: {
    text: "AI proposes three insights from a sales file, but it does not show the steps or rows used. What do you do?",
    hint: "The best answer seeks traceability before use.",
    options: [
      ["Use the insights because they seem useful", "I evaluate apparent usefulness."],
      ["Ask it to be more convincing", "This improves form, not verification."],
      ["Check only the most important insight", "It reduces risk but leaves gaps."],
      ["Ask for evidence and check rows/fields", "I seek traceability and consistency with the data."],
      ["Reconstruct method, evidence, and limits", "I verify sample, calculations, outliers, and alternatives before using the insights."]
    ],
    feedback: "Discernment requires traceability: insights without evidence are hypotheses to verify."
  },
  F_DI_11: {
    text: "An AI answer is strongly aligned with your initial opinion. What is the main risk?",
    hint: "Critical maturity includes checking what we like too.",
    options: [
      ["No risk; it confirms I was right", "You confuse agreement with quality."],
      ["Only that it may be poorly written", "Form is a secondary issue."],
      ["Some detail may be missing", "You recognize a risk, but not the main bias."],
      ["It may amplify my bias", "I check alternatives and counterarguments."],
      ["Ask for counterevidence, alternatives, and falsification conditions", "I use AI to test the hypothesis, not only confirm it."]
    ],
    feedback: "An output that convinces us because it confirms our assumptions requires more, not less, discernment."
  },
  F_DG_3: {
    text: "A colleague asks you to upload an internal-information file into an unapproved chatbot. What do you do?",
    hint: "Diligence measures responsible use, not generic caution.",
    options: [
      ["Upload it if it helps work faster", "Productivity comes first."],
      ["Upload it after removing the title", "I do very partial minimization."],
      ["Extract only some parts", "I reduce risk, but without checking the authorized perimeter."],
      ["Check policy and tool", "I use only approved environments or properly anonymized data."],
      ["Propose a governed alternative", "I create a safe flow: minimal data, access controls, traceability, and review."]
    ],
    feedback: "Productivity gained through AI does not compensate for unguided use of internal or sensitive data."
  },
  F_DG_11: {
    text: "An AI output contains a harsh evaluation of a person on the team. How do you proceed?",
    hint: "The best answer avoids misuse and seeks evidence.",
    options: [
      ["Forward it because it is well written", "I transfer an unverified judgment."],
      ["Soften it and use it", "I improve tone, not method."],
      ["Use it only as a private prompt", "This reduces harm but remains weakly governed."],
      ["Verify data, context, and HR policy", "I do not use personal judgments without scope and evidence."],
      ["Separate facts, hypotheses, and human responsibility", "I may use AI to structure evidence, not to produce automatic judgments."]
    ],
    feedback: "Evaluations of people require maximum caution, evidence, and human responsibility."
  },
  F_DG_12: {
    text: "To save time, a supplier proposes uploading your files to an external AI tool. What do you ask first?",
    hint: "The most mature answer looks at data, contract, and control.",
    options: [
      ["Only whether the tool is fast", "I evaluate the operational benefit."],
      ["An informal confidentiality promise", "That is not enough to govern risk."],
      ["A screenshot of privacy settings", "This is only a partial check."],
      ["Contract, data processing, and tool policy", "I verify legal basis, roles, retention, and data use."],
      ["Full perimeter: data, access, retention, training, and audit", "I assess whether the flow can be authorized and what alternatives to use."]
    ],
    feedback: "Diligence also includes the supplier chain and control of terms of use."
  },
  M8: {
    text: "A colleague says: 'AI makes mistakes, so it is useless.' How do you respond operationally?",
    hint: "The most mature answer recognizes the limit but proposes controlled use.",
    options: [
      ["Agree and avoid it", "If it makes mistakes, it is not worth the risk."],
      ["Say people need to trust it more", "The only problem is resistance to change."],
      ["Suggest using it only for simple texts", "I limit the scope but without a method."],
      ["Suggest low-risk cases", "With verification criteria and comparison of results."],
      ["Suggest a guided trial", "I choose tasks, metrics, limits, allowed data, and final review."]
    ],
    feedback: "A mature mindset does not deny errors: it incorporates them into the work process."
  },
  M9: {
    text: "Management introduces AI tools but does not clearly define objectives, rules, and use cases. What is the most useful behavior?",
    hint: "The best answer combines proactivity, request for rules, and measured experimentation.",
    options: [
      ["Wait for complete instructions", "Without clarity I do nothing."],
      ["Use the tool however I want", "Practice will clarify everything."],
      ["Experiment informally", "I stay on personal or low-criticality tasks."],
      ["Ask for scope and propose use cases", "I bring concrete examples and risk criteria."],
      ["Create a controlled adoption proposal", "Map use cases, policies, metrics, training, and responsibilities."]
    ],
    feedback: "When clarity is missing, competence means building scope and method, not just trying tools."
  },
  M12: {
    text: "Your team is split between enthusiasm and skepticism about AI. What contribution do you bring?",
    hint: "The best answer builds shared learning and practical rules.",
    options: [
      ["Simply take a side", "I make the discussion more polarized."],
      ["Suggest waiting", "I avoid conflict but generate no learning."],
      ["Collect interesting examples", "Useful, but still informal."],
      ["Suggest pilots with criteria", "I create a measurable and governed space."],
      ["Facilitate a shared practice", "I define use cases, limits, metrics, sharing, and retrospective."]
    ],
    feedback: "A team-useful mindset turns divergent opinions into governed experiments and shared learning."
  }
});
