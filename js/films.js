import { apiUrl } from '/api/config.js';

function fetchDirectorsAndPopulateContainer(url, container, nameId) {
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    query: JSON.stringify({nameId})
  })
    .then(response => response.json())
    .then(data => {
      const films = data.films;
      films.forEach(film => {
        const card = document.createElement('a');
        card.setAttribute('href', `player.html?film=${film.title}&filmId=${film.id_film}`);

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('wrapper');

        const coverImage = document.createElement('img');
        coverImage.src = film.poster_url;
        coverImage.classList.add('cover-image');
        if (film.isPresent === 0) {
          console.log("not present: " + film.title)
          coverImage.classList.add('notPresent');
        }
        wrapperDiv.appendChild(coverImage);

        const titleImage = document.createElement('img');
        if (film.logo_url != null) {
          titleImage.src = film.logo_url;
          titleImage.classList.add('title');
        }
        if (film.isPresent === 0) {
          console.log("not present: " + film.title)
          titleImage.classList.add('notPresent');
        }
        const characterImage = document.createElement('img');
        characterImage.src = film.characterImage;
        characterImage.classList.add('character');
        if (film.isPresent === 0) {
          console.log("not present: " + film.title)
          characterImage.classList.add('notPresent');
        }
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
}

const container = document.getElementById('body');
const queryParams = new URLSearchParams(window.location.search);
const directorId = queryParams.get('directorId');
let url = `${apiUrl}/getFilms?directorId=${directorId}`;
let nameId = `directorId`;
fetchDirectorsAndPopulateContainer(url, container, nameId);

const actorId = queryParams.get('actorId');
url = `${apiUrl}/getFilms?actorId=${actorId}`;
nameId = `actorId`;
fetchDirectorsAndPopulateContainer(url, container, nameId);

export { fetchDirectorsAndPopulateContainer };
