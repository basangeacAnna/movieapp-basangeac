const API_KEY = "7bd562e99ab5d130d2184118235def81";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Funzione generica per fare le chiamate GET all'API
async function getData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=it-IT`);
        if (!response.ok) {
            throw new Error(`Errore nella chiamata: ${response.status}`);
        }
        const data = await response.json();
        return data.results; // Restituisce l'array di 20 elementi
    } catch (error) {
        console.error("Errore nel recupero dati:", error);
        return []; // Restituisce un array vuoto in caso di errore per non rompere l'app
    }
}