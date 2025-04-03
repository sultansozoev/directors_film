import {apiUrl} from "../api/config.js";

export async function searchTitleAll(url, results_container, type) {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET'
    });

    const data = await response.json();
    const films = data.films || [];

    results_container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    films.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'rounded-circle', 'bg-dark');

      const favoriteIcon = document.createElement('span');
      favoriteIcon.innerHTML = "&#10084;";
      favoriteIcon.classList.add('favorite-icon');

      const currentType = movie.type || type;
      if (!type || type === "movie") {
        checkIfFavorite(movie.movie_id, favoriteIcon, currentType);
      } else if (type === 'tv') {
          checkIfFavorite(movie.serie_tv_id, favoriteIcon, currentType);
      }

      const imageBox = document.createElement('div');
      imageBox.classList.add('image-box');

      const a = document.createElement('a');
      if (!type || type === "movie") {
        a.setAttribute('href', getMovieUrl(movie.movie_id, currentType));
      } else if (type === 'tv') {
        a.setAttribute('href', getMovieUrl(movie.serie_tv_id, currentType));
      }

      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/original/${movie.poster}`;
      image.alt = movie.title || "Movie Poster";

      a.appendChild(image);
      imageBox.appendChild(a);

      cardDiv.appendChild(favoriteIcon);
      cardDiv.appendChild(imageBox);
      movieCard.appendChild(cardDiv);
      fragment.appendChild(movieCard);
    });

    results_container.appendChild(fragment);
  } catch (error) {
    console.error('Error fetching films:', error);
  }
}

export function searchPerson(url, results_container) {
  fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  })
    .then(async response => {
      const data = await response.json();
      results_container.innerHTML = '';
      const persons = data.persons;
      const fragment = document.createDocumentFragment();
      persons.forEach(person => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'rounded-circle', 'swiper-slide', 'bg-dark');

        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');

        const a = document.createElement('a');
        a.setAttribute('href', '');

        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/original/${person.profile_path}`;

        a.appendChild(image);
        imageBox.appendChild(a);

        cardDiv.appendChild(imageBox);
        fragment.appendChild(cardDiv);
      });
      results_container.appendChild(fragment);
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

export function fetchMovies(url, container, type) {
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

        const currentType = movie.type || type;
        const movie_id = movie.movie_id || movie.serie_tv_id;
        if (getCookie("user"))
          await checkIfFavorite(movie_id, favoriteIcon, currentType);

        const imageBox = document.createElement('div');
        imageBox.classList.add('image-box');

        const a = document.createElement('a');
        a.setAttribute('href', getMovieUrl(movie_id, currentType));

        const image = document.createElement('img');
        image.src = `https://image.tmdb.org/t/p/original/${movie.poster}`;

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

function getMovieUrl(movie_id, type) {
  return type === 'tv' ? `new-player-serie.html?serie=${movie_id}` : `new-player.html?film=${movie_id}`;
}

async function checkIfFavorite(movie_id, favoriteIcon, type) {
  let getFavouriteUrl = type === 'tv' ? `${apiUrl}/getFavouriteTV` : `${apiUrl}/getFavourite`;

  const user_id = getCookie("user");
  try {
    const response = await fetch(getFavouriteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movie_id: movie_id,
        user_id: user_id
      })
    });

    const data = await response.json();
    if (data.length > 0) {

      favoriteIcon.classList.add('favorite-selected');
      favoriteIcon.onclick = (event) => {
        event.stopPropagation();
        removeFavorite(movie_id, favoriteIcon, type);
      };
    } else {
      favoriteIcon.classList.remove('favorite-selected');
      favoriteIcon.onclick = (event) => {
        event.stopPropagation();
        addToFavorites(movie_id, favoriteIcon, type);
      };
    }
  } catch (error) {
    console.error("Error checking favorite status:", error);
  }
}

export async function addToFavorites(movie_id, icon, type) {
  let getFavouriteUrl = type === 'tv' ? `${apiUrl}/addFavouriteTV` : `${apiUrl}/addFavourite`;
  const user_id = getCookie("user");
  try {
    const response = await fetch(getFavouriteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movie_id: movie_id,
        user_id: user_id
      })
    });

    const data = await response.json();

    if (data.success) {
      icon.classList.add("favorite-selected");
      icon.onclick = (event) => {
        event.stopPropagation();
        removeFavorite(movie_id, icon, type);
      };
    } else {
      console.error("Error adding to favorites!");
    }
  } catch (error) {
    console.error("Error sending the request:", error);
  }
}

export async function removeFavorite(movie_id, icon, type) {
  let getFavouriteUrl = type === 'tv' ? `${apiUrl}/removeFavouriteTV` : `${apiUrl}/removeFavourite`;
  const user_id = getCookie("user");
  try {
    const response = await fetch(getFavouriteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movie_id: movie_id,
        user_id: user_id
      })
    });

    const data = await response.json();

    if (data.success) {
      icon.classList.remove("favorite-selected");
      icon.onclick = (event) => {
        event.stopPropagation();
        addToFavorites(movie_id, icon, type);
      };
    } else {
      console.error("Error removing favorite:", data.message);
    }
  } catch (error) {
    console.error("Error sending the request:", error);
  }
}

export function onScroll() {
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

export function scrollWindow() {
  window.addEventListener("scroll", function () {
    let header = document.getElementById("banner");
    let scrollTop = document.documentElement.scrollTop;
    header.style.opacity = `${1 - scrollTop / 1000}`;
  });
}
