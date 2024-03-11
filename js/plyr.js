import { apiUrl } from '/api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const film = queryParams.get('film');
let url = `${apiUrl}/video?film=${encodeURI(film)}`;
const id = queryParams.get('filmId');
const videoPlayer = document.getElementById('player');
const body = document.getElementById('body');
const title = document.getElementById('title');
const year = document.getElementById('year');
const budget = document.getElementById('budget');
const isPresent = document.getElementById('cb2');
const cardImage = document.getElementById('card-image');
const sourceElement = videoPlayer.querySelectorAll('source')[0];
const subtitle = document.getElementById('subtitle');
const subtitleUrl = `${apiUrl}/subtitle?film=${encodeURI(film)}`;
const controls =
  [
    'play-large', // The large play button in the center
    'restart', // Restart playback
    'rewind', // Rewind by the seek time (default 10 seconds)
    'play', // Play/pause playback
    'fast-forward', // Fast forward by the seek time (default 10 seconds)
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'duration', // The full duration of the media
    'mute', // Toggle mute
    'volume', // Volume control
    'captions', // Toggle captions
    'settings', // Settings menu
    'pip', // Picture-in-picture (currently Safari only)
    'airplay', // Airplay (currently Safari only)
    'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
    'fullscreen' // Toggle fullscreen
  ];

const player = new Plyr('video', { captions: { active: true }, controls });
player.elements.container.tabIndex = 0;
player.config.urls.download = url;
window.player = player;

isPresent.addEventListener('change', function () {
  const isPresentUrl = `${apiUrl}/isPresent`;
  if (this.checked) {
    fetch(isPresentUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({id_film: id, isPresent: 1})
    }).catch(error => {
      console.error('Error fetching films:', error);
    });
  } else {
    fetch(isPresentUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({id_film: id, isPresent: 0})
    }).catch(error => {
      console.error('Error fetching films:', error);
    });
  }
});

fetch(url)
  .then(response => response.url)
  .then(videoUrl => {
    sourceElement.src = videoUrl;
    videoPlayer.load();
  });

fetch(subtitleUrl)
    .then(response => response.url)
    .then(videoUrl => {
      subtitle.src = videoUrl;
      console.log(videoUrl);
    });

url = `${apiUrl}/film?title=${encodeURI(film)}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    const film = data.film[0];
    year.appendChild(document.createTextNode(film.release_date));
    if (film.budget != null) {
      const budgetFormattato  = film.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      budget.appendChild(document.createTextNode(budgetFormattato+"$"));
    } else {
      budget.appendChild(document.createTextNode("non è ancora inserito questo dato nel database"));
    }
    title.appendChild(document.createTextNode(film.title));
    if (film.isPresent === 1)
      isPresent.setAttribute('checked', 'checked');
    cardImage.setAttribute("style", `background-image: url("${film.poster_url}");`);
    videoPlayer.setAttribute('data-poster', film.background);
    setTimeout(() => {
      player.poster = film.background;
    }, 500)
    body.setAttribute("style", `background-image: url("${film.background}"); backdrop-filter: blur(5px);`);
  });
