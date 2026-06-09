# Craflix — Movie App (Stile Netflix)

**Corso:** Introduzione allo sviluppo frontend  
**Progetto d'Esame:** Frontend Web Application Multi-pagina  
**Autrice:** Anna Maria Basangeac  

---

## 1. Descrizione del Progetto
**Craflix** è una piattaforma web multi-pagina ispirata all'interfaccia e all'esperienza utente di Netflix. Il progetto segna il passaggio da un'applicazione basata su dati statici a una piattaforma dinamica e asincrona, popolata interamente tramite chiamate HTTP GET verso l'API pubblica di **The Movie Database (TMDB)**.

Il sito adotta un layout coordinato in stile "dark / streaming" ed è ottimizzato in ottica **responsive**, garantendo una visualizzazione fluida sia su desktop che su dispositivi mobile (con una griglia a 2 colonne per gli smartphone e un posizionamento nativo dell'avatar del profilo in alto a destra).

---

## 2. Architettura dei File e Struttura
Il progetto è sviluppato in HTML5, CSS3 e JavaScript Vanilla (senza l'ausilio di framework esterni), strutturato secondo le best-practice di modularità concordate:

```text
progetto/
├── index.html          # Home Page (Trending Film e Serie TV)
├── movies.html         # Esplorazione Film Popolari
├── series.html         # Esplorazione Serie TV Popolari
├── profile.html        # Profilo dello studente / Presentazione statica
├── detail.html         # Vista di dettaglio (dinamica tramite query-string ID)
├── css/
│   └── style.css       # Foglio di stile globale e media queries unificate
└── js/
    ├── utili.js        # Configurazione globale (API Key) e helper DOM
    ├── api.js          # Chiamate ed endpoint centralizzati tramite Fetch API
    ├── main.js         # Logica di popolamento della Home Page
    ├── movies.js       # Logica di popolamento della sezione Film
    └── series.js       # Logica di popolamento della sezione Serie TV

```

---

## 3. Endpoint TMDB Utilizzati

Tutte le richieste effettuate sfruttano il Base URL `https://api.themoviedb.org/3` in modalità stretta di sola lettura (`GET`), con l'aggiunta della localizzazione in lingua italiana (`language=it-IT`).

| Pagina | Metodo | Endpoint TMDB | Descrizione Utilità |
| --- | --- | --- | --- |
| **Home (`index.html`)** | `GET` | `/trending/movie/day` | Recupera i film di tendenza del giorno |
| **Home (`index.html`)** | `GET` | `/trending/tv/day` | Recupera le serie TV di tendenza del giorno |
| **Film (`movies.html`)** | `GET` | `/movie/popular` | Mostra la griglia dei film più popolari |
| **Serie TV (`series.html`)** | `GET` | `/tv/popular` | Mostra la griglia delle serie TV più popolari |
| **Dettaglio (`detail.html`)** | `GET` | `/movie/{movie_id}` | Informazioni estese del singolo film (tramite ID) |
| **Dettaglio (`detail.html`)** | `GET` | `/tv/{tv_id}` | Informazioni estese della singola serie TV (tramite ID) |

*Nota sulle immagini:* I poster vengono generati dinamicamente concatenando il path parziale ricevuto dall'API (`poster_path`) all'URL di configurazione di TMDB: `https://image.tmdb.org/t/p/w500`.

---

## 4. Gestione della Sicurezza e API Key

In linea con i requisiti di igiene della repository e per evitare il caricamento di credenziali private su GitHub, l'architettura prevede la separazione dei secret:

1. La chiave privata viene ospitata centralmente all'interno del file `js/utili.js` sotto forma di costante stringa:
```javascript
const API_KEY = 'LA_TUA_API_KEY';

```


2. Il file contenente la chiave locale è configurato all'interno del file `.gitignore` per essere escluso dal tracciamento dei commit.
3. Per avviare il progetto in locale, è necessario creare il file `js/utili.js` e valorizzare la costante `API_KEY` con il proprio token personale generato sulla dashboard sviluppatore di TMDB.

---

## 5. Come Avviare il Progetto in Locale

L'applicazione è sviluppata in JavaScript Vanilla, di conseguenza non richiede fasi di compilazione o l'uso di build tool pesanti (come Vite o Webpack). A causa delle restrizioni di sicurezza del browser sulle richieste asincrone (`CORS` su file locali), **non è possibile aprire i file HTML facendo doppio clic direttamente dalla cartella**.

Per eseguire il progetto è necessario utilizzare un server locale. Di seguito le modalità consigliate:

### Opzione A: Visual Studio Code - Live Server (Consigliata)

1. Apri la cartella di progetto `progetto/` dentro **Visual Studio Code**.
2. Assicurati di aver installato l'estensione **Live Server** (creata da Ritwick Dey).
3. Clicca sul tasto **"Go Live"** in basso a destra sulla barra di stato di VS Code, oppure fai tasto destro su `index.html` e seleziona *Open with Live Server*.
4. Il sito si aprirà automaticamente all'indirizzo `http://127.0.0.1:5500`.

### Opzione B: Tramite Terminale (Node.js)

Se hai Node.js installato sul tuo sistema, puoi lanciare un server statico istantaneo posizionandoti nella cartella principale del progetto ed eseguendo uno dei seguenti comandi:

```bash
# Utilizzando npx (incluso con npm)
npx serve .

# Oppure utilizzando python se presente sul sistema
python -m http.server 8080

```

Dopodiché, apri il browser e naviga sull'indirizzo locale mostrato nel terminale (es. `http://localhost:3000` o `http://localhost:8080`).

---

## 6. Requisiti Tecnici Soddisfatti

* **HTML5 Semantico:** Utilizzo strutturato dei tag `header`, `nav`, `main`, `section` e `footer`.
* **CSS3 Moderno:** Gestione del layout di allineamento tramite Flexbox ed elaborazione delle griglie responsive flessibili con CSS Grid. Stati di `:hover` fluidi e transizioni animate sulle card.
* **JavaScript Asincrono:** Utilizzo profondo di `fetch()`, programmazione asincrona gestita con costrutti `async/await` e manipolazione dinamica del DOM tramite metodi degli array (`.map()`, `forEach`).
* **Robustezza:** Gestione minima degli errori di rete e supporto integrato per la visualizzazione dello stato di caricamento.

```