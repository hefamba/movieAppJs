/** @format */

const api_key = 'api_key=307b40941d0fad058e7110084ed9cd95';

const API_URL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&${api_key}`;

const IMG_PATH = `https://image.tmdb.org/t/p/w185/`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&${api_key}&query="`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// GET INITIAL MOVIES

function getVoteAverageColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote <= 4) {
    return 'red';
  } else {
    return 'orange';
  }
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { id, title, poster_path, overview, vote_average } = movie;
    let rating = Math.floor(vote_average);
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
    <a href="movie_details.html?id=${id}">
        <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getVoteAverageColor(rating)}">${rating}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

    main.appendChild(movieEl);
  });
}

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    main.innerHTML = '<h1>Sorry Something went wrong..</h1>';
  }
}

getMovies(API_URL);
// CREATING THE SEARCH

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
    try {
      let url = SEARCH_API + searchTerm;
      const res = await fetch(url);
      const { results } = await res.json();

      if (results.length === 0) {
        main.innerHTML = '<h1>No matches for Search Term.</h1>';
      } else {
        showMovies(results);
      }
    } catch (error) {
      main.innerHTML = '<h1>Sorry Something went wrong..</h1>';
    }

    search.value = '';
  } else {
    window.location.reload();
  }
});
