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

window.addEventListener("scroll", function () {
  let header = document.getElementById("banner");
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  header.style.opacity = 1 - scrollTop / 1000;
});
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(10000000, 10000003)
const videoPlayer = document.getElementById('banner-player');
let url = `${apiUrl}/video?film=${rndInt}`;

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
const player = new Plyr('video', {
  clickToPlay: false,
  fullscreen: false
});
player.volume = 0;
player.play()
window.player = player;
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
    player.volume = 50;
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

const moviesContainerAvventura = document.getElementById('avventura');
const urlAvventura = `${apiUrl}/getMoviesByGenre?genre=12`;
fetchMoviesByGenre(urlAvventura, moviesContainerAvventura);

const moviesContainerAzione = document.getElementById('azione');
const urlAzione = `${apiUrl}/getMoviesByGenre?genre=28`;
fetchMoviesByGenre(urlAzione, moviesContainerAzione);

const moviesContainerCommedia = document.getElementById('commedia');
const urlCommedia = `${apiUrl}/getMoviesByGenre?genre=35`;
fetchMoviesByGenre(urlCommedia, moviesContainerCommedia);

const moviesContainerFantasy = document.getElementById('fantasy');
const urlFantasy = `${apiUrl}/getMoviesByGenre?genre=14`;
fetchMoviesByGenre(urlFantasy, moviesContainerFantasy);

const moviesContainerAnimazione = document.getElementById('animazione');
const urlAnimazione = `${apiUrl}/getMoviesByGenre?genre=16`;
fetchMoviesByGenre(urlAnimazione, moviesContainerAnimazione);

const moviesContainerHorror = document.getElementById('horror');
const urlHorror = `${apiUrl}/getMoviesByGenre?genre=27`;
fetchMoviesByGenre(urlHorror, moviesContainerHorror);

const moviesContainerRomantico = document.getElementById('romantico');
const urlRomantico = `${apiUrl}/getMoviesByGenre?genre=10749`;
fetchMoviesByGenre(urlRomantico, moviesContainerRomantico);
