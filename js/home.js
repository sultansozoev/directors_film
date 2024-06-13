import { apiUrl } from '../api/config.js';
import { onScroll, scrollWindow } from './mainFunctions.js';

function fetchMovies(url, container, deleteButton) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(movie => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('rounded-circle')
        cardDiv.classList.add('swiper-slide');

        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');
        const a = document.createElement('a');
        a.setAttribute('href', `new-player.html?film=${movie.movie_id}`);
        const image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original/" + movie.poster;

        a.appendChild(image);
        imageBox.appendChild(a);
        cardDiv.appendChild(imageBox);

        if (deleteButton) {
          const deleteBtn = document.createElement('button');
          deleteBtn.classList.add('delete-button');
          const svg = document.createElement('img');
          svg.setAttribute("src", "../img/x-circle.svg");
          deleteBtn.appendChild(svg);
          cardDiv.appendChild(deleteBtn);
        }
        container.appendChild(cardDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

scrollWindow();

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(10000000, 10000009)
const videoPlayer = document.getElementById('banner-player');
let url = `${apiUrl}/works-in-chrome-and-safari?film=${rndInt}`;

const player = new Plyr('video', {
  clickToPlay: false,
  fullscreen: false
});
player.volume = 0;
player.play()
player.muted = true;
player.loop = true;
window.player = player;
window.onscroll = onScroll;
fetch(url, {
})
  .then(response => response.url)
  .then(videoUrl => {
    videoPlayer.src = videoUrl;
  }).catch(e => {
    console.log(e)
  });
videoPlayer.onclick = function () {
  if (player.muted) {
    player.muted = false;
    player.volume = 0.3;
  } else {
    player.muted = true;
    player.volume = 0;
  }
};

function categoryGenreSaga(url, id_container, api, id) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(data => {
        const title = data[id] + id_container;
        const moviesContainer = document.getElementById(title);
        fetchMovies(`${apiUrl}${api}${data[id]}`, moviesContainer, false);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

const categoryUrl = `${apiUrl}/getCategories`;
const categoryApi = "/getMoviesByCategory?category=";
categoryGenreSaga(categoryUrl, "", categoryApi, "category_id");

const sagaUrl = `${apiUrl}/getSagas`;
const sagaApi = "/getMoviesBySaga?saga=";
categoryGenreSaga(sagaUrl, "_saga", sagaApi, "saga_id");

const genreUrl = `${apiUrl}/getGenres`;
const genreApi = "/getMoviesByGenre?genre=";
categoryGenreSaga(genreUrl, "", genreApi, "genre_id");

const continueContainer = document.getElementById("continue");
fetchMovies(`${apiUrl}/getMoviesHistory?user_id=${getCookie("user")}`, continueContainer, true);
