const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc%27&api_key=307b40941d0fad058e7110084ed9cd95';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/';

const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?query="&include_adult=false&language=en-US&page=1&api_key=307b40941d0fad058e7110084ed9cd95';

// GET INITIAL MOVIES


async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results);

}

getMovies(API_URL);