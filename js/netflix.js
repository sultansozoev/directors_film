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
        const movieLink = document.createElement('a');
        movieLink.href = `films.html?${nameId}=${director.id_director}`;

        const movieHeader = document.createElement('img');
        movieHeader.src = `${director.url_image}`;

        movieLink.appendChild(movieHeader);
        container.appendChild(movieLink);
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
        const movieLink = document.createElement('a');
        movieLink.href = `films.html?${nameId}=${actor.id_actor}`;

        const movieHeader = document.createElement('img');
        movieHeader.src = `${actor.url_image}`;

        movieLink.appendChild(movieHeader);
        container.appendChild(movieLink);
      });
    })
    .catch(error => {
      console.error('Error fetching directors:', error);
    });
}

/*function fetchFilmsAddedContainer(url, container, nameId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const films = data.films;

      // Clear existing content in container
      container.innerHTML = '';

      // Loop through directors and create movie cards
      films.forEach(film => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const cube = document.createElement('div');
        cube.classList.add('cube');

        const cubeFace = document.createElement('div');
        cubeFace.classList.add('cube__face');
        cubeFace.classList.add('cube__face--front');

        const poster = document.createElement('div');
        poster.classList.add('poster');

        const img = document.createElement('img');
        img.src = `${film.poster_url}`
        poster.appendChild(img);

        const filmInfo = document.createElement('div');
        filmInfo.classList.add('filmInfo');

        const filmInfoTop = document.createElement('div');
        filmInfoTop.classList.add('filmInfo-top');

        const filmInfoTitle = document.createElement('h2');
        filmInfoTitle.classList.add('filmInfo__title');
        filmInfoTitle.innerText = film.title;

        const filmInfoYear = document.createElement('p');
        filmInfoYear.classList.add('filmInfo__year');
        filmInfoYear.innerText = film.release_date;

        filmInfoTop.appendChild(filmInfoTitle);
        filmInfoTop.appendChild(filmInfoYear);
        filmInfo.appendChild(filmInfoTop);
        cubeFace.appendChild(poster);
        cubeFace.appendChild(filmInfo);

        const cubeFaceRight = document.createElement('div');
        cubeFaceRight.classList.add('cube__face');
        cubeFaceRight.classList.add('cube__face--right');
        const divEmpty = document.createElement('div');
        cubeFaceRight.appendChild(divEmpty);

        const cubeFaceLeft = document.createElement('div');
        cubeFaceLeft.classList.add('cube__face');
        cubeFaceLeft.classList.add('cube__face--left');
        cubeFaceLeft.appendChild(divEmpty);

        cube.appendChild(cubeFace);
        cube.appendChild(cubeFaceRight);
        cube.appendChild(cubeFaceLeft);
        swiperSlide.appendChild(cube);
        container.appendChild(swiperSlide);
      });
    })
    .catch(error => {
      console.error('Error fetching directors:', error);
    });
}
*/

function fetchFilmsAddedContainer(url, container, nameId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const films = data.films;

      // Clear existing content in container
      container.innerHTML = '';

      // Loop through directors and create movie cards
      films.forEach(film => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');

        const cube = document.createElement('div');
        cube.classList.add('cube');

        const cubeFace = document.createElement('div');
        cubeFace.classList.add('cube__face');
        cubeFace.classList.add('cube__face--front');

        const poster = document.createElement('div');
        poster.classList.add('poster');

        const img = document.createElement('img');
        img.src = `${film.poster_url}`
        poster.appendChild(img);

        const filmInfo = document.createElement('div');
        filmInfo.classList.add('filmInfo');

        const filmInfoTop = document.createElement('div');
        filmInfoTop.classList.add('filmInfo-top');

        const filmInfoTitle = document.createElement('h2');
        filmInfoTitle.classList.add('filmInfo__title');
        filmInfoTitle.innerText = film.title;

        const filmInfoYear = document.createElement('p');
        filmInfoYear.classList.add('filmInfo__year');
        filmInfoYear.innerText = film.release_date;

        filmInfoTop.appendChild(filmInfoTitle);
        filmInfoTop.appendChild(filmInfoYear);
        filmInfo.appendChild(filmInfoTop);
        cubeFace.appendChild(poster);
        cubeFace.appendChild(filmInfo);

        const cubeFaceRight = document.createElement('div');
        cubeFaceRight.classList.add('cube__face');
        cubeFaceRight.classList.add('cube__face--right');
        const divEmpty = document.createElement('div');
        cubeFaceRight.appendChild(divEmpty);

        const cubeFaceLeft = document.createElement('div');
        cubeFaceLeft.classList.add('cube__face');
        cubeFaceLeft.classList.add('cube__face--left');
        cubeFaceLeft.appendChild(divEmpty);

        cube.appendChild(cubeFace);
        cube.appendChild(cubeFaceRight);
        cube.appendChild(cubeFaceLeft);
        swiperSlide.appendChild(cube);
        container.appendChild(swiperSlide);
      });
    })
    .catch(error => {
      console.error('Error fetching directors:', error);
    });
}

const moviesContainer = document.getElementById('random-directors');
const directorsUrl = `${apiUrl}/getDirectors`;
let nameId = `directorId`;
fetchDirectorsAndPopulateContainer(directorsUrl, moviesContainer, nameId);

const actorsContainer = document.getElementById('random-actors');
const actorsUrl = `${apiUrl}/getActors`;
nameId = `actorId`;
fetchActorsAndPopulateContainer(actorsUrl, actorsContainer, nameId);

const filmsContainer = document.getElementById('gg');
const filmsAddedUrl = `${apiUrl}/getFilmsAdded`;
nameId = `filmId`;
fetchFilmsAddedContainer(filmsAddedUrl, filmsContainer, nameId);

const filmsGoldenGlobe = document.getElementById('golden_globe');
const filmsGoldenGlobeUrl = `${apiUrl}/getFilmsGoldenGlobe`;
nameId = `filmId`;
fetchFilmsAddedContainer(filmsGoldenGlobeUrl, filmsGoldenGlobe, nameId);
