import { apiUrl } from '/api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const film = queryParams.get('film');
let url = `${apiUrl}/video?film=${film}`;
const videoPlayer = document.getElementById('player');
const body = document.getElementById('body');
const title = document.getElementById('title');
const year = document.getElementById('year');
const budget = document.getElementById('budget');
const cardImage = document.getElementById('card-image');
const sourceElement = videoPlayer.querySelectorAll('source')[0];
const subtitle = document.getElementById('subtitle');
const subtitleUrl = `${apiUrl}/subtitle?film=${film}`;
const downloadUrl = `${apiUrl}/download?film=${film}`;
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

let token = getCookie("jwt");
const player = new Plyr('video', {captions: {active: true}, controls});
player.elements.container.tabIndex = 0;
window.player = player;

if (token) {
  player.config.urls.download = downloadUrl;

  fetch(url, {
  })
    .then(response => response.url)
    .then(videoUrl => {
      sourceElement.src = videoUrl;
      videoPlayer.load();
      getPlayerTime(getCookie("user"), film)
    });

  fetch(subtitleUrl)
    .then(response => response.url)
    .then(videoUrl => {
      subtitle.src = videoUrl;
    });

  window.setInterval(function () {
    setPlayerTime(getCookie("user"), film, videoPlayer.currentTime)
  }, 5000);

  url = `${apiUrl}/film?id=${film}`;
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const film = data.film[0];
      if (film) {
        if (film.release_date != null) {
          let releaseDate = film.release_date;
          let d = releaseDate.toString().slice(0, 19).replace('T', ' ').split(' ')[0].split('-').reverse().join('/');
          year.appendChild(document.createTextNode(d));
        } else {
          budget.appendChild(document.createTextNode("non è ancora inserito questo dato nel database"));
        }
        if (film.budget != null) {
          const budgetFormattato = film.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          budget.appendChild(document.createTextNode("$" + budgetFormattato));
        } else {
          budget.appendChild(document.createTextNode("non è ancora inserito questo dato nel database"));
        }
        title.appendChild(document.createTextNode(film.title));
        cardImage.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${film.poster}");`);
        videoPlayer.setAttribute('data-poster', "https://image.tmdb.org/t/p/original/" + film.background_image);
        setTimeout(() => {
          player.poster = "https://image.tmdb.org/t/p/original/" + film.background_image;
        }, 500)
        body.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${film.background_image}"); backdrop-filter: blur(5px);`);
      } else {
        console.log("No Film")
      }
    });
} else {
  window.location.href = "login.html";
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0)===' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function setPlayerTime(user_id, movie_id, player_time) {
  const url = `${apiUrl}/setPlayerTime`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({user_id: user_id, movie_id: movie_id, player_time: player_time})
  }).then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function getPlayerTime(user_id, movie_id) {
  const url = `${apiUrl}/getPlayerTime`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({user_id: user_id, movie_id: movie_id})
  }).then(response => response.json())
    .then(data => {
      videoPlayer.currentTime = data[0].player_time;
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}
