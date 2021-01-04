// *======= API =======*
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8474014efb37e489ad1a5299e6ae7a88&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/original";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=8474014efb37e489ad1a5299e6ae7a88&query=";

getMovies(API_URL);

// *======= SELECTOR =======*
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// *======= EVENT LISTENER =======*
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

// *======= FUNCTION =======*
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, overview, poster_path, vote_average } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
      <img
        src="${IMG_PATH + poster_path}"
        alt=""
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${movieRating(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>`;

    main.appendChild(movieElement);
  });
}

function movieRating(rate) {
  if (rate >= 7) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
