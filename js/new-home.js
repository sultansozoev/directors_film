import { apiUrl } from '../api/config.js';
import { onScroll, scrollWindow } from './mainFunctions.js';

function fetchMovies(url, container) {
  fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  })
    .then(response => response.json())
    .then(async data => {
      for (const movie of data) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'rounded-circle', 'swiper-slide', 'bg-dark');

        const favoriteIcon = document.createElement('span');
        favoriteIcon.innerHTML = "&#10084;";
        favoriteIcon.classList.add('favorite-icon');
        await checkIfFavorite(movie, favoriteIcon, movie.type);

        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');

        const a = document.createElement('a');
        if (movie.type === 'tv') {
          a.setAttribute('href', `new-player-serie.html?serie=${movie.movie_id}`);
        } else if (movie.type === 'movie') {
          a.setAttribute('href', `new-player.html?film=${movie.movie_id}`);
        }

        const image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/original/" + movie.poster;

        a.appendChild(image);
        imageBox.appendChild(a);

        cardDiv.appendChild(favoriteIcon);
        cardDiv.appendChild(imageBox);
        container.appendChild(cardDiv);
      }
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

async function checkIfFavorite(movie, favoriteIcon, type) {
  let getFavouriteUrl = `${apiUrl}/getFavourite`;
  const user_id = getCookie("user");
  if (type === 'tv') {
    getFavouriteUrl = `${apiUrl}/getFavouriteTV`;
  }
  try {
    const response = await fetch(getFavouriteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movie_id: movie.movie_id,
        user_id: user_id
      })
    });

    const data = await response.json();

    if (data.length > 0) {
      favoriteIcon.classList.add('favorite-selected');
      favoriteIcon.onclick = (event) => {
        event.stopPropagation();
        removeFavorite(movie, favoriteIcon, type);
      };
    } else {
      favoriteIcon.classList.remove('favorite-selected');
      favoriteIcon.onclick = (event) => {
        event.stopPropagation();
        addToFavorites(movie, favoriteIcon, type);
      };
    }
  } catch (error) {
    console.error("Error checking favorite status:", error);
  }
}

async function addToFavorites(movie, icon, type) {
  let getFavouriteUrl = `${apiUrl}/addFavourite`;
  const user_id = getCookie("user");
  if (type === 'tv') {
    getFavouriteUrl = `${apiUrl}/addFavouriteTV`;
  }
  try {
    const response = await fetch(getFavouriteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movie_id: movie.movie_id,
        user_id: user_id
      })
    });

    const data = await response.json();

    if (data.success) {
      icon.classList.add("favorite-selected");
      icon.onclick = (event) => {
        event.stopPropagation();
        removeFavorite(movie, icon);
      };
    } else {
      console.error("Error adding to favorites!");
    }
  } catch (error) {
    console.error("Error sending the request:", error);
  }
}

async function removeFavorite(movie, icon, type) {
  let getFavouriteUrl = `${apiUrl}/removeFavourite`;
  const user_id = getCookie("user");
  if (type === 'tv') {
    getFavouriteUrl = `${apiUrl}/removeFavouriteTV`;
  }
  try {
    const response = await fetch(getFavouriteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movie_id: movie.movie_id,
        user_id: user_id
      })
    });

    const data = await response.json();

    if (data.success) {
      icon.classList.remove("favorite-selected");
      icon.onclick = (event) => {
        event.stopPropagation();
        addToFavorites(movie, icon);
      };
    } else {
      console.error("Error removing favorite:", data.message);
    }
  } catch (error) {
    console.error("Error sending the request:", error);
  }
}

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
        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;';

        deleteBtn.addEventListener('click',  () => {
          cardDiv.remove();
          deleteContinue(movie.movie_id, getCookie("user"), movie.type)
        });
        cardDiv.appendChild(cardLink);
        cardDiv.appendChild(deleteBtn);

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

const lastAddedUrl = `${apiUrl}/getLastAddedAll`;
const lastAddedContainer = document.getElementById("added_r");
fetchMovies(lastAddedUrl, lastAddedContainer);

const continueContainer = document.getElementById("continua_guardare");
fetchContinue(`${apiUrl}/getMoviesByContinueListAll?user_id=${getCookie("user")}`, continueContainer);
