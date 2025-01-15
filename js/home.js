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
        cardDiv.classList.add('rounded-circle');
        cardDiv.classList.add('swiper-slide');
        cardDiv.classList.add('bg-dark');

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

const videoPlayer = document.getElementById('banner-player');
const titleTrailer = document.getElementById('titleTrailer');
const playMovie = document.getElementById('playMovie');

const urlTrailerSelector = `${apiUrl}/trailerSelector`;

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

fetch(urlTrailerSelector, {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET'
})
  .then(response => response.json())
  .then(async data => {
    titleTrailer.innerHTML = data.trailer.title;
    playMovie.href = "new-player.html?film=" + data.trailer.movie_id;
    console.log(data.trailer.background_image)
    videoPlayer.setAttribute('poster', "https://image.tmdb.org/t/p/original" + data.trailer.background_image);
    await playRandomVideo(data.trailer.movie_id);
  })
  .catch(error => {
    console.error('Error fetching films:', error);
  });

async function playRandomVideo(fileName) {
  try {
    videoPlayer.src = `${apiUrl}/trailer?fileName=${fileName}`;
    videoPlayer.play();
  } catch (error) {
    console.error('Error fetching random video:', error);
  }
}

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
