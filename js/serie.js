import { apiUrl } from '/api/config.js';
const queryParams = new URLSearchParams(window.location.search);
const serie = queryParams.get('serie');
const videoPlayer = document.getElementById('player');
const body = document.getElementById('body');
const title = document.getElementById('title');
const cardImage = document.getElementById('card-image');
const sourceElement = videoPlayer.querySelectorAll('source')[0];
const subtitle = document.getElementById('subtitle');
const subtitleUrl = `${apiUrl}/subtitle?film=${serie}`;
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

let urlEpisode = `${apiUrl}/getEpisodes?id=${serie}`;

fetch(urlEpisode)
  .then(response => response.url)
  .then(episode => {
    const episodeId = episode.episode_id;
    const urlEpisodeVideo = `${apiUrl}/video?film=${episodeId}`;
    fetch(urlEpisodeVideo)
      .then(response => response.url)
      .then(videoUrl => {
        sourceElement.src = videoUrl;
        videoPlayer.load();
      });
    const urlEpisodeSubtitle = `${apiUrl}/subtitle?film=${episodeId}`;
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
    const film = data.film[0];
    title.appendChild(document.createTextNode(film.title));
    cardImage.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${film.poster}");`);
    videoPlayer.setAttribute('data-poster', "https://image.tmdb.org/t/p/original/" + film.background_image);
    setTimeout(() => {
      player.poster = "https://image.tmdb.org/t/p/original/" + film.background_image;
    }, 500)
    body.setAttribute("style", `background-image: url("https://image.tmdb.org/t/p/original/${film.background_image}"); backdrop-filter: blur(5px);`);
  });


