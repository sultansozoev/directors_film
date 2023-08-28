import { apiUrl } from '/api/config.js';

const container = document.getElementById('body');
const queryParams = new URLSearchParams(window.location.search);
const directorId = queryParams.get('directorId');
const url = `${apiUrl}/getFilms?directorId=${directorId}`;

fetch(url, {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  query: JSON.stringify({ directorId })
})
  .then(response => response.json())
  .then(data => {
    const films = data.films;
    films.forEach(film => {
      const card = document.createElement('a');
      card.setAttribute('href', `player.html?film=${film.title}`);

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');

      const wrapperDiv = document.createElement('div');
      wrapperDiv.classList.add('wrapper');

      const coverImage = document.createElement('img');
      coverImage.src = film.poster_url;
      coverImage.classList.add('cover-image');
      wrapperDiv.appendChild(coverImage);

      const titleImage = document.createElement('img');
      titleImage.src = film.logo_url;
      titleImage.classList.add('title');

      const characterImage = document.createElement('img');
      characterImage.src = film.characterImage;
      characterImage.classList.add('character');

      // Append the wrapper div to the card div
      cardDiv.appendChild(wrapperDiv);
      cardDiv.appendChild(titleImage);
      cardDiv.appendChild(characterImage);

      // Append the card div to the container
      card.appendChild(cardDiv);
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching films:', error);
  });
