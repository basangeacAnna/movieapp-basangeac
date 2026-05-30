// Recupero il contenitore della griglia specifico per le serie TV
const seriesPageContainer = document.getElementById('series-page-container');

// Funzione per generare la singola schedina della serie TV
function createSeriesCard(series) {
    // TMDB per le serie usa 'name' al posto di 'title' e 'first_air_date' al posto di 'release_date'
    const title = series.name;
    const year = series.first_air_date ? series.first_air_date.split('-')[0] : 'N/A';
    
    // Controllo se c'è la locandina, altrimenti uso il solito rimpiazzo temporaneo
    const poster = series.poster_path 
        ? `${IMG_URL}${series.poster_path}` 
        : 'src/no-poster.png';

    // Creo l'elemento HTML e gli assegno la classe per agganciare il CSS globale
    const card = document.createElement('div');
    card.classList.add('movie-card');
    
    card.innerHTML = `
        <img src="${poster}" alt="${title}" class="card-img">
        <div class="card-info">
            <h3>${title}</h3>
            <p class="card-year">${year}</p>
        </div>
    `;
    
    return card;
}

// Funzione principale che scarica e mostra le serie popolari
async function initSeriesPage() {
    // Stampo a schermo il testo di caricamento mentre la fetch è in viaggio
    seriesPageContainer.innerHTML = '<p class="loading-text">Caricamento delle serie TV popolari...</p>';

    // Faccio la richiesta HTTP GET all'endpoint delle serie popolari
    const popularSeries = await getData('/tv/popular');

    // Svuoto il testo temporaneo una volta che i dati sono arrivati
    seriesPageContainer.innerHTML = '';

    // Se per qualche motivo l'array torna vuoto, mostro la scritta di errore rossa
    if (popularSeries.length === 0) {
        seriesPageContainer.innerHTML = '<p class="error-text">Si è verificato un errore. Impossibile caricare le serie TV.</p>';
    } else {
        // Cicliamo i dati ricevuti con .map() e buttiamo le card dentro la pagina
        popularSeries.map(series => {
            const card = createSeriesCard(series);
            seriesPageContainer.appendChild(card);
        });
    }
}

// Do il via al caricamento non appena la pagina viene aperta nel browser
initSeriesPage();