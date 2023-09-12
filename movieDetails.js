/** @format */
const api_key = 'api_key=307b40941d0fad058e7110084ed9cd95';
const backBtn = document.querySelector('.backBtn');

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
