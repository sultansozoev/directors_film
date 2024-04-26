import { apiUrl } from '/api/config.js';
import { onScroll, scrollWindow } from './mainFunctions.js';

function fetchMoviesByGenre(url, container) {
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
        a.setAttribute('href', `player.html?film=${movie.movie_id}`);
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

scrollWindow();

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(10000000, 10000003)
const videoPlayer = document.getElementById('banner-player');
let url = `${apiUrl}/video?film=10000000`;

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
    player.volume = 0.4;
  } else {
    player.muted = true;
    player.volume = 0;
  }
};

function genre(url) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(genre => {
        const moviesContainer = document.getElementById(genre.genre_id);
        fetchMoviesByGenre(`${apiUrl}/getMoviesByGenre?genre=${genre.genre_id}`, moviesContainer);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
const genreUrl = `${apiUrl}/getGenres`;
genre(genreUrl);

function category(url) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const moviesContainer = document.getElementById(category.category_id);
        fetchMoviesByGenre(`${apiUrl}/getMoviesByCategory?category=${category.category_id}`, moviesContainer);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
const categoryUrl = `${apiUrl}/getCategories`;
category(categoryUrl);
