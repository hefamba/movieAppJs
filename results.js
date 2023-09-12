/** @format */
const api_key = 'api_key=307b40941d0fad058e7110084ed9cd95';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&${api_key}&query="`;
const API_URL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&${api_key}`;
const IMG_PATH = `https://image.tmdb.org/t/p/w185/`;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

document.addEventListener('DOMContentLoaded', () => {
  const queryString = window.location.search;
  const queryParam = new URLSearchParams(queryString);
  const query = queryParam.get('query');

  if (query) {
    const searchInput = document.getElementById('search');
    searchInput.value = query;
    getResults(query);
  } else {
    main.innerHTML = '<p>No search query provided.</p>';
  }
});

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

async function getResults(query) {
  try {
    const url = `${SEARCH_API + encodeURIComponent(query)}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);

    if (data.results.length === 0) {
      main.innerHTML = '<p>No matching movies found.</p>';
    } else {
      showMovies(data.results);
    }
  } catch (error) {
    // Handle errors if needed
    console.error(error);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchTerm = search.value.trim(); // Trim whitespace from search term

  if (searchTerm && searchTerm !== '') {
    try {
      // Create the URL with the search query parameter
      const url = `results.html?query=${encodeURIComponent(searchTerm)}`;

      // Navigate to the results page
      window.location.href = url;
    } catch (error) {
      // Handle errors if needed
      console.error(error);
    }
  } else {
    window.location.reload();
  }
});
