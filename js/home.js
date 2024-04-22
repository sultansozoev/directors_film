import { apiUrl } from '/api/config.js';

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

function onScroll() {
  const element = document.getElementById('second');
  const video = document.getElementById("banner");
  if (element) {
    const rect = element.getBoundingClientRect();
    const elementIsVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

    if (elementIsVisible && !player.muted) {
      player.volume = 0.1;
    }
  }
  if (video) {
    const rect = video.getBoundingClientRect();
    const elementIsVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);

    if (elementIsVisible && !player.muted) {
      player.volume = 0.4;
    }
  }
}

window.addEventListener("scroll", function () {
  let header = document.getElementById("banner");
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  header.style.opacity = `${1 - scrollTop / 1000}`;
});

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

const oscar = document.getElementById('oscar');
const urlOscar = `${apiUrl}/getMoviesByCategory?category=6`;
fetchMoviesByGenre(urlOscar, oscar);

const starWars = document.getElementById('starWars');
const urlStarWars = `${apiUrl}/getMoviesByCategory?category=3`;
fetchMoviesByGenre(urlStarWars, starWars);

const pixar = document.getElementById('pixar');
const urlPixar = `${apiUrl}/getMoviesByCategory?category=4`;
fetchMoviesByGenre(urlPixar, pixar);

const studioGhibli = document.getElementById('studioGhibli');
const urlStudioGhibli = `${apiUrl}/getMoviesByCategory?category=2`;
fetchMoviesByGenre(urlStudioGhibli, studioGhibli);

const ultimiAggiunti = document.getElementById('ultimiAggiunti');
const urlUltimiAggiunti = `${apiUrl}/getMoviesByCategory?category=1`;
fetchMoviesByGenre(urlUltimiAggiunti, ultimiAggiunti);

const imax = document.getElementById('imax');
const urlImax = `${apiUrl}/getMoviesByCategory?category=5`;
fetchMoviesByGenre(urlImax, imax);

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
