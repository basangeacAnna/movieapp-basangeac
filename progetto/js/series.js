const seriesPageContainer = document.getElementById('series-page-container');

function createSeriesCard(series) {
    const title = series.name;
    const year = series.first_air_date ? series.first_air_date.split('-')[0] : 'N/A';
    
    const poster = series.poster_path 
        ? `${IMG_URL}${series.poster_path}` 
        : 'src/no-poster.svg';

    // Trasformiamo in tag 'a' anche per le serie tv
    const card = document.createElement('a');
    card.classList.add('movie-card');
    card.href = `detail.html?id=${series.id}&type=tv`;
    
    card.innerHTML = `
        <img src="${poster}" alt="${title}" class="card-img">
        <div class="card-info">
            <h3>${title}</h3>
            <p class="card-year">${year}</p>
        </div>
    `;
    
    return card;
}

async function initSeriesPage() {
    seriesPageContainer.innerHTML = '<p class="loading-text">Caricamento delle serie TV popolari...</p>';
    const popularSeries = await getData('/tv/popular');
    seriesPageContainer.innerHTML = '';

    if (popularSeries.length === 0) {
        seriesPageContainer.innerHTML = '<p class="error-text">Impossibile caricare le serie TV.</p>';
    } else {
        popularSeries.map(series => {
            const card = createSeriesCard(series);
            seriesPageContainer.appendChild(card);
        });
    }
}

initSeriesPage();