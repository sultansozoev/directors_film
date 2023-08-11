import {apiUrl} from '/api/config.js';

const queryParams = new URLSearchParams(window.location.search);
const film = queryParams.get('film');
const url = `${apiUrl}/video?film=${film}`;

const film_url = `${apiUrl}/film?film=${film}`;
const videoPlayer = document.getElementById('player');
const sourceElement = videoPlayer.querySelectorAll('source')[0];


  fetch(film_url)
    .then(response => response.json())
    .then(data => {
      console.log(data.film[0].background)
      videoPlayer.poster = data.film[0].background;
    });
  fetch(url)
    .then(response => {
      if (response.status === 206) {
        const contentRange = response.headers.get('content-range');
        const [, start, end, total] = contentRange.match(/bytes (\d+)-(\d+)\/(\d+)/);
        return response.blob().then(blob => ({ blob, start, end, total }));
      } else {
        return response.blob();
      }
    })
    .then(data => {
      if (data.start !== undefined && data.end !== undefined) {
        const chunkBlob = data.blob.slice(data.start, data.end - data.start + 1);
        sourceElement.src = URL.createObjectURL(chunkBlob);
        videoPlayer.load();
      } else {
        sourceElement.src = URL.createObjectURL(data.blob);
        videoPlayer.load();
      }
    })
    .catch(error => {
      console.error('Error fetching video:', error);
    });


const player = new Plyr('video', {captions: {active: true}});
window.player = player;

