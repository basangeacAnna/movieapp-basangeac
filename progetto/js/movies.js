const moviesPageContainer = document.getElementById('movies-page-container');

function createMovieCard(movie) {
    const title = movie.title;
    const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
    
    const poster = movie.poster_path 
        ? `${IMG_URL}${movie.poster_path}` 
        : 'src/no-poster.svg';

    // Anche qui, creiamo un tag 'a' per renderlo un link vero
    const card = document.createElement('a');
    card.classList.add('movie-card');
    card.href = `detail.html?id=${movie.id}&type=movie`;
    
    card.innerHTML = `
        <img src="${poster}" alt="${title}" class="card-img">
        <div class="card-info">
            <h3>${title}</h3>
            <p class="card-year">${year}</p>
        </div>
    `;
    
    return card;
}

async function initMoviesPage() {
    moviesPageContainer.innerHTML = '<p class="loading-text">Caricamento dei film popolari...</p>';
    const popularMovies = await getData('/movie/popular');
    moviesPageContainer.innerHTML = '';

    if (popularMovies.length === 0) {
        moviesPageContainer.innerHTML = '<p class="error-text">Impossibile caricare i film popolari.</p>';
    } else {
        popularMovies.map(movie => {
            const card = createMovieCard(movie);
            moviesPageContainer.appendChild(card);
        });
    }
}

initMoviesPage();