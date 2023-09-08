import { apiUrl } from '/api/config.js';

function fetchDirectorsAndPopulateContainer(url, container, nameId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const directors = data.directors;

      // Clear existing content in container
      container.innerHTML = '';

      // Loop through directors and create movie cards
      directors.forEach(director => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieLink = document.createElement('a');
        movieLink.href = `films.html?${nameId}=${director.id_director}`;

        const movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-header', 'movie-image');
        movieHeader.style.backgroundImage = `url('${director.url_image}')`;

        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');

        const movieContentHeader = document.createElement('div');
        movieContentHeader.classList.add('movie-content-header');

        const movieTitle = document.createElement('h3');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = `${director.first_name} ${director.last_name}`; // Replace with actual data

        movieContentHeader.appendChild(movieTitle);
        movieContent.appendChild(movieContentHeader)

        movieLink.appendChild(movieHeader);
        movieLink.appendChild(movieContent);
        movieCard.appendChild(movieLink);

        container.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error fetching directors:', error);
    });
}

function fetchActorsAndPopulateContainer(url, container, nameId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const actors = data.actors;

      // Clear existing content in container
      container.innerHTML = '';

      // Loop through directors and create movie cards
      actors.forEach(actor => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieLink = document.createElement('a');
        movieLink.href = `films.html?${nameId}=${actor.id_actor}`;

        const movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-header', 'movie-image');
        movieHeader.style.backgroundImage = `url('${actor.url_image}')`;

        const movieContent = document.createElement('div');
        movieContent.classList.add('movie-content');

        const movieContentHeader = document.createElement('div');
        movieContentHeader.classList.add('movie-content-header');

        const movieTitle = document.createElement('h3');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = `${actor.first_name} ${actor.last_name}`; // Replace with actual data

        movieContentHeader.appendChild(movieTitle);
        movieContent.appendChild(movieContentHeader)

        movieLink.appendChild(movieHeader);
        movieLink.appendChild(movieContent);
        movieCard.appendChild(movieLink);

        container.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error fetching directors:', error);
    });
}

const moviesContainer = document.getElementById('movies-container');
const directorsUrl = `${apiUrl}/getDirectors`;
let nameId = `directorId`;
fetchDirectorsAndPopulateContainer(directorsUrl, moviesContainer, nameId);

const actorsContainer = document.getElementById('actors-container');
const actorsUrl = `${apiUrl}/getActors`;
nameId = `actorId`;
fetchActorsAndPopulateContainer(actorsUrl, actorsContainer, nameId);
