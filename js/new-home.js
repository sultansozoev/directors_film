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
      data.forEach(movie => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-continue');
        cardDiv.style.background = `url("https://image.tmdb.org/t/p/original/${movie.background_image}") no-repeat center center`;
        cardDiv.style.backgroundSize = 'cover';
        cardDiv.classList.add('rounded');
        cardDiv.classList.add('swiper-slide');

        const cardLink = document.createElement('a');
        cardLink.classList.add('card-link');
        if (movie.type === 'tv') {
          cardLink.setAttribute('href', `new-player-serie.html?serie=${movie.movie_id}`);
        } else if (movie.type === 'movie') {
          cardLink.setAttribute('href', `new-player.html?film=${movie.movie_id}`);
        }

        let progressPercentage = 0;
        if (movie.runtime > 0) {
          const totalSeconds = movie.runtime * 60;
          progressPercentage = Math.min((movie.player_time / totalSeconds) * 100, 100);
        }
        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('progress-bar-container');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.style.width = `${progressPercentage}%`;

        progressBarContainer.appendChild(progressBar);

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';

        deleteBtn.addEventListener('click', () => {
          cardDiv.remove();
          deleteContinue(movie.movie_id, getCookie("user"), movie.type);
        });

        cardDiv.appendChild(cardLink);
        cardDiv.appendChild(deleteBtn);
        cardDiv.appendChild(progressBarContainer);

        container.appendChild(cardDiv);
      });

      const continueContainer = document.getElementById("continue");
      if (data.length < 1) {
        continueContainer.style.setProperty('display', 'none', 'important');
        continueContainer.classList.add('hidden');
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
    player.volume = 1;
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
        fetchMovies(`${apiUrl}${api}${data[id]}`, moviesContainer);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

const genreUrl = `${apiUrl}/getGenres`;
const genreApi = "/getAllByGenre?genre=";
categoryGenreSaga(genreUrl, "", genreApi, "genre_id");

const trendingUrl = `${apiUrl}/getTrendingAll`;
const moviesContainer = document.getElementById("trending");
fetchMovies(trendingUrl, moviesContainer);

const votedUrl = `${apiUrl}/getVotedAll`;
const votedContainer = document.getElementById("voted_div");
fetchMovies(votedUrl, votedContainer);

const yourListUrl = `${apiUrl}/getYourListAll?user_id=`+getCookie("user");
const yourListContainer = document.getElementById("lista");
fetchMovies(yourListUrl, yourListContainer);

const lastAddedUrl = `${apiUrl}/getLastAddedAll`;
const lastAddedContainer = document.getElementById("added_r");
fetchMovies(lastAddedUrl, lastAddedContainer);

const continueContainer = document.getElementById("continua_guardare");
fetchContinue(`${apiUrl}/getMoviesByContinueListAll?user_id=${getCookie("user")}`, continueContainer);
