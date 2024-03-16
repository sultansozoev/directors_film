import { apiUrl } from '/api/config.js';

function fetchMoviesByGenre(url, container) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      const movies = data.films;
      movies.forEach(movie => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('swiper-slide');

        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');
        const a = document.createElement('a');
        a.setAttribute('href', `player.html?film=${movie.title}`);
        const image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original/" + movie.poster;

        a.appendChild(image);
        imageBox.appendChild(a);
        cardDiv.appendChild(imageBox);
        container.appendChild(cardDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

const moviesContainerAvventura = document.getElementById('avventura');
const directorsUrlAvventura = `${apiUrl}/getMoviesByGenre?genre=Avventura`;
fetchMoviesByGenre(directorsUrlAvventura, moviesContainerAvventura);

const moviesContainerAzione = document.getElementById('azione');
const directorsUrlAzione = `${apiUrl}/getMoviesByGenre?genre=Azione`;
fetchMoviesByGenre(directorsUrlAzione, moviesContainerAzione);

const moviesContainerCommedia = document.getElementById('commedia');
const directorsUrlCommedia = `${apiUrl}/getMoviesByGenre?genre=Commedia`;
fetchMoviesByGenre(directorsUrlCommedia, moviesContainerCommedia);

const moviesContainerFantasy = document.getElementById('fantasy');
const directorsUrlFantasy = `${apiUrl}/getMoviesByGenre?genre=Fantasy`;
fetchMoviesByGenre(directorsUrlFantasy, moviesContainerFantasy);

const moviesContainerAnimazione = document.getElementById('animazione');
const directorsUrlAnimazione = `${apiUrl}/getMoviesByGenre?genre=Animazione`;
fetchMoviesByGenre(directorsUrlAnimazione, moviesContainerAnimazione);

const moviesContainerHorror = document.getElementById('horror');
const directorsUrlHorror = `${apiUrl}/getMoviesByGenre?genre=Horror`;
fetchMoviesByGenre(directorsUrlHorror, moviesContainerHorror);
