import { apiUrl } from '/api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const serie = queryParams.get('serie');
const videoPlayer = document.getElementById('player');
const body = document.getElementById('body');
const title = document.getElementById('title');
const cardImage = document.getElementById('card-image');
const sourceElement = videoPlayer.querySelectorAll('source')[0];
const subtitle = document.getElementById('subtitle');
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
const seasonSelector = document.getElementById('season');
const episodeSelector = document.getElementById('episode');
const urlSeason = `${apiUrl}/getSeasons?id=${serie}`;

fetch(urlSeason)
  .then(response => response.json())
  .then(season => {
    for (const seasonKey in season) {
      const opt = document.createElement('option');
      opt.value = season[seasonKey].season_id;
      opt.innerHTML = season[seasonKey].season_name;
      seasonSelector.appendChild(opt);
    }
    let urlEpisode = `${apiUrl}/getEpisodes?id=${seasonSelector.value}`;
    fetch(urlEpisode)
      .then(response => response.json())
      .then(episode => {
        for (const episodeKey in episode) {
          const opt = document.createElement('option');
          opt.value = episode[episodeKey].episode_id;
          opt.innerHTML = episode[episodeKey].title;
          episodeSelector.appendChild(opt);
        }
        const urlEpisodeVideo = `${apiUrl}/videoSerieTV?film=${episodeSelector.value}`;
        fetch(urlEpisodeVideo)
          .then(response => response.url)
          .then(videoUrl => {
            sourceElement.src = videoUrl;
            videoPlayer.load();
          });
        const urlEpisodeSubtitle = `${apiUrl}/subtitle?film=${episodeSelector.value}`;
        fetch(urlEpisodeSubtitle)
          .then(response => response.url)
          .then(videoUrl => {
            subtitle.src = videoUrl;
            console.log(videoUrl);
          });
      });
  });

seasonSelector.addEventListener('change', function() {
  let urlEpisode = `${apiUrl}/getEpisodes?id=${this.value}`;
  fetch(urlEpisode)
    .then(response => response.json())
    .then(episode => {
      episodeSelector.innerHTML = '';
      for (const episodeKey in episode) {
        const opt = document.createElement('option');
        opt.value = episode[episodeKey].episode_id;
        opt.innerHTML = episode[episodeKey].title;
        episodeSelector.appendChild(opt);
      }
    });
});
episodeSelector.addEventListener('change', function() {
  console.log('You selected: ', this.value);
  const urlEpisodeVideo = `${apiUrl}/videoSerieTV?film=${this.value}`;
  fetch(urlEpisodeVideo)
    .then(response => response.url)
    .then(videoUrl => {
      sourceElement.src = videoUrl;
      videoPlayer.load();
    });
  const urlEpisodeSubtitle = `${apiUrl}/subtitle?film=${episodeSelector.value}`;
  fetch(urlEpisodeSubtitle)
    .then(response => response.url)
    .then(videoUrl => {
      subtitle.src = videoUrl;
      console.log(videoUrl);
    });
});

const player = new Plyr('video', { captions: { active: true }, controls });
player.elements.container.tabIndex = 0;
player.config.urls.download = urlEpisode;
window.player = player;
urlEpisode = `${apiUrl}/film?title=${serie}`;
fetch(urlEpisode)
  .then(response => response.json())
  .then(data => {
    const serie_tv = data.results[0];
    if (serie_tv.release_date != null) {
      let releaseDate = serie_tv.release_date;
      let d = releaseDate.toString().slice(0, 19).replace('T', ' ').split(' ')[0].split('-').reverse().join('/');
      year.appendChild(document.createTextNode(d));
    } else {
      budget.appendChild(document.createTextNode("non è ancora inserito questo dato nel database"));
    }
    title.appendChild(document.createTextNode(serie_tv.title));
    cardImage.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${serie_tv.poster}");`);
    videoPlayer.setAttribute('data-poster', "https://image.tmdb.org/t/p/original/" + serie_tv.background_image);
    setTimeout(() => {
      player.poster = "https://image.tmdb.org/t/p/original/" + serie_tv.background_image;
    }, 500)
    body.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${serie_tv.background_image}"); backdrop-filter: blur(5px);`);
  });


