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

function onScroll() {
  const element = document.getElementById('second');
  const video = document.getElementById("banner");
  if (element) {
    const rect = element.getBoundingClientRect();
    const elementIsVisible = (rect.top >= 0) && (rect.bottom <= window.innerHeight);
    if (elementIsVisible) {
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
  header.style.opacity = 1 - scrollTop / 1000;
});
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(10000000, 10000001)
const videoPlayer = document.getElementById('banner-player');
let url = `${apiUrl}/videoSerieTV?film=${rndInt}`;

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
player.play();
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
const tutteSerie = document.getElementById('tutteSerie');
const urlTutteSerie = `${apiUrl}/getSeriesTV`;
fetchMoviesByGenre(urlTutteSerie, tutteSerie);
