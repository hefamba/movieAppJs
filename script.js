const api_key = 'api_key=307b40941d0fad058e7110084ed9cd95'

const API_URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc%27&${api_key}`;

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/';

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&${api_key}&query="`;




const form = document.getElementById('form');
const search = document.getElementById('search')

// GET INITIAL MOVIES
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results);

}

getMovies(API_URL);



// CREATING THE SEARCH

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }

    
})


