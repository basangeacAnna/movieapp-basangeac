const moviesContainer = document.getElementById('trending-movies-container');
const seriesContainer = document.getElementById('trending-series-container');

// Funzione comoda per creare la struttura della singola schedina
function createCard(item, isMovie) {
    const title = isMovie ? item.title : item.name;
    const releaseDate = isMovie ? item.release_date : item.first_air_date;
    const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';
    const type = isMovie ? 'movie' : 'tv'; // Capisco se è un film o una serie
    
    const poster = item.poster_path 
        ? `${IMG_URL}${item.poster_path}` 
        : 'src/no-poster.svg';

    // ATTENZIONE: Trasformiamo la card in un tag 'a' così diventa cliccabile!
    const card = document.createElement('a');
    card.classList.add('movie-card');
    card.href = `detail.html?id=${item.id}&type=${type}`; // Reindirizza passando i dati nell'URL
    
    card.innerHTML = `
        <img src="${poster}" alt="${title}" class="card-img">
        <div class="card-info">
            <h3>${title}</h3>
            <p class="card-year">${year}</p>
        </div>
    `;
    
    return card;
}

async function initHome() {
    moviesContainer.innerHTML = '<p class="loading-text">Caricamento film in corso...</p>';
    seriesContainer.innerHTML = '<p class="loading-text">Caricamento serie in corso...</p>';

    const trendingMovies = await getData('/trending/movie/day');
    const trendingSeries = await getData('/trending/tv/day');

    moviesContainer.innerHTML = '';
    seriesContainer.innerHTML = '';

    if (trendingMovies.length === 0) {
        moviesContainer.innerHTML = '<p class="error-text">Si è verificato un errore nel caricamento dei film.</p>';
    } else {
        trendingMovies.map(movie => {
            const card = createCard(movie, true);
            moviesContainer.appendChild(card);
        });
    }

    if (trendingSeries.length === 0) {
        seriesContainer.innerHTML = '<p class="error-text">Si è verificato un errore nel caricamento delle serie TV.</p>';
    } else {
        trendingSeries.map(series => {
            const card = createCard(series, false);
            seriesContainer.appendChild(card);
        });
    }
}

initHome();