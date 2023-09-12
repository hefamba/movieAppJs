/** @format */
const api_key = 'api_key=307b40941d0fad058e7110084ed9cd95';
const backBtn = document.querySelector('.backBtn');
const main = document.getElementById('main');
const IMG_PATH = `https://image.tmdb.org/t/p/w185/`;

function getMovieIdFromURL() {
  // grabbing my query string Ex: ?id=fhjroafbainfoa or ?name=Henry&age=29, whatever follows the ?
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
}

async function fetchMovieDetail() {
  const movieId = getMovieIdFromURL();
  const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?${api_key}`;
  if (movieId) {
    try {
      const res = await fetch(movieDetailsURL);
      const data = await res.json();
      console.log(data);
      const moiveDetailsEl = document.createElement('div');
      moiveDetailsEl.classList.add('movie-details');
      const {
        title,
        poster_path,
        overview,
        vote_average,
        genres,
        revenue,
        release_date,
      } = data;
      const details = `
      <div class="img-container">
      <h2>${title}</h2>
      <span class="release-date">released: ${release_date}</span>
      <img
        src="${IMG_PATH + poster_path}"
        alt="${title}" />
      <span class="genre">${genres[0].name}</span>
    </div>
    <div class="info-container">
      <h2>OVERVIEW</h2>
      <p>
       ${overview}
      </p>
      <div class="stats">
        <div class="ratings">AVG RATING: ${vote_average}</div>
        <div class="revenue">REVENUE: ${revenue}</div>
      </div>
    </div>
      `;

      moiveDetailsEl.innerHTML = details;
      main.appendChild(moiveDetailsEl);
    } catch (error) {
      console.error(error, 'results not shown');
    }
  } else {
    console.error('API DID NOT WORK');
  }
}

backBtn.addEventListener('click', (event) => {
  event.preventDefault();
  window.history.back();
});

fetchMovieDetail();
