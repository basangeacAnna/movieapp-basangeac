// Prendo il contenitore principale della pagina dove butterò i dati
const detailContainer = document.getElementById('detail-container');

// Questa funzione legge i parametri scritti nell'URL (es. ?id=123&type=movie)
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        type: params.get('type')
    };
}

// Funzione principale che fa tutto il lavoro asincrono appena entriamo nella pagina
async function initDetailPage() {
    // Recupero l'id e il tipo (movie o tv) dall'URL
    const { id, type } = getUrlParams();

    // Se per qualche motivo mancano i parametri nell'URL, fermo tutto e mostro un errore
    if (!id || !type) {
        detailContainer.innerHTML = '<p class="error-text">Ops! Nessun contenuto selezionato correttamente.</p>';
        return;
    }

    // Metto una scritta provvisoria mentre aspettiamo la risposta dall'API
    detailContainer.innerHTML = '<p class="loading-text">Caricamento dei dettagli in corso...</p>';

    // Compongo l'endpoint specifico richiesto dalla traccia (es: /movie/550 oppure /tv/123)
    const endpoint = `/${type}/${id}`;
    
    // Faccio la chiamata asincrona tramite la funzione globale centralizzata in api.js
    const data = await getData(endpoint);

    // Svuoto la scritta di caricamento
    detailContainer.innerHTML = '';

    // Se l'oggetto che ci torna è vuoto o ha un codice di errore, mostro il messaggio rosso
    if (!data || data.success === false) {
        detailContainer.innerHTML = '<p class="error-text">Impossibile trovare i dettagli di questo contenuto. Riprova più tardi.</p>';
        return;
    }

    // Sistemo i dati visto che film e serie tv usano proprietà con nomi diversi nell'API
    const title = type === 'movie' ? data.title : data.name;
    const releaseDate = type === 'movie' ? data.release_date : data.first_air_date;
    const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';
    
    // Prendo i generi e li unisco con una virgola (l'API ce li passa come un array di oggetti)
    const genres = data.genres ? data.genres.map(g => g.name).join(', ') : 'Non specificato';

    // Gestisco la solita locandina locale se manca l'immagine originale di TMDB
    const poster = data.poster_path 
        ? `${IMG_URL}${data.poster_path}` 
        : 'src/no-poster.svg';

    // Costruisco tutto il blocco HTML con i dati reali estratti dall'API
    detailContainer.innerHTML = `
        <div class="detail-card">
            <div class="detail-poster-zone">
                <img src="${poster}" alt="${title}" class="detail-img">
            </div>
            <div class="detail-info-zone">
                <h1>${title} <span class="detail-year">(${year})</span></h1>
                
                <div class="detail-meta-tags">
                    <span class="type-badge">${type === 'movie' ? 'FILM' : 'SERIE TV'}</span>
                    <span class="genres-list"><strong>Generi:</strong> ${genres}</span>
                    <span class="rating-badge">★ ${data.vote_average ? data.vote_average.toFixed(1) : 'N/A'}</span>
                </div>

                <h3>Trama</h3>
                <p class="detail-overview">${data.overview ? data.overview : 'Trama non disponibile in italiano.'}</p>
                
                <div class="action-zone">
                    <a href="index.html" class="back-btn">← Torna alla Home</a>
                </div>
            </div>
        </div>
    `;
}

// Lancio la funzione al caricamento della pagina
initDetailPage();