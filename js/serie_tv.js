import { apiUrl } from '../api/config.js';
import { onScroll, scrollWindow } from './mainFunctions.js';

function fetchMovies(url, container) {
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

scrollWindow();

const videoPlayer = document.getElementById('banner-player');
const titleTrailer = document.getElementById('titleTrailer');
const playMovie = document.getElementById('playMovie');

async function playRandomVideo(fileName) {
  try {
      videoPlayer.src = `${apiUrl}/trailer?tv=${true}&fileName=${fileName}`;
      videoPlayer.play();
      //videoPlayer.onended = playRandomVideo;
  } catch (error) {
    console.error('Error fetching random video:', error);
  }
}
/*
function category(url, container) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('container');
        cardDiv.classList.add('swiper');

        const h1 = document.createElement('h1');
        h1.classList.add('text-black');
        h1.classList.add('px-4');
        h1.innerText = category.category_name;
        const slideDiv = document.createElement('div');
        slideDiv.classList.add("slide-container");
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add("card-wrapper");
        cardWrapper.classList.add("swiper-wrapper");

        fetchMoviesByGenre(`${apiUrl}/getMoviesByCategory?category=${category.category_id}`, cardWrapper);

        slideDiv.appendChild(cardWrapper);
        cardDiv.appendChild(h1);
        cardDiv.appendChild(slideDiv);
        container.appendChild(cardDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

const categoriesUrl = `${apiUrl}/getCategories`;
const categoriesDiv = document.getElementById('categories');
category(categoriesUrl, categoriesDiv);
*/
const urlTrailerSelector = `${apiUrl}/trailerSelector?tv=${true}`;

const player = new Plyr('video', {
  clickToPlay: false,
  fullscreen: false
});
player.volume = 0;
player.play();
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
    playMovie.href = `player_serie.html?serie=${data.trailer.serie_tv_id}`;
    videoPlayer.setAttribute('poster', "https://image.tmdb.org/t/p/original" + data.trailer.background_image);
    await playRandomVideo(data.trailer.serie_tv_id);
  })
  .catch(error => {
    console.error('Error fetching films:', error);
  });

videoPlayer.onclick = function () {
  if (player.muted) {
    player.muted = false;
    player.volume = 1;
  } else {
    player.muted = true;
    player.volume = 0;
  }
};

function categoryGenre(url, id_container, api, id) {
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

const tutteSerie = document.getElementById('tutteSerie');
const urlTutteSerie = `${apiUrl}/getSeriesTV`;
fetchMovies(urlTutteSerie, tutteSerie);

const genreUrl = `${apiUrl}/getGenresTV`;
const genreApi = "/getTVByGenre?genre=";
categoryGenre(genreUrl, "", genreApi, "genre_id");
