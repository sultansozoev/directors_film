import {apiUrl} from "../api/config.js";

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

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
        const itemLi = document.createElement('li');
        itemLi.classList.add('item');
        itemLi.style.backgroundImage = `url('${film.background}')`;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        const card = document.createElement('a');
        card.setAttribute('href', `player.html?film=${film.title}`);

        const titleH2 = document.createElement('h2');
        titleH2.classList.add('title');
        titleH2.innerHTML = film.title;

        const descriptionP = document.createElement('p');
        descriptionP.classList.add('description');

        card.appendChild(titleH2);
        contentDiv.appendChild(card);
        contentDiv.appendChild(descriptionP);
        itemLi.appendChild(contentDiv);
        container.appendChild(itemLi);
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
