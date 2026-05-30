
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function getData(endpoint) {
    try {
        const urlCompleto = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=it-IT`;
        const response = await fetch(urlCompleto);
        
        if (!response.ok) {
            console.error(`Errore HTTP! Stato: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data.results ? data.results : data;

    } catch (error) {
        console.error("Errore durante la fetch dei dati:", error);
        return null;
    }
}