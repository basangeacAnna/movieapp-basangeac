// Selezioniamo i contenitori HTML tramite ID
const moviesContainer = document.getElementById('trending-movies-container');
const seriesContainer = document.getElementById('trending-series-container');

// Funzione per creare il markup di una singola card
function createCard(item, isMovie) {
    // TMDB usa 'title' per i film e 'name' per le serie TV
    const title = isMovie ? item.title : item.name;
    // TMDB usa 'release_date' per i film e 'first_air_date' per le serie TV
    const releaseDate = isMovie ? item.release_date : item.first_air_date;
    const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';
    
    // Gestione dell'immagine placeholder se manca il poster_path
    const poster = item.poster_path ? `${IMG_URL}${item.poster_path}` : 'https://via.placeholder.com/500x750?text=Nessuna+Immagine';

    // Creiamo il div della card
    const card = document.createElement('div');
    card.classList.add('movie-card');
    
    // Ci inseriamo l'HTML interno (Immagine, Titolo e Anno)
    card.innerHTML = `
        <img src="${poster}" alt="${title}" class="card-img">
        <div class="card-info">
            <h3>${title}</h3>
            <p class="card-year">${year}</p>
        </div>
    `;
    
    return card;
}

// Funzione principale che carica i dati nella Home
async function initHome() {
    // 1. Prendiamo i dati dall'API usando la funzione creata in api.js
    const trendingMovies = await getData('/trending/movie/day');
    const trendingSeries = await getData('/trending/tv/day');

    // 2. Svuotiamo i contenitori (buona pratica)
    moviesContainer.innerHTML = '';
    seriesContainer.innerHTML = '';

    // 3. Usiamo .map() per generare le card e appenderle nel DOM
    trendingMovies.map(movie => {
        const card = createCard(movie, true);
        moviesContainer.appendChild(card);
    });

    trendingSeries.map(series => {
        const card = createCard(series, false);
        seriesContainer.appendChild(card);
    });
}

// Avviamo il caricamento all'apertura della pagina
initHome();