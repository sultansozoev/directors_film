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
      data.forEach(serieTV => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('rounded-circle');
        cardDiv.classList.add('swiper-slide');

        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');
        const a = document.createElement('a');
        a.setAttribute('href', `player_serie.html?serie=${serieTV.serie_tv_id}`);
        const image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original/" + serieTV.poster;

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

const tutteSerie = document.getElementById('tutteSerie');
const urlTutteSerie = `${apiUrl}/getSeriesTV`;
fetchMoviesByGenre(urlTutteSerie, tutteSerie);
