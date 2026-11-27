// Generato da LEARNING_PATH.md con scripts/build-learning-data.mjs.
const FIRST_STEPS_BANK_VERSION = "2026.11-first-steps-2";
const FIRST_STEPS_QUESTIONS = {
  "it": [
    {
      "id": "N_A_CAP_1",
      "formId": "A",
      "objectiveId": "CAP-1",
      "learningUnitId": "U-CAP-1",
      "type": "knowledge",
      "language": "it",
      "text": "Quale descrizione rappresenta meglio ciò che fa un sistema di AI generativa quando risponde a una richiesta?",
      "options": [
        {
          "title": "Cerca una pagina online che corrisponda alla richiesta.",
          "correct": false
        },
        {
          "title": "Crea una risposta usando la richiesta e ciò che ha imparato.",
          "correct": true
        },
        {
          "title": "Sceglie una risposta pronta tra quelle archiviate durante l’addestramento.",
          "correct": false
        },
        {
          "title": "Controlla la verità delle frasi su fonti esterne prima di rispondere.",
          "correct": false
        }
      ],
      "feedback": "Creare una risposta significa usare ciò che il sistema ha imparato. Per sapere se ha anche cercato o verificato qualcosa servono prove di quei passaggi."
    },
    {
      "id": "N_A_CAP_2",
      "formId": "A",
      "objectiveId": "CAP-2",
      "learningUnitId": "U-CAP-2",
      "type": "scenario",
      "language": "it",
      "text": "Devi preparare idee per una riunione di team. Quale uso dell'AI è più utile come primo passo?",
      "options": [
        {
          "title": "Chiedo più idee e le confronto con i vincoli.",
          "correct": true
        },
        {
          "title": "Chiedo all’AI di scegliere per il gruppo.",
          "correct": false
        },
        {
          "title": "Porto la prima idea e rimando il confronto alla riunione.",
          "correct": false
        },
        {
          "title": "Chiedo una sola proposta prima di dire che cosa deve ottenere il gruppo.",
          "correct": false
        }
      ],
      "feedback": "Confrontare più idee aiuta a vedere i compromessi. Il gruppo può decidere tenendo conto di vincoli che l’AI potrebbe ignorare."
    },
    {
      "id": "N_A_LIM_1",
      "formId": "A",
      "objectiveId": "LIM-1",
      "learningUnitId": "U-LIM-1",
      "type": "scenario",
      "language": "it",
      "text": "Un chatbot fornisce un numero molto preciso, ma non indica da dove proviene. Come lo consideri?",
      "options": [
        {
          "title": "Lo uso perché le cifre decimali fanno pensare a un calcolo preciso.",
          "correct": false
        },
        {
          "title": "Gli do credito perché il chatbot presenta il numero con sicurezza.",
          "correct": false
        },
        {
          "title": "Lo verifico prima di usarlo.",
          "correct": true
        },
        {
          "title": "Lo scarto perché penso che un chatbot non possa riportare numeri corretti.",
          "correct": false
        }
      ],
      "feedback": "Le cifre decimali e il tono sicuro non dicono da dove viene un numero. Per usarlo, cerca una fonte o ripeti il calcolo sui dati di partenza."
    },
    {
      "id": "N_A_LIM_2",
      "formId": "A",
      "objectiveId": "LIM-2",
      "learningUnitId": "U-LIM-2",
      "type": "scenario",
      "language": "it",
      "text": "Vuoi conoscere una regola o un orario che potrebbe essere cambiato di recente. Come controlli che sia ancora valido?",
      "options": [
        {
          "title": "Mi affido alla risposta se indica un orario o una regola precisa.",
          "correct": false
        },
        {
          "title": "Chiedo all’AI se è aggiornata.",
          "correct": false
        },
        {
          "title": "Controllo una fonte ufficiale e la data.",
          "correct": true
        },
        {
          "title": "Uso la versione più dettagliata che il modello riesce a produrre.",
          "correct": false
        }
      ],
      "feedback": "La fonte dell’ente interessato e la data di validità permettono di controllare che la regola o l’orario valgano ancora."
    },
    {
      "id": "N_A_REQ_1",
      "formId": "A",
      "objectiveId": "REQ-1",
      "learningUnitId": "U-REQ-1",
      "type": "scenario",
      "language": "it",
      "text": "Vuoi far riassumere un testo per persone che non conoscono l'argomento. Quale richiesta è più utile?",
      "options": [
        {
          "title": "Riassumi in cinque punti.",
          "correct": false
        },
        {
          "title": "Metti in evidenza i dettagli che potrebbero interessare a chi conosce già l’argomento.",
          "correct": false
        },
        {
          "title": "Riassumi in cinque punti per chi è alle prime armi.",
          "correct": true
        },
        {
          "title": "Rendi il testo breve e mantieni la stessa difficoltà dell’originale.",
          "correct": false
        }
      ],
      "feedback": "Indicare chi leggerà il riassunto e quanto deve essere lungo aiuta l’AI a scegliere cosa spiegare e cosa tralasciare."
    },
    {
      "id": "N_A_REQ_2",
      "formId": "A",
      "objectiveId": "REQ-2",
      "learningUnitId": "U-REQ-2",
      "type": "scenario",
      "language": "it",
      "text": "La prima risposta dell'AI è generica. Qual è il passo successivo più utile?",
      "options": [
        {
          "title": "Ripeto la richiesta identica e scelgo la risposta più dettagliata.",
          "correct": false
        },
        {
          "title": "Dico che cosa manca e aggiungo il contesto utile.",
          "correct": true
        },
        {
          "title": "Tengo la risposta e ne cambio solo il tono, lasciando invariato il contenuto.",
          "correct": false
        },
        {
          "title": "Cambio strumento con la stessa richiesta.",
          "correct": false
        }
      ],
      "feedback": "Dire che cosa manca orienta la correzione. Riprovare da capo con le stesse informazioni lascia il problema irrisolto."
    },
    {
      "id": "N_A_VER_1",
      "formId": "A",
      "objectiveId": "VER-1",
      "learningUnitId": "U-VER-1",
      "type": "scenario",
      "language": "it",
      "text": "L'AI propone titolo, autore e link di una fonte. Prima di citarla, che cosa fai?",
      "options": [
        {
          "title": "Cito la fonte usando autore, titolo e link che l’AI ha dato.",
          "correct": false
        },
        {
          "title": "Apro la fonte e controllo che sostenga ciò che voglio citare.",
          "correct": true
        },
        {
          "title": "Chiedo allo stesso chatbot di confermare che la citazione sia vera.",
          "correct": false
        },
        {
          "title": "Controllo che il sito sia affidabile, senza leggere la pubblicazione.",
          "correct": false
        }
      ],
      "feedback": "Un link può essere corretto e rimandare a un testo che non sostiene la tua affermazione. Controlla sia la pubblicazione sia ciò che dice."
    },
    {
      "id": "N_A_VER_2",
      "formId": "A",
      "objectiveId": "VER-2",
      "learningUnitId": "U-VER-2",
      "type": "scenario",
      "language": "it",
      "text": "Quale risultato dell’AI richiede più controlli prima di essere usato?",
      "options": [
        {
          "title": "Una lista di titoli per una playlist che resterà privata.",
          "correct": false
        },
        {
          "title": "Un avviso ufficiale che cambia una procedura per il pubblico.",
          "correct": true
        },
        {
          "title": "Un elenco di idee da discutere al prossimo incontro interno.",
          "correct": false
        },
        {
          "title": "Una prova di scrittura da conservare tra i propri appunti.",
          "correct": false
        }
      ],
      "feedback": "Un avviso ufficiale può cambiare il comportamento di altre persone. Gli errori hanno conseguenze maggiori e meritano controlli più accurati."
    },
    {
      "id": "N_A_DAT_1",
      "formId": "A",
      "objectiveId": "DAT-1",
      "learningUnitId": "U-DAT-1",
      "type": "scenario",
      "language": "it",
      "text": "Devi analizzare un elenco con nomi, email e note sui clienti. Prima di caricarlo in uno strumento AI, che cosa fai?",
      "options": [
        {
          "title": "Carico il file completo perché lo strumento semplifica l’analisi.",
          "correct": false
        },
        {
          "title": "Rinomino il file, ma lascio nomi e indirizzi email nelle righe.",
          "correct": false
        },
        {
          "title": "Verifico le regole e uso solo i dati necessari in uno strumento approvato.",
          "correct": true
        },
        {
          "title": "Converto il file in PDF e mantengo tutte le informazioni originali.",
          "correct": false
        }
      ],
      "feedback": "Cambiare nome o formato non protegge i dati. Prima controlla se puoi usarli in quello strumento e quali informazioni servono davvero."
    },
    {
      "id": "N_A_DAT_2",
      "formId": "A",
      "objectiveId": "DAT-2",
      "learningUnitId": "U-DAT-2",
      "type": "scenario",
      "language": "it",
      "text": "Usi l'AI per preparare un documento che verrà inviato all'esterno. Chi mantiene la responsabilità finale?",
      "options": [
        {
          "title": "Il modello, perché ha scritto buona parte del documento.",
          "correct": false
        },
        {
          "title": "Il fornitore del servizio, perché mette a disposizione lo strumento.",
          "correct": false
        },
        {
          "title": "Chi rivede e usa il documento.",
          "correct": true
        },
        {
          "title": "Chi ha avviato la richiesta iniziale, anche se altri decidono l’invio.",
          "correct": false
        }
      ],
      "feedback": "La responsabilità finale resta a chi controlla il documento e decide di usarlo o inviarlo."
    },
    {
      "id": "N_B_CAP_1",
      "formId": "B",
      "objectiveId": "CAP-1",
      "learningUnitId": "U-CAP-1",
      "type": "knowledge",
      "language": "it",
      "text": "Un'AI riassume un articolo che hai incollato nella conversazione. Che cosa puoi concludere?",
      "options": [
        {
          "title": "Ha confrontato il contenuto dell’articolo con altre fonti online.",
          "correct": false
        },
        {
          "title": "Ha riassunto il testo che le ho dato.",
          "correct": true
        },
        {
          "title": "Ha verificato le affermazioni dell’articolo prima di scrivere il riassunto.",
          "correct": false
        },
        {
          "title": "Ha memorizzato l’articolo.",
          "correct": false
        }
      ],
      "feedback": "Un riassunto rielabora il testo fornito. Da solo non dimostra una ricerca o una verifica indipendente."
    },
    {
      "id": "N_B_CAP_2",
      "formId": "B",
      "objectiveId": "CAP-2",
      "learningUnitId": "U-CAP-2",
      "type": "scenario",
      "language": "it",
      "text": "Devi scrivere una prima bozza di email. Quale collaborazione con l'AI è più appropriata?",
      "options": [
        {
          "title": "Do scopo, destinatario e tono. Prima di inviare verifico i fatti e chi riceverà il messaggio.",
          "correct": true
        },
        {
          "title": "Le faccio indovinare destinatario e scopo dal mio ruolo in azienda.",
          "correct": false
        },
        {
          "title": "Invio la prima bozza se il testo è scritto bene e non contiene refusi.",
          "correct": false
        },
        {
          "title": "Le chiedo di preparare la bozza e di decidere al posto mio quando inviarla.",
          "correct": false
        }
      ],
      "feedback": "Dare indicazioni rende la prima bozza più pertinente. La rilettura prima dell’invio resta utile per controllare contenuto e destinatari."
    },
    {
      "id": "N_B_LIM_1",
      "formId": "B",
      "objectiveId": "LIM-1",
      "learningUnitId": "U-LIM-1",
      "type": "scenario",
      "language": "it",
      "text": "Una citazione generata contiene autore, anno e titolo completi. Che cosa dimostrano questi dettagli?",
      "options": [
        {
          "title": "Che la pubblicazione è identificata con certezza dal titolo indicato.",
          "correct": false
        },
        {
          "title": "Che il modello ha letto la pubblicazione che cita.",
          "correct": false
        },
        {
          "title": "Che la citazione sembra plausibile e va verificata.",
          "correct": true
        },
        {
          "title": "Che le affermazioni associate alla citazione sono riportate correttamente.",
          "correct": false
        }
      ],
      "feedback": "Autore, anno e titolo possono sembrare precisi anche quando il riferimento è sbagliato. Cerca la pubblicazione e leggila."
    },
    {
      "id": "N_B_LIM_2",
      "formId": "B",
      "objectiveId": "LIM-2",
      "learningUnitId": "U-LIM-2",
      "type": "scenario",
      "language": "it",
      "text": "Chiedi all'AI di confrontare prodotti i cui prezzi e caratteristiche cambiano spesso. Quale cautela è essenziale?",
      "options": [
        {
          "title": "Controllo le fonti e la data dei dati.",
          "correct": true
        },
        {
          "title": "Scelgo la tabella più ricca.",
          "correct": false
        },
        {
          "title": "Mi fido della tabella se le righe sono complete e i prezzi sono precisi.",
          "correct": false
        },
        {
          "title": "Chiedo di fare una classifica unica senza indicare dati incerti.",
          "correct": false
        }
      ],
      "feedback": "Per confrontare prezzi e caratteristiche che cambiano, controlla da dove vengono i dati e a quale data si riferiscono."
    },
    {
      "id": "N_B_REQ_1",
      "formId": "B",
      "objectiveId": "REQ-1",
      "learningUnitId": "U-REQ-1",
      "type": "scenario",
      "language": "it",
      "text": "Vuoi trasformare alcuni appunti in una tabella operativa. Quale richiesta offre il contesto migliore?",
      "options": [
        {
          "title": "Organizza gli appunti in una tabella breve.",
          "correct": false
        },
        {
          "title": "Usa Attività, Responsabile e Scadenza. Segna i dati mancanti.",
          "correct": true
        },
        {
          "title": "Completa ogni riga usando stime quando dagli appunti manca un dato.",
          "correct": false
        },
        {
          "title": "Usa pure le colonne che preferisci, purché la tabella sia facile da leggere.",
          "correct": false
        }
      ],
      "feedback": "Specificare le colonne rende il risultato riutilizzabile. Segnalare i dati mancanti evita di scambiare una stima per un fatto."
    },
    {
      "id": "N_B_REQ_2",
      "formId": "B",
      "objectiveId": "REQ-2",
      "learningUnitId": "U-REQ-2",
      "type": "scenario",
      "language": "it",
      "text": "L'AI restituisce il contenuto giusto nel formato sbagliato. Come procedi?",
      "options": [
        {
          "title": "Scarto il contenuto e faccio riscrivere tutto senza spiegare il motivo.",
          "correct": false
        },
        {
          "title": "Chiedo di mantenere il contenuto e mostro il formato atteso.",
          "correct": true
        },
        {
          "title": "Chiedo una revisione generale.",
          "correct": false
        },
        {
          "title": "Uso la versione ricevuta perché le informazioni principali sono corrette.",
          "correct": false
        }
      ],
      "feedback": "Se il contenuto va bene, chiedi una correzione mirata al formato. Un esempio aiuta a capire che cosa vuoi ottenere."
    },
    {
      "id": "N_B_VER_1",
      "formId": "B",
      "objectiveId": "VER-1",
      "learningUnitId": "U-VER-1",
      "type": "scenario",
      "language": "it",
      "text": "L'AI indica una percentuale da usare in una presentazione. Qual è una verifica indipendente?",
      "options": [
        {
          "title": "Chiedo al modello di ripetere la percentuale e di indicare quanto è sicuro.",
          "correct": false
        },
        {
          "title": "Cerco il rapporto originale e controllo periodo e campione.",
          "correct": true
        },
        {
          "title": "Controllo come appare il dato nella slide.",
          "correct": false
        },
        {
          "title": "Confronto la percentuale con ciò che mi aspettavo prima di fare la richiesta.",
          "correct": false
        }
      ],
      "feedback": "Il rapporto originale aiuta a controllare se la percentuale riguarda le persone e il periodo che ti interessano."
    },
    {
      "id": "N_B_VER_2",
      "formId": "B",
      "objectiveId": "VER-2",
      "learningUnitId": "U-VER-2",
      "type": "scenario",
      "language": "it",
      "text": "Quale attività richiede più controllo umano?",
      "options": [
        {
          "title": "Trovare nomi provvisori per cartelle che uso solo per i miei appunti.",
          "correct": false
        },
        {
          "title": "Scrivere frasi alternative per un esercizio che non dovrà essere pubblicato.",
          "correct": false
        },
        {
          "title": "Proporre una decisione di spesa che potrebbe impegnare parte del bilancio dell’organizzazione.",
          "correct": true
        },
        {
          "title": "Preparare idee da discutere internamente, lasciando aperta la scelta.",
          "correct": false
        }
      ],
      "feedback": "Una decisione di spesa può impegnare risorse reali. Chi decide deve verificare dati e conseguenze prima di approvarla."
    },
    {
      "id": "N_B_DAT_1",
      "formId": "B",
      "objectiveId": "DAT-1",
      "learningUnitId": "U-DAT-1",
      "type": "scenario",
      "language": "it",
      "text": "Devi sintetizzare curriculum ricevuti per una selezione. Qual è il primo controllo?",
      "options": [
        {
          "title": "Controllo autorizzazioni, strumento e dati necessari.",
          "correct": true
        },
        {
          "title": "Carico i curriculum completi e cancello le copie locali una volta finito.",
          "correct": false
        },
        {
          "title": "Rimuovo le foto ma lascio nomi, indirizzi e altri dati che non servono.",
          "correct": false
        },
        {
          "title": "Uso un account personale per separare i documenti da quelli già in azienda.",
          "correct": false
        }
      ],
      "feedback": "I curriculum contengono dati personali. Prima di usarli, verifica per quale scopo sei autorizzato e quali informazioni servono davvero."
    },
    {
      "id": "N_B_DAT_2",
      "formId": "B",
      "objectiveId": "DAT-2",
      "learningUnitId": "U-DAT-2",
      "type": "scenario",
      "language": "it",
      "text": "L'AI genera un'immagine per una campagna. Prima di pubblicarla, quale comportamento è più responsabile?",
      "options": [
        {
          "title": "Controllo colori e formato, perché sono gli aspetti più visibili della campagna.",
          "correct": false
        },
        {
          "title": "Controllo se l’immagine è adatta, se compaiono persone o opere riconoscibili e quali regole si applicano.",
          "correct": true
        },
        {
          "title": "Do per scontato di poterla pubblicare perché l’ho generata con il mio account.",
          "correct": false
        },
        {
          "title": "Aggiungo la dicitura «creata con AI» e la considero una verifica sufficiente.",
          "correct": false
        }
      ],
      "feedback": "Prima di pubblicare, valuta se l’immagine è adatta e se ci sono persone, opere o marchi riconoscibili. Controlla anche le regole applicabili."
    },
    {
      "id": "N_C_CAP_1",
      "formId": "C",
      "objectiveId": "CAP-1",
      "learningUnitId": "U-CAP-1",
      "type": "knowledge",
      "language": "it",
      "text": "Chiedi a un sistema generativo di creare l'immagine di una città immaginaria. Quale descrizione è più corretta?",
      "options": [
        {
          "title": "Recupera una foto della città da un archivio.",
          "correct": false
        },
        {
          "title": "Genera un’immagine dalla richiesta e da ciò che ha imparato.",
          "correct": true
        },
        {
          "title": "Combina immagini in diretta di città reali fino a trovare la più simile.",
          "correct": false
        },
        {
          "title": "Controlla che i dettagli disegnati rispettino le regole del mondo reale.",
          "correct": false
        }
      ],
      "feedback": "L’AI può creare un’immagine nuova anche se la città non esiste. I dettagli disegnati possono sembrare realistici senza esserlo."
    },
    {
      "id": "N_C_CAP_2",
      "formId": "C",
      "objectiveId": "CAP-2",
      "learningUnitId": "U-CAP-2",
      "type": "scenario",
      "language": "it",
      "text": "Devi organizzare un'attività con diversi vincoli. Come può aiutarti l'AI senza sostituire la decisione?",
      "options": [
        {
          "title": "Propone alternative con vantaggi e limiti.",
          "correct": true
        },
        {
          "title": "Sceglie subito l’opzione finale anche se non conosce le persone coinvolte.",
          "correct": false
        },
        {
          "title": "Organizza l’attività senza che io dica quali impegni non si possono spostare.",
          "correct": false
        },
        {
          "title": "Tratto la prima proposta come definitiva.",
          "correct": false
        }
      ],
      "feedback": "Avere più alternative aiuta a confrontare i compromessi. La scelta finale resta a chi conosce le persone e gli impegni."
    },
    {
      "id": "N_C_LIM_1",
      "formId": "C",
      "objectiveId": "LIM-1",
      "learningUnitId": "U-LIM-1",
      "type": "scenario",
      "language": "it",
      "text": "Domandi \"Sei sicuro?\" e l'AI conferma la risposta con tono ancora più deciso. Che cosa è cambiato?",
      "options": [
        {
          "title": "La seconda risposta costituisce una conferma indipendente della prima.",
          "correct": false
        },
        {
          "title": "Il tono più deciso mostra che il modello ha verificato una fonte esterna.",
          "correct": false
        },
        {
          "title": "Il tono è cambiato. Per verificare la risposta devo ancora controllare una fonte indipendente.",
          "correct": true
        },
        {
          "title": "Se la formulazione è più sicura, è ragionevole ridurre i controlli.",
          "correct": false
        }
      ],
      "feedback": "Lo stesso sistema può ripetere un errore con parole più decise. Per verificarlo, cerca una fonte diversa o controlla i dati originali."
    },
    {
      "id": "N_C_LIM_2",
      "formId": "C",
      "objectiveId": "LIM-2",
      "learningUnitId": "U-LIM-2",
      "type": "scenario",
      "language": "it",
      "text": "Chiedi informazioni su una procedura interna che non hai fornito al modello. Qual è il rischio principale?",
      "options": [
        {
          "title": "Che chieda più dettagli prima di rispondere.",
          "correct": false
        },
        {
          "title": "Che inventi una procedura plausibile ma diversa da quella reale.",
          "correct": true
        },
        {
          "title": "Che recuperi il documento aziendale corretto dal nome della procedura.",
          "correct": false
        },
        {
          "title": "Che usi una procedura generica e la presenti come un esempio, dichiarandolo.",
          "correct": false
        }
      ],
      "feedback": "Se il sistema non ha il documento, può colmare il vuoto con una risposta credibile. Per sapere cosa fare serve la procedura approvata."
    },
    {
      "id": "N_C_REQ_1",
      "formId": "C",
      "objectiveId": "REQ-1",
      "learningUnitId": "U-REQ-1",
      "type": "scenario",
      "language": "it",
      "text": "Vuoi un messaggio breve per rinviare una riunione. Quale richiesta è più controllabile?",
      "options": [
        {
          "title": "Scrivi un messaggio cortese che proponga una nuova data a tua scelta.",
          "correct": false
        },
        {
          "title": "In 60 parole, rinvia la riunione senza inventare date o motivi.",
          "correct": true
        },
        {
          "title": "Scrivi un messaggio formale e inventa una motivazione se serve a renderlo credibile.",
          "correct": false
        },
        {
          "title": "Comunica il rinvio nel formato che preferisci.",
          "correct": false
        }
      ],
      "feedback": "Indicare lunghezza e informazioni da lasciare aperte aiuta a ottenere un messaggio che non prometta date né attribuisca motivi inventati."
    },
    {
      "id": "N_C_REQ_2",
      "formId": "C",
      "objectiveId": "REQ-2",
      "learningUnitId": "U-REQ-2",
      "type": "scenario",
      "language": "it",
      "text": "L’AI ha risposto dando per scontata un’informazione sbagliata. Che cosa fai?",
      "options": [
        {
          "title": "Correggo il presupposto e chiedo di rivedere le parti coinvolte.",
          "correct": true
        },
        {
          "title": "Aggiungo solo la mia preferenza.",
          "correct": false
        },
        {
          "title": "Chiedo di ampliare la risposta, senza dire quale informazione è sbagliata.",
          "correct": false
        },
        {
          "title": "Tengo la risposta e correggo solo la frase in cui compare l’errore.",
          "correct": false
        }
      ],
      "feedback": "Un presupposto errato può cambiare anche le conclusioni. Chiedere di riesaminarle aiuta a correggere tutto ciò che ne dipende."
    },
    {
      "id": "N_C_VER_1",
      "formId": "C",
      "objectiveId": "VER-1",
      "learningUnitId": "U-VER-1",
      "type": "scenario",
      "language": "it",
      "text": "L'AI descrive un obbligo previsto da una norma. Prima di agire, quale controllo è più solido?",
      "options": [
        {
          "title": "Controllo la norma vigente e a chi si applica.",
          "correct": true
        },
        {
          "title": "Mi affido alla spiegazione se cita i termini giuridici corretti e l’articolo.",
          "correct": false
        },
        {
          "title": "Chiedo al modello una formulazione più formale per capire se è coerente.",
          "correct": false
        },
        {
          "title": "Rileggo il numero di articolo.",
          "correct": false
        }
      ],
      "feedback": "Prima di agire, controlla il testo vigente, la data e se la norma vale per il tuo caso. Se le conseguenze contano, chiedi supporto competente."
    },
    {
      "id": "N_C_VER_2",
      "formId": "C",
      "objectiveId": "VER-2",
      "learningUnitId": "U-VER-2",
      "type": "scenario",
      "language": "it",
      "text": "Quale risultato richiede più controlli prima di essere usato?",
      "options": [
        {
          "title": "Una bozza di trama per un racconto che tengo per me.",
          "correct": false
        },
        {
          "title": "Un consiglio sulla salute da dare a una persona.",
          "correct": true
        },
        {
          "title": "Una lista di nomi per personaggi che posso cambiare in seguito.",
          "correct": false
        },
        {
          "title": "Un elenco provvisorio di film da vedere con amici nel fine settimana.",
          "correct": false
        }
      ],
      "feedback": "Un consiglio sulla salute può avere conseguenze sulla persona. Merita controlli più rigorosi di un’idea creativa o reversibile."
    },
    {
      "id": "N_C_DAT_1",
      "formId": "C",
      "objectiveId": "DAT-1",
      "learningUnitId": "U-DAT-1",
      "type": "scenario",
      "language": "it",
      "text": "Vuoi far riassumere il verbale di una riunione interna. Qual è il comportamento più prudente?",
      "options": [
        {
          "title": "Uso il mio chatbot preferito perché il verbale è già in formato testo.",
          "correct": false
        },
        {
          "title": "Controllo se posso condividerlo, quale strumento è approvato e quali informazioni posso togliere.",
          "correct": true
        },
        {
          "title": "Cambio i nomi delle persone ma lascio gli altri dettagli identificativi.",
          "correct": false
        },
        {
          "title": "Aggiungo «contenuto riservato» prima di incollare il verbale completo.",
          "correct": false
        }
      ],
      "feedback": "Un verbale può contenere informazioni riservate anche senza nomi. Controlla autorizzazioni, strumento e dati strettamente necessari."
    },
    {
      "id": "N_C_DAT_2",
      "formId": "C",
      "objectiveId": "DAT-2",
      "learningUnitId": "U-DAT-2",
      "type": "scenario",
      "language": "it",
      "text": "Un collega vuole usare senza controlli una raccomandazione prodotta dall'AI. Qual è la risposta più responsabile?",
      "options": [
        {
          "title": "Usala se ti sembra ragionevole e cita il modello come responsabile.",
          "correct": false
        },
        {
          "title": "Rivediamo dati e conseguenze prima di decidere.",
          "correct": true
        },
        {
          "title": "Chiediamo al modello se conferma.",
          "correct": false
        },
        {
          "title": "Usiamo la raccomandazione come ricevuta, indicando solo che è stata generata con AI.",
          "correct": false
        }
      ],
      "feedback": "Dire che una proposta viene dall’AI non trasferisce la responsabilità. Chi decide deve controllarne dati, presupposti e possibili conseguenze."
    }
  ],
  "en": [
    {
      "id": "N_A_CAP_1",
      "formId": "A",
      "objectiveId": "CAP-1",
      "learningUnitId": "U-CAP-1",
      "type": "knowledge",
      "language": "en",
      "text": "Which description best represents what a generative AI system does when responding to a request?",
      "options": [
        {
          "title": "It searches for a web page that matches the request.",
          "correct": false
        },
        {
          "title": "It creates an answer using the request and what it learned.",
          "correct": true
        },
        {
          "title": "It picks a ready-made answer from an archive built during training.",
          "correct": false
        },
        {
          "title": "It checks each claim against outside sources before it answers.",
          "correct": false
        }
      ],
      "feedback": "Creating an answer uses what the system has learned. To know whether it also searched or checked something, look for evidence of those steps."
    },
    {
      "id": "N_A_CAP_2",
      "formId": "A",
      "objectiveId": "CAP-2",
      "learningUnitId": "U-CAP-2",
      "type": "scenario",
      "language": "en",
      "text": "You need ideas for a team meeting. What is the most useful first use of AI?",
      "options": [
        {
          "title": "Ask for several ideas and compare them with the constraints.",
          "correct": true
        },
        {
          "title": "Ask AI to pick for the group.",
          "correct": false
        },
        {
          "title": "Bring the first idea and wait until the meeting to compare it with the goal.",
          "correct": false
        },
        {
          "title": "Request one idea without saying what the team needs to achieve.",
          "correct": false
        }
      ],
      "feedback": "Comparing several ideas makes trade-offs visible. The team can decide with constraints the AI might not know about."
    },
    {
      "id": "N_A_LIM_1",
      "formId": "A",
      "objectiveId": "LIM-1",
      "learningUnitId": "U-LIM-1",
      "type": "scenario",
      "language": "en",
      "text": "A chatbot gives a very precise number but does not say where it came from. How should you treat it?",
      "options": [
        {
          "title": "Use it because the decimal places suggest a precise calculation.",
          "correct": false
        },
        {
          "title": "Trust it because the chatbot states the number with confidence.",
          "correct": false
        },
        {
          "title": "Check it before using it.",
          "correct": true
        },
        {
          "title": "Discard it because a chatbot cannot give accurate numbers.",
          "correct": false
        }
      ],
      "feedback": "Precision and confident wording do not tell you where the number came from. Find the source or redo the calculation with the original data."
    },
    {
      "id": "N_A_LIM_2",
      "formId": "A",
      "objectiveId": "LIM-2",
      "learningUnitId": "U-LIM-2",
      "type": "scenario",
      "language": "en",
      "text": "You want a rule or opening time that may have changed recently. What do you do?",
      "options": [
        {
          "title": "Trust the answer if it gives a precise rule or opening time.",
          "correct": false
        },
        {
          "title": "Ask AI if the answer is current.",
          "correct": false
        },
        {
          "title": "Check an official source and the date.",
          "correct": true
        },
        {
          "title": "Use the version with the most detail the model can provide.",
          "correct": false
        }
      ],
      "feedback": "An official source and its effective date show whether the rule or opening time still applies."
    },
    {
      "id": "N_A_REQ_1",
      "formId": "A",
      "objectiveId": "REQ-1",
      "learningUnitId": "U-REQ-1",
      "type": "scenario",
      "language": "en",
      "text": "You want a text summarized for people who are new to the subject. Which request is most useful?",
      "options": [
        {
          "title": "Summarize it in five points.",
          "correct": false
        },
        {
          "title": "Highlight the details that would interest a reader who already knows the subject.",
          "correct": false
        },
        {
          "title": "Summarize in five points for someone new to the subject.",
          "correct": true
        },
        {
          "title": "Shorten the text and keep the original level of technical detail.",
          "correct": false
        }
      ],
      "feedback": "Naming the audience and the length helps the AI decide what to explain and what to leave out."
    },
    {
      "id": "N_A_REQ_2",
      "formId": "A",
      "objectiveId": "REQ-2",
      "learningUnitId": "U-REQ-2",
      "type": "scenario",
      "language": "en",
      "text": "The first AI response is generic. What is the most useful next step?",
      "options": [
        {
          "title": "Repeat the same request and select the most detailed answer.",
          "correct": false
        },
        {
          "title": "Say what is missing and add the relevant background.",
          "correct": true
        },
        {
          "title": "Keep the answer and change only its tone, leaving the content as it is.",
          "correct": false
        },
        {
          "title": "Send the same request to a different tool.",
          "correct": false
        }
      ],
      "feedback": "Pointing out what is missing directs the revision. Repeating the same request leaves the problem unresolved."
    },
    {
      "id": "N_A_VER_1",
      "formId": "A",
      "objectiveId": "VER-1",
      "learningUnitId": "U-VER-1",
      "type": "scenario",
      "language": "en",
      "text": "AI suggests the title, author, and link of a source. What do you do before citing it?",
      "options": [
        {
          "title": "Cite the source with the author, title, and link that AI supplied.",
          "correct": false
        },
        {
          "title": "Open the source, check that it is the publication cited, and read whether it supports the claim.",
          "correct": true
        },
        {
          "title": "Ask the same chatbot to confirm that the citation is accurate.",
          "correct": false
        },
        {
          "title": "Check that the website is reputable without reading the publication.",
          "correct": false
        }
      ],
      "feedback": "A real link can lead to a publication that does not support your claim. Check both the publication and what it says."
    },
    {
      "id": "N_A_VER_2",
      "formId": "A",
      "objectiveId": "VER-2",
      "learningUnitId": "U-VER-2",
      "type": "scenario",
      "language": "en",
      "text": "Which case requires a more rigorous review of AI output?",
      "options": [
        {
          "title": "A private list of possible names for a playlist.",
          "correct": false
        },
        {
          "title": "An official notice that changes a procedure for the public.",
          "correct": true
        },
        {
          "title": "A list of ideas to discuss at the next internal meeting.",
          "correct": false
        },
        {
          "title": "A writing exercise kept in your personal notes.",
          "correct": false
        }
      ],
      "feedback": "An official notice can change what other people do. Its errors have more serious consequences and deserve closer review."
    },
    {
      "id": "N_A_DAT_1",
      "formId": "A",
      "objectiveId": "DAT-1",
      "learningUnitId": "U-DAT-1",
      "type": "scenario",
      "language": "en",
      "text": "You need to analyze a list containing customer names, emails, and notes. What do you do before uploading it to an AI tool?",
      "options": [
        {
          "title": "Upload the full list because the tool makes the analysis easier.",
          "correct": false
        },
        {
          "title": "Rename the file but leave the names and email addresses in its rows.",
          "correct": false
        },
        {
          "title": "Check the rules and share only needed data in an approved tool.",
          "correct": true
        },
        {
          "title": "Convert the list to PDF and keep all the original information.",
          "correct": false
        }
      ],
      "feedback": "Renaming or converting the file does not protect the data. Check what you may share and which pieces are actually needed."
    },
    {
      "id": "N_A_DAT_2",
      "formId": "A",
      "objectiveId": "DAT-2",
      "learningUnitId": "U-DAT-2",
      "type": "scenario",
      "language": "en",
      "text": "You use AI to prepare a document that will be sent externally. Who retains final responsibility?",
      "options": [
        {
          "title": "The model, because it wrote much of the document.",
          "correct": false
        },
        {
          "title": "The provider, because it makes the tool available.",
          "correct": false
        },
        {
          "title": "Whoever reviews and uses the document.",
          "correct": true
        },
        {
          "title": "The person who sent the first request, even if others approve the release.",
          "correct": false
        }
      ],
      "feedback": "Final responsibility stays with whoever checks the document and decides to use or send it."
    },
    {
      "id": "N_B_CAP_1",
      "formId": "B",
      "objectiveId": "CAP-1",
      "learningUnitId": "U-CAP-1",
      "type": "knowledge",
      "language": "en",
      "text": "AI summarizes an article you pasted into the conversation. What can you conclude?",
      "options": [
        {
          "title": "It compared the article with other sources available on the web.",
          "correct": false
        },
        {
          "title": "It summarized the text I provided.",
          "correct": true
        },
        {
          "title": "It verified the article’s claims before writing the summary.",
          "correct": false
        },
        {
          "title": "It memorized the article.",
          "correct": false
        }
      ],
      "feedback": "A summary reworks the supplied text. On its own it does not show that the system researched or independently verified the claims."
    },
    {
      "id": "N_B_CAP_2",
      "formId": "B",
      "objectiveId": "CAP-2",
      "learningUnitId": "U-CAP-2",
      "type": "scenario",
      "language": "en",
      "text": "You need a first email draft. Which collaboration with AI is most appropriate?",
      "options": [
        {
          "title": "Give the purpose, recipient, and tone. Before sending, check the facts and who will receive it.",
          "correct": true
        },
        {
          "title": "Let it infer the purpose and recipient from my role at work.",
          "correct": false
        },
        {
          "title": "Send the first draft if it reads well and has no spelling mistakes.",
          "correct": false
        },
        {
          "title": "Ask it to draft the email and choose when to send it for me.",
          "correct": false
        }
      ],
      "feedback": "Giving clear directions improves the draft. Reading it before sending helps you check the facts and recipient."
    },
    {
      "id": "N_B_LIM_1",
      "formId": "B",
      "objectiveId": "LIM-1",
      "learningUnitId": "U-LIM-1",
      "type": "scenario",
      "language": "en",
      "text": "A generated citation includes a complete author, year, and title. What do those details prove?",
      "options": [
        {
          "title": "That the title identifies an existing publication with certainty.",
          "correct": false
        },
        {
          "title": "That the AI read the publication it cites.",
          "correct": false
        },
        {
          "title": "That the citation looks plausible and needs checking.",
          "correct": true
        },
        {
          "title": "That any claim linked to this citation matches the original publication.",
          "correct": false
        }
      ],
      "feedback": "An author, year, and title can look precise even if the citation is wrong. Find and read the actual publication."
    },
    {
      "id": "N_B_LIM_2",
      "formId": "B",
      "objectiveId": "LIM-2",
      "learningUnitId": "U-LIM-2",
      "type": "scenario",
      "language": "en",
      "text": "You ask AI to compare products whose prices and features change often. Which precaution is essential?",
      "options": [
        {
          "title": "Check the sources and dates of the data.",
          "correct": true
        },
        {
          "title": "Choose the most detailed table.",
          "correct": false
        },
        {
          "title": "Trust the table if all rows are filled and its prices look precise.",
          "correct": false
        },
        {
          "title": "Ask for a single ranking that leaves out uncertain data.",
          "correct": false
        }
      ],
      "feedback": "Prices and features change. Check where the comparison data came from and when it was current."
    },
    {
      "id": "N_B_REQ_1",
      "formId": "B",
      "objectiveId": "REQ-1",
      "learningUnitId": "U-REQ-1",
      "type": "scenario",
      "language": "en",
      "text": "You want to turn notes into an operational table. Which request provides the best context?",
      "options": [
        {
          "title": "Arrange the notes in a short table.",
          "correct": false
        },
        {
          "title": "Use Task, Owner, and Deadline. Mark missing details.",
          "correct": true
        },
        {
          "title": "Fill every row by estimating details that are missing from the notes.",
          "correct": false
        },
        {
          "title": "Use any columns you prefer, as long as the table is easy to read.",
          "correct": false
        }
      ],
      "feedback": "Naming the columns makes the table usable. Marking gaps prevents an estimate from being mistaken for a fact."
    },
    {
      "id": "N_B_REQ_2",
      "formId": "B",
      "objectiveId": "REQ-2",
      "learningUnitId": "U-REQ-2",
      "type": "scenario",
      "language": "en",
      "text": "AI returns the right content in the wrong format. What do you do?",
      "options": [
        {
          "title": "Discard it and have everything rewritten without explaining why.",
          "correct": false
        },
        {
          "title": "Keep the content and show the format I need.",
          "correct": true
        },
        {
          "title": "Ask for a general revision.",
          "correct": false
        },
        {
          "title": "Use the original version because the key information is correct.",
          "correct": false
        }
      ],
      "feedback": "When the content is useful, ask for a change to the format. An example shows what the revised version should look like."
    },
    {
      "id": "N_B_VER_1",
      "formId": "B",
      "objectiveId": "VER-1",
      "learningUnitId": "U-VER-1",
      "type": "scenario",
      "language": "en",
      "text": "AI gives you a percentage for a presentation. What counts as an independent check?",
      "options": [
        {
          "title": "Ask the same model to repeat the percentage and state its confidence.",
          "correct": false
        },
        {
          "title": "Find the original report and check the period and sample.",
          "correct": true
        },
        {
          "title": "Check how the number looks on the slide.",
          "correct": false
        },
        {
          "title": "Compare the percentage with what I expected before making the request.",
          "correct": false
        }
      ],
      "feedback": "The original report lets you check whether the percentage covers the people and time period you need."
    },
    {
      "id": "N_B_VER_2",
      "formId": "B",
      "objectiveId": "VER-2",
      "learningUnitId": "U-VER-2",
      "type": "scenario",
      "language": "en",
      "text": "Which activity requires more human oversight?",
      "options": [
        {
          "title": "Generate temporary folder names for my personal notes.",
          "correct": false
        },
        {
          "title": "Write alternative sentences for an exercise that will stay private.",
          "correct": false
        },
        {
          "title": "Propose a spending decision that could commit part of the organization’s budget.",
          "correct": true
        },
        {
          "title": "Prepare ideas for an internal discussion where the decision is still open.",
          "correct": false
        }
      ],
      "feedback": "Spending can commit real resources. Whoever decides should check the evidence and consequences before approving it."
    },
    {
      "id": "N_B_DAT_1",
      "formId": "B",
      "objectiveId": "DAT-1",
      "learningUnitId": "U-DAT-1",
      "type": "scenario",
      "language": "en",
      "text": "You need to summarize resumes received for recruitment. What is the first check?",
      "options": [
        {
          "title": "Check permission, the tool, and which details I need.",
          "correct": true
        },
        {
          "title": "Upload the full résumés and delete the local copies afterwards.",
          "correct": false
        },
        {
          "title": "Remove photos but keep names, addresses, and other details I do not need.",
          "correct": false
        },
        {
          "title": "Use a personal account to separate these files from those already at work.",
          "correct": false
        }
      ],
      "feedback": "Résumés contain personal information. Check what you are allowed to use, for which purpose, and which details you need."
    },
    {
      "id": "N_B_DAT_2",
      "formId": "B",
      "objectiveId": "DAT-2",
      "learningUnitId": "U-DAT-2",
      "type": "scenario",
      "language": "en",
      "text": "AI generates an image for a campaign. What is the most responsible action before publishing it?",
      "options": [
        {
          "title": "Check colors and dimensions because they are the most visible campaign details.",
          "correct": false
        },
        {
          "title": "Check whether the image is suitable, whether it shows recognizable people or works, and which rules apply.",
          "correct": true
        },
        {
          "title": "Assume I can publish it because I generated it with my own account.",
          "correct": false
        },
        {
          "title": "Add an “AI-generated” label and consider that enough to publish it.",
          "correct": false
        }
      ],
      "feedback": "Before publishing, check whether the image is suitable and whether it includes recognizable people, works, or brands. Check which rules apply."
    },
    {
      "id": "N_C_CAP_1",
      "formId": "C",
      "objectiveId": "CAP-1",
      "learningUnitId": "U-CAP-1",
      "type": "knowledge",
      "language": "en",
      "text": "You ask a generative system to create an image of an imaginary city. Which description is most accurate?",
      "options": [
        {
          "title": "Copy a photo of the city from an archive.",
          "correct": false
        },
        {
          "title": "Creates an image from the request and patterns it has learned.",
          "correct": true
        },
        {
          "title": "Combines live pictures of real cities until it finds the closest match.",
          "correct": false
        },
        {
          "title": "Checks whether the buildings and signs it draws follow real-world rules.",
          "correct": false
        }
      ],
      "feedback": "AI can create an image of a city that does not exist. Its details may look real even when they are not."
    },
    {
      "id": "N_C_CAP_2",
      "formId": "C",
      "objectiveId": "CAP-2",
      "learningUnitId": "U-CAP-2",
      "type": "scenario",
      "language": "en",
      "text": "You need to organize an activity with several constraints. How can AI help without replacing the decision?",
      "options": [
        {
          "title": "Offer alternatives with benefits and drawbacks.",
          "correct": true
        },
        {
          "title": "Pick the final option without needing to know the people involved.",
          "correct": false
        },
        {
          "title": "Arrange everything without first asking which commitments cannot move.",
          "correct": false
        },
        {
          "title": "Treat the first proposal as final.",
          "correct": false
        }
      ],
      "feedback": "Alternatives help you compare trade-offs. The final choice stays with the people who know the commitments and priorities."
    },
    {
      "id": "N_C_LIM_1",
      "formId": "C",
      "objectiveId": "LIM-1",
      "learningUnitId": "U-LIM-1",
      "type": "scenario",
      "language": "en",
      "text": "You ask \"Are you sure?\" and AI confirms the answer even more confidently. What changed?",
      "options": [
        {
          "title": "The second answer is independent confirmation of the first one.",
          "correct": false
        },
        {
          "title": "The stronger wording means the model has checked an outside source.",
          "correct": false
        },
        {
          "title": "The wording changed. To check the answer, I still need to look at an independent source.",
          "correct": true
        },
        {
          "title": "The more confident phrasing means I can reasonably do fewer checks.",
          "correct": false
        }
      ],
      "feedback": "The same system can repeat an error in stronger words. Check a separate source or the original data."
    },
    {
      "id": "N_C_LIM_2",
      "formId": "C",
      "objectiveId": "LIM-2",
      "learningUnitId": "U-LIM-2",
      "type": "scenario",
      "language": "en",
      "text": "You ask about an internal procedure that you did not provide to the model. What is the main risk?",
      "options": [
        {
          "title": "It may ask for details before answering.",
          "correct": false
        },
        {
          "title": "It may invent a plausible procedure that differs from the real one.",
          "correct": true
        },
        {
          "title": "It may retrieve the correct internal document from the procedure’s name.",
          "correct": false
        },
        {
          "title": "It may give a generic procedure and clearly label it as an example.",
          "correct": false
        }
      ],
      "feedback": "Without the document, AI can fill in gaps with a convincing answer. Use the approved procedure to decide what to do."
    },
    {
      "id": "N_C_REQ_1",
      "formId": "C",
      "objectiveId": "REQ-1",
      "learningUnitId": "U-REQ-1",
      "type": "scenario",
      "language": "en",
      "text": "You want a short message to postpone a meeting. Which request is easiest to control?",
      "options": [
        {
          "title": "Write a polite message that proposes a new date of your choice.",
          "correct": false
        },
        {
          "title": "In 60 words, postpone the meeting without inventing dates or reasons.",
          "correct": true
        },
        {
          "title": "Write a formal message and invent a reason if that makes it convincing.",
          "correct": false
        },
        {
          "title": "Announce the postponement in any format.",
          "correct": false
        }
      ],
      "feedback": "Specify the length and what is unknown. This helps AI avoid promising dates or giving invented reasons."
    },
    {
      "id": "N_C_REQ_2",
      "formId": "C",
      "objectiveId": "REQ-2",
      "learningUnitId": "U-REQ-2",
      "type": "scenario",
      "language": "en",
      "text": "AI bases its answer on a wrong assumption. What do you do?",
      "options": [
        {
          "title": "Correct the assumption and ask it to revise affected parts.",
          "correct": true
        },
        {
          "title": "Add only my preference.",
          "correct": false
        },
        {
          "title": "Ask for a fuller answer without saying what information is wrong.",
          "correct": false
        },
        {
          "title": "Keep the answer and correct only the sentence where the error appears.",
          "correct": false
        }
      ],
      "feedback": "A mistaken assumption can affect the conclusions too. Reviewing the parts that depend on it corrects more than the original sentence."
    },
    {
      "id": "N_C_VER_1",
      "formId": "C",
      "objectiveId": "VER-1",
      "learningUnitId": "U-VER-1",
      "type": "scenario",
      "language": "en",
      "text": "AI describes a legal obligation. What is the strongest check before acting?",
      "options": [
        {
          "title": "Check the current rule and who it applies to.",
          "correct": true
        },
        {
          "title": "Trust the explanation if it uses the right legal terms and cites a section.",
          "correct": false
        },
        {
          "title": "Ask the model to rewrite it more formally and see if the explanation is consistent.",
          "correct": false
        },
        {
          "title": "Check the section number.",
          "correct": false
        }
      ],
      "feedback": "Before acting, check the current wording, date, and whether the rule applies to your case. Get qualified help if the consequences matter."
    },
    {
      "id": "N_C_VER_2",
      "formId": "C",
      "objectiveId": "VER-2",
      "learningUnitId": "U-VER-2",
      "type": "scenario",
      "language": "en",
      "text": "Which output needs the most rigorous check before use?",
      "options": [
        {
          "title": "A draft story outline kept in a private notebook.",
          "correct": false
        },
        {
          "title": "Health advice intended for another person.",
          "correct": true
        },
        {
          "title": "A list of character names that I can change later.",
          "correct": false
        },
        {
          "title": "A provisional list of films to watch with friends over the weekend.",
          "correct": false
        }
      ],
      "feedback": "Health advice can affect a person’s well-being. It deserves closer checking than a creative idea you can readily change."
    },
    {
      "id": "N_C_DAT_1",
      "formId": "C",
      "objectiveId": "DAT-1",
      "learningUnitId": "U-DAT-1",
      "type": "scenario",
      "language": "en",
      "text": "You want to summarize an internal meeting record. What is the most cautious approach?",
      "options": [
        {
          "title": "Paste the minutes into my usual chatbot because they are already plain text.",
          "correct": false
        },
        {
          "title": "Check whether I may share the minutes, which tool is approved, and what details can be removed.",
          "correct": true
        },
        {
          "title": "Change people’s names but keep other details that can identify them.",
          "correct": false
        },
        {
          "title": "Add “confidential” before pasting the complete minutes into the tool.",
          "correct": false
        }
      ],
      "feedback": "Meeting minutes can contain confidential information even without names. Check permission, the tool, and what you actually need to share."
    },
    {
      "id": "N_C_DAT_2",
      "formId": "C",
      "objectiveId": "DAT-2",
      "learningUnitId": "U-DAT-2",
      "type": "scenario",
      "language": "en",
      "text": "A colleague wants to use an AI-generated recommendation without checks. What is the most responsible response?",
      "options": [
        {
          "title": "Use it if it seems reasonable and credit the model as responsible.",
          "correct": false
        },
        {
          "title": "Review the data and consequences before deciding.",
          "correct": true
        },
        {
          "title": "Ask the same model to confirm.",
          "correct": false
        },
        {
          "title": "Use the recommendation as written and just label it as AI-generated.",
          "correct": false
        }
      ],
      "feedback": "Saying a proposal came from AI does not transfer responsibility. Whoever decides should check the data, assumptions, and consequences."
    }
  ]
};
const FIRST_STEPS_UNITS = [
  {
    "id": "U-CAP-1",
    "objectiveId": "CAP-1",
    "title": {
      "it": "Generare non significa cercare",
      "en": "a generative system creates content from the request and what it learned from data. Searching, reading a document, and checking facts are separate steps."
    },
    "principle": {
      "it": "un sistema generativo crea contenuti usando la richiesta e ciò che ha imparato dai dati. Una ricerca, la lettura di un documento e la verifica delle informazioni sono passaggi distinti.",
      "en": "a generative system creates content from the request and what it learned from data. Searching, reading a document, and checking facts are separate steps."
    },
    "misconception": "confondere generazione, ricerca, archivio e verifica.",
    "example": "un riassunto di un testo incollato può essere utile senza costituire una ricerca indipendente.",
    "action": "prima di usare un output, chiedersi quali informazioni il sistema ha realmente ricevuto.",
    "reinforcement": "hai distinto la generazione di contenuto dal recupero e dalla verifica.",
    "sources": [
      "SRC-GOOGLE-ML",
      "SRC-GOOGLE-LLM."
    ]
  },
  {
    "id": "U-CAP-2",
    "objectiveId": "CAP-2",
    "title": {
      "it": "Supporto alla decisione, non autorità",
      "en": "AI is useful for alternatives, drafts, and transformations"
    },
    "principle": {
      "it": "l'AI è utile per creare alternative, bozze e trasformazioni; scopo, vincoli e decisione finale restano umani.",
      "en": "AI is useful for alternatives, drafts, and transformations; purpose, constraints, and the final decision remain human."
    },
    "misconception": "delegare la decisione solo perché il sistema genera una risposta fluida.",
    "example": "chiedere tre proposte con vantaggi e limiti prima di scegliere.",
    "action": "definire che cosa può proporre l'AI e che cosa deve decidere una persona.",
    "reinforcement": "hai usato l'AI come supporto mantenendo il controllo sul risultato.",
    "sources": [
      "SRC-MOLLICK",
      "SRC-EU-LITERACY."
    ]
  },
  {
    "id": "U-LIM-1",
    "objectiveId": "LIM-1",
    "title": {
      "it": "Plausibile non significa verificato",
      "en": "confident tone, detail, precise numbers, and complete-looking citations can also accompany an error."
    },
    "principle": {
      "it": "tono sicuro, dettagli, numeri precisi e citazioni complete possono accompagnare anche un errore.",
      "en": "confident tone, detail, precise numbers, and complete-looking citations can also accompany an error."
    },
    "misconception": "scambiare forma e sicurezza apparente per evidenza.",
    "example": "un riferimento bibliografico può sembrare autentico pur non esistendo.",
    "action": "segnare fatti e riferimenti da verificare prima di riusarli.",
    "reinforcement": "hai trattato la plausibilità come un'ipotesi, non come una prova.",
    "sources": [
      "SRC-GOOGLE-HALLUCINATIONS",
      "SRC-NIST-GENAI."
    ]
  },
  {
    "id": "U-LIM-2",
    "objectiveId": "LIM-2",
    "title": {
      "it": "Data, perimetro e contesto mancante",
      "en": "an output can be coherent yet outdated or produced without essential local information."
    },
    "principle": {
      "it": "un output può essere coerente ma obsoleto o costruito senza informazioni locali indispensabili.",
      "en": "an output can be coherent yet outdated or produced without essential local information."
    },
    "misconception": "presumere che il modello conosca l'ultima versione o documenti non forniti.",
    "example": "una procedura interna plausibile non coincide necessariamente con quella approvata.",
    "action": "indicare data di riferimento e fonti disponibili; dichiarare ciò che manca.",
    "reinforcement": "hai controllato aggiornamento e perimetro prima di usare l'output.",
    "sources": [
      "SRC-GOOGLE-LLM",
      "SRC-EU-LITERACY."
    ]
  },
  {
    "id": "U-REQ-1",
    "objectiveId": "REQ-1",
    "title": {
      "it": "Rendere chiaro il compito",
      "en": "goal, context, audience, constraints, and format reduce assumptions and make the result easier to evaluate."
    },
    "principle": {
      "it": "obiettivo, contesto, pubblico, vincoli e formato riducono le assunzioni e rendono il risultato valutabile.",
      "en": "goal, context, audience, constraints, and format reduce assumptions and make the result easier to evaluate."
    },
    "misconception": "credere che un prompt debba essere soltanto lungo o formulato con parole speciali.",
    "example": "specificare colonne e divieto di inventare dati mancanti.",
    "action": "aggiungere alla prossima richiesta un risultato atteso e un vincolo verificabile.",
    "reinforcement": "hai trasformato una richiesta generica in un compito controllabile.",
    "sources": [
      "SRC-GOOGLE-PROMPT."
    ]
  },
  {
    "id": "U-REQ-2",
    "objectiveId": "REQ-2",
    "title": {
      "it": "Il primo output è una bozza",
      "en": "correcting assumptions, showing examples, and requesting targeted revisions are part of working with a generative system."
    },
    "principle": {
      "it": "correggere assunzioni, mostrare esempi e chiedere revisioni mirate fa parte del lavoro con un sistema generativo.",
      "en": "correcting assumptions, showing examples, and requesting targeted revisions are part of working with a generative system."
    },
    "misconception": "accettare o scartare definitivamente il primo tentativo.",
    "example": "indicare quale formato non è stato rispettato e mostrarne uno corretto.",
    "action": "formulare un feedback con `mantieni`, `correggi`, `aggiungi`.",
    "reinforcement": "hai usato l'iterazione per orientare il risultato.",
    "sources": [
      "SRC-GOOGLE-PROMPT",
      "SRC-MOLLICK."
    ]
  },
  {
    "id": "U-VER-1",
    "objectiveId": "VER-1",
    "title": {
      "it": "Verificare fuori dalla risposta",
      "en": "an independent check opens the original source or compares a reliable source, checking identity, date, scope, and support for the specific claim."
    },
    "principle": {
      "it": "una verifica indipendente apre la fonte originale o confronta una sorgente affidabile, controllando identità, data, ambito e sostegno alla specifica affermazione.",
      "en": "an independent check opens the original source or compares a reliable source, checking identity, date, scope, and support for the specific claim."
    },
    "misconception": "chiedere conferma allo stesso sistema o fidarsi dell'aspetto di un link.",
    "example": "risalire dal numero citato al rapporto e controllare periodo e campione.",
    "action": "verificare una singola affermazione importante seguendo il collegamento fino alla fonte primaria.",
    "reinforcement": "hai cercato evidenza indipendente e pertinente.",
    "sources": [
      "SRC-GOOGLE-HALLUCINATIONS",
      "SRC-NIST-GENAI."
    ]
  },
  {
    "id": "U-VER-2",
    "objectiveId": "VER-2",
    "title": {
      "it": "Più impatto, più controllo",
      "en": "the level of review should increase with consequences, irreversibility, and the people affected."
    },
    "principle": {
      "it": "il livello di verifica deve crescere con conseguenze, irreversibilità e persone coinvolte.",
      "en": "the level of review should increase with consequences, irreversibility, and the people affected."
    },
    "misconception": "applicare lo stesso controllo a un brainstorming privato e a una decisione sanitaria, legale o economica.",
    "example": "una comunicazione ufficiale richiede fonti, revisione e approvazione più forti di una lista privata di idee.",
    "action": "classificare il prossimo uso come basso, medio o alto impatto prima di scegliere i controlli.",
    "reinforcement": "hai proporzionato la supervisione alle possibili conseguenze.",
    "sources": [
      "SRC-NIST-GENAI",
      "SRC-EU-LITERACY",
      "SRC-MS-RESPONSIBLE."
    ]
  },
  {
    "id": "U-DAT-1",
    "objectiveId": "DAT-1",
    "title": {
      "it": "Prima i dati, poi lo strumento",
      "en": "before sending data, identify personal, confidential, or regulated information, check authorization and policy, minimize it, and use approved environments."
    },
    "principle": {
      "it": "prima dell'invio bisogna riconoscere dati personali, riservati o regolati, verificare autorizzazione e policy, minimizzare e usare ambienti approvati.",
      "en": "before sending data, identify personal, confidential, or regulated information, check authorization and policy, minimize it, and use approved environments."
    },
    "misconception": "credere che rinominare un file, convertirlo in PDF o sostituire pochi nomi renda anonimo il contenuto.",
    "example": "un verbale può identificare persone anche senza mostrarne il nome completo.",
    "action": "eliminare dalla prossima richiesta ogni campo non necessario al risultato.",
    "reinforcement": "hai valutato i dati prima della comodità dello strumento.",
    "sources": [
      "SRC-UNESCO-GENAI",
      "SRC-EDPB-AI."
    ]
  },
  {
    "id": "U-DAT-2",
    "objectiveId": "DAT-2",
    "title": {
      "it": "La responsabilità resta umana",
      "en": "whoever uses and publishes the output must review it, respect rights and rules, disclose AI use when relevant, and own the final decision."
    },
    "principle": {
      "it": "chi usa e pubblica l'output deve revisionarlo, rispettare diritti e regole, dichiarare l'uso quando rilevante e assumersi la decisione finale.",
      "en": "whoever uses and publishes the output must review it, respect rights and rules, disclose AI use when relevant, and own the final decision."
    },
    "misconception": "attribuire responsabilità, intenzione o autorità al modello.",
    "example": "un'immagine generata richiede comunque verifica di adeguatezza, somiglianze e condizioni d'uso.",
    "action": "aggiungere al workflow un responsabile della revisione e un criterio di approvazione.",
    "reinforcement": "hai mantenuto responsabilità e controllo sull'uso finale.",
    "sources": [
      "SRC-UNESCO-GENAI",
      "SRC-MS-RESPONSIBLE",
      "SRC-EU-LITERACY",
      "SRC-EUIPO-COPYRIGHT",
      "SRC-EU-TRANSPARENCY."
    ]
  }
];
