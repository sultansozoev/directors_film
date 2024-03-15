import { apiUrl } from '/api/config.js';

const searchBar = document.querySelector("[data-search]")
const results_container = document.getElementById("results-container");
results_container.innerText = "";
searchBar.addEventListener("input", (event) => {
  let searchValue = event.target.value.trim().toLowerCase();
  results_container.innerText = "";
  if (searchValue.length === 0 || searchValue === '') return;
  const url = `${apiUrl}/search?title=` + searchValue;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const films = data.films;

      // Clear existing content in container
      results_container.innerHTML = '';

      // Loop through directors and create movie cards
      films.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieLink = document.createElement('a');
        movieLink.setAttribute('href', `player.html?film=${movie.title}`);

        const movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-header', 'movie-image');
        movieHeader.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${movie.poster}')`;

        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');

        const movieContentHeader = document.createElement('div');
        movieContentHeader.classList.add('movie-content-header');

        movieContent.appendChild(movieContentHeader)

        movieLink.appendChild(movieHeader);
        movieLink.appendChild(movieContent);
        movieCard.appendChild(movieLink);

        results_container.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
});
