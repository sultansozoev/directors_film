import {apiUrl} from '../api/config.js';

function fetchList(url, container, user_id) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({user_id})
  })
    .then(response => response.json())
    .then(data => {
      data.forEach(list => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('movie-card', 'card');
        cardDiv.classList.add('card');
        cardDiv.style.cursor = 'pointer';
        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = `&times`;
        deleteButton.addEventListener('click',  (event) => {
          event.stopPropagation();
          cardDiv.remove();
          eliminaFavourite(list.movie_id, getCookie("user"), list.type);
        });

        const movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-header');
        movieHeader.style.background = `url("https://image.tmdb.org/t/p/original/${list.poster}") no-repeat center center`;
        movieHeader.style.backgroundSize = 'cover';
        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');
        const movieContentHeader = document.createElement('div');
        movieContentHeader.classList.add('movie-content-header');
        const a = document.createElement('a');
        cardDiv.addEventListener('click', () => {
          if (list.type === 'tv') {
            window.location.href = `new-player-serie.html?serie=${list.movie_id}`;
          } else if (list.type === 'movie') {
            window.location.href = `new-player.html?film=${list.movie_id}`;
          }
        });
        const title = document.createElement('h3');
        title.innerHTML = list.title;
        title.classList.add('aCard');
        a.appendChild(title);
        movieContent.appendChild(a);
        movieContent.appendChild(movieContentHeader);

        cardDiv.appendChild(movieHeader);
        cardDiv.appendChild(movieContent);
        cardDiv.appendChild(deleteButton);
        container.appendChild(cardDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
const container = document.getElementById('container');
const user_id = getCookie("user")
const url = `${apiUrl}/getFavouriteList`;
fetchList(url, container, user_id);
