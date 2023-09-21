import { apiUrl } from '/api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const film = queryParams.get('film');
let url = `${apiUrl}/video?film=${encodeURIComponent(film)}`;

const videoPlayer = document.getElementById('player');
const body = document.getElementById('body');
const title = document.getElementById('title');
const year = document.getElementById('year');
const budget = document.getElementById('budget');
const isPresent = document.getElementById('isPresent');
const cardImage = document.getElementById('card-image');
const sourceElement = videoPlayer.querySelectorAll('source')[0];

const player = new Plyr('video', { captions: { active: true } });
window.player = player;

fetch(url)
  .then(response => response.url)  // Get the URL directly
  .then(videoUrl => {
    sourceElement.src = videoUrl;
    videoPlayer.load();
  });

url = `${apiUrl}/film?title=${encodeURIComponent(film)}`;
fetch(url)
  .then(response => response.json())  // Get the URL directly
  .then(data => {
    const film = data.film[0];
    year.appendChild(document.createTextNode(film.release_date));
    if (film.budget != null) {
      console.log(film.budget)
      const budgetFormattato  = film.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      budget.appendChild(document.createTextNode(budgetFormattato+"$"));
    } else {
      budget.appendChild(document.createTextNode("non è ancora inserito questo dato nel database"));
    }
    title.appendChild(document.createTextNode(film.title));
    if (film.isPresent === 1) {
      isPresent.appendChild(document.createTextNode("Si"));
    } else {
      isPresent.appendChild(document.createTextNode("No"));
    }
    cardImage.setAttribute("style", `background-image: url("${film.poster_url}");`);
    videoPlayer.setAttribute('data-poster', film.background)
    body.setAttribute("style", `background-image: url("${film.background}"); backdrop-filter: blur(5px);`)
  });
