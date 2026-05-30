const moviesContainer = document.getElementById('trending-movies-container');
const seriesContainer = document.getElementById('trending-series-container');

// Funzione comoda per creare la struttura della singola schedina (card)
function createCard(item, isMovie) {
    // Controllo se è un film o una serie perché cambiano i nomi delle proprietà nell'API
    const title = isMovie ? item.title : item.name;
    const releaseDate = isMovie ? item.release_date : item.first_air_date;
    
    // Prendo solo l'anno tagliando la stringa della data (che arriva come AAAA-MM-GG)
    const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';
    
    // Se per caso manca la locandina, ci metto un'immagine di rimpiazzo provvisoria
    const poster = item.poster_path 
        ? `${IMG_URL}${item.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=Nessuna+Immagine';

    // Creo il div che conterrà tutto e gli assegno la classe per il CSS
    const card = document.createElement('div');
    card.classList.add('movie-card');
    
    // Inietto l'HTML dentro la schedina con i dati veri
    card.innerHTML = `
        <img src="${poster}" alt="${title}" class="card-img">
        <div class="card-info">
            <h3>${title}</h3>
            <p class="card-year">${year}</p>
        </div>
    `;
    
    return card;
}

// Questa è la funzione principale che fa partire tutta la baracca
async function initHome() {
    // Ci metto un testo provvisorio di caricamento così l'utente capisce che sta succedendo qualcosa
    moviesContainer.innerHTML = '<p class="loading-text">Caricamento film in corso...</p>';
    seriesContainer.innerHTML = '<p class="loading-text">Caricamento serie in corso...</p>';

    // Vado a prendermi i dati reali chiamando gli endpoint di TMDB
    const trendingMovies = await getData('/trending/movie/day');
    const trendingSeries = await getData('/trending/tv/day');

    // Svuoto i contenitori dai testi di caricamento prima di buttare dentro le card
    moviesContainer.innerHTML = '';
    seriesContainer.innerHTML = '';

    // Se l'array è vuoto significa che qualcosa è andato storto nella chiamata
    if (trendingMovies.length === 0) {
        moviesContainer.innerHTML = '<p class="error-text">Si è verificato un errore nel caricamento dei film. Riprova più tardi.</p>';
    } else {
        // Faccio un ciclo sui film ricevuti per creare le card e appenderle nella pagina
        trendingMovies.map(movie => {
            const card = createCard(movie, true);
            moviesContainer.appendChild(card);
        });
    }

    // Stessa identica cosa di sopra, ma per le serie TV
    if (trendingSeries.length === 0) {
        seriesContainer.innerHTML = '<p class="error-text">Si è verificato un errore nel caricamento delle serie TV. Riprova più tardi.</p>';
    } else {
        trendingSeries.map(series => {
            const card = createCard(series, false);
            seriesContainer.appendChild(card);
        });
    }
}

// Faccio partire il caricamento non appena si apre la pagina
initHome();