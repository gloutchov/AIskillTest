# Mappa del repository / Repository map

```text
.
|-- index.html                  Ingresso Pages e apertura da file
|-- ai_skill_test.html          Interfaccia del test e bibliografia
|-- aiskilltest_icon.png        Icona del sito
|-- assets/
|   |-- redirect.css            Stili della pagina di ingresso
|   |-- styles.css              Stili dell'applicazione e della stampa
|   |-- app.js                  Navigazione, preferenze, storico ed export
|   |-- assessment.js           Classificazione e scoring
|   |-- report-ui.js            Visualizzazione delle evidenze
|   |-- lab-ui.js               Controlli del laboratorio e bozze
|   |-- complete-assessment.js  Composizione del test completo
|   |-- questions.js, i18n.js    Banca, forme e testi localizzati
|   `-- learning.js, modern-ai.js, agentic-workflows.js,
|       harness.js, operational-lab.js
|                               Moduli di apprendimento e assessment
|-- scripts/
|   |-- build-pages-artifact.mjs Elenco dei file pubblici e copia in area temporanea
|   `-- build-*.mjs             Generatori di contenuti e revisioni editoriali
|-- tests/
|   |-- *.test.mjs              Test di app, storico, simulazioni e artefatto
|   |-- editorial-text.test.mjs Verifica di spiegazioni, resoconti e punteggi
|   |-- helpers/                Adattatore DOM e confronti con versioni precedenti
|   `-- fixtures/               Dati sintetici e SHA-256 di riferimento
|-- .github/workflows/pages.yml Test, creazione artefatto e deploy da main
|-- docs/
|   |-- QA.md, SCORING.md        Verifiche e contratto dei risultati
|   |-- ASSESSMENT_ITEM_MAP.md  Classificazione degli item
|   |-- *_REVIEW.md, design-qa/ Revisioni e immagini di verifica
|   `-- archive/                Archivio editoriale dei quesiti ritirati
|-- ASSESSMENT_BLUEPRINT.md     Contratto di valutazione
|-- LEARNING_PATH.md            Blueprint di Primi passi
|-- README.md, PLAN.md          Guida bilingue e roadmap
|-- AGENTS.md, SECURITY_MODEL.md
|                               Regole operative e modello di sicurezza
|-- CNAME, .nojekyll            File della pubblicazione precedente da branch
`-- LICENSE, .gitignore         Licenza ed esclusioni locali
```

Lo script Pages stampa la directory temporanea `aiskilltest-pages-*` con i file da distribuire. Gli export `ai-skill-*.json` e `ai-skill-*.csv` sono file locali. Le pagine di revisione generate si rigenerano con gli script corrispondenti.

The Pages script prints the temporary `aiskilltest-pages-*` directory containing the site files. `ai-skill-*.json` and `ai-skill-*.csv` exports are local files. Use the corresponding scripts to regenerate editorial review pages.
