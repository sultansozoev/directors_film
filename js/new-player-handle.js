import { apiUrl } from '/api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const film = queryParams.get('film');
let url = `${apiUrl}/works-in-chrome-and-safari?film=${film}`;
const videoPlayer = document.getElementById('player');
const title = document.getElementById('title');
const sourceElement = videoPlayer.querySelectorAll('source')[0];
const subtitle = document.getElementById('subtitle');
const subtitleUrl = `${apiUrl}/subtitle?film=${film}`

let token = getCookie("jwt");
console.log(url)
if (token) {
  fetch(url, {
  })
    .then(response => response.url)
    .then(videoUrl => {
      sourceElement.src = videoUrl;
      videoPlayer.load();
      getPlayerTime(getCookie("user"), film);
      playPause();
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
        title.innerText = film.title;
      } else {
        console.log("No Film")
      }
    });
} else {
  window.location.href = "login.html";
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
