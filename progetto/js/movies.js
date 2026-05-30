// Prendo il contenitore della griglia specifico di questa pagina
const moviesPageContainer = document.getElementById('movies-page-container');

// Questa funzione fa la stessa cosa di quella nella home: crea la struttura della card
function createMovieCard(movie) {
    // Recupero il titolo e l'anno (tagliando la stringa della data alla prima linea)
    const title = movie.title;
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    
    // Gestisco il solito placeholder se per caso manca la locandina originale
    const poster = movie.poster_path 
        ? `${IMG_URL}${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=Nessuna+Immagine';

    // Creo l'elemento HTML da buttare nella griglia
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

// Funzione principale che carica i film popolari appena entriamo nella pagina
async function initMoviesPage() {
    // Metto il testo di caricamento provvisorio mentre aspetto la risposta del server
    moviesPageContainer.innerHTML = '<p class="loading-text">Caricamento dei film popolari...</p>';

    // Chiamo l'endpoint dedicato ai film popolari usando la funzione globale di api.js
    const popularMovies = await getData('/movie/popular');

    // Svuoto il testo di caricamento per fare spazio alle card vere
    moviesPageContainer.innerHTML = '';

    // Se l'array è vuoto, mostro il messaggio di errore rosso a schermo
    if (popularMovies.length === 0) {
        moviesPageContainer.innerHTML = '<p class="error-text">Si è verificato un errore. Impossibile caricare i film popolari.</p>';
    } else {
        // Faccio un ciclo sui film ricevuti e li appendo uno per uno nel container
        popularMovies.map(movie => {
            const card = createMovieCard(movie);
            moviesPageContainer.appendChild(card);
        });
    }
}

// Faccio partire tutto non appena la pagina è pronta
initMoviesPage();