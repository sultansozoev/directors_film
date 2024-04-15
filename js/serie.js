import { apiUrl } from '/api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const serie = queryParams.get('serie');
const videoPlayer = document.getElementById('player');
const body = document.getElementById('body');
const title = document.getElementById('title');
const year = document.getElementById('year');
const cardImage = document.getElementById('card-image');
const sourceElement = videoPlayer.querySelectorAll('source')[0];
const subtitle = document.getElementById('subtitle');
const btnNext = document.getElementById("next");
const btnPrevious = document.getElementById("previous");

const controls =
  [
    'play-large',
    'restart',
    'rewind',
    'play',
    'fast-forward',
    'progress',
    'current-time',
    'duration',
    'mute',
    'volume',
    'captions',
    'settings',
    'download',
    'fullscreen'
  ];

const seasonSelector = document.getElementById('season');
const episodeSelector = document.getElementById('episode');
const urlSeason = `${apiUrl}/getSeasons?id=${serie}`;
let token = getCookie("jwt");
const player = new Plyr('video', {captions: {active: true}, controls});
player.volume = 100;
window.player = player;
if (token) {
  btnNext.addEventListener("click", nextOption);
  btnPrevious.addEventListener("click", previousOption);

  function fetchInit(urlSeason, season_id, episode_id) {
    fetch(urlSeason)
      .then(response => response.json())
      .then(season => {
        for (const seasonKey in season) {
          const opt = document.createElement('option');
          opt.value = season[seasonKey].season_id;
          opt.innerHTML = season[seasonKey].season_name;
          seasonSelector.appendChild(opt);
        }
        if (season_id) {
          seasonSelector.value = season_id;
        }
        let urlEpisode = `${apiUrl}/getEpisodes?id=${seasonSelector.value}`;
        fetchEpisode(urlEpisode, episode_id);
      });
  }

  function fetchEpisode(urlEpisode, episode_id) {
    fetch(urlEpisode)
      .then(response => response.json())
      .then(episode => {
        for (const episodeKey in episode) {
          const opt = document.createElement('option');
          opt.value = episode[episodeKey].episode_id;
          opt.innerHTML = episode[episodeKey].episode_number + " - " + episode[episodeKey].title;
          episodeSelector.appendChild(opt);
        }
        if (episode_id)
          episodeSelector.value = episode_id;
        const urlEpisodeVideo = `${apiUrl}/videoSerieTV?film=${episodeSelector.value}`;
        fetch(urlEpisodeVideo)
          .then(response => response.url)
          .then(videoUrl => {
            sourceElement.src = videoUrl;
            player.config.urls.download = `${apiUrl}/downloadSerie?film=${episodeSelector.value}`;
            player.elements.container.tabIndex = 0;
            videoPlayer.load();
          });
        const urlEpisodeSubtitle = `${apiUrl}/subtitleSerieTV?film=${episodeSelector.value}`;
        fetch(urlEpisodeSubtitle)
          .then(response => response.url)
          .then(videoUrl => {
            subtitle.src = videoUrl;
          });
      });
  }

  const urlTime = `${apiUrl}/getPlayerTimeSerie`;
  fetch(urlTime, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({user_id: getCookie("user"), serie_tv_id: serie})
  }).then(response => response.json())
    .then(data => {
      if (data.length <= 0) {
        fetchInit(urlSeason);
      } else {
        console.log("data not 0")
        fetchInit(urlSeason, data[0].season_id, data[0].episode_id)
        videoPlayer.currentTime = data[0].player_time;
      }
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
  seasonSelector.addEventListener('change', function () {
    seasonChange(this.value);
  });
  episodeSelector.addEventListener('change', function () {
    episodeChange(this.value);
  });

  const urlSerie = `${apiUrl}/serie_tv?id=${serie}`;
  fetch(urlSerie)
    .then(response => response.json())
    .then(data => {
      const serie_tv = data.results[0];
      if (serie_tv.release_date != null) {
        let releaseDate = serie_tv.release_date;
        let d = releaseDate.toString().slice(0, 19).replace('T', ' ').split(' ')[0].split('-').reverse().join('/');
        year.appendChild(document.createTextNode(d));
      }
      title.appendChild(document.createTextNode(serie_tv.title));
      cardImage.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${serie_tv.poster}");`);
      videoPlayer.setAttribute('data-poster', "https://image.tmdb.org/t/p/original/" + serie_tv.background_image);
      setTimeout(() => {
        player.poster = "https://image.tmdb.org/t/p/original/" + serie_tv.background_image;
      }, 500)
      body.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${serie_tv.background_image}"); backdrop-filter: blur(5px);`);
    });
  window.setInterval(function () {
    setPlayerTimeSerie(getCookie("user"), serie, videoPlayer.currentTime, episodeSelector.value, seasonSelector.value)
  }, 5000);

  function nextOption() {
    const currentIndex = episodeSelector.selectedIndex;
    const currentIndexSeason = seasonSelector.selectedIndex;
    const nextIndex = currentIndex + 1;
    if (nextIndex < episodeSelector.length) {
      episodeSelector.selectedIndex = nextIndex;
      episodeChange(episodeSelector.value);
    } else {
      let nextIndexSeason = currentIndexSeason + 1;
      if (nextIndexSeason < seasonSelector.length) {
        seasonSelector.selectedIndex = nextIndexSeason;
        seasonChange(seasonSelector.value);
      }
    }
  }
  function previousOption() {
    const currentIndex = episodeSelector.selectedIndex;
    const previousIndex = currentIndex - 1;
    const currentIndexSeason = seasonSelector.selectedIndex;
    if (previousIndex >= 0) {
      episodeSelector.selectedIndex = previousIndex;
      episodeChange(episodeSelector.value);
    } else {
      let nextIndexSeason = currentIndexSeason - 1;
      if (nextIndexSeason >= 0) {
        seasonSelector.selectedIndex = nextIndexSeason;
        seasonChange(seasonSelector.value);
      }
    }
  }
  function seasonChange(seasonId) {
    let urlEpisode = `${apiUrl}/getEpisodes?id=${seasonId}`;
    episodeSelector.innerHTML = '';
    fetchEpisode(urlEpisode);
  }
} else {
  window.location.href = "login.html";
}

function setPlayerTimeSerie(user_id, serie_tv_id, player_time, episode_id, season_id) {
  const url = `${apiUrl}/setPlayerTimeSerie`;
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({user_id: user_id, serie_tv_id: serie_tv_id, player_time: player_time, episode_id: episode_id, season_id: season_id})
  }).then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching films:', error);
    });
}

function episodeChange(episodeId) {
  const urlEpisodeVideo = `${apiUrl}/videoSerieTV?film=${episodeId}`;
  fetch(urlEpisodeVideo)
    .then(response => response.url)
    .then(videoUrl => {
      sourceElement.src = videoUrl;
      player.config.urls.download = `${apiUrl}/downloadSerie?film=${episodeId}`;
      videoPlayer.load();
    });
  const urlEpisodeSubtitle = `${apiUrl}/subtitleSerieTV?film=${episodeId}`;
  fetch(urlEpisodeSubtitle)
    .then(response => response.url)
    .then(videoUrl => {
      subtitle.src = videoUrl;
    });
}
