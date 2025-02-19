import { apiUrl } from '../api/config.js';
import { onScroll, scrollWindow, fetchMovies } from './mainFunctions.js';

function fetchContinue(url, container) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(serieTV => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-continue');
        cardDiv.style.background = `url("https://image.tmdb.org/t/p/original/${serieTV.background_image}") no-repeat center center`;
        cardDiv.style.backgroundSize = 'cover';
        cardDiv.classList.add('rounded');
        cardDiv.classList.add('swiper-slide');

        const cardLink = document.createElement('a');
        cardLink.classList.add('card-link');
        cardLink.setAttribute('href', `new-player-serie.html?serie=${serieTV.serie_tv_id}`);
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';
        const url = `https://surio.ddns.net/deleteContinueListSerie`;
        deleteBtn.addEventListener('click',  () => {
          cardDiv.remove();
          deleteContinue(serieTV.serie_tv_id, getCookie("user"), url)
        });
        cardDiv.appendChild(cardLink);
        cardDiv.appendChild(deleteBtn);

        container.appendChild(cardDiv);
      });
      const continueContainer = document.getElementById("continue");
      if (data.length < 1) {
        continueContainer.style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

scrollWindow();

const videoPlayer = document.getElementById('banner-player');
const titleTrailer = document.getElementById('titleTrailer');
const playMovie = document.getElementById('playMovie');
const continueContainer = document.getElementById('continua_guardare');

async function playRandomVideo(fileName) {
  try {
      videoPlayer.src = `${apiUrl}/trailer?tv=${true}&fileName=${fileName}`;
      videoPlayer.play();
  } catch (error) {
    console.error('Error fetching random video:', error);
  }
}

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
    playMovie.href = `new-player-serie.html?serie=${data.trailer.serie_tv_id}`;
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
        fetchMovies(`${apiUrl}${api}${data[id]}`, moviesContainer, "tv");
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

const tutteSerie = document.getElementById('tutteSerie');
const urlTutteSerie = `${apiUrl}/getSeriesTV`;
fetchMovies(urlTutteSerie, tutteSerie, "tv");

const genreUrl = `${apiUrl}/getGenresTV`;
const genreApi = "/getTVByGenre?genre=";
categoryGenre(genreUrl, "", genreApi, "genre_id");

const votedUrl = `${apiUrl}/getVotedTV`;
const votedContainer = document.getElementById("voted_div");
fetchMovies(votedUrl, votedContainer, "tv");

const lastAddedUrl = `${apiUrl}/getLastAddedSerie`;
const lastAddedContainer = document.getElementById("added_r");
fetchMovies(lastAddedUrl, lastAddedContainer, "tv");

const continueUrl = `${apiUrl}/getMoviesByContinueListSerie?user_id=${getCookie("user")}`;
fetchContinue(continueUrl, continueContainer);
